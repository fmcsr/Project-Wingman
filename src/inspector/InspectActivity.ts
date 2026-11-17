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

/**
 * The elements being inspected in this example right now: the one under the pointer (`hover`), and the one whose
 * explanation is open or that keyboard inspection is on (`target`). A moving part holds still while either is in it,
 * so the outline and the balloon stay on what they point at (see `useDemoMotion`).
 */
export type InspectFocus = { hover: Element | null; target: Element | null };

export const InspectFocusContext = createContext<InspectFocus>({ hover: null, target: null });
