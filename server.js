/**
 * Serveur de production : sert le front buildé (dist/) ET expose une route
 * /api/airtable qui détient le token Airtable CÔTÉ SERVEUR.
 *
 * Le token ne quitte jamais le serveur — le navigateur ne le voit jamais.
 *
 * Variables d'environnement requises (SANS préfixe VITE_) :
 *   AIRTABLE_PAT      — Personal Access Token (data.records:write + :read)
 *   AIRTABLE_BASE_ID  — Base ID liste d'attente / contact (commence par "app...")
 *   AIRTABLE_ATELIER_BASE_ID / AIRTABLE_ATELIER_TABLE_ID — tunnel /atelier-gratuit
 *   STRIPE_SECRET_KEY — Checkout Session + upsell (fallback Payment Link si absente)
 *   STRIPE_WEBHOOK_SECRET — signature /api/stripe/webhook (3× : schedule 3 mois)
 *   META_CAPI_TOKEN       — Events Manager → Pixel 604268118937812 (serveur only)
 *   META_PIXEL_ID         — 604268118937812 (défaut)
 *   META_TEST_EVENT_CODE  — vide en prod ; TEST… en QA
 *   DATAFAST_BOT_TOKEN    — optionnel (dfbot_…) si auth Bot traffic activée
 *   REPLAY_SHORT_URL      — short link replay (défaut go.yogyface.fr/replay-yt)
 *   WEBI_APP_URL / INSCRIPTION_WEBHOOK_SECRET — identity cookie + ping /vente
 */
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { createExpressAICrawlerMiddleware } from '@datafast/ai-crawl'
import {
  chargeUpsell,
  createCheckoutSession,
  getCheckoutSession,
  handleStripeWebhook,
} from './lib/stripe-server.js'
import { handleCapiEvent } from './lib/meta-capi.js'
import { handleReplayYoutube } from './lib/replay-youtube.js'
import { ATTRIBUTION_KEYS } from './src/lib/attribution.js'
import { setHidCookie, readHidCookie } from './lib/hid-cookie.js'

// En local les secrets sont dans .env.local (convention Vite).
// Sur Railway, les variables sont déjà dans process.env : ces appels sont no-op.
dotenv.config({ path: '.env.local' })
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
// Railway : IP réelle du crawler (X-Forwarded-For), pas l'IP interne.
app.set('trust proxy', 1)

// DataFast Bot traffic — GET/HEAD crawlers only ; next() immédiat.
app.use(
  createExpressAICrawlerMiddleware({
    websiteId: 'dfid_VK30OLHyu2v9ALKIQfjxn',
    publicOrigin: 'https://www.yogyface.fr',
    authToken: process.env.DATAFAST_BOT_TOKEN || undefined,
  }),
)

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
const NOINDEX_PATHS = [
  '/merci-liste-attente',
  '/merci-achat',
  '/vente',
  '/vente-vip',
  '/vente-10x',
  '/vente-6x',
  '/vente-upsell',
  '/atelier-gratuit',
  '/confirmation-inscription',
  '/video-01',
  '/video-02',
  '/video-03',
  '/video-123',
  '/cadeau1',
  '/cadeau2',
  '/cadeau3',
  '/cadeaux-123',
  '/replay-gratuit',
  '/bonus-live',
  '/confirmation-achat-bienvenue',
]
app.use((req, res, next) => {
  if (NOINDEX_PATHS.some((p) => req.path === p || req.path.startsWith(p + '/'))) {
    res.set('X-Robots-Tag', 'noindex, nofollow')
  }
  next()
})

// Canonique = www. L’apex yogyface.fr → www (301). Pas le domaine Railway.
app.use((req, res, next) => {
  const host = (req.headers.host || '').split(':')[0]
  if (host === 'yogyface.fr') {
    return res.redirect(301, `https://www.yogyface.fr${req.originalUrl}`)
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
// Tunnel atelier : autre base que la liste d'attente.
const ATELIER_BASE_ID = process.env.AIRTABLE_ATELIER_BASE_ID || 'appSz9eVZWu6PoA2A'
const ATELIER_TABLE_ID = process.env.AIRTABLE_ATELIER_TABLE_ID || 'tblgeGEVgkZnDxwfR'
const WEBI_APP_URL = (process.env.WEBI_APP_URL || 'https://webi.yogyface.fr').replace(/\/$/, '')
const IDENTIFY_SECRET = process.env.INSCRIPTION_WEBHOOK_SECRET || ''

/** Upsert users côté webi + hid à poser en cookie. Timeout court : l'Airtable atelier reste la source. */
async function identifyWithWebi(fields, { ip, ua, airtableRecordId } = {}) {
  if (!IDENTIFY_SECRET) return null
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 2500)
  try {
    const r = await fetch(`${WEBI_APP_URL}/api/identify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': IDENTIFY_SECRET,
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        email: fields.Email,
        firstName: fields['Prénom'],
        phone: fields.Phone,
        source: 'atelier-gratuit',
        form_name: fields.formName,
        client_ip: ip,
        client_user_agent: ua,
        airtableRecordId: airtableRecordId || undefined,
        ...Object.fromEntries(ATTRIBUTION_KEYS.map((k) => [k, fields[k]]).filter(([, v]) => v)),
      }),
    })
    if (!r.ok) return null
    const data = await r.json().catch(() => ({}))
    return { hid: data.hid || null, userId: data.userId || null }
  } catch (e) {
    console.error('identify webi:', e.message || e)
    return null
  } finally {
    clearTimeout(t)
  }
}

async function forwardVenteHit({ hid, path, email, record, ip }) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 2500)
  try {
    const r = await fetch(`${WEBI_APP_URL}/api/vente-hit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({
        hid,
        path,
        email,
        record,
        client_ip: ip,
      }),
    })
    const data = await r.json().catch(() => ({}))
    return { known: !!data.known, hid: data.hid || hid, userId: data.userId || '' }
  } finally {
    clearTimeout(t)
  }
}

/** `sub` du JWT yf_hid, sans vérif (uuid public, déjà dans Airtable). */
function hidUserId(token) {
  try {
    const payload = JSON.parse(Buffer.from(String(token).split('.')[1], 'base64url').toString())
    return typeof payload?.sub === 'string' ? payload.sub : ''
  } catch {
    return ''
  }
}

// Allowlist : seules ces tables sont accessibles via l'API publique
const ALLOWED_TABLES = new Set(['Messages Contact', "Liste d'attente", 'Atelier gratuit'])

// Champs autorisés par table (empêche l'injection de champs arbitraires)
const ALLOWED_FIELDS = {
  'Messages Contact': ['Nom', 'Email', 'Sujet', 'Message'],
  "Liste d'attente": ['Prénom', 'Email', 'Phone'],
  'Atelier gratuit': ['Prénom', 'Email', 'Phone', 'Country', 'Source', 'formName', ...ATTRIBUTION_KEYS],
}

/** Base + id table Airtable (le client n'envoie que le nom logique). */
function airtableTarget(table) {
  if (table === 'Atelier gratuit') {
    return { baseId: ATELIER_BASE_ID, tableId: ATELIER_TABLE_ID }
  }
  return { baseId: BASE_ID, tableId: table }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sanitize = (value) =>
  typeof value === 'string' ? value.slice(0, 5000).trim() : value

/** Échappe une valeur pour une formule Airtable entre quotes simples. */
const escapeFormula = (value) =>
  String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/** Liste d'attente only : même email → on flag, on ne recrée pas. */
async function findByEmail(table, email) {
  const { baseId, tableId } = airtableTarget(table)
  const formula = `LOWER({Email})=LOWER('${escapeFormula(email)}')`
  const url =
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}` +
    `?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`
  const r = await fetch(url, { headers: { Authorization: `Bearer ${PAT}` } })
  if (!r.ok) {
    console.error('Airtable lookup error:', r.status)
    return null
  }
  const data = await r.json().catch(() => ({}))
  return data.records?.[0] || null
}

async function findWaitlistByEmail(email) {
  return findByEmail("Liste d'attente", email)
}

function inscriptionUrl(recordId = '') {
  const { baseId, tableId } = airtableTarget('Atelier gratuit')
  const path = recordId ? `/${recordId}` : ''
  return `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}${path}`
}

const AT_HEADERS = () => ({
  Authorization: `Bearer ${PAT}`,
  'Content-Type': 'application/json',
})

/** Pose users.id sur la fiche atelier (champ texte `yf_hid`). 422 si le champ n'existe pas. */
async function patchAtelierHid(recordId, userId) {
  try {
    const r = await fetch(inscriptionUrl(recordId), {
      method: 'PATCH',
      headers: AT_HEADERS(),
      body: JSON.stringify({ fields: { yf_hid: userId } }),
    })
    if (!r.ok) {
      const err = await r.json().catch(() => ({}))
      console.error('atelier yf_hid:', r.status, err?.error)
    }
  } catch (e) {
    console.error('atelier yf_hid:', e.message || e)
  }
}

/** Visite /vente → même fiche Inscription que l'opt-in (`yf_hid`). */
async function patchInscriptionVente(userId) {
  if (!userId || !PAT) return
  try {
    const formula = `{yf_hid}="${escapeFormula(userId)}"`
    const r = await fetch(
      `${inscriptionUrl()}?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`,
      { headers: { Authorization: `Bearer ${PAT}` } },
    )
    const data = await r.json().catch(() => ({}))
    const rec = data.records?.[0]
    if (!rec?.id) {
      console.error('vente-hit airtable: no row for', userId)
      return
    }
    const now = new Date().toISOString()
    const first = rec.fields?.vente_page_first_at || now
    const hits = Number(rec.fields?.vente_page_hits || 0) + 1
    const p = await fetch(inscriptionUrl(rec.id), {
      method: 'PATCH',
      headers: AT_HEADERS(),
      body: JSON.stringify({
        fields: {
          opened_vente: true,
          vente_page_first_at: String(first),
          vente_page_last_at: now,
          // Airtable : champ texte, pas number — un int fait 422 sur tout le PATCH.
          vente_page_hits: String(hits),
        },
      }),
    })
    if (!p.ok) {
      const err = await p.json().catch(() => ({}))
      console.error('vente-hit airtable:', p.status, err?.error)
    }
  } catch (e) {
    console.error('vente-hit airtable:', e.message || e)
  }
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

    if (table === "Liste d'attente" || table === 'Atelier gratuit') {
      const email = cleanFields.Email
      if (!email || !EMAIL_RE.test(String(email))) {
        return res.status(400).json({ error: 'Email invalide' })
      }
      if (!cleanFields['Prénom']) cleanFields['Prénom'] = '—'
    }

    // Atelier : une fiche neuve à chaque submit (même email).
    if (table === "Liste d'attente") {
      const existing = await findByEmail(table, cleanFields.Email)
      if (existing) {
        const flagged = await flagWaitlistDuplicate(existing.id)
        if (!flagged) return res.status(502).json({ error: 'Enregistrement impossible' })
        return res.json({ id: existing.id, existing: true })
      }
    }

    const { baseId, tableId } = airtableTarget(table)
    const r = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}`,
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

    if (table === 'Atelier gratuit') {
      const out = await identifyWithWebi(cleanFields, {
        ip: req.ip,
        ua: req.headers['user-agent'],
        airtableRecordId: data.id,
      })
      if (out?.hid) setHidCookie(res, out.hid, req)
      // Champ texte `yf_hid` = users.id (même id que le cookie). Best-effort.
      if (out?.userId && data.id) patchAtelierHid(data.id, out.userId)
    }

    return res.json({ id: data.id })
  } catch (e) {
    console.error('Server error:', e)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.post('/api/vente-hit', async (req, res) => {
  try {
    const pathName = String(req.body?.path || '/vente').split('?')[0]
    const hid = req.body?.h || req.body?.hid || readHidCookie(req)
    const email = String(req.body?.email || '').replace(/ /g, '+').trim()
    const record = req.body?.record !== false
    const out = await forwardVenteHit({
      hid,
      path: pathName,
      email,
      record,
      ip: req.ip,
    })
    if (out.hid) setHidCookie(res, out.hid, req)
    const userId = out.userId || hidUserId(hid)
    const isVente = pathName === '/vente' || pathName === '/vente-vip' || pathName === '/vente-10x' || pathName === '/vente-6x'
    if (record && isVente && userId) {
      patchInscriptionVente(userId).catch((e) => console.error('vente-hit airtable:', e))
    }
    return res.json({ ok: true, known: out.known || !!userId })
  } catch (e) {
    console.error('vente-hit:', e)
    return res.json({ ok: true, known: false })
  }
})

app.get('/api/replay', handleReplayYoutube)
app.post('/api/capi-event', handleCapiEvent)
app.post('/api/stripe/checkout', createCheckoutSession)
app.get('/api/stripe/session', getCheckoutSession)
app.post('/api/stripe/upsell', chargeUpsell)

const DIST = path.join(__dirname, 'dist')
const NOT_FOUND = path.join(DIST, '404.html')

// Vieilles URLs Systeme.io (GSC 404 / clics encore actifs).
const LEGACY_REDIRECTS = {
  '/yogyface-reset': '/programme',
  '/pol-co': '/',
  '/vente-upsell-test': '/vente',
}

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  const q = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
  const dest = LEGACY_REDIRECTS[req.path]
  if (dest) return res.redirect(301, dest + q)
  // /programme.html → /programme (évite le doublon indexable).
  if (req.path.endsWith('.html')) {
    const clean = req.path === '/index.html' ? '/' : req.path.slice(0, -5)
    return res.redirect(301, clean + q)
  }
  if (req.path.length > 1 && req.path.endsWith('/')) {
    return res.redirect(301, req.path.slice(0, -1) + q)
  }
  next()
})

// /programme sert dist/programme.html (sinon Express tombait sur index.html).
app.use(express.static(DIST, { extensions: ['html'] }))

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  res.status(404)
  if (fs.existsSync(NOT_FOUND)) return res.sendFile(NOT_FOUND)
  res.type('html').send('Page introuvable')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`✅ Serveur YoGyFace en écoute sur le port ${PORT}`))
