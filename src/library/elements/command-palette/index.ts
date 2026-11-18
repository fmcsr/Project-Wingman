import type { LibraryExample } from '../../types';
import { CommandPalette } from './CommandPalette';
import { commandPaletteSpecs } from './specs';

export const commandPalette: LibraryExample = {
  id: 'command-palette',
  platform: 'elements',
  name: 'Command palette',
  kind: 'Search and commands',
  category: 'Productivity',
  size: 'big',
  inspiredBy: ['Linear', 'Raycast', 'Vercel'],
  description:
    'The ⌘K box over a dimmed issue tracker: a query typed in, results grouped under section labels with their keyboard shortcuts, the active row highlighted, and the keys to move, open and close along the bottom.',
  Component: CommandPalette,
  specs: commandPaletteSpecs,
};
