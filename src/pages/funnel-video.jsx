import { Link, useLocation } from 'react-router-dom'
import FunnelPlayer from '../components/funnel-player'
import SEO from '../components/SEO'
import FunnelLiveDate from '../components/funnel-live-date'
import { VIDEOS, WEBI_URL, WHATSAPP_GROUP, videoFromPath } from '../lib/funnel'

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
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir text-white text-[11px] font-semibold uppercase tracking-widest mb-4">
              Coaching live · <FunnelLiveDate />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-corail mb-2">
              Vidéo {current.slug}
            </p>
            <h1 className="font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-black leading-[1] tracking-tighter text-noir">
              {current.title}
            </h1>
          </div>

          <FunnelPlayer src={current.src} title={current.title} />

          {idx < VIDEOS.length - 1 && (
            <p className="text-center text-gris text-sm mt-4">
              Demain je t'envoie la prochaine vidéo.
            </p>
          )}

          <ol className="mt-8 grid gap-2">
            {VIDEOS.map((v, i) => {
              const locked = i > idx
              const active = v.slug === current.slug
              return (
                <li key={v.slug}>
                  {locked ? (
                    <p className="flex items-center justify-between rounded-2xl border border-noir/8 bg-white/60 px-4 py-3 text-sm text-gris/50">
                      <span>
                        Vidéo #{v.slug} · {v.title}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider">Bientôt</span>
                    </p>
                  ) : (
                    <Link
                      to={v.path}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                        active
                          ? 'border-corail bg-corail/8 text-noir font-medium'
                          : 'border-noir/8 bg-white text-noir hover:border-corail/40'
                      }`}
                    >
                      <span>
                        Vidéo #{v.slug} · {v.title}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-corail">
                        Disponible
                      </span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>

          {current.slug === '01' && (
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <a
                href={WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-corail justify-center text-sm px-5 py-3.5"
              >
                Groupe WhatsApp privé
              </a>
              <a
                href={WEBI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary justify-center text-sm px-5 py-3.5"
              >
                Ton espace perso
              </a>
            </div>
          )}

          {current.slug === '03' && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/replay-gratuit" className="btn-secondary justify-center text-sm px-6 py-3.5">
                Voir le replay
              </Link>
              <Link to="/vente" className="btn-corail justify-center text-sm px-6 py-3.5">
                Découvrir le programme
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
