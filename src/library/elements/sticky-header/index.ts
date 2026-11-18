import type { LibraryExample } from '../../types';
import { StickyHeader } from './StickyHeader';
import { stickyHeaderSpecs } from './specs';

export const stickyHeader: LibraryExample = {
  id: 'sticky-header',
  platform: 'elements',
  name: 'Sticky header',
  kind: 'Shrinks on scroll',
  category: 'Navigation',
  size: 'tall',
  inspiredBy: ['Apple', 'Medium'],
  description:
    'A product page whose tall header, the name in big type, shrinks into a slim frosted bar as the page scrolls under it, a Buy button coming in; scrolling back up grows it again.',
  Component: StickyHeader,
  specs: stickyHeaderSpecs,
};
