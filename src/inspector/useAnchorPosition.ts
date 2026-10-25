import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

/** Balonun katman kenarlarına bırakacağı en az boşluk (Explainer.module.css genişliğiyle uyumlu). */
const EDGE_GAP = 8;
/** Hedef öğe ile balon arasındaki mesafe. */
const OFFSET_Y = 12;
/** Okun balon köşelerine en fazla ne kadar yaklaşabileceği. */
const ARROW_INSET = 18;

export type Placement = 'top' | 'bottom';

export type AnchorPosition = { top: number; left: number; arrowX: number; placement: Placement };

/**
 * Balonu katman içinde hedef öğeye göre konumlandırır: varsayılan olarak altına, altta yer yoksa üstüne.
 * Yatayda hedefe ortalar ama katmandan taşırmaz. Boyut ya da kaydırma değişince yeniden hesaplar.
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
      const height = panel.offsetHeight;
      const anchorX = anchorRect.left + anchorRect.width / 2 - layerRect.left;
      const left = clamp(anchorX - width / 2, EDGE_GAP, layerRect.width - EDGE_GAP - width);
      const spaceBelow = window.innerHeight - anchorRect.bottom;
      const placement: Placement =
        spaceBelow < height + OFFSET_Y && anchorRect.top > spaceBelow ? 'top' : 'bottom';
      const top =
        placement === 'bottom'
          ? anchorRect.bottom - layerRect.top + OFFSET_Y
          : anchorRect.top - layerRect.top - OFFSET_Y - height;
      const next = {
        top: Math.round(top),
        left: Math.round(left),
        arrowX: Math.round(clamp(anchorX - left, ARROW_INSET, width - ARROW_INSET)),
        placement,
      };
      setPosition((prev) =>
        prev &&
        prev.top === next.top &&
        prev.left === next.left &&
        prev.arrowX === next.arrowX &&
        prev.placement === next.placement
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

/** Alt sınır üst sınırdan büyükse alt sınır kazanır (dar katmanda balon sola yaslanır). */
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
