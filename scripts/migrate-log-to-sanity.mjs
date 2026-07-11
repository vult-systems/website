/**
 * One-time migration: src/content/log/*.mdx  ->  Sanity `log` documents.
 *
 * Run locally (never in CI):
 *   1. Fill .env: PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN
 *   2. node scripts/migrate-log-to-sanity.mjs
 *
 * Best-effort converter: uploads hero + figure images, converts headings,
 * paragraphs, bold/italic/code, and links to Portable Text. Spot-check the
 * results in /studio afterwards (complex MDX components won't all map 1:1).
 */
import { createClient } from '@sanity/client';
import { readFileSync, existsSync, createReadStream, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const LOG_DIR = join(ROOT, 'src', 'content', 'log');
const SRC_DIR = join(ROOT, 'src');

// --- Load .env (no external dep) --------------------------------------------
function loadEnv() {
  const envPath = join(ROOT, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnv();

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    'Missing config. Set PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
});

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);
const resolveAlias = (p) =>
  p.startsWith('@/') ? join(SRC_DIR, p.slice(2)) : p;

// --- Frontmatter -------------------------------------------------------------
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let [, k, v] = kv;
    v = v.trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      data[k] = v
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      data[k] = v.replace(/^["']|["']$/g, '');
    }
  }
  return { data, body: m[2] };
}

// --- Image upload cache ------------------------------------------------------
const assetCache = new Map();
async function uploadImage(absPath) {
  if (!absPath || !existsSync(absPath)) {
    console.warn('  ! missing image:', absPath);
    return null;
  }
  if (assetCache.has(absPath)) return assetCache.get(absPath);
  const asset = await client.assets.upload('image', createReadStream(absPath), {
    filename: absPath.split(/[\\/]/).pop(),
  });
  assetCache.set(absPath, asset._id);
  return asset._id;
}

// --- Inline markdown -> spans + markDefs ------------------------------------
function parseInline(text, markDefs) {
  const spans = [];
  const pattern =
    /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m;
  const push = (t, marks) => {
    if (t) spans.push({ _type: 'span', _key: key(), text: t, marks });
  };
  while ((m = pattern.exec(text))) {
    push(text.slice(last, m.index), []);
    if (m[1]) push(m[2], ['strong']);
    else if (m[3]) push(m[4], ['em']);
    else if (m[5]) push(m[6], ['code']);
    else if (m[7]) {
      const mk = key();
      markDefs.push({ _type: 'link', _key: mk, href: m[9] });
      push(m[8], [mk]);
    }
    last = pattern.lastIndex;
  }
  push(text.slice(last), []);
  return spans.length ? spans : [{ _type: 'span', _key: key(), text, marks: [] }];
}

function textBlock(style, text) {
  const markDefs = [];
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs,
    children: parseInline(text, markDefs),
  };
}

// --- Body (MDX-ish) -> Portable Text ----------------------------------------
async function convertBody(body, importMap) {
  const blocks = [];
  const lines = body.split('\n');
  let para = [];

  const flushPara = () => {
    const text = para.join(' ').trim();
    if (text) blocks.push(textBlock('normal', text));
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trim();

    if (/^import\s/.test(trimmed) || trimmed === '') {
      if (trimmed === '') flushPara();
      continue;
    }

    // <Figure caption="..."> ... <Image src={var} ... /> ... </Figure>
    if (/^<Figure/.test(trimmed)) {
      flushPara();
      const chunk = [];
      let j = i;
      while (j < lines.length && !/<\/Figure>/.test(lines[j])) chunk.push(lines[j++]);
      if (j < lines.length) chunk.push(lines[j]);
      i = j;
      const block = chunk.join('\n');
      const caption = (block.match(/caption="([^"]*)"/) || [])[1] || '';
      const alt = (block.match(/alt="([^"]*)"/) || [])[1] || '';
      const srcVar = (block.match(/src=\{([\w]+)\}/) || [])[1];
      const absPath = srcVar ? importMap.get(srcVar) : null;
      const assetId = absPath ? await uploadImage(absPath) : null;
      if (assetId) {
        blocks.push({
          _type: 'figure',
          _key: key(),
          asset: { _type: 'reference', _ref: assetId },
          alt,
          caption,
        });
      }
      continue;
    }

    // Skip any other lone JSX tags
    if (/^<\/?[A-Z]/.test(trimmed)) continue;

    const h = trimmed.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      flushPara();
      blocks.push(textBlock(`h${h[1].length}`, h[2]));
      continue;
    }
    if (/^>\s+/.test(trimmed)) {
      flushPara();
      blocks.push(textBlock('blockquote', trimmed.replace(/^>\s+/, '')));
      continue;
    }
    para.push(trimmed);
  }
  flushPara();
  return blocks;
}

// --- Main --------------------------------------------------------------------
async function main() {
  const files = readdirSync(LOG_DIR).filter((f) => f.endsWith('.mdx'));
  console.log(`Found ${files.length} log post(s).\n`);

  for (const file of files) {
    const raw = readFileSync(join(LOG_DIR, file), 'utf8').replace(/\r\n/g, '\n');
    const { data, body } = parseFrontmatter(raw);
    const slug = file.replace(/\.mdx$/, '');
    console.log(`Migrating: ${slug}`);

    // Map imported asset vars -> absolute paths
    const importMap = new Map();
    for (const m of body.matchAll(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g)) {
      importMap.set(m[1], resolveAlias(m[2]));
    }

    // Hero image (frontmatter path string)
    let heroImage;
    if (data.heroImage) {
      const heroId = await uploadImage(resolveAlias(data.heroImage));
      if (heroId) {
        heroImage = { _type: 'image', asset: { _type: 'reference', _ref: heroId } };
      }
    }

    const doc = {
      _id: `log-${slug}`,
      _type: 'log',
      title: data.title,
      slug: { _type: 'slug', current: slug },
      description: data.description,
      pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : undefined,
      author: data.author || 'Carlos Garcia',
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category,
      draft: data.draft === 'true' || data.draft === true,
      heroImage,
      body: await convertBody(body, importMap),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ done (${doc.body.length} blocks)\n`);
  }
  console.log('Migration complete. Review results at /studio.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
