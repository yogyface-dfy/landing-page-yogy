import { useState } from 'react'
import Icon from '../components/Icon'
import SEO from '../components/SEO'
import { createRecord } from '../lib/airtable'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ nom: '', email: '', sujet: 'Question générale', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nom || !form.email || !form.message) return
    setLoading(true)
    setError('')
    try {
      await createRecord('Messages Contact', {
        'Nom': form.nom,
        'Email': form.email,
        'Sujet': form.sujet,
        'Message': form.message,
      })
      setSent(true)
    } catch (err) {
      console.error('Airtable error:', err)
      setError('Une erreur est survenue. Réessaie ou écris-nous à contact@yogyface.fr')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Une question sur YoGyFace ou la méthode RESET™ ? Contacte Laury directement. Réponse sous 48h, du lundi au vendredi."
        path="/contact"
      />
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 px-[5%]">
        <div className="max-w-[600px] mx-auto text-center">
          <div className="section-badge justify-center">Restons en contact</div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-noir mb-6">
            RESTONS<br />
            <span className="text-corail">CONNECTÉES</span>
          </h1>
          <p className="text-gris text-[15px] md:text-[17px] leading-relaxed">
            Que tu aies une question, besoin d'aide ou juste envie de dire bonjour, on est toujours heureuses de t'entendre.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 pb-24 px-[5%]">
        <div className="max-w-[600px] mx-auto">
          {sent ? (
            <div className="text-center py-16 bg-creme rounded-3xl border border-noir/5 px-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-corail/10 flex items-center justify-center text-corail mb-6">
                <Icon name="flower" size={32} />
              </div>
              <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight mb-3">Message bien reçu !</h2>
              <p className="text-gris text-[15px] md:text-[16px] leading-relaxed mb-4 max-w-md mx-auto">
                Merci de m'avoir écrit. Tu vas recevoir un <strong className="text-noir">email de confirmation</strong> à l'adresse que tu as indiquée.
              </p>
              <p className="text-gris text-[15px] md:text-[16px] leading-relaxed mb-6 max-w-md mx-auto">
                Je lis personnellement chaque message et <strong className="text-noir">je te réponds sous 48h</strong>, du lundi au vendredi.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-corail font-semibold bg-corail/8 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-corail animate-pulse" />
                Pense à vérifier tes spams
              </div>
            </div>
          ) : (
            <div className="animate-on-scroll bg-creme rounded-3xl p-5 md:p-8 border border-noir/5">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gris mb-2">Nom</label>
                    <input
                      type="text"
                      value={form.nom}
                      onChange={e => setForm(v => ({ ...v, nom: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-noir/10 text-noir text-sm focus:outline-none focus:border-corail transition-colors"
                      placeholder="Ton prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gris mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(v => ({ ...v, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-noir/10 text-noir text-sm focus:outline-none focus:border-corail transition-colors"
                      placeholder="ton@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gris mb-2">Sujet</label>
                  <select
                    value={form.sujet}
                    onChange={e => setForm(v => ({ ...v, sujet: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-noir/10 text-noir text-sm focus:outline-none focus:border-corail transition-colors"
                  >
                    <option>Question générale</option>
                    <option>Support technique</option>
                    <option>Partenariat / Presse</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gris mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-noir/10 text-noir text-sm focus:outline-none focus:border-corail transition-colors resize-none"
                    placeholder="Ton message..."
                  />
                </div>

                <button onClick={handleSubmit} disabled={loading} className="btn-corail w-full text-base py-4 disabled:opacity-60 disabled:cursor-wait">
                  {loading ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>
                {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
                <p className="text-center text-gris/50 text-xs">Nous te répondons sous 24h.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
