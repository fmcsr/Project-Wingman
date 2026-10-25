import { createContext, useContext } from 'react';

/** Is the user inspecting this example right now: cursor over it, keyboard focus inside, or a balloon open. */
export const InspectActivityContext = createContext(false);

/**
 * Self-animating demos (e.g. a menu that opens and closes) read this and hold still while inspected,
 * so moving elements can be inspected comfortably too.
 */
export function useInspectActivity() {
  return useContext(InspectActivityContext);
}
