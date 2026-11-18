import type { LibraryExample } from '../../types';
import { LanesSite } from './LanesSite';
import { lanesSpecs } from './specs';

export const lanes: LibraryExample = {
  id: 'lanes',
  platform: 'web',
  name: 'Lanes',
  kind: 'Kanban board',
  category: 'Productivity',
  inspiredBy: ['Jira'],
  description:
    'A team’s Kanban board: a top bar with Create, the space sidebar and header with view tabs, a filter bar with avatars, column headers with counts and a WIP limit over capacity, swimlanes by epic, cards with a key, labels, a due date, priority, story points and an assignee, a flagged card, and a card mid-drag over its drop placeholder.',
  url: 'lanes.app',
  Component: LanesSite,
  specs: lanesSpecs,
};
