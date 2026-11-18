import type { UiElementSpec } from '../../../catalog';

/** Elements on the Playback watch page. `value` fields are the actual values from PlaybackSite.module.css. */
export const playbackSpecs: UiElementSpec[] = [
  {
    id: 'search-field',
    name: 'Search bar',
    htmlTag: '<input type="search">',
    variant: 'Pill · Search button · Voice search',
    summary:
      'The field for finding videos and channels, centered in the top bar. Its magnifier is a button of its own, joined to the end of the field, and the round microphone next to it searches by voice.',
    aliases: ['search box', 'the search at the top', 'the microphone button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Input group',
        value: 'border-radius: 40px 0 0 40px · button 64 × 40px',
        plain:
          'The field and its search button share one pill: rounded on the outside, square where they meet, with the button a shade grayer.',
      },
      {
        kind: 'appearance',
        term: 'Voice search button',
        value: '40 × 40px · border-radius: 50%',
        plain: 'A round gray button beside the field that listens instead of waiting for you to type.',
      },
      {
        kind: 'behavior',
        term: 'Collapses on phones',
        value: '@container page (width < 640px)',
        plain: 'On narrow screens the field folds into a magnifier button that opens search over the top bar.',
      },
    ],
  },
  {
    id: 'video-player',
    name: 'Video player',
    htmlTag: '<video>',
    variant: '16:9 · Controls showing',
    summary:
      'The video itself, with its controls drawn over the picture. They appear while the pointer moves over it and fade away during playback.',
    aliases: ['player', 'video window', 'the video'],
    concepts: [
      {
        kind: 'appearance',
        term: 'aspect-ratio',
        value: '16 / 9 · border-radius: 12px',
        plain: 'The frame keeps the shape of a widescreen video at any width, so nothing jumps when the video loads.',
      },
      {
        kind: 'appearance',
        term: 'Gradient scrim',
        value: 'linear-gradient(180deg, transparent, rgb(0 0 0 / 0.62))',
        plain: 'A dark fade along the bottom keeps the white controls readable over bright scenes.',
      },
      {
        kind: 'behavior',
        term: 'Auto-hiding controls',
        plain:
          "The controls show when the pointer moves over the video and fade out a few seconds after it stops, so they don't cover the picture. Here they're shown as if hovered.",
      },
    ],
  },
  {
    id: 'chapter-preview',
    name: 'Seek preview',
    variant: 'Frame · Chapter · Time',
    summary:
      'The small frame that floats over the progress bar where the pointer rests, with its chapter and time underneath, so you can see where a click would take you.',
    aliases: ['hover preview', 'scrub thumbnail', 'the little picture above the bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Storyboard thumbnail',
        value: 'width: 160px · border: 2px solid #ffffff · border-radius: 8px',
        plain:
          'A tiny frame from that point in the video. Players usually cut these from one big image of small frames (a sprite sheet) made at upload.',
      },
      {
        kind: 'behavior',
        term: 'Follows the pointer',
        value: 'left: clamp(0px, calc(var(--at) - 80px), calc(100% - 160px))',
        plain: "It centers itself over the spot under the pointer, and clamp() stops it at the player's edges near the start and end.",
      },
      {
        kind: 'appearance',
        term: 'Chapter title',
        value: 'Sanding and oil finish · 15:50',
        plain: 'Naming the chapter tells you what happens there, not just when.',
      },
    ],
  },
  {
    id: 'progress-bar',
    name: 'Progress bar',
    htmlTag: '<div role="slider">',
    variant: 'Chapters · Buffered · Scrubber',
    summary:
      'The bar along the bottom of the video: how far you are, how much has loaded and where each chapter starts. Click or drag anywhere on it to jump.',
    aliases: ['seek bar', 'scrubber', 'timeline', 'the blue line'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chapter segments',
        value: 'gap: 2px · flex-grow: chapter length',
        plain:
          'Small gaps split the bar into chapters, each as wide as its share of the video. The chapter under the pointer swells from 5 to 8px tall.',
      },
      {
        kind: 'appearance',
        term: 'Played and buffered',
        value: '#3d66ff · rgb(255 255 255 / 0.4)',
        plain: "Cobalt for what you've watched, light gray for what has already loaded ahead, faint for the rest.",
      },
      {
        kind: 'behavior',
        term: 'Scrubber knob',
        value: '13 × 13px · border-radius: 50%',
        plain: 'The dot at the end of the played part. Drag it to scrub, or use the arrow keys to skip 5 seconds at a time.',
      },
    ],
  },
  {
    id: 'play-button',
    name: 'Play/pause button',
    htmlTag: '<button aria-label="Pause (k)">',
    variant: 'Playing · Shows pause',
    summary:
      'The first control on the bar. While the video plays it shows the pause symbol: the icon is what a click will do, not what is happening now.',
    aliases: ['pause button', 'play button', 'the two bars'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Icon shows the action',
        value: 'pause while playing · play while paused',
        plain: 'Two bars mean “click to pause”. Once paused, it turns into a triangle that means “click to play”.',
      },
      {
        kind: 'behavior',
        term: 'aria-keyshortcuts',
        value: 'aria-keyshortcuts="k"',
        plain: 'K plays and pauses from the keyboard, and the label tells screen readers about it.',
      },
      {
        kind: 'appearance',
        term: 'Hit area',
        value: '48 × 48px · icon 24px',
        plain: 'The clickable square is twice the size of the icon, so it is easy to hit.',
      },
    ],
  },
  {
    id: 'volume-slider',
    name: 'Volume slider',
    htmlTag: '<input type="range">',
    variant: 'Slides out from the speaker',
    summary:
      'The speaker icon mutes and unmutes; the short rail next to it sets the level. The rail only slides out while the pointer is over the speaker, which keeps the bar compact.',
    aliases: ['volume control', 'sound slider', 'the speaker icon'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Expand on hover',
        value: 'width: 52px',
        plain: 'Hidden at rest, the rail slides out to 52px when you point at the speaker.',
      },
      {
        kind: 'appearance',
        term: 'Fill and thumb',
        value: 'width: 70% · 12 × 12px knob',
        plain: 'White up to the current level and faint after it, with a round knob to drag.',
      },
      {
        kind: 'behavior',
        term: 'Hidden on small players',
        value: '@container player (width < 560px)',
        plain: 'On a phone-sized player only the speaker stays, since phones set the volume with their own buttons.',
      },
    ],
  },
  {
    id: 'autoplay-toggle',
    name: 'Toggle switch',
    htmlTag: '<button role="switch">',
    variant: 'Autoplay · On · In the player',
    summary:
      "Decides whether the next video starts by itself when this one ends. It sits in the player's control bar; it's on, so the knob sits on the right and shows a play symbol.",
    aliases: ['autoplay', 'on/off switch', 'the toggle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and knob',
        value: '36 × 14px track · 20px knob',
        plain:
          'A thin see-through track with a white circle that slides left (off) or right (on). The knob is taller than the track, a common way to draw a small switch.',
      },
      {
        kind: 'appearance',
        term: 'Icon in the knob',
        value: 'play when on · pause when off',
        plain: "The knob carries a tiny play or pause symbol, so the state reads even where there's no color to change.",
      },
      {
        kind: 'behavior',
        term: 'role="switch"',
        value: 'aria-checked="true"',
        plain: 'Screen readers announce it as a switch that is on, not as a plain button.',
      },
    ],
  },
  {
    id: 'captions-toggle',
    name: 'Captions toggle',
    htmlTag: '<button aria-pressed="true">',
    variant: 'CC · On',
    summary:
      "Turns subtitles on and off. When they're on, a short bar lights up under the CC icon and the words appear over the video.",
    aliases: ['subtitles button', 'CC button', 'closed captions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'On indicator',
        value: '20 × 3px · background: #3d66ff',
        plain: 'A small cobalt bar under the icon shows captions are on, without changing the icon itself.',
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        value: 'aria-pressed="true"',
        plain: 'Marks it as an on/off button that is on, so screen readers announce the state.',
      },
      {
        kind: 'appearance',
        term: 'Caption box',
        value: 'background: rgb(8 8 8 / 0.75) · box-decoration-break: clone',
        plain: 'Each caption line gets its own dark box, which keeps the words readable over any scene.',
      },
    ],
  },
  {
    id: 'settings-button',
    name: 'Settings button',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Gear · HD badge',
    summary:
      "Opens the player's settings: quality, playback speed, subtitles and a sleep timer. The tiny HD tag says the video is playing in high definition.",
    aliases: ['gear icon', 'quality settings', 'the HD badge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Corner badge',
        value: 'position: absolute · top: 10px · right: 7px',
        plain: "The HD tag is pinned to the gear's top-right corner, like a superscript.",
      },
      {
        kind: 'appearance',
        term: 'Tiny label',
        value: 'font-size: 8px · font-weight: 700',
        plain: "Bold and very small: it's a hint about quality, not a button of its own.",
      },
      {
        kind: 'behavior',
        term: 'aria-haspopup',
        value: 'aria-haspopup="menu"',
        plain: 'Tells screen readers the button opens a menu, with each setting as a row inside it.',
      },
    ],
  },
  {
    id: 'verified-badge',
    name: 'Verified badge',
    htmlTag: '<svg role="img">',
    variant: 'Check in a circle',
    summary:
      "The small check after a channel's name: the platform has confirmed the channel is who it says it is. Every verified name carries the same one.",
    aliases: ['checkmark', 'verified tick', 'the check next to the name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Cut-out check',
        value: { light: 'stroke: #ffffff', dark: 'stroke: #0f0f0f' },
        plain: 'The check is drawn in the page color, so it looks cut out of the gray circle in both themes.',
      },
      {
        kind: 'appearance',
        term: 'Muted color',
        value: { light: 'color: #606060', dark: 'color: #aaaaaa' },
        plain: 'Gray rather than the brand color: it confirms identity quietly instead of competing with the name.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="Verified"',
        plain: 'Screen readers say “Verified” instead of skipping a picture.',
      },
    ],
  },
  {
    id: 'subscribe-button',
    name: 'Subscribe button',
    htmlTag: '<button>',
    variant: 'Primary pill · Not subscribed',
    summary:
      'Follows the channel, so its new videos show up in your feed. It sits right after the channel name and is the boldest button on the page.',
    aliases: ['follow button', 'sub button', 'the black button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted pill',
        value: { light: 'background: #0f0f0f · color: #ffffff', dark: 'background: #f1f1f1 · color: #0f0f0f' },
        plain: 'The strongest contrast on the page: black on a white page, white on a dark one.',
      },
      {
        kind: 'behavior',
        term: 'State change',
        value: 'Subscribe → Subscribed',
        plain:
          'Once you subscribe it turns gray, reads “Subscribed” and gains a bell for choosing how often you hear about new uploads.',
      },
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'height: 36px · border-radius: 18px',
        plain: 'A radius of half the height makes the ends perfectly round, the same shape as every action button in the row.',
      },
    ],
  },
  {
    id: 'like-dislike',
    name: 'Split button',
    htmlTag: '<button aria-pressed>',
    variant: 'Like · Dislike · Liked',
    summary:
      'Two buttons sharing one gray pill: like on the left with its count, dislike on the right. This video is liked, so its thumb is filled in.',
    aliases: ['like button', 'thumbs up and down', 'the like counter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Divider',
        value: '1 × 24px hairline',
        plain: 'A thin line splits the pill into its two halves.',
      },
      {
        kind: 'behavior',
        term: 'Toggle pair',
        value: 'aria-pressed="true" / "false"',
        plain: 'Each half is an on/off button, and turning one on turns the other off.',
      },
      {
        kind: 'appearance',
        term: 'Filled when on',
        value: 'fill: currentColor',
        plain: 'The chosen thumb is solid, the other an outline. Only likes show a count.',
      },
    ],
  },
  {
    id: 'description',
    name: 'Expandable description',
    htmlTag: '<div aria-expanded="false">',
    variant: 'Collapsed · ...more',
    summary:
      "The gray box under the video with the views, the upload date, hashtags and the creator's notes. It shows three lines; “...more” opens the rest, with links and chapters.",
    aliases: ['video description', 'show more', 'the gray box under the video'],
    concepts: [
      {
        kind: 'appearance',
        term: '-webkit-line-clamp',
        value: '3',
        plain: 'Stops the text after three lines, whatever the screen width.',
      },
      {
        kind: 'appearance',
        term: 'Fade-out “...more”',
        value: {
          light: 'linear-gradient(90deg, transparent, #f2f2f2 30px)',
          dark: 'linear-gradient(90deg, transparent, #272727 30px)',
        },
        plain: "“...more” sits on the last line over a short fade into the box's gray, so the cut-off words disappear softly.",
      },
      {
        kind: 'appearance',
        term: 'Hashtags',
        value: { light: 'color: #2f5cff', dark: 'color: #8aa5ff' },
        plain: 'Topic links in the brand color. Each one opens a page of videos with the same tag.',
      },
    ],
  },
  {
    id: 'sort-menu',
    name: 'Sort menu',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Top comments · Newest first',
    summary: 'Changes the order of the comments: the most liked first (the default) or the newest first.',
    aliases: ['sort by', 'order comments', 'the sort button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sort icon',
        value: '3 lines, shortest last',
        plain: 'Lines that get shorter are the common sign for “sort”.',
      },
      {
        kind: 'behavior',
        term: 'Dropdown menu',
        value: 'aria-haspopup="menu"',
        plain: 'A click opens a small menu with the two orders, the current one checked.',
      },
    ],
  },
  {
    id: 'comment',
    name: 'Comment',
    variant: 'Pinned · Creator heart · Thread',
    summary:
      "One viewer's comment: photo, handle and how long ago, the text, then like, dislike and Reply. The channel's own handle sits in a gray pill, and times like 9:12 jump the video there.",
    aliases: ['comment thread', 'reply', 'the comments section'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Pinned comment',
        value: 'Pinned by Kerf & Kettle',
        plain: 'The creator can pin one comment, often their own, so it stays at the top of the list.',
      },
      {
        kind: 'appearance',
        term: 'Creator heart',
        value: '18px avatar · 12px heart',
        plain: "The creator's face with a small heart: they loved this comment, which viewers take as a reward.",
      },
      {
        kind: 'behavior',
        term: 'Collapsed replies',
        value: 'aria-expanded="false" · 12 replies',
        plain:
          "Answers stay folded under the comment until you open them, so long threads don't push everything down. A small face on the toggle means the creator replied.",
      },
    ],
  },
  {
    id: 'filter-chips',
    name: 'Filter chips',
    variant: 'Single select · Clipped row',
    summary:
      'Small buttons that narrow the up-next list: everything, only this channel, the topic, related videos or the latest uploads. One is always selected.',
    aliases: ['chips', 'filter pills', 'the buttons above the list'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected chip',
        value: { light: 'background: #0f0f0f', dark: 'background: #f1f1f1' },
        plain: 'The active filter is inverted, like the Subscribe button; the others stay gray.',
      },
      {
        kind: 'appearance',
        term: 'Rounded rectangle',
        value: 'height: 32px · border-radius: 8px',
        plain: 'Chips have softly rounded corners rather than round ends, which sets them apart from the action pills.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'flex: none · white-space: nowrap',
        plain: "Chips never wrap or shrink; the ones that don't fit wait off to the side, behind a fade and an arrow that scrolls them in.",
      },
    ],
  },
  {
    id: 'up-next-item',
    name: 'Video card',
    variant: 'Compact · Thumbnail left',
    summary:
      "One suggestion in the up-next list: a thumbnail with the video's length, then the title, the channel and how many people watched and when. The three dots open a menu for it.",
    aliases: ['related video', 'suggested video', 'recommendation', 'the list on the right'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Duration badge',
        value: 'background: rgb(0 0 0 / 0.6) · right: 4px · bottom: 4px',
        plain: "The length sits in the thumbnail's corner, white on translucent black so it reads on any picture.",
      },
      {
        kind: 'appearance',
        term: 'Two-line clamp',
        value: '-webkit-line-clamp: 2',
        plain: 'Long titles stop after two lines with “…”, so every card keeps the same rhythm.',
      },
      {
        kind: 'appearance',
        term: 'Watched bar',
        value: 'height: 4px · background: #3d66ff',
        plain: "A bar along a thumbnail's bottom edge shows how much of it you've already seen.",
      },
    ],
  },
  {
    id: 'live-badge',
    name: 'Live badge',
    variant: 'On air',
    summary:
      'Marks a stream that is broadcasting right now. It takes the place of the length, and the line under the title counts the people watching instead of views.',
    aliases: ['live tag', 'on air', 'the LIVE sticker'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Solid brand fill',
        value: 'background: #3d66ff',
        plain: 'A bold cobalt label with a broadcast symbol and white capitals, the loudest badge in the list.',
      },
      {
        kind: 'appearance',
        term: 'text-transform',
        value: 'uppercase',
        plain: 'Written “Live” in the markup and shown in capitals, like a broadcast sign.',
      },
      {
        kind: 'behavior',
        term: 'Watching count',
        value: '1.2K watching',
        plain: 'A live video counts the people watching now, a number that changes as they come and go.',
      },
    ],
  },
];
