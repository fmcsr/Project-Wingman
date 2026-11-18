import type { LibraryExample } from '../../types';
import { WheelPicker } from './WheelPicker';
import { wheelPickerSpecs } from './specs';

export const wheelPicker: LibraryExample = {
  id: 'wheel-picker',
  platform: 'elements',
  name: 'Wheel picker',
  kind: 'Time picker',
  category: 'iOS',
  size: 'small',
  inspiredBy: ['iOS Clock'],
  description:
    "The alarm sheet's time picker: hours, minutes and AM/PM on wheels that curve away from a gray selection band, flicked and settling into place.",
  Component: WheelPicker,
  specs: wheelPickerSpecs,
};
