import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Ripple effect element, in the order they appear. `value` fields are the actual values from
 * RippleEffect.
 */
export const rippleEffectSpecs: UiElementSpec[] = [
  {
    id: 'ripple-effect',
    name: 'Ripple',
    variant: 'Material 3 · pressed',
    summary:
      'The circle that spreads across a button or row from the spot you touched, so you can see your press land before anything else happens.',
    aliases: ['ink ripple', 'touch ripple', 'press feedback', 'tap effect', 'the wave when you tap'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Grow from the press point',
        value: '15px → diagonal + 10px · 450ms cubic-bezier(0.2, 0, 0, 1)',
        plain:
          'It starts as a small circle under your finger and grows until it covers the whole surface, fast at first and settling at the end.',
      },
      {
        kind: 'behavior',
        term: 'Drift to the center',
        value: 'translate: press point → middle',
        plain:
          'As it grows, its center slides from your finger to the middle of the surface, so it fills it evenly wherever you pressed.',
      },
      {
        kind: 'appearance',
        term: 'Soft edge',
        value: 'radial-gradient(closest-side, color max(100% − 30px, 72%), transparent 100%)',
        plain: 'The circle fades out toward its rim instead of ending in a hard line.',
      },
      {
        kind: 'behavior',
        term: 'Fade on release',
        value: 'opacity: 0.12 → 0 · 375ms linear',
        plain: 'Let go and it stays full size and fades away, together with the state layer under it.',
      },
    ],
  },
  {
    id: 'ripple-effect-origin',
    name: 'Press point',
    variant: 'Where the finger landed',
    summary:
      'The spot the finger touched, and where the ripple starts. Pressing near the edge or the middle gives a different ripple, which is what makes it feel physical.',
    aliases: ['touch point', 'origin', 'tap location', 'where you pressed'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Ripple origin',
        value: 'the pointer’s x and y in the surface',
        plain: 'The app reads where the touch landed and starts the ripple right there.',
      },
      {
        kind: 'appearance',
        term: 'Touch indicator',
        value: '22px circle · white rim',
        plain:
          'Drawn here so you can see the finger, the way a screen recording with touches shown draws it. It isn’t part of the app.',
      },
    ],
  },
  {
    id: 'ripple-effect-state-layer',
    name: 'State layer',
    variant: 'Pressed · 8%',
    summary:
      'A see-through tint over the whole pressed surface, in the color of its content. Material uses the same layer, at different strengths, for hover, focus and press.',
    aliases: ['pressed state', 'highlight', 'overlay', 'tint'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Content-colored overlay',
        value: {
          light: 'background: #191c20 · opacity: 0.08 (on the button: #fff)',
          dark: 'background: #e2e2e9 · opacity: 0.08 (on the button: #0a305f)',
        },
        plain:
          'It uses the color of the text on the surface, so it darkens light surfaces and lightens dark ones, and always reads.',
      },
      {
        kind: 'behavior',
        term: 'Quick in, slow out',
        value: '105ms in · 375ms out · linear',
        plain: 'It comes up almost at once under the finger and fades more slowly after release.',
      },
    ],
  },
  {
    id: 'ripple-effect-button',
    name: 'Filled button',
    htmlTag: '<button>',
    variant: 'Material 3 · primary',
    summary:
      'The card’s main action, in the strongest style Material has. It ripples like the rows, in its label’s color.',
    aliases: ['primary button', 'contained button', 'CTA', 'action button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled',
        value: {
          light: 'background: #415f91 · color: #fff · height: 40px · border-radius: 20px',
          dark: 'background: #aac7ff · color: #0a305f · height: 40px · border-radius: 20px',
        },
        plain: 'A fully rounded pill in the primary color with a medium-weight 14px label.',
      },
      {
        kind: 'behavior',
        term: 'Clipped ripple',
        value: 'overflow: hidden',
        plain: 'Its ripple stays inside the pill’s rounded shape, the same way the rows’ ripples stay inside the card.',
      },
    ],
  },
];
