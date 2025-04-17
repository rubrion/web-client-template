import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './src/i18n/locales'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
  },
  server: {
    host: true,
    watch: {
      // This enables HMR for i18n JSON files
      usePolling: true,
    },
  },
});
