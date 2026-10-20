import { Link, useLocation } from 'react-router-dom'
import { isFunnelChrome } from '../lib/funnel'
import { STUDIO_SALES_OPEN, VIP_SALES_OPEN } from '../lib/stripe-offers'

const HOME_ITEMS = [
  'Rentrée YoGyFace',
  'Lancement nouveau programme',
  "Inscription liste d'attente",
]

const VIP_ITEMS = VIP_SALES_OPEN
  ? ['Ouverture VIP', 'Prix à durée limitée', 'Bonus à durée limitée']
  : STUDIO_SALES_OPEN
    ? ['Ventes VIP fermées', 'Offre Studio ouverte']
    : ['Ventes VIP fermées']

const PUBLIC_ITEMS = STUDIO_SALES_OPEN
  ? ['Ouverture Studio', 'Programme YoGyFace']
  : ['Ventes fermées']

/** Assez de cycles pour remplir un écran ultra-wide sans trous. */
const CYCLES = 6

/** Merci, liste d'attente, tunnel upsell. /vente et /vente-vip ont leur ticker. */
const HIDE = [
  '/liste-attente',
  '/merci-liste-attente',
  '/merci-achat',
  '/installer-app',
  '/vente-upsell',
  '/vente-10x',
]

export function shouldShowLaunchBanner(pathname, search = '') {
  return !HIDE.includes(pathname) && !isFunnelChrome(pathname, search)
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

/** Bandeau ticker, home → liste d'attente ; vente ouverte → ancre offre ; fermée → accueil. */
export default function LaunchBanner() {
  const { pathname } = useLocation()
  const vip = pathname === '/vente-vip'
  const vente = pathname === '/vente' || pathname === '/vente-6x'
  const items = vip ? VIP_ITEMS : vente ? PUBLIC_ITEMS : HOME_ITEMS
  const vipClosed = vip && !VIP_SALES_OPEN
  const studioClosed = vente && !STUDIO_SALES_OPEN
  const salesClosed = vipClosed || studioClosed
  const toOffer = (vip && VIP_SALES_OPEN) || (vente && STUDIO_SALES_OPEN)
  const href = salesClosed
    ? vipClosed && STUDIO_SALES_OPEN
      ? '/vente'
      : '/'
    : toOffer
      ? '#offre'
      : '/liste-attente'

  return (
    <Link
      to={href}
      aria-label={
        vipClosed
          ? STUDIO_SALES_OPEN
            ? 'Ventes VIP fermées, voir l’offre Studio'
            : 'Ventes VIP fermées'
          : studioClosed
            ? 'Ventes Studio fermées'
            : vip
              ? 'Ouverture VIP, tarif et bonus à durée limitée'
              : vente
                ? 'YoGyFace Studio, programme'
                : "Rentrée YoGyFace, lancement du nouveau programme. Rejoindre la liste d'attente."
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
