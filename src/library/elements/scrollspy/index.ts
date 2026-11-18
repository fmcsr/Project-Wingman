import type { LibraryExample } from '../../types';
import { Scrollspy } from './Scrollspy';
import { scrollspySpecs } from './specs';

export const scrollspy: LibraryExample = {
  id: 'scrollspy',
  platform: 'elements',
  name: 'Scrollspy',
  kind: 'Table of contents',
  category: 'Navigation',
  size: 'tall',
  inspiredBy: ['Stripe Docs', 'MDN', 'Tailwind CSS'],
  description:
    'A docs page whose “On this page” list follows the reading: as the article scrolls, an indicator slides to the current section, and on narrow screens the list folds into a bar that names it.',
  Component: Scrollspy,
  specs: scrollspySpecs,
};
