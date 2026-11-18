import type { LibraryExample } from '../../types';
import { CharacterCounter } from './CharacterCounter';
import { characterCounterSpecs } from './specs';

export const characterCounter: LibraryExample = {
  id: 'character-counter',
  platform: 'elements',
  name: 'Character counter',
  kind: 'Composer limit',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['X', 'Bluesky'],
  description:
    'A post composer whose ring fills as the text grows, turns amber with the characters left near the limit, then red with a negative count, the overflow highlighted and Post disabled.',
  Component: CharacterCounter,
  specs: characterCounterSpecs,
};
