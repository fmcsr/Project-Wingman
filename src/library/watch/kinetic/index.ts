import type { LibraryExample } from '../../types';
import { KineticApp } from './KineticApp';
import { kineticSpecs } from './specs';

export const kinetic: LibraryExample = {
  id: 'kinetic',
  platform: 'watch',
  name: 'Kinetic',
  kind: 'Activity rings',
  category: 'Health',
  inspiredBy: ['Apple Watch Activity', 'Apple Fitness'],
  description:
    "The day's activity on the wrist: three concentric rings for Move, Exercise and Stand, each over a dark track with an arrow at its start, Exercise running past its goal with a shadow where it overlaps itself, and the time, then, a turn of the Digital Crown below, each ring's figure in its color over an hourly bar chart, with the crown's scroll indicator beside them.",
  Component: KineticApp,
  specs: kineticSpecs,
};
