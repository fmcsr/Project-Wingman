import type { LibraryExample } from '../../types';
import { WaterfallChart } from './WaterfallChart';
import { waterfallChartSpecs } from './specs';

export const waterfallChart: LibraryExample = {
  id: 'waterfall-chart',
  platform: 'elements',
  name: 'Waterfall chart',
  kind: 'Bridge',
  category: 'Data',
  size: 'small',
  inspiredBy: ['Excel', 'Stripe'],
  description:
    'A quarter’s MRR bridge: Starting MRR on the baseline, new and expansion revenue floating up in green, contraction and churn stepping down in red, connectors carrying the total along and Ending MRR back on the baseline.',
  Component: WaterfallChart,
  specs: waterfallChartSpecs,
};
