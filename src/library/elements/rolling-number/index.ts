import type { LibraryExample } from '../../types';
import { RollingNumber } from './RollingNumber';
import { rollingNumberSpecs } from './specs';

export const rollingNumber: LibraryExample = {
  id: 'rolling-number',
  platform: 'elements',
  name: 'Rolling number',
  kind: 'Odometer',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['Robinhood', 'YouTube', 'Stripe'],
  description:
    'A portfolio value whose digits roll like an odometer as it ticks up and down, only the changed ones moving, while the change pill flashes green or red beside a sparkline of the day.',
  Component: RollingNumber,
  specs: rollingNumberSpecs,
};
