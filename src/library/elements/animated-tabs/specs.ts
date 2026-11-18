import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Tabs element, in the order they appear. `value` fields are the actual values from AnimatedTabs.
 */
export const animatedTabsSpecs: UiElementSpec[] = [
  {
    id: 'animated-tabs',
    name: 'Tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Underline · sliding indicator',
    summary:
      'A row of labels under the page title that switch what the page below shows, one view at a time. The open one is underlined; the others stay a click away.',
    aliases: ['tab bar', 'sub navigation', 'section switcher', 'the menu under the title', 'nav tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Text tabs',
        value: { light: '14px · #666666, open tab #171717', dark: '14px · #a1a1a1, open tab #ededed' },
        plain:
          'Plain gray labels with no boxes around them. The open tab and the one under the pointer turn black; the underline and the highlight do the rest.',
      },
      {
        kind: 'appearance',
        term: 'Hairline divider',
        value: { light: '1px · #ebebeb', dark: '1px · #242424' },
        plain: 'A thin line under the whole bar separates it from the page. The open tab’s underline sits right on it.',
      },
      {
        kind: 'behavior',
        term: 'Arrow-key navigation',
        value: '← → between tabs · one Tab stop',
        plain:
          'The whole bar is a single stop for the Tab key; the arrow keys then move from tab to tab, as in a menu.',
      },
    ],
  },
  {
    id: 'animated-tabs-hover',
    name: 'Hover highlight',
    htmlTag: '<span>',
    variant: 'Gray pill · follows the pointer',
    summary:
      'A soft gray pill behind the tab under the pointer. It glides from tab to tab as the pointer moves along the bar, a step ahead of the underline, which only moves on a click.',
    aliases: ['hover pill', 'hover state', 'magic highlight', 'the gray box that follows the mouse'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill',
        value: {
          light: 'background: #f0f0f0 · border-radius: 6px · height: 30px',
          dark: 'background: #1f1f1f · border-radius: 6px · height: 30px',
        },
        plain:
          'A rounded gray shape the size of the tab. It changes its width rather than stretching, so the corners stay round on every tab.',
      },
      {
        kind: 'behavior',
        term: 'Follows the pointer',
        value: 'transform + width · 180ms, 90ms after the pointer',
        plain:
          'It slides to the next tab a beat after the pointer crosses into it, so it trails the hand like a shadow instead of jumping.',
      },
      {
        kind: 'behavior',
        term: 'Fade in and out',
        value: 'opacity · 150ms',
        plain:
          'It fades in right where the pointer enters the bar, without sliding over from the last tab it was on, and fades out when the pointer leaves.',
      },
      {
        kind: 'behavior',
        term: 'Pressed state',
        value: { light: 'background: #e3e3e3', dark: 'background: #2e2e2e' },
        plain: 'A shade darker while the button is held down: the sign that the click landed.',
      },
    ],
  },
  {
    id: 'animated-tabs-indicator',
    name: 'Active indicator',
    htmlTag: '<span>',
    variant: '2px underline · slides between tabs',
    summary:
      'The line under the open tab. When another tab is picked, it slides over and fits itself to the new tab’s width, so the eye follows the change.',
    aliases: ['underline', 'ink bar', 'selection line', 'sliding underline', 'the line under the tab'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Underline',
        value: { light: 'height: 2px · #171717', dark: 'height: 2px · #ededed' },
        plain: 'A 2px line in the text color with square ends, 8px in from each side of the tab.',
      },
      {
        kind: 'behavior',
        term: 'Shared indicator',
        value: 'one element · translateX() + scaleX()',
        plain:
          'There’s one line for the whole bar, not one per tab: it moves and resizes to the tab that’s picked instead of disappearing from one and appearing under the other.',
      },
      {
        kind: 'behavior',
        term: 'Slide',
        value: 'transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain: 'Quick off the mark and gentle at the end, in about a quarter of a second, so it never feels slow.',
      },
    ],
  },
  {
    id: 'animated-tabs-active',
    name: 'Active tab',
    htmlTag: '<a role="tab" aria-selected="true">',
    variant: 'Analytics · dark text, underlined',
    summary:
      'The tab whose page is showing. It’s marked twice, darker text and the line under it, so it reads at a glance.',
    aliases: ['selected tab', 'current tab', 'open tab', 'the tab I’m on'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected state',
        value: { light: 'color: #171717', dark: 'color: #ededed' },
        plain:
          'Same size and weight as the other tabs, only darker, so nothing shifts when the selection moves; the underline carries the rest.',
      },
      {
        kind: 'behavior',
        term: 'aria-selected',
        value: 'true on one tab at a time',
        plain: 'Tells screen readers which tab is open. Exactly one tab has it.',
      },
      {
        kind: 'behavior',
        term: 'A URL per tab',
        value: '/storefront/analytics',
        plain: 'Each tab has its own address, so a shared link or a refresh opens the same tab.',
      },
    ],
  },
  {
    id: 'animated-tabs-fade',
    name: 'Overflow fade',
    htmlTag: '<div aria-hidden="true">',
    variant: 'Narrow screens · with scroll buttons',
    summary:
      'When the tabs don’t fit, the bar scrolls sideways and each edge with more tabs behind it fades out under a chevron. It says “there’s more this way” without a menu.',
    aliases: ['scroll shadow', 'fade-out edge', 'scroll arrows', 'more tabs hint', 'the faded end of the tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Edge fade',
        value: {
          light: 'linear-gradient(to right, transparent, #ffffff 55%) · 56px',
          dark: 'linear-gradient(to right, transparent, #0a0a0a 55%) · 56px',
        },
        plain:
          'The bar’s own color fades in over the last 56px, so a tab cut off at the edge dissolves instead of being chopped in half.',
      },
      {
        kind: 'appearance',
        term: 'Scroll button',
        value: '24 × 24px chevron',
        plain: 'A small chevron on the faded edge; a click scrolls the bar on to the tabs out of sight.',
      },
      {
        kind: 'behavior',
        term: 'Scroll into view',
        value: 'transform · 250ms',
        plain:
          'The bar scrolls by itself to keep the open tab and the one under the pointer clear of the fades. The fade at the start appears once it has scrolled; on a wide screen there are none.',
      },
    ],
  },
  {
    id: 'animated-tabs-panel',
    name: 'Tab panel',
    htmlTag: '<div role="tabpanel">',
    variant: 'Analytics · crossfades',
    summary:
      'The page that belongs to the open tab. Switching tabs swaps it in place: the old page fades out as the new one fades in, and the bar above stays put.',
    aliases: ['tab content', 'page body', 'view', 'the content under the tabs'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Crossfade',
        value: 'opacity · 200ms',
        plain: 'The two pages blend for a fifth of a second instead of cutting, so the change is felt but never slow.',
      },
      {
        kind: 'appearance',
        term: 'Page ground',
        value: { light: 'background: #fafafa · cards #ffffff', dark: 'background: #000000 · cards #0a0a0a' },
        plain:
          'The page sits one shade off the bar’s color, so the bar reads as the frame and the cards as the content.',
      },
      {
        kind: 'behavior',
        term: 'aria-controls',
        value: 'tab → panel',
        plain:
          'Each tab names the panel it opens, so a screen reader can go from the tab straight into its content.',
      },
    ],
  },
];
