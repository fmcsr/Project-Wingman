import type { LibraryExample } from '../../types';
import { HailApp } from './HailApp';
import { hailSpecs } from './specs';

export const hail: LibraryExample = {
  id: 'hail',
  platform: 'mobile',
  name: 'Hail',
  kind: 'Ride hailing',
  category: 'Travel',
  inspiredBy: ['Uber', 'Lyft', 'Bolt'],
  description:
    'A map-first booking screen: pins, a route line, map callouts, floating map buttons and a bottom sheet of selectable ride cards.',
  Component: HailApp,
  specs: hailSpecs,
};
