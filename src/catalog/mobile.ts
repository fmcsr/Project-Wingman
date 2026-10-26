import { homeIndicator, statusBar } from './shared';
import type { UiElementSpec } from './types';

/** Elements in the Wave mobile app. `value` fields are the actual values from WaveApp.module.css. */
export const mobile: UiElementSpec[] = [
  statusBar,
  {
    id: 'large-title',
    name: 'Large title',
    variant: 'iOS navigation',
    summary: 'A big, bold page title at the top of the screen that tucks into the bar as you scroll.',
    aliases: ['page title', 'header'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Large title style',
        value: '32px · 700',
        plain: "Apple's style for top-level screens: big, bold, and left-aligned.",
      },
      {
        kind: 'behavior',
        term: 'Collapse on scroll',
        value: 'large → inline',
        plain: 'As you scroll, the title moves into the navigation bar to give the content more room.',
      },
    ],
  },
  {
    id: 'progress-ring',
    name: 'Progress ring',
    htmlTag: '<svg>',
    variant: '72% complete',
    summary: 'A circle that fills up as you get closer to a goal.',
    aliases: ['circular progress', 'donut', 'activity ring'],
    concepts: [
      {
        kind: 'appearance',
        term: 'stroke-dasharray',
        value: 'dasharray + dashoffset',
        plain: "Draws only part of the circle's outline; the visible length matches the progress.",
      },
      {
        kind: 'appearance',
        term: 'Rounded caps',
        value: 'stroke-linecap: round',
        plain: 'Soft, rounded ends make the arc feel friendly.',
      },
    ],
  },
  {
    id: 'filter-chips',
    name: 'Filter chips',
    variant: 'Single select',
    summary: 'Small rounded buttons that narrow down what is shown below them.',
    aliases: ['tags', 'pills', 'filters'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected chip',
        value: 'inverted colors',
        plain: 'The active chip flips its colors (dark on light, light on dark) so you know which filter is on.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'overflow-x: auto',
        plain: 'When there are more chips than space, the row scrolls sideways instead of wrapping.',
      },
    ],
  },
  {
    id: 'list-row',
    name: 'List row',
    variant: 'Cell with icon',
    summary: 'One row in a list: an icon, a title, a detail line, and a control at the end.',
    aliases: ['cell', 'list item', 'row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Leading icon',
        value: '32 × 32px',
        plain: 'A colored icon at the start helps you scan the list quickly.',
      },
      {
        kind: 'appearance',
        term: 'Inset divider',
        value: 'left: 60px',
        plain: 'The separator starts after the icon — a classic iOS detail that keeps rows visually connected.',
      },
    ],
  },
  {
    id: 'toggle-switch',
    name: 'Toggle switch',
    htmlTag: '<input role="switch">',
    variant: 'On',
    summary: 'An on/off control that takes effect immediately — no save button needed.',
    aliases: ['switch', 'on/off button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and thumb',
        value: '44 × 26px',
        plain: 'The pill is the track; the circle is the thumb that slides over to show the state.',
      },
      {
        kind: 'behavior',
        term: 'Instant effect',
        value: 'role="switch"',
        plain: 'Use a switch for settings that apply right away, and a checkbox for choices you submit later.',
      },
    ],
  },
  {
    id: 'fab',
    name: 'Floating action button',
    variant: 'FAB',
    summary: "A round button floating above the content for the screen's most common action — here, adding a habit.",
    aliases: ['plus button', 'the round + button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Elevation',
        value: 'box-shadow: 0 8px 20px',
        plain: 'A soft shadow makes it look like it hovers above the page.',
      },
      {
        kind: 'behavior',
        term: 'Pinned position',
        value: 'position: absolute',
        plain: 'It stays in the same corner while the content moves beneath it.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    variant: 'Bottom navigation',
    summary: "The row of icons at the bottom that switches between the app's main sections.",
    aliases: ['bottom nav', 'bottom menu', 'tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active tab',
        value: 'accent color',
        plain: "The selected tab's icon and label take the accent color; the others stay gray.",
      },
      {
        kind: 'behavior',
        term: 'Thumb reach',
        value: 'bottom of the screen',
        plain: 'It sits where thumbs naturally rest, so switching sections is easy with one hand.',
      },
    ],
  },
  homeIndicator,
];
