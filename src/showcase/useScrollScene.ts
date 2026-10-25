import { useCallback, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/** Short pause once the window is pinned: before the content starts moving, and at the end before release. */
const DWELL_RATIO = 0.12;
const DWELL_MAX = 120;
/** From this distance (relative to screen height), the window grows as it settles into its pinned spot. */
const ENTER_RATIO = 0.6;
const ENTER_SCALE = 0.92;
/** How long the scrollbar stays visible after scrolling stops. */
const THUMB_IDLE_MS = 900;
/** Keeps the keyboard-selected element off the window edge. */
const REVEAL_MARGIN = 24;

type SceneRefs = {
  scene: RefObject<HTMLElement | null>;
  sticky: RefObject<HTMLElement | null>;
  frame: RefObject<HTMLElement | null>;
  viewport: RefObject<HTMLElement | null>;
  thumb: RefObject<HTMLElement | null>;
};

type Metrics = { overflow: number; dwell: number; stickyTop: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Scrolling like Apple's product pages: the window pins to the screen and page scroll moves the site inside.
 * The user doesn't scroll inside the window separately; the scene grows by the content's overflow and page scroll
 * maps one-to-one onto the content. Because the content is really scrolled (overflow: hidden + scrollTop), sticky
 * elements in the site work too. Returns a `reveal` that scrolls the page to show the keyboard-selected element.
 */
export function useScrollScene({ scene, sticky, frame, viewport, thumb }: SceneRefs) {
  const metrics = useRef<Metrics>({ overflow: 0, dwell: 0, stickyTop: 0 });

  useEffect(() => {
    const sceneEl = scene.current;
    const stickyEl = sticky.current;
    const frameEl = frame.current;
    const viewportEl = viewport.current;
    const thumbEl = thumb.current;
    if (!sceneEl || !stickyEl || !frameEl || !viewportEl || !thumbEl) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let expected = 0;
    let lastTransform = '';
    let idleTimer = 0;

    const update = () => {
      const { overflow, dwell, stickyTop } = metrics.current;
      const scrolled = stickyTop - sceneEl.getBoundingClientRect().top;
      const progress = overflow > 0 ? clamp((scrolled - dwell) / overflow, 0, 1) : 0;
      const next = Math.round(progress * overflow);
      if (next !== expected) {
        expected = next;
        // While scrolling, a thin scrollbar appears, like on macOS
        thumbEl.dataset.active = '';
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => delete thumbEl.dataset.active, THUMB_IDLE_MS);
      }
      // Content that scrolled for another reason, such as focus, returns to the position set by the page
      if (viewportEl.scrollTop !== expected) viewportEl.scrollTop = expected;
      thumbEl.style.setProperty('--progress', progress.toFixed(4));

      const enter = reducedMotion.matches ? 1 : clamp(1 + scrolled / (window.innerHeight * ENTER_RATIO), 0, 1);
      const eased = 1 - (1 - enter) ** 3;
      const transform = enter < 1 ? `scale(${(ENTER_SCALE + (1 - ENTER_SCALE) * eased).toFixed(4)})` : '';
      if (transform !== lastTransform) {
        lastTransform = transform;
        frameEl.style.transform = transform;
      }
    };

    const measure = () => {
      const overflow = Math.max(0, viewportEl.scrollHeight - viewportEl.clientHeight);
      // Little overflow (e.g. the dashboard) means a short pause too, so the window isn't pinned needlessly long
      const dwell = Math.round(Math.min(DWELL_MAX, window.innerHeight * DWELL_RATIO, overflow / 2));
      metrics.current = { overflow, dwell, stickyTop: parseFloat(getComputedStyle(stickyEl).top) || 0 };
      sceneEl.style.setProperty('--scene-extra', `${overflow + dwell * 2}px`);
      thumbEl.hidden = overflow === 0;
      thumbEl.style.setProperty('--ratio', (viewportEl.clientHeight / Math.max(viewportEl.scrollHeight, 1)).toFixed(4));
      update();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewportEl);
    if (viewportEl.firstElementChild) resizeObserver.observe(viewportEl.firstElementChild);
    // Listen in the capture phase so the balloon and outlines compute their positions after the content scrolls
    window.addEventListener('scroll', update, { capture: true, passive: true });
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', update);
    return () => {
      window.clearTimeout(idleTimer);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', update);
    };
  }, [scene, sticky, frame, viewport, thumb]);

  return useCallback(
    (element: Element) => {
      const sceneEl = scene.current;
      const viewportEl = viewport.current;
      if (!sceneEl || !viewportEl) return;
      const { overflow, dwell, stickyTop } = metrics.current;
      const viewportRect = viewportEl.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      // The window is scaled while settling into place; convert screen pixels to local pixels
      const scale = viewportEl.offsetHeight > 0 ? viewportRect.height / viewportEl.offsetHeight : 1;
      const elementTop = (rect.top - viewportRect.top) / scale + viewportEl.scrollTop;
      const elementBottom = elementTop + rect.height / scale;
      let offset = viewportEl.scrollTop;
      if (elementTop < offset + REVEAL_MARGIN) offset = elementTop - REVEAL_MARGIN;
      else if (elementBottom > offset + viewportEl.clientHeight - REVEAL_MARGIN)
        offset = elementBottom - viewportEl.clientHeight + REVEAL_MARGIN;
      offset = clamp(offset, 0, overflow);

      const scrolled = stickyTop - sceneEl.getBoundingClientRect().top;
      const pinned = scrolled >= 0 && scrolled <= overflow + dwell * 2;
      if (pinned && Math.abs(offset - viewportEl.scrollTop) < 1) return;
      // Where the page must scroll for the content to reach this position; scroll-behavior on html applies
      window.scrollTo({ top: window.scrollY - scrolled + (overflow > 0 ? dwell + offset : 0) });
    },
    [scene, viewport],
  );
}
