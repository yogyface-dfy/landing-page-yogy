import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import SEO from '../components/SEO'
import { UPSELL } from '../lib/stripe-offers'

function euros(cents) {
  return (cents / 100).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

/** Offre post-achat 1 clic (carte déjà sur Stripe). Non indexée. */
export default function VenteUpsell() {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const sessionId = searchParams.get('session_id') || ''
  // /vente-upsell-test : même UI, aucun appel Stripe.
  const preview = pathname === '/vente-upsell-test' || searchParams.get('preview') === '1'
  const [state, setState] = useState({ status: 'loading', offer: null, error: '' })
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (preview) {
      setState({ status: 'ready', offer: { ...UPSELL, alreadyTaken: false }, error: '' })
      return
    }
    if (!sessionId.startsWith('cs_')) {
      setState({ status: 'error', offer: null, error: 'Lien de paiement invalide.' })
      return
    }
    let cancelled = false
    fetch(`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || 'Session introuvable')
        return data
      })
      .then((data) => {
        if (cancelled) return
        if (data.upsell?.alreadyTaken) {
          navigate(`/merci-achat?session_id=${encodeURIComponent(sessionId)}&upsell=1`, { replace: true })
          return
        }
        setState({ status: 'ready', offer: data.upsell, error: '' })
      })
      .catch((err) => {
        if (!cancelled) setState({ status: 'error', offer: null, error: err.message })
      })
    return () => { cancelled = true }
  }, [preview, sessionId, navigate])

  const skip = () => {
    if (preview) {
      setState((s) => ({ ...s, error: 'Mode test — aucun débit, tu resterais sur /merci-achat.' }))
      return
    }
    navigate(`/merci-achat?session_id=${encodeURIComponent(sessionId)}`, { replace: true })
  }

  const accept = async () => {
    if (preview) {
      setState((s) => ({ ...s, error: 'Mode test — aucun débit. En vrai, ça encaisserait l’upsell.' }))
      return
    }
    setBusy(true)
    setState((s) => ({ ...s, error: '' }))
    try {
      const res = await fetch('/api/stripe/upsell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.url) {
        window.location.href = data.url
        return
      }
      if (!res.ok) throw new Error(data.error || 'Paiement refusé')
      navigate(`/merci-achat?session_id=${encodeURIComponent(sessionId)}&upsell=1`, { replace: true })
    } catch (err) {
      setState((s) => ({ ...s, error: err.message }))
      setBusy(false)
    }
  }

  const offer = state.offer

  return (
    <>
      <SEO
        title="Une dernière chose"
        description="Offre complémentaire après ton inscription YoGyFace."
        path={preview ? '/vente-upsell-test' : '/vente-upsell'}
        noindex
      />

      <section className="relative min-h-screen flex items-center py-12 md:py-16 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[560px] mx-auto w-full relative z-10 text-center">
          {state.status === 'loading' && (
            <p className="text-gris">Confirmation de ton paiement…</p>
          )}

          {state.status === 'error' && !offer && (
            <>
              <h1 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] font-black tracking-tighter text-noir mb-3">
                Ton paiement
                <br />
                <span className="font-serif italic text-corail font-semibold">est bien passé.</span>
              </h1>
              <p className="text-gris text-[15px] mb-8">
                On n’a pas pu charger l’offre complémentaire. Tu peux continuer — l’accès VIP n’est pas perdu.
              </p>
              <div className="flex flex-col items-center gap-3">
                <Link
                  to={`/merci-achat${sessionId ? `?session_id=${encodeURIComponent(sessionId)}` : ''}`}
                  className="btn-corail inline-flex text-sm px-6 py-3"
                >
                  Continuer
                </Link>
                <Link to="/vente-vip" className="btn-secondary inline-flex text-sm px-6 py-3">
                  Retour à l’offre
                </Link>
              </div>
            </>
          )}

          {state.status === 'ready' && offer && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-corail/10 text-corail mb-5">
                <Icon name="sparkles" size={30} />
              </div>
              {preview && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-noir/35 mb-3">
                  Mode test — aucun paiement
                </p>
              )}
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-corail mb-3">
                Ton VIP est confirmé
              </p>
              <h1 className="font-display text-[clamp(1.9rem,5vw,3.2rem)] font-black leading-[0.95] tracking-tighter text-noir mb-3">
                UNE DERNIÈRE
                <br />
                <span className="font-serif italic text-corail font-semibold">chose.</span>
              </h1>
              <p className="font-display font-black text-xl text-noir mb-2">{offer.headline}</p>
              <p className="text-gris text-[15px] leading-relaxed mb-6">{offer.sub}</p>

              <div className="text-left rounded-3xl bg-white border border-noir/8 shadow-sm px-5 py-5 mb-6">
                <p className="font-medium text-noir mb-3">{offer.name}</p>
                <ul className="space-y-2.5 mb-5">
                  {offer.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14px] text-noir/75">
                      <span className="text-corail mt-0.5">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="font-display font-black text-3xl tracking-tight text-noir">
                  {euros(offer.amountCents)} €
                </p>
                <p className="text-gris/50 text-xs mt-1">Un seul paiement · sans retaper ta carte</p>
              </div>

              {state.error && (
                <p className="text-corail text-sm mb-4" role="alert">{state.error}</p>
              )}

              <div className="flex flex-col items-stretch gap-3">
                <button
                  type="button"
                  disabled={busy}
                  onClick={accept}
                  className={`btn-corail justify-center text-sm md:text-base px-7 py-3.5 ${busy ? 'opacity-60' : ''}`}
                >
                  {busy ? 'Paiement…' : `Oui — ajouter pour ${euros(offer.amountCents)} €`}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={skip}
                  className="btn-secondary justify-center text-sm px-7 py-3.5"
                >
                  Non merci, continuer
                </button>
              </div>
              <p className="text-gris/40 text-[11px] mt-8">Paiement sécurisé Stripe</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
