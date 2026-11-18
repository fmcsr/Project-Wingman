import type { LibraryExample } from '../../types';
import { FolioSite } from './FolioSite';
import { folioSpecs } from './specs';

export const folio: LibraryExample = {
  id: 'folio',
  platform: 'web',
  name: 'Folio',
  kind: 'Docs and wiki',
  category: 'Productivity',
  inspiredBy: ['Notion'],
  description:
    'A team wiki page mid-edit: a page tree with emoji icons, a cover photo and page icon, properties, @mentions, a callout, a toggle, a to-do list, block handles, an open slash menu and a comment thread in the margin.',
  url: 'folio.app',
  Component: FolioSite,
  specs: folioSpecs,
};
