import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Nest Explore screen, in the order they appear. `value` fields are the actual values from NestApp. */
export const nestSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'search-bar',
    name: 'Search bar',
    htmlTag: '<button>',
    variant: 'Pill that opens a guided search',
    summary:
      "It looks like a search field, but it's a button: tapping it opens a full-screen search that asks where, when and who.",
    aliases: ['search box', 'the where-to pill', 'search field', 'search launcher'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'height: 40px · border-radius: 999px',
        plain: 'A tall capsule with fully rounded ends is the most inviting thing to tap on the screen.',
      },
      {
        kind: 'appearance',
        term: 'Two-line label',
        value: '11px · 600 over 8.5px',
        plain: "A bold question on top, and a quiet summary of what's picked so far underneath.",
      },
      {
        kind: 'appearance',
        term: 'Elevation',
        value: { light: 'box-shadow: 0 2px 9px rgb(0 0 0 / 0.12)', dark: 'box-shadow: 0 2px 9px rgb(0 0 0 / 0.6)' },
        plain: 'A soft shadow lifts the white pill off the pale gray header and marks it as the place to start.',
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
    summary: 'Opens the filters, like price range, bedrooms and amenities, to narrow down the homes in the feed.',
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
        value: '30 × 30px · 14px icon',
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
      'A row of themes, like cabins or lakefront, that changes which homes show below. There are more than fit, so the row scrolls sideways.',
    aliases: ['category bar', 'the icons under the search', 'filter tabs', 'chips with icons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon over label',
        value: '19px icons · 8.5px labels',
        plain: 'A line drawing plus a word makes each category quick to scan and hard to misread.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'overflow-x: auto',
        plain:
          'Each tab keeps its full width instead of squeezing, so the row runs off the edge; the tab cut in half hints that you can swipe for more.',
      },
      {
        kind: 'appearance',
        term: 'Sticky header',
        value: { light: 'border-bottom: 0.5px solid #ebebeb', dark: 'border-bottom: 0.5px solid #2c2c2c' },
        plain:
          'The search and the tabs stay at the top while the homes scroll under them; a hairline and a soft shadow mark the edge.',
      },
    ],
  },
  {
    id: 'active-tab',
    name: 'Active tab',
    htmlTag: '<button role="tab" aria-selected="true">',
    variant: 'Underline indicator',
    summary: "The category you're viewing: full-strength text with a bar underneath, while the others stay gray.",
    aliases: ['selected tab', 'current category', 'the underlined one'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active indicator',
        value: 'height: 2px · background: currentColor',
        plain: "A bar as wide as the label, laid over the header's bottom edge, marks the current choice.",
      },
      {
        kind: 'appearance',
        term: 'Full-strength color',
        value: { light: 'color: #222', dark: 'color: #f2f2f2' },
        plain:
          'The active tab uses the full text color, while the rest are gray with lighter icons, so it stands out without a new color.',
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
    variant: 'Full-width photo, details below',
    summary: 'One home in the feed: the photos first, then what and where it is, the rating, a few details and the price.',
    aliases: ['property card', 'result card', 'the home tile', 'feed item'],
    concepts: [
      {
        kind: 'appearance',
        term: 'No card chrome',
        value: 'margin: 14px 17px 0',
        plain:
          "There's no border or background around it: the rounded photo and the spacing hold each home together, which keeps a long feed calm.",
      },
      {
        kind: 'appearance',
        term: 'Text hierarchy',
        value: '11.5px · 600 vs 10.5px gray',
        plain: 'Only the title is bold and dark; everything under it is smaller and gray, so you read it second.',
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
    aliases: ['image slider', 'gallery', 'the swipe-through pictures', 'listing photos'],
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
        value: 'aspect-ratio: 4 / 3 · object-fit: cover',
        plain: 'Every photo gets the same landscape frame, whatever its original shape, so the feed looks tidy.',
      },
      {
        kind: 'appearance',
        term: 'Rounded corners',
        value: 'border-radius: 14px',
        plain: 'Soft corners make the photo the card itself.',
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
        value: 'background: rgb(255 255 255 / 0.95) · border-radius: 999px',
        plain: 'Near-solid white with dark text reads clearly on any photo, bright or dark.',
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
        value: '“Guest pick”',
        plain: 'It tells you other guests loved this place, which builds trust before you read a single review.',
      },
    ],
  },
  {
    id: 'favorite-button',
    name: 'Favorite button',
    htmlTag: '<button aria-pressed="false">',
    variant: 'Heart on a photo · saved and not saved',
    summary:
      'A heart that saves the home to a wishlist. The empty one is not saved yet; the filled one on the next home is.',
    aliases: ['save button', 'wishlist heart', 'like button', 'the heart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outline over a dark fill',
        value: 'fill: rgb(0 0 0 / 0.5) · stroke: #fff',
        plain: 'A white outline around a see-through dark middle stays visible on light and dark photos alike.',
      },
      {
        kind: 'appearance',
        term: 'Saved state',
        value: { light: 'fill: #c65029', dark: 'fill: #eb7a52' },
        plain: 'Once saved, the heart fills in with the brand terracotta, so favorites stand out while you scroll.',
      },
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '22px heart · 26 × 26px target',
        plain: "The tappable area is a bit bigger than the heart, so it's easy to hit without opening the card by mistake.",
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
    aliases: ['dots', 'pager', 'the dots on the photo', 'carousel dots'],
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
        value: '3.5 × 3.5px vs 5 × 5px',
        plain: 'There are nine photos but only five dots; the smaller last dot hints that more follow.',
      },
      {
        kind: 'appearance',
        term: 'drop-shadow',
        value: 'filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.35))',
        plain: 'A faint dark halo keeps the white dots visible on a bright path or sky.',
      },
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    variant: 'One star, average and count',
    summary: 'The average guest score in its shortest form: one star, the average and how many reviews it comes from.',
    aliases: ['stars', 'review score', 'the 4.96', 'number of reviews'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Compact rating',
        value: '★ 4.96 (212)',
        plain:
          'One star next to the average fits on the title line; two decimals tell great from merely good, and the count says how much to trust it.',
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
        plain: 'Screen readers should hear "Rated 4.96 out of 5 from 212 reviews" rather than "star, 4.96, 212".',
      },
    ],
  },
  {
    id: 'listing-details',
    name: 'Secondary text',
    variant: 'Three gray lines',
    summary: "The details under the title: the host's name for the place, the beds and baths, and the dates you picked.",
    aliases: ['subtitle', 'metadata', 'the gray lines', 'listing info'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Muted color',
        value: { light: 'color: #6a6a6a', dark: 'color: #a3a3a3' },
        plain: 'Gray text carries the details without competing with the title or the price.',
      },
      {
        kind: 'appearance',
        term: 'One line each',
        value: 'white-space: nowrap · text-overflow: ellipsis',
        plain: 'Each fact gets its own line, and a long name stops at the edge with "…" instead of wrapping.',
      },
      {
        kind: 'appearance',
        term: 'Middle dot',
        value: '2 beds · 1 bath',
        plain: 'A small centered dot separates short facts on one line more quietly than a comma.',
      },
    ],
  },
  {
    id: 'price',
    name: 'Price with discount',
    variant: 'Total for the stay · original struck through',
    summary:
      'What the whole stay costs, fees included, with the old price crossed out in front of it so the saving is obvious.',
    aliases: ['price tag', 'was / now price', 'the crossed-out price', 'total price'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Strikethrough',
        value: 'text-decoration: line-through',
        plain: 'The original price is crossed out and gray, so it reads as history.',
      },
      {
        kind: 'appearance',
        term: 'Underlined total',
        value: 'font-weight: 600 · text-decoration: underline',
        plain: 'Only the price you pay is bold, and its underline says it opens the breakdown of nights and fees.',
      },
      {
        kind: 'appearance',
        term: 'Unit label',
        value: 'for 2 nights',
        plain: 'A few gray words say what the price covers, so nobody mistakes the total for a nightly rate.',
      },
      {
        kind: 'behavior',
        term: '<s> element',
        value: '<s>$486</s>',
        plain:
          'Most screen readers skip the strikethrough itself, so add hidden text like "originally $486" to keep the meaning.',
      },
    ],
  },
  {
    id: 'map-button',
    name: 'Floating action button',
    htmlTag: '<button>',
    variant: 'Extended · map toggle',
    summary:
      'A pill that floats above the feed and switches the homes to a map. On the map, it switches back to the list.',
    aliases: ['map toggle', 'show map button', 'the floating pill', 'FAB'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted colors',
        value: { light: 'background: #222', dark: 'background: #f2f2f2' },
        plain: 'It flips the page colors (dark on light, light on dark), so it stands out over any photo.',
      },
      {
        kind: 'appearance',
        term: 'Elevation',
        value: 'box-shadow: 0 4px 12px rgb(0 0 0 / 0.25)',
        plain: 'A soft shadow makes it look like it hovers above the feed.',
      },
      {
        kind: 'behavior',
        term: 'Centered and pinned',
        value: 'left: 50%; transform: translateX(-50%)',
        plain: 'It stays centered just above the tab bar while the homes move underneath.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Solid · five labeled tabs',
    summary: "The app's five main sections along the bottom edge, with Explore selected.",
    aliases: ['bottom nav', 'bottom menu', 'tabs', 'navigation bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active tab',
        value: { light: 'color: #c65029', dark: 'color: #eb7a52' },
        plain: "The selected tab's icon and label take the brand color, its icon drawn a little heavier; the rest stay gray.",
      },
      {
        kind: 'appearance',
        term: 'Logo as an icon',
        value: 'Trips',
        plain: "The Trips tab wears the Nest mark, two eggs in a nest: the brand appears once, where it's useful.",
      },
      {
        kind: 'appearance',
        term: 'Hairline border',
        value: { light: 'border-top: 0.5px solid #ebebeb', dark: 'border-top: 0.5px solid #2c2c2c' },
        plain: 'A thin line on a solid background separates the bar from the feed without a heavy shadow.',
      },
    ],
  },
  {
    id: 'notification-dot',
    name: 'Notification dot',
    variant: 'On a tab icon',
    summary: "A small dot on the Messages tab: there's a message you haven't read, without saying how many.",
    aliases: ['badge', 'unread dot', 'the dot on the icon', 'red dot'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dot badge',
        value: { light: '7 × 7px · #c65029', dark: '7 × 7px · #eb7a52' },
        plain: 'A plain dot in the brand color, no number: it nudges you to look without a count to clear.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 1.5px solid #fff', dark: 'border: 1.5px solid #121212' },
        plain: "A ring in the page color separates the dot from the icon's outline.",
      },
    ],
  },
  homeIndicator,
];
