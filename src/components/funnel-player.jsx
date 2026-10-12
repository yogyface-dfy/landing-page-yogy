import { useState } from 'react'

/**
 * Lecteur landscape (façade play, puis <video>).
 * preload=metadata : les fichiers Systeme.io font 50–700 Mo.
 */
export default function FunnelPlayer({ src, title }) {
  const [active, setActive] = useState(false)
  if (!src) return null

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-noir shadow-lg">
      {active ? (
        <video
          className="absolute inset-0 h-full w-full"
          src={src}
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
          <span className="absolute inset-0 bg-gradient-to-br from-corail/25 to-noir" />
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
