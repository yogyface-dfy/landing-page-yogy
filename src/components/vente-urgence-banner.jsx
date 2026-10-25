import { useMidnightCountdown } from "../lib/midnight-countdown";

/** Un bloc du chrono (heures / minutes / secondes). */
function Tick({ value }) {
  return (
    <span className="min-w-[2.15rem] sm:min-w-[2.75rem] rounded-md bg-white/15 px-1.5 py-0.5 text-center font-display font-black tabular-nums text-[1.75rem] sm:text-[2.25rem] leading-none tracking-tight">
      {value}
    </span>
  );
}

/** Bandeau flash /vente-10x : bordeaux + chrono minuit bien visible. */
export default function VenteUrgenceBanner() {
  const { h, m, s } = useMidnightCountdown();

  return (
    // z + translateZ : sur iOS le hero (shadow/z-10) passait au-dessus du fixed.
    // safe-area : colle sous Dynamic Island / notch (plus de fond visible au-dessus).
    <div
      className="fixed top-0 left-0 right-0 z-[200] w-full bg-bordeaux text-white pt-[env(safe-area-inset-top,0px)] [transform:translateZ(0)]"
      role="status"
    >
      <div className="h-16 md:h-20 flex items-center justify-center px-3">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <p className="font-display font-black text-[10px] sm:text-[12px] uppercase tracking-[0.16em] leading-tight text-right">
            Plus que 2 places sur 20
            <span className="block sm:inline sm:ml-2 opacity-90">
              Fermeture à minuit
            </span>
          </p>
          <p className="flex items-center gap-1 sm:gap-1.5" aria-label={`Fermeture dans ${h} heures ${m} minutes ${s} secondes`}>
            <Tick value={h} />
            <span className="font-display font-black text-xl sm:text-2xl opacity-70" aria-hidden>
              :
            </span>
            <Tick value={m} />
            <span className="font-display font-black text-xl sm:text-2xl opacity-70" aria-hidden>
              :
            </span>
            <Tick value={s} />
          </p>
        </div>
      </div>
    </div>
  );
}
