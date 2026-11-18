import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Live cursors element, in the order they appear. `value` fields are the actual values from LiveCursors.
 */
export const liveCursorsSpecs: UiElementSpec[] = [
  {
    id: 'live-cursors',
    name: 'Live cursors',
    htmlTag: '<div>',
    variant: 'Whiteboard · three people',
    summary:
      'Everyone in the file at once: each person’s pointer moves on your screen as they move it, with their name beside it. You see who’s looking at what, as if you were at the same table.',
    aliases: ['multiplayer cursors', 'presence', 'other people’s mouse pointers', 'real-time collaboration'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Person color',
        value: 'Imani #e2366b · Kofi #0b74de · Rosa #17895f',
        plain:
          'Each person gets one color for everything of theirs: cursor, name tag, selection, chat bubble and the ring around their face.',
      },
      {
        kind: 'behavior',
        term: 'Interpolation',
        value: 'curved paths · minimum-jerk easing',
        plain:
          'Positions arrive a few times a second; the app glides each cursor between them, so it moves like a hand instead of jumping.',
      },
      {
        kind: 'behavior',
        term: 'Live updates',
        plain:
          'What others do shows up as they do it: a note being dragged moves on your screen too, before they let go.',
      },
    ],
  },
  {
    id: 'live-cursors-cursor',
    name: 'Multiplayer cursor',
    htmlTag: '<div>',
    variant: 'Arrow + name tag',
    summary:
      'Another person’s pointer: an arrow in their color with their name in a tag at its tail. It goes where they go.',
    aliases: ['collaborator cursor', 'name tag cursor', 'someone else’s mouse', 'presence cursor'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Name tag',
        value: '11px · 600 · white on their color · border-radius: 6px',
        plain: 'The name sits below and right of the arrow’s tip, so it never covers what they point at.',
      },
      {
        kind: 'appearance',
        term: 'Outlined arrow',
        value: 'fill: their color · stroke: #fff 1.4px',
        plain: 'A white edge and a soft shadow keep the arrow visible on any background, colored notes included.',
      },
      {
        kind: 'behavior',
        term: 'Natural motion',
        value: 'quadratic curves · 600–1050ms a move',
        plain:
          'Cursors travel in gentle arcs, speeding up and slowing down like a hand, and rest when the person stops.',
      },
    ],
  },
  {
    id: 'live-cursors-chat',
    name: 'Cursor chat',
    htmlTag: '<div>',
    variant: 'Typed live · fades on its own',
    summary:
      'A short message that rides on someone’s cursor. It appears as they type and fades after a few seconds: a quick reaction, not a comment.',
    aliases: ['cursor message', 'speech bubble', 'quick chat', 'live reaction'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Speech bubble',
        value: 'border-radius: 3px 14px 14px · their color',
        plain:
          'Round except for the corner at the arrow, so it reads as coming from that cursor. The name tag becomes the bubble.',
      },
      {
        kind: 'behavior',
        term: 'Typed live',
        value: '70ms per character',
        plain: 'Letters show up while they’re being typed, not when the message is sent.',
      },
      {
        kind: 'behavior',
        term: 'Ephemeral',
        value: '2.5s · fades out over 300ms',
        plain: 'It goes away by itself and nothing is saved to the board.',
      },
    ],
  },
  {
    id: 'live-cursors-selection',
    name: 'Multiplayer selection',
    htmlTag: '<div>',
    variant: 'Imani’s · outline + handles',
    summary:
      'What someone else has selected, outlined in their color, so two people don’t edit the same thing at once.',
    aliases: ['selection box', 'someone else’s selection', 'bounding box', 'colored outline'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selection outline',
        value: 'border: 1.5px solid #e2366b',
        plain: 'A thin line in the person’s color around what they picked, a few pixels out from its edge.',
      },
      {
        kind: 'appearance',
        term: 'Resize handles',
        value: '7px squares · white fill',
        plain: 'Small squares at the corners, where a drag would resize it.',
      },
      {
        kind: 'behavior',
        term: 'Follows their clicks',
        value: 'fades in over 120ms · out over 150ms',
        plain: 'It appears when they click a note and goes when they click the empty board.',
      },
    ],
  },
  {
    id: 'live-cursors-facepile',
    name: 'Facepile',
    htmlTag: '<div>',
    variant: 'Three faces + 2 more',
    summary:
      'The faces of everyone in the file right now, overlapping in a row at the top right. Each ring matches that person’s cursor.',
    aliases: ['avatar stack', 'presence avatars', 'who’s here', 'people bubbles'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overlap',
        value: 'margin-left: -4px · 2px border in the panel color',
        plain: 'Each face tucks under the next; a thin border in the panel’s color keeps their edges apart.',
      },
      {
        kind: 'appearance',
        term: 'Color ring',
        value: 'box-shadow: 0 0 0 1.5px their color',
        plain: 'Ties each face to its cursor on the board.',
      },
      {
        kind: 'behavior',
        term: 'Overflow count',
        value: '+2',
        plain: 'Past three faces the rest become a number, so the pile never outgrows its spot.',
      },
    ],
  },
  {
    id: 'live-cursors-note',
    name: 'Sticky note',
    htmlTag: '<div>',
    variant: 'Paper colors · one being dragged',
    summary:
      'A colored square with a short idea on it, the building block of a brainstorm. Anyone can add, edit or move one.',
    aliases: ['sticky', 'post-it', 'note', 'card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Paper colors',
        value: {
          light: '#ffe38f · #bfecc9 · #c6e1fa · #fcd0e2',
          dark: '#f1d16f · #9fd7ae · #a3c9ee · #efb3cd',
        },
        plain: 'Soft colors with dark ink in both themes, like real paper notes.',
      },
      {
        kind: 'behavior',
        term: 'Lift while dragged',
        value: 'scale(1.04) · rotate(±3deg) · deeper shadow',
        plain:
          'Picked up, it grows a little, leans into the move and casts a bigger shadow; let go, it lands with a small wobble.',
      },
    ],
  },
];
