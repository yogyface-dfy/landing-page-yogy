/**
 * Showcase de la plateforme V2 — captures réelles, layout type « info + mockups ».
 */
const FEATURES = [
  {
    kicker: 'Exercices',
    title: 'Guidés. Pas à pas. Hors ligne.',
    desc: 'Chaque geste a sa fiche : quoi faire, quoi éviter, combien de temps, quelle zone. Tu télécharges, tu pratiques — même sans réseau.',
    points: ['Vidéo + fiche pas à pas', 'À faire / à éviter, répétitions, zone', 'Téléchargeables hors ligne'],
    desktop: '/app/desktop-exercices.png',
    mobile: '/app/mobile-exercice.png',
    mobile2: '/app/mobile-exercice-fiche.png',
    alt: 'Plateforme YoGyFace — exercices guidés',
  },
  {
    kicker: 'Suivi',
    title: 'Tes photos. Ton autonomie. Tes paliers.',
    desc: 'Compare tes visages mois après mois, suis tes notes /10, et remplis tes questionnaires au bon moment — plus besoin de te demander si ça avance.',
    points: ['Comparaison face / profils par palier', 'Radar d\'autonomie (tensions, habitudes, mimiques…)', 'Suivis 1, 2, 3 mois — et la suite'],
    desktop: '/app/desktop-suivi.png',
    mobile: '/app/mobile-suivi.png',
    alt: 'Plateforme YoGyFace — écran de suivi',
    flip: true,
  },
  {
    kicker: 'Coaching',
    title: 'Les lives, le calendrier, les replays.',
    desc: 'Tu t\'inscris en un clic, tu ajoutes à ton agenda, tu retrouves tes séances. FAQ avec Laury, lives thématiques, 1-1 — tout est au même endroit.',
    points: ['Réservation des lives avec places restantes', 'Inscrite / désinscription / calendrier', 'Replays filtrés par mois, coach, thème'],
    desktop: '/app/desktop-coaching.png',
    mobile: '/app/mobile-coaching.png',
    alt: 'Plateforme YoGyFace — coaching et lives',
  },
  {
    kicker: 'Cosmétique',
    title: 'Ta routine, pas celle de tout le monde.',
    desc: 'Les produits sont rangés par étape. Ce qui est cerné de vert correspond à TES problématiques — tu n\'achètes plus au hasard.',
    points: ['Recommandé selon ton diagnostic', 'Filtres marques et budget', 'Démaquillage, soins, le soir comme le matin'],
    desktop: '/app/desktop-cosmetique.png',
    mobile: '/app/mobile-cosmetique.png',
    alt: 'Plateforme YoGyFace — routine cosmétique',
    flip: true,
  },
  {
    kicker: 'Messagerie',
    title: 'Tu écris. On te répond. Tout de suite.',
    desc: 'Messagerie instantanée avec Laury et l\'équipe — plus besoin d\'attendre un mail. Les notifications te préviennent dès qu\'il y a un retour, un live, ou un suivi à faire.',
    points: ['Chat en direct, fils par sujet', 'Notifications instantanées (cloche + pastilles)', 'Retours de Laury, diagnostic, paliers — rien ne se perd'],
    desktop: '/app/desktop-messages.png',
    mobile: '/app/mobile-messages.png',
    mobile2: '/app/mobile-notifications.png',
    alt: 'Plateforme YoGyFace — messagerie et notifications',
  },
]

function BrowserFrame({ src, alt }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-[0_24px_60px_rgba(26,26,26,0.10)] border border-noir/6">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F3EEEA]">
        <span className="w-2 h-2 rounded-full bg-noir/15" />
        <span className="w-2 h-2 rounded-full bg-noir/15" />
        <span className="w-2 h-2 rounded-full bg-noir/15" />
      </div>
      <img src={src} alt={alt} className="w-full h-auto block" />
    </div>
  )
}

function FeatureMock({ f }) {
  if (!f.desktop && f.mobile) {
    return (
      <div className="relative flex justify-center items-end min-h-[280px] md:min-h-[340px]">
        <img src={f.mobile} alt={f.alt} className="w-[42%] max-w-[160px] relative z-10 drop-shadow-lg" />
        {f.mobile2 && (
          <img src={f.mobile2} alt="" className="w-[36%] max-w-[140px] absolute right-[12%] bottom-0 drop-shadow-md -rotate-3" />
        )}
      </div>
    )
  }

  return (
    <div className="relative pr-6 md:pr-10 pb-6">
      <BrowserFrame src={f.desktop} alt={f.alt} />
      <img
        src={f.mobile}
        alt=""
        className="absolute -bottom-1 -right-1 md:-right-3 w-[22%] max-w-[112px] drop-shadow-lg z-10"
      />
      {f.mobile2 && (
        <img
          src={f.mobile2}
          alt=""
          className="absolute -bottom-3 right-[18%] md:right-[20%] w-[18%] max-w-[96px] drop-shadow-md -rotate-3"
        />
      )}
    </div>
  )
}

export default function VentePlateforme() {
  return (
    <section className="py-14 md:py-20 px-[5%] bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="section-badge justify-center">La plateforme</div>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
            TOUT EST LÀ.
            <br />
            <span className="font-serif italic text-corail font-semibold">Sur téléphone comme sur ordi.</span>
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {FEATURES.map((f) => (
            <div
              key={f.kicker}
              className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${f.flip ? 'md:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="text-left">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-corail mb-2">{f.kicker}</p>
                <h3 className="font-display font-black text-[1.35rem] md:text-2xl tracking-tight text-noir mb-3">{f.title}</h3>
                <p className="text-gris text-[14px] md:text-[15px] leading-relaxed mb-5">{f.desc}</p>
                <ul className="space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[14px] text-noir/80">
                      <span className="text-corail mt-0.5">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <FeatureMock f={f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
