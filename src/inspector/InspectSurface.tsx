import { useEffect, useId, useLayoutEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { catalogOf, getSpec } from '../catalog';
import type { UiElementSpec } from '../catalog';
import { Explainer } from './Explainer';
import { InspectActivityContext } from './InspectActivity';
import { useInspectorLayer } from './InspectorLayer';
import { useAnchorPosition } from './useAnchorPosition';
import { TARGET_SELECTOR, useInspectSurface } from './useInspectSurface';
import styles from './InspectSurface.module.css';

/** Box in local (unscaled) pixels; `scale` is the container's on-screen scale. */
type Box = { top: number; left: number; width: number; height: number; scale: number };

/**
 * Tracks an element's position and size relative to its container (also on scroll, for sticky elements).
 * If the container is scaled (shrunk phone, window settling into place), converts screen pixels to local pixels.
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
    // A scale change doesn't alter layout, so ResizeObserver misses it
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [element, containerRef]);

  return element ? box : null;
}

/** Outline and name tag are drawn at the inverse scale, so they stay thin and legible in a shrunk example. */
function boxStyle(box: Box) {
  return {
    transform: `translate(${box.left}px, ${box.top}px)`,
    width: box.width,
    height: box.height,
    '--inspect-scale': box.scale,
  } as CSSProperties;
}

/** If the name tag doesn't fit above the element (e.g. the topmost navbar), it goes below instead of covering it. */
function tagPlacement(box: Box) {
  return box.top * box.scale < 22 ? 'below' : 'above';
}

type InspectSurfaceProps = {
  /** The example's name as read to screen readers, e.g. "Acme marketing site". */
  label: string;
  /** Called once the number of distinct inspectable elements is known (for the counter in the project header). */
  onCount?: (count: number) => void;
  /** Whether to fill the container's full height (for fixed-height frames such as a phone screen). */
  fill?: boolean;
  /** Descriptions of the elements this example marks with `data-inspect`. */
  specs: readonly UiElementSpec[];
  /** A control for the pinned balloon, given the element it shows (the library's Add to brief). */
  renderAction?: (spec: UiElementSpec) => ReactNode;
  children: ReactNode;
};

/**
 * Puts a demo into "inspect element" mode. Every element in the demo with a `data-inspect` attribute is
 * inspectable: hovering shows its name, a short dwell its summary, and a click its full explanation.
 * The demo is visual only; for screen readers the example is conveyed by a single focus stop and a live region.
 */
export function InspectSurface({ label, onCount, fill = false, specs, renderAction, children }: InspectSurfaceProps) {
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

  const catalog = useMemo(() => catalogOf(specs), [specs]);
  const spec = target ? getSpec(catalog, target.getAttribute('data-inspect') ?? undefined) : undefined;
  const hoverSpec = hoverEl ? getSpec(catalog, hoverEl.getAttribute('data-inspect') ?? undefined) : undefined;
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
            action={mode === 'pinned' ? renderAction?.(spec) : undefined}
            {...panelProps}
          />,
          layer,
        )}
    </>
  );
}
