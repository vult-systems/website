import { defineCollection, z } from 'astro:content';

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
    client: z.string().optional(),
    project: z.string().optional(),
    role: z.string().optional(),
    order: z.number().default(999),
    size: z.enum(['small', 'medium', 'large', 'tall']).default('medium'),
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
  'art': artCollection,
  'log': logCollection,
};
