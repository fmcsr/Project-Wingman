import type { LibraryExample } from '../../types';
import { SkeletonScreen } from './SkeletonScreen';
import { skeletonScreenSpecs } from './specs';

export const skeletonScreen: LibraryExample = {
  id: 'skeleton-screen',
  platform: 'elements',
  name: 'Skeleton screen',
  kind: 'Loading state',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['Instagram', 'LinkedIn'],
  description:
    "Gray shapes where an activity feed's avatars, text and photos will go, a shimmer sweeping across them, then each row replaced by its content without a jump.",
  Component: SkeletonScreen,
  specs: skeletonScreenSpecs,
};
