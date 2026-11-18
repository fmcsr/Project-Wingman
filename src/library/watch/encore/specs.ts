import type { UiElementSpec } from '../../../catalog';

/** Elements of Encore's Now Playing screen, in the order they appear. `value` fields are the values in EncoreApp. */
export const encoreSpecs: UiElementSpec[] = [
  {
    id: 'artwork-background',
    name: 'Artwork background',
    variant: 'Blurred from the album art',
    summary:
      "The whole screen takes its color from the song's album art, blurred and dimmed behind the controls, so every song looks a little different.",
    aliases: ['album color background', 'tinted background', 'blurred cover', 'ambient background'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Blurred artwork',
        value: 'filter: blur(32px) saturate(1.3) brightness(0.45)',
        plain:
          'The cover itself, blurred until only its colors are left, a little more saturated, and darkened so white text stays easy to read on it.',
      },
      {
        kind: 'behavior',
        term: 'Crossfade',
        value: 'opacity · 900ms ease-in-out',
        plain: 'When the next song starts, its colors fade in over the old ones instead of switching at once.',
      },
      {
        kind: 'appearance',
        term: 'Bleed',
        value: 'inset: -40px',
        plain:
          'The blurred picture is larger than the screen, so most of its soft edge falls outside and the color reaches into the corners.',
      },
    ],
  },
  {
    id: 'album-art',
    name: 'Album art',
    htmlTag: '<img>',
    variant: 'Thumbnail in the top-left corner',
    summary:
      "The song's cover, small in the top-left corner, across from the time: the picture the background takes its color from.",
    aliases: ['cover', 'artwork', 'album cover', 'thumbnail'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rounded square',
        value: '30 × 30px · border-radius: 7px',
        plain: 'Covers are square, so the art stays square with softened corners, set in from the curve of the screen.',
      },
      {
        kind: 'appearance',
        term: 'object-fit: cover',
        value: 'object-fit: cover',
        plain: "A picture that isn't square is cropped to fill the square from its middle, without being stretched.",
      },
      {
        kind: 'behavior',
        term: 'Changes with the song',
        plain: 'The next song brings its own cover, which fades in along with the background.',
      },
    ],
  },
  {
    id: 'track-title',
    name: 'Track title',
    variant: 'Marquee when too long',
    summary:
      "The song's name. When it's longer than the screen is wide, it scrolls sideways after a pause, so you can read all of it.",
    aliases: ['song name', 'song title', 'scrolling title', 'track name'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Marquee',
        value: '11s · linear · rests for the first 24%',
        plain:
          'The title rests at its start, then slides left until a repeat of it stands where it began, and starts over. A title that fits never moves.',
      },
      {
        kind: 'appearance',
        term: 'Edge fade',
        value: 'mask-image: linear-gradient(…) · 6px and 16px',
        plain: 'The ends of the line fade out, so the scrolling text slips out of view instead of being chopped off.',
      },
      {
        kind: 'appearance',
        term: 'Bold title',
        value: '17px · 600 · #fff',
        plain: 'The largest text on the screen and the only bold line, so it is what you read first.',
      },
    ],
  },
  {
    id: 'artist',
    name: 'Artist name',
    variant: 'Secondary line',
    summary: "Who the song is by, in a smaller, dimmer line under the title.",
    aliases: ['artist', 'subtitle', 'band name', 'performer'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Secondary text',
        value: '15px · rgb(255 255 255 / 0.62)',
        plain:
          'Smaller and partly transparent, so it reads as a detail under the title and takes on a hint of the background.',
      },
      {
        kind: 'appearance',
        term: 'Truncation',
        value: 'text-overflow: ellipsis',
        plain: 'A long artist name is cut with "…" rather than scrolling: only the title gets a marquee.',
      },
    ],
  },
  {
    id: 'skip-button',
    name: 'Skip buttons',
    htmlTag: '<button>',
    variant: 'Previous · next',
    summary:
      'Double triangles either side of play/pause: back to the start of the song or the one before, and on to the next.',
    aliases: ['previous', 'next', 'back and forward', 'track controls', 'transport controls'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bare glyphs',
        value: '30 × 19px · in a 44 × 44px target',
        plain:
          'Just the white triangles, with no circle around them, so play/pause stays the one big button. The area you can tap is larger than the drawing.',
      },
      {
        kind: 'behavior',
        term: 'Previous restarts first',
        plain: 'A tap a few seconds into a song starts it over; a second tap goes to the song before.',
      },
      {
        kind: 'behavior',
        term: 'Pressed state',
        value: 'glass circle · 600ms fade',
        plain: 'A tap flashes a soft glass circle behind the triangles, so you see the press land.',
      },
    ],
  },
  {
    id: 'play-pause',
    name: 'Play/pause button',
    htmlTag: '<button>',
    variant: 'Playing, so it shows pause',
    summary:
      "The big round button in the middle. While music plays it shows pause; tap it and it turns into play.",
    aliases: ['pause button', 'play button', 'toggle', 'the big button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Liquid Glass',
        value: '54px · rgb(255 255 255 / 0.16) · backdrop-filter: blur(10px) saturate(1.5)',
        plain:
          "A translucent disc that blurs and brightens the color behind it, with a hairline of light at its top edge, like glass. The background's color shows through it.",
      },
      {
        kind: 'behavior',
        term: 'Shows the action',
        plain:
          "The glyph is what a tap will do, not what's happening: two bars mean the music is playing and a tap pauses it.",
      },
    ],
  },
  {
    id: 'progress-ring',
    name: 'Progress ring',
    htmlTag: '<svg>',
    variant: 'Around play/pause',
    summary:
      'The ring around play/pause fills clockwise from the top as the song plays: how much is behind you, how much is left.',
    aliases: ['progress bar', 'playback progress', 'scrubber', 'the circle around the button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'stroke-dasharray',
        value: 'pathLength="100" · stroke-dasharray: 41.63 100',
        plain:
          "The ring is a circle's outline drawn as one dash. Counting the outline as 100 makes the dash's length the percentage played: 1:32 of 3:41 is 41.6.",
      },
      {
        kind: 'behavior',
        term: 'Steady advance',
        value: 'transition: stroke-dasharray 1s linear',
        plain:
          'The position updates every second and each step glides over that second, so the ring creeps forward without ticking.',
      },
      {
        kind: 'appearance',
        term: 'Track',
        value: 'rgb(255 255 255 / 0.25)',
        plain: 'A faint full circle under the white one shows the whole song, so you can see what is left.',
      },
    ],
  },
  {
    id: 'airplay',
    name: 'AirPlay button',
    htmlTag: '<button>',
    variant: 'Audio output',
    summary:
      'Chooses where the sound plays: the watch speaker, AirPods or other Bluetooth headphones, or a speaker in the room.',
    aliases: ['audio output', 'output picker', 'speaker picker', 'cast', 'connect to headphones'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Output glyph',
        value: '36px glass circle · 20px glyph',
        plain: 'Rings over a triangle: the sign for sending sound somewhere else, the same on every Apple device.',
      },
      {
        kind: 'behavior',
        term: 'Output list',
        plain:
          'A tap opens a list of the devices in reach; the one playing has a check, and a tap on another moves the sound there.',
      },
    ],
  },
  {
    id: 'volume-button',
    name: 'Volume button',
    htmlTag: '<button>',
    variant: 'Speaker',
    summary: 'Shows the volume control, which the Digital Crown then turns up or down.',
    aliases: ['volume', 'sound level', 'speaker icon', 'loudness'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Speaker with waves',
        value: '36px glass circle · 20px glyph',
        plain: 'A speaker with two sound waves: the volume, in the middle of the bottom row.',
      },
      {
        kind: 'behavior',
        term: 'Crown does the turning',
        plain:
          "There's no slider to drag on a screen this small: the Digital Crown sets the volume, and this button shows where it is.",
      },
    ],
  },
  {
    id: 'more-button',
    name: 'More button',
    htmlTag: '<button>',
    variant: 'Ellipsis',
    summary:
      'Three dots in the bottom-right corner that open the actions without a place of their own: shuffle, repeat, add to library.',
    aliases: ['ellipsis', 'three dots', 'options', 'overflow menu', '…'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overflow menu',
        value: '36px glass circle · 20px glyph',
        plain: 'The usual sign for "more options": it keeps the screen to the few controls you use all the time.',
      },
      {
        kind: 'behavior',
        term: 'Sheet of actions',
        plain: 'A tap slides up a list of actions over Now Playing; a swipe down or the crown puts it away.',
      },
    ],
  },
  {
    id: 'volume-indicator',
    name: 'Digital Crown volume indicator',
    variant: 'Narrow bar by the crown',
    summary:
      'The thin green bar that appears by the Digital Crown while you turn it: how loud the music is, rising and falling with the crown.',
    aliases: ['volume bar', 'volume slider', 'crown indicator', 'volume level'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Capsule fill',
        value: '6 × 52px · #30d158 from the bottom',
        plain: 'A narrow track filled green from the bottom up to the volume, right next to the crown that sets it.',
      },
      {
        kind: 'behavior',
        term: 'Turn the Digital Crown',
        value: 'transform · 300ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain:
          'Turning the crown up or down moves the fill a step at a time, with a tick under your finger for each step.',
      },
      {
        kind: 'behavior',
        term: 'Appears while turning',
        value: 'opacity · 150ms in, 400ms out',
        plain:
          'It shows only while the crown moves and fades away a moment after, so it never covers the screen for long.',
      },
    ],
  },
];
