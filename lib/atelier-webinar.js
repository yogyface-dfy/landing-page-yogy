/**
 * Prochain webi Studio à lier sur l’inscription Airtable.
 * Miroir Make : setDay(now; 3) / setDay(now; 10) → Name « YOGYFACE - STUDIO - DD/MM/YYYY ».
 * Les Name en base sont des mardis (pas des mercredis ISO) — on cible le mardi.
 */

const WEBINARS_TABLE_ID = 'tblgCT7wtDE8gNouE'
const TZ = 'Europe/Paris'
/** Lundi = 1 … dimanche = 7 (comme Make). Mardi = 2 — les Name Airtable sont des mardis. */
const STUDIO_WEEKDAY = 2

function parisYmd(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

function parisWeekdayMon1(now = new Date()) {
  const wd = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
  }).format(now)
  return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }[wd]
}

/** Ajoute N jours civils à un YMD (calendrier, pas DST). */
function addDaysYmd(ymd, days) {
  const [y, m, d] = ymd.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d + days))
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`
}

function toFr(ymd) {
  const [y, m, d] = ymd.split('-')
  return `${d}/${m}/${y}`
}

/** Mardi de la semaine courante / suivante (si le mardi est déjà passé). */
export function nextStudioWebinarYmd(now = new Date()) {
  const today = parisYmd(now)
  const w = parisWeekdayMon1(now)
  const thisTarget = addDaysYmd(today, STUDIO_WEEKDAY - w)
  return thisTarget >= today ? thisTarget : addDaysYmd(thisTarget, 7)
}

export function studioWebinarName(now = new Date()) {
  return `YOGYFACE - STUDIO - ${toFr(nextStudioWebinarYmd(now))}`
}

const escapeFormula = (value) =>
  String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')

/** Cherche le record Webinars. Null si introuvable / erreur (l’inscription continue). */
export async function findStudioWebinarId({
  baseId,
  pat,
  now = new Date(),
  fetchFn = fetch,
} = {}) {
  if (!baseId || !pat) return null
  const name = studioWebinarName(now)
  const formula = `{Name}="${escapeFormula(name)}"`
  const url =
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(WEBINARS_TABLE_ID)}` +
    `?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`
  try {
    const r = await fetchFn(url, { headers: { Authorization: `Bearer ${pat}` } })
    if (!r.ok) {
      const err = await r.json().catch(() => ({}))
      console.error('webinar lookup:', r.status, name, err?.error)
      return null
    }
    const data = await r.json().catch(() => ({}))
    const id = data.records?.[0]?.id || null
    if (!id) console.error('webinar lookup: aucun match', name)
    return id
  } catch (e) {
    console.error('webinar lookup:', e.message || e)
    return null
  }
}

export { WEBINARS_TABLE_ID, STUDIO_WEEKDAY }
