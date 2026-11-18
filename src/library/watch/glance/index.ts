import type { LibraryExample } from '../../types';
import { GlanceStack } from './GlanceStack';
import { glanceSpecs } from './specs';

export const glance: LibraryExample = {
  id: 'glance',
  platform: 'watch',
  name: 'Glance',
  kind: 'Smart Stack',
  category: 'Productivity',
  inspiredBy: ['watchOS Smart Stack', 'Apple Watch widgets'],
  description:
    'The Smart Stack you reach by turning the Digital Crown up from the face: the time in the top-right corner, a row of three circular widgets with their gauges, then rectangular widgets as rounded cards (the weather tinted blue with an hourly forecast, the next meeting peeking below), scrolled one widget at a time, with the Digital Crown scroll indicator beside the crown.',
  Component: GlanceStack,
  specs: glanceSpecs,
};
