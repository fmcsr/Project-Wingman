import type { UiElementSpec } from '../../../catalog';

/** Parts of the Gantt chart element, in the order they appear. `value` fields are the actual values from GanttChart. */
export const ganttChartSpecs: UiElementSpec[] = [
  {
    id: 'gantt-chart',
    name: 'Gantt chart',
    htmlTag: '<div role="grid">',
    variant: 'Weeks · task list on the left',
    summary:
      'A project laid out in time: a row per task, each a bar from its first day to its last, so you see at once what runs side by side, what waits on what, and whether the launch date holds.',
    aliases: ['timeline', 'roadmap', 'project schedule', 'timeline view', 'the bars-on-a-calendar chart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Task list and timeline',
        value: '168px list · the days share the rest',
        plain:
          'Names on the left, dates across the top, and every bar on its task’s row. On a phone the list narrows to the names.',
      },
      {
        kind: 'appearance',
        term: 'Shaded weekends',
        value: { light: 'background: #f7f8f9', dark: 'background: #1a1c20' },
        plain:
          'Saturdays and Sundays are a shade darker, so you can count working days and see when a bar runs over a weekend.',
      },
      {
        kind: 'behavior',
        term: 'Zoom level',
        value: 'weeks · 4 shown, 5 from a 560px-wide timeline',
        plain: 'The view shows whole weeks; a wider screen shows one more week instead of stretching the days.',
      },
    ],
  },
  {
    id: 'gantt-chart-axis',
    name: 'Time axis',
    variant: 'Weeks starting Monday',
    summary:
      'The dates along the top: a label at the start of every week and a thin line from it down through the rows, so any bar can be read against the calendar.',
    aliases: ['date header', 'timescale', 'the dates at the top', 'calendar header'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Week gridlines',
        value: '1px hairline every Monday · 11px labels',
        plain:
          'A faint line marks where each week starts, with its date beside it; the days in between are counted from them.',
      },
      {
        kind: 'behavior',
        term: 'Time scale',
        value: '28 days across · about 14px a day on a 564px tile',
        plain:
          'The width is split evenly between the days shown, so a bar’s length is its duration: twice as long, twice the time.',
      },
    ],
  },
  {
    id: 'gantt-chart-dependency',
    name: 'Dependency arrow',
    htmlTag: '<svg>',
    variant: 'Finish-to-start',
    summary:
      'A line from the end of one task to the start of the task that waits for it: the second can’t begin until the first is done.',
    aliases: ['connector', 'link', 'blocked-by line', 'predecessor line', 'the arrow between bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Elbow connector',
        value: { light: '1.5px · #9ba1aa · corners rounded 4px', dark: '1.5px · #646a74 · corners rounded 4px' },
        plain:
          'It leaves the first bar at its end, turns at right angles and points into the next bar’s start. When the next one starts the very next day, it loops back between the rows.',
      },
      {
        kind: 'behavior',
        term: 'Pushes the dependent',
        value: '+2 days → +2 days · 160ms',
        plain:
          'Make the first task longer and the one waiting for it moves later by as much, arrow and all, so the plan never shows work starting before what it needs is done.',
      },
    ],
  },
  {
    id: 'gantt-chart-bar',
    name: 'Task bar',
    htmlTag: '<div>',
    variant: 'Payment API · Nov 16–26 · Marcus',
    summary:
      'A task as a bar: it starts on its first day and ends on its last, so its length is how long it takes. The photo at its start says who’s on it.',
    aliases: ['bar', 'timeline bar', 'task block', 'schedule bar', 'the colored bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bar',
        value: {
          light: 'background: oklch(0.93 0.035 255) · height: 20px · border-radius: 5px',
          dark: 'background: oklch(0.32 0.06 258) · height: 20px · border-radius: 5px',
        },
        plain: 'A pale, rounded track the length of the task, in the project’s blue.',
      },
      {
        kind: 'appearance',
        term: 'Assignee avatar',
        value: '16px · 1.5px ring in the page color',
        plain: 'The owner’s photo rides at the start of the bar, so you see who’s busy when without opening anything.',
      },
      {
        kind: 'behavior',
        term: 'Drag to resize',
        value: 'by the end · snaps a day at a time · 140ms',
        plain:
          'Grab the end of a bar to change when the task finishes. It moves in whole days, and a label shows the new end date while you drag.',
      },
      {
        kind: 'behavior',
        term: 'Lift while dragging',
        value: {
          light: 'box-shadow: 0 3px 10px rgb(16 24 40 / 0.18)',
          dark: 'box-shadow: 0 3px 10px rgb(0 0 0 / 0.5)',
        },
        plain: 'Held, the bar casts a shadow, so it’s clear which one is moving.',
      },
    ],
  },
  {
    id: 'gantt-chart-progress',
    name: 'Progress fill',
    variant: 'Flow design · 60% → 80%',
    summary:
      'The deeper part of a bar, filled from the left with the share of the work done: a bar filled halfway is a task halfway there.',
    aliases: ['progress bar', 'percent complete', 'completion fill', 'the darker part of the bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Fill',
        value: { light: 'oklch(0.6 0.15 255)', dark: 'oklch(0.62 0.14 255)' },
        plain: 'The bar’s own blue, only deeper, so what’s done and what’s left read as one task.',
      },
      {
        kind: 'behavior',
        term: 'Grows from the left',
        value: 'transform: scaleX(0.6) → scaleX(0.8) · 500ms',
        plain:
          'As work gets done the fill grows toward the end, and the percentage and the pie icon in the list follow.',
      },
      {
        kind: 'behavior',
        term: 'Read it against today',
        value: 'Wednesday: 3 of 5 days · 60% done',
        plain:
          'Where the today line crosses a bar, the fill should have reached it. A fill that stops short of the line is a task running late.',
      },
    ],
  },
  {
    id: 'gantt-chart-milestone',
    name: 'Milestone',
    variant: 'Launch · Dec 4',
    summary:
      'A single date that matters, drawn as a diamond instead of a bar because it takes no time: a launch, a deadline, a review.',
    aliases: ['diamond', 'deadline', 'key date', 'launch date', 'checkpoint'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Diamond',
        value: { light: '12px · rotate(45deg) · #1c2024', dark: '12px · rotate(45deg) · #eceef2' },
        plain: 'A square turned on its point, in ink, so it stands apart from the blue bars, with its date beside it.',
      },
      {
        kind: 'behavior',
        term: 'Zero duration',
        value: 'one date · Friday, Dec 4',
        plain: 'It has a date but no length; the tasks before it have to end in time for it.',
      },
    ],
  },
  {
    id: 'gantt-chart-today',
    name: 'Today line',
    variant: 'Wednesday, Nov 18',
    summary:
      'A red line at today’s date down through every row, so you see at a glance what should be done by now and what’s still ahead.',
    aliases: ['now line', 'current date marker', 'the red line', 'today marker'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Today marker',
        value: { light: '1.5px · oklch(0.6 0.2 25)', dark: '1.5px · oklch(0.66 0.18 25)' },
        plain:
          'The only red on the chart, topped by a Today pill under the dates, so it can’t be mistaken for anything else.',
      },
      {
        kind: 'behavior',
        term: 'Moves with the calendar',
        value: 'a day at a time · 600ms',
        plain: 'Each day it steps one day to the right, on the middle of the day; bars to its left should be done.',
      },
    ],
  },
];
