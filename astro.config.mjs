import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://carlosgarcia.works',
  base: '/',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag', 'plausible', 'fathom.trackGoal', 'umami.track'],
      },
    })
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
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
});