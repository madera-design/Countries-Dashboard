// import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  test: {
    setupFiles: ['./setupTests.ts'], // Ruta al archivo de configuración
  },
});
