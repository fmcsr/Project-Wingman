import type { LibraryExample } from '../../types';
import { ContextMenu } from './ContextMenu';
import { contextMenuSpecs } from './specs';

export const contextMenu: LibraryExample = {
  id: 'context-menu',
  platform: 'elements',
  name: 'Context menu',
  kind: 'Right-click menu',
  category: 'Navigation',
  size: 'small',
  inspiredBy: ['macOS Finder', 'Figma', 'VS Code'],
  description:
    'A right-click on a file opens a menu at the pointer: icons, labels and shortcuts in groups, Share with its submenu, and Delete in red at the bottom.',
  Component: ContextMenu,
  specs: contextMenuSpecs,
};
