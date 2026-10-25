import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

const InspectorLayerContext = createContext<HTMLElement | null>(null);

type InspectorLayerHostProps = {
  /** Katmanı sahnenin üstüne yerleştiren sınıf. */
  className?: string;
  children: ReactNode;
};

/**
 * Açıklama balonlarının çizildiği, kırpılmayan katmanı sağlar.
 * Katman içerikten sonra geldiği için balon, DOM ve sekme sırasında hedefin ardından gelir.
 */
export function InspectorLayerHost({ className, children }: InspectorLayerHostProps) {
  const [layer, setLayer] = useState<HTMLDivElement | null>(null);

  return (
    <InspectorLayerContext value={layer}>
      {children}
      <div ref={setLayer} className={className} />
    </InspectorLayerContext>
  );
}

export function useInspectorLayer() {
  return useContext(InspectorLayerContext);
}
