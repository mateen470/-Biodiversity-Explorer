// File: vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    cors: true,
    proxy: {
      '/iucnv4': {
        target: 'https://api.iucnredlist.org/api/v4',
        changeOrigin: true,  
        secure: false,      
        rewrite: path => path.replace(/^\/iucnv4/, ''),
      },
    },
  },
});
