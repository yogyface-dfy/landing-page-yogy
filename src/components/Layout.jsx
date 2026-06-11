import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useCallback, Suspense } from 'react'
import { Head } from 'vite-react-ssg'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import { initAnalytics, capturePageview } from '../lib/analytics'

/* JSON-LD structured data for Google rich results */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': 'https://yogyface.fr/#business',
  name: 'YoGyFace',
  description: 'Méthode RESET™ de yoga du visage par Laury. Programmes personnalisés pour tonifier, lifter et rajeunir le visage naturellement.',
  url: 'https://yogyface.fr',
  logo: 'https://yogyface.fr/favicon.png',
  image: 'https://yogyface.fr/og-image.jpg',
  founder: { '@id': 'https://yogyface.fr/#laury' },
  email: 'contact@yogyface.fr',
  sameAs: [
    'https://www.instagram.com/yogyface/',
    'https://www.youtube.com/@LauryYoGyFace',
    'https://fr.trustpilot.com/review/yogyface.fr',
  ],
}

/* Standalone Person schema for Laury (E-E-A-T) */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://yogyface.fr/#laury',
  name: 'Laury Anater',
  jobTitle: 'Fondatrice & experte en yoga du visage',
  description: "Fondatrice de YoGyFace et créatrice de la méthode RESET™. Plus de 10 ans d'expérience dans les plus grands laboratoires cosmétiques (Chanel, L'Oréal, Weleda), formée auprès de Sylvie LeFranc, Ena Narumi et Fumiko Takatsu.",
  url: 'https://yogyface.fr/about',
  worksFor: { '@id': 'https://yogyface.fr/#business' },
  sameAs: [
    'https://www.instagram.com/yogyface/',
    'https://www.youtube.com/@LauryYoGyFace',
  ],
}

export default function Layout() {
  const { pathname } = useLocation()

  /* Analytics : (ré)active PostHog si le consentement a déjà été donné. */
  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  /* Pageview à chaque navigation (sans effet si non consenti). */
  useEffect(() => {
    capturePageview()
  }, [pathname])

  /* (Ré)initialise les widgets Trustpilot — le script ne scanne qu'au 1er
     chargement, donc on relance le rendu à chaque navigation (avec retry tant
     que le script async n'est pas prêt). */
  useEffect(() => {
    const load = () => {
      if (!window.Trustpilot) return false
      document
        .querySelectorAll('.trustpilot-widget')
        .forEach(el => window.Trustpilot.loadFromElement(el, true))
      return true
    }
    if (load()) return
    const interval = setInterval(() => { if (load()) clearInterval(interval) }, 300)
    const timeout = setTimeout(() => clearInterval(interval), 6000)
    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [pathname])

  /* Enhanced scroll observer — supports data-anim variants and staggered delays.
     Crée un observer unique et n'observe que les éléments pas encore visibles. */
  const createObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => entry.target.classList.add('visible'), Number(delay))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    return observer
  }, [])

  useEffect(() => {
    const observer = createObserver()
    const observeNew = () =>
      document
        .querySelectorAll('.animate-on-scroll:not(.visible), .line-draw:not(.visible)')
        .forEach(el => observer.observe(el))

    /* Les pages chargées en lazy (code-splitting) montent APRÈS ce 1er passage :
       on re-scanne le DOM par petites passes pour observer les éléments dès
       qu'ils apparaissent, ce qui garantit l'animation progressive partout. */
    observeNew()
    let tries = 0
    const interval = setInterval(() => {
      observeNew()
      if (++tries > 30) clearInterval(interval)
    }, 100)

    return () => { observer.disconnect(); clearInterval(interval) }
  }, [pathname, createObserver])

  /* Parallax on floating decorative elements */
  useEffect(() => {
    const parallaxEls = document.querySelectorAll('[data-parallax]')
    if (!parallaxEls.length) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.1
          el.style.transform = `translateY(${scrollY * speed}px)`
        })
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <div className="grain font-sans text-noir antialiased overflow-x-hidden">
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </Head>
      <Navbar />
      <main>
        {/* Suspense : fallback pendant le chargement des chunks de page (code-splitting) */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
