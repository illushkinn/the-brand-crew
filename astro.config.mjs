import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://thebrandcrew.lat',
  output: 'static',
  adapter: vercel(),
  build: {
    // CSS chico (~10 KB): incrustarlo evita una petición que bloquea el render.
    inlineStylesheets: 'always',
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
