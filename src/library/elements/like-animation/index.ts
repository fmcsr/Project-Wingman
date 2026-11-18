import type { LibraryExample } from '../../types';
import { LikeAnimation } from './LikeAnimation';
import { likeAnimationSpecs } from './specs';

export const likeAnimation: LibraryExample = {
  id: 'like-animation',
  platform: 'elements',
  name: 'Like animation',
  kind: 'Reaction',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['X', 'Instagram'],
  description:
    "A post's action row where the heart squashes when pressed, then pops up filled in red with a ring burst and a few dots flying off while the count rolls up by one.",
  Component: LikeAnimation,
  specs: likeAnimationSpecs,
};
