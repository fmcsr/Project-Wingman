import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Activity rings element, in the order they appear. `value` fields are the actual values from
 * ActivityRings.
 */
export const activityRingsSpecs: UiElementSpec[] = [
  {
    id: 'activity-rings',
    name: 'Activity rings',
    htmlTag: '<svg>',
    variant: 'Move · Exercise · Stand',
    summary:
      'Three progress rings, one inside the other, each filling toward a goal for the day. Closing all three is the point, so a glance tells you how the day is going.',
    aliases: ['the rings', 'fitness rings', 'nested progress circles', 'concentric donut chart', 'close your rings'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Concentric progress rings',
        value: 'stroke-width: 11.5 of 100 · 1.2 apart',
        plain:
          'Each ring is a thick circle outline. The three sit inside each other with a hairline of black between them, so they read as one badge.',
      },
      {
        kind: 'appearance',
        term: 'Dark by design',
        value: 'background: #000',
        plain:
          'The card stays black in the light theme too, as in the app: the bright ring colors are made to glow on black.',
      },
      {
        kind: 'behavior',
        term: 'Staggered draw-in',
        value: 'ease-out · 1.3s, 160ms apart',
        plain:
          "When the card appears, the rings sweep in from 12 o'clock one after another, fast at first and settling softly into place.",
      },
    ],
  },
  {
    id: 'activity-rings-move',
    name: 'Progress ring',
    htmlTag: '<circle>',
    variant: 'Move · 512 of 600 calories',
    summary:
      "One ring: a dark track for the whole goal and a bright arc for how far you are, starting at 12 o'clock and going clockwise.",
    aliases: ['ring', 'circular progress bar', 'progress circle', 'the red ring'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track',
        value: '#3b0b18',
        plain:
          "The full circle in a dark shade of the ring's color stands for the whole goal, so you also see what's left.",
      },
      {
        kind: 'appearance',
        term: 'Angular gradient',
        value: '#e3134d → #ff4b8c',
        plain:
          'The arc starts a deeper red and turns pinker toward its end, which shows the way it runs and where it stops.',
      },
      {
        kind: 'appearance',
        term: 'stroke-linecap: round',
        value: 'round',
        plain: 'Both ends of the arc are rounded, the soft shape of every ring in the app.',
      },
      {
        kind: 'behavior',
        term: 'Progress to angle',
        value: '512 / 600 = 85% → 307°',
        plain: 'The share of the goal sets how far round the arc goes: 85% of the calories is 85% of the circle.',
      },
    ],
  },
  {
    id: 'activity-rings-overlap',
    name: 'Ring overlap',
    htmlTag: '<circle>',
    variant: 'Exercise · 34 of 30 minutes (113%)',
    summary:
      "Past 100% a ring doesn't stop: it runs on over its own start, and its rounded end casts a small shadow on the ring below, so you can see it has gone round again.",
    aliases: ['over 100%', 'second lap', 'the shadow on the ring', 'ring going past the goal', 'end cap'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Progress past the goal',
        value: '34 / 30 = 113% → 408°',
        plain:
          "The arc runs on past 12 o'clock. Its colors turn with it, so the leading end is always the brightest and the darker start slips underneath.",
      },
      {
        kind: 'appearance',
        term: 'End cap shadow',
        value: 'black 85% · blur 2.3 · 2.8 ahead (of 100)',
        plain:
          "A soft dark shadow just ahead of the rounded end makes it look lifted over the ring it covers. It's the detail that makes the rings feel real.",
      },
      {
        kind: 'appearance',
        term: 'clip-path',
        value: "the ring's own band",
        plain: 'The shadow only falls on the ring itself, never on the black around it or on the rings next to it.',
      },
    ],
  },
  {
    id: 'activity-rings-figures',
    name: 'Ring stats',
    htmlTag: '<dl>',
    variant: 'Value / goal + unit, in the ring colors',
    summary:
      "The numbers behind the rings: what you've done over the goal, with its unit, each in its ring's color. On a wide card each one also shows the day hour by hour.",
    aliases: ['figures', 'legend', 'numbers next to the rings', 'stats', 'value and goal'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color-coded figures',
        value: '#ff2f69 · #b2f51c · #31e4f0',
        plain: "Each figure takes its ring's color, so the colors are the legend and no key is needed.",
      },
      {
        kind: 'appearance',
        term: 'Rounded numerals',
        value: 'ui-rounded · 600 · 15–21px · unit 0.72em',
        plain:
          'The numbers are set in the rounded cut of the system font, with the unit smaller right after them, as in the app.',
      },
      {
        kind: 'behavior',
        term: 'Count-up',
        value: '0 → 512 · 1.3s ease-out · tabular-nums',
        plain:
          "The numbers count up while the rings draw in, so both arrive at the same answer. Every digit is the same width, so they don't jitter on the way.",
      },
      {
        kind: 'appearance',
        term: 'Hourly bar chart',
        value: '24 bars · 26px tall',
        plain:
          'On a wide card each figure gets its day hour by hour: calories, minutes, and the hours you stood. The bars add up to the figure.',
      },
    ],
  },
];
