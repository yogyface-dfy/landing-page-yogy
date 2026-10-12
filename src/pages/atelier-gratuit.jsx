import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FunnelLiveDate from '../components/funnel-live-date'
import FunnelOptinModal from '../components/funnel-optin-modal'
import { legalTo } from '../lib/funnel'

// Photos originales Systeme.io, stockées en local.
const LEARN = [
  {
    photo: '/atelier/hero-left.png',
    alt: 'Mains sur le front — rides d’expression',
    title: 'Reprogrammer ton front',
    desc: "Comment il arrête enfin de se contracter et de creuser tes rides d'expression.",
  },
  {
    photo: '/atelier/hero-3yogy.png',
    alt: 'Mains sur les joues — muscle caché',
    title: 'Un muscle caché',
    desc: 'La clé pour lifter naturellement le bas du visage et atténuer tes sillons.',
  },
  {
    photo: '/atelier/hero-right.png',
    alt: 'Crèmes et soins — erreurs qui sabotent',
    title: 'Les erreurs qui sabotent',
    desc: 'Ce que tu fais probablement en prenant soin de ton visage — et qui annule tes efforts.',
  },
]

const SCROLL_KEY = 'yf_atelier_popup'

function JoinCta({ onOpen }) {
  return (
    <div className="text-center">
      <button type="button" onClick={onOpen} className="btn-corail text-sm md:text-base px-8 py-3.5">
        S'inscrire au coaching
      </button>
      <p className="text-gris/45 text-[11px] font-semibold uppercase tracking-widest mt-2">
        90 minutes
      </p>
    </div>
  )
}

export default function AtelierGratuit() {
  const [open, setOpen] = useState(false)
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => {
    setOpen(false)
    try {
      sessionStorage.setItem(SCROLL_KEY, '1')
    } catch {
      /* private mode */
    }
  }, [])

  // Auto-ouverture une fois, après un scroll hors du hero.
  useEffect(() => {
    const onScroll = () => {
      try {
        if (sessionStorage.getItem(SCROLL_KEY)) return
      } catch {
        /* continue */
      }
      if (window.scrollY < window.innerHeight * 0.45) return
      setOpen(true)
      try {
        sessionStorage.setItem(SCROLL_KEY, '1')
      } catch {
        /* private mode */
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <SEO
        title="Atelier gratuit — Reprends le contrôle"
        description="Conférence en ligne offerte. Reprends le contrôle sur ton vieillissement cutané, sans crème miracle ni chirurgie."
        path="/atelier-gratuit"
        noindex
      />

      <section className="relative pt-28 md:pt-32 pb-6 px-[5%] overflow-hidden bg-creme">
        {/* Wash rose sous le header, fondu jusqu’à la crème — pas de blanc au milieu. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(255,205,205,0.95) 0%, rgba(255,205,205,0.35) 42%, transparent 70%), linear-gradient(to bottom, #FFCDCD 0%, #FCF3F2 72%)',
          }}
        />
        {/* Visages fondus — masque bas pour éviter la coupure nette du PNG. */}
        <img
          src="/atelier/bg-70.png"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute top-0 left-0 w-full pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black_50%,transparent_88%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_88%)]"
        />
        <div className="max-w-[720px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noir text-white text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
            Coaching en ligne offert · <FunnelLiveDate />
          </div>
          <h1 className="font-display text-[clamp(1.85rem,6vw,3.6rem)] font-black leading-[0.95] tracking-tighter text-noir mb-3">
            REPRENDS LE CONTRÔLE
            <br />
            <span className="font-serif italic text-corail font-semibold">
              de ton vieillissement.
            </span>
          </h1>
          <p className="text-gris text-[15px] md:text-[17px] leading-relaxed mb-5 max-w-xl mx-auto">
            Une méthode naturelle — sans crème miracle, sans chirurgie, en
            8 minutes par jour.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['Sans crème miracle', 'Sans chirurgie', '8 min / jour'].map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full bg-white border border-noir/8 text-[12px] text-noir/70"
              >
                {t}
              </span>
            ))}
          </div>
          <img
            src="/atelier/hero-laury.png"
            alt="Laury, fondatrice de YoGyFace"
            className="mx-auto w-full max-w-[460px] mb-5 pointer-events-none select-none"
          />
          <JoinCta onOpen={onOpen} />
        </div>
      </section>

      <section className="pt-6 md:pt-8 pb-16 md:pb-20 px-[5%] bg-creme">
        <div className="max-w-[1000px] mx-auto">
          <p className="section-badge justify-center">Dans ce coaching</p>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir text-center mb-8">
            TU VAS
            <br />
            <span className="font-serif italic text-corail font-semibold">apprendre</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {LEARN.map((item) => (
              <article key={item.title} className="flex flex-col">
                <img
                  src={item.photo}
                  alt={item.alt}
                  className="w-full aspect-[4/3] object-cover rounded-2xl mb-3"
                />
                <div className="bg-white rounded-2xl p-5 border border-noir/5 flex-1">
                  <h3 className="font-display font-black text-[15px] mb-1">{item.title}</h3>
                  <p className="text-gris text-sm leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-[5%] bg-white">
        <div className="max-w-[880px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/laury-massage.webp"
            alt="Laury, fondatrice de YoGyFace"
            className="w-full rounded-2xl shadow-xl object-cover"
          />
          <div>
            <p className="section-badge">Laury</p>
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.2rem)] font-black tracking-tighter text-noir mb-4">
              MOI C'EST
              <br />
              <span className="font-serif italic text-corail font-semibold">Laury.</span>
            </h2>
            <p className="text-gris text-[15px] leading-relaxed mb-3">
              Formée par de grandes marques de luxe et des laboratoires. Plus de
              10 ans à conseiller des milliers de femmes en pharmacie et en
              parfumerie.
            </p>
            <p className="text-gris text-[15px] leading-relaxed">
              Malgré les produits, les résultats n'étaient pas toujours au
              rendez-vous. J'ai créé YoGyFace : un programme sur-mesure, naturel,
              pensé pour tes vraies attentes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 px-[5%] bg-creme">
        <JoinCta onOpen={onOpen} />
      </section>

      <footer className="bg-noir text-white/50 text-[11px] py-6 px-[5%]">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link to={legalTo('/mentions-legales', true)} className="hover:text-white">
            Mentions légales
          </Link>
          <Link to={legalTo('/confidentialite', true)} className="hover:text-white">
            Confidentialité
          </Link>
          <Link to={legalTo('/cgv', true)} className="hover:text-white">
            CGV
          </Link>
        </nav>
      </footer>

      <FunnelOptinModal open={open} onClose={onClose} />
    </>
  )
}
