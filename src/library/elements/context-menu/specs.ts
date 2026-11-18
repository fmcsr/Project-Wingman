import type { UiElementSpec } from '../../../catalog';

/** Parts of the Context menu element, in the order they appear. `value` fields are the actual values from ContextMenu. */
export const contextMenuSpecs: UiElementSpec[] = [
  {
    id: 'context-menu',
    name: 'Context menu',
    htmlTag: '<div role="menu">',
    variant: 'Right-click on a file',
    summary:
      'The menu a right-click opens right at the pointer, with the actions for whatever was clicked, here a file: open it, rename it, share it, delete it.',
    aliases: ['right-click menu', 'shortcut menu', 'popup menu', 'the menu you get on right-click', 'secondary menu'],
    concepts: [
      {
        kind: 'behavior',
        term: 'contextmenu event',
        value: 'opens at the pointer',
        plain:
          'The page catches the right-click (or a two-finger click, or a long press on touch screens) and opens its own menu instead of the browser’s, with its top-left corner at the pointer.',
      },
      {
        kind: 'appearance',
        term: 'Menu material',
        value: {
          light: 'rgb(246 246 246 / 0.84) · blur(24px) · border-radius: 10px',
          dark: 'rgb(44 44 46 / 0.84) · blur(24px) · border-radius: 10px',
        },
        plain:
          'A translucent, frosted panel with a hairline edge and a soft shadow, as the operating system draws its own menus.',
      },
      {
        kind: 'behavior',
        term: 'Scale in from the corner',
        value: 'scale(0.95) → 1 · transform-origin: top left · 130ms',
        plain: 'It grows out of the point where you clicked, so it’s clear where it came from; closing, it fades away.',
      },
      {
        kind: 'behavior',
        term: 'Collision handling',
        plain:
          'Near the edge of the window it opens the other way, or moves just far enough to stay fully in view, like the submenu here.',
      },
    ],
  },
  {
    id: 'context-menu-item',
    name: 'Menu item',
    htmlTag: '<div role="menuitem">',
    variant: 'Icon · label · highlighted under the pointer',
    summary:
      'One action in the menu: an icon, its name and, on the right, its keyboard shortcut. The item under the pointer is highlighted, and a click runs it.',
    aliases: ['menu option', 'action', 'command', 'the highlighted row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight',
        value: { light: 'background: #1772f0 · border-radius: 5px', dark: 'background: #1b6fe0 · border-radius: 5px' },
        plain: 'A solid blue rounded bar with white text follows the pointer or the arrow keys down the menu.',
      },
      {
        kind: 'appearance',
        term: 'Row height',
        value: '22px · 13px text · 15px icons',
        plain: 'Compact rows, so a dozen actions still fit in a small panel next to the pointer.',
      },
      {
        kind: 'behavior',
        term: 'Keyboard navigation',
        value: '↑ ↓ move · ↩ runs · esc closes',
        plain: 'The arrow keys move the highlight, Return runs the action and Esc closes the menu.',
      },
    ],
  },
  {
    id: 'context-menu-shortcut',
    name: 'Keyboard shortcut',
    htmlTag: '<kbd>',
    variant: '⌘O · ↩ · ⌘D · ⌘⌫',
    summary:
      'The keys that run the same action without the menu, set in gray on the right of its row. The menu is where people learn them.',
    aliases: ['hotkey', 'key combo', 'accelerator', 'the keys on the right'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Right-aligned hint',
        value: { light: '12.5px · rgb(0 0 0 / 0.36)', dark: '12.5px · rgb(255 255 255 / 0.4)' },
        plain: 'Pushed to the right edge and gray, so the labels stay easy to scan; on the highlighted row it turns white.',
      },
      {
        kind: 'appearance',
        term: 'Modifier symbols',
        value: '⌘ command · ⌫ delete · ↩ return',
        plain: 'Keys are written as the symbols printed on the keyboard, held keys first: ⌘D means hold Command and press D.',
      },
    ],
  },
  {
    id: 'context-menu-separator',
    name: 'Separator',
    htmlTag: '<div role="separator">',
    variant: 'Between groups',
    summary:
      'A thin line that splits the menu into groups of related actions: working with the file, sharing it, and getting rid of it.',
    aliases: ['divider', 'menu divider', 'rule', 'the line between groups'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Hairline',
        value: { light: '1px · rgb(0 0 0 / 0.1) · 11px with its spacing', dark: '1px · rgb(255 255 255 / 0.12) · 11px with its spacing' },
        plain: 'A faint line with a little space above and below, inset from the menu’s edges.',
      },
      {
        kind: 'behavior',
        term: 'Grouping',
        plain: 'The arrow keys skip it; it only organizes, so a risky action like Delete sits apart from the everyday ones.',
      },
    ],
  },
  {
    id: 'context-menu-submenu',
    name: 'Submenu',
    htmlTag: '<div role="menu">',
    variant: 'Share › · opens beside its item',
    summary:
      'A second menu that opens beside an item with a chevron (›), for a set of related choices: here, the ways to share the file.',
    aliases: ['nested menu', 'cascading menu', 'flyout', 'the menu that opens to the side'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Hover delay',
        value: 'opens ~400ms after the pointer rests on Share',
        plain:
          'It waits a moment before opening, so passing over Share on the way to Delete doesn’t pop it open.',
      },
      {
        kind: 'appearance',
        term: 'aria-haspopup',
        value: 'chevron ›',
        plain:
          'The chevron at the end of Share says it opens more; Share stays highlighted while its submenu is open, so you can see where you are.',
      },
      {
        kind: 'behavior',
        term: 'Keeps within the window',
        plain: 'It opens level with its item and moves up or over just enough to stay fully on screen.',
      },
    ],
  },
  {
    id: 'context-menu-destructive',
    name: 'Destructive item',
    htmlTag: '<div role="menuitem">',
    variant: 'Delete · in red, at the bottom',
    summary:
      'The action that removes something, set in red and kept last behind a separator, so nobody picks it by accident.',
    aliases: ['danger item', 'delete option', 'red action', 'the red one'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Danger color',
        value: { light: 'color: #e0352b', dark: 'color: #ff5d52' },
        plain: 'Red text and a red icon set it apart from every other action at a glance.',
      },
      {
        kind: 'behavior',
        term: 'Placed last',
        value: 'after a separator',
        plain: 'At the bottom, away from the everyday actions, so a slip of the pointer doesn’t land on it.',
      },
    ],
  },
];
