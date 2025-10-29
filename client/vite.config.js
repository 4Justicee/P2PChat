import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 30002,
    allowedHosts: [
      'localhost',
      'p2pchat.luckyverse.club',
      '.luckyverse.club'
    ]
  },
  server: {
    host: true,
    port: 30002,
    proxy: {
      '/api': {
        target: 'http://localhost:30001',
        changeOrigin: true
      }
    }
  }
})
