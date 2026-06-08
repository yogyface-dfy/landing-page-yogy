import { useState } from 'react'
import Icon from '../components/Icon'
import { createRecord } from '../lib/airtable'

const reassurances = [
  'Je crée chaque programme à la main — c\'est pour ça que les places sont limitées',
  '10 min/jour — s\'intègre dans n\'importe quel quotidien',
  'Accessible depuis ton téléphone — pas d\'app à télécharger',
  'Aucun engagement — tu décides librement quand une place se libère',
  '1 500+ femmes m\'ont déjà fait confiance',
]

const whyWaitlist = [
  { icon: 'pen', title: 'Programmes faits main', desc: 'J\'analyse personnellement chaque visage et je construis chaque programme sur-mesure. Ça prend du temps — mais c\'est ce qui fait la différence.' },
  { icon: 'microscope', title: 'Diagnostic individuel', desc: 'Avant de commencer, j\'étudie ton visage en détail pour comprendre tes besoins spécifiques. Pas de programme générique, jamais.' },
  { icon: 'chat', title: 'Accompagnement réel', desc: 'Je suis vraiment présente pour chaque femme que j\'accompagne. C\'est pour ça que je ne peux pas prendre tout le monde en même temps.' },
  { icon: 'leaf', title: 'Qualité, pas quantité', desc: 'Je préfère accompagner moins de femmes mais mieux. La liste d\'attente me permet de garantir cette qualité.' },
]

export default function VIP() {
  const [form, setForm] = useState({ prenom: '', email: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.prenom || !form.email) return
    setLoading(true)
    setError('')
    try {
      await createRecord('Liste d\'attente', {
        'Prénom': form.prenom,
        'Email': form.email,
      })
      setSent(true)
    } catch (err) {
      console.error('Airtable error:', err)
      setError('Une erreur est survenue. Réessaie ou contacte-nous à contact@yogyface.fr')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-corail/6 blur-3xl pointer-events-none animate-pulse-soft" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-bleu/15 rounded-full blur-3xl pointer-events-none animate-float-slow hidden md:block" />

        <div className="max-w-[700px] mx-auto w-full relative z-10 text-center">
          <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noir text-white text-xs font-semibold uppercase tracking-widest mb-6 md:mb-8" data-anim="scale" data-delay="100">
            <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
            Liste d'attente
          </div>

          <div className="animate-on-scroll" data-anim="scale" data-delay="200">
            <h1 className="font-display text-[clamp(2rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-2">
              CHAQUE PROGRAMME
            </h1>
            <h1 className="font-serif italic text-[clamp(1.5rem,6vw,4rem)] text-corail font-semibold mb-4">
              est unique
            </h1>
          </div>

          <p className="animate-on-scroll text-gris text-[15px] md:text-[17px] leading-relaxed mb-3 md:mb-4 max-w-xl mx-auto" data-delay="400">
            Je crée chaque programme à la main, personnalisé pour chaque visage. C'est un travail artisanal — et c'est pour ça que les places sont limitées.
          </p>
          <p className="animate-on-scroll text-gris/60 text-[13px] md:text-[15px] mb-8 md:mb-10 max-w-xl mx-auto" data-delay="500">
            Inscris-toi sur la liste d'attente pour être <strong className="text-noir">prévenue en priorité</strong> dès qu'une place se libère.
          </p>

          {/* Form */}
          <div className="animate-on-scroll" data-anim="scale" data-delay="600">
            {sent ? (
              <div className="glass rounded-2xl p-6 md:p-8 border border-corail/20 shadow-xl text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-corail/10 flex items-center justify-center text-corail mb-5">
                  <Icon name="flower" size={30} />
                </div>
                <h3 className="font-display font-black text-xl md:text-2xl tracking-tight mb-3">Tu es sur la liste !</h3>
                <p className="text-gris text-[14px] md:text-[15px] leading-relaxed mb-3">
                  Tu vas recevoir un <strong className="text-noir">email de confirmation</strong> — pense à vérifier tes spams.
                </p>
                <p className="text-gris text-[14px] md:text-[15px] leading-relaxed mb-5">
                  Je te contacterai personnellement dès qu'une place se libère. <strong className="text-noir">Je réponds sous 48h</strong>, du lundi au vendredi.
                </p>
                <div className="inline-flex items-center gap-2 text-xs text-corail font-semibold bg-corail/8 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-corail animate-pulse" />
                  Inscription confirmée
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-5 md:p-8 shadow-xl border border-white/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
                  <div className="text-left">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gris mb-1.5">Ton prénom</label>
                    <input
                      type="text"
                      value={form.prenom}
                      onChange={e => setForm(v => ({ ...v, prenom: e.target.value }))}
                      className="w-full px-4 py-3 md:py-3.5 rounded-xl border border-noir/8 text-sm focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10 transition-all duration-300 bg-white/80"
                      placeholder="Ton prénom"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gris mb-1.5">Ton email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(v => ({ ...v, email: e.target.value }))}
                      className="w-full px-4 py-3 md:py-3.5 rounded-xl border border-noir/8 text-sm focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10 transition-all duration-300 bg-white/80"
                      placeholder="ton@email.com"
                    />
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={loading} className="btn-corail w-full text-sm md:text-base py-3.5 md:py-4 disabled:opacity-60 disabled:cursor-wait">
                  {loading ? 'Inscription en cours…' : 'Rejoindre la liste d\'attente'}
                </button>
                {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
                <div className="flex items-center justify-center gap-2 mt-4 text-gris/50 text-xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  <span>Aucun paiement requis. Aucun engagement.</span>
                </div>
                <p className="text-center text-gris/30 text-xs mt-2 font-serif italic">1 500+ femmes m'ont déjà fait confiance</p>
              </div>
            )}
          </div>

          {/* Reassurances */}
          <div className="animate-on-scroll mt-6 md:mt-8 flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-2" data-delay="800">
            {reassurances.map((r, i) => (
              <span key={i} className="text-[11px] md:text-xs text-gris/50 flex items-center gap-1.5">
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
                <div className="section-badge">Pourquoi une liste d'attente ?</div>
                <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-1">
                  PARCE QUE JE FAIS
                </h2>
                <h2 className="font-serif italic text-[clamp(1.5rem,4vw,2.5rem)] text-corail font-semibold mb-3 md:mb-4">
                  tout à la main
                </h2>
                <p className="text-gris mb-6 md:mb-8 text-[14px] md:text-[16px] leading-relaxed">
                  Contrairement aux programmes génériques, chaque accompagnement YoGyFace est entièrement personnalisé par moi. C'est un choix — celui de la qualité.
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
                      <h3 className="font-display font-black text-[14px] md:text-[16px] tracking-tight mb-1">{item.title}</h3>
                      <p className="text-gris text-xs md:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: photo */}
            <div className="animate-on-scroll relative overflow-hidden" data-anim="scale" data-delay="200">
              <div className="absolute -inset-4 bg-gradient-to-br from-rose/20 to-corail/10 rounded-3xl blur-2xl pointer-events-none opacity-60 hidden md:block" />
              <div className="absolute -top-3 -right-3 w-16 md:w-20 h-16 md:h-20 border-2 border-corail/15 rounded-2xl pointer-events-none hidden sm:block" />
              <div className="img-zoom rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="/laury-handmade.png"
                  alt="Laury — création artisanale des programmes, stylo et téléphone en main"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
