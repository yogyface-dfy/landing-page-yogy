import { useState } from 'react'

/*
 * Façade YouTube : on affiche d'abord la miniature (légère), et l'iframe n'est
 * chargée qu'au clic. Cela évite de charger le player YouTube (lourd) au
 * chargement de la page et préserve les performances PageSpeed.
 */
export default function YouTubeEmbed({ id, title = 'Vidéo YouTube' }) {
  const [active, setActive] = useState(false)
  if (!id) return null

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-noir shadow-lg">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Lire la vidéo : ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-noir/20 transition-colors group-hover:bg-noir/30" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-corail shadow-xl transition-transform group-hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
