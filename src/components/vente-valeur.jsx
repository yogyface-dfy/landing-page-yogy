import Icon from "./Icon";

// Les 4 piliers suivent le prix de la page. 119+60+32+148 = 359, 149+75+40+185 = 449.
const PAID = {
  359: ["119 €", "60 €", "32 €", "148 €"],
  449: ["149 €", "75 €", "40 €", "185 €"],
};

const PAID_ROWS = [
  { t: "Ton diagnostic", was: "299 €" },
  { t: "Ton ordonnance beauté", was: "149 €" },
  { t: "Ton ordonnance skincare", was: "80 €" },
  { t: "Ton plan guidé 100 % sur mesure, 3 mois", was: "399 €" },
];

const LEFT_GIFTS = [
  { t: "6 suivis photo (1 à 6 mois)", p: "199 €", gift: true },
  { t: "12 lives offerts", p: "300 à 360 €", gift: true },
];

function leftRows(price) {
  const n = Number(String(price).replace(",", "."));
  const nows = PAID[n >= 400 ? 449 : 359];
  return [
    ...PAID_ROWS.map((row, i) => ({ ...row, now: nows[i] })),
    ...LEFT_GIFTS,
  ];
}

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
      className={`flex items-start justify-between gap-4 md:gap-5 border-b border-noir/6 last:border-0 ${
        tight ? "py-2" : "py-3"
      }`}
    >
      <span
        className={`flex items-start gap-1.5 min-w-0 text-noir leading-snug ${
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
      <span className="shrink-0 text-right pl-1">
        {gift ? (
          <span className="inline-flex items-baseline gap-2">
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
    <div
      className={`grid gap-0 rounded-2xl bg-white border border-noir/6 ${
        tight
          ? "grid-cols-1 px-3.5"
          : "grid-cols-1 md:grid-cols-2 px-5 md:px-8 shadow-[0_12px_40px_rgba(132,20,53,0.06)]"
      }`}
    >
      <ul className={tight ? "" : "md:border-r md:border-noir/6 md:pr-8"}>
        {leftRows(price).map((item) => (
          <Row key={item.t} tight={tight} {...item} />
        ))}
      </ul>
      {/* md:pl-8 = miroir du pr-8 gauche (sinon cadeaux collés au séparateur). */}
      <ul
        className={
          tight
            ? "border-t border-noir/6"
            : "border-t border-noir/6 md:border-0 md:pl-8"
        }
      >
        {RIGHT.map((item) => (
          <Row key={item.t} tight={tight} {...item} />
        ))}
      </ul>
    </div>
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
