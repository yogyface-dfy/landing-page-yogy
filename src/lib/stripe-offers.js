/**
 * Offres Stripe (VIP). Le serveur est la source de vérité pour les montants
 * (le client n'envoie jamais le prix). Change l'upsell ici + éventuellement
 * STRIPE_UPSELL_NAME / STRIPE_UPSELL_AMOUNT_CENTS sur Railway.
 */
export const VIP_ONCE_CENTS = 29900
export const VIP_3X_CENTS = 9999

/** Image publique : Stripe la charge depuis internet (pas localhost). */
const VIP_IMAGE = 'https://yogyface.fr/logo-yogyface-dark.png'

const VIP_DESCRIPTION =
  'Avant-première plateforme · 299 € au lieu de 499 € · 18h de coaching · 12 mois d’accompagnement · diagnostic + renouvellement'

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
        images: [VIP_IMAGE],
      },
    },
  },
  'vip-3x': {
    offer: 'vip',
    mode: 'subscription',
    fallbackUrl: 'https://buy.stripe.com/8x214mcl35Za1fX66L8Zq0r',
    priceData: {
      currency: 'eur',
      unit_amount: VIP_3X_CENTS,
      recurring: { interval: 'month' },
      product_data: {
        name: 'YoGyFace Reset — Offre VIP (3 × 99,99 €)',
        description: `${VIP_DESCRIPTION} · 3 mensualités`,
        images: [VIP_IMAGE],
      },
    },
  },
}

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
