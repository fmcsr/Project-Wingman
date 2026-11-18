import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Combobox element, in the order they appear. `value` fields are the actual values from Combobox.
 */
export const comboboxSpecs: UiElementSpec[] = [
  {
    id: 'combobox',
    name: 'Combobox',
    htmlTag: '<input role="combobox">',
    variant: 'Searchable select · time zone',
    summary:
      'A text field and a dropdown in one: type a few letters to narrow a long list, then pick an option. It replaces a plain dropdown when there are too many choices to scroll through.',
    aliases: [
      'searchable dropdown',
      'autocomplete select',
      'typeahead',
      'filterable select',
      'the dropdown you can type in',
    ],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron icon',
        value: '16px up-down chevron',
        plain:
          'The small double arrow at the right end says “this opens a list”, while the text area says you can type, which is what sets it apart from a plain text field.',
      },
      {
        kind: 'behavior',
        term: 'Filter as you type',
        value: '"l" → 9 cities · "li" → 4 · "lis" → 3',
        plain:
          'Each letter narrows the list. A match can be anywhere in the name, so “lis” finds Lisbon, Indianapolis and Tbilisi.',
      },
      {
        kind: 'behavior',
        term: 'Select on open',
        plain:
          'Opening the field selects the current value’s text, so the first letter you type replaces it instead of adding to it.',
      },
      {
        kind: 'appearance',
        term: 'Focus ring',
        value: {
          light: 'border-color: #2c5fd4 · box-shadow: 0 0 0 3px rgb(44 95 212 / 0.2)',
          dark: 'border-color: #7ea6ff · box-shadow: 0 0 0 3px rgb(126 166 255 / 0.25)',
        },
        plain: 'While it’s open the field has a blue border and a pale blue halo, so it’s clear where typing goes.',
      },
    ],
  },
  {
    id: 'combobox-listbox',
    name: 'Listbox',
    htmlTag: '<ul role="listbox">',
    variant: 'Popover · grouped by region',
    summary:
      'The list of options that drops down under the field. It floats over the rest of the form and closes once you pick something.',
    aliases: ['dropdown list', 'options list', 'menu', 'the list that pops up'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Popover',
        value: '4px under the field · as wide as it · border-radius: 8px',
        plain: 'A floating card with a soft shadow, lined up with the field so it reads as part of it.',
      },
      {
        kind: 'appearance',
        term: 'max-height',
        value: '200px (176px on phones)',
        plain:
          'A long list stops at a set height and scrolls inside, so it never runs off the screen; 16 time zones don’t fit, three matches do.',
      },
      {
        kind: 'behavior',
        term: 'Scroll to the current value',
        value: 'its region’s label at the top',
        plain: 'Opened without typing, the list starts where the current value is, so you see your choice first.',
      },
      {
        kind: 'behavior',
        term: 'Open and close',
        value: 'fade + 4px drop · 150ms in, 120ms out',
        plain: 'It appears quickly and leaves a little faster than it came.',
      },
    ],
  },
  {
    id: 'combobox-option',
    name: 'Highlighted option',
    htmlTag: '<li role="option"> + aria-activedescendant',
    variant: 'Moved down to Lisbon with ↓',
    summary:
      'The option Enter will pick. It starts on the first match; the arrow keys move it while your typing stays in the field.',
    aliases: ['active option', 'hovered row', 'keyboard focus', 'the gray row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight fill',
        value: { light: 'background: #eef1f5 · border-radius: 5px', dark: 'background: #2b2e36 · border-radius: 5px' },
        plain: 'A soft gray bar, not a color, so it doesn’t get confused with the blue check of the saved value.',
      },
      {
        kind: 'behavior',
        term: 'aria-activedescendant',
        value: '↑ ↓ move · ↵ picks · Esc closes',
        plain:
          'The input keeps the keyboard focus and only points at the highlighted option, so you can type and choose without switching back and forth.',
      },
      {
        kind: 'behavior',
        term: 'Confirm flash',
        value: '240ms · blue tint',
        plain: 'On Enter the row flashes blue for a moment before the list closes, so you see what was picked.',
      },
    ],
  },
  {
    id: 'combobox-check',
    name: 'Selected check',
    htmlTag: '<li aria-selected="true">',
    variant: 'The current value · Indianapolis',
    summary:
      'A check next to the option that’s saved right now. It stays put while the highlight moves, until you pick something else.',
    aliases: ['checkmark', 'tick', 'current selection', 'selected state'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Checkmark',
        value: { light: '16px · stroke-width: 2 · #2c5fd4', dark: '16px · stroke-width: 2 · #7ea6ff' },
        plain: 'A small blue check at the end of the row, in a slot every row keeps, so the names line up.',
      },
      {
        kind: 'behavior',
        term: 'Selected vs highlighted',
        plain:
          'The check is what’s saved; the gray highlight is where the keyboard is. They’re on different rows until you press Enter.',
      },
    ],
  },
  {
    id: 'combobox-match',
    name: 'Matched text',
    htmlTag: '<mark>',
    variant: '"lis" in bold',
    summary: 'The letters you typed, picked out in each option, so you can see at a glance why it’s in the list.',
    aliases: ['match highlight', 'search highlight', 'bold letters', 'highlighted query'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bold match',
        value: { light: 'font-weight: 650 · #1a1f36', dark: 'font-weight: 650 · #e8e9ed' },
        plain: 'The matching letters are bold and darker than the rest of the name.',
      },
      {
        kind: 'behavior',
        term: 'Substring match',
        value: 'Lisbon · Indianapolis · Tbilisi',
        plain: 'The match can be at the start, the end or the middle of a name; each option shows where it found it.',
      },
    ],
  },
  {
    id: 'combobox-group',
    name: 'Group label',
    htmlTag: '<div role="group" aria-label>',
    variant: 'Americas · Europe · Asia',
    summary: 'A small heading that sorts the options into regions, so a long list is easier to scan.',
    aliases: ['section header', 'optgroup', 'category label', 'the small gray caps'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Small caps label',
        value: { light: '10.5px · 650 · uppercase · #687385', dark: '10.5px · 650 · uppercase · #8c93a1' },
        plain:
          'Tiny gray capitals with a little extra letter spacing: they organize the list without looking like options.',
      },
      {
        kind: 'behavior',
        term: 'Empty groups hide',
        plain: 'A region with no matches disappears along with its label, so no heading is left standing over nothing.',
      },
    ],
  },
];
