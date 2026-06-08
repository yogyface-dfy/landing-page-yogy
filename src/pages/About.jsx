import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const steps = [
  {
    num: '01',
    title: 'MON HISTOIRE',
    text: 'Pendant des années, j\'ai lutté contre le relâchement du bas du visage, des sillons nasogéniens marqués, un teint terne. J\'ai tout testé : sérums à 150€, appareils high-tech, routines en 12 étapes. Mon visage ne changeait pas vraiment.',
    image: null,
  },
  {
    num: '02',
    title: 'LE DÉCLIC',
    text: 'Puis une évidence : notre visage est composé de 57 muscles. Et comme n\'importe quel muscle du corps, ils ont besoin d\'être entraînés. J\'ai compris que personne ne m\'avait jamais appris à utiliser mon propre visage.',
    image: null,
  },
  {
    num: '03',
    title: 'LA RECHERCHE',
    text: 'J\'ai formé les équipes des plus grandes maisons cosmétiques. Puis j\'ai développé ma propre méthodologie — RESET™ — une reprogrammation neuro-faciale complète basée sur l\'anatomie et la neurologie. Pas du yoga du visage classique.',
    image: '/laury-biotherm.png',
    imageAlt: 'Laury en conférence pour Biotherm',
  },
  {
    num: '04',
    title: 'AUJOURD\'HUI',
    text: 'Plus de 1 500 femmes m\'ont fait confiance. Je crée chaque programme à la main, personnalisé pour chaque visage. Mon objectif : te donner l\'autonomie totale pour les 20 prochaines années.',
    image: null,
  },
]

const experts = [
  { role: 'Biologiste', icon: 'microscope', desc: 'Pour l\'approche scientifique du vieillissement cellulaire et de la production de collagène.' },
  { role: 'Praticien EFT', icon: 'brain', desc: 'Pour libérer les tensions émotionnelles qui se cristallisent sur le visage (mâchoire, front, cou).' },
  { role: 'Spécialiste Face Tape', icon: 'scissors', desc: 'Pour corriger la posture faciale entre les séances avec des techniques de taping ciblées.' },
  { role: 'Expert Collagène', icon: 'pill', desc: 'Pour optimiser la nutrition et maximiser la production de collagène naturel.' },
  { role: 'Coach Yoga Corps', icon: 'lotus', desc: 'Pour une approche globale corps-visage : les tensions du corps se lisent sur le visage.' },
]

const laury_quotes = [
  { q: '"J\'ai créé YoGyFace parce que je voulais une méthode qui m\'appartient — pas un énième cours de yoga du visage copié-collé. Chaque programme est fait main, par moi."' },
  { q: '"Je vais t\'expliquer toutes les causes qui abîment ton visage et surtout leurs solutions que tu peux adopter !"' },
  { q: '"Mon objectif, c\'est que tu passes d\'une femme qui subit son vieillissement à une femme qui maîtrise parfaitement son apparence et vieillit avec grâce selon SES propres règles."' },
]

const parcoursPhotos = [
  { src: '/laury-narumi.png', alt: 'Laury avec Era Narumi — échange d\'expertise' },
  { src: '/laury-sylvie.png', alt: 'Laury — certification yoga du visage avec Sylvie LeFranc' },
  { src: '/laury-fumiko.png', alt: 'Laury — formation avec Fumiko Takatsu' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/20 via-white to-white pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-corail/8 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-bleu/10 rounded-full blur-3xl pointer-events-none animate-float-slow hidden md:block" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="animate-on-scroll section-badge" data-anim="fade" data-delay="100">Fondatrice</div>
              <div className="animate-on-scroll" data-anim="scale" data-delay="200">
                <h1 className="font-display text-[clamp(2.2rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
                  MON
                </h1>
                <h1 className="font-serif italic text-[clamp(1.8rem,6vw,4rem)] text-corail/70 font-semibold mb-4 md:mb-6">
                  Parcours
                </h1>
              </div>
              <p className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed max-w-md" data-delay="400">
                Je suis Laury, fondatrice de YoGyFace. Ce qui a commencé comme une quête personnelle face à mon miroir est devenu une méthode qui transforme des centaines de visages — naturellement.
              </p>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="animate-on-scroll relative w-full max-w-[280px] md:max-w-[480px]" data-anim="scale" data-delay="300">
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-corail/10 via-rose/20 to-bleu/10 rounded-3xl blur-3xl pointer-events-none animate-pulse-soft hidden md:block" />
                <div className="absolute -top-3 -right-3 w-16 md:w-20 h-16 md:h-20 border-2 border-corail/15 rounded-2xl pointer-events-none hidden sm:block" />
                <div className="absolute -bottom-3 -left-3 w-20 md:w-28 h-20 md:h-28 border-2 border-bleu/15 rounded-2xl pointer-events-none hidden sm:block" />
                <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/laury-expertise.png"
                    alt="Laury — expertise en anatomie faciale et yoga du visage"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story steps */}
      <section className="py-16 md:py-24 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-bleu/15 rounded-full blur-3xl pointer-events-none hidden md:block" />

        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="animate-on-scroll card-hover bg-white rounded-2xl p-6 md:p-8 border border-noir/5"
                data-anim={i % 2 === 0 ? 'left' : 'right'}
                data-delay={`${i * 100}`}
              >
                <p className="font-display font-black text-4xl md:text-5xl text-corail/15 leading-none mb-3 md:mb-4">{s.num}</p>
                <h3 className="font-display font-black text-base md:text-lg tracking-tight text-noir mb-2 md:mb-3">{s.title}</h3>
                <p className="text-gris text-[14px] md:text-[15px] leading-relaxed">{s.text}</p>
                {s.image && (
                  <div className="mt-4 md:mt-5 img-zoom rounded-xl overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photos parcours — Slide 54 */}
      <section className="py-16 md:py-24 px-[5%] bg-white relative overflow-hidden">
        <div className="absolute top-12 right-12 w-40 h-40 opacity-[0.03] pointer-events-none hidden md:block"
          style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-on-scroll" data-anim="scale">
            <div className="section-badge justify-center">Formations & rencontres</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-1">
              MES
            </h2>
            <h2 className="font-serif italic text-[clamp(1.5rem,4vw,2.5rem)] text-corail font-semibold mb-3 md:mb-4">
              Inspirations
            </h2>
            <p className="text-gris text-[14px] md:text-[16px] mt-3 md:mt-4 max-w-xl mx-auto">
              J'ai eu la chance d'apprendre auprès des meilleures expertes du yoga du visage et du bien-être. Chaque rencontre a nourri ma méthode.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {parcoursPhotos.map((photo, i) => (
              <div
                key={photo.src}
                className="animate-on-scroll img-zoom card-hover rounded-2xl overflow-hidden border border-noir/5 hover:border-corail/15"
                data-anim="scale"
                data-delay={`${i * 150}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto"
                />
                <div className="p-3 md:p-4 bg-white">
                  <p className="text-gris text-xs md:text-sm">{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laury quotes */}
      <section className="py-16 md:py-24 px-[5%] bg-noir text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-corail/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Photo Laury souriante */}
            <div className="animate-on-scroll relative overflow-hidden" data-anim="fade" data-delay="100">
              <div className="absolute -inset-4 bg-corail/5 rounded-3xl blur-2xl pointer-events-none hidden md:block" />
              <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="/laury-livres.png"
                  alt="Laury — passionnée de science et d'anatomie faciale"
                  className="w-full h-auto"
                />
              </div>
            </div>
            {/* Quotes */}
            <div className="space-y-6 md:space-y-8">
              {laury_quotes.map((q, i) => (
                <div
                  key={i}
                  className="animate-on-scroll border-l-2 border-corail/50 pl-4 md:pl-6 py-2"
                  data-anim="fade"
                  data-delay={`${i * 150 + 200}`}
                >
                  <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed font-serif italic">{q.q}</p>
                  <p className="text-corail text-sm font-semibold mt-2 md:mt-3">— Laury</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="py-16 md:py-28 px-[5%] bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-on-scroll" data-anim="scale">
            <div className="section-badge justify-center">Mon équipe d'experts</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-1">
              UNE APPROCHE
            </h2>
            <h2 className="font-serif italic text-[clamp(1.5rem,4vw,2.5rem)] text-corail font-semibold mb-3 md:mb-4">
              vraiment holistique
            </h2>
            <p className="text-gris text-[14px] md:text-[16px] mt-3 md:mt-4 max-w-xl mx-auto">
              YoGyFace n'est pas un cours de yoga du visage. J'ai réuni des experts qui travaillent avec moi pour s'attaquer à chaque cause du vieillissement facial.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {experts.map((e, i) => (
              <div
                key={e.role}
                className={`animate-on-scroll card-hover text-center p-4 md:p-6 rounded-2xl border border-noir/5 hover:border-corail/20 group ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                data-anim="scale"
                data-delay={`${i * 80}`}
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-corail/10 flex items-center justify-center text-corail mb-2 md:mb-3 mx-auto group-hover:bg-corail group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <Icon name={e.icon} size={20} />
                </div>
                <h4 className="font-display font-black text-xs md:text-sm tracking-tight mb-1 md:mb-2">{e.role}</h4>
                <p className="text-gris text-[11px] md:text-xs leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key differentiator block */}
      <section className="py-16 md:py-24 px-[5%] bg-creme">
        <div className="max-w-[900px] mx-auto">
          <div className="animate-on-scroll card-hover bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-noir/5" data-anim="scale">
            <div className="section-badge">Quelle différence avec les concurrents ?</div>
            <h2 className="font-display font-black text-xl md:text-2xl tracking-tight text-noir mb-4 md:mb-6">
              YoGyFace RESET vs. les autres programmes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-gris font-semibold text-sm uppercase tracking-wider mb-3 md:mb-4">Les autres</h3>
                {['Exercices génériques non personnalisés', 'Aucun diagnostic préalable', 'Vidéos pré-enregistrées sans suivi', 'Yoga du visage basique', 'Aucun expert tiers'].map(item => (
                  <div key={item} className="flex items-start gap-3 mb-2 md:mb-3">
                    <span className="text-gris/30 text-sm mt-0.5">✗</span>
                    <span className="text-gris text-xs md:text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-corail font-semibold text-sm uppercase tracking-wider mb-3 md:mb-4">YoGyFace RESET™</h3>
                {[
                  'Diagnostic 130 points + programme sur-mesure',
                  'Reprogrammation neuro-faciale (pas du yoga classique)',
                  '12 coachings live avec moi sur 6 mois',
                  'Équipe de 5 experts spécialisés',
                  'Autonomie totale — gestes automatiques à vie',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 mb-2 md:mb-3">
                    <span className="text-corail text-sm mt-0.5">✓</span>
                    <span className="text-noir text-xs md:text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-[5%] bg-noir text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-corail/8 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />

        <div className="max-w-xl mx-auto relative z-10 animate-on-scroll" data-anim="scale">
          <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-black tracking-tighter mb-2">
            PRÊTE À
          </h2>
          <h2 className="font-serif italic text-[clamp(1.5rem,4vw,2.5rem)] text-corail font-semibold mb-4 md:mb-6">
            commencer ?
          </h2>
          <p className="text-white/50 mb-6 md:mb-8 text-[14px] md:text-[16px]">Inscris-toi sur la liste d'attente pour être prévenue dès qu'une place se libère.</p>
          <Link to="/vip" className="btn-corail text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4">
            Rejoindre la liste d'attente →
          </Link>
        </div>
      </section>
    </>
  )
}
