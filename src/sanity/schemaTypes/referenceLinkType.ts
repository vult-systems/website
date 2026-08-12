import { defineType, defineField } from 'sanity';

const REFERENCE_KINDS = ['Article', 'Video', 'Book', 'Documentation', 'Tool', 'Image Credit', 'Other'];

/** A single external source/further-reading link shown at the bottom of a lecture. */
export const referenceLinkType = defineType({
  name: 'referenceLink',
  title: 'Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: { list: REFERENCE_KINDS },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'url' },
  },
});
