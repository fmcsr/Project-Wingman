import type { UiElementSpec } from '../../../catalog';

/** Parts of the Treemap element, in the order they appear. `value` fields are the actual values from Treemap. */
export const treemapSpecs: UiElementSpec[] = [
  {
    id: 'treemap',
    name: 'Treemap',
    htmlTag: '<svg>',
    variant: 'Market map · 7 sectors, 39 companies',
    summary:
      'A box cut into rectangles whose areas match their values: here every company in the market, sized by what it’s worth and colored by today’s move. Big moves in big companies jump out at a glance.',
    aliases: ['heat map', 'market map', 'stock heatmap', 'mosaic chart', 'the boxes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Area encodes value',
        value: 'market cap → tile area',
        plain:
          'Each tile’s area is its share of the total, so a company worth three times another takes three times the space.',
      },
      {
        kind: 'behavior',
        term: 'Squarified layout',
        value: 'largest first · rows along the shorter side',
        plain:
          'The tiles are cut to stay as close to squares as possible, which keeps them easy to compare and leaves room for labels. The biggest sit top left.',
      },
      {
        kind: 'appearance',
        term: 'Dark canvas',
        value: 'background: #15171c · 2px between sectors · 1px between tiles',
        plain:
          'Market maps stay dark in both themes: thin dark gaps outline every tile, and the colors stand out against them.',
      },
    ],
  },
  {
    id: 'treemap-sector',
    name: 'Group',
    htmlTag: '<g>',
    variant: 'A sector, sized by its total value',
    summary:
      'A block for one sector holding all of its companies, with its name along the top. Sectors are laid out first, so the size of a whole sector reads before its parts.',
    aliases: ['category', 'parent rectangle', 'section', 'sector block', 'branch'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Nested rectangles',
        value: 'sectors → companies, two levels',
        plain:
          'The map is laid out twice: first the sectors by their total value, then each sector’s companies inside its block.',
      },
      {
        kind: 'appearance',
        term: 'Group label strip',
        value: '15px · 10px, 700, uppercase · letter-spacing: 0.08em',
        plain:
          'The sector’s name runs in small capitals on a thin strip above its tiles. A block too small for the strip shows only its tiles.',
      },
    ],
  },
  {
    id: 'treemap-tile',
    name: 'Tile',
    htmlTag: '<rect>',
    variant: 'Sized by market cap · colored by change',
    summary:
      'One company: its area is its market value and its color is how far its stock moved today, from deep red through gray to deep green.',
    aliases: ['box', 'cell', 'leaf', 'rectangle', 'the green square'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Diverging color scale',
        value: '−3% oklch(0.6 0.2 24) · 0% oklch(0.36 0.018 260) · +3% oklch(0.62 0.16 150)',
        plain:
          'One color for each direction, red for down and green for up, both deepening with the size of the move, and a neutral gray for a flat day.',
      },
      {
        kind: 'behavior',
        term: 'Live color',
        value: 'transition: background-color 500ms',
        plain: 'As prices tick, a tile eases toward its new shade, so the map shifts gently instead of flashing.',
      },
      {
        kind: 'behavior',
        term: 'Hover highlight',
        value: 'box-shadow: inset 0 0 0 2px #fff',
        plain: 'The tile under the pointer gets a white ring inside its edge, and its tooltip opens.',
      },
    ],
  },
  {
    id: 'treemap-label',
    name: 'Tile label',
    htmlTag: '<text>',
    variant: 'Ticker and change, sized to the tile',
    summary:
      'The ticker, with the day’s change under it, written inside the tile at a size that fits. Tiles too small for it stay blank and leave the details to the tooltip.',
    aliases: ['ticker', 'symbol', 'the text in the box', 'data label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Fit-to-box text',
        value: 'ticker 9–30px, 700 · change at 60%, 500',
        plain: 'The bigger the tile, the bigger its ticker, so the largest companies read from across the room.',
      },
      {
        kind: 'behavior',
        term: 'Hidden when it doesn’t fit',
        value: 'measured per tile',
        plain:
          'Every label is measured against its tile; if it would spill over, it isn’t drawn at all rather than cut off. The change is the first to go.',
      },
    ],
  },
  {
    id: 'treemap-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'Sector, company, price and change',
    summary:
      'A small dark card by the pointer with what the tile can’t fit: the sector, the full company name, the last price and the day’s change.',
    aliases: ['hover card', 'popup', 'info box', 'details on hover'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Raised card',
        value: 'background: #22252d · border: 1px solid #3a3f4b · border-radius: 6px',
        plain: 'A card a step lighter than the map with a soft shadow, so it floats over the tiles it covers.',
      },
      {
        kind: 'behavior',
        term: 'Offset from the pointer',
        value: '14px right, 18px below · flips at the edges',
        plain:
          'It sits just off the pointer so it never hides the spot you’re pointing at, and moves to the other side near an edge.',
      },
      {
        kind: 'behavior',
        term: 'Live values',
        value: 'price and change tick · green up, red down',
        plain: 'While it’s open, the price and the change keep moving with the market.',
      },
    ],
  },
  {
    id: 'treemap-legend',
    name: 'Color legend',
    htmlTag: '<div>',
    variant: '−3% to +3% in seven swatches',
    summary: 'The color scale written out: seven swatches from −3% to +3%, so a tile’s color can be read as a number.',
    aliases: ['key', 'color key', 'scale', 'the colored boxes at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Stepped key',
        value: '7 swatches · 36–40 × 18–20px',
        plain: 'The scale’s stops in order, each labeled with its change; the tiles blend smoothly between them.',
      },
      {
        kind: 'appearance',
        term: 'Clamped ends',
        value: '±3% and beyond',
        plain: 'Anything past 3% takes the end colors, so one huge move doesn’t wash out every other tile.',
      },
    ],
  },
];
