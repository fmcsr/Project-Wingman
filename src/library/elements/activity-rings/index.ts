import type { LibraryExample } from '../../types';
import { ActivityRings } from './ActivityRings';
import { activityRingsSpecs } from './specs';

export const activityRings: LibraryExample = {
  id: 'activity-rings',
  platform: 'elements',
  name: 'Activity rings',
  kind: 'Fitness goals',
  category: 'Data',
  size: 'small',
  inspiredBy: ['Apple Fitness'],
  description:
    'Move, Exercise and Stand as three concentric rings on the Fitness summary card, each over a dark track, with the ring past its goal casting a shadow where it overlaps itself.',
  Component: ActivityRings,
  specs: activityRingsSpecs,
};
