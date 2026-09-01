// PostHog + Meta : UNIQUEMENT après consentement RGPD.
// DataFast : cookieless tant qu'elle n'a pas accepté ; cookies si Accept
// (ou si yf_consent déjà granted). Import dynamique = hors bundle initial.

import { loadMetaPixel } from './meta-pixel'

const CONSENT_KEY = 'yf_consent'
const KEY = import.meta.env.VITE_POSTHOG_KEY
const HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com'
const DATAFAST_WEBSITE_ID = 'dfid_VK30OLHyu2v9ALKIQfjxn'
const DATAFAST_DOMAIN = 'yogyface.fr'

let ph = null // instance PostHog une fois chargée
let phPromise = null // évite les chargements concurrents
let df = null // client DataFast une fois initialisé
let dfPromise = null
let dfCookieless = null // mode du client courant (évite un re-init inutile)

// Renvoie 'granted', 'denied' ou null (pas encore de choix).
export const getConsent = () =>
  typeof localStorage !== 'undefined' ? localStorage.getItem(CONSENT_KEY) : null

// Charge + initialise PostHog (idempotent) et log la 1ʳᵉ page. Sans clé : no-op.
const loadPostHog = () => {
  if (!KEY) return Promise.resolve(null)
  if (!phPromise) {
    phPromise = import('posthog-js').then(({ default: posthog }) => {
      posthog.init(KEY, {
        api_host: HOST,
        capture_pageview: false, // géré manuellement au changement de route (SPA)
        capture_pageleave: true,
        autocapture: true,
      })
      ph = posthog
      posthog.capture('$pageview') // 1ʳᵉ page (chargement initial)
      return posthog
    })
  }
  return phPromise
}

// Recopie l'ID cookieless en cookies pour garder la même visiteuse à l'Accept.
const persistDfIdentity = async (client, { setCookie, isValidVisitorId, isValidSessionId }) => {
  try {
    await client.flush()
  } catch (err) {
    console.error('[analytics] DataFast flush failed', err)
  }
  const vid = client.getVisitorId()
  const sid = client.getSessionId()
  if (!isValidVisitorId(vid) || !isValidSessionId(sid)) return false
  setCookie('datafast_visitor_id', vid, 365, DATAFAST_DOMAIN)
  setCookie('datafast_session_id', sid, 1 / 48, DATAFAST_DOMAIN)
  setCookie('datafast_session_start', String(Date.now()), 1 / 48, DATAFAST_DOMAIN)
  return true
}

// DataFast : cookieless par défaut, cookies après Accept. Désactivé sur localhost.
const loadDataFast = (cookieless) => {
  if (typeof window === 'undefined') return Promise.resolve(null)
  // File d'attente : un Accept pendant l'init cookieless ne lance pas 2 clients.
  dfPromise = (dfPromise || Promise.resolve()).then(async () => {
    if (df && dfCookieless === cookieless) return df
    const sdk = await import('datafast')
    const upgrading = dfCookieless === true && cookieless === false
    let migrated = false
    if (df && upgrading) {
      migrated = await persistDfIdentity(df, sdk)
    }
    if (df) {
      try {
        await df.shutdown()
      } catch (err) {
        console.error('[analytics] DataFast shutdown failed', err)
      }
    }
    const client = await sdk.initDataFast({
      websiteId: DATAFAST_WEBSITE_ID,
      domain: DATAFAST_DOMAIN,
      cookieless,
      autoCapturePageviews: { captureInitialPageview: !migrated },
    })
    df = client
    dfCookieless = cookieless
    return client
  }).catch((err) => {
    console.error('[analytics] DataFast init failed', err)
    df = null
    dfCookieless = null
    dfPromise = null
    return null
  })
  return dfPromise
}

// Au démarrage : DataFast (mode selon consentement) ; PostHog / Meta si granted.
export const initAnalytics = () => {
  const granted = getConsent() === 'granted'
  loadDataFast(!granted)
  if (granted) {
    loadPostHog()
    loadMetaPixel()
  }
}

// Consentement accordé : PostHog / Meta + bascule DataFast en cookies.
export const grantConsent = () => {
  localStorage.setItem(CONSENT_KEY, 'granted')
  loadPostHog()
  loadMetaPixel()
  loadDataFast(false)
}

// Consentement refusé : PostHog / Meta coupés. DataFast reste cookieless.
export const denyConsent = () => {
  localStorage.setItem(CONSENT_KEY, 'denied')
}

// Pageview manuel (SPA) — sans effet tant que PostHog n'est pas chargé.
export const capturePageview = () => {
  if (ph) ph.capture('$pageview')
}

// IDs DataFast pour l'attribution Stripe (cookies après Accept, sinon le client).
export async function getDataFastIds() {
  try {
    let client = df
    if (!client && dfPromise) client = await dfPromise
    const readCookie = (name) => {
      const raw = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
      return raw ? decodeURIComponent(raw[1]) : ''
    }
    const vid = client?.getVisitorId?.() || readCookie('datafast_visitor_id')
    const sid = client?.getSessionId?.() || readCookie('datafast_session_id')
    return {
      ...(vid ? { datafast_visitor_id: vid } : {}),
      ...(sid ? { datafast_session_id: sid } : {}),
    }
  } catch (err) {
    console.error('[analytics] DataFast ids failed', err)
    return {}
  }
}

// Event custom : PostHog si consenti ; DataFast dès qu'il est prêt.
export const captureEvent = (name, props) => {
  if (ph) ph.capture(name, props)
  if (df) {
    df.track(name, props)
  } else if (dfPromise) {
    dfPromise.then((client) => client?.track(name, props))
  }
}
