import type { LibraryExample } from '../../types';
import { AlmanacFace } from './AlmanacFace';
import { almanacSpecs } from './specs';

export const almanac: LibraryExample = {
  id: 'almanac',
  platform: 'watch',
  name: 'Almanac',
  kind: 'Watch face',
  category: 'Productivity',
  inspiredBy: ['Apple Watch Infograph face'],
  description:
    'An analog face made for complications: a dial with a minute track and hour markers, four circular complications as subdials (the date, a timer, the moon phase and activity rings), the next event curved along the bezel, a complication in each rounded corner with its text following the curve, and white hands at 10:09 with a sweeping orange second hand.',
  Component: AlmanacFace,
  specs: almanacSpecs,
};
