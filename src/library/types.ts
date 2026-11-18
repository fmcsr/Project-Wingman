import type { ComponentType } from 'react';
import type { UiElementSpec } from '../catalog';

export type Platform = 'mobile' | 'web' | 'watch' | 'elements';

/**
 * The library's filter chips. Elements use their own families: Data, Forms, iOS, Micro-interactions, Navigation and
 * Productivity.
 */
export type Category =
  | 'AI'
  | 'Analytics'
  | 'Commerce'
  | 'Communication'
  | 'Data'
  | 'Design'
  | 'Developer'
  | 'Education'
  | 'Finance'
  | 'Food'
  | 'Forms'
  | 'Health'
  | 'iOS'
  | 'Marketing'
  | 'Media'
  | 'Micro-interactions'
  | 'Navigation'
  | 'Productivity'
  | 'Social'
  | 'Travel';

/** How much of an element grid a tile takes: one cell, two side by side, two stacked or a 2 × 2 block. */
export type TileSize = 'small' | 'wide' | 'tall' | 'big';

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
  /** Elements only: how much of the grid the element's tile takes. */
  size?: TileSize;
  /**
   * The demo. Mobile demos fill a 280 × 600 phone screen, watch demos a 208 × 248 watch screen; web demos fill the
   * browser window's width; elements fill their tile (sizes in README → Adding an element).
   */
  Component: ComponentType;
  /** Descriptions of every element the demo marks with `data-inspect`. */
  specs: readonly UiElementSpec[];
};
