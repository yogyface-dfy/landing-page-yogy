/**
 * Corrections de domaine ciblées (fautes de frappe).
 * Ne change JAMAIS un TLD pays légitime (yahoo.fr ≠ yahoo.com, hotmail.fr ≠ outlook.fr).
 */

export const DOMAIN_TYPOS = {
  // Gmail
  'gail.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'glail.com': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.col': 'gmail.com',
  'gmail.come': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.om': 'gmail.com',
  'gmail.fr': 'gmail.com',
  // Hotmail / Outlook (garde .fr vs .com)
  'hitmail.fr': 'hotmail.fr',
  'hitmail.com': 'hotmail.com',
  'hotmal.fr': 'hotmail.fr',
  'hotmal.com': 'hotmail.com',
  'hotmial.fr': 'hotmail.fr',
  'hotmial.com': 'hotmail.com',
  'homail.fr': 'hotmail.fr',
  'homail.com': 'hotmail.com',
  'hotmai.fr': 'hotmail.fr',
  'hotmai.com': 'hotmail.com',
  'outlok.fr': 'outlook.fr',
  'outlok.com': 'outlook.com',
  'outllok.fr': 'outlook.fr',
  'outllok.com': 'outlook.com',
  'outloo.fr': 'outlook.fr',
  'outloo.com': 'outlook.com',
  // Yahoo (garde .fr)
  'yaho.fr': 'yahoo.fr',
  'yaho.com': 'yahoo.com',
  'yahooo.fr': 'yahoo.fr',
  'yahooo.com': 'yahoo.com',
  'yahaoo.fr': 'yahoo.fr',
  'yahoo.con': 'yahoo.com',
  'yahoo.come': 'yahoo.com',
  // Live / iCloud / Free / Orange / SFR
  'live.con': 'live.com',
  'icloud.con': 'icloud.com',
  'icoud.com': 'icloud.com',
  'free.fre': 'free.fr',
  'orange.con': 'orange.fr',
  'wanadoo.con': 'wanadoo.fr',
  'sfr.fre': 'sfr.fr',
  'laposte.nte': 'laposte.net',
  'laposte.con': 'laposte.net',
}

/** @returns {{ email: string, local: string, domain: string } | null} */
export function parseEmail(raw) {
  const email = String(raw || '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  const at = email.lastIndexOf('@')
  const local = email.slice(0, at)
  const domain = email.slice(at + 1)
  if (!local || !domain || domain.includes('..') || domain.startsWith('.') || domain.endsWith('.')) {
    return null
  }
  return { email, local, domain }
}

/** Si domaine typé connu → email corrigé. Sinon null (on ne touche pas). */
export function suggestEmailTypo(emailOrParsed) {
  const parsed =
    typeof emailOrParsed === 'string' ? parseEmail(emailOrParsed) : emailOrParsed
  if (!parsed) return null
  const fixed = DOMAIN_TYPOS[parsed.domain]
  if (!fixed || fixed === parsed.domain) return null
  return `${parsed.local}@${fixed}`
}
