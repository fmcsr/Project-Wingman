import type { UiElementSpec } from '../../../catalog';

/** Elements in the Kinetic activity screen, in the order they appear. `value` fields are the actual values from KineticApp. */
export const kineticSpecs: UiElementSpec[] = [
  {
    id: 'activity-rings',
    name: 'Activity rings',
    htmlTag: '<svg>',
    variant: 'Move · Exercise · Stand',
    summary:
      "Three progress rings, one inside the other, each filling toward a goal for the day. Closing all three is the day's aim, so one glance says how it's going.",
    aliases: ['close your rings', 'the rings', 'fitness rings', 'concentric progress rings', 'nested donut chart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Concentric progress rings',
        value: '156 × 156px · stroke-width: 18px · 2px apart',
        plain:
          'Each ring is a thick circle outline. The three sit inside each other with a thin line of black between them, so they read as one badge.',
      },
      {
        kind: 'appearance',
        term: 'Dark by design',
        value: 'background: #000',
        plain:
          "On a watch, black is the display switched off, so the bright ring colors seem to glow on their own. It stays black in the site's light theme too.",
      },
      {
        kind: 'behavior',
        term: 'Staggered draw-in',
        value: 'ease-out · 1.4s, 150ms apart',
        plain:
          "When the app opens, the rings sweep in from 12 o'clock one after another, fast at first and settling softly where the day stands.",
      },
      {
        kind: 'behavior',
        term: 'Close your rings',
        plain:
          'Each ring is a goal for the day: calories for Move, brisk minutes for Exercise, hours with a stand for Stand. The habit the app builds is closing all three, every day.',
      },
    ],
  },
  {
    id: 'move-ring',
    name: 'Move ring',
    htmlTag: '<circle>',
    variant: 'Active calories · 512 of 600',
    summary:
      "The outer, red ring: the active calories you've burned today, toward your move goal. It fills clockwise from 12 o'clock as the day goes on.",
    aliases: ['red ring', 'calorie ring', 'move goal', 'outer ring'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Angular gradient',
        value: '#e5104e → #ff4f8f',
        plain:
          'The ring starts a deeper red and turns pinker toward its end, which shows which way it runs and where it stops.',
      },
      {
        kind: 'appearance',
        term: 'Round end caps',
        value: '9px radius · half the 18px stroke',
        plain: 'Both ends of the colored arc are rounded, the soft shape every ring in the app has.',
      },
      {
        kind: 'behavior',
        term: 'Progress to angle',
        value: '512 / 600 = 85% → 307°',
        plain: 'The share of the goal sets how far round the ring goes: 85% of the calories is 85% of the circle.',
      },
    ],
  },
  {
    id: 'exercise-ring',
    name: 'Exercise ring',
    htmlTag: '<circle>',
    variant: 'Brisk minutes · 34 of 30 · closed',
    summary:
      'The middle, green ring: minutes of brisk activity today, toward a 30-minute goal. The evening run closed it, and it kept going.',
    aliases: ['green ring', 'exercise minutes', 'workout ring', 'middle ring'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Angular gradient',
        value: '#45d118 → #c2ff1d',
        plain: 'Green at the start, turning yellow-green toward the end: the brighter the color, the further along.',
      },
      {
        kind: 'behavior',
        term: 'Closed ring',
        value: '34 / 30 = 113% → 408°',
        plain:
          'At 30 minutes the ring meets its own start: it is closed. Past that it keeps going round over itself, so you can still see how far beyond the goal the day went.',
      },
      {
        kind: 'behavior',
        term: 'Pulse',
        value: 'filter: brightness(1.35) · 700ms ease-out',
        plain:
          'Once the ring is closed it brightens for a moment and settles: a quiet nod to the goal, without fireworks.',
      },
    ],
  },
  {
    id: 'stand-ring',
    name: 'Stand ring',
    htmlTag: '<circle>',
    variant: 'Hours with a stand · 9 of 12',
    summary:
      'The inner, cyan ring: the hours today in which you stood and moved around for at least a minute, toward 12. Three to go.',
    aliases: ['blue ring', 'stand hours', 'stand goal', 'inner ring'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Angular gradient',
        value: '#00b2e9 → #48f5e6',
        plain: 'Blue at the start, turning aqua toward the end.',
      },
      {
        kind: 'behavior',
        term: 'Whole hours',
        value: '9 / 12 = 75% → 270°',
        plain:
          'Unlike the other two, it grows in steps: each hour with a stand adds a twelfth of the circle, however long you stood.',
      },
      {
        kind: 'behavior',
        term: 'Stand reminder',
        plain:
          "Ten minutes before the hour, if you haven't stood yet, the watch taps your wrist and suggests a minute on your feet.",
      },
    ],
  },
  {
    id: 'ring-track',
    name: 'Track',
    htmlTag: '<circle>',
    variant: "A dark shade of each ring's color",
    summary:
      "The full circle in a dark shade under each ring. It stands for the whole goal, so you also see what's left to close.",
    aliases: ['ring background', 'empty ring', "what's left", 'groove'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tinted track',
        value: '#3b0a18 · #1f380a · #08333a',
        plain: "Each track is its ring's own color, much darker: clearly the same ring, clearly not done yet.",
      },
      {
        kind: 'appearance',
        term: 'Same circle, drawn twice',
        value: 'stroke-width: 18px',
        plain:
          'The track and the colored arc are the same circle at the same width, so the arc fills the track exactly as it grows.',
      },
    ],
  },
  {
    id: 'start-arrow',
    name: 'Start arrow',
    htmlTag: '<path>',
    variant: 'Arrow · double arrow · up arrow',
    summary:
      'The small glyph at the top of each ring. It marks where the ring starts and which way it fills, and tells the rings apart without their colors.',
    aliases: ['ring icon', 'arrow on the ring', 'ring glyph', 'direction arrow'],
    concepts: [
      {
        kind: 'appearance',
        term: 'One glyph per ring',
        value: '→ · →→ · ↑',
        plain:
          "An arrow for Move, a double arrow for Exercise and an arrow pointing up for Stand, so the rings can be told apart even by someone who can't tell red from green.",
      },
      {
        kind: 'appearance',
        term: 'Knocked out in black',
        value: 'stroke: #000 · 2.3px · round caps',
        plain:
          "Drawn in black on the ring's start, as if cut out of it. While a ring is still empty, its arrow shows in the ring's color on the track.",
      },
      {
        kind: 'behavior',
        term: "Fixed at 12 o'clock",
        plain: 'The arrow stays at the top while its ring fills, even once the ring runs past its goal and over it.',
      },
    ],
  },
  {
    id: 'ring-overlap',
    name: 'Ring overlap',
    htmlTag: '<circle>',
    variant: 'Exercise · 113%, past its goal',
    summary:
      "Past 100% a ring doesn't stop: it runs on over its own start, and its rounded end casts a soft shadow on the ring beneath, so you can see it has gone round again.",
    aliases: ['over 100%', 'second lap', 'the shadow on the ring', 'past the goal', 'end cap shadow'],
    concepts: [
      {
        kind: 'appearance',
        term: 'End cap shadow',
        value: 'black 75% · blur 3px · 3.5px ahead',
        plain:
          "A soft dark shadow just ahead of the rounded end makes it look lifted over the ring it covers. It's the detail that makes the rings feel real.",
      },
      {
        kind: 'appearance',
        term: 'clip-path',
        value: "the quarter of the ring's band ahead",
        plain: 'The shadow only falls on the ring itself, never on the black around it or on the rings next to it.',
      },
      {
        kind: 'behavior',
        term: 'Colors turn with the end',
        value: '113% → 408°, turned 48°',
        plain:
          'Past the goal, the colors turn with the end cap: it always leads in the brightest color, and the dark start slips underneath it.',
      },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    htmlTag: '<time>',
    variant: 'watchOS · over a scroll edge',
    summary:
      'The current time in the top-right corner. It belongs to the watch, not the app, and stays put while the screen scrolls under it.',
    aliases: ['clock', 'the time in the corner', 'status bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inside the curve',
        value: '15px · 600 · 20px from the edge',
        plain: "Set in from the corner, so the screen's rounded edge never cuts into it.",
      },
      {
        kind: 'behavior',
        term: 'Scroll edge',
        value: 'linear-gradient(#000 24px, transparent) · 32px',
        plain:
          'When the screen scrolls, whatever passes under the time fades into the black, so the time stays readable over rings and charts.',
      },
    ],
  },
  {
    id: 'ring-stats',
    name: 'Ring stats',
    htmlTag: '<dl>',
    variant: 'Value / goal + unit, in the ring colors',
    summary:
      "The numbers behind the rings, just below them: what you've done over the goal for each ring, with its unit.",
    aliases: ['figures', 'totals', 'value and goal', 'numbers under the rings', 'calories, minutes and hours'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color-coded figures',
        value: '#ff2e6c · #adf41b · #2ae2ef',
        plain: "Each figure takes its ring's color, so the colors are the legend and no key is needed.",
      },
      {
        kind: 'appearance',
        term: 'Rounded numerals',
        value: 'SF Compact Rounded · 26px · 600 · unit 17px',
        plain:
          'The figures are set in the rounded cut of the watch font, with the unit smaller and right after the number, without a space.',
      },
      {
        kind: 'behavior',
        term: 'Count-up',
        value: '0 → 512 · with the rings · tabular-nums',
        plain:
          "The numbers count up while the rings draw in, so both arrive at the same answer. Every digit is the same width, so they don't jitter on the way.",
      },
    ],
  },
  {
    id: 'hourly-chart',
    name: 'Hourly chart',
    variant: 'Bar chart · 24 bars, one per hour',
    summary:
      'The day hour by hour under each figure: calories, minutes, or the hours you stood. The bars add up to the figure above.',
    aliases: ['bar chart', 'hour by hour', 'histogram', 'the little bars', 'daily breakdown'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bars in the ring color',
        value: '3.5px wide · 24px tall · border-radius: 2px',
        plain:
          "Thin rounded bars in the ring's color. The busiest hour fills the chart's height and the others scale to it.",
      },
      {
        kind: 'appearance',
        term: 'Gridlines',
        value: 'dotted · 12 AM, 6 AM, 12 PM, 6 PM',
        plain:
          'Faint dotted lines every six hours, labeled underneath, so you can place the 6 PM run without counting bars.',
      },
      {
        kind: 'behavior',
        term: 'Grows with the ring',
        value: 'transform: scaleY(0 → 1)',
        plain: 'The bars rise from the baseline while the rings draw in, in step with the figure above them.',
      },
    ],
  },
  {
    id: 'scroll-indicator',
    name: 'Digital Crown scroll indicator',
    htmlTag: '<span>',
    variant: 'Beside the crown · while it turns',
    summary:
      'A short bar beside the Digital Crown that appears while you turn it. The white part shows where you are on the screen and how much of it fits on the display.',
    aliases: ['scroll bar', 'scroll position', 'the line by the crown', 'scroller'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and thumb',
        value: '4 × 44px · thumb 22px · rgb(255 255 255 / 0.25)',
        plain:
          "A dim track with a white thumb. The thumb is half the track because about half of the screen's content fits on the display at once.",
      },
      {
        kind: 'behavior',
        term: 'Turn the Digital Crown',
        value: '650ms · cubic-bezier(0.3, 1.25, 0.45, 1)',
        plain:
          'Turning the crown scrolls the screen and moves the thumb with it. Each turn settles with a slight overshoot, like a wheel coming to rest.',
      },
      {
        kind: 'behavior',
        term: 'Shows while scrolling',
        value: 'opacity: 0 → 1 · 200ms in, 400ms out',
        plain: 'It appears as the crown turns and fades a moment after it stops, so it never clutters the rings.',
      },
    ],
  },
];
