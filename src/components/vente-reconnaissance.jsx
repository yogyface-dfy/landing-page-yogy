const THOUGHTS = [
  {
    t: "« Je ne me reconnais plus. »",
    d: "Les rides se creusent, le visage s'affaisse. Ce moment de non-reconnaissance face au miroir, après 35 ans, tu n'es pas la seule.",
  },
  {
    t: "« J'ai dépensé des fortunes. »",
    d: "Crèmes, soins, injections… et jamais de vrai avant / après. Plus de 80 % de mes clientes dépensaient 100 € tous les 2–3 mois, pour rien de durable.",
  },
  {
    t: "« Je n'ai pas le temps. »",
    d: "Travail, enfants, maison. 8 minutes bien faites suffisent. Tu as déjà plus de 30 minutes de téléphone par jour, on en prend une petite part.",
  },
]

export default function VenteReconnaissance() {
  return (
    <section className="py-14 md:py-20 px-[5%] bg-creme">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-10">
          <p className="section-badge justify-center">Si tu te reconnais</p>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
            TU ES AU
            <br />
            <span className="font-serif italic text-corail font-semibold">
              bon endroit
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {THOUGHTS.map((item) => (
            <article
              key={item.t}
              className="rounded-2xl bg-white border border-noir/5 p-5 md:p-6 text-left shadow-sm"
            >
              <h3 className="font-serif italic text-corail text-[17px] md:text-[18px] font-semibold mb-3 leading-snug">
                {item.t}
              </h3>
              <p className="text-gris text-[14px] leading-relaxed">{item.d}</p>
            </article>
          ))}
        </div>
        <p className="text-center text-noir/70 text-[15px] leading-relaxed mt-8 max-w-2xl mx-auto">
          Tu n'es ni difficile, ni un cas désespéré. Il existe une solution qui
          s'attaque aux <strong className="text-noir">causes</strong>, pas
          seulement aux symptômes.
        </p>
      </div>
    </section>
  )
}
