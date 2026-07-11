import { defineType, defineField } from 'sanity';

/** Log entries — migrated from src/content/log/*.mdx */
export const logType = defineType({
  name: 'log',
  title: 'Log Entry',
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
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'pubDate',
      title: 'Published date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'updatedDate', title: 'Updated date', type: 'datetime' }),
    defineField({ name: 'author', type: 'string', initialValue: 'Carlos Garcia' }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          'process',
          'thoughts',
          'technical',
          'experiment',
          '3d',
          'tutorial',
          'wip',
        ],
      },
    }),
    defineField({ name: 'draft', type: 'boolean', initialValue: false }),
    defineField({ name: 'body', type: 'blockContent' }),
  ],
  orderings: [
    {
      title: 'Published date, newest first',
      name: 'pubDateDesc',
      by: [{ field: 'pubDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'pubDate', media: 'heroImage' },
  },
});
