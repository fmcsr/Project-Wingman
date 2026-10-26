import type { LibraryExample } from '../../types';
import { tempoSpecs } from './specs';
import { TempoApp } from './TempoApp';

export const tempo: LibraryExample = {
  id: 'tempo',
  platform: 'mobile',
  name: 'Tempo',
  kind: 'Music player',
  category: 'Media',
  inspiredBy: ['Spotify', 'Apple Music'],
  description:
    'A Now Playing screen: cover art, a scrubber, transport controls with on and off toggles, an output picker and a peeking bottom sheet.',
  Component: TempoApp,
  specs: tempoSpecs,
};
