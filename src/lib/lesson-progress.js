/**
 * Déblocage vidéos bonus et cadeaux : `?max=2` ou `?max=3`.
 * Être sur l’item N débloque au moins 1…N.
 * Les liens conservent `max` pour pouvoir revenir (ex. 03 → 01 → 03).
 */

/** @param {number} currentNumber @param {string|string[]|null|undefined} raw */
export function resolveLessonMax(currentNumber, raw) {
  const v = Array.isArray(raw) ? raw[0] : raw
  const n = Number(v)
  const fromUrl = n === 1 || n === 2 || n === 3 ? n : 1
  return Math.min(3, Math.max(currentNumber, fromUrl))
}

/**
 * Lien vers une vidéo ou un cadeau en gardant `max` (FunnelLink porte le lead).
 * @param {string} path — ex. `/video-01` ou `/cadeau1`
 * @param {number} maxReached
 */
export function lessonHref(path, maxReached) {
  if (!path) return path
  if (maxReached <= 1) return path.split('?')[0]
  const base = path.split('?')[0]
  return `${base}?max=${maxReached}`
}
