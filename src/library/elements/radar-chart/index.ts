import type { LibraryExample } from '../../types';
import { RadarChart } from './RadarChart';
import { radarChartSpecs } from './specs';

export const radarChart: LibraryExample = {
  id: 'radar-chart',
  platform: 'elements',
  name: 'Radar chart',
  kind: 'Comparison',
  category: 'Data',
  size: 'small',
  inspiredBy: ['FIFA player ratings', 'Strava'],
  description:
    'Two products rated on six axes, speed to features: a translucent polygon for each over hexagonal grid rings, with a legend, the scores at the corners of the one in focus and a tooltip comparing an axis.',
  Component: RadarChart,
  specs: radarChartSpecs,
};
