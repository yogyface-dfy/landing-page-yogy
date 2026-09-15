/**
 * Offres Stripe. Le serveur est la source de vérité pour les montants
 * (le client n'envoie jamais le prix). Change l'upsell ici + éventuellement
 * STRIPE_UPSELL_NAME / STRIPE_UPSELL_AMOUNT_CENTS sur Railway.
 */
export const VIP_ONCE_CENTS = 29900
export const VIP_3X_CENTS = 9999
export const VIP_6X_CENTS = 4999
export const STUDIO_ONCE_CENTS = 29900
export const STUDIO_4X_CENTS = 7499
export const STUDIO_6X_CENTS = 4999

/** Image publique : Stripe la charge depuis internet (pas localhost). */
const PRODUCT_IMAGE = 'https://yogyface.fr/logo-yogyface-dark.png'

const VIP_DESCRIPTION =
  'Avant-première plateforme · 299 € au lieu de 999 € · 18h de coaching · 12 mois d’accompagnement · diagnostic + renouvellement'

const STUDIO_DESCRIPTION =
  'Programme YoGyFace Studio · 299 € · 12h de coaching · 6 mois d’accompagnement · diagnostic'

export const PLANS = {
  'vip-once': {
    offer: 'vip',
    mode: 'payment',
    fallbackUrl: 'https://buy.stripe.com/7sY9AS2KtdrCcYF7aP8Zq0q',
    priceData: {
      currency: 'eur',
      unit_amount: VIP_ONCE_CENTS,
      product_data: {
        name: 'YoGyFace Reset — Offre VIP',
        description: VIP_DESCRIPTION,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  'vip-3x': {
    offer: 'vip',
    mode: 'subscription',
    months: 3,
    fallbackUrl: 'https://buy.stripe.com/8x214mcl35Za1fX66L8Zq0r',
    priceData: {
      currency: 'eur',
      unit_amount: VIP_3X_CENTS,
      recurring: { interval: 'month' },
      product_data: {
        name: 'YoGyFace Reset — Offre VIP (3 × 99,99 €)',
        description: `${VIP_DESCRIPTION} · 3 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  'vip-6x': {
    offer: 'vip',
    mode: 'subscription',
    months: 6,
    priceData: {
      currency: 'eur',
      unit_amount: VIP_6X_CENTS,
      recurring: { interval: 'month' },
      product_data: {
        name: 'YoGyFace Reset — Offre VIP (6 × 49,99 €)',
        description: `${VIP_DESCRIPTION} · 6 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  'studio-once': {
    offer: 'studio',
    mode: 'payment',
    priceData: {
      currency: 'eur',
      unit_amount: STUDIO_ONCE_CENTS,
      product_data: {
        name: 'YoGyFace Studio',
        description: STUDIO_DESCRIPTION,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  'studio-4x': {
    offer: 'studio',
    mode: 'subscription',
    months: 4,
    priceData: {
      currency: 'eur',
      unit_amount: STUDIO_4X_CENTS,
      recurring: { interval: 'month' },
      product_data: {
        name: 'YoGyFace Studio (4 × 74,99 €)',
        description: `${STUDIO_DESCRIPTION} · 4 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
  'studio-6x': {
    offer: 'studio',
    mode: 'subscription',
    months: 6,
    priceData: {
      currency: 'eur',
      unit_amount: STUDIO_6X_CENTS,
      recurring: { interval: 'month' },
      product_data: {
        name: 'YoGyFace Studio (6 × 49,99 €)',
        description: `${STUDIO_DESCRIPTION} · 6 mensualités`,
        images: [PRODUCT_IMAGE],
      },
    },
  },
}

/** Valeur Purchase Meta = montant du programme (1× ou N mensualités). */
export function purchaseValue(plan) {
  const spec = PLANS[plan]
  if (!spec) return 0
  return ((spec.months || 1) * spec.priceData.unit_amount) / 100
}

export function purchaseContentName(plan) {
  const kind = PLANS[plan]?.offer
  if (kind === 'vip') return 'YoGyFace VIP'
  if (kind === 'studio') return 'YoGyFace Studio'
  return 'YoGyFace'
}

/** Post-achat 1:1. `false` = après Stripe on va sur /merci-achat (pas /vente-upsell). */
export const UPSELL_ENABLED = false

/** Post-achat 1 clic — 1 € le temps des tests, à remettre au tarif réel avant le live. */
export const UPSELL = {
  amountCents: 50,
  name: 'Séance individuelle avec Laury',
  headline: 'Une séance 1:1 pour démarrer juste',
  sub: '45 min en visio — placement, routine, corrections sur TON visage.',
  bullets: [
    'On pose tes priorités dès la première semaine',
    'Tu repars avec des corrections précises',
    'Replay de la séance inclus',
  ],
}
