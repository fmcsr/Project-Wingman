import type { LibraryExample } from '../../types';
import { Breadcrumbs } from './Breadcrumbs';
import { breadcrumbsSpecs } from './specs';

export const breadcrumbs: LibraryExample = {
  id: 'breadcrumbs',
  platform: 'elements',
  name: 'Breadcrumbs',
  kind: 'Location trail',
  category: 'Navigation',
  size: 'wide',
  inspiredBy: ['Google Drive', 'Notion', 'Jira'],
  description:
    'The trail above a page’s title, from the workspace down to the page you’re on: chevrons between the crumbs, the levels in between folded into an ellipsis that lists them in a menu, and the current page in bold.',
  Component: Breadcrumbs,
  specs: breadcrumbsSpecs,
};
