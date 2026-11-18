import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Character counter element, in the order they appear. `value` fields are the actual values from
 * CharacterCounter.
 */
export const characterCounterSpecs: UiElementSpec[] = [
  {
    id: 'character-counter-composer',
    name: 'Composer',
    htmlTag: '<div contenteditable>',
    variant: 'Post · 280 characters',
    summary:
      'The box where a post is written, with your avatar beside it and the tools to add a photo, a GIF or a poll under it.',
    aliases: ['text box', 'post box', 'editor', 'what’s happening box', 'the place you type'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Auto-growing text area',
        value: '15px / 20px · last 5 lines shown',
        plain:
          'The box grows with the text up to a height, then scrolls to keep the line you’re typing in view, as it does here with the start of the post.',
      },
      {
        kind: 'appearance',
        term: 'Reply setting',
        value: { light: 'color: #1a7fe6 · 13px · 700', dark: 'color: #3b97f5 · 13px · 700' },
        plain: '“Everyone can reply” under the text says who can answer, and opens a menu to change it.',
      },
      {
        kind: 'behavior',
        term: 'Character limit',
        value: '280',
        plain:
          'The longest a post can be. The text past it isn’t cut off as you type: you can keep writing, but you can’t post until it fits.',
      },
    ],
  },
  {
    id: 'character-counter',
    name: 'Counter ring',
    htmlTag: '<svg role="progressbar">',
    variant: 'Amber · 12 left',
    summary:
      'A small ring by the Post button that fills as you write, so you can feel how long the post is getting without reading a number.',
    aliases: ['progress ring', 'character count circle', 'the little circle', 'length meter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'stroke-dashoffset',
        value: 'circumference × (1 − characters ÷ 280)',
        plain:
          'The ring is a circle with a dashed outline whose one dash is as long as the post: the further you get, the more of the circle it covers.',
      },
      {
        kind: 'behavior',
        term: 'Grows near the limit',
        value: '20px → 30px within 20 · 200ms',
        plain:
          'Far from the limit it stays small and quiet. Within 20 characters it grows to make room for a number and catch your eye.',
      },
      {
        kind: 'appearance',
        term: 'Threshold colors',
        value: {
          light: '#1a7fe6 → #e8a200 at 20 left → #e5283c past 0',
          dark: '#3b97f5 → #ffc233 at 20 left → #ff4d5e past 0',
        },
        plain: 'Blue while there’s room, amber close to the limit, red once you’re over it.',
      },
    ],
  },
  {
    id: 'character-counter-count',
    name: 'Remaining count',
    htmlTag: '<span>',
    variant: '12 · goes negative past the limit',
    summary:
      'The number inside the ring: how many characters you have left. It only shows near the limit, and goes below zero when you’re over.',
    aliases: ['characters left', 'character count', 'the number in the circle', 'countdown'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Count down, not up',
        value: '280 − characters',
        plain:
          'It counts what’s left rather than what’s used, so the number that matters is the one you see: 12 means twelve more.',
      },
      {
        kind: 'appearance',
        term: 'Negative count',
        value: { light: '−7 · color: #e5283c', dark: '−7 · color: #ff4d5e' },
        plain: 'Past the limit it shows how many to cut, in red, like −7.',
      },
    ],
  },
  {
    id: 'character-counter-overflow',
    name: 'Overflow highlight',
    htmlTag: '<mark>',
    variant: 'Characters past 280',
    summary:
      'Everything you’ve written past the limit, tinted red, so you can see exactly what has to go instead of guessing.',
    aliases: ['over the limit text', 'excess highlight', 'the red part', 'too long marker'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight',
        value: {
          light: 'background: color-mix(#e5283c 22%, transparent)',
          dark: 'background: color-mix(#ff4d5e 22%, transparent)',
        },
        plain: 'A pale red background behind the extra characters, like a marker pen, starting at the 281st character.',
      },
      {
        kind: 'behavior',
        term: 'Character-exact',
        value: 'from character 281, even mid-word',
        plain:
          'It starts at the exact character, even in the middle of a word, and shrinks as you delete until it’s gone.',
      },
    ],
  },
  {
    id: 'character-counter-post',
    name: 'Post button',
    htmlTag: '<button disabled>',
    variant: 'Disabled past the limit',
    summary:
      'The button that publishes the post. It goes gray and stops working while the post is over the limit, and comes back as soon as it fits.',
    aliases: ['submit button', 'publish', 'send button', 'tweet button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill button',
        value: {
          light: 'background: #0f1419 · color: #fff · height: 34px · 700',
          dark: 'background: #e7e9ea · color: #000 · height: 34px · 700',
        },
        plain: 'A fully rounded button in the text color, the strongest thing in the toolbar.',
      },
      {
        kind: 'behavior',
        term: 'Disabled state',
        value: 'opacity: 0.5 · 150ms',
        plain:
          'Over the limit it fades to half and ignores clicks, so nobody posts something that would be cut off. Delete back under and it lights up again.',
      },
    ],
  },
];
