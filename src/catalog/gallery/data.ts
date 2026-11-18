import type { UiElementSpec } from '../types';

/**
 * Elements in the gallery's data tiles: activity rings, calendar heatmap and marker clusters.
 * `value` fields are the tiles' actual values (src/landing/gallery/).
 */
export const dataGallery: UiElementSpec[] = [
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
  {
    id: 'calendar-heatmap',
    name: 'Calendar heatmap',
    htmlTag: '<table>',
    variant: 'Contributions · the last 12 months',
    summary:
      'A year at a glance: a small square for every day, a column for every week, each shaded by how much happened that day. Streaks, busy spells and breaks show up without reading a number.',
    aliases: ['contribution graph', 'activity calendar', 'the green squares', 'year in squares', 'streak calendar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sequential color scale',
        value: { light: '#eff2f5 → oklch(0.47 0.16 260)', dark: '#151b23 → oklch(0.74 0.13 248)' },
        plain:
          'Five shades of one blue, from an empty gray to the busiest days: the darker the square (the brighter, in dark mode), the more happened.',
      },
      {
        kind: 'appearance',
        term: 'Weeks as columns',
        value: '7 rows × up to 53 weeks · Sunday on top',
        plain:
          'Each column is a week and each row a day of the week, so weekends are the top and bottom rows and a quiet weekend shows as a pale stripe.',
      },
      {
        kind: 'behavior',
        term: 'Newest on the right',
        value: 'whole weeks only',
        plain:
          'The current week always ends the graph on the right. On a narrower screen the oldest weeks drop off on the left, a whole week at a time.',
      },
    ],
  },
  {
    id: 'calendar-heatmap-grid',
    name: 'Day grid',
    htmlTag: '<tbody>',
    variant: 'A column per week, a row per weekday',
    summary:
      'The squares themselves, one per day, filling each week from Sunday down before moving to the next. Empty days stay pale gray, so gaps read as clearly as busy spells.',
    aliases: ['the squares', 'heatmap cells', 'calendar grid', 'the boxes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'grid-auto-flow: column',
        value: '7 rows of 11px · gap: 3px',
        plain: 'The grid fills down each column first, Sunday to Saturday, then starts the next week to its right.',
      },
      {
        kind: 'appearance',
        term: 'Bucketed shades',
        value: '0 · 1–2 · 3–5 · 6–9 · 10+',
        plain:
          'Counts are sorted into five buckets instead of being shaded exactly, so the patterns stand out: a day with 11 and one with 15 look the same.',
      },
      {
        kind: 'behavior',
        term: 'Patterns at a glance',
        value: 'streak · break · crunch',
        plain:
          'Two pale weeks in August are a vacation, the solid run up to today is a streak, and the dark band in March is a launch.',
      },
    ],
  },
  {
    id: 'calendar-heatmap-cell',
    name: 'Day cell',
    htmlTag: '<td>',
    variant: 'Hovered · outlined',
    summary:
      'One day: a small rounded square in the shade for its count. Pointing at it outlines it and opens a tooltip with the number and the date.',
    aliases: ['square', 'day square', 'tile', 'box', 'dot'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rounded square',
        value: 'width: 11px · border-radius: 2px',
        plain:
          'Small enough that a whole year fits across the page; slightly rounded corners keep the dense grid soft.',
      },
      {
        kind: 'appearance',
        term: 'Hairline inset',
        value: { light: 'inset 0 0 0 1px rgb(31 35 40 / 0.06)', dark: 'inset 0 0 0 1px rgb(255 255 255 / 0.05)' },
        plain: 'A faint line inside every square keeps the empty days visible against the page.',
      },
      {
        kind: 'behavior',
        term: 'Hover outline',
        value: 'border: 1.5px · slides in 180ms',
        plain: 'The day under the pointer gets an outline that follows the pointer from day to day.',
      },
      {
        kind: 'behavior',
        term: 'Live update',
        value: '2 → 3 contributions · scale(1.5) → 1, 480ms',
        plain:
          "When a new contribution comes in, today's square steps up a shade with a little pop, and the total in the header ticks up with it.",
      },
    ],
  },
  {
    id: 'calendar-heatmap-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'Count and date, above the day',
    summary:
      'A small dark label above the day you point at, spelling out what the color only hints at: how many contributions, and on which date.',
    aliases: ['hover label', 'popup', 'hover text', 'info bubble'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted label',
        value: { light: 'background: #25292e · 12px', dark: 'background: #3d444d · 12px' },
        plain: 'Dark with white text in both themes, so it reads on top of any shade.',
      },
      {
        kind: 'appearance',
        term: 'Arrow',
        value: '5px · on the middle of the cell',
        plain:
          'A small triangle points at the day it describes. Near an edge the label slides over to stay inside, but the arrow stays on the day.',
      },
      {
        kind: 'behavior',
        term: 'Follows the pointer',
        value: 'transform · 180ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain: 'It moves with the pointer from day to day, and its text changes at once.',
      },
      {
        kind: 'appearance',
        term: 'Plain-language text',
        value: 'No contributions on … for empty days',
        plain: 'The count comes first, then the date in full; an empty day says No contributions instead of 0.',
      },
    ],
  },
  {
    id: 'calendar-heatmap-legend',
    name: 'Legend',
    variant: 'Less → More',
    summary: 'Five sample squares between Less and More that explain the colors without any numbers.',
    aliases: ['key', 'color key', 'scale', 'Less/More'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color key',
        value: '5 swatches · 11px · gap: 3px',
        plain: "The grid's five shades in order, so you can match a day's color to how busy it was.",
      },
      {
        kind: 'appearance',
        term: 'Bottom right',
        value: '12px · muted',
        plain: 'It sits quietly under the newest weeks, where people look first, out of the way of the squares.',
      },
    ],
  },
  {
    id: 'calendar-heatmap-axis',
    name: 'Axis labels',
    variant: 'Months on top · Mon, Wed, Fri down the side',
    summary:
      'Month names over the weeks they start, and every other weekday down the left: just enough to find a date without crowding the squares.',
    aliases: ['month labels', 'day labels', 'Mon Wed Fri', 'the months along the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sparse labels',
        value: 'Mon · Wed · Fri · 12px',
        plain: 'Only every other day is named; the rows in between are easy to count from them.',
      },
      {
        kind: 'behavior',
        term: 'Month over its first week',
        value: 'first Sunday of the month',
        plain:
          "A month's name sits over the first week whose Sunday falls in it. When the oldest weeks are cut off, a name too close to the next one is left out, so they never overlap.",
      },
    ],
  },
  {
    id: 'marker-clusters',
    name: 'Marker cluster',
    htmlTag: '<button>',
    variant: 'Count · sized by count · soft halo',
    summary:
      'A circle with a number that stands in for that many markers, where they are too close together to show one by one. Click it or zoom in, and it splits into smaller clusters and single markers.',
    aliases: ['cluster', 'grouped pins', 'the circles with numbers', 'pin cluster', 'bubble with a count'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sized by count',
        value: '28 · 34 · 38 · 44px (up to 9 · 49 · 99 · more)',
        plain: 'Bigger groups get bigger circles, so you see where the stays are before reading a single number.',
      },
      {
        kind: 'appearance',
        term: 'Halo',
        value: '0 0 0 4px accent 30% · 0 0 0 9px accent 13%',
        plain: 'Two soft rings in the same color lift the circle off the busy map and make it look tappable.',
      },
      {
        kind: 'behavior',
        term: 'Split on zoom',
        value: '48 → 21 + 14 + 9 + 4 · 450ms ease-out',
        plain:
          'Zoom in and the cluster breaks apart: its parts move out from its center to where they are, and the numbers still add up.',
      },
      {
        kind: 'behavior',
        term: 'Click to zoom',
        value: '2× · 600ms cubic-bezier(0.45, 0, 0.2, 1)',
        plain: 'Clicking a cluster zooms the map in on it, far enough that its markers can be told apart.',
      },
    ],
  },
  {
    id: 'marker-clusters-marker',
    name: 'Price marker',
    htmlTag: '<button>',
    variant: 'Pill · the picked one inverted',
    summary:
      'A single stay on the map, shown by its price per night on a small pill instead of a pin. The one you pick turns dark and opens its card.',
    aliases: ['price pin', 'price tag', 'map pin', 'marker', 'price bubble'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Price pill',
        value: { light: '#fff · 12.5px bold · radius: 13px', dark: '#2b2d31 · 12.5px bold · radius: 13px' },
        plain: 'The price is the marker, so stays can be compared without opening any of them.',
      },
      {
        kind: 'appearance',
        term: 'Selected state',
        value: { light: 'background: #222 · scale(1.08)', dark: 'background: #f2f2f2 · scale(1.08)' },
        plain: "The picked marker swaps its colors and grows a little, so it's clear which one the card belongs to.",
      },
      {
        kind: 'behavior',
        term: 'Fixed screen size',
        value: 'not scaled with the map',
        plain: 'Markers sit on top of the map and keep their size while it zooms; only their places move.',
      },
    ],
  },
  {
    id: 'marker-clusters-callout',
    name: 'Map callout',
    htmlTag: '<div role="dialog">',
    variant: 'Listing card · photo, name, rating, price',
    summary:
      'A small card that pops up over the picked marker with the essentials (a photo, the name, the rating and the price), so you can decide without leaving the map.',
    aliases: ['info window', 'popup', 'map card', 'preview card', 'marker card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Anchored card',
        value: 'width: 176px · border-radius: 12px · 0 8px 24px shadow',
        plain: 'It floats just above its marker and belongs to the map, so it moves with the marker.',
      },
      {
        kind: 'appearance',
        term: 'Photo with page dots',
        value: 'object-fit: cover · 108px tall',
        plain:
          'The photo fills the top. The dots say there are more photos to swipe through, and the heart saves the stay.',
      },
      {
        kind: 'behavior',
        term: 'Pop-in',
        value: 'scale(0.94) → 1 + fade · 220ms',
        plain: 'It grows out of its marker as it fades in, and shrinks back into it when it closes.',
      },
    ],
  },
  {
    id: 'marker-clusters-zoom',
    name: 'Zoom controls',
    htmlTag: '<div role="group">',
    variant: '+ / − · bottom right',
    summary:
      'Two stacked buttons in a corner of the map: plus zooms in, minus zooms out, for anyone without a scroll wheel or a pinch.',
    aliases: ['zoom buttons', 'plus and minus', 'map controls', 'zoom in and out'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Stacked buttons',
        value: '32 × 32px · border-radius: 8px · hairline between',
        plain: 'One white block holds both buttons, split by a thin line, the way most web maps draw them.',
      },
      {
        kind: 'appearance',
        term: 'Floating control',
        value: '0 1px 4px rgb(0 0 0 / 0.3)',
        plain: 'A small shadow lifts the controls off the map, so they never read as part of it.',
      },
      {
        kind: 'behavior',
        term: 'Pressed state',
        value: { light: 'background: #e9e9e9', dark: 'background: #3c3d41' },
        plain: "A button darkens while it's pressed; here minus takes the map back out.",
      },
    ],
  },
  {
    id: 'marker-clusters-map',
    name: 'Base map',
    htmlTag: '<canvas>',
    variant: 'Vector map · light style',
    summary:
      'The map under the markers: land, water, parks, roads and place names, in quiet colors so the markers stand out.',
    aliases: ['map', 'map tiles', 'background map', 'basemap', 'street map'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Road hierarchy',
        value: {
          light: 'expressway #fbd27b · arterial #fff 5px · street #fff 2.4px',
          dark: 'expressway #7a6339 · arterial #474c53 5px · street #34383e 2.4px',
        },
        plain:
          "The bigger the road, the wider it's drawn, each over a slightly darker casing, and the expressway is yellow: the city's layout reads at a glance.",
      },
      {
        kind: 'appearance',
        term: 'Muted palette',
        value: {
          light: 'land #f2efe9 · water #a6cff2 · park #cbe6bf',
          dark: 'land #212428 · water #1b2d43 · park #1f3628',
        },
        plain: 'Soft, low-contrast colors keep the map in the background; the only strong color is the markers.',
      },
      {
        kind: 'appearance',
        term: 'Label halo',
        value: '10px · 3px outline in the color underneath',
        plain: 'Each name has a thin outline in the color under it, so it stays readable over roads, parks and water.',
      },
      {
        kind: 'behavior',
        term: 'Vector zoom',
        value: 'scale 2× · roads and names keep their size',
        plain:
          'Zooming in scales the shapes, while roads stay about as wide and names stay the same size; the minor streets appear, as on a vector web map.',
      },
    ],
  },
];
