import type { LibraryExample } from '../../types';
import { ReadReceipts } from './ReadReceipts';
import { readReceiptsSpecs } from './specs';

export const readReceipts: LibraryExample = {
  id: 'read-receipts',
  platform: 'elements',
  name: 'Read receipts',
  kind: 'Message status',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['WhatsApp', 'iMessage'],
  description:
    'A sent message whose status line steps from Sending through Sent and Delivered to Read 9:41 with blue ticks, before the typing dots come up and the reply arrives.',
  Component: ReadReceipts,
  specs: readReceiptsSpecs,
};
