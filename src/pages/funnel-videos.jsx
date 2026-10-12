import FunnelFooter from '../components/funnel-footer'
import FunnelLiveDate from '../components/funnel-live-date'
import FunnelPlayer from '../components/funnel-player'
import SEO from '../components/SEO'
import { VIDEOS } from '../lib/funnel'

export default function FunnelVideos() {
  return (
    <>
      <SEO
        title="Tes 3 vidéos bonus"
        description="Les 3 vidéos bonus de l'atelier : lobbies, mission de vie, motivation."
        path="/video-123"
        noindex
      />

      <section className="relative pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir text-white text-[11px] font-semibold uppercase tracking-widest mb-4">
              <span className="live-dot" aria-hidden="true" />
              Coaching live · <FunnelLiveDate />
            </div>
            <h1 className="font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-black leading-[1] tracking-tighter text-noir">
              Tes 3 vidéos bonus
            </h1>
          </div>

          <div className="grid gap-12">
            {VIDEOS.map((v) => (
              <article key={v.slug}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-corail mb-2">
                  Vidéo {v.slug}
                </p>
                <h2 className="font-display text-[clamp(1.25rem,3vw,1.7rem)] font-black leading-tight tracking-tight text-noir mb-4">
                  {v.title}
                </h2>
                <FunnelPlayer src={v.src} title={v.title} poster={v.poster} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <FunnelFooter />
    </>
  )
}
