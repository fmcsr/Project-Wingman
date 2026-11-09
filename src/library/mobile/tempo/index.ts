import type { LibraryExample } from '../../types';
import { tempoSpecs } from './specs';
import { TempoApp } from './TempoApp';

export const tempo: LibraryExample = {
  id: 'tempo',
  platform: 'mobile',
  name: 'Tempo',
  kind: 'Music player',
  category: 'Media',
  inspiredBy: ['Spotify'],
  description:
    'A Now Playing screen tinted by its cover: a square album cover, a save button, a scrubber, transport controls with a repeat toggle, a device picker, share and queue buttons and a peeking lyrics card.',
  Component: TempoApp,
  specs: tempoSpecs,
};
