import type { AstroCookies } from 'astro';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

/**
 * Draft mode is "is the perspective cookie present". The cookie is set by
 * /api/draft-mode/enable, which only sets it after validating a signed secret
 * issued by the Studio, so its presence is a real authorization signal and not
 * something a visitor can just set to read unpublished content: the actual
 * draft read still requires SANITY_API_READ_TOKEN server-side.
 */
export function isDraftMode(cookies: AstroCookies): boolean {
  return cookies.has(perspectiveCookieName);
}

/** Spread into a loadQuery() call to make it draft-aware. */
export function getDraftModeProps(cookies: AstroCookies) {
  return {
    perspectiveCookie: cookies.get(perspectiveCookieName)?.value ?? undefined,
  };
}
