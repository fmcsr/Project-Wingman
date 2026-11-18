import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Drag and drop element, in the order they appear. `value` fields are the actual values from DragAndDrop.
 */
export const dragAndDropSpecs: UiElementSpec[] = [
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
