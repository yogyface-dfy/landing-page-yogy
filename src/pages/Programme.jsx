import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const phases = [
  {
    week: 'Phase 1 · Semaines 1–4',
    title: 'Diagnostic & Fondations',
    desc: 'Bilan révélateur de 130 points : déséquilibres musculaires, zones de perte de volume, ralentissements circulatoires. Ordonnance beauté sur-mesure + introduction aux mouvements fondamentaux (10 min/jour maximum).',
    tag: 'Ancrage progressif'
  },
  {
    week: 'Phase 2 · Semaines 5–8',
    title: 'Reprogrammation Active',
    desc: 'Activation de la densification musculaire ciblée. Travail de posture faciale et cervicale (tenir sa fourchette droite pour ne pas creuser le cou). Premiers exercices de drainage lymphatique.',
    tag: 'Muscle & Posture'
  },
  {
    week: 'Phase 3 · Semaines 9–16',
    title: 'Stimulation Tissulaire',
    desc: 'Stimulation tissulaire active pour relancer la production de collagène. Techniques de relaxation neuro-faciale pour libérer les tensions de la mâchoire, des trapèzes et du cou qui "tirent" le visage vers le bas.',
    tag: 'Collagène & Détente'
  },
  {
    week: 'Phase 4 · Semaines 17–24',
    title: 'Tonification & Autonomie',
    desc: 'Renforcement musculaire avancé des 57 muscles. Ta routine personnalisée finale est maîtrisée. Les gestes deviennent automatiques — comme te laver les dents, mais pour rester jeune. Accès à la bibliothèque de 160+ exercices.',
    tag: 'Autonomie à vie'
  },
]

const included = [
  { icon: 'microscope', title: 'Diagnostic Révélateur 130 points', desc: 'Analyse individuelle des déséquilibres musculaires, zones de perte de volume et ralentissements circulatoires. Plan d\'action sur-mesure adapté à TON visage.' },
  { icon: 'phone', title: 'Programme dans l\'app', desc: 'Accès à ta routine personnalisée, bibliothèque de 160+ exercices, vidéos guidées et e-books. Accessible 24h/7j depuis téléphone, tablette ou ordinateur.' },
  { icon: 'video', title: '12 Coachings Live avec Laury', desc: '12 sessions live (FAQ + thématiques) réparties sur 6 mois. Laury analyse, corrige, répond. Ce n\'est pas des vidéos pré-enregistrées — elle est vraiment là.' },
  { icon: 'users', title: 'Communauté WhatsApp Privée', desc: 'Groupe de femmes qui se soutiennent mutuellement. Partage d\'expériences, motivation collective, soutien lors des baisses — Laury y est présente aussi.' },
  { icon: 'graduation', title: 'Interventions d\'Experts', desc: 'Sessions avec le biologiste, le praticien EFT, la spécialiste face tape et l\'expert collagène. Une approche holistique qu\'aucun autre programme n\'offre.' },
  { icon: 'infinity', title: 'Routine Personnalisée à Vie', desc: 'Ta routine sur-mesure reste accessible à vie. La bibliothèque d\'exercices et les replays sont accessibles 12 mois. Option de prolongation à tarif réduit.' },
]

const bonuses = [
  'Facetaping (front & ride du lion)',
  'Yoga Respiration, Méditation & Étirement',
  'Routine EFT (libération émotionnelle)',
  'Méthode P.E.A.U alimentation & collagène',
  'Quel collagène choisir ?',
  'Suivi de routine imprimable',
  'Glossaire de 160 exercices',
  '4 règles de nettoyage du visage',
  '4 secrets de longévité (Zones Bleues)',
  'Actifs cosmétiques expliqués',
  'Médecine chinoise & visage',
  'Do & Don\'t du yoga du visage',
  'Journal de bord du sommeil',
  'Checklist des bonnes habitudes',
  '10 règles d\'or pour réussir',
]

export default function Programme() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-40 pb-16 md:pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bleu/20 via-white to-white pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-corail/8 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="animate-on-scroll section-badge" data-anim="fade" data-delay="100">Méthode RESET™</div>
              <div className="animate-on-scroll" data-delay="200">
                <h1 className="font-display text-[clamp(2rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
                  TON PROGRAMME
                </h1>
                <h1 className="font-serif italic text-[clamp(1.5rem,5vw,3.5rem)] text-corail font-semibold mb-4 md:mb-6">
                  100% personnalisé
                </h1>
              </div>
              <p className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed mb-3 md:mb-4" data-delay="300">
                6 mois pour reprendre le contrôle total de ton vieillissement facial. En libérant les tensions, corrigeant la posture et activant les bons muscles, tes traits se liftent, ta peau paraît plus fraîche et tout ton visage reprend vie.
              </p>
              <p className="animate-on-scroll text-gris/70 text-[13px] md:text-[15px] font-serif italic mb-6 md:mb-8" data-delay="400">
                Avec 10 minutes par jour, tu verras un vrai changement — et ton entourage aussi.
              </p>
              <div className="animate-on-scroll flex flex-col sm:flex-row gap-3" data-delay="500">
                <Link to="/vip" className="btn-primary text-sm md:text-base px-6 md:px-7 py-3 md:py-3.5 text-center">
                  Rejoindre la liste d'attente →
                </Link>
                <a href="#programme-detail" className="btn-secondary text-sm md:text-base px-6 md:px-7 py-3 md:py-3.5 text-center">
                  Voir le programme
                </a>
              </div>
            </div>
            {/* Photo massage — shown first on mobile */}
            <div className="flex justify-center md:justify-end animate-on-scroll order-1 md:order-2" data-anim="scale" data-delay="300">
              <div className="relative w-full max-w-[280px] md:max-w-[420px]">
                <div className="absolute -inset-4 bg-gradient-to-br from-bleu/15 to-rose/15 rounded-3xl blur-2xl pointer-events-none opacity-60 hidden md:block" />
                <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                  <img
                    src="/laury-massage.png"
                    alt="Laury — geste de massage facial, relaxation des tempes"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme timeline */}
      <section id="programme-detail" className="py-16 md:py-28 px-[5%] bg-white relative overflow-hidden">
        <div className="absolute top-12 left-12 w-40 h-40 opacity-[0.03] pointer-events-none hidden md:block"
          style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12 md:mb-20 animate-on-scroll" data-anim="scale">
            <div className="section-badge justify-center">Les 4 phases</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-1">
              6 MOIS DE
            </h2>
            <h2 className="font-serif italic text-[clamp(1.5rem,4vw,2.5rem)] text-corail font-semibold">
              transformation
            </h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {phases.map((p, i) => (
              <div
                key={p.week}
                className="animate-on-scroll card-hover flex flex-col md:flex-row gap-3 md:gap-6 p-5 md:p-7 rounded-2xl border border-noir/5 hover:border-corail/20 group"
                data-anim={i % 2 === 0 ? 'left' : 'right'}
                data-delay={`${i * 100}`}
              >
                {/* Phase label — above on mobile, left on desktop */}
                <div className="md:shrink-0 md:w-36 md:text-right md:pt-1">
                  <span className="text-corail text-xs font-semibold leading-relaxed">{p.week}</span>
                </div>
                <div className="hidden md:block w-px bg-gradient-to-b from-corail/40 to-corail/5 shrink-0" />
                <div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <h3 className="font-display font-black text-base md:text-lg tracking-tight">{p.title}</h3>
                    <span className="px-2 md:px-2.5 py-0.5 rounded-full bg-corail/8 text-corail text-[10px] md:text-[11px] font-semibold group-hover:bg-corail group-hover:text-white transition-all duration-300">{p.tag}</span>
                  </div>
                  <p className="text-gris text-[13px] md:text-[15px] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-28 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-bleu/15 rounded-full blur-3xl pointer-events-none animate-float-slow hidden md:block" />

        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-20 animate-on-scroll" data-anim="scale">
            <div className="section-badge justify-center">Ce qui est inclus</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-1">
              L'ÉCOSYSTÈME
            </h2>
            <h2 className="font-serif italic text-[clamp(1.5rem,4vw,2.5rem)] text-corail font-semibold">
              complet
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {included.map((item, i) => (
              <div
                key={item.title}
                className="animate-on-scroll card-hover bg-white rounded-2xl p-5 md:p-7 border border-noir/5 hover:border-corail/15 group"
                data-anim="scale"
                data-delay={`${i * 80}`}
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-corail/10 flex items-center justify-center text-corail mb-3 md:mb-4 group-hover:bg-corail group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <Icon name={item.icon} size={20} />
                </div>
                <h3 className="font-display font-black text-base md:text-lg tracking-tight mb-1 md:mb-2">{item.title}</h3>
                <p className="text-gris text-[13px] md:text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus section */}
      <section className="py-16 md:py-28 px-[5%] bg-white">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-on-scroll" data-anim="scale">
            <div className="section-badge justify-center">Bonus inclus</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tighter text-noir mb-1">
              LA BIBLIOTHÈQUE
            </h2>
            <h2 className="font-serif italic text-[clamp(1.3rem,3vw,2rem)] text-corail font-semibold mb-3 md:mb-4">
              complète
            </h2>
            <p className="text-gris mt-2 md:mt-3 font-serif italic text-xs md:text-sm">Tous ces bonus font partie du programme — pas d'upsell caché.</p>
          </div>
          <div className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3" data-anim="scale" data-delay="200">
            {bonuses.map((bonus, i) => (
              <div
                key={bonus}
                className="flex items-center gap-2.5 p-3 md:p-3.5 rounded-xl bg-creme border border-noir/5 text-xs md:text-sm hover:border-corail/15 hover:bg-rose/10 transition-all duration-300 group"
              >
                <span className="text-corail text-xs group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="text-noir/70 group-hover:text-noir transition-colors duration-300">{bonus}</span>
              </div>
            ))}
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
          <p className="text-white/50 mb-6 md:mb-8 text-[14px] md:text-[16px]">Chaque programme est créé à la main par Laury — les places sont limitées.</p>
          <Link to="/vip" className="btn-corail text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4">
            Rejoindre la liste d'attente →
          </Link>
        </div>
      </section>
    </>
  )
}
