// PostHog + Meta : UNIQUEMENT après consentement RGPD.
// DataFast : cookieless tant qu'elle n'a pas accepté ; cookies si Accept
// (ou si yf_consent déjà granted). Import dynamique = hors bundle initial.

import { loadMetaPixel } from './meta-pixel'

const CONSENT_KEY = 'yf_consent'
const KEY = import.meta.env.VITE_POSTHOG_KEY
const HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com'
const DATAFAST_WEBSITE_ID = 'dfid_VK30OLHyu2v9ALKIQfjxn'
const DATAFAST_DOMAIN = 'www.yogyface.fr'

let ph = null // instance PostHog une fois chargée
let phPromise = null // évite les chargements concurrents
let df = null // client DataFast une fois initialisé
let dfPromise = null
let dfCookieless = null // mode du client courant (évite un re-init inutile)

// DataFast crée un paiement si l'URL contient session_id (Stripe). On attribue
// déjà via metadata Checkout : sans ça, chaque achat est compté deux fois.
const DF_PAYMENT_QUERY_KEYS = ['session_id', 'order_id', 'checkout_id']

function stripDataFastPaymentQuery() {
  if (typeof window === 'undefined' || !window.history?.replaceState) return
  const url = new URL(window.location.href)
  const stripeCs = url.searchParams.get('session_id')
  const onUpsell = url.pathname === '/vente-upsell'
  // L'upsell a besoin de l'id Checkout, sous un nom que DataFast n'intercepte pas.
  if (onUpsell && stripeCs?.startsWith('cs_') && !url.searchParams.get('cs')) {
    url.searchParams.set('cs', stripeCs)
  }
  let dirty = false
  for (const key of DF_PAYMENT_QUERY_KEYS) {
    if (!url.searchParams.has(key)) continue
    url.searchParams.delete(key)
    dirty = true
  }
  if (!dirty) return
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
}

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
  stripDataFastPaymentQuery()
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
      // Cookieless : le visitorId serveur n’arrive qu’après flush — 1s > 5s défaut.
      flushInterval: 1000,
      autoCapturePageviews: { captureInitialPageview: !migrated },
    })
    df = client
    dfCookieless = cookieless
    // autoCapture enfile la pageview en async — petit délai puis flush pour l’id serveur.
    if (cookieless && !migrated) {
      sleep(200)
        .then(() => client.flush?.())
        .catch((err) => {
          console.error('[analytics] DataFast early flush failed', err)
        })
    }
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Cookie, sessionStorage cookieless, ou window.datafast.visitorId (SDK).
function readDfId(name) {
  try {
    const raw = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
    if (raw) return decodeURIComponent(raw[1])
  } catch {
    /* ignore */
  }
  try {
    const fromSession = sessionStorage.getItem(name)
    if (fromSession) return fromSession
  } catch {
    /* ignore */
  }
  if (name === 'datafast_visitor_id') {
    try {
      const fromWindow = window.datafast?.visitorId
      if (typeof fromWindow === 'string' && fromWindow) return fromWindow
    } catch {
      /* ignore */
    }
  }
  return ''
}

// IDs DataFast pour l'attribution Stripe.
// Cookieless : getVisitorId() reste null tant que le 1er flush n’a pas renvoyé l’id serveur.
export async function getDataFastIds() {
  try {
    if (!df && !dfPromise) {
      loadDataFast(getConsent() !== 'granted')
    }
    let client = df
    if (!client && dfPromise) client = await dfPromise

    let vid = client?.getVisitorId?.() || readDfId('datafast_visitor_id')
    let sid = client?.getSessionId?.() || readDfId('datafast_session_id')

    // Force le flush + poll court : sinon ~1/3 des checkouts partent sans metadata DF.
    if (client && !vid) {
      try {
        await client.flush?.()
        vid = client.getVisitorId?.() || readDfId('datafast_visitor_id')
        // Queue vide (race pageview) → renvoie une pageview puis re-flush.
        if (!vid && client.trackPageview) {
          await client.trackPageview()
          await client.flush?.()
        }
      } catch (err) {
        console.error('[analytics] DataFast flush before ids failed', err)
      }
      const deadline = Date.now() + 2000
      while (!vid && Date.now() < deadline) {
        await sleep(100)
        vid = client.getVisitorId?.() || readDfId('datafast_visitor_id')
      }
      sid = client.getSessionId?.() || readDfId('datafast_session_id') || sid
    }

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
