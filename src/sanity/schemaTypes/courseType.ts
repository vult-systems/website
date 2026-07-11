import { defineType, defineField, defineArrayMember } from 'sanity';

const YEARS = [
  'Freshman',
  'Sophomore',
  'Sophomore / Junior',
  'Junior',
  'Senior',
];

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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'blockContent' }),
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
      options: { source: 'code', maxLength: 96 },
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
