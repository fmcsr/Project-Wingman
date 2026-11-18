import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Slide to confirm element, in the order they appear. `value` fields are the actual values from
 * SlideToConfirm.
 */
export const slideToConfirmSpecs: UiElementSpec[] = [
  {
    id: 'slide-to-confirm',
    name: 'Slide to confirm',
    htmlTag: '<div role="slider">',
    variant: 'Send money · iOS',
    summary:
      'A button you drag instead of tap: the thumb has to travel the whole track before the money goes. It guards actions you can’t take back, where a stray tap would cost something.',
    aliases: ['swipe to pay', 'slide to unlock', 'swipe button', 'drag to confirm', 'the slider at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill track',
        value: 'height: 56px · border-radius: 28px',
        plain: 'A fully rounded track as tall as a big button, with the thumb inset 4px on every side.',
      },
      {
        kind: 'behavior',
        term: 'Completion threshold',
        value: '100% of the track',
        plain:
          'Only reaching the end confirms. Let go before that and the thumb springs back to the start, so a half-hearted swipe sends nothing.',
      },
      {
        kind: 'behavior',
        term: 'Success state',
        value: { light: 'background: #34c759 · check · Sent', dark: 'background: #30d158 · check · Sent' },
        plain:
          'At the end the whole track turns green, the arrow becomes a check and the label says Sent. Done, no doubt about it.',
      },
    ],
  },
  {
    id: 'slide-to-confirm-thumb',
    name: 'Thumb',
    htmlTag: '<span>',
    variant: 'Round · arrow',
    summary: 'The round handle you drag. Its arrow points the way it has to go.',
    aliases: ['knob', 'handle', 'slider button', 'the blue circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Thumb',
        value: { light: '48px circle · background: #007aff', dark: '48px circle · background: #0a84ff' },
        plain: 'A circle in the accent color with a white arrow, lifted off the track by a soft shadow.',
      },
      {
        kind: 'behavior',
        term: 'Drag',
        value: 'cubic-bezier(0.55, 0, 0.3, 1) · 900ms',
        plain:
          'In the loop a finger drags it: it starts slowly, keeps pace and slows into the end, like a real thumb would.',
      },
      {
        kind: 'behavior',
        term: 'Icon swap',
        value: 'arrow → check · 350ms with overshoot',
        plain: 'When the money goes, the thumb turns white and the arrow gives way to a check that pops in.',
      },
    ],
  },
  {
    id: 'slide-to-confirm-label',
    name: 'Shimmer label',
    htmlTag: '<span>',
    variant: 'Slide to send',
    summary:
      'The instruction inside the track. A band of light keeps sweeping across it in the direction to slide, the trick the iPhone’s slide to unlock made famous.',
    aliases: ['slide to unlock text', 'shiny text', 'hint text', 'the moving shine'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient · 300% wide',
        plain:
          'The letters are filled with a gradient instead of a color: gray with one narrow band of full contrast. Only the letters show it.',
      },
      {
        kind: 'behavior',
        term: 'Shimmer',
        value: 'background-position · 2.4s linear infinite',
        plain: 'The gradient slides across the letters: the band crosses in 1.5 seconds, rests, and comes again.',
      },
      {
        kind: 'behavior',
        term: 'Fade ahead of the thumb',
        value: 'mask-image · 32px soft edge · drifts at 0.4×',
        plain:
          'As the thumb comes, the label dims and drifts right more slowly than the thumb, and the letters right in front of it fade out.',
      },
    ],
  },
  {
    id: 'slide-to-confirm-fill',
    name: 'Fill',
    htmlTag: '<span>',
    variant: 'Tinted · follows the thumb',
    summary: 'The part of the track the thumb has covered, tinted with the accent color, so you see how far is left.',
    aliases: ['progress', 'trail', 'the colored part', 'track fill'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tint',
        value: {
          light: 'color-mix(in oklab, #007aff 18%, #efeff4)',
          dark: 'color-mix(in oklab, #0a84ff 30%, #2c2c2e)',
        },
        plain: 'A pale mix of the accent into the track’s gray, so the thumb stays the strongest color.',
      },
      {
        kind: 'appearance',
        term: 'Rounded end',
        value: 'border-radius: 28px',
        plain: 'Its end is as round as the track, so it hugs the thumb with the same 4px margin the track has.',
      },
      {
        kind: 'behavior',
        term: 'One progress value',
        value: '--slide-to-confirm: 0 → 1',
        plain:
          'The thumb, the fill and the label all follow one number from 0 to 1, so they move as one and never drift apart.',
      },
    ],
  },
];
