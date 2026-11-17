import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Vault home screen, in the order they appear. `value` fields are the actual values from VaultApp. */
export const vaultSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'avatar',
    name: 'Profile button',
    htmlTag: '<button aria-label="Profile">',
    variant: 'Photo with a dot badge',
    summary:
      'Your photo in the top-left corner: the way into your profile, settings and help. The red dot says something there needs a look.',
    aliases: ['avatar', 'profile picture', 'my photo', 'account menu'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Avatar',
        value: '26 × 26px · border-radius: 50%',
        plain: 'A round photo is the shared signal for "this is you" across apps.',
      },
      {
        kind: 'appearance',
        term: 'Dot badge',
        value: '6 × 6px · #ff4d4f',
        plain: 'A plain red dot, no number: a new message from support or a document to sign is waiting.',
      },
      {
        kind: 'behavior',
        term: 'Entry point',
        plain: 'Settings, statements and help live behind your photo, so the home screen keeps to your money.',
      },
    ],
  },
  {
    id: 'search-bar',
    name: 'Search bar',
    htmlTag: '<button>',
    variant: 'See-through pill',
    summary:
      'A pill that opens a search across everything: transactions, people you pay, features and settings. It looks like a field but opens a search screen.',
    aliases: ['search field', 'search box', 'the search pill'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Frosted pill',
        value: 'background: rgb(255 255 255 / 0.2) · border-radius: 999px',
        plain: 'See-through white lets the brand wash show through, so the bar sits on the color instead of covering it.',
      },
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: '“Search” · rgb(255 255 255 / 0.78)',
        plain: 'Dimmed text says what to do until you start typing.',
      },
      {
        kind: 'behavior',
        term: 'Search launcher',
        plain: 'Tapping it opens a full-screen search with the keyboard up and your recent searches below.',
      },
    ],
  },
  {
    id: 'analytics-button',
    name: 'Analytics button',
    htmlTag: '<button aria-label="Analytics">',
    variant: 'Round icon button',
    summary: 'Opens your spending analytics: where the money went this month, by category and by merchant.',
    aliases: ['insights', 'stats', 'the chart icon', 'spending'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon button',
        value: '26 × 26px · rgb(255 255 255 / 0.2)',
        plain: 'A round, see-through button with just a glyph: compact, and the same family as the search pill.',
      },
      {
        kind: 'appearance',
        term: 'Filled glyph',
        value: '13px bar chart',
        plain: 'Three solid rounded bars read as "charts" at a glance, even this small.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        plain: 'With no visible word, it needs a hidden name like "Analytics" for screen readers.',
      },
    ],
  },
  {
    id: 'cards-button',
    name: 'Cards button',
    htmlTag: '<button aria-label="Cards">',
    variant: 'Round icon button',
    summary: 'Opens your cards: freeze one, see its number and PIN, or change its limits.',
    aliases: ['card settings', 'the card icon', 'my cards'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Cut-out stripe',
        value: 'stroke: rgb(4 48 26 / 0.55)',
        plain: 'A solid card with its stripe cut out in the wash color reads as a card, not as a plain rectangle.',
      },
      {
        kind: 'behavior',
        term: 'Shortcut',
        plain: 'Card controls are the first thing people look for when a card goes missing, so they get a button on the home screen.',
      },
    ],
  },
  {
    id: 'balance',
    name: 'Balance',
    variant: 'Hero number with smaller cents',
    summary:
      'How much is in the account, set as the biggest thing on screen because it is what people open the app to check. The line above says which account and currency.',
    aliases: ['the big number', 'account total', 'how much money I have', 'account name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Display size',
        value: '34px · 700 · letter-spacing: -0.02em',
        plain: 'Far bigger and bolder than anything around it, and pulled slightly together so the digits stay compact.',
      },
      {
        kind: 'appearance',
        term: 'Smaller cents',
        value: '34px dollars · 20px cents',
        plain: 'The cents step down a size on the same baseline, which keeps the part that matters most in front.',
      },
      {
        kind: 'appearance',
        term: 'Brand wash',
        value: { light: '#04301a → #f1f4f2', dark: '#22a062 → #060b08' },
        plain:
          'The balance sits on a wash of the brand green that clears into the page: deep to pale in light mode, bright to black in dark mode.',
      },
      {
        kind: 'appearance',
        term: 'Account label',
        value: '“Personal · USD”',
        plain: 'A quiet line above the number names the account and its currency, so a balance is never ambiguous.',
      },
    ],
  },
  {
    id: 'accounts-button',
    name: 'Accounts button',
    htmlTag: '<button>',
    variant: 'Frosted pill',
    summary: 'Opens the list of all your accounts and currencies, with a total, to pick another one or open a new one.',
    aliases: ['account picker', 'switch account', 'the Accounts pill'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill button',
        value: 'height: 27px · padding: 0 15px',
        plain: 'A word in a see-through capsule, right under the number it changes.',
      },
      {
        kind: 'appearance',
        term: 'Secondary emphasis',
        value: 'background: rgb(255 255 255 / 0.2)',
        plain: "See-through white instead of a solid color: it's useful, but the balance stays the star.",
      },
      {
        kind: 'behavior',
        term: 'Sheet',
        plain: 'A tap slides up a sheet with every account; picking one swaps the balance, the actions and the transactions together.',
      },
    ],
  },
  {
    id: 'page-dots',
    name: 'Page indicator',
    variant: 'Dots for the account pager',
    summary: 'Three dots under the balance: this is one of three accounts, and swiping sideways on the balance shows the next.',
    aliases: ['dots', 'pager', 'carousel dots', 'account switcher'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active dot',
        value: '#fff vs rgb(255 255 255 / 0.45)',
        plain: 'The account on screen gets a solid dot; the others are see-through.',
      },
      {
        kind: 'appearance',
        term: 'Tiny dots',
        value: '4 × 4px · gap: 3px',
        plain: "Small enough to stay out of the way: they only say there's more, and where you are.",
      },
      {
        kind: 'behavior',
        term: 'Swipe between accounts',
        value: 'scroll-snap-type: x mandatory',
        plain: 'The balance area pages sideways one account at a time, and the dots follow along.',
      },
    ],
  },
  {
    id: 'quick-action',
    name: 'Quick action button',
    htmlTag: '<button>',
    variant: 'Round icon with a label',
    summary: 'Shortcuts under the balance for the money moves people make most: adding money, exchanging and the account details.',
    aliases: ['shortcut buttons', 'the round buttons', 'action row', 'add money button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon circle',
        value: '34 × 34px · rgb(255 255 255 / 0.2)',
        plain: 'Big round targets that are easy to hit with a thumb, see-through so the wash shows behind them.',
      },
      {
        kind: 'appearance',
        term: 'Label under the icon',
        value: '10.5px · 500',
        plain: 'A word under every icon removes the guesswork; a glyph on its own is easy to misread.',
      },
      {
        kind: 'appearance',
        term: 'Equal columns',
        value: 'grid-template-columns: repeat(4, 1fr)',
        plain: 'Four buttons share the width evenly, so the row lines up whatever the labels say.',
      },
      {
        kind: 'behavior',
        term: 'Overflow action',
        value: 'More',
        plain: 'Rarer actions wait behind More, which keeps the row to four buttons.',
      },
    ],
  },
  {
    id: 'transaction-row',
    name: 'Transaction row',
    variant: 'Logo, title and time, amount',
    summary: 'One payment in the recent list: who or what it was, when, and how much. Tapping it opens the receipt.',
    aliases: ['transaction', 'list item', 'payment row', 'activity item'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three-column row',
        value: 'grid-template-columns: 28px 1fr auto',
        plain: 'A fixed slot for the logo, the text taking the middle, the amount pinned to the right edge.',
      },
      {
        kind: 'appearance',
        term: 'Two-line text',
        value: { light: '11.5px · 500 over 10px #6c746f', dark: '11.5px · 500 over 10px #8e9a93' },
        plain: 'The name first, then the time in gray: the second line answers "when?" without a column of its own.',
      },
      {
        kind: 'behavior',
        term: 'Inside a card',
        value: 'border-radius: 14px',
        plain: 'The latest transactions sit together in one rounded card, so the list reads as a single block.',
      },
    ],
  },
  {
    id: 'merchant-logo',
    name: 'Merchant logo',
    variant: 'Round logo',
    summary: "The shop's own logo in a circle, so you recognize a payment before you read its name.",
    aliases: ['merchant icon', 'brand logo', 'the orange circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Round crop',
        value: '28 × 28px · border-radius: 50%',
        plain: 'Every logo gets the same circle, whatever its shape, so the list stays even.',
      },
      {
        kind: 'appearance',
        term: "The merchant's colors",
        value: '#d9622b',
        plain: "Fernwood Market's leaf on its own orange: the logo, not the app's color, tells you who it is.",
      },
      {
        kind: 'behavior',
        term: 'Fallback',
        plain: 'Without a known logo, the row shows an icon for the category, like a cart for groceries.',
      },
    ],
  },
  {
    id: 'currency-pair',
    name: 'Currency pair icon',
    variant: 'Two overlapping flags',
    summary: 'An exchange between currencies shows both flags: the currency you sold, and on top of it the one you bought.',
    aliases: ['flags', 'exchange icon', 'currency icon', 'the two flags'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overlap',
        value: '19px and 22px circles',
        plain: 'The second flag sits over the corner of the first, so two icons fit the space of one.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 1.5px solid #fff', dark: 'border: 1.5px solid #141b17' },
        plain: "A ring in the card's color separates the two flags where they overlap.",
      },
    ],
  },
  {
    id: 'amount',
    name: 'Amount',
    variant: 'Right-aligned · with the other currency',
    summary:
      "How much each transaction was. An exchange shows both sides: what left this account, and in gray what arrived in the other.",
    aliases: ['price', 'sum', 'transaction amount', 'the number on the right'],
    concepts: [
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Every digit takes the same width, so amounts line up neatly down the right edge.',
      },
      {
        kind: 'appearance',
        term: 'Signed amounts',
        value: '−$250 · +€231.40',
        plain: 'A true minus sign for money out and a plus for money in say the direction without relying on color.',
      },
      {
        kind: 'appearance',
        term: 'Secondary amount',
        value: { light: '10px · #6c746f', dark: '10px · #8e9a93' },
        plain: 'The converted amount is smaller and gray: useful context under the number that changed this balance.',
      },
    ],
  },
  {
    id: 'see-all',
    name: 'See all button',
    htmlTag: '<button>',
    variant: 'Centered text button',
    summary: 'Closes the short list of recent transactions and opens the full history.',
    aliases: ['see all link', 'view all', 'show more', 'more transactions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Text button',
        value: '11.5px · 600',
        plain: 'Just a bold word, no box: it ends the card without drawing attention away from the rows.',
      },
      {
        kind: 'appearance',
        term: 'Full-width target',
        value: 'height: 34px',
        plain: 'The whole strip along the bottom of the card is tappable, not only the word.',
      },
      {
        kind: 'behavior',
        term: 'Preview list',
        plain: 'The home screen shows only the latest few transactions; the full history is a tap away.',
      },
    ],
  },
  {
    id: 'cards-widget',
    name: 'Widget',
    htmlTag: '<section>',
    variant: 'Cards',
    summary:
      "The home screen is made of cards like this one, each about one thing. This one shows your payment cards and a tile to order another.",
    aliases: ['home card', 'module', 'tile', 'the Cards section'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rounded surface',
        value: { light: 'background: #fff · border-radius: 14px', dark: 'background: #141b17 · border-radius: 14px' },
        plain: 'A rounded panel on the gray page groups everything about one subject.',
      },
      {
        kind: 'appearance',
        term: 'Title with a chevron',
        value: '“Cards ›”',
        plain: 'A gray title with a small arrow: tapping it opens the full Cards screen.',
      },
      {
        kind: 'behavior',
        term: 'Customizable home',
        plain: 'People can add, remove and reorder these widgets, so each home screen fits what its owner checks most.',
      },
    ],
  },
  {
    id: 'card-thumbnail',
    name: 'Card thumbnail',
    variant: 'Mini card art',
    summary: 'A small picture of each card in its own color, with its name and the last four digits underneath.',
    aliases: ['card art', 'card preview', 'mini card', 'the green card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Card proportions',
        value: '48 × 30px · border-radius: 4px',
        plain: "The shape of a real card (85.6 × 54 mm), so it's recognizable even this small.",
      },
      {
        kind: 'appearance',
        term: 'Masked number',
        value: '··4821',
        plain: 'Only the last four digits: enough to tell your cards apart, never enough to use one.',
      },
      {
        kind: 'appearance',
        term: 'Color per card',
        value: '#0b6b3c · #e6dac4',
        plain: 'Each card keeps the color of its art, so you find the right one without reading.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Frosted · logo as the Home tab',
    summary: "The app's five main sections along the bottom. The first tab, Home, is the Vault mark itself.",
    aliases: ['bottom nav', 'bottom menu', 'tabs', 'navigation bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: {
          light: 'rgb(248 250 249 / 0.86) · blur(16px) saturate(160%)',
          dark: 'rgb(30 36 33 / 0.86) · blur(16px) saturate(160%)',
        },
        plain: 'A see-through, blurred bar: the cards stay faintly visible as they scroll underneath.',
      },
      {
        kind: 'appearance',
        term: 'Logo as an icon',
        value: 'Home',
        plain: "The Home tab shows the brand's mark instead of a house: home is the app itself.",
      },
      {
        kind: 'appearance',
        term: 'Active tab',
        value: { light: 'color: #191c1f', dark: 'color: #fff' },
        plain: 'The current tab is in full ink and the others are gray; no extra color needed.',
      },
    ],
  },
  homeIndicator,
];
