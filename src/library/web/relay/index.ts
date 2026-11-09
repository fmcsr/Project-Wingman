import type { LibraryExample } from '../../types';
import { RelaySite } from './RelaySite';
import { relaySpecs } from './specs';

export const relay: LibraryExample = {
  id: 'relay',
  platform: 'web',
  name: 'Relay',
  kind: 'Team chat',
  category: 'Communication',
  inspiredBy: ['Slack'],
  description:
    'A team chat channel with a thread open: a workspace rail and a pine sidebar with unread badges and presence dots, grouped messages with photo avatars, reactions and a hover toolbar, a link preview, a “New” divider and a rich composer.',
  url: 'relay.chat',
  Component: RelaySite,
  specs: relaySpecs,
};
