import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, grantConsent, denyConsent } from '../lib/analytics'

// Bandeau de consentement RGPD pour la mesure d'audience (PostHog).
// S'affiche tant qu'aucun choix n'a été enregistré.
export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !getConsent())

  if (!visible) return null

  const accept = () => {
    grantConsent()
    setVisible(false)
  }

  const refuse = () => {
    denyConsent()
    setVisible(false)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-xl rounded-2xl bg-noir text-white shadow-2xl p-5 md:p-6">
      <p className="text-sm leading-relaxed text-white/85">
        On utilise des cookies de mesure d'audience pour comprendre comment tu
        utilises le site et l'améliorer. Tu peux accepter ou refuser.{' '}
        <Link
          to="/confidentialite"
          className="underline underline-offset-2 hover:text-corail"
        >
          En savoir plus
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={accept}
          className="flex-1 rounded-full bg-corail px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-corail/90"
        >
          Accepter
        </button>
        <button
          onClick={refuse}
          className="flex-1 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
        >
          Refuser
        </button>
      </div>
    </div>
  )
}
