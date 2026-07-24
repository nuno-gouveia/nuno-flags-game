import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/nuno-flags-game/',
  plugins: [react()],
});
