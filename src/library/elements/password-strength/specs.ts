import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Password strength meter element, in the order they appear. `value` fields are the actual values from
 * PasswordStrength.
 */
export const passwordStrengthSpecs: UiElementSpec[] = [
  {
    id: 'password-strength',
    name: 'Password strength meter',
    htmlTag: '<div role="meter">',
    variant: '4 segments · Good',
    summary:
      'A bar under a new password that fills and changes color as the password gets harder to guess, so people see the effect of every character they add.',
    aliases: ['strength bar', 'password meter', 'security indicator', 'the colored bars', 'password checker'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Segmented bar',
        value: '4 segments · height: 4px · gap: 4px',
        plain:
          'Four short bars instead of one long one, so the level reads as a count: three lit out of four is easy to judge at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Color by level',
        value: {
          light: 'oklch(0.6 0.2 25) → oklch(0.72 0.16 58) → oklch(0.74 0.17 128) → oklch(0.6 0.15 152)',
          dark: 'oklch(0.66 0.19 25) → oklch(0.76 0.15 62) → oklch(0.79 0.17 128) → oklch(0.7 0.16 152)',
        },
        plain:
          'Red, orange, lime, green: every lit segment takes the color of the current level, so the whole bar turns green only when the password is strong.',
      },
      {
        kind: 'behavior',
        term: 'Live scoring',
        value: 'on every key · +1 level per rule met',
        plain:
          'The score is worked out as you type, not when you submit. Anything typed is Weak; each rule met adds a level.',
      },
      {
        kind: 'behavior',
        term: 'Fill animation',
        value: 'scaleX 0 → 1 · 260ms from the left',
        plain: 'A newly lit segment fills from the left, and the others shift to the new color at the same time.',
      },
    ],
  },
  {
    id: 'password-strength-field',
    name: 'Password field',
    htmlTag: '<input type="password" autocomplete="new-password">',
    variant: 'Focused · masked',
    summary:
      'The text field for a new password. Each character shows as a dot, so nobody looking over your shoulder can read it.',
    aliases: ['password box', 'password input', 'the dots', 'hidden text field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Masked input',
        value: '• per character · 19px · letter-spacing: 1px',
        plain: 'Dots stand in for the characters: you can count what you typed but not read it.',
      },
      {
        kind: 'appearance',
        term: 'Focus ring',
        value: {
          light: 'border-color: #2563eb · box-shadow: 0 0 0 3px rgb(37 99 235 / 0.16)',
          dark: 'border-color: #60a5fa · box-shadow: 0 0 0 3px rgb(96 165 250 / 0.25)',
        },
        plain: 'A blue border and a pale halo while you type, so it’s clear which field has the keyboard.',
      },
      {
        kind: 'appearance',
        term: 'Text field',
        value: 'height: 40px · border-radius: 8px · padding-left: 12px',
        plain: 'A plain box with a little rounding and room for the eye button at its right end.',
      },
      {
        kind: 'behavior',
        term: 'autocomplete="new-password"',
        plain:
          'Tells the browser and password managers this is a new password, so they offer to generate and save one instead of filling an old one.',
      },
    ],
  },
  {
    id: 'password-strength-toggle',
    name: 'Show/hide toggle',
    htmlTag: '<button aria-label="Show password">',
    variant: 'Eye · slashed while shown',
    summary:
      'The eye inside the field: one click shows the password as plain text to check it, another hides it again.',
    aliases: ['eye icon', 'reveal password', 'peek button', 'show password'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Trailing icon button',
        value: '28px · icon 18px · stroke 1.6px',
        plain: 'A small icon button at the right end of the field, inside its border, so it clearly belongs to it.',
      },
      {
        kind: 'behavior',
        term: 'Toggle state',
        value: 'eye → eye with a slash · 200ms',
        plain:
          'The icon shows what a click will do next: an eye to show, the eye slashed to hide. The slash draws itself across.',
      },
      {
        kind: 'behavior',
        term: 'type="password" ↔ type="text"',
        value: 'dots ↔ text · instant',
        plain: 'Showing switches the field to plain text; nothing typed is lost, and the caret stays where it was.',
      },
    ],
  },
  {
    id: 'password-strength-label',
    name: 'Strength label',
    htmlTag: '<span aria-live="polite">',
    variant: 'Good',
    summary:
      'The meter’s level in one word, Weak, Fair, Good or Strong, so the bar’s colors don’t have to carry the meaning alone.',
    aliases: ['strength text', 'rating', 'the word next to the bar', 'level label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tinted text',
        value: { light: 'level color 72% + black · 12.5px 600', dark: 'level color 72% + white · 12.5px 600' },
        plain:
          'The word takes a darker shade of the level’s color (a lighter one in dark mode), dark enough to read on the page.',
      },
      {
        kind: 'behavior',
        term: 'aria-live',
        value: 'polite · fades 160ms',
        plain: 'A screen reader announces the new level when it changes, so the meter isn’t only visual.',
      },
    ],
  },
  {
    id: 'password-strength-checklist',
    name: 'Requirement checklist',
    htmlTag: '<ul>',
    variant: '2 of 3 met',
    summary:
      'The rules a password has to meet, listed up front. Each one ticks as soon as it’s met, so nobody has to find out by submitting.',
    aliases: ['password rules', 'requirements list', 'criteria', 'the ticks under the field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Check items',
        value: { light: 'ring #d4d4d8 → fill oklch(0.6 0.15 152)', dark: 'ring #52525b → fill oklch(0.7 0.16 152)' },
        plain: 'An empty ring for a rule not yet met; a green disc with a white tick, and darker text, once it is.',
      },
      {
        kind: 'behavior',
        term: 'Inline validation',
        value: 'checked on every key · tick 220ms',
        plain: 'The list updates as you type, and a tick draws itself in the moment a rule is met.',
      },
      {
        kind: 'behavior',
        term: 'Rules feed the meter',
        value: '8+ characters · a number · a symbol',
        plain: 'Each rule met is also one more lit segment, so the list explains why the meter moved.',
      },
    ],
  },
];
