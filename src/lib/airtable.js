/**
 * Airtable API helper — lightweight wrapper (no SDK dependency).
 * Uses Airtable REST API v0 directly via fetch.
 *
 * Env vars required (prefixed VITE_ for Vite exposure):
 *   VITE_AIRTABLE_PAT       — Personal Access Token
 *   VITE_AIRTABLE_BASE_ID   — Base ID (starts with "app...")
 */

const PAT     = import.meta.env.VITE_AIRTABLE_PAT
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID
const API_URL = `https://api.airtable.com/v0/${BASE_ID}`

/**
 * Create a record in the given Airtable table.
 * @param {string} tableName — exact table name in Airtable
 * @param {Record<string, any>} fields — field name → value map
 * @returns {Promise<{id: string}>} created record
 */
export async function createRecord(tableName, fields) {
  if (!PAT || !BASE_ID) {
    throw new Error('Airtable credentials missing — check .env.local')
  }

  const res = await fetch(`${API_URL}/${encodeURIComponent(tableName)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Airtable error ${res.status}`)
  }

  return res.json()
}
