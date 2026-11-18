import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Dynamic Island element, in the order they appear. `value` fields are the actual values from
 * DynamicIsland.
 */
export const dynamicIslandSpecs: UiElementSpec[] = [
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
];
