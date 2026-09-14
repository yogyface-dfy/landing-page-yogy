import { Link, useLocation } from 'react-router-dom'

const HOME_ITEMS = [
  'Rentrée YoGyFace',
  'Lancement nouveau programme',
  "Inscription liste d'attente",
]

const VIP_ITEMS = [
  'Ouverture VIP',
  'Prix à durée limitée',
  'Bonus à durée limitée',
]

const PUBLIC_ITEMS = [
  'Ouverture Studio',
  '50 places max',
  "Jusqu'au 18 septembre",
]

/** Assez de cycles pour remplir un écran ultra-wide sans trous. */
const CYCLES = 6

/** Merci, liste d'attente, tunnel upsell. /vente et /vente-vip ont leur ticker. */
const HIDE = [
  '/liste-attente',
  '/merci-liste-attente',
  '/merci-achat',
  '/vente-upsell',
  '/vente-upsell-test',
]

export function shouldShowLaunchBanner(pathname) {
  return !HIDE.includes(pathname)
}

/** Une bande compacte : items collés, répétés, pr-6 = même espace entre les 2 tracks. */
function Track({ items }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-6 pr-6">
      {Array.from({ length: CYCLES }, (_, cycle) =>
        items.map((item) => (
          <span key={`${cycle}-${item}`} className="inline-flex items-center gap-6">
            <span>{item}</span>
            <span className="w-1 h-1 rounded-full bg-corail shrink-0" aria-hidden />
          </span>
        ))
      )}
    </span>
  )
}

/** Bandeau ticker — home → liste d'attente ; vente / VIP → ancre offre. */
export default function LaunchBanner() {
  const { pathname } = useLocation()
  const vip = pathname === '/vente-vip'
  const vente = pathname === '/vente'
  const items = vip ? VIP_ITEMS : vente ? PUBLIC_ITEMS : HOME_ITEMS
  const toOffer = vip || vente

  return (
    <Link
      to={toOffer ? '#offre' : '/liste-attente'}
      aria-label={
        vip
          ? 'Ouverture VIP — tarif et bonus à durée limitée'
          : vente
            ? 'YoGyFace Studio — 50 places jusqu’au 18 septembre'
            : "Rentrée YoGyFace — lancement du nouveau programme. Rejoindre la liste d'attente."
      }
      className="fixed top-0 left-0 right-0 z-[51] h-8 w-full bg-noir text-white flex items-center overflow-hidden hover:bg-[#111] transition-colors"
    >
      <span className="flex animate-marquee-slow-reverse whitespace-nowrap font-display font-bold text-[11px] uppercase tracking-[0.22em] motion-reduce:animate-none hover:[animation-play-state:paused]">
        <Track items={items} />
        <Track items={items} />
      </span>
    </Link>
  )
}
