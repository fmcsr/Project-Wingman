import { useId } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { UiElementSpec } from '../catalog';
import { Explainer } from './Explainer';
import { useInspectorLayer } from './InspectorLayer';
import { useAnchorPosition } from './useAnchorPosition';
import { useInspector } from './useInspector';
import styles from './Inspectable.module.css';

type InspectableProps = {
  spec: UiElementSpec;
  /** İncelenecek örnek bileşen; yalnızca görsel olarak çizilir. */
  children: ReactNode;
};

/**
 * Bir örnek bileşeni incelenebilir yapar: üzerine görünmez bir düğme yerleştirir ve
 * açıklama balonunu bu düğmeye bağlar. Fare, dokunma ve klavye aynı düğme üzerinden çalışır.
 */
export function Inspectable({ spec, children }: InspectableProps) {
  const id = useId();
  const panelId = `${id}panel`;
  const summaryId = `${id}summary`;
  const layer = useInspectorLayer();
  const { mode, open, triggerRef, panelRef, triggerProps, panelProps, close } = useInspector();
  const position = useAnchorPosition(open, triggerRef, panelRef, layer);

  return (
    <div className={styles.root} data-state={mode}>
      {/* Örnekteki linkler odak almaz; ekran okuyucu yalnızca inceleme düğmesini duyurur */}
      <div aria-hidden="true" inert>
        {children}
      </div>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={`${spec.name} örneğini incele`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-describedby={summaryId}
        {...triggerProps}
      >
        <span className={styles.beacon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <circle cx="12" cy="6.5" r="1.9" fill="currentColor" />
            <path d="M12 11v7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {layer &&
        createPortal(
          <Explainer
            ref={panelRef}
            id={panelId}
            summaryId={summaryId}
            spec={spec}
            mode={mode}
            position={position}
            onClose={close}
            {...panelProps}
          />,
          layer,
        )}
    </div>
  );
}
