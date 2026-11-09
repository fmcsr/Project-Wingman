import type { LibraryExample } from '../../types';
import { FormaSite } from './FormaSite';
import { formaSpecs } from './specs';

export const forma: LibraryExample = {
  id: 'forma',
  platform: 'web',
  name: 'Forma',
  kind: 'Design tool',
  category: 'Design',
  inspiredBy: ['Figma'],
  description:
    'A design file in the editor: pages and layers, frames with a selected button instance, its size badge and a redline, live cursors, a comment preview, a floating toolbar, and the Design panel with auto layout, fill and effects.',
  url: 'forma.design',
  Component: FormaSite,
  specs: formaSpecs,
};
