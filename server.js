/**
 * Serveur de production : sert le front buildé (dist/) ET expose une route
 * /api/airtable qui détient le token Airtable CÔTÉ SERVEUR.
 *
 * Le token ne quitte jamais le serveur — le navigateur ne le voit jamais.
 *
 * Variables d'environnement requises (SANS préfixe VITE_) :
 *   AIRTABLE_PAT      — Personal Access Token (scope data.records:write minimal)
 *   AIRTABLE_BASE_ID  — Base ID (commence par "app...")
 */
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// En local les secrets sont dans .env.local (convention Vite).
// Sur Railway, les variables sont déjà dans process.env : ces appels sont no-op.
dotenv.config({ path: '.env.local' })
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

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
const NOINDEX_PATHS = ['/merci-liste-attente', '/vente', '/vente-vip']
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
  "Liste d'attente": ['Prénom', 'Email'],
}

const sanitize = (value) =>
  typeof value === 'string' ? value.slice(0, 5000).trim() : value

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

// Sert le front buildé
app.use(express.static(path.join(__dirname, 'dist')))

// Fallback SPA : toute requête GET non gérée renvoie index.html
app.use((req, res, next) => {
  if (req.method !== 'GET') return next()
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`✅ Serveur YoGyFace en écoute sur le port ${PORT}`))
