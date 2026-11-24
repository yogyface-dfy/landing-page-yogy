import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import FunnelPlayer from '../components/funnel-player'
import { FunnelCtaLink, FunnelLink, FunnelOpenBeacon } from '../components/funnel-track'
import SEO from '../components/SEO'
import {
  VIDEOS,
  WEBI_URL,
  WHATSAPP_GROUP,
  nextTuesdayLiveLabel,
  videoFromPath,
} from '../lib/funnel'
import { lessonHref, resolveLessonMax } from '../lib/lesson-progress'

function WaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function LessonMarquee({ n }) {
  const a = `Regarde la vidéo ${n} pour bien te préparer`
  const b =
    n < 3 ? 'Les prochaines vidéos arrivent bientôt' : 'Tu as les 3 vidéos. Rejoins le live'
  const loop = [a, b, a, b, a, b, a, b]
  return (
    <div
      className="sticky top-0 z-50 overflow-hidden bg-corail text-white shadow-[0_6px_18px_-10px_rgba(212,95,87,0.55)]"
      role="status"
      aria-label={a}
    >
      <div className="flex w-max animate-marquee-slow whitespace-nowrap py-3">
        {loop.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="inline-flex items-center gap-3 px-6 font-display text-[11.5px] font-bold uppercase tracking-[0.14em]"
          >
            <span aria-hidden className="inline-block size-1.5 shrink-0 rounded-full bg-white" />
            {text}
            <span aria-hidden className="text-white/50">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

function StepHead({ num, kicker, title, accent }) {
  return (
    <div className="mb-4 flex items-start gap-3 sm:gap-4">
      <span className="flex size-10 shrink-0 -rotate-[5deg] items-center justify-center rounded-[12px] bg-corail font-display text-[17px] font-black text-white shadow-[0_12px_22px_-12px_rgba(212,95,87,0.9)] sm:size-12 sm:rounded-[15px] sm:text-[22px]">
        {num}
      </span>
      <div className="min-w-0 text-left">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-corail">{kicker}</p>
        <h2 className="mt-1.5 font-display text-[clamp(1.45rem,4.8vw,2.1rem)] font-black leading-[1.02] tracking-tight text-noir">
          {title}{' '}
          <span className="font-serif text-[1.12em] font-semibold italic normal-case tracking-normal text-corail">
            {accent}
          </span>
        </h2>
      </div>
    </div>
  )
}

function VideoThumb({ video, locked, active, maxReached }) {
  const n = Number(video.slug)
  const body = (
    <>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest">Vidéo #{n}</p>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-noir">
        <img
          src={video.poster}
          alt=""
          className={`h-full w-full object-cover ${locked ? 'scale-105 blur-[3px]' : ''}`}
        />
      </div>
      <p
        className={`mt-1.5 text-center text-[11px] ${locked ? 'text-gris/50' : 'text-corail'}`}
      >
        {locked ? 'Bientôt' : video.shortTitle || 'Disponible'}
      </p>
    </>
  )
  if (locked) return <div className="text-center text-gris/60">{body}</div>
  // `?max=` porté pour pouvoir revenir (ex. 03 → 01 → 03).
  return (
    <FunnelLink
      to={lessonHref(video.path, maxReached)}
      className={`block text-center ${active ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
    >
      {body}
    </FunnelLink>
  )
}

export default function FunnelVideo() {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const current = videoFromPath(pathname)
  const idx = VIDEOS.findIndex((v) => v.slug === current.slug)
  const n = Number(current.slug)
  const page = `video-${current.slug}`
  const maxReached = resolveLessonMax(n, searchParams.get('max'))
  const liveLabel = useMemo(() => nextTuesdayLiveLabel(), [])

  return (
    <div className="min-h-screen bg-creme">
      <SEO
        title={`Vidéo ${current.slug}. ${current.shortTitle || current.title}`}
        description={current.summary || current.title}
        path={current.path}
        noindex
      />
      <FunnelOpenBeacon page={page} />
      <LessonMarquee n={n} />

      <header className="flex justify-center px-4 pb-0 pt-5">
        <img src="/logo-yogyface-dark.png" alt="Yogyface" height={32} width={144} />
      </header>

      <main>
        <section className="relative isolate overflow-x-clip px-4 pb-4 pt-4 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-140px] z-[-1] h-[720px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(50%_46%_at_50%_38%,rgba(255,205,205,0.75),transparent_70%),radial-gradient(22%_26%_at_80%_34%,rgba(230,114,106,0.15),transparent_70%),radial-gradient(20%_24%_at_19%_56%,rgba(230,147,106,0.12),transparent_70%)]"
          />

          <p className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-corail/50 bg-corail/10 px-4 py-2 text-[12px] font-bold text-[#D45F57] shadow-[0_0_0_4px_rgba(230,114,106,0.08),0_10px_26px_-14px_rgba(230,114,106,0.5)] sm:text-[13.5px]">
            <span aria-hidden className="size-1.5 rounded-full bg-corail" />
            <span>
              Vidéo {n} sur {VIDEOS.length}
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-corail/40 min-[400px]:inline-block" />
            <span className="font-semibold text-noir">{liveLabel}</span>
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.2rem,7.5vw,3.4rem)] font-black leading-[0.92] tracking-[-0.03em] text-noir">
            Vidéo {n}
            <em className="mt-[0.08em] block font-serif text-[1.08em] font-semibold not-italic normal-case tracking-normal text-corail">
              {current.shortTitle || current.title}
            </em>
          </h1>

          <p className="mx-auto mt-3 max-w-[560px] text-[15.5px] leading-relaxed text-gris sm:text-[16.5px]">
            {current.summary || current.title}
          </p>

          <div className="relative mx-auto mt-7 w-full max-w-[640px]">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 -top-4 z-10 rotate-12 text-3xl text-corail sm:-top-5 sm:text-4xl"
            >
              ✦
            </span>
            <div className="overflow-hidden rounded-[28px] bg-noir/[0.04] p-1.5 shadow-[0_28px_56px_-24px_rgba(230,114,106,0.4),0_0_0_1px_rgba(26,26,26,0.06)] ring-1 ring-noir/10">
              <div className="overflow-hidden rounded-[22px]">
                <FunnelPlayer
                  src={current.src}
                  title={current.title}
                  poster={current.poster}
                  trackPage={page}
                  className="aspect-video rounded-none"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-[740px] flex-col gap-12 px-4 pb-8 pt-10 sm:gap-14">
          {/* Étape 2 — Espace perso / appli (avant WhatsApp) */}
          <section aria-labelledby="espace-lesson-title">
            <StepHead
              num={2}
              kicker="Après la vidéo"
              title="Connecte-toi à ton"
              accent="espace perso."
            />
            <p className="mb-4 max-w-[540px] text-left text-[15.5px] leading-relaxed text-gris">
              Prépare l&apos;atelier, découvre des exos en avant-première, et gagne des cadeaux.
            </p>
            <div className="relative isolate overflow-hidden rounded-[30px] bg-noir px-4 py-5 text-white sm:px-6 sm:py-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-28 -top-36 z-[-1] size-[460px] rounded-full bg-[radial-gradient(circle,rgba(230,114,106,0.55),transparent_68%)]"
              />
              <FunnelCtaLink
                page={page}
                event="cta"
                href={WEBI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex min-h-[56px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-corail px-6 text-[15.5px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(212,95,87,0.7)] transition hover:-translate-y-0.5 hover:bg-[#D45F57]"
              >
                Mon espace perso
              </FunnelCtaLink>
            </div>
          </section>

          {/* Étape 3 — WhatsApp */}
          <section aria-labelledby="wa-lesson-title">
            <StepHead
              num={3}
              kicker="Étape 3 sur 3"
              title="Rejoins le groupe"
              accent="WhatsApp VIP."
            />
            <div className="relative isolate overflow-hidden rounded-[30px] bg-noir px-4 py-5 text-white sm:px-6 sm:py-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-28 -top-36 z-[-1] size-[460px] rounded-full bg-[radial-gradient(circle,rgba(230,114,106,0.55),transparent_68%)]"
              />
              <FunnelCtaLink
                page={page}
                event="whatsapp"
                href={WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex min-h-[56px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#25D366] px-6 text-[15.5px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,0.7)] transition hover:-translate-y-0.5 hover:bg-[#20bd5b]"
              >
                <WaIcon />
                Rejoindre le WhatsApp VIP
              </FunnelCtaLink>
            </div>
          </section>

          {/* Nav autres vidéos */}
          <ol className="grid grid-cols-3 gap-3 sm:gap-4">
            {VIDEOS.map((v) => {
              const num = Number(v.slug)
              return (
                <li key={v.slug}>
                  <VideoThumb
                    video={v}
                    locked={num > maxReached}
                    active={v.slug === current.slug}
                    maxReached={maxReached}
                  />
                </li>
              )
            })}
          </ol>
          {maxReached < VIDEOS.length && idx < VIDEOS.length - 1 ? (
            <p className="-mt-6 text-center text-sm text-gris">
              Demain je t&apos;envoie la prochaine vidéo
            </p>
          ) : null}
        </div>
      </main>
    </div>
  )
}
