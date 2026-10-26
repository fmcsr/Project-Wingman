import { createContext, useContext } from 'react';

/**
 * Brings the keyboard-selected element into view. By default it scrolls the nearest scroll container; frames
 * that move their content with page scroll (BrowserFrame) instead scroll the page to where the element shows.
 */
export const RevealContext = createContext<(element: Element) => void>((element) =>
  element.scrollIntoView({ block: 'nearest', inline: 'nearest' }),
);

export function useReveal() {
  return useContext(RevealContext);
}
