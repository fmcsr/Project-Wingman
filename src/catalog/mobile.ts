import { homeIndicator, statusBar } from './shared';
import type { UiElementSpec } from './types';

/**
 * Elements in the Wave habit tracker, in the order they appear (the avatar is shared with Orbit and lives in
 * dashboard.ts). `value` fields are the actual values from WaveApp.tsx and WaveApp.module.css.
 */
export const mobile: UiElementSpec[] = [
  statusBar,
  {
    id: 'large-title',
    name: 'Large title',
    htmlTag: '<h1>',
    variant: 'iOS navigation · date eyebrow',
    summary:
      'A big, bold page title at the top of the screen, with the date above it in small capitals. It tucks into the bar as you scroll.',
    aliases: ['page title', 'header', 'the big Today'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Large title style',
        value: '30px · 700',
        plain: "Apple's style for top-level screens: big, bold and left-aligned.",
      },
      {
        kind: 'appearance',
        term: 'Eyebrow',
        value: '11px · uppercase · letter-spacing: 0.04em',
        plain: 'The small all-caps line above a heading. Here it carries the date, so the title itself can just say Today.',
      },
      {
        kind: 'behavior',
        term: 'Collapse on scroll',
        value: 'large → inline',
        plain: 'As you scroll, the title moves into the navigation bar to give the content more room.',
      },
    ],
  },
  {
    id: 'day-week-switcher',
    name: 'Segmented control',
    htmlTag: '<div role="radiogroup">',
    variant: 'Day · Week (Day selected)',
    summary:
      'Two connected options in one capsule, with exactly one selected. It switches the screen between today and the whole week.',
    aliases: ['switcher', 'toggle', 'view picker', 'the Day/Week buttons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected segment',
        value: { light: 'background: #fff + box-shadow', dark: 'background: #636366 + box-shadow' },
        plain: 'The chosen option sits on a raised thumb with a soft shadow, as if pressed into place.',
      },
      {
        kind: 'appearance',
        term: 'Capsule track',
        value: 'height: 29px · border-radius: 999px',
        plain: 'A fully rounded gray track holds both options, the shape segmented controls take in iOS 26.',
      },
      {
        kind: 'behavior',
        term: 'Single choice',
        value: 'role="radiogroup"',
        plain: 'Works like radio buttons: picking Week deselects Day, and the card and list below redraw for the week.',
      },
    ],
  },
  {
    id: 'today-summary',
    name: 'Summary card',
    variant: 'Ring + what’s left',
    summary: "A card at the top that sums up the day: how much is done, what's left and the streak at stake.",
    aliases: ['overview card', 'hero card', 'daily summary', 'progress card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color-keyed legend',
        value: '6px dot + label',
        plain: "Each habit still to do gets a dot in its own color, so you can find its segment on the ring.",
      },
      {
        kind: 'appearance',
        term: 'Card',
        value: { light: 'background: #fff · border-radius: 20px', dark: 'background: #1c1c1e · border-radius: 20px' },
        plain: 'A rounded panel lifted off the gray page; the list cards below use the same color with 18px corners.',
      },
      {
        kind: 'behavior',
        term: 'Live summary',
        plain: 'Check a habit off and the count, the list of what’s left and the ring all update at once.',
      },
    ],
  },
  {
    id: 'progress-ring',
    name: 'Progress ring',
    htmlTag: '<svg>',
    variant: 'Segmented · 4 of 6 done',
    summary:
      'A ring split into one segment per habit, in the order of your day. A done habit fills its segment; the number in the middle counts them.',
    aliases: ['activity ring', 'donut chart', 'circular progress', 'the colored circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'stroke-dasharray',
        value: '30.5 270.2 · stroke-linecap: round',
        plain:
          'Each segment is the same circle drawn as one short dash of its outline, turned to its place on the ring. Rounded ends keep the gaps soft.',
      },
      {
        kind: 'appearance',
        term: 'oklch() hues',
        value: { light: 'oklch(0.67 0.14 40 → 285)', dark: 'oklch(0.78 0.12 40 → 285)' },
        plain:
          'Each habit takes the color of its time of day, from dawn coral to night indigo. Only the hue changes, never the lightness, so no color shouts louder than another.',
      },
      {
        kind: 'appearance',
        term: 'Partial segment',
        value: '6 of 8 → 75%',
        plain: 'A habit counted in steps fills part of its segment, like water at 6 of 8 glasses. A pale track shows the rest.',
      },
    ],
  },
  {
    id: 'streak-count',
    name: 'Streak count',
    variant: 'Flame + days',
    summary:
      'A small flame with a number of days in a row. On the card it counts perfect days; on each row, that habit’s own streak.',
    aliases: ['streak', 'fire icon', 'days in a row', 'flame counter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon + number',
        value: { light: 'oklch(0.64 0.19 45)', dark: 'oklch(0.76 0.16 55)' },
        plain: 'An orange flame in front of the number reads as a streak at a glance, no label needed.',
      },
      {
        kind: 'appearance',
        term: 'Tinted pill',
        value: 'color-mix(in oklab, flame 14%, card)',
        plain: "On the card the streak sits in a pale orange pill: the flame's own color mixed into the card.",
      },
      {
        kind: 'behavior',
        term: 'Consecutive days',
        plain: 'Miss a day and the count starts again from zero. Not wanting to lose it is what brings people back.',
      },
    ],
  },
  {
    id: 'list-section-header',
    name: 'Section header',
    variant: 'Grouped list · with count',
    summary: 'A small all-caps label above a group of rows, with how many rows it holds: Tonight and Done.',
    aliases: ['group title', 'list heading', 'subheader'],
    concepts: [
      {
        kind: 'appearance',
        term: 'All-caps label',
        value: '11px · 600 · uppercase',
        plain: 'Quiet enough not to compete with the rows, clear enough to scan.',
      },
      {
        kind: 'appearance',
        term: 'Column labels',
        value: 'grid-template-columns: repeat(7, 5px)',
        plain: 'The day initials on the right use the same grid as the week dots below, so each letter sits over its column.',
      },
    ],
  },
  {
    id: 'list-row',
    name: 'List row',
    htmlTag: '<li>',
    variant: 'Habit row',
    summary:
      "One habit per row: its icon, its name, when it's due or how far along it is, its streak, its week and a check button.",
    aliases: ['cell', 'list item', 'row', 'habit'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two-line text',
        value: '14px · 600 / 11.5px',
        plain: "A bold name over a smaller gray detail line: the time it's due, or progress such as 6 of 8 glasses.",
      },
      {
        kind: 'appearance',
        term: 'Inset separator',
        value: 'left: 54px · 0.5px',
        plain: 'The hairline between rows starts after the icon, a classic iOS detail that keeps the rows connected.',
      },
      {
        kind: 'behavior',
        term: 'Tap to open',
        plain: "Tapping the row opens the habit's history; only the check button at the end marks it done.",
      },
    ],
  },
  {
    id: 'habit-icon',
    name: 'Icon badge',
    variant: 'Tinted circle',
    summary: "A colored circle with the habit's symbol, so you can spot a habit without reading its name.",
    aliases: ['habit icon', 'symbol', 'the little colored circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'color-mix()',
        value: 'color-mix(in oklab, hue 16%, card)',
        plain:
          "The background is the habit's color mixed into the card at 16%; the symbol uses a deeper shade of the same color.",
      },
      {
        kind: 'appearance',
        term: 'Line icon',
        value: '17px · stroke-width: 1.9',
        plain: 'Drawn with simple rounded strokes, in the same style as the tab bar icons.',
      },
    ],
  },
  {
    id: 'streak-dots',
    name: 'Week dots',
    variant: 'Last 7 days',
    summary: 'Seven small dots for the last seven days: colored when done, gray when missed, an outline for today.',
    aliases: ['mini heatmap', 'habit grid', 'streak dots', 'the little dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dot states',
        value: 'filled · gray · outline',
        plain: "Done days take the habit's color, missed days stay gray, and today is a ring until the habit is done.",
      },
      {
        kind: 'appearance',
        term: 'Shared grid',
        value: '7 × 5px · gap: 3.5px',
        plain: 'Every row uses the same grid, so the dots line up into one column per day, like a small heatmap.',
      },
    ],
  },
  {
    id: 'habit-check',
    name: 'Check button',
    htmlTag: '<button role="checkbox">',
    variant: 'To do · counting · done',
    summary:
      'The round button at the end of each row. A tap marks the habit done; for habits counted in steps, each tap adds one.',
    aliases: ['checkbox', 'checkmark', 'done button', 'tick'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three states',
        value: 'ring · arc · filled',
        plain: 'An empty ring means to do, a partial arc shows progress (6 of 8 is 75%), and a filled circle with a check means done.',
      },
      {
        kind: 'appearance',
        term: 'Filled state',
        value: { light: 'white check on the habit color', dark: 'black check on the habit color' },
        plain: "Done fills the circle with the habit's color. The check is black in dark mode, where the colors are brighter.",
      },
      {
        kind: 'behavior',
        term: 'aria-checked',
        value: 'true · false · "mixed"',
        plain: 'Screen readers hear a checkbox; a habit that is partly done, like the water, is reported as mixed.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Floating · Liquid Glass',
    summary: "The app's main sections, Today, Trends and Habits, in a glass capsule floating above the content.",
    aliases: ['bottom nav', 'bottom menu', 'tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(16px) saturate(180%)',
        plain: 'Content scrolling underneath shows through blurred, so the bar feels light instead of covering the screen.',
      },
      {
        kind: 'appearance',
        term: 'Selected pill',
        value: { light: 'rgb(120 120 128 / 0.12)', dark: 'rgb(118 118 128 / 0.24)' },
        plain: 'A soft gray pill sits behind the section you are in.',
      },
      {
        kind: 'behavior',
        term: 'Thumb reach',
        value: 'bottom of the screen',
        plain: 'It sits where thumbs naturally rest, so switching sections is easy with one hand.',
      },
    ],
  },
  {
    id: 'fab',
    name: 'Floating action button',
    variant: 'FAB · Add habit',
    summary: "A round button floating beside the tab bar for the screen's main action: adding a habit.",
    aliases: ['plus button', 'the round + button', 'add button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ink fill',
        value: { light: 'background: #1c1c1e', dark: 'background: #fff' },
        plain: 'Near-black in light mode and white in dark mode: the strongest contrast on the screen, saved for the main action.',
      },
      {
        kind: 'appearance',
        term: 'Elevation',
        value: 'box-shadow: 0 8px 20px',
        plain: 'A soft shadow makes it look like it hovers above the page.',
      },
      {
        kind: 'behavior',
        term: 'Pinned position',
        value: 'position: absolute',
        plain: 'It stays in the same corner while the content moves beneath it.',
      },
    ],
  },
  homeIndicator,
];
