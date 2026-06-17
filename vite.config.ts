import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.pdf'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          icons: ['react-icons'],
        },
      },
    },
  },
});
