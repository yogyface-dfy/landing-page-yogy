import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunnelLiveDate from './funnel-live-date'
import PhoneField from './phone-field'
import { enrollAtelier } from '../lib/funnel'
import { PHONE_COUNTRIES, toE164 } from '../lib/phone-countries'

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

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.prenom || !form.email || !form.consent) return
    const dial = PHONE_COUNTRIES.find((c) => c.iso === form.iso)?.dial || '33'
    const phone = toE164(dial, form.phone)
    // Téléphone obligatoire (rappel WhatsApp) — plus d’inscription sans numéro.
    if (!phone) {
      setError('Indique un numéro de téléphone valide.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await enrollAtelier({
        email: form.email,
        prenom: form.prenom,
        phone,
        country: form.iso,
      })
      navigate('/confirmation-inscription')
    } catch (err) {
      console.error('Atelier opt-in error:', err)
      setError('Une erreur est survenue. Réessaie ou écris à contact@yogyface.fr')
    } finally {
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
        onClick={onClose}
      />
      <div className="relative w-full max-w-[440px] rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full text-gris hover:bg-noir/5"
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
              value={form.prenom}
              onChange={(e) => setForm((v) => ({ ...v, prenom: e.target.value }))}
              className="w-full px-4 py-3 rounded-full border border-noir/8 text-sm bg-white focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10"
              placeholder="Ton prénom"
              autoFocus
            />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-full border border-noir/8 text-sm bg-white focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10"
              placeholder="Ton e-mail"
            />
            <PhoneField
              required
              iso={form.iso}
              phone={form.phone}
              onIsoChange={(iso) => setForm((v) => ({ ...v, iso }))}
              onPhoneChange={(phone) => setForm((v) => ({ ...v, phone }))}
              hint="Pour le rappel WhatsApp — pas de spam."
            />
          </div>
          <label className="flex items-start gap-2.5 mb-4 text-[13px] text-gris leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              required
              checked={form.consent}
              onChange={(e) => setForm((v) => ({ ...v, consent: e.target.checked }))}
              className="mt-0.5 accent-corail"
            />
            Je consens à recevoir les informations de connexion à l'atelier.
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn-corail w-full text-sm py-3.5 disabled:opacity-60"
          >
            {loading ? 'Inscription…' : "S'inscrire au coaching — gratuitement"}
          </button>
          {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  )
}
