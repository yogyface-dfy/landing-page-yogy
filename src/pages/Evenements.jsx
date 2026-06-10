import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import events from "../data/events";

export default function Evenements() {
  const { hash } = useLocation();

  // Scroll to anchor on load
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [hash]);

  return (
    <>
      <SEO
        title="Événements & Interventions"
        description="Découvrez les événements et interventions de Laury pour les plus grandes marques : ateliers yoga du visage, conférences bien-être et masterclasses exclusives."
        path="/evenements"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pb-24 px-[7%] md:px-[10%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-creme via-white to-white pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-corail/10 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <div className="animate-on-scroll section-badge justify-center" data-anim="fade">
            Marques & Collaborations
          </div>
          <div className="animate-on-scroll" data-anim="fade" data-delay="100">
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
              MES ÉVÉNEMENTS
            </h1>
            <p className="font-serif italic text-[clamp(1.5rem,4vw,2.5rem)] text-corail font-semibold">
              pour les plus grandes marques
            </p>
          </div>
          <p className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed mt-6 max-w-xl mx-auto" data-delay="200">
            J'interviens auprès de grandes maisons pour des ateliers, conférences et masterclasses autour du yoga du visage et du bien-être naturel.
          </p>
        </div>
      </section>

      {/* Events grid */}
      <section className="pb-20 md:pb-28 px-[5%]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {events.map((ev, i) => (
            <Link
              key={ev.id}
              id={ev.id}
              to={`/evenements/${ev.id}`}
              className="animate-on-scroll scroll-mt-28 block group"
              data-anim="fade"
              data-delay={`${i * 80}`}
            >
              <div className="rounded-2xl border border-noir/5 group-hover:border-corail/15 bg-white overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-corail/5 h-full">
                {ev.img ? (
                  <img src={ev.img} alt={ev.title} loading="lazy" className="w-full h-56 md:h-72 object-cover" />
                ) : (
                  <div className="w-full h-56 md:h-72 bg-gradient-to-br from-creme to-rose/20 flex items-center justify-center">
                    <span className="font-display font-black text-4xl md:text-5xl text-noir/8 tracking-tighter">
                      {ev.brand}
                    </span>
                  </div>
                )}

                <div className="p-6 md:p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-corail/10 text-corail text-[11px] font-semibold uppercase tracking-wider mb-3">
                    {ev.brand}
                  </span>

                  <h2 className="font-display font-black text-xl md:text-2xl tracking-tight text-noir mb-2">
                    {ev.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-xs text-gris mb-4">
                    <span className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-corail/50">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {ev.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-corail/50">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {ev.location}
                    </span>
                  </div>

                  <p className="text-gris text-[14px] md:text-[15px] leading-relaxed">
                    {ev.description}
                  </p>

                  <span className="inline-flex items-center gap-1 mt-4 text-corail text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                    Voir le détail →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
