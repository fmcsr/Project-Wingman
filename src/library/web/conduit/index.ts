import type { LibraryExample } from '../../types';
import { ConduitSite } from './ConduitSite';
import { conduitSpecs } from './specs';

export const conduit: LibraryExample = {
  id: 'conduit',
  platform: 'web',
  name: 'Conduit',
  kind: 'Automation builder',
  category: 'Productivity',
  inspiredBy: ['Zapier'],
  description:
    'A workflow editor with a four-step flow open: a dotted canvas, a trigger, a filter and action steps joined by lines with a plus to add a step, a selected step with its settings panel, step tabs, a dropdown, data pills and a Yes/No toggle, zoom controls, and the flow’s name with a Draft badge, an on/off toggle and Publish.',
  url: 'conduit.app',
  Component: ConduitSite,
  specs: conduitSpecs,
};
