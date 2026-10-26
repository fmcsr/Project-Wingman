import type { UiElementSpec } from './types';

/** Elements on the Acme marketing site. `value` fields are the actual values from AcmeSite.module.css. */
export const marketing: UiElementSpec[] = [
  {
    id: 'navbar',
    name: 'Navbar',
    htmlTag: '<nav>',
    variant: 'Sticky · Glassmorphism',
    summary:
      'The strip at the top that holds the main links and the key action. This one stays pinned while you scroll and blurs whatever passes underneath, like frosted glass.',
    aliases: ['top menu', 'header bar', 'the blurry top bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(16px)',
        plain:
          'Blurs whatever sits behind the bar. Combined with a see-through background, it creates the frosted-glass (glassmorphism) look.',
      },
      {
        kind: 'appearance',
        term: 'Translucent background',
        value: { light: 'rgb(255 255 255 / 0.6)', dark: 'rgb(15 23 42 / 0.6)' },
        plain: 'A 60% opaque background, so the colors behind it softly show through.',
      },
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 0',
        plain: 'The bar sticks to the top edge as the page scrolls, so navigation is always one glance away.',
      },
      {
        kind: 'behavior',
        term: 'Breakpoint',
        value: '@container (width < 640px)',
        plain: 'The width where the layout changes. Below it, the links hide behind a ☰ hamburger menu.',
      },
    ],
  },
  {
    id: 'logo',
    name: 'Logo',
    variant: 'Mark + wordmark',
    summary: "The brand's symbol and name, usually top-left and linking back to the homepage.",
    aliases: ['brand', 'the icon and the name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Logomark',
        value: '26 × 26px',
        plain: "The standalone symbol. It works where the name doesn't fit, like favicons and app icons.",
      },
      {
        kind: 'appearance',
        term: 'Wordmark',
        value: 'font-weight: 700',
        plain: 'The brand name set in type. Mark and wordmark together form the full logo, often called a lockup.',
      },
    ],
  },
  {
    id: 'nav-link',
    name: 'Nav link',
    variant: 'Active state',
    summary: 'A link to a main section. The highlighted one tells you where you are right now.',
    aliases: ['menu item', 'the selected link'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active state',
        value: 'aria-current="page"',
        plain:
          'Marks the current page. A soft background highlights it, and screen readers announce it as the current page too.',
      },
      {
        kind: 'behavior',
        term: 'Hover state',
        value: ':hover',
        plain: 'How a link reacts when the pointer is over it — usually a color change that says “this is clickable”.',
      },
    ],
  },
  {
    id: 'button-gradient',
    name: 'Gradient button',
    htmlTag: '<a>',
    variant: 'Pill · Call to action',
    summary: 'The most important action in the bar, styled to stand out with a color blend and a soft glow.',
    aliases: ['CTA', 'the colorful button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'linear-gradient',
        value: '(135deg, #6366f1, #ec4899)',
        plain: 'Blends colors along a straight line — here from indigo to pink, at a 135° angle.',
      },
      {
        kind: 'appearance',
        term: 'box-shadow',
        value: '0 6px 16px -6px',
        plain: "A blurred shadow in the button's own color lifts it off the page, like a glow.",
      },
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'border-radius: 999px',
        plain: 'A huge corner radius turns any rectangle into a pill with fully rounded ends.',
      },
    ],
  },
  {
    id: 'hamburger-menu',
    name: 'Hamburger menu',
    variant: 'Mobile navigation',
    summary: 'The three-line icon that hides navigation links on small screens. Tapping it usually opens a menu.',
    aliases: ['three lines', 'menu icon', '☰'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Responsive navigation',
        value: 'display: none → grid',
        plain: 'On narrow screens the links disappear and this icon takes their place.',
      },
      {
        kind: 'behavior',
        term: 'Touch target',
        value: '36 × 36px',
        plain: 'The tappable area. Fingers need about 44px to tap comfortably, so this one is a little tight.',
      },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    variant: 'Announcement pill',
    summary: 'A small label above the headline that calls out something new, like a launch or an update.',
    aliases: ['pill', 'tag', 'the little label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill',
        value: 'border-radius: 999px',
        plain: 'Fully rounded ends and tight padding keep it compact and friendly.',
      },
      {
        kind: 'appearance',
        term: 'Hairline border',
        value: { light: '1px solid rgb(15 23 42 / 0.08)', dark: '1px solid rgb(255 255 255 / 0.12)' },
        plain: 'A barely visible outline separates it from the background without shouting.',
      },
    ],
  },
  {
    id: 'hero-heading',
    name: 'Hero headline',
    htmlTag: '<h2>',
    variant: 'Display type',
    summary: 'The biggest text on the page. It states the core promise in a few words.',
    aliases: ['main title', 'the big text'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Fluid type',
        value: 'clamp(28px, 5.4cqi, 46px)',
        plain: 'The size grows with its container but never drops below 28px or goes above 46px.',
      },
      {
        kind: 'appearance',
        term: 'Negative letter-spacing',
        value: '-0.03em',
        plain: 'Tightens large text slightly so it reads as one confident shape.',
      },
      {
        kind: 'behavior',
        term: 'text-wrap: balance',
        value: 'balance',
        plain: "Evens out line lengths so a two-line headline doesn't end with a lonely word.",
      },
    ],
  },
  {
    id: 'button-primary',
    name: 'Primary button',
    variant: 'Solid',
    summary: 'The main action of this section. A solid, high-contrast fill makes it the first thing you notice.',
    aliases: ['main button', 'the dark button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Solid fill',
        value: { light: 'background: #0f172a', dark: 'background: #f8fafc' },
        plain: 'A solid fill in the strongest contrast to the page (dark in light mode, light in dark mode).',
      },
      {
        kind: 'behavior',
        term: 'Visual hierarchy',
        value: 'one per section',
        plain: 'Only one button gets this style per section, so the next step is obvious.',
      },
    ],
  },
  {
    id: 'button-secondary',
    name: 'Secondary button',
    variant: 'Outlined',
    summary: 'An alternative action next to the primary one. It is available, but quieter.',
    aliases: ['outline button', 'ghost button', 'the white button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outline',
        value: { light: '1px solid rgb(15 23 42 / 0.12)', dark: '1px solid rgb(255 255 255 / 0.16)' },
        plain: 'A thin border on the page color instead of a solid fill.',
      },
      {
        kind: 'behavior',
        term: 'Lower emphasis',
        value: 'secondary',
        plain: "It sits beside the primary action without competing with it.",
      },
    ],
  },
  {
    id: 'logo-cloud',
    name: 'Logo cloud',
    variant: 'Social proof',
    summary: 'A row of customer names or logos that says “teams like yours already use this”.',
    aliases: ['trusted by', 'customer logos'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Muted logos',
        value: { light: 'color: #94a3b8', dark: 'color: #64748b' },
        plain: 'The logos are grayed out so they support the page instead of pulling attention.',
      },
      {
        kind: 'behavior',
        term: 'flex-wrap',
        value: 'wrap',
        plain: 'Items flow onto a new line when space runs out, so the row never overflows.',
      },
    ],
  },
  {
    id: 'feature-card',
    name: 'Card',
    htmlTag: '<article>',
    variant: 'Feature card',
    summary: 'A container that groups an image, a title, and a short description into one unit.',
    aliases: ['tile', 'box', 'feature block'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Border and radius',
        value: '1px border · 16px radius',
        plain: "A hairline border and rounded corners define the card's edges without heavy shadows.",
      },
      {
        kind: 'appearance',
        term: 'Thumbnail',
        value: 'linear-gradient(135deg, …)',
        plain: 'A colorful header area gives each card its own identity.',
      },
      {
        kind: 'behavior',
        term: 'Grid layout',
        value: 'repeat(3, 1fr)',
        plain: 'Cards sit in three equal columns and stack into one on narrow screens.',
      },
    ],
  },
  {
    id: 'cta-banner',
    name: 'CTA banner',
    variant: 'Gradient section',
    summary: 'A bold strip near the end of the page that repeats the main call to action.',
    aliases: ['call-to-action section', 'the colorful box at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'linear-gradient',
        value: '(120deg, #4f46e5, #db2777)',
        plain: 'A diagonal blend from indigo to pink fills the whole banner.',
      },
      {
        kind: 'behavior',
        term: 'Flex wrap',
        value: 'justify-content: space-between',
        plain: 'Text sits on the left and the button on the right; on narrow screens the button drops below.',
      },
    ],
  },
];
