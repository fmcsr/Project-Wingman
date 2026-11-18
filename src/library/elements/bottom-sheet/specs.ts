import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Bottom sheet element, in the order they appear. `value` fields are the actual values from BottomSheet.
 */
export const bottomSheetSpecs: UiElementSpec[] = [
  {
    id: 'bottom-sheet',
    name: 'Bottom sheet',
    htmlTag: '<div role="dialog">',
    variant: 'Detents · medium, floating',
    summary:
      "A panel that slides up from the bottom of the screen and rests at set heights, here the day's business news over a watchlist. Drag it up to read more, down to see what's behind it.",
    aliases: ['drawer', 'half sheet', 'slide-up panel', 'pull-up card', 'modal sheet'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Detents',
        value: 'header · header + 2 stories · full height',
        plain:
          'The heights the sheet comes to rest at: just its header, half the screen, or almost all of it. Let go between two and it moves on to the nearest.',
      },
      {
        kind: 'appearance',
        term: 'Floating sheet',
        value: 'inset: 8px · border-radius: 30px',
        plain:
          "Below full height, an iOS 26 sheet floats a little in from the screen's edges with big round corners, like a card laid over the app.",
      },
      {
        kind: 'behavior',
        term: 'Spring between detents',
        value: 'cubic-bezier(0.32, 0.72, 0, 1) · 520ms',
        plain: 'It moves off quickly and settles softly at the next height, the way an iOS sheet follows a flick.',
      },
      {
        kind: 'behavior',
        term: 'Docked at the large detent',
        value: 'inset: 0 · app behind: scale(0.92), dimmed',
        plain:
          "Pulled all the way up, it meets the screen's edges, and the app behind it dims and shrinks back into a card, so you can tell you're a layer deeper.",
      },
    ],
  },
  {
    id: 'bottom-sheet-grabber',
    name: 'Grabber',
    variant: 'Capsule',
    summary: 'The short gray bar at the top of the sheet. It tells people the sheet can be dragged to another height.',
    aliases: ['drag handle', 'handle', 'pull bar', 'the little line at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Capsule',
        value: '36 × 5px · 6px from the top',
        plain: 'A small rounded bar centered on the top edge, the same on every sheet that can change height.',
      },
      {
        kind: 'appearance',
        term: 'Quiet gray',
        value: { light: 'rgb(60 60 67 / 0.3)', dark: 'rgb(235 235 245 / 0.3)' },
        plain: 'A faint version of the text color: easy to find, never louder than the content.',
      },
      {
        kind: 'behavior',
        term: 'Tap to change detent',
        plain: 'Besides dragging, a tap on it moves the sheet to its next height, which helps people who can’t drag.',
      },
    ],
  },
  {
    id: 'bottom-sheet-header',
    name: 'Sheet header',
    variant: 'Title + subtitle',
    summary: "The top of the sheet that says what's in it. At the smallest detent it's all that shows.",
    aliases: ['sheet title', 'panel header', 'heading'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Title and subtitle',
        value: '20px · 700 / 13px',
        plain: 'A bold title with a short gray line under it, set at the left like the content below.',
      },
      {
        kind: 'behavior',
        term: 'Sized to the small detent',
        value: 'height: 75px',
        plain:
          'The smallest detent is exactly this tall, so the sheet tucks away without leaving a stray line of content.',
      },
    ],
  },
  {
    id: 'bottom-sheet-sparkline',
    name: 'Sparkline',
    htmlTag: '<svg>',
    variant: 'Intraday · previous close',
    summary: "A tiny line chart with no axes or labels: the stock's price through the day, at a glance.",
    aliases: ['mini chart', 'trend line', 'the little graph'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Reference line',
        value: 'stroke-dasharray: 1.5 2.5',
        plain: "A dotted line marks yesterday's closing price, so you see at once whether the day is up or down.",
      },
      {
        kind: 'appearance',
        term: 'Trend color',
        value: { light: '#34c759 · #ff3b30', dark: '#30d158 · #ff453a' },
        plain: "Green when the price is above that line, red when it's below, the same colors as the pill beside it.",
      },
      {
        kind: 'appearance',
        term: 'No axes',
        value: 'width: clamp(40px, 18cqw, 68px) · height: 28px',
        plain: 'Just the shape of the day, small enough to sit in a list row.',
      },
    ],
  },
  {
    id: 'bottom-sheet-change-pill',
    name: 'Change pill',
    variant: 'Percent · up',
    summary: "The colored badge under the price with the day's change: green for up, red for down.",
    aliases: ['badge', 'percentage tag', 'price change', 'the green box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Fixed width',
        value: 'width: 66px · text-align: right',
        plain: 'Every pill is the same width, so the figures line up down the list.',
      },
      {
        kind: 'appearance',
        term: 'Semantic color',
        value: { light: '#34c759', dark: '#30d158' },
        plain: "iOS's system green, white text on it; a fall gets the system red the same way.",
      },
      {
        kind: 'behavior',
        term: 'Tap to switch',
        plain: 'In stock apps a tap switches every pill at once between percent, price change and market value.',
      },
    ],
  },
];
