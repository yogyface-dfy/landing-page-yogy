/**
 * Tracking funnel → PATCH Airtable Inscriptions.
 * open 1×, watch max, cta/whatsapp timestamp.
 */

import { studioWebinarName } from './atelier-webinar.js'

export const FUNNEL_TRACK_PAGES = new Set([
  'confirmation-optin',
  'video-01',
  'video-02',
  'video-03',
  'video-123',
  'cadeau1',
  'cadeau2',
  'cadeau3',
  'replay-gratuit',
  'bonus-live',
])

export const FUNNEL_TRACK_EVENTS = new Set(['open', 'watch', 'cta', 'whatsapp'])

const RECORD_ID_RE = /^rec[a-zA-Z0-9]{14}$/

export function isValidRecordId(id) {
  return typeof id === 'string' && RECORD_ID_RE.test(id)
}

/** Mapping page + event → champs à écrire (noms Airtable). */
export function trackFieldsForPage(page, event, { watchPct, watchSec, existing = {} } = {}) {
  const now = new Date().toISOString()

  if (event === 'open') {
    const field = `${page}_ouverture`
    if (existing[field]) return {}
    return { [field]: now }
  }

  if (event === 'watch') {
    const pctField = `${page}_watch%`
    const secField = `${page}_watch_seconds`
    const pct = Math.min(100, Math.max(0, Math.round(Number(watchPct) || 0)))
    const sec = Math.max(0, Math.round(Number(watchSec) || 0))
    const prevPct = Number(existing[pctField]) || 0
    const prevSec = Number(existing[secField]) || 0
    const out = {}
    if (pct > prevPct) out[pctField] = pct
    if (sec > prevSec) out[secField] = sec
    return out
  }

  if (event === 'cta') {
    return { [`${page}_clic_cta`]: now }
  }

  if (event === 'whatsapp') {
    return { [`${page}_clic_whatsapp`]: now }
  }

  return {}
}

function escapeFormula(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

/**
 * Résout la fiche Inscription puis PATCHe les colonnes track.
 * @returns {{ ok?: boolean, skipped?: boolean, not_found?: boolean, id?: string, error?: string }}
 */
export async function upsertFunnelTrack(
  { page, event, recordId, email, userId, watchPct, watchSec },
  { pat, baseId, tableId, fetchImpl = fetch } = {},
) {
  if (!FUNNEL_TRACK_PAGES.has(page)) return { error: 'INVALID_PAGE' }
  if (!FUNNEL_TRACK_EVENTS.has(event)) return { error: 'INVALID_EVENT' }
  if (!pat || !baseId || !tableId) return { error: 'AIRTABLE_NOT_CONFIGURED' }

  const headers = {
    Authorization: `Bearer ${pat}`,
    'Content-Type': 'application/json',
  }
  const collectionUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}`

  const getById = async (id) => {
    const r = await fetchImpl(`${collectionUrl}/${id}`, { headers })
    if (r.status === 404) return null
    if (!r.ok) {
      const err = await r.json().catch(() => ({}))
      console.error('funnel track get:', r.status, err?.error)
      return null
    }
    return r.json()
  }

  const findByFormula = async (formula) => {
    const url = `${collectionUrl}?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`
    const r = await fetchImpl(url, { headers: { Authorization: `Bearer ${pat}` } })
    if (!r.ok) {
      const err = await r.json().catch(() => ({}))
      console.error('funnel track lookup:', r.status, err?.error)
      return null
    }
    const data = await r.json().catch(() => ({}))
    return data.records?.[0] || null
  }

  let rec = null

  // 1) recordId Airtable (préféré si présent)
  if (isValidRecordId(recordId)) {
    rec = await getById(recordId)
  }

  // 2) yf_hid (cookie / JWT webi)
  if (!rec && userId) {
    rec = await findByFormula(`{yf_hid}="${escapeFormula(userId)}"`)
  }

  // 3) email + webi Studio courant
  if (!rec && email) {
    const name = studioWebinarName()
    rec = await findByFormula(
      `AND(LOWER({Email})=LOWER('${escapeFormula(email)}'),` +
        `FIND('${escapeFormula(name)}',{Webinar Name}&''))`,
    )
    // 4) fallback : 1er record avec cet email
    if (!rec) {
      rec = await findByFormula(`LOWER({Email})=LOWER('${escapeFormula(email)}')`)
    }
  }

  // Visiteur anonyme (pas de cookie / email / recordId) → no-op silencieux.
  if (!rec && !isValidRecordId(recordId) && !userId && !email) {
    return { ok: true, skipped: true }
  }
  if (!rec) return { not_found: true }

  const fields = trackFieldsForPage(page, event, {
    watchPct,
    watchSec,
    existing: rec.fields || {},
  })
  if (!Object.keys(fields).length) return { ok: true, skipped: true, id: rec.id }

  const p = await fetchImpl(`${collectionUrl}/${rec.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ fields, typecast: true }),
  })
  if (!p.ok) {
    const err = await p.json().catch(() => ({}))
    console.error('AIRTABLE_TRACK_FIELDS:', p.status, err?.error, fields)
    return { error: 'AIRTABLE_TRACK_FIELDS', id: rec.id }
  }

  return { ok: true, id: rec.id }
}
