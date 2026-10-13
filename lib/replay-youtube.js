import { youtubeIdFrom } from '../src/lib/youtube.js'

/** Short link fixe — on change seulement la destination YouTube chaque semaine. */
export const REPLAY_SHORT_URL =
  process.env.REPLAY_SHORT_URL || 'https://go.yogyface.fr/replay-yt'

const TTL_MS = 60 * 1000
let cache = { at: 0, id: '', dest: '' }

function allowedHost(hostname) {
  return (
    hostname === 'go.yogyface.fr' ||
    hostname === 'youtu.be' ||
    hostname === 'youtube.com' ||
    hostname.endsWith('.youtube.com')
  )
}

async function hop(url, method) {
  return fetch(url, {
    method,
    redirect: 'manual',
    signal: AbortSignal.timeout(5000),
  })
}

/** Suit les 302 du shortener. URL figée en env = pas de SSRF. */
async function followShort(start) {
  let url = start
  for (let i = 0; i < 6; i++) {
    if (!allowedHost(new URL(url).hostname)) throw new Error('redirect host blocked')
    let res = await hop(url, 'HEAD')
    let loc = res.headers.get('location')
    if (!loc && (res.status === 405 || res.status >= 400)) {
      res = await hop(url, 'GET')
      loc = res.headers.get('location')
    }
    if (!loc || res.status < 300 || res.status >= 400) break
    url = new URL(loc, url).href
  }
  if (!allowedHost(new URL(url).hostname)) throw new Error('redirect host blocked')
  return url
}

export async function resolveReplayYoutube() {
  if (Date.now() - cache.at < TTL_MS) return cache
  const dest = await followShort(REPLAY_SHORT_URL)
  cache = { at: Date.now(), id: youtubeIdFrom(dest), dest }
  return cache
}

export function handleReplayYoutube(req, res) {
  resolveReplayYoutube()
    .then((data) => {
      res.set('Cache-Control', 'private, max-age=60')
      res.json({ id: data.id || null })
    })
    .catch((err) => {
      console.error('replay-youtube:', err.message)
      res.status(502).json({ id: null })
    })
}
