import type { LibraryExample } from '../../types';
import { LexiApp } from './LexiApp';
import { lexiSpecs } from './specs';

export const lexi: LibraryExample = {
  id: 'lexi',
  platform: 'mobile',
  name: 'Lexi',
  kind: 'Language app',
  category: 'Education',
  inspiredBy: ['Duolingo'],
  description:
    'A lesson right after a correct answer: a thick progress bar with a streak label, lives, a speech bubble with word hints, chunky word chips on ruled lines, a word bank with placeholder slots and a success banner with a 3D Continue button.',
  Component: LexiApp,
  specs: lexiSpecs,
};
