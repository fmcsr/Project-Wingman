import type { LibraryExample } from '../../types';
import { streamSpecs } from './specs';
import { StreamSite } from './StreamSite';

export const stream: LibraryExample = {
  id: 'stream',
  platform: 'web',
  name: 'Stream',
  kind: 'Video streaming',
  category: 'Media',
  inspiredBy: ['Netflix'],
  description:
    'A streaming home page: a navbar that turns solid on scroll, a billboard with a title treatment, a Top 10 badge, a clamped synopsis, Play and More Info, a mute toggle and a maturity rating, then rows with resume bars, big Top 10 numerals, original badges, labels and an open preview card.',
  url: 'stream.tv',
  Component: StreamSite,
  specs: streamSpecs,
};
