import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  FocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useReveal } from './Reveal';

/**
 * closed  → preview : fareyle öğede kısa bir duraksama ya da klavyeyle odaklanma
 * preview → pinned  : tıklama, dokunma, Enter/Space, önizlemedeki balona tıklama
 * pinned  → closed  : aynı öğeye tekrar tıklama, boş alana ya da dışarı tıklama, Esc
 */
export type InspectMode = 'closed' | 'preview' | 'pinned';

/** Demolarda incelenebilir öğeleri işaretleyen nitelik; değeri katalogdaki kimliktir. */
export const TARGET_SELECTOR = '[data-inspect]';

/** İmleç bir öğede bu kadar durunca özet balonu açılır; ad etiketi ise hemen görünür. */
const DWELL_MS = 280;
/** İmleç hedeften balona geçerken balonun kapanmaması için tanınan süre. */
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
        // Odak örneğe dönerken önizleme yeniden açılmasın
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

  // Fare: ad etiketi hemen gelir, özet balonu kısa bir duraksamadan sonra açılır.
  // Önizleme bir kez açıldıysa öğeler arasında gezerken balon beklemeden güncellenir.
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

  // Klavye: örnek tek bir sekme durağıdır; oklar öğeler arasında gezdirir
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
    // Odak başka bir öğeye geçtiyse kapan; pencere değişimi gibi durumlarda (next yok) yerinde kal
    if (next) close();
  };

  const onPanelPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse') window.clearTimeout(closeTimer.current);
  };

  const onPanelPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse' && modeRef.current === 'preview' && !keyboardActive) scheduleClose();
  };

  // Önizlemedeki balonun içine tıklamak onu sabitler
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
      // Fare dışarı basınca hemen kapanır. Dokunmatikte bu bir kaydırma olabilir:
      // kaydırmada tarayıcı pointercancel gönderir, dokunmada pointerup gelir.
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
    /** Örnek şu an inceleniyor mu (hareketli demolar bu sırada durur). */
    active: pointerInside || keyboardActive || open,
    /** Balonu kapatır ve odağı örneğe geri verir (× düğmesi için). */
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
