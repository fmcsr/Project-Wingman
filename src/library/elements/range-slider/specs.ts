import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Range slider element, in the order they appear. `value` fields are the actual values from
 * RangeSlider.
 */
export const rangeSliderSpecs: UiElementSpec[] = [
  {
    id: 'range-slider',
    name: 'Range slider',
    htmlTag: '<div role="slider"> × 2',
    variant: 'Two thumbs · $20 to $240+',
    summary:
      'A slider with two handles that picks a range instead of one value: everything between the thumbs is in. Dragging is quick for a rough choice; the fields below take exact numbers.',
    aliases: ['dual slider', 'price slider', 'min-max slider', 'double-ended slider', 'the slider with two dots'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Two thumbs',
        value: 'minimum ≤ maximum',
        plain:
          'Each end of the range has its own handle. They can meet but not cross, so the minimum stays the minimum.',
      },
      {
        kind: 'behavior',
        term: 'Open-ended maximum',
        value: '$240+',
        plain:
          'The top of the scale stands for everything above it, so the right end reads $240+ and keeps the priciest stays in.',
      },
      {
        kind: 'behavior',
        term: 'Linked fields',
        plain:
          'The slider and the fields show the same two numbers: drag a thumb and its field changes, type in a field and its thumb moves.',
      },
      {
        kind: 'behavior',
        term: 'Keyboard steps',
        value: '← → change it by $1',
        plain: 'With a thumb focused, the arrow keys nudge it, for anyone who can’t or won’t drag.',
      },
    ],
  },
  {
    id: 'range-slider-track',
    name: 'Track',
    htmlTag: '<div>',
    variant: '2px line under the bars',
    summary: 'The line the thumbs slide along: the whole scale, from the lowest price to the highest.',
    aliases: ['rail', 'slider bar', 'groove', 'the line'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Thin track',
        value: { light: 'height: 2px · #dddddd', dark: 'height: 2px · #3b3b3f' },
        plain: 'A light gray hairline at the foot of the histogram, so the bars seem to stand on it.',
      },
      {
        kind: 'behavior',
        term: 'Click to jump',
        plain: 'A click on the track moves the nearer thumb straight to that spot.',
      },
    ],
  },
  {
    id: 'range-slider-range',
    name: 'Selected range',
    htmlTag: '<div>',
    variant: 'Between the thumbs · coral',
    summary: 'The stretch of track between the two thumbs, in color: the prices you’re keeping.',
    aliases: ['fill', 'active track', 'highlighted range', 'the colored part'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Range fill',
        value: { light: 'height: 2px · #e5533d', dark: 'height: 2px · #ff7d64' },
        plain: 'The same line as the track, colored between the thumbs, like a highlighter over the prices in play.',
      },
      {
        kind: 'behavior',
        term: 'Follows the thumbs',
        plain: 'Its ends are the thumbs, so it stretches and shrinks as either one moves.',
      },
    ],
  },
  {
    id: 'range-slider-thumb',
    name: 'Thumb',
    htmlTag: '<div role="slider" aria-valuenow>',
    variant: '28px disc · grows while held',
    summary: 'A handle you grab and drag. Each end of the range has one.',
    aliases: ['handle', 'knob', 'slider dot', 'grip'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Disc handle',
        value: {
          light: '28px · #ffffff · 1px #b0b0b0 · box-shadow: 0 2px 4px rgb(0 0 0 / 0.18)',
          dark: '28px · #ffffff · 1px #4d4d52 · box-shadow: 0 2px 4px rgb(0 0 0 / 0.18)',
        },
        plain:
          'A white circle with a thin outline and a soft shadow, raised above the track so it looks like something you can pick up.',
      },
      {
        kind: 'behavior',
        term: 'Pressed state',
        value: 'scale: 1.08 · darker outline · 150ms',
        plain: 'While you hold it, it grows a little and its outline darkens, so you know you’ve got it.',
      },
      {
        kind: 'behavior',
        term: 'aria-valuetext',
        value: '"$80"',
        plain: 'Each thumb tells screen readers its price as words, not just a number on a scale.',
      },
    ],
  },
  {
    id: 'range-slider-tooltip',
    name: 'Value tooltip',
    htmlTag: '<output>',
    variant: 'Over the held thumb',
    summary:
      'A small label over the thumb you’re dragging with its price right now, so you can stop at the exact amount without looking away.',
    aliases: ['value label', 'bubble', 'popover', 'the number above the dot'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted bubble',
        value: { light: 'background: #222222 · 12px · 600', dark: 'background: #f0f0f0 · 12px · 600' },
        plain:
          'The page’s colors turned around (dark on a light page, light on a dark one), small, with an arrow pointing down at its thumb.',
      },
      {
        kind: 'behavior',
        term: 'Only while dragging',
        value: 'fades in 150ms',
        plain: 'It appears when you take hold of a thumb and goes when you let go, so it’s never in the way otherwise.',
      },
      {
        kind: 'behavior',
        term: 'Stays in view',
        value: 'leans up to 14px left at the right end',
        plain: 'Near the right edge it shifts left so it isn’t cut off, while its arrow keeps pointing at the thumb.',
      },
    ],
  },
  {
    id: 'range-slider-histogram',
    name: 'Histogram',
    htmlTag: '<svg aria-hidden="true">',
    variant: 'Stays per $5 · 44 bars',
    summary:
      'Bars showing how many stays there are at each price, so you can see where most prices fall before you choose your range.',
    aliases: ['price distribution', 'bar chart', 'price graph', 'the bars above the slider'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Distribution bars',
        value: '44 bars · gap: 2px · border-radius: 2px 2px 0 0',
        plain:
          'One thin bar per $5, its height the number of stays at that price. The last one is taller: it holds everything from $235 up.',
      },
      {
        kind: 'appearance',
        term: 'In-range color',
        value: { light: '#e5533d in range · #dddddd outside', dark: '#ff7d64 in range · #3b3b3f outside' },
        plain: 'Bars between the thumbs are coral, the rest gray, which shows how much of the market the range keeps.',
      },
      {
        kind: 'behavior',
        term: 'Live highlight',
        value: 'background-color · 120ms',
        plain: 'As a thumb moves, the bars it passes change color at once, before you let go.',
      },
    ],
  },
  {
    id: 'range-slider-field',
    name: 'Min and max fields',
    htmlTag: '<input inputmode="numeric">',
    variant: 'Minimum $80 · Maximum $240+',
    summary: 'Two fields under the slider with the range in numbers. You can read the exact values, or type them.',
    aliases: ['price inputs', 'from and to', 'min and max boxes', 'number fields'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill fields',
        value: {
          light: 'height: 46px · border: 1px solid #b0b0b0 · border-radius: 999px',
          dark: 'height: 46px · border: 1px solid #4d4d52 · border-radius: 999px',
        },
        plain: 'Fully rounded boxes with a small gray label over the value, side by side with a dash between them.',
      },
      {
        kind: 'behavior',
        term: 'Two-way binding',
        plain:
          'They change while you drag, and typing a price moves the thumb: the slider for rough, the field for exact.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Every digit is the same width, so the prices don’t jiggle as they count.',
      },
    ],
  },
];
