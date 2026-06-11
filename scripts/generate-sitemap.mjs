/*
 * Génère public/sitemap.xml à partir des pages statiques + des articles Markdown.
 * Lancé automatiquement avant chaque build (script "prebuild" du package.json).
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const SITE = 'https://yogyface.fr'
const TODAY = new Date().toISOString().slice(0, 10)

// Pages statiques (loc, priority, changefreq).
const staticPages = [
  ['/', '1.0', 'weekly'],
  ['/about', '0.8', 'monthly'],
  ['/programme', '0.9', 'monthly'],
  ['/transformations', '0.7', 'monthly'],
  ['/articles', '0.8', 'weekly'],
  ['/faq', '0.7', 'monthly'],
  ['/contact', '0.6', 'yearly'],
  ['/liste-attente', '0.9', 'weekly'],
  ['/mentions-legales', '0.3', 'yearly'],
  ['/cgv', '0.3', 'yearly'],
  ['/confidentialite', '0.3', 'yearly'],
]

// Lit les articles et extrait slug + date depuis le frontmatter.
function readArticles() {
  const dir = join(root, 'src/content/articles')
  let files = []
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'))
  } catch {
    return []
  }
  return files.map((file) => {
    const raw = readFileSync(join(dir, file), 'utf8')
    const fm = /^---\s*\n([\s\S]*?)\n---/.exec(raw)?.[1] || ''
    const get = (key) =>
      new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(fm)?.[1]?.trim().replace(/^["']|["']$/g, '')
    return {
      slug: get('slug') || file.replace(/\.md$/, ''),
      date: get('date') || TODAY,
    }
  })
}

const url = (loc, lastmod, priority, changefreq) =>
  `  <url><loc>${SITE}${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority><changefreq>${changefreq}</changefreq></url>`

const rows = [
  ...staticPages.map(([loc, p, c]) => url(loc, TODAY, p, c)),
  ...readArticles().map((a) => url(`/articles/${a.slug}`, a.date, '0.7', 'monthly')),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`✅ sitemap.xml généré (${rows.length} URLs)`)
