import { marked } from 'marked'

/*
 * Chargeur d'articles.
 * Lit tous les fichiers Markdown de src/content/articles/*.md en brut (au build
 * pour le SSG, et côté client pour la navigation), parse leur frontmatter et
 * convertit le corps en HTML. import.meta.glob est résolu par Vite : aucun accès
 * au système de fichiers à l'exécution, donc compatible navigateur + SSG.
 */
const files = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Parse un frontmatter YAML simple (clés scalaires) délimité par des lignes ---.
function parseFrontmatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw)
  if (!match) return { data: {}, body: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    // Retire les guillemets entourants éventuels
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
    data[key] = value
  }
  return { data, body: match[2] }
}

// Liste des articles, triés par date décroissante (plus récent en premier).
export const articles = Object.entries(files)
  .map(([filePath, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    const slug = data.slug || filePath.split('/').pop().replace(/\.md$/, '')
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      category: data.category || 'Article',
      excerpt: data.excerpt || '',
      cover: data.cover || '', // image dans public/articles/ (optionnel)
      // ID vidéo YouTube (optionnel). On ignore le placeholder des brouillons
      // pour ne pas afficher de miniature/vidéo cassée tant qu'aucun ID réel.
      youtube:
        data.youtube && data.youtube !== 'REMPLACE_PAR_ID_VIDEO'
          ? data.youtube
          : '',
      description: data.description || data.excerpt || '',
      html: marked.parse(body),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

// Récupère un article par son slug.
export const getArticle = (slug) => articles.find((a) => a.slug === slug)

// Catégories uniques présentes dans les articles (pour les filtres).
export const categories = [...new Set(articles.map((a) => a.category))]
