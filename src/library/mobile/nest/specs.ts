import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Nest rental app, in the order they appear. `value` fields are the actual values from NestApp. */
export const nestSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'search-bar',
    name: 'Search bar',
    htmlTag: '<button>',
    variant: 'Pill that opens a guided search',
    summary:
      "It looks like a search field, but it's a button: tapping it opens a full-screen search that asks where, when and who.",
    aliases: ['search box', 'the where-to pill', 'search field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'border-radius: 999px',
        plain: 'Fully rounded ends make it the most inviting thing to tap on the screen.',
      },
      {
        kind: 'appearance',
        term: 'Two-line label',
        value: '12.5px · 600 over 9.5px',
        plain: "A bold question on top, and a quiet summary of what's picked so far underneath.",
      },
      {
        kind: 'appearance',
        term: 'Elevation',
        value: { light: 'box-shadow: 0 3px 12px rgb(0 0 0 / 0.1)', dark: 'box-shadow: 0 3px 12px rgb(0 0 0 / 0.5)' },
        plain: 'A soft shadow lifts it off the page and marks it as the place to start.',
      },
      {
        kind: 'behavior',
        term: 'Search launcher',
        plain:
          "Tapping it doesn't bring up a keyboard here; it opens a step-by-step search for place, dates and guests.",
      },
    ],
  },
  {
    id: 'filter-button',
    name: 'Filter button',
    htmlTag: '<button aria-label="Filters">',
    variant: 'Round, outlined',
    summary: 'Opens the filters, like price range, bedrooms and amenities, to narrow down the results.',
    aliases: ['filters', 'the sliders button', 'refine'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outlined circle',
        value: { light: 'border: 1px solid #ddd', dark: 'border: 1px solid #3a3a3a' },
        plain: 'A thin ring instead of a fill keeps it secondary to the search pill beside it.',
      },
      {
        kind: 'appearance',
        term: 'Icon only',
        value: '36 × 36px',
        plain: 'No words, just two lines with knobs like a mixing desk: the common sign for "adjust the results".',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        plain: 'With no visible text, it needs a hidden name like "Filters" so screen readers can announce it.',
      },
    ],
  },
  {
    id: 'category-tabs',
    name: 'Category tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Scrollable · icon over label',
    summary:
      'A row of themes, like cabins or beachfront, that changes which homes show below. There are more than fit, so the row scrolls sideways.',
    aliases: ['category bar', 'the icons under the search', 'filter tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon over label',
        value: 'flex-direction: column',
        plain: 'A picture plus a word makes each category quick to scan and hard to misread.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'flex: none',
        plain:
          'Each tab keeps its full width instead of squeezing, so the row runs off the edge; the cut-off tab hints that you can swipe for more.',
      },
      {
        kind: 'appearance',
        term: 'Divider',
        value: { light: 'border-bottom: 1px solid #ebebeb', dark: 'border-bottom: 1px solid #2a2a2a' },
        plain: 'A hairline separates the search area from the listings below.',
      },
    ],
  },
  {
    id: 'active-tab',
    name: 'Active tab',
    htmlTag: '<button role="tab" aria-selected="true">',
    variant: 'Underline indicator',
    summary: "The category you're viewing: full-strength text with a short bar underneath, while the others stay gray.",
    aliases: ['selected tab', 'current category', 'the underlined one'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active indicator',
        value: 'height: 2px',
        plain: 'A short bar under the label, laid over the divider, marks the current choice.',
      },
      {
        kind: 'appearance',
        term: 'Full-strength color',
        value: { light: 'color: #222', dark: 'color: #f2f2f2' },
        plain:
          'The active tab uses the full text color and the rest are gray, so it stands out without adding a new color.',
      },
      {
        kind: 'behavior',
        term: 'aria-selected',
        plain: 'Tells screen readers which category is chosen, since an underline means nothing to them.',
      },
    ],
  },
  {
    id: 'listing-card',
    name: 'Listing card',
    htmlTag: '<article>',
    variant: 'Photo on top, details below',
    summary: 'One home in the feed: photos first, then the place, distance, dates, rating and price.',
    aliases: ['property card', 'result card', 'the home tile'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Text hierarchy',
        value: '13px · 600 vs 12px gray',
        plain: 'The place name is bold; distance and dates are smaller and gray, so you read them second.',
      },
      {
        kind: 'appearance',
        term: 'Truncation',
        value: 'text-overflow: ellipsis',
        plain: 'A long place name ends in "…" rather than pushing the rating onto a second line.',
      },
      {
        kind: 'behavior',
        term: 'One big tap target',
        plain: 'Tapping anywhere on the card opens the listing; only the heart has a job of its own.',
      },
    ],
  },
  {
    id: 'photo-carousel',
    name: 'Photo carousel',
    variant: 'Swipeable, inside a card',
    summary: 'Several photos of the home in one spot. Swipe sideways to flip through them without leaving the feed.',
    aliases: ['image slider', 'gallery', 'the swipe-through pictures'],
    concepts: [
      {
        kind: 'behavior',
        term: 'scroll-snap',
        value: 'scroll-snap-type: x mandatory',
        plain: 'Each swipe settles exactly on the next photo instead of stopping halfway between two.',
      },
      {
        kind: 'appearance',
        term: 'aspect-ratio',
        value: 'aspect-ratio: 6 / 5',
        plain: 'Every photo gets the same frame, whatever its original shape, so the feed looks tidy.',
      },
      {
        kind: 'appearance',
        term: 'Rounded corners',
        value: 'border-radius: 14px',
        plain: 'Soft corners make the photo feel like a card of its own.',
      },
    ],
  },
  {
    id: 'listing-badge',
    name: 'Badge',
    variant: 'Overlay on a photo',
    summary: 'A short label on the photo that sets this home apart: guests rate it among the best.',
    aliases: ['label', 'tag', 'the white pill on the photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'White pill',
        value: 'background: #fff · border-radius: 999px',
        plain: 'Solid white reads clearly on any photo, bright or dark.',
      },
      {
        kind: 'appearance',
        term: 'Lift',
        value: 'box-shadow: 0 1px 4px rgb(0 0 0 / 0.18)',
        plain: 'A faint shadow separates the pill from the photo underneath.',
      },
      {
        kind: 'behavior',
        term: 'Social proof',
        value: 'Guest favorite',
        plain: 'It tells you other guests loved this place, which builds trust before you read a single review.',
      },
    ],
  },
  {
    id: 'favorite-button',
    name: 'Favorite button',
    htmlTag: '<button>',
    variant: 'Heart on a photo · saved and not saved',
    summary:
      'A heart that saves the home to a wishlist. The empty one is not saved yet; the filled one on the next home is.',
    aliases: ['save button', 'wishlist heart', 'like button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outline over a dark fill',
        value: 'fill: rgb(0 0 0 / 0.45) · stroke: #fff',
        plain: 'A white outline around a see-through dark middle stays visible on light and dark photos alike.',
      },
      {
        kind: 'appearance',
        term: 'Saved state',
        value: 'fill: #f43f5e',
        plain: 'Once saved, the heart fills in solid rose, so favorites stand out while you scroll.',
      },
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '32 × 32px',
        plain:
          "The tappable area is bigger than the 22px heart, so it's easy to hit without opening the card by mistake.",
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        plain: "Tells screen readers whether the home is saved, since they can't see the heart fill in.",
      },
    ],
  },
  {
    id: 'pagination-dots',
    name: 'Page indicator',
    variant: 'Dots with a shrinking edge',
    summary: 'Dots at the bottom of the photo: each stands for a photo, and the solid one is the photo on screen.',
    aliases: ['dots', 'pager', 'the dots under the photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active dot',
        value: 'background: #fff vs rgb(255 255 255 / 0.6)',
        plain: 'The current photo gets a solid white dot; the others are see-through.',
      },
      {
        kind: 'appearance',
        term: 'Shrinking edge dot',
        value: '4 × 4px vs 6 × 6px',
        plain: 'There are seven photos but only five dots; the smaller last dot hints that more follow.',
      },
      {
        kind: 'appearance',
        term: 'drop-shadow',
        value: 'filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.35))',
        plain: 'A faint dark halo keeps the white dots visible on a bright sky.',
      },
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    variant: 'Compact · one star',
    summary: 'The average guest score in its shortest form: one star and a number.',
    aliases: ['stars', 'review score', 'the 4.92'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Compact rating',
        value: '★ 4.92',
        plain: 'One star next to the average fits on a small card, and two decimals tell great from merely good.',
      },
      {
        kind: 'appearance',
        term: 'Star in the text color',
        value: 'fill: currentColor',
        plain: 'A plain star in the text color keeps the card calm; a gold one would compete with the photo.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        plain: 'Screen readers should hear "Rated 4.92 out of 5" rather than "star, 4.92".',
      },
    ],
  },
  {
    id: 'price',
    name: 'Price with discount',
    variant: 'Original struck through · per night',
    summary: 'The nightly price, with the old price crossed out in front of it so the saving is obvious.',
    aliases: ['price tag', 'was / now price', 'the crossed-out price'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Strikethrough',
        value: 'text-decoration: line-through',
        plain: 'The original price is crossed out and gray, so it reads as history.',
      },
      {
        kind: 'appearance',
        term: 'Weight contrast',
        value: 'font-weight: 600',
        plain: 'Only the price you pay is bold.',
      },
      {
        kind: 'appearance',
        term: 'Unit label',
        value: 'night',
        plain: 'One small word says what the price covers, so nobody mistakes it for the total.',
      },
      {
        kind: 'behavior',
        term: '<s> element',
        value: '<s>$231</s>',
        plain:
          'Most screen readers skip the strikethrough itself, so add hidden text like "originally $231" to keep the meaning.',
      },
    ],
  },
  {
    id: 'map-button',
    name: 'Floating action button',
    htmlTag: '<button>',
    variant: 'Extended · map toggle',
    summary:
      'A pill that floats above the list and switches the results to a map. On the map, it switches back to the list.',
    aliases: ['map toggle', 'show map button', 'the floating pill'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted colors',
        value: { light: 'background: #222', dark: 'background: #f2f2f2' },
        plain: 'It flips the page colors (dark on light, light on dark), so it stands out over any listing.',
      },
      {
        kind: 'appearance',
        term: 'Elevation',
        value: 'box-shadow: 0 6px 16px rgb(0 0 0 / 0.25)',
        plain: 'A soft shadow makes it look like it hovers above the list.',
      },
      {
        kind: 'behavior',
        term: 'Centered and pinned',
        value: 'left: 50%; transform: translateX(-50%)',
        plain: 'It stays centered just above the tab bar while the listings move underneath.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Solid · five tabs',
    summary: "The app's five main sections along the bottom edge, with Explore selected.",
    aliases: ['bottom nav', 'bottom menu', 'tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active tab',
        value: { light: 'color: #d63a4c', dark: 'color: #ff6b7d' },
        plain: "The selected tab's icon and label take the brand color; the rest stay gray.",
      },
      {
        kind: 'appearance',
        term: 'Hairline border',
        value: { light: 'border-top: 1px solid #ebebeb', dark: 'border-top: 1px solid #2a2a2a' },
        plain: 'A thin line on a solid background separates the bar from the feed without a heavy shadow.',
      },
      {
        kind: 'behavior',
        term: 'Five tabs at most',
        value: '5 tabs',
        plain: 'Five is the most a tab bar should hold; everything else lives inside those sections.',
      },
    ],
  },
  homeIndicator,
];
