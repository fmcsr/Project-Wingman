import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

/** Balonun katman kenarlarına bırakacağı en az boşluk (Explainer.module.css genişliğiyle uyumlu). */
const EDGE_GAP = 8;
/** Hedefin alt kenarı ile balon arasındaki mesafe (işaret rozeti dahil). */
const OFFSET_Y = 20;
/** Okun balon köşelerine en fazla ne kadar yaklaşabileceği. */
const ARROW_INSET = 18;

export type AnchorPosition = { top: number; left: number; arrowX: number };

/**
 * Balonu katman içinde hedefin altına ortalar; yatayda katmandan taşırmaz.
 * Katman ya da hedef boyut değiştirdiğinde veya herhangi bir alan kaydırıldığında yeniden hesaplar.
 */
export function useAnchorPosition(
  open: boolean,
  anchorRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  layer: HTMLElement | null,
): AnchorPosition | null {
  const [position, setPosition] = useState<AnchorPosition | null>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const panel = panelRef.current;
    if (!open || !layer || !anchor || !panel) return;

    const update = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const layerRect = layer.getBoundingClientRect();
      const width = panel.offsetWidth;
      const anchorX = anchorRect.left + anchorRect.width / 2 - layerRect.left;
      const left = clamp(anchorX - width / 2, EDGE_GAP, layerRect.width - EDGE_GAP - width);
      const next = {
        top: Math.round(anchorRect.bottom - layerRect.top + OFFSET_Y),
        left: Math.round(left),
        arrowX: Math.round(clamp(anchorX - left, ARROW_INSET, width - ARROW_INSET)),
      };
      setPosition((prev) =>
        prev && prev.top === next.top && prev.left === next.left && prev.arrowX === next.arrowX ? prev : next,
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(layer);
    observer.observe(anchor);
    document.addEventListener('scroll', update, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', update, true);
    };
  }, [open, layer, anchorRef, panelRef]);

  return position;
}

/** Alt sınır üst sınırdan büyükse alt sınır kazanır (dar katmanda balon sola yaslanır). */
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
