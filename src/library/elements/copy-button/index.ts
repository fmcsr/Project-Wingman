import type { LibraryExample } from '../../types';
import { CopyButton } from './CopyButton';
import { copyButtonSpecs } from './specs';

export const copyButton: LibraryExample = {
  id: 'copy-button',
  platform: 'elements',
  name: 'Copy button',
  kind: 'Clipboard',
  category: 'Micro-interactions',
  size: 'small',
  inspiredBy: ['GitHub', 'Stripe Docs', 'Vercel'],
  description:
    'An install command in a code field with a copy icon at its end: the pointer clicks it, the icon morphs into a green check, a "Copied!" tooltip appears, and two seconds later both revert.',
  Component: CopyButton,
  specs: copyButtonSpecs,
};
