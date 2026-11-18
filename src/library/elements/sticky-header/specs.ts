import type { UiElementSpec } from '../../../catalog';

/** Parts of the Sticky header element, in the order they appear. `value` fields are the actual values from StickyHeader. */
export const stickyHeaderSpecs: UiElementSpec[] = [
  {
    id: 'sticky-header',
    name: 'Sticky header',
    htmlTag: '<header>',
    variant: 'Condensing · stays at the top',
    summary:
      'The bar at the top of the page that stays pinned there while you scroll, so the product’s name and the way to buy it are always in reach.',
    aliases: ['sticky nav', 'fixed header', 'top bar', 'local nav', 'the bar that follows you down'],
    concepts: [
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 0',
        plain:
          'It scrolls with the page until it reaches the top of the window, then stays there while the page slides underneath.',
      },
      {
        kind: 'behavior',
        term: 'Condensing header',
        value: '120px → 52px',
        plain:
          'At the top of the page it’s tall, with the name in big type. Once you scroll, it shrinks into a slim bar that takes little room from the page.',
      },
      {
        kind: 'behavior',
        term: 'Timing',
        value: '380ms · 160ms into the scroll',
        plain:
          'The change starts a moment after the page begins to move, when it passes the threshold, and takes a little over a third of a second.',
      },
    ],
  },
  {
    id: 'sticky-header-compact',
    name: 'Compact state',
    htmlTag: '<h2>',
    variant: 'Name at 19px in a 52px bar',
    summary:
      'The slim version of the header: the product’s name slides up into the bar at about half its size, next to the logo, where it stays while you read.',
    aliases: ['collapsed header', 'shrunk header', 'mini header', 'small title', 'condensed bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Large title',
        value: '34px · 600 at the top of the page',
        plain: 'Before you scroll, the name is big, like a headline, and the header is tall enough to hold it.',
      },
      {
        kind: 'behavior',
        term: 'Scale transform',
        value: 'scale(0.56) · transform-origin: top left',
        plain:
          'The name doesn’t swap for a smaller copy: the same text shrinks and slides up into place, so you can follow it.',
      },
    ],
  },
  {
    id: 'sticky-header-blur',
    name: 'Backdrop blur',
    htmlTag: '<div>',
    variant: 'Frosted · 72% fill',
    summary:
      'The compact bar’s see-through, frosted background. The page shows through it, blurred, as it scrolls underneath, without getting in the way of the bar’s text.',
    aliases: ['frosted glass', 'translucent bar', 'glass effect', 'blurred background', 'vibrancy'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'saturate(180%) blur(20px)',
        plain:
          'Blurs whatever is behind the bar and makes its colors a little richer, so the photo under it turns into a soft wash of color.',
      },
      {
        kind: 'appearance',
        term: 'Translucent fill',
        value: { light: 'rgb(255 255 255 / 0.72)', dark: 'rgb(22 22 23 / 0.72)' },
        plain: 'A mostly opaque layer of the page’s color on top of the blur keeps the bar’s text readable over anything.',
      },
      {
        kind: 'appearance',
        term: 'Hairline',
        value: { light: '1px · rgb(0 0 0 / 0.14)', dark: '1px · rgb(255 255 255 / 0.16)' },
        plain: 'A thin line along the bottom edge separates the bar from the page sliding under it.',
      },
      {
        kind: 'behavior',
        term: 'Fade in',
        value: 'opacity · 250ms',
        plain: 'At the top of the page the header has no background at all; the frosted layer fades in as it turns compact.',
      },
    ],
  },
  {
    id: 'sticky-header-button',
    name: 'Buy button',
    htmlTag: '<a>',
    variant: 'Appears in the compact bar',
    summary:
      'The call to action that shows up in the bar once you’ve scrolled, so buying is a click away wherever you are on the page.',
    aliases: ['CTA', 'call to action', 'sticky buy button', 'the blue pill'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill button',
        value: { light: '26px · border-radius: 999px · #0a6be8', dark: '26px · border-radius: 999px · #2d88ff' },
        plain: 'A small, fully rounded button in the page’s one accent color, the only colored thing in the bar.',
      },
      {
        kind: 'behavior',
        term: 'Swap in',
        value: 'opacity + scale(0.9) → 1 · 250ms',
        plain: 'It fades in, growing slightly, in the spot where the search and bag icons were.',
      },
    ],
  },
  {
    id: 'sticky-header-threshold',
    name: 'Scroll threshold',
    htmlTag: '<div aria-hidden="true">',
    variant: '68px · the height the header gives up',
    summary:
      'How far the page has to scroll before the header changes. It’s invisible on the page; this band marks it, the 68px between the slim bar and the bottom of the tall header.',
    aliases: ['trigger point', 'scroll offset', 'sentinel', 'when it switches', 'breakpoint'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Scroll offset',
        value: 'scrollY > 68px',
        plain: 'Above it the header is tall; scrolled past it, compact. Scrolling back up past it makes the header tall again.',
      },
      {
        kind: 'behavior',
        term: 'IntersectionObserver',
        plain:
          'Pages usually watch an invisible marker at the threshold rather than check the scroll position on every frame, which keeps scrolling smooth.',
      },
    ],
  },
];
