import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Selectable cards element, in the order they appear. `value` fields are the actual values from
 * SelectableCards.
 */
export const selectableCardsSpecs: UiElementSpec[] = [
  {
    id: 'selectable-cards',
    name: 'Selectable cards',
    htmlTag: '<fieldset role="radiogroup">',
    variant: 'Plan picker · 3 cards, one choice',
    summary:
      'A set of cards where exactly one can be chosen, like radio buttons blown up to hold a price and a description. Choosing one unchooses the others.',
    aliases: ['radio cards', 'card picker', 'plan selector', 'option cards', 'the pricing boxes you click'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Radio group',
        value: 'one choice · Pro by default',
        plain:
          'Underneath it’s one set of radio buttons sharing a name, so only one plan can be chosen and the form sends the chosen one.',
      },
      {
        kind: 'behavior',
        term: 'Roving focus',
        value: '1 Tab stop · ← → ↑ ↓ move the choice',
        plain:
          'Tab lands on the chosen card only; the arrow keys move the choice to the next card, the way a row of radio buttons works.',
      },
      {
        kind: 'appearance',
        term: 'Responsive layout',
        value: 'stacked rows under 460px · 3 columns, gap: 8px',
        plain:
          'Side by side where there’s room, so the plans can be compared at a glance; stacked as compact rows on a narrow screen, with the price on the right.',
      },
    ],
  },
  {
    id: 'selectable-cards-card',
    name: 'Card',
    htmlTag: '<label>',
    variant: 'Not chosen · hairline border',
    summary:
      'One option. The whole card is the click target, not just the little circle, so it’s easy to hit, and it says what you get before you choose.',
    aliases: ['option', 'plan card', 'choice', 'tile'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Hairline border',
        value: {
          light: 'border: 1px solid #e4e4e7 · border-radius: 12px',
          dark: 'border: 1px solid #2c2c30 · border-radius: 12px',
        },
        plain:
          'A thin gray outline with rounded corners (10px on the stacked rows): quiet, so the chosen card stands out against the others.',
      },
      {
        kind: 'behavior',
        term: 'Whole-card hit area',
        value: '<label> wrapping a hidden <input type="radio">',
        plain: 'Clicking anywhere on the card chooses it, because the card is the radio button’s label.',
      },
      {
        kind: 'behavior',
        term: 'Hover and press',
        value: {
          light: 'hover border: #a1a1aa · press scale(0.98)',
          dark: 'hover border: #5b5b63 · press scale(0.98)',
        },
        plain: 'The outline darkens under the pointer and the card gives a little when pressed, so it feels clickable.',
      },
    ],
  },
  {
    id: 'selectable-cards-radio',
    name: 'Radio indicator',
    htmlTag: '<span aria-hidden="true">',
    variant: 'Empty ring · filled with a check',
    summary:
      'The small circle that says “pick one of these”. It’s empty on the other cards and fills with the accent and a check on the chosen one.',
    aliases: ['radio button', 'radio circle', 'the dot', 'check circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Custom radio',
        value: {
          light: '18px · border: 1.5px solid #d4d4d8',
          dark: '18px · border: 1.5px solid #46464d',
        },
        plain: 'The browser’s own radio is hidden and this circle is drawn in its place, so it matches the design.',
      },
      {
        kind: 'appearance',
        term: 'Checked fill',
        value: {
          light: 'background: #155eef · white check',
          dark: 'background: #528bff · white check',
        },
        plain:
          'Chosen, it fills with the blue and shows a white check instead of the usual dot: in card pickers the circle doubles as a “selected” tick.',
      },
      {
        kind: 'behavior',
        term: 'Check draws in',
        value: 'fill 150ms · check 200ms after 80ms',
        plain:
          'The circle fills first and the check draws itself in a moment later, a small confirmation of the click.',
      },
    ],
  },
  {
    id: 'selectable-cards-selected',
    name: 'Selected state',
    htmlTag: '<label> with :has(:checked)',
    variant: 'Checked · accent border + tint',
    summary:
      'How the chosen card looks: a blue border twice as thick as the others and a faint blue wash, so it’s clear which plan you’re signing up for.',
    aliases: ['chosen card', 'active card', 'checked state', 'the highlighted plan'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Accent border',
        value: {
          light: 'border-color: #155eef · box-shadow: 0 0 0 1px #155eef',
          dark: 'border-color: #528bff · box-shadow: 0 0 0 1px #528bff',
        },
        plain:
          'The 1px border turns blue and a 1px ring of the same blue is added outside it: 2px in all, without shifting anything inside. The card is styled from the checked radio inside it.',
      },
      {
        kind: 'appearance',
        term: 'Tinted background',
        value: 'color-mix(in oklab, accent 5%, card)',
        plain: 'A wash of blue so faint it reads as “lit” rather than colored.',
      },
      {
        kind: 'behavior',
        term: 'Moves with the choice',
        value: 'border, ring and fill 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain: 'Choosing another card fades the blue out of the old one and into the new one at the same time.',
      },
    ],
  },
  {
    id: 'selectable-cards-badge',
    name: 'Badge',
    htmlTag: '<span>',
    variant: 'Most popular · on the top border',
    summary:
      'A small label that points people to the plan most of them pick. It nudges without choosing for you: the selection stays wherever you put it.',
    aliases: ['tag', 'pill', 'ribbon', 'recommended label', 'most popular sticker'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill badge',
        value: {
          light: 'background: #18181b · color: #fff · 10.5px 600',
          dark: 'background: #fafafa · color: #161618 · 10.5px 600',
        },
        plain: 'Tiny bold text in an inverted capsule, so it reads as a label and not as part of the plan’s name.',
      },
      {
        kind: 'appearance',
        term: 'Straddles the border',
        value: 'position: absolute · top: -9px',
        plain:
          'Side by side, it sits on the card’s top edge, half in and half out, so it never crowds the name. In the stacked rows it follows the name.',
      },
      {
        kind: 'behavior',
        term: 'Not the selection',
        value: 'neutral, never the accent',
        plain: 'It stays black and white so a recommended plan is never mistaken for the chosen one.',
      },
    ],
  },
];
