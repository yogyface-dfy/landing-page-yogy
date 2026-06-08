import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const faqs = [
  {
    q: 'Qu\'est-ce que le yoga du visage ?',
    a: 'Le yoga du visage est une gymnastique douce et ciblée des 57 muscles de ton visage. Comme n\'importe quel muscle du corps, les muscles faciaux ont besoin d\'être entraînés, étirés et détendus. En les travaillant régulièrement, tu peux lifter naturellement ton ovale, réduire l\'apparence des rides et retrouver un teint lumineux — sans intervention invasive.',
  },
  {
    q: 'Est-ce que le yoga du visage fonctionne vraiment ?',
    a: 'Oui. Les 57 muscles de ton visage répondent à l\'entraînement comme n\'importe quel autre muscle du corps. En agissant sur la musculature, la posture et la circulation plutôt que de masquer les symptômes, le yoga du visage s\'attaque à la cause profonde du vieillissement facial. Les résultats sont visibles et durables.',
  },
  {
    q: 'Combien de temps faut-il pratiquer par jour ?',
    a: 'L\'idéal est de commencer par quelques minutes et d\'augmenter progressivement. En général, 10 minutes par jour suffisent pour observer des résultats. L\'important est la régularité : mieux vaut 10 minutes chaque jour que 30 minutes de temps en temps. C\'est comme se laver les dents — c\'est l\'habitude qui fait la différence.',
  },
  {
    q: 'Est-ce que ça peut remplacer les injections ?',
    a: 'Le yoga du visage est une alternative naturelle qui travaille la cause du vieillissement (musculature, posture, circulation) plutôt que d\'en masquer les signes. Beaucoup de femmes ont réduit ou arrêté leurs injections après avoir adopté une pratique régulière. C\'est une approche complémentaire qui redonne de l\'autonomie.',
  },
  {
    q: 'C\'est quoi le drainage lymphatique du visage ?',
    a: 'Le drainage lymphatique est une technique douce qui stimule la circulation de la lymphe — le liquide qui évacue les toxines et les déchets cellulaires. Sur le visage, il permet de réduire les poches, les gonflements, et de retrouver un teint plus frais et lumineux. C\'est un complément idéal au yoga du visage.',
  },
  {
    q: 'Qu\'est-ce que le face tape et à quoi ça sert ?',
    a: 'Le face tape (ou taping facial) utilise des bandes adhésives pour corriger la posture faciale entre les séances de yoga du visage. Il aide à maintenir les muscles dans la bonne position, un peu comme un appareil dentaire pour le visage. C\'est une technique complémentaire utilisée pour accélérer les résultats.',
  },
  {
    q: 'Est-ce compatible avec la grossesse ou la périménopause ?',
    a: 'Le yoga du visage est une pratique naturelle et non invasive, généralement compatible avec la grossesse et la périménopause. La périménopause peut d\'ailleurs accélérer le vieillissement facial — le yoga du visage aide à contrer ces effets. En cas de doute, consulte ton médecin.',
  },
  {
    q: 'J\'ai du bruxisme, est-ce que ça peut m\'aider ?',
    a: 'Oui. Le bruxisme (serrement ou grincement des dents) crée des tensions importantes dans la mâchoire, le cou et les trapèzes — des zones qui impactent directement l\'apparence du visage. Le yoga du visage inclut des techniques de relaxation neuro-faciale qui aident à libérer ces tensions.',
  },
  {
    q: 'Comment rester motivée sur la durée ?',
    a: 'La clé, c\'est d\'y aller progressivement : un geste à la fois, sans se mettre de pression. Mieux vaut 2 minutes par jour que rien du tout. Les résultats visibles motivent aussi : quand ton entourage commence à remarquer des changements, ça encourage à continuer. Et si tu fais une pause, ce n\'est pas grave — l\'important est de reprendre.',
  },
  {
    q: 'Comment prendre soin de ma peau au quotidien en complément ?',
    a: 'Le yoga du visage agit de l\'intérieur (muscles, circulation), mais une bonne routine skincare complète le travail en surface. L\'essentiel : un bon nettoyage, une hydratation adaptée et une protection solaire. Des actifs comme la vitamine C et le rétinal peuvent aussi aider. L\'hydratation de l\'intérieur (boire suffisamment d\'eau) est tout aussi importante.',
  },
]

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border border-noir/6 rounded-xl overflow-hidden transition-all duration-300 ${open ? 'border-corail/20 shadow-md shadow-corail/5' : 'hover:border-noir/12'}`}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-creme/30 transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <span className="text-corail/20 font-display font-black text-sm">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-display font-black text-[15px] tracking-tight uppercase text-noir">{question}</span>
        </div>
        <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-400 ${
          open ? 'bg-corail border-corail text-white rotate-45 shadow-lg shadow-corail/20' : 'border-noir/12 text-noir hover:border-corail/30'
        }`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'max-h-72' : 'max-h-0'}`}>
        <p className="px-6 pb-6 pl-16 text-gris text-[15px] leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <>
      <SEO
        title="FAQ — Questions Fréquentes"
        description="Trouvez les réponses à vos questions sur le yoga du visage, la méthode RESET™ de Laury et les programmes YoGyFace. Résultats, durée, fonctionnement."
        path="/faq"
      />
      {/* FAQ JSON-LD for Google rich results */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })}</script>
      </Helmet>
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-[5%] overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-bleu/15 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[700px] mx-auto text-center">
          <div className="animate-on-scroll section-badge justify-center" data-anim="fade" data-delay="100">Besoin de clarté</div>
          <div className="animate-on-scroll" data-anim="scale" data-delay="200">
            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
              QUESTIONS
            </h1>
            <h1 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] text-corail/70 font-semibold mb-6">
              fréquentes
            </h1>
          </div>
          <p className="animate-on-scroll text-gris text-[17px] leading-relaxed" data-delay="400">
            Tout ce qu'il faut savoir sur le yoga du visage, ma méthode et mon approche — compilé depuis +1000 échanges avec ma communauté.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-12 pb-28 px-[5%]">
        <div className="max-w-[800px] mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="animate-on-scroll" data-delay={`${i * 50}`}>
              <FAQItem question={faq.q} answer={faq.a} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 px-[5%] bg-creme text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose/20 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />

        <div className="max-w-md mx-auto relative z-10 animate-on-scroll" data-anim="scale">
          <h2 className="font-display font-black text-2xl tracking-tight mb-4">Tu as d'autres <span className="font-serif italic text-corail font-semibold">questions ?</span></h2>
          <p className="text-gris text-[15px] mb-6">Je réponds personnellement à contact@yogyface.fr ou via Instagram Direct.</p>
          <Link to="/contact" className="btn-primary px-7 py-3.5">
            Me contacter
          </Link>
        </div>
      </section>
    </>
  )
}
