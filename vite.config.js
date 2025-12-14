import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'copy-cname',
      closeBundle() {
        // Copy CNAME file to dist for GitHub Pages
        // Vite automatically copies files from public/, but we also check root
        try {
          // Try public folder first (standard Vite location)
          copyFileSync(resolve(__dirname, 'public/CNAME'), resolve(__dirname, 'dist/CNAME'));
        } catch (err) {
          try {
            // Fallback to root CNAME file
            copyFileSync(resolve(__dirname, 'CNAME'), resolve(__dirname, 'dist/CNAME'));
          } catch (err2) {
            console.warn('CNAME file not found in public/ or root, skipping copy');
          }
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
