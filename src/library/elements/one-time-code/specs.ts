import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the One-time code field element, in the order they appear. `value` fields are the actual values from
 * OneTimeCode.
 */
export const oneTimeCodeSpecs: UiElementSpec[] = [
  {
    id: 'one-time-code',
    name: 'One-time code field',
    htmlTag: '<input autocomplete="one-time-code">',
    variant: '6 digits · fills itself from the text message',
    summary:
      'Six boxes for the code a site texts you when you sign in. Each box takes one digit, and the code sends itself as soon as the last one is in.',
    aliases: ['OTP input', 'verification code boxes', 'PIN input', '2FA code field', 'the six little boxes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Segmented input',
        value: '6 slots · gap: 6px',
        plain:
          'One real input, drawn as six separate boxes. Typing, pasting and deleting work as in any text field; the boxes only show where each digit lands.',
      },
      {
        kind: 'behavior',
        term: 'autocomplete="one-time-code"',
        value: 'inputmode="numeric"',
        plain:
          'Tells the phone this is a texted code, so it offers the code above the keyboard and one tap fills all six boxes. The number pad opens instead of the full keyboard.',
      },
      {
        kind: 'behavior',
        term: 'Auto-advance',
        value: 'next empty slot',
        plain:
          'Each digit moves the caret to the next box and Backspace moves it back, so nobody has to tap from box to box.',
      },
      {
        kind: 'behavior',
        term: 'Auto-submit',
        value: 'on the 6th digit · verifying 1.1s',
        plain:
          'There is no Verify button: the last digit sends the code. The digits dim while it’s checked, then the boxes turn green and it says Verified.',
      },
    ],
  },
  {
    id: 'one-time-code-slot',
    name: 'Slot',
    htmlTag: '<div>',
    variant: 'Filled · one digit',
    summary:
      'One box per digit, so you can see at a glance how much of the code is in and check it against the message.',
    aliases: ['digit box', 'the boxes', 'cell', 'character box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Slot',
        value: 'border: 1px · border-radius: 8px',
        plain:
          'A box with a thin gray border and rounded corners, a little taller than wide. The corners grow to 10px where the boxes have room.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums · 600',
        plain: 'Every digit is drawn the same width, so a 1 sits as centered in its box as an 8.',
      },
      {
        kind: 'behavior',
        term: 'Success state',
        value: { light: 'border-color: #16a34a · 45ms apart', dark: 'border-color: #22c55e · 45ms apart' },
        plain:
          'When the code checks out, the borders turn green one after another, left to right, like a wave of approval.',
      },
    ],
  },
  {
    id: 'one-time-code-active-slot',
    name: 'Active slot',
    htmlTag: '<div data-active>',
    variant: 'Focus ring + caret',
    summary:
      'The box the next digit goes into. It looks focused: a blue border, a soft ring around it and a blinking caret.',
    aliases: ['focused box', 'current box', 'the blue box', 'cursor position'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Focus ring',
        value: {
          light: 'border-color: #2563eb · box-shadow: 0 0 0 3px rgb(37 99 235 / 0.18)',
          dark: 'border-color: #3b82f6 · box-shadow: 0 0 0 3px rgb(59 130 246 / 0.3)',
        },
        plain: 'A pale halo of the accent color around the box, outside its border. It marks where typing will go.',
      },
      {
        kind: 'appearance',
        term: 'Fake caret',
        value: 'width: 2px · height: 42%',
        plain: 'The real input is invisible, so the caret is drawn: a thin bar in the middle of the empty box.',
      },
      {
        kind: 'behavior',
        term: 'Caret blink',
        value: 'steps(1) · 1.1s',
        plain: 'The caret blinks on and off like a text cursor, so the field reads as waiting for you.',
      },
    ],
  },
  {
    id: 'one-time-code-resend',
    name: 'Resend timer',
    htmlTag: '<button disabled>',
    variant: 'Countdown · 0:24',
    summary:
      'Says when you can ask for a new code. Until the countdown runs out the link stays off, so an impatient tap doesn’t send a flood of texts.',
    aliases: ['resend link', 'countdown', 'cooldown timer', 'didn’t get a code?'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Cooldown',
        value: 'ticks every 1s',
        plain: 'A short wait between codes. When it reaches 0:00, the line turns into a Resend code link.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Equal-width digits, so the time doesn’t wiggle as it counts down.',
      },
    ],
  },
  {
    id: 'one-time-code-destination',
    name: 'Masked phone number',
    htmlTag: '<span>',
    variant: 'Last four digits',
    summary:
      'Shows where the code went without printing the whole number: enough to recognize your phone, too little for anyone looking over your shoulder.',
    aliases: ['hidden number', 'partial phone number', 'obfuscated number', 'the dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Masking',
        value: '•••• 4821',
        plain: 'Dots stand in for every digit but the last four.',
      },
      {
        kind: 'appearance',
        term: 'Emphasis',
        value: 'font-weight: 500 · full ink',
        plain: 'The number is darker than the words around it, so the eye lands on what you need to check.',
      },
    ],
  },
];
