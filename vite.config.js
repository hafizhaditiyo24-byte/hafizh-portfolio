import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',

  resolve: {
    dedupe: ['react', 'react-dom'],
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'work.html'),
      },
    },
  },
});