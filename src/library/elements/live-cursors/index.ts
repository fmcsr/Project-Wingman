import type { LibraryExample } from '../../types';
import { LiveCursors } from './LiveCursors';
import { liveCursorsSpecs } from './specs';

export const liveCursors: LibraryExample = {
  id: 'live-cursors',
  platform: 'elements',
  name: 'Live cursors',
  kind: 'Multiplayer',
  category: 'Productivity',
  size: 'wide',
  inspiredBy: ['Figma', 'FigJam'],
  description:
    "A shared whiteboard with other people's pointers moving in real time, each with a name tag in their color, a collaborator's selection, a cursor chat bubble and the facepile of who's here.",
  Component: LiveCursors,
  specs: liveCursorsSpecs,
};
