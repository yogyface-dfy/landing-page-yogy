/** Ping identité : cookie, ?h=, ?email= (mails AC), IP unique côté serveur. */

import { isFunnelPath } from './funnel'
import { PREFILL_EMAIL_KEY, isValidEmail } from './stripe-checkout'

const VENTE_PATHS = new Set(['/vente', '/vente-vip', '/vente-10x'])
const SKIP = new Set(['/liste-attente', '/merci-liste-attente'])

function urlEmail(url) {
  const raw = (url.searchParams.get('email') || url.searchParams.get('prefilled_email') || '').replace(/ /g, '+')
  return isValidEmail(raw) ? raw.trim() : ''
}

export function pingVenteHit(pathname) {
  if (typeof window === 'undefined' || SKIP.has(pathname)) return
  const url = new URL(window.location.href)
  const h = url.searchParams.get('h') || ''
  const email = urlEmail(url) || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(PREFILL_EMAIL_KEY) || '' : '')
  const isVente = VENTE_PATHS.has(pathname)
  if (!isVente && !h && !email && !isFunnelPath(pathname)) return

  fetch('/api/vente-hit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    keepalive: true,
    body: JSON.stringify({
      path: pathname,
      record: isVente,
      ...(h ? { h } : {}),
      ...(isValidEmail(email) ? { email: email.trim() } : {}),
    }),
  }).catch(() => {})

  if (!isVente || !window.history?.replaceState) return
  let dirty = false
  if (h) {
    url.searchParams.delete('h')
    dirty = true
  }
  if (url.searchParams.has('email') || url.searchParams.has('prefilled_email')) {
    url.searchParams.delete('email')
    url.searchParams.delete('prefilled_email')
    dirty = true
  }
  if (dirty) {
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
  }
}
