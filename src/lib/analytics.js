// PostHog + Meta : UNIQUEMENT après consentement RGPD.
// DataFast cookieless : pas de cookie, chargé pour tout le monde (dashboard
// DataFast en mode cookieless). Imports dynamiques = chunks hors bundle initial.

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

// DataFast cookieless : pageviews SPA auto. Désactivé sur localhost.
const loadDataFast = () => {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (!dfPromise) {
    dfPromise = import('datafast')
      .then(({ initDataFast }) =>
        initDataFast({
          websiteId: DATAFAST_WEBSITE_ID,
          domain: DATAFAST_DOMAIN,
          cookieless: true,
          autoCapturePageviews: true,
        }),
      )
      .then((client) => {
        df = client
        return client
      })
      .catch((err) => {
        console.error('[analytics] DataFast init failed', err)
        dfPromise = null
        return null
      })
  }
  return dfPromise
}

// Au démarrage : DataFast toujours ; PostHog / Meta si déjà consenti.
export const initAnalytics = () => {
  loadDataFast()
  if (getConsent() === 'granted') {
    loadPostHog()
    loadMetaPixel()
  }
}

// Consentement accordé : on persiste le choix et on démarre PostHog / Meta.
export const grantConsent = () => {
  localStorage.setItem(CONSENT_KEY, 'granted')
  loadPostHog()
  loadMetaPixel()
}

// Consentement refusé : PostHog / Meta restent coupés. DataFast inchangé.
export const denyConsent = () => {
  localStorage.setItem(CONSENT_KEY, 'denied')
}

// Pageview manuel (SPA) — sans effet tant que PostHog n'est pas chargé.
export const capturePageview = () => {
  if (ph) ph.capture('$pageview')
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
