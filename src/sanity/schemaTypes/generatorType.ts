import { defineType, defineField } from 'sanity';

/**
 * A reusable "roll a random constraint" widget (e.g. the Alien Bust
 * project: roll an Earth-insect/fish analog + a personality + a shape
 * language). Its own document type — not an inline Portable Text block —
 * so its deeply nested categories/items get Sanity's normal full-page
 * document editor instead of the array-of-objects editor's modal-in-modal
 * dialogs. Embedded into a thread's body via the `generatorBlock` object
 * in blockContentType.ts, which just holds a reference to one of these.
 */
export const generatorType = defineType({
  name: 'generator',
  title: 'Generator',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'For finding this in Studio — not shown on the site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resultLabel',
      title: 'Result label',
      type: 'string',
      description: 'Label above the generated name, e.g. "Your Alien".',
      initialValue: 'Your Result',
    }),
    defineField({
      name: 'generateIdentity',
      title: 'Generate a name + specimen ID',
      type: 'boolean',
      description: 'Shows a randomly generated name and specimen ID above the categories.',
      initialValue: true,
    }),
    defineField({
      name: 'specimenPrefix',
      title: 'Specimen ID prefix',
      type: 'string',
      initialValue: 'XENO',
      hidden: ({ parent }) => !parent?.generateIdentity,
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      description: 'The "formula" columns (e.g. Creature Reference + Personality + Shape Language). Keep each category\'s items the same kind as the category itself.',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(5),
      of: [
        {
          type: 'object',
          name: 'category',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'kind',
              title: 'Item kind',
              type: 'string',
              options: {
                list: [
                  { title: 'Image (searches Wikimedia Commons)', value: 'image' },
                  { title: 'Word / phrase', value: 'word' },
                  { title: 'Shape icon', value: 'shape' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'imageAspect',
              title: 'Reference photo shape',
              type: 'string',
              description: 'Only used when Item kind is Image.',
              options: {
                list: [
                  { title: 'Standard (4:3)', value: 'standard' },
                  { title: 'Wide (16:9)', value: 'wide' },
                ],
                layout: 'radio',
              },
              initialValue: 'wide',
              hidden: ({ parent }) => parent?.kind !== 'image',
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              validation: (Rule) => Rule.min(1),
              of: [
                {
                  type: 'object',
                  name: 'imageItem',
                  title: 'Image item',
                  fields: [
                    { name: 'name', title: 'Display name', type: 'string', validation: (Rule) => Rule.required() },
                    {
                      name: 'searchQuery',
                      title: 'Wikimedia search query',
                      type: 'string',
                      description: 'What to search Wikimedia Commons for (usually the scientific name for accuracy). Falls back to the display name if left empty. Ignored at render time once Curated images below has at least one entry.',
                    },
                    {
                      name: 'curatedImages',
                      title: 'Curated images',
                      description: 'Hand-picked photos to use instead of a live Wikimedia Commons search. One is chosen at random per roll, same as the live search behavior. Leave empty to keep using the live search.',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          name: 'curatedImage',
                          fields: [
                            {
                              name: 'image',
                              title: 'Uploaded image',
                              type: 'image',
                              description: 'Preferred: an image hosted on our own Sanity CDN. Takes priority over Image URL below when both are set.',
                            },
                            {
                              name: 'url',
                              title: 'Image URL',
                              type: 'url',
                              description: 'Fallback / quick-add option: hotlink an external image (e.g. while scouting new references, before uploading one properly). Used only when Uploaded image above is empty.',
                              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
                            },
                            { name: 'sourceUrl', title: 'Source page URL', type: 'url', description: 'Wikimedia Commons file page, for attribution.', validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }) },
                          ],
                          validation: (Rule) =>
                            Rule.custom((value: { image?: unknown; url?: string } | undefined) =>
                              value?.image || value?.url ? true : 'Set either an uploaded image or an image URL.'
                            ),
                          preview: {
                            select: { media: 'image', url: 'url' },
                            prepare: ({ media, url }: { media?: any; url?: string }) => ({
                              title: media ? 'Uploaded image' : url || 'Curated image',
                              media,
                            }),
                          },
                        },
                      ],
                    },
                    {
                      name: 'traits',
                      title: 'Reference traits',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                  ],
                  preview: { select: { title: 'name' } },
                },
                {
                  type: 'object',
                  name: 'wordItem',
                  title: 'Word item',
                  fields: [
                    { name: 'label', title: 'Word / phrase', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'description', title: 'Description', type: 'text', rows: 2 },
                  ],
                  preview: { select: { title: 'label', subtitle: 'description' } },
                },
                {
                  type: 'object',
                  name: 'shapeItem',
                  title: 'Shape item',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'description', title: 'Description', type: 'text', rows: 2 },
                    {
                      name: 'shape',
                      title: 'Icon',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Circle', value: 'circle' },
                          { title: 'Square', value: 'square' },
                          { title: 'Triangle', value: 'triangle' },
                          { title: 'Circle + Square', value: 'circleSquare' },
                          { title: 'Circle + Triangle', value: 'circleTriangle' },
                          { title: 'Square + Triangle', value: 'squareTriangle' },
                        ],
                        layout: 'dropdown',
                      },
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: { select: { title: 'label', subtitle: 'shape' } },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'label', kind: 'kind', items: 'items' },
            prepare: ({ title, kind, items }: { title?: string; kind?: string; items?: unknown[] }) => ({
              title: title || 'Category',
              subtitle: `${kind || 'word'} · ${items?.length ?? 0} item${items?.length === 1 ? '' : 's'}`,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', resultLabel: 'resultLabel', categories: 'categories' },
    prepare: ({ title, resultLabel, categories }: { title?: string; resultLabel?: string; categories?: unknown[] }) => ({
      title: title || resultLabel || 'Generator',
      subtitle: `${categories?.length ?? 0} categor${categories?.length === 1 ? 'y' : 'ies'}`,
    }),
  },
});
