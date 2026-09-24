import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://thebrandcrew.lat',
  output: 'static',
  adapter: vercel(),
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
