import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Collapsible sidebar element, in the order they appear. `value` fields are the actual values from
 * CollapsibleSidebar.
 */
export const collapsibleSidebarSpecs: UiElementSpec[] = [
  {
    id: 'collapsible-sidebar',
    name: 'Collapsible sidebar',
    htmlTag: '<nav aria-label="Main">',
    variant: 'Open · folds to an icon rail',
    summary:
      'The column of navigation down the left of an app: your workspace, where you are and where you can go. It folds down to a rail of icons when the content needs the room.',
    aliases: ['side nav', 'left menu', 'navigation drawer', 'side panel', 'the menu on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inset layout',
        value: {
          light: 'sidebar #f4f4f5 · content in a #ffffff panel, radius 10px',
          dark: 'sidebar #0e0f11 · content in a #17181b panel, radius 10px',
        },
        plain:
          'The sidebar sits on the window’s gray and the page floats beside it in a card with rounded corners, so the two read as frame and content.',
      },
      {
        kind: 'appearance',
        term: 'Nav item',
        value: '28px rows · 13px medium · 16px icons',
        plain: 'Compact rows: an icon, a label and, where it helps, a count on the right.',
      },
      {
        kind: 'behavior',
        term: 'Collapse',
        value: 'width → 52px · 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain:
          'It narrows to its icons in a fifth of a second while the content beside it stretches into the room at the same pace.',
      },
      {
        kind: 'behavior',
        term: 'Remembered state',
        value: 'saved per person',
        plain: 'Folded or open, it stays that way the next time you open the app.',
      },
    ],
  },
  {
    id: 'collapsible-sidebar-active',
    name: 'Active item',
    htmlTag: '<a aria-current="page">',
    variant: 'My issues · neutral fill',
    summary:
      'The item for the page you’re on: filled in gray, its text a step darker. On the rail it stays marked, as a gray square behind its icon.',
    aliases: ['selected item', 'current page', 'highlighted link', 'the one I’m on'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected fill',
        value: {
          light: 'background: #e3e3e7 · border-radius: 6px',
          dark: 'background: #25262b · border-radius: 6px',
        },
        plain: 'A soft gray shape behind the row rather than a color, so it marks the place without shouting.',
      },
      {
        kind: 'appearance',
        term: 'Count',
        value: '12 · 12px · gray',
        plain: 'How many things wait there, here the 12 issues assigned to you. Unread ones get a colored badge instead, as on Inbox.',
      },
      {
        kind: 'behavior',
        term: 'aria-current="page"',
        value: 'on one item',
        plain: 'Tells screen readers which item is the current page, the way the fill tells everyone else.',
      },
    ],
  },
  {
    id: 'collapsible-sidebar-section',
    name: 'Collapsible section',
    htmlTag: '<button aria-expanded="true">',
    variant: 'Favorites · open, with nested pages',
    summary:
      'A group of items under a small gray heading. A click on the heading folds the group away and turns its triangle to point right; the sections below move up.',
    aliases: ['sidebar group', 'expandable section', 'folder', 'accordion', 'the little triangle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Disclosure triangle',
        value: 'rotate(90deg) open · 0deg folded · 150ms',
        plain:
          'The small triangle after the heading points down while the group is open and right once it’s folded: it shows the state and invites the click.',
      },
      {
        kind: 'appearance',
        term: 'Section heading',
        value: { light: '12px · 500 · #8a8c94', dark: '12px · 500 · #6e717a' },
        plain: 'Smaller and grayer than the items, so it organizes the list without competing with it.',
      },
      {
        kind: 'appearance',
        term: 'Nested pages',
        value: 'indent: 20px',
        plain: 'Pages inside a page sit 20px further in, so the tree reads at a glance.',
      },
      {
        kind: 'behavior',
        term: 'Fold',
        value: 'opacity 150ms + 6px lift · sections below 200ms',
        plain:
          'The items fade out with a small lift and the sections below slide up into their place; opening plays it backward.',
      },
    ],
  },
  {
    id: 'collapsible-sidebar-rail',
    name: 'Icon rail',
    htmlTag: '<nav>',
    variant: '52px · icons only',
    summary:
      'The strip of icons down the sidebar’s left edge, and all that’s left when it folds: one icon per item, the active one still marked. Hovering an icon names it in a tooltip.',
    aliases: ['mini sidebar', 'collapsed sidebar', 'navigation rail', 'icon bar', 'the thin icon strip'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rail width',
        value: 'width: 52px · icons 26px from the edge',
        plain:
          'Just wide enough for the icons, which stay exactly where they were in the open sidebar, so nothing jumps.',
      },
      {
        kind: 'behavior',
        term: 'Labels fade',
        value: 'opacity · 100ms out, 150ms back in',
        plain:
          'Labels and counts fade out before the sidebar narrows and come back once it has opened, so no word is ever squeezed.',
      },
      {
        kind: 'appearance',
        term: 'Unread dot',
        value: { light: '7px · #e2553d', dark: '7px · #ff7259' },
        plain: 'Inbox’s badge of 3 becomes a dot on its icon: still there, in less room.',
      },
      {
        kind: 'behavior',
        term: 'Fewer rows',
        value: 'nested pages hide · headings become lines',
        plain:
          'Nested pages step out and the items below close the gap; section headings turn into short dividers.',
      },
    ],
  },
  {
    id: 'collapsible-sidebar-toggle',
    name: 'Collapse toggle',
    htmlTag: '<button aria-expanded="true">',
    variant: 'Sidebar icon · ⌘\\',
    summary:
      'The button that folds the sidebar to its rail and opens it again. It sits at the top left of the page, right beside the sidebar.',
    aliases: ['sidebar toggle', 'collapse button', 'hamburger', 'show or hide menu', 'the panel icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon button',
        value: { light: '28 × 28px · hover #e9e9ec', dark: '28 × 28px · hover #1e1f23' },
        plain: 'A gray panel icon with no border; a soft fill appears under the pointer, a shade darker as it’s pressed.',
      },
      {
        kind: 'behavior',
        term: 'Keyboard shortcut',
        value: '⌘ \\',
        plain: 'The same toggle from the keyboard, anywhere in the app. The tooltip is where people learn it.',
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: 'true open · false folded',
        plain: 'Tells screen readers whether the sidebar is open; the label follows, Collapse or Expand.',
      },
    ],
  },
  {
    id: 'collapsible-sidebar-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'Dark · with its shortcut',
    summary:
      'A small dark label that names a button once the pointer rests on it, with its keyboard shortcut. On the rail it’s how you read an icon’s name.',
    aliases: ['hint', 'hover label', 'the little black label', 'title text'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tooltip',
        value: {
          light: 'background: #1f2023 · 12px white · radius 6px',
          dark: 'background: #2f3035 · 12px white · radius 6px',
        },
        plain: 'Dark in both themes, small and tight, with a soft shadow so it floats over anything.',
      },
      {
        kind: 'behavior',
        term: 'Show delay',
        value: '400ms of rest · fades in 150ms',
        plain:
          'It waits until the pointer rests for a moment, so passing over buttons doesn’t set off a string of labels.',
      },
      {
        kind: 'behavior',
        term: 'Hide on click',
        value: 'fades out in 100ms',
        plain: 'It goes the moment you click, out of the way of what happens next.',
      },
      {
        kind: 'appearance',
        term: 'Shortcut keys',
        value: '⌘ \\ in key caps',
        plain: 'The keys follow the label in small caps: a light way to teach the shortcut.',
      },
    ],
  },
];
