import type { LibraryExample } from '../../types';
import { AnimatedTabs } from './AnimatedTabs';
import { animatedTabsSpecs } from './specs';

export const animatedTabs: LibraryExample = {
  id: 'animated-tabs',
  platform: 'elements',
  name: 'Tabs',
  kind: 'Sliding indicator',
  category: 'Navigation',
  size: 'wide',
  inspiredBy: ['Vercel', 'Linear', 'GitHub'],
  description:
    'A project page’s tab bar: a gray highlight follows the pointer from tab to tab, the underline slides over and fits itself to each new tab, and the page below crossfades.',
  Component: AnimatedTabs,
  specs: animatedTabsSpecs,
};
