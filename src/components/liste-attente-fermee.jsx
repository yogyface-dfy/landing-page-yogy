import { Link } from 'react-router-dom'
import SEO from './SEO'

/** Écran unique : formulaire fermé + anciens liens email AC. Jamais de lien /vente*. */
export default function ListeAttenteFermee({ path = '/liste-attente', noindex = false }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-[5%] pt-28 md:pt-32 pb-16">
      <SEO
        title="Liste d'attente fermée"
        description="La liste d'attente YoGyFace est fermée."
        path={path}
        noindex={noindex}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />
      <div className="max-w-lg mx-auto w-full relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noir text-white text-xs font-semibold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-corail" />
          Inscriptions closes
        </div>
        <h1 className="font-display text-[clamp(2rem,6vw,3.6rem)] font-black leading-[0.95] tracking-tighter text-noir mb-4">
          LISTE D'ATTENTE
          <br />
          <span className="font-serif italic text-corail font-semibold">fermée</span>
        </h1>
        <p className="text-gris text-[15px] md:text-[17px] leading-relaxed mb-8">
          Les inscriptions à la liste d'attente sont closes.
        </p>
        <Link to="/" className="btn-secondary px-7 py-3.5 inline-flex justify-center">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  )
}
