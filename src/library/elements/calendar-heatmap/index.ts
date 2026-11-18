import type { LibraryExample } from '../../types';
import { CalendarHeatmap } from './CalendarHeatmap';
import { calendarHeatmapSpecs } from './specs';

export const calendarHeatmap: LibraryExample = {
  id: 'calendar-heatmap',
  platform: 'elements',
  name: 'Calendar heatmap',
  kind: 'Contribution graph',
  category: 'Data',
  size: 'wide',
  inspiredBy: ['GitHub contribution graph'],
  description:
    'A year of activity as a grid of days, one shade per level of a five-step scale, with month and weekday labels, a legend and a tooltip for the day under the pointer.',
  Component: CalendarHeatmap,
  specs: calendarHeatmapSpecs,
};
