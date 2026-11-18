import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Waterfall chart element, in the order they appear. `value` fields are the actual values from
 * WaterfallChart.
 */
export const waterfallChartSpecs: UiElementSpec[] = [
  {
    id: 'waterfall-chart',
    name: 'Waterfall chart',
    htmlTag: '<figure>',
    variant: 'MRR bridge · Q3 2026',
    summary:
      'How a number got from where it started to where it ended: the two totals stand on the baseline, and every change in between floats from where the last one left off, up for gains and down for losses.',
    aliases: ['bridge chart', 'MRR bridge', 'walk chart', 'cascade chart', 'the floating bars chart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating bars',
        value: 'each change starts at the running total',
        plain:
          'A change doesn’t start at zero but where the previous bar ended, so the bars step up and down like stairs and the last step lands exactly on the ending total.',
      },
      {
        kind: 'appearance',
        term: 'Zero-based scale',
        value: '136px = $60k · gridlines every $20k',
        plain:
          'Every bar uses one scale that starts at zero, so a $5k change is the same height wherever it floats and the two totals compare honestly.',
      },
      {
        kind: 'behavior',
        term: 'Builds left to right',
        value: '420ms a bar · 240ms apart',
        plain:
          'The bars appear in reading order, each from the level the one before it reached, telling the quarter in the order it happened.',
      },
    ],
  },
  {
    id: 'waterfall-chart-total',
    name: 'Total bar',
    variant: 'Starting $42.0k · Ending $52.9k',
    summary:
      'The two anchors of the bridge, starting and ending MRR, drawn up from zero in a neutral gray so the colored changes between them stand out.',
    aliases: ['subtotal', 'opening and closing balance', 'start and end bars', 'the gray bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Neutral fill',
        value: { light: 'oklch(0.6 0.025 255)', dark: 'oklch(0.6 0.02 255)' },
        plain: 'A quiet slate gray: the totals are the frame of the story, not the news.',
      },
      {
        kind: 'appearance',
        term: 'Stands on the baseline',
        value: 'border-radius: 3px 3px 0 0',
        plain: 'Square at the bottom, where it meets zero, and slightly rounded where its value ends.',
      },
      {
        kind: 'behavior',
        term: 'The changes add up',
        value: '42.0 + 12.4 + 5.2 − 2.1 − 4.6 = 52.9',
        plain:
          'The ending total is the starting total plus every change in between. If they don’t add up, the chart is wrong.',
      },
    ],
  },
  {
    id: 'waterfall-chart-increase',
    name: 'Increase bar',
    variant: 'New · +$12.4k from 83 customers',
    summary:
      'A change that adds to the total, floating up from where the previous bar ended: new customers and upgrades.',
    aliases: ['positive bar', 'gain', 'step up', 'the green bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Increase color',
        value: { light: 'oklch(0.62 0.12 170)', dark: 'oklch(0.66 0.12 172)' },
        plain:
          'A green for money coming in, checked against the red so the two stay apart for color-blind readers too. Direction and the plus sign say it again.',
      },
      {
        kind: 'behavior',
        term: 'Grows upward',
        value: 'transform-origin: bottom · scaleY(0) → scaleY(1)',
        plain: 'It grows up from where the total stood and stops at the new total.',
      },
    ],
  },
  {
    id: 'waterfall-chart-decrease',
    name: 'Decrease bar',
    variant: 'Churn · −$4.6k from 31 customers',
    summary:
      'A change that takes away from the total, hanging down from where the previous bar ended: downgrades and cancellations.',
    aliases: ['negative bar', 'loss', 'step down', 'the red bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Decrease color',
        value: { light: 'oklch(0.54 0.19 25)', dark: 'oklch(0.58 0.18 25)' },
        plain: 'A red for money going out, darker than the green, so the pair differs in lightness as well as in hue.',
      },
      {
        kind: 'behavior',
        term: 'Grows downward',
        value: 'transform-origin: top',
        plain: 'It grows down from the level before it, so the eye follows the total as it drops.',
      },
      {
        kind: 'behavior',
        term: 'Highlight on hover',
        value: 'other bars: opacity 0.45',
        plain:
          'Pointing at a bar keeps it in full color and fades the rest back, so the one you’re reading stands out.',
      },
    ],
  },
  {
    id: 'waterfall-chart-connector',
    name: 'Connector line',
    variant: 'The running total, bar to bar',
    summary:
      'A thin line from the end of each bar to the start of the next, carrying the running total across the gap so you see where each step begins.',
    aliases: ['bridge line', 'step line', 'leader line', 'the thin lines between bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Hairline',
        value: { light: '1px · #a3a9b1', dark: '1px · #5d636d' },
        plain: 'Gray and one pixel thin: it guides the eye without competing with the bars.',
      },
      {
        kind: 'behavior',
        term: 'Draws after its bar',
        value: 'scaleX(0) → scaleX(1) · 200ms, 380ms after its bar',
        plain: 'Once a bar has grown, its connector stretches across to where the next bar will start.',
      },
    ],
  },
  {
    id: 'waterfall-chart-value',
    name: 'Value label',
    variant: 'Signed · above each bar',
    summary:
      'Each bar’s amount written just above it, with a plus or minus on the changes, so nobody has to read values off an axis.',
    aliases: ['data label', 'bar label', 'the numbers on top', 'amount'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Direct label',
        value: '10.5px · 500 · tabular-nums',
        plain:
          'Set in the text color, not the bar’s, so it reads on any background; the bar under it carries the color.',
      },
      {
        kind: 'appearance',
        term: 'Signed changes',
        value: '+$12.4k · −$4.6k',
        plain: 'Changes carry a plus or a minus, so the direction is in the words as well as in the color.',
      },
      {
        kind: 'behavior',
        term: 'Shortens on narrow screens',
        value: 'no $ below 300px wide · 10px',
        plain:
          'On the narrowest cards the dollar signs go, so neighboring labels never touch; the title already says it’s money.',
      },
    ],
  },
  {
    id: 'waterfall-chart-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'Exact amount and customers',
    summary:
      'The dark label that opens under the bar you point at: the exact amount, what kind of change it is and how many customers it came from.',
    aliases: ['hover card', 'popover', 'hover label', 'details on hover'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Value first',
        value: '"−$4,600 MRR" · 600 weight',
        plain:
          'The exact number leads in bold; the name of the change and the customer count follow in a quieter line.',
      },
      {
        kind: 'appearance',
        term: 'Placed in the empty space',
        value: 'arrow on the bar · bubble reaching left',
        plain:
          'It hangs in the room a floating bar leaves below it and reaches back over the gaps under the bars before it, so it covers none of them.',
      },
      {
        kind: 'behavior',
        term: 'Replaces the label',
        value: 'value label: opacity 0 · 150ms',
        plain: 'While it’s open, the bar’s own amount steps aside, so the number never shows twice.',
      },
    ],
  },
];
