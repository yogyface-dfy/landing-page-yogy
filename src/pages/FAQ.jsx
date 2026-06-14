import { useState } from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import SEO from "../components/SEO";

const faqs = [
  {
    q: "Qu'est-ce que le yoga du visage ?",
    a: `Le yoga du visage est une **méthode naturelle** qui permet de travailler les **45 muscles de ton visage** en douceur, avec précision et conscience.

À travers des exercices ciblés comme des **auto-massages**, des **étirements**, de la **gymnastique**, du **drainage** et de la **respiration**, tu apprends à **rééduquer ton visage** : relâcher les tensions, réveiller les muscles qui manquent de tonicité et corriger certaines habitudes inconscientes qui marquent les traits au fil du temps.

Car ton visage ne reflète pas seulement l’âge : il exprime aussi tes **émotions**, ton **stress** et ta **fatigue**, tout ce que tu retiens parfois sans t’en rendre compte.

Pratiqué régulièrement, le yoga du visage aide à **lifter naturellement l’ovale**, **réduire l’apparence des rides**, détendre les traits et retrouver un **teint plus lumineux** — **sans intervention invasive**.`,
  },
  {
    q: "Est-ce que le yoga du visage fonctionne vraiment ?",
    a: `Oui, à condition de **travailler le visage dans sa globalité**, et pas seulement une ride ou une zone isolée.

Le visage est composé de muscles qui fonctionnent ensemble : certains sont **trop contractés**, souvent à cause du stress, des émotions, d’une respiration bloquée ou de mimiques répétées. Ces tensions, parfois imperceptibles, peuvent finir par marquer le visage et créer des **rides d’expression**.

À l’inverse, **d’autres muscles perdent en tonicité** avec le temps. Ils soutiennent moins bien les tissus, ce qui accentue le **relâchement**, en plus de la gravité et du vieillissement naturel de la peau, qui produit progressivement moins de collagène et d’élastine.

Le yoga du visage fonctionne parce qu’il agit sur ces deux aspects : il **détend les muscles hypertoniques** et **réactive les muscles plus “endormis”**. Grâce aux exercices ciblés, aux auto-massages, à la respiration et à la rééducation des mimiques, on vient relâcher les tensions invisibles, améliorer la **circulation sanguine**, oxygéner les tissus et redonner plus de soutien au visage.

C’est ce **travail complet sur les fondamentaux** — muscles, posture, respiration, tensions, circulation et conscience musculaire — qui permet d’obtenir des **résultats visibles, naturels et durables**, à tout âge.

Des études ont d’ailleurs observé qu’une **pratique régulière** d’exercices faciaux pouvait améliorer l’apparence du visage.`,
  },
  {
    q: "Combien de temps faut-il pratiquer par jour ?",
    a: `L’idéal est de commencer par **quelques minutes par jour**, puis d’augmenter progressivement selon tes besoins et ton rythme. En général, **5 à 10 minutes** bien pratiquées peuvent déjà faire une vraie différence.

Mais chez YoGyFace, ce n’est pas seulement une question de temps : c’est surtout une question de **pleine conscience**. Une routine de 4 minutes réalisée avec lenteur, douceur, respiration et conscience musculaire sera souvent **plus efficace** qu’une routine de 15 minutes faite trop vite, sans les bons gestes.

C’est justement ma méthode d’apprentissage : **avancer petit à petit, sans créer de charge mentale**. Le but n’est pas d’ajouter une contrainte de plus dans ta journée, mais de faire entrer le yoga du visage naturellement dans tes habitudes de vie, **comme se laver les dents**.

Au fil de la pratique, tu crées des **automatismes** : relâcher ta mâchoire, détendre ton front, respirer plus profondément, corriger une mimique répétée ou masser une tension quand tu la sens apparaître.

Une fois ces réflexes installés, tu n’as plus besoin de “trouver du temps”. L’important, c’est la **régularité**, la **qualité du mouvement** et la **conscience** que tu mets dans ta pratique.`,
  },
  {
    q: "Est-ce que je dois pratiquer tous les jours, matin et soir ?",
    a: `Non, tu n’as pas besoin de **pratiquer matin et soir tous les jours** pour obtenir des résultats.

L’objectif n’est pas de te rajouter une pression ou une charge mentale supplémentaire, mais de créer une **routine réaliste, que tu peux tenir dans le temps**. Chez YoGyFace, on apprend petit à petit à intégrer les bons gestes dans son quotidien, comme une véritable **habitude de vie**.

L’idéal est d’**être régulière** : **quelques minutes par jour**, ou plusieurs fois par semaine, valent mieux qu’une longue routine faite une fois de temps en temps. Tu peux pratiquer **le matin** pour réveiller ton visage, stimuler la circulation et défroisser les traits, ou **le soir** pour relâcher les tensions accumulées dans la journée.

Mais le plus important, ce n’est pas le moment parfait : c’est la **qualité de ta pratique**. Une routine courte, faite avec **lenteur, respiration et conscience musculaire**, sera toujours plus efficace qu’une routine longue faite automatiquement ou dans la précipitation.

Ma vision, c’est justement de t’aider à adopter cet état d’esprit : ne plus voir le yoga du visage comme une contrainte, mais comme **un moment qui te fait du bien**. Au bout de quelques semaines — souvent entre **21 et 66 jours** selon les personnes — les gestes deviennent de **vrais automatismes**. Tu ne “cherches” plus le temps : c’est ancré dans tes habitudes, **comme te laver les dents**.

Et parce que tu ressens les bienfaits sur ton visage, mais aussi sur tes tensions, ta respiration et ton rapport à toi-même, tu n’as plus besoin de te forcer. Tu pratiques parce que ça devient **naturel, agréable et évident**.`,
  },
  {
    q: "Est-ce que ça peut remplacer les injections ?",
    a: "Contrairement à une injection qui fige ou comble une zone, le yoga du visage entretient ce qui fait réellement vieillir le visage en profondeur : la **musculature**, la **posture** et la **circulation**. Beaucoup de femmes ont d'ailleurs **espacé ou arrêté leurs injections** une fois leur pratique installée. C'est une démarche **complémentaire**, qui te redonne surtout de l'**autonomie**.",
  },
  {
    q: "C'est quoi le drainage lymphatique du visage ?",
    a: "Le drainage lymphatique est une **technique douce** qui stimule la circulation de la lymphe — le liquide qui **évacue les toxines** et les déchets cellulaires. Sur le visage, il permet de **réduire les poches et les gonflements**, et de retrouver un **teint plus frais et lumineux**. C'est un complément idéal au yoga du visage.",
  },
  {
    q: "Qu'est-ce que le face tape et à quoi ça sert ?",
    a: "Le face tape (ou taping facial) utilise des **bandes adhésives** pour **corriger la posture faciale** entre les séances de yoga du visage. Il aide à maintenir les muscles dans la bonne position, un peu comme **un appareil dentaire pour le visage**. C'est une technique complémentaire utilisée pour **accélérer les résultats**.",
  },
  {
    q: "Est-ce compatible avec la grossesse ou la périménopause ?",
    a: "Le yoga du visage est une pratique **naturelle et non invasive**, généralement **compatible avec la grossesse et la périménopause**. La périménopause peut d'ailleurs **accélérer le vieillissement facial** — le yoga du visage aide à contrer ces effets. En cas de doute, **consulte ton médecin**.",
  },
  {
    q: "J'ai du bruxisme, est-ce que ça peut m'aider ?",
    a: "Oui. Le bruxisme (serrement ou grincement des dents) crée des **tensions importantes dans la mâchoire, le cou et les trapèzes** — des zones qui impactent directement l'apparence du visage. Le yoga du visage inclut des techniques de **relaxation neuro-faciale** qui aident à **libérer ces tensions**.",
  },
  {
    q: "J'ai peur de mal faire, est-ce que je peux abîmer mon visage ?",
    a: `C’est une peur très fréquente, et justement, **tu n’es pas laissée seule** face à ta pratique.

Dans la méthode YoGyFace, **chaque geste est expliqué en détail** : où placer tes doigts, dans quel sens masser, avec quelle pression, quel rythme adopter, comment respirer et surtout quelles sensations rechercher. Le but n’est pas de reproduire des mouvements au hasard, mais de **comprendre ce que tu fais et pourquoi tu le fais**.

Car oui, pratiquer seule avec des gestes trouvés au hasard peut parfois être **contre-productif** : masser **trop fort, au mauvais endroit, dans le mauvais sens**, ou faire des exercices qui ne sont pas adaptés à ton visage peut entretenir certaines tensions au lieu de les relâcher.

C’est pour ça que **l’accompagnement est essentiel**. Grâce aux explications, aux lives, au suivi et aux corrections, tu apprends à pratiquer de manière **juste, progressive et adaptée à toi**. Tu peux poser tes questions, vérifier tes gestes, comprendre tes blocages et ajuster ta routine selon ton visage, tes tensions et tes besoins.

L’objectif n’est pas que tu sois parfaite dès le début, mais que tu te sentes **guidée, en sécurité et de plus en plus autonome**. Petit à petit, tu développes ta conscience musculaire et tu apprends à faire les bons gestes avec **douceur, précision et confiance**.`,
  },
  {
    q: "Comment rester motivée sur la durée ?",
    a: "La clé, c'est d'**y aller progressivement** : un geste à la fois, sans se mettre de pression. **Mieux vaut 2 minutes par jour que rien du tout.** Les **résultats visibles** motivent aussi : quand ton entourage commence à remarquer des changements, ça encourage à continuer. Et si tu fais une pause, ce n'est pas grave — **l'important est de reprendre**.",
  },
  {
    q: "Comment prendre soin de ma peau au quotidien en complément ?",
    a: "Le yoga du visage agit **de l'intérieur** (muscles, circulation), mais une **bonne routine skincare** complète le travail en surface. L'essentiel : un **bon nettoyage**, une **hydratation adaptée** et une **protection solaire**. Des actifs comme la **vitamine C** et le **rétinal** peuvent aussi aider. Et **boire suffisamment d'eau** est tout aussi important.",
  },
];

// Transforme les marqueurs **gras** en <strong>, en conservant les sauts de ligne.
function renderAnswer(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-noir">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-noir/6 rounded-xl overflow-hidden transition-all duration-300 ${open ? "border-corail/20 shadow-md shadow-corail/5" : "hover:border-noir/12"}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 md:px-6 py-5 flex items-center justify-between gap-3 md:gap-4 hover:bg-creme/30 transition-colors duration-300"
      >
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <span className="text-corail/20 font-display font-black text-sm shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display font-black text-[14px] md:text-[15px] tracking-tight uppercase text-noir break-words">
            {question}
          </h3>
        </div>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-400 ${
            open
              ? "bg-corail border-corail text-white rotate-45 shadow-lg shadow-corail/20"
              : "border-noir/12 text-noir hover:border-corail/30"
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "max-h-[1600px]" : "max-h-0"}`}
      >
        <p className="px-4 md:px-6 pb-6 md:pl-16 text-gris text-[15px] leading-relaxed whitespace-pre-line">
          {renderAnswer(answer)}
        </p>
      </div>
    </div>
  );
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
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a.replace(/\*\*/g, ""),
              },
            })),
          })}
        </script>
      </Head>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 px-[5%] overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-bleu/15 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[700px] mx-auto text-center">
          <div
            className="animate-on-scroll section-badge justify-center"
            data-anim="fade"
            data-delay="100"
          >
            Tes questions, mes réponses
          </div>
          <div className="animate-on-scroll" data-anim="scale" data-delay="200">
            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
              QUESTIONS
            </h1>
            <p className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] text-corail/70 font-semibold mb-6">
              fréquentes
            </p>
          </div>
          <p
            className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed"
            data-delay="400"
          >
            Les questions que tu me poses le plus souvent sur le yoga du
            visage, ma méthode et mon approche — réunies à partir de +1000
            échanges avec ma communauté.
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

        <div
          className="max-w-md mx-auto relative z-10 animate-on-scroll"
          data-anim="scale"
        >
          <div className="w-24 h-24 mx-auto mb-5 img-zoom rounded-full overflow-hidden shadow-lg">
            <img
              src="/laury-fun.webp"
              alt="Laury, fondatrice de YoGyFace, souriante"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-display font-black text-2xl tracking-tight mb-4">
            Tu as d'autres{" "}
            <span className="font-serif italic text-corail font-semibold">
              questions ?
            </span>
          </h2>
          <p className="text-gris text-[15px] mb-6">
            Je réponds personnellement à contact@yogyface.fr ou via Instagram
            Direct.
          </p>
          <Link to="/contact" className="btn-primary px-7 py-3.5">
            Me contacter
          </Link>
        </div>
      </section>
    </>
  );
}
