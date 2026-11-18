import type { LibraryExample } from '../../types';
import { QuantityStepper } from './QuantityStepper';
import { quantityStepperSpecs } from './specs';

export const quantityStepper: LibraryExample = {
  id: 'quantity-stepper',
  platform: 'elements',
  name: 'Stepper',
  kind: 'Guest count',
  category: 'Forms',
  size: 'small',
  inspiredBy: ['Airbnb', 'Booking.com'],
  description:
    'A guests popover with round − and + buttons around each count: the number rolls as it changes, and a − at its minimum fades out and refuses the press.',
  Component: QuantityStepper,
  specs: quantityStepperSpecs,
};
