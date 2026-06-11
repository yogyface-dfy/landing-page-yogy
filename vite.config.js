import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // react-helmet-async (utilisé par <Head> de vite-react-ssg) doit être bundlé
  // côté SSR pour éviter les soucis d'interop ESM/CJS au prerendering.
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  // En dev local, proxy /api vers le serveur Express (npm run dev:server)
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
