import { navbar } from './navbar';
import type { UiElementSpec } from './types';

/** Vitrindeki tüm UI öğeleri. Yeni bir öğe buraya kaydedilir. */
export const catalog = {
  navbar,
} satisfies Record<string, UiElementSpec>;

export type { Concept, ConceptKind, UiElementSpec } from './types';
