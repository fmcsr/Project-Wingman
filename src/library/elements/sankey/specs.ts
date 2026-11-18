import type { UiElementSpec } from '../../../catalog';

/** Parts of the Sankey diagram element, in the order they appear. `value` fields are the actual values from Sankey. */
export const sankeySpecs: UiElementSpec[] = [
  {
    id: 'sankey',
    name: 'Sankey diagram',
    htmlTag: '<svg>',
    variant: 'Income statement · 12 nodes, 11 flows',
    summary:
      'A flow chart where every band is as thick as the amount it carries, so you can follow money from where it comes in to where it ends up and see at a glance where most of it goes.',
    aliases: ['flow diagram', 'money flow chart', 'income statement chart', 'alluvial diagram', 'river chart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Width encodes amount',
        value: '$5.8B of revenue = 150px',
        plain: 'A band twice as thick carries twice the money, so the biggest flows are the first thing you see.',
      },
      {
        kind: 'appearance',
        term: 'Color by kind',
        value: {
          light: 'profit #0b8f68 · cost #d33a3c · revenue oklch(0.56 0.04 258)',
          dark: 'profit #22b07f · cost #e5534f · revenue oklch(0.68 0.035 258)',
        },
        plain:
          'Flows take the color of where they go: green for what the company keeps, red for what it spends and slate for money coming in.',
      },
      {
        kind: 'behavior',
        term: 'Flow conservation',
        value: 'in = out at every node',
        plain:
          'What flows into a node equals what flows out: $3.8B of gross profit becomes $1.4B of operating profit and $2.4B of expenses.',
      },
    ],
  },
  {
    id: 'sankey-node',
    name: 'Node',
    htmlTag: '<rect>',
    variant: 'A 6px bar as tall as its total',
    summary:
      'A stage the money passes through, such as Revenue or Gross profit: a thin bar as tall as everything that flows through it.',
    aliases: ['bar', 'stage', 'category', 'step', 'box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Columns by stage',
        value: 'streams → revenue → gross profit → operating profit → net income',
        plain: 'Nodes line up in columns, one per step of the income statement, read from left to right.',
      },
      {
        kind: 'appearance',
        term: 'Profit on top',
        value: 'profit nodes top-aligned · costs below, 8–18px apart',
        plain:
          'Profit nodes run along the top and costs drop away underneath, so the road to net income is the top edge of the diagram.',
      },
    ],
  },
  {
    id: 'sankey-link',
    name: 'Link',
    htmlTag: '<path>',
    variant: 'A band as thick as its amount',
    summary: 'One flow from a node to the next: a curved band whose thickness is the amount, so big flows look big.',
    aliases: ['flow', 'band', 'ribbon', 'edge', 'the colored stream'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bézier band',
        value: 'control points halfway across',
        plain:
          'Each band leaves its node level, bends in a gentle S halfway across and arrives level, so the flows are easy to follow.',
      },
      {
        kind: 'appearance',
        term: 'Translucent fill',
        value: 'fill-opacity: 0.32',
        plain: 'Bands are see-through in their color, so the solid node bars stand out as the stops along the way.',
      },
      {
        kind: 'behavior',
        term: 'Stacked ends',
        value: 'in a fixed order from the top of each node',
        plain:
          'Flows leave a node stacked from its top and arrive stacked the same way, so two bands never share an edge.',
      },
    ],
  },
  {
    id: 'sankey-path',
    name: 'Highlighted path',
    htmlTag: '<g>',
    variant: 'Subscriptions → Net income',
    summary:
      'One route through the diagram, lit from start to end while everything else fades back, to tell one story: how subscription money ends up as profit.',
    aliases: ['focus path', 'trace', 'lineage', 'selected flow', 'highlighted route'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Focus and fade',
        value: 'path 0.62 · other flows 0.1 · other nodes 40%',
        plain:
          'The flows on the path get stronger and the rest fade to a whisper, so the path stands out without losing the whole.',
      },
      {
        kind: 'behavior',
        term: 'Walk the path',
        value: 'one flow every 650ms',
        plain: 'The highlight moves along a flow at a time, so the eye follows the money from start to finish.',
      },
    ],
  },
  {
    id: 'sankey-label',
    name: 'Node label',
    htmlTag: '<text>',
    variant: 'Name and value',
    summary:
      'Each node’s name with its amount, set beside or above the node, so every figure in the statement reads without hovering.',
    aliases: ['data label', 'caption', 'the names and numbers', 'value label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Name over value',
        value: '11px · name 600 · value 500, muted',
        plain:
          'The name is in the text color with the amount quieter under it, or after it where there is only room for one line.',
      },
      {
        kind: 'appearance',
        term: 'Placed by column',
        value: 'streams left · profit above · the rest right',
        plain:
          'Labels go where the flows aren’t: stream names left of their bars, profit nodes above theirs and the rest to the right.',
      },
    ],
  },
  {
    id: 'sankey-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'Amount and share of revenue',
    summary:
      'A small dark badge on the flow the highlight has reached: how much money it carries and what share of revenue that is.',
    aliases: ['hover label', 'flow details', 'popup', 'info bubble'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted label',
        value: { light: 'background: #1d2026', dark: 'background: #33373f' },
        plain: 'Dark with white text in both themes, so it reads over any flow color.',
      },
      {
        kind: 'behavior',
        term: 'Follows the flow',
        value: 'transform · 250ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain:
          'It sits on the middle of its flow, clear of the node labels, and slides on to the next flow as the highlight walks.',
      },
      {
        kind: 'appearance',
        term: 'Share of the total',
        value: '$1.1B · 19% of revenue',
        plain:
          'Next to the amount, its share of revenue. For net income that’s the net margin, the number analysts look for first.',
      },
    ],
  },
];
