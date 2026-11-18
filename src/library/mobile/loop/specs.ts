import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Loop photo feed, in the order they appear. `value` fields are the actual values from LoopApp. */
export const loopSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'wordmark',
    name: 'Wordmark',
    variant: 'With a feed menu',
    summary:
      "The app's name drawn as its logo in the top-left corner. The small chevron next to it opens a menu to switch feeds.",
    aliases: ['logo', 'logotype', 'app name', 'the brand name at the top', 'feed switcher'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Vector logotype',
        value: '<svg> · 43 × 23px · stroke-width: 3.3',
        plain:
          'Drawn as a shape instead of typed in a font, so it looks exactly the same on every phone and stays sharp at any size.',
      },
      {
        kind: 'appearance',
        term: 'currentColor',
        value: 'stroke: currentColor',
        plain: 'The strokes take the color of the text around them, so the logo turns white in dark mode on its own.',
      },
      {
        kind: 'behavior',
        term: 'Disclosure chevron',
        value: '9 × 9px',
        plain:
          'The small arrow says the logo is also a button: tap it to choose a feed, like only the people you follow or your favorites.',
      },
    ],
  },
  {
    id: 'activity-button',
    name: 'Activity button',
    variant: 'With a dot badge',
    summary:
      'The heart at the top opens your notifications: likes, comments and new followers. The dot means something new happened, without saying how much.',
    aliases: ['notifications', 'the heart at the top', 'activity', 'the dot on the heart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dot badge',
        value: '8 × 8px · #00a67e',
        plain: 'A plain dot, no number: it nudges you to look without the pressure of a count to clear.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 1.5px solid #fff', dark: 'border: 1.5px solid #000' },
        plain: "A ring in the page color separates the dot from the heart's outline.",
      },
      {
        kind: 'behavior',
        term: 'Dot vs. count',
        value: '● vs. 3',
        plain:
          'Use a dot when “something is new” is all that matters, and a number when people need to know how much is waiting, like the messages next to it.',
      },
    ],
  },
  {
    id: 'messages-button',
    name: 'Messages button',
    variant: 'With a count badge',
    summary: 'The paper plane opens your direct messages. The number says how many conversations have something unread.',
    aliases: ['DMs', 'inbox', 'direct messages', 'the paper plane at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count badge',
        value: 'min-width: 14px · border-radius: 999px',
        plain: 'A small pill that stays round for one digit and stretches to fit bigger numbers.',
      },
      {
        kind: 'appearance',
        term: 'Corner anchor',
        value: 'position: absolute; top: -1px; right: -2px',
        plain: "It overlaps the icon's top-right corner, right where people expect a badge.",
      },
      {
        kind: 'appearance',
        term: 'One icon, one meaning',
        value: 'paper plane',
        plain:
          'The paper plane means “send” everywhere in the app: up here it opens your messages, and under a post it sends that post to someone.',
      },
    ],
  },
  {
    id: 'add-story',
    name: 'Add story button',
    variant: 'Plus badge on your photo',
    summary: 'Your own photo, first in the row, with a small plus: tap it to post a new story.',
    aliases: ['your story', 'create story', 'the plus on my photo', 'post a story'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Plus badge',
        value: { light: '18 × 18px · #0c1014', dark: '18 × 18px · #f5f5f5' },
        plain: 'A small plus in the text color, pinned to the corner, turns your photo into a “create” button.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 2px solid #fff', dark: 'border: 2px solid #000' },
        plain: 'A ring in the page color separates the badge from the photo underneath.',
      },
      {
        kind: 'appearance',
        term: 'Same footprint',
        value: '56 × 56px · padding: 2px',
        plain: "There's no ring until you post, but the same spacing keeps your photo the size of the others.",
      },
    ],
  },
  {
    id: 'story-ring',
    name: 'Story ring',
    variant: 'Unseen and seen',
    summary:
      "A colored ring around a profile photo means that person posted a story you haven't watched yet. Once you have, the ring turns thin and gray.",
    aliases: ['stories', 'the circle around the profile picture', 'story bubble', 'the ring'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient ring',
        value: 'conic-gradient(from 210deg, #b5e853, #00a67e 50%, #b5e853)',
        plain:
          'A lime-to-jade sweep behind the photo shows through as a 2px ring, with a band in the page color between ring and photo.',
      },
      {
        kind: 'appearance',
        term: 'Seen state',
        value: { light: '#c7c7c7', dark: '#3d3d3d' },
        plain: 'Stories you have watched get a thin gray ring and move to the end of the row.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'overflow-x: auto',
        plain: 'Stories sit in one row that scrolls sideways; the circle cut off at the edge hints there are more.',
      },
    ],
  },
  {
    id: 'post-header',
    name: 'Post header',
    htmlTag: '<header>',
    variant: 'Author, place, menu',
    summary: 'The row above a post that says who posted it and where, with a menu for everything else.',
    aliases: ['author line', 'byline', 'the name above the photo', 'location'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two-line byline',
        value: '10px · 600 over 8.5px',
        plain: 'The bold username comes first; a smaller line under it adds context, here where the photo was taken.',
      },
      {
        kind: 'appearance',
        term: 'Avatar with a story ring',
        value: '27 × 27px',
        plain:
          "The author's photo wears the same ring as in the stories row: they have a story you haven't seen, and tapping the photo plays it.",
      },
      {
        kind: 'behavior',
        term: 'Location tag',
        value: '“Trastevere, Rome”',
        plain: 'Tapping the place opens a page of other posts from the same spot.',
      },
    ],
  },
  {
    id: 'more-button',
    name: 'More button',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Meatball menu (⋯)',
    summary: 'Three dots that open a menu of less common actions, like hide, report or copy link.',
    aliases: ['three dots', 'overflow menu', 'meatball menu', 'options'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Horizontal dots',
        value: '⋯',
        plain: 'Horizontal dots are often called a meatball menu, vertical ones a kebab menu. Same job.',
      },
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '16px icon · 28 × 28px target',
        plain: 'The tappable square is much bigger than the three small dots, so it is easy to hit.',
      },
    ],
  },
  {
    id: 'photo-carousel',
    name: 'Image carousel',
    variant: 'With a counter and page dots',
    summary:
      'Several photos in one post that you swipe through one at a time. The counter on the photo and the dots under it show where you are.',
    aliases: ['photo slider', 'swipeable photos', 'multi-photo post', 'gallery', 'carousel dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Counter chip',
        value: '“1/4” · rgb(18 18 18 / 0.7)',
        plain:
          'A see-through dark pill in the corner says how many photos there are and which one you are on, readable on any photo.',
      },
      {
        kind: 'appearance',
        term: 'Page dots',
        value: '4.5px dots · #00a67e',
        plain: 'One dot per photo, centered under the post; the colored one is the photo on screen.',
      },
      {
        kind: 'behavior',
        term: 'Scroll snapping',
        value: 'scroll-snap-type: x mandatory',
        plain: 'Each swipe moves exactly one photo and snaps it into place; the counter and the dots follow along.',
      },
    ],
  },
  {
    id: 'action-bar',
    name: 'Action bar',
    variant: 'Liked · comment · share · save',
    summary: 'The row of icons under a post: like it, comment, send it to someone, and save it for later.',
    aliases: ['post actions', 'engagement bar', 'like, comment, share', 'the icons under the photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Liked state',
        value: 'fill: #00a67e',
        plain: 'A liked post shows a solid heart in the brand color; before you like it, the heart is just an outline.',
      },
      {
        kind: 'appearance',
        term: 'Save on its own',
        value: 'margin-left: auto',
        plain: "Save sits apart from the others because it's private: only you see what you've saved.",
      },
      {
        kind: 'appearance',
        term: 'Icon rhythm',
        value: '19px icons · gap: 11px',
        plain: 'Same-size outline icons at even spacing read as one group of actions.',
      },
    ],
  },
  {
    id: 'like-count',
    name: 'Like count',
    variant: "With a friend's name",
    summary: 'A line under the actions that says how many people liked the post, starting with someone you follow.',
    aliases: ['likes', 'liked by', 'social proof', 'the line with the number of likes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Facepile',
        value: '14px photos · margin-left: -5px',
        plain: 'Tiny overlapping photos of people you follow who liked it put faces to the number.',
      },
      {
        kind: 'behavior',
        term: 'Friend first',
        value: '“theo.frames”',
        plain: 'Naming someone you know makes the post feel more relevant than a bare number would.',
      },
      {
        kind: 'appearance',
        term: 'Thousands separator',
        value: '2,481',
        plain: 'A comma makes big numbers easy to read at a glance.',
      },
    ],
  },
  {
    id: 'caption',
    name: 'Caption',
    variant: 'Truncated with “more”',
    summary:
      "The text that goes with the post, starting with the author's name. In the feed it is cut to one line, with a “more” to read the rest.",
    aliases: ['post text', 'description', 'the text under the photo', 'read more'],
    concepts: [
      {
        kind: 'appearance',
        term: 'text-overflow',
        value: 'ellipsis · white-space: nowrap',
        plain: 'The line stops at the edge of the screen with “…” instead of wrapping onto a second line.',
      },
      {
        kind: 'behavior',
        term: 'Expand in place',
        value: '“more”',
        plain: 'The gray “more” after the ellipsis says the text goes on; a tap opens the whole caption right there.',
      },
      {
        kind: 'appearance',
        term: 'Username first',
        value: 'font-weight: 600',
        plain: "The caption opens with the author's name in bold, like a byline.",
      },
    ],
  },
  {
    id: 'comments-link',
    name: 'Comments link',
    variant: 'Collapsed thread',
    summary:
      'A gray line that says how many comments there are and opens them all, instead of filling the feed with them.',
    aliases: ['view comments', 'comment count', 'see all comments'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Secondary text',
        value: { light: '#737373', dark: '#a8a8a8' },
        plain: 'Gray marks it as secondary, so the caption stays the focus.',
      },
      {
        kind: 'appearance',
        term: 'Comment count',
        value: '84',
        plain: 'The number tells you how lively the conversation is before you open it.',
      },
      {
        kind: 'behavior',
        term: 'Bottom sheet',
        plain: 'A tap slides up a sheet with every comment and a field to add yours, without leaving the feed.',
      },
    ],
  },
  {
    id: 'timestamp',
    name: 'Timestamp',
    htmlTag: '<time>',
    variant: 'Relative time',
    summary: 'When the post was shared, written as time ago rather than as a date.',
    aliases: ['post time', 'date', 'how long ago', 'posted at'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Relative time',
        value: '“2 hours ago”',
        plain: 'Time ago is quicker to grasp than a date and a clock time; older posts switch to a date like “October 12”.',
      },
      {
        kind: 'appearance',
        term: 'Least emphasis',
        value: { light: '8.5px · #737373', dark: '8.5px · #a8a8a8' },
        plain: 'The smallest, grayest line of the post: useful context, never the focus.',
      },
      {
        kind: 'behavior',
        term: 'datetime',
        value: 'datetime="2026-10-29T07:41"',
        plain:
          'People read friendly words, while the tag also carries the exact moment for screen readers, search engines and tooltips.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Icons only, with your photo',
    summary:
      "The row of icons at the bottom that switches between the app's main sections. The last tab is your own photo.",
    aliases: ['bottom nav', 'bottom menu', 'tabs', 'navigation bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active tab',
        value: 'fill: currentColor',
        plain: "The current section's icon is filled in; the others stay outlines.",
      },
      {
        kind: 'appearance',
        term: 'Avatar tab',
        value: '20 × 20px',
        plain: 'Your profile tab shows your photo instead of an icon, so it is unmistakably yours.',
      },
      {
        kind: 'appearance',
        term: 'Icons only',
        value: '5 tabs · no labels',
        plain: 'Without labels, every icon has to be instantly familiar: home, search, create, reels, profile.',
      },
    ],
  },
  homeIndicator,
];
