/**
 * The one slugify implementation.
 *
 * Course codes, pipeline topic slugs and heading text all get turned into
 * URL segments and DOM ids by this function, and three separate places need
 * to agree on the result or links silently break:
 *   - src/pages/learn/[...slug].astro  (renders the ids, resolves the path)
 *   - astro.config.mjs                 (enumerates /learn URLs for the sitemap)
 *   - src/sanity/presentation/resolve.ts (tells Presentation which URL a
 *     document maps to, so click-to-edit lands on the right page)
 *
 * It used to be copy-pasted into astro.config.mjs, which is exactly the drift
 * risk this module removes. src/lib/sanity/toc.ts re-exports it so existing
 * `import { slugify } from '@/lib/sanity/toc'` call sites keep working.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
