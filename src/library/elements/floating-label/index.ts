import type { LibraryExample } from '../../types';
import { FloatingLabel } from './FloatingLabel';
import { floatingLabelSpecs } from './specs';

export const floatingLabel: LibraryExample = {
  id: 'floating-label',
  platform: 'elements',
  name: 'Floating label',
  kind: 'Text field',
  category: 'Forms',
  size: 'small',
  inspiredBy: ['Material Design', 'Stripe Checkout'],
  description:
    'A sign-up card’s outlined fields: the empty one’s label rests inside like a placeholder, then floats up into a notch in the border as the field takes focus and an address types out.',
  Component: FloatingLabel,
  specs: floatingLabelSpecs,
};
