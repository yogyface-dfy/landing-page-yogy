/**
 * Offres Stripe. Le serveur est la source de vérité pour les montants
 * (le client n'envoie jamais le prix). Upsell live = pack uniquement (/vente).
 */
export const VIP_ONCE_CENTS = 29900;
export const VIP_3X_CENTS = 9999;
export const VIP_6X_CENTS = 4999;
/** /vente : 359 € en 1×, ou 4 × 89,99 €. */
export const STUDIO_ONCE_CENTS = 35900;
export const STUDIO_4X_CENTS = 8999;
export const STUDIO_6X_CENTS = 7499;
export const STUDIO_10X_CENTS = 4499;
/** /vente-10x : les CTA 1× et 4× restent au tarif précédent. */
const STUDIO_DIX_ONCE_CENTS = 44900;
const STUDIO_DIX_4X_CENTS = 11225;

/** false = /vente-vip reste en ligne, checkout VIP refusé. */
export const VIP_SALES_OPEN = false;
/** false = /vente reste en ligne, checkout Studio refusé. */
export const STUDIO_SALES_OPEN = true;

/** Image publique : Stripe la charge depuis internet (pas localhost). */
const PRODUCT_IMAGE = "https://www.yogyface.fr/logo-yogyface-dark.png";

const VIP_DESCRIPTION =
  "Avant-première plateforme · 299 € au lieu de 999 € · 18h de coaching · 12 mois d’accompagnement · diagnostic + renouvellement";

const STUDIO_DESCRIPTION =
  "Programme YoGyFace Studio · 359 € · 12h de coaching · 6 mois d’accompagnement · diagnostic";

const STUDIO_DESCRIPTION_449 =
  "Programme YoGyFace Studio · 449 € · 12h de coaching · 6 mois d’accompagnement · diagnostic";

export const PLANS = {
  "vip-once": {
    offer: "vip",
    mode: "payment",
    fallbackUrl: "https://buy.stripe.com/7sY9AS2KtdrCcYF7aP8Zq0q",
    priceData: {
      currency: "eur",
      unit_amount: VIP_ONCE_CENTS,
      product_data: {
        name: "YoGyFace Reset — Offre VIP",
        description: VIP_DESCRIPTION,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  "vip-3x": {
    offer: "vip",
    mode: "subscription",
    months: 3,
    fallbackUrl: "https://buy.stripe.com/8x214mcl35Za1fX66L8Zq0r",
    priceData: {
      currency: "eur",
      unit_amount: VIP_3X_CENTS,
      recurring: { interval: "month" },
      product_data: {
        name: "YoGyFace Reset — Offre VIP (3 × 99,99 €)",
        description: `${VIP_DESCRIPTION} · 3 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  "vip-6x": {
    offer: "vip",
    mode: "subscription",
    months: 6,
    priceData: {
      currency: "eur",
      unit_amount: VIP_6X_CENTS,
      recurring: { interval: "month" },
      product_data: {
        name: "YoGyFace Reset — Offre VIP (6 × 49,99 €)",
        description: `${VIP_DESCRIPTION} · 6 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  "studio-once": {
    offer: "studio",
    mode: "payment",
    priceData: {
      currency: "eur",
      unit_amount: STUDIO_ONCE_CENTS,
      product_data: {
        name: "YoGyFace Studio",
        description: STUDIO_DESCRIPTION,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  "studio-4x": {
    offer: "studio",
    mode: "subscription",
    months: 4,
    priceData: {
      currency: "eur",
      unit_amount: STUDIO_4X_CENTS,
      recurring: { interval: "month" },
      product_data: {
        name: "YoGyFace Studio (4 × 89,99 €)",
        description: `${STUDIO_DESCRIPTION} · 4 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  "studio-6x": {
    offer: "studio",
    mode: "subscription",
    months: 6,
    priceData: {
      currency: "eur",
      unit_amount: STUDIO_6X_CENTS,
      recurring: { interval: "month" },
      product_data: {
        name: "YoGyFace Studio (6 × 74,99 €)",
        description: `${STUDIO_DESCRIPTION_449} · 6 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  "studio-10x": {
    offer: "studio",
    mode: "subscription",
    months: 10,
    priceData: {
      currency: "eur",
      unit_amount: STUDIO_10X_CENTS,
      recurring: { interval: "month" },
      product_data: {
        name: "YoGyFace Studio (10 × 44,99 €)",
        description: `${STUDIO_DESCRIPTION_449} · 10 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  // /vente-10x seulement : 1× et 4× au tarif 449 €.
  "studio-dix-once": {
    offer: "studio",
    mode: "payment",
    priceData: {
      currency: "eur",
      unit_amount: STUDIO_DIX_ONCE_CENTS,
      product_data: {
        name: "YoGyFace Studio",
        description: STUDIO_DESCRIPTION_449,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  "studio-dix-4x": {
    offer: "studio",
    mode: "subscription",
    months: 4,
    priceData: {
      currency: "eur",
      unit_amount: STUDIO_DIX_4X_CENTS,
      recurring: { interval: "month" },
      product_data: {
        name: "YoGyFace Studio (4 × 112,25 €)",
        description: `${STUDIO_DESCRIPTION_449} · 4 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
};

/** Valeur Purchase Meta = montant du programme (1× ou N mensualités). */
export function purchaseValue(plan) {
  const spec = PLANS[plan];
  if (!spec) return 0;
  return ((spec.months || 1) * spec.priceData.unit_amount) / 100;
}

export function purchaseContentName(plan) {
  const kind = PLANS[plan]?.offer;
  if (kind === "vip") return "YoGyFace VIP";
  if (kind === "studio") return "YoGyFace Studio";
  return "YoGyFace";
}

/** true = après /vente, Stripe envoie sur /vente-upsell (pack). */
export const UPSELL_ENABLED = true;

/** /vente 359 € seulement — pas VIP, pas /vente-10x. */
export const UPSELL_PLANS = new Set(["studio-once", "studio-4x"]);

export function shouldShowUpsell(plan) {
  return UPSELL_ENABLED && UPSELL_PLANS.has(plan);
}

/** pack = live. coaching = preview ?v=coaching seulement. */
export const UPSELL_VARIANTS = {
  pack: {
    amountCents: 9900,
    compareAtCents: 35900,
    name: "Extension YoGyFace STUDIO — 1 an",
    image: "/programme-montage.jpg",
    headline: "Félicitations, tu rejoins YoGyFace STUDIO",
    sub: "Une dernière question avant d’aller plus loin : veux-tu profiter de l’extension « YoGyFace STUDIO 1 an » ?",
    bullets: [
      "+ 6 mois d’accompagnement",
      "Renouvellement de ton programme après 6 mois",
      "Renouvellement de ton diagnostic personnalisé au bout de 6 mois",
      "+ 12h de coaching live",
      "+ 6 mois de suivi photo",
    ],
    withLabel: "Ce que tu peux avoir pour 99 €",
    withoutLabel: "Ce que tu as acheté pour 359 €",
    compare: [
      {
        label: "Accompagnement",
        with: "12 mois",
        without: "6 mois",
      },
      {
        label: "Programme",
        with: "Renouvellement de ton\nprogramme après 6 mois",
        without: "Programme initial de 6 mois seulement",
      },
      {
        label: "Diagnostic",
        with: "Renouvellement de ton\ndiagnostic après 6 mois",
        without: "Diagnostic de départ seulement",
      },
      { label: "Coaching live", with: "12h", bonus: "+12h", without: "12h" },
      {
        label: "Suivi photo",
        with: "Jusqu’à 12 mois de suivis",
        without: "6 premiers mois",
      },
    ],
  },
  coaching: {
    amountCents: 7900,
    compareAtCents: 24900,
    name: "12h de coaching en plus",
    image: "/email/launch/mail-4-coaching.jpg",
    headline: "Continue les lives, sans tout recommencer",
    sub: "12h de coaching après tes 6 premiers mois d’accompagnement — tes exercices restent à toi.",
    bullets: [
      "12h de coaching live",
      "Après tes 6 premiers mois",
      "La plateforme et tes replays restent à toi, à vie",
    ],
    withLabel: "Les 12 en +",
    withoutLabel: "Sans",
    compare: [
      { label: "Coaching live", with: "12h", bonus: "+12h", without: "12h" },
      {
        label: "6 nouveaux mois",
        with: "12h de lives",
        without: "Plus de coaching",
      },
      { label: "Plateforme", with: "À vie", without: "À vie" },
    ],
  },
};

/** Preview : ?v=a|pack ou ?v=b|coaching. Live = pack. */
export function parseUpsellPreviewKey(raw) {
  const v = String(raw || "").toLowerCase();
  if (v === "b" || v === "coaching") return "coaching";
  return "pack";
}

export function resolveUpsellOffer(_sessionId, previewKey) {
  const key = previewKey ? parseUpsellPreviewKey(previewKey) : "pack";
  const offer = UPSELL_VARIANTS[key] || UPSELL_VARIANTS.pack;
  return { ...offer, variant: key };
}
