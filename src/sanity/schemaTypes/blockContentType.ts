import { defineType, defineArrayMember } from 'sanity';

/**
 * Rich text ("Portable Text") used by Log entries, Course projects, and
 * Pipeline threads. Supports headings, lists, links, and inline figures
 * with captions (the CMS equivalent of the <Figure><Image/></Figure>
 * pattern used in the old MDX posts).
 */
export const blockContentType = defineType({
  title: 'Body',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      name: 'figure',
      title: 'Figure',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'divider',
      title: 'Divider',
      fields: [
        {
          name: 'variant',
          type: 'string',
          title: 'Style',
          options: {
            list: [
              { title: 'Line', value: 'line' },
              { title: 'Dotted', value: 'dots' },
            ],
            layout: 'radio',
          },
          initialValue: 'line',
        },
      ],
      preview: {
        select: { variant: 'variant' },
        prepare: ({ variant }) => ({ title: `Divider (${variant || 'line'})` }),
      },
    }),
    defineArrayMember({
      type: 'table',
      name: 'table',
      title: 'Table',
    }),
  ],
});
