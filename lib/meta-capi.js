/**
 * Conversions API Meta — même pixel que webi (604268118937812).
 * Token uniquement serveur (META_CAPI_TOKEN). Jamais dans le front.
 */
import { createHash } from 'crypto'

export const META_PIXEL_ID = process.env.META_PIXEL_ID || '604268118937812'
const GRAPH = process.env.META_GRAPH_VERSION || 'v21.0'
const ALLOWED = new Set(['optInWaitingList'])

/** Rate-limit mémoire : 10 req / IP / minute. */
const hits = new Map()
function tooMany(ip) {
  const now = Date.now()
  const key = ip || 'unknown'
  const row = hits.get(key) || { n: 0, t: now }
  if (now - row.t > 60_000) {
    hits.set(key, { n: 1, t: now })
    return false
  }
  row.n += 1
  hits.set(key, row)
  return row.n > 10
}

const sha256 = (value) =>
  createHash('sha256').update(String(value), 'utf8').digest('hex')

const digits = (value) => String(value || '').replace(/\D/g, '')

function hashUserData({ email, phone, firstName, fbp, fbc, ip, ua }) {
  const user = {
    client_ip_address: ip || undefined,
    client_user_agent: ua || undefined,
  }
  if (fbp) user.fbp = fbp
  if (fbc) user.fbc = fbc
  if (email) user.em = [sha256(String(email).trim().toLowerCase())]
  const ph = digits(phone)
  if (ph) user.ph = [sha256(ph)]
  if (firstName) user.fn = [sha256(String(firstName).trim().toLowerCase())]
  return user
}

function clientIp(req) {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  return req.socket?.remoteAddress || ''
}

async function postCapi(body) {
  const token = process.env.META_CAPI_TOKEN
  if (!token) return { skipped: true }
  const url = `https://graph.facebook.com/${GRAPH}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`
  let lastErr = null
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await r.json().catch(() => ({}))
      if (r.ok) return data
      lastErr = data
    } catch (e) {
      lastErr = e
    }
  }
  console.error('Meta CAPI failed', lastErr)
  return { error: true }
}

/**
 * POST /api/capi-event — fire-and-forget côté UX (toujours 204/200).
 */
export async function handleCapiEvent(req, res) {
  try {
    const ip = clientIp(req)
    if (tooMany(ip)) return res.status(204).end()

    const { eventName, eventId, pageUrl, email, phone, firstName, fbp, fbc } = req.body || {}
    if (!ALLOWED.has(eventName) || !eventId || typeof eventId !== 'string') {
      return res.status(400).json({ error: 'Event invalide' })
    }

    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_id: String(eventId).slice(0, 80),
      event_source_url: String(pageUrl || 'https://yogyface.fr/merci-liste-attente').slice(0, 500),
      user_data: hashUserData({
        email,
        phone,
        firstName,
        fbp,
        fbc,
        ip,
        ua: req.headers['user-agent'] || '',
      }),
      custom_data: { content_name: 'liste-attente' },
    }

    const body = { data: [payload] }
    const test = process.env.META_TEST_EVENT_CODE
    if (test) body.test_event_code = test

    await postCapi(body)
    return res.status(204).end()
  } catch (e) {
    console.error('CAPI route', e)
    return res.status(204).end()
  }
}
