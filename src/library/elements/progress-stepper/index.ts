import type { LibraryExample } from '../../types';
import { ProgressStepper } from './ProgressStepper';
import { progressStepperSpecs } from './specs';

export const progressStepper: LibraryExample = {
  id: 'progress-stepper',
  platform: 'elements',
  name: 'Progress stepper',
  kind: 'Multi-step form',
  category: 'Navigation',
  size: 'wide',
  inspiredBy: ['Stripe', 'Shopify'],
  description:
    'Four onboarding steps in a row, numbered circles joined by lines: Continue checks a step off, fills the line and moves the ring to the next, as the form below slides on.',
  Component: ProgressStepper,
  specs: progressStepperSpecs,
};
