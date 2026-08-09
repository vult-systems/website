import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './src/sanity/schemaTypes';
import { studioTheme } from './src/sanity/theme';

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

export default defineConfig({
  name: 'default',
  title: 'carlosgarcia.works',
  projectId,
  dataset,
  theme: studioTheme,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: '2024-10-01' }), table(), codeInput()],
  schema: { types: schemaTypes },
});
