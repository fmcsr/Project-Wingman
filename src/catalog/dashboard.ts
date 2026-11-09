import type { UiElementSpec } from './types';

/**
 * Elements in the Orbit analytics dashboard, in on-screen order. `value` fields are the actual values from
 * OrbitDashboard.module.css. `avatar` is shared with Wave, and Orbit's nav links use `nav-link` from marketing.ts.
 */
export const dashboard: UiElementSpec[] = [
  {
    id: 'sidebar',
    name: 'Sidebar',
    htmlTag: '<aside>',
    variant: 'App navigation',
    summary: "A vertical panel with the app's main sections. It stays in place while the page next to it scrolls.",
    aliases: ['side menu', 'left nav', 'side nav'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Sticky position',
        value: 'position: sticky; top: 8px',
        plain: 'The links stay in view while you scroll down the page, so another section is always one click away.',
      },
      {
        kind: 'behavior',
        term: 'Collapsed rail',
        value: '@container orbit (width < 1000px)',
        plain: 'On narrower screens the labels hide and only the icons remain, saving space for the data.',
      },
      {
        kind: 'behavior',
        term: 'Dark mode',
        value: 'light-dark()',
        plain: 'Every color in the app is defined twice, once for light and once for dark, and it follows the theme you pick.',
      },
    ],
  },
  {
    id: 'workspace-switcher',
    name: 'Workspace switcher',
    variant: 'Icon · Name · Chevrons',
    summary:
      "Shows which workspace (a company or a team) you're looking at, and opens a list to switch to another one.",
    aliases: ['team switcher', 'account picker', 'org dropdown', 'the company name at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Workspace icon',
        value: '24px · border-radius: 7px',
        plain: "The workspace's initial on a rounded square, standing in until the team uploads its own logo.",
      },
      {
        kind: 'appearance',
        term: 'Up-and-down chevrons',
        value: '16px',
        plain:
          'A small chevron pointing up above one pointing down says “this opens a list to choose from”, the usual sign of a switcher.',
      },
      {
        kind: 'behavior',
        term: 'Switch context',
        plain: "Picking another workspace reloads the whole app with that company's data, without signing out.",
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
        value: 'Search customers, events…',
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
    id: 'date-range-picker',
    name: 'Date range picker',
    htmlTag: '<button>',
    variant: 'Preset · Dates',
    summary:
      'A button that shows the period the whole page covers. It opens a calendar with quick presets to change it.',
    aliases: ['date filter', 'calendar dropdown', 'time range', 'the dates button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Preset label',
        value: 'Last 30 days',
        plain: 'A friendly name for the range sits next to the exact dates, so you know both at a glance.',
      },
      {
        kind: 'behavior',
        term: 'Global filter',
        value: 'Oct 10 – Nov 8, 2026',
        plain:
          'It sits above everything it filters: the cards, the chart, the breakdowns and the table all use the same dates, so their numbers agree.',
      },
    ],
  },
  {
    id: 'compare-toggle',
    name: 'Compare toggle',
    htmlTag: '<button role="switch">',
    variant: 'On · Previous period',
    summary: 'A switch that adds the previous period to the chart, so you can see whether things got better or worse.',
    aliases: ['compare to previous period', 'comparison switch', 'vs last period'],
    concepts: [
      {
        kind: 'appearance',
        term: 'On state',
        value: { light: 'background: #2f6fed', dark: 'background: #4c8dff' },
        plain: 'The track fills with the accent color and the knob slides right: the comparison is on.',
      },
      {
        kind: 'behavior',
        term: 'Comparison period',
        value: 'Sep 10 – Oct 9',
        plain:
          'The 30 days just before the selected range. The chart draws them as a dashed line, and every change on the page is measured against them.',
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
        value: { light: 'background: #ffffff + box-shadow', dark: 'background: #2b2b30 + box-shadow' },
        plain: 'The active option looks raised, like a key pressed into place.',
      },
      {
        kind: 'behavior',
        term: 'Single choice',
        value: 'role="radiogroup"',
        plain: 'Works like radio buttons: picking one deselects the others. Here it sets how finely the chart is drawn.',
      },
    ],
  },
  {
    id: 'stat-card',
    name: 'Stat card',
    variant: 'KPI · With sparkline',
    summary: 'A small card that shows one key number, its label, how it changed and its recent trend.',
    aliases: ['KPI card', 'metric', 'number box', 'scorecard'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Large number',
        value: '26px · 600',
        plain: 'The value is the hero; the label above it stays small and gray.',
      },
      {
        kind: 'behavior',
        term: 'Comparison value',
        value: 'from $74,920',
        plain: 'A short note says what the change is measured against, so “+12.4%” has a meaning you can check.',
      },
      {
        kind: 'behavior',
        term: 'Responsive grid',
        value: 'repeat(4, minmax(0, 1fr))',
        plain: 'Four cards side by side on wide screens, two by two on narrow ones.',
      },
    ],
  },
  {
    id: 'delta-badge',
    name: 'Trend badge',
    variant: 'Delta · Good or bad',
    summary: "A tiny badge that shows how much a number went up or down, colored by whether that's good news.",
    aliases: ['change indicator', 'percent badge', 'the green arrow'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Semantic color',
        value: { light: '#117a43 on #e9f6ee', dark: '#4cc38a on rgb(76 195 138 / 0.13)' },
        plain:
          "Green means good news and red bad, whatever the direction: churn going down is good, so its ↓ badge is green too. The arrow carries the direction for people who can't tell the colors apart.",
      },
      {
        kind: 'appearance',
        term: 'Percentage points',
        value: '0.5 pts',
        plain:
          'A rate that moves from 3.4% to 2.9% changed by 0.5 percentage points, not by 0.5%. Good dashboards say which one they mean.',
      },
    ],
  },
  {
    id: 'sparkline',
    name: 'Sparkline',
    htmlTag: '<svg>',
    variant: 'Line · 30 days',
    summary: 'A tiny chart with no axes or labels that shows the shape of a trend right next to its number.',
    aliases: ['mini chart', 'trend line', 'the little graph in the card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'No axes',
        value: 'viewBox="0 0 100 32"',
        plain:
          'Only the shape matters here, so there are no gridlines or labels. The exact numbers live in the big chart and its tooltip.',
      },
      {
        kind: 'appearance',
        term: 'End dot',
        value: '7px',
        plain: 'A dot marks the latest value, the one the big number above shows.',
      },
    ],
  },
  {
    id: 'area-chart',
    name: 'Area chart',
    htmlTag: '<svg>',
    variant: 'With comparison line',
    summary:
      'A line chart with the space under the line softly filled. Here the previous period runs dashed behind it for comparison.',
    aliases: ['graph', 'trend chart', 'line chart', 'the wave chart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Comparison line',
        value: 'stroke-dasharray: 4 3',
        plain: 'Last period is drawn dashed and gray behind this one, so the gap between the two lines is the growth.',
      },
      {
        kind: 'appearance',
        term: 'Gridlines and axis',
        value: '1px solid · $50k–$90k',
        plain:
          'Faint solid lines and values up the side give the curve a scale you can read; they stay quiet so the data is the loudest thing.',
      },
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: '<linearGradient> 16% → 0%',
        plain: 'The fill fades from the line color to transparent toward the bottom.',
      },
    ],
  },
  {
    id: 'chart-annotation',
    name: 'Chart annotation',
    variant: 'Event marker',
    summary: 'A note pinned to a date on a chart, so everyone can see what happened when the line changed.',
    aliases: ['event marker', 'chart note', 'the little flag on the chart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Flag and pole',
        value: 'border-left: 1px',
        plain: 'A label on a thin vertical line marks the exact day: Oct 21, when the Teams plan launched and MRR jumped.',
      },
      {
        kind: 'behavior',
        term: 'Shared context',
        value: 'Teams launch',
        plain: 'Teams pin launches, price changes and outages to their charts, so nobody has to ask why a line suddenly moved.',
      },
    ],
  },
  {
    id: 'chart-tooltip',
    name: 'Tooltip',
    variant: 'Chart · With crosshair',
    summary: 'A small box that appears while you hover a chart and shows the exact values for that day.',
    aliases: ['hover card', 'data popup', 'the box that follows the mouse'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Crosshair',
        value: 'border-left: 1px solid',
        plain:
          'A thin vertical line follows the pointer and snaps to the nearest day, with a dot where it crosses each line.',
      },
      {
        kind: 'appearance',
        term: 'Values first',
        value: 'font-weight: 600',
        plain: "The numbers are bold and the labels gray: you already know which line you're on, you want the number.",
      },
      {
        kind: 'appearance',
        term: 'Line keys',
        value: '14 × 2px',
        plain: 'Each row starts with a short stroke that matches its line: solid for this period, dashed for the one before.',
      },
    ],
  },
  {
    id: 'bar-list',
    name: 'Bar list',
    variant: 'Breakdown with inline bars',
    summary:
      'A ranked list where each row has a bar behind it, so you can compare the values at a glance and still read the exact numbers.',
    aliases: ['breakdown', 'top list', 'horizontal bar chart', 'leaderboard'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inline bar',
        value: { light: 'background: #eaf1fe', dark: 'background: rgb(76 141 255 / 0.15)' },
        plain: "Each bar's length is its row's value compared with the largest one; the label sits on top of the bar.",
      },
      {
        kind: 'behavior',
        term: 'Sorted largest first',
        value: 'descending',
        plain: 'The ranking reads from top to bottom. The new Teams plan already sits above Starter.',
      },
      {
        kind: 'appearance',
        term: 'Total row',
        value: 'Total $84,210',
        plain: 'A footer adds up the rows, so the breakdown visibly matches the headline number.',
      },
    ],
  },
  {
    id: 'data-table',
    name: 'Data table',
    htmlTag: '<table>',
    variant: 'Recent payments',
    summary: 'Rows and columns for comparing records side by side.',
    aliases: ['list', 'grid', 'spreadsheet view'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Header row',
        value: '12px · 500',
        plain: 'Small, muted column titles label the data without competing with it.',
      },
      {
        kind: 'appearance',
        term: 'Right-aligned numbers',
        value: 'text-align: right · tabular-nums',
        plain:
          'Amounts align on the right and every digit takes the same width, so the cents line up and are easy to compare.',
      },
      {
        kind: 'behavior',
        term: 'Stacked rows',
        value: '@container panel (width < 480px)',
        plain:
          'On a phone each row becomes two lines, the customer on the left and the amount and status on the right, instead of squeezed columns.',
      },
    ],
  },
  {
    id: 'status-pill',
    name: 'Status pill',
    variant: 'Paid · Pending · Failed · Refunded',
    summary: 'A colored label that shows the state of an item at a glance.',
    aliases: ['status tag', 'status badge', 'the colored label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tinted background',
        value: { light: 'pale fill + dark text + 1px ring', dark: 'tinted fill + light text + 1px ring' },
        plain:
          'A soft tint of the status color behind text in a stronger shade of the same color stays readable; a hairline ring keeps its edge crisp.',
      },
      {
        kind: 'behavior',
        term: 'Text plus color',
        value: 'never color alone',
        plain: 'A dot and the word state the status too, so it works for everyone, including color-blind users.',
      },
    ],
  },
];
