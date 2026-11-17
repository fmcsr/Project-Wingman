import type { LibraryExample } from '../../types';
import { NestApp } from './NestApp';
import { nestSpecs } from './specs';

export const nest: LibraryExample = {
  id: 'nest',
  platform: 'mobile',
  name: 'Nest',
  kind: 'Home rentals',
  category: 'Travel',
  inspiredBy: ['Airbnb'],
  description:
    'A home-rental Explore screen: a search pill with a filter button, scrolling category tabs with an underlined active tab, a listing card with a photo carousel, badge, heart and page dots, the rating, gray details and a discounted total, a floating Map button and a tab bar with a notification dot.',
  Component: NestApp,
  specs: nestSpecs,
};
