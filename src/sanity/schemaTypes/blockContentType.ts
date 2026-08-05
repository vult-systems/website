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
        {
          name: 'align',
          type: 'string',
          title: 'Alignment',
          options: {
            list: [
              { title: 'Center', value: 'center' },
              { title: 'Left', value: 'left' },
              { title: 'Right', value: 'right' },
              { title: 'Full width', value: 'full' },
              { title: 'Bottom (full-bleed, for characters)', value: 'bottom' },
            ],
            layout: 'radio',
          },
          initialValue: 'center',
        },
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
      type: 'object',
      name: 'video',
      title: 'Video',
      fields: [
        {
          name: 'file',
          title: 'Video file',
          type: 'file',
          options: { accept: 'video/*' },
        },
        {
          name: 'url',
          title: 'External URL',
          type: 'url',
          description:
            'Optional. Direct video URL (e.g. an .mp4/.webm link). Used only when no file is uploaded above.',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        },
        {
          name: 'poster',
          title: 'Poster image',
          type: 'image',
          options: { hotspot: true },
          description: 'Optional. Thumbnail shown before the video plays.',
        },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
      preview: {
        select: { title: 'caption', media: 'poster' },
        prepare: ({ title, media }) => ({ title: title || 'Video', media }),
      },
    }),
    defineArrayMember({
      type: 'table',
      name: 'table',
      title: 'Table',
    }),
    defineArrayMember({
      type: 'object',
      name: 'slideBreak',
      title: 'Slide break',
      description:
        'Marks where a new slide starts in Present mode. Invisible on the page. If a lecture has any slide breaks, Present splits only at these points; otherwise it auto-splits by headings.',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Slide title (optional)',
          description: 'Shown as the heading of this slide in Present mode.',
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Slide subtitle (optional)',
        },
        {
          name: 'layout',
          type: 'string',
          title: 'Slide layout',
          options: {
            list: [
              { title: 'Default (title + body)', value: 'default' },
              { title: 'Section title (large, centered)', value: 'section' },
              { title: 'Section title (large, left)', value: 'section-left' },
              { title: 'Image left, text right', value: 'image-left' },
              { title: 'Image right, text left', value: 'image-right' },
              { title: 'Two columns', value: 'two-col' },
            ],
            layout: 'radio',
          },
          initialValue: 'default',
        },
        {
          name: 'label',
          type: 'string',
          title: 'Editor note (optional)',
          description: 'Only shown in the editor to help you find this break.',
        },
      ],
      preview: {
        select: { title: 'title', label: 'label' },
        prepare: ({ title, label }) => ({
          title: title
            ? `Slide break \u2014 ${title}`
            : label
              ? `Slide break \u2014 ${label}`
              : 'Slide break',
        }),
      },
    }),
  ],
});
