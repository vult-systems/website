import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import { sanityClient } from '@/lib/sanity/client';

// The site is output: 'static' with per-page opt-outs, so this route has to
// say so explicitly or it would be prerendered into a dead HTML file.
export const prerender = false;

/**
 * Presentation opens this URL inside its iframe with a one-time signed secret.
 * We validate the secret against the dataset, and only then set the cookie
 * that puts this browser into draft mode.
 */
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const token = import.meta.env.SANITY_API_READ_TOKEN;

  if (!token) {
    return new Response(
      'Server misconfigured: SANITY_API_READ_TOKEN is not set. See .env.example.',
      { status: 500 }
    );
  }

  const { isValid, redirectTo = '/learn', studioPreviewPerspective } = await validatePreviewUrl(
    sanityClient.withConfig({ token }),
    request.url
  );

  if (!isValid) {
    return new Response('Invalid preview secret', { status: 401 });
  }

  // Chrome partitions third-party cookies (CHIPS). Presentation frames us
  // cross-site, so the cookie needs Partitioned there but must NOT have it
  // when the same route is hit directly in a top-level tab.
  const partitioned =
    request.headers.get('sec-fetch-dest') === 'iframe' &&
    request.headers.get('sec-fetch-site') === 'cross-site';

  // NOTE ON LOCAL TESTING: this cookie is Secure + SameSite=None. Chrome
  // treats http://localhost as a secure context, so it sets fine there.
  // Safari is stricter and may refuse it over plain http://localhost, in
  // which case draft mode silently never activates. Safari verification
  // therefore has to happen against an https preview deploy, not locally.
  cookies.set(perspectiveCookieName, studioPreviewPerspective ?? 'drafts', {
    httpOnly: false, // the overlay reads it client-side to sync perspective
    sameSite: 'none',
    secure: true,
    path: '/',
    partitioned,
  });

  return redirect(redirectTo, 307);
};
