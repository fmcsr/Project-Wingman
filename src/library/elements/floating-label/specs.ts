import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Floating label element, in the order they appear. `value` fields are the actual values from
 * FloatingLabel.
 */
export const floatingLabelSpecs: UiElementSpec[] = [
  {
    id: 'floating-label',
    name: 'Outlined text field',
    htmlTag: '<input> + <label>',
    variant: 'Floating label · notched outline',
    summary:
      'A text field drawn as a thin outline, with its label inside. The label doubles as the placeholder until you click in, then moves up into the border, so the field always says what it’s for.',
    aliases: ['input box', 'text box', 'Material text field', 'the box you type in', 'outlined input'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outlined variant',
        value: {
          light: 'height: 44px · border: 1px solid #8a8d93 · border-radius: 6px',
          dark: 'height: 44px · border: 1px solid #7d8087 · border-radius: 6px',
        },
        plain:
          'No fill, just a gray outline with slightly rounded corners. Material’s other style, “filled”, has a tinted box with a line underneath instead.',
      },
      {
        kind: 'appearance',
        term: 'Focused border',
        value: { light: '2px #1b62d6', dark: '2px #8ab4ff' },
        plain:
          'While you type in it, the outline thickens to 2px and turns blue. The second pixel is drawn inward, so the field doesn’t grow or shift.',
      },
      {
        kind: 'behavior',
        term: 'Floating label pattern',
        value: 'label up on focus or with a value',
        plain:
          'One label does two jobs: a hint inside the empty field, then a title on its border. It saves the room a label above the field would take.',
      },
      {
        kind: 'behavior',
        term: 'Inline validation',
        value: 'check once the address is whole',
        plain:
          'The field checks what you typed as you go. A complete email address gets a green check at the end of the field; a broken one would turn the field red.',
      },
    ],
  },
  {
    id: 'floating-label-label',
    name: 'Floating label',
    htmlTag: '<label for>',
    variant: 'Resting inside → floated onto the border',
    summary:
      'The field’s name. It sits inside the empty field like a placeholder, and floats up onto the border, smaller, as soon as you click in or the field has a value.',
    aliases: ['field label', 'the label that moves up', 'placeholder that moves', 'animated label'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Float transition',
        value: 'translateY(-22px) scale(0.8) · 180ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain:
          'The label slides up 22px and shrinks from 15px to 12px in under a fifth of a second, so the eye can follow it from the inside to the border.',
      },
      {
        kind: 'appearance',
        term: 'Resting state',
        value: { light: '15px · #5f6368', dark: '15px · #a4a7ad' },
        plain: 'Inside the empty field it’s as big as the text you’ll type, in gray, so it reads as a hint.',
      },
      {
        kind: 'appearance',
        term: 'Focused color',
        value: { light: 'color: #1b62d6', dark: 'color: #8ab4ff' },
        plain:
          'Floated over the field you’re typing in, it takes the accent blue; over a filled field you’ve left, like Full name, it’s gray again.',
      },
      {
        kind: 'behavior',
        term: 'Stays up when filled',
        plain: 'Once the field has a value the label never drops back, or it would sit on top of the text.',
      },
    ],
  },
  {
    id: 'floating-label-notch',
    name: 'Notch',
    htmlTag: '<fieldset> + <legend>',
    variant: 'Gap in the outline for the label',
    summary:
      'The break in the top border where the floated label sits, so the line doesn’t run through the words. It opens as the label arrives.',
    aliases: ['notched outline', 'gap in the border', 'cut-out', 'the break in the line'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Notched outline',
        value: 'label width + padding: 0 4px',
        plain:
          'The gap is exactly as wide as the small label plus 4px on each side, so the border stops just short of the words.',
      },
      {
        kind: 'behavior',
        term: 'Opens with the label',
        value: 'scaleX(0) → 1 · 180ms',
        plain: 'It widens from the middle while the label travels up, and closes again if the label drops back.',
      },
      {
        kind: 'appearance',
        term: '<legend> inside a <fieldset>',
        plain:
          'One common way to build it: the border belongs to a fieldset, whose legend makes the gap. Here the notch is a strip of the card’s color laid over the border.',
      },
    ],
  },
  {
    id: 'floating-label-helper',
    name: 'Helper text',
    htmlTag: '<p id> + aria-describedby',
    variant: 'Supporting text under the field',
    summary:
      'A short line under the field that answers the question people have before they type: what it’s for, or what format it wants. Error messages appear in the same spot.',
    aliases: ['hint text', 'supporting text', 'caption', 'the small text under the field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Supporting text',
        value: { light: '12px · #5f6368 · margin-top: 4px', dark: '12px · #a4a7ad · margin-top: 4px' },
        plain: 'Small and gray, 14px in from the edge so it lines up with what’s typed in the field.',
      },
      {
        kind: 'behavior',
        term: 'Error text',
        plain:
          'When the value is wrong, a red message takes this line’s place and the outline turns red, so the problem shows right where you’re looking.',
      },
      {
        kind: 'behavior',
        term: 'aria-describedby',
        plain: 'Links the text to the field, so a screen reader reads it out along with the label.',
      },
    ],
  },
  {
    id: 'floating-label-focus-ring',
    name: 'Focus ring',
    htmlTag: ':focus-visible',
    variant: '3px halo around the focused field',
    summary:
      'A soft glow around the field that has the keyboard’s attention, so you can always see where your typing will go.',
    aliases: ['focus outline', 'glow', 'focus halo', 'the blue ring'],
    concepts: [
      {
        kind: 'appearance',
        term: 'box-shadow ring',
        value: {
          light: 'box-shadow: 0 0 0 3px rgb(27 98 214 / 0.18)',
          dark: 'box-shadow: 0 0 0 3px rgb(138 180 255 / 0.24)',
        },
        plain:
          'A 3px band of pale blue just outside the border. Drawn as a shadow, it takes no space, so nothing around the field moves.',
      },
      {
        kind: 'behavior',
        term: 'Fade in',
        value: 'opacity · 180ms',
        plain: 'It fades in with the blue border when the field gets focus and fades out when you move on.',
      },
      {
        kind: 'behavior',
        term: 'Accessibility',
        value: 'WCAG 2.4.7 Focus Visible',
        plain:
          'People who use the keyboard rely on it to know where they are; removing the focus style without a replacement fails accessibility checks.',
      },
    ],
  },
];
