/**
 * Places Studio depuis ?webinarDate= (Europe/Paris).
 * J+0 ou atelier à venir = 5, puis 4, 3, 2, et 1 à partir de J+4.
 * Date illisible : pas de chiffre.
 */

const PARIS = 'Europe/Paris'

const MONTHS = {
  janvier: 1,
  fevrier: 2,
  février: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  aout: 8,
  août: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  decembre: 12,
  décembre: 12,
}

function parisYmd(date) {
  const map = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: PARIS,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  return { y: +map.year, m: +map.month, d: +map.day }
}

function isRealDay({ y, m, d }) {
  if (m < 1 || m > 12 || d < 1 || d > 31 || y < 2000 || y > 2100) return false
  const t = new Date(Date.UTC(y, m - 1, d))
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d
}

/** @param {string|null|undefined} raw @returns {{ y: number, m: number, d: number }|null} */
export function parseWebinarDate(raw) {
  const s = String(raw || '').trim()
  if (!s) return null
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) {
    const day = { y: +m[1], m: +m[2], d: +m[3] }
    return isRealDay(day) ? day : null
  }
  m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})/)
  if (m) {
    const day = { y: +m[3], m: +m[2], d: +m[1] }
    return isRealDay(day) ? day : null
  }
  m = s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .match(/^(\d{1,2})\s+([a-z]+)\.?\s+(\d{4})/)
  if (m && MONTHS[m[2]]) {
    const day = { y: +m[3], m: MONTHS[m[2]], d: +m[1] }
    return isRealDay(day) ? day : null
  }
  return null
}

function utcNoon(day) {
  return Date.UTC(day.y, day.m - 1, day.d, 12)
}

/** @returns {1|2|3|4|5|null} */
export function placesFromWebinarDate(raw, now = new Date()) {
  const webinar = parseWebinarDate(raw)
  if (!webinar) return null
  const diff = Math.round((utcNoon(parisYmd(now)) - utcNoon(webinar)) / 86400000)
  if (diff <= 0) return 5
  if (diff === 1) return 4
  if (diff === 2) return 3
  if (diff === 3) return 2
  return 1
}

/** @param {number|null|undefined} n */
export function placesLabel(n) {
  if (n !== 1 && n !== 2 && n !== 3 && n !== 4 && n !== 5) return ''
  return n === 1 ? 'Plus que 1 place' : `Plus que ${n} places`
}

function clip(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 80)
}

/** Prénom et day seulement s'ils sont dans l'URL. */
export function saleLeadLine(searchParams) {
  const name = clip(
    searchParams?.get('firstname') ||
      searchParams?.get('first_name') ||
      searchParams?.get('prenom') ||
      searchParams?.get('name'),
  )
  const day = clip(searchParams?.get('day'))
  if (name && day) return `${name}, atelier du ${day}`
  if (name) return name
  if (day) return `Atelier du ${day}`
  return ''
}
