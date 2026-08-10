// One-off/reusable maintenance script: shrinks oversized raw images under
// public/student-work/ (submitted at full camera/render resolution, often
// several MB) down to a sane web size. Run with `node scripts/optimize-student-images.mjs`
// whenever new student work is added and looks too heavy.
//
// Converts qualifying .png/.jpg/.jpeg files to resized WebP, prints a
// before/after report, and leaves the original in place — the caller is
// expected to repoint the `image:` path in students.astro to the new
// .webp file and delete the original once satisfied with the result.

import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = path.resolve(import.meta.dirname, '../public/student-work');
const SIZE_THRESHOLD_BYTES = 400 * 1024; // 400KB
const MAX_DIMENSION = 2000;
const WEBP_QUALITY = 82;

const files = await readdir(DIR);
const candidates = files.filter((f) => /\.(png|jpe?g)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;

for (const file of candidates) {
  const srcPath = path.join(DIR, file);
  const { size: beforeSize } = await stat(srcPath);
  if (beforeSize < SIZE_THRESHOLD_BYTES) continue;

  const outFile = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const outPath = path.join(DIR, outFile);

  const image = sharp(srcPath);
  const meta = await image.metadata();
  const needsResize = (meta.width ?? 0) > MAX_DIMENSION || (meta.height ?? 0) > MAX_DIMENSION;

  await image
    .resize(needsResize ? { width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true } : undefined)
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);

  const { size: afterSize } = await stat(outPath);
  totalBefore += beforeSize;
  totalAfter += afterSize;

  console.log(
    `${file} -> ${outFile}: ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB ` +
    `(-${(100 - (afterSize / beforeSize) * 100).toFixed(0)}%)`
  );
}

if (totalBefore > 0) {
  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB ` +
    `(-${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`
  );
} else {
  console.log(`No files over ${(SIZE_THRESHOLD_BYTES / 1024).toFixed(0)}KB found.`);
}
