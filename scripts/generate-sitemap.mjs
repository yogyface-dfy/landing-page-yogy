/*
 * Génère public/sitemap.xml à partir des pages statiques + des articles Markdown.
 * Lancé automatiquement avant chaque build (script "prebuild" du package.json).
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const SITE = 'https://yogyface.fr'
const TODAY = new Date().toISOString().slice(0, 10)

// Pages statiques (loc, priority, changefreq).
// NB : /articles et /evenements sont volontairement EXCLUS du sitemap : ils sont
// en relecture, protégés par mot de passe et ne doivent pas être proposés à Google.
const staticPages = [
  ['/', '1.0', 'weekly'],
  ['/about', '0.8', 'monthly'],
  ['/programme', '0.9', 'monthly'],
  ['/transformations', '0.7', 'monthly'],
  ['/faq', '0.7', 'monthly'],
  ['/contact', '0.6', 'yearly'],
  ['/liste-attente', '0.9', 'weekly'],
  ['/mentions-legales', '0.3', 'yearly'],
  ['/cgv', '0.3', 'yearly'],
  ['/confidentialite', '0.3', 'yearly'],
]

const url = (loc, lastmod, priority, changefreq) =>
  `  <url><loc>${SITE}${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority><changefreq>${changefreq}</changefreq></url>`

// Les articles sont en relecture (protégés) → exclus du sitemap pour l'instant.
// À la mise en ligne publique : réintroduire ici la lecture des articles.
const rows = [...staticPages.map(([loc, p, c]) => url(loc, TODAY, p, c))]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`✅ sitemap.xml généré (${rows.length} URLs)`)
