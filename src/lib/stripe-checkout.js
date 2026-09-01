// Payment Links : seuls prefilled_email / locked_prefilled_email / locale
// sont officiels. Pas de prefilled_phone (Stripe ignore ce paramètre).
// https://docs.stripe.com/payment-links/customize#customize-checkout-with-url-parameters

export const PREFILL_EMAIL_KEY = 'yogy_prefill_email'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Email valide pour Stripe (sinon le paramètre est ignoré). */
export function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_RE.test(value.trim())
}

/** Persiste l'email (liste d'attente ou ?email=) pour les CTAs Stripe. */
export function rememberPrefillEmail(email) {
  if (typeof sessionStorage === 'undefined' || !isValidEmail(email)) return
  sessionStorage.setItem(PREFILL_EMAIL_KEY, email.trim())
}

/** Email depuis l'URL (?email= / ?prefilled_email=) puis session. */
export function readPrefillEmail(searchParams) {
  // + dans ?email= est lu comme espace par URLSearchParams — un email n'a pas d'espace.
  const fromUrl = (searchParams?.get('email') || searchParams?.get('prefilled_email') || '').replace(/ /g, '+')
  if (isValidEmail(fromUrl)) {
    rememberPrefillEmail(fromUrl)
    return fromUrl.trim()
  }
  if (typeof sessionStorage === 'undefined') return ''
  return sessionStorage.getItem(PREFILL_EMAIL_KEY) || ''
}

/** Ajoute prefilled_email + locale=fr. Pas de client_reference_id (webi = code marraine). */
export function withStripePrefill(url, email) {
  if (!url || !url.includes('buy.stripe.com')) return url
  const next = new URL(url)
  next.searchParams.set('locale', 'fr')
  if (isValidEmail(email)) {
    next.searchParams.set('prefilled_email', email.trim())
  }
  return next.toString()
}

/** Crée une Checkout Session (VIP) puis redirige. fallbackUrl si Stripe n'est pas configuré. */
export async function startCheckoutSession({ plan, email, cancelPath }) {
  const { getDataFastIds } = await import('./analytics')
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, email, cancelPath, ...(await getDataFastIds()) }),
  })
  const data = await res.json().catch(() => ({}))
  if (data.url) return data
  if (data.fallbackUrl) return data
  throw new Error(data.error || 'Paiement indisponible')
}
