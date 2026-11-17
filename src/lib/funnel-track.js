/**
 * Client beacon → POST /api/funnel/track (sendBeacon / fetch keepalive).
 * No-op sans recordId ni email (le cookie yf_hid est lu côté serveur).
 */

import {
  PREFILL_EMAIL_KEY,
  isValidEmail,
  readPrefillContact,
  readPrefillEmail,
} from './stripe-checkout'
import { withLeadQuery } from './lead-query'

export { withLeadQuery }

export const RECORD_ID_KEY = 'yogy_atelier_record_id'
const RECORD_ID_RE = /^rec[a-zA-Z0-9]{14}$/

export function isValidRecordId(id) {
  return typeof id === 'string' && RECORD_ID_RE.test(id)
}

export function rememberRecordId(id) {
  if (typeof sessionStorage === 'undefined' || !isValidRecordId(id)) return
  sessionStorage.setItem(RECORD_ID_KEY, id)
}

/** Lit recordId depuis URL (?recordId= / ?rid=) puis session. */
export function readRecordId(searchParams) {
  const fromUrl = searchParams?.get('recordId') || searchParams?.get('rid') || ''
  if (isValidRecordId(fromUrl)) {
    rememberRecordId(fromUrl)
    return fromUrl
  }
  if (typeof sessionStorage === 'undefined') return ''
  const stored = sessionStorage.getItem(RECORD_ID_KEY) || ''
  return isValidRecordId(stored) ? stored : ''
}

/** Lead pour beacons : URL + session (email / prénom / phone / recordId). */
export function leadFromSearchParams(searchParams) {
  const email = readPrefillEmail(searchParams)
  const contact = readPrefillContact(searchParams)
  return {
    email: email || undefined,
    firstName: contact.firstName || undefined,
    phone: contact.phone || undefined,
    recordId: readRecordId(searchParams) || undefined,
  }
}

/** Lead courant dans le navigateur (pathname déjà chargé). */
export function leadFromWindow() {
  if (typeof window === 'undefined') return {}
  return leadFromSearchParams(new URL(window.location.href).searchParams)
}

/**
 * Envoie un event funnel. Préfère sendBeacon ; fallback fetch keepalive.
 * Sans identity URL/session : on envoie quand même (cookie yf_hid côté API).
 */
export function sendFunnelTrack({
  page,
  event,
  lead,
  watchPct,
  watchSec,
} = {}) {
  if (typeof window === 'undefined' || !page || !event) return

  const resolved = lead || leadFromWindow()
  const email =
    (resolved.email && isValidEmail(resolved.email) && resolved.email.trim()) ||
    (typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem(PREFILL_EMAIL_KEY) || ''
      : '')
  const recordId = resolved.recordId || readRecordId(new URL(window.location.href).searchParams)
  const url = new URL(window.location.href)
  const h = url.searchParams.get('h') || ''

  const body = {
    page,
    event,
    ...(isValidRecordId(recordId) ? { recordId } : {}),
    ...(isValidEmail(email) ? { email: email.trim() } : {}),
    ...(resolved.firstName ? { firstName: resolved.firstName } : {}),
    ...(resolved.phone ? { phone: resolved.phone } : {}),
    ...(h ? { h } : {}),
  }
  if (event === 'watch') {
    if (watchPct != null) body.watchPct = watchPct
    if (watchSec != null) body.watchSec = watchSec
  }

  const json = JSON.stringify(body)
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([json], { type: 'application/json' })
      if (navigator.sendBeacon('/api/funnel/track', blob)) return
    }
  } catch {
    // fallback fetch
  }

  fetch('/api/funnel/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    keepalive: true,
    body: json,
  }).catch(() => {})
}
