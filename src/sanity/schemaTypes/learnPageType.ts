import { defineType, defineField } from 'sanity';

/**
 * Singleton settings for the /learn page chrome (labels that aren't tied to a
 * specific course or pipeline topic). One document controls the page title,
 * intro paragraph, and the two sidebar section headers.
 */
export const learnPageType = defineType({
  name: 'learnPage',
  title: 'Learn Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Large heading at the top of the page.',
      initialValue: 'Education',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 5,
      description: 'Text shown under the page title.',
    }),
    defineField({
      name: 'coursesLabel',
      title: 'Sidebar heading — Courses section',
      type: 'string',
      description: 'Label above the university course list in the sidebar.',
      initialValue: 'University Courses',
    }),
    defineField({
      name: 'pipelineLabel',
      title: 'Sidebar heading — Pipeline section',
      type: 'string',
      description: 'Label above the pipeline topic list in the sidebar.',
      initialValue: 'Studio Pipeline',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Learn Page' }),
  },
});
