import type { LibraryExample } from '../../types';
import { PlaybackSite } from './PlaybackSite';
import { playbackSpecs } from './specs';

export const playback: LibraryExample = {
  id: 'playback',
  platform: 'web',
  name: 'Playback',
  kind: 'Video platform',
  category: 'Media',
  inspiredBy: ['YouTube'],
  description:
    'A video watch page: a player with a chaptered progress bar, a seek preview, captions and an Autoplay switch, a Subscribe pill, a like/dislike split button, an expandable description, a pinned comment, and an up-next column with filter chips and duration and live badges.',
  url: 'playback.tv',
  Component: PlaybackSite,
  specs: playbackSpecs,
};
