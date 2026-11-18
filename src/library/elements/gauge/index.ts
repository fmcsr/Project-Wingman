import type { LibraryExample } from '../../types';
import { Gauge } from './Gauge';
import { gaugeSpecs } from './specs';

export const gauge: LibraryExample = {
  id: 'gauge',
  platform: 'elements',
  name: 'Gauge',
  kind: 'Score',
  category: 'Data',
  size: 'small',
  inspiredBy: ['Credit Karma', 'Google PageSpeed'],
  description:
    'A credit score on a half-circle dial in five colored zones, with a marker that sweeps up to the score, the band it lands in and a badge for how far it moved.',
  Component: Gauge,
  specs: gaugeSpecs,
};
