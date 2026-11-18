import type { LibraryExample } from '../../types';
import { BubbleChart } from './BubbleChart';
import { bubbleChartSpecs } from './specs';

export const bubbleChart: LibraryExample = {
  id: 'bubble-chart',
  platform: 'elements',
  name: 'Bubble chart',
  kind: 'Prioritization',
  category: 'Data',
  size: 'small',
  inspiredBy: ['Productboard', 'Gapminder'],
  description:
    'Feature requests on an effort-and-impact matrix, each bubble sized by how many customers asked, with dashed guides naming the four quadrants, a size legend and a tooltip for the bubble under the pointer.',
  Component: BubbleChart,
  specs: bubbleChartSpecs,
};
