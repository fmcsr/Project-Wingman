import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Loop social feed. `value` fields are the actual values from LoopApp.module.css. */
export const loopSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'wordmark',
    name: 'Wordmark',
    variant: 'Logotype in the app bar',
    summary: "The app's name set as its logo, in the top-left corner of the home feed.",
    aliases: ['logo', 'logotype', 'app name', 'the brand name at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Logotype',
        value: '26px · 800 · letter-spacing: -0.06em',
        plain: 'A heavy weight and tight letter-spacing turn the plain name into a recognizable mark.',
      },
      {
        kind: 'appearance',
        term: 'Live text',
        value: '“Loop”',
        plain: 'Set in type instead of an image, it stays sharp at any size and turns white in dark mode on its own.',
      },
    ],
  },
  {
    id: 'activity-button',
    name: 'Activity button',
    variant: 'With a notification dot',
    summary:
      'The heart at the top opens your notifications. The red dot means something new happened, without saying how much.',
    aliases: ['notifications', 'the heart at the top', 'red dot', 'activity feed'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dot badge',
        value: 'background: #ff3040',
        plain: 'A plain red dot, no number: it nudges you to look without the pressure of a count to clear.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 2px solid #fff', dark: 'border: 2px solid #000' },
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
    summary: 'Opens your direct messages. The red number says how many conversations have something unread.',
    aliases: ['DMs', 'inbox', 'direct messages', 'the message icon with a number'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count badge',
        value: 'min-width: 18px · border-radius: 999px',
        plain: 'A small pill that stays round for one digit and stretches to fit bigger numbers.',
      },
      {
        kind: 'appearance',
        term: 'Corner anchor',
        value: 'position: absolute; top: 0; right: -3px',
        plain: "It overlaps the icon's top-right corner, right where people expect a badge.",
      },
      {
        kind: 'appearance',
        term: 'Attention color',
        value: 'background: #ff3040',
        plain: 'The same red as the dot, saved for things that need your attention.',
      },
    ],
  },
  {
    id: 'add-story',
    name: 'Add story button',
    variant: 'Plus badge on your avatar',
    summary: 'Your own photo, first in the row, with a small plus: tap it to post a new story.',
    aliases: ['your story', 'create story', 'the plus on my photo', 'post a story'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Plus badge',
        value: '20 × 20px · #2b8cf2',
        plain: 'A blue plus pinned to the corner turns your avatar into a “create” button.',
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
        value: 'padding: 2.5px',
        plain: "There's no colored ring until you post, but the same spacing keeps your photo the size of the others.",
      },
    ],
  },
  {
    id: 'story-ring',
    name: 'Story ring',
    variant: 'Unseen and seen',
    summary:
      "A colorful ring around a profile photo means that person has a story you haven't watched. Once you have, the ring turns thin and gray.",
    aliases: ['stories', 'the circle around the profile picture', 'gradient ring', 'story bubble'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient ring',
        value: 'linear-gradient(45deg, #ffc13d, #ff5148 45%, #e3308e 70%, #8f3cff)',
        plain: 'A sunset gradient behind the photo shows through as a 2.5px ring.',
      },
      {
        kind: 'appearance',
        term: 'Gap ring',
        value: { light: 'border: 2.5px solid #fff', dark: 'border: 2.5px solid #000' },
        plain: 'A band in the page color between ring and photo makes the ring stand out.',
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
    variant: 'Author, badge, time, menu',
    summary: 'The row above a post that says who posted it, when and where, with a menu for everything else.',
    aliases: ['author line', 'byline', 'the name above the photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Relative time',
        value: '“2h”',
        plain: 'Short relative times like 2h or 3d are quicker to read than full dates.',
      },
      {
        kind: 'appearance',
        term: 'Two-line byline',
        value: '13px · 600 over 11.5px',
        plain: 'The bold username comes first; a smaller line underneath adds context, here the location.',
      },
      {
        kind: 'appearance',
        term: 'Avatar',
        value: '30 × 30px',
        plain: 'A small round photo puts a face to the name.',
      },
    ],
  },
  {
    id: 'verified-badge',
    name: 'Verified badge',
    variant: 'Blue check',
    summary: 'The blue badge with a check next to a name: the platform has confirmed the account is who it says it is.',
    aliases: ['blue check', 'blue tick', 'verified checkmark'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Scalloped badge',
        value: '<svg> · 14 × 14px',
        plain: 'A rosette shape with a white check, drawn as a vector icon so it stays sharp at any size.',
      },
      {
        kind: 'appearance',
        term: 'Brand blue',
        value: '#2b8cf2',
        plain: "The same blue in light and dark mode, so it reads as the platform's own stamp.",
      },
      {
        kind: 'appearance',
        term: 'Next to the name',
        value: 'gap: 4px',
        plain: 'It sits right after the username, so it clearly belongs to that account.',
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
        value: '32 × 32px',
        plain: 'The tappable square is much bigger than the three small dots, so it is easy to hit.',
      },
    ],
  },
  {
    id: 'photo-carousel',
    name: 'Image carousel',
    variant: 'With a counter and dots',
    summary:
      'Several photos in one post that you swipe through one at a time. The counter and the dots show where you are.',
    aliases: ['photo slider', 'swipeable photos', 'multi-photo post', 'gallery'],
    concepts: [
      {
        kind: 'appearance',
        term: 'aspect-ratio',
        value: '3 / 2',
        plain: 'A fixed shape keeps the post the same height on every screen, whatever size the photo is.',
      },
      {
        kind: 'appearance',
        term: 'Counter chip',
        value: '“1/3”',
        plain: 'A pill in the corner says how many photos there are and which one you are on.',
      },
      {
        kind: 'appearance',
        term: 'Page dots',
        value: '6px dots',
        plain: 'One dot per photo; the solid white one is the photo you are looking at.',
      },
      {
        kind: 'appearance',
        term: 'Scrim behind text',
        value: 'rgb(18 18 18 / 0.7)',
        plain: 'A see-through dark backing keeps the white counter readable on any photo, light or dark.',
      },
    ],
  },
  {
    id: 'action-bar',
    name: 'Action bar',
    variant: 'Liked · comment · share · save',
    summary: 'The row of icons under a post: like, comment, share, and save it for later.',
    aliases: ['post actions', 'engagement bar', 'like, comment, share', 'the icons under the photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Liked state',
        value: 'fill: #ff3040',
        plain: 'A liked post shows a solid red heart; before you like it, the heart is just an outline.',
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
        value: '24px icons · gap: 14px',
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
        value: 'margin-left: -6px',
        plain: 'Tiny overlapping avatars of friends who liked it put faces to the number.',
      },
      {
        kind: 'behavior',
        term: 'Friend first',
        value: '“maya.k”',
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
      "The text that goes with the post, starting with the author's name. Long captions are cut short, with a “more” to expand them.",
    aliases: ['post text', 'description', 'the text under the photo', 'read more'],
    concepts: [
      {
        kind: 'appearance',
        term: 'line-clamp',
        value: '-webkit-line-clamp: 2',
        plain: 'Shows at most two lines; the rest stays hidden until you tap “more”.',
      },
      {
        kind: 'appearance',
        term: 'Fade into “more”',
        value: '“… more”',
        plain: "The last words fade out under a gray “… more”, so it's clear the text goes on.",
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
        kind: 'behavior',
        term: 'Comment count',
        value: '84',
        plain: 'The number tells you how lively the conversation is before you open it.',
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
        value: '24 × 24px',
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
