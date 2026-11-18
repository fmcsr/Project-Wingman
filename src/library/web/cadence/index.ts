import type { LibraryExample } from '../../types';
import { CadenceSite } from './CadenceSite';
import { cadenceSpecs } from './specs';

export const cadence: LibraryExample = {
  id: 'cadence',
  platform: 'web',
  name: 'Cadence',
  kind: 'Calendar',
  category: 'Productivity',
  inspiredBy: ['Notion Calendar'],
  description:
    'A calendar’s week view: a mini month and calendar toggles in the sidebar, Today, arrows, the date range and a view switcher, an all-day row, events in their calendar’s colors (an overlapping pair, a tentative, a past and a selected one), the current-time line and an event panel with guests, a join button and an RSVP.',
  url: 'cadence.app',
  Component: CadenceSite,
  specs: cadenceSpecs,
};
