import type { LibraryExample } from '../../types';
import { Sankey } from './Sankey';
import { sankeySpecs } from './specs';

export const sankey: LibraryExample = {
  id: 'sankey',
  platform: 'elements',
  name: 'Sankey diagram',
  kind: 'Flow',
  category: 'Data',
  size: 'wide',
  inspiredBy: ['Income statement charts', 'Google Analytics'],
  description:
    'A quarter’s money as flows from revenue streams through gross and operating profit to net income, every band as thick as its amount, with one path highlighted and its tooltip.',
  Component: Sankey,
  specs: sankeySpecs,
};
