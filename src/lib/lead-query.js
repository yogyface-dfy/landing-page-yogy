/**
 * Propagation des query lead entre pages funnel.
 * Sans deps React / Stripe — testable en Node.
 */

/**
 * Propage les query courantes (+ lead) vers un path / URL.
 * Les params déjà présents dans `path` gagnent.
 * @param {string} path
 * @param {{ email?: string, firstName?: string, phone?: string, recordId?: string }} [lead]
 * @param {string|URLSearchParams} [fromSearch] — défaut : window.location.search
 */
export function withLeadQuery(path, lead = {}, fromSearch) {
  if (!path) return path
  const abs = /^https?:\/\//i.test(path)
  const u = abs ? new URL(path) : new URL(path, 'https://yogyface.local')
  const merge = new URLSearchParams()

  const src =
    fromSearch instanceof URLSearchParams
      ? fromSearch
      : typeof fromSearch === 'string'
        ? new URLSearchParams(fromSearch.startsWith('?') ? fromSearch.slice(1) : fromSearch)
        : typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search)
          : null

  if (src) {
    for (const [k, v] of src) {
      if (v) merge.set(k, v)
    }
  }

  if (lead.recordId) merge.set('recordId', lead.recordId)
  if (lead.email) merge.set('email', lead.email)
  if (lead.firstName) merge.set('firstname', lead.firstName)
  if (lead.phone) merge.set('phone', lead.phone)

  for (const [k, v] of u.searchParams) {
    if (v) merge.set(k, v)
  }

  u.search = ''
  for (const [k, v] of merge) u.searchParams.set(k, v)

  if (abs) return u.toString()
  return `${u.pathname}${u.search}${u.hash}`
}
