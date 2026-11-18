import type { LibraryExample } from '../../types';
import { Funnel } from './Funnel';
import { funnelSpecs } from './specs';

export const funnel: LibraryExample = {
  id: 'funnel',
  platform: 'elements',
  name: 'Funnel chart',
  kind: 'Conversion',
  category: 'Data',
  size: 'small',
  inspiredBy: ['Amplitude', 'Mixpanel'],
  description:
    'A sign-up funnel as bars that shrink step by step, with the drop-off shaded above each one, the conversion rate between steps and a tooltip for the step under the pointer.',
  Component: Funnel,
  specs: funnelSpecs,
};
