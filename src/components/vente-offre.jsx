import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from './Icon'
import SEO from './SEO'
import VenteResultats from './vente-resultats'
import VentePlateforme from './vente-plateforme'
import { readPrefillEmail, startCheckoutSession, withStripePrefill } from '../lib/stripe-checkout'
import { SHOW_TRUSTPILOT } from '../lib/trustpilot'

/**
 * Pages de vente privées (non indexées).
 * variant "vip"   → offre envoyée aux inscrites liste d'attente
 * variant "public" → offre classique
 */
const OFFERS = {
  vip: {
    once: {
      url: 'https://buy.stripe.com/7sY9AS2KtdrCcYF7aP8Zq0q',
      price: 299,
      was: 499,
    },
    installments: {
      url: 'https://buy.stripe.com/8x214mcl35Za1fX66L8Zq0r',
      amount: '99,99',
    },
  },
  public: {
    once: {
      url: 'mailto:contact@yogyface.fr?subject=Inscription%20programme%20YoGyFace',
      price: 499,
      was: null,
    },
    installments: null,
  },
}

const VIP_BONUSES = [
  { t: '6h de coaching offertes', d: '18h au total, au lieu de 12h.', save: '240 €' },
  { t: '6 mois d\'accompagnement offerts', d: '12 mois au total, au lieu de 6.', save: '199 €' },
  { t: 'Renouvellement de diagnostic offert', d: 'Un second diagnostic complet pour ajuster la suite.', save: '299 €' },
]

// VIP / lancement public / tarif plein (après la réduction de lancement).
const COMPARE = [
  { label: 'Prix du programme', vip: '299 €', public: '499 €', after: '999 €' },
  { label: 'Accès à la plateforme', vip: 'Avant-première', public: 'Lancement public', after: 'Accès standard' },
  { label: 'Coaching live', vip: '12h', bonus: '+6h', public: '12h', after: '12h' },
  { label: 'Accompagnement', vip: '6 mois', bonus: '+6 mois', public: '6 mois', after: '6 mois' },
  { label: 'Diagnostic', vip: 'Initial', bonus: '+ renouvellement', public: 'Initial uniquement', after: 'Initial uniquement' },
  { label: 'Bonus exclusifs', vip: 'Inclus', public: '—', after: '—' },
]

const BRANDS = [
  'Biotherm', 'La Canopée', 'Talika', 'Caudalie', 'EllesVMH',
  'The New Well', 'Le Congrès de l\'Esthétique', 'Baton Rouge', 'Epicosme', 'Lauvée',
]

// 12 avis Trustpilot authentiques (profil yogyface.fr — titres officiels ou extraits).
const TESTIMONIALS = [
  {
    headline: 'Ma ride du lion devient presque invisible.',
    text: "Elle me dérangeait énormément. La différence la plus impressionnante est pour mes paupières. Laury est exceptionnelle. Ses diagnostics sont tellement personnalisés que j'ai l'impression d'être sa « patiente » plutôt que sa cliente.",
    name: 'Jeanne R.',
    tags: ['Ride du lion', 'Paupières'],
    link: 'https://www.trustpilot.com/reviews/6a008d013da13a0d8a16d222',
  },
  {
    headline: "J'ai l'impression d'avoir gagné 10 ans.",
    text: "En 6 mois de YoGyFace, un regard rajeuni et plus ouvert. Je me regarde avec joie dans le miroir. Je recommande Laury à 200 %.",
    name: 'Elisabeth — 66 ans',
    tags: ['Regard', 'Fermeté'],
    link: 'https://www.trustpilot.com/reviews/6a2a71cf6ece41f3321f45d1',
  },
  {
    headline: "Je n'ai jamais vu un programme aussi complet.",
    text: "Je pratique depuis presque un an. Mes sillons et ma ride du lion sont moins creusés, ma peau est repulpée et mon regard défatigué.",
    name: 'Fanny — 47 ans',
    tags: ['Sillons', 'Ride du lion'],
    link: 'https://www.trustpilot.com/reviews/6a2b1c8f882a16df3f40b20f',
  },
  {
    headline: 'Bien plus efficace que les autres coachs en ligne.',
    text: "En 3 mois, mes poches sont moins marquées, ma mâchoire plus lisse et ma ride du lion a quasi disparu. Un visage plus détendu, sans chirurgie.",
    name: 'Aurore',
    tags: ['Poches', 'Sans chirurgie'],
    link: 'https://www.trustpilot.com/reviews/6a2e78b79141ca5435afe805',
  },
  {
    headline: "Une relation plus douce avec mon visage.",
    text: "Ce qui m'a convaincue, c'est le diagnostic sur mesure. Quelques semaines plus tard, l'ovale est plus tonique et mon regard plus ouvert.",
    name: 'Emmanuelle — 41 ans',
    tags: ['Ovale', 'Regard'],
    link: 'https://www.trustpilot.com/reviews/6a2ffddb273694f0e9347c55',
  },
  {
    headline: 'Les douleurs à la mâchoire ont disparu.',
    text: "J'ai 61 ans. Dès les premières séances, elles se sont apaisées. Le diagnostic et l'ordonnance personnalisée sont d'une grande justesse.",
    name: 'Christine — 61 ans',
    tags: ['Mâchoire', 'Bien-être'],
    link: 'https://www.trustpilot.com/reviews/6a345206ee1958e77fdf80e8',
  },
  {
    headline: 'Une renaissance.',
    text: "Un an de pratique. Le botox m'avait créé de nouvelles problématiques — le yoga du visage a tout corrigé. J'ai repris totalement confiance en moi.",
    name: 'Carine',
    tags: ['Après Botox', 'Confiance'],
    link: 'https://www.trustpilot.com/reviews/6a29584db820ab188088ce5e',
  },
  {
    headline: 'De vrais résultats.',
    text: "Après une lourde opération, je ne me reconnaissais plus. J'ai détendu cervicales, trapèzes, masséters — les rides se sont estompées et mon visage s'est de nouveau arrondi.",
    name: 'Virginie — 45 ans',
    tags: ['Tensions', 'Rides'],
    link: 'https://www.trustpilot.com/reviews/6a2ee612c96cedba939ad6a5',
  },
  {
    headline: "Le miroir n'était plus mon ami.",
    text: "À 66 ans, je psychotais sur mes rides et les poches. J'avais déjà fait des injections — résultat éphémère. J'ai plongé avec des doutes. Autant dire que je suis scotchée.",
    name: 'Marie-Noëlle — 66 ans',
    tags: ['Rides', 'Poches'],
    link: 'https://www.trustpilot.com/reviews/6a8bfb8d973db1d60805acb8',
  },
  {
    headline: 'Un investissement à long terme.',
    text: "J'ai hésité (le prix, le doute). Aucun regret : des ressources précieuses et un environnement pensé pour la motivation et l'envie de prendre soin de soi.",
    name: 'Nina',
    tags: ['Motivation', 'Holistique'],
    link: 'https://www.trustpilot.com/reviews/6a89790c5de7e449fca04f88',
  },
  {
    headline: 'Un vrai programme personnalisé.',
    text: "Tout a commencé par une poche sous un œil. J'ai découvert fascias, tensions, déséquilibres — et qu'un problème qui paraît simple peut avoir de nombreuses causes.",
    name: 'Stéph — 43 ans',
    tags: ['Poches', 'Fascias'],
    link: 'https://www.trustpilot.com/reviews/6a808010b957da8ce7e23c2e',
  },
  {
    headline: '100 % conquise par ce programme.',
    text: "Livres, tutos au hasard, gua sha… j'ai décidé de faire les choses correctement. La qualité du programme et le fait que ce soit ultra personnalisé m'ont convaincue.",
    name: 'Camille — 35 ans',
    tags: ['Prévention', 'Accompagnement'],
    link: 'https://www.trustpilot.com/reviews/6a623b362ddab66529ca1592',
  },
]

const TP_GREEN = '#00B67A'

function TpStars({ size = 16 }) {
  return (
    <span className="inline-flex gap-px" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="3" fill={TP_GREEN} />
          <path fill="#fff" d="M12 16.2l4.95 3-1.32-5.64L20 9.8l-5.76-.48L12 4 9.76 9.32 4 9.8l4.37 3.76L7.05 19.2z" />
        </svg>
      ))}
    </span>
  )
}

// Parcours en 3 temps (bloc type Lynae). Les 6 étapes détaillées restent plus bas.
const HOW = [
  {
    n: 1,
    img: '/laury-expertise.webp',
    alt: 'Laury — diagnostic et anatomie du visage',
    title: 'Tu réalises ton diagnostic',
    desc: (
      <>
        Questionnaire, photos, tests : tu poses les bases pour que je lise <strong>TON visage</strong>.
      </>
    ),
  },
  {
    n: 2,
    img: '/laury-ecriture.webp',
    alt: 'Laury — écriture de l\'ordonnance personnalisée',
    title: 'Je te crée ton ordonnance et ton programme',
    desc: (
      <>
        Sous <strong>3 à 4 jours</strong> max. Chaque programme est unique — ça demande un peu de travail, à la main.
      </>
    ),
  },
  {
    n: 3,
    img: '/laury-yeux.webp',
    alt: 'Routine YoGyFace au quotidien',
    title: 'Tu en fais ton rituel quotidien',
    desc: (
      <>
        Ta routine devient un geste simple. Les effets se voient dès les <strong>premières semaines</strong>.
      </>
    ),
  },
]

// Calendrier réaliste (article résultats + avis), jusqu'à 6 mois.
const TIMELINE = [
  {
    when: 'Semaines 1 à 4',
    quote: 'Je sens que ça rentre.',
    text: (
      <>
        Tu prends les <strong>bases</strong> pour installer de bonnes habitudes. Puis tu commences à corriger tes comportements et tes mimiques — souvent <strong>la cause de tes rides</strong>.
      </>
    ),
  },
  {
    when: '2 à 4 mois',
    quote: 'T\'as bonne mine, tu as fait quelque chose ?',
    text: (
      <>
        L'ovale se raffermit, le regard s'ouvre, certaines rides d'expression s'adoucissent. <strong>L'entourage commence à le voir</strong> — pas seulement toi dans le miroir.
      </>
    ),
  },
  {
    when: '6 mois',
    quote: 'Je me sens plus confiante.',
    text: (
      <>
        Tu dis de nouveau <strong>oui</strong> aux photos, aux dîners, aux selfies. Tu te regardes dans le miroir sans détourner les yeux. Tu reprends du temps pour toi — et tu n'as plus peur de vieillir.
      </>
    ),
  },
]

// Détail aligné sur /programme (Reset) — pas un nouveau bloc, on étoffe les 6 étapes.
const steps = [
  {
    num: '01',
    title: 'Diagnostic personnalisé',
    tag: 'J+0',
    desc: 'Questionnaire de 30 min, 25 thématiques, tests musculaires et photos de face et de profil : j\'analyse TON visage avant de construire quoi que ce soit.',
    detail: 'Une analyse fine pour créer ta routine unique — pas un protocole générique.',
  },
  {
    num: '02',
    title: 'Ordonnance beauté sur-mesure',
    tag: 'J+3',
    desc: 'Un document de 3 à 7 pages : tes 3 priorités, les causes réelles, tes conseils skincare et mode de vie. C\'est mon point de référence pour suivre ton évolution.',
    detail: 'Tes priorités identifiées — et les causes, pas seulement les symptômes.',
  },
  {
    num: '03',
    title: 'Programme 4 semaines',
    tag: 'J+6',
    desc: 'Une routine progressive de 3 à 10 min/jour. La durée augmente semaine après semaine : on installe l\'habitude sans te cramer dès le départ.',
    detail: 'Fondations d\'abord, maîtrise ensuite — 21 jours pour ancrer le geste.',
  },
  {
    num: '04',
    title: '160+ exercices',
    tag: 'Illimité',
    desc: 'Bibliothèque par zones : muscles fondamentaux, bouche, joues, regard, front, ovale, buste, cou, asymétrie.',
    detail: 'Tu pioches de nouveaux exercices une fois ta routine de base acquise.',
  },
  {
    num: '05',
    title: 'Lives coaching',
    tag: 'Inclus',
    desc: 'FAQ pour te corriger les premières semaines, puis lives thématiques pour aller plus loin. Ce ne sont pas des vidéos pré-enregistrées.',
    detail: 'Mon équipe et moi sommes là pour te guider — en direct.',
  },
  {
    num: '06',
    title: 'Suivi & communauté',
    tag: 'À vie',
    desc: 'Questionnaires à 1, 2, 3 et 6 mois. Replays, groupe WhatsApp, et le Club des Marques : 1 live mensuel avec un intervenant.',
    detail: 'Jamais toute seule — motivation collective et soutien continu.',
  },
]

// Catalogue compact (Reset / /programme) — expertes + guides, pas la stack « 2 497 € ».
const BONUS_CATALOG = [
  { t: 'EFT & émotions', d: 'Irina — libérer les blocages qui se cristallisent sur le visage.' },
  { t: 'Face Tape', d: 'Laëtitia — applications ciblées entre les séances.' },
  { t: 'Yoga 30 min', d: 'Alicia — respiration, posture, étirements guidés.' },
  { t: 'Nutrition P.E.A.U', d: 'Camille — agir de l\'intérieur sur rides, taches, éclat.' },
  { t: 'Bible des actifs', d: 'Guide + décryptage collagène (Julie / Natis).' },
]

// FAQ vente : extraits de /faq, du calendrier résultats et des CGV.
const SALE_FAQ = [
  {
    q: 'En combien de temps vais-je voir des résultats ?',
    a: "Effet « bonne mine » dès les premières séances. En 3–4 semaines tu poses les habitudes et tu corriges tes mimiques. Les changements visibles (ovale, regard, rides d'expression) se voient surtout entre 2 et 4 mois. À 6 mois, la transformation est installée — si tu es régulière.",
  },
  {
    q: 'Combien de temps faut-il pratiquer par jour ?',
    a: "5 à 10 minutes bien faites suffisent. Une routine courte, lente et consciente vaut mieux qu'un quart d'heure bâclé. L'objectif : l'ancrer comme se laver les dents, sans charge mentale.",
  },
  {
    q: 'Est-ce que ça marche vraiment ?',
    a: SHOW_TRUSTPILOT
      ? "Oui, si tu travailles le visage en globalité — pas une ride isolée. On détend les muscles trop contractés, on réveille ceux qui se sont endormis, et on corrige les habitudes qui creusent les traits. 4.9/5 sur Trustpilot, 700+ femmes accompagnées."
      : "Oui, si tu travailles le visage en globalité — pas une ride isolée. On détend les muscles trop contractés, on réveille ceux qui se sont endormis, et on corrige les habitudes qui creusent les traits. 4.9/5, 700+ femmes accompagnées.",
  },
  {
    q: 'Est-ce que ça peut remplacer les injections ?',
    a: "Ce n'est pas une injection : ça n'est pas figé. Beaucoup de femmes ont espacé ou arrêté leurs injections une fois la pratique installée. C'est complémentaire, et ça te rend autonome.",
  },
  {
    q: 'J\'ai peur de mal faire et d\'abîmer mon visage.',
    a: "Chaque geste est expliqué : placement, pression, rythme, sensations. Les lives servent à te corriger. Pratiquer au hasard peut être contre-productif — c'est pour ça que tu n'es pas seule.",
  },
  {
    q: 'Comment fonctionne la garantie ?',
    a: "Si après le programme, tes coachings, une pratique régulière et tes photos de suivi tu ne vois aucune amélioration de ton bien-être ou de ta confiance : je te rembourse. Les conditions précises sont dans les CGV.",
  },
  {
    q: 'Que se passe-t-il après le paiement ?',
    a: "Tu reçois l'accès à la plateforme. Juste après le paiement, une offre complémentaire peut t'être proposée (un clic, sans retaper ta carte). Ensuite tu fais ton diagnostic : ordonnance et programme sous 3 à 4 jours, lives + groupe.",
  },
]

const includes = [
  'Nouveau diagnostic V2',
  'Nouveaux exercices & programme refondu',
  'Application YoGyFace',
  'Messagerie instantanée + notifications',
  'Programme 100 % personnalisé, fait main',
  '5 expertes (nutrition, émotions, face tape, yoga, compléments)',
  '+20 eBooks et guides pratiques',
  'Groupe WhatsApp privé',
  'Garantie de résultats',
]

const renderBrand = (name, i) => (
  <span key={`${name}-${i}`} className="inline-flex items-center mx-8 md:mx-14 text-[22px] md:text-[28px] font-display font-black tracking-tight text-noir/15 select-none">
    {name}
  </span>
)

/** CTA 1× + 3× — Checkout Session (fallback Payment Link si Stripe n'est pas configuré). */
function PayCta({ onceLabel, installmentsLabel, onOnce, onInstallments, loading, error, dark = false }) {
  const busy = Boolean(loading)
  const threeXClass = dark
    ? 'inline-flex items-center justify-center px-7 py-3.5 min-h-[44px] rounded-full border-2 border-white/70 text-white font-semibold text-sm md:text-base hover:border-corail hover:text-corail transition-colors'
    : 'btn-secondary text-sm md:text-base px-7 py-3.5 border-2 border-noir/25 font-semibold'
  return (
    <div className="inline-flex flex-col items-stretch gap-3 w-full max-w-[380px]">
      <button
        type="button"
        disabled={busy}
        onClick={onOnce}
        className={`btn-corail justify-center text-sm md:text-base px-7 py-3.5 ${busy ? 'opacity-60' : ''}`}
      >
        {loading === 'vip-once' ? 'Redirection…' : onceLabel}
      </button>
      {onInstallments && (
        <button
          type="button"
          disabled={busy}
          onClick={onInstallments}
          className={`${threeXClass} justify-center ${busy ? 'opacity-60' : ''}`}
        >
          {loading === 'vip-3x' ? 'Redirection…' : installmentsLabel}
        </button>
      )}
      {error && <p className={`text-xs ${dark ? 'text-corail/80' : 'text-corail'}`} role="alert">{error}</p>}
    </div>
  )
}

/**
 * @param {{ variant: 'vip' | 'public' }} props
 */
export default function VenteOffre({ variant }) {
  const isVip = variant === 'vip'
  const path = isVip ? '/vente-vip' : '/vente'
  const offer = OFFERS[variant]
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [payLoading, setPayLoading] = useState(null)
  const [payError, setPayError] = useState('')
  const spineRef = useRef(null)

  // Query / session uniquement au mount (SSG n'a pas les params).
  useEffect(() => {
    setEmail(readPrefillEmail(searchParams))
  }, [searchParams])

  // Pointillés : --p = portion visible depuis le haut (gris → corail), sans re-render.
  useEffect(() => {
    const spine = spineRef.current
    const ol = spine?.parentElement
    if (!spine || !ol) return
    const paint = () => {
      const r = ol.getBoundingClientRect()
      const mid = window.innerHeight * 0.5
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height))
      spine.style.setProperty('--p', `${(p * 100).toFixed(1)}%`)
    }
    paint()
    window.addEventListener('scroll', paint, { passive: true })
    window.addEventListener('resize', paint)
    return () => {
      window.removeEventListener('scroll', paint)
      window.removeEventListener('resize', paint)
    }
  }, [])

  const label3x = offer.installments ? `Payer en 3 × ${offer.installments.amount} €` : null

  const startPay = async (plan) => {
    if (!isVip) {
      window.location.href = offer.once.url
      return
    }
    setPayError('')
    setPayLoading(plan)
    try {
      const data = await startCheckoutSession({ plan, email, cancelPath: path })
      // Payment Link seulement si Stripe n'est pas configuré (503 + fallbackUrl).
      // Un lien buy.stripe.com n'a pas kind=vip → webi encaisse et n'inscrit personne.
      const dest = data.url || (data.fallbackUrl ? withStripePrefill(data.fallbackUrl, email) : '')
      if (!dest) throw new Error('Paiement indisponible')
      window.location.href = dest
    } catch (err) {
      setPayError(err.message || 'Paiement indisponible')
      setPayLoading(null)
    }
  }

  const pay = {
    onOnce: () => startPay('vip-once'),
    onInstallments: offer.installments ? () => startPay('vip-3x') : undefined,
    installmentsLabel: label3x,
    loading: payLoading,
    error: payError,
  }

  return (
    <>
      <SEO
        title={isVip ? 'Offre VIP — Vente privée YoGyFace' : 'Lancement YoGyFace — Programme'}
        description={
          isVip
            ? 'Offre VIP exceptionnelle : 299 € au lieu de 499 €, accès en avant-première à l\'application, 18h de coaching et bonus réservés.'
            : 'Le nouveau programme YoGyFace : diagnostic V2, nouveaux exercices, application et accompagnement personnalisé.'
        }
        path={path}
        noindex
      />

      {/* Hero type fiche produit (rythme Lynae : visuel + offre + preuves) */}
      <section id={isVip ? 'offre' : undefined} className="relative pt-28 md:pt-36 pb-12 md:pb-16 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-white pointer-events-none" />
        <div className="max-w-[1100px] mx-auto relative z-10 grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="order-1">
            <div className="relative max-w-[480px] mx-auto md:mx-0">
              <div className="absolute -inset-3 bg-gradient-to-br from-corail/10 to-bleu/10 rounded-3xl blur-2xl pointer-events-none hidden md:block" />
              <img
                src="/laury-massage.webp"
                alt="Laury — méthode YoGyFace"
                className="relative w-full h-auto rounded-2xl md:rounded-3xl shadow-2xl"
              />
              {isVip && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-noir text-white text-[11px] font-semibold uppercase tracking-widest">
                  Offre VIP
                </span>
              )}
            </div>
          </div>

          <div className="order-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corail/10 text-corail text-[11px] font-semibold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
              {isVip ? 'Offre exceptionnelle — inscrites liste d\'attente' : 'Lancement YoGyFace'}
            </div>
            <h1 className="font-display text-[clamp(1.9rem,5vw,3.4rem)] font-black leading-[0.95] tracking-tighter text-noir mb-3">
              {isVip ? 'TU ES VIP.' : 'LE NOUVEAU'}
              <br />
              <span className="font-serif italic text-corail font-semibold">
                {isVip ? 'Cette offre n\'est pas publique.' : 'YoGyFace.'}
              </span>
            </h1>
            {/* Accroche Reset — sous-titre, ne remplace pas le hero VIP. */}
            <p className="font-serif italic text-corail text-[16px] md:text-[18px] mb-3">
              Crée les bonnes habitudes et supprime les causes de ton vieillissement.
            </p>
            <p className="text-gris text-[15px] leading-relaxed mb-5 max-w-lg md:max-w-none">
              {isVip
                ? 'Accès en avant-première à l\'application, au diagnostic V2 et au nouveau programme — plus les bonus que le lancement public n\'aura pas.'
                : 'Diagnostic V2, exercices refondus, application YoGyFace. L\'offre publique, sans les avantages de la liste d\'attente.'}
            </p>

            {SHOW_TRUSTPILOT ? (
            <a
              href="https://fr.trustpilot.com/review/yogyface.fr"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sm mb-5"
            >
              <span className="font-display font-black text-noir">4.9/5</span>
              <span className="text-gris/70">Excellent · Trustpilot</span>
              <span className="text-gris/40">· 700+ femmes</span>
            </a>
            ) : (
            <p className="inline-flex items-center gap-2 text-sm mb-5">
              <span className="font-display font-black text-noir">4.9/5</span>
              <span className="text-gris/40">· 700+ femmes</span>
            </p>
            )}

            {isVip && (
              <ul className="text-left space-y-2 mb-6 max-w-md mx-auto md:mx-0">
                {[
                  'Accès en avant-première à la plateforme',
                  '299 € au lieu de 499 €',
                  '18h de coaching · 12 mois d\'accompagnement',
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2 text-[14px] text-noir/80">
                    <span className="text-corail mt-0.5">✓</span>
                    {l}
                  </li>
                ))}
              </ul>
            )}

            {offer.once.price && (
              <p className="mb-4">
                {offer.once.was && (
                  <span className="text-gris/45 line-through text-lg mr-2">{offer.once.was} €</span>
                )}
                <span className="font-display font-black text-4xl tracking-tight text-noir">{offer.once.price} €</span>
                {offer.installments && (
                  <span className="block text-gris/50 text-sm mt-1">ou 3 × {offer.installments.amount} €</span>
                )}
                {isVip && <span className="block text-corail text-xs font-semibold mt-1">Tarif VIP — 200 € de moins que le public</span>}
              </p>
            )}
            <PayCta
              {...pay}
              onceLabel={isVip ? `Rejoindre l'offre VIP — ${offer.once.price} €` : 'Rejoindre le programme →'}
            />
            <p className="text-gris/45 text-xs mt-3">
              {isVip ? 'Paiement sécurisé Stripe · Offre soumise à conditions' : 'Paiement sécurisé'}
            </p>
          </div>
        </div>
      </section>

      {/* Brand proof — bandeau marques (même liste que l'accueil) */}
      <section className="py-10 md:py-14 px-[5%] bg-white border-y border-noir/5 overflow-hidden">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-noir/30 mb-6">
          Elles m'ont fait confiance
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map(renderBrand)}
          </div>
        </div>
      </section>

      {/* Comparatif VIP vs public */}
      {isVip && (
        <section className="py-14 md:py-20 px-[5%] bg-creme">
          <div className="max-w-[880px] mx-auto">
            <div className="text-center mb-8">
              <div className="section-badge justify-center">Pourquoi tu es VIP</div>
              <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
                PAS LA MÊME
                <br />
                <span className="font-serif italic text-corail font-semibold">offre que les autres</span>
              </h2>
            </div>
            {/* Grille partagée : une ligne = un critère. La carte VIP est un fond, pas une colonne à part. */}
            <div className="overflow-x-auto -mx-2 px-2 py-5">
              <div
                className="min-w-[700px] grid items-stretch"
                style={{ gridTemplateColumns: '1.35fr 1fr 1fr 1fr' }}
              >
                <div
                  aria-hidden
                  className="col-start-2 row-start-1 row-span-7 -my-3 rounded-2xl bg-white ring-2 ring-emerald-500 shadow-[0_12px_40px_rgba(16,185,129,0.18)] pointer-events-none"
                />

                <div className="h-12" style={{ gridColumn: 1, gridRow: 1 }} />
                <div className="relative z-10 h-12 flex items-center justify-center" style={{ gridColumn: 2, gridRow: 1 }}>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-full px-3 py-1">
                    VIP — toi
                  </span>
                </div>
                <div className="h-12 flex items-center justify-center text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gris/50" style={{ gridColumn: 3, gridRow: 1 }}>
                  Lancement public
                </div>
                <div className="h-12 flex items-center justify-center text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gris/40" style={{ gridColumn: 4, gridRow: 1 }}>
                  Après lancement
                </div>

                {COMPARE.map((row, i) => {
                  const gridRow = i + 2
                  return (
                    <Fragment key={row.label}>
                      <div className="min-h-[54px] flex items-center px-2 text-[13px] text-gris border-t border-noir/8" style={{ gridColumn: 1, gridRow }}>
                        {row.label}
                      </div>
                      <div className="relative z-10 min-h-[54px] flex items-center justify-center px-2 text-[13px] md:text-sm font-semibold text-noir text-center border-t border-emerald-100" style={{ gridColumn: 2, gridRow }}>
                        <span>
                          {row.vip}
                          {row.bonus && (
                            <span className="ml-1.5 font-semibold text-emerald-600 whitespace-nowrap">{row.bonus}</span>
                          )}
                        </span>
                      </div>
                      <div className="min-h-[54px] flex items-center justify-center px-2 text-[13px] text-gris/55 text-center border-t border-noir/8" style={{ gridColumn: 3, gridRow }}>
                        {row.public}
                      </div>
                      <div className="min-h-[54px] flex items-center justify-center px-2 text-[13px] text-gris/40 text-center border-t border-noir/8" style={{ gridColumn: 4, gridRow }}>
                        {row.after}
                      </div>
                    </Fragment>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-14 md:py-20 px-[5%] bg-creme">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <div className="section-badge justify-center">Comment ça se passe</div>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
              UN GESTE SIMPLE
              <br />
              <span className="font-serif italic text-corail font-semibold">à tenir au quotidien</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {HOW.map((s) => (
              <article key={s.n} className="rounded-2xl overflow-hidden bg-white shadow-sm">
                <img src={s.img} alt={s.alt} className="w-full h-52 md:h-56 object-cover object-top" />
                <div className="p-5 text-left">
                  <p className="font-serif italic text-corail text-sm mb-1">Étape {s.n} :</p>
                  <h3 className="font-display font-black text-noir text-[15px] md:text-base tracking-tight mb-2">{s.title}</h3>
                  <p className="text-gris text-[13px] md:text-[14px] leading-relaxed">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-[5%] bg-white">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-center font-display text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-tighter text-noir mb-10">
            DES RÉSULTATS VISIBLES,
            <br />
            <span className="font-serif italic text-corail font-semibold">dès les premières semaines</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
            <div className="space-y-7 text-left">
              {TIMELINE.map((t) => (
                <div key={t.when}>
                  <p className="font-display font-black text-[17px] md:text-[20px] tracking-tight text-corail mb-1.5">{t.when}</p>
                  <p className="text-gris/70 text-[13px] italic mb-1.5">« {t.quote} »</p>
                  <p className="text-noir/80 text-[14px] leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
            <div>
              <img
                src="/laury-yeux.webp"
                alt="Routine YoGyFace — les effets s'installent semaine après semaine"
                className="w-full max-w-[420px] mx-auto md:ml-auto h-[380px] md:h-[520px] rounded-2xl md:rounded-3xl object-cover object-top"
              />
              <div className="text-center mt-6">
                <PayCta
                  {...pay}
                  onceLabel={isVip ? 'Rejoindre l\'offre VIP — 299 €' : 'Rejoindre le programme'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <VenteResultats
        cta={
          <PayCta
            {...pay}
            onceLabel={isVip ? 'Rejoindre l\'offre VIP — 299 €' : 'Rejoindre le programme'}
          />
        }
      />

      {/* Social proof — cartes au format Trustpilot */}
      <section className="py-14 md:py-20 px-[5%] bg-creme">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="flex items-center justify-center gap-2 text-sm text-noir mb-3">
              <TpStars size={16} />
              <span>
                Noté <strong>4.9/5</strong>
                {SHOW_TRUSTPILOT && (
                  <>
                    {' '}Excellent sur{' '}
                    <a href="https://fr.trustpilot.com/review/yogyface.fr" target="_blank" rel="noopener" className="font-semibold underline" style={{ color: TP_GREEN }}>
                      Trustpilot
                    </a>
                  </>
                )}
              </span>
            </p>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
              DES TRANSFORMATIONS
              <br />
              <span className="font-serif italic text-corail font-semibold">réelles, racontées par elles</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => {
              const Card = SHOW_TRUSTPILOT ? 'a' : 'div'
              const cardProps = SHOW_TRUSTPILOT
                ? { href: t.link, target: '_blank', rel: 'noopener' }
                : {}
              return (
              <Card
                key={t.link}
                {...cardProps}
                className="p-5 rounded-2xl bg-white border border-noir/8 text-left flex flex-col hover:border-[#00B67A]/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-sm font-bold text-noir">5.0</span>
                    <TpStars />
                  </span>
                  <span className="text-[11px] text-gris whitespace-nowrap">{t.name}</span>
                </div>
                <p className="font-semibold text-noir text-[15px] leading-snug mb-2">« {t.headline} »</p>
                <p className="text-gris text-[13px] leading-relaxed flex-1 mb-4">{t.text}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
                      style={{ color: TP_GREEN, borderColor: 'rgba(0,182,122,0.35)', background: 'rgba(0,182,122,0.06)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
              )
            })}
          </div>
          <p className="text-center mt-8">
            {SHOW_TRUSTPILOT ? (
            <a
              href="https://fr.trustpilot.com/review/yogyface.fr"
              target="_blank"
              rel="noopener"
              className="font-semibold underline text-noir hover:text-corail"
            >
              Voir plus d'avis
            </a>
            ) : (
            <Link to="/transformations" className="font-semibold underline text-noir hover:text-corail">
              Voir plus d'avis
            </Link>
            )}
          </p>
        </div>
      </section>

      {/* Autorité — calqué sur le bloc « formulé par » Lynae, faits About/Home. */}
      <section className="py-14 md:py-20 px-[5%] bg-white">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <img
            src="/laury-expertise.webp"
            alt="Laury Anater — fondatrice de YoGyFace"
            className="w-full max-w-[420px] mx-auto md:mx-0 h-[380px] md:h-[520px] rounded-2xl md:rounded-3xl object-cover object-top"
          />
          <div className="text-left">
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.2rem)] font-black tracking-tighter text-noir leading-tight mb-4">
              Conçu professionnellement
              <br />
              <span className="font-serif italic text-corail font-semibold">par Laury Anater</span>
            </h2>
            <p className="text-gris text-[14px] md:text-[15px] leading-relaxed mb-5">
              10 ans chez Chanel, L'Oréal / Biotherm et Weleda. Formée auprès de Sylvie LeFranc, Era Narumi et Fumiko Takatsu. Elle a créé <strong className="text-noir">RESET™</strong> : une reprogrammation neuro-faciale, pas un yoga du visage générique.
            </p>
            <p className="text-noir text-sm font-medium mb-2">Chaque geste est choisi pour son rôle précis dans :</p>
            <ul className="space-y-1.5 text-gris text-[14px] mb-6">
              <li>— la tonification des 45 muscles du visage</li>
              <li>— le relâchement des tensions (mâchoire, regard, cou)</li>
              <li>— la reprogrammation des habitudes qui font vieillir</li>
            </ul>
            <p className="text-noir text-[14px] leading-relaxed">
              Aucun programme copié-collé.<br />
              Aucun exercice décoratif.<br />
              Chaque choix a une fonction claire.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <PayCta
            {...pay}
            onceLabel={isVip ? 'Rejoindre l\'offre VIP — 299 €' : 'Rejoindre le programme'}
          />
        </div>
      </section>

      {/* Inclus */}
      <section className="py-14 md:py-20 px-[5%] bg-creme">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-8">
            <div className="section-badge justify-center">Ce qui est inclus</div>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
              LE PROGRAMME
              <br />
              <span className="font-serif italic text-corail font-semibold">complet</span>
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-noir/5 text-sm text-noir/80">
                <span className="text-corail mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-noir/30 mb-3 text-center">
              Inclus aussi — expertes & guides
            </p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {BONUS_CATALOG.map((b) => (
                <li key={b.t} className="p-3.5 rounded-xl bg-white border border-noir/5 text-left">
                  <p className="font-medium text-sm text-noir">{b.t}</p>
                  <p className="text-gris text-[13px] leading-relaxed mt-0.5">{b.d}</p>
                </li>
              ))}
            </ul>
            <p className="text-center mt-4">
              <Link to="/programme" className="text-sm font-semibold underline text-noir hover:text-corail">
                Voir le détail du programme
              </Link>
            </p>
          </div>
        </div>
      </section>

      <VentePlateforme />

      {isVip && (
        <section className="py-14 md:py-20 px-[5%] bg-white">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-8">
              <div className="section-badge justify-center">Réservé aux VIP</div>
              <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
                TES BONUS
                <br />
                <span className="font-serif italic text-corail font-semibold">exclusifs</span>
              </h2>
            </div>
            <div className="space-y-3">
              {VIP_BONUSES.map((b) => (
                <div key={b.t} className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-corail/15 bg-rose/10 text-left">
                  <div>
                    <p className="font-medium text-sm text-noir mb-0.5">{b.t}*</p>
                    <p className="text-gris text-[13px] leading-relaxed">{b.d}</p>
                  </div>
                  <span className="shrink-0 text-corail text-xs font-semibold whitespace-nowrap">{b.save} économisés</span>
                </div>
              ))}
            </div>
            <p className="text-center text-gris/40 text-[11px] mt-5">
              * Offre soumise à conditions.{' '}
              <Link to="/cgv#offres-vip" className="underline hover:text-corail">Voir les CGV</Link>.
            </p>
          </div>
        </section>
      )}

      <section className="py-14 md:py-24 px-[5%] bg-white">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-on-scroll" data-anim="fade">
            <div className="section-badge justify-center">Ton parcours</div>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
              6 ÉTAPES VERS
              <br />
              <span className="font-serif italic text-corail font-semibold">ton autonomie</span>
            </h2>
          </div>

          {/* Timeline : pointillés au centre, pastilles au milieu de chaque carte. */}
          <ol className="relative">
            <span ref={spineRef} className="timeline-spine" aria-hidden>
              <span className="timeline-spine-track" />
              <span className="timeline-spine-fill" />
            </span>
            {steps.map((s, i) => {
              const onLeft = i % 2 === 0
              return (
                <li key={s.num} className="relative md:grid md:grid-cols-2 md:gap-0 mb-10 last:mb-0">
                  <span className="timeline-dot rounded-full bg-corail text-white flex items-center justify-center font-display font-black text-sm shadow-lg shadow-corail/20">
                    {s.num}
                  </span>
                  <article
                    className={`ml-14 md:ml-0 p-5 rounded-2xl border border-noir/8 bg-white animate-on-scroll ${
                      onLeft ? 'md:col-start-1 md:mr-12 md:text-right' : 'md:col-start-2 md:ml-12'
                    }`}
                    data-anim={onLeft ? 'left' : 'right'}
                    data-delay={i * 90}
                  >
                    <div className={`flex flex-wrap items-center gap-2 mb-1 ${onLeft ? 'md:justify-end' : ''}`}>
                      <h3 className="font-display font-black text-sm md:text-base tracking-tight">{s.title}</h3>
                      <span className="text-[10px] font-semibold text-corail bg-creme px-2 py-0.5 rounded-full">{s.tag}</span>
                    </div>
                    <p className="text-gris text-[13px] md:text-[14px] leading-relaxed">{s.desc}</p>
                    {s.detail && (
                      <p className="text-corail/80 text-[13px] md:text-[14px] font-serif italic mt-1.5">{s.detail}</p>
                    )}
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="py-14 md:py-20 px-[5%] bg-creme">
        <div className="max-w-[640px] mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-corail/10 text-corail mb-5">
            <Icon name="shield" size={28} />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black tracking-tight text-noir mb-3">Garantie YoGyFace</h2>
          <p className="text-gris text-[15px] leading-relaxed mb-3">
            Si après le programme, tes coachings, une pratique régulière et tes photos de suivi, tu ne vois aucune amélioration de ton bien-être ou de ta confiance :
          </p>
          <p className="text-noir font-display font-black text-lg">je te rembourse en totalité.*</p>
          <p className="text-center text-gris/40 text-[11px] mt-5">
            * Offre soumise à conditions.{' '}
            <Link to="/cgv#garantie" className="underline hover:text-corail">Voir les CGV</Link>.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 px-[5%] bg-white">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.2rem)] font-black tracking-tighter text-noir leading-tight mb-4">
              Des réponses
              <br />
              <span className="font-serif italic text-corail font-semibold">à tes questions</span>
            </h2>
            <p className="text-gris text-[14px] leading-relaxed">
              Une question ? Écris-moi à{' '}
              <a href="mailto:contact@yogyface.fr" className="font-semibold text-noir underline hover:text-corail">
                contact@yogyface.fr
              </a>
              . Plus de réponses aussi sur la{' '}
              <Link to="/faq" className="underline hover:text-corail">FAQ complète</Link>.
            </p>
          </div>
          <div>
            {SALE_FAQ.map((item) => (
              <details key={item.q} className="group border-b border-noir/10">
                <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-medium text-noir text-[15px] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-xl leading-none text-gris group-open:hidden">+</span>
                  <span className="shrink-0 text-xl leading-none text-gris hidden group-open:inline">−</span>
                </summary>
                <p className="pb-4 text-gris text-[14px] leading-relaxed">{item.a}</p>
              </details>
            ))}
            <div className="text-center mt-8">
              <PayCta
                {...pay}
                onceLabel={isVip ? 'Rejoindre l\'offre VIP — 299 €' : 'Rejoindre le programme'}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-[5%] bg-noir text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-corail/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-black tracking-tighter mb-4">
            {isVip ? 'CETTE OFFRE EST' : 'PRÊTE À COMMENCER ?'}
            {isVip && (
              <>
                <br />
                <span className="font-serif italic text-corail font-semibold">pour toi seule.</span>
              </>
            )}
          </h2>
          <p className="text-white/50 mb-6 text-[14px] md:text-[16px]">
            {isVip
              ? 'Avant-première + tarif VIP + bonus. Ça ne sera plus le cas au lancement public.'
              : 'L\'offre publique du nouveau YoGyFace — sans les bonus ni l\'accès anticipé de la liste.'}
          </p>
          {isVip && offer.once.price && (
            <p className="text-white mb-6">
              <span className="text-white/35 line-through mr-2">{offer.once.was} €</span>
              <span className="font-display font-black text-3xl">{offer.once.price} €</span>
              {offer.installments && (
                <span className="block text-white/40 text-sm mt-1">ou 3 × {offer.installments.amount} €</span>
              )}
            </p>
          )}
          <PayCta
            {...pay}
            dark
            onceLabel={isVip ? `Payer ${offer.once.price} € en 1 fois →` : 'Rejoindre le programme →'}
          />
          <p className="text-white/30 text-sm mt-6">
            Des questions ?{' '}
            <Link to="/faq" className="text-corail/80 font-semibold hover:underline">FAQ</Link>
            {' '}ou{' '}
            <Link to="/contact" className="text-corail/80 font-semibold hover:underline">écris-moi</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
