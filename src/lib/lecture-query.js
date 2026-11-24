/**
 * Intro unique de /vente-lecture. Le reste de la page de vente ne change pas.
 * Codes : docs/funnel-query-params.md.
 * L'e-mail et le téléphone ne sont pas lus ici.
 */
import { normalizeFirstName } from './stripe-checkout.js'

const AGE = {
  m35: 'moins de 35 ans',
  '35_44': 'entre 35 et 44 ans',
  '45_54': 'entre 45 et 54 ans',
  '55p': '55 ans et plus',
}

const DEPUIS = {
  mois: 'quelques mois',
  '1_2': '1 ou 2 ans',
  '2_5': '2 à 5 ans',
  '5p': 'plus de 5 ans',
}

/** Essais qui ne sont pas une solution long terme. Le yoga est à part. */
const SURFACE = new Set(['cremes', 'collagene', 'institut', 'led', 'injections'])

const ESSAI_ORDER = ['cremes', 'collagene', 'yoga', 'institut', 'led', 'injections', 'rien']

const ENVIE = {
  routine: { lead: 'Tu veux', bold: 'une routine qui dure' },
  sans_artifice: { lead: 'Tu veux', bold: 'te sentir belle sans artifice' },
  actrice: { lead: 'Tu veux', bold: 'être actrice de ton vieillissement' },
  confiance: { lead: 'Tu veux', bold: 'retrouver confiance' },
  comprendre: { lead: 'Tu veux', bold: 'comprendre ce qui se passe sous ta peau' },
  autonome: { lead: 'Tu veux', bold: 'devenir autonome' },
  peur: { lead: 'Tu ne veux plus', bold: 'avoir peur de vieillir' },
}

/** line = ce qui précède le temps en gras. */
const TEMPS = {
  5: { line: 'Il faut à peine', bold: '5 minutes' },
  10: { line: 'Il faut à peine', bold: '10 minutes' },
  20: { line: 'Tu peux donner', bold: '20 minutes' },
  nsp: { line: 'On commence par', bold: 'quelques minutes' },
}

const ITEM_LABEL = {
  cremes: 'Crèmes',
  collagene: 'Collagène',
  institut: 'Soins en institut',
  led: 'Masque LED',
  injections: 'Injections',
  yoga: 'Yoga du visage',
}

function one(params, key, table) {
  const code = params.get(key) || ''
  return table[code] ? code : ''
}

function readEssais(raw) {
  const wanted = new Set(
    String(raw || '')
      .split(',')
      .map((s) => s.trim())
      .filter((code) => ESSAI_ORDER.includes(code)),
  )
  if (wanted.has('rien') && wanted.size > 1) wanted.delete('rien')
  return ESSAI_ORDER.filter((code) => wanted.has(code))
}

const YOGA_NOTE = 'Tu as essayé, mais rien n’était personnalisé pour ton visage.'
const SURFACE_NOTE = 'Pas une solution long terme.'

function itemsFor(codes) {
  const named = codes.filter((code) => code !== 'rien')
  const items = []
  if (named.includes('yoga')) items.push({ label: ITEM_LABEL.yoga, note: YOGA_NOTE })
  for (const code of named) {
    if (!SURFACE.has(code)) continue
    items.push({ label: ITEM_LABEL[code], note: SURFACE_NOTE })
  }
  return items
}

/**
 * Morceaux affichés à part : gras, liste, phrase de résultat.
 * @param {URLSearchParams} params
 */
export function readLecture(params) {
  if (!params) return null
  const name = normalizeFirstName(
    params.get('firstname') || params.get('first_name') || params.get('prenom') || '',
  )
  const age = AGE[one(params, 'age', AGE)] || ''
  const depuis = DEPUIS[one(params, 'depuis', DEPUIS)] || ''
  const essais = readEssais(params.get('essais'))
  const resultat = ['revenu', 'aucune', 'duree', 'pas_commence'].includes(params.get('resultat') || '')
    ? params.get('resultat')
    : ''
  const envie = ENVIE[params.get('envie') || ''] || null
  const temps = TEMPS[params.get('temps') || ''] || null
  const items = itemsFor(essais)
  const named = essais.filter((code) => code !== 'rien')
  const empty = !named.length && (resultat === 'pas_commence' || essais.includes('rien'))
    ? 'Tu n’as pas encore de méthode. On installe le bon geste tout de suite, sans rien à défaire.'
    : ''

  if (!age && !depuis && !items.length && !empty && !envie && !temps) return null
  return { name, age, depuis, items, empty, envie, temps }
}
