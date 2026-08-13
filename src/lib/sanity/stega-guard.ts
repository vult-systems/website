/**
 * Guards against stega leaking out of the places it belongs.
 *
 * Stega encodes its metadata as *invisible* characters. That is the whole
 * problem: if an encoded string ends up in a URL, a DOM id, a JSON search
 * index or a <title>, nothing looks wrong on screen. Links quietly 404,
 * `.includes()` search quietly stops matching, and the only symptom is
 * "search feels broken sometimes". So we assert instead of eyeballing.
 *
 * Two different checks, because the two kinds of value have different
 * legitimate alphabets:
 *
 *   - Slugs and DOM ids come out of slugify() and may only ever contain
 *     [a-z0-9-]. Strict allowlist: anything else is a bug, stega or not.
 *
 *   - Search-index text is human prose. It legitimately contains accents,
 *     punctuation and non-Latin scripts, so an allowlist is meaningless.
 *     Denylist the invisible ranges instead, which is precisely where stega
 *     and friends live.
 */

/**
 * Unicode ranges that render as nothing.
 *
 * Built with the RegExp constructor from escape sequences so this file stays
 * pure ASCII. A literal character class here would itself be invisible in the
 * source, which is not a property you want in the code that polices
 * invisible characters.
 *
 *   U+200B-U+200F    zero-width space/joiners, LRM/RLM
 *   U+2028-U+202E    line/paragraph separators, bidi overrides
 *   U+2060-U+206F    word joiner, invisible operators
 *   U+FE00-U+FE0F    variation selectors
 *   U+FEFF           zero-width no-break space / BOM
 *   U+E0000-U+E007F  Unicode Tags block, where @vercel/stega encodes
 */
const INVISIBLE = new RegExp(
  '[\\u200B-\\u200F\\u2028-\\u202E\\u2060-\\u206F\\uFE00-\\uFE0F\\uFEFF]' +
    '|[\\u{E0000}-\\u{E007F}]',
  'u'
);

/**
 * What slugify() is allowed to produce, and therefore what any URL segment or
 * DOM id must be. Underscore is in the set because slugify strips [^\w\s-]
 * and JS `\w` is [A-Za-z0-9_], so "ANGD_1314" legitimately survives as
 * "angd_1314". Keeping the allowlist honest to the actual implementation is
 * what stops this guard from throwing on valid published content.
 */
const SLUG_SHAPE = /^[a-z0-9_-]*$/;

export class StegaLeakError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StegaLeakError';
  }
}

/** Render a string with non-printable characters spelled out, so the error message is actionable. */
function describe(value: string): string {
  const codepoints = Array.from(value)
    .map((ch) => {
      const cp = ch.codePointAt(0)!;
      return cp > 0x7e || cp < 0x20 ? `U+${cp.toString(16).toUpperCase().padStart(4, '0')}` : ch;
    })
    .join('');
  return `${JSON.stringify(value)} -> ${codepoints}`;
}

/**
 * A value used as a URL segment or DOM id. Must be slug-shaped.
 * `label` should say where it came from so a failure is actionable.
 */
export function assertSlugShape(label: string, value: string): string {
  if (!SLUG_SHAPE.test(value)) {
    throw new StegaLeakError(
      `[stega-guard] ${label} is not slug-shaped, so the URL or DOM id built from it is wrong.\n` +
        `  ${describe(value)}\n` +
        `  Fix: wrap the source string in stegaClean() before it reaches slugify().`
    );
  }
  return value;
}

/** Free text headed for a JSON blob or an HTML attribute. Must carry no invisible characters. */
export function assertNoInvisible(label: string, value: string): string {
  if (INVISIBLE.test(value)) {
    throw new StegaLeakError(
      `[stega-guard] ${label} contains invisible characters (stega leaked past stegaClean()).\n` +
        `  ${describe(value.slice(0, 120))}\n` +
        `  Fix: wrap this value in stegaClean() at the point it is derived.`
    );
  }
  return value;
}

/**
 * Strip stega from the fields that are load-bearing for routing.
 *
 * @sanity/client's default stega filter already skips `slug`, `url`, `href`,
 * `id`, `key`, `ref`, `type`, `slug.current`, and anything URL- or date-shaped
 * (verified against the filterDefault denylist in @sanity/client 7.26.2). What
 * it does NOT skip is `code`, and on this site `course.code` is run through
 * slugify() to build both the /learn URL segment and the DOM ids the
 * client-side navigation matches on. Encoded, it silently breaks both.
 *
 * So `code` is cleaned at the fetch boundary rather than at the ~40 template
 * interpolations that consume it. `slug` is cleaned too: it is already safe
 * today, but that safety depends on a denylist inside a dependency, and a
 * broken URL is a worse failure than a missing overlay on a slug field.
 *
 * The trade this makes: no click-to-edit overlay on the course-code badge.
 * Titles, descriptions and Portable Text bodies keep theirs, which is where
 * the editing actually happens.
 */
const STRUCTURAL_KEYS = new Set(['code', 'slug']);

export function cleanStructuralFields<T>(value: T, clean: (input: any) => any): T {
  if (Array.isArray(value)) {
    return value.map((item) => cleanStructuralFields(item, clean)) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] =
        STRUCTURAL_KEYS.has(key) && typeof item === 'string'
          ? clean(item)
          : cleanStructuralFields(item, clean);
    }
    return out as T;
  }
  return value;
}

/**
 * Deep-check an already-built structure (the search index array, the
 * data-*-search attribute strings). Walks string leaves only; the keys are
 * ours and are never stega-encoded.
 */
export function assertCleanDeep(label: string, value: unknown, path = ''): void {
  if (typeof value === 'string') {
    assertNoInvisible(`${label}${path}`, value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => assertCleanDeep(label, item, `${path}[${i}]`));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      assertCleanDeep(label, item, `${path}.${key}`);
    }
  }
}
