import type { UiElementSpec } from '../../../catalog';

/** Parts of the Funnel chart element, in the order they appear. `value` fields are the actual values from Funnel. */
export const funnelSpecs: UiElementSpec[] = [
  {
    id: 'funnel',
    name: 'Funnel chart',
    htmlTag: '<figure>',
    variant: 'Four steps · the last 30 days',
    summary:
      'How many people make it through each step of a flow, from visiting to paying. Each bar is the people who reached that step, so the shape shows where the flow leaks.',
    aliases: ['conversion funnel', 'drop-off chart', 'step chart', 'pipeline chart', 'the shrinking bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Relative to the first step',
        value: '12,480 = 100% · 8.6% reach Paid',
        plain:
          'Every bar is measured against the first step, so the last bar’s height is the share of visitors who end up paying.',
      },
      {
        kind: 'behavior',
        term: 'Staggered grow-in',
        value: 'scaleY 0 → 1 · 650ms ease-out, 110ms apart',
        plain:
          'The bars rise from the baseline one after another, left to right, the way people move through the steps.',
      },
      {
        kind: 'appearance',
        term: 'Overall conversion',
        value: '8.6% overall',
        plain: 'The headline in the corner: the share of the first step that reached the last.',
      },
    ],
  },
  {
    id: 'funnel-bar',
    name: 'Step bar',
    htmlTag: '<rect>',
    variant: 'The people who reached the step',
    summary: 'One step of the flow: a solid bar as tall as the number of people who got this far.',
    aliases: ['bar', 'column', 'step', 'stage'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Solid fill',
        value: { light: 'oklch(0.55 0.19 262)', dark: 'oklch(0.66 0.16 262)' },
        plain: 'One blue for everyone who made it, the same in every step, so the bars compare by height alone.',
      },
      {
        kind: 'behavior',
        term: 'Hover focus',
        value: 'other steps at 55% opacity',
        plain: 'Pointing at a step keeps it bright, dims the others and opens its tooltip.',
      },
    ],
  },
  {
    id: 'funnel-rate',
    name: 'Conversion rate',
    htmlTag: '<span>',
    variant: 'Step to step · 44%, 61%, 32%',
    summary: 'The share of people who made it from one step to the next, in a small pill between the two bars.',
    aliases: ['conversion %', 'step conversion', 'pass-through rate', 'the percentage between the bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill between columns',
        value: '10.5px, 600 · 1px border · level with the drop-off',
        plain:
          'It sits on the line between two steps, at the height of the drop-off it explains, so each number points at its own leak.',
      },
      {
        kind: 'behavior',
        term: 'Step to step, not overall',
        value: '3,350 ÷ 5,491 = 61%',
        plain:
          'Each step is divided by the one before it, not by the first, so you can see which step loses the most people.',
      },
    ],
  },
  {
    id: 'funnel-dropoff',
    name: 'Drop-off',
    htmlTag: '<rect>',
    variant: 'Lost since the step before, shaded',
    summary:
      'The people who reached the step before but not this one, shaded on top of the bar, so each column is as tall as the step before it.',
    aliases: ['leak', 'lost users', 'churn', 'the light part above the bar', 'abandonment'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tint of the bar color',
        value: { light: 'oklch(0.93 0.035 262)', dark: 'oklch(0.32 0.06 262)' },
        plain:
          'A pale version of the bar’s blue: the same kind of people, the ones who left, so bar and drop-off read as one column.',
      },
      {
        kind: 'appearance',
        term: 'Stacked on the bar',
        value: 'bar + drop-off = the step before',
        plain: 'Together they’re exactly as tall as the previous step, so the shaded part is the loss at a glance.',
      },
    ],
  },
  {
    id: 'funnel-label',
    name: 'Step label',
    htmlTag: '<text>',
    variant: 'Name and count',
    summary: 'Each step’s name under its bar, with how many people reached it.',
    aliases: ['x-axis label', 'step name', 'category label', 'the names under the bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Name over count',
        value: '10–11px · name 500 · count muted, tabular-nums',
        plain: 'The step’s name in the text color with its count quieter under it, centered on the bar.',
      },
    ],
  },
  {
    id: 'funnel-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'Converted and dropped off',
    summary:
      'A small card for the step under the pointer: its conversion rate, how many people made it from the step before and how many dropped off.',
    aliases: ['hover card', 'details popup', 'info box', 'step details'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Legend keys',
        value: 'solid and tinted 8px squares',
        plain: 'Each row starts with a small square in its color, tying the numbers to the bar and its drop-off.',
      },
      {
        kind: 'behavior',
        term: 'Over the empty space',
        value: 'top of the chart · slides 200ms',
        plain:
          'It sits along the top of the chart, where the later steps leave room, over the hovered step, and slides along when the pointer moves to another one.',
      },
      {
        kind: 'appearance',
        term: 'Raised card',
        value: {
          light: 'background: #fff · border: 1px solid #dfe2e7 · border-radius: 8px',
          dark: 'background: #23262d · border: 1px solid #343841 · border-radius: 8px',
        },
        plain: 'A small card with a soft shadow that floats over the chart.',
      },
    ],
  },
];
