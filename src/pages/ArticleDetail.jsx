import { useParams, Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import SEO from '../components/SEO'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { getArticle } from '../lib/articles'
import { formatDate } from '../lib/formatDate'

const SITE = 'https://yogyface.fr'

// Construit une URL absolue pour l'image de partage social.
const socialImage = (a) => {
  if (a.cover) return a.cover.startsWith('http') ? a.cover : `${SITE}${a.cover}`
  if (a.youtube) return `https://i.ytimg.com/vi/${a.youtube}/hqdefault.jpg`
  return undefined
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = getArticle(slug)

  // Article inexistant : message clair + retour vers la liste.
  if (!article) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-[5%] pt-32 pb-20">
        <SEO title="Article introuvable" description="Cet article n'existe pas ou plus." noindex />
        <h1 className="font-display font-black text-noir text-3xl mb-4">Article introuvable</h1>
        <Link to="/articles" className="btn-corail">Voir tous les articles</Link>
      </section>
    )
  }

  const url = `${SITE}/articles/${article.slug}`
  const image = socialImage(article)

  // JSON-LD Article pour les rich results Google (auteur Laury rattaché au site).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    image: image ? [image] : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Person', '@id': `${SITE}/#laury`, name: 'Laury Anater' },
    publisher: {
      '@type': 'Organization',
      name: 'YoGyFace',
      logo: { '@type': 'ImageObject', url: `${SITE}/favicon.png` },
    },
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        path={`/articles/${article.slug}`}
        image={image}
      />
      <Head>
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <article className="pt-28 md:pt-36 pb-20 px-[5%]">
        <div className="max-w-[760px] mx-auto">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-gris hover:text-corail text-sm font-medium transition-colors mb-8"
          >
            <span aria-hidden="true">←</span> Tous les articles
          </Link>

          <span className="block text-corail text-xs font-semibold uppercase tracking-wider mb-3">
            {article.category}
          </span>
          <h1 className="font-display font-black text-noir text-3xl md:text-5xl tracking-tight leading-tight mb-4">
            {article.title}
          </h1>
          {article.date && (
            <p className="text-gris/70 text-sm mb-8">Publié le {formatDate(article.date)}</p>
          )}

          {article.youtube && (
            <div className="mb-10">
              <YouTubeEmbed id={article.youtube} title={article.title} />
            </div>
          )}

          {/* Contenu de confiance, rédigé par nous (Markdown -> HTML). */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          <div className="mt-14 pt-10 border-t border-noir/8 text-center">
            <p className="text-gris mb-5">Envie d'aller plus loin avec la méthode RESET™ ?</p>
            <Link to="/liste-attente" className="btn-corail">Rejoindre la liste d'attente</Link>
          </div>
        </div>
      </article>
    </>
  )
}
