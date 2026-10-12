import { Link } from 'react-router-dom'
import { legalTo } from '../lib/funnel'

/** Footer tunnel : 3 pages légales, ?from=funnel pour rester hors nav site. */
export default function FunnelFooter() {
  return (
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
  )
}
