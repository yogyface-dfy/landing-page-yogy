import { useState } from 'react'
import { youtubeIdFrom } from '../lib/youtube'

/**
 * Lecteur landscape (façade play, puis <video>).
 * preload=metadata : les fichiers Systeme.io font 50–700 Mo.
 */
export default function FunnelPlayer({
  src,
  title,
  poster,
  className = 'aspect-video',
  // Funnel posters Systeme.io ont déjà un play gravé. Les témoignages /vente, non.
  showPlay = false,
}) {
  const [active, setActive] = useState(false)
  if (!src) return null

  const playBtn = showPlay || !poster

  return (
    <div className={`relative ${className} w-full overflow-hidden rounded-2xl bg-noir shadow-lg`}>
      {active ? (
        <video
          className="absolute inset-0 h-full w-full"
          src={src}
          poster={poster}
          controls
          playsInline
          autoPlay
          preload="metadata"
        >
          Ton navigateur ne lit pas la vidéo.
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full bg-noir"
          aria-label={`Lire la vidéo : ${title}`}
        >
          {poster ? (
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className="absolute inset-0 bg-gradient-to-br from-corail/25 to-noir" />
          )}
          {playBtn && (
            <>
              {poster ? <span className="absolute inset-0 bg-noir/25" /> : null}
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-corail shadow-xl transition-transform group-hover:scale-110">
                <PlayIcon />
              </span>
            </>
          )}
        </button>
      )}
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function YoutubePlaceholder({ title }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-noir shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-corail/20 to-noir" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/12">
          <PlayIcon />
        </span>
        <p className="text-white/80 text-sm font-medium">
          {title ? `${title} — bientôt en ligne` : 'Vidéo bientôt disponible'}
        </p>
      </div>
    </div>
  )
}

/** Façade YouTube (nocookie) — chargé seulement au clic. `url` ou `id`. */
export function FunnelYoutube({ id, url, start = 0, title }) {
  const videoId = id || youtubeIdFrom(url)
  const [active, setActive] = useState(false)
  if (!videoId) return <YoutubePlaceholder title={title} />

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0${
    start ? `&start=${start}` : ''
  }`

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-noir shadow-lg">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Lire : ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-noir/35" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-corail shadow-xl transition-transform group-hover:scale-110">
            <PlayIcon />
          </span>
        </button>
      )}
    </div>
  )
}
