import type { UiElementSpec } from '../types';

/**
 * Elements in the gallery's iOS tiles: Dynamic Island, wheel picker, bottom sheet and swipe actions.
 * `value` fields are the tiles' actual values (src/landing/gallery/).
 */
export const iosGallery: UiElementSpec[] = [
  {
    id: 'dynamic-island',
    name: 'Dynamic Island',
    variant: 'Live Activity · ride on its way',
    summary:
      'The black shape around the front camera that apps borrow for live updates. A ride waits in it as a small pill, and it grows to show more when something changes or you touch and hold it.',
    aliases: ['the pill at the top', 'the notch', 'the black bar around the camera', 'live activity'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Compact presentation',
        value: '220 × 37px · leading + trailing',
        plain:
          'Its everyday size: one small item on each side of the camera, here the car and the minutes left. The status bar keeps its place beside it.',
      },
      {
        kind: 'behavior',
        term: 'Expanded presentation',
        value: '380 × 144px',
        plain:
          'Touching and holding it, or an update the app marks as important, opens it almost to the edges of the screen for a few seconds, over the status bar.',
      },
      {
        kind: 'behavior',
        term: 'Spring animation',
        value: 'linear() spring, 3% overshoot · 640ms',
        plain:
          'The shape grows and shrinks with a slight bounce, as if it were elastic, and its content fades in just after it, so the black shape always leads.',
      },
      {
        kind: 'appearance',
        term: 'Concentric corners',
        value: 'border-radius: 44px (55 − 11)',
        plain:
          "Open, its corners are the screen's own corners less the 11pt gap around it, so the two curves run side by side.",
      },
    ],
  },
  {
    id: 'dynamic-island-expanded-leading',
    name: 'Expanded leading',
    variant: 'Car symbol',
    summary:
      "The space left of the camera when the island is open. It usually repeats the compact view's leading item at a larger size, here the car.",
    aliases: ['left side of the island', 'the icon on the left', 'leading region'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Symbol in the activity color',
        value: '33 × 22px · #ffd60a',
        plain:
          'A filled glyph in the color the app picked for its activity. It is the same car as in the compact view, only bigger, so the eye follows it as the island grows.',
      },
      {
        kind: 'appearance',
        term: 'Content margins',
        value: 'top: 16px · left: 25px',
        plain:
          'Content keeps clear of the rounded corners and of the camera in the middle, which no app may draw over.',
      },
    ],
  },
  {
    id: 'dynamic-island-expanded-trailing',
    name: 'Expanded trailing',
    variant: 'ETA',
    summary: 'The space right of the camera. It holds the one figure you came for: the minutes until the car arrives.',
    aliases: ['the ETA', 'right side of the island', 'the countdown', 'trailing region'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Large figure, small unit',
        value: '26px / 17px · 600',
        plain: 'The number is big and the unit small, so the 4 reads at a glance and "min" just explains it.',
      },
      {
        kind: 'appearance',
        term: 'Activity color',
        value: '#ffd60a',
        plain:
          "The ride's own yellow marks what matters most; the island stays black in light and dark mode, so the color always has the same backdrop.",
      },
      {
        kind: 'behavior',
        term: 'Live update',
        plain:
          'The app updates the figure from its server while the ride lasts, even when it is closed, so the island is never out of date.',
      },
    ],
  },
  {
    id: 'dynamic-island-expanded-center',
    name: 'Expanded center',
    variant: 'Driver, car and plate',
    summary: 'The space below the camera: who is coming, and how to recognize the car at the curb.',
    aliases: ['driver details', 'the middle row', 'car and plate', 'center region'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Avatar',
        value: '36px · border-radius: 50%',
        plain: "The driver's photo in a circle, so you know who to look for.",
      },
      {
        kind: 'appearance',
        term: 'Secondary label',
        value: 'rgb(235 235 245 / 0.6)',
        plain:
          "iOS's gray for supporting text on dark backgrounds: the car and the rating step back behind the driver's name.",
      },
      {
        kind: 'appearance',
        term: 'Plate badge',
        value: 'rgb(255 255 255 / 0.14) · letter-spacing: 0.06em',
        plain:
          'The plate sits in its own tinted badge with wide letter spacing: the detail people check before they get in.',
      },
    ],
  },
  {
    id: 'dynamic-island-expanded-bottom',
    name: 'Expanded bottom',
    variant: 'Route progress',
    summary:
      'The full-width space at the bottom: the route from the car to your pickup point, with where to meet and when.',
    aliases: ['progress bar', 'the route line', 'trip tracker', 'bottom region'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Progress bar',
        value: 'height: 4px · 66% done',
        plain: 'The yellow part is the way the car has come. The white dot is the car, the ring at the end is you.',
      },
      {
        kind: 'behavior',
        term: 'Progress update',
        value: '58% → 66% · 2600ms ease-in-out',
        plain: 'Each time the island opens, the car moves on along the line as the app sends its new position.',
      },
      {
        kind: 'appearance',
        term: 'Caption row',
        value: '12px · justify-content: space-between',
        plain: 'The meeting point on the left and the arrival time on the right, in small gray text under the line.',
      },
    ],
  },
  {
    id: 'wheel-picker',
    name: 'Wheel picker',
    htmlTag: '<input type="time">',
    variant: 'Time · wheels style',
    summary:
      'Values on spinning wheels, one wheel for each part of the time. You flick a wheel, it slows down, and the value that comes to rest in the gray band is the one picked.',
    aliases: ['spinner', 'scroll wheel', 'drum picker', 'slot machine picker', 'time spinner'],
    concepts: [
      {
        kind: 'appearance',
        term: '3D cylinder',
        value: 'rotateX(20.3° a row) translateZ(96px)',
        plain:
          'Each value sits on the rim of a turning drum. The further it is from the band, the more it tilts away and flattens, like the side of a can.',
      },
      {
        kind: 'appearance',
        term: 'Fade along the wheel',
        value: 'opacity: e^(−0.75 × rows away)',
        plain:
          'Values lose about half their strength one row from the band and are gone by the third, so the eye lands on the middle.',
      },
      {
        kind: 'behavior',
        term: 'Momentum scrolling',
        value: 'exponential ease-out · 480ms + 70ms a row, up to 1500ms',
        plain:
          'A flick keeps the wheel turning after the finger lets go, slower and slower, and a longer flick spins it further.',
      },
      {
        kind: 'behavior',
        term: 'Snap to row',
        value: 'row height: 34px',
        plain: 'It never stops between two values: the spin always ends with one resting exactly in the band.',
      },
    ],
  },
  {
    id: 'wheel-picker-selection-indicator',
    name: 'Selection indicator',
    variant: 'Rounded band',
    summary: 'The gray band across the middle of the wheels. Whatever rests in it is the value picked.',
    aliases: ['the gray bar', 'highlight', 'selection band', 'the lens'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tertiary fill',
        value: { light: 'rgb(118 118 128 / 0.12)', dark: 'rgb(118 118 128 / 0.24)' },
        plain:
          "iOS's see-through gray for quiet shapes: it works on any background, and is stronger in dark mode so it still shows.",
      },
      {
        kind: 'appearance',
        term: 'One row tall',
        value: 'height: 34px · border-radius: 10px',
        plain:
          'Exactly the height of a row, with soft corners, and it runs across all three wheels so they read as one time.',
      },
    ],
  },
  {
    id: 'wheel-picker-wheel',
    name: 'Wheel',
    variant: 'Hours · 1 to 12, endless',
    summary:
      'One column of the picker, turning on its own: here the hours. After the last value comes the first again, so it can spin as far as you like.',
    aliases: ['column', 'component', 'reel', 'the hours'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Cyclic list',
        value: '12 → 1 → 2 …',
        plain:
          'After 12 comes 1 again, so there is no end to hit. The AM/PM wheel, with only two values, does stop at both ends.',
      },
      {
        kind: 'appearance',
        term: 'Tabular digits',
        value: 'text-align: right · tabular-nums',
        plain:
          "Hours line up against the minutes, and every digit takes the same width, so the numbers don't wobble as they pass.",
      },
    ],
  },
  {
    id: 'wheel-picker-confirm',
    name: 'Confirm button',
    htmlTag: '<button>',
    variant: 'Prominent · check mark',
    summary:
      'The round check mark in the top corner of the sheet: it saves the alarm and closes the sheet. iOS 26 sheets use it in place of a word like Save.',
    aliases: ['save button', 'done button', 'the check mark', 'the orange tick'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Prominent style',
        value: { light: '#ff9500', dark: '#ff9f0a' },
        plain:
          "Filled with the app's accent, orange for an alarm clock, so the one action that saves stands out from Close.",
      },
      {
        kind: 'appearance',
        term: 'Symbol button',
        value: '34px · border-radius: 50%',
        plain:
          'A round button with a symbol instead of a word. The close button opposite has the same shape, without the color.',
      },
    ],
  },
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
  {
    id: 'swipe-actions',
    name: 'Swipe actions',
    htmlTag: '<div role="group">',
    variant: 'Trailing · More, Flag, Trash',
    summary:
      'Buttons hidden behind a list row that come into view when you swipe the row sideways: quick actions on one item without opening it.',
    aliases: ['swipe to delete', 'slide actions', 'row actions', 'hidden buttons', 'swipe menu'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Swipe to reveal',
        value: 'translateX(−216px) · 420ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain:
          'Swiping left slides the row aside and uncovers its actions. A swipe back, or a tap anywhere else, closes it again.',
      },
      {
        kind: 'appearance',
        term: 'Full-height buttons',
        value: 'width: 72px · symbol over label',
        plain: 'Each action is a solid block of color as tall as the row, with a white symbol and a one-word label.',
      },
      {
        kind: 'appearance',
        term: 'Color by meaning',
        value: { light: '#8e8e93 · #ff9500 · #ff3b30', dark: '#8e8e93 · #ff9f0a · #ff453a' },
        plain: 'Gray for More, orange for Flag, red for Trash, so the eye finds the right one before reading it.',
      },
    ],
  },
  {
    id: 'swipe-actions-destructive',
    name: 'Destructive action',
    htmlTag: '<button>',
    variant: 'Trash · full swipe',
    summary:
      'The red action at the far end of the row. Swiping all the way across fires it without a tap: the red stretches over the row and the row is gone.',
    aliases: ['delete button', 'trash', 'the red one', 'swipe to delete'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Destructive role',
        value: { light: '#ff3b30', dark: '#ff453a' },
        plain:
          'System red marks the action that removes something, and it sits at the very end, furthest from a casual swipe.',
      },
      {
        kind: 'behavior',
        term: 'Full swipe',
        value: 'translateX(−100%) · 420ms',
        plain:
          'Keep swiping past the buttons and the red one stretches across the row, its symbol riding along at the edge, and fires on its own.',
      },
      {
        kind: 'behavior',
        term: 'Row removal',
        value: 'translateY(−71px) · 380ms',
        plain: 'The deleted row disappears and the rows below slide up to close the gap.',
      },
    ],
  },
  {
    id: 'swipe-actions-leading',
    name: 'Leading swipe action',
    htmlTag: '<button>',
    variant: 'Unread',
    summary:
      'The action on the other side of the row, revealed by swiping right: here it marks a message as unread again.',
    aliases: ['swipe right', 'mark as unread', 'left action'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tint',
        value: { light: '#007aff', dark: '#0a84ff' },
        plain: 'System blue, the color of the unread dot it brings back.',
      },
      {
        kind: 'appearance',
        term: 'One button wide',
        value: 'width: 76px · translateX(76px)',
        plain: "With a single action, the row only moves aside by that one button's width.",
      },
      {
        kind: 'behavior',
        term: 'Toggle',
        plain: 'On a read message it says Unread, on an unread one Read: the same swipe always flips the state.',
      },
    ],
  },
  {
    id: 'swipe-actions-row',
    name: 'List row',
    htmlTag: '<li>',
    variant: 'Message',
    summary: 'One message in the inbox: who sent it, the subject, the start of the text and when it arrived.',
    aliases: ['cell', 'list item', 'message row', 'email'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three lines',
        value: '16px · 600 / 14.5px / 14.5px',
        plain: 'The sender in bold, the subject in regular text, then a gray preview cut short with an ellipsis.',
      },
      {
        kind: 'appearance',
        term: 'Disclosure indicator',
        value: 'chevron · 7 × 11px',
        plain: 'The small gray arrow after the time says the row opens something.',
      },
      {
        kind: 'appearance',
        term: 'Inset separator',
        value: 'left: 28px · 0.5px',
        plain: 'The hairline between rows starts where the text starts, leaving the margin to the unread dot.',
      },
    ],
  },
  {
    id: 'swipe-actions-unread-dot',
    name: 'Unread indicator',
    variant: 'Blue dot',
    summary: "The blue dot in the margin of a message you haven't opened yet.",
    aliases: ['blue dot', 'new message dot', 'unread badge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dot',
        value: { light: '10px · #007aff', dark: '10px · #0a84ff' },
        plain: "A small circle in the system blue, level with the sender's name.",
      },
      {
        kind: 'behavior',
        term: 'Clears on open',
        plain: 'Opening the message takes the dot away; the leading swipe action can bring it back.',
      },
    ],
  },
];
