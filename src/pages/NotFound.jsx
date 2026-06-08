import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-[5%]">
      <div className="text-center max-w-lg">
        <p className="font-display font-black text-[8rem] md:text-[12rem] leading-none tracking-tighter text-corail/15 select-none">
          404
        </p>
        <h1 className="font-display font-black text-2xl md:text-4xl tracking-tight text-noir -mt-8 md:-mt-12 mb-4">
          Page introuvable
        </h1>
        <p className="text-gris text-[15px] md:text-[17px] leading-relaxed mb-8">
          Cette page n'existe pas ou a été déplacée. Retourne à l'accueil pour découvrir YoGyFace et la méthode RESET.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary px-7 py-3.5 text-center">
            Retour à l'accueil
          </Link>
          <Link to="/contact" className="btn-secondary px-7 py-3.5 text-center">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  )
}
