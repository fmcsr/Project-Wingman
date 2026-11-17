import type { UiElementSpec } from '../../../catalog';

/** Elements on the Stream home page. `value` fields are the actual values from StreamSite.module.css and the markup. */
export const streamSpecs: UiElementSpec[] = [
  {
    id: 'navbar',
    name: 'Navbar',
    htmlTag: '<header>',
    variant: 'Transparent · Solid on scroll · Sticky',
    summary:
      'The bar across the top: the logo and the main sections, then search, Kids, notifications and your profile. Over the billboard it has no fill of its own, only a dark fade.',
    aliases: ['top nav', 'header', 'menu bar', 'the links at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient scrim',
        value: 'linear-gradient(180deg, rgb(0 0 0 / 0.7) 10%, transparent)',
        plain: 'A fade from black at the top keeps the white links readable over any still, without a hard edge.',
      },
      {
        kind: 'behavior',
        term: 'Solid on scroll',
        value: 'animation-timeline: scroll() · animation-range: 0 90px',
        plain:
          'It stays at the top of the window, and over the first 90px of scrolling it fills in with the page color, so the rows passing under it never clash with the links.',
      },
      {
        kind: 'appearance',
        term: 'Current section',
        value: 'font-weight: 700 · color: #ffffff',
        plain: 'Home is bold and white; the other links are regular and a little dimmer (#e5e5e5).',
      },
      {
        kind: 'behavior',
        term: 'Folds into Browse',
        value: '@container (width < 880px)',
        plain: 'When the links no longer fit, they fold into one Browse menu.',
      },
    ],
  },
  {
    id: 'notification-badge',
    name: 'Notification badge',
    htmlTag: '<button aria-label="Notifications, 3 new">',
    variant: 'Bell with a count',
    summary:
      "The bell opens what's new for you, like the season you were waiting for. The number says how many notifications you haven't seen yet.",
    aliases: ['bell', 'notifications', 'alerts', 'unread count'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count badge',
        value: 'min-width: 17px · border-radius: 9px · background: #f6b12d',
        plain: "An amber pill on the bell's corner that grows sideways for bigger numbers.",
      },
      {
        kind: 'behavior',
        term: 'Cleared when opened',
        value: '3 → none',
        plain: 'Opening the list marks everything in it as seen, and the badge goes away.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '“Notifications, 3 new”',
        plain: "Screen readers hear the count as part of the button's name instead of a stray number.",
      },
    ],
  },
  {
    id: 'profile-menu',
    name: 'Profile menu',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Avatar · Caret',
    summary:
      "Your profile picture with a small triangle. It opens a menu to switch to someone else's profile, manage profiles, go to your account or sign out.",
    aliases: ['account menu', 'avatar menu', 'switch profile', "who's watching"],
    concepts: [
      {
        kind: 'appearance',
        term: 'Profile picture',
        value: '32 × 32px · border-radius: 4px',
        plain: 'A colored square with a simple face. Everyone on the account picks their own, so profiles are easy to tell apart.',
      },
      {
        kind: 'appearance',
        term: 'CSS triangle',
        value: 'border-width: 5px 5px 0 · border-color: #ffffff transparent transparent',
        plain: 'A small triangle drawn with borders alone says the picture opens a menu.',
      },
      {
        kind: 'behavior',
        term: 'Profiles',
        value: 'Maya',
        plain: 'Each profile has its own Continue Watching, list and suggestions; switching swaps the whole home page.',
      },
    ],
  },
  {
    id: 'billboard',
    name: 'Billboard',
    htmlTag: '<section>',
    variant: 'Full-bleed still · Trailer · Vignettes',
    summary:
      "The big feature at the top: one show's still across the full width, with its title, why it matters right now, a synopsis and the two main actions. Its trailer plays behind it.",
    aliases: ['hero', 'hero banner', 'featured title', 'spotlight', 'the big image at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Full-bleed 16:9',
        value: 'height: 56.25cqi',
        plain: 'The still runs edge to edge and is 9/16 as tall as the window is wide, the shape of the screen it was made for.',
      },
      {
        kind: 'appearance',
        term: 'Vignettes',
        value: 'linear-gradient(77deg, rgb(0 0 0 / 0.72), rgb(0 0 0 / 0.38) 40%, transparent 72%)',
        plain:
          'A dark fade from the left keeps the white text readable on a bright still, and a fade at the bottom melts it into the page where the rows begin.',
      },
      {
        kind: 'behavior',
        term: 'Trailer',
        value: 'transform: scale(1.08) · 26s',
        plain:
          'The still slowly pushes in, standing in for the trailer that plays here. It holds while you inspect it and stays put if you prefer reduced motion.',
      },
      {
        kind: 'appearance',
        term: 'Rows overlap it',
        value: 'margin-top: -11cqi',
        plain: "The first row starts over the bottom of the billboard, a hint that there's more below.",
      },
    ],
  },
  {
    id: 'title-treatment',
    name: 'Title treatment',
    htmlTag: '<h2>',
    variant: 'Logo-style title',
    summary:
      "The show's name set like its own logo rather than as plain text. Every show has its own lettering, here and on its artwork in the rows.",
    aliases: ['title logo', 'show logo', 'wordmark', 'title art'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Display serif',
        value: 'font-family: Didot · letter-spacing: 0.08em',
        plain: 'A high-contrast serif in widely spaced capitals gives Halflight the feel of a quiet, grown-up drama.',
      },
      {
        kind: 'appearance',
        term: 'Warm glow',
        value: 'text-shadow: 0 0 28px rgb(255 196 120 / 0.35)',
        plain: 'A soft amber glow picks up the light of the bus shelter in the still.',
      },
      {
        kind: 'behavior',
        term: 'A look per show',
        value: 'serif · condensed · wide · italic',
        plain: 'On the artwork in the rows, titles come in four styles of lettering, so they read as different shows at a glance.',
      },
    ],
  },
  {
    id: 'top-10-badge',
    name: 'Top 10 badge',
    variant: 'Rank line · Corner badge',
    summary:
      "An amber square with TOP over 10: before “#1 in Series Today” on the billboard, and in the corner of any title that's in today's Top 10.",
    aliases: ['top 10', 'ranking badge', 'trending badge', 'popular now'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Stacked label',
        value: 'TOP / 10 · background: #f6b12d',
        plain: 'Two lines in one small square, so it stays readable even in the corner of a small tile.',
      },
      {
        kind: 'behavior',
        term: 'Daily ranking',
        value: '#1 in Series Today',
        plain: 'The ranking is worked out every day from what people watch, and the badge follows a title wherever it appears.',
      },
      {
        kind: 'appearance',
        term: 'Corner badge',
        value: 'width: 12.5cqi',
        plain: "On tiles it's an eighth of the width, in the top-right corner where it doesn't cover the title.",
      },
    ],
  },
  {
    id: 'synopsis',
    name: 'Synopsis',
    htmlTag: '<p>',
    variant: 'Clamped to three lines',
    summary:
      'A short description of the show under its title. Long ones stop after three lines with an ellipsis; on phones three moods take its place.',
    aliases: ['description', 'logline', 'blurb', 'summary text'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Line clamp',
        value: '-webkit-line-clamp: 3',
        plain: 'Cuts the text after three lines and adds “…”, so the buttons always sit in the same place.',
      },
      {
        kind: 'appearance',
        term: 'Text shadow',
        value: 'text-shadow: 2px 2px 4px rgb(0 0 0 / 0.45)',
        plain: 'A soft shadow lifts the white text off the still wherever the picture gets bright.',
      },
      {
        kind: 'behavior',
        term: 'Shorter on small windows',
        value: '@container (width < 800px)',
        plain: 'Narrower windows stop at two lines, and phones show the moods instead.',
      },
    ],
  },
  {
    id: 'button-play',
    name: 'Play button',
    htmlTag: '<button>',
    variant: 'Primary · Icon and label',
    summary: 'The main action: starts the show from the beginning, or from where you left off.',
    aliases: ['primary button', 'watch now', 'CTA', 'the white button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Solid white',
        value: 'background: #ffffff · color: #000000',
        plain: 'The brightest thing on a dark page, so it is the obvious first click.',
      },
      {
        kind: 'appearance',
        term: 'Filled icon',
        value: 'fill: currentColor · 1.45em',
        plain: 'A solid play triangle before the word, sized with the text.',
      },
      {
        kind: 'appearance',
        term: 'Scales with the window',
        value: 'height: clamp(36px, 3.6cqi, 46px)',
        plain: 'Both buttons grow and shrink with the billboard, between 36 and 46px tall.',
      },
    ],
  },
  {
    id: 'button-more-info',
    name: 'Secondary button',
    htmlTag: '<button>',
    variant: 'Translucent gray',
    summary: 'More Info opens the details: episodes, cast and similar titles. It sits next to Play, clearly second.',
    aliases: ['more info', 'details button', 'ghost button', 'the gray button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Translucent fill',
        value: 'background: rgb(109 109 110 / 0.7)',
        plain: 'A see-through gray lets the still show through, so it reads as the second choice.',
      },
      {
        kind: 'behavior',
        term: 'Opens a modal',
        value: 'More Info',
        plain: "The details open over the page instead of on a new one, so closing them brings you right back.",
      },
    ],
  },
  {
    id: 'mute-toggle',
    name: 'Mute toggle',
    htmlTag: '<button aria-pressed="true">',
    variant: 'Round icon button',
    summary: "Turns the trailer's sound on or off. When the trailer ends, the same spot becomes a replay button.",
    aliases: ['sound toggle', 'volume button', 'unmute', 'replay'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outlined circle',
        value: 'border: 1px solid rgb(255 255 255 / 0.7) · border-radius: 50%',
        plain: 'A thin white ring with no fill keeps it light next to the big buttons.',
      },
      {
        kind: 'behavior',
        term: 'Toggle state',
        value: 'aria-pressed="true"',
        plain: 'The speaker with a cross means the trailer is muted; pressing it brings the sound back.',
      },
    ],
  },
  {
    id: 'maturity-rating',
    name: 'Maturity rating',
    variant: 'Edge tab · Outlined box',
    summary:
      "Who the title is meant for: 16+ means sixteen and up. On the billboard it's a tab against the right edge; in the preview card, a small outlined box.",
    aliases: ['age rating', 'content rating', 'parental rating', 'certificate'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Edge tab',
        value: 'border-left: 3px solid #dcdcdc · background: rgb(51 51 51 / 0.6)',
        plain: 'A see-through tab that runs into the right edge, with a light bar down its left side.',
      },
      {
        kind: 'appearance',
        term: 'Outlined box',
        value: 'border: 1px solid rgb(255 255 255 / 0.4)',
        plain: 'In the preview card, a thin box sets the rating apart from the other details.',
      },
      {
        kind: 'behavior',
        term: 'Profile limits',
        value: '16+',
        plain: 'A profile can be limited to certain ratings, and titles above the limit never show up for it.',
      },
    ],
  },
  {
    id: 'carousel',
    name: 'Row',
    htmlTag: '<section>',
    variant: 'Carousel · Peek · Handle · Page indicator',
    summary:
      "A titled row of shows that pages sideways. The next title peeks in at the edge; hovering a row shows a chevron after its title that opens the whole row, which page you're on and a handle to page on.",
    aliases: ['carousel', 'slider', 'shelf', 'horizontal list', 'rail', 'lane'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Peek',
        value: 'overflow: clip · padding: 0 4cqi',
        plain: 'Five titles fit across and a sixth is cut off at the edge: a hint that the row goes on.',
      },
      {
        kind: 'appearance',
        term: 'Tiles per row',
        value: '--per-row: 5 (4 below 1100px, 3 below 800px)',
        plain: 'Tiles are sized so a whole number fits across the window, plus the peek. Phones switch to upright posters.',
      },
      {
        kind: 'behavior',
        term: 'Page indicator',
        value: '4 × 12px bars',
        plain: "Small bars at the top right show how many pages the row has and which one you're on.",
      },
      {
        kind: 'behavior',
        term: 'Handle',
        value: 'width: 4cqi · background: rgb(20 20 20 / 0.55)',
        plain: "The dark strip with a chevron over the peeking title pages the row on; a left one appears once you've moved.",
      },
    ],
  },
  {
    id: 'progress-bar',
    name: 'Progress bar',
    htmlTag: '<div role="progressbar">',
    variant: 'Resume bar',
    summary:
      "The thin bar under each title in Continue Watching: how much of the episode or film you've already watched.",
    aliases: ['resume bar', 'watch progress', 'continue watching bar', 'the line under the tile'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two-tone bar',
        value: 'height: 3px · #f6b12d on rgb(255 255 255 / 0.25)',
        plain: "Amber for the part you've watched, on a faint track for the rest.",
      },
      {
        kind: 'behavior',
        term: 'Resume point',
        value: 'aria-valuenow="62"',
        plain: 'Deep Signal is 62% into S2:E4, so Play picks up from there instead of the beginning.',
      },
      {
        kind: 'appearance',
        term: 'Under the artwork',
        value: 'margin-top: 7px',
        plain: 'It sits below the still rather than on it, so it never covers the title.',
      },
    ],
  },
  {
    id: 'top-10',
    name: 'Top 10 row',
    htmlTag: '<ol>',
    variant: 'Ranked · Big numerals',
    summary: "Today's most-watched series in order, each with a big outlined number beside its poster.",
    aliases: ['top ten', 'ranked list', 'leaderboard', 'most watched', 'big numbers'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outlined numerals',
        value: '-webkit-text-stroke: max(2px, calc(var(--tile-w) * 0.02)) #595959 · color: #141414',
        plain: 'Numbers in the page color with a gray outline: big enough to rank, quiet enough not to fight the posters.',
      },
      {
        kind: 'appearance',
        term: 'Upright posters',
        value: 'aspect-ratio: 2 / 3 · width: 50%',
        plain: 'Each poster stands upright in half a tile, with the number in the other half, tucked behind it.',
      },
      {
        kind: 'behavior',
        term: 'An ordered list',
        value: '<ol>',
        plain: "The ranking is a numbered list in the markup too, so screen readers announce each title's place.",
      },
    ],
  },
  {
    id: 'original-badge',
    name: 'Original badge',
    variant: "Stream's mark",
    summary:
      "Stream's mark in the top-left corner of a title's artwork means it's a Stream original: made by or for Stream, and only on Stream.",
    aliases: ['originals badge', 'exclusive badge', 'brand mark', 'the logo on the tile'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Brand mark',
        value: 'width: 7.5cqi · stroke: #f6b12d',
        plain: "The five amber bars of the logo, small, with a soft shadow so they show up on any still.",
      },
      {
        kind: 'behavior',
        term: 'Exclusive titles',
        value: '12 of 21 shows',
        plain: "Only titles Stream makes or owns carry it, which also tells you they won't leave the service.",
      },
    ],
  },
  {
    id: 'new-badge',
    name: 'Label',
    variant: 'New Episode · New Season · Recently Added',
    summary: "A small amber label at the bottom of a title's artwork that says what's new about it.",
    aliases: ['new badge', 'tag', 'ribbon', 'new episode label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bottom tab',
        value: 'border-radius: 2px 2px 0 0 · background: #f6b12d',
        plain: 'Flush with the bottom edge and rounded only on top, like a tab pulled up from below.',
      },
      {
        kind: 'behavior',
        term: 'Time-limited',
        value: 'Recently Added · New Season',
        plain: "Labels come and go: a title is Recently Added for a few weeks, and New Episode only until you've watched it.",
      },
      {
        kind: 'appearance',
        term: ':has()',
        value: '.art:has(.label) .showTitle { bottom: 22% }',
        plain: 'When artwork has a label, its title moves up, so the two never overlap.',
      },
    ],
  },
  {
    id: 'hover-card',
    name: 'Preview card',
    variant: 'Hover · 1.5× · Actions and details',
    summary:
      'What a title turns into when you rest the pointer on it: one and a half times bigger and centered on the tile, with play, add, like and more buttons, its rating and length, and three words for its mood.',
    aliases: ['hover card', 'mini modal', 'preview pop-up', 'expanded tile'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Grows from the tile',
        value: 'width: calc(var(--tile-w) * 1.5)',
        plain: 'It grows out of the tile it belongs to and stays centered on it, over the rows around.',
      },
      {
        kind: 'appearance',
        term: 'Circle buttons',
        value: '36px · border: 2px solid rgb(255 255 255 / 0.5)',
        plain: 'Play is a filled white circle; My List, Like and More are outlined, with More pushed to the far right.',
      },
      {
        kind: 'appearance',
        term: 'Moods',
        value: 'Slow-burn • Small-town • Mystery',
        plain: 'Three words with gray bullets between them say what it feels like, faster than a synopsis.',
      },
      {
        kind: 'behavior',
        term: 'Pointer only',
        value: '@container (width < 640px)',
        plain: 'Phones have nothing to hover, so they skip the card; a tap opens the details instead.',
      },
    ],
  },
];
