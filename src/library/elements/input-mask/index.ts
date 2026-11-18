import type { LibraryExample } from '../../types';
import { InputMask } from './InputMask';
import { inputMaskSpecs } from './specs';

export const inputMask: LibraryExample = {
  id: 'input-mask',
  platform: 'elements',
  name: 'Input mask',
  kind: 'Formatted input',
  category: 'Forms',
  size: 'small',
  inspiredBy: ['Stripe', 'Revolut'],
  description:
    'A phone number field that shows its format as placeholders: digits fill the slots, the parentheses, space and dash come in by themselves, and a complete number turns valid.',
  Component: InputMask,
  specs: inputMaskSpecs,
};
