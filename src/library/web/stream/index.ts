import type { LibraryExample } from '../../types';
import { streamSpecs } from './specs';
import { StreamSite } from './StreamSite';

export const stream: LibraryExample = {
  id: 'stream',
  platform: 'web',
  name: 'Stream',
  kind: 'Video streaming',
  category: 'Media',
  inspiredBy: ['Netflix', 'Prime Video', 'Disney+'],
  description:
    'A streaming home screen: a billboard with a title treatment and a clamped synopsis, genre chips, and carousels with resume progress, Top 10 numerals and an open hover card.',
  url: 'stream.tv',
  Component: StreamSite,
  specs: streamSpecs,
};
