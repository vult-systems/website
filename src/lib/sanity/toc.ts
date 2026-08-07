/** Helpers for building a table of contents from Portable Text. */

/** Slugify heading text into a stable anchor id. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Flatten a Portable Text block's spans into plain text (handles annotated/nested spans). */
export function portableTextToPlain(block: any): string {
  if (block == null) return '';
  if (typeof block === 'string') return block;
  if (Array.isArray(block)) return block.map(portableTextToPlain).join('');
  if (typeof block.text === 'string') return block.text;
  if (Array.isArray(block.children)) return block.children.map(portableTextToPlain).join('');
  return '';
}

/** Flatten a whole Portable Text body (blocks, tables) into searchable plain text. */
export function bodyToPlainText(body: any): string {
  if (!Array.isArray(body)) return '';
  return body
    .map((block: any) => {
      if (block?._type === 'table' && Array.isArray(block.rows)) {
        return block.rows.map((row: any) => (row?.cells ?? []).join(' ')).join(' ');
      }
      return portableTextToPlain(block);
    })
    .join(' ');
}

/** Figures/images/videos/3D models in a body that carry searchable alt or caption text. */
export function extractMedia(body: any): any[] {
  if (!Array.isArray(body)) return [];
  return body.filter(
    (b: any) => b && ['figure', 'image', 'video', 'model3d'].includes(b._type) && (b.alt || b.caption)
  );
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/** Extract h2/h3/h4 headings (id, text, level) from a Portable Text body. */
export function getHeadings(body: any): TocHeading[] {
  if (!Array.isArray(body)) return [];
  const headings: TocHeading[] = [];
  for (const block of body) {
    if (block?._type !== 'block') continue;
    const style = block.style;
    if (style !== 'h2' && style !== 'h3' && style !== 'h4') continue;
    const text = portableTextToPlain(block).trim();
    if (!text) continue;
    headings.push({ id: slugify(text), text, level: Number(style.slice(1)) });
  }
  return headings;
}
