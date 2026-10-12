import { useEffect, useState } from 'react'
import { LIVE_LABEL, nextTuesdayLiveLabel } from '../lib/funnel'

/** Date live côté client — évite un mismatch SSG (build ≠ jour J). */
export default function FunnelLiveDate() {
  const [label, setLabel] = useState(LIVE_LABEL)
  useEffect(() => {
    setLabel(nextTuesdayLiveLabel())
  }, [])
  return label
}
