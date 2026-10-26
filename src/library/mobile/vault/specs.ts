import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Vault banking app, in the order they appear. `value` fields are the actual values from VaultApp. */
export const vaultSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'account-switcher',
    name: 'Account switcher',
    htmlTag: '<button>',
    variant: 'Pill with a chevron',
    summary: "Shows which account you're looking at. Tap it to pick another one, like a joint or a savings account.",
    aliases: ['account picker', 'the Personal dropdown', 'wallet switcher'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Capsule',
        value: 'border-radius: 999px',
        plain: 'Fully rounded ends make it read as something to tap, not as a plain title.',
      },
      {
        kind: 'appearance',
        term: 'Chevron',
        value: 'chevron-down',
        plain: 'The small down arrow promises more choices behind the label.',
      },
      {
        kind: 'behavior',
        term: 'Account context',
        plain:
          'Everything below belongs to the chosen account, so picking another one swaps the balance, card and payments together.',
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    variant: 'Initials',
    summary: 'Your initials in a circle: the way into your profile and settings.',
    aliases: ['profile picture', 'profile icon', 'the circle with my initials'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Initials fallback',
        value: 'JL',
        plain: 'With no photo uploaded, two initials on a soft color still make the app feel like yours.',
      },
      {
        kind: 'appearance',
        term: 'Circle',
        value: '32 × 32px · border-radius: 50%',
        plain: 'A round shape is the shared signal for "this is a person" across apps.',
      },
    ],
  },
  {
    id: 'balance',
    name: 'Balance',
    variant: 'Hero number with smaller cents',
    summary:
      "The money in the account, set as the biggest thing on screen because it's what people open the app to check.",
    aliases: ['the big number', 'account total', 'how much money I have'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Display size',
        value: '34px · 700',
        plain: 'Far bigger and bolder than anything around it, so it reads at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Smaller cents',
        value: '34px dollars · 20px cents',
        plain: 'The cents step down a size, which keeps the part that matters most in front.',
      },
      {
        kind: 'appearance',
        term: 'Tight letter-spacing',
        value: 'letter-spacing: -0.03em',
        plain: 'Big digits look loose at normal spacing; pulling them slightly together keeps the number compact.',
      },
    ],
  },
  {
    id: 'visibility-toggle',
    name: 'Visibility toggle',
    htmlTag: '<button aria-pressed="false">',
    variant: 'Eye icon · balance showing',
    summary: 'Hides the balance behind dots and brings it back. Handy on a train or when sharing your screen.',
    aliases: ['eye button', 'show/hide balance', 'privacy mode'],
    concepts: [
      {
        kind: 'appearance',
        term: 'State icon',
        value: 'eye',
        plain: 'An open eye means the number is showing; once hidden, the icon swaps to a crossed-out eye.',
      },
      {
        kind: 'appearance',
        term: 'Tonal circle',
        value: { light: 'background: #e3e3ea', dark: 'background: #1c1c1e' },
        plain: 'A soft gray circle makes the icon tappable without pulling attention from the number.',
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        plain: "Tells screen readers whether the balance is hidden, since they can't see the eye change.",
      },
    ],
  },
  {
    id: 'quick-action',
    name: 'Quick action button',
    htmlTag: '<button>',
    variant: 'Round icon with a label',
    summary: 'Shortcuts right under the balance for the money moves people make most: adding, sending and requesting.',
    aliases: ['shortcut buttons', 'the round buttons', 'action row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon circle',
        value: '44 × 44px · border-radius: 50%',
        plain: 'Big round targets are easy to hit with a thumb.',
      },
      {
        kind: 'appearance',
        term: 'Label under the icon',
        value: 'flex-direction: column',
        plain: 'A word under every icon removes the guesswork; two arrows on their own are easy to mix up.',
      },
      {
        kind: 'appearance',
        term: 'Primary emphasis',
        value: 'background: #5b5bf6',
        plain: 'Only the most common action, Add money, gets the brand color, so the row has one clear starting point.',
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
    id: 'payment-card',
    name: 'Payment card',
    variant: 'Card art',
    summary:
      "A picture of your card, so you can tell at a glance which one you're using. Tapping it opens the card's details and settings.",
    aliases: ['card image', 'the card graphic', 'card art'],
    concepts: [
      {
        kind: 'appearance',
        term: 'aspect-ratio',
        value: 'aspect-ratio: 85.6 / 53.98',
        plain: 'The exact proportions of a real bank card (85.6 × 53.98 mm), so it instantly reads as one.',
      },
      {
        kind: 'appearance',
        term: 'linear-gradient',
        value: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 55%, #db2777 100%)',
        plain: 'A diagonal blend from indigo through violet to pink gives the card its look.',
      },
      {
        kind: 'appearance',
        term: 'Sheen',
        value: 'radial-gradient(120% 90% at 100% 0%, rgb(255 255 255 / 0.28), transparent 55%)',
        plain: 'A soft white glow in the top corner makes the card look glossy, like plastic catching the light.',
      },
      {
        kind: 'appearance',
        term: 'Fixed brand colors',
        value: 'color: #fff',
        plain:
          'Unlike the screen around it, the card keeps the same colors in light and dark mode, because it pictures a real object.',
      },
    ],
  },
  {
    id: 'card-tag',
    name: 'Tag',
    variant: 'Status label',
    summary:
      'A small label on the card that says what kind it is: a virtual card, which lives only in the app, for paying online.',
    aliases: ['badge', 'label', 'the little pill on the card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Translucent pill',
        value: 'background: rgb(255 255 255 / 0.22)',
        plain: "See-through white lets the card's colors show through, so the tag looks like part of the design.",
      },
      {
        kind: 'appearance',
        term: 'Small, bold text',
        value: '8.5px · 600',
        plain: 'Tiny, but heavier than regular text, so the one word stays readable.',
      },
    ],
  },
  {
    id: 'masked-number',
    name: 'Masked card number',
    variant: 'Last four digits',
    summary:
      'Only the last four digits of the card number, with dots for the rest: enough to tell cards apart without exposing the number.',
    aliases: ['last four', 'hidden card number', 'the dots and digits'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Masking',
        value: '•••• 4821',
        plain: 'Dots stand in for the hidden digits, so the screen is safe to show to anyone.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Every digit takes the same width, the way numbers line up on a printed card.',
      },
      {
        kind: 'appearance',
        term: 'Wide letter-spacing',
        value: 'letter-spacing: 0.08em',
        plain: 'Extra space between the characters echoes the spaced-out digits on a physical card.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        plain:
          'Screen readers would read the dots as "bullet, bullet, bullet, bullet", so give it a label like "Card ending in 4821".',
      },
    ],
  },
  {
    id: 'spending-chart',
    name: 'Bar chart',
    variant: 'Weekly spending · today highlighted',
    summary: "One bar per day shows where this week's money went, with today's bar picked out in the brand color.",
    aliases: ['spending graph', 'weekly chart', 'the little bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlighted bar',
        value: 'background: #5b5bf6',
        plain: "Today's bar takes the brand color while the other days stay muted, so the eye goes straight to it.",
      },
      {
        kind: 'appearance',
        term: 'Shared baseline',
        value: 'align-items: end',
        plain: 'Every bar grows up from the same bottom line, which makes the heights easy to compare.',
      },
      {
        kind: 'appearance',
        term: 'Relative height',
        value: 'height: 49%',
        plain: "Each bar is a share of the busiest day: today's $31.20 is 49% of Wednesday's $64.10.",
      },
      {
        kind: 'behavior',
        term: 'Text alternative',
        plain:
          'A chart is just shapes to a screen reader, so add a one-line summary like "Spent $156.60 this week, most on Wednesday".',
      },
    ],
  },
  {
    id: 'section-header',
    name: 'Section header',
    variant: 'With a "See all" link',
    summary: 'A title that opens a group of content, with a link at the other end to the full list.',
    aliases: ['section title', 'list header', 'the Recent heading'],
    concepts: [
      {
        kind: 'appearance',
        term: 'space-between',
        value: 'justify-content: space-between',
        plain: 'The title hugs the left edge and the link the right, with the free space between them.',
      },
      {
        kind: 'appearance',
        term: 'Link color',
        value: { light: 'color: #4a4ae0', dark: 'color: #9d9dff' },
        plain: 'The brand color marks "See all" as tappable while the title stays plain.',
      },
      {
        kind: 'behavior',
        term: 'Progressive disclosure',
        plain: 'Home shows only the latest few payments; "See all" opens the full history when you want it.',
      },
    ],
  },
  {
    id: 'transaction-row',
    name: 'Transaction row',
    htmlTag: '<li>',
    variant: 'Avatar · two lines · amount',
    summary: 'One payment in the list: who it was with, what kind and when, and how much.',
    aliases: ['list item', 'activity row', 'a payment in the feed'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three slots',
        value: 'grid-template-columns: 34px 1fr auto',
        plain: 'A fixed slot for the avatar, a stretchy middle for the text and an end slot as wide as the amount.',
      },
      {
        kind: 'appearance',
        term: 'Secondary line',
        value: 'font-size: 11.5px',
        plain: 'Category and time sit underneath in smaller gray text, joined by a middle dot.',
      },
      {
        kind: 'appearance',
        term: 'Truncation',
        value: 'text-overflow: ellipsis',
        plain: 'A long name like "Fernwood Market & Deli" ends in "…" instead of pushing the amount off the row.',
      },
    ],
  },
  {
    id: 'merchant-avatar',
    name: 'Merchant avatar',
    variant: 'Initials or category icon',
    summary: "The round image that starts each row: a person's initials, or an icon for the kind of shop.",
    aliases: ['merchant logo', 'transaction icon', 'the circle on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Fallback',
        value: 'MC',
        plain:
          'With no photo or logo to show, people get their initials and shops an icon for their category: a cart, a cup, a train.',
      },
      {
        kind: 'appearance',
        term: 'Tinted background',
        value: { light: 'background: #dcfce7', dark: 'background: rgb(34 197 94 / 0.18)' },
        plain:
          'A pale tint of the category color (green for groceries) behind a stronger icon keeps the list colorful but calm.',
      },
      {
        kind: 'appearance',
        term: 'Circle',
        value: '34 × 34px · border-radius: 50%',
        plain: 'The same size and shape in every row, so the names line up neatly.',
      },
    ],
  },
  {
    id: 'amount',
    name: 'Amount',
    variant: 'Money in and money out',
    summary: 'How much moved, lined up at the end of each row. Money coming in is green and starts with a plus.',
    aliases: ['transaction amount', 'price', 'the green number'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Incoming color',
        value: { light: 'color: #15803d', dark: 'color: #4ade80' },
        plain: 'Green marks money arriving; payments going out keep the normal text color.',
      },
      {
        kind: 'appearance',
        term: 'Plus and minus signs',
        value: '+$45.00 · −$26.40',
        plain: "The sign says the direction too, so the meaning doesn't depend on seeing green.",
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'All digits share one width, so amounts stacked in a column line up.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Frosted · filled active icon',
    summary: "The app's five main sections along the bottom edge, with Home selected.",
    aliases: ['bottom nav', 'bottom menu', 'tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled active icon',
        value: 'fill: currentColor',
        plain: "The selected tab's icon fills in with the brand color; the others stay gray outlines.",
      },
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(20px) saturate(180%)',
        plain: "The bar is see-through and blurs the list passing underneath, a hint that there's more below.",
      },
      {
        kind: 'behavior',
        term: 'Pinned to the bottom',
        value: 'position: absolute; bottom: 0',
        plain: 'It stays in place while the screen scrolls, always within thumb reach.',
      },
    ],
  },
  homeIndicator,
];
