import type { LibraryExample } from '../../types';
import { IndeterminateCheckbox } from './IndeterminateCheckbox';
import { indeterminateCheckboxSpecs } from './specs';

export const indeterminateCheckbox: LibraryExample = {
  id: 'indeterminate-checkbox',
  platform: 'elements',
  name: 'Indeterminate checkbox',
  kind: 'Bulk select',
  category: 'Forms',
  size: 'small',
  inspiredBy: ['Gmail', 'Google Drive', 'Notion'],
  description:
    'A file list with a select-all box in its header: it shows a dash while only some files are checked and a check once all are, and the header turns into a bar with the count and bulk actions.',
  Component: IndeterminateCheckbox,
  specs: indeterminateCheckboxSpecs,
};
