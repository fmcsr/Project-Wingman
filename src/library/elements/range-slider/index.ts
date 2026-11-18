import type { LibraryExample } from '../../types';
import { RangeSlider } from './RangeSlider';
import { rangeSliderSpecs } from './specs';

export const rangeSlider: LibraryExample = {
  id: 'range-slider',
  platform: 'elements',
  name: 'Range slider',
  kind: 'Price filter',
  category: 'Forms',
  size: 'wide',
  inspiredBy: ['Airbnb', 'Booking.com'],
  description:
    'A price filter with two thumbs over a histogram of nightly prices: the bars between them in color, a tooltip with the price over the thumb being dragged, and Minimum and Maximum fields that follow.',
  Component: RangeSlider,
  specs: rangeSliderSpecs,
};
