import type { LibraryExample } from '../../types';
import { ProgressButton } from './ProgressButton';
import { progressButtonSpecs } from './specs';

export const progressButton: LibraryExample = {
  id: 'progress-button',
  platform: 'elements',
  name: 'Progress button',
  kind: 'Download',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['App Store', 'Spotify'],
  description:
    'An app list where tapping Get shrinks the pill into a spinning ring, then a blue ring fills around a stop square and opens back out as Open, while the next app waits its turn.',
  Component: ProgressButton,
  specs: progressButtonSpecs,
};
