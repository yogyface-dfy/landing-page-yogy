import Icon from "./Icon";

// Valeurs affichées sur Systeme.io (yogyface-resetee). Les cadeaux portent gift.
// 149 + 75 + 40 + 185 = 449 € (moitié arrondie des 4 piliers).
const LEFT = [
  { t: "Ton diagnostic", now: "149 €", was: "299 €" },
  { t: "Ton ordonnance beauté", now: "75 €", was: "149 €" },
  { t: "Ton ordonnance skincare", now: "40 €", was: "80 €" },
  { t: "Ton plan guidé 100 % sur mesure, 3 mois", now: "185 €", was: "399 €" },
  { t: "6 suivis photo (1, 2, 3, 4, 5 et 6 mois)", p: "199 €", gift: true },
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

function Row({ t, p, now, was, gift }) {
  return (
    <li className="flex items-start justify-between gap-4 py-3 border-b border-noir/6 last:border-0">
      <span className="flex items-start gap-2 text-[13.5px] md:text-[14.5px] text-noir leading-snug">
        {gift && (
          <Icon
            name="gift"
            size={15}
            className="mt-0.5 shrink-0 text-corail"
          />
        )}
        {t}
      </span>
      <span className="shrink-0 text-right">
        {gift ? (
          <span className="inline-flex items-baseline gap-2">
            <span className="font-display tabular-nums text-[13.5px] md:text-[14.5px] line-through text-noir/30 font-semibold">
              {p}
            </span>
            <span className="font-display font-black text-[12px] text-corail tracking-wide uppercase">
              Offert
            </span>
          </span>
        ) : (
          <span className="inline-flex items-baseline gap-2">
            <span className="font-display font-black tabular-nums text-[13.5px] md:text-[14.5px] text-emerald-600">
              {now}
            </span>
            <span className="font-display tabular-nums text-[12.5px] line-through text-noir/30">
              {was}
            </span>
          </span>
        )}
      </span>
    </li>
  );
}

/** Stacked value sous le bandeau marques : elles voient le 2 200 € tout de suite. */
export default function VenteValeur({ price }) {
  return (
    <section className="py-14 md:py-20 px-[5%] bg-creme">
      <div className="max-w-[920px] mx-auto">
        <h2 className="section-badge justify-center mx-auto mb-6 md:mb-8">
          Tout ce que tu reçois
        </h2>

        <div className="grid md:grid-cols-2 gap-0 md:gap-10 rounded-2xl bg-white border border-noir/6 px-5 md:px-8 shadow-[0_12px_40px_rgba(132,20,53,0.06)]">
          <ul className="md:border-r md:border-noir/6 md:pr-8">
            {LEFT.map((item) => (
              <Row key={item.t} {...item} />
            ))}
          </ul>
          <ul className="border-t border-noir/6 md:border-0">
            {RIGHT.map((item) => (
              <Row key={item.t} {...item} />
            ))}
          </ul>
        </div>

        <div className="mt-5 rounded-2xl bg-bordeaux text-white px-5 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-display font-black text-lg md:text-xl tracking-tight">
            Plus de 2 200 € séparément
          </p>
          <p className="font-display font-black text-lg md:text-xl tracking-tight">
            Ton prix : {price} €
          </p>
        </div>
      </div>
    </section>
  );
}
