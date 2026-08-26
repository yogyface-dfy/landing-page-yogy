import { Link } from 'react-router-dom'

const ITEMS = [
  'Rentrée YoGyFace',
  'Lancement nouveau programme',
  "Inscription liste d'attente",
]

/** Assez de cycles pour remplir un écran ultra-wide sans trous. */
const CYCLES = 6

/** Hors tunnel vente + page merci (déjà inscrite). */
const HIDE = ['/merci-liste-attente', '/merci-achat', '/vente', '/vente-vip', '/vente-upsell', '/vente-upsell-test']

export function shouldShowLaunchBanner(pathname) {
  return !HIDE.includes(pathname)
}

/** Une bande compacte : items collés, répétés, pr-6 = même espace entre les 2 tracks. */
function Track() {
  return (
    <span className="inline-flex shrink-0 items-center gap-6 pr-6">
      {Array.from({ length: CYCLES }, (_, cycle) =>
        ITEMS.map((item) => (
          <span key={`${cycle}-${item}`} className="inline-flex items-center gap-6">
            <span>{item}</span>
            <span className="w-1 h-1 rounded-full bg-corail shrink-0" aria-hidden />
          </span>
        ))
      )}
    </span>
  )
}

/** Bandeau rentrée — ticker pleine largeur, lien vers /liste-attente. */
export default function LaunchBanner() {
  return (
    <Link
      to="/liste-attente"
      aria-label="Rentrée YoGyFace — lancement du nouveau programme. Rejoindre la liste d'attente."
      className="fixed top-0 left-0 right-0 z-[51] h-8 w-full bg-noir text-white flex items-center overflow-hidden hover:bg-[#111] transition-colors"
    >
      <span className="flex animate-marquee-slow-reverse whitespace-nowrap font-display font-bold text-[11px] uppercase tracking-[0.22em] motion-reduce:animate-none hover:[animation-play-state:paused]">
        <Track />
        <Track />
      </span>
    </Link>
  )
}
