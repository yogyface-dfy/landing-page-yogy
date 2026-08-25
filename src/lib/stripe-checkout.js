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

/**
 * client_reference_id : lettres, chiffres, - et _ uniquement (max 200).
 * Webhook checkout.session.completed : customer_details.email = saisi sur Stripe,
 * client_reference_id = email d'origine (?email= / liste d'attente), même si modifié.
 */
export function encodeOrigEmail(email) {
  return email
    .trim()
    .replace(/\+/g, '-plus-')
    .replace(/@/g, '-at-')
    .replace(/\./g, '-dot-')
    .slice(0, 200)
}

/** Ajoute prefilled_email, client_reference_id, locale=fr. No-op hors Stripe. */
export function withStripePrefill(url, email) {
  if (!url || !url.includes('buy.stripe.com')) return url
  const next = new URL(url)
  next.searchParams.set('locale', 'fr')
  if (isValidEmail(email)) {
    const trimmed = email.trim()
    next.searchParams.set('prefilled_email', trimmed)
    next.searchParams.set('client_reference_id', encodeOrigEmail(trimmed))
  }
  return next.toString()
}
