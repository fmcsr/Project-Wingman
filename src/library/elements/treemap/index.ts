import type { LibraryExample } from '../../types';
import { Treemap } from './Treemap';
import { treemapSpecs } from './specs';

export const treemap: LibraryExample = {
  id: 'treemap',
  platform: 'elements',
  name: 'Treemap',
  kind: 'Market map',
  category: 'Data',
  size: 'big',
  inspiredBy: ['Finviz', 'Bloomberg'],
  description:
    'A stock market map of nested rectangles: sectors sized by their total value, companies sized by market cap inside them and colored by the day’s change, with a tooltip on the one under the pointer.',
  Component: Treemap,
  specs: treemapSpecs,
};
