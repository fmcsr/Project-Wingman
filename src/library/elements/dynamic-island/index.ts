import type { LibraryExample } from '../../types';
import { DynamicIsland } from './DynamicIsland';
import { dynamicIslandSpecs } from './specs';

export const dynamicIsland: LibraryExample = {
  id: 'dynamic-island',
  platform: 'elements',
  name: 'Dynamic Island',
  kind: 'Live Activity',
  category: 'iOS',
  size: 'wide',
  inspiredBy: ['iPhone Dynamic Island', 'Uber'],
  description:
    "The pill around the iPhone's front camera hosting a ride's Live Activity: compact, with the car and the minutes to pickup on either side of the camera, then expanded with the driver, the plate and the route.",
  Component: DynamicIsland,
  specs: dynamicIslandSpecs,
};
