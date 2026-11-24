import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FunnelCtaLink, FunnelLink, FunnelOpenBeacon } from '../components/funnel-track'
import SEO from '../components/SEO'
import {
  CONFIRM_JEANNE_PHOTO,
  CONFIRM_QUIZ_URL,
  CONFIRM_VIDEO_DURATION,
  CONFIRM_VIDEO_POSTER,
  CONFIRM_VIDEO_SRC,
  COMPUTER_REMINDER,
  WHATSAPP_GROUP,
  legalTo,
} from '../lib/funnel'
import { leadFromSearchParams, sendFunnelTrack } from '../lib/funnel-track'
import '../styles/confirmation-inscription.css'

const PAGE = 'confirmation-optin'

const MQ = [
  { type: 'dot', text: "Attention, ton inscription n'est pas terminée" },
  { type: 'star', text: 'Plus que 3 étapes pour valider ta place' },
]

const QUIZ_OPTS = ['Moins de 35 ans', '35 à 44 ans', '45 à 54 ans', '55 ans et plus']

const PERKS = [
  { e: '🎁', t: "Cadeaux avant l'atelier" },
  { e: '💬', t: 'Questions-réponses' },
  { e: '👭', t: 'Communauté de femmes' },
]

function WaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

/** VSL étape 1 — chrome HTML + watch Airtable. */
function ConfirmVsl({ trackPage }) {
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  const lastSentPct = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !trackPage || !active) return
    const report = (force = false) => {
      const duration = el.duration
      if (!Number.isFinite(duration) || duration <= 0) return
      const sec = el.currentTime || 0
      let pct = Math.round((sec / duration) * 100)
      if (pct > 100) pct = 100
      if (!force && pct < lastSentPct.current + 25) return
      lastSentPct.current = Math.max(lastSentPct.current, pct)
      sendFunnelTrack({
        page: trackPage,
        event: 'watch',
        watchPct: pct,
        watchSec: Math.round(sec),
      })
    }
    const onTimeUpdate = () => report(false)
    const onPause = () => report(true)
    const onEnded = () => {
      lastSentPct.current = 100
      sendFunnelTrack({
        page: trackPage,
        event: 'watch',
        watchPct: 100,
        watchSec: Math.round(el.duration || el.currentTime || 0),
      })
    }
    const onHide = () => report(true)
    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnded)
    window.addEventListener('pagehide', onHide)
    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnded)
      window.removeEventListener('pagehide', onHide)
    }
  }, [trackPage, active])

  return (
    <div className="vsl" id="etape-1">
      <div className="video">
        {active ? (
          <video
            ref={ref}
            src={CONFIRM_VIDEO_SRC}
            poster={CONFIRM_VIDEO_POSTER}
            controls
            playsInline
            autoPlay
          />
        ) : (
          <button
            type="button"
            className="v-btn"
            aria-label="Lire la vidéo : prépare l'atelier"
            onClick={() => setActive(true)}
          >
            <img src={CONFIRM_VIDEO_POSTER} alt="" />
            <span className="v-shade" />
            <span className="v-chip">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Étape 1 · {CONFIRM_VIDEO_DURATION}
            </span>
            <span className="v-play">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="v-cap">Laury te prépare à l&apos;atelier</span>
          </button>
        )}
      </div>
    </div>
  )
}

/** Custom One saute le contact si name + email + phone (+ bypass). */
function buildQuizSrc(quizUrl, lead, search) {
  if (!quizUrl) return ''
  try {
    const u = new URL(quizUrl)
    const name = lead.firstName || ''
    const email = lead.email || ''
    const phone = lead.phone || ''
    if (name) {
      u.searchParams.set('name', name)
      u.searchParams.set('firstname', name)
    }
    if (email) u.searchParams.set('email', email)
    if (phone) u.searchParams.set('phone', phone)
    const cur = new URLSearchParams(search)
    for (const [k, v] of cur) {
      if (k.startsWith('utm_') && v) u.searchParams.set(k, v)
    }
    // Bypass contact uniquement quand les 3 champs sont là.
    if (name && email && phone) u.searchParams.set('bypass', '1')
    return u.toString()
  } catch {
    return ''
  }
}

function QuizSlot({ src }) {
  const [picked, setPicked] = useState(-1)
  const iframeRef = useRef(null)
  // Custom One peut ajuster via postMessage.
  const [height, setHeight] = useState(720)

  // Custom One / embed peut poster la hauteur utile.
  useEffect(() => {
    if (!src) return
    const onMsg = (e) => {
      const data = e?.data
      if (!data || typeof data !== 'object') return
      const h =
        Number(data.height) ||
        Number(data.frameHeight) ||
        Number(data?.payload?.height) ||
        0
      if (h >= 400 && h <= 4000) setHeight(Math.ceil(h))
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [src])

  if (src) {
    return (
      <iframe
        ref={iframeRef}
        className="quiz-frame"
        src={src}
        title="Questionnaire Yogy Face"
        loading="eager"
        allow="autoplay; fullscreen; clipboard-write"
        style={{ height: `${height}px` }}
      />
    )
  }
  return (
    <div className="quiz-mock">
      <p className="qm-q">Pour commencer, tu as quel âge ?</p>
      <span className="qm-bar" />
      <div className="qm-opts">
        {QUIZ_OPTS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={picked === i ? 'on' : undefined}
            onClick={() => setPicked(i)}
          >
            {label}
            <span className="ck" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function MarqueeGroup() {
  const items = [...MQ, ...MQ]
  return (
    <div className="mq-group">
      {items.map((it, i) => (
        <span className="mq-item" key={`${it.text}-${i}`}>
          {it.type === 'dot' ? (
            <span className="mq-dot" />
          ) : (
            <span className="mq-star">✦</span>
          )}
          <span className="txt">{it.text}</span>
        </span>
      ))}
    </div>
  )
}

export default function ConfirmationInscription() {
  const { search } = useLocation()
  const lead = useMemo(() => leadFromSearchParams(new URLSearchParams(search)), [search])
  const firstName = lead.firstName
    ? lead.firstName.split(' ')[0].charAt(0).toUpperCase() +
      lead.firstName.split(' ')[0].slice(1).toLowerCase()
    : ''
  const quizSrc = useMemo(
    () => buildQuizSrc(CONFIRM_QUIZ_URL, lead, search),
    [lead, search],
  )

  return (
    <div className="confirm-page is-js">
      <SEO
        title="Inscription confirmée. Atelier"
        description="Ta place est presque validée. Regarde la vidéo, rejoins le WhatsApp VIP, découvre ton profil visage."
        path="/confirmation-inscription"
        noindex
      />
      <FunnelOpenBeacon page={PAGE} lead={lead} />

      <div className="marquee" role="status" aria-label="Attention, ton inscription n'est pas terminée">
        <div className="marquee-track" aria-hidden="true">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>

      <header className="top">
        <img src="/logo-yogyface-dark.png" alt="Yogyface" height={32} width={144} />
      </header>

      <main>
        <section className="hero">
          <span className="pill">
            <span className="warn" aria-hidden="true">
              ⚠️
            </span>
            <span>Inscription pas terminée</span>
            <span className="sep" />
            <span className="muted">3 étapes restantes</span>
            <span className="warn warn-2" aria-hidden="true">
              ⚠️
            </span>
          </span>
          <h1>
            Ta place est<em>presque validée.</em>
          </h1>
          <p className="lead">
            {firstName ? <span className="lead-name">{firstName}, </span> : null}
            <span className="lead-verb">{firstName ? 'regarde' : 'Regarde'}</span> la vidéo de
            Laury, puis valide les 2 étapes juste en dessous.
          </p>
          <ConfirmVsl trackPage={PAGE} />
        </section>

        <div className="steps">
          <section className="step" id="etape-2">
            <div className="step-head">
              <span className="step-num">2</span>
              <div>
                <p className="kicker">Étape 2 sur 3</p>
                <h2>
                  Rejoins le groupe <em>WhatsApp VIP.</em>
                </h2>
                <p className="step-sub">C&apos;est là que tout se passe avant l&apos;atelier.</p>
                <p className="step-sub">{COMPUTER_REMINDER}</p>
              </div>
            </div>
            <div className="vip">
              <ul className="perks">
                {PERKS.map((p) => (
                  <li key={p.t}>
                    <span className="e" aria-hidden="true">
                      {p.e}
                    </span>
                    {p.t}
                  </li>
                ))}
              </ul>
              <FunnelCtaLink
                page={PAGE}
                event="whatsapp"
                lead={lead}
                href={WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                <WaIcon />
                Rejoindre le WhatsApp VIP
              </FunnelCtaLink>

              <div className="jeanne" role="note" aria-label="Message de Jeanne, assistante de Laury">
                <div className="jn-avatar">
                  <img className="ph" src={CONFIRM_JEANNE_PHOTO} alt="Jeanne" width={48} height={48} />
                  <span className="online" aria-hidden="true" />
                </div>
                <div className="jn-body">
                  <div className="jn-top">
                    <span className="jn-name">Jeanne</span>
                    <span className="jn-role">Assistante de Laury</span>
                  </div>
                  <div className="jn-msg">
                    <span className="jn-typing" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <p className="jn-text">
                      <strong>Confirme ta présence à Jeanne</strong>
                      <br />
                      Elle te contactera sur WhatsApp, une dernière étape pour
                      valider ta participation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="step" id="etape-3">
            <div className="step-head">
              <span className="step-num">3</span>
              <div>
                <p className="kicker">Étape 3 sur 3</p>
                <h2>
                  Découvre ton <em>profil visage.</em>
                </h2>
                <p className="step-sub">
                  Dernière étape, quelques questions rapides sur ton visage. Tes réponses aident
                  Laury à préparer l&apos;atelier, et toi tu repars avec ton profil personnalisé.
                </p>
              </div>
            </div>
            <div className={`quiz${quizSrc ? ' quiz--embed' : ''}`}>
              {/* Barre locale seulement si mock (l’embed Custom One a déjà son chrome). */}
              {!quizSrc ? (
                <div className="quiz-bar">
                  <span className="l">
                    <span className="live" />
                    Ton profil visage
                  </span>
                  <span className="conf">
                    <span className="peek" aria-hidden="true">
                      👀
                    </span>
                    <span className="r">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      Confidentiel
                    </span>
                  </span>
                </div>
              ) : null}
              <div id="quizSlot">
                <QuizSlot src={quizSrc} />
              </div>
            </div>
            <p className="note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              Tes réponses restent entre toi et l&apos;équipe Yogy Face.
            </p>
          </section>
        </div>

        <section className="outro">
          <p>
            Tu as fait les 3 étapes ? <em>C&apos;est tout bon.</em>
          </p>
          <p className="small">Garde un œil sur WhatsApp, Jeanne t&apos;y attend&nbsp;🤍</p>
        </section>
      </main>

      <footer>
        <img src="/logo-yogyface-dark.png" alt="Yogyface" height={22} width={99} loading="lazy" />
        <nav>
          <FunnelLink to={legalTo('/mentions-legales', true)}>Mentions légales</FunnelLink>
          <FunnelLink to={legalTo('/confidentialite', true)}>Confidentialité</FunnelLink>
          <FunnelLink to={legalTo('/cgv', true)}>CGV</FunnelLink>
        </nav>
        <span>© Yogy Face</span>
      </footer>
    </div>
  )
}
