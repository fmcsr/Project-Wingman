import type { LibraryExample } from '../../types';
import { ChatterApp } from './ChatterApp';
import { chatterSpecs } from './specs';

export const chatter: LibraryExample = {
  id: 'chatter',
  platform: 'mobile',
  name: 'Chatter',
  kind: 'Messaging',
  category: 'Communication',
  inspiredBy: ['WhatsApp', 'iMessage', 'Telegram'],
  description:
    'A one-to-one chat: bubbles with tails, timestamps and read receipts, a quoted reply, an emoji reaction, a voice message, typing dots and the composer.',
  Component: ChatterApp,
  specs: chatterSpecs,
};
