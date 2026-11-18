import type { LibraryExample } from '../../types';
import { RippleEffect } from './RippleEffect';
import { rippleEffectSpecs } from './specs';

export const rippleEffect: LibraryExample = {
  id: 'ripple-effect',
  platform: 'elements',
  name: 'Ripple effect',
  kind: 'Press feedback',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['Material Design', 'Android'],
  description:
    'A Material settings card pressed in three places: each press tints the surface and sends a soft circle out from the finger until it fills the row or button, then fades.',
  Component: RippleEffect,
  specs: rippleEffectSpecs,
};
