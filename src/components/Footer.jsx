import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-noir text-white py-14 md:py-20 px-[5%] relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-corail/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center mb-4 group">
              <span className="font-display font-black tracking-tighter text-white text-2xl">YoGyFace</span>
              <span className="text-corail text-2xl font-black group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">.</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-1">
              Reprends le contrôle de ton vieillissement facial grâce à la méthode RESET™ de Laury.
            </p>
            <p className="text-white/20 text-xs mb-5 font-serif italic">contact@yogyface.fr</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/yogyface/" target="_blank" rel="noreferrer" aria-label="Instagram YoGyFace"
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-corail hover:text-corail hover:scale-110 transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@LauryYoGyFace" target="_blank" rel="noreferrer" aria-label="YouTube Laury YoGyFace"
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-corail hover:text-corail hover:scale-110 transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="mailto:contact@yogyface.fr" aria-label="Envoyer un email à contact@yogyface.fr"
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-corail hover:text-corail hover:scale-110 transition-all duration-300">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white/80 font-semibold text-sm mb-5 uppercase tracking-wider text-[11px]">Navigation</h4>
            <ul className="space-y-3">
              {[['/', 'Accueil'], ['/about', 'Mon Parcours'], ['/programme', 'Programme'], ['/transformations', 'Transformations'], ['/evenements', 'Événements']].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="text-white/40 text-sm hover:text-corail transition-colors duration-300">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 font-semibold text-sm mb-5 uppercase tracking-wider text-[11px]">Support</h4>
            <ul className="space-y-3">
              {[['/faq', 'FAQ'], ['/contact', 'Contact'], ['/liste-attente', 'Liste d\'attente']].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="text-white/40 text-sm hover:text-corail transition-colors duration-300">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 font-semibold text-sm mb-5 uppercase tracking-wider text-[11px]">Légal</h4>
            <ul className="space-y-3">
              {[['/mentions-legales', 'Mentions légales'], ['/confidentialite', 'Confidentialité'], ['/cgv', 'CGV']].map(([href, label]) => (
                <li key={href + label}>
                  <Link to={href} className="text-white/40 text-sm hover:text-corail transition-colors duration-300">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-sm">© YOGYFACE, 2026 · Méthode RESET™</p>
          <p className="text-white/10 text-xs font-serif italic text-center sm:text-right break-words">Reprogrammation neuro-faciale par Laury · contact@yogyface.fr</p>
        </div>
      </div>
    </footer>
  )
}
