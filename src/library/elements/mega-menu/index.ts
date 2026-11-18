import type { LibraryExample } from '../../types';
import { MegaMenu } from './MegaMenu';
import { megaMenuSpecs } from './specs';

export const megaMenu: LibraryExample = {
  id: 'mega-menu',
  platform: 'elements',
  name: 'Mega menu',
  kind: 'Site navigation',
  category: 'Navigation',
  size: 'big',
  inspiredBy: ['Stripe', 'Shopify', 'Apple'],
  description:
    'A marketing site’s Products menu: a big panel under the header with grouped links, icons and one-line descriptions, a featured card and a footer row, which morphs into Solutions as the pointer moves over.',
  Component: MegaMenu,
  specs: megaMenuSpecs,
};
