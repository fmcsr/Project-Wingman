import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

const InspectorLayerContext = createContext<HTMLElement | null>(null);

type InspectorLayerHostProps = {
  /** Class that places the layer over the scene. */
  className?: string;
  children: ReactNode;
};

/**
 * Provides the unclipped layer that explainer balloons are drawn in.
 * Because the layer comes after the content, a balloon follows its target in DOM and tab order.
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
