import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Wheel picker element, in the order they appear. `value` fields are the actual values from WheelPicker.
 */
export const wheelPickerSpecs: UiElementSpec[] = [
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
];
