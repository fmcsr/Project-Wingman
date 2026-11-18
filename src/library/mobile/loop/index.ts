import type { LibraryExample } from '../../types';
import { LoopApp } from './LoopApp';
import { loopSpecs } from './specs';

export const loop: LibraryExample = {
  id: 'loop',
  platform: 'mobile',
  name: 'Loop',
  kind: 'Photo feed',
  category: 'Social',
  inspiredBy: ['Instagram'],
  description:
    'A photo home feed: a wordmark with dot and count badges, story rings, a carousel post with its header, action bar and page dots, a like line with a facepile, a one-line caption, the comments link, a timestamp and a tab bar that ends in your photo.',
  Component: LoopApp,
  specs: loopSpecs,
};
