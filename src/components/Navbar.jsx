import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '/',               label: 'Accueil' },
  { href: '/about',          label: 'Mon Parcours' },
  { href: '/programme',      label: 'Programme' },
  { href: '/transformations',label: 'Transformations' },
  // Événements masqué temporairement (données manquantes)
  // Articles masqué temporairement (page accessible par URL directe)
  // { href: '/articles',       label: 'Articles' },
  { href: '/faq',            label: 'FAQ' },
  { href: '/contact',        label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  // Bloque le scroll du fond quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 px-[5%] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
      scrolled
        ? 'py-2.5 glass shadow-sm'
        : 'py-5 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center group" aria-label="YoGyFace — Accueil">
          <img
            src="/logo-yogyface-dark.png"
            alt="YoGyFace"
            width={528}
            height={175}
            className="h-9 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-5 lg:gap-7 xl:gap-8 items-center">
          {links.map(({ href, label, wideOnly }) => {
            const active = location.pathname === href
            return (
              <Link
                key={href}
                to={href}
                className={`yf-navlink text-[13px] lg:text-[14px] font-medium ${wideOnly ? 'hidden lg:inline-flex' : ''} ${active ? 'text-noir font-semibold' : 'text-gris hover:text-noir transition-colors duration-300'}`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-corail/80 animate-pulse-soft" />}
                <span>{label}</span>
              </Link>
            )
          })}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/liste-attente"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-corail/10 text-corail font-semibold text-sm tracking-tight border border-corail/20 hover:bg-corail hover:text-white hover:border-corail hover:shadow-lg hover:shadow-corail/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            Liste d'attente
          </Link>
          <button
            className="md:hidden p-3 -mr-1 rounded-lg hover:bg-noir/5 transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-noir rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-noir rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block h-0.5 bg-noir rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile menu — full-screen overlay (hors du <nav> pour rester plein écran) */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-[100] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Header row mirroring navbar */}
        <div className="px-[5%] py-5 flex justify-between items-center">
          <Link to="/" className="inline-flex items-center" onClick={() => setMenuOpen(false)} aria-label="YoGyFace — Accueil">
            <img src="/logo-yogyface-dark.png" alt="YoGyFace" width={528} height={175} className="h-9 sm:h-10 w-auto" />
          </Link>
          <button
            className="p-2 rounded-lg hover:bg-noir/5 transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 flex flex-col gap-1 px-[5%] pt-4">
          {links.map(({ href, label }, i) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className={`py-3.5 px-4 text-[17px] font-medium rounded-xl transition-all duration-300 ${
                location.pathname === href
                  ? 'text-corail bg-corail/8'
                  : 'text-noir/70 hover:text-noir hover:bg-noir/3'
              }`}
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="px-[5%] pb-8">
          <Link
            to="/liste-attente"
            onClick={() => setMenuOpen(false)}
            className="btn-corail text-center block w-full"
          >
            Liste d'attente
          </Link>
        </div>
      </div>
    </>
  )
}
