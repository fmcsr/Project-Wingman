import type { UiElementSpec } from '../../../catalog';

/** Elements on the Shelf search results page. `value` fields are the actual values from ShelfSite.module.css and the markup. */
export const shelfSpecs: UiElementSpec[] = [
  {
    id: 'delivery-location',
    name: 'Delivery location',
    htmlTag: '<button>',
    variant: 'Header · Own strip on phones',
    summary:
      'Where your orders will go, shown before you even search: the delivery dates, prices and stock on the page are all worked out for this address.',
    aliases: ['deliver to', 'ship-to address', 'location picker', 'the pin in the header', 'zip code'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two-line label',
        value: '12px · rgb(255 255 255 / 0.72) over 14px · 700',
        plain: 'A small gray “Deliver to Sam” over the bold city and ZIP code, next to a map pin.',
      },
      {
        kind: 'behavior',
        term: 'Location-aware results',
        value: 'Seattle 98103',
        plain:
          'Pick another address and every delivery date on the page is worked out again; products that can’t ship there drop out.',
      },
      {
        kind: 'behavior',
        term: 'Own strip on phones',
        value: '@container (width < 640px)',
        plain: 'On phones it leaves the crowded header and gets a strip of its own under the search bar.',
      },
    ],
  },
  {
    id: 'search-bar',
    name: 'Search bar',
    htmlTag: '<form role="search">',
    variant: 'Department selector · Joined button',
    summary:
      'The wide search field in the middle of the header. The “All ▾” menu on its left narrows the search to one department, and the mint button runs it.',
    aliases: ['search box', 'search field', 'the search with the dropdown', 'omnibox'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Scope selector',
        value: 'All ▾ · background: #e8e8e8',
        plain: 'A gray menu joined to the field’s left end picks where to search: all of Shelf, or one department.',
      },
      {
        kind: 'appearance',
        term: 'Joined search button',
        value: 'width: 46px · background: #3dd6a0',
        plain:
          "The button is part of the bar, not a separate shape, and it's in Shelf's mint so it stands out against the dark header.",
      },
      {
        kind: 'behavior',
        term: 'Query stays in the field',
        value: '“headphones”',
        plain: 'After a search the words stay in the box, so you can change them without typing everything again.',
      },
      {
        kind: 'behavior',
        term: 'Own row on phones',
        value: 'flex-basis: 100%',
        plain: 'Below 640px the bar drops under the logo and takes the full width; the department menu hides.',
      },
    ],
  },
  {
    id: 'account-menu',
    name: 'Account menu',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Greeting · Account & Lists ▾',
    summary:
      'A greeting with your name over “Account & Lists”. It opens a menu with your orders, lists, membership and settings.',
    aliases: ['account dropdown', 'profile menu', 'Hello, Sam', 'my account', 'sign in'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Personal greeting',
        value: '“Hello, Sam”',
        plain: 'Your first name in small gray type shows that you are signed in, without needing a photo.',
      },
      {
        kind: 'behavior',
        term: 'Flyout menu',
        value: 'aria-haspopup="menu"',
        plain:
          'The small triangle says it opens a menu. On a desktop it opens on hover: your lists on one side, account links on the other.',
      },
      {
        kind: 'behavior',
        term: 'Short form on phones',
        value: '@container (width < 640px)',
        plain: 'Phones show a person icon and “Sam ›” instead of the two lines.',
      },
    ],
  },
  {
    id: 'cart-button',
    name: 'Cart button',
    htmlTag: '<a aria-label="Cart, 2 items">',
    variant: 'With count badge',
    summary: 'The cart at the right end of the header, with the number of items already in it.',
    aliases: ['basket', 'shopping cart', 'the number on the cart', 'cart counter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count badge',
        value: 'min-width: 20px · border-radius: 10px · background: #3dd6a0',
        plain: "A mint pill on the cart's corner that grows sideways for bigger numbers.",
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'box-shadow: 0 0 0 2px #24142f', dark: 'box-shadow: 0 0 0 2px #1b0f24' },
        plain: "A ring in the header's plum separates the badge from the cart icon under it.",
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '“Cart, 2 items”',
        plain: "Screen readers hear the count as part of the button's name instead of a stray number.",
      },
    ],
  },
  {
    id: 'category-nav',
    name: 'Category bar',
    htmlTag: '<nav>',
    variant: 'All menu · Assistant · Departments · Promotion',
    summary:
      'The second bar of the header. “All” opens every department in a side menu, Ask Shelf opens the shopping assistant, the links go to popular departments and services, and the right end announces the next big sale.',
    aliases: ['navigation bar', 'department links', 'hamburger menu', 'sub-nav', 'secondary nav', 'AI assistant button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two-tone header',
        value: { light: 'background: #3a2149', dark: 'background: #2a1836' },
        plain: 'One step lighter than the bar above, so the two rows read as one header with a quieter second line.',
      },
      {
        kind: 'behavior',
        term: 'Hamburger menu',
        value: '≡ All',
        plain:
          'Three lines and “All” open a drawer from the left with every department, so the bar itself only needs the popular ones.',
      },
      {
        kind: 'behavior',
        term: 'Assistant shortcut',
        value: 'Ask Shelf · background: #ffffff · border-radius: 13px',
        plain:
          'A white pill with a sparkle opens a chat that answers product questions in plain words, like “which of these is best for flights?”.',
      },
      {
        kind: 'behavior',
        term: 'Whole links overflow',
        value: 'flex-wrap: wrap · height: 39px · overflow: clip',
        plain:
          "Links that don't fit wrap onto a second line that's cut off, so a narrower window drops whole links instead of squeezing them.",
      },
    ],
  },
  {
    id: 'sort-dropdown',
    name: 'Sort dropdown',
    htmlTag: '<select>',
    variant: 'Results bar · Featured',
    summary:
      'The gray button at the right of the results bar that changes the order of the results. The left side of the bar says how many products matched.',
    aliases: ['sort by', 'order by', 'sorting menu', 'results count', 'the results bar'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Sort options',
        value: 'Featured · Price: Low to High · Price: High to Low · Avg. Customer Review · Newest Arrivals',
        plain:
          'Featured is the store’s own mix of relevance and sales; the others are plain orders a shopper can pick instead.',
      },
      {
        kind: 'appearance',
        term: 'Raised gray button',
        value: {
          light: 'background: #f0f2f2 · border: 1px solid #d5d9d9',
          dark: 'background: #24222a · border: 1px solid #3b3842',
        },
        plain: 'A hairline and a soft shadow make it look pressable, while it stays quieter than Add to cart.',
      },
      {
        kind: 'appearance',
        term: 'Result count',
        value: '1-8 of over 8,000 results for “headphones”',
        plain: 'Says which results you are looking at and roughly how many there are, repeating the search words in plum.',
      },
    ],
  },
  {
    id: 'filter-sidebar',
    name: 'Filter sidebar',
    htmlTag: '<aside>',
    variant: 'Refinements · Filters button on small screens',
    summary:
      'The column of filters left of the results: shipping, delivery day, reviews, brands, price and product details. Each choice narrows the results right away.',
    aliases: ['faceted search', 'facets', 'refinements', 'the filters on the left', 'left rail'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Grouped refinements',
        value: 'gap: 22px · titles 14px / 700',
        plain: 'No boxes or dividers: a bold title and some space are enough to tell one group from the next.',
      },
      {
        kind: 'behavior',
        term: 'Stars & up',
        value: '★★★★☆ & Up · ‹ Clear',
        plain:
          'Four stars keeps products rated 4 or higher. The filter is on here, so “& Up” is bold and a Clear link sits above it.',
      },
      {
        kind: 'behavior',
        term: 'Collapses into a button',
        value: '@container (width < 880px)',
        plain:
          'Below 880px the column hides, and a “Filters (2)” button with the number of filters on takes its place in the results bar.',
      },
    ],
  },
  {
    id: 'checkbox-filter',
    name: 'Checkbox filter',
    htmlTag: '<input type="checkbox">',
    variant: 'Free Shipping · Brands · See more',
    summary:
      'Options you can tick in any combination. Long lists show the first few and fold the rest behind “See more”.',
    aliases: ['facet', 'multi-select filter', 'brand filter', 'the checkboxes on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Checked state',
        value: { light: 'background: #6b2f93', dark: 'background: #b98be2' },
        plain:
          'Square boxes with soft corners (3px); a ticked one fills with Shelf’s plum, like Free Shipping by Shelf at the top.',
      },
      {
        kind: 'behavior',
        term: 'Any within a group, all across groups',
        value: 'Sonara or Volta · and Free Shipping',
        plain:
          'Ticking two brands shows products from either one, while each ticked group on top of that narrows the list further.',
      },
      {
        kind: 'behavior',
        term: 'See more',
        value: '7 brands · See more',
        plain: "Long lists show the first seven options and fold the rest, so one group can't push the others out of sight.",
      },
    ],
  },
  {
    id: 'price-slider',
    name: 'Range slider',
    htmlTag: '<input type="range">',
    variant: 'Two thumbs · Go · Preset ranges',
    summary:
      'Drag the two handles to set the lowest and highest price, then press Go. The links under it set common ranges in one click.',
    aliases: ['price filter', 'dual slider', 'min-max slider', 'price range'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two thumbs on one track',
        value: { light: 'border: 7px solid #6b2f93', dark: 'border: 7px solid #b98be2' },
        plain: 'Each handle is a plum ring with a light center; the track between them is the range that stays in.',
      },
      {
        kind: 'behavior',
        term: 'Apply button',
        value: 'Go',
        plain: "The results update only when you press Go, so dragging doesn't reload the page at every step.",
      },
      {
        kind: 'behavior',
        term: 'Preset ranges',
        value: 'Up to $50 … $300 & above',
        plain: "Ready-made ranges for shoppers who'd rather click than drag.",
      },
      {
        kind: 'behavior',
        term: 'role="slider"',
        value: 'aria-valuenow="10" · aria-valuemax="500"',
        plain: 'Each handle tells screen readers its value and limits, and moves with the arrow keys.',
      },
    ],
  },
  {
    id: 'product-card',
    name: 'Product card',
    htmlTag: '<li>',
    variant: 'Grid · Rows on phones',
    summary:
      'One product in the results: photo, title, rating, price, delivery and an Add to cart button, inside a hairline with soft corners.',
    aliases: ['product tile', 'listing', 'search result', 'item card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Square photo',
        value: 'aspect-ratio: 1 · object-fit: cover',
        plain: 'Every photo fills the same square, so the grid stays tidy whatever shape the original was.',
      },
      {
        kind: 'appearance',
        term: 'Auto-fill grid',
        value: 'grid-template-columns: repeat(auto-fill, minmax(196px, 1fr))',
        plain: 'As many columns as fit at 196px or more: four next to the filters on a desktop, three without them.',
      },
      {
        kind: 'behavior',
        term: 'Rows on phones',
        value: '@container (width < 640px)',
        plain: 'On phones each card turns into a row with the photo on the left, so one product fits on screen at a time.',
      },
    ],
  },
  {
    id: 'sponsored-label',
    name: 'Sponsored label',
    variant: 'Ad disclosure',
    summary:
      'The small gray “Sponsored” over a title: the seller paid for this spot in the results. The ⓘ explains why you are seeing the ad.',
    aliases: ['ad label', 'promoted', 'sponsored product', 'paid placement'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Quiet disclosure',
        value: { light: 'font-size: 12px · color: #565959', dark: 'font-size: 12px · color: #a9a5af' },
        plain: "Small and gray so it doesn't compete with the product, but always there: ads have to be labeled.",
      },
      {
        kind: 'behavior',
        term: 'Why this ad',
        value: 'ⓘ',
        plain: 'The info icon opens a short note on how ads are picked, with a way to give feedback.',
      },
      {
        kind: 'behavior',
        term: 'Mixed into the results',
        value: 'Results 1 and 7',
        plain: 'Ads use the same card as everything else and sit among the other results, which is why the label matters.',
      },
    ],
  },
  {
    id: 'product-badge',
    name: 'Product badge',
    variant: "Best Seller · Shelf's Pick",
    summary:
      "A label on the photo's corner that singles a product out: Best Seller for the most bought in its category, Shelf's Pick for the store's own recommendation.",
    aliases: ['tag', 'ribbon', 'best seller badge', "editor's choice", 'label on the photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Notched tag',
        value: 'clip-path: polygon(0 0, 100% 0, calc(100% - 7px) 50%, 100% 100%, 0 100%)',
        plain: 'A notch cut into its right end makes Best Seller look like a tag tied to the product.',
      },
      {
        kind: 'appearance',
        term: 'One look per badge',
        value: 'Best Seller: #5a2a7c · Pick: #221a28',
        plain: "Plum for Best Seller, near-black with “Pick” in mint for Shelf's Pick, so the two never get mixed up.",
      },
      {
        kind: 'behavior',
        term: 'Earned, not bought',
        value: 'Volta Bass+ · Kestrel K50',
        plain: 'Badges come from sales and ratings, unlike the Sponsored label, which a seller pays for.',
      },
    ],
  },
  {
    id: 'product-title',
    name: 'Product title',
    htmlTag: '<h3>',
    variant: 'Clamped to four lines',
    summary:
      "The product's full name as the seller wrote it: brand, model and the main features. Long ones stop after four lines with an ellipsis.",
    aliases: ['product name', 'listing title', 'item name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Line clamp',
        value: '-webkit-line-clamp: 4',
        plain: 'Cuts the text after four lines and adds “…”, so long names don’t push the prices out of line across a row.',
      },
      {
        kind: 'appearance',
        term: 'Reading size',
        value: 'font-size: 16px · line-height: 24px',
        plain: 'A little larger than the rest of the card, since the name is what people read first.',
      },
      {
        kind: 'behavior',
        term: 'Three lines on phones',
        value: '-webkit-line-clamp: 3',
        plain: 'The narrower rows on phones stop at three lines to keep each card short.',
      },
    ],
  },
  {
    id: 'star-rating',
    name: 'Star rating',
    variant: 'Score · Stars · Rating count',
    summary:
      'The average rating as a number and as stars, then how many people rated it. The chevron opens a breakdown by star.',
    aliases: ['reviews', 'stars', 'customer rating', 'the little stars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Partial stars',
        value: 'width: 92% (4.6 of 5)',
        plain:
          'A row of filled stars is cut to the score’s width over a row of outlined ones, so 4.6 fills a little more than half of the last star.',
      },
      {
        kind: 'appearance',
        term: 'Count as a link',
        value: { light: 'color: #6b2f93', dark: 'color: #c9a4ec' },
        plain: 'The number of ratings is in plum because it opens the reviews.',
      },
      {
        kind: 'behavior',
        term: 'Rating breakdown',
        value: '⌄',
        plain: 'The chevron opens a small popover with how many ratings each star level got.',
      },
    ],
  },
  {
    id: 'purchase-count',
    name: 'Social proof line',
    variant: 'Bought in past month',
    summary: 'A gray line saying roughly how many people bought the product lately, like “10K+ bought in past month”.',
    aliases: ['social proof', 'sales count', 'popularity', 'bought in past month'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rounded figures',
        value: '500+ · 1K+ · 10K+',
        plain: 'Numbers are rounded down to a step: enough to compare products without sharing exact sales.',
      },
      {
        kind: 'appearance',
        term: 'Muted text',
        value: { light: 'color: #565959', dark: 'color: #a9a5af' },
        plain: 'Gray and under the rating, so it supports the decision without shouting.',
      },
      {
        kind: 'behavior',
        term: 'Only when it helps',
        value: 'Shown on 6 of 8',
        plain: "Products with few recent sales simply don't get the line, rather than showing a small number.",
      },
    ],
  },
  {
    id: 'deal-badge',
    name: 'Deal badge',
    variant: 'Limited time deal',
    summary:
      'A small red label right above the price that marks a discount for a limited time, with the usual price struck through beside the new one.',
    aliases: ['sale badge', 'discount tag', 'lightning deal', 'promo label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Red label',
        value: { light: 'background: #cc0c39', dark: 'background: #d81b45' },
        plain: 'White on red, the usual color for a sale, and kept small so it doesn’t drown out the price.',
      },
      {
        kind: 'behavior',
        term: 'Time-limited',
        value: 'Limited time deal',
        plain: 'The deal runs until a set date or until its stock runs out; the product page shows the countdown.',
      },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    variant: 'Raised cents · Percent off · List price',
    summary:
      'The current price with the dollar sign and cents raised. When it’s lower than usual, the percent off comes first and the list price follows, struck through.',
    aliases: ['price tag', 'sale price', 'strikethrough price', 'was/now price'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Raised cents',
        value: 'font-size: 28px · $ and cents 13px',
        plain: 'Whole dollars are large and the cents small and raised, so “$248” is what the eye takes in.',
      },
      {
        kind: 'appearance',
        term: 'Percent off',
        value: { light: 'color: #cc0c39 · font-weight: 300', dark: 'color: #ff5c7c · font-weight: 300' },
        plain: '“-22%” comes first in red but in a light weight, so the price itself stays the strongest.',
      },
      {
        kind: 'appearance',
        term: 'List price',
        value: 'text-decoration: line-through',
        plain: '“List: $549.00” in small gray type, crossed out, shows what it usually costs.',
      },
    ],
  },
  {
    id: 'delivery-promise',
    name: 'Delivery promise',
    variant: 'Free delivery · Fastest option · Membership',
    summary:
      'When the product arrives and what delivery costs, with the date in bold. Shelf Plus members get faster free delivery, marked with a mint tick.',
    aliases: ['shipping info', 'delivery date', 'arrives by', 'ETA'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bold date',
        value: 'font-weight: 700',
        plain: 'The date is the one bold part, because “when will it arrive” is what people scan for.',
      },
      {
        kind: 'behavior',
        term: 'Relative dates',
        value: '“Tomorrow, Nov 18”',
        plain:
          'Near dates are written as words, later ones as a weekday and a date; both depend on the delivery location in the header.',
      },
      {
        kind: 'appearance',
        term: 'Membership tick',
        value: { light: 'stroke: #21b07f · “plus” 15px italic 800', dark: 'stroke: #3dd6a0 · “plus” 15px italic 800' },
        plain: 'Products with fast free delivery for Shelf Plus members carry the tick and the word plus above the date.',
      },
      {
        kind: 'behavior',
        term: 'Conditions in plain sight',
        value: 'on $35 of items shipped by Shelf',
        plain: 'Cheaper items ship free only in a $35 order, and the line says so instead of hiding it at checkout.',
      },
    ],
  },
  {
    id: 'add-to-cart',
    name: 'Add to cart button',
    htmlTag: '<button>',
    variant: 'Pill · Mint',
    summary: 'Puts the product in the cart straight from the results, without opening its page.',
    aliases: ['buy button', 'add to basket', 'CTA', 'the mint button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'height: 32px · border-radius: 16px',
        plain: 'Fully rounded ends make it read as the button on a card full of text and links.',
      },
      {
        kind: 'appearance',
        term: 'Action color',
        value: 'background: #3dd6a0 · color: #10201a',
        plain:
          "Shelf's mint with dark text, like the search button and the cart count: everything that moves you toward buying.",
      },
      {
        kind: 'behavior',
        term: 'Add without leaving',
        value: 'Cart: 2 → 3',
        plain: 'The product goes into the cart and the count in the header goes up, while you stay on the results.',
      },
    ],
  },
  {
    id: 'pagination',
    name: 'Pagination',
    htmlTag: '<nav>',
    variant: 'Previous · Pages · Next',
    summary: 'The page links under the results: Previous and Next, the pages around the current one and the last page.',
    aliases: ['pager', 'page numbers', 'next page'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Current page',
        value: { light: 'border: 1px solid #0f1111', dark: 'border: 1px solid #ebe9ee' },
        plain: "The page you're on is outlined and bold.",
      },
      {
        kind: 'appearance',
        term: 'Truncation',
        value: '1 2 3 … 7',
        plain: 'An ellipsis stands in for the pages in between, so the bar stays short however many pages there are.',
      },
      {
        kind: 'behavior',
        term: 'Disabled, not hidden',
        value: 'aria-disabled="true"',
        plain: 'On the first page Previous is grayed out but keeps its place, so Next doesn’t jump around.',
      },
    ],
  },
];
