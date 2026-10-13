import { Link } from 'react-router-dom'
import FunnelFooter from '../components/funnel-footer'
import { FunnelYoutube } from '../components/funnel-player'
import SEO from '../components/SEO'
import { LIVE_BONUSES } from '../lib/funnel'

export default function BonusLive() {
  return (
    <>
      <SEO
        title="Tes bonus — Live YoGyFace"
        description="Les 3 bonus du live : rééducation du front, routine SCM, théorie des muscles."
        path="/bonus-live"
        noindex
      />

      <section className="relative pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corail/8 text-corail text-xs font-semibold mb-5">
              Offert après le live
            </div>
            <h1 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-black leading-[0.95] tracking-tighter text-noir">
              TES BONUS
            </h1>
          </div>

          <div className="grid gap-12">
            {LIVE_BONUSES.map((b) => (
              <article key={b.n}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-corail mb-2">
                  Bonus {b.n}
                </p>
                <h2 className="font-display text-[clamp(1.25rem,3vw,1.7rem)] font-black leading-tight tracking-tight text-noir mb-4">
                  {b.title}
                </h2>
                <FunnelYoutube id={b.youtubeId} title={b.title} />
              </article>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/vente" className="btn-corail inline-flex text-sm md:text-base px-8 py-3.5">
              Studio : Découvrir la Méthode YoGyFace Studio
            </Link>
          </div>
        </div>
      </section>

      <FunnelFooter />
    </>
  )
}
