import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { captureEvent } from "../lib/analytics";
import { UPSELL_ENABLED, resolveUpsellOffer } from "../lib/stripe-offers";
import { withLeadQuery } from "../lib/lead-query";

function euros(cents) {
  return (cents / 100).toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/** 15 min dès la 1re vue (session). */
function useOfferCountdown(minutes = 15) {
  const [left, setLeft] = useState(minutes * 60 * 1000);
  useEffect(() => {
    const key = "yf_upsell_ends_15";
    let ends = Number(sessionStorage.getItem(key) || 0);
    if (!ends || ends < Date.now()) {
      ends = Date.now() + minutes * 60 * 1000;
      sessionStorage.setItem(key, String(ends));
    }
    const tick = () => setLeft(Math.max(0, ends - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [minutes]);
  const total = Math.floor(left / 1000);
  return {
    d: pad(Math.floor(total / 86400)),
    h: pad(Math.floor((total % 86400) / 3600)),
    m: pad(Math.floor((total % 3600) / 60)),
    s: pad(total % 60),
  };
}

function Countdown() {
  const { d, h, m, s } = useOfferCountdown(15);
  const units = [
    [d, "Jours"],
    [h, "Heures"],
    [m, "Minutes"],
    [s, "Secondes"],
  ];
  return (
    <div className="mb-9">
      <p className="text-[15px] md:text-[16px] text-noir/70 mb-2">
        Cette offre spéciale disparaîtra dans :
      </p>
      <div className="flex justify-center items-start gap-1.5 md:gap-2">
        {units.map(([val, lab], i) => (
          <Fragment key={lab}>
            {i > 0 && (
              <span className="font-display font-black text-[1.85rem] md:text-[2.35rem] leading-none text-bordeaux/40 mt-0.5">
                :
              </span>
            )}
            <div className="min-w-[3.4rem] md:min-w-[4.2rem]">
              <p className="font-display font-black text-[1.85rem] md:text-[2.35rem] leading-none tracking-tight text-bordeaux tabular-nums">
                {val}
              </p>
              <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-noir/45">
                {lab}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <p className="mt-3 text-[14px] md:text-[15px] text-noir/55">
        ou quand tu fermeras cette page
      </p>
    </div>
  );
}

/** Les 21 pages, en fond. Floues : le texte et les codes ne se lisent pas. */
const GUIDE_PILE = Array.from(
  { length: 21 },
  (_, i) => `/upsell/pile/p${String(i + 1).padStart(2, "0")}.jpg`,
);

/** Une rangée d’éventail. `spread` = écart horizontal, en % du cadre. */
function GuideFan({ pages, className, cardClass, spread = 36 }) {
  return (
    <div className={className}>
      {pages.map((src, i) => {
        const t = pages.length < 2 ? 0 : (i / (pages.length - 1)) * 2 - 1;
        return (
          <div
            key={src}
            className={`absolute bottom-1 overflow-hidden rounded-md bg-white shadow-[0_10px_18px_rgba(40,20,10,0.16)] ring-1 ring-black/10 ${cardClass}`}
            style={{
              left: `calc(50% + ${t * spread}%)`,
              transform: `translateX(-50%) rotate(${t * 6}deg)`,
              transformOrigin: "center bottom",
              zIndex: i,
            }}
          >
            <img src={src} alt="" className="w-full scale-105 blur-[1px]" />
          </div>
        );
      })}
    </div>
  );
}

const GUIDE_POINTS = [
  [
    "8 marques au crible",
    "Nooance, MyBlend, Talika, CurrentBody, Lauvée, ZIIP, My SOS Beauty, et d’autres.",
  ],
  [
    "Mon avis, puis Internet",
    "Ce que j’en pense en tant que pro, à côté de ce qu’on lit en ligne. Les deux ne disent pas toujours la même chose.",
  ],
  [
    "Testé, ou pas",
    "Je dis ce que j’ai eu entre les mains, et ce que je n’ai pas testé.",
  ],
  [
    "Avant d’acheter",
    "Les 3 chiffres qui séparent un vrai masque LED d’une belle pub.",
  ],
];

/** Colonne verte : `\n` = saut de ligne sous sm ; une ligne dès 640px. */
function WithValue({ row }) {
  const text = row.bonus || row.with || "";
  const parts = text.split("\n");
  const color = row.bonus ? "font-semibold text-emerald-600" : "";
  if (parts.length === 1)
    return <span className={`${color} sm:whitespace-nowrap`}>{text}</span>;
  return (
    <span className={`${color} sm:whitespace-nowrap`}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && <br className="sm:hidden" />}
          {i > 0 && <span className="hidden sm:inline"> </span>}
          {p}
        </Fragment>
      ))}
    </span>
  );
}

/** Pack : « ce que tu peux avoir » vs « ce que tu as acheté ». */
function UpsellCompare({ offer }) {
  const rows = offer.compare || [];
  if (!rows.length) return null;
  const pill = offer.withLabel || "Avec";
  const sans = offer.withoutLabel || "Sans";
  const span = rows.length + 1;
  return (
    <div className="py-2 mb-8 text-left w-full mx-auto">
      <div className="grid items-stretch grid-cols-[5.75rem_minmax(0,1fr)_minmax(0,1fr)] sm:grid-cols-[auto_max-content_minmax(0,1fr)]">
        <div
          aria-hidden
          className="pointer-events-none -my-2 md:-my-3 rounded-2xl bg-white ring-2 ring-emerald-500 shadow-[0_12px_40px_rgba(16,185,129,0.18)]"
          style={{ gridColumn: 2, gridRow: `1 / span ${span}` }}
        />
        <div
          className="min-h-[64px] md:min-h-[72px]"
          style={{ gridColumn: 1, gridRow: 1 }}
        />
        <div
          className="relative z-10 flex min-h-[64px] md:min-h-[72px] items-center justify-center px-1.5 py-2"
          style={{ gridColumn: 2, gridRow: 1 }}
        >
          <span className="px-1 text-center text-[10px] md:text-[12px] font-bold leading-snug text-emerald-700">
            {pill}
          </span>
        </div>
        <div
          className="flex min-h-[64px] md:min-h-[72px] items-center justify-center px-1.5 py-2 text-gris/55"
          style={{ gridColumn: 3, gridRow: 1 }}
        >
          <span className="px-1 text-center text-[10px] md:text-[12px] font-bold leading-snug">
            {sans}
          </span>
        </div>
        {rows.map((row, i) => {
          const gridRow = i + 2;
          return (
            <Fragment key={row.label}>
              <div
                className="flex min-h-[48px] md:min-h-[54px] min-w-0 items-center border-t border-noir/8 pr-1.5 md:px-2 text-[10px] md:text-[13px] leading-tight text-gris"
                style={{ gridColumn: 1, gridRow }}
              >
                {row.label}
              </div>
              <div
                className="relative z-10 flex min-h-[48px] md:min-h-[54px] min-w-0 items-center justify-center border-t border-emerald-100 px-1.5 md:px-3 py-2 text-center text-[11px] sm:text-[13px] font-semibold leading-tight text-noir"
                style={{ gridColumn: 2, gridRow }}
              >
                <WithValue row={row} />
              </div>
              <div
                className="flex min-h-[48px] md:min-h-[54px] min-w-0 items-center justify-center overflow-hidden border-t border-noir/8 px-1 md:px-2 text-center text-[10px] md:text-[13px] leading-tight text-gris/55"
                style={{ gridColumn: 3, gridRow }}
              >
                {row.without}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function StepIcon({ kind, state }) {
  const on = state === "done" || state === "current";
  const cls = on ? "text-white" : "text-[#c4b48a]";
  return (
    <span
      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 ${
        state === "current"
          ? "border-bordeaux bg-bordeaux"
          : state === "done"
            ? "border-bordeaux bg-bordeaux"
            : "border-[#e4d5ae] bg-[#fff8ec]"
      }`}
    >
      {kind === "pay" && (
        <svg
          className={cls}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <rect
            x="3"
            y="6"
            width="18"
            height="13"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}
      {kind === "cart" && (
        <svg
          className={cls}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 8h15l-1.5 8H8L6 8Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M6 8 5 5H2" stroke="currentColor" strokeWidth="2" />
          <circle cx="9" cy="20" r="1.4" fill="currentColor" />
          <circle cx="18" cy="20" r="1.4" fill="currentColor" />
        </svg>
      )}
      {kind === "check" && (
        <svg
          className={cls}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 12.5 9.5 17 19 7.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

/** Barre de progression type funnel SIO. */
function FunnelSteps() {
  const steps = [
    { kind: "pay", label: "Paiement", state: "done" },
    { kind: "cart", label: "Offre complémentaire", state: "current" },
    { kind: "check", label: "Accès immédiat", state: "todo" },
  ];
  return (
    <div className="relative mx-auto mb-10 max-w-[560px] px-1">
      <div
        className="absolute left-[16%] right-[16%] top-[17px] h-[2px] bg-[#e8d9b0]"
        aria-hidden
      />
      <div
        className="absolute left-[16%] right-1/2 top-[17px] h-[2px] bg-bordeaux/55"
        aria-hidden
      />
      <ol className="grid grid-cols-3">
        {steps.map((s) => (
          <li key={s.label} className="flex flex-col items-center gap-2">
            <StepIcon kind={s.kind} state={s.state} />
            <span className="text-[10px] md:text-[11px] text-noir/55 text-center leading-tight px-1">
              {s.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** 2e clic : confirme le débit sur la carte déjà utilisée. */
function ConfirmDialog({ open, offer, busy, error, onClose, onConfirm }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, busy, onClose]);

  if (!open || !offer) return null;
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsell-confirm-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-noir/50"
        aria-label="Fermer"
        disabled={busy}
        onClick={onClose}
      />
      <div className="relative w-full max-w-[400px] rounded-3xl bg-white p-6 md:p-7 shadow-2xl text-center">
        <h2
          id="upsell-confirm-title"
          className="font-display font-black text-xl md:text-[1.35rem] text-noir mb-2"
        >
          Confirmer l’ajout
        </h2>
        <p className="text-[14px] text-gris mb-1">
          {offer.name}
          {offer.nameSub ? (
            <>
              <br />
              {offer.nameSub}
            </>
          ) : null}
        </p>
        <p className="font-display font-black text-3xl text-bordeaux mb-6">
          {euros(offer.amountCents)} €
        </p>
        {error && (
          <p className="text-bordeaux text-sm mb-4" role="alert">
            {error}
          </p>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={onConfirm}
          className={`btn-vert w-full justify-center text-sm md:text-base px-7 py-3.5 ${busy ? "opacity-60" : ""}`}
        >
          {busy ? "Paiement…" : `Confirmer, ${euros(offer.amountCents)} € en une fois`}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onClose}
          className="mt-3 w-full text-sm text-gris/60 hover:text-gris"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

/** Aperçu sans session Stripe. Localhost seulement : aucun débit. */
function isLocalPreview(searchParams) {
  if (typeof window === "undefined") return false;
  if (searchParams.get("preview") !== "1") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

/** Upsell 2 clics — OTO Systeme.io + dialog de confirmation. */
export default function VenteUpsell() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId =
    searchParams.get("cs") || searchParams.get("session_id") || "";
  // Garde email, day, quiz… en quittant l'upsell. `upsell=1` de la destination gagne.
  const carry = (path) => withLeadQuery(path, {}, searchParams);
  const [state, setState] = useState({
    status: "loading",
    offer: null,
    error: "",
  });
  const [busy, setBusy] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (isLocalPreview(searchParams)) {
      setState({ status: "ready", offer: resolveUpsellOffer(), error: "" });
      return;
    }
    if (!UPSELL_ENABLED) {
      navigate(carry("/confirmation-achat-bienvenue"), { replace: true });
      return;
    }
    if (!sessionId.startsWith("cs_")) {
      setState({
        status: "error",
        offer: null,
        error: "Lien de paiement invalide.",
      });
      return;
    }
    let cancelled = false;
    fetch(`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Session introuvable");
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        if (!data.upsell) {
          navigate(carry("/confirmation-achat-bienvenue"), { replace: true });
          return;
        }
        if (data.upsell.alreadyTaken) {
          navigate(carry("/confirmation-achat-bienvenue?upsell=1"), { replace: true });
          return;
        }
        setState({ status: "ready", offer: data.upsell, error: "" });
        captureEvent("upsell_view", { variant: data.upsell?.variant });
      })
      .catch((err) => {
        if (!cancelled)
          setState({ status: "error", offer: null, error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [sessionId, navigate, searchParams]);

  const skip = () => {
    captureEvent("upsell_skip", { variant: state.offer?.variant });
          navigate(carry("/confirmation-achat-bienvenue"), { replace: true });
  };

  const openConfirm = () => {
    setState((s) => ({ ...s, error: "" }));
    setConfirmOpen(true);
  };

  const accept = async () => {
    if (isLocalPreview(searchParams)) {
      setState((s) => ({ ...s, error: "Aperçu local : aucun débit." }));
      return;
    }
    setBusy(true);
    setState((s) => ({ ...s, error: "" }));
    captureEvent("upsell_accept", { variant: state.offer?.variant });
    try {
      const { getDataFastIds } = await import("../lib/analytics");
      const res = await fetch("/api/stripe/upsell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          ...(await getDataFastIds()),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Paiement refusé");
      navigate(carry("/confirmation-achat-bienvenue?upsell=1"), { replace: true });
    } catch (err) {
      setState((s) => ({ ...s, error: err.message }));
      setBusy(false);
    }
  };

  const offer = state.offer;

  return (
    <>
      <SEO
        title="Une dernière chose"
        description="Offre complémentaire après ton inscription YoGyFace."
        path="/vente-upsell"
        noindex
      />

      <section className="relative min-h-screen overflow-hidden py-8 md:py-12 px-[5%] bg-[#fff8ec]">
        <div className="pointer-events-none absolute -left-10 top-24 h-40 w-40 rounded-[40%] bg-[#cde8c4]/70 rotate-[-12deg]" />
        <div className="pointer-events-none absolute -right-8 -top-6 h-36 w-36 rounded-[28%] border-[6px] border-[#f0c96a]/80" />
        <div className="pointer-events-none absolute -left-8 bottom-16 h-44 w-36 rounded-[36%] bg-[#cde8c4]/80 rotate-[8deg]" />
        <div className="pointer-events-none absolute -right-10 bottom-8 h-40 w-40 rounded-[30%] border-[6px] border-[#f0c96a]/70 rotate-[18deg]" />

        <div className="max-w-[720px] sm:max-w-[920px] mx-auto w-full relative z-10 text-center">
          {state.status === "loading" && (
            <p className="text-gris">Confirmation de ton paiement…</p>
          )}

          {state.status === "error" && !offer && (
            <>
              <h1 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] font-black tracking-tighter text-noir mb-3">
                Ton paiement est bien passé.
              </h1>
              <p className="text-gris text-[15px] mb-8">
                On n’a pas pu charger l’offre complémentaire. Tu peux continuer,
                ton accès n’est pas perdu.
              </p>
              <Link
                to={carry("/confirmation-achat-bienvenue")}
                className="btn-bordeaux inline-flex text-sm px-6 py-3"
              >
                Continuer
              </Link>
            </>
          )}

          {state.status === "ready" && offer && (
            <>
              <FunnelSteps />

              <h1 className="font-display font-black text-[clamp(1.55rem,4.4vw,2.35rem)] tracking-tight text-bordeaux leading-[1.15] mb-3">
                {offer.headline}
              </h1>
              {offer.sub && (
                <p className="text-noir font-bold text-[14px] md:text-[16px] leading-relaxed max-w-[560px] mx-auto mb-8">
                  {offer.sub}
                </p>
              )}

              <Countdown />

              <div className="rounded-3xl bg-[#f6ebda] p-4 md:p-6 mb-10 text-left flex flex-col sm:flex-row gap-5 md:gap-7 items-center">
                <img
                  src={offer.image || "/upsell/guide-cover.jpg"}
                  alt="Couverture du guide des appareils beauté à domicile"
                  className="w-[200px] sm:w-[230px] rounded-xl shadow-[0_18px_40px_rgba(88,16,40,0.28)] shrink-0"
                />
                <div className="min-w-0 text-center sm:text-left">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-bordeaux/70 mb-2">
                    PDF · novembre 2026
                  </p>
                  <p className="font-display font-black text-[1.25rem] md:text-[1.55rem] text-noir leading-tight mb-2">
                    {offer.name}
                  </p>
                  {offer.nameSub && (
                    <p className="text-[14px] md:text-[15px] text-noir/75 leading-snug mb-4">
                      {offer.nameSub}
                    </p>
                  )}
                  <p className="text-[11px] md:text-xs uppercase tracking-wider text-noir/45 mb-1">
                    Aujourd’hui
                  </p>
                  <p className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-1">
                    {offer.compareAtCents > offer.amountCents && (
                      <s className="font-display font-bold text-[1.7rem] md:text-[2.2rem] leading-none text-noir/35">
                        {euros(offer.compareAtCents)} €
                      </s>
                    )}
                    <span className="font-display font-black text-[2.6rem] md:text-[3.2rem] leading-none tracking-tight text-[#00c37a]">
                      {euros(offer.amountCents)} €
                    </span>
                  </p>
                  <p className="mt-2 text-[13px] text-noir/55">
                    au lieu de {euros(offer.compareAtCents || offer.amountCents)} €
                  </p>
                </div>
              </div>

              <p className="text-[15px] md:text-[17px] text-noir/80 leading-relaxed max-w-[640px] mx-auto mb-8">
                Un masque ou un stylo peut coûter 80 € comme 600 €. Ce guide
                te dit ce qui marche vraiment, ce qui est du marketing, et quel
                appareil choisir selon ta peau. Avec mon avis, et ce que disent
                les études.
              </p>

              {/* Plein cadre, fondu sur les côtés. Mobile : deux rangées. */}
              <div
                className="relative left-1/2 mb-3 h-[300px] w-screen -translate-x-1/2 sm:h-[270px]"
                aria-hidden
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                }}
              >
                <div className="pointer-events-none absolute bottom-6 left-1/2 h-10 w-[62%] -translate-x-1/2 rounded-full bg-noir/10 blur-2xl sm:bottom-2" />
                <GuideFan
                  pages={GUIDE_PILE.slice(0, 11)}
                  className="absolute inset-x-0 top-0 h-[165px] sm:hidden"
                  cardClass="w-[72px]"
                  spread={42}
                />
                <GuideFan
                  pages={GUIDE_PILE.slice(11)}
                  className="absolute inset-x-0 bottom-0 h-[165px] sm:hidden"
                  cardClass="w-[76px]"
                  spread={42}
                />
                <GuideFan
                  pages={GUIDE_PILE}
                  className="absolute inset-x-0 bottom-0 hidden h-full sm:block"
                  cardClass="w-[108px]"
                />
              </div>
              <p className="mb-10 text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-noir/45">
                21 pages
              </p>

              <h2 className="font-display font-black text-[clamp(1.25rem,3.4vw,1.8rem)] text-bordeaux mb-5">
                Dans le guide
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left">
                {GUIDE_POINTS.map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl bg-white/80 border border-noir/5 px-4 py-4"
                  >
                    <p className="font-display font-bold text-[15px] text-noir mb-1">
                      {title}
                    </p>
                    <p className="text-[13px] md:text-[14px] text-noir/70 leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <blockquote className="max-w-[640px] mx-auto mb-10 rounded-2xl bg-[#841435] text-white px-5 py-5 md:px-7 md:py-6 text-left">
                <p className="font-serif italic text-[1.05rem] md:text-[1.2rem] leading-snug">
                  « Une lumière, un appareil, ne va pas régler à lui seul
                  toutes tes problématiques. Il faut vraiment l’adapter à tes
                  besoins. »
                </p>
                <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-white/70">
                  Laury · dans le guide
                </p>
              </blockquote>

              <h2 className="font-display font-black text-[clamp(1.2rem,3.4vw,1.7rem)] text-bordeaux mb-5">
                Cette offre contient
              </h2>
              <ul className="text-left max-w-[560px] mx-auto space-y-3 mb-10">
                {(offer.bullets || []).map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[14px] md:text-[15px] text-noir/80 leading-relaxed"
                  >
                    <span className="text-[#00c37a] font-bold mt-0.5">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              <UpsellCompare offer={offer} />
              <div className="h-16" aria-hidden />

              {/* Reste collé en bas pendant le scroll. */}
              <div className="fixed inset-x-0 bottom-0 z-40 flex flex-col items-center px-[5%] pt-8 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#fff8ec] from-55% to-transparent">
                <button
                  type="button"
                  disabled={busy}
                  onClick={openConfirm}
                  className="btn-vert min-w-[220px] justify-center text-sm md:text-base px-10 py-3.5"
                >
                  Oui ! je le veux !
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={skip}
                  className="mt-2 text-[12px] text-noir/45 underline-offset-2 hover:text-noir/70 hover:underline disabled:opacity-50"
                >
                  Non merci
                </button>
              </div>
              <ConfirmDialog
                open={confirmOpen}
                offer={offer}
                busy={busy}
                error={state.error}
                onClose={() => !busy && setConfirmOpen(false)}
                onConfirm={accept}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
