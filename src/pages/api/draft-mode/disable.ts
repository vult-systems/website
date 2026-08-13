import type { APIRoute } from 'astro';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

export const prerender = false;

/**
 * Leaves draft mode. Clears the cookie in both its partitioned and
 * unpartitioned forms, because we can't tell from here which one the browser
 * stored (see the CHIPS note in enable.ts) and clearing only one leaves the
 * other behind, pinning the browser in draft mode.
 */
export const GET: APIRoute = async () => {
  const expired = [
    `${perspectiveCookieName}=`,
    'Path=/',
    'Secure',
    'SameSite=None',
    'Max-Age=0',
  ];

  const headers = new Headers();
  headers.append('Set-Cookie', expired.join('; '));
  headers.append('Set-Cookie', [...expired, 'Partitioned'].join('; '));
  headers.set('Location', '/learn');

  return new Response(null, { status: 307, headers });
};
