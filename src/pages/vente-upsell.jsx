import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { captureEvent } from "../lib/analytics";
import { UPSELL_ENABLED } from "../lib/stripe-offers";

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
          {busy ? "Paiement…" : `Confirmer — ${euros(offer.amountCents)} €`}
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

/** Upsell 2 clics — OTO Systeme.io + dialog de confirmation. */
export default function VenteUpsell() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId =
    searchParams.get("cs") || searchParams.get("session_id") || "";
  const [state, setState] = useState({
    status: "loading",
    offer: null,
    error: "",
  });
  const [busy, setBusy] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!UPSELL_ENABLED) {
      navigate("/confirmation-achat-bienvenue", { replace: true });
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
          navigate("/confirmation-achat-bienvenue", { replace: true });
          return;
        }
        if (data.upsell.alreadyTaken) {
          navigate("/confirmation-achat-bienvenue?upsell=1", { replace: true });
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
  }, [sessionId, navigate]);

  const skip = () => {
    captureEvent("upsell_skip", { variant: state.offer?.variant });
    navigate("/confirmation-achat-bienvenue", { replace: true });
  };

  const openConfirm = () => {
    setState((s) => ({ ...s, error: "" }));
    setConfirmOpen(true);
  };

  const accept = async () => {
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
      navigate("/confirmation-achat-bienvenue?upsell=1", { replace: true });
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
                On n’a pas pu charger l’offre complémentaire. Tu peux continuer
                — ton accès n’est pas perdu.
              </p>
              <Link
                to="/confirmation-achat-bienvenue"
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

              <div className="rounded-2xl bg-[#f6ebda] px-4 py-4 md:px-5 md:py-5 mb-10 text-left flex gap-4 items-center">
                {offer.image && (
                  <img
                    src={offer.image}
                    alt=""
                    className="w-[7.5rem] h-[7.5rem] md:w-40 md:h-40 rounded-xl object-contain bg-white shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-display font-bold text-[15px] md:text-[17px] text-noir mb-2 leading-snug">
                    {offer.name}
                    {offer.nameSub ? (
                      <>
                        <br />
                        <span className="font-semibold text-[13px] md:text-[15px] text-noir/75">
                          {offer.nameSub}
                        </span>
                      </>
                    ) : null}
                  </p>
                  {/* Prix en hero : barré + 69 € vert — première chose qu’on lit */}
                  <p className="text-[11px] md:text-xs uppercase tracking-wider text-noir/45 mb-1">
                    Prix unitaire
                  </p>
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <s className="font-display font-bold text-[1.55rem] md:text-[2.1rem] leading-none text-noir/35">
                      {euros(offer.compareAtCents)} €
                    </s>
                    <span className="font-display font-black text-[2.35rem] md:text-[3rem] leading-none tracking-tight text-[#00c37a]">
                      {euros(offer.amountCents)} €
                    </span>
                  </p>
                </div>
              </div>

              <h2 className="font-display font-black text-[clamp(1.2rem,3.4vw,1.7rem)] text-bordeaux mb-5">
                Cette offre contient :
              </h2>
              <ul className="text-left max-w-[560px] mx-auto space-y-3 mb-10">
                {(offer.bullets || []).map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[14px] md:text-[15px] text-noir/80 leading-relaxed"
                  >
                    <span className="text-bordeaux font-bold mt-0.5">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              <UpsellCompare offer={offer} />

              <button
                type="button"
                disabled={busy}
                onClick={openConfirm}
                className="btn-vert min-w-[220px] justify-center text-sm md:text-base px-10 py-3.5"
              >
                Oui ! je le veux !
              </button>
              <div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={skip}
                  className="mt-3 inline-flex min-w-[220px] justify-center rounded-full border border-noir/20 bg-white px-10 py-3 text-sm text-noir/70 hover:border-noir/40"
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
