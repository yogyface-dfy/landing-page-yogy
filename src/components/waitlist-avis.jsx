import { SHOW_TRUSTPILOT } from '../lib/trustpilot'

const TP_GREEN = '#00B67A'

/** Sous-ensemble Trustpilot pour la confirmation — pas le catalogue vente. */
const AVIS = [
  {
    headline: 'Ma ride du lion devient presque invisible.',
    text: "Elle me dérangeait énormément. La différence la plus impressionnante est pour mes paupières. Laury est exceptionnelle.",
    name: 'Jeanne R.',
    link: 'https://www.trustpilot.com/reviews/6a008d013da13a0d8a16d222',
  },
  {
    headline: "J'ai l'impression d'avoir gagné 10 ans.",
    text: "En 6 mois de YoGyFace, un regard rajeuni et plus ouvert. Je me regarde avec joie dans le miroir.",
    name: 'Elisabeth — 66 ans',
    link: 'https://www.trustpilot.com/reviews/6a2a71cf6ece41f3321f45d1',
  },
  {
    headline: 'Bien plus efficace que les autres coachs en ligne.',
    text: "En 3 mois, mes poches sont moins marquées, ma mâchoire plus lisse et ma ride du lion a quasi disparu.",
    name: 'Aurore',
    link: 'https://www.trustpilot.com/reviews/6a2e78b79141ca5435afe805',
  },
  {
    headline: 'Une renaissance.',
    text: "Le botox m'avait créé de nouvelles problématiques — le yoga du visage a tout corrigé. J'ai repris totalement confiance en moi.",
    name: 'Carine',
    link: 'https://www.trustpilot.com/reviews/6a29584db820ab188088ce5e',
  },
  {
    headline: "Le miroir n'était plus mon ami.",
    text: "À 66 ans, je psychotais sur mes rides. J'avais déjà fait des injections — résultat éphémère. Autant dire que je suis scotchée.",
    name: 'Marie-Noëlle — 66 ans',
    link: 'https://www.trustpilot.com/reviews/6a8bfb8d973db1d60805acb8',
  },
  {
    headline: '100 % conquise par ce programme.',
    text: "Livres, tutos au hasard, gua sha… La qualité du programme et le fait que ce soit ultra personnalisé m'ont convaincue.",
    name: 'Camille — 35 ans',
    link: 'https://www.trustpilot.com/reviews/6a623b362ddab66529ca1592',
  },
]

function TpStars({ size = 14 }) {
  return (
    <span className="inline-flex gap-px" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="3" fill={TP_GREEN} />
          <path fill="#fff" d="M12 16.2l4.95 3-1.32-5.64L20 9.8l-5.76-.48L12 4 9.76 9.32 4 9.8l4.37 3.76L7.05 19.2z" />
        </svg>
      ))}
    </span>
  )
}

/** Grille d'avis Trustpilot — confirmation liste d'attente. */
export default function WaitlistAvis() {
  return (
    <section className="py-14 md:py-20 px-[5%] bg-creme">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <p className="flex items-center justify-center gap-2 text-sm text-noir mb-3">
            <TpStars size={16} />
            <span>
              Noté <strong>4.9/5</strong>
              {SHOW_TRUSTPILOT && (
                <>
                  {' '}sur{' '}
                  <a
                    href="https://fr.trustpilot.com/review/yogyface.fr"
                    target="_blank"
                    rel="noopener"
                    className="font-semibold underline"
                    style={{ color: TP_GREEN }}
                  >
                    Trustpilot
                  </a>
                </>
              )}
            </span>
          </p>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
            ELLES L'ONT
            <br />
            <span className="font-serif italic text-corail font-semibold">déjà vécu</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {AVIS.map((t) => {
            const Card = SHOW_TRUSTPILOT ? 'a' : 'div'
            const cardProps = SHOW_TRUSTPILOT
              ? { href: t.link, target: '_blank', rel: 'noopener' }
              : {}
            return (
            <Card
              key={t.link}
              {...cardProps}
              className="p-5 rounded-2xl bg-white border border-noir/8 text-left flex flex-col hover:border-[#00B67A]/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <TpStars />
                <span className="text-[11px] text-gris whitespace-nowrap">{t.name}</span>
              </div>
              <p className="font-semibold text-noir text-[15px] leading-snug mb-2">« {t.headline} »</p>
              <p className="text-gris text-[13px] leading-relaxed">{t.text}</p>
            </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
