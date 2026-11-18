import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Calendar heatmap element, in the order they appear. `value` fields are the actual values from
 * CalendarHeatmap.
 */
export const calendarHeatmapSpecs: UiElementSpec[] = [
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
];
