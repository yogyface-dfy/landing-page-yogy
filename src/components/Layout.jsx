import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  /* Enhanced scroll observer — supports data-anim variants and staggered delays */
  const setupObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => entry.target.classList.add('visible'), Number(delay))
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.animate-on-scroll, .line-draw').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cleanup = setupObserver()
    /* Re-observe after images load (layout shifts) */
    const timer = setTimeout(setupObserver, 500)
    return () => { cleanup(); clearTimeout(timer) }
  }, [pathname, setupObserver])

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
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
