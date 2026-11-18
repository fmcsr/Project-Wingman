import type { LibraryExample } from '../../types';
import { SelectableCards } from './SelectableCards';
import { selectableCardsSpecs } from './specs';

export const selectableCards: LibraryExample = {
  id: 'selectable-cards',
  platform: 'elements',
  name: 'Selectable cards',
  kind: 'Plan picker',
  category: 'Forms',
  size: 'wide',
  inspiredBy: ['Stripe', 'Vercel', 'Linear'],
  description:
    'Three plans as cards in a radio group, each with its radio circle, price and a line on who it’s for: a click moves the accent border, the fill and the check from card to card.',
  Component: SelectableCards,
  specs: selectableCardsSpecs,
};
