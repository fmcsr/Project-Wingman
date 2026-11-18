import type { LibraryExample } from '../../types';
import { ToastStack } from './ToastStack';
import { toastStackSpecs } from './specs';

export const toastStack: LibraryExample = {
  id: 'toast-stack',
  platform: 'elements',
  name: 'Toast stack',
  kind: 'Notifications',
  category: 'Micro-interactions',
  size: 'tall',
  inspiredBy: ['Sonner', 'Vercel'],
  description:
    'Short messages stacked at the bottom of an app, newest in front and older ones peeking behind, spreading into a list on hover, with an undo action and a loading toast that resolves.',
  Component: ToastStack,
  specs: toastStackSpecs,
};
