import { createContext, useContext } from 'react';

/** Kullanıcı bu örneği şu an inceliyor mu: imleç üzerinde, klavye odağı içinde ya da bir balon açık. */
export const InspectActivityContext = createContext(false);

/**
 * Kendi kendine hareket eden demolar (ör. açılıp kapanan menü) bunu okuyarak incelenirken sabit durur;
 * böylece hareketli öğeler de rahatça incelenebilir.
 */
export function useInspectActivity() {
  return useContext(InspectActivityContext);
}
