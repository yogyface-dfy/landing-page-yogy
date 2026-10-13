import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "./SEO";
import VenteResultats from "./vente-resultats";
import VentePlateforme from "./vente-plateforme";
import VenteReconnaissance from "./vente-reconnaissance";
import VenteEchecs from "./vente-echecs";
import VenteTemoignagesVideo from "./vente-temoignages-video";
import VenteValeur from "./vente-valeur";
import VenteGarantie from "./vente-garantie";
import {
  readPrefillEmail,
  startCheckoutSession,
  withStripePrefill,
} from "../lib/stripe-checkout";
import { SHOW_TRUSTPILOT } from "../lib/trustpilot";
import {
  TRUSTPILOT_REVIEWS,
  TRUSTPILOT_SCORE,
} from "../lib/trustpilot-reviews";
import { STUDIO_SALES_OPEN, VIP_SALES_OPEN } from "../lib/stripe-offers";

/**
 * Pages de vente privées (non indexées).
 * variant "vip"   → offre envoyée aux inscrites liste d'attente
 * variant "public" → offre classique
 * variant "dix"   → Studio, 10× seulement (/vente-10x)
 */
const OFFERS = {
  vip: {
    once: {
      plan: "vip-once",
      url: "https://buy.stripe.com/7sY9AS2KtdrCcYF7aP8Zq0q",
      price: 299,
      was: 999,
    },
    installments: [
      {
        plan: "vip-3x",
        times: 3,
        amount: "99,99",
        url: "https://buy.stripe.com/8x214mcl35Za1fX66L8Zq0r",
      },
      {
        plan: "vip-6x",
        times: 6,
        amount: "49,99",
      },
    ],
  },
  public: {
    once: {
      plan: "studio-once",
      price: 449,
      was: 899,
    },
    installments: [
      { plan: "studio-4x", times: 4, amount: "112,25" },
      { plan: "studio-6x", times: 6, amount: "74,99" },
    ],
  },
  dix: {
    once: {
      plan: "studio-10x",
      price: 449,
      was: 899,
    },
    // 10× reste le CTA principal ; 1× et 4× en secondaire.
    installments: [
      { plan: "studio-4x", times: 4, amount: "112,25" },
      { plan: "studio-once", label: "Payer 449 € en 1 fois" },
    ],
  },
};

const VIP_BONUSES = [
  {
    t: "6h de coaching offertes",
    d: "18h au total, au lieu de 12h.",
    save: "240 €",
  },
  {
    t: "6 mois d'accompagnement offerts",
    d: "12 mois au total, au lieu de 6.",
    save: "199 €",
  },
  {
    t: "Renouvellement de diagnostic offert",
    d: "Un second diagnostic complet pour ajuster la suite.",
    save: "299 €",
  },
];

// VIP / lancement public (plus de colonne « après lancement »).
// Ancre marketing : VIP 299 € / Studio 449 € (899 € barré).
const COMPARE = [
  { label: "Prix du programme", vip: "299 €", was: "999 €", public: "449 €" },
  {
    label: "Accès à la plateforme",
    vip: "Dès l'achat",
    hint: "prévente, l'app s'ouvre tout de suite",
    public: "Lancement public",
  },
  { label: "Coaching live", vip: "12h", bonus: "+6h", public: "12h" },
  {
    label: "Accompagnement",
    vip: "6 mois",
    bonus: "+6 mois",
    public: "6 mois",
  },
  {
    label: "Diagnostic",
    vip: "Initial",
    bonus: "+ renouvellement",
    hint: "à réaliser à partir du 17 septembre",
    public: "Initial uniquement",
  },
  {
    label: "Programme",
    vip: "Initial",
    bonus: "+ 2e offert à 6 mois",
    hint: "pour travailler de nouvelles zones",
    public: "Initial seulement",
  },
  { label: "Bonus exclusifs", vip: "Inclus", public: "—" },
];

const BRANDS = [
  "Biotherm",
  "La Canopée",
  "Talika",
  "Caudalie",
  "EllesVMH",
  "The New Well",
  "Le Congrès de l'Esthétique",
  "Baton Rouge",
  "Epicosme",
  "Lauvée",
];

const TESTIMONIALS = TRUSTPILOT_REVIEWS;

const TP_GREEN = "#00B67A";

function TpStars({ size = 16 }) {
  return (
    <span className="inline-flex gap-px" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="3" fill={TP_GREEN} />
          <path
            fill="#fff"
            d="M12 16.2l4.95 3-1.32-5.64L20 9.8l-5.76-.48L12 4 9.76 9.32 4 9.8l4.37 3.76L7.05 19.2z"
          />
        </svg>
      ))}
    </span>
  );
}

// Parcours en 3 temps. 1 ligne desktop, empilé mobile. Visuels produit, même hauteur.
// Cropped assets so the 3 cards stay on one desktop row without empty chrome.
const HOW = [
  {
    n: 1,
    img: "/app/how-diagnostic.jpg",
    pos: "object-contain bg-[#F7F2F0]",
    alt: "Diagnostic YoGyFace : questionnaire et question vidéo dans la plateforme",
    title: "Tu réalises ton diagnostic",
    desc: (
      <>
        Questionnaire, photos, tests : tu poses les bases pour que je lise{" "}
        <strong>TON visage</strong>.
      </>
    ),
  },
  {
    n: 2,
    img: "/ordonnance-montage-card.jpg",
    pos: "object-contain bg-[#F7F2F0] p-4",
    alt: "Ordonnance beauté et ordonnance skincare YoGyFace, rédigées à la main",
    title: "Je te crée ton ordonnance et ton programme",
    desc: (
      <>
        Sous <strong>3 à 4 jours</strong> max. Chaque programme est unique, ça
        demande un peu de travail, à la main.
      </>
    ),
  },
  {
    n: 3,
    img: "/programme-montage.jpg",
    pos: "object-contain bg-[#F7F2F0]",
    alt: "Programme YoGyFace personnalisé, semaine par semaine, sur ordinateur et téléphone",
    title: "Tu en fais ton rituel quotidien",
    desc: (
      <>
        Ta routine devient un geste simple. Les effets se voient dès les{" "}
        <strong>premières semaines</strong>.
      </>
    ),
  },
];

// Calendrier réaliste (article résultats + avis), jusqu'à 6 mois.
const TIMELINE = [
  {
    when: "Semaines 1 à 4",
    quote: "Je sens que ça rentre.",
    text: (
      <>
        Tu prends les <strong>bases</strong> pour installer de bonnes habitudes.
        Puis tu commences à corriger tes comportements et tes mimiques, souvent{" "}
        <strong>la cause de tes rides</strong>.
      </>
    ),
  },
  {
    when: "2 à 4 mois",
    quote: "T'as bonne mine, tu as fait quelque chose ?",
    text: (
      <>
        L'ovale se raffermit, le regard s'ouvre, certaines rides d'expression
        s'adoucissent. <strong>L'entourage commence à le voir</strong>, pas
        seulement toi dans le miroir.
      </>
    ),
  },
  {
    when: "6 mois",
    quote: "Je me sens plus confiante.",
    text: (
      <>
        Tu dis de nouveau <strong>oui</strong> aux photos, aux dîners, aux
        selfies. Tu te regardes dans le miroir sans détourner les yeux. Tu
        reprends du temps pour toi, et tu n'as plus peur de vieillir.
      </>
    ),
  },
];

// Détail aligné sur /programme (Reset), pas un nouveau bloc, on étoffe les 6 étapes.
const steps = [
  {
    num: "01",
    title: "Diagnostic personnalisé",
    tag: "J+0",
    desc: "Questionnaire de 30 min, 25 thématiques, tests musculaires et photos de face et de profil : j'analyse TON visage avant de construire quoi que ce soit.",
    detail:
      "Une analyse fine pour créer ta routine unique, pas un protocole générique.",
  },
  {
    num: "02",
    title: "Ordonnance beauté sur-mesure",
    tag: "J+3",
    desc: "Un document de 3 à 7 pages : tes 3 priorités, les causes réelles, tes conseils skincare et mode de vie. C'est mon point de référence pour suivre ton évolution.",
    detail:
      "Tes priorités identifiées, et les causes, pas seulement les symptômes.",
  },
  {
    num: "03",
    title: "Programme de 3 mois",
    tag: "J+6",
    desc: "Une routine progressive de 3 à 10 min/jour. La durée augmente semaine après semaine : on installe l'habitude sans te cramer dès le départ.",
    detail:
      "Fondations d'abord, maîtrise ensuite, 21 jours pour ancrer le geste.",
  },
  {
    num: "04",
    title: "160+ exercices",
    tag: "Illimité",
    desc: "Bibliothèque par zones : muscles fondamentaux, bouche, joues, regard, front, ovale, buste, cou, asymétrie.",
    detail:
      "Tu pioches de nouveaux exercices une fois ta routine de base acquise.",
  },
  {
    num: "05",
    title: "Lives coaching",
    tag: "Inclus",
    desc: "FAQ pour te corriger les premières semaines, puis lives thématiques pour aller plus loin. Ce ne sont pas des vidéos pré-enregistrées.",
    detail: "Mon équipe et moi sommes là pour te guider, en direct.",
  },
  {
    num: "06",
    title: "Suivi & communauté",
    tag: "À vie",
    desc: "Questionnaires à 1, 2, 3, 4, 5 et 6 mois. Replays, communauté privée dans la plateforme, et le Club des Marques : 1 live mensuel avec un intervenant.",
    detail: "Jamais toute seule, motivation collective et soutien continu.",
  },
];

// 3 familles plutôt qu'une checklist plate (le « 5 expertes » est le bloc portraits).
const INCLUDE_GROUPS = [
  {
    k: "Ton parcours",
    items: [
      "Nouveau diagnostic V2",
      "Programme 100 % personnalisé, fait main",
      "Nouveaux exercices & programme refondu",
    ],
  },
  {
    k: "La plateforme",
    items: [
      "Application YoGyFace",
      "Messagerie instantanée + notifications",
      "+20 eBooks et guides pratiques",
    ],
  },
  {
    k: "Avec toi",
    items: [
      "Communauté privée dans la plateforme",
      "Garantie (sous conditions CGV)",
    ],
  },
];

// Portraits croppés depuis le catalogue plateforme (mail-8-expertes).
const BONUS_CATALOG = [
  {
    t: "EFT & émotions",
    name: "Irina",
    d: "Libérer les blocages qui se cristallisent sur le visage.",
    img: "/experts/irina.jpg",
  },
  {
    t: "Face Tape",
    name: "Laëtitia",
    d: "Applications ciblées entre les séances.",
    img: "/experts/laetitia.jpg",
  },
  {
    t: "Yoga 30 min",
    name: "Alicia",
    d: "Respiration, posture, étirements guidés.",
    img: "/experts/alicia.jpg",
  },
  {
    t: "Nutrition P.E.A.U",
    name: "Camille",
    d: "Agir de l'intérieur sur rides, taches, éclat.",
    img: "/experts/camille.jpg",
  },
  {
    t: "Bible des actifs",
    name: "Julie",
    d: "Guide + décryptage collagène (Natis).",
    img: "/experts/julie.jpg",
  },
];

// FAQ vente : extraits de /faq, du calendrier résultats et des CGV.
const SALE_FAQ = [
  {
    q: "En combien de temps vais-je voir des résultats ?",
    a: "Effet « bonne mine » dès les premières séances. En 3–4 semaines tu poses les habitudes et tu corriges tes mimiques. Les changements visibles (ovale, regard, rides d'expression) se voient surtout entre 2 et 4 mois. À 6 mois, la transformation est installée, si tu es régulière.",
  },
  {
    q: "Combien de temps faut-il pratiquer par jour ?",
    a: "5 à 10 minutes bien faites suffisent. Une routine courte, lente et consciente vaut mieux qu'un quart d'heure bâclé. L'objectif : l'ancrer comme se laver les dents, sans charge mentale.",
  },
  {
    q: "Est-ce que ça marche vraiment ?",
    a: SHOW_TRUSTPILOT
      ? `Oui, si tu travailles le visage en globalité, pas une ride isolée. On détend les muscles trop contractés, on réveille ceux qui se sont endormis, et on corrige les habitudes qui creusent les traits. ${TRUSTPILOT_SCORE}/5 sur Trustpilot, 1200+ femmes accompagnées.`
      : `Oui, si tu travailles le visage en globalité, pas une ride isolée. On détend les muscles trop contractés, on réveille ceux qui se sont endormis, et on corrige les habitudes qui creusent les traits. ${TRUSTPILOT_SCORE}/5, 1200+ femmes accompagnées.`,
  },
  {
    q: "Est-ce que ça peut remplacer les injections ?",
    a: "Ce n'est pas une injection : ça n'est pas figé. Beaucoup de femmes ont espacé ou arrêté leurs injections une fois la pratique installée. C'est complémentaire, et ça te rend autonome.",
  },
  {
    q: "À quel âge puis-je commencer ?",
    a: "Dès 25 ans en prévention. Autour de 40 ans pour les premiers relâchements. Après 60 ans pour soutenir fermeté et vitalité. À tout âge, c'est le bon moment.",
  },
  {
    q: "J'ai eu un lifting ou des injections. Je peux pratiquer ?",
    a: "Oui, en complément, et tu le notes au diagnostic pour que j'adapte. En général on attend environ 1 mois après le geste, et l'accord de ton médecin esthétique.",
  },
  {
    q: "J'ai de l'acné, de la rosacée ou de la couperose.",
    a: "Oui, en douceur. Drainage et automassages aident souvent à apaiser. Environ 40 % de mes clientes ont ce type de peau, on est plus attentives en cas de grosse crise.",
  },
  {
    q: "Combien de temps j'ai accès ?",
    a: "Le programme YoGyFace Studio se déroule sur 3 mois, et tu y accèdes 24h/24. La plateforme, ton programme, tes replays et ta communauté restent à toi, à vie. Tu as 6 mois pour suivre tes 12 lives et tes 6 suivis photo (1, 2, 3, 4, 5 et 6 mois). Les mises à jour sont incluses, sans coût supplémentaire.",
  },
  {
    q: "J'ai peur de mal faire et d'abîmer mon visage.",
    a: "Chaque geste est expliqué : placement, pression, rythme, sensations. Les lives servent à te corriger. Pratiquer au hasard peut être contre-productif, c'est pour ça que tu n'es pas seule.",
  },
  {
    q: "Comment fonctionne la garantie ?",
    a: "Si après les 6 mois, tes lives, tes suivis et une pratique régulière tu ne vois aucune amélioration de ton bien-être ou de ta confiance : je te rembourse, sous les conditions d'éligibilité des CGV. Ce n'est pas une garantie de résultat automatique.",
  },
  {
    q: "Que se passe-t-il après le paiement ?",
    a: "Tu reçois l'accès à la plateforme. Ensuite tu fais ton diagnostic : ordonnance et programme sous 3 à 4 jours, lives + groupe. Une fois ton programme réceptionné, tes 6 mois de suivi commencent : un point photo chaque mois (1, 2, 3, 4, 5 et 6 mois).",
    // VIP = prévente : app tout de suite, diagnostic calé au 17 sept.
    aVip: "Tu es en prévente. L'application s'ouvre dès le paiement. Le diagnostic V2, lui, s'ouvre le 17 septembre, ensuite ordonnance, programme, lives et groupe.",
  },
];

const renderBrand = (name, i) => (
  <span
    key={`${name}-${i}`}
    className="inline-flex items-center mx-8 md:mx-14 text-[22px] md:text-[28px] font-display font-black tracking-tight text-noir/15 select-none"
  >
    {name}
  </span>
);

/** CTA 1× + mensualités, Checkout Session (fallback Payment Link si Stripe n'est pas configuré). */
function PayCta({
  onceLabel,
  oncePlan,
  installments = [],
  onPay,
  loading,
  error,
  dark = false,
  scarcity = null,
  /** Desktop : coller les CTA au titre (mx-auto les centre dans la colonne). */
  alignClass = "",
  closed = false,
  /** Libellé affiché à la place des boutons d'achat. */
  closedLabel = "Ventes fermées",
  closedHref = "/",
  closedCta = "Retour à l'accueil",
}) {
  const busy = Boolean(loading);
  const extraClass = dark
    ? "inline-flex items-center justify-center px-7 py-3.5 min-h-[44px] rounded-full border-2 border-white/70 text-white font-semibold text-sm md:text-base hover:border-corail hover:text-corail transition-colors"
    : "btn-secondary text-sm md:text-base px-5 md:px-7 py-3.5 border-2 border-noir/25 font-semibold";
  if (closed) {
    return (
      <div
        className={`inline-flex flex-col items-stretch gap-3 w-full max-w-[380px] mx-auto ${alignClass}`}
      >
        <p
          className={`text-center text-[13px] font-semibold uppercase tracking-[0.16em] ${
            dark ? "text-white/80" : "text-noir/70"
          }`}
        >
          {closedLabel}
        </p>
        <Link
          to={closedHref}
          className={
            dark
              ? "inline-flex items-center justify-center px-7 py-3.5 min-h-[44px] rounded-full border-2 border-white/70 text-white font-semibold text-sm md:text-base hover:border-corail hover:text-corail transition-colors"
              : "btn-corail justify-center text-sm md:text-base px-5 md:px-7 py-3.5"
          }
        >
          {closedCta}
        </Link>
      </div>
    );
  }
  const scarcityLines = Array.isArray(scarcity)
    ? scarcity
    : scarcity
      ? [scarcity]
      : [];
  return (
    <div
      className={`inline-flex flex-col items-stretch gap-3 w-full max-w-[380px] mx-auto ${alignClass}`}
    >
      {scarcityLines.length > 0 && (
        <p
          className={`flex items-center justify-center gap-2 text-[12px] font-semibold tracking-tight text-center leading-snug ${dark ? "text-white/80" : "text-noir/70"}`}
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500 animate-live-bounce motion-reduce:animate-none" />
          </span>
          <span>
            {scarcityLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </span>
        </p>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={() => onPay(oncePlan)}
        className={`btn-corail justify-center text-sm md:text-base px-5 md:px-7 py-3.5 ${busy ? "opacity-60" : ""}`}
      >
        {loading === oncePlan ? "Redirection…" : onceLabel}
      </button>
      {installments.map((opt) => (
        <button
          key={opt.plan}
          type="button"
          disabled={busy}
          onClick={() => onPay(opt.plan)}
          className={`${extraClass} justify-center ${busy ? "opacity-60" : ""}`}
        >
          {loading === opt.plan ? "Redirection…" : opt.label}
        </button>
      ))}
      {error && (
        <p
          className={`text-xs ${dark ? "text-corail/80" : "text-corail"}`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * @param {{ variant: 'vip' | 'public' | 'dix' }} props
 */
export default function VenteOffre({ variant }) {
  const isVip = variant === "vip";
  const isDix = variant === "dix";
  const vipClosed = isVip && !VIP_SALES_OPEN;
  const studioClosed = !isVip && !STUDIO_SALES_OPEN;
  const salesClosed = vipClosed || studioClosed;
  const path = isVip ? "/vente-vip" : isDix ? "/vente-10x" : "/vente";
  const offer = OFFERS[variant];
  const joinLabel = isDix
    ? "Payer en 10 × 44,99 €"
    : isVip
      ? `Rejoindre l'offre VIP, ${offer.once.price} €`
      : `Rejoindre Studio, ${offer.once.price} €`;
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [payLoading, setPayLoading] = useState(null);
  const [payError, setPayError] = useState("");
  const spineRef = useRef(null);

  // Query / session uniquement au mount (SSG n'a pas les params).
  useEffect(() => {
    setEmail(readPrefillEmail(searchParams));
  }, [searchParams]);

  // Pointillés : --p = portion visible depuis le haut (gris → corail), sans re-render.
  useEffect(() => {
    const spine = spineRef.current;
    const ol = spine?.parentElement;
    if (!spine || !ol) return;
    const paint = () => {
      const r = ol.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      spine.style.setProperty("--p", `${(p * 100).toFixed(1)}%`);
    };
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, []);

  const startPay = async (plan) => {
    if (salesClosed) return;
    setPayError("");
    setPayLoading(plan);
    try {
      const data = await startCheckoutSession({
        plan,
        email,
        cancelPath: path,
      });
      // Payment Link seulement si Stripe n'est pas configuré (503 + fallbackUrl).
      // Un lien buy.stripe.com n'a pas kind=vip → webi encaisse et n'inscrit personne.
      const dest =
        data.url ||
        (data.fallbackUrl ? withStripePrefill(data.fallbackUrl, email) : "");
      if (!dest) throw new Error("Paiement indisponible");
      window.location.href = dest;
    } catch (err) {
      setPayError(err.message || "Paiement indisponible");
      setPayLoading(null);
    }
  };

  const pay = {
    oncePlan: offer.once.plan,
    onPay: startPay,
    closed: salesClosed,
    closedLabel: isVip ? "Ventes VIP fermées" : "Ventes fermées",
    // VIP → Studio seulement si Studio est encore ouvert.
    closedHref: isVip && STUDIO_SALES_OPEN ? "/vente" : "/",
    closedCta:
      isVip && STUDIO_SALES_OPEN ? "Voir l'offre Studio" : "Retour à l'accueil",
    scarcity: salesClosed
      ? null
      : isDix
        ? ["Plus que 2 places sur 20", "Fermeture à minuit"]
        : isVip
          ? [
              "Plus que 2 places disponibles",
              "Fermeture lundi soir 14 septembre, 00h",
            ]
          : null,
    installments: offer.installments.map((i) => ({
      plan: i.plan,
      label: i.label || `Payer en ${i.times} × ${i.amount} €`,
    })),
    loading: payLoading,
    error: payError,
  };

  const installmentHint = isDix
    ? "1 fois · 4 × 112,25 € · 10 × 44,99 €"
    : offer.installments.map((i) => `${i.times} × ${i.amount} €`).join(" · ");

  return (
    <>
      <SEO
        title={
          isVip
            ? vipClosed
              ? "Ventes VIP fermées, YoGyFace"
              : "Offre VIP, Vente privée YoGyFace"
            : studioClosed
              ? "Ventes fermées, YoGyFace Studio"
              : isDix
                ? "YoGyFace Studio, 10 × 44,99 €"
                : "YoGyFace Studio, Programme"
        }
        description={
          isVip
            ? vipClosed
              ? STUDIO_SALES_OPEN
                ? "Les ventes VIP YoGyFace sont fermées. Le programme Studio est ouvert."
                : "Les ventes VIP YoGyFace sont fermées."
              : "Offre VIP exceptionnelle : 299 € au lieu de 999 €, accès en avant-première à l'application, 18h de coaching et bonus réservés."
            : studioClosed
              ? "Les ventes YoGyFace Studio sont fermées."
              : isDix
                ? "Programme YoGyFace Studio : 449 € en 1×, 4× ou 10 × 44,99 €. Plus que 2 places sur 20, fermeture à minuit."
                : "Programme YoGyFace Studio : 449 €, diagnostic V2, nouveaux exercices, application et accompagnement personnalisé. Paiement en 1×, 4× ou 6×."
        }
        path={path}
        noindex
      />

      {/* Hero type fiche produit (rythme Lynae : visuel + offre + preuves) */}
      <section
        id="offre"
        className="relative pt-28 md:pt-36 pb-12 md:pb-16 px-[5%] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-white pointer-events-none" />
        <div className="max-w-[1100px] mx-auto relative z-10 grid md:grid-cols-2 gap-8 md:gap-14 items-start">
          <div className="order-1">
            {/* Mobile : le H1 est sous la photo, un titre au-dessus pour remplir le vide. */}
            {isVip && (
              <p className="md:hidden text-center mb-5">
                <span className="block font-display font-black tracking-tighter text-noir text-[1.7rem] uppercase leading-none">
                  Ventes VIP
                </span>
                <span className="block font-serif italic text-corail font-semibold text-[1.45rem] mt-1">
                  {vipClosed ? "fermées" : "ouvertes"}
                </span>
              </p>
            )}
            {!isVip && (
              <h1 className="md:hidden text-center mb-5">
                <span className="block font-display font-black tracking-tighter text-noir text-[1.7rem] uppercase leading-none">
                  {studioClosed ? "Ventes" : "Studio"}
                </span>
                <span className="block font-serif italic text-corail font-semibold text-[1.45rem] mt-1">
                  {studioClosed ? "fermées" : "YoGyFace."}
                </span>
              </h1>
            )}
            <div className="relative max-w-[480px] mx-auto md:mx-0">
              <div className="absolute -inset-3 bg-gradient-to-br from-corail/10 to-bleu/10 rounded-3xl blur-2xl pointer-events-none hidden md:block" />
              <img
                src="/laury-massage.webp"
                alt="Laury, méthode YoGyFace"
                className="relative w-full h-[min(52vh,420px)] md:h-auto object-cover object-[50%_18%] rounded-2xl md:rounded-3xl shadow-2xl"
              />
              {isVip && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-noir text-white text-[11px] font-semibold uppercase tracking-widest">
                  {vipClosed ? "Fermée" : "Offre VIP"}
                </span>
              )}
              {!isVip && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-noir text-white text-[11px] font-semibold uppercase tracking-widest">
                  {studioClosed ? "Fermée" : "Studio"}
                </span>
              )}
            </div>
          </div>

          <div className="order-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corail/10 text-corail text-[11px] font-semibold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
              {isVip
                ? vipClosed
                  ? "Vente privée close"
                  : "Offre exceptionnelle, inscrites liste d'attente"
                : studioClosed
                  ? "Ventes closes"
                  : isDix
                    ? "Offre flash, 2 places sur 20"
                    : "Programme Studio"}
            </div>
            <h1
              className={`font-display text-[clamp(1.9rem,5vw,3.4rem)] font-black leading-[0.95] tracking-tighter text-noir mb-3 ${
                isVip ? "" : "hidden md:block"
              }`}
            >
              {isVip
                ? vipClosed
                  ? "VENTES VIP"
                  : "TU ES VIP."
                : studioClosed
                  ? "VENTES"
                  : "STUDIO"}
              <br />
              <span className="font-serif italic text-corail font-semibold">
                {isVip
                  ? vipClosed
                    ? "fermées."
                    : "Cette offre n'est pas publique."
                  : studioClosed
                    ? "fermées."
                    : "YoGyFace."}
              </span>
            </h1>
            {/* Accroche Reset, sous-titre, ne remplace pas le hero VIP. */}
            <p className="font-serif italic text-corail text-[16px] md:text-[18px] mb-3">
              Crée les bonnes habitudes et supprime les causes de ton
              vieillissement.
            </p>
            <p className="text-gris text-[15px] leading-relaxed mb-5 max-w-lg mx-auto md:mx-0">
              {isVip
                ? vipClosed
                  ? STUDIO_SALES_OPEN
                    ? "L'offre privée est close. Le programme Studio, lui, est ouvert."
                    : "L'offre privée est close. Les inscriptions sont actuellement fermées."
                  : "Prévente : l'application s'ouvre dès le paiement. Le diagnostic V2, lui, s'ouvre le 17 septembre, plus les bonus que le lancement public n'aura pas."
                : studioClosed
                  ? "Les inscriptions sont closes."
                  : isDix
                    ? "Paiement en 1×, 4× ou 10 × 44,99 €. Plus que 2 places sur 20. Fermeture à minuit."
                    : "Diagnostic V2, exercices refondus, application YoGyFace. Le programme complet, à tarif de lancement."}
            </p>

            {SHOW_TRUSTPILOT ? (
              <a
                href="https://fr.trustpilot.com/review/yogyface.fr"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-sm mb-5"
              >
                <span className="font-display font-black text-noir">{TRUSTPILOT_SCORE}/5</span>
                <span className="text-gris/70">Excellent · Trustpilot</span>
                <span className="text-gris/40">· 1200+ femmes</span>
              </a>
            ) : (
              <p className="inline-flex items-center gap-2 text-sm mb-5">
                <span className="font-display font-black text-noir">{TRUSTPILOT_SCORE}/5</span>
                <span className="text-gris/40">· 1200+ femmes</span>
              </p>
            )}

            {isVip && !vipClosed && (
              <>
                <ul className="text-left space-y-2 mb-6 max-w-md mx-auto md:mx-0">
                  {[
                    "Accès à l'application dès l'achat",
                    "Diagnostic V2 à partir du 17 septembre",
                    "299 € au lieu de 999 €",
                    "18h de coaching · 12 mois d'accompagnement",
                  ].map((l) => (
                    <li
                      key={l}
                      className="flex items-start gap-2 text-[14px] text-noir/80"
                    >
                      <span className="text-corail mt-0.5">✓</span>
                      {l}
                    </li>
                  ))}
                </ul>
                {/* Prévente : app maintenant, diagnostic calé, à ne pas noyer dans le prix. */}
                <div className="text-left mb-6 max-w-md mx-auto md:mx-0 rounded-2xl border border-noir/8 bg-creme/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-corail mb-2">
                    Prévente
                  </p>
                  <p className="text-[14px] text-noir/80 leading-relaxed">
                    Tu as l'application tout de suite. Le diagnostic, lui,
                    s'ouvre le{" "}
                    <strong className="text-noir font-semibold">
                      17 septembre,
                    </strong>{" "}
                    on part toutes ensemble.
                  </p>
                </div>
              </>
            )}

            {isVip && !vipClosed && offer.once.price && (
              <p className="mb-4">
                {offer.once.was && (
                  <span className="text-gris/45 line-through text-lg mr-2">
                    {offer.once.was} €
                  </span>
                )}
                <span className="font-display font-black text-4xl tracking-tight text-noir">
                  {offer.once.price} €
                </span>
                {offer.installments.length > 0 && (
                  <span className="block text-gris/50 text-sm mt-1">
                    ou {installmentHint}
                  </span>
                )}
              </p>
            )}
            {isVip && (
              <>
                <PayCta {...pay} onceLabel={joinLabel} alignClass="md:mx-0" />
                {!vipClosed && (
                  <p className="text-gris/45 text-xs mt-3">
                    Paiement sécurisé Stripe
                  </p>
                )}
              </>
            )}

            {/* Studio : prix + inclus + CTA dans un seul bloc (évite de répéter 299 € / 4×). */}
            {!isVip && studioClosed && (
              <PayCta {...pay} onceLabel={joinLabel} alignClass="md:mx-0" />
            )}
            {!isVip && !studioClosed && (
              <div className="text-left max-w-md mx-auto md:mx-0 rounded-2xl border border-noir/8 bg-creme/80 p-5 md:p-6">
                {offer.once.price && (
                  <p className="mb-4">
                    {offer.once.was && (
                      <span className="text-gris/45 line-through text-lg mr-2">
                        {offer.once.was} €
                      </span>
                    )}
                    <span className="font-display font-black text-4xl tracking-tight text-noir">
                      {offer.once.price} €
                    </span>
                  </p>
                )}
                <ul className="space-y-2 mb-5">
                  {[
                    "Diagnostic V2 + application YoGyFace",
                    "12h de coaching · 6 mois d'accompagnement",
                    ...(isDix ? ["Paiement en 1×, 4× ou 10 × 44,99 €"] : []),
                  ].map((l) => (
                    <li
                      key={l}
                      className="flex items-start gap-2 text-[14px] text-noir/80"
                    >
                      <span className="text-corail mt-0.5">✓</span>
                      {l}
                    </li>
                  ))}
                </ul>
                <PayCta {...pay} onceLabel={joinLabel} alignClass="mx-0" />
                <p className="text-gris/45 text-xs mt-3 text-center">
                  Paiement sécurisé Stripe
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Brand proof, bandeau marques (même liste que l'accueil) */}
      <section className="py-10 md:py-14 px-[5%] bg-white border-y border-noir/5 overflow-hidden">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-noir/30 mb-6">
          Elles m'ont fait confiance
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map(renderBrand)}
          </div>
        </div>
      </section>

      <VenteValeur price={offer.once.price} />
      <VenteGarantie />

      <VenteReconnaissance />
      <VenteEchecs cta={<PayCta {...pay} onceLabel={joinLabel} />} />

      {/* Comparatif VIP vs public */}
      {isVip && (
        <section className="py-14 md:py-20 px-[5%] bg-creme">
          <div className="max-w-[880px] mx-auto">
            <div className="text-center mb-8">
              <div className="section-badge justify-center">
                Pourquoi tu es VIP
              </div>
              <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
                PAS LA MÊME
                <br />
                <span className="font-serif italic text-corail font-semibold">
                  offre que les autres
                </span>
              </h2>
            </div>
            {/* Mobile : 2 colonnes (critère + VIP). Desktop : + lancement public. */}
            <div className="py-5">
              <div className="grid items-stretch grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:grid-cols-[1.35fr_1fr_1fr]">
                <div
                  aria-hidden
                  className="col-start-2 row-start-1 row-span-8 -my-3 rounded-2xl bg-white ring-2 ring-emerald-500 shadow-[0_12px_40px_rgba(16,185,129,0.18)] pointer-events-none"
                />

                <div className="h-12" style={{ gridColumn: 1, gridRow: 1 }} />
                <div
                  className="relative z-10 h-12 min-w-0 flex items-center justify-center px-1"
                  style={{ gridColumn: 2, gridRow: 1 }}
                >
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-full px-2.5 md:px-3 py-1">
                    VIP, toi
                  </span>
                </div>
                <div
                  className="hidden md:flex h-12 items-center justify-center text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gris/50"
                  style={{ gridColumn: 3, gridRow: 1 }}
                >
                  Lancement public
                </div>

                {COMPARE.map((row, i) => {
                  const gridRow = i + 2;
                  return (
                    <Fragment key={row.label}>
                      <div
                        className="min-h-[54px] min-w-0 flex items-center px-1.5 md:px-2 text-[12px] md:text-[13px] leading-snug text-gris border-t border-noir/8"
                        style={{ gridColumn: 1, gridRow }}
                      >
                        {row.label}
                      </div>
                      <div
                        className="relative z-10 min-h-[54px] min-w-0 flex flex-col items-center justify-center px-1.5 md:px-2 py-2 text-[12px] md:text-sm font-semibold text-noir text-center border-t border-emerald-100"
                        style={{ gridColumn: 2, gridRow }}
                      >
                        {row.was ? (
                          <span>
                            <span className="text-emerald-600">{row.vip}</span>
                            <s className="ml-1.5 font-normal text-gris/40">
                              {row.was}
                            </s>
                          </span>
                        ) : (
                          <span>
                            {row.vip}
                            {row.bonus && (
                              <span className="ml-1 font-semibold text-emerald-600">
                                {row.bonus}
                              </span>
                            )}
                          </span>
                        )}
                        {row.hint && (
                          <span className="mt-0.5 text-[10px] md:text-[11px] font-normal leading-snug text-gris/70">
                            {row.hint}
                          </span>
                        )}
                        <span className="mt-1 md:hidden text-[10px] font-normal text-gris/45">
                          Public : {row.public}
                        </span>
                      </div>
                      <div
                        className="hidden md:flex min-h-[54px] items-center justify-center px-2 text-[13px] text-gris/55 text-center border-t border-noir/8"
                        style={{ gridColumn: 3, gridRow }}
                      >
                        {row.public}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-14 md:py-20 px-[5%] bg-creme">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <div className="section-badge justify-center">
              Comment ça se passe
            </div>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
              UN GESTE SIMPLE
              <br />
              <span className="font-serif italic text-corail font-semibold">
                à tenir au quotidien
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {HOW.map((s) => (
              <article
                key={s.n}
                className="rounded-2xl bg-white overflow-hidden ring-1 ring-noir/5 shadow-[0_8px_20px_rgba(26,26,26,0.10),0_22px_50px_rgba(26,26,26,0.20)]"
              >
                <img
                  src={s.img}
                  alt={s.alt}
                  className={`w-full h-56 md:h-64 ${s.pos.startsWith("object-contain") ? s.pos : `object-cover ${s.pos}`}`}
                />
                <div className="p-5 text-left">
                  <p className="font-serif italic text-corail text-sm mb-1">
                    Étape {s.n} :
                  </p>
                  <h3 className="font-display font-black text-noir text-[15px] md:text-base tracking-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-gris text-[13px] md:text-[14px] leading-relaxed">
                    {s.desc}
                  </p>
                  {s.n === 1 && isVip && (
                    <p className="text-corail text-[13px] font-serif italic mt-2">
                      À partir du 17 septembre.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-[5%] bg-white">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-center font-display text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-tighter text-noir mb-10">
            DES RÉSULTATS VISIBLES,
            <br />
            <span className="font-serif italic text-corail font-semibold">
              dès les premières semaines
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
            <div className="space-y-7 text-left">
              {TIMELINE.map((t) => (
                <div key={t.when}>
                  <p className="font-display font-black text-[17px] md:text-[20px] tracking-tight text-corail mb-1.5">
                    {t.when}
                  </p>
                  <p className="text-gris/70 text-[13px] italic mb-1.5">
                    « {t.quote} »
                  </p>
                  <p className="text-noir/80 text-[14px] leading-relaxed">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <img
                src="/laury-yeux.webp"
                alt="Routine YoGyFace, les effets s'installent semaine après semaine"
                className="w-full max-w-[420px] mx-auto md:ml-auto h-[380px] md:h-[520px] rounded-2xl md:rounded-3xl object-cover object-top"
              />
              <div className="text-center mt-6">
                <PayCta {...pay} onceLabel={joinLabel} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <VenteResultats cta={<PayCta {...pay} onceLabel={joinLabel} />} />

      <VenteTemoignagesVideo />

      {/* Social proof, cartes au format Trustpilot */}
      <section className="py-14 md:py-20 px-[5%] bg-creme">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="flex items-center justify-center gap-2 text-sm text-noir mb-3">
              <TpStars size={16} />
              <span>
                Noté <strong>{TRUSTPILOT_SCORE}/5</strong>
                {SHOW_TRUSTPILOT && (
                  <>
                    {" "}
                    Excellent sur{" "}
                    <a
                      href="https://fr.trustpilot.com/review/yogyface.fr"
                      target="_blank"
                      rel="noopener"
                      className="font-semibold underline"
                      style={{ color: TP_GREEN }}
                    >
                      Trustpilot
                    </a>
                  </>
                )}
              </span>
            </p>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
              DES TRANSFORMATIONS
              <br />
              <span className="font-serif italic text-corail font-semibold">
                réelles, racontées par elles
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => {
              const Card = SHOW_TRUSTPILOT ? "a" : "div";
              const cardProps = SHOW_TRUSTPILOT
                ? { href: t.link, target: "_blank", rel: "noopener" }
                : {};
              return (
                <Card
                  key={t.link}
                  {...cardProps}
                  className="p-5 rounded-2xl bg-white border border-noir/8 text-left flex flex-col hover:border-[#00B67A]/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-sm font-bold text-noir">5.0</span>
                      <TpStars />
                    </span>
                    {t.name ? (
                      <span className="text-[11px] text-gris whitespace-nowrap">
                        {t.name}
                      </span>
                    ) : null}
                  </div>
                  <p className="font-semibold text-noir text-[15px] leading-snug mb-2">
                    « {t.headline} »
                  </p>
                  <p className="text-gris text-[13px] leading-relaxed flex-1 mb-4">
                    {t.text}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
                        style={{
                          color: TP_GREEN,
                          borderColor: "rgba(0,182,122,0.35)",
                          background: "rgba(0,182,122,0.06)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
          {SHOW_TRUSTPILOT && (
            <p className="text-center mt-8">
              <a
                href="https://fr.trustpilot.com/review/yogyface.fr"
                target="_blank"
                rel="noopener"
                className="font-semibold underline text-noir hover:text-corail"
              >
                Voir plus d'avis
              </a>
            </p>
          )}
        </div>
      </section>

      {/* Autorité, calqué sur le bloc « formulé par » Lynae, faits About/Home. */}
      <section className="py-14 md:py-20 px-[5%] bg-white">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <img
            src="/laury-expertise.webp"
            alt="Laury Anater, fondatrice de YoGyFace"
            className="w-full max-w-[420px] mx-auto md:mx-0 h-[380px] md:h-[520px] rounded-2xl md:rounded-3xl object-cover object-top"
          />
          <div className="text-left">
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.2rem)] font-black tracking-tighter text-noir leading-tight mb-4">
              Conçu professionnellement
              <br />
              <span className="font-serif italic text-corail font-semibold">
                par Laury Anater
              </span>
            </h2>
            <p className="text-gris text-[14px] md:text-[15px] leading-relaxed mb-5">
              10 ans chez Chanel, L'Oréal / Biotherm et Weleda. Formée auprès de
              Sylvie LeFranc, Era Narumi et Fumiko Takatsu. Elle a créé{" "}
              <strong className="text-noir">RESET™</strong> : une
              reprogrammation neuro-faciale, pas un yoga du visage générique.
            </p>
            <p className="text-noir text-sm font-medium mb-2">
              Chaque geste est choisi pour son rôle précis dans :
            </p>
            <ul className="space-y-1.5 text-gris text-[14px] mb-6">
              <li>la tonification des 45 muscles du visage</li>
              <li>le relâchement des tensions (mâchoire, regard, cou)</li>
              <li>la reprogrammation des habitudes qui font vieillir</li>
            </ul>
            <p className="text-noir text-[14px] leading-relaxed">
              Aucun programme copié-collé.
              <br />
              Aucun exercice décoratif.
              <br />
              Chaque choix a une fonction claire.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <PayCta {...pay} onceLabel={joinLabel} />
        </div>
      </section>

      {/* Inclus : 3 familles + portraits des 5 expertes */}
      <section className="py-14 md:py-20 px-[5%] bg-creme">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-8">
            <div className="section-badge justify-center">
              Ce qui est inclus
            </div>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
              {isVip ? "LE PROGRAMME" : "STUDIO"}
              <br />
              <span className="font-serif italic text-corail font-semibold">
                {isVip ? "complet" : "le programme complet"}
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
            {INCLUDE_GROUPS.map((g) => (
              <div
                key={g.k}
                className="rounded-2xl bg-white border border-noir/5 p-5 text-left"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-corail mb-3">
                  {g.k}
                </p>
                <ul className="space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-noir/80"
                    >
                      <span className="text-corail mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-noir/30 mb-5 text-center">
              5 expertes pour aller plus loin
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
              {BONUS_CATALOG.map((b) => (
                <li
                  key={b.t}
                  className="rounded-2xl bg-white border border-noir/5 p-4 text-center"
                >
                  <img
                    src={b.img}
                    alt={b.name}
                    className="w-20 h-20 md:w-[88px] md:h-[88px] rounded-full object-cover mx-auto mb-3"
                  />
                  <p className="font-display font-black text-[13px] text-noir tracking-tight">
                    {b.name}
                  </p>
                  <p className="text-corail text-[11px] font-semibold mb-1.5">
                    {b.t}
                  </p>
                  <p className="text-gris text-[12px] leading-snug">{b.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <VentePlateforme />

      {isVip && (
        <section className="py-14 md:py-20 px-[5%] bg-white">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-8">
              <div className="section-badge justify-center">
                Réservé aux VIP
              </div>
              <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
                TES BONUS
                <br />
                <span className="font-serif italic text-corail font-semibold">
                  exclusifs
                </span>
              </h2>
            </div>
            <div className="space-y-3">
              {VIP_BONUSES.map((b) => (
                <div
                  key={b.t}
                  className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-corail/15 bg-rose/10 text-left"
                >
                  <div>
                    <p className="font-medium text-sm text-noir mb-0.5">
                      {b.t}*
                    </p>
                    <p className="text-gris text-[13px] leading-relaxed">
                      {b.d}
                    </p>
                  </div>
                  <span className="shrink-0 text-corail text-xs font-semibold whitespace-nowrap">
                    {b.save} économisés
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-gris/40 text-[11px] mt-5">
              * Offre soumise à conditions.{" "}
              <Link
                to="/cgv#offres-vip"
                className="underline hover:text-corail"
              >
                Voir les CGV
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <section className="py-14 md:py-24 px-[5%] bg-white">
        <div className="max-w-[960px] mx-auto">
          <div
            className="text-center mb-10 md:mb-16 animate-on-scroll"
            data-anim="fade"
          >
            <div className="section-badge justify-center">Ton parcours</div>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
              6 ÉTAPES VERS
              <br />
              <span className="font-serif italic text-corail font-semibold">
                ton autonomie
              </span>
            </h2>
          </div>

          {/* Timeline : pointillés au centre, pastilles au milieu de chaque carte. */}
          <ol className="relative">
            <span ref={spineRef} className="timeline-spine" aria-hidden>
              <span className="timeline-spine-track" />
              <span className="timeline-spine-fill" />
            </span>
            {steps.map((s, i) => {
              const onLeft = i % 2 === 0;
              return (
                <li
                  key={s.num}
                  className="relative md:grid md:grid-cols-2 md:gap-0 mb-10 last:mb-0"
                >
                  <span className="timeline-dot rounded-full bg-corail text-white flex items-center justify-center font-display font-black text-sm shadow-lg shadow-corail/20">
                    {s.num}
                  </span>
                  <article
                    className={`ml-14 md:ml-0 p-5 rounded-2xl border border-noir/8 bg-white animate-on-scroll ${
                      onLeft
                        ? "md:col-start-1 md:mr-12 md:text-right"
                        : "md:col-start-2 md:ml-12"
                    }`}
                    data-anim={onLeft ? "left" : "right"}
                    data-delay={i * 90}
                  >
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-1 ${onLeft ? "md:justify-end" : ""}`}
                    >
                      <h3 className="font-display font-black text-sm md:text-base tracking-tight">
                        {s.title}
                      </h3>
                      <span className="text-[10px] font-semibold text-corail bg-creme px-2 py-0.5 rounded-full">
                        {isVip && s.num === "01" ? "17 sept." : s.tag}
                      </span>
                    </div>
                    <p className="text-gris text-[13px] md:text-[14px] leading-relaxed">
                      {s.desc}
                    </p>
                    {s.detail && (
                      <p className="text-corail/80 text-[13px] md:text-[14px] font-serif italic mt-1.5">
                        {s.detail}
                      </p>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="py-14 md:py-20 px-[5%] bg-white">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.2rem)] font-black tracking-tighter text-noir leading-tight mb-4">
              Des réponses
              <br />
              <span className="font-serif italic text-corail font-semibold">
                à tes questions
              </span>
            </h2>
            <p className="text-gris text-[14px] leading-relaxed">
              Une question ? Écris-moi à{" "}
              <a
                href="mailto:contact@yogyface.fr"
                className="font-semibold text-noir underline hover:text-corail"
              >
                contact@yogyface.fr
              </a>
              .
            </p>
          </div>
          <div>
            {SALE_FAQ.map((item) => (
              <details key={item.q} className="group border-b border-noir/10">
                <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-medium text-noir text-[15px] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-xl leading-none text-gris group-open:hidden">
                    +
                  </span>
                  <span className="shrink-0 text-xl leading-none text-gris hidden group-open:inline">
                    −
                  </span>
                </summary>
                <p className="pb-4 text-gris text-[14px] leading-relaxed">
                  {isVip && item.aVip ? item.aVip : item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-[5%] bg-noir text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-corail/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-black tracking-tighter mb-4">
            {isVip
              ? vipClosed
                ? "VENTES VIP"
                : "CETTE OFFRE EST"
              : studioClosed
                ? "VENTES"
                : "PRÊTE À COMMENCER ?"}
            {(isVip || studioClosed) && (
              <>
                <br />
                <span className="font-serif italic text-corail font-semibold">
                  {salesClosed ? "fermées." : "pour toi seule."}
                </span>
              </>
            )}
          </h2>
          <p className="text-white/50 mb-6 text-[14px] md:text-[16px]">
            {isVip
              ? vipClosed
                ? STUDIO_SALES_OPEN
                  ? "L'offre privée n'est plus disponible. Rejoins Studio."
                  : "Les inscriptions sont actuellement fermées."
                : "Prévente : l'app dès l'achat, le diagnostic le 17 septembre. Tarif VIP + bonus, plus au lancement public."
                : studioClosed
                  ? "Les inscriptions sont closes."
                  : isDix
                    ? "Plus que 2 places sur 20. 1×, 4× ou 10 × 44,99 €. Fermeture à minuit."
                    : "Le programme Studio, sans les bonus ni l'accès anticipé de la liste."}
          </p>
          {offer.once.price && !salesClosed && (
            <p className="text-white mb-6">
              {offer.once.was && (
                <span className="text-white/35 line-through mr-2">
                  {offer.once.was} €
                </span>
              )}
              <span className="font-display font-black text-3xl">
                {offer.once.price} €
              </span>
              {offer.installments.length > 0 && !isDix && (
                <span className="block text-white/40 text-sm mt-1">
                  ou {installmentHint}
                </span>
              )}
            </p>
          )}
          <PayCta
            {...pay}
            dark
            onceLabel={
              isDix
                ? "Payer en 10 × 44,99 € →"
                : isVip
                  ? `Payer ${offer.once.price} € en 1 fois →`
                  : `Payer Studio, ${offer.once.price} € en 1 fois →`
            }
          />
          <p className="text-white/30 text-sm mt-6">
            Des questions ?{" "}
            <a
              href="mailto:contact@yogyface.fr"
              className="text-corail/80 font-semibold hover:underline"
            >
              écris-moi
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
