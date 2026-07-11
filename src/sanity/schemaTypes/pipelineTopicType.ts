import { defineType, defineField, defineArrayMember } from 'sanity';

/** A single thread inside a Pipeline topic (e.g. Git, Perforce). */
export const pipelineThreadType = defineType({
  name: 'pipelineThread',
  title: 'Thread',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'blockContent' }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});

/** Pipeline topic (e.g. "Source Control") grouping several threads. */
export const pipelineTopicType = defineType({
  name: 'pipelineTopic',
  title: 'Pipeline Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Code / Label',
      type: 'string',
      description: 'Short label shown as this topic\u2019s “course code” (e.g. “ANGD Core”).',
      initialValue: 'ANGD Core',
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({
      name: 'threads',
      type: 'array',
      of: [defineArrayMember({ type: 'pipelineThread' })],
    }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'title' } },
});
