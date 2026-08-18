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
      // `source: 'title'` resolves against the top-level document (the
      // pipeline topic), not this array item — every thread in the same
      // topic would generate the same slug. Read the sibling title off
      // the slug field's own parent object instead.
      options: {
        source: (_doc, context) => (context.parent as { title?: string })?.title ?? '',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'blockContent' }),
    defineField({
      name: 'references',
      title: 'References',
      type: 'array',
      description: 'Optional. External sources/further reading shown at the bottom of this lecture.',
      of: [defineArrayMember({ type: 'referenceLink' })],
    }),
    defineField({
      name: 'hidden',
      title: 'Hidden',
      type: 'boolean',
      description: 'Hide this from the live site without deleting it. Useful for staging content before it’s ready or pulling something mid-semester.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', hidden: 'hidden' },
    prepare: ({ title, subtitle, hidden }) => ({
      title,
      subtitle: hidden ? ['Hidden', subtitle].filter(Boolean).join(' · ') : subtitle,
    }),
  },
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
      name: 'body',
      title: 'Page content',
      type: 'blockContent',
      description:
        'Rich text (and tables) shown directly on the topic\u2019s page. Use this for single-page topics like a Glossary that don\u2019t need threads. If this topic has threads, they take priority and this is ignored.',
    }),
    defineField({
      name: 'threads',
      type: 'array',
      description:
        'Optional. Sub-pages for this topic (e.g. Git, Perforce). Leave empty for a single-page topic that uses “Page content” above.',
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
