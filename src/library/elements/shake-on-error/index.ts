import type { LibraryExample } from '../../types';
import { ShakeOnError } from './ShakeOnError';
import { shakeOnErrorSpecs } from './specs';

export const shakeOnError: LibraryExample = {
  id: 'shake-on-error',
  platform: 'elements',
  name: 'Shake on error',
  kind: 'Wrong password',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['macOS login window', 'iOS passcode'],
  description:
    'A sign-in card where a wrong password makes the field shake side to side and turn red, with how many tries are left and a way to reset it, before the right one goes through.',
  Component: ShakeOnError,
  specs: shakeOnErrorSpecs,
};
