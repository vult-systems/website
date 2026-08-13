import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation';
import { slugify } from '../../lib/sanity/slug';

/**
 * Tells Presentation which /learn URL a given document shows up on, so the
 * Studio can offer "open in preview" and highlight the right page.
 *
 * The course URL segment is slugify(course.code), not a stored slug field.
 * That derivation is duplicated in three places if you let it be, so it comes
 * from the shared module in src/lib/sanity/slug.ts. If that function changes,
 * the sitemap, the page and this resolver all move together.
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    learnPage: defineLocations({
      select: { title: 'pageTitle' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Education', href: '/learn' }],
      }),
    }),

    course: defineLocations({
      select: {
        code: 'code',
        title: 'title',
        projects: 'projects',
      },
      resolve: (doc) => {
        const code = doc?.code as string | undefined;
        if (!code) return { locations: [] };
        const cid = slugify(code);
        const base = `/learn/${cid}`;

        const locations = [{ title: `${code} — ${doc?.title ?? 'Course'}`, href: base }];

        for (const project of (doc?.projects as any[]) ?? []) {
          const projectSlug = project?.slug?.current;
          if (!projectSlug) continue;
          locations.push({
            title: `${code} · ${project.title ?? projectSlug}`,
            href: `${base}/${projectSlug}`,
          });
          for (const thread of project?.threads ?? []) {
            const threadSlug = thread?.slug?.current;
            if (!threadSlug) continue;
            locations.push({
              title: `${code} · ${project.title ?? projectSlug} · ${thread.title ?? threadSlug}`,
              href: `${base}/${projectSlug}/${threadSlug}`,
            });
          }
        }

        return { locations };
      },
    }),

    pipelineTopic: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        threads: 'threads',
      },
      resolve: (doc) => {
        const slug = doc?.slug as string | undefined;
        if (!slug) return { locations: [] };
        const base = `/learn/${slug}`;

        const locations = [{ title: (doc?.title as string) || 'Pipeline topic', href: base }];

        for (const thread of (doc?.threads as any[]) ?? []) {
          const threadSlug = thread?.slug?.current;
          if (!threadSlug) continue;
          locations.push({
            title: `${doc?.title ?? slug} · ${thread.title ?? threadSlug}`,
            href: `${base}/${threadSlug}`,
          });
        }

        return { locations };
      },
    }),
  },
};
