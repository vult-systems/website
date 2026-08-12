# Copilot / AI agent instructions — carlosgarcia.works

Personal portfolio + teaching site. Astro 5 (hybrid SSR) front end, Sanity CMS, deployed to Vercel.
Read this before making changes so you match existing conventions.

## Architecture at a glance

- **Front end:** Astro components + vanilla TypeScript. **No framework runtime is shipped to visitors** (no React/Vue on the public site). Sanity Studio is React but runs separately.
- **CMS:** Sanity. Courses, Pipeline topics, and Log entries live in Sanity; Art pieces are local MDX (`src/content/art/*.mdx`).
- **Rendering:** Most pages prerender. `/learn` (`src/pages/learn/[...slug].astro`, an Astro rest-param route), `/log`, and `/log/[slug]` are `export const prerender = false` (SSR) and read live from Sanity with `useCdn: false`, so published edits appear instantly (no rebuild). `/learn` resolves `Astro.params.slug` server-side (against the same Sanity data) purely for per-page SEO tags and Prev/Next computation — the whole curriculum still renders into one document client-side-toggled by `display:none`/JS, same as before; the route conversion only changed how the URL itself is produced (real paths, not a `#hash` the server never saw). A totally unrecognized top-level slug 404s; a stale-but-valid-course/unknown-project falls back one level.
- **Config is the single source of truth:** `src/config/site.ts` (metadata/SEO), `src/config/seo.ts` (per-page SEO), `src/config/design.ts` (styling tokens). Change once, propagates everywhere.

## Sanity conventions (important)

- Client + helpers: `src/lib/sanity/` (`client.ts`, `queries.ts` are plain GROQ strings, `image.ts` has `urlFor`/`fileUrlFor`, `toc.ts` has `slugify`/portable-text helpers).
- Schemas: `src/sanity/schemaTypes/`. Studio config: `sanity.config.ts` (+ `sanity.cli.ts`), theme `src/sanity/theme.ts`.
- Portable Text is rendered by `src/components/sanity/PortableText.astro`, which maps block/mark/type names to `.astro` components (e.g. `figure`, `video`, `model3d`, `table`, `slideBreak`).
- **Queries fetch `body` wholesale**, so adding a field to a Portable Text object needs no query change.
- **Env:** `.env` (gitignored) holds `PUBLIC_SANITY_PROJECT_ID` (`atnkz0s5`), `PUBLIC_SANITY_DATASET` (`production`), matching `SANITY_STUDIO_*`, and a `SANITY_WRITE_TOKEN` (Editor). Project id/dataset are duplicated under both `PUBLIC_*` (site) and `SANITY_STUDIO_*` (CLI) names.
- **Slugs:** `courseType` slugs are generated from `code` via a custom `slugify` that strips punctuation (course codes contain the `·` middle dot). Keep slugs URL-safe.
- **Schema changes require `npm run studio:deploy`** to reach the hosted Studio (`carlosgarcia-works.sanity.studio`). Code changes deploy via Vercel on push.
- **`referenceLink`** (`src/sanity/schemaTypes/referenceLinkType.ts`): reusable object (`title`, `url`, optional `kind` incl. "Image Credit") for a `references[]` array on both `courseProjectThread` and `pipelineThread`. Rendered on `/learn` as a collapsed `<details>/<summary>` disclosure below the lecture body (outside `.lecture-block`, so Present mode's slide-scraping ignores it) and above the Prev/Next nav.

## The 3D model block (`model3d`)

A Portable Text block for interactive 3D models, used e.g. for anatomy teaching.

- **Schema:** `model3d` in `src/sanity/schemaTypes/blockContentType.ts`. Fields: `file` (GLB/glTF upload) or `url` (external), `poster`, `alt`, `caption`, `align` (presentation alignment: center/left/right/full/left-bleed/right-bleed), `aspect` (auto/square/portrait/wide), `autoRotate`, `cameraControls`, `startOrbit` (camera-orbit string like `45deg 75deg auto`), `autoLabelParts` (boolean), `labelOverrides` (array of `{ mesh, label, description, hide }`).
- **Renderer:** `src/components/sanity/PortableTextModel.astro`. Renders `<model-viewer>` (from `@google/model-viewer`, bundled via npm — no CDN), a camera-views gizmo (Front/Right/Back/Left/Top/3-4), and a client `<script>`.
- **Auto-labeling:** When `autoLabelParts` is on, the client script waits for the model's `load` event, reads model-viewer's **own live three.js scene** (via `Object.getOwnPropertySymbols` → the object exposing `forHotspots`/`target`), computes each named mesh's bounding-box center in the **target-local frame** (the frame `data-position` uses), and injects `.mv-callout` hotspot buttons (dot + leader line + name). `labelOverrides` (keyed by lowercase mesh name) can rename/describe/hide. `three` is imported **dynamically inside the labeler** so it can never block model-viewer from registering/loading.
- **Present mode:** `src/components/ui/lecture-presenter.astro` has CSS that sizes `model-viewer` in container-query units (`cqh`) and lifts it above the invisible prev/next click zones (`z-index`). A `MutationObserver` in the renderer wires up model-viewers cloned into the presenter.

### 3D gotchas learned the hard way
- **Coordinate frames:** A standalone `GLTFLoader` does NOT reliably share model-viewer's frame. Always derive positions from model-viewer's live scene (`target`), converting world→target-local, or precomputed positions land off-screen.
- **Loading:** Blocks inside hidden `/learn` lessons won't load with `loading="lazy"` (never enter viewport). The block uses `loading="eager"` for this reason. If a `<model-viewer>` is stuck on its poster, first suspect a JS console error preventing custom-element registration, or lazy-loading in a `display:none` container.
- **Slot attribute:** Astro DOES preserve `slot="hotspot-N"` on native elements (verified) — model-viewer registers hotspots via a MutationObserver reading `node.slot` + `node.dataset.position`.
- **Use uncompressed GLB.** Draco/meshopt need extra decoders (often fetched from a CDN) and will fail under the CSP.

## Image lightbox (`src/components/ui/image-lightbox.astro`)

Single shared lightbox, rendered once in `base-layout.astro`, that auto-binds click-to-zoom on every `<img>` site-wide except `header`/`nav`/`footer` images and anything with `data-no-lightbox`. Left/Right arrow keys step through the other lightbox-eligible images on the current page while it's open (wraps at either end, no-ops in video mode). The gallery list (`{src, alt}` entries) is captured fresh at click time, never cached.

Pages with their own bespoke trigger markup (a wrapper div carrying a caption that isn't just the `<img>`'s own `alt`) can't use the generic per-`<img>` click path — build a `{src, alt}[]` list and call `window.lightboxGallery.open(entries, index)` instead of touching the `#lightbox` DOM directly. `students.astro`'s `.learn-lightbox-trigger` is the existing example (its `<img>` carries `data-no-lightbox` so the generic path doesn't double-bind it). If a page reports "click works but keyboard nav doesn't," check for a page-local duplicate lightbox implementation (`getElementById('lightbox')` outside this file) before assuming the shared component is broken — a `cloneNode`-to-strip-listeners pattern (used on `students.astro` and `learn.astro` card grids) can silently orphan the generic binding while a page's own separate handler keeps working.

## Sketchbook bento grid (`src/content/art/sketchbook.mdx`)

Static MDX content-collection page (not Sanity) with a hand-tuned masonry grid: each card's height is computed from **the image's own real aspect ratio** at its column width (`rowSpanForWidth`), not a preset bucket — the design intent is no cropping, ever. Two gotchas learned the hard way here:
- If a source image has blank canvas baked in (e.g. a ZBrush render where the sculpt sits low in frame), that's real pixel data the grid faithfully reproduces as extra cell height — reads as the hover-glow border being "detached" from the artwork. Fix by cropping the source to its real content bounding box (`sharp`), not by patching the grid CSS.
- `wide: true` (spans both grid columns) can only be placed once CSS Grid's `dense` auto-flow has both columns simultaneously free — a `wide` item added after an *uneven* row leaves the finished column sitting empty until the wide item's row starts, reading as a broken gap. This is a moving target (de-widening one item to fix its gap can just break parity for the next `wide` item further down) — don't add `wide: true` to newly-appended entries without verifying via a bounding-box gap scan; the 4 original wide entries happen to sit after already-balanced rows and are safe to leave as-is. A "make this one card smaller" request should render at a reduced width *within* its normal single-column cell (matching that reduced width for both the row-span calc and the visual box) rather than reaching for a narrower column-span, for the same reason.

## Security / CSP

- `public/_headers` defines the CSP. `connect-src` includes `https://cdn.sanity.io` (so model-viewer can fetch Sanity-hosted GLBs) plus `blob:`/`data:`. External model hosts must be added to `connect-src`. `script-src` includes `'unsafe-eval'` (WASM). `_headers` is NOT applied by the Astro dev server — only in production.
- HTML comments stripped via `src/middleware.ts`; other headers in `vercel.json`.

## Commands

```bash
npm run dev            # Astro dev → http://localhost:4321
npm run build          # Production build (Vercel output)
npm run check          # astro check (type-check)
npm run studio:dev     # Sanity Studio → http://localhost:3333
npm run studio:deploy  # Deploy Studio to carlosgarcia-works.sanity.studio
```

## Conventions to follow

- Prefer the design-system tokens in `src/config/design.ts` and existing `ui/` components over ad-hoc Tailwind.
- Don't ship framework JS to the public site. Keep interactivity in Astro `<script>` (vanilla TS).
- Assets: `src/assets/` are processed by Astro's image pipeline (import them); `public/` is served as-is with stable URLs (use `public/` for files referenced by URL, e.g. from Sanity fields).
- Keep comments minimal — state only what code can't show.
