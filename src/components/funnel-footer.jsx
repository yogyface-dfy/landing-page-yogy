import { FunnelLink } from './funnel-track'
import { legalTo } from '../lib/funnel'

/** Footer tunnel : 3 pages légales, ?from=funnel + query lead. */
export default function FunnelFooter() {
  return (
    <footer className="bg-noir text-white/50 text-[11px] py-6 px-[5%]">
      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        <FunnelLink to={legalTo('/mentions-legales', true)} className="hover:text-white">
          Mentions légales
        </FunnelLink>
        <FunnelLink to={legalTo('/confidentialite', true)} className="hover:text-white">
          Confidentialité
        </FunnelLink>
        <FunnelLink to={legalTo('/cgv', true)} className="hover:text-white">
          CGV
        </FunnelLink>
      </nav>
    </footer>
  )
}
