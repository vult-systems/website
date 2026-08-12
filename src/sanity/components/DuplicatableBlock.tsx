import { useCallback } from 'react';
import { Button, Flex, Text, Tooltip, useToast } from '@sanity/ui';
import { CopyIcon } from '@sanity/icons/Copy';
import { PortableTextEditor, usePortableTextEditor } from '@portabletext/editor';
import type { BlockProps } from 'sanity';

/**
 * Adds a "Duplicate" control to a Portable Text block object (image,
 * video, divider, table, code block, generator reference — anything
 * registered with this as its `components.block`). Studio has no
 * built-in way to clone one of these in place.
 *
 * This matters most for Present mode (see lecture-presenter.astro): a
 * reference image sometimes needs to carry across two consecutive
 * slides, but Present builds its slides by reading the page's own
 * rendered body — so the only way to get an image onto a second slide
 * is a second copy of the block in the body (paired with that image's
 * own "Hide on page" toggle so it doesn't double up on the article).
 * Before this, making that second copy meant re-picking the same image
 * asset by hand.
 *
 * Uses the editor's imperative API (PortableTextEditor.select +
 * .insertBlock) rather than the newer `editor.send()` event API —
 * insertBlock is marked deprecated in favor of that newer API, but
 * still fully functional, and its behavior is far better documented
 * than the newer event-based replacement.
 */
export function DuplicatableBlock(props: BlockProps) {
  const editor = usePortableTextEditor();
  const toast = useToast();

  const handleDuplicate = useCallback(() => {
    try {
      const value = props.value as Record<string, unknown>;
      const key = value?._key as string | undefined;
      if (!key) return;

      // Drop _key/_type so the editor assigns the duplicate a fresh key
      // instead of colliding with the original's; _type comes back from
      // `schemaType` on insert.
      const { _key, _type, ...fields } = value;

      // Point the editor's selection at this exact block (by its own
      // key, not props.path — path is rooted at the document, while the
      // editor's own selection is relative to just this array) so the
      // duplicate lands right next to the original instead of wherever
      // the user last clicked.
      PortableTextEditor.select(editor, {
        anchor: { path: [{ _key: key }], offset: 0 },
        focus: { path: [{ _key: key }], offset: 0 },
      });
      PortableTextEditor.insertBlock(editor, props.schemaType, fields);
    } catch (err) {
      toast.push({
        status: 'error',
        title: 'Could not duplicate block',
        description: err instanceof Error ? err.message : undefined,
      });
    }
  }, [editor, props.value, props.schemaType, toast]);

  return (
    <div style={{ position: 'relative' }}>
      {(props.selected || props.focused) && (
        <Flex justify="flex-end" paddingBottom={1}>
          <Tooltip content={<Text size={1}>Duplicate this block</Text>} placement="top">
            <Button
              icon={CopyIcon}
              text="Duplicate"
              mode="bleed"
              fontSize={1}
              padding={2}
              onClick={handleDuplicate}
            />
          </Tooltip>
        </Flex>
      )}
      {props.renderDefault(props)}
    </div>
  );
}
