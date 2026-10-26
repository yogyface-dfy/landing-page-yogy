/**
 * Validation domaine e-mail (MX / A) — serveur only.
 * Typos : map figée (pas d’IA) — voir src/lib/email-typos.js.
 */
import dns from 'node:dns/promises'
import { parseEmail, suggestEmailTypo } from '../src/lib/email-typos.js'

/** Cache court : évite de marteler le DNS sur double-submit. */
const cache = new Map()
const TTL_MS = 10 * 60 * 1000

async function domainAcceptsMail(domain) {
  const key = String(domain || '').toLowerCase()
  const hit = cache.get(key)
  if (hit && Date.now() - hit.t < TTL_MS) return hit.ok

  let ok = false
  try {
    const mx = await dns.resolveMx(key)
    ok = Array.isArray(mx) && mx.length > 0
  } catch {
    // RFC : pas de MX → on tente A / AAAA (certains petits domaines).
    try {
      const a = await dns.resolve4(key)
      ok = Array.isArray(a) && a.length > 0
    } catch {
      try {
        const aaaa = await dns.resolve6(key)
        ok = Array.isArray(aaaa) && aaaa.length > 0
      } catch {
        ok = false
      }
    }
  }
  cache.set(key, { ok, t: Date.now() })
  return ok
}

/**
 * @returns {Promise<{ ok: true, email: string } | { ok: false, code: string, email?: string, domain?: string, suggestion?: string }>}
 */
export async function validateEmailDomain(raw) {
  const parsed = parseEmail(raw)
  if (!parsed) return { ok: false, code: 'format' }

  const suggestion = suggestEmailTypo(parsed)
  if (suggestion) {
    return { ok: false, code: 'typo', email: parsed.email, suggestion }
  }

  const accepts = await domainAcceptsMail(parsed.domain)
  if (!accepts) {
    return { ok: false, code: 'domain', email: parsed.email, domain: parsed.domain }
  }
  return { ok: true, email: parsed.email }
}

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
  return row.n > 30
}

function clientIp(req) {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  return req.socket?.remoteAddress || ''
}

/** POST /api/check-email — { email } → ok | typo | domain | format. */
export async function handleCheckEmail(req, res) {
  try {
    if (tooMany(clientIp(req))) return res.status(429).json({ error: 'Trop de requêtes' })
    const result = await validateEmailDomain(req.body?.email)
    if (result.ok) return res.json({ ok: true, email: result.email })
    if (result.code === 'typo') {
      return res.json({
        ok: false,
        code: 'typo',
        email: result.email,
        suggestion: result.suggestion,
      })
    }
    if (result.code === 'domain') {
      return res.json({
        ok: false,
        code: 'domain',
        email: result.email,
        domain: result.domain,
      })
    }
    return res.json({ ok: false, code: 'format' })
  } catch (e) {
    console.error('check-email', e)
    // En cas de DNS down : on ne bloque pas l’UX check (le POST airtable revalidera).
    return res.status(200).json({ ok: true, skipped: true })
  }
}

/** Message FR pour la gate /api/airtable. */
export function emailDomainErrorMessage(result) {
  if (!result || result.ok) return ''
  if (result.code === 'typo' && result.suggestion) {
    return `Tu voulais dire ${result.suggestion} ?`
  }
  if (result.code === 'domain') {
    return "Le domaine de ton e-mail semble incorrect. Vérifie l'orthographe."
  }
  return 'E-mail invalide'
}
