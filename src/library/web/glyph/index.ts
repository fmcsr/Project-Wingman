import type { LibraryExample } from '../../types';
import { GlyphSite } from './GlyphSite';
import { glyphSpecs } from './specs';

export const glyph: LibraryExample = {
  id: 'glyph',
  platform: 'web',
  name: 'Glyph',
  kind: 'Code editor',
  category: 'Developer',
  inspiredBy: ['Visual Studio Code'],
  description:
    'A code editor with a TypeScript file open: a title bar with the command center, the activity bar, an explorer tree with git and problem colors, tabs with an unsaved dot, breadcrumbs, syntax highlighting, git change bars, an error squiggle with its hover and lightbulb, the minimap, the terminal panel and the status bar.',
  url: 'glyph.dev',
  Component: GlyphSite,
  specs: glyphSpecs,
};
