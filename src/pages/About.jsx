import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import SEO from "../components/SEO";
import YouTubeEmbed from "../components/YouTubeEmbed";

// Vidéos "parcours" de la chaîne YouTube de Laury (façade légère au clic)
const parcoursVideos = [
  {
    id: "OjNSwi7rSBE",
    title: "De l'esthétique à l'entrepreneuriat : oser changer de vie",
  },
  {
    id: "BFe2fGgLFJ4",
    title: "La force de croire en soi : j'ai quitté mon CDI il y a 1 an",
  },
];

const steps = [
  {
    num: "01",
    title: "MON HISTOIRE",
    text: "Acné sévère et dépression m'ont d'abord fait croire que « l'esthétique n'était pas fait pour moi ». Puis une reconversion, et des études menées en parallèle — jusqu'à décrocher un poste chez Chanel, puis L'Oréal pour Biotherm, puis la direction des animatrices Weleda en France. Plus de 10 ans dans les plus grands laboratoires cosmétiques.",
    image: null,
  },
  {
    num: "02",
    title: "LE DÉCLIC",
    text: "Malgré toute cette expertise, je vois mon propre visage vieillir avant mes 27 ans. Et je vois mes clientes revenir chaque mois en pharmacie, après avoir dépensé des centaines d'euros — sans vrai changement. Puis des clientes métamorphosées me parlent d'une approche dont je n'avais jamais entendu parler : le yoga du visage.",
    image: null,
  },
  {
    num: "03",
    title: "LA RECHERCHE",
    text: "Je me forme auprès des grandes références mondiales (Sylvie LeFranc, Ena Narumi, Fumiko Takatsu). Je crée mes premiers ateliers pour Weleda dans les pharmacies en France. Les clientes réclament du suivi personnalisé. J'ai mélangé mon expertise skincare avec l'univers du yoga du visage pour que les femmes obtiennent enfin de vraies transformations",
    image: "/laury-biotherm.webp",
    imageAlt: "Laury en conférence pour Biotherm",
  },
  {
    num: "04",
    title: "AUJOURD'HUI",
    text: "Plus de 700 femmes ont transformé leur visage avec cette méthode. Mon objectif : que chaque femme devienne experte de son propre visage — qu'elle comprenne son anatomie, maîtrise ses gestes, et ne dépende plus jamais d'un lobby cosmétique. Je ne promets pas du rapide. Je promets du définitif.",
    image: null,
  },
];

const experts = [
  {
    role: "Biologiste",
    icon: "microscope",
    desc: "Pour l'approche nutritionnelle : ce que tu manges impacte directement la qualité de ta peau, ton collagène et ton vieillissement.",
  },
  {
    role: "Praticien EFT",
    icon: "brain",
    desc: "Pour libérer les tensions émotionnelles qui se cristallisent sur le visage (mâchoire, front, cou).",
  },
  {
    role: "Spécialiste Face Tape",
    icon: "scissors",
    desc: "Pour rééduquer tes contractions faciales entre les séances avec des techniques de taping ciblées.",
  },
  {
    role: "Expert Collagène",
    icon: "pill",
    desc: "Pour optimiser la nutrition et maximiser la production de collagène naturel.",
  },
  {
    role: "Coach Yoga & Respiration",
    icon: "lotus",
    desc: "La respiration est la base de tout. Mal respirer crée des blocages qui se lisent directement sur le visage. Corps et souffle sont indissociables du travail facial.",
  },
];

const lauryQuote1 =
  "J'ai créé YoGyFace pour que ce soit la safe place des femmes qui veulent prendre soin d'elles de la bonne manière — avec une approche humaine, bienveillante, sans perdre leur temps avec des exercices qui ne leur correspondent pas. Chaque programme est fait main, par moi.";
const lauryQuote2 =
  "Mon objectif : que tu passes d'une femme qui subit son vieillissement à une femme qui maîtrise parfaitement son apparence et vieillit avec grâce, selon SES propres règles.";

const parcoursPhotos = [
  {
    src: "/laury-sylvie.webp",
    alt: "Laury avec Sylvie LeFranc",
    name: "Sylvie LeFranc",
    desc: "Référence en France dans le domaine du yoga du visage. Formatrice professionnelle et pionnière.",
  },
  {
    src: "/laury-narumi.webp",
    alt: "Laury avec Era Narumi",
    name: "Era Narumi",
    desc: "Experte japonaise reconnue pour sa maîtrise des fascias et ses techniques uniques de modelage facial.",
  },

  {
    src: "/laury-fumiko.webp",
    alt: "Laury avec Fumiko Takatsu",
    name: "Fumiko Takatsu",
    desc: "Japonaise, fondatrice du Face Yoga Method — la méthode de yoga du visage la plus connue au monde.",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="Mon Parcours — Laury"
        description="Découvrez le parcours de Laury, fondatrice de YoGyFace. Formée auprès des plus grandes expertes mondiales du yoga du visage, elle a créé la méthode RESET™."
        path="/about"
      />
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/20 via-white to-white pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-corail/8 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-bleu/10 rounded-full blur-3xl pointer-events-none animate-float-slow hidden md:block" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div
                className="animate-on-scroll section-badge"
                data-anim="fade"
                data-delay="100"
              >
                Fondatrice
              </div>
              <div
                className="animate-on-scroll"
                data-anim="fade"
                data-delay="200"
              >
                <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-noir">
                  MON
                </h1>
                <p className="font-serif italic text-[clamp(2rem,6vw,4rem)] text-corail/70 font-semibold leading-[1] -ml-1">
                  Parcours
                </p>
              </div>
              <p
                className="animate-on-scroll text-gris text-base md:text-lg leading-relaxed max-w-xl mt-4 md:mt-6"
                data-delay="400"
              >
                Je suis Laury, fondatrice de YoGyFace. Ce qui a commencé comme
                une quête personnelle face à mon miroir est devenu une méthode
                qui transforme des centaines de visages — naturellement.
              </p>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div
                className="animate-on-scroll relative w-full max-w-[320px] md:max-w-[480px]"
                data-anim="scale"
                data-delay="300"
              >
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-corail/10 via-rose/20 to-bleu/10 rounded-3xl blur-3xl pointer-events-none animate-pulse-soft hidden md:block" />
                <div className="absolute -top-3 -right-3 w-16 md:w-20 h-16 md:h-20 border-2 border-corail/15 rounded-2xl pointer-events-none hidden sm:block" />
                <div className="absolute -bottom-3 -left-3 w-20 md:w-28 h-20 md:h-28 border-2 border-bleu/15 rounded-2xl pointer-events-none hidden sm:block" />
                <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/laury-expertise.webp"
                    alt="Laury — expertise en anatomie faciale et yoga du visage"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story steps — photo + timeline */}
      <section className="py-16 md:py-24 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-bleu/15 rounded-full blur-3xl pointer-events-none hidden md:block" />

        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-center">
            {/* Photo gauche */}
            <div
              className="animate-on-scroll img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
              data-anim="fade"
            >
              <img
                src="/laury-bureau.webp"
                alt="Laury au bureau — création de programmes"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            {/* Timeline droite */}
            <div className="relative">
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-corail/40 via-corail/20 to-corail/5 hidden md:block" />
              <div className="space-y-6">
                {steps.map((s, i) => (
                  <div
                    key={s.num}
                    className="animate-on-scroll flex gap-4 md:gap-6"
                    data-anim="fade"
                    data-delay={`${i * 100}`}
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-corail/30 flex items-center justify-center z-10">
                      <span className="font-display font-black text-sm text-corail">
                        {s.num}
                      </span>
                    </div>
                    <div className="flex-1 pb-2">
                      <h3 className="font-display font-black text-base md:text-lg tracking-tight text-noir mb-1">
                        {s.title}
                      </h3>
                      <p className="text-gris text-[13px] md:text-[15px] leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mon histoire en vidéo */}
      <section className="py-16 md:py-24 px-[5%] bg-white relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          <div
            className="text-center mb-10 md:mb-14 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">En vidéo</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir leading-none">
              MON HISTOIRE,
              <br />
              <span className="block font-serif italic text-corail font-semibold">
                en toute sincérité
              </span>
            </h2>
            <p className="text-gris text-[14px] md:text-[16px] mt-3 md:mt-4 max-w-xl mx-auto">
              Pourquoi j'ai tout quitté pour créer YoGyFace, et ce que j'ai
              appris en chemin.
            </p>
          </div>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
            {parcoursVideos.map((v, i) => (
              <div
                key={v.id}
                className="animate-on-scroll"
                data-anim="fade"
                data-delay={`${i * 150}`}
              >
                <YouTubeEmbed id={v.id} title={v.title} />
                <p className="text-noir text-sm md:text-[15px] font-medium mt-3 leading-snug">
                  {v.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photos parcours — Slide 54 */}
      <section className="py-16 md:py-24 px-[5%] bg-creme relative overflow-hidden">
        <div
          className="absolute top-12 right-12 w-40 h-40 opacity-[0.03] pointer-events-none hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="max-w-[1400px] mx-auto">
          <div
            className="text-center mb-10 md:mb-16 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">
              Formations & rencontres
            </div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir leading-none">
              MES INSPIRATIONS
            </h2>
            <p className="text-gris text-[14px] md:text-[16px] mt-3 md:mt-4 max-w-xl mx-auto">
              J'ai eu la chance d'apprendre auprès des meilleures expertes du
              yoga du visage et du bien-être. Chaque rencontre a nourri ma
              méthode.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {parcoursPhotos.map((photo, i) => (
              <div
                key={photo.src}
                className="animate-on-scroll card-hover rounded-2xl overflow-hidden border border-noir/5 hover:border-corail/15 flex flex-col"
                data-anim="scale"
                data-delay={`${i * 150}`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 md:p-5 bg-white flex-1">
                  <h4 className="font-display font-black text-base md:text-lg tracking-tight text-noir mb-1">
                    {photo.name}
                  </h4>
                  <p className="text-gris text-xs md:text-sm leading-relaxed">
                    {photo.desc}
                  </p>
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
            <div
              className="animate-on-scroll relative overflow-hidden"
              data-anim="fade"
              data-delay="100"
            >
              <div className="absolute -inset-4 bg-corail/5 rounded-3xl blur-2xl pointer-events-none hidden md:block" />
              <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="/laury-livres.webp"
                  alt="Laury — passionnée de science et d'anatomie faciale"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </div>
            {/* Quote */}
            <div
              className="animate-on-scroll border-l-3 border-corail/50 pl-5 md:pl-7"
              data-anim="fade"
              data-delay="200"
            >
              <p className="text-white text-[17px] md:text-[20px] leading-relaxed font-serif italic font-semibold">
                "{lauryQuote1}
              </p>
              <p className="text-white text-[17px] md:text-[20px] leading-relaxed font-serif italic font-semibold mt-4">
                {lauryQuote2}"
              </p>
              <p className="text-corail text-md font-semibold mt-4">
                Laury Anater
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="py-16 md:py-28 px-[5%] bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div
            className="text-center mb-10 md:mb-16 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">
              Mon équipe d'expertes
            </div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-3 md:mb-4">
              UNE APPROCHE
              <br />
              <span className="block font-serif italic text-corail font-semibold">
                vraiment holistique
              </span>
            </h2>
            <p className="text-gris text-[14px] md:text-[16px] mt-3 max-w-xl mx-auto">
              YoGyFace n'est pas un cours de yoga du visage. J'ai réuni des
              expertes pour te transmettre une approche globale du bien-être.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {experts.map((e, i) => (
              <div
                key={e.role}
                className="animate-on-scroll card-hover text-center p-5 md:p-7 rounded-2xl bg-creme border border-noir/5 hover:border-corail/20 hover:shadow-md group w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-14px)]"
                data-anim="scale"
                data-delay={`${i * 80}`}
              >
                <div className="w-12 h-12 rounded-xl bg-corail/10 flex items-center justify-center text-corail mb-3 mx-auto group-hover:bg-corail group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <Icon name={e.icon} size={22} />
                </div>
                <h4 className="font-display font-black text-sm md:text-base tracking-tight mb-2">
                  {e.role}
                </h4>
                <p className="text-gris text-xs md:text-[13px] leading-relaxed">
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key differentiator block */}
      <section className="py-16 md:py-24 px-[5%] bg-creme">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[3fr_2fr] gap-8 md:gap-12 items-center">
            <div
              className="animate-on-scroll card-hover bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-noir/5"
              data-anim="fade"
            >
              <div className="section-badge">
                Quelle différence avec les concurrents ?
              </div>
              <h2 className="font-display font-black text-xl md:text-2xl tracking-tight text-noir mb-4 md:mb-6">
                YoGyFace RESET vs. les autres programmes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-gris font-semibold text-sm uppercase tracking-wider mb-3 md:mb-4">
                    Les autres
                  </h3>
                  {[
                    "Exercices génériques non personnalisés",
                    "Aucun diagnostic préalable",
                    "Vidéos pré-enregistrées sans suivi",
                    "Yoga du visage basique",
                    "Aucun expert tiers",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 mb-2 md:mb-3"
                    >
                      <span className="text-gris/30 text-sm mt-0.5">✗</span>
                      <span className="text-gris text-xs md:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-corail font-semibold text-sm uppercase tracking-wider mb-3 md:mb-4">
                    YoGyFace RESET™
                  </h3>
                  {[
                    "Diagnostic 130 points + programme sur-mesure",
                    "Reprogrammation neuro-faciale (pas du yoga classique)",
                    "12 coachings live sur 6 mois",
                    "Suivi mensuel et retours personnalisés",
                    "Autonomie totale — gestes automatiques à vie",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 mb-2 md:mb-3"
                    >
                      <span className="text-corail text-sm mt-0.5">✓</span>
                      <span className="text-noir text-xs md:text-sm font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="animate-on-scroll img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
              data-anim="fade"
              data-delay="200"
            >
              <img
                src="/laury-equipe.webp"
                alt="L'équipe YoGyFace"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-[5%] bg-noir text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-corail/8 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />

        <div
          className="max-w-xl mx-auto relative z-10 animate-on-scroll"
          data-anim="scale"
        >
          <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-black tracking-tighter mb-4 md:mb-6">
            PRÊTE À<br />
            <span className="font-serif italic text-corail font-semibold">
              commencer ?
            </span>
          </h2>
          <p className="text-white/50 mb-6 md:mb-8 text-[14px] md:text-[16px]">
            Inscris-toi sur la liste d'attente pour être prévenue dès qu'une
            place se libère.
          </p>
          <Link
            to="/liste-attente"
            className="btn-corail text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4"
          >
            Rejoindre la liste d'attente →
          </Link>
        </div>
      </section>
    </>
  );
}
