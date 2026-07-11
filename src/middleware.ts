import { defineMiddleware } from 'astro:middleware';

/**
 * Remove descriptive HTML comments from rendered pages so template notes
 * aren't exposed in the page source. Content authored in Sanity is
 * HTML-escaped when rendered, so real `<!-- -->` comments only ever
 * originate from our own templates — safe to strip. Conditional comments
 * (`<!--[if ...]>`) are preserved.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) return response;

  const html = await response.text();
  const cleaned = html.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(cleaned, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
