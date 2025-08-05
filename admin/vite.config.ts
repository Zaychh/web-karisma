// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5174,
    proxy: {
      '/uploads': {
        target: 'http://localhost:3000', // Ganti dengan port backend Anda
        changeOrigin: true,
        secure: false
      },
      '/api': {
        target: 'http://localhost:3000', // Backend port
        changeOrigin: true,
        secure: false
      },
    },
  },
})
