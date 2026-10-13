import { Link } from "react-router-dom";
import Icon from "./Icon";

const RULES = [
  "suivi tes 12 lives",
  "pratiqué au moins 4 fois par semaine",
  "envoyé tes 6 photos de suivi (1, 2, 3, 4, 5 et 6 mois)",
];

/** Garantie 6 mois : 2 cartes (conditions + remboursement). */
export default function VenteGarantie() {
  return (
    <section className="py-14 md:py-20 px-[5%] bg-creme">
      <div className="max-w-[880px] mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-noir/30 mb-2">
          La garantie YoGyFace
        </p>
        <h2 className="font-display font-black tracking-tighter text-noir text-[clamp(1.7rem,4.2vw,2.6rem)] leading-[0.95] mb-8">
          Tu ne prends pas de risque
        </h2>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4 items-stretch">
          <div className="rounded-2xl bg-white p-6 md:p-8">
            <p className="font-display font-black text-[17px] text-noir tracking-tight mb-3">
              Si, au bout de 6 mois, tu as :
            </p>
            <ul className="space-y-1.5 text-[14.5px] text-gris leading-relaxed list-disc pl-5">
              {RULES.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="text-[14.5px] text-gris mt-3">
              et que tu ne vois aucune amélioration…
            </p>
          </div>

          <div className="rounded-2xl bg-bordeaux text-white p-6 md:p-8 flex flex-col justify-center min-h-[220px]">
            <Icon name="shield" size={22} className="text-white/70 mb-3" />
            <p className="font-display font-black text-[clamp(1.45rem,3vw,1.85rem)] leading-[1.05] tracking-tight">
              Tu m'écris. Je te rembourse.
            </p>
            <p className="text-white/70 text-[14.5px] mt-3">
              En totalité, sur simple mail.
            </p>
          </div>
        </div>

        <p className="font-serif italic text-bordeaux/80 text-[16px] md:text-[17px] text-center mt-8">
          Une crème qui ne marche pas, personne ne te la rembourse.
        </p>
        <p className="text-center text-gris/40 text-[11px] mt-3">
          Offre soumise à conditions.{" "}
          <Link to="/cgv#garantie" className="underline hover:text-corail">
            Voir les CGV
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
