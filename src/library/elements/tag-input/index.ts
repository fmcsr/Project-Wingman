import type { LibraryExample } from '../../types';
import { TagInput } from './TagInput';
import { tagInputSpecs } from './specs';

export const tagInput: LibraryExample = {
  id: 'tag-input',
  platform: 'elements',
  name: 'Tag input',
  kind: 'Tokens',
  category: 'Forms',
  size: 'wide',
  inspiredBy: ['Linear', 'GitHub', 'Gmail'],
  description:
    'An issue’s Labels field holding chips with a color dot and a remove ×: typing narrows the suggestions with the match in bold, Enter or a comma adds a chip, and Backspace selects the last one before removing it.',
  Component: TagInput,
  specs: tagInputSpecs,
};
