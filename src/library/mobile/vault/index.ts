import type { LibraryExample } from '../../types';
import { vaultSpecs } from './specs';
import { VaultApp } from './VaultApp';

export const vault: LibraryExample = {
  id: 'vault',
  platform: 'mobile',
  name: 'Vault',
  kind: 'Banking',
  category: 'Finance',
  inspiredBy: ['Revolut'],
  description:
    'A banking home screen: a profile photo with a dot badge, a search pill and icon buttons over a brand wash, the balance with smaller cents, an Accounts button and page dots, quick actions, transaction rows with a merchant logo, a currency pair and signed amounts, See all, a Cards widget with card thumbnails and a frosted tab bar led by the logo.',
  Component: VaultApp,
  specs: vaultSpecs,
};
