import type { UiElementSpec } from '../../../catalog';

/** Elements on the Ledger payments site. `value` fields are the actual values from LedgerSite.module.css. */
export const ledgerSpecs: UiElementSpec[] = [
  {
    id: 'announcement-bar',
    name: 'Announcement bar',
    htmlTag: '<a>',
    variant: 'Launch news · Full-width link',
    summary:
      'A slim strip above the navbar that announces something new, like a product launch. The whole strip is one link.',
    aliases: ['top banner', 'promo bar', 'the strip above the menu'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted colors',
        value: { light: 'background: #0b1f3a', dark: 'background: #141f38' },
        plain: 'A dark strip with light text stands apart from the page, so it reads as news, not as part of the menu.',
      },
      {
        kind: 'appearance',
        term: 'Single line',
        value: 'height: 40px',
        plain: 'One short line keeps the message from pushing the rest of the page down.',
      },
      {
        kind: 'behavior',
        term: 'text-overflow: ellipsis',
        value: 'white-space: nowrap',
        plain: "If the message doesn't fit, it's cut off with “…” instead of wrapping onto a second line.",
      },
      {
        kind: 'appearance',
        term: 'Trailing arrow',
        value: '15 × 15px',
        plain: 'The arrow at the end hints that the strip leads somewhere.',
      },
    ],
  },
  {
    id: 'navbar',
    name: 'Navbar',
    htmlTag: '<nav>',
    variant: 'Transparent · Over the hero',
    summary:
      "The bar with the logo, the main sections and the sign-up button. It has no background of its own, so the hero's gradient runs right behind it.",
    aliases: ['top menu', 'header', 'main navigation'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Transparent background',
        value: 'background: transparent',
        plain: 'No fill and no border: the bar blends into the hero instead of sitting on top of it.',
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: 'aria-expanded="true"',
        plain: 'Marks the Products link as open, for screen readers and for styling. The other menu links say “false”.',
      },
      {
        kind: 'appearance',
        term: 'Open state',
        value: 'chevron rotate(180deg) + pill',
        plain: 'While its menu is open, Products gets a soft pill behind it and its little arrow flips up.',
      },
      {
        kind: 'behavior',
        term: 'Breakpoint',
        value: '@container (width < 1120px)',
        plain: 'Below this width the links, and their open menu, fold into a ☰ button.',
      },
    ],
  },
  {
    id: 'mega-menu',
    name: 'Mega menu',
    variant: 'Three columns · Shown open',
    summary:
      'A large dropdown panel that opens from a navbar link and lays out a whole product family in columns, so visitors can scan everything at once.',
    aliases: ['the big dropdown', 'products menu', 'flyout'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Multi-column grid',
        value: 'repeat(3, minmax(0, 1fr))',
        plain: 'Three equal columns, one per product family, each under a small heading.',
      },
      {
        kind: 'appearance',
        term: 'Elevation shadow',
        value: {
          light: '0 50px 100px -20px rgb(50 50 93 / 0.25), 0 30px 60px -30px rgb(0 0 0 / 0.3)',
          dark: '0 50px 100px -20px rgb(0 0 0 / 0.55), 0 30px 60px -30px rgb(0 0 0 / 0.6)',
        },
        plain: 'Two large, soft shadows make the panel float well above the page.',
      },
      {
        kind: 'appearance',
        term: 'Notch',
        value: '::before · rotate(45deg)',
        plain: 'A small rotated square on the top edge points at the Products link, tying the panel to its trigger.',
      },
      {
        kind: 'behavior',
        term: 'Anchored to the trigger',
        value: 'position: absolute · top: calc(100% + 12px)',
        plain: 'The panel is positioned against the Products link, so it opens right under it and floats over the hero.',
      },
    ],
  },
  {
    id: 'menu-item',
    name: 'Menu item',
    variant: 'Icon · name · description',
    summary: 'One product in the menu: an icon, its name and a one-line description of what it does.',
    aliases: ['menu link', 'product link', 'dropdown option'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon tile',
        value: '32 × 32px · 8px radius',
        plain: 'A tinted square holds the icon. Each column has its own tint, so the families are easy to tell apart.',
      },
      {
        kind: 'appearance',
        term: 'Two-column layout',
        value: 'grid-template-columns: 32px minmax(0, 1fr)',
        plain: 'The icon sits in a fixed column; the name and the description stack beside it.',
      },
      {
        kind: 'behavior',
        term: 'text-overflow: ellipsis',
        value: 'white-space: nowrap',
        plain: 'Descriptions stay on one line. One that is too long ends in “…”, like the one under Cards.',
      },
      {
        kind: 'appearance',
        term: 'Hover highlight',
        value: { light: 'background: #f4f5fb', dark: 'background: rgb(255 255 255 / 0.06)' },
        plain: 'The row under the pointer gets a soft background. Checkout is shown in that state here.',
      },
    ],
  },
  {
    id: 'mesh-gradient',
    name: 'Mesh gradient',
    variant: 'Tilted band',
    summary:
      'A soft background where several colors melt into each other, as if airbrushed. Here it fills the hero and ends in a slanted edge.',
    aliases: ['the colorful background', 'blurry gradient', 'aurora background'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Layered radial gradients',
        value: '4 × radial-gradient(…) over a base color',
        plain: 'Four soft circles of color at different spots, stacked over a pale base, blend into one smooth mesh.',
      },
      {
        kind: 'appearance',
        term: 'Theme-aware colors',
        value: {
          light: '#ffb35c · #ff5fa2 · #8a7dff · #8fe3ff',
          dark: '#c2410c · #be185d · #4338ca · #0e7490',
        },
        plain: 'Bright pastels in light mode; deeper shades of the same hues in dark mode, so light text stays readable.',
      },
      {
        kind: 'appearance',
        term: 'transform: skewY',
        value: 'skewY(-7deg)',
        plain: 'Tilts the band, so its bottom edge rises to the right: the slanted cut this style is known for.',
      },
      {
        kind: 'behavior',
        term: 'overflow: hidden',
        value: 'hidden',
        plain: 'The hero trims whatever the tilted band pushes outside it, so the edges stay clean.',
      },
    ],
  },
  {
    id: 'gradient-text',
    name: 'Gradient text',
    htmlTag: '<span>',
    variant: 'One highlighted word',
    summary: 'A word filled with a color gradient instead of a flat color, to make one word of the headline stand out.',
    aliases: ['rainbow text', 'colorful word', 'the highlighted word'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'text',
        plain: 'The gradient is painted as a background, then cut to the shape of the letters.',
      },
      {
        kind: 'appearance',
        term: 'linear-gradient',
        value: {
          light: '(90deg, #5a4bff, #e0367a 55%, #f08a24)',
          dark: '(90deg, #a49cff, #f472b6 55%, #fdba74)',
        },
        plain: 'Violet to pink to orange, left to right, with lighter shades in dark mode.',
      },
      {
        kind: 'appearance',
        term: 'color: transparent',
        value: 'transparent',
        plain: 'The letters themselves are see-through, so only the gradient behind them shows.',
      },
    ],
  },
  {
    id: 'email-capture',
    name: 'Email capture',
    htmlTag: '<form>',
    variant: 'Inline · Button inside the field',
    summary:
      'A one-field sign-up form: type your email, press the button. Placed in the hero, it turns interest into a lead right away.',
    aliases: ['signup form', 'email field with button', 'lead capture'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Input group',
        value: 'padding: 5px · border-radius: 999px',
        plain: 'The field and its button share one pill-shaped border, so they read as a single control.',
      },
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: 'Email address',
        plain: 'Gray hint text inside the field that says what goes there. It is a hint, not a label.',
      },
      {
        kind: 'appearance',
        term: 'Primary button',
        value: 'background: #5a4bff',
        plain: 'The only filled, brand-colored button in the hero, so the next step is obvious.',
      },
      {
        kind: 'behavior',
        term: 'Stacks on phones',
        value: '@container (width < 480px)',
        plain: 'On narrow screens the button drops under the field and fills the width: an easier thumb target.',
      },
    ],
  },
  {
    id: 'text-link',
    name: 'Text link',
    htmlTag: '<a>',
    variant: 'With a trailing arrow',
    summary:
      "A link styled as colored text with an arrow, for secondary actions like “Contact sales” that shouldn't compete with the main button.",
    aliases: ['arrow link', 'tertiary button', 'learn more link'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Text-only style',
        value: { light: 'color: #4b3df0', dark: 'color: #b9b2ff' },
        plain: 'Just colored, semi-bold text with no box: the lightest-weight action on the page.',
      },
      {
        kind: 'appearance',
        term: 'Trailing arrow',
        value: '16 × 16px · gap: 6px',
        plain: 'An arrow after the label says “this takes you somewhere”.',
      },
      {
        kind: 'behavior',
        term: 'Consistent pattern',
        value: 'Contact sales · Read the docs · See all 24 products',
        plain: 'The same style appears in the hero, the developer section and the menu, so visitors learn it once.',
      },
    ],
  },
  {
    id: 'logo-wall',
    name: 'Logo wall',
    variant: 'Six customers · Monochrome',
    summary: 'A row of customer logos that says “companies like yours already trust us”.',
    aliases: ['trusted by', 'customer logos', 'logo bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Monochrome logos',
        value: { light: 'color: #8792a2', dark: 'color: #5f6f8a' },
        plain: 'Every logo is the same muted gray, so the row stays calm and no brand outshines another.',
      },
      {
        kind: 'appearance',
        term: 'Equal cells',
        value: 'repeat(6, minmax(0, 1fr))',
        plain: 'Each logo gets the same slice of width, which keeps wordmarks of different lengths orderly.',
      },
      {
        kind: 'behavior',
        term: 'Responsive columns',
        value: '6 → 3 → 2 columns',
        plain: 'Below 900px wide the logos wrap into three columns, and under 480px into two.',
      },
    ],
  },
  {
    id: 'code-block',
    name: 'Code block',
    htmlTag: '<pre><code>',
    variant: 'Card with syntax highlighting',
    summary:
      'A card that shows real code, styled like a code editor, so developers can see at a glance how short the integration is.',
    aliases: ['code snippet', 'code sample', 'the dark code box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Syntax highlighting',
        value: 'keywords #c792ea · strings #c3e88d · functions #82aaff',
        plain: 'Each kind of word gets its own color, which makes code much faster to scan.',
      },
      {
        kind: 'appearance',
        term: 'Line numbers',
        value: 'counter-increment: line',
        plain: 'A CSS counter numbers every line automatically, and user-select: none keeps the numbers out of copied code.',
      },
      {
        kind: 'appearance',
        term: 'Monospace font',
        value: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
        plain: 'Every character has the same width, so indentation lines up as it does in an editor.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'overflow-x: auto',
        plain: "Long lines don't wrap; they scroll sideways, so the code keeps its shape on small screens.",
      },
    ],
  },
  {
    id: 'code-tabs',
    name: 'Tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Language switcher · Underline',
    summary: 'A row of labels that switch the same example between languages. Exactly one is selected at a time.',
    aliases: ['language tabs', 'tab bar', 'the JS / Python switch'],
    concepts: [
      {
        kind: 'behavior',
        term: 'aria-selected',
        value: 'aria-selected="true"',
        plain: 'Marks JS as the selected tab, both for the styling and for screen readers.',
      },
      {
        kind: 'appearance',
        term: 'Underline indicator',
        value: 'box-shadow: inset 0 -2px 0 #8b80ff',
        plain: "A 2px line under the selected label, drawn with an inset shadow so it doesn't shift the text.",
      },
      {
        kind: 'appearance',
        term: 'Unselected tabs',
        value: 'color: #8796ae',
        plain: 'The other languages stay gray, but are still easy to read.',
      },
      {
        kind: 'behavior',
        term: 'role="tab"',
        value: 'role="tablist" + role="tab"',
        plain: 'Tells assistive technology that this row is a set of tabs and which one is selected.',
      },
    ],
  },
  {
    id: 'copy-button',
    name: 'Copy button',
    htmlTag: '<button>',
    variant: 'Copied state',
    summary: 'An icon button that copies the code to the clipboard. Here it shows its state right after a click.',
    aliases: ['copy to clipboard', 'copy icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Success state',
        value: 'color: #4ade80',
        plain: 'A green check is the visual “done” after copying.',
      },
      {
        kind: 'appearance',
        term: 'Icon button',
        value: '30 × 30px · 8px radius',
        plain: 'A small square with a faint fill. The icon alone says what it does.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="Copy code"',
        plain: "An invisible name for screen readers, because there's no visible text.",
      },
    ],
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    htmlTag: '<span role="status">',
    variant: 'Confirmation · Placed left',
    summary: 'A small label that appears next to an element. This one confirms the copy with a single word.',
    aliases: ['hint bubble', 'popup label', 'the little bubble'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Arrow',
        value: '::after · rotate(45deg)',
        plain: 'A tiny rotated square points back at the button the tooltip belongs to.',
      },
      {
        kind: 'behavior',
        term: 'Placement',
        value: 'right: calc(100% + 10px)',
        plain: 'It sits to the left of the button, so it stays inside the card instead of poking out above it.',
      },
      {
        kind: 'behavior',
        term: 'role="status"',
        value: 'role="status"',
        plain: 'Screen readers announce “Copied” without moving the focus.',
      },
      {
        kind: 'appearance',
        term: 'High contrast',
        value: 'background: #ffffff',
        plain: 'A white bubble on the dark card is impossible to miss.',
      },
    ],
  },
  {
    id: 'feature-grid',
    name: 'Feature grid',
    variant: 'Icon · title · text',
    summary: 'Benefits laid out in equal columns, each with an icon, a short title and a sentence or two.',
    aliases: ['features section', 'benefits grid', 'the four columns'],
    concepts: [
      {
        kind: 'appearance',
        term: 'CSS grid',
        value: 'repeat(4, minmax(0, 1fr))',
        plain: 'Four equal columns at desktop width.',
      },
      {
        kind: 'behavior',
        term: 'Responsive columns',
        value: '4 → 2 → 1 columns',
        plain: 'Two columns below 900px wide, and a single column below 560px.',
      },
      {
        kind: 'appearance',
        term: 'Accent bar',
        value: 'border-left: 2px solid #5a4bff',
        plain: 'Each title hangs a thin brand-colored line into the margin, a small detail that ties the columns together.',
      },
      {
        kind: 'appearance',
        term: 'Icon tile',
        value: '36 × 36px · 10px radius',
        plain: 'A small tinted square gives each benefit a visual anchor.',
      },
    ],
  },
  {
    id: 'stats-band',
    name: 'Stats band',
    variant: 'Four big numbers',
    summary: 'A strip of large figures that turns claims into proof at a glance: currencies, uptime, volume and reach.',
    aliases: ['numbers section', 'metrics strip', 'the big numbers'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Big numbers',
        value: 'clamp(28px, 3.4cqi, 40px) · 700',
        plain: 'The figure is the star; the label under it stays small and soft.',
      },
      {
        kind: 'appearance',
        term: 'Tabular numbers',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'All digits share one width, so the figures look even.',
      },
      {
        kind: 'appearance',
        term: 'Hairline dividers',
        value: 'border-left: 1px solid rgb(255 255 255 / 0.14)',
        plain: 'Thin lines separate the stats without boxing them in.',
      },
      {
        kind: 'behavior',
        term: '2 × 2 on narrow screens',
        value: '@container (width < 760px)',
        plain: 'Below 760px wide the four stats rearrange into two rows of two.',
      },
    ],
  },
  {
    id: 'footer',
    name: 'Footer',
    htmlTag: '<footer>',
    variant: 'Link columns',
    summary:
      'The end of the page: the logo, a region and language picker, columns of links grouped by topic, and a legal line.',
    aliases: ['fat footer', 'sitemap footer', 'bottom links'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Link columns',
        value: 'grid-template-columns: 1.5fr repeat(4, minmax(0, 1fr))',
        plain: 'A wider brand column, then four equal columns of links under small bold headings.',
      },
      {
        kind: 'appearance',
        term: 'Locale picker',
        value: 'United States (English)',
        plain: 'A globe with the current region and language, the usual way to reach other versions of a site.',
      },
      {
        kind: 'appearance',
        term: 'Bottom bar',
        value: { light: 'border-top: 1px solid #e3e8ef', dark: 'border-top: 1px solid #1f2a40' },
        plain: 'A hairline sets the copyright and the legal links apart at the very end.',
      },
      {
        kind: 'behavior',
        term: 'Responsive columns',
        value: '5 → 4 → 2 columns',
        plain: 'Below 900px the brand moves above the four link columns; below 640px the links fold into two columns.',
      },
    ],
  },
];
