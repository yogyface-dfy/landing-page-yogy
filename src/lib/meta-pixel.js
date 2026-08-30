/** Pixel Meta 604268118937812 — même ID que webi. Chargé après consentement. */

export const META_PIXEL_ID = '604268118937812'
const WAITLIST_KEY = 'yf_waitlist_optin'
/** Évite un 2ᵉ PageView au 1er mount SPA (déjà fire par loadMetaPixel). */
let skipNextPageview = false

export function newEventId() {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`
  }
}

export function fbTrack(event, params = {}, { custom = false, eventId } = {}) {
  try {
    if (typeof window.fbq !== 'function') return
    const opts = eventId ? { eventID: eventId } : undefined
    window.fbq(custom ? 'trackCustom' : 'track', event, params, opts)
  } catch {
    /* le tracking ne doit jamais casser l'UX */
  }
}

/** Advanced Matching — ne re-fire pas PageView. */
export function fbSetUser({ email, phone, firstName } = {}) {
  try {
    if (typeof window.fbq !== 'function') return
    const am = {}
    if (email) am.em = String(email).trim().toLowerCase()
    if (phone) am.ph = String(phone).replace(/\D/g, '')
    if (firstName) am.fn = String(firstName).trim().toLowerCase()
    if (Object.keys(am).length) window.fbq('init', META_PIXEL_ID, am)
  } catch {
    /* ignore */
  }
}

export function getFbCookies() {
  try {
    const read = (name) =>
      document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]
    const fbp = read('_fbp')
    const fbc = read('_fbc')
    return {
      ...(fbp ? { fbp: decodeURIComponent(fbp) } : {}),
      ...(fbc ? { fbc: decodeURIComponent(fbc) } : {}),
    }
  } catch {
    return {}
  }
}

/** Snippet officiel — une seule fois. */
export function loadMetaPixel() {
  if (typeof window === 'undefined' || window.fbq) return
  const f = window
  const b = document
  const n = (f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
  })
  if (!f._fbq) f._fbq = n
  n.push = n
  n.loaded = true
  n.version = '2.0'
  n.queue = []
  const t = b.createElement('script')
  t.async = true
  t.src = 'https://connect.facebook.net/en_US/fbevents.js'
  const s = b.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(t, s)
  f.fbq('init', META_PIXEL_ID)
  f.fbq('track', 'PageView')
  skipNextPageview = true
}

/** PageView SPA — no-op si le pixel n'est pas chargé (refus cookies). */
export function captureMetaPageview() {
  if (skipNextPageview) {
    skipNextPageview = false
    return
  }
  fbTrack('PageView')
}

export function stashWaitlistConversion({ email, phone, firstName }) {
  const eventId = newEventId()
  try {
    sessionStorage.setItem(
      WAITLIST_KEY,
      JSON.stringify({
        eventId,
        email,
        phone: phone || '',
        firstName,
        ...getFbCookies(),
        pageUrl: `${window.location.origin}/merci-liste-attente`,
      }),
    )
  } catch {
    /* private mode */
  }
  return eventId
}

export function consumeWaitlistConversion() {
  try {
    const raw = sessionStorage.getItem(WAITLIST_KEY)
    if (!raw) return null
    sessionStorage.removeItem(WAITLIST_KEY)
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** Pixel + CAPI, même event_id. CAPI même si le pixel est bloqué. */
export function fireWaitlistConversion(payload) {
  if (!payload?.eventId) return
  fbSetUser(payload)
  fbTrack(
    'optInWaitingList',
    { content_name: 'liste-attente' },
    { custom: true, eventId: payload.eventId },
  )
  fetch('/api/capi-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: 'optInWaitingList',
      eventId: payload.eventId,
      pageUrl: payload.pageUrl,
      email: payload.email,
      phone: payload.phone,
      firstName: payload.firstName,
      fbp: payload.fbp,
      fbc: payload.fbc,
    }),
    keepalive: true,
  }).catch(() => {})
}
