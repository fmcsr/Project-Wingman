import type { LibraryExample } from '../../types';
import { MunchApp } from './MunchApp';
import { munchSpecs } from './specs';

export const munch: LibraryExample = {
  id: 'munch',
  platform: 'mobile',
  name: 'Munch',
  kind: 'Food delivery',
  category: 'Food',
  inspiredBy: ['Uber Eats'],
  description:
    "A dish's options sheet over its store page: a full-bleed photo with floating close and share buttons, a tag, a stepper, option groups with a Required label, radio buttons and checkboxes with price deltas, and a black button with the live total.",
  Component: MunchApp,
  specs: munchSpecs,
};
