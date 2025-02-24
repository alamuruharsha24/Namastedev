import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Namastedev/',
  optimizeDeps: {
    // No need to exclude lucide-react - modern versions work fine with Vite
    include: ['lucide-react']
  }
});