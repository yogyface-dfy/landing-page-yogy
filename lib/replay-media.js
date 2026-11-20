import { youtubeIdFrom } from '../src/lib/youtube.js'

/** Fichier du bucket admin Médias (`public-videos`). Pas d’autre chemin Storage. */
const PUBLIC_VIDEO_PATH =
  /^\/storage\/v1\/object\/public\/public-videos\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(mp4|webm|mov)$/i

function asUrl(input) {
  try {
    return new URL(String(input || '').trim())
  } catch {
    return null
  }
}

export function isYoutubeHost(hostname) {
  const host = String(hostname || '').toLowerCase()
  return (
    host === 'youtu.be' ||
    host === 'youtube.com' ||
    host.endsWith('.youtube.com') ||
    host === 'youtube-nocookie.com' ||
    host.endsWith('.youtube-nocookie.com')
  )
}

/** MP4/WebM/MOV public Médias, https, sans query (le client ne reçoit que ce chemin). */
export function publicReplayFileSrc(input) {
  const url = asUrl(input)
  if (!url || url.protocol !== 'https:' || url.username || url.password) return ''
  if (!url.hostname.endsWith('.supabase.co')) return ''
  if (!PUBLIC_VIDEO_PATH.test(url.pathname)) return ''
  return `${url.origin}${url.pathname}`
}

/**
 * Destination du short link replay.
 * YouTube → { id }. Fichier Médias → { src }. Le reste est rejeté.
 */
export function replayMediaFromUrl(input) {
  const url = asUrl(input)
  if (!url) return { id: '', src: '' }
  if (isYoutubeHost(url.hostname)) {
    return { id: youtubeIdFrom(url.href) || '', src: '' }
  }
  return { id: '', src: publicReplayFileSrc(url.href) }
}

/** Hôte autorisé pendant le suivi des redirections (anti-SSRF). */
export function allowedReplayHop(input) {
  const url = asUrl(input)
  if (!url) return false
  const host = url.hostname.toLowerCase()
  if (host === 'go.yogyface.fr') return true
  if (isYoutubeHost(host)) return true
  return Boolean(publicReplayFileSrc(url.href))
}
