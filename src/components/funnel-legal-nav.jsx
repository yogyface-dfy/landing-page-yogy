import { useNavigate, useSearchParams } from 'react-router-dom'
import { FunnelLink } from './funnel-track'
import { FUNNEL_FROM, legalTo } from '../lib/funnel'

/** Lien légal : garde ?from=funnel + query lead. */
export function FunnelLegalLink({ to, children, className }) {
  const [params] = useSearchParams()
  const fromFunnel = params.get('from') === FUNNEL_FROM
  return (
    <FunnelLink to={legalTo(to, fromFunnel)} className={className}>
      {children}
    </FunnelLink>
  )
}

/** Retour vers la page précédente (atelier, vente, etc.). */
export function FunnelLegalBack() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  if (params.get('from') !== FUNNEL_FROM) return null
  return (
    <p className="mb-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm font-medium text-corail hover:underline"
      >
        ← Retour
      </button>
    </p>
  )
}
