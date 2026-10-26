import type { LibraryExample } from '../../types';
import { LedgerSite } from './LedgerSite';
import { ledgerSpecs } from './specs';

export const ledger: LibraryExample = {
  id: 'ledger',
  platform: 'web',
  name: 'Ledger',
  kind: 'Payments platform',
  category: 'Finance',
  inspiredBy: ['Stripe', 'Adyen'],
  description:
    'A developer-first fintech homepage: an announcement bar, an open mega menu, a mesh-gradient hero with gradient text, a tabbed code block with a copy tooltip and a stats band.',
  url: 'ledger.dev',
  Component: LedgerSite,
  specs: ledgerSpecs,
};
