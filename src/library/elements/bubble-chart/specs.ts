import type { UiElementSpec } from '../../../catalog';

/** Parts of the Bubble chart element, in the order they appear. `value` fields are the actual values from BubbleChart. */
export const bubbleChartSpecs: UiElementSpec[] = [
  {
    id: 'bubble-chart',
    name: 'Bubble chart',
    htmlTag: '<figure>',
    variant: 'Effort × impact · sized by requests',
    summary:
      'A scatter plot whose dots are sized by a third number: each feature request sits at its effort and its impact, and its bubble grows with how many customers asked for it.',
    aliases: ['prioritization matrix', 'impact-effort matrix', '2×2', 'scatter plot with sizes', 'the bubbles chart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three numbers per dot',
        value: 'across: effort · up: impact · area: requests',
        plain:
          'Position says how hard and how valuable, size says how many asked, so the big bubble in the top left is the obvious next thing to build.',
      },
      {
        kind: 'behavior',
        term: 'Settles in',
        value: '520ms spring · 70ms apart',
        plain: 'The bubbles pop in one after another with a small overshoot, as if dropped onto the board.',
      },
      {
        kind: 'behavior',
        term: 'Live votes',
        value: 'Slack alerts: 64 → 71 → 79 requests',
        plain:
          'As customers vote, a bubble grows to its new size while a ring pulses out and the new votes rise from it, so the change catches the eye.',
      },
    ],
  },
  {
    id: 'bubble-chart-axis',
    name: 'Axes',
    variant: 'Effort across · impact up',
    summary:
      'The two scales the bubbles are placed on: effort along the bottom, from little to a lot, and impact up the side.',
    aliases: ['x-axis', 'y-axis', 'axis titles', 'the lines along the edges'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Axis lines',
        value: { light: '1px · #c9cdd3', dark: '1px · #3a3e46' },
        plain: 'Two hairlines meeting in the bottom-left corner, where both scores are lowest.',
      },
      {
        kind: 'appearance',
        term: 'Direction in the title',
        value: '"Effort →" · "Impact →" turned -90°',
        plain:
          'An arrow after each name says which way is more, and the side title reads upward as its scale does. There are no tick numbers: which quadrant matters more than the exact score.',
      },
    ],
  },
  {
    id: 'bubble-chart-quadrant',
    name: 'Quadrant guides',
    variant: 'Quick wins · Big bets · Fill-ins · Money pits',
    summary:
      'Two dashed lines through the middle of each scale that split the plot into four named zones, so every bubble comes with a verdict.',
    aliases: ['2×2 matrix', 'quadrant lines', 'threshold lines', 'the four boxes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dashed guides',
        value: { light: '1px dashed #d5d9de · at 5 on each scale', dark: '1px dashed #353940 · at 5 on each scale' },
        plain:
          'Dashed rather than solid because they mark a threshold, not data. They cross at the middle of both scales.',
      },
      {
        kind: 'appearance',
        term: 'Corner labels',
        value: '10px · 600 · in each outer corner',
        plain:
          'Each zone’s name sits in its far corner, away from the middle where bubbles crowd. Little effort and a lot of impact: Quick wins.',
      },
    ],
  },
  {
    id: 'bubble-chart-bubble',
    name: 'Bubble',
    variant: 'CSV export · 128 requests',
    summary: 'One feature request, placed by its effort and impact and sized by how many customers asked for it.',
    aliases: ['data point', 'circle', 'marker', 'dot'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sized by area',
        value: 'radius = 12px × √(requests ÷ 128)',
        plain:
          'Four times the requests make four times the area, twice the width. Sizing by width instead would make big numbers look far bigger than they are.',
      },
      {
        kind: 'appearance',
        term: 'Wash and edge',
        value: {
          light: 'oklch(0.6 0.1 190) · fill 26% · 1.5px edge',
          dark: 'oklch(0.68 0.1 192) · fill 26% · 1.5px edge',
        },
        plain: 'A light fill with a solid outline in one teal, so overlapping bubbles stay readable.',
      },
      {
        kind: 'behavior',
        term: 'Hover',
        value: 'fill 26% → 55% · 150ms',
        plain: 'The bubble under the pointer deepens and opens its tooltip.',
      },
      {
        kind: 'appearance',
        term: 'Direct labels',
        value: 'from 400px wide · 10px beside the bubble',
        plain:
          'With room to spare each bubble is named beside it, on its left near the right edge, so it can be read without hovering.',
      },
    ],
  },
  {
    id: 'bubble-chart-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'Name, requests and both scores',
    summary: 'The dark label under the bubble you point at: the feature, how many asked for it, and its two scores.',
    aliases: ['hover card', 'popover', 'data tip', 'hover label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted label',
        value: { light: 'background: #1c2024 · 11px', dark: 'background: #33363e · 11px' },
        plain: 'Dark with white text in both themes, so it reads over bubbles and guides alike.',
      },
      {
        kind: 'appearance',
        term: 'Exact numbers',
        value: '"CSV export · 128 requests" · "Impact 7.5 · Effort 2"',
        plain: 'The bubble shows roughly where and how big; the tooltip gives the precise values.',
      },
      {
        kind: 'behavior',
        term: 'Placed in open space',
        value: 'below the bubble · arrow on its edge',
        plain: 'It hangs under the bubble and reaches right over the empty middle, so it hides no other bubble.',
      },
    ],
  },
  {
    id: 'bubble-chart-legend',
    name: 'Size legend',
    variant: 'Nested · 100 and 25 requests',
    summary:
      'Two sample circles nested on a shared bottom and drawn to the chart’s own scale, so you can judge how many requests a bubble stands for.',
    aliases: ['bubble size key', 'scale legend', 'size key', 'the circles in the corner'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Nested samples',
        value: '21px and 10.6px across · 1px outline',
        plain:
          'The two circles share a bottom point, so the difference in size is easy to see, each with its number beside it.',
      },
      {
        kind: 'appearance',
        term: 'Same scale as the bubbles',
        value: 'radius = 12px × √(requests ÷ 128)',
        plain:
          'They’re drawn with the same rule as the bubbles: a bubble as big as the outer circle stands for about 100 requests.',
      },
    ],
  },
];
