import type { LibraryExample } from '../../types';
import { CohortTable } from './CohortTable';
import { cohortTableSpecs } from './specs';

export const cohortTable: LibraryExample = {
  id: 'cohort-table',
  platform: 'elements',
  name: 'Cohort table',
  kind: 'Retention',
  category: 'Data',
  size: 'wide',
  inspiredBy: ['Amplitude', 'Mixpanel', 'Stripe'],
  description:
    'Weekly sign-up cohorts as rows and the weeks since as columns, each cell the share still active, shaded on one hue, forming the retention triangle above an “All users” average row.',
  Component: CohortTable,
  specs: cohortTableSpecs,
};
