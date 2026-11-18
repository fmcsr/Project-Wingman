import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Candlestick chart element, in the order they appear. `value` fields are the actual values from
 * Candlestick.
 */
export const candlestickSpecs: UiElementSpec[] = [
  {
    id: 'candlestick',
    name: 'Candlestick chart',
    htmlTag: '<canvas>',
    variant: 'One-minute candles · live',
    summary:
      'A price chart where every minute is a candle: its body spans the open and the close, its wicks the high and the low, so each one tells how that minute went.',
    aliases: ['OHLC chart', 'candle chart', 'price chart', 'stock chart', 'the green and red bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Up and down colors',
        value: 'up #009871 · down #de3b3d · the same in both themes',
        plain:
          'Green when the price closed higher than it opened, red when it closed lower. Both stay readable on a white or a dark chart.',
      },
      {
        kind: 'behavior',
        term: 'Live candle',
        value: 'a tick every 800ms · a new candle after 12 ticks',
        plain:
          'The last candle keeps changing while its minute runs. When the minute ends it freezes, and a new one opens on its right as the chart shifts left.',
      },
      {
        kind: 'behavior',
        term: 'Autoscaled price axis',
        value: 'fits the candles on screen · 6% padding',
        plain: 'The price axis stretches to the candles in view, so even small moves fill the height.',
      },
    ],
  },
  {
    id: 'candlestick-body',
    name: 'Candle body',
    htmlTag: '<rect>',
    variant: 'Open to close',
    summary:
      'The thick part of a candle, from the price the minute opened at to the one it closed at. Its color says which way it went.',
    aliases: ['real body', 'candle', 'the box', 'the bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled body',
        value: '7px wide, 3px apart (5 and 3 on a narrow chart) · at least 1px tall',
        plain: 'A solid block. A minute that closed where it opened is just a thin line, which traders call a doji.',
      },
      {
        kind: 'appearance',
        term: 'Direction by color',
        value: 'close ≥ open → green · close < open → red',
        plain: 'You can read the mood of a stretch of trading from the colors alone, before looking at a price.',
      },
    ],
  },
  {
    id: 'candlestick-wick',
    name: 'Wick',
    htmlTag: '<line>',
    variant: 'High to low',
    summary:
      'The thin line through a candle, from the highest price of the minute to the lowest: how far the price swung beyond its open and close.',
    aliases: ['shadow', 'tail', 'the line above and below', 'high–low line'],
    concepts: [
      {
        kind: 'appearance',
        term: '1px line',
        value: "stroke-width: 1 · the candle's color",
        plain: 'Thin and in the same color as the body, so a candle reads as one shape.',
      },
      {
        kind: 'behavior',
        term: 'Grows while live',
        value: 'the high and low so far',
        plain: 'On the live candle the wick stretches whenever the price sets a new high or low for the minute.',
      },
    ],
  },
  {
    id: 'candlestick-volume',
    name: 'Volume bars',
    htmlTag: '<rect>',
    variant: 'Shares traded each minute',
    summary:
      'A small bar chart along the bottom: how many shares changed hands each minute, colored like the candle above.',
    aliases: ['volume histogram', 'volume', 'the bars at the bottom', 'trading volume'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overlaid histogram',
        value: 'bottom 20% · fill-opacity: 0.32',
        plain:
          'It shares the chart’s timeline but keeps to the bottom fifth, pale, so it doesn’t compete with the candles.',
      },
      {
        kind: 'behavior',
        term: 'Scaled to the busiest minute',
        value: 'tallest bar = the most shares on screen',
        plain: 'Bars are sized against the busiest minute in view, so bursts of trading stand out.',
      },
    ],
  },
  {
    id: 'candlestick-crosshair',
    name: 'Crosshair',
    htmlTag: '<div>',
    variant: 'Snapped to a candle',
    summary:
      'Two dashed lines that follow the pointer, one down and one across, with the time and the price where they meet the axes, so any point on the chart can be read off.',
    aliases: ['cursor lines', 'cross cursor', 'hover lines', 'the dotted lines'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dashed lines',
        value: {
          light: '1px, 4px dashes, #8f96a3 · axis tags #2a2f3a',
          dark: '1px, 4px dashes, #6c7280 · axis tags #3a404c',
        },
        plain: 'Thin dashed gray lines so they never look like data, with dark tags on both axes.',
      },
      {
        kind: 'behavior',
        term: 'Snap to candle',
        value: 'the middle of the nearest candle · moves in 220ms',
        plain:
          'The line down jumps to the middle of the nearest candle rather than following the pointer exactly, so the readout always belongs to one minute.',
      },
    ],
  },
  {
    id: 'candlestick-price',
    name: 'Price label',
    htmlTag: '<span>',
    variant: 'The live price on the axis',
    summary:
      'A colored tag on the price axis with the latest price, joined to the chart by a dotted line, so the current price is always easy to find.',
    aliases: ['last price', 'price tag', 'current price line', 'the green box on the right'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Axis tag',
        value: 'the axis’s full width · 18px tall · 11px, 600, white',
        plain: 'It fills the axis in the live candle’s color: green while the minute is up, red while it’s down.',
      },
      {
        kind: 'behavior',
        term: 'Follows every tick',
        value: 'dotted line · stroke-dasharray: 1 3',
        plain: 'The tag and its dotted line move up and down with the price as it ticks.',
      },
    ],
  },
  {
    id: 'candlestick-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'O, H, L and C',
    summary:
      'A small card beside the crosshair with the candle’s four prices: where the minute opened, its high and low, and where it closed.',
    aliases: ['OHLC readout', 'data window', 'hover card', 'price details'],
    concepts: [
      {
        kind: 'appearance',
        term: 'OHLC grid',
        value: '2 × 2 · 11px · values tabular-nums',
        plain: 'The four prices in a small grid after their initials, O, H, L and C, the way traders read them.',
      },
      {
        kind: 'behavior',
        term: 'Out of the way',
        value: '12px beside the crosshair · top or bottom of the prices',
        plain:
          'It sits beside the crosshair on the side with more room, at the top or the bottom of the chart, wherever it covers fewer candles.',
      },
    ],
  },
];
