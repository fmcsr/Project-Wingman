import type { LibraryExample } from '../../types';
import { GanttChart } from './GanttChart';
import { ganttChartSpecs } from './specs';

export const ganttChart: LibraryExample = {
  id: 'gantt-chart',
  platform: 'elements',
  name: 'Gantt chart',
  kind: 'Timeline',
  category: 'Data',
  size: 'wide',
  inspiredBy: ['Linear', 'Asana', 'Monday.com'],
  description:
    'A project’s tasks as bars on a week axis, each filled with its progress and carrying its assignee, with arrows to the tasks that wait on them, a launch milestone and a red Today line.',
  Component: GanttChart,
  specs: ganttChartSpecs,
};
