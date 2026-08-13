import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './src/sanity/schemaTypes';
import { studioTheme } from './src/sanity/theme';
import { resolve } from './src/sanity/presentation/resolve';

// Pin "Learn Page" as a single settings document (not a create-many list).
const LEARN_PAGE_ID = 'learnPage';
const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Learn Page')
        .id('learnPage-singleton')
        .child(S.document().schemaType('learnPage').documentId(LEARN_PAGE_ID)),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) => item.getId() !== 'learnPage'
      ),
    ]);
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

// Where Presentation points its preview iframe. Scoped to /learn: that is the
// only route wired for visual editing in this pilot, and the only route whose
// security headers allow the Studio to frame it.
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321/learn';

export default defineConfig({
  name: 'default',
  title: 'carlosgarcia.works',
  projectId,
  dataset,
  theme: studioTheme,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-10-01' }),
    table(),
    codeInput(),
  ],
  schema: { types: schemaTypes },
});
