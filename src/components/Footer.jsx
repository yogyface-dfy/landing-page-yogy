import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-noir text-white py-14 md:py-20 px-[5%] relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-corail/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4">
              <img src="/logo-yogyface-light.png" alt="YoGyFace" width={521} height={170} className="h-8 w-auto" />
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
              <a href="https://fr.pinterest.com/yogyface/" target="_blank" rel="noreferrer" aria-label="Pinterest YoGyFace"
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-corail hover:text-corail hover:scale-110 transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345c-.091.378-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
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
              {[['/', 'Accueil'], ['/about', 'Mon Parcours'], ['/programme', 'Programme'], ['/transformations', 'Transformations']].map(([href, label]) => (
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
          <p className="text-white/20 text-sm">© YoGyFace, 2026 · Méthode RESET™</p>
          <p className="text-white/10 text-xs font-serif italic text-center sm:text-right break-words">Reprogrammation neuro-faciale par Laury · contact@yogyface.fr</p>
        </div>
      </div>
    </footer>
  )
}
