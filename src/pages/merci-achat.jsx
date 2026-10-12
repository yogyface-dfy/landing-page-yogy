import { Navigate, useSearchParams } from 'react-router-dom'

/** Ancienne URL Stripe / emails — redirige vers le tunnel. */
export default function MerciAchat() {
  const [searchParams] = useSearchParams()
  const q = searchParams.toString()
  return (
    <Navigate
      to={`/confirmation-achat-bienvenue${q ? `?${q}` : ''}`}
      replace
    />
  )
}
