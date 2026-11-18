import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Tag input element, in the order they appear. `value` fields are the actual values from TagInput.
 */
export const tagInputSpecs: UiElementSpec[] = [
  {
    id: 'tag-input',
    name: 'Tag input',
    htmlTag: '<input role="combobox">',
    variant: 'Labels · chips + suggestions',
    summary:
      'A text field that turns what you type into chips. Each value becomes its own removable piece, so a field can hold several labels, topics or email addresses at once.',
    aliases: ['token field', 'chips input', 'multi-select field', 'tags box', 'the box with the pills in it'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inline chips',
        value: 'flex-wrap: wrap · gap: 5px',
        plain:
          'The chips sit in the field itself, followed by the text you’re typing. When they fill the line, the field grows a line instead of scrolling.',
      },
      {
        kind: 'behavior',
        term: 'Commit keys',
        value: '↵ adds the highlighted suggestion · , adds what’s typed',
        plain:
          'Enter turns the highlighted suggestion into a chip; a comma turns the typed text into one, so you can add several in a row without reaching for the mouse.',
      },
      {
        kind: 'behavior',
        term: 'Backspace to remove',
        value: '1st press selects the last chip · 2nd removes it',
        plain:
          'In the empty field, Backspace first highlights the last chip and only the second press deletes it, so a chip never disappears by accident.',
      },
      {
        kind: 'appearance',
        term: 'Focus ring',
        value: {
          light: 'border: 1px solid #2f6fde · box-shadow: 0 0 0 3px rgb(47 111 222 / 0.16)',
          dark: 'border: 1px solid #6f9bff · box-shadow: 0 0 0 3px rgb(111 155 255 / 0.22)',
        },
        plain: 'A blue border and a pale blue halo while you type in it.',
      },
    ],
  },
  {
    id: 'tag-input-chip',
    name: 'Chip',
    htmlTag: '<span>',
    variant: 'Label · color dot + name',
    summary:
      'One value in the field, drawn as a small pill. It moves and deletes as a single piece, unlike the letters around it.',
    aliases: ['token', 'tag', 'pill', 'label', 'badge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill',
        value: {
          light: 'height: 24px · border-radius: 999px · 1px #dfdfe4',
          dark: 'height: 24px · border-radius: 999px · 1px #393a41',
        },
        plain: 'Fully rounded ends and a thin outline: it reads as one object, not as text.',
      },
      {
        kind: 'appearance',
        term: 'Color dot',
        value: '8px · Bug #e5484d · Web #3e8ef7 · iOS #12a594',
        plain:
          'Each label keeps a color, but only in a small dot; the name stays dark gray, so every chip is easy to read in both themes.',
      },
      {
        kind: 'behavior',
        term: 'Selected state',
        value: {
          light: 'background: #e8effc · border-color: #2f6fde',
          dark: 'background: rgb(111 155 255 / 0.16) · border-color: #6f9bff',
        },
        plain: 'Picked out by Backspace or the arrow keys, the chip turns blue; one more Backspace removes it.',
      },
      {
        kind: 'behavior',
        term: 'Enter animation',
        value: 'scale(0.85) → 1 + fade · 160ms',
        plain: 'A new chip grows in from slightly smaller, so you see where your text went.',
      },
    ],
  },
  {
    id: 'tag-input-remove',
    name: 'Remove button',
    htmlTag: '<button aria-label="Remove Bug">',
    variant: '× inside the chip',
    summary: 'The small × at the end of a chip. One click takes that value out of the field.',
    aliases: ['the little x on the tag', 'delete button', 'clear button', 'close icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon button',
        value: {
          light: '16px round hit area · 6px cross · #8a8d94',
          dark: '16px round hit area · 6px cross · #7c7f87',
        },
        plain:
          'A light gray cross inside a small round target, quieter than the chip’s name so it doesn’t compete with it.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Remove Bug"',
        plain: 'A screen reader can’t read a cross, so each × says out loud which value it removes.',
      },
    ],
  },
  {
    id: 'tag-input-suggestions',
    name: 'Suggestion list',
    htmlTag: '<ul role="listbox">',
    variant: 'Narrowed by "des"',
    summary:
      'The labels that match what you’ve typed, in a small list under the field. Labels already on the issue are left out.',
    aliases: ['autocomplete', 'dropdown', 'typeahead', 'suggestions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Popover',
        value: '4px under the field · width: 232px · border-radius: 8px',
        plain: 'A small floating card with a soft shadow that covers the form below it while it’s open.',
      },
      {
        kind: 'behavior',
        term: 'Filter as you type',
        value: '"d" → Design, Desktop · "io" → iOS',
        plain: 'Each letter narrows the list to the labels whose name starts with what you typed.',
      },
      {
        kind: 'appearance',
        term: 'Match highlight',
        value: 'typed letters font-weight: 650',
        plain: 'The letters you’ve typed are bold in each suggestion, which shows why it matched.',
      },
    ],
  },
  {
    id: 'tag-input-option',
    name: 'Highlighted suggestion',
    htmlTag: '<li role="option" aria-selected="true">',
    variant: 'First match · ↵ adds it',
    summary:
      'The suggestion Enter will add. It starts on the first match, and the arrow keys move it while you keep typing.',
    aliases: ['active option', 'selected row', 'current suggestion', 'the gray row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight fill',
        value: { light: 'background: #f0f0f3 · border-radius: 5px', dark: 'background: #2d2e35 · border-radius: 5px' },
        plain: 'A soft gray bar marks the row, with a small ↵ key cap that says what Enter will do.',
      },
      {
        kind: 'behavior',
        term: 'aria-activedescendant',
        value: '↑ ↓ move · ↵ adds',
        plain:
          'Focus stays in the text field while the arrows move the highlight, so you can choose a suggestion without leaving the keyboard.',
      },
    ],
  },
];
