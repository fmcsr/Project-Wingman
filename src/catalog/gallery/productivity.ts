import type { UiElementSpec } from '../types';

/**
 * Elements in the gallery's productivity tiles: command palette, live cursors, mention menu and drag and drop.
 * `value` fields are the tiles' actual values (src/landing/gallery/).
 */
export const productivityGallery: UiElementSpec[] = [
  {
    id: 'command-palette',
    name: 'Command palette',
    htmlTag: '<div role="dialog">',
    variant: '⌘K · over an issue list',
    summary:
      'A search box that opens over the whole app with a shortcut (⌘K) and runs any command by name: type a few letters, pick a result, press Enter. No menus, no mouse.',
    aliases: ['⌘K menu', 'command menu', 'quick actions', 'the search-everything box', 'spotlight for the app'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating dialog',
        value: 'width: min(560px, 90%) · border-radius: 12px',
        plain:
          'A card centered across the app but placed high, not in the middle, so the results have room to grow downward.',
      },
      {
        kind: 'appearance',
        term: 'Elevation',
        value: 'box-shadow: 0 24px 72px -12px',
        plain: 'A big, soft shadow lifts the palette off the dimmed app, so it reads as the one thing in front.',
      },
      {
        kind: 'behavior',
        term: 'Open and close',
        value: 'scale(0.98) → 1 + fade · 150ms in, 120ms out',
        plain: 'It appears in a blink, fading in as it grows the last 2%, and leaves a little faster than it came.',
      },
      {
        kind: 'behavior',
        term: 'Context chip',
        value: 'WEB-218',
        plain: 'Opened on an issue, it names that issue above the input: commands like Assign act on it.',
      },
    ],
  },
  {
    id: 'command-palette-input',
    name: 'Search input',
    htmlTag: '<input role="combobox">',
    variant: 'Query "assign" · filters as you type',
    summary:
      'The field at the top of the palette. Every letter filters the list below right away; there is no search button and no Enter to press.',
    aliases: ['search bar', 'search field', 'filter box', 'the box you type in'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: '"Type a command or search…"',
        plain: 'Gray hint text that says what the field is for and disappears with the first letter.',
      },
      {
        kind: 'appearance',
        term: 'caret-color',
        value: { light: '#3a63d8', dark: '#7393ff' },
        plain: 'The blinking text cursor takes the app’s blue, a small sign that the field is ready for typing.',
      },
      {
        kind: 'behavior',
        term: 'Filter as you type',
        value: 'a → 8 results · assign → 5',
        plain:
          'The list narrows with every key: "a" still matches eight commands, "assign" five. Matches can be anywhere, so "Reassign reviewers" shows up too.',
      },
    ],
  },
  {
    id: 'command-palette-group',
    name: 'Group heading',
    htmlTag: '<div role="group">',
    variant: 'Suggestions · Issues · Navigation',
    summary: 'A small gray label that sorts the results by kind: things you can do, issues that match, places to go.',
    aliases: ['section label', 'category', 'result group', 'subheader'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Muted label',
        value: { light: '11.5px · 500 · #8b8e97', dark: '11.5px · 500 · #6f727b' },
        plain: 'Small and gray, so it organizes the list without competing with the results.',
      },
      {
        kind: 'behavior',
        term: 'Empty groups hide',
        plain:
          'A group with no matches disappears, heading and all. Before anything is typed there is no Issues group; "assign" brings one in.',
      },
    ],
  },
  {
    id: 'command-palette-shortcut',
    name: 'Keyboard shortcut hint',
    htmlTag: '<kbd>',
    variant: 'One key · a sequence · a chord',
    summary:
      'Key caps at the end of a row, showing how to run that command without opening the palette at all. Using the palette is how people learn them.',
    aliases: ['hotkey', 'key combo', 'keyboard hint', 'the little keys on the right'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Key cap',
        value: 'height: 20px · border-radius: 5px · 1px border',
        plain: 'Each key in its own small bordered box, like the key on the keyboard.',
      },
      {
        kind: 'appearance',
        term: 'Sequence and chord',
        value: '"G then I" · "⌘ ⇧ P"',
        plain:
          '"G then I" means press G, let go, then press I. Keys side by side with no "then" are held down together.',
      },
      {
        kind: 'behavior',
        term: 'Global hotkey',
        value: 'works anywhere in the app',
        plain:
          'The same keys run the command without the palette, from any screen. The palette is where you learn them.',
      },
    ],
  },
  {
    id: 'command-palette-active',
    name: 'Highlighted option',
    htmlTag: '<div role="option" aria-selected="true">',
    variant: 'Neutral fill · moves with ↑ ↓',
    summary:
      'The row Enter will run. The arrow keys move the highlight, and it goes back to the first result whenever the query changes.',
    aliases: ['selected row', 'active item', 'current option', 'the gray bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight fill',
        value: { light: 'background: #f0f0f3 · border-radius: 8px', dark: 'background: #2a2b31 · border-radius: 8px' },
        plain: 'A soft gray rounded bar rather than a color: it marks the row without shouting.',
      },
      {
        kind: 'behavior',
        term: 'aria-activedescendant',
        value: '↑ ↓ move · ↵ runs',
        plain:
          'The typing focus stays in the input while the arrows move the highlight, so you can keep typing and still choose.',
      },
      {
        kind: 'behavior',
        term: 'Confirm flash',
        value: '240ms · blue tint',
        plain: 'On Enter the row flashes blue for a moment before the palette closes, so you see what ran.',
      },
    ],
  },
  {
    id: 'command-palette-scrim',
    name: 'Scrim',
    htmlTag: '<div>',
    variant: 'Dims the app behind',
    summary:
      'A see-through dark layer over the whole app while the palette is open. It pushes everything else back, and a click on it closes the palette.',
    aliases: ['backdrop', 'overlay', 'dimmed background', 'modal background'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Translucent black',
        value: { light: 'rgb(17 18 22 / 0.3)', dark: 'rgb(0 0 0 / 0.55)' },
        plain: 'Black at about a third in light mode, stronger in dark mode, where the app is already dark.',
      },
      {
        kind: 'behavior',
        term: 'Fade',
        value: 'opacity · 150ms',
        plain: 'It fades in and out with the palette instead of popping.',
      },
      {
        kind: 'behavior',
        term: 'Click outside to close',
        plain:
          'A click anywhere on the scrim closes the palette, like Esc; the app underneath is out of reach until then.',
      },
    ],
  },
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
  {
    id: 'mention-menu',
    name: 'Mention menu',
    htmlTag: '<div role="listbox">',
    variant: 'People · narrowed by "ma"',
    summary:
      'The list that pops up when you type "@" in a message: the people you can mention, narrowed down with every letter. Picking one notifies them.',
    aliases: ['@ menu', 'autocomplete', 'people picker', 'typeahead', 'tag someone'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating list',
        value: '6px above the composer · as wide as it · border-radius: 8px',
        plain:
          'It floats over the conversation right above where you type, with a soft shadow, and covers what’s behind it.',
      },
      {
        kind: 'behavior',
        term: 'Typeahead filter',
        value: '"@" 9 people · "m" 4 · "ma" 2',
        plain:
          'Each letter after the @ narrows the list: first names that start with it come first, then last names. It shows three at a time.',
      },
      {
        kind: 'behavior',
        term: 'Open and close',
        value: 'fade + 4px rise · 120ms',
        plain: 'It appears the moment you type @ and closes as soon as you pick someone.',
      },
    ],
  },
  {
    id: 'mention-menu-option',
    name: 'Highlighted suggestion',
    htmlTag: '<div role="option" aria-selected="true">',
    variant: 'First match · solid blue',
    summary: 'The person Enter will pick. It starts on the first match, and the arrow keys move it up and down.',
    aliases: ['selected row', 'top suggestion', 'active option', 'the blue row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Solid highlight',
        value: { light: 'background: #1a64b0 · color: #fff', dark: 'background: #1b5c9e · color: #fff' },
        plain: 'The row fills with the chat’s blue and its text turns white, so it’s clear who Enter will pick.',
      },
      {
        kind: 'appearance',
        term: 'Two-line row',
        value: 'name 13px · 600 / role 11px',
        plain: 'Face, name and role, so you pick the right person when two names look alike.',
      },
      {
        kind: 'behavior',
        term: 'Pick with the keyboard',
        value: '↑ ↓ to move · ↵ or ⇥ to pick',
        plain: 'Your hands stay on the keys: Enter inserts the highlighted person and you keep typing.',
      },
    ],
  },
  {
    id: 'mention-menu-chip',
    name: 'Mention chip',
    htmlTag: '<span contenteditable="false">',
    variant: '@Clara Weiss · @Marcus Lee',
    summary:
      'A finished mention: the person’s name in a tinted pill inside the text. It acts as one piece, and that person gets a notification.',
    aliases: ['@mention', 'tag', 'pill', 'user token'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tinted pill',
        value: {
          light: 'background: #e6f0fa · color: #1a64b0',
          dark: 'background: rgb(75 163 227 / 0.16) · color: #74b9ee',
        },
        plain: 'The name in the chat’s blue on a pale blue ground with 4px corners: clearly a person, not just text.',
      },
      {
        kind: 'behavior',
        term: 'Atomic token',
        plain: 'One Backspace removes the whole name, and the caret can’t land in the middle of it.',
      },
      {
        kind: 'behavior',
        term: 'Insert with a space',
        value: '"@ma" → "@Marcus Lee "',
        plain:
          'Picking someone swaps what you typed for their full name plus a space, so you can keep writing. The new chip flashes a shade darker for a moment.',
      },
    ],
  },
  {
    id: 'mention-menu-query',
    name: 'Trigger character',
    htmlTag: '<span>',
    variant: '"@" + "ma"',
    summary:
      'The "@" that opens the menu and the letters typed after it, which names are matched against. Until a person is picked it’s just text.',
    aliases: ['at sign', '@ symbol', 'mention query', 'what you typed after the @'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pending style',
        value: { light: 'color: #1a64b0', dark: 'color: #4ba3e3' },
        plain: 'Blue while the menu is open: a hint that it’s about to become a mention.',
      },
      {
        kind: 'behavior',
        term: 'Trigger',
        value: '"@" at the start of a word',
        plain: 'The menu opens only when @ starts a word, so typing an email address doesn’t set it off.',
      },
    ],
  },
  {
    id: 'mention-menu-composer',
    name: 'Message composer',
    htmlTag: '<div role="textbox" contenteditable>',
    variant: 'Thread reply · with toolbar',
    summary:
      'The box where you write: the text on top, buttons to attach, format and add emoji below, and send on the right.',
    aliases: ['message box', 'reply box', 'chat input', 'text field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bordered box',
        value: {
          light: 'border: 1px solid #bdbcbe · border-radius: 8px',
          dark: 'border: 1px solid #565856 · border-radius: 8px',
        },
        plain: 'A rounded box with a thin gray border that holds the text and its toolbar together.',
      },
      {
        kind: 'appearance',
        term: 'Toolbar',
        value: '16px icons · send 28 × 24px',
        plain: 'Attach, format, emoji and mention on the left, the filled send button on the right.',
      },
      {
        kind: 'behavior',
        term: 'Auto-grow',
        value: '+19px a line',
        plain: 'It gets taller as the message wraps instead of scrolling, and the thread above makes room.',
      },
    ],
  },
  {
    id: 'drag-and-drop',
    name: 'Drag and drop',
    htmlTag: '<div>',
    variant: 'Kanban card · Backlog → In progress',
    summary:
      'Moving something by picking it up and putting it down elsewhere. On a board, dragging a card to another column changes its status, and the cards around it make room.',
    aliases: ['drag', 'move a card', 'reorder', 'kanban board'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Kanban columns',
        value: 'border-radius: 12px columns · 68px cards, 10px apart',
        plain: 'Rounded gray columns side by side, each a stack of white cards; the column a card is in is its status.',
      },
      {
        kind: 'behavior',
        term: 'Pick up',
        value: '180ms · scale(1.03) rotate(2.5deg)',
        plain: 'The card lifts the moment it’s grabbed, so you know you’re holding it.',
      },
      {
        kind: 'behavior',
        term: 'Make room',
        value: 'cards slide · 260ms',
        plain:
          'The column you leave closes the gap and the one you’re over opens a space, so the board always shows what letting go will do.',
      },
      {
        kind: 'behavior',
        term: 'Settle on drop',
        value: 'cubic-bezier(0.34, 1.5, 0.64, 1) · 420ms',
        plain: 'Let go and the card springs into place with a tiny overshoot, and both column counts update.',
      },
    ],
  },
  {
    id: 'drag-and-drop-card',
    name: 'Drag preview',
    htmlTag: '<div>',
    variant: 'Lifted · tilted 2.5°',
    summary:
      'The card in your hand while you drag: lifted off the board, a little tilted, with a deeper shadow. It follows the pointer until you let go.',
    aliases: ['dragged card', 'drag ghost', 'drag image', 'the card in your hand'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Lift',
        value: 'scale(1.03) · rotate(2.5deg)',
        plain: 'A touch bigger and slightly crooked, like a card picked up off a table.',
      },
      {
        kind: 'appearance',
        term: 'Deeper shadow',
        value: 'box-shadow: 0 16px 30px -6px',
        plain: 'A larger, softer shadow puts it above everything else on the board.',
      },
      {
        kind: 'behavior',
        term: 'Follows the pointer',
        value: 'held where it was grabbed',
        plain: 'It stays under the hand at the spot you picked it up, so it never jumps to center itself.',
      },
    ],
  },
  {
    id: 'drag-and-drop-placeholder',
    name: 'Drop indicator',
    htmlTag: '<div>',
    variant: 'Dashed placeholder · the card’s size',
    summary:
      'A dashed outline the size of the card, showing exactly where it will land if you let go now. The cards below slide down to make room for it.',
    aliases: ['placeholder', 'drop target', 'landing spot', 'ghost slot'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dashed outline',
        value: { light: '1.5px dashed #4f55d9 · 8% fill', dark: '1.5px dashed #8a8ff7 · 8% fill' },
        plain: 'An empty, card-sized space with a dashed border in the board’s indigo.',
      },
      {
        kind: 'behavior',
        term: 'Preview of the result',
        value: 'fades in over 160ms',
        plain:
          'It shows up in whichever column the card is over, and moves with it, so you see the result before you let go.',
      },
    ],
  },
  {
    id: 'drag-and-drop-handle',
    name: 'Drag handle',
    htmlTag: '<span>',
    variant: 'Six-dot grip · shows under the pointer',
    summary:
      'Six small dots on the card’s edge that say "you can move this". They appear when the pointer is on the card.',
    aliases: ['grip', 'grabber', 'six dots', 'drag dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Grip dots',
        value: '2 × 3 dots · 3px · 2px apart',
        plain: 'A small grid of dots, the common sign for something you can pick up and move.',
      },
      {
        kind: 'behavior',
        term: 'Shows on hover',
        value: 'opacity 0 → 1 · 150ms',
        plain: 'Hidden until the pointer is on the card, so a board full of cards stays calm.',
      },
      {
        kind: 'behavior',
        term: 'cursor: grabbing',
        value: 'a closed hand while held',
        plain: 'While a card is held, the pointer turns into a closed hand.',
      },
    ],
  },
  {
    id: 'drag-and-drop-zone',
    name: 'Drop zone',
    htmlTag: '<div>',
    variant: 'Column · tinted while a card is over it',
    summary:
      'A place that accepts a dropped card: here, every column. The one under the card you’re holding lights up.',
    aliases: ['drop target', 'column', 'lane', 'list'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight',
        value: {
          light: 'color-mix(in oklab, #4f55d9 10%, #ebedf0)',
          dark: 'color-mix(in oklab, #8a8ff7 10%, #202327)',
        },
        plain: 'The column takes on a tint of the board’s indigo while a card hovers over it.',
      },
      {
        kind: 'behavior',
        term: 'Counts update',
        value: 'Backlog 8 → 7 · In progress 3 → 4',
        plain: 'The counts in the column headers change the moment the card lands.',
      },
    ],
  },
];
