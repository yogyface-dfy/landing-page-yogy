/**
 * Tunnel d'acquisition (ex-Systeme.io). Pages hors nav / sitemap / Google.
 * Vidéos : CDN Systeme.io tant qu'elles n'ont pas été réhébergées.
 */
import { createRecord } from './airtable'
import { captureEvent } from './analytics'
import { isValidEmail, rememberPrefillEmail } from './stripe-checkout'

export const FUNNEL_PATHS = [
  '/atelier-gratuit',
  '/confirmation-inscription',
  '/video-01',
  '/video-02',
  '/video-03',
  '/replay-gratuit',
  '/confirmation-achat-bienvenue',
  '/merci-achat',
]

export function isFunnelPath(pathname) {
  return FUNNEL_PATHS.includes(pathname)
}

/** Pages légales ouvertes depuis le tunnel : chrome réduit, pas de nav site. */
export const FUNNEL_FROM = 'funnel'
export const LEGAL_PATHS = ['/mentions-legales', '/cgv', '/confidentialite']

export function isFunnelLegal(pathname, search = '') {
  return (
    LEGAL_PATHS.includes(pathname) &&
    new URLSearchParams(search).get('from') === FUNNEL_FROM
  )
}

export function isFunnelChrome(pathname, search = '') {
  return isFunnelPath(pathname) || isFunnelLegal(pathname, search)
}

export function legalTo(path, fromFunnel) {
  return fromFunnel ? `${path}?from=${FUNNEL_FROM}` : path
}

export const WHATSAPP_GROUP = 'https://go.yogyface.fr/whatsapp-group'
export const WEBI_URL = 'https://webi.yogyface.fr'
export const LIVE_LABEL = 'Mardi à 20h'

const PARIS = 'Europe/Paris'
const WEEKDAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

/** Calendrier + heure à Paris (le live est à 20h heure FR). */
function parisParts(date) {
  const map = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: PARIS,
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  return {
    year: +map.year,
    month: +map.month,
    day: +map.day,
    hour: +map.hour,
    minute: +map.minute,
    weekday: WEEKDAY[map.weekday],
  }
}

/**
 * Prochain mardi 20h (Paris). Dès que ce créneau est passé → mardi suivant.
 * Ex. « Mardi 13 octobre à 20h »
 */
export function nextTuesdayLiveLabel(now = new Date()) {
  const p = parisParts(now)
  let add = (2 - p.weekday + 7) % 7
  // Mardi déjà 20h (ou plus tard) → on bascule sur mardi + 7.
  if (add === 0 && p.hour >= 20) add = 7
  const target = new Date(Date.UTC(p.year, p.month - 1, p.day + add, 12))
  const date = new Intl.DateTimeFormat('fr-FR', {
    timeZone: PARIS,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(target)
  return `${date.charAt(0).toUpperCase()}${date.slice(1)} à 20h`
}

const CF = 'https://d1yei2z3i6k35z.cloudfront.net/6457367'

export const VIDEOS = [
  {
    slug: '01',
    path: '/video-01',
    title: 'Les secrets cachés des lobbies cosmétiques et pharmaceutiques',
    src: `${CF}/69f31aa8dfc219.23664402_videobonus1.mp4`,
  },
  {
    slug: '02',
    path: '/video-02',
    title: "Comment j'ai transformé ma souffrance en mission de vie",
    src: `${CF}/69f329caa730c0.98540995_VIDEOBONUS2_compressed.mp4`,
  },
  {
    slug: '03',
    path: '/video-03',
    title: 'La vraie raison derrière ton manque de motivation',
    src: `${CF}/69f32a17481c30.20770819_V1VIDEOBONUS31_compressed.mp4`,
  },
]

export const CONFIRM_VIDEO_SRC = `${CF}/6910b53c95f74_VALITADIONINSCRIPTIONSANSALICIA.mp4`

/** Vide tant que le replay n'a pas de fichier (page Systeme.io = CTA vente). */
export const REPLAY_VIDEO_SRC = ''

export function videoFromPath(pathname) {
  return VIDEOS.find((v) => v.path === pathname) || VIDEOS[0]
}

export async function enrollAtelier({ email, prenom, phone } = {}) {
  if (!isValidEmail(email)) throw new Error('Email invalide')
  const fields = {
    Email: email.trim(),
    Prénom: (prenom && String(prenom).trim()) || '—',
    Source: 'yogyface.fr/atelier-gratuit',
    formName: 'atelier-gratuit',
  }
  if (phone) fields.Phone = phone
  // Nom logique : le serveur mappe vers tblgeGEVgkZnDxwfR (autre base).
  const result = await createRecord('Atelier gratuit', fields)
  rememberPrefillEmail(email)
  captureEvent('atelier_optin')
  return result
}
