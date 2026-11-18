import type { UiElementSpec } from '../../../catalog';

/** Parts of the Breadcrumbs element, in the order they appear. `value` fields are the actual values from Breadcrumbs. */
export const breadcrumbsSpecs: UiElementSpec[] = [
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    htmlTag: '<nav aria-label="Breadcrumb"><ol>',
    variant: 'Collapsed · Hexworks › … › Design › Q4 roadmap',
    summary:
      'A one-line trail that shows where the page sits, from the top of the workspace down to the page you’re on. Every step but the last is a link back up.',
    aliases: ['breadcrumb trail', 'path', 'location bar', 'the trail above the title', 'folder path'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ordered list',
        value: '14px · one line · white-space: nowrap',
        plain:
          'The trail is a numbered list under the hood, top level first, so screen readers announce it as “Breadcrumb, list, 5 items”. It never wraps onto a second line.',
      },
      {
        kind: 'behavior',
        term: 'Collapsing',
        value: 'first + … + last two',
        plain:
          'When the path is deep, the levels in the middle fold into an ellipsis. The start and the end stay, since they say the most: which workspace, and where you are now.',
      },
      {
        kind: 'behavior',
        term: 'Navigate up',
        plain: 'Each crumb opens that level, a quicker way back than pressing Back again and again.',
      },
    ],
  },
  {
    id: 'breadcrumbs-link',
    name: 'Crumb',
    htmlTag: '<a>',
    variant: 'Link · underline on hover',
    summary:
      'One step of the trail that you can click to go up to that level. The first one is the workspace and carries its icon.',
    aliases: ['breadcrumb link', 'path segment', 'parent link', 'step'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Muted link',
        value: { light: 'color: #5b616e', dark: 'color: #a1a5ae' },
        plain: 'Crumbs are gray, so the trail stays quiet above the title until you need it.',
      },
      {
        kind: 'behavior',
        term: 'Hover underline',
        value: 'text-underline-offset: 3px · 150ms',
        plain: 'Under the pointer a crumb darkens and an underline fades in, which says “this is a link”.',
      },
      {
        kind: 'appearance',
        term: 'Leading icon',
        value: '16px',
        plain: 'The first crumb shows the workspace’s icon, so you can tell at a glance which space you’re in.',
      },
    ],
  },
  {
    id: 'breadcrumbs-separator',
    name: 'Separator',
    htmlTag: '<li aria-hidden="true">',
    variant: 'Chevron',
    summary:
      'The small arrow between two crumbs. It points down the hierarchy, from the level above to the one inside it.',
    aliases: ['divider', 'chevron', 'arrow between the links', 'slash'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron',
        value: { light: '14px · stroke-width: 2 · #9299a6', dark: '14px · stroke-width: 2 · #6d727c' },
        plain:
          'A thin “›” in the lightest gray on the page. Some products use a slash instead; it does the same job.',
      },
      {
        kind: 'behavior',
        term: 'aria-hidden',
        plain: 'It’s decoration, so screen readers skip it; the list itself already tells them the order.',
      },
    ],
  },
  {
    id: 'breadcrumbs-ellipsis',
    name: 'Collapsed crumbs',
    htmlTag: '<button aria-expanded>',
    variant: 'Ellipsis · 3 hidden levels',
    summary:
      'Three dots that stand in for the levels that don’t fit. Clicking them opens a menu with those levels, so the trail stays one short line.',
    aliases: ['ellipsis', 'overflow button', 'the three dots', 'more levels', 'truncated path'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ghost button',
        value: { light: '28 × 24px · border-radius: 6px · hover rgb(16 24 40 / 0.06)', dark: '28 × 24px · border-radius: 6px · hover rgb(255 255 255 / 0.07)' },
        plain: 'No border and no fill until the pointer is on it; it stays filled while its menu is open.',
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: 'false → true on click',
        plain: 'Tells screen readers whether the menu behind the dots is open, and the label says how many levels it hides.',
      },
    ],
  },
  {
    id: 'breadcrumbs-menu',
    name: 'Overflow menu',
    htmlTag: '<div role="menu">',
    variant: 'Hidden levels · Product, Planning, 2026',
    summary:
      'The dropdown that opens from the ellipsis and lists the folded levels in order, top to bottom, each with its folder icon.',
    aliases: ['dropdown', 'hidden crumbs list', 'path menu', 'more menu'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Popover menu',
        value: 'border-radius: 8px · 32px rows',
        plain: 'A small floating card with a soft shadow, just under the dots it belongs to.',
      },
      {
        kind: 'behavior',
        term: 'Open animation',
        value: 'scale(0.96) → 1 + fade · 150ms',
        plain: 'It grows in from its top-left corner, next to the dots, so it’s clear where it came from.',
      },
      {
        kind: 'behavior',
        term: 'Light dismiss',
        plain: 'A click anywhere else, or Esc, closes it without going anywhere.',
      },
    ],
  },
  {
    id: 'breadcrumbs-current',
    name: 'Current page',
    htmlTag: '<span aria-current="page">',
    variant: 'Bold · not a link',
    summary:
      'The last step of the trail: the page you’re on. It’s bold and can’t be clicked, since you’re already there.',
    aliases: ['you are here', 'active crumb', 'last breadcrumb', 'current location'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bold, full-color text',
        value: '600 · same color as the title',
        plain: 'Darker and heavier than the crumbs before it, so the end of the trail reads as “here”.',
      },
      {
        kind: 'behavior',
        term: 'aria-current="page"',
        plain: 'Marks it as the current location for screen readers; it has no link, so it isn’t a tab stop.',
      },
    ],
  },
];
