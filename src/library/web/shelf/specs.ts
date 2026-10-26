import type { UiElementSpec } from '../../../catalog';

/** Elements on the Shelf category page, in the order they appear. `value` fields are the actual values from ShelfSite. */
export const shelfSpecs: UiElementSpec[] = [
  {
    id: 'promo-strip',
    name: 'Announcement bar',
    variant: 'Promo strip',
    summary:
      "A thin strip above the header with the store's headline offer, repeated on every page without taking much room.",
    aliases: ['promo bar', 'free shipping banner', 'the yellow bar at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Brand color fill',
        value: { light: 'background: #facc15', dark: 'background: #422006' },
        plain: "The store's yellow makes it stand out at the very top; in dark mode it turns deep amber so it doesn't glare.",
      },
      {
        kind: 'appearance',
        term: 'Compact height',
        value: 'min-height: 34px',
        plain: 'Short and to the point, so it pushes the products down as little as possible.',
      },
      {
        kind: 'behavior',
        term: 'Trimmed on phones',
        value: '@container (width < 560px)',
        plain: 'On narrow screens the second offer (free returns) hides, so the strip stays on one line.',
      },
    ],
  },
  {
    id: 'search-bar',
    name: 'Search bar',
    htmlTag: '<form role="search">',
    variant: 'With a department selector',
    summary:
      'The big search box in the header. The “All ▾” menu on its left narrows the search to one department before you type.',
    aliases: ['search box', 'search field', 'the search with the dropdown'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Scope selector',
        value: 'All ▾',
        plain: 'A small menu joined to the left edge of the field picks where to search: all of Shelf, or one department.',
      },
      {
        kind: 'appearance',
        term: 'Search button',
        value: '48px · #facc15',
        plain: 'A bright square on the right end runs the search; the magnifier says what it does.',
      },
      {
        kind: 'behavior',
        term: 'Sticky header',
        value: 'position: sticky; top: 0',
        plain:
          'The header holding the search sticks once the promo strip has scrolled away, so shoppers can search again from anywhere.',
      },
      {
        kind: 'behavior',
        term: 'Own row on phones',
        value: 'flex-basis: 100%',
        plain: 'Below 560px the search bar drops under the logo and takes the full width, and the department menu hides.',
      },
    ],
  },
  {
    id: 'cart-button',
    name: 'Cart button',
    htmlTag: '<a aria-label="Cart, 3 items">',
    variant: 'With count badge',
    summary: 'The cart icon in the header, with a small number pinned to it: how many items are already in the cart.',
    aliases: ['basket', 'shopping cart', 'the number on the cart', 'cart counter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count badge',
        value: 'min-width: 20px · border-radius: 999px',
        plain: "A tiny pill on the icon's corner that widens to fit bigger numbers.",
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 2px solid #1e3a8a', dark: 'border: 2px solid #111827' },
        plain: "A ring in the header's own color separates the badge from the icon underneath.",
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Cart, 3 items"',
        plain: "Screen readers hear the count as part of the button's name instead of a stray number.",
      },
    ],
  },
  {
    id: 'filter-panel',
    name: 'Filter panel',
    htmlTag: '<aside>',
    variant: 'Sidebar · Filters button on small screens',
    summary:
      'The column of filters next to the results. Each group narrows the list, and “Clear all” resets every filter at once.',
    aliases: ['faceted search', 'facets', 'refine by', 'the filters on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Grouped facets',
        value: { light: 'border-bottom: 1px solid #e5e7eb', dark: 'border-bottom: 1px solid #2a2a30' },
        plain: 'Hairlines split the panel into groups (type, brand, price, rating, color), each with a bold title.',
      },
      {
        kind: 'appearance',
        term: 'Color swatches',
        value: { light: '0 0 0 2px gap + 0 0 0 4px #1d4ed8', dark: '0 0 0 2px gap + 0 0 0 4px #60a5fa' },
        plain: 'Any number of colors can be picked; a ring with a small gap marks each chosen one (Black and White here).',
      },
      {
        kind: 'behavior',
        term: 'Clear all',
        value: 'Clear all',
        plain: 'One link that removes every filter, so nobody has to undo them one by one.',
      },
      {
        kind: 'behavior',
        term: 'Collapses into a button',
        value: '@container (width < 860px)',
        plain:
          'Below 860px the panel hides, and a Filters button showing the number of active filters (5) takes its place above the results.',
      },
    ],
  },
  {
    id: 'checkbox-filter',
    name: 'Checkbox filter',
    htmlTag: '<input type="checkbox">',
    variant: 'With result counts',
    summary: 'A list of options you can tick in any combination, each showing how many products it matches.',
    aliases: ['facet', 'filter list', 'refinement', 'the checkboxes on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Checked state',
        value: { light: 'background: #1d4ed8', dark: 'background: #60a5fa' },
        plain: 'A ticked box fills with the accent color and shows a check mark (Over-ear here).',
      },
      {
        kind: 'appearance',
        term: 'Result counts',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Each option shows how many products match. Equal-width digits keep the numbers lined up on the right.',
      },
      {
        kind: 'behavior',
        term: 'Show more',
        value: 'Show 12 more',
        plain: 'Long lists show the first four options and fold the rest behind a link.',
      },
      {
        kind: 'behavior',
        term: 'aria-checked',
        value: 'role="checkbox" aria-checked="true"',
        plain: 'Tells screen readers which options are ticked; any number can be on at once.',
      },
    ],
  },
  {
    id: 'price-slider',
    name: 'Range slider',
    htmlTag: '<input type="range">',
    variant: 'Two thumbs · Min and max fields',
    summary:
      'A track with two handles for picking a price range: the left one sets the minimum, the right one the maximum. The boxes below show the same values.',
    aliases: ['price slider', 'dual slider', 'min/max slider', 'the price filter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected range',
        value: 'left: 10%; width: 40%',
        plain: 'The colored stretch between the thumbs is the chosen range: $50 to $250 on a $0–$500 scale.',
      },
      {
        kind: 'appearance',
        term: 'Thumbs',
        value: '18 × 18px',
        plain: 'Round handles with an accent rim and a soft shadow, easy to spot and to grab.',
      },
      {
        kind: 'behavior',
        term: 'Two sliders',
        value: 'role="slider" × 2',
        plain: 'Each thumb is its own slider, with a minimum, a maximum and a current value (50 and 250) for screen readers.',
      },
      {
        kind: 'behavior',
        term: 'Min and max fields',
        value: '$50 – $250',
        plain: 'Typing an exact amount is easier than dragging to it, so the thumbs come with two fields showing the same values.',
      },
    ],
  },
  {
    id: 'rating-filter',
    name: 'Rating filter',
    htmlTag: '<input type="radio">',
    variant: '& up',
    summary: 'Rows of stars where each row means “this rating or better”. Picking 4 & up hides everything below four stars.',
    aliases: ['star filter', '4 stars & up', 'customer rating filter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Threshold label',
        value: '& up',
        plain: 'The short “& up” says the stars are a minimum, not an exact score.',
      },
      {
        kind: 'appearance',
        term: 'Selected row',
        value: { light: 'background: #eff6ff', dark: 'background: rgb(96 165 250 / 0.14)' },
        plain: 'The chosen row gets a soft tint and bold text.',
      },
      {
        kind: 'behavior',
        term: 'Single choice',
        value: 'role="radio" aria-checked="true"',
        plain: 'Only one minimum can apply at a time, so the rows behave like radio buttons.',
      },
    ],
  },
  {
    id: 'sort-dropdown',
    name: 'Sort dropdown',
    htmlTag: '<select>',
    variant: 'Sort by: Featured',
    summary: 'Changes the order of the results (featured, price, rating, newest) without changing which products are shown.',
    aliases: ['sort menu', 'order by', 'the sort by box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inline label',
        value: 'Sort by:',
        plain: 'The label sits inside the control, so one compact box names the setting and shows the current choice.',
      },
      {
        kind: 'appearance',
        term: 'Chevron',
        value: '16 × 16px',
        plain: 'The down arrow says a list of choices opens.',
      },
      {
        kind: 'behavior',
        term: 'Default order',
        value: 'Featured',
        plain: "Stores open on their own ranking and let shoppers switch to price, rating or what's newest.",
      },
      {
        kind: 'behavior',
        term: 'Label hides',
        value: '@container (width < 860px)',
        plain: 'On smaller screens “Sort by:” hides and only the current choice stays.',
      },
    ],
  },
  {
    id: 'view-toggle',
    name: 'View toggle',
    htmlTag: '<button aria-pressed>',
    variant: 'Grid · List',
    summary: 'Two icon buttons that switch the results between a grid of cards and a list of wide rows. Grid is on.',
    aliases: ['grid/list switch', 'layout toggle', 'the two little icons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pressed state',
        value: { light: 'background: #111827', dark: 'background: #f4f4f5' },
        plain: "The active view's button is filled in; the other stays plain.",
      },
      {
        kind: 'appearance',
        term: 'Icon buttons',
        value: '30 × 28px',
        plain: 'Each button is just an icon (four squares or three lines), grouped in one outlined box.',
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        value: '"true" · "false"',
        plain: 'Tells screen readers which view is on.',
      },
    ],
  },
  {
    id: 'filter-chips',
    name: 'Filter chips',
    htmlTag: '<button>',
    variant: 'Applied filters · Removable',
    summary: 'Every active filter repeated as a small pill above the results. The × on a chip removes just that filter.',
    aliases: ['filter pills', 'active filters', 'tags', 'the bubbles with an x'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill',
        value: 'border-radius: 999px',
        plain: 'Fully rounded ends and a light blue tint set the chips apart from the buttons around them.',
      },
      {
        kind: 'appearance',
        term: 'Remove icon',
        value: '× · 14px',
        plain: 'A small × inside each chip says it can be removed with one click.',
      },
      {
        kind: 'behavior',
        term: 'flex-wrap',
        value: 'wrap',
        plain: "When the chips don't fit on one line, they continue on the next instead of running off the edge.",
      },
    ],
  },
  {
    id: 'product-card',
    name: 'Product card',
    htmlTag: '<li>',
    variant: 'Grid tile',
    summary: 'One product in the grid: photo, title, rating, price, delivery date and a button that adds it to the cart.',
    aliases: ['product tile', 'item card', 'listing', 'the boxes with products'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Responsive grid',
        value: 'repeat(4, minmax(0, 1fr))',
        plain: 'Four cards per row in a wide window, three below 1000px and two on phones.',
      },
      {
        kind: 'appearance',
        term: 'Wishlist heart',
        value: 'position: absolute; top: 8px; right: 8px',
        plain: "A round heart button floats on the photo's corner; a filled red heart means the item is saved.",
      },
      {
        kind: 'appearance',
        term: 'Delivery note',
        value: 'Free delivery Tomorrow',
        plain: 'The delivery date in bold answers “when would I get it?” right on the card.',
      },
      {
        kind: 'behavior',
        term: 'Button pinned to the bottom',
        value: 'margin-top: auto',
        plain: 'Add to cart is pushed to the bottom of the card, so the buttons in a row line up even when the text above differs.',
      },
    ],
  },
  {
    id: 'product-badge',
    name: 'Badge',
    variant: 'Best seller · Discount',
    summary: "A small label on the photo's corner that calls out the product: a best seller, or how much it's discounted.",
    aliases: ['label', 'sale tag', 'ribbon', 'the red tag'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overlay position',
        value: 'position: absolute; top: 8px; left: 8px',
        plain: 'It sits on top of the photo, in the corner where the eye starts reading.',
      },
      {
        kind: 'appearance',
        term: 'Color by meaning',
        value: '#c2410c best seller · #dc2626 discount',
        plain: 'Orange marks popularity and red marks a price cut, so the two never get confused.',
      },
      {
        kind: 'appearance',
        term: 'White on color',
        value: 'color: #fff · 11.5px · 700',
        plain: 'Small, bold white text on a strong color reads well in both light and dark mode.',
      },
    ],
  },
  {
    id: 'product-title',
    name: 'Truncated title',
    variant: 'Two-line clamp',
    summary: 'Long product names stop after two lines and end with “…”, so every card keeps the same height.',
    aliases: ['ellipsis', 'truncated text', 'the title that cuts off', 'the three dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'line-clamp',
        value: '-webkit-line-clamp: 2',
        plain: 'Shows at most two lines and adds an ellipsis where the text is cut.',
      },
      {
        kind: 'appearance',
        term: 'overflow: hidden',
        value: 'hidden',
        plain: 'Hides the rest of the name on screen; the full text is still in the page for search engines and screen readers.',
      },
    ],
  },
  {
    id: 'star-rating',
    name: 'Star rating',
    variant: 'Average and review count',
    summary: 'Five stars filled to the average score, with the score and the number of reviews next to them.',
    aliases: ['stars', 'reviews', 'rating', 'score'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Partial fill',
        value: 'width: 92%',
        plain: 'A gold row of stars sits on a gray one and is cut to the score: 4.6 out of 5 shows 92% of the gold.',
      },
      {
        kind: 'appearance',
        term: 'Review count',
        value: { light: 'color: #1d4ed8', dark: 'color: #60a5fa' },
        plain: 'The count in parentheses is colored like a link, because it usually jumps to the reviews.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Rated 4.6 out of 5"',
        plain: 'Screen readers hear the score as one sentence instead of five separate icons.',
      },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    variant: 'Raised cents · Was price',
    summary:
      "The price you pay, with a small raised dollar sign and cents, and the old price crossed out when it's on sale.",
    aliases: ['price tag', 'sale price', 'was / now price', 'strikethrough price'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Superscript cents',
        value: 'font-size: 12px; vertical-align: 7px',
        plain: 'The dollar sign and the cents shrink and rise, so the whole dollars ($149) read first.',
      },
      {
        kind: 'appearance',
        term: 'Strikethrough',
        value: 'text-decoration: line-through',
        plain: 'The old price is crossed out and grayed, so the saving is obvious at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Visual weight',
        value: '21px · 700 vs 13px',
        plain: 'The price you pay is big and bold; the old one stays small.',
      },
    ],
  },
  {
    id: 'pagination',
    name: 'Pagination',
    htmlTag: '<nav aria-label="Pagination">',
    variant: 'Numbered · Previous and next',
    summary: "Numbered links to the pages of results, plus Previous and Next. You're on page 1 of 13.",
    aliases: ['pager', 'page numbers', 'next page', '1 2 3 … 13'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Current page',
        value: { light: 'background: #111827', dark: 'background: #f4f4f5' },
        plain: 'Page 1 is filled in solid. In the code it carries aria-current="page", so screen readers announce it too.',
      },
      {
        kind: 'appearance',
        term: 'Ellipsis',
        value: '…',
        plain: 'Pages 4 to 12 collapse into “…”, which keeps the row short while still showing the last page.',
      },
      {
        kind: 'behavior',
        term: 'Disabled step',
        value: 'aria-disabled="true"',
        plain: "There's nothing before page 1, so Previous stays in place but grayed out.",
      },
      {
        kind: 'behavior',
        term: 'Icon-only on phones',
        value: '@container (width < 560px)',
        plain: 'On narrow screens Previous and Next shrink to arrows, so the page numbers still fit on one line.',
      },
    ],
  },
];
