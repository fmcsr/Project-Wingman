import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Shake on error element, in the order they appear. `value` fields are the actual values from
 * ShakeOnError.
 */
export const shakeOnErrorSpecs: UiElementSpec[] = [
  {
    id: 'shake-on-error',
    name: 'Shake on error',
    htmlTag: '<input type="password" aria-invalid="true">',
    variant: 'Password field · damped shake',
    summary:
      'A field that shakes side to side when what you typed is wrong, like a head shaking no. Here the password field shakes once and turns red.',
    aliases: ['error shake', 'wiggle', 'head-shake animation', 'the field jiggles', 'wrong password shake'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Damped shake',
        value: 'translateX: −10 → 8 → −6 → 4 → −2 → 1 → 0px · 400ms ease-in-out',
        plain:
          'Six quick swings, each smaller than the last, settling back in place in under half a second. Big enough to notice, too short to annoy.',
      },
      {
        kind: 'behavior',
        term: 'Once per attempt',
        value: 'plays as the error appears',
        plain:
          'It shakes once for each wrong try and never while you type, so it reads as an answer to what you just did.',
      },
      {
        kind: 'behavior',
        term: 'Clears on input',
        value: 'first keystroke',
        plain: 'As soon as you start typing again, the red and the message go away and the field is ready for another try.',
      },
    ],
  },
  {
    id: 'shake-on-error-border',
    name: 'Error border',
    variant: 'Red outline · 3px halo',
    summary:
      'The red outline the field takes on when its value is rejected, so the problem is marked right where it is.',
    aliases: ['red border', 'error outline', 'invalid state', 'the red box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Error color',
        value: { light: 'border: 1px solid #dc2626', dark: 'border: 1px solid #ef4444' },
        plain: 'The field’s thin gray border turns red.',
      },
      {
        kind: 'appearance',
        term: 'Error ring',
        value: { light: 'box-shadow: 0 0 0 3px rgb(220 38 38 / 0.15)', dark: 'box-shadow: 0 0 0 3px rgb(239 68 68 / 0.25)' },
        plain:
          'A soft red halo outside the border, in place of the gray focus ring, so the field still reads as the one you’re typing in.',
      },
      {
        kind: 'behavior',
        term: 'aria-invalid',
        value: 'aria-invalid="true" · aria-describedby → the message',
        plain:
          'Screen readers announce the field as invalid and read the message with it, so the red isn’t the only signal.',
      },
    ],
  },
  {
    id: 'shake-on-error-message',
    name: 'Inline error message',
    htmlTag: '<p role="alert">',
    variant: 'Under the field · tries left',
    summary:
      'The sentence under the field that says what went wrong and what’s at stake, instead of a vague “Something went wrong”.',
    aliases: ['validation message', 'error text', 'helper text', 'the red text under the field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Error text',
        value: { light: '12px · 500 · #dc2626 · alert icon', dark: '12px · 500 · #f87171 · alert icon' },
        plain: 'Small red text with an alert icon, right under the field it’s about.',
      },
      {
        kind: 'behavior',
        term: 'Reserved space',
        value: 'min-height: 32px',
        plain:
          'Room for the message is kept even when it’s empty, so the button doesn’t jump down when an error appears.',
      },
      {
        kind: 'behavior',
        term: 'Specific and actionable',
        value: '“Incorrect password. 2 tries left.”',
        plain:
          'It names the problem and the stakes: counting the tries left tells people to slow down before they’re locked out.',
      },
    ],
  },
  {
    id: 'shake-on-error-forgot',
    name: 'Forgot password link',
    htmlTag: '<a href>',
    variant: 'Recovery link · with the error',
    summary: 'The way out when you can’t remember: a link to reset the password, offered right where the error is.',
    aliases: ['reset password', 'password recovery', 'trouble signing in', 'forgot link'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Text link',
        value: 'text-decoration: underline · text-underline-offset: 2px · 500',
        plain: 'Underlined text in the ink color: clearly clickable, and quieter than the button.',
      },
      {
        kind: 'behavior',
        term: 'Offered at the right moment',
        value: 'appears with the message',
        plain:
          'It shows up after a wrong password, when it’s needed most, instead of competing with the form from the start.',
      },
    ],
  },
  {
    id: 'shake-on-error-button',
    name: 'Submit button',
    htmlTag: '<button type="submit">',
    variant: 'Loading → success',
    summary:
      'Sends the email and password. While they’re checked it shows a spinner in place of its label, and it turns green once you’re in.',
    aliases: ['sign in button', 'primary button', 'loading button', 'CTA'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Primary button',
        value: {
          light: 'background: #18181b · color: #fff · height: 34px',
          dark: 'background: #fafafa · color: #18181b · height: 34px',
        },
        plain: 'A full-width solid button in the ink color, the strongest thing on the card.',
      },
      {
        kind: 'behavior',
        term: 'Loading state',
        value: 'spinner in place of the label · 700ms a turn',
        plain:
          'The label gives way to a spinner while the password is checked, and the field dims, so nobody submits twice.',
      },
      {
        kind: 'behavior',
        term: 'Success state',
        value: 'background: #15803d · check · Signed in',
        plain: 'The button turns green with a check: the right password went through.',
      },
    ],
  },
];
