import type { LibraryExample } from '../../types';
import { SwipeActions } from './SwipeActions';
import { swipeActionsSpecs } from './specs';

export const swipeActions: LibraryExample = {
  id: 'swipe-actions',
  platform: 'elements',
  name: 'Swipe actions',
  kind: 'List rows',
  category: 'iOS',
  size: 'wide',
  inspiredBy: ['iOS Mail'],
  description:
    'Mail rows that slide aside to reveal actions: More, Flag and Trash on the trailing side, Unread on the leading side, and a full swipe that deletes.',
  Component: SwipeActions,
  specs: swipeActionsSpecs,
};
