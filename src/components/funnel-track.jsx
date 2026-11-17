import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { withLeadQuery } from '../lib/lead-query'
import { leadFromWindow, sendFunnelTrack } from '../lib/funnel-track'

/** Beacon open (1× au mount). */
export function FunnelOpenBeacon({ page, lead }) {
  useEffect(() => {
    if (!page) return
    sendFunnelTrack({ page, event: 'open', lead: lead || leadFromWindow() })
  }, [page, lead])
  return null
}

/** Link interne qui reprend les query de l’URL courante (+ lead session). */
export function FunnelLink({ to, children, className, ...rest }) {
  const { search } = useLocation()
  const dest = useMemo(
    () => withLeadQuery(to, leadFromWindow(), search),
    [to, search],
  )
  return (
    <Link to={dest} className={className} {...rest}>
      {children}
    </Link>
  )
}

/**
 * Lien CTA tracké (event `cta` ou `whatsapp`).
 * `to` = react-router ; `href` = externe (query portées si yogyface.fr).
 */
export function FunnelCtaLink({
  page,
  event = 'cta',
  lead,
  to,
  href,
  children,
  className,
  target,
  rel,
  ...rest
}) {
  const { search } = useLocation()
  const onClick = () => {
    sendFunnelTrack({ page, event, lead: lead || leadFromWindow() })
  }

  if (to) {
    const dest = withLeadQuery(to, lead || leadFromWindow(), search)
    return (
      <Link to={dest} onClick={onClick} className={className} {...rest}>
        {children}
      </Link>
    )
  }

  const destHref = carryExternalHref(href, lead, search)
  return (
    <a
      href={destHref}
      onClick={onClick}
      className={className}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Porte les query sur les domaines yogyface ; laisse WhatsApp / externes tels quels. */
function carryExternalHref(href, lead, search) {
  if (!href) return href
  try {
    const u = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'https://yogyface.fr')
    if (!u.hostname.endsWith('yogyface.fr')) return href
    // Short WhatsApp : ne pas polluer le shortener.
    if (u.pathname.includes('whatsapp')) return href
    return withLeadQuery(href, lead || leadFromWindow(), search)
  } catch {
    return href
  }
}
