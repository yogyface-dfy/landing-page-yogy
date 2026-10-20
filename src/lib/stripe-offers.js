/**
 * Offres Stripe. Le serveur est la source de vérité pour les montants
 * (le client n'envoie jamais le prix). Upsell A/B : variant hashé sur le cs_ Stripe.
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

/** Post-achat A/B. `false` = après Stripe on va sur /confirmation-achat-bienvenue. */
export const UPSELL_ENABLED = false;

/** pack = A, coaching = B. Prix / copy ici — pas d'override env (ça casserait le split). */
export const UPSELL_VARIANTS = {
  pack: {
    amountCents: 9900,
    compareAtCents: 35900,
    name: "Pack VIP — 2e programme à 6 mois",
    headline:
      "Mets toutes les chances de ton côté avec mon suivi 1 an au lieu de 6 mois",
    sub: "Un nouveau programme complet après tes 6 premiers mois, pour travailler de nouvelles zones.",
    bullets: [
      "+ 6 mois d’accompagnement",
      "Renouvellement de ton programme",
      "1 diagnostic à l’achat, et un nouveau pour 6 nouveaux mois",
      "12h de coaching live",
      "6 mois de suivi photo",
    ],
    withLabel: "Avec l’offre 1 an",
    withoutLabel: "Sans",
    compare: [
      { label: "Prix", with: "99 €", was: "359 €", without: "—" },
      {
        label: "Accompagnement",
        with: "6 mois",
        bonus: "+6 mois",
        without: "6 mois",
      },
      {
        label: "Programme",
        with: "Initial",
        bonus: "+ 2e à 6 mois",
        without: "Initial seulement",
      },
      {
        label: "Diagnostic",
        with: "1 à l’achat",
        bonus: "+ 1 · 6 nouveaux mois",
        without: "Initial uniquement",
      },
      { label: "Coaching live", with: "12h", bonus: "+12h", without: "12h" },
      {
        label: "Suivi photo",
        with: "6 mois",
        bonus: "+6 mois",
        without: "6 mois",
      },
    ],
  },
  coaching: {
    amountCents: 7900,
    compareAtCents: 24900,
    name: "12h de coaching en plus",
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
      { label: "Prix", with: "79 €", was: "249 €", without: "—" },
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

const UPSELL_KEYS = ["pack", "coaching"];

/** Preview : ?v=a|pack ou ?v=b|coaching. */
export function parseUpsellPreviewKey(raw) {
  const v = String(raw || "").toLowerCase();
  if (v === "b" || v === "coaching") return "coaching";
  return "pack";
}

/** Sticky 50/50 : même Checkout Session = toujours le même bras. */
export function upsellKeyFromSession(sessionId) {
  const s = String(sessionId || "");
  let h = 2166136261;
  for (let i = 0; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return UPSELL_KEYS[(h >>> 0) % 2];
}

export function resolveUpsellOffer(sessionId, previewKey) {
  const key = previewKey
    ? parseUpsellPreviewKey(previewKey)
    : upsellKeyFromSession(sessionId);
  const offer = UPSELL_VARIANTS[key] || UPSELL_VARIANTS.pack;
  return { ...offer, variant: key };
}
