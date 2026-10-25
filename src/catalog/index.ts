import { assistant } from './assistant';
import { commerce } from './commerce';
import { dashboard } from './dashboard';
import { marketing } from './marketing';
import { mobile } from './mobile';
import type { UiElementSpec } from './types';

/** All UI elements in the showcase, keyed by `data-inspect` id. New elements go in the matching list. */
export const catalog: Record<string, UiElementSpec> = Object.fromEntries(
  [...marketing, ...dashboard, ...mobile, ...assistant, ...commerce].map((spec) => [spec.id, spec]),
);

/** Returns the explanation for a demo's `data-inspect` id; warns in development if it isn't registered. */
export function getSpec(id: string | undefined): UiElementSpec | undefined {
  const spec = id ? catalog[id] : undefined;
  if (!spec && import.meta.env.DEV) console.warn(`[catalog] no description for "${id}"`);
  return spec;
}

export type { Concept, ConceptKind, UiElementSpec } from './types';
