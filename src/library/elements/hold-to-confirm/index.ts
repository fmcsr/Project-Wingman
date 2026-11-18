import type { LibraryExample } from '../../types';
import { HoldToConfirm } from './HoldToConfirm';
import { holdToConfirmSpecs } from './specs';

export const holdToConfirm: LibraryExample = {
  id: 'hold-to-confirm',
  platform: 'elements',
  name: 'Hold to confirm',
  kind: 'Destructive action',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['Discord', 'Uber', 'Apple Watch'],
  description:
    'A delete dialog whose button has to be held: a red fill sweeps across it while it’s pressed, drains back when let go early, and turns into Deleted with a check once held to the end.',
  Component: HoldToConfirm,
  specs: holdToConfirmSpecs,
};
