import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { studioTheme } from './src/sanity/theme';

// Read from env so the same config works for the embedded Astro studio
// (PUBLIC_SANITY_*) and the standalone `sanity` CLI (SANITY_STUDIO_*).
const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  '';
const dataset =
  process.env.PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production';

export default defineConfig({
  name: 'default',
  title: 'carlosgarcia.works',
  projectId,
  dataset,
  theme: studioTheme,
  plugins: [structureTool(), visionTool({ defaultApiVersion: '2024-10-01' })],
  schema: { types: schemaTypes },
});
