// GROQ queries (plain strings). No runtime dependency required.

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
    body
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
    body
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
      body
    }
  }
`;

/** Pipeline topics with their threads, in manual order. */
export const pipelineQuery = `
  *[_type == "pipelineTopic"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    threads[]{
      title,
      "slug": slug.current,
      description,
      thumbnail,
      body
    }
  }
`;
