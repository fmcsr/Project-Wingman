/**
 * The market behind the map: large caps in seven sectors, each with its market value in billions of dollars, its last
 * price and today's change in percent. The companies are fictional; the shape is a real market's: a few giants in
 * technology, a long tail of smaller names, tech and payments up today, oil and drug makers down.
 */
export type Company = { ticker: string; name: string; cap: number; price: number; change: number };
export type Sector = { name: string; companies: Company[] };

export const SECTORS: Sector[] = [
  {
    name: 'Technology',
    companies: [
      { ticker: 'VANT', name: 'Vantage Microsystems', cap: 3120, price: 412.38, change: 1.24 },
      { ticker: 'CRQT', name: 'Circuit Logic', cap: 2840, price: 138.9, change: 2.86 },
      { ticker: 'NMBS', name: 'Nimbus Software', cap: 2610, price: 226.15, change: 0.62 },
      { ticker: 'HLXS', name: 'Helix Semiconductor', cap: 720, price: 171.42, change: 3.12 },
      { ticker: 'QRTZ', name: 'Quartz Devices', cap: 410, price: 88.06, change: -0.48 },
      { ticker: 'LTCE', name: 'Lattice Cloud', cap: 280, price: 312.7, change: 1.83 },
      { ticker: 'PRZM', name: 'Prism Analytics', cap: 190, price: 64.25, change: -1.12 },
      { ticker: 'TRBY', name: 'Terabyte Storage', cap: 130, price: 97.4, change: 0.35 },
    ],
  },
  {
    name: 'Financial',
    companies: [
      { ticker: 'HRBR', name: 'Harbor Capital', cap: 1010, price: 468.3, change: 0.21 },
      { ticker: 'BRKL', name: 'Brookline Bank', cap: 720, price: 246.85, change: 0.94 },
      { ticker: 'PYLN', name: 'Payline Networks', cap: 640, price: 331.6, change: 1.36 },
      { ticker: 'CRDX', name: 'Credex', cap: 510, price: 528.4, change: 1.02 },
      { ticker: 'STRL', name: 'Sterling Trust', cap: 380, price: 46.12, change: -0.58 },
      { ticker: 'LDGR', name: 'Ledger Asset Management', cap: 260, price: 892.15, change: 0.47 },
      { ticker: 'SGNL', name: 'Signal Brokerage', cap: 180, price: 115.7, change: 2.04 },
    ],
  },
  {
    name: 'Consumer',
    companies: [
      { ticker: 'PARC', name: 'Parcel Market', cap: 2050, price: 201.34, change: 1.08 },
      { ticker: 'VOLT', name: 'Voltaic Motors', cap: 1060, price: 318.77, change: -3.41 },
      { ticker: 'TRLH', name: 'Trailhead Outfitters', cap: 320, price: 142.1, change: 0.86 },
      { ticker: 'BRWD', name: 'Brightwood Home', cap: 260, price: 389.55, change: -0.32 },
      { ticker: 'ROAM', name: 'Roamly Travel', cap: 210, price: 4128.6, change: 1.47 },
    ],
  },
  {
    name: 'Communication',
    companies: [
      { ticker: 'LOOP', name: 'Loop Social', cap: 1940, price: 598.2, change: -0.94 },
      { ticker: 'SRCH', name: 'Searchlight', cap: 1320, price: 171.05, change: 0.41 },
      { ticker: 'STRM', name: 'Streamline Media', cap: 290, price: 702.16, change: -2.37 },
      { ticker: 'KNCT', name: 'Konnect Telecom', cap: 150, price: 41.88, change: 0.12 },
    ],
  },
  {
    name: 'Healthcare',
    companies: [
      { ticker: 'MRDN', name: 'Meridian Pharma', cap: 1050, price: 864.2, change: -1.86 },
      { ticker: 'CRVA', name: 'Corva Health', cap: 520, price: 541.3, change: -0.71 },
      { ticker: 'BLTN', name: 'Bolton & Reyes', cap: 460, price: 154.85, change: 0.18 },
      { ticker: 'ALPN', name: 'Alpine Bio', cap: 270, price: 112.4, change: 2.31 },
      { ticker: 'VTRA', name: 'Vitra Medical', cap: 230, price: 78.65, change: -0.24 },
      { ticker: 'SUTR', name: 'Suture Devices', cap: 160, price: 365.9, change: 0.92 },
    ],
  },
  {
    name: 'Industrials',
    companies: [
      { ticker: 'AERV', name: 'Aerovant', cap: 340, price: 212.75, change: 0.67 },
      { ticker: 'ALTM', name: 'Altamont Aerospace', cap: 300, price: 188.3, change: -1.48 },
      { ticker: 'KDNC', name: 'Kadence Machines', cap: 260, price: 371.8, change: 0.29 },
      { ticker: 'RDGW', name: 'Ridgeway Rail', cap: 220, price: 268.4, change: -0.36 },
      { ticker: 'FRTL', name: 'Freightline', cap: 190, price: 305.2, change: 1.14 },
    ],
  },
  {
    name: 'Energy',
    companies: [
      { ticker: 'PTRN', name: 'Petron', cap: 520, price: 118.62, change: -2.64 },
      { ticker: 'CLRK', name: 'Clarke Oil', cap: 300, price: 154.2, change: -1.93 },
      { ticker: 'BSNR', name: 'Basin Resources', cap: 140, price: 98.12, change: -3.08 },
      { ticker: 'SOLR', name: 'Solaris Grid', cap: 90, price: 36.4, change: 2.42 },
    ],
  },
];
