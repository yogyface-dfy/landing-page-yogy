import { parseEmail, suggestEmailTypo } from './email-typos'

/**
 * Vérifie l’e-mail avant opt-in : typo locale puis DNS via /api/check-email.
 * @returns {Promise<{ ok: true, email: string } | { ok: false, code: string, suggestion?: string, message: string }>}
 */
export async function checkEmailDomain(raw) {
  const parsed = parseEmail(raw)
  if (!parsed) {
    return { ok: false, code: 'format', message: 'E-mail invalide' }
  }

  const localTypo = suggestEmailTypo(parsed)
  if (localTypo) {
    return {
      ok: false,
      code: 'typo',
      suggestion: localTypo,
      message: `Tu voulais dire ${localTypo} ?`,
    }
  }

  try {
    const res = await fetch('/api/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 429) {
      return { ok: false, code: 'rate', message: 'Trop de tentatives. Réessaie dans une minute.' }
    }
    if (data?.ok) return { ok: true, email: data.email || parsed.email }
    if (data?.code === 'typo' && data.suggestion) {
      return {
        ok: false,
        code: 'typo',
        suggestion: data.suggestion,
        message: `Tu voulais dire ${data.suggestion} ?`,
      }
    }
    if (data?.code === 'domain') {
      return {
        ok: false,
        code: 'domain',
        message: "Le domaine de ton e-mail semble incorrect. Vérifie l'orthographe.",
      }
    }
    if (data?.code === 'format') {
      return { ok: false, code: 'format', message: 'E-mail invalide' }
    }
    // API down / skipped : on laisse le serveur décider au POST.
    return { ok: true, email: parsed.email }
  } catch {
    return { ok: true, email: parsed.email }
  }
}
