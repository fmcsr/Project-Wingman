import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Pull to refresh element, in the order they appear. `value` fields are the actual values from
 * PullToRefresh.
 */
export const pullToRefreshSpecs: UiElementSpec[] = [
  {
    id: 'pull-to-refresh',
    name: 'Pull to refresh',
    htmlTag: '<div role="status">',
    variant: 'Refresh control · above the large title',
    summary:
      'Dragging the top of a list down to load what’s new. A gap opens above the list with a spinner in it, and pulling far enough starts the refresh.',
    aliases: ['refresh control', 'swipe down to refresh', 'pull down to reload', 'drag to update', 'the spinner at the top'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Rubber band',
        value: 'offset = (1 − 1 ∕ (0.55 × pull ∕ 480 + 1)) × 480',
        plain:
          'The list moves about half as far as your finger, and less the further you pull, so it feels like stretching an elastic band rather than scrolling.',
      },
      {
        kind: 'behavior',
        term: 'Threshold',
        value: '134px of pull · the eighth spoke',
        plain:
          'The point where a pull turns into a refresh. Once the last spoke is in, loading starts, even before you let go, and a phone gives a light tap you can feel. Stop short and the list springs back with nothing loaded.',
      },
      {
        kind: 'behavior',
        term: 'Refreshing state',
        value: 'rests 56px down · 450ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain:
          'When you let go, the list springs back just far enough to keep the spinner in view. Once the new mail is in, it closes the gap.',
      },
    ],
  },
  {
    id: 'pull-to-refresh-spinner',
    name: 'Activity indicator',
    htmlTag: '<div role="progressbar">',
    variant: '8 spokes · drawn by the pull',
    summary:
      'The little wheel of spokes that says the app is working. Here it builds up spoke by spoke as you pull, so you can see how much further to go.',
    aliases: ['spinner', 'loading wheel', 'throbber', 'busy indicator', 'the spinning thing'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Spokes',
        value: '8 × 2.75 × 7px · 24px across',
        plain: 'Eight rounded bars around a circle in a quiet gray, small enough to sit in the gap above the title.',
      },
      {
        kind: 'behavior',
        term: 'Progressive reveal',
        value: 'one spoke per 13px of pull, clockwise from 12 o’clock',
        plain: 'Each bit of pulling adds a spoke, like a clock filling up. A full wheel means the refresh is on.',
      },
      {
        kind: 'behavior',
        term: 'Spin',
        value: 'steps(8) · 1s a turn',
        plain:
          'Once loading starts, the spokes shade from dark to light and the wheel turns a spoke at a time: the classic iOS spinner.',
      },
      {
        kind: 'behavior',
        term: 'Shrink away',
        value: 'scale(0.5) · opacity: 0 · 300ms',
        plain: 'When the new mail is in, the spinner shrinks and fades as the list closes over it.',
      },
    ],
  },
  {
    id: 'pull-to-refresh-new-row',
    name: 'Inserted row',
    htmlTag: '<li>',
    variant: 'New message · tinted',
    summary:
      'The message the refresh brought in. It slides in at the top and pushes the others down, tinted for a moment so the eye catches what changed.',
    aliases: ['new item', 'new message', 'fresh row', 'the new one at the top'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Insert animation',
        value: 'translateY(−92px) → 0 · 450ms cubic-bezier(0.32, 0.72, 0, 1)',
        plain: 'The rows below move down by one row as it slides in from under the title, so nothing jumps.',
      },
      {
        kind: 'appearance',
        term: 'Highlight',
        value: {
          light: 'background: rgb(0 122 255 / 0.1) · fades over 900ms',
          dark: 'background: rgb(10 132 255 / 0.2) · fades over 900ms',
        },
        plain: 'A pale wash of blue marks the new row for a second, then fades to the plain list.',
      },
      {
        kind: 'appearance',
        term: 'Unread indicator',
        value: { light: '10px dot · #007aff', dark: '10px dot · #0a84ff' },
        plain: 'The blue dot in the margin says it hasn’t been opened yet.',
      },
    ],
  },
  {
    id: 'pull-to-refresh-timestamp',
    name: 'Last updated status',
    htmlTag: '<span role="status">',
    variant: 'Updated just now · 3 unread',
    summary:
      'The line in the toolbar that says how fresh the list is: when it last checked, or that it’s checking right now.',
    aliases: ['last updated', 'sync status', 'updated just now', 'freshness label', 'the text at the bottom'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Relative time',
        value: 'Updated 12 minutes ago → Checking for mail… → Updated just now',
        plain:
          'It gives the time in words, counted from now, and says Checking for mail… while the refresh runs, so you know whether to wait.',
      },
      {
        kind: 'appearance',
        term: 'Toolbar caption',
        value: '12px over 11px in secondary gray',
        plain: 'Small text centered between the toolbar’s buttons, with the unread count in gray beneath it.',
      },
      {
        kind: 'behavior',
        term: 'Counts that agree',
        value: '2 unread → 3 unread',
        plain: 'The unread count goes up by the one message that arrived, so the toolbar and the list tell the same story.',
      },
    ],
  },
];
