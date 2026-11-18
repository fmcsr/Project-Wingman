import type { LibraryExample } from '../../types';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { collapsibleSidebarSpecs } from './specs';

export const collapsibleSidebar: LibraryExample = {
  id: 'collapsible-sidebar',
  platform: 'elements',
  name: 'Collapsible sidebar',
  kind: 'App navigation',
  category: 'Navigation',
  size: 'big',
  inspiredBy: ['Linear', 'Notion', 'Slack'],
  description:
    'An issue tracker’s sidebar with its workspace switcher, counts and a Favorites section that folds; the sidebar collapses into an icon rail with tooltips while the list widens into the room.',
  Component: CollapsibleSidebar,
  specs: collapsibleSidebarSpecs,
};
