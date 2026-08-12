import { Button, Text, Tooltip } from '@sanity/ui';
import { CopyIcon } from '@sanity/icons/Copy';
import type { PortableTextInputProps, RenderBlockActionsProps } from 'sanity';

/**
 * Adds a "Duplicate" action next to image/video/divider/3D-model/generator
 * blocks in the rich-text editor. Studio has no built-in way to clone one
 * of these in place.
 *
 * This matters most for Present mode (see lecture-presenter.astro): a
 * reference image sometimes needs to carry across two consecutive slides,
 * but Present builds its slides by reading the page's own rendered body —
 * so the only way to get an image onto a second slide is a second copy of
 * the block in the body (paired with that image's own "Hide on page"
 * toggle so it doesn't double up on the article). Before this, making
 * that second copy meant re-picking the same image asset by hand.
 *
 * First attempt at this used a custom `components.block` calling
 * usePortableTextEditor() to insert the duplicate — that hook needs to
 * run inside the editor's own React context, which held locally but threw
 * ("must be used inside the <PortableTextEditor> component's context")
 * once actually deployed, breaking every block of these types. Studio
 * deploys with auto-updates enabled, so the live bundle's internal
 * @portabletext/editor wiring isn't guaranteed to match what this builds
 * against locally.
 *
 * This version avoids that entirely: `renderBlockActions` hands each
 * block a ready-made `insert()` closure through Sanity's plain array
 * onChange/patch mechanism — the same foundational, non-editor-specific
 * API arrays have used for years — instead of reaching into the editor's
 * own instance.
 */
const DUPLICATABLE_TYPES = new Set(['figure', 'divider', 'video', 'model3d', 'generatorBlock']);

const renderBlockActions = (blockProps: RenderBlockActionsProps) => {
  const type = blockProps.block?._type;
  if (!type || !DUPLICATABLE_TYPES.has(type)) return null;

  const handleDuplicate = () => {
    const { _key, ...fields } = blockProps.block as Record<string, unknown>;
    blockProps.insert({
      ...fields,
      _type: type,
      _key: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    } as never);
  };

  return (
    <Tooltip content={<Text size={1}>Duplicate this block</Text>} placement="top">
      <Button icon={CopyIcon} mode="bleed" fontSize={1} padding={2} onClick={handleDuplicate} />
    </Tooltip>
  );
};

export function PortableTextInputWithDuplicate(props: PortableTextInputProps) {
  return props.renderDefault({ ...props, renderBlockActions });
}
