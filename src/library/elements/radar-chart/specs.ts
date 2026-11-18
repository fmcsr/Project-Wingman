import type { UiElementSpec } from '../../../catalog';

/** Parts of the Radar chart element, in the order they appear. `value` fields are the actual values from RadarChart. */
export const radarChartSpecs: UiElementSpec[] = [
  {
    id: 'radar-chart',
    name: 'Radar chart',
    htmlTag: '<svg>',
    variant: 'Two products · six axes · 0–100',
    summary:
      'Several scores drawn on spokes from a center and joined into a shape: each product becomes a polygon, so strengths and weak spots read as bulges and dents, and two shapes compare at a glance.',
    aliases: ['spider chart', 'spider web', 'star chart', 'web chart', 'the stats hexagon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'One scale on every axis',
        value: '0 at the center · 100 at 60px out',
        plain:
          'Every spoke runs from 0 in the middle to 100 at the edge. The shapes only compare fairly when all six scores share that scale.',
      },
      {
        kind: 'appearance',
        term: 'Translucent overlap',
        value: 'fill-opacity: 0.16 · 2px edges',
        plain: 'Both shapes are light washes with solid edges, so where they overlap you still see both outlines.',
      },
      {
        kind: 'behavior',
        term: 'Grows from the center',
        value: '750ms · Harbor 160ms after Kite',
        plain: 'Each polygon grows out of the middle to its scores, one product after the other.',
      },
    ],
  },
  {
    id: 'radar-chart-legend',
    name: 'Legend',
    variant: 'Swatches · a score table on wider screens',
    summary:
      'Says which shape is which product. With room beside the chart it becomes a small table of every score, the higher one of each pair in bold.',
    aliases: ['key', 'series labels', 'color key', 'the little colored squares'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Swatch like the mark',
        value: '10px · 1.5px border · 22% fill',
        plain:
          'Each swatch is a tiny version of its polygon, a wash with a solid edge, so the key looks like what it explains.',
      },
      {
        kind: 'appearance',
        term: 'Score table',
        value: 'from 400px wide · the higher score in 600 weight',
        plain:
          'On a wider card the legend lists the six scores side by side, so exact numbers are there without hovering anything.',
      },
      {
        kind: 'behavior',
        term: 'Follows the highlight',
        value: 'the other product: opacity 0.35',
        plain: 'When one product is in focus, the other fades in the legend as well as in the chart.',
      },
    ],
  },
  {
    id: 'radar-chart-grid',
    name: 'Grid rings',
    variant: 'Five hexagons, every 20 points',
    summary:
      'The nested hexagons behind the shapes, one every 20 points, so you can tell an 80 from a 60 without reading a number.',
    aliases: ['web', 'rings', 'concentric gridlines', 'the background hexagons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Polygonal gridlines',
        value: { light: '1px · #e3e6ea · the 100 ring #cfd3d8', dark: '1px · #2e3138 · the 100 ring #3b3f47' },
        plain:
          'Straight-sided rings instead of circles, so the shapes’ edges run parallel to them. Only the outer ring, the maximum, is a step darker.',
      },
      {
        kind: 'appearance',
        term: 'Recessive grid',
        value: 'hairline gray, no labels',
        plain:
          'Thin and pale, it guides the eye without competing with the data; the exact scores live in the tooltip and the legend.',
      },
    ],
  },
  {
    id: 'radar-chart-axis',
    name: 'Spoke',
    htmlTag: '<line>',
    variant: 'Six axes, 60° apart',
    summary: 'A line from the center to the edge for each quality being rated, its name just outside the outer ring.',
    aliases: ['axis', 'radial axis', 'category axis', 'the lines from the middle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Evenly spaced',
        value: '60° apart · clockwise from the top',
        plain:
          'Six qualities split the circle evenly. Neighbors share an edge of every shape, so placing related qualities side by side makes the shapes easier to read.',
      },
      {
        kind: 'appearance',
        term: 'Labels outside the ring',
        value: '10.5px · 9px out · anchored away from the center',
        plain:
          'Names on the left end at the ring and names on the right start at it, so a long word like Reliability never crosses the chart.',
      },
    ],
  },
  {
    id: 'radar-chart-series',
    name: 'Series polygon',
    htmlTag: '<polygon>',
    variant: 'Kite, our app · Harbor, the competitor',
    summary:
      'One product’s six scores joined into a shape. A big, even shape is good all round; a dent shows a weak spot, like Kite’s price.',
    aliases: ['series', 'area', 'data shape', 'the blue shape'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Series colors',
        value: {
          light: 'Kite oklch(0.55 0.17 258) · Harbor oklch(0.66 0.16 50)',
          dark: 'Kite oklch(0.64 0.15 256) · Harbor oklch(0.65 0.15 50)',
        },
        plain: 'A blue and an orange: opposite in hue, and still far apart for color-blind readers.',
      },
      {
        kind: 'behavior',
        term: 'Highlight on hover',
        value: 'fill-opacity: 0.16 → 0.28 · the other: opacity 0.35',
        plain: 'Pointing at a shape brings it forward with its scores on its corners and fades the other one back.',
      },
    ],
  },
  {
    id: 'radar-chart-vertex',
    name: 'Vertex',
    htmlTag: '<circle>',
    variant: 'Support · Kite 91',
    summary: 'A corner of a shape: one product’s score on one axis, a dot where the polygon meets the spoke.',
    aliases: ['data point', 'point', 'marker', 'the dots on the corners'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ringed dot',
        value: 'r: 3 · 1.5px ring in the page color',
        plain: 'A ring in the background color keeps each dot clear where lines cross.',
      },
      {
        kind: 'behavior',
        term: 'Grows on hover',
        value: 'scale(1.6) · 180ms',
        plain: 'The point under the pointer grows and opens a tooltip with both products’ scores on that axis.',
      },
      {
        kind: 'behavior',
        term: 'Scores on the corners',
        value: '21 × 14 pills · 9.5px · 600',
        plain: 'While a product is highlighted, its dots turn into small labels with the scores, as on a player card.',
      },
    ],
  },
  {
    id: 'radar-chart-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'One axis, both products',
    summary:
      'The dark label for the point under the pointer: the axis, then each product’s score on it, so one hover compares the two.',
    aliases: ['hover card', 'popover', 'hover label', 'data tip'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Line keys',
        value: '10 × 2.5px in the series color',
        plain:
          'Each row starts with a short stroke of its product’s color, like the polygon’s edge, then the name and the score.',
      },
      {
        kind: 'behavior',
        term: 'Every series at once',
        value: 'Kite 91 · Harbor 63',
        plain: 'It lists both products, not only the one you pointed at, so the comparison is right there.',
      },
      {
        kind: 'appearance',
        term: 'Out of the way',
        value: 'below and right of the point',
        plain: 'It opens in the empty corner under the Support label, so it covers neither shape.',
      },
    ],
  },
];
