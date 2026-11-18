import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Reading progress element, in the order they appear. `value` fields are the actual values from
 * ReadingProgress.
 */
export const readingProgressSpecs: UiElementSpec[] = [
  {
    id: 'reading-progress-time',
    name: 'Time left',
    htmlTag: '<span>',
    variant: '4 min left · counts down',
    summary:
      'An estimate of how many minutes of reading remain, updated as you scroll. It turns a long page into something you can size up.',
    aliases: ['read time', 'minutes left', 'reading time estimate', 'the 4 min left'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Reading time',
        value: '≈ 238 words a minute · rounded up',
        plain: 'The words still ahead divided by an average reading speed: 10 minutes at the top, 4 once 60% is read.',
      },
      {
        kind: 'appearance',
        term: 'Quiet meta text',
        value: { light: '12.5px · #6b6b6b', dark: '12.5px · #a8a8a8' },
        plain: 'Small and gray with a clock icon, in the sticky header: there when you look for it, never in the way.',
      },
      {
        kind: 'behavior',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Digits of equal width, so the label doesn’t shift as the number counts down.',
      },
    ],
  },
  {
    id: 'reading-progress',
    name: 'Reading progress bar',
    htmlTag: '<div role="progressbar">',
    variant: '3px · under the sticky header',
    summary:
      'A thin line that fills from left to right as you scroll through the article, so you always see how far you are and how much is left.',
    aliases: ['scroll progress bar', 'reading indicator', 'progress line', 'the line at the top that fills up'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Progress line',
        value: { light: 'height: 3px · #d6336c', dark: 'height: 3px · #f06595' },
        plain: 'A 3px line in the site’s accent along the header’s bottom edge; the part still to read is simply empty.',
      },
      {
        kind: 'behavior',
        term: 'Scroll-linked',
        value: 'transform: scaleX(0.6) · animation-timeline: scroll()',
        plain:
          'Its length follows the scroll position: 60% down the article, 60% of the line. Modern CSS can tie the two together without any script.',
      },
      {
        kind: 'behavior',
        term: 'Article only',
        value: 'from the title to the last paragraph',
        plain:
          'It measures the article, not the comments and footer under it, so it reaches the end when the reading does.',
      },
    ],
  },
  {
    id: 'reading-progress-top',
    name: 'Back-to-top button',
    htmlTag: '<button aria-label="Back to top">',
    variant: 'Floating · comes in after 25%',
    summary:
      'A round button that floats in the corner once a quarter of the article is read, and takes you back to the top in one click.',
    aliases: ['scroll to top', 'floating action button', 'up arrow button', 'jump to top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating button',
        value: '40px circle · shadow 0 4px 12px',
        plain: 'A small round button over the text in the bottom-right corner, lifted by a shadow so it’s clearly on top.',
      },
      {
        kind: 'behavior',
        term: 'Show threshold',
        value: 'after 25% · fade + scale from 0.85 in 200ms',
        plain:
          'It stays away at the top of the page, where it would be no use, and comes in once there’s a real way back.',
      },
      {
        kind: 'behavior',
        term: 'Smooth scroll',
        value: 'scroll-behavior: smooth · 800ms',
        plain:
          'A click glides the article back to the top instead of jumping, so you see where you came from; the button leaves as it starts.',
      },
    ],
  },
  {
    id: 'reading-progress-ring',
    name: 'Progress ring',
    htmlTag: '<svg>',
    variant: 'Around the button · 60%',
    summary:
      'A ring around the back-to-top button that fills with the same progress as the bar: how far down you are, right where your thumb or pointer is.',
    aliases: ['circular progress', 'progress circle', 'radial progress', 'the ring around the button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ring',
        value: { light: '2.5px stroke · #d6336c on a gray track', dark: '2.5px stroke · #f06595 on a gray track' },
        plain: 'A thin colored arc on a faint gray circle, starting at twelve o’clock and going clockwise.',
      },
      {
        kind: 'behavior',
        term: 'stroke-dashoffset',
        value: 'pathLength 100 · offset 40 at 60%',
        plain:
          'The arc is a circle drawn as a single dash that grows with the progress: at 60% read, 60 of its 100 units are drawn.',
      },
      {
        kind: 'behavior',
        term: 'In step with the bar',
        value: 'same 600ms scroll easing',
        plain: 'Ring and bar fill together as the page moves, so both always show the same number.',
      },
    ],
  },
];
