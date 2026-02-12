// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  image: {
    // Image optimization settings
    domains: ['localhost'],
    remotePatterns: [],
  },
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      exclude: ['@astrojs/react/client.js'],
    },
  }
});