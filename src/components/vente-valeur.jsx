import Icon from "./Icon";

// Valeurs Systeme.io. 149 + 75 + 40 + 185 = 449 € (moitié arrondie des 4 piliers).
const LEFT = [
  { t: "Ton diagnostic", now: "149 €", was: "299 €" },
  { t: "Ton ordonnance beauté", now: "75 €", was: "149 €" },
  { t: "Ton ordonnance skincare", now: "40 €", was: "80 €" },
  { t: "Ton plan guidé 100 % sur mesure, 3 mois", now: "185 €", was: "399 €" },
  { t: "6 suivis photo (1 à 6 mois)", p: "199 €", gift: true },
  { t: "12 lives offerts", p: "300 à 360 €", gift: true },
];

const RIGHT = [
  { t: "Tous les replays à vie", p: "199 €", gift: true },
  { t: "La communauté", p: "199 €", gift: true },
  { t: "Le Club YoGyFace", p: "199 €", gift: true },
  { t: "La bibliothèque, 170+ exercices", p: "149 €", gift: true },
  { t: "Les vidéos des expertes", p: "205 €", gift: true },
  { t: "eBooks et vidéos mindset", p: "99 €", gift: true },
];

function Row({ t, p, now, was, gift, tight }) {
  return (
    <li
      className={`flex items-start justify-between gap-3 border-b border-noir/6 last:border-0 ${
        tight ? "py-2" : "py-3"
      }`}
    >
      <span
        className={`flex items-start gap-1.5 text-noir leading-snug ${
          tight ? "text-[12.5px]" : "text-[13.5px] md:text-[14.5px]"
        }`}
      >
        {gift && (
          <Icon
            name="gift"
            size={tight ? 13 : 15}
            className="mt-0.5 shrink-0 text-corail"
          />
        )}
        {t}
      </span>
      <span className="shrink-0 text-right">
        {gift ? (
          <span className="inline-flex items-baseline gap-1.5">
            <span
              className={`font-display tabular-nums line-through text-noir/30 font-semibold ${
                tight ? "text-[12.5px]" : "text-[13.5px] md:text-[14.5px]"
              }`}
            >
              {p}
            </span>
            <span className="font-display font-black text-[11px] text-corail tracking-wide uppercase">
              Offert
            </span>
          </span>
        ) : (
          <span className="inline-flex items-baseline gap-1.5">
            <span
              className={`font-display font-black tabular-nums text-emerald-600 ${
                tight ? "text-[12.5px]" : "text-[13.5px] md:text-[14.5px]"
              }`}
            >
              {now}
            </span>
            <span className="font-display tabular-nums text-[12px] line-through text-noir/30">
              {was}
            </span>
          </span>
        )}
      </span>
    </li>
  );
}

function Table({ price, tight }) {
  return (
    <>
      <div
        className={`grid gap-0 rounded-2xl bg-white border border-noir/6 ${
          tight
            ? "grid-cols-1 px-3.5"
            : "grid-cols-1 md:grid-cols-2 px-5 md:px-8 shadow-[0_12px_40px_rgba(132,20,53,0.06)]"
        }`}
      >
        <ul className={tight ? "" : "md:border-r md:border-noir/6 md:pr-8"}>
          {LEFT.map((item) => (
            <Row key={item.t} tight={tight} {...item} />
          ))}
        </ul>
        <ul className={tight ? "border-t border-noir/6" : "border-t border-noir/6 md:border-0"}>
          {RIGHT.map((item) => (
            <Row key={item.t} tight={tight} {...item} />
          ))}
        </ul>
      </div>
      <div
        className={`mt-3 rounded-2xl bg-bordeaux text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 ${
          tight ? "px-3.5 py-3" : "px-5 md:px-8 py-4 md:py-5 mt-5"
        }`}
      >
        <p
          className={`font-display font-black tracking-tight ${
            tight ? "text-[15px]" : "text-lg md:text-xl"
          }`}
        >
          Plus de 2 200 € séparément
        </p>
        <p
          className={`font-display font-black tracking-tight ${
            tight ? "text-[15px]" : "text-lg md:text-xl"
          }`}
        >
          Ton prix : {price} €
        </p>
      </div>
    </>
  );
}

/** compact : hero (mobile avant le prix, desktop sous la photo). */
export default function VenteValeur({ price, compact = false }) {
  if (compact) {
    return (
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-noir/35 mb-2.5">
          Tout ce que tu reçois
        </p>
        <Table price={price} tight />
      </div>
    );
  }

  return (
    <section className="py-14 md:py-20 px-[5%] bg-creme">
      <div className="max-w-[920px] mx-auto">
        <h2 className="section-badge justify-center mx-auto mb-6 md:mb-8">
          Tout ce que tu reçois
        </h2>
        <Table price={price} />
      </div>
    </section>
  );
}
