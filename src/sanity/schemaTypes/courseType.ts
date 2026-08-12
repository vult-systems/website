import { defineType, defineField, defineArrayMember } from 'sanity';

const YEARS = [
  'Freshman',
  'Sophomore',
  'Sophomore / Junior',
  'Junior',
  'Senior',
];

// Strips punctuation (e.g. the "·" separator in course codes) so slugs stay URL-safe.
const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);

/** A sub-thread inside a course project (e.g. Reference, Intro to ZBrush, Block Ins). */
export const courseProjectThreadType = defineType({
  name: 'courseProjectThread',
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
      options: { source: 'title', maxLength: 96, slugify },
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
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});

/** A project/assignment thread inside a course. */
export const courseProjectType = defineType({
  name: 'courseProject',
  title: 'Project',
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
      options: { source: 'title', maxLength: 96, slugify },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'blockContent' }),
    defineField({
      name: 'threads',
      title: 'Threads',
      type: 'array',
      description:
        'Optional. Sub-sections within this project (e.g. Reference, Intro to ZBrush, Block Ins). If any threads exist, they are shown as cards and take priority over the "body" above.',
      of: [defineArrayMember({ type: 'courseProjectThread' })],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});

/** Course document — migrated from the `curriculum` array in courses.astro */
export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'code', maxLength: 96, slugify },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'string',
      options: { list: YEARS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'description', type: 'text', rows: 4 }),
    defineField({ name: 'outcomes', type: 'text', rows: 3 }),
    defineField({ name: 'required', type: 'string' }),
    defineField({ name: 'audience', type: 'string' }),
    defineField({ name: 'syllabus', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'assignments',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'assignment',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'image', type: 'image', options: { hotspot: true } },
          ],
          preview: { select: { title: 'title', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'projects',
      type: 'array',
      of: [defineArrayMember({ type: 'courseProject' })],
    }),
  ],
  orderings: [
    {
      title: 'Year, then order',
      name: 'yearOrder',
      by: [
        { field: 'year', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: { select: { title: 'title', subtitle: 'code', media: 'syllabus' } },
});
