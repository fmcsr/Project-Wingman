import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Indeterminate checkbox element, in the order they appear. `value` fields are the actual values from
 * IndeterminateCheckbox.
 */
export const indeterminateCheckboxSpecs: UiElementSpec[] = [
  {
    id: 'indeterminate-checkbox',
    name: 'Indeterminate checkbox',
    htmlTag: '<input type="checkbox" aria-checked="mixed">',
    variant: 'Select all · 2 of 4 checked',
    summary:
      'The select-all box at the top of a list. It shows a dash when only some rows are checked, a check when all are, and stays empty when none are.',
    aliases: ['select all', 'master checkbox', 'parent checkbox', 'tri-state checkbox', 'the box with a dash'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Mixed state',
        value: { light: 'background: #1f5fcc · white dash', dark: 'background: #9dc1fb · dash #0a2b5c' },
        plain:
          'A filled box with a short line instead of a check: “some, not all”. It’s a third look a checkbox can take, next to empty and checked.',
      },
      {
        kind: 'behavior',
        term: 'indeterminate',
        value: 'el.indeterminate = true · aria-checked="mixed"',
        plain:
          'The dash can’t be set in HTML; code sets it whenever the rows below are partly checked, and screen readers hear “mixed”.',
      },
      {
        kind: 'behavior',
        term: 'Check or clear all',
        value: 'all checked → none · none → all',
        plain:
          'A click on the header’s box checks every row or clears them all. From the dash, most design systems check all, while mail apps clear the selection.',
      },
    ],
  },
  {
    id: 'indeterminate-checkbox-child',
    name: 'Row checkbox',
    htmlTag: '<input type="checkbox">',
    variant: 'Unchecked',
    summary: 'One box per row, to pick that file out of the list. Checking it counts toward the header’s box.',
    aliases: ['item checkbox', 'child checkbox', 'row select', 'tick box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Square box',
        value: {
          light: '16px · border: 1.5px solid #6b7079 · border-radius: 4px',
          dark: '16px · border: 1.5px solid #9ca0a8 · border-radius: 4px',
        },
        plain: 'A small rounded square with a gray outline, in the same column on every row so they line up.',
      },
      {
        kind: 'behavior',
        term: 'State layer',
        value: { light: '32px circle · 8% ink on hover', dark: '32px circle · 10% ink on hover' },
        plain: 'Under the pointer a soft gray circle appears behind the box, a bigger target than the box itself.',
      },
    ],
  },
  {
    id: 'indeterminate-checkbox-checked',
    name: 'Checked state',
    htmlTag: '<input type="checkbox" checked>',
    variant: 'Filled · row tinted',
    summary:
      'A checked row: the box fills with blue and a check draws in, and the whole row takes a pale blue tint so the selection reads from across the list.',
    aliases: ['ticked', 'selected row', 'checkmark', 'highlighted row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled box',
        value: { light: 'background: #1f5fcc · white check', dark: 'background: #9dc1fb · check #0a2b5c' },
        plain:
          'Blue with a white check in light mode; light blue with a dark check in dark mode, so it glows on black.',
      },
      {
        kind: 'appearance',
        term: 'Selected row',
        value: { light: 'background: #e8effc', dark: 'background: #1d2f4a' },
        plain: 'The row behind the box tints too, so a long list shows at a glance which rows are in the selection.',
      },
      {
        kind: 'behavior',
        term: 'Check draws in',
        value: 'fill 120ms · check 160ms after 60ms · press scale(0.88)',
        plain: 'The box gives a little under the click, fills, and the check draws itself from left to right.',
      },
    ],
  },
  {
    id: 'indeterminate-checkbox-bar',
    name: 'Bulk action bar',
    htmlTag: '<div role="toolbar">',
    variant: 'In place of the column headers',
    summary:
      'The actions for everything that’s checked, shown only while something is. It takes the header’s place, so the list doesn’t move.',
    aliases: ['selection bar', 'bulk actions', 'contextual toolbar', 'batch actions', 'action bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Contextual toolbar',
        value: { light: 'background: #dbe6fa · color: #0f3f8f', dark: 'background: #233a5c · color: #d3e3fd' },
        plain: 'A tinted strip with the count on the left and the actions on the right: Move and Delete.',
      },
      {
        kind: 'behavior',
        term: 'Swap in place',
        value: 'fade + 4px slide · 180ms',
        plain:
          'With the first check the column names fade out and the bar fades in where they were; clearing the selection brings them back.',
      },
      {
        kind: 'behavior',
        term: 'Acts on the selection',
        value: 'Move · Delete',
        plain: 'Each action applies to every checked row at once, instead of one file at a time.',
      },
    ],
  },
  {
    id: 'indeterminate-checkbox-count',
    name: 'Selection count',
    htmlTag: '<span aria-live="polite">',
    variant: '2 selected',
    summary: 'How many rows are checked, in words. It confirms what an action will touch before you press it.',
    aliases: ['counter', 'number selected', 'n selected', 'selection summary'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count label',
        value: '13px 600 · tabular-nums',
        plain: 'A short bold line that leads the bar; equal-width digits keep it from wobbling as it counts.',
      },
      {
        kind: 'behavior',
        term: 'aria-live',
        value: 'polite',
        plain: 'A screen reader announces the new count after each check, without interrupting.',
      },
    ],
  },
];
