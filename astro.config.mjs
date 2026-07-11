import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import vercel from '@astrojs/vercel';

// When a Sanity project ID is present, the site switches to hybrid SSR (Vercel)
// so pages can fetch live content from Sanity. Content editing happens in the
// standalone Sanity Studio (run via `npm run studio:dev` / hosted at
// <project>.sanity.studio) — NOT embedded here, to avoid the @sanity/astro
// dev-server incompatibility with sanity@6 + styled-components@6.
// Until a project ID is set, the site builds exactly as before (fully static).
const { PUBLIC_SANITY_PROJECT_ID } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
);
const sanityEnabled = Boolean(PUBLIC_SANITY_PROJECT_ID);

export default defineConfig({
  site: 'https://carlosgarcia.works',
  base: '/',
  output: 'static',
  // /courses was renamed to /learn — keep old shared links working.
  redirects: {
    '/courses': '/learn',
  },
  ...(sanityEnabled ? { adapter: vercel() } : {}),
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
    }),
  ],
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
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