import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import SEO from '../components/SEO'

/** Confirmation après paiement VIP (+ upsell éventuel). Non indexée. */
export default function MerciAchat() {
  const [searchParams] = useSearchParams()
  const withUpsell = searchParams.get('upsell') === '1'

  return (
    <>
      <SEO
        title="Paiement confirmé"
        description="Ton inscription YoGyFace est confirmée. Vérifie tes emails pour l’accès à la plateforme."
        path="/merci-achat"
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
          <h1 className="font-display text-[clamp(2rem,6vw,3.6rem)] font-black leading-[0.95] tracking-tighter text-noir mb-4">
            C’EST
            <br />
            <span className="font-serif italic text-corail font-semibold">officiel.</span>
          </h1>
          <p className="text-gris text-[15px] md:text-[17px] leading-relaxed mb-3">
            Ton offre VIP est validée{withUpsell ? ', ainsi que ta séance individuelle' : ''}.
            Tu vas recevoir un <strong className="text-noir">email de confirmation</strong> — pense à vérifier tes spams.
          </p>
          <p className="text-gris text-[15px] leading-relaxed mb-10">
            Ensuite : diagnostic, ordonnance sous 3 à 4 jours, puis ta routine.
          </p>

          <div className="text-left space-y-3 mb-10">
            {[
              { n: '1', t: 'Vérifie tes emails', d: 'L’accès à la plateforme arrive par mail. Regarde aussi les courriers indésirables.' },
              { n: '2', t: 'Fais ton diagnostic', d: 'Questionnaire, photos, tests : je lis TON visage avant d’écrire quoi que ce soit.' },
              { n: '3', t: 'Reçois ton programme', d: 'Ordonnance + routine personnalisée, faites main, sous 3 à 4 jours.' },
            ].map((s) => (
              <div key={s.n} className="flex gap-4 p-4 rounded-2xl bg-white border border-noir/5 shadow-sm">
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
