import type { LibraryExample } from '../../types';
import { ShelfSite } from './ShelfSite';
import { shelfSpecs } from './specs';

export const shelf: LibraryExample = {
  id: 'shelf',
  platform: 'web',
  name: 'Shelf',
  kind: 'Online store',
  category: 'Commerce',
  inspiredBy: ['Amazon'],
  description:
    'Search results in a big online store: a delivery location, a search bar with a department menu, a cart badge, a filter sidebar with a range slider, sorting, and product cards with sponsored labels, badges, star ratings, deal prices, delivery promises and an Add to cart pill.',
  url: 'shelf.store',
  Component: ShelfSite,
  specs: shelfSpecs,
};
