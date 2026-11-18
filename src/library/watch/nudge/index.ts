import type { LibraryExample } from '../../types';
import { NudgeApp } from './NudgeApp';
import { nudgeSpecs } from './specs';

export const nudge: LibraryExample = {
  id: 'nudge',
  platform: 'watch',
  name: 'Nudge',
  kind: 'Notification',
  category: 'Communication',
  inspiredBy: ['watchOS notifications', 'Messages on Apple Watch'],
  description:
    "A message arriving on the wrist: the Short Look with the app's big round icon, then the Long Look with the same icon in the header, the sender's photo and message on a platter, full-width action buttons with Dismiss at the end, and the Digital Crown scroll indicator.",
  Component: NudgeApp,
  specs: nudgeSpecs,
};
