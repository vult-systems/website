import { sanityClient } from './client';

/**
 * Draft-mode client: same connection as ./client, plus stega encoding.
 *
 * Stega hides the "which document/field did this string come from" metadata
 * inside the returned strings as invisible Unicode, which is what lets the
 * overlay draw a clickable box around a piece of text. Those invisible
 * characters must NEVER reach a public visitor, so this client is only ever
 * used behind a draft-mode cookie check (see ./load-query.ts).
 *
 * The upstream Astro guide gets stega via @sanity/astro's `sanity:client`
 * virtual module. This repo deliberately doesn't use that integration (see
 * the note in astro.config.mjs), so we configure @sanity/client's own stega
 * option directly instead. Same result, no extra integration.
 */
const studioUrl = import.meta.env.PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333';

export const previewClient = sanityClient.withConfig({
  stega: {
    enabled: true,
    studioUrl,
  },
});
