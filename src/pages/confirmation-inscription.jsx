import FunnelPlayer from '../components/funnel-player'
import SEO from '../components/SEO'
import { CONFIRM_VIDEO_POSTER, CONFIRM_VIDEO_SRC, WHATSAPP_GROUP } from '../lib/funnel'

const STEPS = [
  {
    n: '1',
    t: 'Confirme ta présence à Jeanne',
    d: 'Mon assistante te contacte sur WhatsApp — une dernière étape pour valider ta participation.',
  },
  {
    n: '2',
    t: 'Regarde la vidéo jusqu’au bout',
    d: 'Elle te prépare à l’atelier.',
  },
  {
    n: '3',
    t: 'Rejoins le groupe WhatsApp VIP',
    d: "Cadeaux avant l'atelier, et tes questions pour que je les aborde en live — ici seulement.",
  },
]

export default function ConfirmationInscription() {
  return (
    <>
      <SEO
        title="Inscription confirmée — Atelier"
        description="Dernière étape : confirme ta présence, regarde la vidéo, rejoins le WhatsApp VIP."
        path="/confirmation-inscription"
        noindex
      />

      <section className="relative pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[640px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corail/8 text-corail text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
            Inscription reçue
          </div>
          <h1 className="font-display text-[clamp(2rem,6vw,3.4rem)] font-black leading-[0.95] tracking-tighter text-noir mb-4">
            FÉLICITATIONS
            <br />
            <span className="font-serif italic text-corail font-semibold">
              pour ton inscription.
            </span>
          </h1>
          <p className="text-gris text-[15px] leading-relaxed mb-8">
            Il te reste une dernière étape pour valider ta participation.
          </p>

          <a
            href={WHATSAPP_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp btn-bounce justify-center text-sm px-6 py-3.5 w-full sm:w-auto mb-8"
          >
            Rejoindre le WhatsApp VIP
          </a>

          <div className="text-left space-y-3 mb-8">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="flex gap-4 p-4 rounded-2xl bg-white border border-noir/5 shadow-sm"
              >
                <span className="w-8 h-8 shrink-0 rounded-lg bg-corail text-white flex items-center justify-center font-display font-black text-sm">
                  {s.n}
                </span>
                <div>
                  <p className="font-medium text-sm text-noir">{s.t}</p>
                  <p className="text-gris text-[13px] leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <FunnelPlayer
            src={CONFIRM_VIDEO_SRC}
            poster={CONFIRM_VIDEO_POSTER}
            title="Prépare l'atelier"
            showPlay
          />
        </div>
      </section>
    </>
  )
}
