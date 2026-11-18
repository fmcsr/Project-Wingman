import type { LibraryExample } from '../../types';
import { HoverCard } from './HoverCard';
import { hoverCardSpecs } from './specs';

export const hoverCard: LibraryExample = {
  id: 'hover-card',
  platform: 'elements',
  name: 'Hover card',
  kind: 'Profile preview',
  category: 'Navigation',
  size: 'small',
  inspiredBy: ['GitHub', 'X', 'Slack'],
  description:
    'Resting the pointer on an @mention opens a small profile card after a short delay: avatar, name, bio, follower counts and a Follow button, with an arrow back to the name.',
  Component: HoverCard,
  specs: hoverCardSpecs,
};
