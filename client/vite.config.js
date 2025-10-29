import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 30002,
    allowedHosts: [
      'localhost',
      'p2pchat.luckyverse.club',
      '.luckyverse.club'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:30001',
        changeOrigin: true
      }
    }
  },
  preview: {
    host: true,
    port: 30002,
    allowedHosts: [
      'localhost',
      'p2pchat.luckyverse.club',
      '.luckyverse.club'
    ]
  }
})