import type { LibraryExample } from '../../types';
import { ReadingProgress } from './ReadingProgress';
import { readingProgressSpecs } from './specs';

export const readingProgress: LibraryExample = {
  id: 'reading-progress',
  platform: 'elements',
  name: 'Reading progress',
  kind: 'Scroll indicator',
  category: 'Navigation',
  size: 'small',
  inspiredBy: ['Medium', 'The Verge'],
  description:
    'A long article scrolls by: a thin bar under the header fills as it’s read, the minutes left count down, and a back-to-top button with a progress ring floats in.',
  Component: ReadingProgress,
  specs: readingProgressSpecs,
};
