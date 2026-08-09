// GROQ queries (plain strings). No runtime dependency required.

/**
 * Portable Text body projection. Every generatorBlock only stores a
 * reference to its Generator document (see generatorType.ts — the
 * categories/items live there so Studio gives them a real full-page
 * editor instead of nested array-of-objects dialogs), so the body fetch
 * has to explicitly dereference it — a bare `body` would leave `ref` as
 * just a { _ref } stub and PortableTextGenerator would have nothing to
 * render.
 */
const BODY_PROJECTION = `body[]{
    ...,
    _type == "generatorBlock" => {
      ...,
      ref->
    }
  }`;

/** Editable chrome for the /learn page (singleton settings document). */
export const learnPageQuery = `
  *[_type == "learnPage"][0] {
    pageTitle,
    intro,
    coursesLabel,
    pipelineLabel
  }
`;

/** Lightweight list for the Log index (no body). */
export const logIndexQuery = `
  *[_type == "log" && draft != true] | order(pubDate desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    pubDate,
    tags,
    category,
    heroImage
  }
`;

/** Published (non-draft) log entries, newest first (with body). */
export const logListQuery = `
  *[_type == "log" && draft != true] | order(pubDate desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    pubDate,
    tags,
    category,
    heroImage,
    ${BODY_PROJECTION}
  }
`;

/** A single log entry by slug. */
export const logBySlugQuery = `
  *[_type == "log" && slug.current == $slug && draft != true][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    pubDate,
    updatedDate,
    author,
    tags,
    category,
    heroImage,
    ${BODY_PROJECTION}
  }
`;

/** All courses, grouped client-side by year. */
export const coursesQuery = `
  *[_type == "course"] | order(order asc, code asc) {
    _id,
    code,
    title,
    "slug": slug.current,
    year,
    description,
    outcomes,
    required,
    audience,
    syllabus,
    assignments[]{ title, image },
    projects[]{
      title,
      "slug": slug.current,
      description,
      thumbnail,
      ${BODY_PROJECTION},
      threads[]{
        title,
        "slug": slug.current,
        description,
        thumbnail,
        ${BODY_PROJECTION}
      }
    }
  }
`;

/** Pipeline topics with their threads, in manual order. */
export const pipelineQuery = `
  *[_type == "pipelineTopic"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    code,
    description,
    ${BODY_PROJECTION},
    threads[]{
      title,
      "slug": slug.current,
      description,
      thumbnail,
      ${BODY_PROJECTION}
    }
  }
`;
