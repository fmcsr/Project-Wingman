import type { UiElementSpec } from '../../../catalog';

/** Elements in the Lanes board. `value` fields are the actual values from LanesSite.module.css and the markup. */
export const lanesSpecs: UiElementSpec[] = [
  {
    id: 'create-button',
    name: 'Create button',
    htmlTag: '<button>',
    variant: 'Primary · Top bar',
    summary: 'The one filled button in the top bar. It opens a form for a new work item from anywhere in the app.',
    aliases: ['new issue', 'new ticket', 'the + Create button', 'add task'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Primary button',
        value: { light: 'background: #0b7468 · color: #ffffff', dark: 'background: #3cc2ad · color: #0f2420' },
        plain: 'Teal, Lanes’ own color, and the only filled button up there, so it’s found without looking.',
      },
      {
        kind: 'behavior',
        term: 'Global action',
        value: 'Top bar · every page',
        plain: 'It lives in the bar that never changes, so creating work doesn’t depend on where you are.',
      },
      {
        kind: 'behavior',
        term: 'Shrinks to an icon',
        value: '@container (width < 760px)',
        plain: 'On narrow windows the word drops and the plus stays.',
      },
    ],
  },
  {
    id: 'space-sidebar',
    name: 'Sidebar navigation',
    htmlTag: '<nav>',
    variant: 'Your views · Starred and recent spaces',
    summary:
      'The column on the left: your own views (For you, Recent, Starred), then the team spaces you starred or opened lately.',
    aliases: ['left nav', 'project list', 'spaces', 'side navigation'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Current item',
        value: { light: 'background: #e1f3f0 · bar: #0b7468', dark: 'background: #173430 · bar: #3cc2ad' },
        plain: 'Checkout Squad, the space you are in, is tinted teal with a short bar on its left edge.',
      },
      {
        kind: 'appearance',
        term: 'Space avatars',
        value: '20 × 20px · border-radius: 5px',
        plain: 'Each space has a colored tile with a small picture, the same one its header shows.',
      },
      {
        kind: 'behavior',
        term: 'Collapsible',
        value: '@container (width < 1000px)',
        plain: 'The button beside the logo hides the sidebar, and narrow windows hide it on their own.',
      },
    ],
  },
  {
    id: 'board-header',
    name: 'Space header',
    variant: 'Breadcrumb · Name · Actions',
    summary:
      'The top of the page: a breadcrumb back to all spaces, the space’s name and avatar, its members and menu, and buttons to share, automate and go full screen.',
    aliases: ['page header', 'project title', 'board title', 'breadcrumbs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Breadcrumb',
        value: '“Spaces”',
        plain: 'The level above, as a link, so you can climb back to the list of spaces.',
      },
      {
        kind: 'appearance',
        term: 'Page title',
        value: 'font-size: 20px · font-weight: 650',
        plain: 'The largest text on the page, next to the space’s tile.',
      },
      {
        kind: 'appearance',
        term: 'Square icon buttons',
        value: '32 × 32px · border-radius: 4px',
        plain: 'Share, automation and full screen are quiet outlined squares; the plain ··· opens the space’s menu.',
      },
    ],
  },
  {
    id: 'view-tabs',
    name: 'View tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Icon and label · Underline',
    summary:
      'The same work seen different ways: a summary, a list, the board, a calendar, a timeline, pages and forms.',
    aliases: ['tabs', 'views', 'board or list', 'navigation tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected tab',
        value: { light: 'border-bottom: 2px solid #0b7468', dark: 'border-bottom: 2px solid #3cc2ad' },
        plain: 'Board is open: a teal underline and teal text.',
      },
      {
        kind: 'behavior',
        term: 'role="tab"',
        value: 'aria-selected="true"',
        plain: 'Screen readers hear them as tabs, and which one is chosen.',
      },
      {
        kind: 'behavior',
        term: 'Add a view',
        value: '+',
        plain: 'The plus at the end adds another view of the same work.',
      },
    ],
  },
  {
    id: 'board-search',
    name: 'Board search',
    htmlTag: '<div role="search">',
    variant: 'Filters the cards in place',
    summary: 'A search for this board only: typing hides the cards that don’t match, without leaving the page.',
    aliases: ['search board', 'filter cards', 'find a ticket'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Filters in place',
        value: '“Search board”',
        plain: 'Unlike the search in the top bar, it doesn’t open results; it narrows the board you’re looking at.',
      },
      {
        kind: 'appearance',
        term: 'Field border',
        value: { light: 'border: 1px solid #8c8f97', dark: 'border: 1px solid #5d6067' },
        plain: 'A darker border than the buttons around it marks it as a place to type.',
      },
    ],
  },
  {
    id: 'avatar-filter',
    name: 'Avatar filter',
    htmlTag: '<div role="group">',
    variant: 'Overlapping faces · Unassigned · +1',
    summary:
      'The team’s faces in a row. Clicking one shows only that person’s cards, clicking more adds them, and the gray one shows unassigned work.',
    aliases: ['assignee filter', 'quick filter', 'people filter', 'facepile', 'avatar group'],
    concepts: [
      {
        kind: 'behavior',
        term: 'A toggle per person',
        value: 'role="checkbox"',
        plain: 'Each face switches on and off, so “Kofi and Rosa” is two clicks.',
      },
      {
        kind: 'appearance',
        term: 'Overlap',
        value: 'margin-left: -4px · 30px circles',
        plain: 'The photos overlap a little, each cut out by a ring in the background color, so the row stays short.',
      },
      {
        kind: 'appearance',
        term: 'Overflow count',
        value: '“+1”',
        plain: 'After five faces, a gray circle counts the rest and lists them when clicked.',
      },
    ],
  },
  {
    id: 'column-header',
    name: 'Column header',
    variant: 'Status · Count · Done check',
    summary: 'The top of each column: the status its cards are in and how many there are. Done ends with a check.',
    aliases: ['status column', 'list header', 'column title', 'card count'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Uppercase status',
        value: 'font-size: 12px · text-transform: uppercase',
        plain: 'Small capitals keep the column names quieter than the cards under them.',
      },
      {
        kind: 'appearance',
        term: 'Count lozenge',
        value: { light: 'background: #e9eaee', dark: 'background: #37393d' },
        plain: 'How many cards the column holds across every swimlane.',
      },
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 48px',
        plain: 'The headers stay pinned under the top bar while you scroll down the board.',
      },
    ],
  },
  {
    id: 'wip-limit',
    name: 'WIP limit',
    variant: 'Max 4 · Over the limit',
    summary:
      'The most cards a column should hold at once. In progress has five against a limit of four, so the whole column turns red until something moves on.',
    aliases: ['work in progress limit', 'column limit', 'max', 'column constraint'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Over-limit column',
        value: { light: 'background: #ffeceb', dark: 'background: #3a2321' },
        plain: 'The header and every cell in the column turn red, and the count fills in red.',
      },
      {
        kind: 'appearance',
        term: 'Limit with a warning',
        value: '“Max 4”',
        plain: 'The limit sits at the end of the header, with a warning sign while it’s exceeded.',
      },
      {
        kind: 'behavior',
        term: 'A soft limit',
        value: '5 > 4',
        plain:
          'Nothing is blocked; the color only says to finish work before starting more. Dropping the dragged card in In review brings the column back to four.',
      },
    ],
  },
  {
    id: 'swimlane',
    name: 'Swimlane',
    variant: 'Grouped by epic · Everything else',
    summary:
      'A band across every column that groups related cards. Each lane here is an epic, and the last one holds work without an epic.',
    aliases: ['lane', 'row', 'group by epic', 'horizontal group'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Group by',
        value: '“Group: Epic”',
        plain:
          'The teal Group button in the filter bar picks what the lanes are: epics, assignees, or no lanes at all.',
      },
      {
        kind: 'appearance',
        term: 'Lane header',
        value: 'CHK-88 · (8 work items) · IN PROGRESS',
        plain: 'The epic’s key and name, how much work it holds, its own status and its owner.',
      },
      {
        kind: 'behavior',
        term: 'Collapsible',
        value: 'aria-expanded="true"',
        plain: 'The chevron folds a lane away to make room for the others.',
      },
    ],
  },
  {
    id: 'issue-card',
    name: 'Card',
    htmlTag: '<article>',
    variant: 'Title · Labels · Footer',
    summary:
      'One work item: the title first, then labels and the due date, then a footer with the type and key, the priority, the estimate and the assignee.',
    aliases: ['ticket', 'issue', 'work item', 'task card', 'story'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Raised surface',
        value: { light: 'box-shadow: 0 1px 1px rgb(30 31 33 / 0.22)', dark: 'box-shadow: 0 1px 1px rgb(0 0 0 / 0.55)' },
        plain: 'White on the gray column with a faint shadow, so each card reads as something you can pick up.',
      },
      {
        kind: 'appearance',
        term: 'Title first',
        value: 'font-size: 14px · line-height: 20px',
        plain: 'The title is the largest text on the card; everything else is a small icon or chip.',
      },
      {
        kind: 'behavior',
        term: 'Drag to change status',
        value: 'In progress → In review',
        plain: 'Moving a card to another column changes its status; dropping it in another lane changes its epic.',
      },
    ],
  },
  {
    id: 'flagged-card',
    name: 'Flagged card',
    variant: 'Yellow · Red flag',
    summary:
      'A card flagged as blocked by something outside the team. It stays yellow, with a flag, until the flag is removed.',
    aliases: ['blocked', 'impediment', 'flag', 'highlighted card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Yellow card',
        value: { light: 'background: #fff7d6', dark: 'background: #3a3322' },
        plain: 'The only card that isn’t white, so a blocker stands out across the whole board.',
      },
      {
        kind: 'appearance',
        term: 'Flag icon',
        value: { light: 'color: #c9372c', dark: 'color: #fd9891' },
        plain: 'A red flag in the footer says it with a shape as well as a color.',
      },
    ],
  },
  {
    id: 'label',
    name: 'Label',
    variant: 'Gray lozenge',
    summary: 'Free-form tags such as web or payments, for slicing work in ways the columns and lanes don’t.',
    aliases: ['tag', 'lozenge', 'chip', 'category'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Lozenge',
        value: {
          light: 'background: #e9eaee · border-radius: 3px',
          dark: 'background: #37393d · border-radius: 3px',
        },
        plain: 'Small, gray and square-cornered, so labels don’t compete with the colored type and priority icons.',
      },
      {
        kind: 'behavior',
        term: 'Filterable',
        value: 'Filter → Labels',
        plain: 'The Filter button can show only the cards with a label, such as everything for iOS.',
      },
    ],
  },
  {
    id: 'due-date',
    name: 'Due date',
    variant: 'Calendar chip · Overdue',
    summary: 'When the work is due. The chip turns red once the date has passed, like CHK-142’s, due yesterday.',
    aliases: ['deadline', 'due', 'date chip', 'overdue'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overdue',
        value: { light: 'color: #c9372c · background: #ffeceb', dark: 'color: #fd9891 · background: #3a2321' },
        plain: 'Nov 16 has passed, so its chip is red; dates still ahead stay gray.',
      },
      {
        kind: 'appearance',
        term: 'Outlined chip',
        value: 'height: 22px · border-radius: 4px',
        plain: 'A small calendar and a short date, outlined rather than filled like the labels beside it.',
      },
    ],
  },
  {
    id: 'issue-key',
    name: 'Work item key',
    variant: 'Type icon · Key · Struck through when done',
    summary:
      'The work item’s ID, the space’s short code and a number, after an icon for its type: a story, a task or a bug.',
    aliases: ['issue key', 'ticket number', 'ID', 'issue type'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Type icon',
        value: {
          light: 'story: #22a06b · task: #357de8 · bug: #e2483d',
          dark: 'story: #2abb7f · task: #4c8ff0 · bug: #f15b50',
        },
        plain: 'A green bookmark is a story, a blue check a task and a red dot a bug: a shape and a color for each.',
      },
      {
        kind: 'appearance',
        term: 'Done',
        value: 'text-decoration: line-through',
        plain: 'In the Done column the key is struck through, so finished work reads as finished wherever it appears.',
      },
      {
        kind: 'behavior',
        term: 'Stable reference',
        value: '“CHK-142”',
        plain: 'The key never changes, so people paste it into chats, commits and docs to point at the work.',
      },
    ],
  },
  {
    id: 'priority-icon',
    name: 'Priority icon',
    variant: 'Highest · High · Medium · Low',
    summary:
      'How urgent the work is, as a small colored symbol: chevrons up for urgent, two bars for normal, a chevron down for later.',
    aliases: ['priority', 'urgency', 'the little arrows', 'severity'],
    concepts: [
      {
        kind: 'appearance',
        term: 'A shape for each level',
        value: '⌃⌃ · ⌃ · = · ⌄',
        plain: 'Two chevrons are highest, one high, two bars medium and a chevron down low, so it reads without color.',
      },
      {
        kind: 'appearance',
        term: 'A color for each level',
        value: {
          light: 'high: #e2483d · medium: #e06c00 · low: #357de8',
          dark: 'high: #f87168 · medium: #fea362 · low: #6ca4f8',
        },
        plain: 'Red for urgent, orange for normal, blue for low, the same everywhere in the app.',
      },
    ],
  },
  {
    id: 'story-points',
    name: 'Story points',
    variant: 'Estimate pill',
    summary:
      'The team’s estimate of how big the work is, in points rather than hours, so different work can be compared.',
    aliases: ['estimate', 'points', 'sizing', 'effort'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gray pill',
        value: 'height: 18px · border-radius: 9px',
        plain: 'A small rounded number just before the assignee.',
      },
      {
        kind: 'behavior',
        term: 'Relative size',
        value: '1 · 2 · 3 · 5',
        plain: 'Points follow a rough scale: a 5 is a bit less than twice a 3, whoever does the work.',
      },
    ],
  },
  {
    id: 'assignee',
    name: 'Assignee',
    variant: 'Photo avatar',
    summary: 'Who is working on the card, as their photo in its bottom-right corner.',
    aliases: ['owner', 'avatar', 'assigned to', 'person'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Round photo',
        value: '24 × 24px · border-radius: 50%',
        plain: 'Always in the same corner, so you can scan a column for your own face.',
      },
      {
        kind: 'behavior',
        term: 'alt text',
        value: 'alt="Kofi Mensah"',
        plain: 'Each photo carries the person’s name for screen readers.',
      },
    ],
  },
  {
    id: 'dragged-card',
    name: 'Dragged card',
    variant: 'Lifted · Tilted · Deep shadow',
    summary:
      'A card in the middle of a move: picked up out of In progress, tilted a little and floating in a deep shadow over the place it will land.',
    aliases: ['drag and drop', 'card being moved', 'drag preview', 'ghost card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Lift',
        value: 'transform: translate(-30px, -16px) rotate(2.5deg)',
        plain: 'An offset and a slight tilt make it look held in the hand rather than set down.',
      },
      {
        kind: 'appearance',
        term: 'Deep shadow',
        value: {
          light: 'box-shadow: 0 14px 28px rgb(9 30 66 / 0.24)',
          dark: 'box-shadow: 0 14px 28px rgb(0 0 0 / 0.6)',
        },
        plain: 'A bigger, softer shadow than any card on the board puts it above everything else.',
      },
      {
        kind: 'behavior',
        term: 'Counted where it was',
        value: 'In progress · 5',
        plain: 'Until it’s dropped, it still counts toward In progress, which is why that column is over its limit.',
      },
    ],
  },
  {
    id: 'drop-placeholder',
    name: 'Drop placeholder',
    variant: 'Dashed slot',
    summary: 'An empty slot the size of the dragged card, open where the card would land if you let go now.',
    aliases: ['drop zone', 'drop target', 'insertion point', 'gap'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dashed outline',
        value: {
          light: 'border: 2px dashed #7cc5bb · background: #e1f3f0',
          dark: 'border: 2px dashed #2f8679 · background: #173430',
        },
        plain: 'A dashed teal box, in the color of the board’s other choices, marks the landing spot.',
      },
      {
        kind: 'behavior',
        term: 'Makes room',
        value: 'same size as the card',
        plain: 'The cards below move down to open the gap, so you see the new order before you drop.',
      },
    ],
  },
];
