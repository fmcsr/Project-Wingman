import type { UiElementSpec } from './types';

/** Orbit analiz panelindeki öğeler. `value` alanları OrbitDashboard.module.css'teki gerçek değerlerdir. */
export const dashboard: UiElementSpec[] = [
  {
    id: 'sidebar',
    name: 'Sidebar',
    htmlTag: '<aside>',
    variant: 'App navigation',
    summary: "A vertical panel with the app's main sections. It stays in place while the content next to it changes.",
    aliases: ['side menu', 'left nav'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Divider',
        value: 'border-right: 1px',
        plain: 'A hairline separates navigation from content.',
      },
      {
        kind: 'behavior',
        term: 'Collapsed rail',
        value: '@container (width < 640px)',
        plain: 'On narrow screens the labels hide and only the icons remain, saving space.',
      },
    ],
  },
  {
    id: 'search-field',
    name: 'Search field',
    htmlTag: '<input type="search">',
    variant: 'With icon and shortcut',
    summary: 'A text box for finding things fast. The hint inside tells you what you can search for.',
    aliases: ['search bar', 'search box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: 'Search customers…',
        plain: "Gray hint text that disappears when you start typing. It's an example, not a label.",
      },
      {
        kind: 'appearance',
        term: 'Leading icon',
        value: '16px',
        plain: 'A magnifier at the start makes the purpose clear at a glance.',
      },
      {
        kind: 'behavior',
        term: 'Keyboard shortcut',
        value: '⌘K',
        plain: 'A key combination that jumps straight into search — a favorite of power users.',
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    variant: 'Initials',
    summary: "A small circle that stands for a person — their photo, or their initials when there's no photo.",
    aliases: ['profile picture', 'user icon', 'the round photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Circle crop',
        value: 'border-radius: 50%',
        plain: 'A 50% radius turns a square into a perfect circle.',
      },
      {
        kind: 'appearance',
        term: 'Initials fallback',
        value: '“FC”',
        plain: 'Without a photo, initials on a colored background keep it personal.',
      },
    ],
  },
  {
    id: 'segmented-control',
    name: 'Segmented control',
    variant: 'Day · Week · Month',
    summary: 'A row of connected options where exactly one is selected. Great for switching views of the same data.',
    aliases: ['toggle group', 'switcher', 'the D/W/M buttons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected segment',
        value: 'background: #fff + box-shadow',
        plain: 'The active option looks raised, like a key pressed into place.',
      },
      {
        kind: 'behavior',
        term: 'Single choice',
        value: 'role="radiogroup"',
        plain: 'Works like radio buttons: picking one deselects the others.',
      },
    ],
  },
  {
    id: 'stat-card',
    name: 'Stat card',
    variant: 'KPI',
    summary: 'A small card that shows one key number, its label, and how it changed.',
    aliases: ['KPI card', 'metric', 'number box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Large number',
        value: '24px · 600',
        plain: 'The value is the hero; the label above it stays small and gray.',
      },
      {
        kind: 'appearance',
        term: 'Tabular numbers',
        value: 'font-variant-numeric: tabular-nums',
        plain: "Every digit takes the same width, so numbers line up and don't jiggle when they update.",
      },
    ],
  },
  {
    id: 'delta-badge',
    name: 'Trend badge',
    variant: 'Delta',
    summary: 'A tiny pill that shows how much a number went up or down, colored by direction.',
    aliases: ['change indicator', 'percent badge', 'the green arrow'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Semantic color',
        value: 'green ↑ · red ↓',
        plain:
          "Green means up and red means down — and the arrow carries the meaning too, for people who can't tell the colors apart.",
      },
    ],
  },
  {
    id: 'area-chart',
    name: 'Area chart',
    htmlTag: '<svg>',
    variant: 'With gradient fill',
    summary: 'A line chart with the space under the line filled in, so a trend reads as volume.',
    aliases: ['graph', 'trend chart', 'the wave chart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'SVG path',
        value: '<path d="M0 …">',
        plain: 'The line is a vector path, so it stays sharp at any size.',
      },
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: '<linearGradient> 28% → 0%',
        plain: 'The fill fades from the line color to transparent toward the bottom.',
      },
      {
        kind: 'appearance',
        term: 'Gridlines',
        value: 'stroke-dasharray: 4 4',
        plain: 'Faint dashed lines help the eye estimate values without adding noise.',
      },
    ],
  },
  {
    id: 'data-table',
    name: 'Data table',
    htmlTag: '<table>',
    variant: 'Recent invoices',
    summary: 'Rows and columns for comparing records side by side.',
    aliases: ['list', 'grid', 'spreadsheet view'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Header row',
        value: 'uppercase · 11px',
        plain: 'Small, muted column titles label the data without competing with it.',
      },
      {
        kind: 'appearance',
        term: 'Right-aligned numbers',
        value: 'text-align: right',
        plain: 'Amounts align on the right so the digits line up and are easy to compare.',
      },
      {
        kind: 'appearance',
        term: 'Row dividers',
        value: 'border-bottom: 1px',
        plain: 'Hairlines between rows guide the eye across.',
      },
    ],
  },
  {
    id: 'status-pill',
    name: 'Status pill',
    variant: 'Paid · Pending · Overdue',
    summary: 'A colored label that shows the state of an item at a glance.',
    aliases: ['status tag', 'the colored label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tinted background',
        value: 'pale fill + dark text',
        plain: 'A pale background with darker text from the same color family stays readable.',
      },
      {
        kind: 'behavior',
        term: 'Text plus color',
        value: 'never color alone',
        plain: 'The word states the status too, so it works for everyone, including color-blind users.',
      },
    ],
  },
];
