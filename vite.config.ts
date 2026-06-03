import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nxViteTsPaths(), tailwindcss()],
  esbuild: {},
  optimizeDeps: {
    include: ['@nx-mfe-template/ui', '@nx-mfe-template/toolbox'],
  },
});
