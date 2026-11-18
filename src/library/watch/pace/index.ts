import type { LibraryExample } from '../../types';
import { PaceApp } from './PaceApp';
import { paceSpecs } from './specs';

export const pace: LibraryExample = {
  id: 'pace',
  platform: 'watch',
  name: 'Pace',
  kind: 'Workout',
  category: 'Health',
  inspiredBy: ['Apple Watch Workout'],
  description:
    "A run on the wrist: the workout's icon in a goal ring and the time, a yellow elapsed time, then one metric per line with small uppercase unit labels (heart rate with a heartbeat icon, active calories, average pace and distance), and a vertical page indicator by the Digital Crown.",
  Component: PaceApp,
  specs: paceSpecs,
};
