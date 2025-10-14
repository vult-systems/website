import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://carlosgarcia.works',
  base: '/',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap()
  ],
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});