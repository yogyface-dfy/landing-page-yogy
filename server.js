/**
 * Serveur de production : sert le front buildé (dist/) ET expose une route
 * /api/airtable qui détient le token Airtable CÔTÉ SERVEUR.
 *
 * Le token ne quitte jamais le serveur — le navigateur ne le voit jamais.
 *
 * Variables d'environnement requises (SANS préfixe VITE_) :
 *   AIRTABLE_PAT      — Personal Access Token (data.records:write + :read)
 *   AIRTABLE_BASE_ID  — Base ID (commence par "app...")
 *   STRIPE_SECRET_KEY — Checkout Session + upsell (fallback Payment Link si absente)
 *   STRIPE_WEBHOOK_SECRET — signature /api/stripe/webhook (3× : schedule 3 mois)
 *   META_CAPI_TOKEN       — Events Manager → Pixel 604268118937812 (serveur only)
 *   META_PIXEL_ID         — 604268118937812 (défaut)
 *   META_TEST_EVENT_CODE  — vide en prod ; TEST… en QA
 */
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import {
  chargeUpsell,
  createCheckoutSession,
  getCheckoutSession,
  handleStripeWebhook,
} from './lib/stripe-server.js'
import { handleCapiEvent } from './lib/meta-capi.js'

// En local les secrets sont dans .env.local (convention Vite).
// Sur Railway, les variables sont déjà dans process.env : ces appels sont no-op.
dotenv.config({ path: '.env.local' })
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// Webhook Stripe : body brut pour la signature (AVANT express.json).
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook)

// Limite la taille du body pour éviter les abus
app.use(express.json({ limit: '32kb' }))

// Empêche l'indexation du domaine technique Railway (évite le contenu dupliqué
// avec yogyface.fr). Dès que le domaine final servira l'app, l'en-tête ne
// s'applique plus et l'indexation redevient normale.
app.use((req, res, next) => {
  const host = req.headers.host || ''
  if (host.endsWith('.up.railway.app')) {
    res.set('X-Robots-Tag', 'noindex, nofollow')
  }
  next()
})

// Pages privées (emails / liste d'attente) : noindex même si un bot ignore la meta.
const NOINDEX_PATHS = ['/merci-liste-attente', '/merci-achat', '/vente', '/vente-vip', '/vente-upsell', '/vente-upsell-test']
app.use((req, res, next) => {
  if (NOINDEX_PATHS.some((p) => req.path === p || req.path.startsWith(p + '/'))) {
    res.set('X-Robots-Tag', 'noindex, nofollow')
  }
  next()
})

// Canonicalisation du domaine : on force www.yogyface.fr → yogyface.fr (apex)
// en 301. Indispensable pour que Google n'indexe qu'UNE seule version (l'apex,
// qui correspond aux balises canonical et au sitemap) et évite le doublon www.
// N'a d'effet que si le DNS du www pointe bien vers cette app (Railway).
app.use((req, res, next) => {
  const host = req.headers.host || ''
  if (host.startsWith('www.')) {
    return res.redirect(301, `https://${host.slice(4)}${req.originalUrl}`)
  }
  next()
})

// --- Sections en relecture : protection par mot de passe (HTTP Basic Auth) ---
// /articles et /evenements ne sont accessibles qu'avec les identifiants.
// Avantage : bloque AUSSI Google (401 → impossible à crawler/indexer), donc
// ces pages restent totalement invisibles tant qu'on n'a pas validé le contenu.
// Identifiants définis via variables d'environnement Railway (REVIEW_USER /
// REVIEW_PASSWORD). Les valeurs par défaut ne servent que de secours.
const REVIEW_PROTECTED = ['/articles', '/evenements']
// Nettoie la valeur : Railway peut entourer les variables de guillemets (format
// dotenv) ; on retire guillemets et espaces superflus pour éviter tout décalage.
const cleanEnv = (value, fallback) =>
  (value ?? fallback).trim().replace(/^["']|["']$/g, '')
const REVIEW_USER = cleanEnv(process.env.REVIEW_USER, 'yogyface')
const REVIEW_PASSWORD = cleanEnv(process.env.REVIEW_PASSWORD, 'reset-2026')

app.use((req, res, next) => {
  const isProtected = REVIEW_PROTECTED.some(
    (p) => req.path === p || req.path.startsWith(p + '/')
  )
  if (!isProtected) return next()

  const [scheme, encoded] = (req.headers.authorization || '').split(' ')
  if (scheme === 'Basic' && encoded) {
    const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':')
    if (user === REVIEW_USER && pass === REVIEW_PASSWORD) return next()
  }

  res.set('WWW-Authenticate', 'Basic realm="YoGyFace - Acces en relecture"')
  return res.status(401).send('Acces restreint - section en relecture.')
})

const PAT = process.env.AIRTABLE_PAT
const BASE_ID = process.env.AIRTABLE_BASE_ID

// Allowlist : seules ces tables sont accessibles via l'API publique
const ALLOWED_TABLES = new Set(['Messages Contact', "Liste d'attente"])

// Champs autorisés par table (empêche l'injection de champs arbitraires)
const ALLOWED_FIELDS = {
  'Messages Contact': ['Nom', 'Email', 'Sujet', 'Message'],
  "Liste d'attente": ['Prénom', 'Email', 'Phone'],
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sanitize = (value) =>
  typeof value === 'string' ? value.slice(0, 5000).trim() : value

/** Échappe une valeur pour une formule Airtable entre quotes simples. */
const escapeFormula = (value) =>
  String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/** Doublon : même email déjà sur la liste → on ne recrée pas la fiche. */
async function findWaitlistByEmail(email) {
  const formula = `LOWER({Email})=LOWER('${escapeFormula(email)}')`
  const url =
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent("Liste d'attente")}` +
    `?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`
  const r = await fetch(url, { headers: { Authorization: `Bearer ${PAT}` } })
  if (!r.ok) {
    console.error('Airtable lookup error:', r.status)
    return null
  }
  const data = await r.json().catch(() => ({}))
  return data.records?.[0] || null
}

/** 2ᵉ inscription (formulaire ou lien email) : flag pour l'automation mail. */
async function flagWaitlistDuplicate(recordId) {
  const r = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent("Liste d'attente")}/${recordId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${PAT}`,
        'Content-Type': 'application/json',
      },
      // Champ serveur only — le client ne peut pas le poser via ALLOWED_FIELDS.
      body: JSON.stringify({ fields: { doubleInscription: 'Oui' } }),
    }
  )
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    console.error('Airtable doubleInscription error:', r.status, data?.error)
    return false
  }
  return true
}

app.post('/api/airtable', async (req, res) => {
  try {
    if (!PAT || !BASE_ID) {
      return res.status(500).json({ error: 'Serveur non configuré' })
    }

    const { table, fields } = req.body || {}

    if (!ALLOWED_TABLES.has(table)) {
      return res.status(400).json({ error: 'Table non autorisée' })
    }
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
      return res.status(400).json({ error: 'Champs invalides' })
    }

    // Ne conserve que les champs autorisés et nettoie les valeurs
    const allowed = ALLOWED_FIELDS[table]
    const cleanFields = {}
    for (const key of allowed) {
      if (fields[key] !== undefined) cleanFields[key] = sanitize(fields[key])
    }

    if (table === "Liste d'attente") {
      const email = cleanFields.Email
      if (!email || !EMAIL_RE.test(String(email))) {
        return res.status(400).json({ error: 'Email invalide' })
      }
      const existing = await findWaitlistByEmail(email)
      if (existing) {
        const flagged = await flagWaitlistDuplicate(existing.id)
        if (!flagged) return res.status(502).json({ error: 'Enregistrement impossible' })
        return res.json({ id: existing.id, existing: true })
      }
      if (!cleanFields['Prénom']) cleanFields['Prénom'] = '—'
    }

    const r = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: cleanFields }),
      }
    )

    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      // On ne renvoie pas le détail Airtable au client (fuite d'info)
      console.error('Airtable error:', r.status, data?.error)
      return res.status(502).json({ error: 'Enregistrement impossible' })
    }

    return res.json({ id: data.id })
  } catch (e) {
    console.error('Server error:', e)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.post('/api/capi-event', handleCapiEvent)
app.post('/api/stripe/checkout', createCheckoutSession)
app.get('/api/stripe/session', getCheckoutSession)
app.post('/api/stripe/upsell', chargeUpsell)

// Sert le front buildé
app.use(express.static(path.join(__dirname, 'dist')))

// Fallback SPA : toute requête GET non gérée renvoie index.html
app.use((req, res, next) => {
  if (req.method !== 'GET') return next()
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`✅ Serveur YoGyFace en écoute sur le port ${PORT}`))
