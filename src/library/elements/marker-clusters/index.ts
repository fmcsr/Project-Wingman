import type { LibraryExample } from '../../types';
import { MarkerClusters } from './MarkerClusters';
import { markerClustersSpecs } from './specs';

export const markerClusters: LibraryExample = {
  id: 'marker-clusters',
  platform: 'elements',
  name: 'Marker clusters',
  kind: 'Map search',
  category: 'Data',
  size: 'big',
  inspiredBy: ['Airbnb', 'Google Maps'],
  description:
    'A rentals map where nearby listings merge into numbered circles: zooming in splits a cluster into smaller ones and price markers, and a selected marker opens its callout card.',
  Component: MarkerClusters,
  specs: markerClustersSpecs,
};
