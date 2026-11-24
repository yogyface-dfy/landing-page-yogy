/**
 * Offres Stripe. Le serveur est la source de vérité pour les montants
 * (le client n'envoie jamais le prix). Upsell live = guide PDF 29 €.
 */
export const VIP_ONCE_CENTS = 29900;
export const VIP_3X_CENTS = 9999;
export const VIP_6X_CENTS = 4999;
/** /vente : 359,99 € en 1×, 4 × 89,99 € ou 6 × 59,99 €. */
export const STUDIO_ONCE_CENTS = 35999;
export const STUDIO_4X_CENTS = 8999;
/** /vente-6x : 6 × 59,99 € (≈ 359,99 €). */
export const STUDIO_6X_CENTS = 5999;
/** /vente-10x : 10 × 35,99 € (≈ 359,99 €). */
export const STUDIO_10X_CENTS = 3599;

/** false = /vente-vip reste en ligne, checkout VIP refusé. */
export const VIP_SALES_OPEN = false;
/** false = /vente reste en ligne, checkout Studio refusé. */
export const STUDIO_SALES_OPEN = true;

/** Image publique : Stripe la charge depuis internet (pas localhost). */
const PRODUCT_IMAGE = "https://www.yogyface.fr/logo-yogyface-dark.png";

const VIP_DESCRIPTION =
  "Avant-première plateforme · 299 € au lieu de 999 € · 18h de coaching · 12 mois d’accompagnement · diagnostic + renouvellement";

const STUDIO_DESCRIPTION =
  "Programme YoGyFace Studio · 359,99 € · 12h de coaching · 6 mois d’accompagnement · diagnostic";

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
        name: "YoGyFace Studio (6 × 59,99 €)",
        description: `${STUDIO_DESCRIPTION} · 6 mensualités`,
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
        name: "YoGyFace Studio (10 × 35,99 €)",
        description: `${STUDIO_DESCRIPTION} · 10 mensualités`,
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

/** false = après checkout Studio, confirmation directe. true = /vente-upsell. */
export const UPSELL_ENABLED = true;

/** Studio (/vente, /vente-6x, /vente-10x) → guide. Pas VIP. */
export function shouldShowUpsell(plan) {
  return UPSELL_ENABLED && PLANS[plan]?.offer === "studio";
}

/**
 * customer_creation n’est valide qu’en mode payment.
 * En 4×/6× (subscription) Stripe 400 → « Impossible de créer le paiement ».
 */
export function checkoutCustomerFields({
  customerId = null,
  mode = "payment",
  showUpsell = false,
} = {}) {
  if (customerId) return { customer: customerId };
  if (showUpsell && mode === "payment") return { customer_creation: "if_required" };
  return {};
}

/**
 * CTA Checkout. Stripe refuse désormais `submit_type: pay` en mode
 * `subscription` (4×/6×/10×) → 500. On laisse le libellé Stripe par défaut.
 */
export function checkoutSubmitType(_mode = "payment") {
  return undefined;
}

/**
 * Kind lu par l’app. Ne pas remettre `studio_extension` :
 * ce kind crédite +12 h, +6 mois et un ticket diag.
 */
export const GUIDE_APPAREILS_KIND = "guide_appareils";

/** Produit / prix live Stripe (29 €). Le débit reprend ce price. */
export const UPSELL_STRIPE_PRODUCT_ID = "prod_VgfcYNB8PYv8td";
export const UPSELL_STRIPE_PRICE_ID = "price_1UfIHXAU0KXfGydpFI2wjmGp";

/** Offre complémentaire live — guide PDF, pas l’extension Studio. */
export const UPSELL_VARIANTS = {
  guide: {
    amountCents: 2900,
    compareAtCents: 5900,
    stripeProductId: UPSELL_STRIPE_PRODUCT_ID,
    stripePriceId: UPSELL_STRIPE_PRICE_ID,
    name: "Guide des appareils beauté à domicile",
    nameSub: "Masques LED, stylos, appareils : on fait le tri",
    image: "/upsell/guide-cover.jpg",
    headline: "Félicitations, tu rejoins YoGyFace STUDIO",
    sub: "Une dernière question : avant d’acheter un masque ou un stylo, tu veux le guide où je fais le tri ?",
    bullets: [
      "8 marques passées au crible, dont Nooance, MyBlend, Talika, CurrentBody, Lauvée et ZIIP",
      "Pour chacune : mon avis de pro, à côté de ce qu’on lit sur Internet",
      "Ce que j’ai vraiment testé, et ce que je n’ai pas testé",
      "Les 3 chiffres à vérifier avant d’acheter un masque LED",
      "Codes partenaires inclus dans le PDF",
    ],
  },
};

export function resolveUpsellOffer() {
  return { ...UPSELL_VARIANTS.guide, variant: "guide" };
}

/** Metadata du PaymentIntent. L’app livre le PDF sur `product_kind`. */
export function upsellStripeMeta({
  parentSessionId,
  origEmail = "",
  extra = {},
} = {}) {
  const offer = resolveUpsellOffer();
  const em = String(origEmail || "").trim().toLowerCase();
  return {
    kind: "upsell",
    product_id: GUIDE_APPAREILS_KIND,
    product_kind: GUIDE_APPAREILS_KIND,
    product_label: offer.name,
    stripe_product_id: offer.stripeProductId,
    stripe_price_id: offer.stripePriceId,
    qty: "1",
    unit_amount_cents: String(offer.amountCents),
    amount_cents: String(offer.amountCents),
    upsell_variant: offer.variant,
    parent_session: parentSessionId,
    ...(em ? { orig_email: em, user_email: em } : {}),
    ...extra,
  };
}
