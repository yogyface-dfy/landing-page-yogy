import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import events from "../data/events";

export default function EvenementDetail() {
  const { id } = useParams();
  const ev = events.find((e) => e.id === id);

  if (!ev) return <Navigate to="/evenements" replace />;

  // noindex tant que le contenu est en placeholder (évite le thin content)
  const isPlaceholder = ev.date === "Placeholder";

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.title,
    description: ev.longDescription,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@type": "Organization", name: ev.brand },
    performer: { "@id": "https://yogyface.fr/#laury" },
    ...(ev.img && { image: `https://yogyface.fr${ev.img}` }),
    ...(!isPlaceholder && { startDate: ev.date }),
    ...(!isPlaceholder && {
      location: { "@type": "Place", name: ev.location },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://yogyface.fr/" },
      { "@type": "ListItem", position: 2, name: "Événements", item: "https://yogyface.fr/evenements" },
      { "@type": "ListItem", position: 3, name: ev.title, item: `https://yogyface.fr/evenements/${ev.id}` },
    ],
  };

  return (
    <>
      <SEO
        title={`${ev.title} — Événement YoGyFace`}
        description={ev.description}
        path={`/evenements/${ev.id}`}
        noindex={isPlaceholder}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(eventJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pb-20 px-[7%] md:px-[10%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-creme via-white to-white pointer-events-none" />

        <div className="max-w-[900px] mx-auto relative z-10">
          {/* Back link */}
          <Link
            to="/evenements"
            className="animate-on-scroll inline-flex items-center gap-2 text-sm text-gris hover:text-corail transition-colors mb-8"
            data-anim="fade"
          >
            ← Tous les événements
          </Link>

          <div className="animate-on-scroll" data-anim="fade" data-delay="100">
            <span className="inline-block px-3 py-1 rounded-full bg-corail/10 text-corail text-[11px] font-semibold uppercase tracking-wider mb-4">
              {ev.brand}
            </span>
            <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1] tracking-tighter text-noir mb-4">
              {ev.title}
            </h1>
            <div className="flex flex-wrap gap-5 text-sm text-gris mb-6">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-corail/50">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {ev.date}
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-corail/50">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {ev.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="px-[5%] -mt-4 mb-12">
        <div className="max-w-[900px] mx-auto">
          {ev.img ? (
            <div className="animate-on-scroll rounded-2xl overflow-hidden shadow-xl" data-anim="fade">
              <img src={ev.img} alt={ev.title} className="w-full h-auto" />
            </div>
          ) : (
            <div className="animate-on-scroll rounded-2xl overflow-hidden bg-gradient-to-br from-creme to-rose/20 h-64 md:h-96 flex items-center justify-center" data-anim="fade">
              <span className="font-display font-black text-5xl md:text-7xl text-noir/6 tracking-tighter">
                {ev.brand}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="px-[5%] pb-16 md:pb-24">
        <div className="max-w-[700px] mx-auto">
          <div className="animate-on-scroll" data-anim="fade" data-delay="100">
            <p className="text-noir/80 text-[16px] md:text-[18px] leading-[1.8]">
              {ev.longDescription}
            </p>
          </div>

          {/* Gallery placeholder */}
          {ev.gallery && ev.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display font-black text-xl tracking-tight text-noir mb-6">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ev.gallery.map((src, i) => (
                  <div key={i} className="animate-on-scroll rounded-xl overflow-hidden" data-anim="scale" data-delay={`${i * 80}`}>
                    <img src={src} alt={`${ev.title} — photo ${i + 1}`} loading="lazy" className="w-full h-auto" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials placeholder */}
          {ev.testimonials && ev.testimonials.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display font-black text-xl tracking-tight text-noir mb-6">Retours</h2>
              <div className="space-y-4">
                {ev.testimonials.map((t, i) => (
                  <div key={i} className="animate-on-scroll border-l-3 border-corail/40 pl-5 py-2" data-anim="fade" data-delay={`${i * 100}`}>
                    <p className="text-noir/70 text-[15px] leading-relaxed font-serif italic">"{t.text}"</p>
                    {t.name && <p className="text-corail text-sm font-semibold mt-2">— {t.name}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-[5%] bg-creme">
        <div className="max-w-[700px] mx-auto text-center animate-on-scroll" data-anim="scale">
          <h2 className="font-display font-black text-2xl tracking-tight text-noir mb-4">
            Vous souhaitez organiser un événement ?
          </h2>
          <p className="text-gris text-[15px] mb-6">
            J'interviens pour des ateliers, conférences et masterclasses sur-mesure.
          </p>
          <Link to="/contact" className="btn-corail text-base px-8 py-4">
            Me contacter →
          </Link>
        </div>
      </section>
    </>
  );
}
