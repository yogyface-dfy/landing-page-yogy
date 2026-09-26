import { useState } from 'react'

/**
 * Lecteur local (même façade que YouTubeEmbed : poster + play, puis <video>).
 * Les tutos sont en portrait (540×1174).
 */
export default function AppVideo({ src, poster, title }) {
  const [active, setActive] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl bg-noir shadow-lg aspect-[540/1174]">
      {active ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
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
          className="group absolute inset-0 h-full w-full"
          aria-label={`Lire la vidéo : ${title}`}
        >
          <img
            src={poster}
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
