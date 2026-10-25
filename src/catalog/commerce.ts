import type { UiElementSpec } from './types';

/** Stride alışveriş uygulamasındaki öğeler. `value` alanları StrideApp.module.css'teki gerçek değerlerdir. */
export const commerce: UiElementSpec[] = [
  {
    id: 'image-carousel',
    name: 'Image carousel',
    variant: 'Swipeable gallery',
    summary: 'A row of product photos you swipe through one at a time, right at the top of the page.',
    aliases: ['photo slider', 'gallery', 'the swipe-through pictures'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Swipe with snap',
        value: 'scroll-snap-type: x mandatory',
        plain: 'Each swipe settles exactly on the next photo instead of stopping halfway between two.',
      },
      {
        kind: 'appearance',
        term: 'Counter chip',
        value: '1 / 4',
        plain: "Shows how many photos there are and which one you're looking at.",
      },
    ],
  },
  {
    id: 'pagination-dots',
    name: 'Page indicator',
    variant: 'Dots',
    summary: 'The little dots under a carousel. Each dot is one photo, and the highlighted one is where you are.',
    aliases: ['dots', 'pager', 'the dots under the image'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active dot',
        value: '16 × 6px pill',
        plain: 'The current page stretches into a small pill; the others stay round.',
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
    id: 'favorite-button',
    name: 'Favorite button',
    variant: 'Toggle',
    summary: 'A heart you tap to save the product for later. Tap again to remove it.',
    aliases: ['like button', 'wishlist', 'the heart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled vs outline',
        value: 'fill: #ef4444',
        plain: 'A filled heart means saved; an empty outline means not saved.',
      },
      {
        kind: 'behavior',
        term: 'Toggle state',
        value: 'aria-pressed="true"',
        plain: "It switches between on and off and tells screen readers whether it's pressed.",
      },
    ],
  },
  {
    id: 'badge-count',
    name: 'Notification badge',
    variant: 'Count on an icon',
    summary: 'The small red number on the bag icon: how many items are waiting inside.',
    aliases: ['counter', 'red dot', 'the number on the cart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count pill',
        value: 'min-width: 18px · 999px radius',
        plain: 'A tiny pill pinned to the corner of an icon that grows to fit the number.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: 'border: 2px solid #fff',
        plain: 'A white ring separates it from the icon underneath, so it stays legible.',
      },
      {
        kind: 'behavior',
        term: 'Overflow',
        value: '99+',
        plain: 'Big numbers are capped so the badge never gets too wide.',
      },
    ],
  },
  {
    id: 'discount-badge',
    name: 'Discount badge',
    variant: 'Sale label',
    summary: 'A loud little label that announces the deal before you even read the price.',
    aliases: ['sale tag', 'percent off', 'the red label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'High-contrast pill',
        value: 'background: #e11d48',
        plain: 'A bold color pulls the eye to the saving at a glance.',
      },
    ],
  },
  {
    id: 'price-tag',
    name: 'Price with discount',
    variant: 'Current and original',
    summary: 'The current price next to the old one, crossed out, so the saving is obvious.',
    aliases: ['price', 'was / now price'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Strikethrough price',
        value: 'text-decoration: line-through',
        plain: 'The old price is crossed out and grayed out.',
      },
      {
        kind: 'appearance',
        term: 'Visual weight',
        value: '22px · 700 vs 14px',
        plain: 'The price you pay is big and bold; the old one stays small.',
      },
    ],
  },
  {
    id: 'rating-stars',
    name: 'Star rating',
    variant: '4.8 out of 5',
    summary: 'Five stars that summarize what other buyers think, with the number of reviews next to it.',
    aliases: ['stars', 'reviews', 'score'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Partial star',
        value: '<linearGradient> 80%',
        plain: 'The last star is only partly filled to show 4.8 instead of rounding up to 5.',
      },
      {
        kind: 'behavior',
        term: 'Accessible rating',
        value: 'aria-label="4.8 out of 5"',
        plain: 'Screen readers hear the score as words instead of five separate icons.',
      },
    ],
  },
  {
    id: 'color-swatches',
    name: 'Color swatches',
    variant: 'Single choice',
    summary: 'Small circles of color that let you pick a version of the product.',
    aliases: ['color picker', 'variants', 'the colored dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected ring',
        value: 'box-shadow: 0 0 0 2px #fff, 0 0 0 4px #111',
        plain: 'A thin gap and a dark outline circle the chosen color without covering it.',
      },
      {
        kind: 'behavior',
        term: 'Single choice',
        value: 'role="radiogroup"',
        plain: 'Only one color can be picked at a time, like radio buttons.',
      },
    ],
  },
  {
    id: 'size-chips',
    name: 'Size selector',
    variant: 'With a sold-out size',
    summary: 'A row of sizes to choose from. Sizes that are out of stock stay visible but unavailable.',
    aliases: ['size picker', 'variant chips', 'the size buttons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected size',
        value: 'background: #111',
        plain: 'The chosen size flips to a dark fill.',
      },
      {
        kind: 'appearance',
        term: 'Sold-out state',
        value: 'line-through · dashed border',
        plain: "Unavailable sizes are crossed out, so you know they exist — just not right now.",
      },
      {
        kind: 'behavior',
        term: 'Disabled',
        value: 'aria-disabled="true"',
        plain: 'Screen readers announce it as unavailable, and tapping it does nothing.',
      },
    ],
  },
  {
    id: 'quantity-stepper',
    name: 'Stepper',
    variant: 'Quantity',
    summary: 'A number with a minus and a plus button around it, for changing the amount one step at a time.',
    aliases: ['quantity picker', 'plus minus buttons', 'counter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Minus and plus',
        value: '32 × 32px buttons',
        plain: 'Two round buttons nudge the value down or up by one.',
      },
      {
        kind: 'behavior',
        term: 'Bounds',
        value: 'min 1 · max 10',
        plain: "The minus button stops at 1, so you can't add zero items to the bag.",
      },
    ],
  },
  {
    id: 'sticky-cta',
    name: 'Sticky action bar',
    variant: 'Add to bag',
    summary: 'A bar glued to the bottom of the screen with the main action, always within thumb reach.',
    aliases: ['bottom bar', 'buy bar', 'the button that follows you'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Pinned to the bottom',
        value: 'position: absolute; bottom: 0',
        plain: 'The buy button stays in place no matter how far you scroll.',
      },
      {
        kind: 'appearance',
        term: 'Frosted background',
        value: 'backdrop-filter: blur(16px)',
        plain: 'Content scrolling underneath is softly blurred instead of clashing with the button.',
      },
    ],
  },
  {
    id: 'toast',
    name: 'Toast',
    htmlTag: '<div role="status">',
    variant: 'Snackbar with an action',
    summary: 'A short message that slides in to confirm something happened, then disappears on its own.',
    aliases: ['snackbar', 'notification', 'the popup that disappears'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Slide and fade',
        value: 'translateY(16px) → 0 · 250ms',
        plain: 'It slides up from the bottom while fading in, then slips away the same way.',
      },
      {
        kind: 'behavior',
        term: 'Auto-dismiss',
        value: 'about 4 seconds',
        plain: "It goes away by itself, because it's a confirmation, not a question.",
      },
      {
        kind: 'behavior',
        term: 'Live region',
        value: 'role="status"',
        plain: "Screen readers read the message out loud without moving the user's focus.",
      },
    ],
  },
];
