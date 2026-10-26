import type { LibraryExample } from '../../types';
import { InboxSite } from './InboxSite';
import { inboxSpecs } from './specs';

export const inbox: LibraryExample = {
  id: 'inbox',
  platform: 'web',
  name: 'Inbox',
  kind: 'Email client',
  category: 'Communication',
  inspiredBy: ['Gmail', 'Outlook', 'Superhuman'],
  description:
    'A three-pane mail app: a Compose button, folders with unread counts, category tabs, a bulk-action toolbar, rows in every state from unread to hovered, and a reading pane with a reply box.',
  url: 'inbox.mail',
  Component: InboxSite,
  specs: inboxSpecs,
};
