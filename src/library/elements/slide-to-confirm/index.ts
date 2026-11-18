import type { LibraryExample } from '../../types';
import { SlideToConfirm } from './SlideToConfirm';
import { slideToConfirmSpecs } from './specs';

export const slideToConfirm: LibraryExample = {
  id: 'slide-to-confirm',
  platform: 'elements',
  name: 'Slide to confirm',
  kind: 'Payment',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['iPhone slide to unlock', 'Uber Driver'],
  description:
    "A transfer confirmed by sliding a thumb along a pill track: a light sweep runs across the label, the fill grows behind the thumb and the track turns green once it's sent.",
  Component: SlideToConfirm,
  specs: slideToConfirmSpecs,
};
