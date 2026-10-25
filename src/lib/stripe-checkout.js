// Payment Links : seuls prefilled_email / locked_prefilled_email / locale
// sont officiels. Pas de prefilled_phone (Stripe ignore ce paramètre).
// https://docs.stripe.com/payment-links/customize#customize-checkout-with-url-parameters
// Checkout Session : email + name/phone sur le Customer + metadata.

export const PREFILL_EMAIL_KEY = 'yogy_prefill_email'
export const PREFILL_FIRSTNAME_KEY = 'yogy_prefill_firstname'
export const PREFILL_PHONE_KEY = 'yogy_prefill_phone'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Email valide pour Stripe (sinon le paramètre est ignoré). */
export function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_RE.test(value.trim())
}

/** Prénom court (URL ads / AC). */
export function normalizeFirstName(value) {
  const s = String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 60)
  if (s.length < 2) return ''
  if (/^(ygf|test|stripe|customer)$/i.test(s)) return ''
  return s
}

/** E.164 approximatif : digits + + optionnel (ex. +336… ou 06…). */
export function normalizePhone(value) {
  let raw = String(value || '').trim()
  // URLSearchParams transforme + en espace.
  raw = raw.replace(/ /g, '+')
  const digits = raw.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 15) return ''
  if (raw.startsWith('+') || digits.length >= 11) return `+${digits}`
  return digits
}

/** Persiste l'email (liste d'attente ou ?email=) pour les CTAs Stripe. */
export function rememberPrefillEmail(email) {
  if (typeof sessionStorage === 'undefined' || !isValidEmail(email)) return
  sessionStorage.setItem(PREFILL_EMAIL_KEY, email.trim())
}

function rememberPrefillFirstName(name) {
  const n = normalizeFirstName(name)
  if (typeof sessionStorage === 'undefined' || !n) return
  sessionStorage.setItem(PREFILL_FIRSTNAME_KEY, n)
}

function rememberPrefillPhone(phone) {
  const p = normalizePhone(phone)
  if (typeof sessionStorage === 'undefined' || !p) return
  sessionStorage.setItem(PREFILL_PHONE_KEY, p)
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

/** firstname + phone depuis l'URL (?firstname= & ?phone=) puis session. */
export function readPrefillContact(searchParams) {
  const firstFromUrl =
    searchParams?.get('firstname') ||
    searchParams?.get('first_name') ||
    searchParams?.get('prenom') ||
    ''
  const phoneFromUrl = searchParams?.get('phone') || searchParams?.get('tel') || ''
  const firstName = normalizeFirstName(firstFromUrl)
  const phone = normalizePhone(phoneFromUrl)
  if (firstName) rememberPrefillFirstName(firstName)
  if (phone) rememberPrefillPhone(phone)
  if (typeof sessionStorage === 'undefined') {
    return { firstName, phone }
  }
  return {
    firstName: firstName || sessionStorage.getItem(PREFILL_FIRSTNAME_KEY) || '',
    phone: phone || sessionStorage.getItem(PREFILL_PHONE_KEY) || '',
  }
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

/** Crée une Checkout Session (VIP / Studio) puis redirige. fallbackUrl si Stripe n'est pas configuré. */
export async function startCheckoutSession({
  plan,
  email,
  firstName = '',
  phone = '',
  cancelPath,
}) {
  // Import dynamique : ce fichier est aussi chargé par Node (isValidEmail).
  const [
    { getDataFastIds },
    { getFbCookies, newEventId, stashPurchaseConversion },
    { purchaseContentName, purchaseValue },
  ] = await Promise.all([
    import('./analytics'),
    import('./meta-pixel'),
    import('./stripe-offers'),
  ])
  const eventId = newEventId()
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan,
      email,
      firstName: normalizeFirstName(firstName),
      phone: normalizePhone(phone),
      cancelPath,
      meta_event_id: eventId,
      ...getFbCookies(),
      ...(await getDataFastIds()),
    }),
  })
  const data = await res.json().catch(() => ({}))
  // Checkout Session : pixel /confirmation-achat-bienvenue dédupliqué avec la CAPI.
  if (data.url) {
    stashPurchaseConversion({
      eventId,
      plan,
      email,
      value: purchaseValue(plan),
      contentName: purchaseContentName(plan),
    })
    return data
  }
  if (data.fallbackUrl) return data
  throw new Error(data.error || 'Paiement indisponible')
}
