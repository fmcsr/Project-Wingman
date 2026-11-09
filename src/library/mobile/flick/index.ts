import type { LibraryExample } from '../../types';
import { FlickApp } from './FlickApp';
import { flickSpecs } from './specs';

export const flick: LibraryExample = {
  id: 'flick',
  platform: 'mobile',
  name: 'Flick',
  kind: 'Short video',
  category: 'Social',
  inspiredBy: ['TikTok'],
  description:
    'A For You feed: a full-screen video under feed tabs, an action rail with a follow badge and a spinning sound disc, a clamped caption, a scrolling sound ticker, a progress bar and a tab bar with a create button.',
  Component: FlickApp,
  specs: flickSpecs,
};
