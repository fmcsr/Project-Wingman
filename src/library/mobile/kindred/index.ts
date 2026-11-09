import type { LibraryExample } from '../../types';
import { KindredApp } from './KindredApp';
import { kindredSpecs } from './specs';

export const kindred: LibraryExample = {
  id: 'kindred',
  platform: 'mobile',
  name: 'Kindred',
  kind: 'Dating',
  category: 'Social',
  inspiredBy: ['Tinder'],
  description:
    "A dating app's swipe screen: a full-bleed photo card caught mid-swipe under a LIKE stamp with the next card behind it, photo segments, a verified badge, an open-profile button, interest chips, five round action buttons and a floating tab bar with badges.",
  Component: KindredApp,
  specs: kindredSpecs,
};
