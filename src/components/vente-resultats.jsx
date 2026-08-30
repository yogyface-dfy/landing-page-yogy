import { useEffect, useRef, useState } from 'react'

/**
 * Avant/après de vente. Remplace `img` quand les visuels dédiés arrivent.
 * ba-04 (triptyque) est volontairement exclu.
 */
const RESULTS = [
  { img: '/ba-01.webp', name: 'Céline', duration: '8 semaines', zone: 'Cou & relâchement' },
  { img: '/ba-02.webp', name: 'Audrey', duration: '6 semaines', zone: 'Double menton' },
  { img: '/ba-03.webp', name: 'Corinne', duration: '3 mois', zone: 'Sillons nasogéniens' },
  { img: '/ba-05.webp', name: 'Carine', duration: '3 mois', zone: 'Ovale & bajoues' },
  { img: '/ba-06.webp', name: 'Peggy', duration: '1 mois', zone: 'Double menton' },
  { img: '/ba-07.webp', name: 'Jennifer', duration: '3 mois', zone: 'Sillons nasogéniens' },
  { img: '/ba-09.webp', name: 'Marie-Laure', duration: '2 mois', zone: 'Volume & bajoues' },
  { img: '/ba-12.webp', name: 'Emmanuelle', duration: '3 mois', zone: 'Poches & sillons' },
]

const INTERVAL_MS = 4000

/**
 * Carrousel auto-swipe (pause au survol / au touch).
 * @param {{ cta?: React.ReactNode, proof?: string }} props
 */
export default function VenteResultats({ cta, proof = '4.9/5 · 700+ femmes déjà accompagnées' }) {
  const scroller = useRef(null)
  const indexRef = useRef(0)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = (i) => {
    const el = scroller.current
    if (!el) return
    const next = (i + RESULTS.length) % RESULTS.length
    indexRef.current = next
    setActive(next)
    const card = el.children[next]
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduce) return
    const id = setInterval(() => goTo(indexRef.current + 1), INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="px-[5%] max-w-[1100px] mx-auto text-center mb-8">
        <p className="flex items-center justify-center gap-2 text-sm text-noir mb-3">
          <span className="text-corail tracking-tight" aria-hidden>★★★★★</span>
          <span className="text-gris">{proof}</span>
        </p>
        <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
          DES RÉSULTATS
          <br />
          <span className="font-serif italic text-corail font-semibold">visibles, dans le miroir</span>
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <div
          ref={scroller}
          className="flex gap-3 md:gap-4 overflow-x-auto px-[5%] snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carousel"
          aria-label="Résultats avant / après"
        >
          {RESULTS.map((r) => (
            <article key={r.img} className="snap-start shrink-0 w-[82%] sm:w-[48%] md:w-[36%] rounded-2xl overflow-hidden bg-creme">
              <div className="relative">
                <img src={r.img} alt={`Avant / après — ${r.name}, ${r.zone}`} loading="lazy" className="w-full h-auto block" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 text-[10px] font-semibold uppercase tracking-wider text-gris">
                  Avant
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-corail text-[10px] font-semibold uppercase tracking-wider text-white">
                  Après
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <p className="text-xs font-semibold text-noir">{r.name} · {r.zone}</p>
                <p className="text-[11px] text-gris">{r.duration}</p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Résultat précédent"
          onClick={() => goTo(indexRef.current - 1)}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white shadow-md border border-noir/8 text-noir"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Résultat suivant"
          onClick={() => goTo(indexRef.current + 1)}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white shadow-md border border-noir/8 text-noir"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-1.5 mt-5" role="tablist" aria-label="Pagination des résultats">
        {RESULTS.map((r, i) => (
          <button
            key={r.img}
            type="button"
            aria-label={`Résultat ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-noir' : 'w-1.5 bg-noir/20'}`}
          />
        ))}
      </div>

      {cta && (
        <div className="px-[5%] mt-8 text-center flex justify-center">
          {cta}
        </div>
      )}
    </section>
  )
}
