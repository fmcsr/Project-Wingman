import type { UiElementSpec } from './types';

/*
 * Elements of the AI slop sites on the landing page (src/demos/slop/AcmeSlop.tsx and OrbitSlop.tsx). They use the
 * same element names as the Wingman versions where the element is the same, so people can compare the two; their
 * concepts say what makes each one read as AI slop. `value` fields are the actual values from the slop CSS.
 */

/** Elements of the AI slop Acme marketing site, in on-screen order. Values from AcmeSlop.module.css. */
export const acmeSlopSpecs: UiElementSpec[] = [
  {
    id: 'navbar',
    name: 'Navbar',
    htmlTag: '<nav>',
    variant: 'AI slop · Glass over gradient blobs',
    summary:
      'The strip at the top with the main links and the key action. It uses the same frosted glass as the Wingman bar, but bright gradient blobs pass underneath, so color smears through it.',
    aliases: ['top menu', 'header bar', 'the blurry top bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(16px)',
        plain:
          'Blurs whatever passes behind the bar. Over the purple, orange and teal shapes of the hero it turns into a colored smear; the Wingman bar blurs a calm, neutral page.',
      },
      {
        kind: 'appearance',
        term: 'Drop shadow',
        value: { light: '0 12px 32px -20px rgb(15 23 42 / 0.4)', dark: '0 12px 32px -20px rgb(0 0 0 / 0.8)' },
        plain:
          'A soft shadow under the bar, a common default of AI tools for making glass look raised. The Wingman bar is set apart by a faint hairline alone.',
      },
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 0',
        plain: 'The bar sticks to the top as the page scrolls, the same as in the Wingman version.',
      },
    ],
  },
  {
    id: 'logo',
    name: 'Logo',
    variant: 'AI slop · Sparkle emoji in a gradient tile',
    summary:
      "The brand's symbol and name, top left. Here the symbol is a ✨ emoji on a gradient square, a stand-in that could belong to any AI product, so it reads as generic.",
    aliases: ['brand', 'the icon and the name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji as logomark',
        value: '✨',
        plain:
          'The sparkle has become shorthand for “AI”, and every device draws emoji its own way. The Wingman logo is a drawn mark that looks the same everywhere.',
      },
      {
        kind: 'appearance',
        term: 'Gradient tile',
        value: 'linear-gradient(135deg, #6366f1, #ec4899)',
        plain: 'Indigo fading into pink, a common default of AI tools, with a purple glow under the 28px square.',
      },
    ],
  },
  {
    id: 'nav-link',
    name: 'Nav link',
    variant: 'AI slop · Template sections',
    summary:
      'A link to a main section; the highlighted one marks where you are. These four are the default sections of a landing-page template, so they say little about the product.',
    aliases: ['menu item', 'the selected link'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Template labels',
        value: 'Features · Pricing · Testimonials · Contact',
        plain:
          'The sections a generated landing page usually starts with. They name parts of the page, not what Acme offers; the Wingman links are Product, Customers, Pricing and Changelog.',
      },
      {
        kind: 'appearance',
        term: 'Active state',
        value: 'aria-current="page"',
        plain: 'Marks the current page with a soft pill, the same technique as the Wingman version.',
      },
    ],
  },
  {
    id: 'button-cta',
    name: 'CTA button',
    htmlTag: '<a>',
    variant: 'AI slop · Gradient pill with emoji',
    summary:
      "The most important action, repeated in the navbar. A gradient and a rocket emoji make it loud, but with gradients all over the page it doesn't stand out as the one thing to click.",
    aliases: ['call to action', 'Get Started button', 'the gradient button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: 'linear-gradient(135deg, #6366f1, #ec4899)',
        plain:
          'Indigo into pink, a common default of AI tools. The Wingman version is the only button filled with the brand color, so the eye lands there first.',
      },
      {
        kind: 'appearance',
        term: 'Emoji in the label',
        value: '🚀',
        plain:
          'The rocket stands for “launch” on countless generated pages. It adds noise to a two-word label, and every device draws it differently.',
      },
      {
        kind: 'appearance',
        term: 'Colored shadow',
        value: { light: '0 6px 16px -6px rgb(99 102 241 / 0.6)', dark: '0 6px 16px -6px rgb(99 102 241 / 0.45)' },
        plain: 'An indigo glow under the button, another common default of AI tools.',
      },
    ],
  },
  {
    id: 'hamburger-menu',
    name: 'Hamburger menu',
    variant: 'AI slop · Mobile navigation',
    summary:
      'The three-line icon that replaces the links on small screens. Little is off here: a tinted rounded square much like the Wingman one, next to a gradient button that takes most of the attention.',
    aliases: ['three lines', 'menu icon', '☰'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Responsive navigation',
        value: 'display: none → grid',
        plain:
          'Below 640px the links and Sign in disappear and this icon takes their place, as in the Wingman version.',
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
    id: 'hero',
    name: 'Hero section',
    htmlTag: '<section>',
    variant: 'AI slop · Gradient blobs on a grid',
    summary:
      'The first screen of the page: headline, buttons and a picture of the product. Behind it sit gradient blobs on a grid, a common default of AI tools that reads as generic.',
    aliases: ['hero', 'above the fold', 'the top section', 'the shapes in the background'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient blobs',
        value: 'linear-gradient(135deg, #6366f1, #a855f7)',
        plain:
          'Two circles and a tilted square in purple, pink-orange and teal, cut off at the edges. They decorate without saying anything and pull the eye away from the headline.',
      },
      {
        kind: 'appearance',
        term: 'Grid background',
        value: 'background-size: 28px 28px',
        plain:
          'Two repeating gradients draw faint graph-paper lines behind everything. The Wingman hero sits on the plain page, so the product screenshot carries the color.',
      },
      {
        kind: 'appearance',
        term: 'Buzzword copy',
        value: '“unlock your team’s full potential”',
        plain:
          'Phrases like “transform your workflow” and “all-in-one” fit any product. The Wingman text says what Acme does: feedback, roadmaps and analytics in one workspace.',
      },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    variant: 'AI slop · Glowing “AI-powered” pill',
    summary:
      'A small label above the headline. Badges usually announce something new; this one only says the product uses AI, with a sparkle and a glow, which reads as generic.',
    aliases: ['pill', 'tag', 'the little label', 'AI badge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: { light: '0 0 24px rgb(129 140 248 / 0.35)', dark: '0 0 24px rgb(129 140 248 / 0.3)' },
        plain: 'A blurred indigo halo with no offset, so the pill seems to light up. A common default of AI tools.',
      },
      {
        kind: 'appearance',
        term: 'Status dot',
        value: '#22c55e · 3px ring',
        plain: 'A green “live” dot borrowed from status indicators. Nothing here is live, so it only decorates.',
      },
      {
        kind: 'appearance',
        term: 'Vague label',
        value: '✨ AI-Powered Product Planning',
        plain:
          "Says what kind of product this is, not what's new. The Wingman badge announces a concrete update: “New · Roadmaps 2.0 is here”.",
      },
    ],
  },
  {
    id: 'hero-heading',
    name: 'Hero headline',
    htmlTag: '<h2>',
    variant: 'AI slop · Gradient text',
    summary:
      'The biggest text on the page. It promises a speed-up nobody measured, in Title Case, with the key words painted in a gradient, a common default of AI tools.',
    aliases: ['main title', 'the big text', 'the colorful words'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient(90deg, #6366f1, #a855f7 45%, #ec4899)',
        plain:
          'Paints a gradient behind the text and cuts it to the letter shapes, so “10x Faster” turns indigo, purple and pink. The Wingman headline is set in plain ink.',
      },
      {
        kind: 'appearance',
        term: 'Unproven claim',
        value: '“10x Faster”',
        plain:
          'A round multiplier with nothing behind it. The Wingman headline says what the product does: “From customer feedback to shipped features”.',
      },
      {
        kind: 'appearance',
        term: 'Title Case',
        value: 'Plan Smarter, Ship 10x Faster',
        plain:
          'Every word capitalized, a habit of generated copy that also shows in the buttons and card titles. Sentence case, as in the Wingman version, reads calmer.',
      },
    ],
  },
  {
    id: 'button-primary',
    name: 'Primary button',
    variant: 'AI slop · Gradient with glow',
    summary:
      'The main action of the section. A three-color gradient, a purple glow and a rocket emoji make it loud, and it looks much like the navbar button.',
    aliases: ['main button', 'Get Started button', 'the gradient button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three-stop gradient',
        value: 'linear-gradient(135deg, #6366f1, #a855f7 50%, #ec4899)',
        plain:
          'Indigo, purple and pink in one fill, a common default of AI tools. The Wingman button is one solid color in the strongest contrast to the page.',
      },
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: '0 16px 32px -10px rgb(168 85 247 / 0.75)',
        plain:
          'A large purple glow under the button. Together with the gradient, it competes with the headline for attention.',
      },
      {
        kind: 'appearance',
        term: 'border-radius',
        value: '16px',
        plain:
          'Very round corners, neither square nor pill. Generous radii on everything are typical of generated designs.',
      },
    ],
  },
  {
    id: 'button-secondary',
    name: 'Secondary button',
    variant: 'AI slop · Glass',
    summary:
      'An alternative action next to the primary one. Frosted glass and a drop shadow make this quiet button look raised, like a card.',
    aliases: ['outline button', 'ghost button', 'Watch Demo button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(10px)',
        plain:
          'Glass on a button over a plain grid, where the blur only softens a few faint lines. The Wingman version is a thin outline on the page color.',
      },
      {
        kind: 'appearance',
        term: 'Drop shadow',
        value: { light: '0 10px 24px -12px rgb(15 23 42 / 0.3)', dark: '0 10px 24px -12px rgb(0 0 0 / 0.6)' },
        plain: 'Lifts the button off the page, so next to the glowing primary both buttons ask for attention.',
      },
      {
        kind: 'appearance',
        term: 'Text symbol',
        value: '▶',
        plain:
          'A play triangle typed as a character instead of drawn as an icon, so its size and weight depend on the font.',
      },
    ],
  },
  {
    id: 'trust-signals',
    name: 'Trust signals',
    htmlTag: '<ul>',
    variant: 'AI slop · Gradient checkmarks',
    summary:
      'Short reassurances under the buttons, meant to make signing up feel safe. These three stock lines appear on most generated landing pages, whatever the actual offer is.',
    aliases: ['reassurance line', 'no credit card required', 'the checkmarks under the buttons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Stock phrases',
        value: '“14-day free trial”, “Cancel anytime”',
        plain:
          'Familiar lines that fill the space under nearly every generated hero. The Wingman page has one quiet line with its actual terms: free for teams up to 10.',
      },
      {
        kind: 'appearance',
        term: 'Gradient checkmarks',
        value: 'linear-gradient(135deg, #22c55e, #10b981)',
        plain:
          'A white ✓ in a green gradient circle before each line: three more colored dots in a hero already full of color.',
      },
    ],
  },
  {
    id: 'product-shot',
    name: 'Product screenshot',
    variant: 'AI slop · Placeholder mockup',
    summary:
      'The picture under the headline, where the product should be. This one is a glowing glass window of gray bars, emoji tiles and a chart without numbers, so it shows no actual product.',
    aliases: ['hero image', 'app preview', 'the screenshot', 'the mockup'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Skeleton bars',
        value: 'height: 10px · border-radius: 999px',
        plain:
          "Rounded gray bars stand in for text, like a page that hasn't loaded. The Wingman version shows a real roadmap with named items and months.",
      },
      {
        kind: 'appearance',
        term: 'Glow behind',
        value: 'filter: blur(56px) · opacity: 0.55',
        plain:
          'An indigo-to-pink gradient blurred behind the window, so it seems to glow. A common default of AI tools.',
      },
      {
        kind: 'appearance',
        term: 'Glass window',
        value: 'backdrop-filter: blur(16px) · 28px radius',
        plain:
          'A see-through, very rounded frame. The Wingman window has a hairline border and a 12px radius, so it reads as an app.',
      },
    ],
  },
  {
    id: 'logo-cloud',
    name: 'Logo cloud',
    variant: 'AI slop · Names in bold type',
    summary:
      'The row of customers meant to say “teams like yours use this”. Here they are plain words in bold type under a round “10,000+”, so it proves little.',
    aliases: ['trusted by', 'customer logos', 'social proof'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Names as text',
        value: 'font-size: 17px · font-weight: 700',
        plain:
          'Bold words instead of logos, all in the same type. The Wingman row gives each customer a small mark of its own, so they read as logos.',
      },
      {
        kind: 'appearance',
        term: 'Round number',
        value: '“Trusted by 10,000+ teams worldwide 🌍”',
        plain:
          'A big round figure with a globe emoji; the same 10,000+ returns in the banner. The Wingman label says 1,200+ product teams, a number that sounds counted.',
      },
    ],
  },
  {
    id: 'stat',
    name: 'Stat',
    variant: 'AI slop · Big gradient number',
    summary:
      'A big number with a short label, meant as proof. These four are round, unsourced figures in gradient text, the kind a vague prompt fills in, so they read as made up.',
    aliases: ['big number', 'metric', 'key figure', 'stats section'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient(135deg, #6366f1, #ec4899)',
        plain:
          'Each number is filled with the indigo-to-pink gradient at 44px and weight 800, so the whole row shouts.',
      },
      {
        kind: 'appearance',
        term: 'Made-up figures',
        value: '10K+ · 10x · 99.9% · 4.9★',
        plain:
          'Round numbers with no source, date or comparison. The Wingman page has no stats row; its product screenshot makes the case instead.',
      },
    ],
  },
  {
    id: 'section-heading',
    name: 'Section heading',
    htmlTag: '<h3>',
    variant: 'AI slop · Gradient keyword',
    summary:
      'The title that introduces the features. “Everything you need to succeed” fits any product, and one word is painted in the gradient again.',
    aliases: ['section title', 'subheading', 'the features title'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient(90deg, #6366f1, #a855f7 45%, #ec4899)',
        plain:
          'The same gradient trick as the headline, this time on “succeed”. Used twice, it stops being an accent and becomes decoration.',
      },
      {
        kind: 'appearance',
        term: 'Generic promise',
        value: '“Everything you need to succeed”',
        plain:
          'Could head the features of any product. The Wingman heading names what ties them together: “The whole product loop, connected”.',
      },
    ],
  },
  {
    id: 'feature-card',
    name: 'Card',
    htmlTag: '<article>',
    variant: 'AI slop · Gradient thumbnail with emoji',
    summary:
      'A container that groups a picture, a title and a short description. Here the picture is a gradient with an emoji and gray bars, and the text could describe any tool.',
    aliases: ['tile', 'box', 'feature block'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji icon',
        value: '🗺️ 💬 📊',
        plain:
          "One emoji per feature in a frosted square. The Wingman cards show a small slice of each feature's real screen instead.",
      },
      {
        kind: 'appearance',
        term: 'Gradient thumbnail',
        value: 'linear-gradient(135deg, #6366f1, #a855f7)',
        plain:
          'Each card has its own two-color gradient (purple, pink-orange, teal) with skeleton bars on top: color without content.',
      },
      {
        kind: 'appearance',
        term: 'border-radius',
        value: '24px',
        plain:
          'Very round corners and a large, soft shadow make each card float. The Wingman cards use a hairline border and a 14px radius.',
      },
    ],
  },
  {
    id: 'cta-banner',
    name: 'CTA banner',
    variant: 'AI slop · Gradient block',
    summary:
      'The bold block near the end that repeats the main call to action. A three-color gradient, a big glow and stock copy with a rocket make it look like most generated pages.',
    aliases: ['call-to-action section', 'the purple box at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three-stop gradient',
        value: 'linear-gradient(120deg, #4f46e5, #a21caf 55%, #db2777)',
        plain:
          "Indigo through magenta to pink, a common default of AI tools. The Wingman banner flips the page's own colors for one block instead.",
      },
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: '0 30px 60px -24px rgb(168 85 247 / 0.8)',
        plain: 'A large purple glow under the block, like the ones under the buttons above.',
      },
      {
        kind: 'appearance',
        term: 'Stock copy',
        value: '“Ready to transform your workflow? 🚀”',
        plain:
          'A question that closes countless generated pages. The Wingman banner says what to do and on what terms: “Start planning with your team”, free for teams up to 10.',
      },
    ],
  },
];

/** Elements of the AI slop Orbit analytics dashboard, in on-screen order. Values from OrbitSlop.module.css. */
export const orbitSlopSpecs: UiElementSpec[] = [
  {
    id: 'sidebar',
    name: 'Sidebar',
    htmlTag: '<aside>',
    variant: 'AI slop · Floating gradient panel',
    summary:
      "A vertical panel with the app's main sections. This one floats as a purple-to-magenta gradient that looks the same in light and dark mode, and it disappears entirely on narrower screens.",
    aliases: ['side menu', 'left nav', 'side nav', 'the purple panel'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient background',
        value: 'linear-gradient(180deg, #312e81, #5b21b6 55%, #9d174d)',
        plain:
          'Deep indigo through violet to magenta. The strongest color on the screen goes to the navigation, not the data; the Wingman sidebar sits on the plain app background.',
      },
      {
        kind: 'appearance',
        term: 'Floating panel',
        value: 'border-radius: 28px',
        plain:
          'Set 14px in from the edges, rounded and lifted with a violet shadow, like a big card. A common default of AI tools.',
      },
      {
        kind: 'behavior',
        term: 'Hidden, not collapsed',
        value: '@container (width < 1100px)',
        plain:
          'Below 1100px the sidebar vanishes and a ☰ button takes its place. The Wingman version shrinks to a rail of icons, even on phones, so sections stay one click away.',
      },
    ],
  },
  {
    id: 'logo',
    name: 'Logo',
    variant: 'AI slop · Rocket emoji with an “AI” tag',
    summary:
      "The app's symbol and name, top left. A rocket emoji on a gradient tile with an “AI” tag could belong to any startup; where the Wingman version shows whose workspace you're in, this shows only the brand.",
    aliases: ['brand', 'the icon and the name', 'the AI tag'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji as logomark',
        value: '🚀',
        plain:
          'The rocket is a stock symbol for “startup”, and every device draws emoji its own way. A drawn mark looks the same everywhere.',
      },
      {
        kind: 'appearance',
        term: 'Gradient tile',
        value: 'linear-gradient(135deg, #a855f7, #ec4899)',
        plain:
          'Purple into pink with a pink glow underneath, a common default of AI tools. On narrower screens the name turns into gradient text too.',
      },
      {
        kind: 'appearance',
        term: '“AI” tag',
        value: 'linear-gradient(90deg, #fde68a, #fbcfe8)',
        plain: 'A pastel pill that labels the product as AI: one more gradient on top of the tile and the sidebar.',
      },
    ],
  },
  {
    id: 'nav-link',
    name: 'Nav link',
    variant: 'AI slop · Emoji icons, gradient active pill',
    summary:
      'A link to a main section of the app; the highlighted one is where you are. Emoji stand in for icons and the current link glows in a gradient, so the menu competes with the data.',
    aliases: ['menu item', 'sidebar link', 'the selected link'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji icons',
        value: '🏠 📊 👥 💰 📦 ⚙️',
        plain:
          'Each emoji brings its own colors and style, and every device draws them differently. The Wingman links use one set of line icons in the text color.',
      },
      {
        kind: 'appearance',
        term: 'Active state',
        value: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
        plain:
          'The current link is a violet-to-pink pill with a pink glow under it. It marks the page clearly, but pulls the eye away from the data.',
      },
    ],
  },
  {
    id: 'upgrade-card',
    name: 'Upsell card',
    variant: 'AI slop · Glass promo in the sidebar',
    summary:
      'A box in the navigation that asks you to upgrade. Glass, a glowing sparkle and an excited pitch take up space the menu could use, a common default of AI tools.',
    aliases: ['upgrade banner', 'Upgrade to Pro box', 'promo card', 'upgrade nudge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Glass panel',
        value: 'backdrop-filter: blur(12px)',
        plain:
          'A translucent white panel with a light rim over the gradient sidebar: one more layer of glass inside a colored panel.',
      },
      {
        kind: 'appearance',
        term: 'Glowing emoji',
        value: '0 0 26px rgb(244 114 182 / 0.75)',
        plain: 'A ✨ in a pink-to-orange circle with a pink halo, the brightest spot in the sidebar.',
      },
      {
        kind: 'appearance',
        term: 'Buzzword copy',
        value: '“Unlock AI-powered insights and unlimited reports!”',
        plain:
          "Promises AI and more reports without saying what you get. The Wingman sidebar has no upsell; it lists the team's saved dashboards instead.",
      },
    ],
  },
  {
    id: 'hamburger-menu',
    name: 'Hamburger menu',
    variant: 'AI slop · Text glyph in glass',
    summary:
      'The button that stands in for the sidebar on narrower screens. It is the ☰ character in a glass square, and every section now hides behind it.',
    aliases: ['three lines', 'menu icon', '☰'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Text glyph',
        value: '☰ · font-size: 18px',
        plain: 'A typed character instead of a drawn icon, so its weight and spacing depend on the font.',
      },
      {
        kind: 'behavior',
        term: 'Responsive navigation',
        value: '@container (width < 1100px)',
        plain:
          'Below 1100px the sidebar disappears and this button takes its place. The Wingman dashboard keeps a rail of icons instead, even on phones.',
      },
    ],
  },
  {
    id: 'search-field',
    name: 'Search field',
    htmlTag: '<input type="search">',
    variant: 'AI slop · Glass pill with emoji',
    summary:
      "A text box for finding things. “Search anything...” doesn't say what you can find, and the magnifier is an emoji in a glass pill.",
    aliases: ['search bar', 'search box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Vague placeholder',
        value: 'Search anything...',
        plain:
          'Hint text that could be in any app. The Wingman field names what it finds, customers and events, and shows its ⌘K shortcut.',
      },
      {
        kind: 'appearance',
        term: 'Emoji icon',
        value: '🔍',
        plain:
          'A color emoji instead of a line icon; it looks heavier than the text beside it and different on every device.',
      },
      {
        kind: 'appearance',
        term: 'Glass',
        value: 'backdrop-filter: blur(14px)',
        plain: 'Translucent, with a light rim and a soft shadow: the same glass as the cards and buttons around it.',
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    variant: 'AI slop · Gradient initials',
    summary:
      'A small circle that stands for a person. This one belongs to “John Doe”, the default placeholder name, on the same indigo-to-pink gradient as everything else.',
    aliases: ['profile picture', 'user icon', 'the round photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: 'linear-gradient(135deg, #6366f1, #ec4899)',
        plain:
          "The page's decoration gradient, so the avatar blends into it. The Wingman avatar is a soft wash of the accent color.",
      },
      {
        kind: 'appearance',
        term: 'Placeholder name',
        value: '“JD” · John Doe',
        plain:
          'The name a vague prompt fills in. It returns in “Welcome back, John!” and in the sales list, so the page reads as a template.',
      },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    variant: 'AI slop · Glowing “AI-powered” pill',
    summary:
      'A small label above the title. It says the analytics are “AI-powered”, with a sparkle and a glow, which tells you nothing about your data.',
    aliases: ['pill', 'tag', 'the little label', 'AI badge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: { light: '0 0 22px rgb(167 139 250 / 0.4)', dark: '0 0 22px rgb(139 92 246 / 0.4)' },
        plain: 'A violet halo with no offset, so the pill seems to light up. A common default of AI tools.',
      },
      {
        kind: 'appearance',
        term: 'Sparkle emoji',
        value: '✨',
        plain:
          "Shorthand for “AI” that labels the product instead of the page. The Wingman header says what you're looking at: Revenue, all plans, in USD.",
      },
    ],
  },
  {
    id: 'page-title',
    name: 'Page title',
    htmlTag: '<h3>',
    variant: 'AI slop · Gradient greeting',
    summary:
      'The heading at the top of the page. Here it greets you instead of naming the page, in gradient text with a waving emoji.',
    aliases: ['heading', 'welcome message', 'page header', 'the greeting'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient(90deg, #6366f1, #a855f7 45%, #ec4899)',
        plain:
          'The gradient is cut to the letter shapes, so the greeting turns indigo, purple and pink. The Wingman title is plain text in the ink color.',
      },
      {
        kind: 'appearance',
        term: 'Greeting as title',
        value: '“Welcome back, John! 👋”',
        plain:
          "Friendly, but it doesn't say what the page shows. The Wingman title is “Revenue”, with the plans and currency under it.",
      },
    ],
  },
  {
    id: 'date-range-picker',
    name: 'Date range picker',
    htmlTag: '<button>',
    variant: 'AI slop · Preset without dates',
    summary:
      'A button that should set the period for the whole page. It shows “Last 30 days” without dates, and the cards, chart and sales below each use a different period anyway.',
    aliases: ['date filter', 'calendar dropdown', 'time range', 'the dates button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Preset without dates',
        value: '📅 Last 30 days',
        plain:
          "A preset with no dates, so you can't tell which 30 days. The Wingman picker shows both: Last 30 days, Oct 10 – Nov 8, 2026.",
      },
      {
        kind: 'behavior',
        term: 'Periods that disagree',
        value: 'vs last month · This Year · this month',
        plain:
          'The stat cards compare with last month, the chart shows this year, the sales count is for this month. In the Wingman version one filter sets the period for everything.',
      },
    ],
  },
  {
    id: 'stat-card',
    name: 'Stat card',
    variant: 'AI slop · Rainbow gradients',
    summary:
      'A small card with one key number. Each card has its own bright gradient, emoji and decorative circle, and the numbers are the stock placeholders of a widely copied dashboard example.',
    aliases: ['KPI card', 'metric', 'number box', 'scorecard'],
    concepts: [
      {
        kind: 'appearance',
        term: 'One gradient per card',
        value: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
        plain:
          'Violet here, then blue, green and orange, each with a glow of its own color. The colors mean nothing; the Wingman cards share one quiet surface.',
      },
      {
        kind: 'appearance',
        term: 'Decorative circle',
        value: '::after · 130px · rgb(255 255 255 / 0.14)',
        plain:
          'A translucent circle peeks in from the top-right corner of every card, decoration a vague prompt often adds.',
      },
      {
        kind: 'appearance',
        term: 'Placeholder numbers',
        value: '$45,231.89 · +2,350 · +12,234 · +573',
        plain:
          'Figures from a popular dashboard example, reused so often that they read as filler. No starting value is shown; the Wingman cards add “from $74,920”, so a change can be checked.',
      },
    ],
  },
  {
    id: 'delta-badge',
    name: 'Trend badge',
    variant: 'AI slop · Always up, always white',
    summary:
      "A tiny badge that shows how much a number changed. Every change here points up in the same white pill, and one of them, “↑ 201”, isn't a percentage at all.",
    aliases: ['change indicator', 'percent badge', 'the up arrow'],
    concepts: [
      {
        kind: 'appearance',
        term: 'No semantic color',
        value: 'rgb(255 255 255 / 0.22)',
        plain:
          'The same translucent white on every card, so good and bad news would look alike. The Wingman badges are green for good news and red for bad.',
      },
      {
        kind: 'appearance',
        term: 'Mixed units',
        value: '↑ 20.1% · ↑ 180.1% · ↑ 19% · ↑ 201',
        plain:
          "Three percentages and a plain count, all “vs last month”. Changes in different units can't be compared at a glance.",
      },
    ],
  },
  {
    id: 'card',
    name: 'Card',
    variant: 'AI slop · Glassmorphism',
    summary:
      'A container that groups a chart or a list with its title. Every card here is frosted glass with very round corners and an emoji in the title, a common default of AI tools.',
    aliases: ['panel', 'tile', 'box', 'widget'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(14px)',
        plain:
          'Frosted glass: a translucent white fill with a light rim, tinted by the colored blobs behind the page. The Wingman cards are solid, so the data sits on a calm surface.',
      },
      {
        kind: 'appearance',
        term: 'border-radius',
        value: '28px',
        plain:
          'Very round corners and a soft shadow on every card. The Wingman cards use a 12px radius and a hairline border.',
      },
      {
        kind: 'appearance',
        term: 'Emoji in titles',
        value: '📈 🔥 🎯 🏆 📋',
        plain:
          'Every title starts with an emoji, and many notes end with one (“growing fast! 🔥”). They add color, not meaning, and make the titles slower to scan.',
      },
    ],
  },
  {
    id: 'bar-chart',
    name: 'Bar chart',
    variant: 'AI slop · Gradient bars, no values',
    summary:
      "A chart with one bar per month. The bars are glowing gradients and the gridlines have no values, so you see a rising shape but can't read a single amount.",
    aliases: ['graph', 'column chart', 'revenue chart', 'the bars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Unlabeled gridlines',
        value: '1px every 49px',
        plain:
          'Faint lines drawn by a repeating gradient, with no numbers beside them. The Wingman chart labels its axis ($50k–$90k) and shows exact values in a tooltip.',
      },
      {
        kind: 'appearance',
        term: 'Gradient bars',
        value: 'linear-gradient(180deg, #ec4899, #8b5cf6)',
        plain:
          "Each bar fades from pink to violet over a purple glow. The colors decorate; they don't encode anything.",
      },
      {
        kind: 'appearance',
        term: 'No comparison',
        value: 'one series · 12 bars',
        plain:
          'Nothing to measure the bars against, only a caption that cheers. The Wingman chart draws the previous period as a dashed line behind this one.',
      },
    ],
  },
  {
    id: 'donut-chart',
    name: 'Donut chart',
    variant: 'AI slop · Rainbow slices, round numbers',
    summary:
      'A ring split into slices that add up to a whole, with the total in the middle. The shares are round placeholder values, and each color has to be matched to its label in the legend.',
    aliases: ['pie chart', 'ring chart', 'the circle chart', 'traffic sources'],
    concepts: [
      {
        kind: 'appearance',
        term: 'conic-gradient',
        value: '#8b5cf6 0 40%, #ec4899 0 70%, …',
        plain:
          'Paints the slices around the center, and a radial mask cuts out the hole. Violet, pink, blue and amber: four unrelated hues for four sources.',
      },
      {
        kind: 'appearance',
        term: 'Round shares',
        value: '40% · 30% · 20% · 10%',
        plain: 'Shares this neat are placeholder values, and the 12.4K total in the middle gives no period.',
      },
      {
        kind: 'appearance',
        term: 'Legend',
        value: '10px dots',
        plain:
          'Labels sit beside colored dots, so reading the chart means matching colors by eye. A ranked list with bars, like the Wingman breakdowns, reads directly.',
      },
    ],
  },
  {
    id: 'insight-card',
    name: 'Insight card',
    variant: 'AI slop · Gradient with generic advice',
    summary:
      'A card meant to turn the data into a takeaway. This one repeats a number from above and gives advice nothing on the page backs up, in centered text on a three-color gradient.',
    aliases: ['AI insights', 'AI summary', 'recommendation card', 'the robot box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three-stop gradient',
        value: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
        plain:
          'Indigo, purple and pink with a large purple glow, a common default of AI tools. It outshines the charts it is meant to sum up.',
      },
      {
        kind: 'appearance',
        term: 'Centered paragraph',
        value: 'text-align: center',
        plain:
          'Several lines of centered text have ragged edges on both sides, which makes them slower to read than text aligned left.',
      },
      {
        kind: 'behavior',
        term: 'Generic advice',
        value: '“doubling down on social media”',
        plain:
          'Not tied to anything on the page: social is 30% of traffic, behind direct. A useful insight names the number, the period and what to do next.',
      },
    ],
  },
  {
    id: 'data-table',
    name: 'Data table',
    htmlTag: '<table>',
    variant: 'AI slop · Placeholder customers',
    summary:
      'Rows and columns for comparing records. Every customer has an example.com address, products and statuses carry emoji, and on phones columns are dropped instead of rearranged.',
    aliases: ['list', 'grid', 'spreadsheet view', 'transactions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder data',
        value: 'emma@example.com',
        plain:
          'Common first names with example.com addresses, the domain reserved for examples, mark the table as filler. The Wingman rows are companies with their own domains.',
      },
      {
        kind: 'appearance',
        term: 'Proportional digits',
        value: 'text-align: right · no tabular-nums',
        plain:
          'The amounts align right, but without tabular-nums many fonts give each digit its own width, so the cents can drift out of line. The Wingman table sets tabular-nums.',
      },
      {
        kind: 'behavior',
        term: 'Columns dropped',
        value: '@container (width < 570px)',
        plain:
          'On phones the status and date columns simply disappear. The Wingman table turns each row into two lines and keeps the status.',
      },
    ],
  },
  {
    id: 'status-pill',
    name: 'Status pill',
    variant: 'AI slop · Emoji in a tinted pill',
    summary:
      'A colored label that shows the state of a payment. Each one starts with a color emoji, which clashes with the tinted pill around it.',
    aliases: ['status tag', 'status badge', 'the colored label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji status',
        value: '✅ ⏳ ❌',
        plain:
          'Color emoji inside an already colored pill, drawn differently on every device. The Wingman pills use a small dot and the word.',
      },
      {
        kind: 'appearance',
        term: 'Tinted background',
        value: { light: 'background: #d1fae5', dark: 'background: rgb(16 185 129 / 0.16)' },
        plain:
          'A soft tint of the status color behind text in a stronger shade of it (green, amber, red), the same technique as the Wingman version.',
      },
    ],
  },
];
