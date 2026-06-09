import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const results = [
  { duration: '6 semaines', zone: 'Ovale & mâchoire', tag: 'Résultat 6 sem.' },
  { duration: '3 mois', zone: 'Rides d\'expression', tag: 'Résultat 3 mois' },
  { duration: '1 mois', zone: 'Teint & éclat', tag: 'Résultat 1 mois' },
  { duration: '2 mois', zone: 'Cernes & poches', tag: 'Résultat 2 mois' },
  { duration: '6 semaines', zone: 'Lifting naturel', tag: 'Résultat 6 sem.' },
  { duration: '4 mois', zone: 'Relâchement général', tag: 'Résultat 4 mois' },
  { duration: '3 semaines', zone: 'Gonflement & drainage', tag: 'Résultat 3 sem.' },
  { duration: '8 semaines', zone: 'Sillons nasogéniens', tag: 'Résultat 8 sem.' },
]

const testimonials = [
  {
    text: 'Après 8 semaines, mon mari m\'a demandé si j\'avais fait quelque chose. Mon ovale est plus défini, mes cernes se sont atténuées. Je ne pensais pas que c\'était possible sans injection.',
    name: 'Sophie M.', info: '47 ans · 8 semaines · Relâchement & ovale', initial: 'S'
  },
  {
    text: 'Je ne me reconnaissais plus sur les photos — je me trouvais moche. Aujourd\'hui je prends des selfies. La méthode RESET m\'a rendu bien plus qu\'un visage, elle m\'a rendu confiance.',
    name: 'Marie-Claire B.', info: '52 ans · 3 mois · Perte de volume', initial: 'M'
  },
  {
    text: 'J\'avais un côté plus haut que l\'autre, une asymétrie. En 6 semaines de travail ciblé, mon visage s\'est rééquilibré. Je n\'aurais jamais cru que c\'était possible naturellement.',
    name: 'Nathalie D.', info: '44 ans · 6 semaines · Asymétrie', initial: 'N'
  },
  {
    text: 'Je n\'osais plus du tout sourire à cause de mes rides très prononcées autour de la bouche. Maintenant je souris librement. Mon visage a l\'air plus jeune, plus reposé, plus moi.',
    name: 'Christine R.', info: '51 ans · 2 mois · Rides d\'expression', initial: 'C'
  },
  {
    text: 'J\'avais besoin de me retrouver — je m\'étais complètement oubliée. La méthode de Laury m\'a appris à prendre soin de moi. 10 minutes par jour, rien que pour moi.',
    name: 'Valérie T.', info: '49 ans · 3 semaines · Bien-être & routines', initial: 'V'
  },
  {
    text: 'J\'avais l\'impression que tout commençait à s\'affaisser vers le bas. Double menton, bajoues légères, la jawline disparaissait. Aujourd\'hui je vois de nouveau la définition de mon ovale.',
    name: 'Isabelle P.', info: '55 ans · 4 mois · Programme complet', initial: 'I'
  },
]

const stats = [
  { number: '1 000+', label: 'Femmes transformées' },
  { number: '4.9/5', label: 'Satisfaction moyenne' },
  { number: '21j', label: 'Premiers résultats visibles' },
  { number: '97%', label: 'Recommanderaient RESET' },
]

export default function Transformations() {
  return (
    <>
      <SEO
        title="Transformations & Résultats"
        description="Découvrez les transformations réelles des femmes accompagnées par Laury avec la méthode RESET™. Témoignages et résultats visibles dès 6 semaines."
        path="/transformations"
      />
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-creme via-white to-white pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-rose/20 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <div className="animate-on-scroll section-badge justify-center" data-anim="fade" data-delay="100">Des preuves, pas des promesses</div>
          <div className="animate-on-scroll" data-anim="scale" data-delay="200">
            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
              DES TRANSFORMATIONS
            </h1>
            <h1 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] text-corail font-semibold mb-6">
              qui se voient
            </h1>
          </div>
          <p className="animate-on-scroll text-gris text-[17px] leading-relaxed max-w-xl mx-auto" data-delay="400">
            Pas de filtres. Pas de retouches. Juste la méthode RESET™ et 10 minutes par jour. Ces résultats viennent directement de la communauté YoGyFace.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-[5%] bg-noir relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-corail/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={s.label} className="animate-on-scroll text-center" data-anim="scale" data-delay={`${i * 100}`}>
                <p className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-corail">{s.number}</p>
                <p className="text-white/40 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After grid */}
      <section className="py-20 px-[5%] bg-white">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-center text-gris/40 text-sm mb-8 font-serif italic">
            Photos avant/après de la communauté YoGyFace — à intégrer lors du déploiement final
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="animate-on-scroll card-hover rounded-2xl overflow-hidden border border-noir/5 hover:border-corail/15"
                data-anim="scale"
                data-delay={`${i * 70}`}
              >
                <div className="aspect-[3/4] bg-gradient-to-b from-creme to-rose/15 flex flex-col">
                  <div className="flex-1 flex items-center justify-center border-b border-white/50">
                    <div className="text-center">
                      <p className="text-xs font-semibold tracking-widest uppercase text-gris/40">Avant</p>
                      <div className="w-16 h-16 rounded-full bg-gris/8 mx-auto mt-2" />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-corail/[0.04]">
                    <div className="text-center">
                      <p className="text-xs font-semibold tracking-widest uppercase text-corail/40">Après</p>
                      <div className="w-16 h-16 rounded-full bg-corail/8 mx-auto mt-2" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-semibold text-corail uppercase tracking-wider">{r.tag}</p>
                  <p className="text-xs text-gris mt-0.5">{r.zone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose/25 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 animate-on-scroll" data-anim="scale">
            <div className="section-badge justify-center">Verbatim clientes</div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-4">
              CE QU'ELLES<br />
              <span className="font-serif italic text-corail font-semibold">en disent</span>
            </h2>
            <p className="text-gris mt-3 text-sm font-serif italic">Ces phrases viennent directement des clientes de Laury — non éditées.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="animate-on-scroll card-hover bg-white rounded-2xl p-7 border border-noir/5 hover:border-corail/15"
                data-delay={`${i * 80}`}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-corail/60" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-noir/70 text-[15px] leading-relaxed mb-6 font-serif italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-corail/20 to-rose/30 flex items-center justify-center text-corail font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-noir font-semibold text-sm">{t.name}</p>
                    <p className="text-gris text-xs">{t.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5%] bg-noir text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-corail/8 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />

        <div className="max-w-xl mx-auto relative z-10 animate-on-scroll" data-anim="scale">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black tracking-tighter mb-6">
            ET TOI, C'EST<br />
            <span className="font-serif italic text-corail font-semibold">quand ?</span>
          </h2>
          <p className="text-white/50 mb-8 text-[16px]">Ces résultats peuvent être les tiens. Inscris-toi pour être prévenue dès qu'une place se libère.</p>
          <Link to="/liste-attente" className="btn-corail text-base px-8 py-4">
            Rejoindre la liste d'attente →
          </Link>
        </div>
      </section>
    </>
  )
}
