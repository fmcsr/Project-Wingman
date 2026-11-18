import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Hold to confirm element, in the order they appear. `value` fields are the actual values from
 * HoldToConfirm.
 */
export const holdToConfirmSpecs: UiElementSpec[] = [
  {
    id: 'hold-to-confirm',
    name: 'Hold-to-confirm button',
    htmlTag: '<button>',
    variant: 'Destructive · 1.5 s hold',
    summary:
      'A button you have to press and keep holding before it acts. It guards things you can’t take back, like deleting a project, without an extra “Are you sure?” step.',
    aliases: ['press and hold button', 'long-press button', 'hold to delete', 'the button that fills up'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Press and hold',
        value: '1.5s',
        plain:
          'Nothing happens on a tap. Only holding the button down for a second and a half deletes, so a slip of the finger can’t.',
      },
      {
        kind: 'behavior',
        term: 'Cancel on release',
        value: 'drains back · 450ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain: 'Let go before the end and the fill runs back to empty: it was only a try, and nothing is deleted.',
      },
      {
        kind: 'appearance',
        term: 'Destructive tint',
        value: {
          light: 'background: #fef2f2 · color: #b91c1c · height: 40px · border-radius: 10px',
          dark: 'background: #2a1517 · color: #ff8a8a · height: 40px · border-radius: 10px',
        },
        plain: 'A pale red button with red text: clearly the dangerous choice, but quiet until it’s used.',
      },
    ],
  },
  {
    id: 'hold-to-confirm-fill',
    name: 'Hold progress fill',
    htmlTag: '<span>',
    variant: 'Left to right · linear',
    summary:
      'The solid red that sweeps across the button while it’s held. It shows how long is left to hold, and lets you stop in time.',
    aliases: ['progress fill', 'loading bar in the button', 'the red that fills up', 'charge bar'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Linear progress',
        value: '0 → 100% in 1.5s · linear',
        plain:
          'It moves at a steady speed with no easing, so you can tell when it will reach the end. Here it stops at 45% the first time.',
      },
      {
        kind: 'appearance',
        term: 'clip-path: inset()',
        value: 'inset(0 calc((1 - progress) × 100%) 0 0)',
        plain:
          'A full red layer over the button, cut off at the progress with a straight edge, so it grows from the left without stretching.',
      },
      {
        kind: 'appearance',
        term: 'Fill color',
        value: { light: 'background: #dc2626', dark: 'background: #e5484d' },
        plain: 'The full-strength red the pale button turns into, a little more of it every moment it’s held.',
      },
    ],
  },
  {
    id: 'hold-to-confirm-label',
    name: 'Label',
    htmlTag: '<span>',
    variant: 'Hold to delete · two-tone',
    summary:
      'The words on the button. They say both what it does and how to do it, so nobody taps it and waits for something to happen.',
    aliases: ['button text', 'instruction', 'call to action', 'the words on the button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: {
          light: 'white → #b91c1c at the fill’s edge',
          dark: 'white → #ff8a8a at the fill’s edge',
        },
        plain:
          'The letters are painted with a two-color gradient instead of one color: white where the fill has passed, red ahead of it, so they stay readable on both.',
      },
      {
        kind: 'behavior',
        term: 'One progress value',
        value: '--hold-to-confirm: 0 → 1',
        plain: 'The fill and the white part of the label follow the same number, so the color changes exactly at the edge.',
      },
    ],
  },
  {
    id: 'hold-to-confirm-pressed',
    name: 'Pressed state',
    htmlTag: '<span>',
    variant: 'Shrink + ring',
    summary:
      'How the button looks while a finger or the mouse is down: a little smaller, with a ring around it, so you can feel it’s being held.',
    aliases: ['active state', 'held state', 'press feedback', 'the ring around the button'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Press scale',
        value: 'scale(0.97) · 150ms',
        plain: 'The button sinks to 97% of its size the moment it’s pressed, like a real key going down.',
      },
      {
        kind: 'appearance',
        term: 'Pressed ring',
        value: {
          light: '3px · 2px outside · rgb(220 38 38 / 0.22)',
          dark: '3px · 2px outside · rgb(229 72 77 / 0.35)',
        },
        plain: 'A soft red ring around the button, there only while it’s held, like a halo saying “keep going”.',
      },
      {
        kind: 'behavior',
        term: 'Spring back',
        value: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        plain: 'Let go and it pops back to full size, slightly overshooting first.',
      },
    ],
  },
  {
    id: 'hold-to-confirm-success',
    name: 'Success state',
    htmlTag: '<span role="status">',
    variant: 'Deleted · check',
    summary:
      'Once the fill reaches the end, the label becomes “Deleted” with a check: the action is done, no doubt about it.',
    aliases: ['done state', 'confirmation', 'completed state', 'the check'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Label swap',
        value: 'Hold to delete → Deleted · 120ms out, 200ms in',
        plain:
          'The instruction fades out, then the result fades in, in white on the now fully red button, so the two words never overlap.',
      },
      {
        kind: 'behavior',
        term: 'Check pop',
        value: 'scale(0.4) → 1 · 350ms with overshoot',
        plain: 'The check grows in quickly and slightly past its size, a small moment of finality.',
      },
    ],
  },
];
