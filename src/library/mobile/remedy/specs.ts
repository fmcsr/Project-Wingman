import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Remedy results, in the order they appear. `value` fields are the actual values from RemedyApp. */
export const remedySpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'back-button',
    name: 'Back button',
    htmlTag: '<button aria-label="Back">',
    variant: 'Chevron only',
    summary: 'The arrow in the top-left corner. It goes back one screen, here to the search form.',
    aliases: ['back arrow', 'the < at the top', 'go back', 'return'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron icon',
        value: '17px · stroke-width: 2.2',
        plain: 'A plain left-pointing chevron with no word next to it is how iPhone apps say "back".',
      },
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '26 × 26px',
        plain: 'The tappable square is bigger than the thin arrow, so it is easy to hit with a thumb.',
      },
      {
        kind: 'behavior',
        term: 'Edge swipe',
        plain: 'Sliding a finger in from the left edge of the screen does the same thing as tapping the arrow.',
      },
    ],
  },
  {
    id: 'map-button',
    name: 'Map button',
    htmlTag: '<button>',
    variant: 'Text button · list and map toggle',
    summary: 'Shows the same doctors as pins on a map. On the map, the same spot reads List and brings you back.',
    aliases: ['map view', 'show map', 'list/map toggle', 'view switcher'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Text button',
        value: '12px · font-weight: 500',
        plain: 'Just a word, with no box or icon: a secondary action that stays out of the way of the results.',
      },
      {
        kind: 'behavior',
        term: 'View toggle',
        value: 'Map ↔ List',
        plain:
          'Two views of the same results. The label always names the view you would switch to, not the one you are in.',
      },
    ],
  },
  {
    id: 'search-bar',
    name: 'Search bar',
    htmlTag: '<button>',
    variant: 'Summary pill · two lines',
    summary:
      'Sums up the search: the specialty and reason on top, the neighborhood and insurance plan below. Tapping it opens the search to change any of them.',
    aliases: ['search box', 'search field', 'the pill at the top', 'search summary', 'query bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'height: 38px · border-radius: 999px',
        plain: 'A capsule with fully rounded ends, the shape people expect a search to have.',
      },
      {
        kind: 'appearance',
        term: 'Outlined',
        value: { light: 'border: 1px solid #c4c4c4', dark: 'border: 1px solid #4a4a4a' },
        plain: 'A thin gray outline instead of a filled box keeps the header light.',
      },
      {
        kind: 'appearance',
        term: 'Two-line summary',
        value: '11.5px · 500 over 8.5px gray',
        plain:
          'What you are looking for on top, the details smaller and gray underneath, cut with "…" if they run long.',
      },
      {
        kind: 'behavior',
        term: 'Search launcher',
        plain:
          "Tapping it doesn't bring up a keyboard here; it reopens the search form with every field already filled in.",
      },
    ],
  },
  {
    id: 'filter-chips',
    name: 'Filter chips',
    htmlTag: '<div role="group">',
    variant: 'Scrollable · on and off',
    summary:
      'Quick filters under the search, one tap each. The ones that are on have a dark outline, a gray fill and a check; more wait past the right edge.',
    aliases: ['chips', 'quick filters', 'filter pills', 'toggle chips', 'facets'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected state',
        value: {
          light: 'border-color: #1f1f1f · background: #f0f0f0',
          dark: 'border-color: #f2f2f2 · background: #2a2a2a',
        },
        plain:
          "A chip that's on gets a dark outline, a gray fill and a check mark, so the state doesn't hang on color alone.",
      },
      {
        kind: 'appearance',
        term: 'Pill chips',
        value: 'height: 24px · border-radius: 999px',
        plain: 'Small capsules with short labels: one idea per chip, like In-network or This week.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'overflow-x: auto',
        plain:
          'Chips keep their full width and run off the screen; the one cut in half hints that you can swipe for more.',
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        plain: 'Each chip is an on/off switch; aria-pressed tells screen readers whether it is on.',
      },
    ],
  },
  {
    id: 'filter-button',
    name: 'Filter button',
    htmlTag: '<button>',
    variant: 'With an active-filter count',
    summary: 'Opens every filter in a sheet. The number says how many are on: here the two chips next to it.',
    aliases: ['filters', 'more filters', 'refine', 'filter count'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count in the label',
        value: '“Filters · 2”',
        plain:
          'The number of active filters sits right in the label, so you can tell at a glance that the results are narrowed.',
      },
      {
        kind: 'appearance',
        term: 'Same shape as the chips',
        value: 'height: 24px · border-radius: 999px',
        plain: 'It leads the row of chips in the same capsule, as the way into all of them.',
      },
      {
        kind: 'behavior',
        term: 'Bottom sheet',
        plain:
          'Tapping it slides up a sheet with every filter (time of day, distance, in person or video, languages) and a button that shows how many doctors match.',
      },
    ],
  },
  {
    id: 'doctor-card',
    name: 'Result card',
    htmlTag: '<article>',
    variant: 'Doctor · open to book',
    summary:
      'One doctor in the results: photo, name and specialty, then rating, distance and insurance, then when you can see them.',
    aliases: ['doctor card', 'provider card', 'search result', 'list item', 'listing'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Divider band',
        value: { light: 'border-top: 6px solid #efefef', dark: 'border-top: 6px solid #000' },
        plain: 'A thick pale band, instead of a box or a thin line, separates one doctor from the next.',
      },
      {
        kind: 'appearance',
        term: 'Text hierarchy',
        value: '13.5px · 700 name over 10px',
        plain: 'Only the name is big and bold; everything else is smaller, so you read the name first.',
      },
      {
        kind: 'behavior',
        term: 'Card as a link',
        plain:
          'Tapping the photo or the name opens the full profile with reviews; the days, times and Book do their own jobs.',
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    htmlTag: '<img>',
    variant: 'Round photo',
    summary: "The doctor's photo, cropped to a circle and shown large: people choose a doctor partly by face.",
    aliases: ['profile photo', 'headshot', 'profile picture', 'provider photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Circle crop',
        value: '54 × 54px · border-radius: 50% · object-fit: cover',
        plain: 'Any photo becomes a neat circle without stretching: it fills the circle and the rest is trimmed.',
      },
      {
        kind: 'appearance',
        term: 'Placeholder fill',
        value: { light: 'background: #ededed', dark: 'background: #242424' },
        plain: 'A gray circle holds the place while the photo loads, so nothing jumps when it arrives.',
      },
      {
        kind: 'behavior',
        term: 'alt',
        plain: "A short text alternative, such as the doctor's name, lets screen readers say whose photo it is.",
      },
    ],
  },
  {
    id: 'video-badge',
    name: 'Video visit badge',
    variant: 'Icon badge on a photo',
    summary: 'A small camera on the corner of the photo: this doctor also sees patients over video.',
    aliases: ['telehealth badge', 'video icon', 'virtual visit', 'the camera on the photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Corner badge',
        value: 'position: absolute; right: -3px; bottom: -1px',
        plain:
          "It overlaps the photo's lower-right edge, where badges usually sit, so it reads as a fact about this person.",
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 1.5px solid #fff', dark: 'border: 1.5px solid #141414' },
        plain: 'A ring in the page color separates the badge from the photo underneath.',
      },
      {
        kind: 'appearance',
        term: 'Icon only',
        value: '20 × 20px · 10px camera',
        plain: 'A camera needs no words to mean video; the profile spells out the details.',
      },
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    variant: 'Gold star, average and count',
    summary: "The doctor's average score from patients and how many reviews it comes from.",
    aliases: ['stars', 'reviews', 'the 4.91', 'review score'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gold star',
        value: 'fill: #f2a900',
        plain: 'One gold star is the familiar sign for a rating, and the only warm color on the card.',
      },
      {
        kind: 'appearance',
        term: 'Average and count',
        value: '4.91 · 318 reviews',
        plain:
          'The average is a little bolder; the count says how much to trust it, since 4.91 from 318 reviews beats 5.0 from three.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        plain:
          'Screen readers should hear "Rated 4.91 out of 5 from 318 reviews" rather than "star, 4.91, 318 reviews".',
      },
    ],
  },
  {
    id: 'award-badge',
    name: 'Award badge',
    variant: "With the app's mark",
    summary:
      "Remedy's own award for the doctors patients rate best, set next to the rating. The ⓘ explains how it's earned.",
    aliases: ['badge', "patients' pick", 'top doctor', 'award', 'the blue tag'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tinted tag',
        value: {
          light: 'background: #e8f6fd · border: 1px solid #a3d9f3',
          dark: 'background: #13303d · border: 1px solid #2b5e75',
        },
        plain:
          'A pale wash of the brand blue with a slightly darker outline: easy to notice, quieter than anything you can book.',
      },
      {
        kind: 'appearance',
        term: 'Logo as an icon',
        value: 'the Remedy capsule',
        plain:
          'The tag carries the Remedy mark, a capsule with one half filled: the app vouches for this doctor, so its mark is on it.',
      },
      {
        kind: 'behavior',
        term: 'Social proof',
        value: '“Patients’ pick”',
        plain: 'It sums up many reviews into one quick reason to trust the doctor.',
      },
    ],
  },
  {
    id: 'distance',
    name: 'Distance and address',
    variant: 'Pin icon · one line',
    summary: 'How far the office is from the neighborhood you searched, then where it is.',
    aliases: ['location', 'address', 'how far', 'the pin line'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Leading icon',
        value: '11px pin · gap: 5px',
        plain:
          'Each fact starts with its own small icon (star, pin, shield), so you can scan for the one you care about.',
      },
      {
        kind: 'appearance',
        term: 'Distance first',
        value: '0.6 mi · 7th Ave & 9th St',
        plain: "The distance comes before the address because it's what you compare between doctors.",
      },
    ],
  },
  {
    id: 'in-network-badge',
    name: 'In-network badge',
    variant: 'Green shield with a check',
    summary: 'Says the doctor takes your insurance plan, so the visit is covered at the in-network price.',
    aliases: ['insurance', 'accepts my insurance', 'in network', 'coverage', 'the green shield'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Status icon',
        value: { light: 'fill: #14935b', dark: 'fill: #35c283' },
        plain: 'A green shield with a white check reads as "you\'re covered" before you read a word.',
      },
      {
        kind: 'appearance',
        term: 'Plan named',
        value: 'In-network · Kestrel PPO',
        plain: 'It names the plan from the search bar, so you know which insurance it was checked against.',
      },
      {
        kind: 'behavior',
        term: 'Not color alone',
        plain:
          'The words say "In-network" too, so the meaning comes through for people who can\'t tell the green apart.',
      },
    ],
  },
  {
    id: 'date-strip',
    name: 'Date strip',
    htmlTag: '<div role="tablist">',
    variant: 'Day tiles with opening counts',
    summary:
      'A row of days, each with the number of open appointments. Days with none are grouped into one gray tile; Thursday is picked.',
    aliases: ['date picker', 'day selector', 'calendar strip', 'availability', 'the row of days'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Availability count',
        value: '“9 appts”',
        plain:
          'Each day says how many times are open, so you can tell a full day from a nearly booked one before tapping.',
      },
      {
        kind: 'appearance',
        term: 'Disabled tile',
        value: { light: 'background: #ededed · color: #8a8a8a', dark: 'background: #242424 · color: #7d7d7d' },
        plain:
          'Days with nothing open are gray and grouped into a single tile ("Today – Wed"), so empty days take little room.',
      },
      {
        kind: 'appearance',
        term: 'Selected day',
        value: { light: 'background: #1f1f1f', dark: 'background: #f2f2f2' },
        plain: 'The day you picked flips to the text color, the opposite of the page, and its times appear below.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'overflow-x: auto',
        plain: 'The strip runs off the right edge; swipe it to see later days.',
      },
    ],
  },
  {
    id: 'time-slots',
    name: 'Time slots',
    htmlTag: '<div role="radiogroup">',
    variant: 'Grid of four · one picked',
    summary: 'The open appointment times on the picked day, each one a button. 10:45 AM is the one you chose.',
    aliases: ['appointment times', 'time picker', 'slots', 'available times', 'the blue times'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Brand-colored slots',
        value: { light: 'background: #8fd6fa · color: #08202e', dark: 'background: #7fcbf1 · color: #08202e' },
        plain: 'Everything you can book is the brand sky blue with dark text, so open times stand out at once.',
      },
      {
        kind: 'appearance',
        term: 'Selected slot',
        value: { light: 'background: #1f1f1f · color: #fff', dark: 'background: #f2f2f2 · color: #141414' },
        plain: 'The time you chose flips to the text color, just like the picked day above it.',
      },
      {
        kind: 'appearance',
        term: 'CSS grid',
        value: 'grid-template-columns: repeat(4, 1fr) · gap: 5px',
        plain: 'Four equal columns keep the times lined up in tidy rows, whatever their length.',
      },
      {
        kind: 'behavior',
        term: 'More',
        value: '7 shown + 2 more = 9 appts',
        plain:
          "The last cell opens the rest of the day's times instead of making the grid longer, so the counts add up.",
      },
    ],
  },
  {
    id: 'book-button',
    name: 'Primary button',
    htmlTag: '<button>',
    variant: 'Full width · names the choice',
    summary:
      "The main action on the screen: book the time you picked. Its label repeats the day and time, so there's no doubt what you're booking.",
    aliases: ['CTA', 'call to action', 'book now', 'the big blue button', 'submit button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Full width',
        value: '33px tall · border-radius: 6px',
        plain: 'As wide as the card, so it is the biggest and easiest thing to tap.',
      },
      {
        kind: 'appearance',
        term: 'Brand fill',
        value: { light: 'background: #8fd6fa', dark: 'background: #7fcbf1' },
        plain: 'The same sky blue as the open times, with dark text: the brand color always means "book".',
      },
      {
        kind: 'behavior',
        term: 'Specific label',
        value: '“Book Thu, Nov 19 at 10:45 AM”',
        plain: 'A label that names the action and the choice is clearer than a vague "Continue" or "Submit".',
      },
    ],
  },
  {
    id: 'sponsored-label',
    name: 'Sponsored label',
    variant: 'Ad disclosure with an info icon',
    summary: 'A small gray tag above the name: this doctor paid to be shown here. The ⓘ explains how that works.',
    aliases: ['ad label', 'promoted', 'sponsored tag', 'paid placement'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Quiet tag',
        value: { light: '8px · #666 on #f0f0f0', dark: '8px · #a3a3a3 on #2a2a2a' },
        plain: "Small and gray, so it doesn't shout, but always there: an ad has to be recognizable as one.",
      },
      {
        kind: 'behavior',
        term: 'Info icon',
        value: 'ⓘ',
        plain: 'Tapping the little i opens a short note on why this doctor is shown and how results are ordered.',
      },
      {
        kind: 'behavior',
        term: 'Ad disclosure',
        plain: 'Rules for advertising require paid placements to be labeled clearly, right on the result.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Solid · four labeled tabs',
    summary: "The app's four main sections along the bottom edge. Home is selected, since every search starts there.",
    aliases: ['bottom nav', 'bottom menu', 'tabs', 'navigation bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active tab',
        value: 'fill: currentColor · font-weight: 700',
        plain: "The current tab's icon is filled in and its label bold; the others are outlines in the same ink.",
      },
      {
        kind: 'appearance',
        term: 'Icon and label',
        value: '19px icons · 8px labels',
        plain: 'Every icon has a word under it, which matters for tabs like Insurance that no icon says on its own.',
      },
      {
        kind: 'appearance',
        term: 'Hairline border',
        value: { light: 'border-top: 0.5px solid #e3e3e3', dark: 'border-top: 0.5px solid #2b2b2b' },
        plain: 'A thin line on a solid background separates the bar from the results without a heavy shadow.',
      },
    ],
  },
  homeIndicator,
];
