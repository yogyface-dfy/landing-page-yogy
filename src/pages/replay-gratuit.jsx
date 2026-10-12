import { Link } from 'react-router-dom'
import FunnelPlayer from '../components/funnel-player'
import SEO from '../components/SEO'
import { REPLAY_VIDEO_SRC } from '../lib/funnel'

export default function ReplayGratuit() {
  return (
    <>
      <SEO
        title="Replay gratuit — Atelier YoGyFace"
        description="Replay à durée limitée. Reprends le contrôle sur ton vieillissement cutané, sans crème miracle ni chirurgie."
        path="/replay-gratuit"
        noindex
      />

      <section className="relative pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[720px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corail/8 text-corail text-xs font-semibold mb-5">
            Replay à durée limitée
          </div>
          <h1 className="font-display text-[clamp(1.85rem,6vw,3.4rem)] font-black leading-[0.95] tracking-tighter text-noir mb-4">
            REPRENDS LE CONTRÔLE
            <br />
            <span className="font-serif italic text-corail font-semibold">
              de ton vieillissement.
            </span>
          </h1>
          <p className="text-gris text-[15px] leading-relaxed mb-8">
            Sans crème miracle. Sans chirurgie. En 8 minutes par jour.
          </p>

          {REPLAY_VIDEO_SRC ? (
            <div className="mb-8">
              <FunnelPlayer src={REPLAY_VIDEO_SRC} title="Replay de l'atelier" />
            </div>
          ) : (
            <p className="text-gris text-sm mb-8">
              Le lien du replay t'est envoyé par email après l'atelier.
            </p>
          )}

          <Link to="/vente" className="btn-corail inline-flex text-sm md:text-base px-8 py-3.5">
            Rejoindre le programme
          </Link>
        </div>
      </section>
    </>
  )
}
