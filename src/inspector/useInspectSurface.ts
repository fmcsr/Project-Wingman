import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  FocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useReveal } from './Reveal';

/**
 * closed  → preview : a short mouse dwell on an element, or keyboard focus
 * preview → pinned  : click, tap, Enter/Space, or a click on the preview balloon
 * pinned  → closed  : clicking the same element again, clicking empty space or outside, Esc
 */
export type InspectMode = 'closed' | 'preview' | 'pinned';

/** Attribute that marks inspectable elements in demos; its value is the catalog ID. */
export const TARGET_SELECTOR = '[data-inspect]';

/** Once the cursor rests on an element this long, the summary balloon opens; the name tag shows right away. */
const DWELL_MS = 280;
/** Grace period so the balloon stays open while the cursor moves from the target to the balloon. */
const CLOSE_DELAY_MS = 220;

export function useInspectSurface() {
  const reveal = useReveal();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [hoverEl, setHoverEl] = useState<Element | null>(null);
  const [target, setTarget] = useState<Element | null>(null);
  const [mode, setMode] = useState<InspectMode>('closed');
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const modeRef = useRef<InspectMode>('closed');
  const hovered = useRef<Element | null>(null);
  const keyboardIndex = useRef(-1);
  const restoringFocus = useRef(false);
  const dwellTimer = useRef(0);
  const closeTimer = useRef(0);
  const open = mode !== 'closed';

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const clearTimers = useCallback(() => {
    window.clearTimeout(dwellTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  const isInside = useCallback((node: EventTarget | null) => {
    if (!(node instanceof Node)) return false;
    return Boolean(surfaceRef.current?.contains(node) || panelRef.current?.contains(node));
  }, []);

  const findTarget = (node: EventTarget | null) => {
    const surface = surfaceRef.current;
    if (!surface || !(node instanceof Element)) return null;
    const element = node.closest(TARGET_SELECTOR);
    return element && surface.contains(element) ? element : null;
  };

  const close = useCallback(
    (restoreFocus = false) => {
      clearTimers();
      const surface = surfaceRef.current;
      if (restoreFocus && surface && panelRef.current?.contains(document.activeElement)) {
        // Don't reopen the preview while focus returns to the example
        restoringFocus.current = true;
        surface.focus({ preventScroll: true });
        restoringFocus.current = false;
      }
      setMode('closed');
    },
    [clearTimers],
  );

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setMode((current) => (current === 'preview' ? 'closed' : current));
    }, CLOSE_DELAY_MS);
  };

  // Mouse: the name tag appears right away; the summary balloon opens after a short dwell.
  // Once the preview is open, the balloon updates without delay as the cursor moves between elements.
  const onPointerMove = (event: ReactPointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const element = findTarget(event.target);
    if (element === hovered.current) return;
    hovered.current = element;
    setHoverEl(element);
    setKeyboardActive(false);
    window.clearTimeout(dwellTimer.current);
    if (modeRef.current === 'pinned') return;
    if (!element) {
      if (modeRef.current === 'preview') scheduleClose();
      return;
    }
    window.clearTimeout(closeTimer.current);
    if (modeRef.current === 'preview') {
      setTarget(element);
      return;
    }
    dwellTimer.current = window.setTimeout(() => {
      if (hovered.current !== element || modeRef.current !== 'closed') return;
      setTarget(element);
      setMode('preview');
    }, DWELL_MS);
  };

  const onPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse') setPointerInside(true);
  };

  const onPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    setPointerInside(false);
    hovered.current = null;
    setHoverEl(null);
    window.clearTimeout(dwellTimer.current);
    if (modeRef.current === 'preview' && !keyboardActive) scheduleClose();
  };

  const onClick = (event: ReactMouseEvent) => {
    clearTimers();
    const element = findTarget(event.target);
    if (!element || (element === target && mode === 'pinned')) {
      close();
      return;
    }
    setTarget(element);
    setMode('pinned');
  };

  // Keyboard: the example is a single tab stop; arrow keys move between elements
  const listTargets = () =>
    [...(surfaceRef.current?.querySelectorAll(TARGET_SELECTOR) ?? [])].filter(
      (element) => element.getClientRects().length > 0,
    );

  const activate = (index: number, nextMode: 'preview' | 'pinned') => {
    const list = listTargets();
    if (list.length === 0) return;
    const i = ((index % list.length) + list.length) % list.length;
    const element = list[i];
    keyboardIndex.current = i;
    clearTimers();
    setKeyboardActive(true);
    setTarget(element);
    setMode(nextMode);
    reveal(element);
  };

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (restoringFocus.current || event.target !== event.currentTarget) return;
    if (!event.currentTarget.matches(':focus-visible')) return;
    activate(Math.max(keyboardIndex.current, 0), 'preview');
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    const keep = mode === 'pinned' ? 'pinned' : 'preview';
    const current = keyboardIndex.current;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        activate(current + 1, keep);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        activate(current < 0 ? -1 : current - 1, keep);
        break;
      case 'Home':
        event.preventDefault();
        activate(0, keep);
        break;
      case 'End':
        event.preventDefault();
        activate(-1, keep);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!open || !target) activate(Math.max(current, 0), 'pinned');
        else setMode(mode === 'pinned' ? 'preview' : 'pinned');
        break;
      case 'Escape':
        if (open) {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
        break;
    }
  };

  const onBlur = (event: FocusEvent) => {
    const next = event.relatedTarget;
    if (isInside(next)) return;
    setKeyboardActive(false);
    // Close if focus moved to another element; stay put in cases like a window switch (no next)
    if (next) close();
  };

  const onPanelPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse') window.clearTimeout(closeTimer.current);
  };

  const onPanelPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse' && modeRef.current === 'preview' && !keyboardActive) scheduleClose();
  };

  // Clicking inside the preview balloon pins it
  const onPanelPointerDown = () => {
    setMode((current) => (current === 'preview' ? 'pinned' : current));
  };

  useEffect(() => {
    if (!open) return;
    let pendingTouchId: number | null = null;

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };
    const onDocumentPointerDown = (event: PointerEvent) => {
      if (isInside(event.target)) return;
      // A mouse press outside closes right away. On touch it may be a scroll:
      // on scroll the browser sends pointercancel, on a tap pointerup arrives.
      if (event.pointerType === 'mouse') close();
      else pendingTouchId = event.pointerId;
    };
    const onDocumentPointerUp = (event: PointerEvent) => {
      if (event.pointerId === pendingTouchId) close();
      pendingTouchId = null;
    };
    const onDocumentPointerCancel = () => {
      pendingTouchId = null;
    };

    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('pointerdown', onDocumentPointerDown);
    document.addEventListener('pointerup', onDocumentPointerUp);
    document.addEventListener('pointercancel', onDocumentPointerCancel);
    return () => {
      document.removeEventListener('keydown', onDocumentKeyDown);
      document.removeEventListener('pointerdown', onDocumentPointerDown);
      document.removeEventListener('pointerup', onDocumentPointerUp);
      document.removeEventListener('pointercancel', onDocumentPointerCancel);
    };
  }, [open, close, isInside]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    surfaceRef,
    panelRef,
    mode,
    open,
    target,
    hoverEl,
    keyboardActive,
    /** Whether the example is being inspected right now (animated demos pause meanwhile). */
    active: pointerInside || keyboardActive || open,
    /** Closes the balloon and returns focus to the example (for the × button). */
    closeFromPanel: () => close(true),
    surfaceProps: { onPointerEnter, onPointerMove, onPointerLeave, onClick, onFocus, onBlur, onKeyDown },
    panelProps: {
      onPointerEnter: onPanelPointerEnter,
      onPointerLeave: onPanelPointerLeave,
      onPointerDown: onPanelPointerDown,
      onBlur,
    },
  };
}
