import { Link } from 'react-router-dom'

const ITEMS = [
  'Rentrée YoGyFace',
  'Lancement nouveau programme',
  "Inscription liste d'attente",
]

/** Hors tunnel vente + page merci (déjà inscrite). */
const HIDE = ['/merci-liste-attente', '/vente', '/vente-vip']

export function shouldShowLaunchBanner(pathname) {
  return !HIDE.includes(pathname)
}

/** Une bande = 100vw, pour que le noir soit rempli bord à bord. */
function Track() {
  return (
    <span className="inline-flex min-w-[100vw] shrink-0 items-center justify-evenly">
      {ITEMS.map((item) => (
        <span key={item} className="inline-flex items-center gap-5">
          <span>{item}</span>
          <span className="w-1 h-1 rounded-full bg-corail shrink-0" aria-hidden />
        </span>
      ))}
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
