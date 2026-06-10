import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import SEO from "../components/SEO";

// Rendu d'un élément du bandeau de préoccupations
const renderStat = (s, i) => (
  <span
    key={i}
    className="inline-flex items-center gap-3 mx-6 md:mx-10 text-xs md:text-sm font-semibold text-noir/50"
  >
    <span className="w-1 h-1 rounded-full bg-corail/60" />
    {s}
  </span>
);

// Rendu d'une marque dans le bandeau "Elles m'ont fait confiance"
const renderBrand = (b, i) => (
  <Link
    key={i}
    to={`/evenements#${b.id}`}
    className="inline-flex items-center mx-8 md:mx-14 text-[22px] md:text-[28px] font-display font-black tracking-tight text-noir/15 select-none hover:text-corail/40 transition-colors duration-300"
  >
    {b.name}
  </Link>
);

const stats = [
  "Amertumes",
  "Rides d'expression",
  "Sillons nasogéniens",
  "Rides du fumeur (code-barre)",
  "Double menton",
  "Pattes d'oie",
  "Asymétrie",
  "Rides du front",
  "Rides du lion",
  "Pommettes",
  "Bajoues",
];

const features = [
  { label: "Routine progressive" },
  { label: "Sans matériel" },
  { label: "100% naturel" },
  { label: "100% Personnalisé" },
];

const pillars = [
  {
    letter: "R",
    title: "Rééduquer",
    desc: "Je t'aide à reprogrammer les mauvaises habitudes posturales et musculaires qui creusent tes traits et affaissent ton visage.",
  },
  {
    letter: "E",
    title: "Équilibrer",
    desc: "Je corrige les déséquilibres musculaires de ton visage et harmonise les deux côtés pour retrouver ta symétrie naturelle.",
  },
  {
    letter: "S",
    title: "Stimuler",
    desc: "J'active ta circulation sanguine et lymphatique pour relancer la production de collagène et retrouver l'éclat.",
  },
  {
    letter: "E",
    title: "Éliminer",
    desc: 'Je libère les tensions accumulées dans ta mâchoire, ton cou et tes trapèzes qui "tirent" ton visage vers le bas.',
  },
  {
    letter: "T",
    title: "Tonifier",
    desc: "Je renforce tes 45 muscles du visage pour lifter naturellement l'ovale, les joues et les paupières — sans chirurgie.",
  },
];

const sciencePoints = [
  {
    icon: "dna",
    title: "45 muscles à entraîner",
    desc: "Ton visage est composé de 45 muscles. Comme n'importe quel muscle du corps, ils répondent à l'entraînement. Le problème ? Personne ne t'a jamais appris à les utiliser.",
  },
  {
    icon: "refresh",
    title: "Agir sur la cause",
    desc: "Les crèmes masquent les symptômes. Le yoga du visage agit sur la cause : posture, musculature, circulation, tensions. C'est une approche en profondeur, pas un pansement.",
  },
  {
    icon: "massage",
    title: "Circulation & collagène",
    desc: "En stimulant la circulation sanguine et lymphatique, le yoga du visage relance naturellement la production de collagène et d'élastine. Le teint s'illumine, la peau se raffermit.",
  },
  {
    icon: "lotus",
    title: "Tensions & vieillissement",
    desc: 'Le stress, le bruxisme, la posture devant les écrans… tout ça crée des tensions qui "tirent" ton visage vers le bas. Le yoga du visage libère ces tensions et inverse le processus.',
  },
];

const brands = [
  { name: "Biotherm", id: "biotherm" },
  { name: "La Canopée", id: "la-canopee" },
  { name: "Talika", id: "talika" },
  { name: "Caudalie", id: "caudalie" },
  { name: "EllesVMH", id: "ellesvmh" },
  { name: "The New Well", id: "the-new-well" },
  { name: "Le Congrès de l'Esthétique", id: "congres-esthetique" },
  { name: "Baton Rouge", id: "baton-rouge" },
  { name: "Epicosme", id: "epicosme" },
  { name: "Lauvée", id: "lauvee" },
];

const testimonials = [
  {
    text: "Je ne me reconnaissais plus dans le miroir. Après 8 semaines, mon mari m'a demandé si j'avais fait quelque chose. Mon ovale est redéfini, mes cernes se sont atténuées.",
    name: "Sophie M.",
    info: "47 ans · 8 semaines",
    initial: "S",
  },
  {
    text: "J'avais besoin de me retrouver, je m'étais complètement oubliée. La méthode de Laury m'a rendu bien plus qu'un visage — elle m'a rendu confiance.",
    name: "Isabelle R.",
    info: "44 ans · 6 semaines",
    initial: "I",
  },
  {
    text: "Je n'osais plus du tout sourire à cause de mes rides très prononcées autour de la bouche. Aujourd'hui je souris librement. Mon visage a l'air plus jeune, plus reposé.",
    name: "Christine R.",
    info: "51 ans · 2 mois",
    initial: "C",
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Yoga du Visage & Méthode RESET"
        description="Reprends le contrôle de ton visage naturellement avec la méthode RESET™ de Laury. Programmes de yoga facial 100% personnalisés, faits main. Tonifie, lifte et rajeunit en 10 min/jour."
        path="/"
      />
      {/* ═══ HERO ═══ */}
      <section className="relative md:min-h-screen flex items-center pt-28 md:pt-24 pb-12 md:pb-16 px-[7%] md:px-[10%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose/30 via-white to-bleu/20 pointer-events-none" />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-corail/10 blur-3xl pointer-events-none animate-float"
          data-parallax="-0.08"
        />
        <div
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-bleu/20 blur-3xl pointer-events-none animate-float-slow"
          data-parallax="0.05"
        />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-orange/10 blur-2xl pointer-events-none animate-float-delayed hidden md:block" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div
                className="animate-on-scroll section-badge"
                data-anim="fade"
                data-delay="100"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse-soft" />
                Yoga du visage · Par Laury
              </div>

              <div className="overflow-hidden mb-4 md:mb-6">
                <h1
                  className="animate-on-scroll font-display text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1] tracking-tighter text-noir"
                  data-delay="200"
                >
                  REPRENDS LE CONTRÔLE DE
                  <br />
                  <span className="font-serif italic text-corail/75 font-semibold">
                    ton visage.
                  </span>
                </h1>
              </div>

              <p
                className="animate-on-scroll text-[15px] md:text-[17px] text-gris leading-relaxed mb-3 md:mb-4 max-w-md"
                data-delay="400"
              >
                Je suis Laury, fondatrice de YoGyFace. J'ai créé ma propre
                méthode de yoga du visage pour t'aider à retrouver un visage
                tonique, lumineux et défini — naturellement, en moins de 10
                minutes par jour.
              </p>
              <p
                className="animate-on-scroll text-[14px] md:text-[15px] text-gris/70 leading-relaxed mb-6 md:mb-8 max-w-md"
                data-delay="500"
              >
                <span className="font-serif italic text-[15px] md:text-[16px]">
                  Sans bistouri. Sans aiguille. Sans dépendance aux produits
                  cosmétiques.
                </span>
              </p>

              <div
                className="animate-on-scroll grid grid-cols-2 gap-2 mb-6 md:mb-8 max-w-xs"
                data-delay="600"
              >
                {features.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 text-xs md:text-sm text-gris group"
                  >
                    <span className="w-4 h-4 rounded-full border border-corail/30 flex items-center justify-center text-[10px] text-corail group-hover:bg-corail group-hover:text-white transition-all duration-300">
                      ✓
                    </span>
                    {f.label}
                  </div>
                ))}
              </div>

              <div
                className="animate-on-scroll flex flex-col sm:flex-row gap-3"
                data-delay="700"
              >
                <Link
                  to="/liste-attente"
                  className="btn-primary text-sm md:text-base px-6 md:px-7 py-3 md:py-3.5 text-center"
                >
                  Rejoindre la liste d'attente →
                </Link>
                <Link
                  to="/about"
                  className="btn-secondary text-sm md:text-base px-6 md:px-7 py-3 md:py-3.5 text-center"
                >
                  Découvrir mon parcours
                </Link>
              </div>
              {/* Trustpilot */}
              <div
                className="animate-on-scroll mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start"
                data-delay="600"
              >
                <a
                  href="https://fr.trustpilot.com/review/yogyface.fr?utm_medium=trustbox&utm_source=MicroReviewCount"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="font-display font-black text-noir">
                    4.9/5
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="text-[#00b67a]"
                      >
                        <rect width="24" height="24" fill="currentColor" />
                        <path
                          d="M12 2l2.9 6.3L22 9.2l-5 4.6L18.2 21 12 17.3 5.8 21 7 13.8 2 9.2l7.1-.9z"
                          fill="white"
                          style={
                            s === 5
                              ? { clipPath: "inset(0 20% 0 0)" }
                              : undefined
                          }
                        />
                        {s === 5 && (
                          <rect
                            x="19.2"
                            width="4.8"
                            height="24"
                            fill="#dcdce6"
                          />
                        )}
                      </svg>
                    ))}
                  </div>
                </a>
                <div
                  className="trustpilot-widget"
                  data-locale="fr-FR"
                  data-template-id="5419b6a8b0d04a076446a9ad"
                  data-businessunit-id="68f5f301affbe7a3ef3d7f12"
                  data-style-height="24px"
                  data-style-width="auto"
                  data-token="88d2e0d6-59e3-40aa-866d-09c7d744a2a8"
                  data-min-review-count="0"
                  data-style-alignment="center"
                >
                  <a
                    href="https://fr.trustpilot.com/review/yogyface.fr"
                    target="_blank"
                    rel="noopener"
                  >
                    Trustpilot
                  </a>
                </div>
              </div>
            </div>

            {/* Laury photo — shown first on mobile */}
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div
                className="animate-on-scroll relative w-full max-w-[320px] md:max-w-[520px]"
                data-anim="scale"
                data-delay="300"
              >
                <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-16 md:w-24 h-16 md:h-24 border-2 border-corail/20 rounded-2xl pointer-events-none hidden sm:block" />
                <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-20 md:w-32 h-20 md:h-32 border-2 border-bleu/20 rounded-2xl pointer-events-none hidden sm:block" />
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/laury-hero.png"
                    alt="Laury, fondatrice de YoGyFace"
                    fetchpriority="high"
                    width="682"
                    height="1024"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <section className="py-3 md:py-4 border-y border-noir/6 overflow-hidden bg-white/80 backdrop-blur-sm">
        {/* Desktop : une seule ligne */}
        <div className="hidden md:flex animate-marquee whitespace-nowrap">
          {[...stats, ...stats, ...stats, ...stats].map(renderStat)}
        </div>
        {/* Mobile : deux lignes (sens opposés) pour tout voir plus vite */}
        <div className="md:hidden flex flex-col gap-2">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...stats.slice(0, 6), ...stats.slice(0, 6), ...stats.slice(0, 6), ...stats.slice(0, 6)].map(renderStat)}
          </div>
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...stats.slice(6), ...stats.slice(6), ...stats.slice(6), ...stats.slice(6)].map(renderStat)}
          </div>
        </div>
      </section>

      {/* ═══ QU'EST-CE QUE LE YOGA DU VISAGE ? ═══ */}
      <section className="py-16 md:py-28 px-[5%] bg-white relative overflow-hidden">
        <div
          className="absolute top-12 right-12 w-40 h-40 opacity-[0.03] pointer-events-none hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-center">
            {/* Photo drainage */}
            <div
              className="animate-on-scroll relative overflow-hidden"
              data-anim="fade"
              data-delay="100"
            >
              <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-xl relative mx-auto">
                <img
                  src="/laury-drainage.png"
                  alt="Laury — geste de drainage lymphatique du cou"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            {/* Text + cards */}
            <div>
              <div className="animate-on-scroll line-draw" data-anim="fade">
                <div className="section-badge">Comprendre</div>
                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tighter text-noir mb-4 md:mb-6">
                  LE YOGA DU VISAGE,
                  <br />
                  <span className="font-serif italic font-semibold text-corail">
                    c'est quoi ?
                  </span>
                </h2>
              </div>
              <p
                className="animate-on-scroll text-gris text-[15px] md:text-[16px] leading-relaxed mb-3 md:mb-4"
                data-delay="100"
              >
                Le yoga du visage, c'est une gymnastique douce et ciblée des 45
                muscles de ton visage. Comme n'importe quel muscle du corps, les
                muscles faciaux ont besoin d'être entraînés, étirés et détendus.
              </p>
              <p
                className="animate-on-scroll text-gris text-[15px] md:text-[16px] leading-relaxed mb-3 md:mb-4"
                data-delay="200"
              >
                Avec le temps, le stress, nos mauvaises postures et le manque de
                stimulation, ces muscles s'atrophient et se contractent. Le
                résultat : perte de volume, rides d'expression, relâchement,
                teint terne et gonflements.
              </p>
              <p
                className="animate-on-scroll text-gris text-[15px] md:text-[16px] leading-relaxed mb-6 md:mb-8"
                data-delay="300"
              >
                <strong className="text-noir">Mon approche va plus loin</strong>{" "}
                que le yoga du visage classique. J'ai développé ma propre
                méthode — <span className="font-serif italic">RESET™</span> —
                qui combine réeducation des habitudes, reprogrammation
                neuro-faciale, drainage lymphatique, relaxation des tensions et
                tonification musculaire ciblée.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sciencePoints.map((d, i) => (
                  <div
                    key={d.title}
                    className="animate-on-scroll card-hover bg-creme rounded-2xl p-4 md:p-5 border border-transparent hover:border-corail/15"
                    data-anim="scale"
                    data-delay={`${i * 100 + 400}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-corail/10 flex items-center justify-center text-corail">
                        <Icon name={d.icon} size={20} />
                      </div>
                      <h4 className="font-display font-black text-[16px] md:text-[19px] tracking-tight">
                        {d.title}
                      </h4>
                    </div>
                    <p className="text-gris text-[13px] md:text-[14px] leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUES / CONFIANCE ═══ */}
      <section className="py-14 md:py-20 px-[5%] bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center mb-8">
          <p
            className="animate-on-scroll text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-noir/30"
            data-anim="fade"
          >
            Elles m'ont fait confiance
          </p>
        </div>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          {/* Desktop : une seule ligne */}
          <div className="hidden md:flex animate-marquee-slow whitespace-nowrap">
            {[...brands, ...brands, ...brands, ...brands].map(renderBrand)}
          </div>
          {/* Mobile : deux lignes (sens opposés), plus rapides */}
          <div className="md:hidden flex flex-col gap-3">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...brands.slice(0, 5), ...brands.slice(0, 5), ...brands.slice(0, 5), ...brands.slice(0, 5)].map(renderBrand)}
            </div>
            <div className="flex animate-marquee-reverse whitespace-nowrap">
              {[...brands.slice(5), ...brands.slice(5), ...brands.slice(5), ...brands.slice(5)].map(renderBrand)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CE QUE TU RESSENS ═══ */}
      <section className="py-16 md:py-28 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <div className="animate-on-scroll" data-anim="scale">
            <div className="section-badge justify-center">
              Tu te reconnais ?
            </div>
            <h2 className="font-display text-[clamp(1.5rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-2 md:mb-4">
              JE REÇOIS CES MESSAGES
              <br />
              <span className="font-serif italic text-[clamp(1.2rem,4vw,2.5rem)] text-corail font-semibold">
                tous les jours
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mt-6 md:mt-10">
            {[
              "« Je ne me reconnais plus sur les photos… j'ai pris un coup de vieux. »",
              "« J'ai l'impression que tout commence à s'affaisser vers le bas… »",
              "« Je n'ose plus sourire, j'ai des rides très prononcées autour de la bouche. »",
              "« On m'a toujours donné moins que mon âge, mais aujourd'hui, je ne me retrouves plus du tout dans l'image que je dégage. »",
              "« J'ai besoin de me retrouver, je me suis complètement oubliée. »",
              "« Après mon burn-out, mon visage a complétement changé. »",
            ].map((q, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-xl p-4 md:p-5 border border-noir/5 italic text-gris text-[14px] md:text-[15px] leading-relaxed hover:border-corail/15 hover:shadow-sm transition-all duration-500"
                data-delay={`${i * 80}`}
              >
                {q}
              </div>
            ))}
          </div>
          <p
            className="animate-on-scroll text-gris text-sm md:text-base mt-8 md:mt-10 max-w-lg mx-auto font-serif italic"
            data-delay="500"
          >
            Le point de toutes ces femmes c'est qu'elles cherchaient une
            solution pour mieux vieillir.
          </p>
        </div>
      </section>

      {/* ═══ MA MÉTHODE RESET ═══ */}
      <section className="py-12 md:py-20 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-corail/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-[1400px] mx-auto">
          <div
            className="text-center mb-6 md:mb-10 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">Ma méthode</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir leading-tight mb-2 md:mb-3">
              LA MÉTHODE{" "}
              <span className="font-serif italic text-corail font-semibold">
                RESET™
              </span>
            </h2>
            <p className="text-gris text-[15px] md:text-[17px] max-w-2xl mx-auto leading-relaxed">
              J'ai développé RESET™ autour de 5 piliers fondamentaux. Ce n'est
              pas du yoga du visage classique — c'est une reprogrammation
              neuro-faciale complète qui agit sur la cause, pas les symptômes.
            </p>
            <p className="text-gris text-[14px] md:text-[16px] leading-relaxed max-w-2xl mx-auto mt-3">
              Je t'apprends à adopter les bons réflexes au quotidien, étape par
              étape, pour que chaque geste devienne naturel et durable, sans
              charge mentale.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {pillars.map((p, i) => (
              <div
                key={p.letter + i}
                className={`animate-on-scroll card-hover bg-white rounded-2xl p-4 md:p-6 border border-noir/5 hover:border-corail/20 group ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                data-delay={`${i * 100}`}
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-corail/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-corail group-hover:scale-110 transition-all duration-300">
                  <span className="font-display font-black text-xl md:text-2xl text-corail group-hover:text-white transition-colors duration-300">
                    {p.letter}
                  </span>
                </div>
                <h3 className="font-display font-black text-base md:text-lg tracking-tight mb-1 md:mb-2">
                  {p.title}
                </h3>
                <p className="text-gris text-xs md:text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 animate-on-scroll" data-anim="fade" data-delay="500">
            <Link to="/programme" className="btn-corail text-sm px-7 py-3.5">
              Découvrir le programme RESET™ →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FAIT MAIN ═══ */}
      <section className="py-16 md:py-28 px-[5%] bg-white relative overflow-hidden">
        <div
          className="absolute top-20 right-0 w-48 h-48 opacity-[0.02] pointer-events-none hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-center">
            <div
              className="animate-on-scroll img-zoom rounded-2xl md:rounded-3xl overflow-hidden"
              data-anim="fade"
            >
              <img
                src="/laury-ecriture.png"
                alt="Laury qui écrit — création de programmes personnalisés à la main"
                loading="lazy"
                className="w-full h-[300px] md:h-auto object-cover md:object-contain object-[50%_18%]"
              />
            </div>
            <div>
              <div
                className="animate-on-scroll line-draw"
                data-anim="fade"
                data-delay="200"
              >
                <div className="section-badge">Pourquoi YoGyFace</div>
                <h2 className="font-display text-[clamp(1.5rem,4vw,2.8rem)] font-black tracking-tighter text-noir mb-3 md:mb-4">
                  CHAQUE PROGRAMME EST
                  <br />
                  <span className="font-serif italic text-corail font-semibold">
                    fait main
                  </span>
                </h2>
              </div>
              <p
                className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed mb-4 md:mb-6"
                data-anim="fade"
                data-delay="300"
              >
                Je ne suis pas une application. Je ne suis pas un algorithme.
                Chaque programme que je crée est{" "}
                <strong className="text-noir">
                  100% personnalisé, à la main
                </strong>
                . J'analyse ton visage, j'écoute tes envies, je comprends tes
                besoins anatomiques et je construis ta routine sur-mesure.
              </p>
              <div
                className="animate-on-scroll"
                data-anim="fade"
                data-delay="400"
              >
                <blockquote className="border-l-3 border-corail/40 pl-5 md:pl-6">
                  <p className="text-noir/60 text-[16px] md:text-[19px] leading-relaxed font-serif italic">
                    "C'est justement parce que je fais tout <strong className="text-noir/80">manuellement</strong> que
                    chaque programme est unique. <strong className="text-noir/80">Ton visage est unique, ton
                    programme doit l'être également.</strong> Ça prend du temps — mais
                    c'est ce qui fait <strong className="text-noir/80">la différence sur les résultats que tu
                    obtiendras.</strong>"
                  </p>
                  <p className="text-corail text-sm font-semibold mt-3">
                    Laury Anater
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 md:py-28 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose/30 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[1400px] mx-auto">
          <div
            className="text-center mb-6 md:mb-10 animate-on-scroll"
            data-anim="scale"
          >
            <div className="section-badge justify-center">Résultats réels</div>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir">
              ELLES L'ONT
              <br />
              <span className="font-serif italic text-corail font-semibold">
                vécu
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="animate-on-scroll card-hover bg-white rounded-2xl p-5 md:p-7 border border-noir/5 hover:border-corail/15"
                data-delay={`${i * 120}`}
              >
                <div className="flex gap-0.5 mb-3 md:mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-3.5 md:w-4 h-3.5 md:h-4 text-corail/70"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-noir/70 text-[14px] md:text-[15px] leading-relaxed mb-4 md:mb-6 font-serif italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 md:w-10 h-9 md:h-10 rounded-full bg-gradient-to-br from-corail/20 to-rose/30 flex items-center justify-center text-corail font-bold text-sm">
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
          <div className="text-center mt-10 animate-on-scroll" data-anim="fade" data-delay="400">
            <Link to="/transformations" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-corail/10 text-corail font-semibold text-sm tracking-tight border border-corail/20 hover:bg-corail hover:text-white hover:border-corail hover:shadow-lg hover:shadow-corail/20 transition-all duration-300 hover:-translate-y-0.5">
              Voir les transformations →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="py-16 md:py-28 px-[5%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose/40 via-creme to-bleu/20 bg-300% animate-gradient pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-corail/8 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />

        <div
          className="max-w-[700px] mx-auto text-center relative z-10 animate-on-scroll"
          data-anim="scale"
        >
          <div className="section-badge justify-center">Places limitées</div>
          <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-black tracking-tighter text-noir mb-4 md:mb-6">
            ENVIE DE COMMENCER ?
          </h2>
          <p className="text-gris text-[15px] md:text-[17px] leading-relaxed mb-8 md:mb-10">
            Chaque programme étant créé à la main, je ne peux accompagner qu'un
            nombre limité de femmes à la fois. Inscris-toi sur la liste
            d'attente pour être prévenue dès qu'une place se libère.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Link
              to="/liste-attente"
              className="btn-corail text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4"
            >
              Rejoindre la liste d'attente →
            </Link>
            <Link
              to="/transformations"
              className="btn-secondary text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4"
            >
              Voir les transformations
            </Link>
          </div>
          <p className="text-gris/60 text-sm mt-6">
            Des questions ? Consulte la{" "}
            <Link to="/faq" className="text-corail font-semibold hover:underline">FAQ</Link>
            {" "}ou découvre{" "}
            <Link to="/about" className="text-corail font-semibold hover:underline">mon parcours</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
