/** Colonnes Airtable atelier — mêmes noms que les query params ads / UTM. */
export const ATTRIBUTION_KEYS = [
  'ad_name',
  'adset_id',
  'placement',
  'utm_medium',
  'utm_source',
  'campaign_id',
  'utm_content',
  'adgroup_name',
  'utm_campaign',
  'campaign_name',
]

const STORE = 'yf_atelier_utm'

function pick(search) {
  const q = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const out = {}
  for (const key of ATTRIBUTION_KEYS) {
    const v = (q.get(key) || '').trim()
    if (v) out[key] = v.slice(0, 500)
  }
  return out
}

function readStore() {
  try {
    const raw = sessionStorage.getItem(STORE)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

/** Garde les params ads d’atterrissage (le modal s’ouvre plus tard). */
export function stashAttribution(search) {
  if (typeof window === 'undefined') return
  const next = pick(search || window.location.search)
  if (!Object.keys(next).length) return
  try {
    sessionStorage.setItem(STORE, JSON.stringify({ ...readStore(), ...next }))
  } catch {
    /* private mode */
  }
}

/** URL actuelle + stash — uniquement les clés présentes. */
export function readAttribution(search) {
  const fromUrl = pick(search || (typeof window !== 'undefined' ? window.location.search : ''))
  return { ...readStore(), ...fromUrl }
}
