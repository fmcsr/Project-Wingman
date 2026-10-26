import type { LibraryExample } from '../../types';
import { LoopApp } from './LoopApp';
import { loopSpecs } from './specs';

export const loop: LibraryExample = {
  id: 'loop',
  platform: 'mobile',
  name: 'Loop',
  kind: 'Social feed',
  category: 'Social',
  inspiredBy: ['Instagram', 'Threads'],
  description:
    'A social home feed: story rings, dot and count badges, a verified post with a photo carousel, the action bar, social proof, a clamped caption and a tab bar that ends in your photo.',
  Component: LoopApp,
  specs: loopSpecs,
};
