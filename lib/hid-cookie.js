/** Cookie `yf_hid` : valeur signée par l'app webi, posée ici (www). */

export const HID_COOKIE = 'yf_hid'
const TTL_DAYS = 30

export function hidCookieHeader(token, { secure } = {}) {
  const parts = [
    `${HID_COOKIE}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${TTL_DAYS * 86400}`,
  ]
  if (secure) {
    parts.push('Secure')
    parts.push('Domain=.yogyface.fr')
  }
  return parts.join('; ')
}

export function setHidCookie(res, hid, req) {
  if (!hid || typeof hid !== 'string' || hid.length > 800) return
  const host = String(req?.headers?.host || '').split(':')[0]
  const secure = host.endsWith('yogyface.fr')
  res.append('Set-Cookie', hidCookieHeader(hid, { secure }))
}

export function readHidCookie(req) {
  const raw = String(req.headers?.cookie || '')
  const m = raw.match(/(?:^|; )yf_hid=([^;]*)/)
  return m ? decodeURIComponent(m[1]) : ''
}
