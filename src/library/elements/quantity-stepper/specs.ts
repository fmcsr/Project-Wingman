import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Stepper element, in the order they appear. `value` fields are the actual values from QuantityStepper.
 */
export const quantityStepperSpecs: UiElementSpec[] = [
  {
    id: 'quantity-stepper',
    name: 'Stepper',
    htmlTag: '<div role="group">',
    variant: 'Round − and + around the count',
    summary:
      'A number you change one step at a time with a minus and a plus button. Made for small counts, where tapping is quicker than typing.',
    aliases: ['quantity picker', 'counter', 'plus minus buttons', 'number spinner', 'increment control'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inline stepper',
        value: '28px buttons · 28px value · gap: 4px',
        plain:
          'Two round buttons with the number between them, on the right of the row where the eye ends up. The buttons grow to 30px on a roomier tile.',
      },
      {
        kind: 'behavior',
        term: 'min / max',
        value: 'Adults ≥ 1 · Children ≥ 0 · Infants ≥ 0',
        plain: 'Each row has its own floor: a booking needs at least one adult, so Adults can’t go below 1.',
      },
      {
        kind: 'behavior',
        term: 'Live total',
        value: 'adults + children · infants not counted',
        plain: 'The popover’s head adds the rows up as you go: 2 adults and 1 child make 3 guests.',
      },
    ],
  },
  {
    id: 'quantity-stepper-decrement',
    name: 'Decrement button',
    htmlTag: '<button aria-label="Decrease">',
    variant: 'Outlined circle · −',
    summary: 'Takes one away. It works until the row reaches its minimum, then turns itself off.',
    aliases: ['minus button', 'decrease', 'the − circle', 'remove one'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outlined circle',
        value: {
          light: 'border: 1px solid #b0b0b0 · border-radius: 50%',
          dark: 'border: 1px solid #5e5e5e · border-radius: 50%',
        },
        plain:
          'A thin gray ring with a minus inside: light enough that the number between the buttons stays the focus.',
      },
      {
        kind: 'behavior',
        term: 'Hover and press',
        value: { light: 'border-color: #222 · scale(0.9)', dark: 'border-color: #f2f2f2 · scale(0.9)' },
        plain:
          'Under the pointer the ring and the minus darken; pressed, the button shrinks a little, like a real key.',
      },
    ],
  },
  {
    id: 'quantity-stepper-value',
    name: 'Value',
    htmlTag: '<span aria-live="polite">',
    variant: 'Rolls up or down',
    summary:
      'The current count between the buttons. A new number rolls in from below when it goes up and from above when it goes down.',
    aliases: ['count', 'number', 'quantity', 'the digit in the middle'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Rolling digits',
        value: 'translateY · 260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain:
          'The digits sit in a strip behind a one-digit window; the strip slides, so the change has a direction you can see.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: '15px · width: 28px',
        plain: 'Every digit is the same width and the window is fixed, so the buttons never shift when 1 becomes 2.',
      },
      {
        kind: 'behavior',
        term: 'aria-live',
        value: 'polite',
        plain: 'A screen reader announces the new number after each press, without interrupting.',
      },
    ],
  },
  {
    id: 'quantity-stepper-increment',
    name: 'Increment button',
    htmlTag: '<button aria-label="Increase">',
    variant: 'Outlined circle · +',
    summary: 'Adds one. The same ring as the minus, so the pair reads as one control around the number.',
    aliases: ['plus button', 'increase', 'add one', 'the + circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Matching pair',
        value: '28px · 14px glyph · stroke 1.75px',
        plain: 'Both buttons are the same size and weight; only the glyph differs, so neither looks more important.',
      },
      {
        kind: 'behavior',
        term: 'Applies at once',
        value: '+1 per press · “3 guests” → “4 guests”',
        plain:
          'Each press adds exactly one and the total in the popover’s head follows along; there’s no Apply button to forget.',
      },
    ],
  },
  {
    id: 'quantity-stepper-disabled',
    name: 'Disabled state',
    htmlTag: '<button disabled>',
    variant: 'At the minimum · faded',
    summary:
      'A button that can’t do anything right now: a minus at the lowest allowed count. It stays in place, faded, so the layout doesn’t jump.',
    aliases: ['greyed out', 'inactive button', 'can’t go lower', 'disabled minus'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Faded ring and glyph',
        value: { light: 'border-color: #ebebeb · color: #d4d4d4', dark: 'border-color: #2e2e2e · color: #4a4a4a' },
        plain: 'Both the ring and the minus fade almost into the panel: visibly there, clearly off.',
      },
      {
        kind: 'behavior',
        term: 'Refusal',
        value: 'shake ±2px · 360ms',
        plain: 'A press does nothing but a small shake, so you know the press landed and was refused, not missed.',
      },
      {
        kind: 'behavior',
        term: 'Turns on and off by itself',
        value: 'disabled when count ≤ min',
        plain: 'Taking Adults down to 1 turns its minus off; adding one back turns it on again.',
      },
    ],
  },
  {
    id: 'quantity-stepper-label',
    name: 'Row label',
    htmlTag: '<label>',
    variant: 'Name + age range',
    summary:
      'What the count is for, with a one-line hint underneath, so nobody has to guess whether a 12-year-old is a child or an adult.',
    aliases: ['row title', 'field label', 'helper text', 'the ages line'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two-line label',
        value: { light: '14px 600 · hint 12.5px #6a6a6a', dark: '14px 600 · hint 12.5px #a3a3a3' },
        plain:
          'A bold name and a quieter line under it: the name says what you’re counting, the hint where the line is.',
      },
      {
        kind: 'behavior',
        term: 'Shortened hint',
        value: '“Ages 13 or above” → “Ages 13+” under 264px',
        plain: 'Where the row is too narrow, the hint gets a shorter wording instead of being cut off.',
      },
    ],
  },
];
