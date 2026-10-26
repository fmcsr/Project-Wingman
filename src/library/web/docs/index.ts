import type { LibraryExample } from '../../types';
import { DocsSite } from './DocsSite';
import { docsSpecs } from './specs';

export const docs: LibraryExample = {
  id: 'docs',
  platform: 'web',
  name: 'Forge Docs',
  kind: 'Developer docs',
  category: 'Developer',
  inspiredBy: ['Stripe Docs', 'Vercel Docs', 'MDN'],
  description:
    'A documentation page: a docs tree with collapsible groups, breadcrumbs, callouts, tabbed install commands, a code block with a highlighted line, a props table and an “On this page” list that follows your scroll.',
  url: 'docs.forge.dev',
  Component: DocsSite,
  specs: docsSpecs,
};
