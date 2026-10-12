import { Link, useLocation } from 'react-router-dom'
import FunnelFooter from '../components/funnel-footer'
import FunnelLiveDate from '../components/funnel-live-date'
import FunnelPlayer, { FunnelYoutube } from '../components/funnel-player'
import SEO from '../components/SEO'
import {
  GIFTS,
  YOUTUBE_LAURY,
  giftFromPath,
  giftUnlockLevel,
} from '../lib/funnel'

function GiftBody({ gift }) {
  if (gift.kind === 'video') {
    return <FunnelPlayer src={gift.src} title={gift.title} />
  }

  if (gift.kind === 'ebook') {
    return (
      <div className="text-center">
        <a href={gift.href} target="_blank" rel="noopener noreferrer">
          <img
            src={gift.cover}
            alt={gift.title}
            className="mx-auto mb-5 w-full max-w-[420px] rounded-2xl shadow-lg"
          />
        </a>
        <a
          href={gift.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-corail inline-flex text-sm px-8 py-3.5"
        >
          Clique pour accéder à l'EBOOK
        </a>
      </div>
    )
  }

  return (
    <div>
      <p className="text-gris text-[15px] leading-relaxed text-center mb-5">
        {gift.subtitle}
      </p>
      <FunnelYoutube id={gift.youtubeId} start={gift.youtubeStart} title={gift.subtitle} />
      <div className="text-center mt-5">
        <a
          href={YOUTUBE_LAURY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex text-sm px-8 py-3.5"
        >
          Suivre la page YouTube de Laury
        </a>
      </div>
    </div>
  )
}

function GiftNav({ unlocked, current }) {
  return (
    <div className="mt-12">
      <p className="text-center text-sm text-gris mb-5">
        Clique sur les miniatures pour accéder aux autres cadeaux
      </p>
      <ul className="grid grid-cols-3 gap-3">
        {GIFTS.map((g) => {
          const open = g.n <= unlocked
          const active = g.path === current
          const card = (
            <>
              <img
                src={g.thumb}
                alt=""
                className={`w-full aspect-square object-cover rounded-xl ${
                  open ? '' : 'opacity-45 grayscale'
                }`}
              />
              <p className="mt-2 text-[12px] font-semibold text-noir">Cadeau #{g.n}</p>
              <p
                className={`text-[11px] uppercase tracking-wider ${
                  open ? 'text-corail' : 'text-gris/50'
                }`}
              >
                {open ? 'Disponible' : 'Bientôt'}
              </p>
            </>
          )
          return (
            <li key={g.n}>
              {open ? (
                <Link
                  to={g.path}
                  className={`block rounded-2xl border p-2 text-center ${
                    active ? 'border-corail bg-corail/8' : 'border-noir/8 bg-white'
                  }`}
                >
                  {card}
                </Link>
              ) : (
                <div className="block rounded-2xl border border-noir/8 bg-white/60 p-2 text-center">
                  {card}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function FunnelCadeau() {
  const { pathname } = useLocation()
  const all = pathname === '/cadeaux-123'
  const gift = giftFromPath(pathname)
  const unlocked = giftUnlockLevel(pathname)

  return (
    <>
      <SEO
        title={all ? 'Tes 3 cadeaux' : `Cadeau ${gift.n} — ${gift.title}`}
        description={
          all
            ? 'Routine skincare, ebook médecine chinoise et podcast.'
            : gift.subtitle || gift.title
        }
        path={pathname}
        noindex
      />

      <section className="relative pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir text-white text-[11px] font-semibold uppercase tracking-widest mb-4">
              Coaching live · <FunnelLiveDate />
            </div>
            {all ? (
              <h1 className="font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-black leading-[1] tracking-tighter text-noir">
                Tes 3 cadeaux
              </h1>
            ) : (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-corail mb-2">
                  Cadeau {gift.n}
                </p>
                <h1 className="font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-black leading-[1] tracking-tighter text-noir">
                  {gift.title}
                </h1>
              </>
            )}
          </div>

          {all ? (
            <div className="grid gap-14">
              {GIFTS.map((g) => (
                <article key={g.n}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-corail mb-2 text-center">
                    Cadeau {g.n}
                  </p>
                  <h2 className="font-display text-[clamp(1.25rem,3vw,1.7rem)] font-black leading-tight tracking-tight text-noir text-center mb-5">
                    {g.title}
                  </h2>
                  <GiftBody gift={g} />
                </article>
              ))}
            </div>
          ) : (
            <>
              <GiftBody gift={gift} />
              <GiftNav unlocked={unlocked} current={pathname} />
            </>
          )}
        </div>
      </section>

      <FunnelFooter />
    </>
  )
}
