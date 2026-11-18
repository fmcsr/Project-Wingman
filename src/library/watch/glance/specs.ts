import type { UiElementSpec } from '../../../catalog';

/**
 * Elements of the Glance Smart Stack, from the top of the screen down. `value` fields are the actual values from
 * GlanceStack.
 */
export const glanceSpecs: UiElementSpec[] = [
  {
    id: 'time',
    name: 'Time',
    htmlTag: '<time>',
    variant: 'Smart Stack · top-right corner',
    summary:
      "The current time, small in the top-right corner. When the stack opens, the face's time moves up here and leaves the screen to the widgets.",
    aliases: ['clock', 'the time in the corner', 'status time'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inside the curve',
        value: '15px · 600 · 20px from the edge',
        plain: "Set in from the corner, so the screen's rounded edge never cuts into it.",
      },
      {
        kind: 'behavior',
        term: 'System element',
        plain: 'The watch draws it, not the widgets: it stays put while the stack scrolls underneath.',
      },
    ],
  },
  {
    id: 'smart-stack',
    name: 'Smart Stack',
    htmlTag: '<ul>',
    variant: 'Opened from the watch face',
    summary:
      'The column of widgets that rises when you turn the Digital Crown up from the watch face: what the watch expects you need now, one widget per turn of the crown.',
    aliases: ['widget stack', 'widgets', 'the stack', 'widget list', 'glances'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Relevance',
        plain:
          "The watch sorts the stack by what's likely useful now: the time of day, where you are, your routines, and what apps say is timely, such as a meeting about to start. Widgets you pin keep their place.",
      },
      {
        kind: 'behavior',
        term: 'Crown scrolling',
        value: '0.55s cubic-bezier(0.34, 1.36, 0.64, 1)',
        plain:
          'Each turn of the crown moves the stack one widget on, and it settles with a slight overshoot, like a spring.',
      },
      {
        kind: 'appearance',
        term: 'Peek',
        value: 'scale: 0.94 at the bottom edge',
        plain:
          "The next widget shows its top at the bottom of the screen, a little smaller, so you know there's more below. It grows to full size as it comes in.",
      },
      {
        kind: 'behavior',
        term: 'Back to the face',
        plain: 'Turning the crown the other way, past the first widget, brings the watch face back.',
      },
    ],
  },
  {
    id: 'circular-row',
    name: 'Circular widget row',
    variant: 'Three accessoryCircular widgets',
    summary:
      'Three small round widgets side by side at the top of the stack, the same circular complications a face can show: a workout shortcut, the running timer and the air quality.',
    aliases: ['widget row', 'small widgets', 'complication row', 'the three circles'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three across',
        value: '3 × 52px · justify-content: space-between',
        plain: 'They share one place in the stack, spread over the width of a rectangular widget.',
      },
      {
        kind: 'behavior',
        term: 'Same widget, two places',
        plain:
          "An app's circular widget works both as a complication on the face and here, so designing one gives you both.",
      },
      {
        kind: 'behavior',
        term: 'Tap to open',
        plain: 'Tapping a circle opens its app where it matters: the workout list, or the timer that’s running.',
      },
    ],
  },
  {
    id: 'circular-widget',
    name: 'Circular widget',
    variant: 'accessoryCircular · glyph, gauge or figure',
    summary: "One round widget: an app's glyph that opens it, or a value with a gauge around it.",
    aliases: ['round widget', 'small widget', 'complication', 'circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'accessoryCircular',
        value: '52 × 52px · rgb(255 255 255 / 0.13)',
        plain:
          'The circular widget family: a small round platter, the same shape as a circular complication on the face.',
      },
      {
        kind: 'appearance',
        term: 'Edge highlight',
        value: 'inset 0 0.5px 0 rgb(255 255 255 / 0.22)',
        plain:
          'A hairline of light along the upper edge makes the platter read as a piece of glass lying over the black.',
      },
      {
        kind: 'behavior',
        term: 'Glyph as a shortcut',
        plain:
          "With nothing to report, a widget can just show its app's glyph, like the green runner, and open the app when tapped.",
      },
    ],
  },
  {
    id: 'gauge',
    name: 'Gauge',
    htmlTag: '<svg role="meter">',
    variant: 'Closed around the timer, open around the air quality',
    summary:
      'The ring around a circular widget that shows a value: closed around the timer for the share of time left, open at the bottom around the air quality for a reading on a scale.',
    aliases: ['progress ring', 'meter', 'arc', 'ring', 'dial'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Closed gauge',
        value: 'pathLength="100" · stroke-dasharray: 37 100',
        plain:
          "A full ring is the whole timer; the orange part is what's left, 3:42 of 10:00. It empties as it counts down.",
      },
      {
        kind: 'appearance',
        term: 'Open gauge',
        value: '270° · #30d158 → #ffd60a → #ff9f0a → #ff453a',
        plain:
          "Three quarters of a ring colored from good to bad, with a white dot at today's reading; the gap at the bottom holds the label.",
      },
      {
        kind: 'behavior',
        term: 'Gauge styles',
        plain:
          'In SwiftUI both are one Gauge view in two styles: accessoryCircularCapacity for a share of a whole, accessoryCircular for a value within a range.',
      },
    ],
  },
  {
    id: 'weather-widget',
    name: 'Rectangular widget',
    variant: 'Weather · tinted by its app',
    summary:
      "A card as wide as the screen with the weather where you are: the temperature now, today's high and low, the sky and the next four hours. Its app paints the card the color of the sky.",
    aliases: ['weather widget', 'weather card', 'forecast widget', 'the blue card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'accessoryRectangular',
        value: '194 × 80px · border-radius: 22px',
        plain:
          'The rectangular widget family, the main size in the Smart Stack: the width of the screen and about a third of its height.',
      },
      {
        kind: 'appearance',
        term: 'Tinted background',
        value: 'linear-gradient(#3f84d6, #2d67b2)',
        plain:
          "Widgets sit on the watch's dark material unless their app tints them to say something. Here the blue is the sky: it turns gray when it's overcast and navy at night.",
      },
      {
        kind: 'appearance',
        term: 'One big number',
        value: '30px temperature · 9–12px details',
        plain: 'The temperature reads at a glance; everything else is small around it, for a second look.',
      },
      {
        kind: 'behavior',
        term: 'Accented rendering',
        plain:
          'If someone picks the tinted or clear look for widgets, the watch drops the blue, puts a tint or Liquid Glass behind the card and draws its content in two colors; the app marks which parts take the accent.',
      },
    ],
  },
  {
    id: 'condition-symbol',
    name: 'Weather symbol',
    htmlTag: '<svg>',
    variant: 'SF Symbols · multicolor',
    summary:
      'The small sun behind a cloud beside the condition: a symbol from the system’s icon set, drawn in its own colors.',
    aliases: ['weather icon', 'condition icon', 'sun and cloud', 'weather emoji'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Multicolor rendering',
        value: '#ffd60a sun · #fff cloud',
        plain:
          'The symbol keeps the colors of what it shows, a yellow sun and a white cloud, instead of taking the text color.',
      },
      {
        kind: 'appearance',
        term: 'Sized with the text',
        value: '14px beside 11px text',
        plain: 'Symbols are drawn to sit in a line of text and match its size and weight.',
      },
      {
        kind: 'behavior',
        term: 'Rendering modes',
        plain:
          "The same symbol can also be drawn in one color, in shades of one color, or in a palette of the app's colors.",
      },
    ],
  },
  {
    id: 'hourly-forecast',
    name: 'Hourly forecast',
    variant: 'Four hours · time, sky, temperature',
    summary: 'The next four hours in columns: the hour on top, a symbol for the sky, the temperature underneath.',
    aliases: ['hourly', 'forecast strip', 'next hours', 'hour by hour'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Columns',
        value: '4 × 24px · gap: 4px',
        plain: 'Each hour is a narrow column, so four fit beside the temperature now.',
      },
      {
        kind: 'appearance',
        term: 'Muted labels',
        value: '9px · rgb(255 255 255 / 0.75)',
        plain: 'The hours are small and dimmer; the temperatures, what you look for, are in full white.',
      },
      {
        kind: 'behavior',
        term: 'Timeline',
        plain:
          'The app hands the watch the forecast in advance, so the widget moves on by itself each hour without opening the app.',
      },
    ],
  },
  {
    id: 'rect-widget',
    name: 'Rectangular widget',
    variant: 'Default material · up next and activity',
    summary:
      "A card on the watch's standard widget material: the next meeting, peeking at the bottom, and below it the day's activity.",
    aliases: ['widget', 'card', 'up next', 'activity widget'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Widget material',
        value: 'rgb(255 255 255 / 0.13) · 0.5px light edge',
        plain:
          "A translucent dark fill with a hairline of light along the edge: the glass the watch puts behind widgets that don't tint their own.",
      },
      {
        kind: 'appearance',
        term: "The app's colors",
        value: '#ffd60a calendar · ring colors',
        plain:
          "On the plain material, the app's colors carry the meaning: the calendar's yellow for the meeting; red, green and blue for the rings.",
      },
      {
        kind: 'behavior',
        term: 'Rises when it matters',
        plain:
          'The calendar widget tells the watch when it’s relevant, so it climbs the stack as the meeting gets close and drops back once it’s over.',
      },
    ],
  },
  {
    id: 'scroll-indicator',
    name: 'Digital Crown scroll indicator',
    variant: 'Shows while the crown turns',
    summary:
      'A short bar beside the Digital Crown that appears while the crown scrolls; its white thumb shows where you are in the stack. It fades once the stack rests.',
    aliases: ['scroll bar', 'scroll indicator', 'crown indicator', 'scrollbar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Next to the crown',
        value: '4 × 40px · 46px from the top',
        plain: "It sits at the screen's edge, level with the crown, so it reads as the crown's own gauge.",
      },
      {
        kind: 'appearance',
        term: 'Thumb',
        value: '24px · #fff on rgb(255 255 255 / 0.25)',
        plain: "The bright part's length is the share of the stack in view; its place is how far you've scrolled.",
      },
      {
        kind: 'behavior',
        term: 'Fades at rest',
        value: 'opacity 0.4s',
        plain:
          'It appears as the crown turns and fades about a second after it stops, so it never sits over content for long.',
      },
    ],
  },
];
