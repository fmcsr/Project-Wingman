import type { UiElementSpec } from './types';

/**
 * Elements in the Stride shopping app's product page, in the order they appear. `value` fields are the actual values
 * from StrideApp.module.css and the markup.
 */
export const commerce: UiElementSpec[] = [
  {
    id: 'navigation-bar',
    name: 'Navigation bar',
    htmlTag: '<header>',
    variant: 'Product name as the title',
    summary:
      "The bar under the status bar: Back on the left, the product's name in the middle, Share and Search on the right. It stays in place while the page scrolls under it.",
    aliases: ['top bar', 'header', 'title bar', 'the bar at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Centered title',
        value: 'font-size: 12.5px · font-weight: 500',
        plain: 'The product name sits in the middle in a medium weight, so you know which product you are on even after the photo has scrolled away.',
      },
      {
        kind: 'appearance',
        term: 'text-overflow',
        value: 'ellipsis',
        plain: 'A name too long for the space is cut off with “…” instead of pushing the buttons aside.',
      },
      {
        kind: 'behavior',
        term: 'Push navigation',
        plain: 'This page slid in on top of the list you came from. Back, or a swipe from the left edge, slides it away again.',
      },
    ],
  },
  {
    id: 'back-button',
    name: 'Back button',
    htmlTag: '<button aria-label="Back">',
    variant: 'Chevron only',
    summary: 'The arrow pointing left in the corner. It returns to the screen you came from, usually the list of products.',
    aliases: ['back arrow', 'the < in the corner', 'go back'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron',
        value: '17 × 17px · stroke-width: 1.6',
        plain: 'A thin “<” in the same line weight as the other icons in the bar. It has no label because everyone knows what it does.',
      },
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '24 × 28px',
        plain: 'The area you can tap is bigger than the thin arrow, so it is easy to hit with a thumb.',
      },
      {
        kind: 'behavior',
        term: 'Edge swipe',
        plain: 'On an iPhone, swiping right from the left edge of the screen does the same as tapping it.',
      },
    ],
  },
  {
    id: 'share-button',
    name: 'Share button',
    htmlTag: '<button aria-label="Share">',
    variant: 'iOS share icon',
    summary: "The box with an arrow pointing up. It opens the phone's share sheet to send someone a link to this shoe.",
    aliases: ['share icon', 'send to a friend', 'the box with the arrow'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Platform icon',
        value: '17 × 17px outline',
        plain: 'iPhone users know this exact shape from every app, so it needs no words.',
      },
      {
        kind: 'behavior',
        term: 'Share sheet',
        value: 'navigator.share()',
        plain: "A tap slides up the phone's own panel with Messages, Mail, AirDrop and Copy Link, already filled in with the product's link.",
      },
    ],
  },
  {
    id: 'search-button',
    name: 'Search button',
    htmlTag: '<button aria-label="Search">',
    variant: 'Icon only',
    summary: 'The magnifying glass opens search, so you can look for something else without going back first.',
    aliases: ['magnifying glass', 'search icon', 'find'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon pair',
        value: 'gap: 4px',
        plain: 'Share and Search sit together on the right in the same size and weight, as two quiet actions.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Search"',
        plain: 'A button with only an icon needs a name that screen readers can say, since there is no visible text.',
      },
    ],
  },
  {
    id: 'image-carousel',
    name: 'Image carousel',
    variant: 'Full-width product photos',
    summary:
      'The big product photo at the top, edge to edge on a light gray backdrop. Swipe sideways to see the same shoe from other angles.',
    aliases: ['photo slider', 'gallery', 'product images', 'the swipe-through pictures'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Full-bleed image',
        value: 'width: 100% · object-fit: cover',
        plain: 'The photo runs from one edge of the screen to the other with no frame or rounded corners, so the product is the biggest thing on the page.',
      },
      {
        kind: 'appearance',
        term: 'Studio backdrop',
        value: 'background: #f3f3f3',
        plain: 'Every product is shot on the same pale gray, so the pages look calm and consistent from one product to the next.',
      },
      {
        kind: 'behavior',
        term: 'Swipe with snap',
        value: 'scroll-snap-type: x mandatory',
        plain: 'Each swipe settles exactly on the next photo instead of stopping halfway between two.',
      },
    ],
  },
  {
    id: 'image-badge',
    name: 'Badge',
    variant: 'On the photo, with our mark',
    summary: "A small label in the photo's corner that says this shoe is one of Stride's picks. The Stride mark sits in front of the words.",
    aliases: ['label', 'tag', 'sticker', 'the pill on the picture'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill',
        value: 'height: 18px · border-radius: 999px',
        plain: 'A tiny rounded label with a solid fill, so it stays readable on top of a photo.',
      },
      {
        kind: 'appearance',
        term: 'Overlay',
        value: 'position: absolute · top: 10px · left: 10px',
        plain: "It is pinned to the photo's top-left corner, out of the product's way.",
      },
    ],
  },
  {
    id: 'pagination-dots',
    name: 'Page indicator',
    variant: 'Dots on the photo',
    summary: 'The little dots at the bottom of the photo. Each dot is one photo, and the dark one is the photo you are looking at.',
    aliases: ['dots', 'pager', 'the dots under the image'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active dot',
        value: '5 × 5px · #111 and rgb(17 17 17 / 0.22)',
        plain: 'All the dots are the same size. Only the color changes: solid for the photo on screen, faint for the others.',
      },
      {
        kind: 'behavior',
        term: 'Accessible label',
        value: 'aria-label="Photo 1 of 4"',
        plain: 'Screen readers announce the position in words, because dots alone say nothing.',
      },
    ],
  },
  {
    id: 'product-title',
    name: 'Product title',
    htmlTag: '<h1>',
    variant: 'Name over a category line',
    summary: "The product's name, with the kind of product on the line under it. It's the first thing you read under the photo.",
    aliases: ['product name', 'heading', 'the name of the shoe'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Type hierarchy',
        value: '14.5px · 500 over 11.5px · 400',
        plain: 'The name is a little bigger and heavier; the category under it is smaller and regular, so you read them in that order.',
      },
      {
        kind: 'appearance',
        term: 'One text color',
        value: { light: 'color: #111', dark: 'color: #fff' },
        plain: 'Both lines are in the plain text color. The page leaves color to the photos and the saving.',
      },
    ],
  },
  {
    id: 'price-tag',
    name: 'Price with discount',
    variant: 'Sale price, old price, percent off',
    summary: 'What you pay now, the old price crossed out, and how much you save, all on one line.',
    aliases: ['price', 'sale price', 'was / now price', 'percent off'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Strikethrough price',
        value: 'text-decoration: line-through',
        plain: 'The old price is crossed out and grayed out, so it reads as what it used to cost, not as the price.',
      },
      {
        kind: 'appearance',
        term: 'Accent color',
        value: { light: 'color: #1f4fd8', dark: 'color: #7d9cff' },
        plain: 'The saving is the only colored text on the page, in the brand blue, so your eye lands on it.',
      },
      {
        kind: 'behavior',
        term: 'Accessible price',
        value: 'aria-label="Now $97.97, was $140"',
        plain: "Screen readers say which price is which, since a line through a number can't be heard.",
      },
    ],
  },
  {
    id: 'color-swatches',
    name: 'Color picker',
    variant: 'Photo swatches',
    summary: 'Small photos of the same shoe in its other colors. Tap one to switch to that version; the outlined one is selected.',
    aliases: ['colorways', 'variants', 'color options', 'the little pictures of other colors'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Photo swatches',
        value: '44 × 44px · border-radius: 4px',
        plain: 'Instead of plain color dots, each option is a real photo, so you see exactly what that version looks like.',
      },
      {
        kind: 'appearance',
        term: 'Selected outline',
        value: { light: 'border: 1px solid #111', dark: 'border: 1px solid #fff · 2px off the photo' },
        plain: 'A thin ring in the text color marks the version you are looking at. In dark mode it stands a little off the light photo, so it stays visible.',
      },
      {
        kind: 'behavior',
        term: 'Single choice',
        value: 'role="radiogroup"',
        plain: 'Only one color can be picked at a time. Picking another swaps the photos and the sizes in stock.',
      },
    ],
  },
  {
    id: 'size-chips',
    name: 'Size grid',
    variant: 'One size selected, two sold out',
    summary:
      'Every size in a grid of small boxes, under a “Select Size” label. Pick one before adding to the bag; sizes that are sold out keep their place, grayed out.',
    aliases: ['size picker', 'size selector', 'size buttons', 'select size'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected size',
        value: { light: 'border-color: #111', dark: 'border-color: #fff' },
        plain: 'The chosen size gets a dark outline and nothing else changes, which keeps the grid calm.',
      },
      {
        kind: 'appearance',
        term: 'Sold-out state',
        value: { light: 'background: #f5f5f5 · color: #bdbdbf', dark: 'background: #1c1c1e · color: #5a5a5e' },
        plain: 'Sold-out sizes are filled gray with faded numbers. They stay in the grid, so it never shifts.',
      },
      {
        kind: 'behavior',
        term: 'Disabled',
        value: 'aria-disabled="true"',
        plain: 'Screen readers announce a sold-out size as unavailable, and tapping it does nothing.',
      },
    ],
  },
  {
    id: 'size-guide',
    name: 'Text link',
    variant: 'Size Guide',
    summary: '“Size Guide”, across from the label, opens a chart of foot lengths for every size, for when you are between two.',
    aliases: ['link', 'size chart', 'help with sizing'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Secondary text',
        value: { light: 'color: #707072', dark: 'color: #9e9ea0' },
        plain: "Gray words without an underline: there when you need them, quiet when you don't.",
      },
      {
        kind: 'behavior',
        term: 'Bottom sheet',
        plain: 'A tap slides the chart up from the bottom over the page, and a swipe down puts it away.',
      },
    ],
  },
  {
    id: 'add-to-bag',
    name: 'Primary button',
    htmlTag: '<button>',
    variant: 'Full-width pill',
    summary: 'The black “Add to Bag” button. It is the one main action on the page, so it is the darkest, widest button on it.',
    aliases: ['buy button', 'add to cart', 'CTA', 'call to action', 'the black button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'height: 38px · border-radius: 999px',
        plain: 'Fully rounded ends and the full width of the page make it easy to find and easy to hit.',
      },
      {
        kind: 'appearance',
        term: 'Solid fill',
        value: { light: 'background: #111 · color: #fff', dark: 'background: #fff · color: #111' },
        plain: 'A solid fill in the text color, with the words in the page color, marks the main action. The button under it is only outlined.',
      },
      {
        kind: 'behavior',
        term: 'Confirmation',
        plain: 'A tap adds the chosen size to the bag and briefly shows “Added to Bag” over the page before it fades away.',
      },
    ],
  },
  {
    id: 'favorite-button',
    name: 'Secondary button',
    htmlTag: '<button aria-pressed="false">',
    variant: 'Outlined pill with a heart',
    summary: '“Favorite” saves the shoe for later. It sits under Add to Bag in the same shape, but only outlined.',
    aliases: ['wishlist', 'save for later', 'like button', 'the heart button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outlined button',
        value: { light: 'border: 1px solid #cacacb', dark: 'border: 1px solid #545456' },
        plain: 'The same size and shape as the main button, but only a thin outline, so it is clearly the second choice.',
      },
      {
        kind: 'appearance',
        term: 'Icon after the label',
        value: '13 × 13px heart',
        plain: 'A small outline heart after the word shows what Favorite means at a glance.',
      },
      {
        kind: 'behavior',
        term: 'Toggle state',
        value: 'aria-pressed="true"',
        plain: 'Once saved, the heart fills in and the label reads “Favorited”. Tap again to remove it.',
      },
    ],
  },
];
