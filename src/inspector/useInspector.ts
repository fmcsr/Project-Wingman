import { useCallback, useEffect, useRef, useState } from 'react';
import type { FocusEvent, PointerEvent as ReactPointerEvent } from 'react';

/**
 * closed  → preview : fareyle üzerine gelme ya da klavye odağı (Tab)
 * closed/preview → pinned : tıklama, dokunma, Enter/Space
 * pinned  → closed  : tekrar tıklama, Esc, dışarı tıklama/dokunma, odağın dışarı çıkması
 */
export type InspectorMode = 'closed' | 'preview' | 'pinned';

// İmleç hedeften balona geçerken balonun titreyip kapanmaması için kısa gecikmeler
const OPEN_DELAY_MS = 80;
const CLOSE_DELAY_MS = 200;

export function useInspector() {
  const [mode, setMode] = useState<InspectorMode>('closed');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const openTimer = useRef(0);
  const closeTimer = useRef(0);
  const restoringFocus = useRef(false);
  const open = mode !== 'closed';

  const clearTimers = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  const isInside = useCallback((node: EventTarget | null) => {
    if (!(node instanceof Node)) return false;
    return Boolean(triggerRef.current?.contains(node) || panelRef.current?.contains(node));
  }, []);

  const close = useCallback(
    (restoreFocus = false) => {
      clearTimers();
      const trigger = triggerRef.current;
      if (restoreFocus && trigger && document.activeElement !== trigger) {
        // Odak hedefe dönerken balon önizleme olarak yeniden açılmasın
        restoringFocus.current = true;
        trigger.focus();
        restoringFocus.current = false;
      }
      setMode('closed');
    },
    [clearTimers],
  );

  // Hover yalnızca fare için: dokunmatikte tarayıcının ürettiği "hover", tıklamayla çakışır
  const onTriggerPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => {
      setMode((current) => (current === 'closed' ? 'preview' : current));
    }, OPEN_DELAY_MS);
  };

  const onPanelPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse') window.clearTimeout(closeTimer.current);
  };

  const onPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => {
      // Klavye odağı hâlâ hedefteyse önizleme açık kalır (WCAG 1.4.13)
      if (triggerRef.current?.matches(':focus-visible')) return;
      setMode((current) => (current === 'preview' ? 'closed' : current));
    }, CLOSE_DELAY_MS);
  };

  const onTriggerFocus = (event: FocusEvent<HTMLButtonElement>) => {
    if (restoringFocus.current || !event.currentTarget.matches(':focus-visible')) return;
    setMode((current) => (current === 'closed' ? 'preview' : current));
  };

  const onBlur = (event: FocusEvent) => {
    const next = event.relatedTarget;
    if (next) {
      if (!isInside(next)) close();
      return;
    }
    // Odak sayfadan çıktı (son öğeden Tab, pencere değişimi): yalnızca önizleme kapanır
    setMode((current) =>
      current === 'preview' && !triggerRef.current?.matches(':hover') ? 'closed' : current,
    );
  };

  const onTriggerClick = () => {
    clearTimers();
    setMode((current) => (current === 'pinned' ? 'closed' : 'pinned'));
  };

  // Önizlemedeki balonun içine tıklamak onu sabitler
  const onPanelPointerDown = () => {
    setMode((current) => (current === 'preview' ? 'pinned' : current));
  };

  useEffect(() => {
    if (!open) return;
    let pendingTouchId: number | null = null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close(Boolean(panelRef.current?.contains(document.activeElement)));
    };
    const onPointerDown = (event: PointerEvent) => {
      if (isInside(event.target)) return;
      // Fare dışarı basınca hemen kapanır. Dokunmatikte bu bir kaydırma olabilir:
      // kaydırmada tarayıcı pointercancel gönderir, dokunmada pointerup gelir.
      if (event.pointerType === 'mouse') close();
      else pendingTouchId = event.pointerId;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId === pendingTouchId) close();
      pendingTouchId = null;
    };
    const onPointerCancel = () => {
      pendingTouchId = null;
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerCancel);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerCancel);
    };
  }, [open, close, isInside]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    mode,
    open,
    triggerRef,
    panelRef,
    /** Balonu kapatır ve odağı hedefe geri verir (× düğmesi için). */
    close: () => close(true),
    triggerProps: {
      onPointerEnter: onTriggerPointerEnter,
      onPointerLeave,
      onFocus: onTriggerFocus,
      onBlur,
      onClick: onTriggerClick,
    },
    panelProps: {
      onPointerEnter: onPanelPointerEnter,
      onPointerLeave,
      onPointerDown: onPanelPointerDown,
      onBlur,
    },
  };
}
