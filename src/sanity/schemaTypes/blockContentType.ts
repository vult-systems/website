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
          {
            title: 'Text color',
            name: 'textColor',
            type: 'object',
            fields: [
              {
                title: 'Color',
                name: 'value',
                type: 'string',
                options: {
                  list: [
                    { title: 'Accent', value: 'accent' },
                    { title: 'Red', value: 'red' },
                    { title: 'Blue', value: 'blue' },
                    { title: 'Gold', value: 'gold' },
                    { title: 'Green', value: 'green' },
                    { title: 'Muted', value: 'muted' },
                  ],
                  layout: 'radio',
                },
                initialValue: 'accent',
                validation: (Rule) => Rule.required(),
              },
            ],
            preview: {
              select: { value: 'value' },
              prepare: ({ value }: { value?: string }) => ({
                title: `Color: ${value || 'accent'}`,
              }),
            },
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
              { title: 'Left (full-bleed, text right)', value: 'left-bleed' },
              { title: 'Right (full-bleed, text left)', value: 'right-bleed' },
              { title: 'Background \u2014 fill slide (text over image)', value: 'background' },
              { title: 'Background \u2014 right side (text left)', value: 'background-right' },
              { title: 'Background \u2014 left side (text right)', value: 'background-left' },
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
      type: 'object',
      name: 'model3d',
      title: '3D Model',
      fields: [
        {
          name: 'file',
          title: 'Model file (.glb / .gltf)',
          type: 'file',
          options: { accept: '.glb,.gltf,model/gltf-binary,model/gltf+json' },
          description: 'Upload an uncompressed GLB (recommended) or glTF.',
        },
        {
          name: 'url',
          title: 'External URL',
          type: 'url',
          description:
            'Optional. Direct .glb/.gltf URL. Used only when no file is uploaded above.',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        },
        {
          name: 'poster',
          title: 'Poster image',
          type: 'image',
          options: { hotspot: true },
          description: 'Optional. Shown before the model loads.',
        },
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the model for screen readers.',
        },
        { name: 'caption', title: 'Caption', type: 'string' },
        {
          name: 'align',
          title: 'Presentation alignment',
          type: 'string',
          description: 'How the viewer is placed on a slide in Present mode. The normal reading view always renders it inline.',
          options: {
            list: [
              { title: 'Center', value: 'center' },
              { title: 'Left', value: 'left' },
              { title: 'Right', value: 'right' },
              { title: 'Full width', value: 'full' },
              { title: 'Left (side-by-side, text right)', value: 'left-bleed' },
              { title: 'Right (side-by-side, text left)', value: 'right-bleed' },
            ],
            layout: 'radio',
          },
          initialValue: 'center',
        },
        {
          name: 'aspect',
          title: 'Frame shape',
          type: 'string',
          description: 'Shape of the viewer stage. Portrait suits full-body characters; Wide suits environments/props.',
          options: {
            list: [
              { title: 'Auto (tall stage)', value: 'auto' },
              { title: 'Square (1:1)', value: 'square' },
              { title: 'Portrait (3:4)', value: 'portrait' },
              { title: 'Wide (16:9)', value: 'wide' },
            ],
            layout: 'radio',
          },
          initialValue: 'auto',
        },
        {
          name: 'autoRotate',
          title: 'Auto-rotate',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'cameraControls',
          title: 'Allow orbit / zoom',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'startOrbit',
          title: 'Start orientation',
          type: 'string',
          description:
            'Optional camera-orbit, e.g. "45deg 75deg auto" (theta phi radius). Leave blank for default framing.',
        },
        {
          name: 'autoLabelParts',
          title: 'Auto-label named parts',
          type: 'boolean',
          description:
            'When on, the viewer places a label at each named mesh in the model (uses the model\u2019s part names). Great for anatomy.',
          initialValue: false,
        },
        {
          name: 'labelOverrides',
          title: 'Label overrides',
          type: 'array',
          description:
            'Optional. Rename, describe, or hide auto-labels. "Mesh name" must match the part name in the model.',
          of: [
            {
              type: 'object',
              name: 'labelOverride',
              fields: [
                { name: 'mesh', title: 'Mesh name (in the model)', type: 'string' },
                { name: 'label', title: 'Show as', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                { name: 'hide', title: 'Hide this label', type: 'boolean' },
              ],
              preview: {
                select: { title: 'label', subtitle: 'mesh' },
                prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
                  title: title || subtitle || 'Override',
                  subtitle: subtitle,
                }),
              },
            },
          ],
        },
      ],
      preview: {
        select: { title: 'caption', alt: 'alt', media: 'poster' },
        prepare: ({ title, alt, media }: { title?: string; alt?: string; media?: unknown }) => ({
          title: title || alt || '3D Model',
          media,
        }),
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
