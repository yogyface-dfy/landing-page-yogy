import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import SEO from '../components/SEO'
import { consumePurchaseConversion, firePurchasePixel } from '../lib/meta-pixel'

const STEPS = [
  {
    n: '1',
    t: 'Dans les 15 prochaines minutes',
    d: "Tu reçois 1 email avec le lien d'accès pour commencer l'étape 1 : ton diagnostic. Vérifie tes spams et l'onglet Promotions (Gmail). L'email peut mettre jusqu'à 15 minutes.",
  },
  {
    n: '2',
    t: "Rien après 15 minutes ?",
    d: 'Écris à laury@yogyface.fr — objet : Accès programme YoGyFace + ton prénom et nom. On te renvoie l’accès.',
  },
  {
    n: '3',
    t: 'Tu as payé avec une autre adresse ?',
    d: "Signale-le aussi par email : ça m'aide à te retrouver plus vite.",
  },
]

/** Confirmation post-Stripe (ex-/merci-achat). Non indexée. */
export default function ConfirmationAchatBienvenue() {
  const [searchParams] = useSearchParams()
  const withUpsell = searchParams.get('upsell') === '1'

  useEffect(() => {
    const payload = consumePurchaseConversion()
    if (payload) firePurchasePixel(payload)
  }, [])

  return (
    <>
      <SEO
        title="Bienvenue dans YoGyFace"
        description="Ton inscription est confirmée. Vérifie tes emails pour l’accès à la plateforme."
        path="/confirmation-achat-bienvenue"
        noindex
      />

      <section className="relative min-h-[80vh] flex items-center pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[620px] mx-auto w-full relative z-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-corail/10 flex items-center justify-center text-corail mb-6">
            <Icon name="flower" size={32} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corail/8 text-corail text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
            Paiement confirmé
          </div>
          <h1 className="font-display text-[clamp(2rem,6vw,3.4rem)] font-black leading-[0.95] tracking-tighter text-noir mb-4">
            BIENVENUE
            <br />
            <span className="font-serif italic text-corail font-semibold">
              dans YoGyFace.
            </span>
          </h1>
          <p className="text-gris text-[15px] md:text-[17px] leading-relaxed mb-10">
            Et maintenant, voici la suite
            {withUpsell ? ' — l’offre complémentaire est bien enregistrée' : ''}.
          </p>

          <div className="text-left space-y-3 mb-10">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="flex gap-4 p-4 rounded-2xl bg-white border border-noir/5 shadow-sm"
              >
                <span className="w-8 h-8 shrink-0 rounded-lg bg-corail text-white flex items-center justify-center font-display font-black text-sm">
                  {s.n}
                </span>
                <div>
                  <p className="font-medium text-sm text-noir">{s.t}</p>
                  <p className="text-gris text-[13px] leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/" className="btn-secondary inline-flex text-sm px-6 py-3">
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </>
  )
}
