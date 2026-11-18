import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Progress button element, in the order they appear. `value` fields are the actual values from
 * ProgressButton.
 */
export const progressButtonSpecs: UiElementSpec[] = [
  {
    id: 'progress-button',
    name: 'Progress button',
    htmlTag: '<button>',
    variant: 'Download · Get → ring → Open',
    summary:
      'A button that shows its own progress: tap Get and it turns into a ring that fills as the app downloads, then it says Open. No separate progress bar, no new screen.',
    aliases: ['download button', 'get button', 'stateful button', 'loading button', 'the circle that fills up'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill button',
        value: {
          light: '74 × 28px · border-radius: 14px · background: rgb(118 118 128 / 0.12)',
          dark: '74 × 28px · border-radius: 14px · background: rgb(118 118 128 / 0.24)',
        },
        plain: 'A small gray capsule with a bold blue label, quiet enough to sit on every row of a list.',
      },
      {
        kind: 'behavior',
        term: 'Morph',
        value: 'clip-path: inset(0 23px round 14px) · 300ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain:
          'On tap the pill pulls in from both sides into a circle as tall as itself, so the progress takes the button’s place instead of appearing somewhere else.',
      },
      {
        kind: 'behavior',
        term: 'One button, every state',
        value: 'Get → waiting → downloading → Open',
        plain: 'The same spot always shows what’s happening and what you can do next.',
      },
    ],
  },
  {
    id: 'progress-button-waiting',
    name: 'Waiting state',
    htmlTag: '<div role="progressbar">',
    variant: 'Queued · spinning ring',
    summary:
      'The ring that turns before the download starts: the app is queued behind another one, and there’s no progress to show yet.',
    aliases: ['queued', 'pending', 'indeterminate spinner', 'loading circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Open ring',
        value: '28px · 2.25px stroke · three quarters of a circle',
        plain: 'A thin gray ring with a gap in it, the same size as the progress ring that will follow.',
      },
      {
        kind: 'behavior',
        term: 'Indeterminate',
        value: 'rotate: 1turn · 1s linear infinite',
        plain: 'It spins without filling, because nobody knows yet how long the wait will be.',
      },
    ],
  },
  {
    id: 'progress-button-ring',
    name: 'Progress ring',
    htmlTag: '<div role="progressbar" aria-valuenow="60">',
    variant: '60% · clockwise from the top',
    summary:
      'The circle that fills in blue as the download goes, like a clock hand sweeping round. How far along it is shows at a glance.',
    aliases: ['circular progress', 'download ring', 'progress circle', 'radial progress'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and arc',
        value: {
          light: 'track rgb(118 118 128 / 0.2) · arc #007aff · 2.25px',
          dark: 'track rgb(118 118 128 / 0.32) · arc #0a84ff · 2.25px',
        },
        plain: 'A pale gray circle for the whole download, and a blue arc over it for the part that’s done.',
      },
      {
        kind: 'behavior',
        term: 'Determinate fill',
        value: 'stroke-dasharray: 60 100 · pathLength="100"',
        plain: 'The blue part is exactly the share downloaded, starting at 12 o’clock and going clockwise.',
      },
      {
        kind: 'behavior',
        term: 'Steady between updates',
        value: 'linear from one update to the next',
        plain: 'It glides from each update to the next, faster or slower as the data comes in, like a real download.',
      },
    ],
  },
  {
    id: 'progress-button-stop',
    name: 'Stop control',
    htmlTag: '<button aria-label="Stop download">',
    variant: 'Square in the ring',
    summary: 'The small square inside the ring. Tap it to cancel the download, and the button says Get again.',
    aliases: ['stop button', 'cancel download', 'the square', 'stop icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Stop glyph',
        value: { light: '9 × 9px · border-radius: 2px · #007aff', dark: '9 × 9px · border-radius: 2px · #0a84ff' },
        plain: 'A small rounded square, the universal sign for stop, centered in the ring.',
      },
      {
        kind: 'behavior',
        term: 'Cancel',
        value: 'back to Get',
        plain: 'Stopping leaves nothing half-installed: the ring goes and the button is back where it started.',
      },
    ],
  },
  {
    id: 'progress-button-done',
    name: 'Done state',
    htmlTag: '<button>',
    variant: 'Open',
    summary:
      'Once the app is installed, the ring opens back out into a pill that says Open: the button’s job has changed from getting the app to launching it.',
    aliases: ['open button', 'installed', 'complete state', 'success state'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Expand back',
        value: 'clip-path: inset(0 round 14px) · 300ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain: 'The circle widens back into the pill, and the new word fades in.',
      },
      {
        kind: 'appearance',
        term: 'Same pill, new label',
        value: '15px · 700 · Open',
        plain: 'It looks just like Get, so the list stays calm; only the word changes.',
      },
    ],
  },
];
