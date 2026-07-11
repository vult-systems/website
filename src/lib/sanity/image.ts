import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

/** Build a Sanity CDN image URL. Chain .width(), .height(), .format() etc. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
