import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173, // atau biarkan default kalau nggak mau tentuin port
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // GANTI sesuai port backend kamu
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
