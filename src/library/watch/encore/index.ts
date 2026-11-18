import type { LibraryExample } from '../../types';
import { EncoreApp } from './EncoreApp';
import { encoreSpecs } from './specs';

export const encore: LibraryExample = {
  id: 'encore',
  platform: 'watch',
  name: 'Encore',
  kind: 'Now Playing',
  category: 'Media',
  inspiredBy: ['Now Playing on Apple Watch', 'Apple Music', 'Spotify'],
  description:
    "A song on the wrist: a background tinted by the album art, the cover by the time, a title that scrolls as a marquee, previous, next and play/pause in a ring that fills as the song plays, glass buttons for audio output, volume and more, and the Digital Crown's volume indicator.",
  Component: EncoreApp,
  specs: encoreSpecs,
};
