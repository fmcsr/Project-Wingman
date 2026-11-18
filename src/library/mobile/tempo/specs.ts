import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Tempo music player, in the order they appear. `value` fields are the actual values from TempoApp. */
export const tempoSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'collapse-button',
    name: 'Collapse button',
    htmlTag: '<button aria-label="Minimize player">',
    variant: 'Chevron down',
    summary: 'The down arrow in the top corner. It shrinks the full-screen player back into the mini player above the tab bar.',
    aliases: ['minimize', 'the down arrow', 'close the player'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron',
        value: '20 × 20px · stroke-width: 2',
        plain: 'A thin open arrow, drawn as a line rather than a solid shape. It points down because that is where the player goes when it closes.',
      },
      {
        kind: 'behavior',
        term: 'Swipe down to dismiss',
        plain: 'Dragging the whole screen downward does the same as tapping the arrow: the player slides away into the mini player.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Minimize player"',
        plain: "An icon-only button needs a name that screen readers can say, since there's no visible text.",
      },
    ],
  },
  {
    id: 'player-context',
    name: 'Context title',
    variant: 'Overline and playlist name',
    summary: 'Two short lines that say where the music is coming from: the kind of source on top, its name underneath.',
    aliases: ['playing from', 'the text at the top', 'source label', 'playlist name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overline',
        value: '8px · uppercase · letter-spacing: 0.1em',
        plain: 'A tiny label in capitals with extra space between the letters. It sits above a title and says what kind of thing the title is.',
      },
      {
        kind: 'appearance',
        term: 'Truncation',
        value: 'text-overflow: ellipsis',
        plain: 'A long playlist name is cut off with “…” instead of wrapping onto a second line.',
      },
      {
        kind: 'behavior',
        term: 'Tappable title',
        plain: 'Tapping the name opens the playlist the song is playing from.',
      },
    ],
  },
  {
    id: 'more-button',
    name: 'More button',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Horizontal dots',
    summary: 'Three dots that open a menu of extra actions for this song, like Add to playlist, Go to artist or Sleep timer.',
    aliases: ['three dots', 'overflow menu', 'meatball menu', 'options'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overflow icon',
        value: '3 dots in a row',
        plain: 'Dots side by side are the iOS habit; Android apps usually stack them vertically (the “kebab” menu).',
      },
      {
        kind: 'behavior',
        term: 'Action sheet',
        plain: 'The menu slides up from the bottom as a list of actions, with the song’s cover and title at the top so you know what they apply to.',
      },
      {
        kind: 'behavior',
        term: 'aria-haspopup',
        value: '"menu"',
        plain: 'Tells screen readers that this button opens a menu rather than doing something right away.',
      },
    ],
  },
  {
    id: 'album-artwork',
    name: 'Album artwork',
    htmlTag: '<img>',
    variant: 'Square photo, full width',
    summary: "The cover of the album that's playing, as wide as everything below it. Its color tints the whole screen.",
    aliases: ['cover art', 'album cover', 'the big picture', 'artwork'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Square artwork',
        value: '246 × 246px · border-radius: 4px',
        plain: 'Covers are always square. Here it spans the same width as the title and the scrubber, with corners rounded only a hair.',
      },
      {
        kind: 'appearance',
        term: 'Artwork-tinted background',
        value: 'linear-gradient(180deg, #295460, #173a43 48%, #0e2025)',
        plain: "The screen's gradient starts from a color taken from the cover and darkens toward the bottom, so every song gets its own mood.",
      },
      {
        kind: 'appearance',
        term: 'box-shadow',
        value: '0 8px 24px rgb(0 0 0 / 0.4)',
        plain: 'A soft, blurry shadow lifts the cover off the background like a record sleeve.',
      },
      {
        kind: 'behavior',
        term: 'Swipe to skip',
        plain: 'Swiping the cover left plays the next song and swiping right goes back, as a shortcut for the skip buttons.',
      },
    ],
  },
  {
    id: 'track-info',
    name: 'Track info',
    variant: 'Title and artist',
    summary: 'The song title in bold, with the artist underneath in a softer color.',
    aliases: ['song name', 'title and artist', 'metadata'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Type hierarchy',
        value: '17px · 700 vs 11.5px · 400',
        plain: 'The title is big and bold and the artist is smaller and lighter, so you read the song first.',
      },
      {
        kind: 'appearance',
        term: 'Secondary text color',
        value: 'color: rgb(255 255 255 / 0.7)',
        plain: 'The artist uses a see-through white, so it stays readable whatever color the cover gives the background.',
      },
      {
        kind: 'behavior',
        term: 'Marquee',
        plain: 'A title too long for its line slides sideways slowly so you can read all of it, instead of wrapping and pushing the controls down.',
      },
    ],
  },
  {
    id: 'like-button',
    name: 'Save button',
    htmlTag: '<button aria-pressed="true">',
    variant: 'Saved · check in a filled circle',
    summary: 'Saves the song to your library. It is a plus in an outlined circle until you tap it; then it turns into a solid pink check.',
    aliases: ['add button', 'like', 'plus button', 'save to library', 'the check mark'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled vs outline',
        value: 'fill: #ff5c93',
        plain: 'Not saved is an outline in white; saved is a solid circle in the brand pink with a dark check. The shape changes too, not only the color.',
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        value: 'true',
        plain: 'Screen readers announce it as a toggle that is currently on.',
      },
      {
        kind: 'behavior',
        term: 'Second tap',
        plain: 'Once the song is saved, tapping the check opens a sheet where you pick which playlists to keep it in.',
      },
    ],
  },
  {
    id: 'scrubber',
    name: 'Scrubber',
    htmlTag: '<input type="range">',
    variant: 'Progress slider with times',
    summary: 'The bar that shows how far into the song you are. Drag the dot to jump to another part of it.',
    aliases: ['progress bar', 'seek bar', 'timeline', 'the line with the dot'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track, fill and thumb',
        value: '3px rail · 9px thumb',
        plain: 'A thin rail (the track), the part already played in white (the fill) and the dot you drag (the thumb).',
      },
      {
        kind: 'appearance',
        term: 'Elapsed and remaining time',
        value: '1:21 · -2:24',
        plain: 'Time played on the left, time left on the right; the minus sign marks a countdown.',
      },
      {
        kind: 'appearance',
        term: 'font-variant-numeric',
        value: 'tabular-nums',
        plain: "Every digit has the same width, so the times don't wiggle as they tick.",
      },
      {
        kind: 'behavior',
        term: 'aria-valuetext',
        value: '"1:21 of 3:45"',
        plain: 'Screen readers announce the position as a time instead of a bare percentage.',
      },
    ],
  },
  {
    id: 'transport-controls',
    name: 'Transport controls',
    variant: 'Shuffle · previous · play · next · repeat',
    summary: 'The row of playback buttons. The name comes from tape recorders, where the “transport” was the mechanism that moved the tape.',
    aliases: ['playback controls', 'player buttons', 'the play row', 'skip buttons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Visual hierarchy',
        value: '46px circle vs 22–27px icons',
        plain: 'Play/pause is the biggest control and the only filled circle; skip, shuffle and repeat are plain white icons around it.',
      },
      {
        kind: 'appearance',
        term: 'Grouping',
        value: 'gap: 23px · 29px at the edges',
        plain: 'Previous and next sit close to play, because they are used together; shuffle and repeat move out to the edges.',
      },
      {
        kind: 'behavior',
        term: 'Restart before skipping back',
        plain: 'A few seconds into a song, Previous first jumps back to its start; pressing it again goes to the song before.',
      },
    ],
  },
  {
    id: 'mode-toggle',
    name: 'Toggle button',
    htmlTag: '<button aria-pressed>',
    variant: 'Shuffle off · repeat on',
    summary: 'Shuffle and repeat are on/off buttons. Repeat is on here: it turns the brand pink and gets a dot underneath.',
    aliases: ['shuffle', 'repeat', 'loop button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active color',
        value: 'color: #ff5c93',
        plain: 'The button that is on switches from white to the brand pink; the one that is off stays white.',
      },
      {
        kind: 'appearance',
        term: 'Indicator dot',
        value: '3 × 3px',
        plain: "The dot shows that repeat is on even to someone who can't tell the colors apart.",
      },
      {
        kind: 'behavior',
        term: 'Three-state toggle',
        plain: 'Repeat cycles through three states with each tap: off, repeat the playlist, and repeat this one song, which adds a small 1 to the icon.',
      },
    ],
  },
  {
    id: 'play-pause-button',
    name: 'Play/pause button',
    htmlTag: '<button aria-label="Pause">',
    variant: 'Playing, so it shows Pause',
    summary: 'The big round button in the middle. While music plays it shows pause bars; a tap pauses it and brings back the play triangle.',
    aliases: ['play button', 'pause button', 'the big round button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled circle',
        value: 'background: #fff · 46 × 46px',
        plain: 'A solid white circle with a dark icon: the strongest contrast on the screen, for the control people press most.',
      },
      {
        kind: 'behavior',
        term: 'Icon shows the action',
        value: 'aria-label="Pause"',
        plain: 'The icon shows what a tap will do, not the current state, and its spoken label changes with it.',
      },
    ],
  },
  {
    id: 'output-device',
    name: 'Device picker',
    variant: 'Playing on earbuds',
    summary: 'Shows where the sound is going right now. Tap it to move the music to a speaker, the TV or the phone itself.',
    aliases: ['connect', 'cast button', 'where the sound plays', 'output', 'bluetooth'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Accent label',
        value: 'color: #ff5c93',
        plain: "The icon and the device's name turn pink when the music plays somewhere other than the phone's own speaker. On the phone, only a plain white icon shows here.",
      },
      {
        kind: 'appearance',
        term: 'Icon and name',
        value: '15px icon · 9.5px label',
        plain: 'The headphones icon says what kind of device it is, and the name says which one.',
      },
      {
        kind: 'behavior',
        term: 'Device list',
        plain: 'A tap opens a sheet listing this phone and the speakers, TVs and headphones nearby; picking one moves the music there without stopping it.',
      },
    ],
  },
  {
    id: 'share-button',
    name: 'Share button',
    htmlTag: '<button aria-label="Share">',
    variant: 'Icon only',
    summary: 'The arrow rising out of a box sends a link to this song to someone else or to another app.',
    aliases: ['share icon', 'send', 'the box with the arrow'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outline icon',
        value: '16px · stroke-width: 1.9',
        plain: 'Drawn in the same thin white lines as the other small icons, so the row reads as one quiet set.',
      },
      {
        kind: 'behavior',
        term: 'Share sheet',
        plain: 'A tap opens a sheet from the bottom with a link to copy and the apps you can send the song to.',
      },
    ],
  },
  {
    id: 'queue-button',
    name: 'Queue button',
    htmlTag: '<button aria-label="Queue">',
    variant: 'Icon only',
    summary: 'Opens the list of what is playing now and what comes next. You can reorder it, remove songs or clear it.',
    aliases: ['up next', 'playlist icon', 'the lines icon', 'what plays next'],
    concepts: [
      {
        kind: 'appearance',
        term: 'List icon',
        value: '16px · box and two lines',
        plain: 'A box on top for the song playing now and two lines under it for the songs that follow.',
      },
      {
        kind: 'behavior',
        term: 'Reorder by dragging',
        plain: 'In the queue, each song has a handle you can drag up or down to change the order it will play in.',
      },
    ],
  },
  {
    id: 'lyrics-sheet',
    name: 'Lyrics card',
    variant: 'Peeking below the player',
    summary: 'A card parked at the bottom edge with only its title showing. Scroll up to read the lyrics, which light up line by line as the song plays.',
    aliases: ['lyrics', 'song text', 'the panel at the bottom', 'karaoke'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Peek',
        value: 'top: 558px · 42px visible',
        plain: 'Only the top of the card shows above the bottom edge: enough to say that the screen scrolls and there is more down here.',
      },
      {
        kind: 'appearance',
        term: 'Artwork color',
        value: 'background: #2e6a79',
        plain: "The card's color comes from the cover too, a little lighter than the background, so it feels like part of this song's screen.",
      },
      {
        kind: 'behavior',
        term: 'Expand to full screen',
        plain: 'The two round buttons share a line of the lyrics or open them full screen. Further down the page come more cards, like About the artist.',
      },
    ],
  },
  homeIndicator,
];
