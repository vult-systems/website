import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

/** Build a Sanity CDN image URL. Chain .width(), .height(), .format() etc. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Build a Sanity CDN URL for a file asset (e.g. an uploaded video) from its
 * `_ref` (format: `file-<id>-<ext>`). Returns undefined for missing/invalid refs.
 */
export function fileUrlFor(ref?: string): string | undefined {
  if (!ref) return undefined;
  const [, id, ext] = ref.split('-');
  if (!id || !ext) return undefined;
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}
