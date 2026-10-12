import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // react-helmet-async (utilisé par <Head> de vite-react-ssg) doit être bundlé
  // côté SSR pour éviter les soucis d'interop ESM/CJS au prerendering.
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  // IPv4 + IPv6, port figé. .env.local touché = plus de restart (page blanche).
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ['**/.env.local', '**/.env', '**/CHANGELOG.md'],
    },
    proxy: {
      '/api': 'http://127.0.0.1:3003',
    },
  },
})
