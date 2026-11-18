import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Read receipts element, in the order they appear. `value` fields are the actual values from
 * ReadReceipts.
 */
export const readReceiptsSpecs: UiElementSpec[] = [
  {
    id: 'read-receipts',
    name: 'Read receipt',
    htmlTag: '<span role="status">',
    variant: 'Read · 9:41',
    summary:
      'The small line under your last message that tells you how far it got: still sending, sent, delivered to their phone, or opened and read.',
    aliases: ['seen', 'delivery status', 'message status', 'blue ticks', 'read status'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Delivery states',
        value: 'Sending… → Sent → Delivered → Read',
        plain:
          'It moves forward one step at a time as the message travels: on its way, on the server, on their phone, opened.',
      },
      {
        kind: 'appearance',
        term: 'Status caption',
        value: '11px · secondary gray · right-aligned',
        plain: 'Small gray text tucked under the bubble, so it informs without competing with the conversation.',
      },
      {
        kind: 'behavior',
        term: 'Latest message only',
        value: 'under the last sent bubble',
        plain: 'Only your most recent message carries the status; on every message it would just repeat itself.',
      },
    ],
  },
  {
    id: 'read-receipts-bubble',
    name: 'Sent message bubble',
    htmlTag: '<div>',
    variant: 'Outgoing · blue · with tail',
    summary:
      'Your message, on the right in the accent color. Theirs sit on the left in gray, so the conversation reads at a glance.',
    aliases: ['chat bubble', 'message bubble', 'blue bubble', 'outgoing message'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bubble',
        value: {
          light: 'background: #007aff · border-radius: 17px',
          dark: 'background: #0a84ff · border-radius: 17px',
        },
        plain: 'A rounded box of color around the text, white letters on blue.',
      },
      {
        kind: 'appearance',
        term: 'Tail',
        value: '16px curl at the bottom corner',
        plain: 'A little hook at the bottom corner points to the speaker’s side, like a speech bubble’s.',
      },
      {
        kind: 'behavior',
        term: 'Send animation',
        value: 'thread scrolls up · 450ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain: 'The new message comes in at the bottom and the conversation moves up to make room.',
      },
    ],
  },
  {
    id: 'read-receipts-ticks',
    name: 'Status ticks',
    variant: 'Clock → ✓ → ✓✓ → blue ✓✓',
    summary:
      'Marks that show the message’s progress without words: a clock while it sends, one tick once it’s sent, two when it reaches their phone, blue when it’s read.',
    aliases: ['check marks', 'double ticks', 'blue ticks', 'delivery ticks'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tick icons',
        value: '17 × 11px · 1.5px stroke',
        plain: 'Thin check marks in the text’s gray, the second tucked behind the first.',
      },
      {
        kind: 'behavior',
        term: 'Read color',
        value: { light: 'color: #007aff', dark: 'color: #0a84ff' },
        plain: 'Both ticks turn blue when the message is opened: the one change people watch for.',
      },
      {
        kind: 'behavior',
        term: 'Step in',
        value: 'fade + 2px slide · 200ms',
        plain: 'Each new tick fades in, the second sliding in beside the first.',
      },
    ],
  },
  {
    id: 'read-receipts-state',
    name: 'Read state',
    htmlTag: '<span>',
    variant: 'Read',
    summary:
      'The word that names the last step reached. Read means they opened the conversation, not that they’ve answered.',
    aliases: ['seen', 'opened', 'read indicator', 'read label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emphasis',
        value: '11px · 600',
        plain: 'Read is set a little bolder than the time beside it, so the state is what you take in first.',
      },
      {
        kind: 'behavior',
        term: 'Can be turned off',
        value: 'stops at Delivered',
        plain: 'Most chat apps let people switch read receipts off; their status then never goes past Delivered.',
      },
    ],
  },
  {
    id: 'read-receipts-time',
    name: 'Read timestamp',
    htmlTag: '<time>',
    variant: '9:41',
    summary: 'When the message was opened, in the phone’s own time format.',
    aliases: ['seen at', 'read time', 'time stamp'],
    concepts: [
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Equal-width digits, so times line up and don’t jiggle when they change.',
      },
      {
        kind: 'behavior',
        term: 'Only once read',
        value: 'shown with Read',
        plain: 'Sending, Sent and Delivered come without a time; the moment it was read is the one worth stating.',
      },
    ],
  },
  {
    id: 'read-receipts-typing',
    name: 'Typing indicator',
    htmlTag: '<div role="status">',
    variant: 'Three dots · thought-bubble tail',
    summary:
      'The gray bubble with three pulsing dots that shows the other person is writing right now. Their reply takes its place.',
    aliases: ['typing bubble', 'the three dots', 'is typing…', 'writing indicator'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dots',
        value: '3 × 8px · 4px apart · 36px bubble',
        plain: 'Three gray dots in a small bubble on their side, with two tiny circles for a tail like a thought bubble.',
      },
      {
        kind: 'behavior',
        term: 'Wave',
        value: 'opacity 0.35 → 0.95 · 1.2s · 0.15s apart',
        plain: 'The dots brighten one after another, left to right, so it looks alive without being loud.',
      },
      {
        kind: 'behavior',
        term: 'Replaced by the reply',
        value: 'crossfade · 350ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain: 'When their message arrives, it appears right where the dots were.',
      },
    ],
  },
];
