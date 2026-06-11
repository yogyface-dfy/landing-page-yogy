import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { articles, categories } from '../lib/articles'
import { formatDate } from '../lib/formatDate'

const ALL = 'Tous'

// Image d'aperçu d'une carte : cover dédiée > miniature YouTube > image par défaut.
const cardImage = (a) =>
  a.cover || (a.youtube ? `https://i.ytimg.com/vi/${a.youtube}/hqdefault.jpg` : '/og-image.jpg')

export default function Articles() {
  const [filter, setFilter] = useState(ALL)
  const list = filter === ALL ? articles : articles.filter((a) => a.category === filter)

  return (
    <>
      <SEO
        title="Articles & Vidéos"
        description="Conseils, tutoriels et vidéos de yoga du visage par Laury : exercices, routines et coulisses de la méthode RESET™ pour prendre soin de ton visage au naturel."
        path="/articles"
      />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-10 px-[5%]">
        <div className="max-w-[1100px] mx-auto text-center animate-on-scroll">
          <p className="section-badge justify-center">Le journal</p>
          <h1 className="font-display font-black text-noir text-4xl md:text-6xl tracking-tight mb-5">
            Articles &amp; Vidéos
          </h1>
          <p className="text-gris text-lg max-w-2xl mx-auto">
            Tutoriels, conseils et coulisses de la méthode RESET™ pour prendre soin de ton
            visage au naturel, à ton rythme.
          </p>
        </div>
      </section>

      {/* Filtres par catégorie */}
      <section className="px-[5%] pb-2">
        <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center gap-2.5">
          {[ALL, ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                filter === cat
                  ? 'bg-corail text-white border-corail shadow-md shadow-corail/20'
                  : 'border-noir/10 text-gris hover:border-corail/40 hover:text-noir'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grille d'articles */}
      <section className="px-[5%] py-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {list.map((a) => (
            <Link
              key={a.slug}
              to={`/articles/${a.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-noir/8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden bg-creme">
                <img
                  src={cardImage(a)}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <span className="text-corail text-xs font-semibold uppercase tracking-wider mb-2">
                  {a.category}
                </span>
                <h2 className="font-display font-bold text-noir text-lg leading-snug mb-2 group-hover:text-corail transition-colors">
                  {a.title}
                </h2>
                <p className="text-gris text-sm leading-relaxed line-clamp-3 flex-1">{a.excerpt}</p>
                {a.date && <span className="text-gris/60 text-xs mt-4">{formatDate(a.date)}</span>}
              </div>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <p className="text-center text-gris mt-8">Aucun article pour le moment. Reviens bientôt !</p>
        )}
      </section>
    </>
  )
}
