import { Link, useSearchParams } from 'react-router-dom'
import { FUNNEL_FROM, legalTo } from '../lib/funnel'

/** Lien légal : garde ?from=funnel pour ne pas sortir du tunnel. */
export function FunnelLegalLink({ to, children, className }) {
  const [params] = useSearchParams()
  const fromFunnel = params.get('from') === FUNNEL_FROM
  return (
    <Link to={legalTo(to, fromFunnel)} className={className}>
      {children}
    </Link>
  )
}

export function FunnelLegalBack() {
  const [params] = useSearchParams()
  if (params.get('from') !== FUNNEL_FROM) return null
  return (
    <p className="mb-8">
      <Link
        to="/atelier-gratuit"
        className="text-sm font-medium text-corail hover:underline"
      >
        ← Retour à l'atelier
      </Link>
    </p>
  )
}