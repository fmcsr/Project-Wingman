import type { UiElementSpec } from '../../../catalog';

/** Parts of the Gauge element, in the order they appear. `value` fields are the actual values from Gauge. */
export const gaugeSpecs: UiElementSpec[] = [
  {
    id: 'gauge',
    name: 'Gauge',
    htmlTag: '<div role="meter">',
    variant: 'Half circle · 300 to 850 in five zones',
    summary:
      'A dial that shows one number on a fixed scale, like a speedometer: where the marker stands on the arc says how good the score is before you read it.',
    aliases: ['dial', 'speedometer chart', 'score meter', 'half donut', 'the credit score arc'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Semicircular arc',
        value: '180° · stroke-width: 13 of 200',
        plain:
          'The scale is bent into a half circle: the lowest score at the left end, the highest at the right, so a better score sits further round.',
      },
      {
        kind: 'behavior',
        term: 'Value to angle',
        value: '(742 − 300) / (850 − 300) = 80% → 145°',
        plain:
          "The marker's place on the arc is the score's share of the scale: 742 is 80% of the way from 300 to 850, so it sits 80% of the way round.",
      },
      {
        kind: 'appearance',
        term: 'Min and max labels',
        value: '300 · 850 · 11px, muted',
        plain: "The two ends of the scale are written under the arc's ends, so the number has a frame of reference.",
      },
    ],
  },
  {
    id: 'gauge-zone',
    name: 'Zone',
    htmlTag: '<path>',
    variant: 'Five zones, Very poor to Excellent',
    summary:
      "One stretch of the arc in its own color, standing for a named range of scores: red for Very poor up to green for Excellent. The zone the marker sits in is the score's band.",
    aliases: ['color band', 'segment', 'score range', 'the red part', 'threshold'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color-coded ranges',
        value: {
          light: 'oklch(0.6 0.19 25) → oklch(0.6 0.15 152)',
          dark: 'oklch(0.65 0.18 25) → oklch(0.68 0.15 155)',
        },
        plain: 'Five colors from red through orange and amber to green, so good and bad read before any number does.',
      },
      {
        kind: 'appearance',
        term: 'Proportional zones',
        value: '300–499 · 500–600 · 601–660 · 661–780 · 781–850',
        plain:
          'Each zone is as long as the range of scores it covers, so Very poor takes over a third of the arc and Fair only a sliver.',
      },
      {
        kind: 'appearance',
        term: 'Segment gaps',
        value: '3 of 200 between zones · rounded outer ends',
        plain:
          "A thin gap in the card's color separates the zones; only the two ends of the whole arc are rounded, so it still reads as one scale.",
      },
    ],
  },
  {
    id: 'gauge-marker',
    name: 'Marker',
    htmlTag: '<circle>',
    variant: 'A dot on the arc at the score',
    summary:
      'The dot that points at the score on the arc, the way a needle does on a speedometer. It moves; the scale stays put.',
    aliases: ['needle', 'pointer', 'indicator', 'the dot on the dial', 'thumb'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ringed dot',
        value: 'r: 9.5 of 200 · 3.5 ring · drop-shadow(0 1px 2px rgb(0 0 0 / 0.28))',
        plain:
          "A disc in the card's color, ringed in the text color and a little wider than the arc, so it stands out on any zone.",
      },
      {
        kind: 'behavior',
        term: 'Sweep-in',
        value: '300 → 742 · 1.5s ease-out',
        plain:
          'When the card opens, the marker sweeps round from the lowest score, fast at first and settling softly into place, while the figure counts up with it.',
      },
      {
        kind: 'behavior',
        term: 'Animated update',
        value: '742 → 748 · 0.8s ease-out',
        plain: 'When a new report comes in, the marker glides from the old score to the new one instead of jumping.',
      },
    ],
  },
  {
    id: 'gauge-value',
    name: 'Value',
    htmlTag: '<span>',
    variant: '742, counting up',
    summary:
      "The score itself, large in the middle of the dial: it's the number people came for, so it's the biggest thing on the card.",
    aliases: ['big number', 'score', 'readout', 'the 742'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Hero figure',
        value: "font-size: 22.5% of the dial's width (44–56px) · 700",
        plain: 'Bold and big, sized with the dial so it always fills the space under the arc without touching it.',
      },
      {
        kind: 'behavior',
        term: 'Count-up',
        value: 'tabular-nums · in step with the marker',
        plain:
          "The figure counts up as the marker sweeps, so both arrive together. Every digit is the same width, so it doesn't jitter on the way.",
      },
    ],
  },
  {
    id: 'gauge-band',
    name: 'Band label',
    htmlTag: '<span>',
    variant: "Good · with the zone's color",
    summary: 'The name of the zone the score falls in, under the figure: Good says more to most people than 742.',
    aliases: ['rating', 'grade', 'score range name', 'the Good under the number'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color key dot',
        value: "8px dot in the zone's color · 13px, 600",
        plain:
          "A small dot in the zone's color ties the word to the arc, while the word stays in the text color so it's easy to read.",
      },
      {
        kind: 'behavior',
        term: 'Shown on landing',
        value: 'opacity 0 → 1 · 220ms',
        plain:
          "It fades in once the marker has landed, so it doesn't flicker through Very poor, Poor and Fair on the way up.",
      },
    ],
  },
  {
    id: 'gauge-change',
    name: 'Change badge',
    htmlTag: '<span>',
    variant: '+6 pts since the last report',
    summary:
      'A small pill saying how far the score moved since the last report, with an arrow for the direction: green and up here.',
    aliases: ['delta', 'trend badge', 'the +6', 'up arrow', 'score change'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Delta pill',
        value: {
          light: 'color: #0b7a55 · background: #e1f5ec · 22px tall',
          dark: 'color: #4fd6a2 · background: rgb(79 214 162 / 0.14) · 22px tall',
        },
        plain:
          'Green text and an up arrow on a pale green pill: a gain. A drop would be red, with the arrow pointing down.',
      },
      {
        kind: 'behavior',
        term: 'Pop-in',
        value: 'scale 0.8 → 1 · 320ms with overshoot · 1.14 on refresh',
        plain: 'It springs in once the score has landed, and pops once more when a new report brings another change.',
      },
    ],
  },
];
