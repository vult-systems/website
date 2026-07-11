import { buildLegacyTheme } from 'sanity';

// Palette mirrored from the website's dark theme (src/styles/globals.css).
//   background        hsl(0 0% 3%)     -> #080808  (near-black)
//   surface           hsl(0 0% 7%)     -> #121212
//   foreground        hsl(0 0% 97%)    -> #f7f7f7
//   foreground-muted  hsl(0 0% 62%)    -> #9e9e9e
//   border            hsl(0 0% 12%)    -> #1f1f1f
//   accent            hsl(28 85% 58%)  -> #ef8e39  (site's muted orange)
//
// Note: Sanity paints solid brand/primary buttons with WHITE text, and the
// site's bright accent (#ef8e39) is too light for white text (~2.5:1).
// For the Studio we use a deeper "burnt orange" so white text clears AA (~5:1)
// while staying on-brand. The bright accent is kept only for the focus ring.
const palette = {
  black: '#080808',
  surface: '#121212',
  white: '#f7f7f7',
  gray: '#9e9e9e',
  accent: '#c2410c',        // burnt orange — readable with white text (AA)
  accentFocus: '#ef8e39',   // site's bright accent, used for focus rings only
  green: '#4ade80',
  yellow: '#f5b642',
  red: '#f4685f',
  blue: '#5aa9e6',
};

export const studioTheme = buildLegacyTheme({
  // Base tones
  '--black': palette.black,
  '--white': palette.white,
  '--gray': palette.gray,
  '--gray-base': palette.gray,

  '--component-bg': palette.black,
  '--component-text-color': palette.white,

  // Brand / navigation
  '--brand-primary': palette.accent,
  '--main-navigation-color': palette.black,
  '--main-navigation-color--inverted': palette.white,

  // Focus ring uses the site's bright accent; solid actions use burnt orange
  '--focus-color': palette.accentFocus,
  '--default-button-color': palette.gray,
  '--default-button-primary-color': palette.accent,
  '--default-button-success-color': palette.green,
  '--default-button-warning-color': palette.yellow,
  '--default-button-danger-color': palette.red,

  // State colors
  '--state-info-color': palette.blue,
  '--state-success-color': palette.green,
  '--state-warning-color': palette.yellow,
  '--state-danger-color': palette.red,
});
