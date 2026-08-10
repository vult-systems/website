// One-off/reusable maintenance script: extracts a poster frame (~15% into
// the clip, capped at 1s, so we skip a likely-blank opening frame) for every
// video listed below, using ffmpeg. Run again whenever new videos are added
// that need a poster.
//
// Usage: node scripts/generate-video-posters.mjs
// Requires ffmpeg/ffprobe on PATH.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileAsync = promisify(execFile);

const videos = [
  'src/assets/monomyth/aurech/mm_aurech_mod_hair_v02_clay_compressed.mp4',
  'src/assets/monomyth/aurech/mm_aurech_mod_hair_v02_wires_compressed.mp4',
  'src/assets/monomyth/aurech/mm_aurech_mod_clay_full_v02.mp4',
  'src/assets/monomyth/aurech/mm_aurech_mod_wires_full_v02.mp4',
  'src/assets/carbon-core-brawl/ccb-balor-animation.mp4',
  'public/student-work/Alvarez-Space-Cat-Turnaround.mp4',
  'public/student-work/Alvarez-Finn-Turnaround.mp4',
  'public/student-work/Neal-Hong-Bust-Video.mp4',
  'public/student-work/Samantha-Olivas-Witch-01.mp4',
  'public/student-work/Alan-esezquiel-savoy-Apostle-lin-01.mp4',
  'public/student-work/AmarissaSoto-Dragon-Turnaround-01.mp4',
  'public/student-work/ClarissaSoto-dragon-turnaround.mp4',
  'public/student-work/Ubaid-Valorant-FanArt-DemonExecutionVandal-02.mp4',
  'public/student-work/Aaliyah-Mickle-LuggaeParka.mp4',
  'public/student-work/Aaliyah-Mickle-PixelChix.mp4',
  'public/student-work/hailee-davis-demonbaby-turnaround.mp4',
  'public/student-work/hailee-davis-horror-bust.mp4',
  'public/student-work/hailee-davis-old-phone.mp4',
  'public/student-work/lola-castro-retro-nintendo-game-console.mp4',
];

const root = path.resolve(import.meta.dirname, '..');

for (const rel of videos) {
  const src = path.join(root, rel);
  const posterPath = src.replace(/\.mp4$/i, '-poster.jpg');

  const { stdout } = await execFileAsync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1', src,
  ]);
  const duration = parseFloat(stdout.trim());
  const seek = Math.max(0.2, Math.min(1.0, duration * 0.15));

  await execFileAsync('ffmpeg', [
    '-y', '-ss', String(seek), '-i', src,
    '-frames:v', '1', '-vf', "scale='min(1280,iw)':-2",
    '-q:v', '4',
    posterPath,
  ]);

  console.log(`${rel} (${duration.toFixed(1)}s) -> ${path.basename(posterPath)} @ ${seek.toFixed(2)}s`);
}
