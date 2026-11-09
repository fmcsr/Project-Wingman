import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Munch food delivery app, in the order they appear. `value` fields are the actual values from MunchApp. */
export const munchSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'scrim',
    name: 'Scrim',
    variant: 'Over the store page',
    summary:
      'The see-through dark layer over the store page while the sheet is open. Only a strip of the page shows above the sheet, dimmed so it reads as background.',
    aliases: ['overlay', 'backdrop', 'dimmed background', 'the dark strip at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dimming',
        value: { light: 'background: rgb(0 0 0 / 0.4)', dark: 'background: rgb(0 0 0 / 0.6)' },
        plain: 'See-through black laid over the page behind. It is darker in dark mode, where everything is dark already.',
      },
      {
        kind: 'behavior',
        term: 'Tap to dismiss',
        plain: 'Tapping the dimmed strip closes the sheet without adding anything to the order, like the close button.',
      },
      {
        kind: 'behavior',
        term: 'inert',
        value: '<main inert>',
        plain: "While the sheet is open, the store page can't be scrolled or tapped, and screen readers skip it.",
      },
    ],
  },
  {
    id: 'bottom-sheet',
    name: 'Bottom sheet',
    variant: 'Modal, nearly full height',
    summary:
      'A panel that slides up over the store page to set up one dish. It covers almost the whole screen; swipe it down or tap the X to go back to the menu.',
    aliases: ['item sheet', 'modal', 'item details', 'the popup with the dish', 'drawer'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Detent',
        value: 'top: 56px',
        plain: 'Where a sheet comes to rest. This one stops just under the status bar, the large size, because the dish needs the room.',
      },
      {
        kind: 'appearance',
        term: 'Top corners only',
        value: 'border-radius: 10px 10px 0 0',
        plain: 'Rounded at the top and square at the bottom, because the panel continues past the screen edge.',
      },
      {
        kind: 'behavior',
        term: 'Sticky footer',
        value: { light: 'border-top: 1px solid #e8e8e8', dark: 'border-top: 1px solid #262626' },
        plain: 'The options scroll while the button stays pinned to the bottom, under a hairline that marks the edge.',
      },
    ],
  },
  {
    id: 'hero-image',
    name: 'Hero image',
    htmlTag: '<img>',
    variant: 'Full-bleed, at the top of the sheet',
    summary:
      "The dish's photo, edge to edge across the top of the sheet. It's the first thing you see, with the close and share buttons floating on it.",
    aliases: ['food photo', 'item image', 'header image', 'the picture of the dish'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Full-bleed',
        value: 'width: 100% · height: 130px',
        plain: 'The photo touches both edges and tucks into the rounded corners of the sheet, with no frame or margin.',
      },
      {
        kind: 'appearance',
        term: 'object-fit: cover',
        plain: 'The photo fills its band whatever its shape, cropping the edges instead of squashing the food.',
      },
      {
        kind: 'behavior',
        term: 'Collapsing header',
        plain: "As you scroll down the options, the photo slides away and a plain bar with the dish's name takes its place.",
      },
    ],
  },
  {
    id: 'close-button',
    name: 'Close button',
    htmlTag: '<button aria-label="Close">',
    variant: 'Icon in a floating circle',
    summary: 'The X in a white circle closes the sheet and goes back to the store page, without adding the dish.',
    aliases: ['X button', 'dismiss', 'cancel', 'the X in the corner'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating button',
        value: '30 × 30px · box-shadow: 0 1px 4px rgb(0 0 0 / 0.16)',
        plain: 'A solid circle with a soft shadow stays easy to see on any photo, light or dark.',
      },
      {
        kind: 'appearance',
        term: 'Top-left placement',
        value: 'top: 5px · left: 6px',
        plain: 'Top left is where people look for the way out of a screen; the share button takes the other corner.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Close"',
        plain: "An icon-only button needs a name that screen readers can say, since there's no visible text.",
      },
    ],
  },
  {
    id: 'share-button',
    name: 'Share button',
    htmlTag: '<button aria-label="Share">',
    variant: 'Icon in a floating circle',
    summary: "Opens the phone's share sheet with a link to this dish, to send it to a friend or keep it for later.",
    aliases: ['share icon', 'send a link', 'the box with the arrow'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Share sheet',
        value: 'navigator.share()',
        plain: "The phone's own panel of apps and contacts slides up, so the app doesn't need its own list of ways to share.",
      },
      {
        kind: 'appearance',
        term: 'Outline icon',
        value: '17 × 17px · stroke-width: 1.7',
        plain: 'A tray with an arrow leaving it, the usual picture for sharing on a phone, drawn in lines like the X.',
      },
      {
        kind: 'behavior',
        term: 'Deep link',
        plain: 'The shared link opens this same dish in the app, or on the website for someone without it.',
      },
    ],
  },
  {
    id: 'item-header',
    name: 'Item header',
    variant: 'Name, base price and quantity',
    summary: "The dish's name in large bold type. Underneath sit its base price in gray, a tag, and the quantity on the right.",
    aliases: ['product title', 'dish name and price', 'item details', 'the title'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Type hierarchy',
        value: '17px · 700 → 13px · 500',
        plain: 'Big and black for the name, smaller and gray for the price, so the eye reads them in that order.',
      },
      {
        kind: 'appearance',
        term: 'Secondary text',
        value: { light: 'color: #5e5e5e', dark: 'color: #a6a6a6' },
        plain: 'Gray text steps back from the black name without becoming hard to read.',
      },
      {
        kind: 'behavior',
        term: 'Base price',
        value: '$13.50',
        plain: 'The price of the dish as it comes. The choices below add to it, and the button shows the result.',
      },
    ],
  },
  {
    id: 'popular-badge',
    name: 'Tag',
    variant: '#1 most ordered',
    summary:
      "A small gray label beside the price: this is the dish the restaurant sells most. It helps people who are new to the menu choose.",
    aliases: ['badge', 'label', 'best seller', 'the little box next to the price'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Neutral fill',
        value: { light: 'background: #f3f3f3', dark: 'background: #262626' },
        plain: 'Light gray behind black text: easy to notice, and clearly not a button.',
      },
      {
        kind: 'appearance',
        term: 'Corner radius',
        value: 'border-radius: 4px',
        plain: 'Slightly rounded, not a pill, which sets this label apart from the pill-shaped stepper you can press.',
      },
      {
        kind: 'behavior',
        term: 'Social proof',
        plain: "It's based on what other people order, which reassures someone who doesn't know the menu yet.",
      },
    ],
  },
  {
    id: 'quantity-stepper',
    name: 'Stepper',
    variant: 'Quantity, at its minimum',
    summary: 'Sets how many of this dish to add. The minus is grayed out because one is the fewest you can order.',
    aliases: ['quantity picker', 'plus minus buttons', 'counter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Disabled state',
        value: { light: 'color: #afafaf', dark: 'color: #5e5e5e' },
        plain: "The minus fades at 1, so it's clear that tapping it would do nothing.",
      },
      {
        kind: 'appearance',
        term: 'Filled pill',
        value: 'height: 26px · border-radius: 999px',
        plain: 'Minus, number and plus share one gray pill, so they read as a single control.',
      },
      {
        kind: 'behavior',
        term: 'Total follows',
        value: 'Add 2 to order • $29.00',
        plain: 'Each tap on + changes the count and the price on the button right away.',
      },
    ],
  },
  {
    id: 'option-group',
    name: 'Option group',
    htmlTag: '<fieldset>',
    variant: 'Title, rule and choices',
    summary:
      'One question about the dish, like its size or its extras: a bold title, the rule for answering, then the choices. Thick gray bands keep the groups apart.',
    aliases: ['modifier group', 'customization section', 'add-ons', 'the size and extras sections'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Modifier group',
        value: 'min 1 · max 1 / min 0 · max 3',
        plain: 'Each group has its own rule: the size needs exactly one choice, the extras allow none up to three.',
      },
      {
        kind: 'appearance',
        term: 'Section divider',
        value: { light: 'border-top: 6px solid #f3f3f3', dark: 'border-top: 6px solid #161616' },
        plain: 'A thick gray band, much heavier than the hairlines between choices, marks where a new question starts.',
      },
      {
        kind: 'behavior',
        term: '<legend>',
        value: '<fieldset> + <legend>',
        plain: 'The title is tied to its choices, so a screen reader says “Choose a size” before reading the options.',
      },
    ],
  },
  {
    id: 'required-badge',
    name: 'Required label',
    variant: 'Done, with a check',
    summary:
      'Says you must choose something in this group before you can add the dish. The check and the color show the choice is already made.',
    aliases: ['required tag', 'required badge', 'mandatory', 'must choose', 'the blue check'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Status color',
        value: { light: 'color: #2350d8', dark: 'color: #86a3ff' },
        plain: "Munch's cobalt, the only color in the sheet, appears here once a required choice is made.",
      },
      {
        kind: 'appearance',
        term: 'Icon with label',
        value: '11px check in a circle',
        plain: "The check says “done” even to someone who doesn't notice the color.",
      },
      {
        kind: 'behavior',
        term: 'Validation',
        plain: 'If a required group were still empty, tapping the button would scroll back to it and mark it in red.',
      },
    ],
  },
  {
    id: 'radio-option',
    name: 'Radio button',
    htmlTag: '<input type="radio">',
    variant: 'Size · one selected',
    summary: 'A list where only one choice can be on. Picking 12 pieces would switch 6 pieces off.',
    aliases: ['single choice', 'option button', 'the round selector', 'pick one'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected state',
        value: { light: 'border: 5px solid #000', dark: 'border: 5px solid #fff' },
        plain: 'A solid disc with a small hole means on; a thin gray ring means off.',
      },
      {
        kind: 'appearance',
        term: 'Price delta',
        value: '+$6.50',
        plain: 'A choice shows what it adds to the base price, under its name, so the math stays simple.',
      },
      {
        kind: 'behavior',
        term: 'Default choice',
        value: 'checked',
        plain: 'The smaller size starts out selected, so the required group is complete from the start.',
      },
    ],
  },
  {
    id: 'checkbox-option',
    name: 'Checkbox',
    htmlTag: '<input type="checkbox">',
    variant: 'Extras · one checked',
    summary: 'Each extra can be switched on or off on its own. Chili crisp is checked, so its $1.00 is in the total.',
    aliases: ['tick box', 'add-ons', 'multi-select', 'the squares with checks'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Checked state',
        value: { light: 'background: #000', dark: 'background: #fff' },
        plain: 'A filled square with a check means added; an empty gray outline means not added.',
      },
      {
        kind: 'appearance',
        term: 'Square vs round',
        value: 'border-radius: 3px',
        plain: 'Square boxes say “pick any”, round radio buttons say “pick one”: the shape tells people the rule.',
      },
      {
        kind: 'behavior',
        term: 'Selection limit',
        value: 'max 3',
        plain: 'Once three extras are checked, the rest turn gray until one is unchecked.',
      },
    ],
  },
  {
    id: 'add-button',
    name: 'Primary button',
    htmlTag: '<button>',
    variant: 'Full width, with the live total',
    summary:
      "The sheet's main action, pinned to the bottom. Its label says how many you're adding and the price with your choices included.",
    aliases: ['add to cart', 'CTA', 'call to action', 'the big black button'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Live total',
        value: '$13.50 + $1.00 = $14.50',
        plain: 'The button adds up the base price and every option as you choose them, times the quantity.',
      },
      {
        kind: 'appearance',
        term: 'High-contrast fill',
        value: { light: 'background: #000 · color: #fff', dark: 'background: #fff · color: #000' },
        plain: 'Solid black, or white in dark mode. In a black-and-white design, the strongest contrast does the job of a brand color.',
      },
      {
        kind: 'appearance',
        term: 'Full-width bar',
        value: 'height: 40px · border-radius: 6px',
        plain: 'As wide as the sheet allows, with barely rounded corners: the biggest, easiest thing to hit on the screen.',
      },
    ],
  },
  homeIndicator,
];
