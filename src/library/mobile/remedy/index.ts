import type { LibraryExample } from '../../types';
import { RemedyApp } from './RemedyApp';
import { remedySpecs } from './specs';

export const remedy: LibraryExample = {
  id: 'remedy',
  platform: 'mobile',
  name: 'Remedy',
  kind: 'Doctor booking',
  category: 'Health',
  inspiredBy: ['Zocdoc'],
  description:
    'Doctor search results: a back button and Map over a search pill with the specialty, place and plan, filter chips led by a Filters count, a doctor card with a round photo and video-visit badge, a rating with an award badge, distance and an in-network badge, a date strip, time slots with one picked, a Book button, a sponsored label and a tab bar.',
  Component: RemedyApp,
  specs: remedySpecs,
};
