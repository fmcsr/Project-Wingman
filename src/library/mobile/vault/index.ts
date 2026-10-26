import type { LibraryExample } from '../../types';
import { vaultSpecs } from './specs';
import { VaultApp } from './VaultApp';

export const vault: LibraryExample = {
  id: 'vault',
  platform: 'mobile',
  name: 'Vault',
  kind: 'Banking',
  category: 'Finance',
  inspiredBy: ['Revolut', 'Monzo', 'Cash App'],
  description:
    'A banking home screen: a balance you can hide, quick actions, card art, a spending chart and color-coded transactions.',
  Component: VaultApp,
  specs: vaultSpecs,
};
