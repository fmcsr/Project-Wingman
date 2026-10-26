import type { UiElementSpec } from '../../../catalog';

/** Elements in the Tracker issue tracker. `value` fields are the actual values from TrackerSite.module.css. */
export const trackerSpecs: UiElementSpec[] = [
  {
    id: 'workspace-switcher',
    name: 'Workspace switcher',
    htmlTag: '<button>',
    variant: 'Logo · name · chevron',
    summary:
      "The workspace's logo and name at the top of the sidebar. Clicking it opens a menu to switch workspaces or open their settings.",
    aliases: ['the company name at the top left', 'org switcher', 'account menu'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Workspace logo',
        value: '20 × 20px · border-radius: 5px',
        plain: "A small rounded square with the workspace's initial, so you can tell workspaces apart at a glance.",
      },
      {
        kind: 'appearance',
        term: 'Chevron',
        value: '12 × 12px',
        plain: 'The small arrow after the name hints that clicking opens a menu.',
      },
      {
        kind: 'behavior',
        term: 'aria-haspopup',
        value: 'aria-haspopup="menu"',
        plain: 'Tells screen readers that this control opens a menu, just as the chevron tells everyone else.',
      },
    ],
  },
  {
    id: 'new-issue-button',
    name: 'Create button',
    htmlTag: '<button>',
    variant: 'New issue · with shortcut',
    summary:
      "The app's main action, kept at the top of the sidebar so it's always one click away. The key cap on the right says you can press C instead.",
    aliases: ['new button', 'the New issue button', 'add button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Raised surface',
        value: { light: 'box-shadow: 0 1px 2px rgb(16 17 20 / 0.06)', dark: 'box-shadow: 0 1px 2px rgb(0 0 0 / 0.4)' },
        plain: 'A solid fill, a hairline border and a tiny shadow make it look pressable against the gray sidebar.',
      },
      {
        kind: 'appearance',
        term: 'Leading icon',
        value: '16 × 16px',
        plain: 'A pencil-on-paper icon before the words makes the action recognizable at a glance.',
      },
      {
        kind: 'behavior',
        term: 'aria-keyshortcuts',
        value: 'aria-keyshortcuts="C"',
        plain: 'Declares the shortcut in code, so screen readers can announce the same key the cap shows.',
      },
    ],
  },
  {
    id: 'shortcut-hint',
    name: 'Keyboard shortcut hint',
    htmlTag: '<kbd>',
    variant: 'Key caps',
    summary:
      'Small key caps that show which key does the same thing as a click. They sit next to actions, inside menus, and in a tip at the end of the list.',
    aliases: ['hotkey', 'the little letter boxes', 'keyboard tip'],
    concepts: [
      {
        kind: 'appearance',
        term: '<kbd>',
        value: '<kbd>C</kbd>',
        plain: 'The HTML element for keyboard input. Styled like a tiny key, it reads as “press this”, not as text.',
      },
      {
        kind: 'appearance',
        term: 'Key cap',
        value: 'height: 18px · 1px border · border-radius: 4px',
        plain: 'Every key gets the same small box, so hints line up neatly in buttons and menus.',
      },
      {
        kind: 'appearance',
        term: 'Modifier symbols',
        value: '⌘ ⇧',
        plain: '⌘ is Command and ⇧ is Shift. Each key in a combination gets its own cap: ⌘ ⇧ , copies the link.',
      },
      {
        kind: 'behavior',
        term: 'Consistent shortcuts',
        value: 'C everywhere',
        plain: 'The button and the tip teach the same key, so people pick up shortcuts just by using the app.',
      },
    ],
  },
  {
    id: 'nav-item',
    name: 'Nav item',
    htmlTag: '<a>',
    variant: 'With count · Current page',
    summary: 'A link in the sidebar that takes you to a section. Some carry a number: how much is waiting there.',
    aliases: ['menu item', 'sidebar link', 'the inbox count'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count badge',
        value: 'background: #5e6ad2 · border-radius: 999px',
        plain: "Inbox's 3 sits in a filled pill: unread notifications that ask for your attention.",
      },
      {
        kind: 'appearance',
        term: 'Plain count',
        value: { light: 'color: #6b6f78', dark: 'color: #8f939c' },
        plain:
          "My issues' 17 is plain gray text: a total, not an alert. The styling tells you which number needs action.",
      },
      {
        kind: 'appearance',
        term: 'Current page',
        value: 'aria-current="page"',
        plain: "Issues, the page you're on, gets a gray fill, and screen readers announce it as the current page.",
      },
    ],
  },
  {
    id: 'sidebar-section',
    name: 'Collapsible section',
    htmlTag: '<button aria-expanded>',
    variant: 'Tree · one team open',
    summary:
      'A sidebar group that folds open or shut. Teams is open; inside it Engineering is expanded to show its pages, while Design and Growth stay folded.',
    aliases: ['accordion', 'tree view', 'expandable menu', 'the folders in the sidebar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Disclosure chevron',
        value: 'transform: rotate(-90deg)',
        plain: 'The arrow points down while a group is open and turns to point right when it is folded.',
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: 'true / false',
        plain: 'Tells screen readers whether each group is open or closed, the same thing the arrow shows.',
      },
      {
        kind: 'appearance',
        term: 'Indentation',
        value: 'padding-left: 28px',
        plain: "Engineering's pages are pushed in under it, so the nesting reads like branches of a tree.",
      },
    ],
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    htmlTag: '<nav aria-label="Breadcrumb">',
    variant: 'Team › Page',
    summary:
      'The trail that shows where you are: the Engineering team, then its Issues page. Earlier steps link back up.',
    aliases: ['path', 'the trail at the top', 'Engineering > Issues'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Separator',
        value: '12 × 12px chevron',
        plain: 'A small arrow between the steps reads as “inside”.',
      },
      {
        kind: 'appearance',
        term: 'Current page',
        value: 'aria-current="page"',
        plain: "The last step is the page you're on: full-strength text, while the steps before it are gray links.",
      },
      {
        kind: 'behavior',
        term: 'Ordered list',
        value: '<ol>',
        plain: 'The steps are marked up as a numbered list, so screen readers announce how many levels deep you are.',
      },
    ],
  },
  {
    id: 'view-tabs',
    name: 'Tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Saved views',
    summary: "Ready-made slices of the same team's issues: what's active now, the backlog, or everything.",
    aliases: ['view tabs', 'Active / Backlog / All', 'quick views'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected tab',
        value: { light: 'background: #f2f2f5 · 1px border', dark: 'background: #222327 · 1px border' },
        plain: 'The current view gets a filled background and a hairline; the others stay flat.',
      },
      {
        kind: 'behavior',
        term: 'aria-selected',
        value: 'aria-selected="true"',
        plain: 'Marks the chosen tab for screen readers, so they know which view is showing.',
      },
      {
        kind: 'behavior',
        term: 'Wraps to its own row',
        value: '@container (width < 760px)',
        plain: 'On narrower screens the tabs move to a second row under the breadcrumbs instead of getting squeezed.',
      },
    ],
  },
  {
    id: 'avatar-stack',
    name: 'Avatar stack',
    variant: 'With overflow count',
    summary:
      "The team's faces, overlapping in a row. Three are shown and +5 stands for the rest, so a whole team fits in a small space.",
    aliases: ['facepile', 'member avatars', 'the overlapping circles'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Negative margin',
        value: 'margin-left: -6px',
        plain: 'Each avatar slides over the one before it, which saves space and reads as one group.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'box-shadow: 0 0 0 2px #ffffff', dark: 'box-shadow: 0 0 0 2px #16171a' },
        plain: 'A ring in the background color keeps the overlapping circles cleanly apart.',
      },
      {
        kind: 'appearance',
        term: 'Overflow count',
        value: '+5',
        plain: "Instead of squeezing in every face, a last circle says how many more there are.",
      },
      {
        kind: 'behavior',
        term: 'Hidden when narrow',
        value: '@container (width < 960px)',
        plain: 'On narrower screens the stack disappears to leave room for the controls that matter more.',
      },
    ],
  },
  {
    id: 'view-switcher',
    name: 'Segmented control',
    htmlTag: '<div role="radiogroup">',
    variant: 'List · Board switcher',
    summary:
      'Two joined options that change the layout of the same issues: a list of rows or a board of columns. Exactly one is on.',
    aliases: ['view switcher', 'layout toggle', 'list/board toggle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected segment',
        value: { light: 'background: #ffffff + box-shadow', dark: 'background: #34353b + box-shadow' },
        plain: 'The active option looks like a raised key sitting in a gray track.',
      },
      {
        kind: 'behavior',
        term: 'aria-checked',
        value: 'role="radio" aria-checked="true"',
        plain: 'Each option works like a radio button, so turning one on turns the other off.',
      },
      {
        kind: 'behavior',
        term: 'Icons only when narrow',
        value: '@container (width < 960px)',
        plain: 'Below 960px the words hide and only the list and board icons remain.',
      },
    ],
  },
  {
    id: 'filter-chip',
    name: 'Filter chip',
    variant: 'Removable',
    summary: 'Each active filter appears as a chip with its field and value. The × removes just that one filter.',
    aliases: ['filter pill', 'the tag with an x', 'applied filters'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Field and value',
        value: 'Assignee: Me',
        plain: "The gray part names what's being filtered, the bold part says what it's set to.",
      },
      {
        kind: 'appearance',
        term: 'Divided remove button',
        value: { light: 'border-left: 1px solid #dedfe5', dark: 'border-left: 1px solid #303137' },
        plain: 'A hairline sets the × apart, so it reads as a button of its own rather than part of the text.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="Remove Assignee filter"',
        plain: 'The × gets a hidden name that says exactly which filter it removes.',
      },
    ],
  },
  {
    id: 'group-header',
    name: 'Group header',
    variant: 'Collapsible · Sticky · With count',
    summary:
      'The bar that starts each status group: its icon, its name and how many issues it holds. Fold a group away to hide its rows, like In Review here.',
    aliases: ['section header', 'the In Progress bar', 'collapsible group'],
    concepts: [
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: var(--top-h)',
        plain:
          "As you scroll through a group, its header sticks right under the toolbar, so you always know which group you're in.",
      },
      {
        kind: 'behavior',
        term: 'Collapsed group',
        value: 'aria-expanded="false"',
        plain: 'In Review is folded: its chevron points right and its 2 issues stay hidden until you open it.',
      },
      {
        kind: 'appearance',
        term: 'Tinted band',
        value: { light: 'background: #f7f7f9', dark: 'background: #1b1c20' },
        plain: 'A slightly darker band separates one group from the next.',
      },
    ],
  },
  {
    id: 'status-icon',
    name: 'Status icon',
    htmlTag: '<svg role="img">',
    variant: 'Progress ring',
    summary:
      "A small circle that shows where an issue is in the workflow. It fills up as work moves along, so you can read progress without reading words.",
    aliases: ['status dot', 'progress circle', 'the half-filled circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Progress ring',
        value: 'empty · ½ · ¾ · ✓',
        plain:
          'Todo is an empty ring, In Progress is half full, In Review three quarters, and Done a filled circle with a check.',
      },
      {
        kind: 'appearance',
        term: 'Status color',
        value: { light: '#9a9ea6 · #c98a0b · #2e9e65 · #5e6ad2', dark: '#6f737c · #f2c94c · #4cc38a · #5e6ad2' },
        plain: 'Gray, amber, green and indigo add a second cue, so the fill never has to carry the meaning alone.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="In Progress"',
        plain: 'The icon has a text name, so screen readers say the status instead of skipping a picture.',
      },
    ],
  },
  {
    id: 'issue-row',
    name: 'List row',
    variant: 'Dense issue row',
    summary:
      'One issue per line: status, key and title on the left, then labels, priority, assignee and due date lined up on the right.',
    aliases: ['issue', 'ticket row', 'list item', 'line item'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Density',
        value: 'height: 40px',
        plain: 'Compact rows fit a dozen issues on screen, which suits people who work in this list all day.',
      },
      {
        kind: 'appearance',
        term: 'Issue key',
        value: 'ENG-142',
        plain:
          "A short, unique ID: the team's prefix plus a number. People say it in standups and paste it into commits.",
      },
      {
        kind: 'appearance',
        term: 'Truncation',
        value: 'text-overflow: ellipsis',
        plain: 'Long titles end in “…” instead of wrapping, so every row stays one line tall.',
      },
      {
        kind: 'appearance',
        term: 'Overdue date',
        value: { light: 'color: #d1293d', dark: 'color: #ff6b7a' },
        plain: 'Oct 23 has passed, so it turns red; dates still ahead stay gray.',
      },
    ],
  },
  {
    id: 'label-pill',
    name: 'Label',
    variant: 'Pill with a color dot',
    summary: 'A tag that sorts issues by topic, like Bug or Performance. One issue can carry several.',
    aliases: ['tag', 'category', 'the pills with colored dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color dot',
        value: '8 × 8px · border-radius: 50%',
        plain: 'Only the dot is colored, so the label text stays readable in light and dark mode alike.',
      },
      {
        kind: 'appearance',
        term: 'Pill',
        value: 'border-radius: 999px',
        plain: 'Fully rounded ends and a hairline border keep labels light next to the title.',
      },
      {
        kind: 'behavior',
        term: 'Hidden when narrow',
        value: '@container (width < 960px)',
        plain: 'On narrower screens the labels step aside so the titles keep their room.',
      },
    ],
  },
  {
    id: 'priority-icon',
    name: 'Priority icon',
    htmlTag: '<svg role="img">',
    variant: 'Signal bars · High',
    summary:
      "Three bars of rising height, like a phone's signal meter. All three are filled because this list is filtered to High priority.",
    aliases: ['priority bars', 'importance indicator', 'the signal icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bar meter',
        value: '3 bars · 14 × 14px',
        plain: 'How many bars are filled shows the level, readable at a glance; High fills all three.',
      },
      {
        kind: 'appearance',
        term: 'fill: currentColor',
        value: { light: 'color: #5f636c', dark: 'color: #a1a4ad' },
        plain: 'The bars take the surrounding text color, so one icon works in both themes.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="Priority: High"',
        plain: 'Gives the little picture a name that screen readers can say.',
      },
    ],
  },
  {
    id: 'context-menu',
    name: 'Context menu',
    htmlTag: '<div role="menu">',
    variant: 'Right-click · With shortcuts',
    summary:
      'The menu that opens when you right-click an issue: quick actions for that one item, each with its keyboard shortcut on the right.',
    aliases: ['right-click menu', 'action menu', 'the popup menu'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Elevation',
        value: {
          light: 'box-shadow: 0 12px 32px -8px rgb(16 17 20 / 0.22)',
          dark: 'box-shadow: 0 12px 32px -8px rgb(0 0 0 / 0.6)',
        },
        plain: 'A soft, deep shadow lifts the menu off the list, so it clearly floats on top.',
      },
      {
        kind: 'appearance',
        term: 'Highlighted item',
        value: { light: 'background: #f0f0f4', dark: 'background: #2a2b31' },
        plain: 'Assign is under the pointer; the arrow keys move this same highlight up and down.',
      },
      {
        kind: 'appearance',
        term: 'Separator',
        value: 'height: 1px',
        plain: 'A thin line splits the actions that change the issue from the one that only copies its link.',
      },
      {
        kind: 'behavior',
        term: 'Target highlight',
        value: { light: 'background: #f2f3fb', dark: 'background: #1d1f2d' },
        plain: 'The right-clicked row stays tinted while the menu is open, so you know which issue it acts on.',
      },
    ],
  },
];
