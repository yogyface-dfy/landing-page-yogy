/**
 * URL watch / youtu.be / shorts / embed, ou id 11 caractères.
 * Une chaîne (@handle) ne contient pas d'id — retourne ''.
 */
export function youtubeIdFrom(input = '') {
  const s = String(input).trim()
  if (!s) return ''
  if (/^[\w-]{11}$/.test(s)) return s
  const m = s.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/))([\w-]{11})/,
  )
  return m ? m[1] : ''
}
