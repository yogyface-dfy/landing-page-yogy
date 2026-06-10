import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // En dev local, proxy /api vers le serveur Express (npm run dev:server)
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
