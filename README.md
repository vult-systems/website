# carlosgarcia.works

Personal portfolio site for 3D art, studio work, teaching, and technical writing.

**Live:** [carlosgarcia.works](https://carlosgarcia.works)

## Stack

- [Astro 5](https://astro.build) — Static site generator with View Transitions
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com) — Styling with custom `3xl`/`4xl` breakpoints (1920px / 2560px)
- [MDX](https://mdxjs.com) — Enhanced markdown for content
- [Partytown](https://partytown.builder.io/) — Analytics off the main thread
- [Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — Auto-generated sitemap

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — auto-scrolling art carousel + hero |
| `/art` | Art portfolio grid |
| `/art/[slug]` | Individual art piece detail |
| `/courses` | Curriculum and course content |
| `/students` | Student work showcase |
| `/resources` | Free tools and downloads |
| `/log` | Development log / blog |
| `/log/[slug]` | Individual log entry |
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

**Pure Astro Stack**

No React, no Vue, no Svelte. Astro components + vanilla TypeScript where needed.
- Minimal JavaScript footprint
- Fast builds
- 12 dependencies

## Development

```bash
npm install
npm run dev      # Dev server → http://localhost:4321
npm run build    # Production build
npm run preview  # Preview production build locally
npm run check    # Type-check all Astro/TS files
```

Visit `/lab` in dev to browse the full design system.

## Content

**Art pieces** — `src/content/art/*.mdx`  
**Log entries** — `src/content/log/*.mdx`  
**Content schema** — `src/content/config.ts`

Assets live in `src/assets/` (processed by Astro's image pipeline) and `public/` (served as-is).

## Deployment

Deployed via static export. `CNAME` file in `public/` handles custom domain routing.

---

Built with AI assistance (GitHub Copilot) for rapid iteration.
