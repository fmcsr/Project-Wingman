import { assistant } from './assistant';
import { commerce } from './commerce';
import { dashboard } from './dashboard';
import { marketing } from './marketing';
import { mobile } from './mobile';
import type { UiElementSpec } from './types';

/** Vitrindeki tüm UI öğeleri, `data-inspect` kimliğine göre. Yeni bir öğe ilgili listeye eklenir. */
export const catalog: Record<string, UiElementSpec> = Object.fromEntries(
  [...marketing, ...dashboard, ...mobile, ...assistant, ...commerce].map((spec) => [spec.id, spec]),
);

/** Bir demodaki `data-inspect` kimliğinin açıklamasını döndürür; kayıtlı değilse geliştirmede uyarır. */
export function getSpec(id: string | undefined): UiElementSpec | undefined {
  const spec = id ? catalog[id] : undefined;
  if (!spec && import.meta.env.DEV) console.warn(`[catalog] "${id}" için açıklama yok`);
  return spec;
}

export type { Concept, ConceptKind, UiElementSpec } from './types';
