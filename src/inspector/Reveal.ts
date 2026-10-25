import { createContext, useContext } from 'react';

/**
 * Klavyeyle seçilen öğeyi görünür kılar. Varsayılan olarak en yakın kaydırma kabını kaydırır; içeriğini sayfa
 * kaydırmasıyla oynatan çerçeveler (BrowserFrame) bunun yerine sayfayı öğeyi gösteren konuma kaydırır.
 */
export const RevealContext = createContext<(element: Element) => void>((element) =>
  element.scrollIntoView({ block: 'nearest', inline: 'nearest' }),
);

export function useReveal() {
  return useContext(RevealContext);
}
