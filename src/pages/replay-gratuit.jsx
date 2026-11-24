import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FunnelFooter from '../components/funnel-footer'
import FunnelPlayer, { FunnelYoutube } from '../components/funnel-player'
import { FunnelCtaLink, FunnelOpenBeacon } from '../components/funnel-track'
import SEO from '../components/SEO'
import { COMPUTER_REMINDER } from '../lib/funnel'

const PAGE = 'replay-gratuit'

/** YouTube ou MP4 via /api/replay (short link go.yogyface.fr/replay-yt). */
function useReplayMedia() {
  const [media, setMedia] = useState({ id: '', src: '' })
  useEffect(() => {
    let cancelled = false
    fetch('/api/replay')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setMedia({ id: data?.id || '', src: data?.src || '' })
      })
      .catch((err) => console.error('replay:', err))
    return () => {
      cancelled = true
    }
  }, [])
  return media
}

export default function ReplayGratuit() {
  const { id: youtubeId, src: mp4Src } = useReplayMedia()
  const [searchParams] = useSearchParams()
  const [day, setDay] = useState('')
  // day seulement s'il est dans l'URL. Pas de date inventée au premier rendu SSG.
  useEffect(() => {
    setDay((searchParams.get('day') || '').trim().slice(0, 80))
  }, [searchParams])

  return (
    <>
      <SEO
        title="Replay gratuit. Atelier YoGyFace"
        description="Replay à durée limitée. Reprends le contrôle sur ton vieillissement cutané, sans crème miracle ni chirurgie."
        path="/replay-gratuit"
        noindex
      />
      <FunnelOpenBeacon page={PAGE} />

      <section className="relative min-h-[80vh] pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corail/8 text-corail text-xs font-semibold mb-5">
              Replay à durée limitée
            </div>
            <h1 className="font-display text-[clamp(1.85rem,6vw,3.4rem)] font-black leading-[0.95] tracking-tighter text-noir">
              REPRENDS LE CONTRÔLE
            </h1>
            <p className="font-serif italic text-corail font-semibold text-[clamp(1.6rem,4.5vw,2.4rem)] leading-none tracking-normal mt-2 mb-4">
              de ton vieillissement.
            </p>
            <p className="text-gris text-[15px] leading-relaxed max-w-xl mx-auto">
              Sans crème miracle. Sans chirurgie. En 8 minutes par jour.
            </p>
            {day ? (
              <p className="mt-3 text-[14px] font-semibold text-noir">Atelier du {day}</p>
            ) : null}
            <p className="mt-3 text-[14px] leading-relaxed text-noir">{COMPUTER_REMINDER}</p>
          </div>

          {mp4Src ? (
            <FunnelPlayer src={mp4Src} title="Replay de l'atelier" trackPage={PAGE} />
          ) : (
            <FunnelYoutube id={youtubeId} title="Replay de l'atelier" />
          )}

          <div className="text-center mt-8">
            <FunnelCtaLink
              page={PAGE}
              event="cta"
              to="/vente"
              className="btn-corail inline-flex text-sm md:text-base px-8 py-3.5"
            >
              Rejoindre le programme
            </FunnelCtaLink>
          </div>
        </div>
      </section>

      <FunnelFooter />
    </>
  )
}
