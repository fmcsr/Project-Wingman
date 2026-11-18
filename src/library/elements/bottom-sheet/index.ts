import type { LibraryExample } from '../../types';
import { BottomSheet } from './BottomSheet';
import { bottomSheetSpecs } from './specs';

export const bottomSheet: LibraryExample = {
  id: 'bottom-sheet',
  platform: 'elements',
  name: 'Bottom sheet',
  kind: 'Detents',
  category: 'iOS',
  size: 'tall',
  inspiredBy: ['iOS Stocks', 'Apple Maps'],
  description:
    'A news sheet over a stock watchlist that rests at set heights: floating inset at the small and medium detents, edge to edge at the large one, with the grabber on top.',
  Component: BottomSheet,
  specs: bottomSheetSpecs,
};
