import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Command palette element, in the order they appear. `value` fields are the actual values from
 * CommandPalette.
 */
export const commandPaletteSpecs: UiElementSpec[] = [
  {
    id: 'command-palette',
    name: 'Command palette',
    htmlTag: '<div role="dialog">',
    variant: '⌘K · over an issue list',
    summary:
      'A search box that opens over the whole app with a shortcut (⌘K) and runs any command by name: type a few letters, pick a result, press Enter. No menus, no mouse.',
    aliases: ['⌘K menu', 'command menu', 'quick actions', 'the search-everything box', 'spotlight for the app'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating dialog',
        value: 'width: min(560px, 90%) · border-radius: 12px',
        plain:
          'A card centered across the app but placed high, not in the middle, so the results have room to grow downward.',
      },
      {
        kind: 'appearance',
        term: 'Elevation',
        value: 'box-shadow: 0 24px 72px -12px',
        plain: 'A big, soft shadow lifts the palette off the dimmed app, so it reads as the one thing in front.',
      },
      {
        kind: 'behavior',
        term: 'Open and close',
        value: 'scale(0.98) → 1 + fade · 150ms in, 120ms out',
        plain: 'It appears in a blink, fading in as it grows the last 2%, and leaves a little faster than it came.',
      },
      {
        kind: 'behavior',
        term: 'Context chip',
        value: 'WEB-218',
        plain: 'Opened on an issue, it names that issue above the input: commands like Assign act on it.',
      },
    ],
  },
  {
    id: 'command-palette-input',
    name: 'Search input',
    htmlTag: '<input role="combobox">',
    variant: 'Query "assign" · filters as you type',
    summary:
      'The field at the top of the palette. Every letter filters the list below right away; there is no search button and no Enter to press.',
    aliases: ['search bar', 'search field', 'filter box', 'the box you type in'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: '"Type a command or search…"',
        plain: 'Gray hint text that says what the field is for and disappears with the first letter.',
      },
      {
        kind: 'appearance',
        term: 'caret-color',
        value: { light: '#3a63d8', dark: '#7393ff' },
        plain: 'The blinking text cursor takes the app’s blue, a small sign that the field is ready for typing.',
      },
      {
        kind: 'behavior',
        term: 'Filter as you type',
        value: 'a → 8 results · assign → 5',
        plain:
          'The list narrows with every key: "a" still matches eight commands, "assign" five. Matches can be anywhere, so "Reassign reviewers" shows up too.',
      },
    ],
  },
  {
    id: 'command-palette-group',
    name: 'Group heading',
    htmlTag: '<div role="group">',
    variant: 'Suggestions · Issues · Navigation',
    summary: 'A small gray label that sorts the results by kind: things you can do, issues that match, places to go.',
    aliases: ['section label', 'category', 'result group', 'subheader'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Muted label',
        value: { light: '11.5px · 500 · #8b8e97', dark: '11.5px · 500 · #6f727b' },
        plain: 'Small and gray, so it organizes the list without competing with the results.',
      },
      {
        kind: 'behavior',
        term: 'Empty groups hide',
        plain:
          'A group with no matches disappears, heading and all. Before anything is typed there is no Issues group; "assign" brings one in.',
      },
    ],
  },
  {
    id: 'command-palette-shortcut',
    name: 'Keyboard shortcut hint',
    htmlTag: '<kbd>',
    variant: 'One key · a sequence · a chord',
    summary:
      'Key caps at the end of a row, showing how to run that command without opening the palette at all. Using the palette is how people learn them.',
    aliases: ['hotkey', 'key combo', 'keyboard hint', 'the little keys on the right'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Key cap',
        value: 'height: 20px · border-radius: 5px · 1px border',
        plain: 'Each key in its own small bordered box, like the key on the keyboard.',
      },
      {
        kind: 'appearance',
        term: 'Sequence and chord',
        value: '"G then I" · "⌘ ⇧ P"',
        plain:
          '"G then I" means press G, let go, then press I. Keys side by side with no "then" are held down together.',
      },
      {
        kind: 'behavior',
        term: 'Global hotkey',
        value: 'works anywhere in the app',
        plain:
          'The same keys run the command without the palette, from any screen. The palette is where you learn them.',
      },
    ],
  },
  {
    id: 'command-palette-active',
    name: 'Highlighted option',
    htmlTag: '<div role="option" aria-selected="true">',
    variant: 'Neutral fill · moves with ↑ ↓',
    summary:
      'The row Enter will run. The arrow keys move the highlight, and it goes back to the first result whenever the query changes.',
    aliases: ['selected row', 'active item', 'current option', 'the gray bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight fill',
        value: { light: 'background: #f0f0f3 · border-radius: 8px', dark: 'background: #2a2b31 · border-radius: 8px' },
        plain: 'A soft gray rounded bar rather than a color: it marks the row without shouting.',
      },
      {
        kind: 'behavior',
        term: 'aria-activedescendant',
        value: '↑ ↓ move · ↵ runs',
        plain:
          'The typing focus stays in the input while the arrows move the highlight, so you can keep typing and still choose.',
      },
      {
        kind: 'behavior',
        term: 'Confirm flash',
        value: '240ms · blue tint',
        plain: 'On Enter the row flashes blue for a moment before the palette closes, so you see what ran.',
      },
    ],
  },
  {
    id: 'command-palette-scrim',
    name: 'Scrim',
    htmlTag: '<div>',
    variant: 'Dims the app behind',
    summary:
      'A see-through dark layer over the whole app while the palette is open. It pushes everything else back, and a click on it closes the palette.',
    aliases: ['backdrop', 'overlay', 'dimmed background', 'modal background'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Translucent black',
        value: { light: 'rgb(17 18 22 / 0.3)', dark: 'rgb(0 0 0 / 0.55)' },
        plain: 'Black at about a third in light mode, stronger in dark mode, where the app is already dark.',
      },
      {
        kind: 'behavior',
        term: 'Fade',
        value: 'opacity · 150ms',
        plain: 'It fades in and out with the palette instead of popping.',
      },
      {
        kind: 'behavior',
        term: 'Click outside to close',
        plain:
          'A click anywhere on the scrim closes the palette, like Esc; the app underneath is out of reach until then.',
      },
    ],
  },
];
