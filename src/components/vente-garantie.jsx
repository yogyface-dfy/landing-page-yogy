import { Link } from "react-router-dom";

const RULES = [
  "Assiste à tes 12 h de coaching",
  "Pratique tes routines au minimum 5 fois par semaine",
  "Envoie-moi tes 4 photos de suivi (M+1, M+2, M+3 et M+6)",
];

/** Garantie 6 mois sous la stacked value — fond clair, titre corail. */
export default function VenteGarantie() {
  return (
    <section className="py-14 md:py-20 px-[5%] bg-white">
      <div className="max-w-[880px] mx-auto">
        <p className="section-badge justify-center mx-auto mb-4">Sérénité</p>
        <h2 className="text-center font-display font-black tracking-tighter text-corail text-[clamp(1.85rem,5.2vw,3.15rem)] leading-[0.95] mb-8 md:mb-12">
          MA GARANTIE
          <br />
          TRANSFORMATION 6 MOIS
        </h2>

        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start">
          <div>
            <p className="text-gris text-[15.5px] leading-relaxed mb-6">
              Je veux que tu vives ta transformation du visage en toute
              sérénité. C'est pourquoi je t'offre une garantie exceptionnelle.
            </p>

            <p className="font-display font-black text-noir text-[15px] tracking-tight mb-3">
              Suis le programme complet pendant 6 mois
            </p>
            <ol className="space-y-2.5 mb-6">
              {RULES.map((r, i) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-[14.5px] text-noir leading-snug"
                >
                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-corail/10 text-corail font-display font-black text-[11px] flex items-center justify-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r}
                </li>
              ))}
            </ol>

            <p className="text-gris text-[15px] leading-relaxed mb-5">
              Au terme de ces 6 mois, si tu estimes ne constater aucune
              amélioration sur ton visage ou ton bien-être, envoie-moi un email
              dans les 15 jours suivant ton 6<sup>e</sup> mois : je te rembourse
              intégralement.
            </p>
            <p className="font-serif italic text-corail text-[17px] font-semibold">
              Ta satisfaction et ta sérénité sont ma priorité.
            </p>
            <p className="text-gris/40 text-[11px] mt-5">
              Offre soumise à conditions.{" "}
              <Link to="/cgv#garantie" className="underline hover:text-corail">
                Voir les CGV
              </Link>
              .
            </p>
          </div>

          <img
            src="/garantie-yogyface.png"
            alt="Garantie YoGyFace"
            className="order-first md:order-none mx-auto w-[160px] md:w-[200px] h-auto drop-shadow-[0_10px_28px_rgba(230,114,106,0.22)]"
          />
        </div>
      </div>
    </section>
  );
}
