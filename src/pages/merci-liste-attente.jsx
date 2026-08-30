import SEO from "../components/SEO";
import YouTubeEmbed from "../components/YouTubeEmbed";
import VenteResultats from "../components/vente-resultats";
import WaitlistAvis from "../components/waitlist-avis";
import WaitlistMetaConversion from "../components/waitlist-meta-conversion";

/** Id YouTube de Laury — laisser vide tant que la vidéo n'est pas montée. */
const LAURY_VIDEO_ID = "";

const NEXT = [
  {
    n: "1",
    t: "Vérifie tes emails",
    d: "Un message de confirmation part dans les minutes qui suivent — pense aux spams.",
  },
  {
    n: "2",
    t: "10 septembre — ouverture privée",
    d: "Tu reçois le lien en premier. 50 places de membres fondatrices. Quand c'est complet, c'est complet.",
  },
  {
    n: "3",
    t: "Sois là dès la première heure",
    d: "Comme un concert : celles qui sont connectées au drop prennent leur place.",
  },
];

/**
 * Confirmation liste d'attente.
 * Non indexée (noindex + robots.txt + X-Robots-Tag).
 */
export default function MerciListeAttente() {
  return (
    <>
      <WaitlistMetaConversion />
      <SEO
        title="Inscription confirmée"
        description="Tu es inscrite : ouverture privée le 10 septembre, 50 places de membres fondatrices. Vérifie tes emails."
        path="/merci-liste-attente"
        noindex
      />

      <section className="relative pt-28 md:pt-32 pb-16 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full bg-corail/6 blur-3xl pointer-events-none" />

        <div className="max-w-[620px] mx-auto w-full relative z-10 text-center">
          <div
            className="animate-on-scroll inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corail/8 text-corail text-xs font-semibold mb-5"
            data-delay="80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
            Inscription confirmée
          </div>
          <h1
            className="animate-on-scroll font-display text-[clamp(2rem,6vw,3.6rem)] font-black leading-[0.95] tracking-tighter text-noir mb-4"
            data-delay="120"
          >
            TU ES SUR
            <br />
            <span className="font-serif italic text-corail font-semibold">
              la liste.
            </span>
          </h1>
          <p
            className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed mb-6"
            data-delay="180"
          >
            Tu vas recevoir un{" "}
            <strong className="text-noir">email de confirmation</strong> — pense
            à vérifier tes spams.
          </p>

          {/* FOMO : date + 50 places — pas de compteur fake */}
          <div
            className="animate-on-scroll text-left rounded-3xl bg-noir text-white px-5 py-5 mb-10"
            data-delay="220"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">
              Ouverture privée
            </p>
            <p className="font-display font-black text-[1.65rem] tracking-tight leading-none mb-3">
              10 septembre
            </p>
            <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed">
              <strong className="text-white">50 places</strong> de membres
              fondatrices. Sois connectée dès la première heure — une fois
              complet, c'est fermé.
            </p>
          </div>

          {LAURY_VIDEO_ID && (
            <div className="animate-on-scroll mb-10" data-delay="250">
              <YouTubeEmbed id={LAURY_VIDEO_ID} title="Message de Laury — YoGyFace" />
            </div>
          )}

          <p
            className="animate-on-scroll text-[11px] font-semibold uppercase tracking-[0.18em] text-noir/30 mb-3 text-left"
            data-delay="270"
          >
            Et ensuite
          </p>
          <div
            className="animate-on-scroll text-left space-y-3 mb-8"
            data-delay="280"
          >
            {NEXT.map((s) => (
              <div
                key={s.n}
                className="flex gap-4 p-4 rounded-2xl bg-white border border-noir/5 shadow-sm"
              >
                <span className="w-8 h-8 shrink-0 rounded-lg bg-corail text-white flex items-center justify-center font-display font-black text-sm">
                  {s.n}
                </span>
                <div>
                  <p className="font-medium text-sm text-noir">{s.t}</p>
                  <p className="text-gris text-[13px] leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VenteResultats proof="4.9/5 · 1 200 femmes déjà accompagnées" />
      <WaitlistAvis />
    </>
  );
}
