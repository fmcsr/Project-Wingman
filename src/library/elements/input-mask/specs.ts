import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Input mask element, in the order they appear. `value` fields are the actual values from InputMask.
 */
export const inputMaskSpecs: UiElementSpec[] = [
  {
    id: 'input-mask',
    name: 'Input mask',
    htmlTag: '<input type="tel" inputmode="tel">',
    variant: 'US phone · (___) ___-____',
    summary:
      'A field that formats what you type as you type it, so a phone number goes in as digits and comes out looking like a phone number.',
    aliases: ['masked input', 'formatted field', 'phone formatter', 'auto-format', 'input pattern'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Input mask',
        value: '(###) ###-####',
        plain:
          'A pattern the field fills in: only digits are accepted, and everything else in the pattern is put in for you.',
      },
      {
        kind: 'behavior',
        term: 'inputmode="tel"',
        value: 'type="tel" · autocomplete="tel-national"',
        plain: 'Phones open the number pad, and the browser can offer your own number to fill in.',
      },
      {
        kind: 'appearance',
        term: 'Focus ring',
        value: {
          light: 'border: 1px solid #18181b · box-shadow: 0 0 0 3px rgb(24 24 27 / 0.08)',
          dark: 'border: 1px solid #fafafa · box-shadow: 0 0 0 3px rgb(250 250 250 / 0.12)',
        },
        plain: 'While you type, the border turns to ink with a soft gray halo, so it’s clear which field has the keys.',
      },
      {
        kind: 'behavior',
        term: 'Validate on complete',
        value: { light: '10 digits → check #16a34a', dark: '10 digits → check #22c55e' },
        plain:
          'The tenth digit completes the number: a green check pops in at the end of the field and the Continue button turns on.',
      },
    ],
  },
  {
    id: 'input-mask-country',
    name: 'Country code',
    htmlTag: '<button aria-haspopup="listbox">',
    variant: '+1 · chip with a chevron',
    summary:
      'The country’s calling code, kept apart from the number itself. It opens a list of countries, and picking another one changes the mask.',
    aliases: ['dial code', 'country picker', 'calling code', 'the +1'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Leading chip',
        value: { light: 'background: #f4f4f5 · border-radius: 7px', dark: 'background: #26262a · border-radius: 7px' },
        plain: 'A gray chip inside the field’s left end, with a chevron that says it opens a menu.',
      },
      {
        kind: 'behavior',
        term: 'Mask per country',
        value: '+1 → (###) ###-####',
        plain: 'Each country has its own pattern and length; the code decides which mask the field uses.',
      },
    ],
  },
  {
    id: 'input-mask-separator',
    name: 'Auto-inserted separators',
    htmlTag: '<span>',
    variant: '( ) space and -',
    summary:
      'The parentheses, the space and the dash. Nobody types them: each one comes in by itself as soon as the digits before it are in.',
    aliases: ['formatting characters', 'literal characters', 'the brackets and dash', 'punctuation'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Literals',
        value: 'after digit 1 · 3 · 6',
        plain:
          'The opening parenthesis comes with the first digit, the closing one and the space with the third, the dash with the sixth.',
      },
      {
        kind: 'behavior',
        term: 'Caret skips literals',
        value: 'caret moves past ") " in one step',
        plain:
          'The caret jumps over a separator the moment it comes in, so the next digit lands in the right place; Backspace skips back over it too.',
      },
      {
        kind: 'appearance',
        term: 'Placeholder until reached',
        value: { light: '#a1a1aa → #18181b · 150ms', dark: '#5c5c66 → #fafafa · 150ms' },
        plain:
          'Before its turn a separator is drawn in placeholder gray; reached, it darkens to the color of the digits.',
      },
    ],
  },
  {
    id: 'input-mask-placeholder',
    name: 'Placeholder characters',
    htmlTag: '<span aria-hidden="true">',
    variant: 'Underscores still to fill',
    summary:
      'The underscores that show how many digits are still missing. Each one gives way to a digit as it’s typed.',
    aliases: ['slots', 'blanks', 'the underscores', 'mask placeholder'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Slot placeholder',
        value: { light: 'color: #a1a1aa · width: 1ch', dark: 'color: #5c5c66 · width: 1ch' },
        plain: 'A pale underscore exactly one digit wide, so you can count the digits left at a glance.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums · 16px (15px under 260px)',
        plain:
          'Every digit is as wide as its slot, so the line doesn’t shift when an underscore turns into a digit. Each digit lands with a 3px rise.',
      },
    ],
  },
  {
    id: 'input-mask-helper',
    name: 'Helper text',
    htmlTag: '<p id="phone-hint">',
    variant: 'Under the field',
    summary:
      'A short line under the field that says what the number is for. The field points to it, so screen readers read it along with the label.',
    aliases: ['hint', 'description', 'supporting text', 'the small print under the field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Muted hint',
        value: { light: '12.5px · color: #71717a', dark: '12.5px · color: #a1a1aa' },
        plain: 'Smaller and grayer than the label, so it reads as a side note, not an instruction.',
      },
      {
        kind: 'behavior',
        term: 'aria-describedby',
        value: 'aria-describedby="phone-hint"',
        plain: 'Ties the hint to the field, so it’s announced when the field gets focus.',
      },
    ],
  },
];
