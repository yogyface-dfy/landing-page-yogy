// Analytics PostHog (cloud EU) — chargé UNIQUEMENT après consentement RGPD.
// posthog-js est importé dynamiquement : son code n'est téléchargé qu'au
// moment du consentement (chunk séparé), pour ne pas alourdir le bundle initial.

import { loadMetaPixel } from './meta-pixel'

const CONSENT_KEY = 'yf_consent'
const KEY = import.meta.env.VITE_POSTHOG_KEY
const HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com'

let ph = null // instance PostHog une fois chargée
let phPromise = null // évite les chargements concurrents

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

// À appeler au démarrage de l'app : réactive le tracking si déjà consenti.
export const initAnalytics = () => {
  if (getConsent() === 'granted') {
    loadPostHog()
    loadMetaPixel()
  }
}

// Consentement accordé : on persiste le choix et on démarre le tracking.
export const grantConsent = () => {
  localStorage.setItem(CONSENT_KEY, 'granted')
  loadPostHog()
  loadMetaPixel()
}

// Consentement refusé : on mémorise le refus, rien n'est chargé.
export const denyConsent = () => {
  localStorage.setItem(CONSENT_KEY, 'denied')
}

// Pageview manuel (SPA) — sans effet tant que PostHog n'est pas chargé.
export const capturePageview = () => {
  if (ph) ph.capture('$pageview')
}

// Event custom (conversions…) — sans effet si non consenti / non chargé.
export const captureEvent = (name, props) => {
  if (ph) ph.capture(name, props)
}
