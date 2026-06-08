/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        noir:     '#1A1A1A',
        blanc:    '#FFFFFF',
        creme:    '#FCF3F2',
        corail:   '#E6726A',
        bordeaux: '#841435',
        orange:   '#E6936A',
        rose:     '#FFCDCD',
        bleu:     '#CAD3F8',
        gris:     '#6B6B6B',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['"League Spartan"', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'marquee':       'marquee 25s linear infinite',
        'fade-up':       'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':       'fadeIn 0.5s ease forwards',
        'fade-left':     'fadeLeft 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-right':    'fadeRight 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'scale-in':      'scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'reveal-up':     'revealUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'float 8s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-soft':    'pulseSoft 3s ease-in-out infinite',
        'spin-slow':     'spin 20s linear infinite',
        'gradient':      'gradientShift 8s ease infinite',
        'shimmer':       'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeLeft: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(100%)', clipPath: 'inset(100% 0 0 0)' },
          to:   { opacity: '1', transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-20px) rotate(2deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
}
