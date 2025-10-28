# carlosgarcia.works

Personal portfolio site for 3D art, studio work, teaching, and technical writing.

## Stack

- [Astro](https://astro.build) - Static site generator
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [MDX](https://mdxjs.com) - Enhanced markdown

## Architecture

**DRY & Maintainable**

Three config files are the single source of truth:
- `src/config/site.ts` - All site/author metadata
- `src/config/seo.ts` - SEO helper functions
- `src/config/design.ts` - Component styling tokens

Change your email once in `site.ts`, it updates everywhere. Change a button color in `design.ts`, all buttons update.

**Design System**

Centralized styling tokens instead of scattered Tailwind classes:
- Components: button, badge, card, link, heading, text
- Layout utilities: container, section, grid patterns
- Typography & spacing scales

**Pure Astro Stack**

No React, no Vue, no Svelte. Just Astro components with vanilla JS where needed.
- Minimal JavaScript footprint
- ~2 second builds for 21 pages
- 12 packages (down from 65+)

## Development

```bash
npm install
npm run dev     # Start dev server
npm run build   # Build for production
```

Visit `/lab` in dev mode to see the design system.

## Development Approach

Built with AI assistance for rapid prototyping and learning.
