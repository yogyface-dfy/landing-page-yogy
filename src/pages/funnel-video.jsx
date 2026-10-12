import { Link, useLocation } from 'react-router-dom'
import FunnelPlayer from '../components/funnel-player'
import SEO from '../components/SEO'
import FunnelLiveDate from '../components/funnel-live-date'
import { VIDEOS, WEBI_URL, WHATSAPP_GROUP, videoFromPath } from '../lib/funnel'

function LockIcon({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {open ? (
        <path d="M7 11V8a5 5 0 0 1 9.5-2M7 11h10v10H7z" />
      ) : (
        <path d="M7 11V8a5 5 0 0 1 10 0v3M7 11h10v10H7z" />
      )}
    </svg>
  )
}

function VideoThumb({ video, locked, active }) {
  const n = Number(video.slug)
  const body = (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5">
        Vidéo #{n}
      </p>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-noir">
        <img
          src={video.poster}
          alt=""
          className={`h-full w-full object-cover ${locked ? 'blur-[3px] scale-105' : ''}`}
        />
      </div>
      <p
        className={`mt-1.5 flex items-center justify-center gap-1 text-[11px] ${
          locked ? 'text-gris/50' : 'text-corail'
        }`}
      >
        <LockIcon open={!locked} />
        {locked ? (
          <>
            <span className="lg:hidden">Bientôt</span>
            <span className="hidden lg:inline">Bientôt disponible</span>
          </>
        ) : (
          'Disponible'
        )}
      </p>
    </>
  )

  if (locked) {
    return <div className="text-center text-gris/60">{body}</div>
  }

  return (
    <Link
      to={video.path}
      className={`block text-center ${active ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
    >
      {body}
    </Link>
  )
}

export default function FunnelVideo() {
  const { pathname } = useLocation()
  const current = videoFromPath(pathname)
  const idx = VIDEOS.findIndex((v) => v.slug === current.slug)

  return (
    <>
      <SEO
        title={`Vidéo ${current.slug} — ${current.title}`}
        description={current.title}
        path={current.path}
        noindex
      />

      <section className="relative pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir text-white text-[11px] font-semibold uppercase tracking-widest">
              <span className="live-dot" aria-hidden="true" />
              Coaching live · <FunnelLiveDate />
            </div>
          </div>

          <h1 className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-black leading-[1.05] tracking-tighter text-noir text-center lg:text-left mb-4">
            <span className="text-corail">Vidéo {Number(current.slug)} :</span> {current.title}
          </h1>
          <div className="grid lg:grid-cols-[1fr_200px] gap-8 items-center">
            <FunnelPlayer src={current.src} title={current.title} poster={current.poster} />
            {/* Drip : net si déjà débloqué ce jour-là, flou sinon. */}
            <ol className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-5">
              {VIDEOS.map((v, i) => (
                <li key={v.slug}>
                  <VideoThumb video={v} locked={i > idx} active={v.slug === current.slug} />
                </li>
              ))}
            </ol>
          </div>
          {idx < VIDEOS.length - 1 && (
            <p className="mt-4 text-center lg:text-left text-sm text-gris">
              Demain je t'envoie la prochaine vidéo
            </p>
          )}

          <div className="mt-12">
            <h2 className="font-display text-[clamp(1.2rem,3vw,1.6rem)] font-black tracking-tight text-noir text-center mb-5">
              N'oublie pas, pour finaliser ton inscription,{' '}
              <span className="font-serif italic text-corail font-semibold">
                ces deux étapes
              </span>
            </h2>
            <ol className="grid gap-3">
              <li className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-white border border-noir/8 p-4 md:p-5 shadow-sm">
                <span className="w-10 h-10 shrink-0 rounded-full bg-corail text-white flex items-center justify-center font-display font-black">
                  1
                </span>
                <p className="flex-1 text-[15px] text-noir leading-relaxed">
                  <strong>Rejoins le groupe WhatsApp privé</strong> (100% gratuit).
                  Tu auras l'occasion de prendre déjà conscience de ton visage.
                </p>
                <a
                  href={WHATSAPP_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp btn-pulse justify-center text-sm px-5 py-3 w-full sm:w-auto shrink-0"
                >
                  Rejoindre WhatsApp
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-white border border-noir/8 p-4 md:p-5 shadow-sm">
                <span className="w-10 h-10 shrink-0 rounded-full bg-corail text-white flex items-center justify-center font-display font-black">
                  2
                </span>
                <p className="flex-1 text-[15px] text-noir leading-relaxed">
                  <strong>Connecte-toi à ton espace perso</strong> — prépare
                  l'atelier, découvre des exos en avant-première, et gagne des
                  cadeaux.
                </p>
                <a
                  href={WEBI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-corail btn-pulse justify-center text-sm px-5 py-3 w-full sm:w-auto shrink-0"
                >
                  Mon espace perso
                </a>
              </li>
            </ol>
          </div>

        </div>
      </section>
    </>
  )
}
