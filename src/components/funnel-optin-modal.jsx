import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunnelLiveDate from './funnel-live-date'
import PhoneField from './phone-field'
import { enrollAtelier } from '../lib/funnel'
import { checkEmailDomain } from '../lib/email-check'
import { PHONE_COUNTRIES, PHONE_TRUST_MESSAGE, toE164 } from '../lib/phone-countries'

/**
 * Popup d'inscription atelier.
 * @param {{ open: boolean, onClose: () => void }} props
 */
export default function FunnelOptinModal({ open, onClose }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    prenom: '',
    email: '',
    phone: '',
    iso: 'FR',
    consent: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailSuggestion, setEmailSuggestion] = useState('')
  // Sync : setLoading seul laisse passer un 2ᵉ clic avant le re-render.
  const submitting = useRef(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape' && !submitting.current) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const applyEmailSuggestion = () => {
    if (!emailSuggestion) return
    setForm((v) => ({ ...v, email: emailSuggestion }))
    setEmailSuggestion('')
    setError('')
  }

  const validateEmailField = async (raw) => {
    const result = await checkEmailDomain(raw)
    if (result.ok) {
      setEmailSuggestion('')
      setError('')
      return result.email
    }
    if (result.code === 'typo' && result.suggestion) {
      setEmailSuggestion(result.suggestion)
      setError(result.message)
      return null
    }
    setEmailSuggestion('')
    setError(result.message || 'E-mail invalide')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting.current) return
    if (!form.prenom || !form.email || !form.consent) return
    const dial = PHONE_COUNTRIES.find((c) => c.iso === form.iso)?.dial || '33'
    // Longueur + préfixe mobile + anti-numéros bidon (peur du spam).
    const phone = toE164(dial, form.phone, { iso: form.iso, mobileOnly: true })
    if (!phone) {
      setError(PHONE_TRUST_MESSAGE)
      return
    }
    submitting.current = true
    setLoading(true)
    setError('')
    try {
      const email = await validateEmailField(form.email)
      if (!email) {
        submitting.current = false
        setLoading(false)
        return
      }
      if (email !== form.email.trim()) {
        setForm((v) => ({ ...v, email }))
      }
      await enrollAtelier({
        email,
        prenom: form.prenom,
        phone,
        country: form.iso,
      })
      navigate('/confirmation-inscription')
    } catch (err) {
      console.error('Atelier opt-in error:', err)
      const msg = String(err?.message || '')
      setError(
        msg && !msg.startsWith('Erreur ')
          ? msg
          : 'Une erreur est survenue. Réessaie ou écris à contact@yogyface.fr',
      )
      submitting.current = false
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="atelier-optin-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-noir/50"
        aria-label="Fermer"
        disabled={loading}
        onClick={() => {
          if (!submitting.current) onClose()
        }}
      />
      <div className="relative w-full max-w-[440px] rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => {
            if (!submitting.current) onClose()
          }}
          disabled={loading}
          className="absolute top-4 right-4 w-8 h-8 rounded-full text-gris hover:bg-noir/5 disabled:opacity-40"
          aria-label="Fermer"
        >
          ×
        </button>
        <h2
          id="atelier-optin-title"
          className="font-display font-black text-[1.35rem] tracking-tight text-noir text-center mb-1 pr-6"
        >
          Réserve ta place gratuitement
        </h2>
        <p className="text-center text-gris text-[13px] mb-5">
          <FunnelLiveDate /> (heure de Paris)
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 mb-3">
            <input
              type="text"
              required
              disabled={loading}
              value={form.prenom}
              onChange={(e) => setForm((v) => ({ ...v, prenom: e.target.value }))}
              className="w-full px-4 py-3 rounded-full border border-noir/8 text-sm bg-white focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10 disabled:opacity-60"
              placeholder="Ton prénom"
              autoFocus
            />
            <div>
              <input
                type="email"
                required
                disabled={loading}
                value={form.email}
                onChange={(e) => {
                  setForm((v) => ({ ...v, email: e.target.value }))
                  setEmailSuggestion('')
                  if (error) setError('')
                }}
                onBlur={() => {
                  if (form.email.trim()) validateEmailField(form.email)
                }}
                className="w-full px-4 py-3 rounded-full border border-noir/8 text-sm bg-white focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10 disabled:opacity-60"
                placeholder="Ton e-mail"
                autoComplete="email"
              />
              {emailSuggestion && (
                <button
                  type="button"
                  onClick={applyEmailSuggestion}
                  className="mt-2 w-full text-left text-[12px] text-corail font-semibold hover:underline"
                >
                  Oui, utiliser {emailSuggestion}
                </button>
              )}
            </div>
            <PhoneField
              required
              disabled={loading}
              iso={form.iso}
              phone={form.phone}
              onIsoChange={(iso) => setForm((v) => ({ ...v, iso }))}
              onPhoneChange={(phone) => {
                setForm((v) => ({ ...v, phone }))
                // Efface le message anti-spam dès qu’elle retape.
                if (error === PHONE_TRUST_MESSAGE) setError('')
              }}
              hint="Uniquement pour le rappel de l'atelier, pas de spam."
            />
          </div>
          <label className="flex items-start gap-2.5 mb-4 text-[13px] text-gris leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              required
              disabled={loading}
              checked={form.consent}
              onChange={(e) => setForm((v) => ({ ...v, consent: e.target.checked }))}
              className="mt-0.5 accent-corail"
            />
            Je consens à recevoir les informations de connexion à l'atelier.
          </label>
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="btn-corail w-full text-sm py-3.5 disabled:opacity-60 disabled:cursor-wait inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span
                  className="size-4 shrink-0 rounded-full border-2 border-white/35 border-t-white animate-spin"
                  aria-hidden
                />
                Inscription…
              </>
            ) : (
              "S'inscrire au coaching — gratuitement"
            )}
          </button>
          {error && (
            <p
              className={
                error === PHONE_TRUST_MESSAGE
                  ? 'text-gris text-[12px] text-left leading-relaxed mt-3 rounded-2xl bg-corail/8 px-3.5 py-3 border border-corail/15'
                  : 'text-red-500 text-xs text-center mt-2'
              }
              role="alert"
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
