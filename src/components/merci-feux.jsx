import { useEffect, useRef } from 'react'

/** Palette YoGyFace — feux discrets, pas un festival. */
const COLORS = ['#E6726A', '#E6936A', '#FFCDCD', '#841435', '#CAD3F8', '#FFFFFF']

/**
 * Petite salve de feux d'artifice au-dessus du hero merci.
 * S'arrête toute seule ; ignorée si prefers-reduced-motion.
 */
export default function MerciFeux() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const particles = []
    const timers = []

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const burst = (x, y, color) => {
      for (let i = 0; i < 32; i++) {
        const a = (Math.PI * 2 * i) / 32 + Math.random() * 0.25
        const v = 1.6 + Math.random() * 2.6
        particles.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 1,
          decay: 0.012 + Math.random() * 0.01,
          color,
          size: 1.8 + Math.random() * 1.8,
        })
      }
    }

    const tick = () => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.032
        p.vx *= 0.99
        p.life -= p.decay
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
      if (particles.length) raf = requestAnimationFrame(tick)
    }

    const fire = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      burst(width * (0.22 + Math.random() * 0.56), height * (0.18 + Math.random() * 0.32), color)
      if (!raf) raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    // 5 éclatements décalés, puis silence.
    ;[80, 320, 560, 820, 1100].forEach((ms) => timers.push(setTimeout(fire, ms)))

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
    />
  )
}
