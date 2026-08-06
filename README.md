# carlosgarcia.works

Personal portfolio site for 3D art, studio work, teaching, and technical writing.

**Live:** [carlosgarcia.works](https://carlosgarcia.works)

## Stack

- [Astro 5](https://astro.build) — Hybrid SSR with View Transitions
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com) — Styling with custom `3xl`/`4xl` breakpoints (1920px / 2560px)
- [Sanity](https://www.sanity.io) — Headless CMS for Courses, Pipeline, and Log content
- [Vercel](https://vercel.com) — SSR hosting (via `@astrojs/vercel`)
- [MDX](https://mdxjs.com) — Markdown for Art content
- [`<model-viewer>`](https://modelviewer.dev) + [three.js](https://threejs.org) — Interactive 3D models in Sanity content (bundled via npm)
- [Partytown](https://partytown.builder.io/) — Analytics off the main thread
- [Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — Auto-generated sitemap

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — auto-scrolling art carousel + hero |
| `/art` | Art portfolio grid |
| `/art/[slug]` | Individual art piece detail |
| `/learn` | Curriculum, course projects, and Pipeline topics (from Sanity, SSR). Each course and thread has a shareable deep link, e.g. `/learn#source-control/git`. `/courses` redirects here |
| `/students` | Student work showcase |
| `/resources` | Free tools and downloads |
| `/log` | Development log / blog (from Sanity, SSR) |
| `/log/[slug]` | Individual log entry (from Sanity, SSR) |
| `/about` | Bio and experience |
| `/lab` | Design system reference (dev use) |

## Architecture

**Single source of truth config**

Three files control the whole site:
- `src/config/site.ts` — All site/author metadata, social links, SEO defaults
- `src/config/seo.ts` — Per-page SEO helper functions
- `src/config/design.ts` — All component styling tokens (colors, spacing, typography, layout)

Change something once in config and it propagates everywhere automatically.

**Design System**

Centralized styling tokens instead of scattered Tailwind classes:
- Components: `button`, `badge`, `card`, `link`, `heading`, `text`
- Layout: `container` (fluid padding, `max-w-[102rem]`, responsive at `3xl`/`4xl`)
- Typography: fluid `clamp()`-based scale for display headings (`text-fluid-3xl` through `text-fluid-display`)
- Spacing and section scales

**Responsive Scaling**

- Custom Tailwind breakpoints: `3xl` (1920px) and `4xl` (2560px) for 2K/4K displays
- Carousel card widths use `min(clamp(vw), calc(100vh - offset))` — never overflow horizontally or vertically regardless of zoom level
- Fluid typography via CSS `clamp()` for hero headings

**Astro frontend, no shipped framework JS**

The public site is Astro components + vanilla TypeScript — no React/Vue/Svelte runtime is
shipped to visitors. Sanity Studio (which is React-based) runs separately as a hosted app, so
it never bloats the site bundle.
- Minimal JavaScript footprint
- HTML comments are stripped from rendered pages via `src/middleware.ts`
- Security headers applied via `vercel.json`

## Development

```bash
npm install
npm run dev      # Astro dev server → http://localhost:4321
npm run build    # Production build (Vercel output)
npm run preview  # Preview production build locally
npm run check    # Type-check all Astro/TS files
```

Visit `/lab` in dev to browse the full design system.

### Content Studio (Sanity)

```bash
npm run studio:dev     # Run Sanity Studio locally → http://localhost:3333
npm run studio:deploy  # Deploy Studio → https://carlosgarcia-works.sanity.studio
```

The Studio uses a custom theme (`src/sanity/theme.ts`) that mirrors the site's
near-black + orange palette. Requires a `.env` (see `.env.example`) with
`PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, and matching `SANITY_STUDIO_*` values.

## Content

**Art pieces** — `src/content/art/*.mdx` (Astro content collection)  
**Courses, Pipeline & Log** — [Sanity](https://www.sanity.io), edited in the hosted Studio at
[carlosgarcia-works.sanity.studio](https://carlosgarcia-works.sanity.studio). Pages fetch live
via `@sanity/client` (`src/lib/sanity/`) and render Portable Text with the components in
`src/components/sanity/`. Edits publish instantly — no rebuild required.

Sanity schemas live in `src/sanity/schemaTypes/`; the Studio config is `sanity.config.ts`
(themed via `src/sanity/theme.ts`).

**3D models** — the `model3d` Portable Text block embeds an interactive `<model-viewer>` in any
Sanity body (upload a GLB or link a URL). It supports presentation alignment, aspect presets, a
start orientation, a camera-views gizmo, and optional **auto-labeling of named meshes** (great
for anatomy) with per-mesh label/description overrides. Renderer: `src/components/sanity/PortableTextModel.astro`.
Use **uncompressed GLB**, and note external model hosts must be allowed in `public/_headers`
(`connect-src`). See `.github/copilot-instructions.md` for the coordinate-frame and loading caveats.

Assets live in `src/assets/` (processed by Astro's image pipeline) and `public/` (served as-is).

## Deployment

Deployed to [Vercel](https://vercel.com) as a hybrid SSR site (`@astrojs/vercel`): most pages
are prerendered, while `/learn` and `/log` render on-demand so Sanity edits appear instantly.
The custom domain and TLS are managed in Vercel. Security headers are set in `vercel.json`.
