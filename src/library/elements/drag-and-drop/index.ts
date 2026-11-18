import type { LibraryExample } from '../../types';
import { DragAndDrop } from './DragAndDrop';
import { dragAndDropSpecs } from './specs';

export const dragAndDrop: LibraryExample = {
  id: 'drag-and-drop',
  platform: 'elements',
  name: 'Drag and drop',
  kind: 'Kanban board',
  category: 'Productivity',
  size: 'wide',
  inspiredBy: ['Trello', 'Linear', 'Jira'],
  description:
    'A card lifted off a board and carried to the next column: tilted under a grabbing hand, with a placeholder opening where it will land and the cards below making room.',
  Component: DragAndDrop,
  specs: dragAndDropSpecs,
};
