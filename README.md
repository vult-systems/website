# carlosgarcia.works# carlosgarcia.works# Astro Starter Kit: Basics



Personal portfolio website for Carlos Garcia - 3D Artist, Technical Director, and Educator.



## 🚀 Built WithPortfolio website for Carlos Garcia - 3D Artist & Educator. Built with Astro, React, and Tailwind CSS.```sh



- **[Astro](https://astro.build)** - Static site frameworknpm create astro@latest -- --template basics

- **[React](https://react.dev)** - Interactive components

- **[Tailwind CSS](https://tailwindcss.com)** - Styling## 🚀 Recent Updates (October 2025)```

- **[TypeScript](https://www.typescriptlang.org)** - Type safety



## 📁 Project Structure

### ✅ Security & Dependencies> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

```

├── public/              # Static assets- ✨ Updated Astro from v3 to v5 (latest stable)

│   ├── fonts/          # Custom fonts

│   ├── resume.pdf      # Resume file- 🔒 Fixed all 6 security vulnerabilities## 🚀 Project Structure

│   └── robots.txt      # SEO configuration

├── src/- 📦 Updated all dependencies to latest versions

│   ├── components/     # Reusable components

│   │   ├── ui/        # UI components (bento grid, hero, etc.)- 🎯 Zero vulnerabilities in production buildInside of your Astro project, you'll see the following folders and files:

│   │   ├── Header.astro

│   │   └── Footer.astro

│   ├── layouts/        # Page layouts

│   │   └── BaseLayout.astro### ✅ Content Collections```text

│   ├── pages/          # Route pages

│   │   ├── index.astro     # Homepage- 📚 Implemented Astro Content Collections for better content management/

│   │   ├── art.astro       # Art gallery

│   │   ├── code.astro      # Code projects- 🎨 Added `art/` collection for portfolio pieces├── public/

│   │   ├── learn.astro     # Educational resources

│   │   ├── log.astro       # Blog/journal- 💻 Added `projects/` collection for code projects│   └── favicon.svg

│   │   ├── vult.astro      # Studio work

│   │   └── about.astro     # About & resume- 📝 Added `blog/` collection for blog posts├── src

│   └── styles/         # Global styles

└── astro.config.mjs    # Astro configuration- ✨ Full TypeScript validation for all content│   ├── assets

```

│   │   └── astro.svg

## 🛠️ Development

### ✅ Layout System│   ├── components

```bash

# Install dependencies- 🏗️ Created proper layout hierarchy:│   │   └── Welcome.astro

npm install

  - `BaseLayout.astro` - Base HTML structure│   ├── layouts

# Start dev server

npm run dev  - `PageLayout.astro` - Standard pages with header/footer│   │   └── Layout.astro



# Build for production  - `ArticleLayout.astro` - Blog posts and articles│   └── pages

npm run build

- 🎯 Better SEO with proper meta tags│       └── index.astro

# Preview production build

npm run preview- 🔗 Canonical URLs and Open Graph support└── package.json

```

```

## 🔒 Security

### ✅ Production Optimization

This site implements enterprise-grade security suitable for educational institutions:

- Content Security Policy (CSP)- ⚡ Enabled HTML compressionTo learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

- Security headers (X-Frame-Options, X-XSS-Protection, etc.)

- HTTPS-only external resources- 📦 CSS and JS minification with esbuild

- No tracking or analytics

- No personal data collection- 🗺️ Automatic sitemap generation## 🧞 Commands



See [SECURITY.md](SECURITY.md) for details.- 🤖 robots.txt configured



## 🎨 Features- 🖼️ Image optimization configuredAll commands are run from the root of the project, from a terminal:



- **Responsive Design** - Mobile-first approach- 📱 Responsive design improvements

- **Dark Mode** - System preference detection

- **SEO Optimized** - Meta tags, Open Graph, structured data| Command                   | Action                                           |

- **Fast Performance** - Static site generation

- **Accessible** - WCAG 2.1 Level AA compliant### ✅ Code Cleanup| :------------------------ | :----------------------------------------------- |

- **Security Focused** - University-safe configuration

- 🧹 Removed unused UI components (3d-card, flip-words, direction-aware-hover, etc.)| `npm install`             | Installs dependencies                            |

## 📄 License

- 📁 Organized assets properly (public/ vs src/assets/)| `npm run dev`             | Starts local dev server at `localhost:4321`      |

© 2025 Carlos Garcia. All rights reserved.

- 🎨 Simplified hero section| `npm run build`           | Build your production site to `./dist/`          |

## 📧 Contact

- ✨ Added @tailwindcss/typography for better article styling| `npm run preview`         | Preview your build locally, before deploying     |

- Website: [carlosgarcia.works](https://carlosgarcia.works)

- GitHub: [@ProfessorGarcia](https://github.com/ProfessorGarcia)| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

- Security: security@carlosgarcia.works

## 📁 Project Structure| `npm run astro -- --help` | Get help using the Astro CLI                     |



```text## 👀 Want to learn more?

/

├── public/                      # Static assetsFeel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

│   ├── fonts/                   # Custom fonts
│   ├── images/                  # Static images
│   └── robots.txt
├── src/
│   ├── content/                 # ⭐ Content Collections
│   │   ├── art/                 # Art portfolio pieces
│   │   ├── blog/                # Blog posts
│   │   ├── projects/            # Code projects
│   │   └── config.ts            # Schemas
│   ├── layouts/                 # ⭐ New layout system
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── art/[slug].astro     # ⭐ Dynamic art pages
│   │   ├── blog/[slug].astro    # ⭐ Dynamic blog pages
│   │   └── projects/[slug].astro # ⭐ Dynamic project pages
│   └── components/ui/           # UI components
```

## 🧞 Commands

| Command           | Action                                              |
| :---------------- | :-------------------------------------------------- |
| `npm install`     | Install dependencies                                |
| `npm run dev`     | Start dev server at `localhost:4321`                |
| `npm run build`   | Build production site to `./dist/`                  |
| `npm run preview` | Preview production build locally                    |
| `npm run sync`    | Sync content collections and generate types         |
| `npm run check`   | Run Astro diagnostics                               |

## 📝 Adding Content

### Art Pieces

Create `src/content/art/your-piece.md`:

```yaml
---
title: "Artwork Title"
description: "Description"
pubDate: 2024-01-15
category: "3d"  # 3d, digital, concept, abstract
tags: ["blender", "modeling"]
featured: true
tools: ["Blender", "Substance Painter"]
heroImage: ../../assets/images/your-image.jpg  # Optional
---

Your content here...
```

### Projects

Create `src/content/projects/your-project.md`:

```yaml
---
title: "Project Title"
description: "Description"
pubDate: 2024-01-15
category: "code"  # code, art, 3d, vult
tags: ["astro", "react"]
featured: true
link: "https://project-url.com"  # Optional
github: "https://github.com/..."  # Optional
---

Your content here...
```

### Blog Posts

Create `src/content/blog/your-post.md`:

```yaml
---
title: "Blog Post Title"
description: "Description"
pubDate: 2024-01-15
tags: ["tutorial"]
draft: false
---

Your content here...
```

## 🎨 Tech Stack

- **Framework**: Astro v5
- **UI Library**: React v19
- **Styling**: Tailwind CSS v3
- **Content**: Astro Content Collections
- **Animations**: Framer Motion
- **Typography**: @tailwindcss/typography
- **Sitemap**: @astrojs/sitemap
- **MDX**: @astrojs/mdx

## 🚀 Deployment

```bash
npm run build
```

Deploy `./dist/` to Vercel, Netlify, Cloudflare Pages, etc.

## ✨ Features

- ✅ Zero security vulnerabilities
- ✅ Content collections with TypeScript validation
- ✅ SEO optimized (meta tags, sitemap, robots.txt)
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Image optimization
- ✅ Performance optimized
- ✅ Multiple layout options
- ✅ MDX support for rich content

## 📄 License

MIT
