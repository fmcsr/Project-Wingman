import type { ComponentType } from 'react';
import type { UiElementSpec } from '../catalog';

export type Platform = 'mobile' | 'web';

/** The library's filter chips. */
export type Category =
  | 'AI'
  | 'Analytics'
  | 'Commerce'
  | 'Communication'
  | 'Developer'
  | 'Finance'
  | 'Health'
  | 'Marketing'
  | 'Media'
  | 'Productivity'
  | 'Social'
  | 'Travel';

/** One example in the library: a fictional product built from the patterns of well-known ones. */
export type LibraryExample = {
  /** URL-safe and unique across the library, e.g. "tempo" (used in /app/mobile/tempo). */
  id: string;
  platform: Platform;
  /** Fictional product name, e.g. "Tempo". Never a real brand. */
  name: string;
  /** What it is, e.g. "Music player". */
  kind: string;
  category: Category;
  /** Well-known products that use the same patterns, shown as "Inspired by". */
  inspiredBy: string[];
  /** One sentence on what the example teaches. */
  description: string;
  /** Web only: the domain shown in the browser's address bar, e.g. "ledger.dev". */
  url?: string;
  /** The demo. Mobile demos fill a 280 × 600 phone screen; web demos fill the browser window's width. */
  Component: ComponentType;
  /** Descriptions of every element the demo marks with `data-inspect`. */
  specs: readonly UiElementSpec[];
};
