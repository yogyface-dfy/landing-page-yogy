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
import 'dotenv/config'

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
