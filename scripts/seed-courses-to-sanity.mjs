/**
 * One-time seed: the hardcoded `curriculum` + `pipeline` data from
 * src/pages/courses.astro  ->  Sanity `course` + `pipelineTopic` documents.
 *
 * Also converts the one rich lesson (the-realistic-eye.mdx) into Portable Text
 * and uploads its slide images + course thumbnails.
 *
 * Run once locally (needs SANITY_WRITE_TOKEN in .env):
 *   node scripts/seed-courses-to-sanity.mjs   (or: npm run seed:courses)
 */
import { createClient } from '@sanity/client';
import { readFileSync, existsSync, createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');

// --- Load .env (no external dep) --------------------------------------------
function loadEnv() {
  const envPath = join(ROOT, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    if (!(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('Missing PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-10-01', token, useCdn: false });
const key = () => randomUUID().replace(/-/g, '').slice(0, 12);
const alias = (p) => (p.startsWith('@/') ? join(SRC_DIR, p.slice(2)) : join(SRC_DIR, p));

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
const imageValue = (assetId) =>
  assetId ? { _type: 'image', asset: { _type: 'reference', _ref: assetId } } : undefined;

// --- Portable Text helpers ---------------------------------------------------
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

// Convert paragraph inner-HTML (plain text + <a> tags) to spans + markDefs.
function inlineHtmlToSpans(html, markDefs) {
  const spans = [];
  const re = /<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
  let last = 0;
  let m;
  const pushText = (t) => {
    const text = decode(t.replace(/<[^>]+>/g, ''));
    if (text) spans.push({ _type: 'span', _key: key(), text, marks: [] });
  };
  while ((m = re.exec(html))) {
    pushText(html.slice(last, m.index));
    const mk = key();
    markDefs.push({ _type: 'link', _key: mk, href: m[1] });
    const text = decode(m[2].replace(/<[^>]+>/g, ''));
    spans.push({ _type: 'span', _key: key(), text, marks: [mk] });
    last = re.lastIndex;
  }
  pushText(html.slice(last));
  return spans;
}
function textBlock(style, html) {
  const markDefs = [];
  const children = inlineHtmlToSpans(html, markDefs);
  if (!children.length) return null;
  return { _type: 'block', _key: key(), style, markDefs, children };
}

// Convert the-realistic-eye.mdx (structured JSX) to Portable Text (best effort).
async function convertEyeLesson() {
  const file = join(SRC_DIR, 'content', 'learn', 'the-realistic-eye.mdx');
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

  // Map imported slide vars -> absolute paths
  const importMap = new Map();
  for (const m of raw.matchAll(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g)) {
    importMap.set(m[1], alias(m[2]));
  }

  const blocks = [];
  const token =
    /<h3\b[^>]*>([\s\S]*?)<\/h3>|<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>|<Image\b[^>]*?\bsrc=\{(\w+)\}[^>]*?(?:\balt="([^"]*)")?[^>]*?\/>|<p\b[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = token.exec(raw))) {
    if (m[1] !== undefined) {
      const b = textBlock('h3', m[1]);
      if (b) blocks.push(b);
    } else if (m[2] !== undefined) {
      const b = textBlock('blockquote', m[2]);
      if (b) blocks.push(b);
    } else if (m[3] !== undefined) {
      const absPath = importMap.get(m[3]);
      const assetId = absPath ? await uploadImage(absPath) : null;
      if (assetId) {
        blocks.push({
          _type: 'figure',
          _key: key(),
          asset: { _type: 'reference', _ref: assetId },
          alt: m[4] || '',
        });
      }
    } else if (m[5] !== undefined) {
      const text = decode(m[5].replace(/<[^>]+>/g, ''));
      if (/^Part \d+$/i.test(text)) continue; // skip decorative eyebrow labels
      const b = textBlock('normal', m[5]);
      if (b) blocks.push(b);
    }
  }
  return blocks;
}

// --- Source data (mirrors courses.astro) ------------------------------------
const THUMBS = {
  'alien-bust': '@/assets/courses/organic-modeling/alien-bust/cg-alienbust-thumb-01.png',
  'highpoly-sculpt': '@/assets/courses/char-modeling/eye/realistic/uiw3d-realistic-eye-thumb.png',
};
const courseSlug = (code) => code.toLowerCase().replace(/\s+/g, '-');
// Sanity document IDs allow only [a-zA-Z0-9._-]; strip anything else (e.g. "·").
const docId = (prefix, slug) => `${prefix}-${slug.replace(/[^a-zA-Z0-9._-]/g, '-')}`;

const curriculum = [
  {
    year: 'Freshman',
    courses: [
      {
        code: 'ANGD 1314',
        title: 'Organic Modeling',
        description:
          'This beginner-level studio course offers an overview of character sculpting and modeling techniques, laying the foundation for creating detailed, production-ready 3D character sculptures. It blends traditional art principles with a technical approach to mastering ZBrush for both organic and hard surface techniques.',
        required: 'Graphic Tablet and Hard-drive or USB/C Storage Device',
        audience: 'This is a Freshman level course required of ANGD BFA majors.',
        projects: [
          { slug: 'alien-bust', title: 'Alien Bust', description: '' },
          { slug: 'elemental-golem', title: 'Elemental Golem', description: '' },
          { slug: 'nerf-gun', title: 'Nerf Gun', description: '' },
          { slug: 'bipedal-character', title: 'Bipedal Character', description: '' },
        ],
      },
    ],
  },
  {
    year: 'Sophomore',
    courses: [
      {
        code: 'ANGD 1380',
        title: 'Anatomy for 3D Artists',
        description:
          'This lecture course develops anatomical knowledge for artists and animators, with a focus on superficial human anatomy, including major muscle groups, skeletal structures, and surface forms of the body.',
        required: 'Graphic Tablet and Hard-drive or USB/C Storage Device',
        audience: 'This is a Sophomore level course required of ANGD BFA majors.',
        projects: [
          { slug: 'skeletal-study', title: 'Skeletal Reference Study', description: 'Model a skeletal reference for animation study.' },
          { slug: 'muscle-groups', title: 'Muscle Group Analysis', description: 'Layer primary muscle groups over a base skeleton.' },
          { slug: 'gesture-figure', title: 'Gesture & Figure', description: 'Dynamic figure study focusing on movement and weight.' },
        ],
      },
    ],
  },
  {
    year: 'Sophomore / Junior',
    courses: [
      {
        code: 'ANGD 2333 · 2334 · 3331',
        title: 'Environment Production I–III',
        description:
          'This progressive studio course sequence develops the skills required to create production-ready 3D environments for both real-time and offline workflows. Students explore modular workflows, hard-surface and organic asset creation, materials, lighting, composition, optimization, world-building, and engine integration while producing increasingly complex environments for games and cinematic applications.',
        required: 'Graphic Tablet and Hard-drive or USB/C Storage Device',
        audience: 'This is a Sophomore–Junior level course required of ANGD BFA majors.',
        projects: [
          { slug: 'trim-sheet', title: 'Trim Sheet Design', description: 'Create a production-ready trim sheet for an environment set.' },
          { slug: 'modular-kit', title: 'Modular Kit', description: 'Build a modular architecture kit for real-time use.' },
          { slug: 'hero-prop', title: 'Hero Prop', description: 'Fully textured hero asset with LODs.' },
          { slug: 'full-scene', title: 'Full Scene Assembly', description: "A complete, lit environment built from the semester's assets." },
        ],
      },
      {
        code: 'ANGD 2361 · 3361 · 3362',
        title: 'Character Modeling I–III',
        description:
          'This progressive studio course sequence focuses on the creation of production-ready 3D characters for both real-time and offline workflows. Students develop skills in anatomy, sculpting, topology, clothing, materials, grooming, optimization, and rigging while advancing from foundational character principles to fully realized, industry-centric character art.',
        required: 'Graphic Tablet and Hard-drive or USB/C Storage Device',
        audience: 'This is a Sophomore–Junior level course required of ANGD BFA majors.',
        projects: [
          { slug: 'base-mesh', title: 'Base Mesh', description: '' },
          {
            slug: 'highpoly-sculpt',
            title: 'Creating Realistic Real-Time Eyes',
            description:
              'A focused eye study covering anatomy, iris structure, and sculpt development for realistic character work.',
            eyeLesson: true,
          },
          { slug: 'retopology', title: 'Retopology', description: '' },
          { slug: 'texturing', title: 'Texturing', description: '' },
          { slug: 'final-character', title: 'Final Character', description: '' },
        ],
      },
    ],
  },
];

const pipeline = [
  {
    slug: 'source-control',
    title: 'Source Control',
    description:
      'Version control and asset-management workflows for art and code teams. Each thread covers the setup, day-to-day usage, and pitfalls of a specific tool.',
    threads: [
      { slug: 'git', title: 'Git', description: 'Distributed version control for code and lightweight assets — branching, commits, and collaboration fundamentals.' },
      { slug: 'perforce', title: 'Perforce', description: 'Centralized version control built for large binary game assets, changelists, and stream-based workflows.' },
      { slug: 'google-drive', title: 'Google Drive', description: 'Cloud storage and sync for reference, documents, and shared project files — plus where it breaks down for production.' },
    ],
  },
];

// --- Build + write -----------------------------------------------------------
async function buildProject(p) {
  const project = {
    _key: key(),
    _type: 'courseProject',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    description: p.description,
  };
  if (THUMBS[p.slug]) {
    const id = await uploadImage(alias(THUMBS[p.slug]));
    if (id) project.thumbnail = imageValue(id);
  }
  if (p.eyeLesson) {
    project.body = await convertEyeLesson();
  }
  return project;
}

async function main() {
  let order = 0;
  for (const level of curriculum) {
    for (const c of level.courses) {
      const slug = courseSlug(c.code);
      console.log(`Seeding course: ${c.code} — ${c.title}`);
      const projects = [];
      for (const p of c.projects) projects.push(await buildProject(p));
      await client.createOrReplace({
        _id: docId('course', slug),
        _type: 'course',
        code: c.code,
        title: c.title,
        slug: { _type: 'slug', current: slug },
        year: level.year,
        order: order++,
        description: c.description,
        required: c.required,
        audience: c.audience,
        projects,
      });
      console.log(`  ✓ ${projects.length} project(s)`);
    }
  }

  let topicOrder = 0;
  for (const t of pipeline) {
    console.log(`Seeding pipeline topic: ${t.title}`);
    await client.createOrReplace({
      _id: docId('pipelineTopic', t.slug),
      _type: 'pipelineTopic',
      title: t.title,
      slug: { _type: 'slug', current: t.slug },
      description: t.description,
      order: topicOrder++,
      threads: t.threads.map((th) => ({
        _key: key(),
        _type: 'pipelineThread',
        title: th.title,
        slug: { _type: 'slug', current: th.slug },
        description: th.description,
      })),
    });
    console.log(`  ✓ ${t.threads.length} thread(s)`);
  }

  console.log('\nSeed complete. Review at the Studio.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
