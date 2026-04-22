import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://chrisjasonmcqueen.com',
  integrations: [tailwind(), sitemap()],

  build: {
    inlineStylesheets: 'auto',
  },

  output: "hybrid",
  adapter: cloudflare()
});