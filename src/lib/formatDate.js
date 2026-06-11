// Formate une date ISO (YYYY-MM-DD) en français, sans dépendre de l'ICU Node
// (fiable côté SSG comme côté navigateur).
const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

export function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MOIS[m - 1]} ${y}`
}
