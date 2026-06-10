import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import SEO from "../components/SEO";

/* The actual RESET acronym from the method */
const reset = [
  {
    letter: "R",
    word: "Rééduquer",
    desc: "Les muscles faciaux hyperactifs qui créent rides et crispations.",
  },
  {
    letter: "E",
    word: "Équilibrer",
    desc: "Les tensions et relâchements entre les 45 muscles du visage.",
  },
  {
    letter: "S",
    word: "Stimuler",
    desc: "La circulation sanguine et lymphatique pour drainer et oxygéner.",
  },
  {
    letter: "E",
    word: "Éliminer",
    desc: "Les habitudes destructrices inconscientes qui vieillissent ton visage.",
  },
  {
    letter: "T",
    word: "Tonifier",
    desc: "Durablement pour retrouver fermeté, contours définis et jeunesse.",
  },
];

/* The 6 steps of the program (from the actual sales deck) */
const steps = [
  {
    num: "01",
    title: "Diagnostic Personnalisé Révélateur",
    desc: "Questionnaire vidéo interactif de 30 minutes : 25 thématiques pour cerner tes besoins, tes habitudes, ton stress, ta skincare. Tu te filmes, tu réalises des tests musculaires, et tu déposes des photos de face et de profil.",
    tag: "J+0",
    detail:
      "Une analyse fine et personnalisée de ton visage pour créer ta routine unique.",
  },
  {
    num: "02",
    title: "Ordonnance Beauté Sur-Mesure",
    desc: "Un document de 3 à 7 pages qui reprend l'analyse de tes préoccupations, l'approche YoGyFace expliquée, des conseils skincare personnalisés et des conseils de mode de vie adaptés à tes besoins. C'est ton point de départ et ma référence pour suivre ton évolution ",
    tag: "J+3",
    detail:
      "Tes 3 priorités identifiées avec les causes réelles de tes problématiques.",
  },
  {
    num: "03",
    title: "Programme Personnalisé 4 Semaines",
    desc: "Un programme sur 4 semaines pour rapidement agir sur tes préoccupations. La durée augmente petit à petit de semaine en semaine : on installe de bonnes habitudes durables, sans te cramer dès le départ.",
    tag: "J+6",
    detail:
      "Une progression douce de 3 à 10 min/jour pour ancrer l'habitude sur la durée.",
  },
  {
    num: "04",
    title: "Bibliothèque de 160+ Exercices",
    desc: "Accès illimité à la bibliothèque d'exercices répartis par zones : muscles fondamentaux, bouche, joues, regard, front, ovale, buste, cou et correction d'asymétrie.",
    tag: "Accès illimité",
    detail:
      "Tu pioches de nouveaux exercices pour élargir ta pratique une fois ta routine acquise.",
  },
  {
    num: "05",
    title: "12H de Lives Coaching",
    desc: "Lives FAQ pour te rassurer, t'observer et te corriger les premières semaines. Lives thématiques pour aller plus loin une fois ta routine maîtrisée. 10 créneaux par mois minimum.",
    tag: "6 mois",
    detail: "Laury est vraiment là — ce n'est pas des vidéos pré-enregistrées.",
  },
  {
    num: "06",
    title: "Suivi Évolution & Communauté",
    desc: "Questionnaires de suivi à 1, 2, 3 et 6 mois. Groupe WhatsApp privé pour se soutenir. Accès au Club des Marques mensuel avec une marque cosmétique et une experte bien-être.",
    tag: "À vie",
    detail:
      "Jamais toute seule dans ton parcours — motivation collective et soutien continu.",
  },
];

/* What makes the method unique (from slide 219) */
const unique = [
  {
    icon: "microscope",
    title: "Analyse personnalisée",
    desc: "J'analyse TON visage avant de te donner tes routines. Pas les mêmes exercices pour toutes.",
  },
  {
    icon: "chat",
    title: "Accompagnement réel",
    desc: "Les autres vendent des vidéos et disparaissent. Moi, je t'accompagne jusqu'à l'ancrage de l'habitude.",
  },
  {
    icon: "dna",
    title: "Approche neuroscientifique",
    desc: "21 jours pour ancrer une habitude. Je respecte ce rythme au lieu de te noyer sous 50 exercices dès le départ.",
  },
  {
    icon: "leaf",
    title: "Vision holistique",
    desc: "Le visage est le miroir de ton alimentation, respiration, stress et relation à toi-même.",
  },
  {
    icon: "sparkles",
    title: "Transformation profonde",
    desc: "Pas qu'une méthode beauté : une transformation complète de ta relation à toi et ton visage.",
  },
];

/* Bonus experts — real names from the deck */
const bonusExperts = [
  {
    name: "Camille Hermann",
    role: "Biologiste & dermo-nutritionniste",
    content: "Méthode P.E.A.U + Guide Nutrition Anti-Âge",
  },
  {
    name: "Irina",
    role: "Neurothérapeute",
    content: "Routine EFT complète — reprogrammation mentale et confiance",
  },
  {
    name: "Laëtitia",
    role: "Formatrice Face Tape",
    content: "Application Face Tape : rides du lion, front et sillons",
  },
  {
    name: "Alicia",
    role: "Ancienne danseuse pro & coach yoga",
    content: "+30 min de routines : respiration, posture, étirements ciblés",
  },
  {
    name: "Julie (Natis)",
    role: "Chimie organique & phytothérapie",
    content: "Comprendre le collagène : marin, bovin et biomimétique végétal",
  },
];

/* eBooks included */
const ebooks = [
  "4 règles de nettoyage du visage",
  "10 règles d'or pour réussir",
  "Le pouvoir des habitudes",
  "Suivi de routine YoGyFace",
  "4 secrets de longévité (Zones Bleues)",
  "Affirmations positives",
  "SPF & Lumière Bleue",
  "Do & Don't du yoga du visage",
  "Respiration & Langue",
  "Muscles du visage",
  "Sommeil & Journal de bord",
  "Checklist des bonnes habitudes",
  "La Bible des Actifs cosmétiques",
  "MTC, Acupression & Kinésiologie",
  "L'Hydratation : base de notre énergie",
];

export default function Programme() {
  return (
    <>
      <SEO
        title="Programme — Méthode RESET™"
        description="Programme de yoga du visage personnalisé par Laury. Diagnostic révélateur, ordonnance beauté sur-mesure, 160+ exercices, 12H de coaching live. 10 min/jour pendant 6 mois."
        path="/programme"
      />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 md:pt-40 pb-16 md:pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bleu/20 via-white to-white pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-corail/8 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div
                className="animate-on-scroll section-badge"
                data-anim="fade"
                data-delay="100"
              >
                Méthode RESET™
              </div>
              <div className="animate-on-scroll" data-delay="200">
                <h1 className="font-display text-[clamp(2rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
                  TON PROGRAMME
                </h1>
                <p className="font-serif italic text-[clamp(1.5rem,5vw,3.5rem)] text-corail font-semibold mb-4 md:mb-6">
                  100% personnalisé
                </p>
              </div>
              <p
                className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed mb-3 md:mb-4"
                data-delay="300"
              >
                6 mois pour reprendre le contrôle de ton vieillissement facial.
                Parce que ton visage est unique, ton accompagnement doit l'être
                aussi — pas de programme générique, pas d'exercices en vrac.
              </p>
              <p
                className="animate-on-scroll text-gris/70 text-[13px] md:text-[15px] font-serif italic mb-6 md:mb-8"
                data-delay="400"
              >
                Je ne promets pas du rapide, je promets du définitif. 10
                min/jour suffisent.
              </p>
              <div
                className="animate-on-scroll flex flex-col sm:flex-row gap-3"
                data-delay="500"
              >
                <Link
                  to="/liste-attente"
                  className="btn-primary text-sm md:text-base px-6 md:px-7 py-3 md:py-3.5 text-center"
                >
                  Rejoindre la liste d'attente →
                </Link>
                <a
                  href="#programme-detail"
                  className="btn-secondary text-sm md:text-base px-6 md:px-7 py-3 md:py-3.5 text-center"
                >
                  Voir le programme
                </a>
              </div>
            </div>
            <div
              className="flex justify-center md:justify-end animate-on-scroll order-1 md:order-2"
              data-anim="scale"
              data-delay="300"
            >
              <div className="relative w-full max-w-[280px] md:max-w-[420px]">
                <div className="absolute -inset-4 bg-gradient-to-br from-bleu/15 to-rose/15 rounded-3xl blur-2xl pointer-events-none opacity-60 hidden md:block" />
                <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                  <img
                    src="/laury-massage.webp"
                    alt="Laury — geste de massage facial"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RESET ACRONYM ═══ */}
      <section className="py-16 md:py-24 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-corail/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div
            className="text-center mb-10 md:mb-16 animate-on-scroll"
            data-anim="fade"
          >
            <div className="section-badge justify-center">La méthode</div>
            <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-black tracking-tighter text-noir">
              R.E.S.E.T<span className="text-corail">™</span>
            </h2>
            <p className="text-gris text-sm md:text-base mt-3 max-w-lg mx-auto">
              5 piliers fondamentaux qui agissent sur les causes, pas les
              symptômes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {reset.map((r, i) => (
              <div
                key={r.word}
                className={`animate-on-scroll text-center p-5 md:p-6 rounded-2xl bg-white border border-noir/5 hover:border-corail/20 shadow-sm transition-all duration-300 group ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                data-anim="fade"
                data-delay={`${i * 80}`}
              >
                <span className="font-display font-black text-3xl md:text-4xl text-corail group-hover:scale-110 transition-transform duration-300 inline-block">
                  {r.letter}
                </span>
                <h3 className="font-display font-black text-sm md:text-base tracking-tight mt-2 mb-1 text-noir">
                  {r.word}
                </h3>
                <p className="text-gris text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6 STEPS ═══ */}
      <section
        id="programme-detail"
        className="py-16 md:py-28 px-[5%] bg-white relative overflow-hidden"
      >
        <div
          className="absolute top-12 left-12 w-40 h-40 opacity-[0.03] pointer-events-none hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="max-w-[900px] mx-auto">
          <div
            className="text-center mb-12 md:mb-20 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">Ton parcours</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir">
              6 ÉTAPES VERS
              <br />
              <span className="font-serif italic text-corail font-semibold">
                ton autonomie
              </span>
            </h2>
          </div>
          <div className="space-y-5">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="animate-on-scroll relative rounded-2xl bg-white border border-noir/8 shadow-[0_2px_20px_rgba(26,26,26,0.06)] hover:shadow-[0_10px_36px_rgba(232,103,90,0.14)] hover:border-corail/25 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group"
                data-anim="fade"
                data-delay={`${i * 80}`}
              >
                {/* Liseré corail à gauche, renforcé au survol */}
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-corail to-rose opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-5 md:p-7 pl-6 md:pl-8">
                  <div className="flex items-center md:flex-col md:items-end gap-3 md:gap-2 md:shrink-0 md:w-20">
                    <span className="w-11 h-11 rounded-xl bg-corail text-white flex items-center justify-center font-display font-black text-sm shadow-lg shadow-corail/25 group-hover:scale-105 transition-transform duration-300">
                      {s.num}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-creme text-corail border border-corail/15 text-[10px] font-semibold whitespace-nowrap">
                      {s.tag}
                    </span>
                  </div>
                  <div className="hidden md:block w-px bg-gradient-to-b from-corail/40 to-corail/5 shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-display font-black text-base md:text-lg tracking-tight mb-2 group-hover:text-corail transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="text-gris text-[13px] md:text-[15px] leading-relaxed mb-2">
                      {s.desc}
                    </p>
                    <p className="text-corail/80 text-[15px] md:text-[17px] font-serif italic">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHOTO BREAK ═══ */}
      <section className="py-12 md:py-20 px-[5%] bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div
              className="animate-on-scroll img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
              data-anim="fade"
            >
              <img
                src="/laury-yeux.webp"
                alt="Laury — exercice ciblé contour des yeux"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <div
              className="animate-on-scroll"
              data-anim="fade"
              data-delay="200"
            >
              <blockquote className="border-l-2 border-corail/30 pl-5">
                <p className="text-gris text-base md:text-lg leading-relaxed font-serif italic mb-3">
                  "Chaque zone de ton visage a ses propres muscles, ses propres
                  tensions. C'est pour ça que je crée un programme adapté à TON
                  visage — pas un protocole générique."
                </p>
                <cite className="text-corail font-semibold text-sm not-italic">
                  — Laury
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT MAKES IT UNIQUE ═══ */}
      <section className="py-16 md:py-28 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-bleu/15 rounded-full blur-3xl pointer-events-none animate-float-slow hidden md:block" />
        <div className="max-w-[1400px] mx-auto">
          <div
            className="text-center mb-12 md:mb-20 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">
              Ce qui nous différencie
            </div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tighter text-noir mb-3">
              POURQUOI YOGYFACE
              <br />
              <span className="font-serif italic text-corail font-semibold">
                et pas un autre ?
              </span>
            </h2>
            <p className="text-gris text-sm md:text-base max-w-2xl mx-auto">
              Les applications te donnent 50 exercices en vrac. Les autres
              coachs vendent des vidéos et disparaissent. Imaginerais-tu un
              cardiologue qui t'opère sans consultation, sans regarder TON cœur
              ?
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {unique.map((item, i) => (
              <div
                key={item.title}
                className={`animate-on-scroll card-hover bg-white rounded-2xl p-5 md:p-7 border border-noir/5 hover:border-corail/15 group ${i === 4 ? "sm:col-span-2 md:col-span-1" : ""}`}
                data-anim="scale"
                data-delay={`${i * 80}`}
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-corail/10 flex items-center justify-center text-corail mb-3 md:mb-4 group-hover:bg-corail group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <Icon name={item.icon} size={20} />
                </div>
                <h3 className="font-display font-black text-base md:text-lg tracking-tight mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-gris text-[13px] md:text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BONUS EXPERTS ═══ */}
      <section className="py-16 md:py-28 px-[5%] bg-white relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          <div
            className="text-center mb-10 md:mb-16 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">
              Inclus dans le programme
            </div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-3">
              5 EXPERTES
              <br />
              <span className="font-serif italic text-corail font-semibold">
                pour aller plus loin
              </span>
            </h2>
            <p className="text-gris text-sm md:text-base max-w-lg mx-auto">
              Parce que prendre soin de toi, c'est aussi nutrition, respiration,
              émotions et skincare.
            </p>
          </div>

          {/* Team photo */}
          <div
            className="animate-on-scroll mb-10 md:mb-14"
            data-anim="scale"
            data-delay="100"
          >
            <div className="relative max-w-[700px] mx-auto">
              <div className="absolute -inset-3 bg-gradient-to-br from-corail/10 to-bleu/10 rounded-3xl blur-2xl pointer-events-none opacity-50 hidden md:block" />
              <img
                src="/equipe-expertes.webp"
                alt="L'équipe d'expertes YoGyFace — Laury et ses intervenantes"
                loading="lazy"
                className="w-full h-auto rounded-2xl md:rounded-3xl shadow-xl relative"
              />
            </div>
          </div>

          <div className="space-y-3">
            {bonusExperts.map((expert, i) => (
              <div
                key={expert.name}
                className="animate-on-scroll card-hover flex flex-col sm:flex-row gap-3 sm:gap-5 p-5 md:p-6 rounded-2xl bg-creme border border-noir/5 hover:border-corail/15 group"
                data-anim="fade"
                data-delay={`${i * 80}`}
              >
                <div className="sm:shrink-0 sm:w-48">
                  <h4 className="font-display font-black text-sm md:text-base tracking-tight">
                    {expert.name}
                  </h4>
                  <p className="text-corail text-xs font-semibold">
                    {expert.role}
                  </p>
                </div>
                <p className="text-gris text-[13px] md:text-[15px] leading-relaxed">
                  {expert.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ eBOOKS ═══ */}
      <section className="py-16 md:py-24 px-[5%] bg-creme relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          <div
            className="text-center mb-10 md:mb-14 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">
              +20 ressources incluses
            </div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tighter text-noir mb-3">
              TA BIBLIOTHÈQUE
              <br />
              <span className="font-serif italic text-corail font-semibold">
                d'eBooks & guides
              </span>
            </h2>
            <p className="text-gris text-sm max-w-lg mx-auto">
              Guides pratiques, fiches anatomiques, trackers et checklists —
              tout est inclus.
            </p>
          </div>

          {/* Visual gallery of eBook covers */}
          <div
            className="animate-on-scroll mb-10 md:mb-14"
            data-anim="fade"
            data-delay="100"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {[
                {
                  src: "/ebook-muscles.webp",
                  alt: "Visualisation des muscles du visage",
                },
                {
                  src: "/ebook-routine.webp",
                  alt: "Suivi de routine YoGyFace",
                },
                {
                  src: "/ebook-dodont.webp",
                  alt: "Do & Don't du yoga du visage",
                },
                {
                  src: "/ebook-regles.webp",
                  alt: "10 règles d'or pour réussir",
                },
                { src: "/ebook-longevite.webp", alt: "4 secrets de longévité" },
              ].map((ebook, i) => (
                <div
                  key={ebook.src}
                  className="animate-on-scroll rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  data-anim="scale"
                  data-delay={`${i * 60}`}
                >
                  <img
                    src={ebook.src}
                    alt={ebook.alt}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text list */}
          <div
            className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
            data-anim="scale"
            data-delay="200"
          >
            {ebooks.map((book) => (
              <div
                key={book}
                className="flex items-center gap-2.5 p-3 md:p-3.5 rounded-xl bg-white border border-noir/5 text-xs md:text-sm hover:border-corail/15 hover:bg-rose/10 transition-all duration-300 group"
              >
                <span className="text-corail text-xs group-hover:scale-125 transition-transform duration-300">
                  ✓
                </span>
                <span className="text-noir/70 group-hover:text-noir transition-colors duration-300">
                  {book}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-gris/50 text-xs mt-4 font-serif italic">
            Tous les bonus font partie du programme — pas d'upsell caché.
          </p>
        </div>
      </section>

      {/* ═══ GUARANTEE ═══ */}
      <section className="py-16 md:py-24 px-[5%] bg-white">
        <div
          className="max-w-[700px] mx-auto text-center animate-on-scroll"
          data-anim="scale"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-corail/10 text-corail mb-5">
            <Icon name="shield" size={28} />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black tracking-tight text-noir mb-3">
            Garantie satisfaite ou remboursée
          </h2>
          <p className="text-gris text-[15px] md:text-[16px] leading-relaxed mb-4">
            Si après avoir suivi tes 12H de coaching, pratiqué tes routines au
            minimum 4 fois par semaine et envoyé tes photos de suivi — tu ne
            vois toujours pas d'amélioration de ton bien-être ou de ta confiance
            en toi :
          </p>
          <p className="text-noir font-display font-black text-lg md:text-xl">
            Tu m'envoies un email et je te rembourse en totalité.
          </p>
          <p className="text-gris/60 text-sm mt-3 font-serif italic">
            Je veux que tu sois totalement sereine à l'idée de passer le cap.
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-24 px-[5%] bg-noir text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-corail/8 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
        <div
          className="max-w-xl mx-auto relative z-10 animate-on-scroll"
          data-anim="scale"
        >
          <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-black tracking-tighter mb-4 md:mb-6">
            PRÊTE À REPRENDRE
            <br />
            <span className="font-serif italic text-corail font-semibold">
              le contrôle ?
            </span>
          </h2>
          <p className="text-white/50 mb-6 md:mb-8 text-[14px] md:text-[16px]">
            Chaque programme est créé à la main par Laury — les places sont
            limitées.
          </p>
          <Link
            to="/liste-attente"
            className="btn-corail text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4"
          >
            Rejoindre la liste d'attente →
          </Link>
          <p className="text-white/30 text-sm mt-6">
            Tu hésites encore ? Regarde{" "}
            <Link
              to="/transformations"
              className="text-corail/80 font-semibold hover:underline"
            >
              les transformations
            </Link>{" "}
            ou consulte la{" "}
            <Link
              to="/faq"
              className="text-corail/80 font-semibold hover:underline"
            >
              FAQ
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
