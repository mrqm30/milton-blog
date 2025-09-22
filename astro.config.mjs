import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mrqm30.github.io',
  // Si cambias el repo, actualiza esta base:
  base: '/milton-blog',
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    sitemap()
  ],
});

