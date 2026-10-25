import { useEffect, useId, useLayoutEffect, useState } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { getSpec } from '../catalog';
import { Explainer } from './Explainer';
import { InspectActivityContext } from './InspectActivity';
import { useInspectorLayer } from './InspectorLayer';
import { useAnchorPosition } from './useAnchorPosition';
import { TARGET_SELECTOR, useInspectSurface } from './useInspectSurface';
import styles from './InspectSurface.module.css';

/** Yerel (ölçeklenmemiş) piksellerle kutu; `scale` kapsayıcının ekrandaki ölçeği. */
type Box = { top: number; left: number; width: number; height: number; scale: number };

/**
 * Bir öğenin, kapsayıcısına göre konum ve boyutunu izler (yapışkan öğeler için kaydırmada da).
 * Kapsayıcı ölçeklenmişse (küçültülmüş telefon, yerine oturan pencere) ekran pikseli yerel piksele çevrilir.
 */
function useRelativeBox(element: Element | null, containerRef: RefObject<HTMLElement | null>) {
  const [box, setBox] = useState<Box | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!element || !container) return;
    const update = () => {
      const c = container.getBoundingClientRect();
      const r = element.getBoundingClientRect();
      const scale = container.offsetWidth > 0 ? c.width / container.offsetWidth : 1;
      const next = {
        top: (r.top - c.top) / scale,
        left: (r.left - c.left) / scale,
        width: r.width / scale,
        height: r.height / scale,
        scale,
      };
      setBox((prev) =>
        prev &&
        prev.top === next.top &&
        prev.left === next.left &&
        prev.width === next.width &&
        prev.height === next.height &&
        prev.scale === next.scale
          ? prev
          : next,
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(element);
    document.addEventListener('scroll', update, true);
    // Ölçek değişimi düzeni değiştirmez; ResizeObserver yakalamaz
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [element, containerRef]);

  return element ? box : null;
}

/** Anahat ve ad etiketi ölçeğin tersiyle çizilir; küçültülmüş örnekte de ince ve okunur kalır. */
function boxStyle(box: Box) {
  return {
    transform: `translate(${box.left}px, ${box.top}px)`,
    width: box.width,
    height: box.height,
    '--inspect-scale': box.scale,
  } as CSSProperties;
}

/** Ad etiketi öğenin üstüne sığmıyorsa (örneğin en üstteki navbar) altına alınır; öğeyi örtmez. */
function tagPlacement(box: Box) {
  return box.top * box.scale < 22 ? 'below' : 'above';
}

type InspectSurfaceProps = {
  /** Örneğin ekran okuyucuya okunan adı, ör. "Acme marketing site". */
  label: string;
  /** İncelenebilir farklı öğe sayısı bulununca çağrılır (proje başlığındaki sayaç için). */
  onCount?: (count: number) => void;
  /** Kapsayıcısının tam yüksekliğini doldursun mu (telefon ekranı gibi sabit yükseklikli çerçeveler için). */
  fill?: boolean;
  children: ReactNode;
};

/**
 * Bir demoyu "öğeyi incele" moduna sokar. Demodaki `data-inspect` nitelikli her öğe incelenebilir:
 * üzerine gelince adı, kısa bir duraksamada özeti, tıklayınca tam açıklaması görünür.
 * Demo yalnızca görseldir; ekran okuyucular için örnek tek bir odak durağı ve canlı bölge ile anlatılır.
 */
export function InspectSurface({ label, onCount, fill = false, children }: InspectSurfaceProps) {
  const id = useId();
  const hintId = `${id}hint`;
  const layer = useInspectorLayer();
  const {
    surfaceRef,
    panelRef,
    mode,
    open,
    target,
    hoverEl,
    keyboardActive,
    active,
    closeFromPanel,
    surfaceProps,
    panelProps,
  } = useInspectSurface();

  const spec = target ? getSpec(target.getAttribute('data-inspect') ?? undefined) : undefined;
  const hoverSpec = hoverEl ? getSpec(hoverEl.getAttribute('data-inspect') ?? undefined) : undefined;
  const position = useAnchorPosition(open && Boolean(spec), target, panelRef, layer);
  const targetBox = useRelativeBox(open || keyboardActive ? target : null, surfaceRef);
  const hoverBox = useRelativeBox(hoverEl && hoverEl !== target ? hoverEl : null, surfaceRef);
  const announcement = keyboardActive && spec ? `${spec.name}. ${spec.summary}` : '';

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface || !onCount) return;
    const ids = new Set([...surface.querySelectorAll(TARGET_SELECTOR)].map((el) => el.getAttribute('data-inspect')));
    onCount(ids.size);
  }, [onCount, surfaceRef]);

  return (
    <>
      <div
        ref={surfaceRef}
        className={fill ? `${styles.surface} ${styles.fill}` : styles.surface}
        tabIndex={0}
        aria-label={`${label}, interactive example`}
        aria-describedby={hintId}
        {...surfaceProps}
      >
        <div className={styles.content} aria-hidden="true">
          <InspectActivityContext value={active}>{children}</InspectActivityContext>
        </div>

        {hoverBox && (
          <div className={styles.outline} data-kind="hover" style={boxStyle(hoverBox)} aria-hidden="true">
            {hoverSpec && (
              <span className={styles.tag} data-placement={tagPlacement(hoverBox)}>
                {hoverSpec.name}
              </span>
            )}
          </div>
        )}
        {targetBox && (
          <div
            className={styles.outline}
            data-kind={mode === 'pinned' ? 'pinned' : 'active'}
            style={boxStyle(targetBox)}
            aria-hidden="true"
          >
            {spec && !hoverBox && (
              <span className={styles.tag} data-placement={tagPlacement(targetBox)}>
                {spec.name}
              </span>
            )}
          </div>
        )}
      </div>

      <p id={hintId} className="sr-only">
        Use the arrow keys to move between elements. Press Enter for details and Escape to close.
      </p>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {layer &&
        spec &&
        createPortal(
          <Explainer
            ref={panelRef}
            id={`${id}panel`}
            spec={spec}
            mode={mode}
            position={position}
            onClose={closeFromPanel}
            {...panelProps}
          />,
          layer,
        )}
    </>
  );
}
