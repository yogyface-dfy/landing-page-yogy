import { Navigate, useSearchParams } from 'react-router-dom'

/**
 * Ancienne page empilée. /video-03 débloque déjà 1, 2 et 3.
 * On garde la query (lead, max, UTM).
 */
export default function FunnelVideosRedirect() {
  const [searchParams] = useSearchParams()
  const q = searchParams.toString()
  return <Navigate to={`/video-03${q ? `?${q}` : ''}`} replace />
}
