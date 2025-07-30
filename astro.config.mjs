// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://hivconnectcnj.org',
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    define: {
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY || 'demo-key')
    }
  }
});
