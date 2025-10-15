import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['code', 'art', '3d', 'vult']).default('code'),
    featured: z.boolean().default(false),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
});

const artCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.union([image(), z.string()]).optional(),
    category: z.enum(['3d', 'character', 'environment', 'digital', 'concept', 'abstract']).default('3d'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    tools: z.array(z.string()).optional(),
  }),
});

const logCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    category: z.enum(['process', 'thoughts', 'technical', 'experiment', '3d', 'tutorial', 'wip']).optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'art': artCollection,
  'log': logCollection,
};
