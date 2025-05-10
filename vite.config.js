// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(), // поддержка JSX/TSX и Fast Refresh
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // теперь '@/...' → 'src/...'
    },
  },
  server: {
    port: 5173, // порт разработки (можете поменять)
    proxy: {
      // при запросах к /api будет проксироваться на бэкенд
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // При деплое можете раскомментировать и задать базовый путь, если нужно:
  // base: process.env.PUBLIC_URL || '/',
});
