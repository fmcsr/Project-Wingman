import type { UiElementSpec } from '../../../catalog';

/** Parts of the Cohort table element, in the order they appear. `value` fields are the actual values from CohortTable. */
export const cohortTableSpecs: UiElementSpec[] = [
  {
    id: 'cohort-table',
    name: 'Cohort table',
    htmlTag: '<table>',
    variant: 'Weekly retention · Week 0 to Week 8',
    summary:
      'People grouped by the week they signed up, a row per group, and the share of each group still active every week since. Down a column you compare groups at the same age; across a row you follow one group over time.',
    aliases: [
      'retention table',
      'retention triangle',
      'cohort analysis',
      'retention heatmap',
      'the staircase of percentages',
    ],
    concepts: [
      {
        kind: 'appearance',
        term: 'Retention triangle',
        value: 'Sep 14: Week 0–8 · Nov 9: Week 0',
        plain:
          'Older groups have had more weeks to come back, so their rows are longer. The filled cells form a staircase; the empty corner below it is weeks that haven’t happened yet.',
      },
      {
        kind: 'behavior',
        term: 'Weekly refresh',
        value: 'the diagonal fills in, 60ms a row · then the new row',
        plain:
          'When a week ends, every group gains one cell along the diagonal and the newest group gets its first row, so the staircase grows by a step.',
      },
      {
        kind: 'behavior',
        term: 'Hover crosshair',
        value: 'other cells: opacity 0.35 · 150ms',
        plain:
          'Pointing at a cell keeps its row and its column at full strength and fades the rest back, so you can read along both at once.',
      },
      {
        kind: 'behavior',
        term: 'Columns drop off',
        value: 'about 40px a week · Week 0–4 on the narrowest phones',
        plain:
          'On a narrower screen the latest weeks leave on the right, a column at a time, instead of squeezing every number until it can’t be read.',
      },
    ],
  },
  {
    id: 'cohort-table-scale',
    name: 'Color scale',
    variant: '0% → 100% · one indigo',
    summary:
      'The key to the shading: a bar from the palest shade at 0% to the deepest at 100%, so a darker cell always means more people stayed.',
    aliases: ['legend', 'color key', 'gradient legend', 'heat scale'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sequential scale',
        value: {
          light: 'oklch(0.975 0.012 272) → oklch(0.46 0.19 272)',
          dark: 'oklch(0.25 0.03 272) → oklch(0.64 0.16 272)',
        },
        plain:
          'One hue from pale to deep: only the amount changes, never the color, so nobody mistakes a different hue for a different kind of thing. In dark mode it runs from dim to bright.',
      },
      {
        kind: 'appearance',
        term: 'color-mix(in oklab)',
        value: 'color-mix(in oklab, <deep> <share>%, <pale>)',
        plain:
          'Each cell’s shade is its percentage mixed into the scale, in a color space where equal steps look equal: 38% is a little over a third of the way to the deepest indigo.',
      },
      {
        kind: 'appearance',
        term: 'Top right of the report',
        value: '64px × 8px · 10.5px labels',
        plain: 'It sits in the report’s title row, out of the way of the numbers, with its two ends spelled out.',
      },
    ],
  },
  {
    id: 'cohort-table-row',
    name: 'Cohort row',
    htmlTag: '<tr>',
    variant: 'Week of Oct 5 · 1,204 people',
    summary:
      'One group: everyone who signed up in the same week, how many of them there were and the share still active in each week since.',
    aliases: ['cohort', 'sign-up week', 'row', 'the group of users'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Row header',
        value: 'start of the week · size · tabular-nums',
        plain:
          'The Monday the week starts and the size of the group come first, so every percentage has its “out of how many” right beside it.',
      },
      {
        kind: 'behavior',
        term: 'A cell a week',
        value: 'Oct 5: Week 0–5',
        plain:
          'A group gets one new cell each week. Oct 5 signed up six weeks ago, so it has six: the sign-up week and five more.',
      },
      {
        kind: 'behavior',
        term: 'Row highlight',
        value: 'label and size: 600 weight',
        plain: 'The row under the pointer names itself in bold while the other rows fade back.',
      },
    ],
  },
  {
    id: 'cohort-table-cell',
    name: 'Retention cell',
    htmlTag: '<td>',
    variant: 'Week 3 · 38%',
    summary:
      'The share of one group still active a given number of weeks after signing up, as a number and as a shade of the scale.',
    aliases: ['cell', 'retention rate', 'percentage box', 'heatmap cell'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Shaded cell',
        value: '13px tall · gap: 2px · border-radius: 2px',
        plain:
          'A small tile in the shade for its percentage, 2px apart from its neighbors so a long row of similar shades still reads as separate weeks.',
      },
      {
        kind: 'appearance',
        term: 'Contrasting text',
        value: { light: 'ink below 70% · white from 70%', dark: 'white on every shade' },
        plain:
          'The number switches to white where the shade gets deep, so it stays readable from the palest cell to the darkest.',
      },
      {
        kind: 'behavior',
        term: 'Week 0 is 100%',
        value: 'Week 0 = the sign-up week',
        plain:
          'Everyone is active the week they sign up, so the first column is always full and the darkest; the drop to Week 1 is the first thing people look at.',
      },
      {
        kind: 'behavior',
        term: 'Hover outline',
        value: 'border: 1.5px · slides in 180ms',
        plain: 'The cell under the pointer gets an outline that follows the pointer from cell to cell.',
      },
    ],
  },
  {
    id: 'cohort-table-average',
    name: 'Average row',
    htmlTag: '<tfoot>',
    variant: 'All users · weighted by group size',
    summary:
      'The bottom line: all the groups together, each week averaged over the groups that have reached it, so it shows the typical retention curve in one row.',
    aliases: ['All users row', 'total row', 'overall retention', 'summary row', 'the bottom row'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Weighted average',
        value: 'Week 1: 5,158 of 9,472 = 54%',
        plain:
          'It adds up the people, not the percentages, so a big group counts for more than a small one: Week 1 is everyone who came back in Week 1 out of everyone who’s had one.',
      },
      {
        kind: 'behavior',
        term: 'Only groups that got there',
        value: 'Week 8: Sep 14 only · 31%',
        plain:
          'A late week is averaged over the few groups old enough to have it, so the right end of the row moves more as new weeks come in.',
      },
      {
        kind: 'appearance',
        term: 'Closing row',
        value: '600 weight · 1px hairline above',
        plain: 'Bold, under a thin line, so it reads as the total of the rows above rather than one more group.',
      },
    ],
  },
  {
    id: 'cohort-table-tooltip',
    name: 'Tooltip',
    htmlTag: '<div role="tooltip">',
    variant: 'Week, share and group size',
    summary:
      'A small dark label over the cell you point at, spelling out what the shade only hints at: the week, the share, out of how many, and how many people that is.',
    aliases: ['hover card', 'hover label', 'popup', 'info bubble'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted label',
        value: { light: 'background: #1c2024 · 11px', dark: 'background: #33363e · 11px' },
        plain: 'Dark with white text in both themes, so it stands apart from every shade under it.',
      },
      {
        kind: 'appearance',
        term: 'Value first',
        value: '"Week 3: 38% of 1,204" · 600 weight',
        plain: 'The number you came for leads in bold; the group and the head count follow in a quieter line.',
      },
      {
        kind: 'behavior',
        term: 'Follows the pointer',
        value: 'transform · 180ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        plain: 'It glides from cell to cell with the pointer, its arrow always on the middle of the cell.',
      },
    ],
  },
];
