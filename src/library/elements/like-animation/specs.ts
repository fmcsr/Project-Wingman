import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Like animation element, in the order they appear. `value` fields are the actual values from
 * LikeAnimation.
 */
export const likeAnimationSpecs: UiElementSpec[] = [
  {
    id: 'like-animation',
    name: 'Like button',
    htmlTag: '<button aria-pressed="true">',
    variant: 'Heart + count · liked',
    summary:
      'The heart under a post and the number beside it. One tap likes the post and a second takes it back; the little celebration in between is what makes it feel good to tap.',
    aliases: ['heart button', 'favorite button', 'the little heart', 'like icon', 'heart and number'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Toggle button',
        value: 'aria-pressed · 18px heart (20px where there’s room) · 13px count',
        plain:
          'One button with two states, on and off. Screen readers announce it as pressed or not, the way a light switch is up or down.',
      },
      {
        kind: 'behavior',
        term: 'Press feedback (squash)',
        value: 'scale(0.86, 0.72) · 130ms',
        plain:
          'While the finger or the mouse is down, the empty heart turns red and squashes, wider and flatter, as if it were being pushed.',
      },
      {
        kind: 'behavior',
        term: 'Optimistic update',
        value: 'count +1 at once',
        plain:
          'The heart fills and the number goes up the moment you tap, before the server has answered. If saving fails, it quietly goes back.',
      },
    ],
  },
  {
    id: 'like-animation-burst',
    name: 'Burst',
    htmlTag: '<span aria-hidden="true">',
    variant: 'Ring + 6 dots · 600ms',
    summary:
      'The short pop around the heart when you like something: a ring that blooms and thins out, and a few dots flying off. It plays once and leaves nothing behind.',
    aliases: ['particle burst', 'like explosion', 'heart pop', 'the sparks around the heart', 'confetti'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ring burst',
        value: 'scale(0.3) → scale(0.9) · border-width: 18px → 0 · 420ms',
        plain:
          'A pale pink disc blooms behind the heart and hollows out from the middle as it grows, turning into a thin red ring 32px across that thins away to nothing.',
      },
      {
        kind: 'appearance',
        term: 'Particles',
        value: '6 dots · 4px · 13px → 22px out',
        plain:
          'Six dots spaced evenly around the heart, one straight up, none sideways into the count. They fly outward and shrink to nothing: a few crisp dots, never a shower of glitter.',
      },
      {
        kind: 'behavior',
        term: '@keyframes',
        value: 'dots leave 120ms after the ring · 460ms',
        plain:
          'A short, fixed animation that plays once per like. The dots leave a moment after the ring, so the eye reads the pop as one movement outward.',
      },
    ],
  },
  {
    id: 'like-animation-filled',
    name: 'Filled state',
    htmlTag: '<svg>',
    variant: 'Solid red heart',
    summary:
      'What the heart looks like once you’ve liked the post: solid and red instead of a gray outline, so you can see at a glance what you’ve liked.',
    aliases: ['liked state', 'red heart', 'active state', 'on state', 'the heart turning red'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon swap',
        value: { light: 'outline → fill: #e11d48', dark: 'outline → fill: #fb3a5d' },
        plain:
          'Two drawings of the same heart, an outline and a solid one. Liking swaps one for the other, and the number turns the same red.',
      },
      {
        kind: 'behavior',
        term: 'Pop with overshoot',
        value: 'scale(0.86, 0.72) → scale(1.14, 1.22) → 1 · 520ms',
        plain:
          'The solid heart grows out of the squash, stretches a little past full size and settles back, like something springy landing.',
      },
      {
        kind: 'behavior',
        term: 'Unlike',
        value: 'fade + scale(0.7) · 150ms',
        plain: 'Taking the like back is quiet: the red heart shrinks and fades into the outline, with no burst.',
      },
    ],
  },
  {
    id: 'like-animation-count',
    name: 'Rolling count',
    htmlTag: '<span>',
    variant: '1,284 → 1,285',
    summary:
      'The number of likes beside the heart. When it changes, only the digit that changed rolls to its new value instead of the whole number blinking.',
    aliases: ['like count', 'counter', 'number of likes', 'ticker', 'the number next to the heart'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Digit roll',
        value: 'translateY(-16px) · 300ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain:
          'The last digit sits in a window one line tall. Liking slides the 4 up and out while the 5 rises in from below; unliking rolls it back down.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Every digit is the same width, so the number doesn’t shift sideways while a digit rolls.',
      },
      {
        kind: 'appearance',
        term: 'Color follows state',
        value: { light: '#536471 → #e11d48', dark: '#71767b → #fb3a5d' },
        plain: 'The number is gray while you haven’t liked the post and red once you have, matching the heart.',
      },
    ],
  },
  {
    id: 'like-animation-row',
    name: 'Action row',
    htmlTag: '<div role="group">',
    variant: 'Reply · Repost · Like · Bookmark · Share',
    summary:
      'The row of small actions under a post, each icon with its count. It stays quiet and gray so the post comes first.',
    aliases: ['engagement bar', 'action bar', 'post actions', 'the icons under the post', 'toolbar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'justify-content: space-between',
        value: 'height: 44px · hairlines above and below',
        plain:
          'The actions spread evenly across the post’s width, with thin lines above and below that set the row apart.',
      },
      {
        kind: 'appearance',
        term: 'Hit area',
        value: '14px wider than the icon · 32px around 18px',
        plain:
          'Each icon sits in a bigger invisible circle that takes the tap and tints on hover, so small icons stay easy to hit.',
      },
      {
        kind: 'appearance',
        term: 'Muted until active',
        value: { light: 'color: #536471', dark: 'color: #71767b' },
        plain:
          'Every action is gray until you use it; only then does it take its own color, so the row never shouts.',
      },
    ],
  },
];
