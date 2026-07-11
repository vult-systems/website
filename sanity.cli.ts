import { defineCliConfig } from 'sanity/cli';

// Standalone Studio config for the `sanity` CLI (dev / build / deploy).
// Studio schema + plugins live in sanity.config.ts.
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  '';
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.PUBLIC_SANITY_DATASET ||
  'production';

export default defineCliConfig({
  api: { projectId, dataset },
  // Hostname for the hosted studio: https://<studioHost>.sanity.studio
  // (set on first `sanity deploy`; can also be configured here)
  studioHost: 'carlosgarcia-works',
  deployment: { autoUpdates: true, appId: 'qjk0pp8rxjxc3cdeazc9rrlb' },
});
