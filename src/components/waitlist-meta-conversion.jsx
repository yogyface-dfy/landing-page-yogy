import { useEffect } from 'react'
import { consumeWaitlistConversion, fireWaitlistConversion } from '../lib/meta-pixel'

/** Fire optInWaitingList une seule fois après une vraie inscription. */
export default function WaitlistMetaConversion() {
  useEffect(() => {
    const payload = consumeWaitlistConversion()
    if (payload) fireWaitlistConversion(payload)
  }, [])
  return null
}
