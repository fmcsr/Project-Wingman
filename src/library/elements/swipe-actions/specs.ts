import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Swipe actions element, in the order they appear. `value` fields are the actual values from SwipeActions.
 */
export const swipeActionsSpecs: UiElementSpec[] = [
  {
    id: 'swipe-actions',
    name: 'Swipe actions',
    htmlTag: '<div role="group">',
    variant: 'Trailing · More, Flag, Trash',
    summary:
      'Buttons hidden behind a list row that come into view when you swipe the row sideways: quick actions on one item without opening it.',
    aliases: ['swipe to delete', 'slide actions', 'row actions', 'hidden buttons', 'swipe menu'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Swipe to reveal',
        value: 'translateX(−216px) · 420ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain:
          'Swiping left slides the row aside and uncovers its actions. A swipe back, or a tap anywhere else, closes it again.',
      },
      {
        kind: 'appearance',
        term: 'Full-height buttons',
        value: 'width: 72px · symbol over label',
        plain: 'Each action is a solid block of color as tall as the row, with a white symbol and a one-word label.',
      },
      {
        kind: 'appearance',
        term: 'Color by meaning',
        value: { light: '#8e8e93 · #ff9500 · #ff3b30', dark: '#8e8e93 · #ff9f0a · #ff453a' },
        plain: 'Gray for More, orange for Flag, red for Trash, so the eye finds the right one before reading it.',
      },
    ],
  },
  {
    id: 'swipe-actions-destructive',
    name: 'Destructive action',
    htmlTag: '<button>',
    variant: 'Trash · full swipe',
    summary:
      'The red action at the far end of the row. Swiping all the way across fires it without a tap: the red stretches over the row and the row is gone.',
    aliases: ['delete button', 'trash', 'the red one', 'swipe to delete'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Destructive role',
        value: { light: '#ff3b30', dark: '#ff453a' },
        plain:
          'System red marks the action that removes something, and it sits at the very end, furthest from a casual swipe.',
      },
      {
        kind: 'behavior',
        term: 'Full swipe',
        value: 'translateX(−100%) · 420ms',
        plain:
          'Keep swiping past the buttons and the red one stretches across the row, its symbol riding along at the edge, and fires on its own.',
      },
      {
        kind: 'behavior',
        term: 'Row removal',
        value: 'translateY(−71px) · 380ms',
        plain: 'The deleted row disappears and the rows below slide up to close the gap.',
      },
    ],
  },
  {
    id: 'swipe-actions-leading',
    name: 'Leading swipe action',
    htmlTag: '<button>',
    variant: 'Unread',
    summary:
      'The action on the other side of the row, revealed by swiping right: here it marks a message as unread again.',
    aliases: ['swipe right', 'mark as unread', 'left action'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tint',
        value: { light: '#007aff', dark: '#0a84ff' },
        plain: 'System blue, the color of the unread dot it brings back.',
      },
      {
        kind: 'appearance',
        term: 'One button wide',
        value: 'width: 76px · translateX(76px)',
        plain: "With a single action, the row only moves aside by that one button's width.",
      },
      {
        kind: 'behavior',
        term: 'Toggle',
        plain: 'On a read message it says Unread, on an unread one Read: the same swipe always flips the state.',
      },
    ],
  },
  {
    id: 'swipe-actions-row',
    name: 'List row',
    htmlTag: '<li>',
    variant: 'Message',
    summary: 'One message in the inbox: who sent it, the subject, the start of the text and when it arrived.',
    aliases: ['cell', 'list item', 'message row', 'email'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three lines',
        value: '16px · 600 / 14.5px / 14.5px',
        plain: 'The sender in bold, the subject in regular text, then a gray preview cut short with an ellipsis.',
      },
      {
        kind: 'appearance',
        term: 'Disclosure indicator',
        value: 'chevron · 7 × 11px',
        plain: 'The small gray arrow after the time says the row opens something.',
      },
      {
        kind: 'appearance',
        term: 'Inset separator',
        value: 'left: 28px · 0.5px',
        plain: 'The hairline between rows starts where the text starts, leaving the margin to the unread dot.',
      },
    ],
  },
  {
    id: 'swipe-actions-unread-dot',
    name: 'Unread indicator',
    variant: 'Blue dot',
    summary: "The blue dot in the margin of a message you haven't opened yet.",
    aliases: ['blue dot', 'new message dot', 'unread badge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dot',
        value: { light: '10px · #007aff', dark: '10px · #0a84ff' },
        plain: "A small circle in the system blue, level with the sender's name.",
      },
      {
        kind: 'behavior',
        term: 'Clears on open',
        plain: 'Opening the message takes the dot away; the leading swipe action can bring it back.',
      },
    ],
  },
];
