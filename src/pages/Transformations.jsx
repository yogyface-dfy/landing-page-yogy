import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const results = [
  {
    img: "/ba-01.webp",
    duration: "8 semaines",
    zone: "Fermeté du cou et relâchement",
    tag: "Céline",
  },
  {
    img: "/ba-02.webp",
    duration: "6 semaines",
    zone: "Double menton et affaissement",
    tag: "Audrey",
  },
  {
    img: "/ba-03.webp",
    duration: "3 mois",
    zone: "Sillons nasogéniens",
    tag: "Corinne",
  },
  {
    img: "/ba-04.webp",
    duration: "4 mois",
    zone: "Affaissement du regard / Paupières tombantes",
    tag: "Yael",
    triptych: true,
  },
  {
    img: "/ba-05.webp",
    duration: "3 mois",
    zone: "Ovale et Bajoues",
    tag: "Carine",
  },
  {
    img: "/ba-06.webp",
    duration: "1 mois",
    zone: "Double menton et affaissement",
    tag: "Peggy",
  },
  {
    img: "/ba-07.webp",
    duration: "3 mois",
    zone: "Sillons nasogéniens",
    tag: "Jennifer",
  },
  {
    img: "/ba-08.webp",
    duration: "6 semaines",
    zone: "Bas du visage",
    tag: "Peggy",
  },
  {
    img: "/ba-09.webp",
    duration: "2 mois",
    zone: "Volume, Bajoues et asymétrie",
    tag: "Marie-Laure",
  },
  {
    img: "/ba-11.webp",
    duration: "6 mois",
    zone: "Rides du front",
    tag: "Christelle",
  },
  {
    img: "/ba-10.webp",
    duration: "1 mois",
    zone: "Rides d'expression",
    tag: "Christel",
  },
];

const testimonials = [
  {
    text: "Ma ride du lion devient presque invisible, alors qu'elle me dérangeait énormément. La différence la plus impressionnante est pour mes paupières qui tombent vraiment beaucoup moins ! J'arrive maintenant à mettre de l'eye-liner sans galérer. Laury est exceptionnelle. Ses diagnostics sont tellement personnalisés que j'ai l'impression d'être sa « patiente » plutôt que sa cliente.",
    name: "Jeanne R.",
    info: "Ride du lion · Paupières · Asymétrie",
    initial: "J",
    link: "https://www.trustpilot.com/reviews/6a008d013da13a0d8a16d222",
  },
  {
    text: "Cela fait maintenant un an que je pratique le yoga du visage avec Laury, et je suis vraiment ravie des résultats. Avant de découvrir le yoga du visage, j'avais eu recours au botox qui m'avait créé de nouvelles problématiques, mais le yoga du visage m'a permis de corriger tout cela. J'ai repris totalement confiance en moi-même, je m'accepte de nouveau dans le miroir. Je recommande à 100 %, sans aucune déception.",
    name: "Carine",
    info: "Une renaissance · Après Botox · Confiance retrouvée",
    initial: "C",
    link: "https://www.trustpilot.com/reviews/6a29584db820ab188088ce5e",
  },
  {
    text: "En 6 mois de YoGyFace j'ai l'impression d'avoir gagné 10 ans (au moins), un regard rajeuni et plus ouvert. Grâce à son programme sur mesure, j'ai retrouvé une peau restructurée et plus ferme. Je me regarde avec joie dans le miroir et je vois quelqu'un qui a pris soin d'elle et qui n'a plus peur de vieillir. Je recommande Laury de YoGyFace à 200 %.",
    name: "Elisabeth",
    info: "66 ans · 6 mois · Regard & fermeté",
    initial: "E",
    link: "https://www.trustpilot.com/reviews/6a2a71cf6ece41f3321f45d1",
  },
  {
    text: "Après 8 semaines, mon mari m'a demandé si j'avais fait quelque chose. Mon ovale est plus défini, mes cernes se sont atténuées. Je ne pensais pas que c'était possible sans injection.",
    name: "Sophie M.",
    info: "47 ans · 8 semaines · Relâchement & ovale",
    initial: "S",
  },
  {
    text: "Je ne me reconnaissais plus sur les photos — je me trouvais moche. Aujourd'hui je prends des selfies. La méthode RESET m'a rendu bien plus qu'un visage, elle m'a rendu confiance.",
    name: "Marie-Claire B.",
    info: "52 ans · 3 mois · Perte de volume",
    initial: "M",
  },
  {
    text: "J'avais un côté plus haut que l'autre, une asymétrie. En 6 semaines de travail ciblé, mon visage s'est rééquilibré. Je n'aurais jamais cru que c'était possible naturellement.",
    name: "Nathalie D.",
    info: "44 ans · 6 semaines · Asymétrie",
    initial: "N",
  },
  {
    text: "Je n'osais plus du tout sourire à cause de mes rides très prononcées autour de la bouche. Maintenant je souris librement. Mon visage a l'air plus jeune, plus reposé, plus moi.",
    name: "Christine R.",
    info: "51 ans · 2 mois · Rides d'expression",
    initial: "C",
  },
  {
    text: "J'avais besoin de me retrouver — je m'étais complètement oubliée. La méthode de Laury m'a appris à prendre soin de moi. 10 minutes par jour, rien que pour moi.",
    name: "Valérie T.",
    info: "49 ans · 3 semaines · Bien-être & routines",
    initial: "V",
  },
  {
    text: "J'avais l'impression que tout commençait à s'affaisser vers le bas. Double menton, bajoues légères, la jawline disparaissait. Aujourd'hui je vois de nouveau la définition de mon ovale.",
    name: "Isabelle P.",
    info: "55 ans · 4 mois · Programme complet",
    initial: "I",
  },
];

const stats = [
  { number: "700+", label: "Femmes transformées" },
  { number: "4.9/5", label: "Satisfaction moyenne" },
  { number: "21j", label: "Premiers résultats visibles" },
  { number: "97%", label: "Recommanderaient RESET" },
];

export default function Transformations() {
  return (
    <>
      <SEO
        title="Transformations & Résultats"
        description="Découvrez les transformations réelles des femmes accompagnées par Laury avec la méthode RESET™. Témoignages et résultats visibles dès 6 semaines."
        path="/transformations"
      />
      {/* Hero */}
      <section className="relative md:min-h-[85vh] flex items-center pt-28 md:pt-24 pb-8 px-[7%] md:px-[10%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-creme via-white to-white pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-rose/20 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[1400px] mx-auto relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div
                className="animate-on-scroll section-badge"
                data-anim="fade"
                data-delay="100"
              >
                Des preuves, pas des promesses
              </div>
              <div
                className="animate-on-scroll"
                data-anim="fade"
                data-delay="200"
              >
                <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
                  DES TRANSFORMATIONS
                </h1>
                <p className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] text-corail font-semibold mb-4">
                  qui se voient
                </p>
              </div>
              <p
                className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed max-w-xl"
                data-delay="400"
              >
                Pas de filtres. Pas de retouches. Tu te rends compte de tes
                résultats en photos, mois après mois. Ces résultats viennent
                directement de la communauté YoGyFace, de femmes qui ont suivi
                RESET™.
              </p>
            </div>
            <div
              className="animate-on-scroll flex justify-center md:justify-end"
              data-anim="fade"
              data-delay="300"
            >
              <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-xl max-w-[550px]">
                <img
                  src="/laury-profil.webp"
                  alt="Laury — profil, geste de drainage du cou"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-[5%] bg-noir relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-corail/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="animate-on-scroll text-center"
                data-anim="scale"
                data-delay={`${i * 100}`}
              >
                <p className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-corail">
                  {s.number}
                </p>
                <p className="text-white/40 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After grid */}
      <section className="py-20 px-[5%] bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {results.map((r, i) => (
              <div
                key={i}
                className="animate-on-scroll card-hover rounded-2xl overflow-hidden border border-noir/5 hover:border-corail/15"
                data-anim="scale"
                data-delay={`${i * 70}`}
              >
                <div className="relative">
                  <img
                    src={r.img}
                    alt={`Avant/Après — ${r.zone}`}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                  {r.triptych ? (
                    <>
                      <div className="absolute top-2 left-2 md:top-3 md:left-3 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full bg-white/80 backdrop-blur-sm text-[9px] md:text-[10px] font-semibold uppercase tracking-wide md:tracking-wider text-gris">
                        Avant
                      </div>
                      <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full bg-white/80 backdrop-blur-sm text-[9px] md:text-[10px] font-semibold uppercase tracking-wide md:tracking-wider text-gris">
                        Pendant
                      </div>
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full bg-corail/90 backdrop-blur-sm text-[9px] md:text-[10px] font-semibold uppercase tracking-wide md:tracking-wider text-white">
                        Après
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-gris">
                        Avant
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-corail/90 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-white">
                        Après
                      </div>
                    </>
                  )}
                </div>
                <div className="p-3 md:p-4 bg-white flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-corail uppercase tracking-wider">
                      {r.tag}
                    </p>
                    <p className="text-xs text-gris mt-0.5">{r.zone}</p>
                  </div>
                  <span className="text-[11px] font-medium text-noir/50 bg-creme px-2.5 py-1 rounded-full">
                    {r.duration}
                  </span>
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
          <div
            className="text-center mb-16 animate-on-scroll"
            data-anim="scale"
          >
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-4">
              CE QU'ELLES
              <br />
              <span className="font-serif italic text-corail font-semibold">
                en disent
              </span>
            </h2>
            <p className="text-gris mt-3 text-sm font-serif italic mb-6">
              Ces phrases viennent directement des clientes de Laury — non
              éditées.
            </p>
            {/* Trustpilot */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
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
              <a
                href="https://fr.trustpilot.com/review/yogyface.fr"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 text-sm"
              >
                <span className="font-display font-black text-noir">4.9/5</span>
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
                          s === 5 ? { clipPath: "inset(0 20% 0 0)" } : undefined
                        }
                      />
                      {s === 5 && (
                        <rect x="19.2" width="4.8" height="24" fill="#dcdce6" />
                      )}
                    </svg>
                  ))}
                </div>
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="animate-on-scroll card-hover bg-white rounded-2xl p-5 md:p-7 border border-noir/5 hover:border-corail/15"
                data-delay={`${i * 80}`}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-3.5 h-3.5 text-corail/60"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-noir/70 text-[15px] leading-relaxed mb-4 font-serif italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-corail/20 to-rose/30 flex items-center justify-center text-corail font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-noir font-semibold text-sm">{t.name}</p>
                    <p className="text-gris text-xs">{t.info}</p>
                    {t.link && (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener"
                        className="text-[11px] text-[#00b67a] font-semibold hover:underline mt-0.5 inline-block"
                      >
                        Voir l'avis complet ↗
                      </a>
                    )}
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

        <div
          className="max-w-xl mx-auto relative z-10 animate-on-scroll"
          data-anim="scale"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black tracking-tighter mb-6">
            ET TOI, C'EST
            <br />
            <span className="font-serif italic text-corail font-semibold">
              quand ?
            </span>
          </h2>
          <p className="text-white/50 mb-8 text-[16px]">
            Ces résultats peuvent être les tiens. Inscris-toi pour être prévenue
            dès qu'une place se libère.
          </p>
          <Link to="/liste-attente" className="btn-corail text-base px-8 py-4">
            Rejoindre la liste d'attente →
          </Link>
          <p className="text-white/30 text-sm mt-6">
            Découvre comment j'obtiens ces résultats avec{" "}
            <Link
              to="/programme"
              className="text-corail/80 font-semibold hover:underline"
            >
              la méthode RESET™
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
