import type { LibraryExample } from '../../types';
import { ShelfSite } from './ShelfSite';
import { shelfSpecs } from './specs';

export const shelf: LibraryExample = {
  id: 'shelf',
  platform: 'web',
  name: 'Shelf',
  kind: 'Online store',
  category: 'Commerce',
  inspiredBy: ['Amazon', 'Best Buy', 'Shopify stores'],
  description:
    'A category page: a scoped search bar, filters with counts, a two-thumb price slider and “& up” ratings, removable filter chips, sorting, and product cards with clamped titles, badges and sale prices.',
  url: 'shelf.store',
  Component: ShelfSite,
  specs: shelfSpecs,
};
