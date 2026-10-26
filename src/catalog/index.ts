import { assistant } from './assistant';
import { commerce } from './commerce';
import { dashboard } from './dashboard';
import { marketing } from './marketing';
import { mobile } from './mobile';
import type { ThemedValue, UiElementSpec } from './types';

/** An example's element descriptions, keyed by `data-inspect` id. */
export type Catalog = Record<string, UiElementSpec>;

export function catalogOf(specs: readonly UiElementSpec[]): Catalog {
  return Object.fromEntries(specs.map((spec) => [spec.id, spec]));
}

/**
 * Elements of the five original examples (Acme, Orbit, Wave, Muse, Stride). They share one list because they
 * reuse each other's elements (avatar, nav link, icon button). Newer examples bring their own list.
 */
export const showcaseSpecs: UiElementSpec[] = [...marketing, ...dashboard, ...mobile, ...assistant, ...commerce];

/** Returns the explanation for a `data-inspect` id; warns in development if the example's catalog lacks it. */
export function getSpec(catalog: Catalog, id: string | undefined): UiElementSpec | undefined {
  const spec = id ? catalog[id] : undefined;
  if (!spec && import.meta.env.DEV) console.warn(`[catalog] no description for "${id}"`);
  return spec;
}

/** A concept's value as shown for the theme in use (colors differ between light and dark). */
export function valueFor(value: string | ThemedValue, theme: 'light' | 'dark') {
  return typeof value === 'string' ? value : value[theme];
}

export { homeIndicator, statusBar } from './shared';
export type { Concept, ConceptKind, ThemedValue, UiElementSpec } from './types';
