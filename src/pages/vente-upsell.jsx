import { Fragment, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Icon from "../components/Icon";
import SEO from "../components/SEO";
import { captureEvent } from "../lib/analytics";
import { resolveUpsellOffer, UPSELL_ENABLED } from "../lib/stripe-offers";

function euros(cents) {
  return (cents / 100).toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function WithValue({ row }) {
  if (row.was) {
    return (
      <span>
        <span className="text-emerald-600">{row.with}</span>
        <s className="ml-1.5 font-normal text-gris/40">{row.was}</s>
      </span>
    );
  }
  return (
    <span>
      {row.with}
      {row.bonus && (
        <span className="ml-1 font-semibold text-emerald-600">{row.bonus}</span>
      )}
    </span>
  );
}

/** Grille VIP : placements explicites. Mobile 2 col sans header, desktop 3 col. */
function UpsellCompare({ offer }) {
  const rows = offer.compare || [];
  if (!rows.length) return null;
  const pill = offer.withLabel || "Avec";
  const sans = offer.withoutLabel || "Sans";
  const ring =
    "col-start-2 row-start-1 pointer-events-none -my-2 md:-my-3 rounded-2xl bg-white ring-2 ring-emerald-500 shadow-[0_12px_40px_rgba(16,185,129,0.18)]";
  return (
    <div className="py-2 mb-6 text-left">
      <div className="grid items-stretch grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:hidden">
        <div aria-hidden className={ring} style={{ gridRow: `1 / span ${rows.length}` }} />
        {rows.map((row, i) => {
          const gridRow = i + 1;
          return (
            <Fragment key={row.label}>
              <div
                className="flex min-h-[54px] min-w-0 items-center border-t border-noir/8 px-1.5 text-[12px] leading-snug text-gris"
                style={{ gridColumn: 1, gridRow }}
              >
                {row.label}
              </div>
              <div
                className="relative z-10 flex min-h-[54px] min-w-0 flex-col items-center justify-center border-t border-emerald-100 px-1.5 py-2 text-center text-[12px] font-semibold text-noir"
                style={{ gridColumn: 2, gridRow }}
              >
                <WithValue row={row} />
                <span className="mt-1 text-[10px] font-normal text-gris/45">
                  Sans : {row.without}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>

      <div className="hidden md:grid items-stretch grid-cols-[1.35fr_1fr_1fr]">
        <div
          aria-hidden
          className={ring}
          style={{ gridRow: `1 / span ${rows.length + 1}` }}
        />
        <div className="h-12" style={{ gridColumn: 1, gridRow: 1 }} />
        <div
          className="relative z-10 flex h-12 min-w-0 items-center justify-center px-1"
          style={{ gridColumn: 2, gridRow: 1 }}
        >
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
            {pill}
          </span>
        </div>
        <div
          className="flex h-12 items-center justify-center text-xs font-semibold uppercase tracking-wider text-gris/50"
          style={{ gridColumn: 3, gridRow: 1 }}
        >
          {sans}
        </div>
        {rows.map((row, i) => {
          const gridRow = i + 2;
          return (
            <Fragment key={row.label}>
              <div
                className="flex min-h-[54px] min-w-0 items-center border-t border-noir/8 px-2 text-[13px] leading-snug text-gris"
                style={{ gridColumn: 1, gridRow }}
              >
                {row.label}
              </div>
              <div
                className="relative z-10 flex min-h-[54px] min-w-0 flex-col items-center justify-center border-t border-emerald-100 px-2 py-2 text-center text-sm font-semibold text-noir"
                style={{ gridColumn: 2, gridRow }}
              >
                <WithValue row={row} />
              </div>
              <div
                className="flex min-h-[54px] items-center justify-center border-t border-noir/8 px-2 text-center text-[13px] text-gris/55"
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

/** Offre post-achat 1 clic (carte déjà sur Stripe). A/B hashé sur le cs_. Non indexée. */
export default function VenteUpsell() {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sessionId =
    searchParams.get("cs") || searchParams.get("session_id") || "";
  // /vente-upsell-test : même UI, aucun appel Stripe. ?v=a|pack ou ?v=b|coaching.
  const preview =
    pathname === "/vente-upsell-test" || searchParams.get("preview") === "1";
  const previewKey = searchParams.get("v") || "pack";
  const [state, setState] = useState({
    status: "loading",
    offer: null,
    error: "",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Filet si une vieille session Stripe pointe encore ici.
    if (!UPSELL_ENABLED && !preview) {
      navigate("/confirmation-achat-bienvenue", { replace: true });
      return;
    }
    if (preview) {
      setState({
        status: "ready",
        offer: { ...resolveUpsellOffer("", previewKey), alreadyTaken: false },
        error: "",
      });
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
        if (data.upsell?.alreadyTaken) {
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
  }, [preview, previewKey, sessionId, navigate]);

  const skip = () => {
    if (preview) return;
    captureEvent("upsell_skip", { variant: state.offer?.variant });
    navigate("/confirmation-achat-bienvenue", { replace: true });
  };

  const accept = async () => {
    if (preview) return;
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
      if (data.url) {
        window.location.href = data.url;
        return;
      }
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
        path={preview ? "/vente-upsell-test" : "/vente-upsell"}
        noindex
      />

      <section className="relative min-h-screen flex items-center py-12 md:py-16 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bordeaux/8 via-white to-creme pointer-events-none" />
        <div className="max-w-[720px] mx-auto w-full relative z-10 text-center">
          {state.status === "loading" && (
            <p className="text-gris">Confirmation de ton paiement…</p>
          )}

          {state.status === "error" && !offer && (
            <>
              <h1 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] font-black tracking-tighter text-noir mb-3">
                Ton paiement
                <br />
                <span className="font-serif italic text-bordeaux font-semibold">
                  est bien passé.
                </span>
              </h1>
              <p className="text-gris text-[15px] mb-8">
                On n’a pas pu charger l’offre complémentaire. Tu peux continuer
                — ton accès n’est pas perdu.
              </p>
              <div className="flex flex-col items-center gap-3">
                <Link
                  to="/confirmation-achat-bienvenue"
                  className="btn-bordeaux inline-flex text-sm px-6 py-3"
                >
                  Continuer
                </Link>
                <Link
                  to="/vente"
                  className="btn-secondary inline-flex text-sm px-6 py-3"
                >
                  Retour à l’offre
                </Link>
              </div>
            </>
          )}

          {state.status === "ready" && offer && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-bordeaux/10 text-bordeaux mb-5">
                <Icon name="sparkles" size={30} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bordeaux mb-3">
                Ton inscription est confirmée
              </p>
              <h1 className="font-display text-[clamp(1.5rem,6.5vw,3.2rem)] font-black leading-[0.95] tracking-tighter text-bordeaux whitespace-nowrap mb-3">
                UNE DERNIÈRE chose.
              </h1>
              <p className="font-display font-black text-xl text-noir mb-2">
                {offer.headline}
              </p>
              <p className="text-gris text-[15px] leading-relaxed mb-6">
                {offer.sub}
              </p>

              <UpsellCompare offer={offer} />

              {state.error && (
                <p className="text-bordeaux text-sm mb-4" role="alert">
                  {state.error}
                </p>
              )}

              <div className="flex flex-col items-stretch gap-3">
                <button
                  type="button"
                  disabled={busy}
                  onClick={accept}
                  className={`btn-vert justify-center text-sm md:text-base px-7 py-3.5 ${busy ? "opacity-60" : ""}`}
                >
                  {busy
                    ? "Paiement…"
                    : `Oui — ajouter pour ${euros(offer.amountCents)} €`}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={skip}
                  className="btn-secondary justify-center text-sm px-7 py-3.5"
                >
                  Non merci, continuer
                </button>
              </div>
              <p className="text-gris/40 text-[11px] mt-8">
                Paiement sécurisé Stripe
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
