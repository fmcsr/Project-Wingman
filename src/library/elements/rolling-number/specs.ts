import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Rolling number element, in the order they appear. `value` fields are the actual values from
 * RollingNumber.
 */
export const rollingNumberSpecs: UiElementSpec[] = [
  {
    id: 'rolling-number',
    name: 'Rolling number',
    htmlTag: '<span aria-live="polite">',
    variant: 'Odometer · $12,846.20',
    summary:
      'A big figure that changes in place: when it updates, only the digits that changed roll to their new value, like the wheels of a car’s odometer.',
    aliases: ['odometer', 'ticker', 'number flip', 'animated counter', 'the spinning numbers'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Per-digit animation',
        value: 'only changed digits move',
        plain:
          'The number is split into one column per digit. A digit that stays the same stays still, so the eye goes straight to what changed.',
      },
      {
        kind: 'behavior',
        term: 'Trend direction',
        value: 'up on a rise · down on a fall',
        plain:
          'Every changed digit rolls the way the whole value went, even a 9 that has to pass 0 to reach 1, so the motion itself says up or down.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums · 34px · 600',
        plain: 'Every digit is the same width, so the figure never shifts sideways while its digits roll.',
      },
    ],
  },
  {
    id: 'rolling-number-digit',
    name: 'Digit column',
    htmlTag: '<span aria-hidden="true">',
    variant: 'Window onto a 0–9 strip',
    summary:
      'One digit of the number: a window one line tall over a vertical strip of 0 to 9. Rolling is just moving the strip behind the window.',
    aliases: ['digit wheel', 'reel', 'slot', 'the column that spins'],
    concepts: [
      {
        kind: 'appearance',
        term: 'overflow: hidden',
        value: 'height: 1.2em · strip of 0–9 × 3',
        plain:
          'The column shows one line and hides the rest of the strip. Three copies of 0–9 let a digit keep rolling the same way past 9.',
      },
      {
        kind: 'behavior',
        term: 'transform: translateY()',
        value: '650ms cubic-bezier(0.22, 1, 0.36, 1)',
        plain:
          'The strip slides a whole number of lines and eases out at the end. A digit with farther to go spins faster, so they all land together.',
      },
      {
        kind: 'appearance',
        term: 'mask-image',
        value: 'linear-gradient · 0.2em fade top and bottom',
        plain: 'A soft fade at the window’s top and bottom edges, so digits blur away as they roll instead of being sliced off.',
      },
    ],
  },
  {
    id: 'rolling-number-pill',
    name: 'Change pill',
    htmlTag: '<span>',
    variant: 'Today · gain',
    summary:
      'How much the value has moved today, in dollars and percent, colored green for a gain. It updates with every tick.',
    aliases: ['delta badge', 'change indicator', 'gain/loss', 'the green number', 'percentage change'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Semantic color',
        value: {
          light: 'color: #0b8a45 · background: color-mix(#0b8a45 13%)',
          dark: 'color: #2fd27a · background: color-mix(#2fd27a 13%)',
        },
        plain: 'Green text on a pale green tint for money gained, the way finance apps always color it. A loss would be red.',
      },
      {
        kind: 'appearance',
        term: 'Pill',
        value: 'height: 24px · border-radius: 12px · 12px · 600',
        plain: 'Fully rounded ends make it read as a label about the number above, not as a button.',
      },
      {
        kind: 'behavior',
        term: 'Derived value',
        value: '+$124.10 · +0.98% from $12,722.10',
        plain: 'It’s worked out from the value and yesterday’s close, so it always agrees with the big figure.',
      },
    ],
  },
  {
    id: 'rolling-number-flash',
    name: 'Flash',
    htmlTag: '<span aria-hidden="true">',
    variant: 'Green on a rise · red on a fall',
    summary:
      'A short burst of color on the pill each time the value ticks: green when it went up, red when it went down, then it fades.',
    aliases: ['tick flash', 'highlight', 'price flash', 'the blink'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Flash on update',
        value: 'on at once · fades over 900ms',
        plain:
          'The color comes on the instant the value changes and fades slowly, so you notice the change without it nagging.',
      },
      {
        kind: 'appearance',
        term: 'Direction color',
        value: {
          light: 'color-mix(#0b8a45 34%) · color-mix(#d4381f 28%)',
          dark: 'color-mix(#2fd27a 34%) · color-mix(#ff6a4d 28%)',
        },
        plain:
          'It follows the tick, not the day: a dip flashes red even while the day is still up and the pill stays green.',
      },
    ],
  },
  {
    id: 'rolling-number-sparkline',
    name: 'Sparkline',
    htmlTag: '<svg>',
    variant: 'Today · no axes',
    summary:
      'A tiny line chart of the day with no axes or labels, just enough to see the shape: a dip after the open, then a climb.',
    aliases: ['mini chart', 'trend line', 'micro chart', 'the little graph'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Baseline',
        value: 'yesterday’s close · dotted',
        plain:
          'A dotted line at yesterday’s closing value. Where the line runs above it, the day is up; below it, down.',
      },
      {
        kind: 'appearance',
        term: 'Line',
        value: { light: 'stroke: #0b8a45 · 1.5px', dark: 'stroke: #2fd27a · 1.5px' },
        plain: 'One thin line in the gain color, ending in a dot at the current value.',
      },
    ],
  },
];
