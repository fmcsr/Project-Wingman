import type { LibraryExample } from '../../types';
import { Combobox } from './Combobox';
import { comboboxSpecs } from './specs';

export const combobox: LibraryExample = {
  id: 'combobox',
  platform: 'elements',
  name: 'Combobox',
  kind: 'Searchable select',
  category: 'Forms',
  size: 'tall',
  inspiredBy: ['Stripe Dashboard', 'Linear', 'Headless UI'],
  description:
    'A settings form’s Time zone field, open: typing narrows a list grouped by region, the matching letters in bold, the arrow keys move the highlight and a check marks the current value.',
  Component: Combobox,
  specs: comboboxSpecs,
};
