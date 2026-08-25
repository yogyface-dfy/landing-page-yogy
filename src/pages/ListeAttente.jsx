import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { createRecord } from "../lib/airtable";
import { captureEvent } from "../lib/analytics";
import { rememberPrefillEmail } from "../lib/stripe-checkout";
import SEO from "../components/SEO";

const reassurances = [
  "Accès aux ventes privées du lancement",
  "Plateforme YoGyFace en avant-première",
  "Bonus réservés aux inscrites",
  "Aucun engagement — tu décides plus tard",
  "700+ femmes m'ont déjà fait confiance",
];

const whyWaitlist = [
  {
    icon: "sparkles",
    title: "Ventes privées",
    desc: "Les inscrites ouvrent avant tout le monde, avec une offre réservée — pas le tarif ni les conditions du grand public.",
  },
  {
    icon: "leaf",
    title: "La plateforme en avant-première",
    desc: "L'application YoGyFace, le diagnostic V2, les nouveaux exercices et le nouveau programme : tu y entres avant le lancement public.",
  },
  {
    icon: "flower",
    title: "Des bonus exclusifs",
    desc: "La liste d'attente débloque des bonus que le lancement public n'aura pas. Le détail t'est envoyé après ton inscription.",
  },
  {
    icon: "pen",
    title: "Toujours fait main",
    desc: "Derrière la nouvelle plateforme, chaque programme reste personnalisé par moi. La V2 change les outils — pas l'exigence.",
  },
];

export default function ListeAttente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ prenom: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.prenom || !form.email) return;
    setLoading(true);
    setError("");
    try {
      await createRecord("Liste d'attente", {
        Prénom: form.prenom,
        Email: form.email,
      });
      captureEvent("waitlist_signup"); // conversion : inscription liste d'attente
      rememberPrefillEmail(form.email); // préremplit Stripe si elle ouvre /vente-vip
      navigate("/merci-liste-attente");
    } catch (err) {
      console.error("Airtable error:", err);
      setError(
        "Une erreur est survenue. Réessaie ou contacte-nous à contact@yogyface.fr",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Liste d'attente — Lancement YoGyFace"
        description="Inscris-toi pour accéder aux ventes privées du nouveau programme YoGyFace et à la plateforme en avant-première, avec des bonus réservés."
        path="/liste-attente"
      />
      {/* Hero */}
      <section className="relative md:min-h-screen flex items-center pt-28 md:pt-24 pb-12 md:pb-16 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-corail/6 blur-3xl pointer-events-none animate-pulse-soft" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-bleu/15 rounded-full blur-3xl pointer-events-none animate-float-slow hidden md:block" />

        <div className="max-w-[700px] mx-auto w-full relative z-10 text-center">
          <div
            className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noir text-white text-xs font-semibold uppercase tracking-widest mb-6 md:mb-8"
            data-anim="scale"
            data-delay="100"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
            Lancement — liste d'attente
          </div>

          <div className="animate-on-scroll" data-anim="scale" data-delay="200">
            <h1 className="font-display text-[clamp(2rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
              ENTRE AVANT
            </h1>
            <p className="font-serif italic text-[clamp(1.5rem,6vw,4rem)] text-corail font-semibold mb-4">
              tout le monde
            </p>
          </div>

          <p
            className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed mb-3 md:mb-4 max-w-xl mx-auto"
            data-delay="400"
          >
            Nouveau diagnostic, nouveaux exercices, nouveau programme — et
            l'application YoGyFace. La liste d'attente ouvre les{" "}
            <strong className="text-noir">ventes privées</strong> et l'accès à
            la plateforme en avant-première.
          </p>
          <p
            className="animate-on-scroll text-gris/60 text-[13px] md:text-[15px] mb-8 md:mb-10 max-w-xl mx-auto"
            data-delay="500"
          >
            Plus des <strong className="text-noir">bonus réservés</strong> aux
            inscrites. Aucun paiement maintenant. Aucun engagement.
          </p>

          {/* Form */}
          <div className="animate-on-scroll" data-anim="scale" data-delay="600">
            <div className="glass rounded-2xl p-5 md:p-8 shadow-xl border border-white/60">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
                <div className="text-left">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-gris mb-1.5">
                    Ton prénom
                  </label>
                  <input
                    type="text"
                    value={form.prenom}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, prenom: e.target.value }))
                    }
                    className="w-full px-4 py-3 md:py-3.5 rounded-xl border border-noir/8 text-sm focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10 transition-all duration-300 bg-white/80"
                    placeholder="Ton prénom"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-gris mb-1.5">
                    Ton email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, email: e.target.value }))
                    }
                    className="w-full px-4 py-3 md:py-3.5 rounded-xl border border-noir/8 text-sm focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10 transition-all duration-300 bg-white/80"
                    placeholder="ton@email.com"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-corail w-full text-sm md:text-base py-3.5 md:py-4 disabled:opacity-60 disabled:cursor-wait"
              >
                {loading
                  ? "Inscription en cours…"
                  : "Rejoindre la liste d'attente"}
              </button>
              {error && (
                <p className="text-red-500 text-xs text-center mt-2">{error}</p>
              )}
              <div className="flex items-center justify-center gap-2 mt-4 text-gris/50 text-xs">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Aucun paiement requis. Aucun engagement.</span>
              </div>
              <p className="text-center text-gris/30 text-xs mt-2 font-serif italic">
                700+ femmes m'ont déjà fait confiance
              </p>
            </div>
          </div>

          {/* Reassurances */}
          <div
            className="animate-on-scroll mt-6 md:mt-8 flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-2"
            data-delay="800"
          >
            {reassurances.map((r, i) => (
              <span
                key={i}
                className="text-[11px] md:text-xs text-gris/50 flex items-center gap-1.5"
              >
                <span className="text-corail/60">✓</span> {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi une liste d'attente */}
      <section className="py-16 md:py-28 px-[5%] bg-creme relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose/20 rounded-full blur-3xl pointer-events-none animate-float hidden md:block" />

        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left: text + cards */}
            <div className="pb-4 md:pb-0">
              <div className="animate-on-scroll" data-anim="fade">
                <div className="section-badge">
                  Pourquoi une liste d'attente ?
                </div>
                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tighter text-noir mb-3 md:mb-4">
                  PARCE QUE CE
                  <br />
                  <span className="font-serif italic text-corail font-semibold">
                    n'est pas un simple replay
                  </span>
                </h2>
                <p className="text-gris mb-6 md:mb-8 text-[14px] md:text-[16px] leading-relaxed">
                  C'est le lancement de la V2 : une plateforme dédiée, un
                  diagnostic et des exercices refondus, un programme réécrit.
                  Les inscrites y accèdent en privé, avant le reste.
                </p>
              </div>
              <div className="space-y-3 md:space-y-4">
                {whyWaitlist.map((item, i) => (
                  <div
                    key={item.title}
                    className="animate-on-scroll card-hover bg-white rounded-2xl p-4 md:p-6 border border-noir/5 flex gap-4 md:gap-5 group hover:border-corail/15"
                    data-anim="fade"
                    data-delay={`${i * 100 + 200}`}
                  >
                    <div className="w-9 md:w-10 h-9 md:h-10 rounded-xl bg-corail/10 flex items-center justify-center text-corail shrink-0 group-hover:bg-corail group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Icon name={item.icon} size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-[14px] md:text-[16px] tracking-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gris text-xs md:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: photo */}
            <div
              className="animate-on-scroll relative overflow-hidden"
              data-anim="scale"
              data-delay="200"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-rose/20 to-corail/10 rounded-3xl blur-2xl pointer-events-none opacity-60 hidden md:block" />
              <div className="absolute -top-3 -right-3 w-16 md:w-20 h-16 md:h-20 border-2 border-corail/15 rounded-2xl pointer-events-none hidden sm:block" />
              <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="/laury-handmade.webp"
                  alt="Laury — création artisanale des programmes, stylo et téléphone en main"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
