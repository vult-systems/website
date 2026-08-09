import type { APIRoute } from 'astro';

export const prerender = false;

// In-memory cache — persists for the life of the serverless instance, which
// is enough to avoid re-fetching the same URL on every hover within a
// session even though it won't survive a cold start. No need for anything
// heavier for a personal-scale site with a small, curated set of links.
const CACHE_TTL_MS = 60 * 60 * 1000;
const cache = new Map<string, { data: PreviewData; expires: number }>();

interface PreviewData {
  title: string;
  description: string;
  image: string | null;
  siteName: string;
  url: string;
}

const metaTag = (html: string, attr: 'property' | 'name', key: string) => {
  const re = new RegExp(`<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']*)["'][^>]*>`, 'i');
  const reReversed = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${key}["'][^>]*>`, 'i');
  return html.match(re)?.[1] ?? html.match(reReversed)?.[1] ?? null;
};

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");

export const GET: APIRoute = async ({ url: reqUrl }) => {
  const target = reqUrl.searchParams.get('url');
  if (!target) return new Response(JSON.stringify({ error: 'Missing url' }), { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(target);
    if (!/^https?:$/.test(parsed.protocol)) throw new Error('bad scheme');
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid url' }), { status: 400 });
  }

  const cached = cache.get(target);
  if (cached && cached.expires > Date.now()) {
    return new Response(JSON.stringify(cached.data), { headers: { 'content-type': 'application/json' } });
  }

  const fallback: PreviewData = {
    title: parsed.hostname,
    description: '',
    image: null,
    siteName: parsed.hostname.replace(/^www\./, ''),
    url: target,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(target, {
      signal: controller.signal,
      headers: {
        // Plenty of sites refuse a UA-less/bot-labeled request outright.
        'user-agent':
          'Mozilla/5.0 (compatible; carlosgarcia.works link preview; +https://carlosgarcia.works)',
        accept: 'text/html',
      },
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`status ${res.status}`);
    // Only the <head> is needed and pages can be large — read a bounded
    // chunk rather than the full body.
    const reader = res.body?.getReader();
    let html = '';
    if (reader) {
      const decoder = new TextDecoder();
      let bytes = 0;
      while (bytes < 200_000) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.length;
        html += decoder.decode(value, { stream: true });
        if (/<\/head>/i.test(html)) break;
      }
      reader.cancel().catch(() => {});
    } else {
      html = await res.text();
    }

    const title = metaTag(html, 'property', 'og:title') ?? html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? fallback.title;
    const description =
      metaTag(html, 'property', 'og:description') ?? metaTag(html, 'name', 'description') ?? '';
    let image = metaTag(html, 'property', 'og:image');
    if (image && !/^https?:\/\//.test(image)) {
      image = new URL(image, target).toString();
    }
    const siteName = metaTag(html, 'property', 'og:site_name') ?? fallback.siteName;

    const data: PreviewData = {
      title: decodeEntities(title).trim().slice(0, 200),
      description: decodeEntities(description).trim().slice(0, 300),
      image,
      siteName: decodeEntities(siteName).trim(),
      url: target,
    };
    cache.set(target, { data, expires: Date.now() + CACHE_TTL_MS });
    return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
  } catch {
    // A failed fetch/parse still gives the hover card something to show
    // (hostname only) rather than nothing — cache it too, just for a much
    // shorter window, since a transient failure shouldn't stay stale for
    // an hour.
    cache.set(target, { data: fallback, expires: Date.now() + 60_000 });
    return new Response(JSON.stringify(fallback), { headers: { 'content-type': 'application/json' } });
  }
};
