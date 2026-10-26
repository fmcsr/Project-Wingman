import type { LibraryExample } from '../../types';
import { TrackerSite } from './TrackerSite';
import { trackerSpecs } from './specs';

export const tracker: LibraryExample = {
  id: 'tracker',
  platform: 'web',
  name: 'Tracker',
  kind: 'Issue tracker',
  category: 'Productivity',
  inspiredBy: ['Linear', 'Jira', 'Height'],
  description:
    'A dense, keyboard-first issue list: a workspace sidebar, breadcrumbs and view tabs, filter chips, sticky group headers, status and priority icons, and a right-click menu with shortcuts.',
  url: 'tracker.app',
  Component: TrackerSite,
  specs: trackerSpecs,
};
