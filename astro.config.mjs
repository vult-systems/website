import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { createClient } from '@sanity/client';
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
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
);
const sanityEnabled = Boolean(PUBLIC_SANITY_PROJECT_ID);

// Learn (course/pipeline) content lives entirely in Sanity and is served by
// an on-demand route (src/pages/learn/[...slug].astro), so @astrojs/sitemap
// can't discover those URLs by crawling the file tree — they're enumerated
// here instead. A Sanity hiccup at build time must not fail the whole site
// build, so this degrades to an empty list rather than throwing.
const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
let learnCustomPages = [];
if (sanityEnabled) {
  try {
    const sanity = createClient({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-10-01',
      useCdn: false,
    });
    const [courses, pipeline] = await Promise.all([
      sanity.fetch(
        `*[_type == "course"]{ code, projects[]{ "slug": slug.current, threads[]{ "slug": slug.current } } }`
      ),
      sanity.fetch(`*[_type == "pipelineTopic"]{ "slug": slug.current, threads[]{ "slug": slug.current } }`),
    ]);
    const base = 'https://carlosgarcia.works/learn';
    for (const course of courses ?? []) {
      const cid = slugify(course.code);
      learnCustomPages.push(`${base}/${cid}`);
      for (const project of course.projects ?? []) {
        learnCustomPages.push(`${base}/${cid}/${project.slug}`);
        for (const thread of project.threads ?? []) {
          learnCustomPages.push(`${base}/${cid}/${project.slug}/${thread.slug}`);
        }
      }
    }
    for (const topic of pipeline ?? []) {
      learnCustomPages.push(`${base}/${topic.slug}`);
      for (const thread of topic.threads ?? []) {
        learnCustomPages.push(`${base}/${topic.slug}/${thread.slug}`);
      }
    }
  } catch {
    learnCustomPages = [];
  }
}

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
    // 'hover' never fires on touch devices (no hover before a tap), so
    // mobile navigation got zero prefetch head start on any link, ever —
    // 'tap' fires on touchstart/mousedown, just ahead of the actual
    // click/tap completing, and works on both.
    defaultStrategy: 'tap',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({ customPages: learnCustomPages }),
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