import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import SEO from "../components/SEO";

/**
 * Page de confirmation après inscription à la liste d'attente.
 * Non indexée (noindex + robots.txt + X-Robots-Tag).
 */
export default function MerciListeAttente() {
  return (
    <>
      <SEO
        title="Inscription confirmée"
        description="Tu es inscrite : ventes privées du lancement YoGyFace, plateforme en avant-première et bonus réservés. Vérifie tes emails."
        path="/merci-liste-attente"
        noindex
      />

      <section className="relative min-h-[80vh] flex items-center pt-28 md:pt-32 pb-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full bg-corail/6 blur-3xl pointer-events-none" />

        <div className="max-w-[620px] mx-auto w-full relative z-10 text-center">
          <div
            className="animate-on-scroll w-16 h-16 mx-auto rounded-2xl bg-corail/10 flex items-center justify-center text-corail mb-6"
            data-anim="scale"
          >
            <Icon name="flower" size={32} />
          </div>
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
            className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed mb-3"
            data-delay="180"
          >
            Tu vas recevoir un{" "}
            <strong className="text-noir">email de confirmation</strong> — pense
            à vérifier tes spams.
          </p>
          <p
            className="animate-on-scroll text-gris text-[15px] leading-relaxed mb-8"
            data-delay="220"
          >
            Tu auras accès aux{" "}
            <strong className="text-noir">ventes privées</strong> du lancement
            et à la{" "}
            <strong className="text-noir">
              plateforme YoGyFace en avant-première
            </strong>
            , avec ces bonus&nbsp;:
          </p>

          {/* Cadeaux : un seul bloc, typo légère — distinct des étapes numérotées */}
          <div
            className="animate-on-scroll text-left rounded-3xl bg-rose/20 border border-corail/10 px-5 py-5 mb-12"
            data-delay="250"
          >
            <p className="font-serif italic text-corail text-[15px] mb-3">
              Tes cadeaux*
            </p>
            <ul className="space-y-2.5">
              {[
                "6h de coaching offertes",
                "6 mois d'accompagnement offerts",
                "Diagnostic complet offert",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2.5 text-[14px] md:text-[15px] text-noir/75"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-corail/70 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <p
            className="animate-on-scroll text-[11px] font-semibold uppercase tracking-[0.18em] text-noir/30 mb-3 text-left"
            data-delay="270"
          >
            Et ensuite
          </p>
          <div
            className="animate-on-scroll text-left space-y-3 mb-10"
            data-delay="280"
          >
            {[
              {
                n: "1",
                t: "Vérifie tes emails",
                d: "Tu vas également recevoir un message de confirmation, il va partir dans les minutes qui suivent.",
              },
              {
                n: "2",
                t: "Attends l'ouverture privée",
                d: "Tu recevras le lien des ventes privées avant le lancement public.",
              },
              {
                n: "3",
                t: "Entre en avant-première",
                d: "Application, diagnostic V2, nouveaux exercices — tu y accèdes avant les autres.",
              },
            ].map((s) => (
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

          <Link
            to="/"
            className="animate-on-scroll btn-secondary inline-flex text-sm px-6 py-3"
            data-delay="320"
          >
            Retour à l'accueil
          </Link>
          <p
            className="animate-on-scroll text-gris/40 text-[11px] mt-10"
            data-delay="360"
          >
            * Offre soumise à conditions.{" "}
            <Link to="/cgv#offres-vip" className="underline hover:text-corail">
              Voir les CGV
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
