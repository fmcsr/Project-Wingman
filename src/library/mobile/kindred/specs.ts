import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Kindred dating app, in the order they appear. `value` fields are the real values from KindredApp. */
export const kindredSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'top-bar',
    name: 'Top app bar',
    htmlTag: '<header>',
    variant: 'Wordmark and filters, over the photo',
    summary:
      'The strip under the status bar, with the brand on the left and the filters on the right. It floats on the photo instead of taking a row of its own, so the card can fill the screen.',
    aliases: ['header', 'app bar', 'nav bar', 'the logo at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Wordmark',
        value: '21px · 800 · letter-spacing: -0.045em',
        plain: "The app's name set in heavy, tightly spaced type works as the logo. One aqua dot on the i is the only color in it.",
      },
      {
        kind: 'appearance',
        term: 'Overlay',
        value: 'position: absolute · top: 46px',
        plain: 'The bar is laid over the photo rather than above it, so the picture runs all the way up behind it and the status bar.',
      },
      {
        kind: 'appearance',
        term: 'Top scrim',
        value: 'linear-gradient(rgb(0 0 0 / 0.5), rgb(0 0 0 / 0.18) 55%, transparent)',
        plain: 'A soft dark fade at the top of every photo keeps the white logo and icons readable, even on a bright sky.',
      },
    ],
  },
  {
    id: 'filter-button',
    name: 'Filter button',
    htmlTag: '<button aria-label="Discovery settings">',
    variant: 'Sliders icon',
    summary: 'Opens the settings for who you see: age range, distance and what people are looking for.',
    aliases: ['filters', 'preferences', 'discovery settings', 'the sliders icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sliders icon',
        value: '20 × 20px · stroke-width: 1.8',
        plain: 'Two lines with knobs, like the faders on a mixing desk: the usual symbol for “adjust what you see”.',
      },
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '32 × 32px',
        plain: 'The tappable area is bigger than the drawing, so the small icon is easy to hit with a thumb.',
      },
      {
        kind: 'behavior',
        term: 'Bottom sheet',
        plain: 'A tap slides up a panel with sliders for age and distance; the cards reshuffle when you close it.',
      },
    ],
  },
  {
    id: 'card-stack',
    name: 'Card stack',
    variant: 'Next profile right behind',
    summary:
      'Profiles come as a deck of cards. You only act on the top one; the next is already waiting underneath at full size, and you see it where the top card has moved away.',
    aliases: ['deck', 'swipe stack', 'the card behind', 'stacked cards'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Stacked cards',
        value: 'inset: 0 (both cards)',
        plain: 'Both cards take exactly the same spot, one on top of the other. At rest the next one is hidden; a drag uncovers its edge.',
      },
      {
        kind: 'behavior',
        term: 'Preloading',
        plain: "The next profile and its photos load ahead of time, so it's ready the moment the top card leaves.",
      },
      {
        kind: 'behavior',
        term: 'Promote on swipe',
        plain: 'When the top card flies off, the one behind simply becomes the new top card, with no jump or reload.',
      },
    ],
  },
  {
    id: 'profile-card',
    name: 'Profile card',
    htmlTag: '<article>',
    variant: 'Full-bleed photo, mid-swipe to the right',
    summary:
      'One person per card: a photo that fills the screen, with their name and a few details on top. Drag it right to like, left to pass.',
    aliases: ['swipe card', 'profile', 'the card with the photo', 'dating card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Full-bleed photo',
        value: 'border-radius: 42px 42px 16px 16px',
        plain: "The photo runs edge to edge and up under the status bar. Its top corners match the screen's, so at rest the card looks like the screen itself.",
      },
      {
        kind: 'appearance',
        term: 'Drag tilt',
        value: 'translateX(10px) rotate(3deg)',
        plain: 'The card turns slightly as it moves, like a real card pushed by a finger, which makes the drag feel physical.',
      },
      {
        kind: 'behavior',
        term: 'Swipe gesture',
        value: 'right = like · left = nope · up = super like',
        plain: 'Dragging the card answers it and sends it off the screen that way. One move per person keeps the pace quick.',
      },
    ],
  },
  {
    id: 'photo-segments',
    name: 'Photo pagination',
    variant: 'Segmented bars · 1 of 5',
    summary: 'Short bars under the top bar, one per picture. The white one is the photo you are looking at.',
    aliases: ['photo bars', 'the lines at the top', 'progress segments', 'page indicator'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Segmented indicator',
        value: '5 segments · 7 × 2.5px · gap: 3px',
        plain: 'One small bar per photo tells you at a glance how many pictures there are, without covering the face of the photo.',
      },
      {
        kind: 'appearance',
        term: 'Active segment',
        value: 'width: 9px · #fff vs rgb(255 255 255 / 0.42)',
        plain: 'The current photo gets a longer, solid white bar; the others stay see-through.',
      },
      {
        kind: 'behavior',
        term: 'Tap zones',
        plain: 'Tapping the right side of the photo shows the next one and the left side goes back, which leaves swiping free for liking and passing.',
      },
    ],
  },
  {
    id: 'swipe-stamp',
    name: 'Swipe stamp',
    variant: 'LIKE, mid-swipe',
    summary:
      'A rubber-stamp label that fades in while you drag the card, so you know what letting go will do before you do it.',
    aliases: ['like label', 'the LIKE sign', 'swipe feedback', 'stamp'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Opacity follows the drag',
        value: 'opacity: 0.9',
        plain: 'The farther the card moves, the stronger the stamp gets. Here the card is almost far enough to count.',
      },
      {
        kind: 'behavior',
        term: 'Commit threshold',
        plain: 'Let go past a set distance and the like is sent; let go before it and the card springs back to the middle.',
      },
      {
        kind: 'appearance',
        term: 'Stamp style',
        value: 'rotate(-16deg) · border: 3px solid #34d6c3',
        plain: 'A thick outline, capitals and a slant make it look stamped on. Dragging left would show a NOPE stamp in the other corner.',
      },
    ],
  },
  {
    id: 'profile-details',
    name: 'Profile details',
    variant: 'Name, age and distance',
    summary:
      'The few facts people check before deciding, written right on the photo: the name in bold, the age next to it and how far away they are.',
    aliases: ['name and age', 'the text on the photo', 'about', 'distance'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bottom scrim',
        value: 'linear-gradient(transparent, rgb(0 0 0 / 0.5) 34%, rgb(0 0 0 / 0.82) 64%, rgb(0 0 0 / 0.88))',
        plain: 'The bottom of the photo fades to almost black, so the white text and the buttons on it stay readable on any picture.',
      },
      {
        kind: 'appearance',
        term: 'Type hierarchy',
        value: '20px · 800 and 400 vs 11px · 500',
        plain: 'The name is big and bold, the age the same size but regular weight, and the distance smaller, so the eye reads them in that order.',
      },
      {
        kind: 'behavior',
        term: 'Approximate distance',
        value: '“4 km away”',
        plain: 'Distance is rounded and never shows where someone actually is, to protect their privacy.',
      },
    ],
  },
  {
    id: 'verified-badge',
    name: 'Verified badge',
    variant: 'Photo verified',
    summary:
      'The badge after the age: this person took a live selfie that matched their photos, so they look like their pictures.',
    aliases: ['verified tick', 'photo verified', 'checkmark', 'the badge next to the name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Seal badge',
        value: '<svg> · 15 × 15px',
        plain: 'A rosette with a check, drawn as a vector icon so it stays sharp at any size.',
      },
      {
        kind: 'behavior',
        term: 'Trust signal',
        plain: 'People feel safer saying yes to someone verified, so apps put the badge right next to the name.',
      },
      {
        kind: 'appearance',
        term: 'One color on the photo',
        value: '#34d6c3',
        plain: 'It uses the brand color with a dark check, and sits on the photo, so it looks the same whatever the theme.',
      },
    ],
  },
  {
    id: 'info-button',
    name: 'Open profile button',
    htmlTag: '<button aria-label="Open Liv’s profile">',
    variant: 'Up arrow in a ring',
    summary: 'Opens the full profile, with more photos, prompts and details, before you decide.',
    aliases: ['more info', 'see profile', 'expand', 'the arrow button', 'the i button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ring button',
        value: '22 × 22px · border: 1px solid rgb(255 255 255 / 0.85)',
        plain: 'A dark circle with a thin white ring stays visible on any photo, without competing with the name next to it.',
      },
      {
        kind: 'behavior',
        term: 'Expand to detail',
        plain: 'The arrow points up because the profile slides up from the card into a scrolling page; closing it puts the card back where it was.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Open Liv’s profile"',
        plain: 'An icon-only button needs a name screen readers can say, and naming the person says whose profile opens.',
      },
    ],
  },
  {
    id: 'interest-chips',
    name: 'Interest chips',
    htmlTag: '<ul>',
    variant: 'One shared, filled in',
    summary:
      'Small pills with things this person loves. The aqua one is an interest you share: a ready-made conversation starter.',
    aliases: ['tags', 'interests', 'hobbies', 'pills', 'the little bubbles'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chip',
        value: 'height: 19px · border-radius: 999px',
        plain: 'A short label in a rounded pill: compact, easy to scan and clearly separate from the text above.',
      },
      {
        kind: 'appearance',
        term: 'Shared highlight',
        value: 'background: #34d6c3',
        plain: 'Interests you have in common are filled in with the brand color, so the overlap stands out before anything else.',
      },
      {
        kind: 'appearance',
        term: 'Dark chips',
        value: 'background: rgb(12 12 12 / 0.82)',
        plain: 'The others are near-black pills that sit quietly on the dark bottom of the photo.',
      },
    ],
  },
  {
    id: 'secondary-action',
    name: 'Secondary action buttons',
    variant: 'Rewind · super like · boost',
    summary:
      'The three small buttons around the big ones: undo your last swipe, send a super like, or boost your profile so more people see it for a while.',
    aliases: ['rewind', 'undo', 'super like', 'boost', 'the small buttons', 'the star', 'the lightning bolt'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Size hierarchy',
        value: '34px vs 47px',
        plain: 'Smaller circles read as extras, so nope and like stay the obvious choices.',
      },
      {
        kind: 'appearance',
        term: 'One color per action',
        value: 'rewind #6ec3ff · super like #a78bfa · boost #ffc84a',
        plain: 'Each action has its own color, so people learn the row by color as much as by shape and find a button without reading it.',
      },
      {
        kind: 'behavior',
        term: 'Premium features',
        plain: 'These are limited or paid. A super like reaches the person with a highlight before they swipe on you; tapping one with no credits left opens an upgrade screen instead.',
      },
    ],
  },
  {
    id: 'pass-button',
    name: 'Nope button',
    htmlTag: '<button aria-label="Nope">',
    variant: 'X, neutral',
    summary: 'The big X: not for me. It does the same as swiping the card to the left, for people who prefer to tap.',
    aliases: ['pass', 'skip', 'no', 'dislike', 'the X', 'swipe left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Neutral color',
        value: '#e9ebef',
        plain: 'The X is silver instead of an alarming red, so passing feels like a calm choice, not a rejection.',
      },
      {
        kind: 'behavior',
        term: 'Button twin',
        value: 'swipe left',
        plain: "Every swipe has a button that does the same, for one-handed use and for people who can't do the gesture.",
      },
      {
        kind: 'appearance',
        term: 'Size',
        value: '47 × 47px',
        plain: "Nope and like are the biggest buttons in the row because they're used on every card.",
      },
    ],
  },
  {
    id: 'like-button',
    name: 'Like button',
    htmlTag: '<button aria-label="Like">',
    variant: 'Brand-colored heart',
    summary: "The big heart: you're interested. If they like you back, it's a match and the two of you can chat.",
    aliases: ['heart', 'swipe right', 'yes', 'the heart button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Brand-colored icon',
        value: 'fill: #34d6c3',
        plain: 'The heart is the only icon in the brand color: the action the whole screen is built around.',
      },
      {
        kind: 'appearance',
        term: 'Black circle on the photo',
        value: 'background: #000',
        plain: 'The buttons sit on the darkest part of the photo, so plain black circles with bright icons stand out without a border or a shadow.',
      },
      {
        kind: 'behavior',
        term: 'Mutual match',
        plain: 'A like stays private until it is returned. When both people like each other, a match screen appears and a chat opens.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Floating, with a count and a dot',
    summary:
      "The row at the bottom that switches between the app's main sections. Badges say what's waiting in Likes and Chats.",
    aliases: ['bottom nav', 'bottom menu', 'tabs', 'navigation bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating capsule',
        value: 'left: 15px · right: 15px · border-radius: 999px',
        plain: "The bar doesn't touch the screen's edges: it floats as a rounded capsule above the bottom of the screen.",
      },
      {
        kind: 'appearance',
        term: 'Active pill',
        value: 'background: rgb(255 255 255 / 0.17)',
        plain: 'The current section sits in a lighter pill with a filled icon; the others are plain outlines.',
      },
      {
        kind: 'appearance',
        term: 'Badges',
        value: '“12” count · 5 × 5px dot',
        plain: 'A number on Likes says how many people already liked you; a plain dot on Chats means a new message, without the pressure of a count.',
      },
    ],
  },
  homeIndicator,
];
