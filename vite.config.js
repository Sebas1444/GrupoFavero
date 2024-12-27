import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/api-rse': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-rse/, '/api')
      },
      '/postulacion': {
        target: 'http://localhost:3050',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/postulacion/, '/api')
      }
    }
  }
})