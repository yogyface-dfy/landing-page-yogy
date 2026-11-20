import { allowedReplayHop, replayMediaFromUrl } from './replay-media.js'

/** Short link fixe — destination YouTube ou fichier Médias, sans redeploy. */
export const REPLAY_SHORT_URL =
  process.env.REPLAY_SHORT_URL || 'https://go.yogyface.fr/replay-yt'

const TTL_MS = 60 * 1000
let cache = { at: 0, id: '', src: '', dest: '' }

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
    if (!allowedReplayHop(url)) throw new Error('redirect host blocked')
    let res = await hop(url, 'HEAD')
    let loc = res.headers.get('location')
    if (!loc && (res.status === 405 || res.status >= 400)) {
      res = await hop(url, 'GET')
      loc = res.headers.get('location')
    }
    if (!loc || res.status < 300 || res.status >= 400) break
    url = new URL(loc, url).href
  }
  if (!allowedReplayHop(url)) throw new Error('redirect host blocked')
  return url
}

export async function resolveReplayYoutube() {
  if (Date.now() - cache.at < TTL_MS) return cache
  const dest = await followShort(REPLAY_SHORT_URL)
  const media = replayMediaFromUrl(dest)
  cache = { at: Date.now(), id: media.id, src: media.src, dest }
  return cache
}

export function handleReplayYoutube(req, res) {
  resolveReplayYoutube()
    .then((data) => {
      res.set('Cache-Control', 'private, max-age=60')
      res.json({ id: data.id || null, src: data.src || null })
    })
    .catch((err) => {
      console.error('replay-youtube:', err.message)
      res.status(502).json({ id: null, src: null })
    })
}
