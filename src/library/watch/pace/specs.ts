import type { UiElementSpec } from '../../../catalog';

/** Elements in the Pace workout screen, in the order they appear. `value` fields are the actual values from PaceApp. */
export const paceSpecs: UiElementSpec[] = [
  {
    id: 'goal-ring',
    name: 'Goal ring',
    htmlTag: '<svg>',
    variant: '5 km goal · 85% there',
    summary:
      'A ring around the workout icon that fills as you close in on the goal you set before starting, here 5 kilometers.',
    aliases: ['progress ring', 'goal progress', 'the circle in the corner', 'workout goal'],
    concepts: [
      {
        kind: 'appearance',
        term: 'stroke-dasharray',
        value: 'pathLength="100" · stroke-dasharray: 85.4 100',
        plain:
          "The ring is a circle's outline drawn as a single dash. Counting the outline as 100 makes the dash's length the percentage: 4.27 of 5 km is 85.4.",
      },
      {
        kind: 'appearance',
        term: 'Track',
        value: 'rgb(63 216 240 / 0.25)',
        plain: 'A dim version of the ring shows the whole lap, so you can see how much is left.',
      },
      {
        kind: 'behavior',
        term: 'Goal alert',
        plain:
          'When the ring closes, the watch taps your wrist to say the goal is reached. The workout keeps recording until you end it.',
      },
    ],
  },
  {
    id: 'workout-icon',
    name: 'Workout icon',
    htmlTag: '<svg>',
    variant: 'Outdoor run',
    summary: 'The small runner in the top-left corner says which workout is being recorded: an outdoor run.',
    aliases: ['activity icon', 'workout type', 'sport icon', 'the little runner'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Glyph',
        value: '14 × 14px · #3fd8f0',
        plain:
          "A small solid figure in the app's color. On a black screen a filled shape reads at a glance, where a thin outline would get lost.",
      },
      {
        kind: 'behavior',
        term: 'Workout type',
        plain:
          'Every workout type has its own glyph and its own metrics: a run counts pace and distance, a pool swim counts laps.',
      },
    ],
  },
  {
    id: 'clock',
    name: 'Time',
    htmlTag: '<time>',
    variant: 'watchOS',
    summary: 'The current time in the top-right corner. It belongs to the watch, not the app, and shows in every app.',
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
        term: 'System element',
        plain: "The watch draws it, not the app, like the time in a phone's status bar. Apps leave room for it.",
      },
    ],
  },
  {
    id: 'workout-view',
    name: 'Workout view',
    variant: 'Metrics · five per screen',
    summary:
      'The page of live numbers you see while you run: the elapsed time and four metrics, one per line, big enough to read mid-stride.',
    aliases: ['metrics screen', 'workout screen', 'stats', 'live metrics', 'the numbers'],
    concepts: [
      {
        kind: 'appearance',
        term: 'One metric per line',
        value: 'flex-direction: column · align-items: flex-start',
        plain: 'Each figure gets its own line, all lined up on the left, so your eye runs straight down the list.',
      },
      {
        kind: 'appearance',
        term: 'Glanceable type',
        value: '30px figures · 11px labels',
        plain:
          'Big figures and small labels: mid-run you glance for a number, and you already know which line is which.',
      },
      {
        kind: 'behavior',
        term: 'Customizable',
        plain: 'People choose which metrics show, and in what order, for each type of workout in the settings.',
      },
    ],
  },
  {
    id: 'elapsed-time',
    name: 'Elapsed time',
    htmlTag: '<span role="timer">',
    variant: 'Stopwatch with hundredths',
    summary:
      "How long you've been running, counting up. It's the biggest figure on screen and the only yellow one, so it's what you see first.",
    aliases: ['duration', 'workout timer', 'stopwatch', 'total time', 'the yellow time'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color as meaning',
        value: '#ffd60a',
        plain:
          'Yellow always means time on this screen, while the other figures stay white. A color that never changes its meaning can be read without a label.',
      },
      {
        kind: 'appearance',
        term: 'Tabular numerals',
        value: 'font-variant-numeric: tabular-nums',
        plain: "Every digit is the same width, so the time doesn't jiggle sideways as it counts.",
      },
      {
        kind: 'appearance',
        term: 'Largest figure',
        value: '40px · 600 vs. 30px · 500',
        plain: 'A size and a weight above the metrics: the one number every workout has comes first.',
      },
      {
        kind: 'behavior',
        term: 'Always On',
        value: 'hundredths → whole seconds',
        plain:
          'With your wrist raised the hundredths race by. Lower it and the screen dims: the hundredths go and the time updates once a second, to save battery.',
      },
    ],
  },
  {
    id: 'heart-rate',
    name: 'Heart rate',
    variant: 'Live, in BPM',
    summary: 'Your pulse right now, in beats per minute, measured by the sensor on the back of the watch.',
    aliases: ['BPM', 'pulse', 'HR', 'beats per minute'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Same as its neighbors',
        value: '30px · 500 · #fff',
        plain: 'The figure looks like every other metric; only the red heart after it marks it out.',
      },
      {
        kind: 'behavior',
        term: 'Live reading',
        plain: 'A new reading comes in every few seconds, so the number trails your effort by a moment.',
      },
      {
        kind: 'behavior',
        term: 'Heart rate zones',
        plain:
          'The same reading drives a view of its own that splits your effort into five zones, from easy to all-out, and times each one.',
      },
    ],
  },
  {
    id: 'unit-label',
    name: 'Unit label',
    variant: 'Small uppercase beside the figure',
    summary: 'The small uppercase words after each figure say what it measures: BPM, ACTIVE KCAL, AVG PACE, KM.',
    aliases: ['unit', 'label', 'caption', 'the small text next to the numbers'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Uppercase labels',
        value: '11px · 600 · text-transform: uppercase',
        plain: 'Small uppercase letters read as labels, never as numbers, and fit in very little space.',
      },
      {
        kind: 'appearance',
        term: 'Stacked label',
        value: 'ACTIVE / KCAL · line-height: 11px',
        plain: 'A two-word label stacks into two short lines, so the row stays one line tall.',
      },
      {
        kind: 'appearance',
        term: 'last baseline',
        value: 'align-items: last baseline',
        plain: "The label's bottom line sits on the figure's baseline, so the two read as one line of text.",
      },
    ],
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat icon',
    htmlTag: '<svg>',
    variant: 'Red heart',
    summary: 'The small red heart after the heart rate. It says the number comes from your pulse, live.',
    aliases: ['heart icon', 'pulse icon', 'the beating heart', 'the red heart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Semantic color',
        value: '#ff375f',
        plain: 'Red is kept for the heart, so the one metric that comes from your body stands out from the rest.',
      },
      {
        kind: 'behavior',
        term: 'Pulse animation',
        plain:
          'In a live app the heart swells once per beat, at your rate. It holds still on the dimmed screen, as it does here.',
      },
    ],
  },
  {
    id: 'active-calories',
    name: 'Active calories',
    variant: 'In kilocalories',
    summary: 'The energy this run has burned on top of what your body burns at rest.',
    aliases: ['calories', 'kcal', 'energy burned', 'cal'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Active vs. total',
        plain:
          "Active counts only the extra energy from moving; total adds what you'd have burned sitting still. Active is the one that counts toward a daily move goal.",
      },
      {
        kind: 'appearance',
        term: 'Whole numbers',
        value: '254',
        plain: 'Rounded to whole kilocalories: decimals would only add noise to an estimate.',
      },
    ],
  },
  {
    id: 'pace',
    name: 'Average pace',
    variant: 'Minutes and seconds per km',
    summary: 'How long each kilometer has taken so far, on average: 5 minutes 19 seconds.',
    aliases: ['pace', 'min/km', 'avg pace', 'speed'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Prime marks',
        value: '5′19″',
        plain: "One mark for minutes and two for seconds: runners' shorthand for a pace.",
      },
      {
        kind: 'behavior',
        term: 'Time per distance',
        plain: 'Runners think in minutes per kilometer rather than speed, so a lower number is faster.',
      },
      {
        kind: 'behavior',
        term: 'Average, current or rolling',
        plain:
          'Average covers the whole run, current pace changes with every stride, and rolling pace covers the last kilometer. People pick the one they pace themselves by.',
      },
    ],
  },
  {
    id: 'distance',
    name: 'Distance',
    variant: 'Kilometers, two decimals',
    summary: 'How far you have run so far.',
    aliases: ['km', 'kilometers', 'how far', 'mileage'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Fixed decimals',
        value: '4.27 · toFixed(2)',
        plain: 'Always two decimals: the number moves every 10 meters, so you can watch yourself make progress.',
      },
      {
        kind: 'behavior',
        term: 'GPS',
        plain:
          'Outdoors the watch measures distance with GPS. On a treadmill it estimates it from your movement, using the stride it learned on outdoor runs.',
      },
      {
        kind: 'behavior',
        term: 'Units setting',
        plain: 'Kilometers or miles is a setting, and the pace above switches along with it.',
      },
    ],
  },
  {
    id: 'page-indicator',
    name: 'Page indicator',
    variant: 'Vertical, by the Digital Crown',
    summary:
      'A column of dots by the Digital Crown: one per workout view, and the white one is the view on screen.',
    aliases: ['page dots', 'pagination', 'the dots on the side', 'scroll indicator'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Vertical dots',
        value: '6 dots · 4px · gap: 3px',
        plain: 'The dots run top to bottom because the views are stacked that way, one above the next.',
      },
      {
        kind: 'behavior',
        term: 'Turn the Digital Crown',
        plain: 'Turning the crown moves to the next view: heart rate zones, segments, splits, elevation and more.',
      },
      {
        kind: 'behavior',
        term: 'Swipe for controls',
        plain: "Swiping sideways leads to the controls instead, such as Pause and End, and to the music that's playing.",
      },
    ],
  },
];
