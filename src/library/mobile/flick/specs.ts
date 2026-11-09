import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Flick short-video feed, in the order they appear. `value` fields are the actual values from FlickApp. */
export const flickSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'live-button',
    name: 'Live button',
    htmlTag: '<button aria-label="LIVE">',
    variant: 'Outlined icon',
    summary: 'The LIVE icon in the top-left corner. It opens a separate feed of streams happening right now.',
    aliases: ['go live', 'live streams', 'the LIVE thing in the corner', 'TV icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outline icon',
        value: '20 × 20px · stroke-width: 1.6',
        plain: 'The word LIVE drawn in thin white strokes inside a rounded screen, the same line style as the search icon across from it.',
      },
      {
        kind: 'appearance',
        term: 'drop-shadow',
        value: 'filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.3))',
        plain: 'A faint shadow follows the strokes of the icon itself, so the white lines stay visible on bright videos too.',
      },
      {
        kind: 'behavior',
        term: 'Entry point',
        plain: 'A tap leaves this feed for a separate feed of live streams. It is a doorway to another place, not a filter.',
      },
    ],
  },
  {
    id: 'feed-tabs',
    name: 'Feed tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Following · For You (selected)',
    summary:
      'Two feeds to switch between: videos from people you follow, or For You, an endless feed picked for you by the app.',
    aliases: ['top tabs', 'For You page', 'FYP', 'Following and For You'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active indicator',
        value: '16 × 2px underline',
        plain: 'A short white bar under For You marks the feed you are in; it is much narrower than the words above it.',
      },
      {
        kind: 'appearance',
        term: 'Dimmed inactive tab',
        value: 'color: rgb(255 255 255 / 0.75)',
        plain: 'The other feed stays readable but softer and a little lighter in weight, so the selected one stands out without a box around it.',
      },
      {
        kind: 'behavior',
        term: 'role="tab"',
        value: 'aria-selected="true"',
        plain: 'Tap a name or swipe sideways to switch feeds. Screen readers hear the two names as tabs, with For You selected.',
      },
    ],
  },
  {
    id: 'search-button',
    name: 'Search button',
    htmlTag: '<button aria-label="Search">',
    variant: 'Icon only',
    summary: 'The magnifying glass opens search: videos, people, sounds and hashtags.',
    aliases: ['magnifying glass', 'search icon', 'find'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '17px icon · 28 × 28px target',
        plain: 'The tappable area is bigger than the drawing, so the small glass is easy to hit.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Search"',
        plain: "An icon-only button needs a name that screen readers can say, since there's no visible text.",
      },
    ],
  },
  {
    id: 'video',
    name: 'Full-screen video',
    htmlTag: '<video>',
    variant: 'Vertical, playing',
    summary:
      'The video fills the screen above the tab bar and everything else floats on top of it. Swipe up for the next one, or double-tap to like it.',
    aliases: ['vertical video', 'reel', 'short', 'the video'],
    concepts: [
      {
        kind: 'appearance',
        term: 'object-fit',
        value: 'cover',
        plain: 'The video is scaled to fill its area edge to edge, trimming a little off the sides instead of showing black bars.',
      },
      {
        kind: 'appearance',
        term: 'Scrim',
        value: 'linear-gradient(rgb(0 0 0 / 0.36), transparent) · linear-gradient(transparent, rgb(0 0 0 / 0.5))',
        plain: 'The top and bottom of the video fade gently to dark, so the white text and icons on top stay readable whatever is playing.',
      },
      {
        kind: 'behavior',
        term: 'Scroll snapping',
        value: 'scroll-snap-type: y mandatory',
        plain: 'One swipe moves exactly one video, and the feed always comes to rest with a single video filling the screen.',
      },
    ],
  },
  {
    id: 'creator-avatar',
    name: 'Creator avatar',
    variant: 'With a follow badge',
    summary: "The creator's photo at the top of the rail. The orange plus follows them in one tap, without leaving the video.",
    aliases: ['profile picture', 'follow button', 'the plus under the photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Follow badge',
        value: '15 × 15px · #ff8a1f',
        plain: 'A small plus pinned to the bottom edge of the photo, half on and half off: the quickest possible follow button.',
      },
      {
        kind: 'appearance',
        term: 'Outline ring',
        value: 'border: 1px solid #fff',
        plain: 'A thin white ring separates the photo from the video behind it.',
      },
      {
        kind: 'behavior',
        term: 'Two targets in one',
        plain: 'Tapping the photo opens the profile. Tapping the plus follows, and the badge turns into a check before it fades away.',
      },
    ],
  },
  {
    id: 'like-button',
    name: 'Like button',
    htmlTag: '<button aria-pressed="true">',
    variant: 'Liked, with a count',
    summary: "A heart with the number of likes under it. It is solid orange because you've liked this video; a tap takes the like back.",
    aliases: ['heart', 'likes', 'the heart on the side'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled state',
        value: 'fill: #ff8a1f',
        plain: 'Liking turns the white heart solid orange, the brand color, so you can tell at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Compact number',
        value: '128.6K',
        plain: 'Big counts are shortened with K and M so they fit under a small icon: 128,600 becomes 128.6K. Smaller ones keep every digit, like 1,947.',
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        value: 'true',
        plain: 'Screen readers announce it as a toggle that is on, and read out the full number.',
      },
    ],
  },
  {
    id: 'action-button',
    name: 'Action button',
    htmlTag: '<button>',
    variant: 'Comments · save · share',
    summary:
      'The icons down the right edge, each with its count underneath: open the comments, save the video for later, or share it.',
    aliases: ['side rail', 'action rail', 'the icons on the right', 'engagement buttons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Vertical action rail',
        value: 'flex-direction: column · gap: 10px',
        plain: 'The actions are stacked down the right edge, where the thumb rests, which leaves the middle of the video clear.',
      },
      {
        kind: 'appearance',
        term: 'Filled icon over count',
        value: '24px icon · 9.5px count',
        plain: 'Solid white icons stand out on a moving picture better than outlines, and each number sits right under its icon, so the counts double as labels.',
      },
      {
        kind: 'behavior',
        term: 'Bottom sheet',
        plain: 'Comments and Share open panels that slide up over the lower part of the screen, while the video keeps playing above.',
      },
    ],
  },
  {
    id: 'sound-disc',
    name: 'Sound disc',
    variant: 'Spinning, with a photo in the middle',
    summary:
      "A little record that turns while the video plays. The photo in the middle is the sound's picture; for an original sound like this one, it is the creator's. Tap it to see every video that uses this sound.",
    aliases: ['spinning record', 'music disc', 'vinyl', 'the spinning circle'],
    concepts: [
      {
        kind: 'behavior',
        term: '@keyframes',
        value: 'rotate(1turn) · 8s linear infinite',
        plain: 'The disc turns slowly and steadily, like a record on a player, to say that a sound is playing.',
      },
      {
        kind: 'behavior',
        term: 'animation-play-state',
        value: 'paused',
        plain: 'The disc stops where it is instead of jumping back. Here it stops while you inspect it; in the app it stops when you pause the video.',
      },
      {
        kind: 'behavior',
        term: 'prefers-reduced-motion',
        value: 'animation: none',
        plain: 'For people who turn on Reduce Motion, the disc stands still.',
      },
    ],
  },
  {
    id: 'creator-handle',
    name: 'Creator handle',
    variant: 'With the date',
    summary: "The creator's username in bold, then when the video was posted. Tap the name to open their profile.",
    aliases: ['username', '@name', 'who posted it', 'account name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Relative time',
        value: '“· 2d ago”',
        plain: 'Short relative times read faster than dates; the dot separates it from the name.',
      },
      {
        kind: 'appearance',
        term: 'Secondary text',
        value: 'color: rgb(255 255 255 / 0.75)',
        plain: 'The date is smaller, lighter and not bold, so it reads as a detail next to the name.',
      },
      {
        kind: 'appearance',
        term: 'text-shadow',
        value: '0 1px 2px rgb(0 0 0 / 0.3)',
        plain: 'A faint shadow under white text keeps it readable even where the video is bright.',
      },
    ],
  },
  {
    id: 'caption',
    name: 'Caption',
    variant: 'Two lines, with hashtags and “more”',
    summary: 'What the video is about, cut off after two lines with “… more” to read the rest. The bold #hashtags are links.',
    aliases: ['description', 'video text', 'hashtags', 'read more'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Truncation',
        value: 'max-height: 27px (2 lines)',
        plain: 'A long caption stops after two lines, and “… more” sits right where the text is cut off.',
      },
      {
        kind: 'appearance',
        term: 'Hashtag links',
        value: 'font-weight: 600',
        plain: 'Words that start with # are bold because each one opens a feed of every video with that tag.',
      },
      {
        kind: 'behavior',
        term: 'Expand in place',
        plain: 'Tapping “more” unfolds the whole caption right there, over the video, and tapping it again folds it back to two lines.',
      },
    ],
  },
  {
    id: 'sound-ticker',
    name: 'Sound ticker',
    variant: 'Scrolling marquee',
    summary: "The sound's name slides sideways in a loop because it's too long for its space. Tap it to open the sound's page.",
    aliases: ['scrolling text', 'song name', 'marquee', 'the moving music title'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Marquee',
        value: 'translateX(0 → −50%) · 9s linear',
        plain: 'Two copies of the name sit end to end and slide left together, so the loop never shows a gap or a jump.',
      },
      {
        kind: 'appearance',
        term: 'Clipped window',
        value: 'overflow: clip',
        plain: 'The name scrolls through a narrow window next to the note and is cut off sharply at both ends, like a ticker on a news channel.',
      },
      {
        kind: 'behavior',
        term: 'prefers-reduced-motion',
        value: 'animation: none',
        plain: 'For people who turn on Reduce Motion, the name holds still. It also stops while you inspect it.',
      },
    ],
  },
  {
    id: 'progress-bar',
    name: 'Progress bar',
    htmlTag: '<input type="range">',
    variant: 'Hairline with a dot, 38% played',
    summary: 'A thin line along the bottom of the video that fills as it plays. Press and drag it to jump to another moment.',
    aliases: ['seek bar', 'scrubber', 'timeline', 'the line at the bottom of the video'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and fill',
        value: '2px · rgb(255 255 255 / 0.18) and rgb(255 255 255 / 0.6)',
        plain: 'A faint track stands for the whole video and a brighter fill for the part already played.',
      },
      {
        kind: 'appearance',
        term: 'Thumb',
        value: '4 × 4px · #fff',
        plain: 'The little dot where the fill ends is the handle you drag. It is tiny while the video plays, so it never gets in the way.',
      },
      {
        kind: 'behavior',
        term: 'Scrubbing',
        plain: 'Pressing the bar makes it thicker and shows the time, so you can drag to exactly the moment you want.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'Labeled, with a dot and a count badge',
    summary:
      "The row at the bottom that switches between the app's main sections. On this feed it stays black, in light mode too, so it doesn't fight with the video.",
    aliases: ['bottom nav', 'bottom menu', 'navigation bar', 'the icons at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active tab',
        value: 'color: #fff · filled icon',
        plain: 'The section you are in gets a filled white icon and a white label; the others stay gray outlines.',
      },
      {
        kind: 'appearance',
        term: 'Dot badge',
        value: '6 × 6px · #ff8a1f',
        plain: 'The dot on Friends says something new is waiting there, without the pressure of a number.',
      },
      {
        kind: 'appearance',
        term: 'Count badge',
        value: 'min-width: 12px · border-radius: 999px',
        plain: 'The number on Inbox says how many messages and notifications are unread; the pill grows with the number.',
      },
    ],
  },
  {
    id: 'create-button',
    name: 'Create button',
    htmlTag: '<button aria-label="Create">',
    variant: 'Plain white tile',
    summary: 'The plus in the middle of the tab bar. It opens the camera to record a new video or upload one.',
    aliases: ['plus button', 'post button', 'upload', 'the + in the middle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Center action',
        value: '31 × 20px · border-radius: 6px',
        plain: 'Making a video is the one action the app wants to stand out, so it gets a solid tile in the middle instead of an icon and a label.',
      },
      {
        kind: 'appearance',
        term: 'High contrast',
        value: 'background: #fff · color: #000',
        plain: 'A white tile with a black plus is the brightest thing in the black bar, so the eye finds it first.',
      },
      {
        kind: 'behavior',
        term: 'Full-screen modal',
        plain: 'A tap opens the camera over everything, sliding up from the bottom; closing it brings you back to the same video.',
      },
    ],
  },
  homeIndicator,
];
