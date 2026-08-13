import type { ClientPerspective, QueryParams } from '@sanity/client';
import { sanityClient } from './client';
import { previewClient } from './preview-client';

const token = import.meta.env.SANITY_API_READ_TOKEN;

/**
 * The Studio can hand us either a bare perspective ("drafts", "published") or
 * a JSON array of release ids. Anything unparseable falls back to "drafts"
 * rather than throwing, so a mangled cookie degrades to normal draft preview.
 */
function parsePerspective(raw: string | undefined): ClientPerspective | undefined {
  if (!raw) return undefined;
  const decoded = decodeURIComponent(raw);
  if (decoded.startsWith('[')) {
    try {
      return JSON.parse(decoded) as ClientPerspective;
    } catch {
      return undefined;
    }
  }
  return decoded as ClientPerspective;
}

/**
 * Single fetch entry point for /learn.
 *
 * No draft cookie -> the plain client, `published` perspective, no token, no
 * stega. That is byte-for-byte what the page fetched before this feature
 * existed, which is what keeps published pages clean.
 *
 * Draft cookie -> the stega-enabled client with the read token and a content
 * source map, so the overlay has something to attach to.
 */
export async function loadQuery<QueryResponse>({
  query,
  params,
  perspectiveCookie = undefined,
}: {
  query: string;
  params?: QueryParams;
  perspectiveCookie?: string;
}): Promise<{ data: QueryResponse; perspective: ClientPerspective; draftMode: boolean }> {
  const draftMode = Boolean(perspectiveCookie);

  if (draftMode && !token) {
    throw new Error(
      'SANITY_API_READ_TOKEN is required for visual editing. Add a Viewer token to .env (see .env.example).'
    );
  }

  const perspective: ClientPerspective = draftMode
    ? parsePerspective(perspectiveCookie) ?? 'drafts'
    : 'published';

  const client = draftMode ? previewClient : sanityClient;

  const { result } = await client.fetch<QueryResponse>(query, params ?? {}, {
    filterResponse: false,
    perspective,
    resultSourceMap: draftMode ? 'withKeyArraySelector' : false,
    stega: draftMode,
    ...(draftMode ? { token } : {}),
  });

  return { data: result, perspective, draftMode };
}
