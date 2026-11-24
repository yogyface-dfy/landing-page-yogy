/**
 * Tunnel d'acquisition (ex-Systeme.io). Pages hors nav / sitemap / Google.
 * Vidéos bonus : MP4 CloudFront, posters locaux /videos/funnel-bonus-0*.png.
 */
import { createRecord } from './airtable'
import { captureEvent } from './analytics'
import { readAttribution } from './attribution'
import { fireAtelierLead } from './meta-pixel'
import { isValidEmail, rememberPrefillEmail } from './stripe-checkout'

export const FUNNEL_PATHS = [
  '/atelier-gratuit',
  '/confirmation-inscription',
  '/video-01',
  '/video-02',
  '/video-03',
  // Redirection seule vers /video-03. Reste dans le chrome funnel le temps du replace.
  '/video-123',
  '/cadeau1',
  '/cadeau2',
  '/cadeau3',
  // Redirection seule vers /cadeau3. Chrome funnel le temps du replace.
  '/cadeaux-123',
  '/replay-gratuit',
  '/bonus-live',
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
/** Appli pré-webi. Ce n'est pas la salle du live. */
export const WEBI_URL = 'https://atelier.yogyface.fr'
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

/** Prochain mardi live (YMD + Date UTC noon) — après 20h Paris le mardi → +7. */
export function nextTuesdayLiveParts(now = new Date()) {
  const p = parisParts(now)
  let add = (2 - p.weekday + 7) % 7
  if (add === 0 && p.hour >= 20) add = 7
  const target = new Date(Date.UTC(p.year, p.month - 1, p.day + add, 12))
  const y = target.getUTCFullYear()
  const m = target.getUTCMonth() + 1
  const d = target.getUTCDate()
  return {
    y,
    m,
    d,
    ymd: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    target,
  }
}

/**
 * Prochain mardi 20h (Paris). Dès que ce créneau est passé → mardi suivant.
 * Ex. « Mardi 13 octobre à 20h »
 */
export function nextTuesdayLiveLabel(now = new Date()) {
  const { target } = nextTuesdayLiveParts(now)
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
    // Titre court (script) + résumé sous le hero — format Maydi.
    shortTitle: 'Les lobbies',
    title: 'Les secrets cachés des lobbies cosmétiques et pharmaceutiques',
    summary:
      'Ce que l’industrie ne te dit pas, et pourquoi ton visage en paie le prix.',
    src: `${CF}/69f31aa8dfc219.23664402_videobonus1.mp4`,
    poster: '/videos/funnel-bonus-01.png',
  },
  {
    slug: '02',
    path: '/video-02',
    shortTitle: 'Ma mission',
    title: "Comment j'ai transformé ma souffrance en mission de vie",
    summary:
      'Mon histoire, d’où je viens, et pourquoi j’ai créé YoGyFace.',
    src: `${CF}/69f329caa730c0.98540995_VIDEOBONUS2_compressed.mp4`,
    poster: '/videos/funnel-bonus-02.png',
  },
  {
    slug: '03',
    path: '/video-03',
    shortTitle: 'La motivation',
    title: 'La vraie raison derrière ton manque de motivation',
    summary:
      'Pourquoi tu n’arrives pas à tenir, et comment sortir du mode survie.',
    src: `${CF}/69f32a17481c30.20770819_V1VIDEOBONUS31_compressed.mp4`,
    poster: '/videos/funnel-bonus-03.png',
  },
]

/** Contact Gmail prérempli (étape « ajoute à tes contacts »). */
export const ATELIER_CONTACT = {
  email: 'contact@yogyface.fr',
  givenName: 'Laury',
  familyName: 'YoGyFace',
  label: 'YoGyFace',
}

export const CONFIRM_VIDEO_SRC = `${CF}/6910b53c95f74_VALITADIONINSCRIPTIONSANSALICIA.mp4`
export const CONFIRM_VIDEO_POSTER = '/videos/funnel-confirm.webp'
export const CONFIRM_VIDEO_DURATION = '5 min 55'
/** Quiz Custom One (override possible via VITE_CONFIRM_QUIZ_URL). */
export const CONFIRM_QUIZ_URL = String(
  import.meta.env.VITE_CONFIRM_QUIZ_URL || 'https://quiz.yogyface.fr/embed/86mk2x6zqy',
).trim()
export const CONFIRM_JEANNE_PHOTO = '/atelier/jeanne.jpg'

export const YOUTUBE_LAURY = 'https://www.youtube.com/@LauryYoGyFace'

/** Cadeaux : être sur N débloque 1…N. `?max=` peut monter plus haut (voir lesson-progress). */
export const GIFTS = [
  {
    n: 1,
    path: '/cadeau1',
    title: 'Ta routine SKINCARE',
    kind: 'video',
    src: `${CF}/69383e21841c5_308-etapeskincare1.mp4`,
    thumb: `${CF}/69495e11b515f_Capturedecran2025-12-22a16.04.42.png`,
  },
  {
    n: 2,
    path: '/cadeau2',
    title: 'Ebook médecine chinoise',
    kind: 'ebook',
    href: `${CF}/6949551223569_Medecinechinoise-YogyfaceEbook.pdf`,
    cover: `${CF}/694954c204e8c_Capturedecran2025-12-22a15.25.11.png`,
    thumb: `${CF}/69495ac941244_Capturedecran2025-12-22a15.49.18.png`,
  },
  {
    n: 3,
    path: '/cadeau3',
    title: 'Podcast',
    kind: 'podcast',
    youtubeId: '6fLqjMbjQpU',
    youtubeStart: 1429,
    subtitle:
      '5 minutes par jour pour freiner le temps sans Botox : découvre le yoga du visage (+ démonstrations)',
    thumb: `${CF}/694958b325c36_Capturedecran2025-09-01a17.31.39.png`,
  },
]

export function giftFromPath(pathname) {
  return GIFTS.find((g) => g.path === pathname) || GIFTS[0]
}

export { youtubeIdFrom } from './youtube'

/** Short link replay — la destination YouTube se change dans le shortener. */
export const REPLAY_SHORT_URL = 'https://go.yogyface.fr/replay-yt'

/** Bonus post-live (`/bonus-live`) — ids extraits de systeme.io/bonus-live. */
export const LIVE_BONUSES = [
  { n: 1, title: 'La rééducation de ton front', youtubeId: '99Doy7fS6dI' },
  { n: 2, title: 'Routine SCM', youtubeId: '3JAZd76I6Nw' },
  { n: 3, title: 'Théorie Muscles', youtubeId: '1NDbQgwNCp8' },
]

export function videoFromPath(pathname) {
  return VIDEOS.find((v) => v.path === pathname) || VIDEOS[0]
}

export async function enrollAtelier({ email, prenom, phone, country } = {}) {
  if (!isValidEmail(email)) throw new Error('Email invalide')
  if (!phone) throw new Error('Téléphone requis')
  const fields = {
    Email: email.trim(),
    Prénom: (prenom && String(prenom).trim()) || '—',
    Phone: phone,
    Source: 'www.yogyface.fr/atelier-gratuit',
    formName: 'atelier-gratuit',
  }
  // ISO du sélecteur téléphone (FR, BE…) — colonne Airtable Country.
  const iso = String(country || '').trim().toUpperCase()
  if (/^[A-Z]{2}$/.test(iso)) fields.Country = iso
  Object.assign(fields, readAttribution())
  // Nom logique : le serveur mappe vers tblgeGEVgkZnDxwfR (autre base).
  const result = await createRecord('Atelier gratuit', fields)
  rememberPrefillEmail(email)
  // Fiche déjà sur ce webi : pas de 2ᵉ Lead Meta / analytics.
  if (result?.existing) return result
  captureEvent('atelier_optin')
  // Après Airtable OK — CAPI hash l'email côté serveur (pixel 604268118937812).
  fireAtelierLead({ email, phone, firstName: prenom })
  return result
}
