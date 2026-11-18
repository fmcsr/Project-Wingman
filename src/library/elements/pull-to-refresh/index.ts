import type { LibraryExample } from '../../types';
import { PullToRefresh } from './PullToRefresh';
import { pullToRefreshSpecs } from './specs';

export const pullToRefresh: LibraryExample = {
  id: 'pull-to-refresh',
  platform: 'elements',
  name: 'Pull to refresh',
  kind: 'Inbox',
  category: 'Micro-interactions',
  size: 'tall',
  inspiredBy: ['iOS Mail', 'Instagram', 'X'],
  description:
    'An inbox pulled down by a finger: the list stretches less than the finger, the spinner draws its spokes up to the threshold and spins, then a new message slides in at the top and the toolbar says Updated just now.',
  Component: PullToRefresh,
  specs: pullToRefreshSpecs,
};
