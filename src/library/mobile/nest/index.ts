import type { LibraryExample } from '../../types';
import { NestApp } from './NestApp';
import { nestSpecs } from './specs';

export const nest: LibraryExample = {
  id: 'nest',
  platform: 'mobile',
  name: 'Nest',
  kind: 'Home rentals',
  category: 'Travel',
  inspiredBy: ['Airbnb', 'Booking.com', 'Vrbo'],
  description:
    'An explore feed: a search pill, scrolling category tabs, a listing card with a photo carousel and a floating Map button.',
  Component: NestApp,
  specs: nestSpecs,
};
