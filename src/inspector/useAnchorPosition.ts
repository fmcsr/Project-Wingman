import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

/** Minimum gap the balloon keeps from the layer edges (matches the width in Explainer.module.css). */
const EDGE_GAP = 8;
/** Distance between the target element and the balloon. */
const OFFSET_Y = 12;
/** The closest the arrow may get to the balloon's corners. */
const ARROW_INSET = 18;
/** The shortest a balloon gets beside its element (scrolling inside) before it covers the element instead. */
const MIN_BESIDE = 320;

/** `over`: little room on either side, so the balloon covers part of the element (without an arrow) to stay on screen. */
export type Placement = 'top' | 'bottom' | 'over';

export type AnchorPosition = {
  top: number;
  left: number;
  arrowX: number;
  placement: Placement;
  /** Set when the balloon is taller than the space it gets: its content scrolls inside. */
  maxHeight?: number;
};

/** Where the visible page starts: below the sticky page header, which is drawn over the balloons. */
function visibleTop() {
  const header = document.querySelector('header');
  if (!header) return 0;
  const { position } = getComputedStyle(header);
  const rect = header.getBoundingClientRect();
  return (position === 'sticky' || position === 'fixed') && rect.top <= 1 ? Math.max(0, rect.bottom) : 0;
}

/**
 * Positions the balloon in the layer relative to the target element, always on screen below the page header: below
 * if it fits, else above if it fits there. A tall balloon that fits on neither side takes the roomier side and
 * scrolls inside; if even that side is short (a tall element in the middle of the screen), it covers part of the
 * element instead. Centers horizontally on the target without overflowing the layer. Recomputes when size or scroll
 * changes.
 */
export function useAnchorPosition(
  open: boolean,
  anchor: Element | null,
  panelRef: RefObject<HTMLElement | null>,
  layer: HTMLElement | null,
): AnchorPosition | null {
  const [position, setPosition] = useState<AnchorPosition | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!open || !layer || !anchor || !panel) return;

    const update = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const layerRect = layer.getBoundingClientRect();
      const width = panel.offsetWidth;
      // The full height, also while the balloon is capped and its body scrolls
      const body = panel.querySelector<HTMLElement>('[data-balloon-body]');
      const height = panel.offsetHeight + (body ? body.scrollHeight - body.clientHeight : 0);
      const anchorX = anchorRect.left + anchorRect.width / 2 - layerRect.left;
      const left = clamp(anchorX - width / 2, EDGE_GAP, layerRect.width - EDGE_GAP - width);
      // The visible band, in screen coordinates
      const screenTop = visibleTop() + EDGE_GAP;
      const screenBottom = window.innerHeight - EDGE_GAP;
      const spaceBelow = screenBottom - anchorRect.bottom - OFFSET_Y;
      const spaceAbove = anchorRect.top - OFFSET_Y - screenTop;
      let placement: Placement;
      let top: number;
      let maxHeight: number | undefined;
      if (height <= spaceBelow) {
        placement = 'bottom';
        top = anchorRect.bottom + OFFSET_Y;
      } else if (height <= spaceAbove) {
        placement = 'top';
        top = anchorRect.top - OFFSET_Y - height;
      } else if (Math.max(spaceBelow, spaceAbove) >= MIN_BESIDE) {
        // Fits whole on neither side: the roomier side, scrolling inside
        maxHeight = Math.max(spaceBelow, spaceAbove);
        placement = spaceBelow >= spaceAbove ? 'bottom' : 'top';
        top = placement === 'bottom' ? anchorRect.bottom + OFFSET_Y : screenTop;
      } else {
        placement = 'over';
        const room = screenBottom - screenTop;
        if (height > room) maxHeight = room;
        const preferred = spaceBelow >= spaceAbove ? anchorRect.bottom + OFFSET_Y : anchorRect.top - OFFSET_Y - height;
        top = clamp(preferred, screenTop, screenBottom - Math.min(height, room));
      }
      const next = {
        top: Math.round(top - layerRect.top),
        left: Math.round(left),
        arrowX: Math.round(clamp(anchorX - left, ARROW_INSET, width - ARROW_INSET)),
        placement,
        maxHeight: maxHeight === undefined ? undefined : Math.round(maxHeight),
      };
      setPosition((prev) =>
        prev &&
        prev.top === next.top &&
        prev.left === next.left &&
        prev.arrowX === next.arrowX &&
        prev.placement === next.placement &&
        prev.maxHeight === next.maxHeight
          ? prev
          : next,
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(layer);
    observer.observe(anchor);
    observer.observe(panel);
    document.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, anchor, layer, panelRef]);

  return position;
}

/** If the lower bound exceeds the upper, the lower bound wins (in a narrow layer the balloon hugs the left). */
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
