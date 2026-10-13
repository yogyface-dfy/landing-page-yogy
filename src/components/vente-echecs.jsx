const FAILS = [
  {
    n: '01',
    t: 'Les crèmes « miracle »',
    tried: 'Une routine à 150–300 €, rachetée tous les 3 mois.',
    why: 'Elles restent à la surface (épiderme, 0,1 mm). Tes rides se forment dans le derme (1,4 mm).',
    truth: '~1 000 € par an pour rien de durable.',
  },
  {
    n: '02',
    t: 'Les injections',
    tried: 'Botox, acide hyaluronique, 300 à 500 € tous les 6 mois pour figer.',
    why: 'Ça paralyse ou comble. Ça ne corrige jamais les habitudes musculaires qui creusent.',
    truth: 'Effet temporaire. Les doses montent. Tu deviens dépendante.',
  },
  {
    n: '03',
    t: 'Les soins en institut',
    tried: 'Anti-âge, microneedling, radiofréquence, 80 à 200 € la séance.',
    why: 'Ponctuel. Tu repars avec les mêmes mimiques et tensions.',
    truth: 'Du bien sur l’instant. Zéro cause traitée.',
  },
]

export default function VenteEchecs({ cta }) {
  return (
    <section className="py-14 md:py-20 px-[5%] bg-white">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-10">
          <p className="section-badge justify-center">Avant YoGyFace</p>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
            POURQUOI CE QUE TU AS
            <br />
            <span className="font-serif italic text-corail font-semibold">
              déjà essayé n'a pas fonctionné
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {FAILS.map((f) => (
            <article
              key={f.n}
              className="rounded-2xl border border-noir/8 bg-creme/60 p-5 md:p-6 text-left"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-corail mb-2">
                Échec {f.n}
              </p>
              <h3 className="font-display font-black text-noir text-[17px] tracking-tight mb-4">
                {f.t}
              </h3>
              <p className="text-[13px] text-gris leading-relaxed mb-3">
                <span className="font-semibold text-noir/70">Essayé, </span>
                {f.tried}
              </p>
              <p className="text-[13px] text-gris leading-relaxed mb-3">
                <span className="font-semibold text-noir/70">Pourquoi, </span>
                {f.why}
              </p>
              <p className="text-[13px] text-noir/80 leading-relaxed font-medium">
                {f.truth}
              </p>
            </article>
          ))}
        </div>
        {cta && <div className="text-center mt-10">{cta}</div>}
      </div>
    </section>
  )
}
