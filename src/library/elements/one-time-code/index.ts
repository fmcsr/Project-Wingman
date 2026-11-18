import type { LibraryExample } from '../../types';
import { OneTimeCode } from './OneTimeCode';
import { oneTimeCodeSpecs } from './specs';

export const oneTimeCode: LibraryExample = {
  id: 'one-time-code',
  platform: 'elements',
  name: 'One-time code field',
  kind: 'Verification',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['Slack', 'Stripe'],
  description:
    'Six boxes for the code a text message sent: digits arriving one by one, the active box with its caret, then a short verifying moment and the green of success.',
  Component: OneTimeCode,
  specs: oneTimeCodeSpecs,
};
