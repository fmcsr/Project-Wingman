import type { UiElementSpec } from '../../../catalog';

/**
 * Elements of the Almanac watch face, from the dial out to the corners, then the hands. `value` fields are the
 * actual values from AlmanacFace.
 */
export const almanacSpecs: UiElementSpec[] = [
  {
    id: 'dial',
    name: 'Dial',
    htmlTag: '<svg>',
    variant: 'Analog · minute track and hour markers',
    summary:
      'The clock face itself: a tick for every minute, a heavier marker at each hour and the minutes in fives around the edge. The hands and the complications sit on it.',
    aliases: ['clock face', 'watch dial', 'analog face', 'the ticks', 'minute markers'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Minute track',
        value: '60 ticks · 1px · rgb(255 255 255 / 0.5)',
        plain: 'A fine tick for every minute around the edge, so the minute hand can be read to the minute.',
      },
      {
        kind: 'appearance',
        term: 'Hour markers',
        value: '11px long · 2.6px wide · #fff',
        plain: 'Every fifth tick is longer, thicker and white: the hour reads from these alone, without numbers.',
      },
      {
        kind: 'appearance',
        term: 'Bezel numerals',
        value: '9px · 600 · rgb(255 255 255 / 0.6)',
        plain:
          "The minutes in fives around the edge, small and gray so they stay behind the time. They step aside at the top, where the bezel's text and the corners' labels run.",
      },
      {
        kind: 'behavior',
        term: 'Edit mode',
        plain:
          'Touching and holding the face opens its editor: swipe to its color, then to each complication slot, and turn the Digital Crown to choose what fills it.',
      },
    ],
  },
  {
    id: 'bezel',
    name: 'Bezel complication',
    htmlTag: '<svg> with <textPath>',
    variant: 'Inline text · next event',
    summary:
      'One line of text running around the top of the dial: the next event on the calendar. It belongs to the circular complication at 12 o’clock, the date.',
    aliases: ['curved text', 'text around the dial', 'rim text', 'bezel text', 'inline complication'],
    concepts: [
      {
        kind: 'appearance',
        term: 'textPath',
        value: 'r = 94.5px · 10.5px · 600',
        plain:
          "The letters sit on an invisible circle around the dial's center, so the line bends with the edge of the face.",
      },
      {
        kind: 'appearance',
        term: 'Half the dial at most',
        value: '≈ 86° of 180°',
        plain:
          'The text may run nearly halfway around the dial before it’s cut off, so it’s kept to a time and a short title.',
      },
      {
        kind: 'behavior',
        term: 'widgetLabel',
        plain:
          "In WidgetKit the bezel's text is the label of the circular complication at 12 o'clock: one short line, like an inline complication (accessoryInline), that the face bends along the dial.",
      },
      {
        kind: 'behavior',
        term: 'Timeline',
        plain:
          'The app hands the watch its entries ahead of time, each with the moment it should show: once the meeting starts, the next one takes its place.',
      },
    ],
  },
  {
    id: 'corner-weather',
    name: 'Corner complication',
    htmlTag: '<svg>',
    variant: 'Gauge with text · temperature',
    summary:
      "In the top-left corner, the temperature now in large text, over a gauge of the day's range from the low to the high, with a dot where it stands.",
    aliases: ['corner widget', 'temperature gauge', 'weather complication', 'the curved gauge in the corner'],
    concepts: [
      {
        kind: 'appearance',
        term: 'accessoryCorner',
        value: 'gauge at r = 107px · value at r = 122px',
        plain:
          "The corner family of complications: a gauge and text that bend around the dial into one of the screen's rounded corners, the large value out in the corner.",
      },
      {
        kind: 'appearance',
        term: 'Gradient gauge',
        value: '#30d158 → #ffd60a → #ff9f0a · 3.5px',
        plain: 'The arc runs from cool to warm, so the dot’s place reads at a glance: halfway along, a mild day.',
      },
      {
        kind: 'appearance',
        term: 'Range labels',
        value: '11px · 600 · end colors',
        plain:
          "The small numbers at the gauge's ends say what the ends mean (today's low, 11°, and high, 21°), each in its end's color.",
      },
      {
        kind: 'behavior',
        term: 'Open gauge',
        plain:
          "An arc with a marker suits a value inside a range, like a temperature; a closed ring suits a share of a whole, like a timer's time left.",
      },
    ],
  },
  {
    id: 'corner-uv',
    name: 'Corner complication',
    htmlTag: '<svg>',
    variant: 'Gauge with an image · UV index',
    summary:
      'In the top-right corner, the UV index on a segmented gauge, one segment per band from low to extreme, with the sun in the corner.',
    aliases: ['UV index', 'sun exposure', 'segmented gauge', 'UV complication'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Segmented gauge',
        value: '5 segments · 1.6° gaps · stroke-linecap: butt',
        plain:
          "The arc is cut into steps, one per band (low, moderate, high, very high, extreme), and the dot sits in the band you're in.",
      },
      {
        kind: 'appearance',
        term: 'Image in the corner',
        value: '18 × 18px · #ffd60a',
        plain: 'A small glyph fills the corner instead of text and says what the gauge measures: here the sun.',
      },
      {
        kind: 'behavior',
        term: 'Tinted mode',
        plain:
          'People can turn complications into a single tint that matches the face. Color is never the only clue, so the value is written out too: UV 3.',
      },
    ],
  },
  {
    id: 'corner-heart',
    name: 'Corner complication',
    htmlTag: '<svg>',
    variant: 'Text with an image · heart rate',
    summary:
      'In the bottom-left corner, the latest heart rate curved along the dial, with the heart in the corner. It refreshes now and then, not continuously.',
    aliases: ['heart rate', 'BPM', 'pulse complication', 'heart corner'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Reading upright',
        value: 'counterclockwise arc',
        plain:
          'In the bottom corners the text follows the dial the other way round, so it still reads left to right and right side up.',
      },
      {
        kind: 'appearance',
        term: 'Two colors in one line',
        value: '#fff · #ff375f',
        plain: "The number in white and its unit in the heart's red: one line, read as value and label.",
      },
      {
        kind: 'behavior',
        term: 'Refreshes now and then',
        value: 'every 6 s',
        plain:
          "A complication isn't a live feed: the watch updates it from time to time, and here a new reading arrives every few seconds.",
      },
    ],
  },
  {
    id: 'corner-sunset',
    name: 'Corner complication',
    htmlTag: '<svg>',
    variant: 'Stacked text · sunset',
    summary:
      "In the bottom-right corner, today's sunset in two lines bent along the corner: a small orange label over the time.",
    aliases: ['sunset time', 'sunrise and sunset', 'two-line corner', 'curved text'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two arcs',
        value: 'r = 107px and 122px',
        plain:
          "Each line runs on its own circle around the dial's center: the label nearer the dial, the time out in the corner.",
      },
      {
        kind: 'appearance',
        term: 'Label over value',
        value: '11px · #ff9f0a / 16px · #fff',
        plain: 'A small colored label says what it is; the larger white text is what you looked for.',
      },
      {
        kind: 'behavior',
        term: 'The next one',
        plain: "It shows whichever comes next: the sunset during the day, tomorrow's sunrise after dark.",
      },
    ],
  },
  {
    id: 'subdial-date',
    name: 'Circular complication',
    htmlTag: '<time>',
    variant: 'Stacked text · date',
    summary:
      "The circle at 12 o'clock: the weekday in red over the day of the month. Its app also writes the line of text along the bezel above it.",
    aliases: ['date', 'calendar complication', 'day and date', 'subdial'],
    concepts: [
      {
        kind: 'appearance',
        term: 'accessoryCircular',
        value: '51 × 51px · rgb(255 255 255 / 0.12)',
        plain:
          'The circular family of complications: a small round platter that holds a figure, a gauge or a picture. This face has four, at 12, 3, 6 and 9 o’clock.',
      },
      {
        kind: 'appearance',
        term: 'Rounded figures',
        value: 'SF Compact Rounded · 19px · 500',
        plain:
          'Complications set their text in the rounded version of the system font, which stays clear at small sizes.',
      },
      {
        kind: 'behavior',
        term: 'Paired with the bezel',
        plain:
          "Only the circle at 12 o'clock can bring a line along the bezel; the date brings the next event with it.",
      },
    ],
  },
  {
    id: 'subdial-timer',
    name: 'Circular complication',
    htmlTag: '<span role="timer">',
    variant: 'Closed gauge with text · timer',
    summary:
      "The circle at 3 o'clock: a running 10-minute timer. Its orange ring is the time left, and it empties as the timer counts down.",
    aliases: ['timer', 'countdown', 'progress ring', 'time left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Closed gauge',
        value: 'pathLength="100" · stroke-dasharray: 37 100',
        plain:
          "A full circle stands for the whole 10 minutes; the colored part is what's left. Counting the outline as 100 makes the dash's length the percentage: 3:42 of 10:00 is 37.",
      },
      {
        kind: 'appearance',
        term: 'Track',
        value: 'rgb(255 159 10 / 0.3)',
        plain: 'A dim ring of the same orange shows the full length, so the empty part still reads.',
      },
      {
        kind: 'behavior',
        term: 'Self-updating text',
        value: 'every 1 s',
        plain:
          'The app tells the watch once when the timer ends; the watch counts down to it every second on its own, so the app never has to wake up.',
      },
    ],
  },
  {
    id: 'subdial-moon',
    name: 'Circular complication',
    htmlTag: '<svg>',
    variant: 'Image · moon phase',
    summary:
      "The circle at 6 o'clock: tonight's moon, waxing gibbous and lit from the right. A complication can be a picture with no text at all.",
    aliases: ['moon phase', 'lunar phase', 'moon', 'astronomy complication'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Full-color image',
        value: '43px disc · #e5e5ea lit · #2c2c2e dark',
        plain:
          'The picture fills the circle. The dark part of the moon stays faintly visible, as it does in the sky, so the whole disc reads.',
      },
      {
        kind: 'appearance',
        term: 'Circular mask',
        value: 'border-radius: 50%',
        plain: 'The watch clips every picture in this slot to a circle, so square art never pokes out.',
      },
      {
        kind: 'behavior',
        term: 'Changes daily',
        plain: 'The picture follows the real moon: it fills toward full over the next few days, then wanes.',
      },
    ],
  },
  {
    id: 'subdial-rings',
    name: 'Circular complication',
    htmlTag: '<svg>',
    variant: 'Rings · activity',
    summary:
      "The circle at 9 o'clock: the day's three activity rings (move, exercise and stand), each filling toward its daily goal.",
    aliases: ['activity rings', 'fitness rings', 'move ring', 'close your rings'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Concentric rings',
        value: '3 rings · 4.6px · 0.8px apart',
        plain: 'Three rings, one inside the next, each over a dark track of its own color.',
      },
      {
        kind: 'appearance',
        term: 'Ring colors',
        value: '#ff2f69 · #b2f51c · #31e4f0',
        plain:
          'Red is move, green exercise and blue stand: the same colors wherever the rings appear, so they never need labels.',
      },
      {
        kind: 'behavior',
        term: 'Closing rings',
        plain: 'Each ring fills as the day goes on, closes when its goal is met, and keeps going past it.',
      },
    ],
  },
  {
    id: 'hands',
    name: 'Hour and minute hands',
    htmlTag: '<svg>',
    variant: 'Baton hands · white',
    summary:
      'The two white hands that tell the time: the short one the hour, the long one the minute. Here 10:09, the time watches are photographed at.',
    aliases: ['clock hands', 'hour hand', 'minute hand', 'the hands'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Neck and blade',
        value: '2.2px neck · 6.2px blade · round tips',
        plain:
          'Each hand starts thin at the center and widens into a rounded blade, so it hides as little of the subdials as it can.',
      },
      {
        kind: 'appearance',
        term: 'Drop shadow',
        value: 'drop-shadow(0 0 1px rgb(0 0 0 / 0.9))',
        plain: 'A soft dark edge keeps a white hand readable where it passes over a complication.',
      },
      {
        kind: 'appearance',
        term: 'Product-shot time',
        value: '10:09:30',
        plain:
          'Watches are pictured at 10:09: the hands frame the top of the dial like a smile and leave the subdial at 12 clear.',
      },
      {
        kind: 'behavior',
        term: 'Stepping minute hand',
        value: '0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        plain:
          'The minute hand moves once a minute, as the second hand passes 12, with a short spring; the hour hand creeps on with it.',
      },
    ],
  },
  {
    id: 'second-hand',
    name: 'Second hand',
    htmlTag: '<svg>',
    variant: 'Sweeping · orange',
    summary:
      'The thin orange hand that sweeps around once a minute, with a short tail behind the center and a cap over the pivot.',
    aliases: ['seconds hand', 'sweep hand', 'the orange hand', 'ticker'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Accent color',
        value: '#ff9f0a',
        plain:
          "The face's color goes on the second hand alone, so it stands apart from the white hands that tell the time.",
      },
      {
        kind: 'appearance',
        term: 'Center cap',
        value: 'r = 3.4px · #ff9f0a on a white hub',
        plain: 'A small disc covers the point where the three hands turn, with a black dot at its middle.',
      },
      {
        kind: 'behavior',
        term: 'Smooth sweep',
        value: 'animation: 60s linear infinite',
        plain: 'It glides instead of ticking: one smooth turn a minute.',
      },
      {
        kind: 'behavior',
        term: 'Always On',
        plain:
          'When the wrist drops, the screen dims to save power and the sweep stops: the second hand hides, or on the newest watches ticks once a second.',
      },
    ],
  },
];
