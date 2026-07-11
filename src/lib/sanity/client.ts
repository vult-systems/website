import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

/**
 * Read-only client used by pages to fetch published content.
 * `useCdn: false` so SSR pages always render the latest edits instantly
 * (no ~60s CDN cache lag). Fine for a personal-scale site.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  useCdn: false,
});

export const isSanityConfigured = Boolean(projectId);
