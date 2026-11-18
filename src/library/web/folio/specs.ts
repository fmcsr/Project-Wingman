import type { UiElementSpec } from '../../../catalog';

/** Elements in the Folio wiki editor. `value` fields are the actual values from FolioSite.module.css and the markup. */
export const folioSpecs: UiElementSpec[] = [
  {
    id: 'workspace-switcher',
    name: 'Workspace switcher',
    htmlTag: '<button>',
    variant: 'Icon · name · chevron',
    summary:
      "The workspace's icon and name at the top of the sidebar. Clicking it opens a menu to switch workspaces, open settings or invite people.",
    aliases: ['the company name at the top left', 'team switcher', 'account menu'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Workspace icon',
        value: '22 × 22px · border-radius: 5px',
        plain: 'An emoji the team picked, on a small rounded tile, so you can tell workspaces apart at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Chevron',
        value: '14 × 14px',
        plain: 'The small down arrow after the name hints that clicking opens a list to pick from.',
      },
      {
        kind: 'behavior',
        term: 'aria-haspopup',
        value: 'aria-haspopup="menu"',
        plain: 'Tells screen readers that this control opens a menu, just as the arrow tells everyone else.',
      },
    ],
  },
  {
    id: 'quick-find',
    name: 'Search',
    htmlTag: '<button>',
    variant: 'Sidebar item · ⌘K',
    summary:
      'Opens a search box over the whole app that finds any page by its title or its text. ⌘K opens the same box from anywhere.',
    aliases: ['search bar', 'quick find', 'command palette', 'jump to page'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Command palette',
        value: 'aria-keyshortcuts="Meta+K"',
        plain:
          'The shortcut opens a search dialog in the middle of the screen: type a few letters, press Enter, and you are on that page.',
      },
      {
        kind: 'appearance',
        term: 'Sidebar item',
        value: 'height: 30px · 20px icon',
        plain:
          'A plain row with a magnifying glass, next to Home and Inbox. The text field lives in the dialog it opens, not in the sidebar.',
      },
      {
        kind: 'appearance',
        term: 'Muted icon',
        value: { light: 'color: #91918e', dark: 'color: #858585' },
        plain: 'The icon is a shade lighter than its label, so the words lead and the icons only help you scan.',
      },
    ],
  },
  {
    id: 'page-tree',
    name: 'Tree view',
    htmlTag: '<ul role="tree">',
    variant: 'Teamspaces · Private · Current page',
    summary:
      "Every page in the workspace as an outline: shared teamspaces first, then the pages only you can see. Chevrons fold a branch open or shut, and the page you're on is highlighted.",
    aliases: ['page tree', 'sidebar folders', 'nested pages', 'the outline on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Indentation',
        value: 'padding-left: calc(2px + var(--depth) * 12px)',
        plain: 'Each level is pushed 12px further in, so you can see which pages sit inside which.',
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: 'aria-expanded="true" · rotate(90deg)',
        plain:
          'Each branch says whether it is open: its chevron turns from pointing right to pointing down, and screen readers hear “expanded” or “collapsed”.',
      },
      {
        kind: 'appearance',
        term: 'Current page',
        value: { light: 'background: #efeeec · font-weight: 600', dark: 'background: #2c2c2c · font-weight: 600' },
        plain:
          "Waitlists launch plan, the page you're on, gets a gray fill and bolder text, so you always know where you are.",
      },
    ],
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    htmlTag: '<nav aria-label="Breadcrumb">',
    variant: 'Teamspace / Parent / Page',
    summary:
      'The path to this page, each step with its emoji: the Product teamspace, then the Launches page, then this one. Each step before the last links back up.',
    aliases: ['path', 'the trail at the top', 'Product / Launches / Waitlists launch plan'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Slash separator',
        value: "::after { content: '/' }",
        plain: 'CSS draws a slash after each step, so hiding a step hides its slash too.',
      },
      {
        kind: 'appearance',
        term: 'Current page',
        value: 'aria-current="page" · text-overflow: ellipsis',
        plain:
          "The last step is the page you're on. It's the one that shortens with “…” when the bar runs out of room.",
      },
      {
        kind: 'behavior',
        term: 'Collapsed steps',
        value: '@container (width < 800px)',
        plain:
          'On narrower screens the first step folds into “…”, and below 720px only the current page is left next to it.',
      },
    ],
  },
  {
    id: 'presence-avatars',
    name: 'Presence avatars',
    variant: 'Live viewers · Photos',
    summary:
      'The faces of the people who have this page open right now. A face appears when a teammate opens the page and disappears when they leave.',
    aliases: ['who’s here', 'live avatars', 'facepile', 'the faces at the top right'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Real-time presence',
        value: '3 viewers',
        plain: 'The app keeps a live connection open, so the faces update the moment someone comes or goes.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'box-shadow: 0 0 0 2px #ffffff', dark: 'box-shadow: 0 0 0 2px #191919' },
        plain: 'Each 24px face overlaps the one before; a ring in the page color keeps the circles cleanly apart.',
      },
      {
        kind: 'behavior',
        term: 'Hidden when narrow',
        value: '@container (width < 480px)',
        plain: 'On phone-sized screens the faces step aside to leave room for the Share button.',
      },
    ],
  },
  {
    id: 'share-button',
    name: 'Share button',
    htmlTag: '<button>',
    variant: 'Primary · Opens a dialog',
    summary:
      "Opens the share dialog: invite people by email, choose who can view or edit, or copy a link. It's the only filled button on the screen.",
    aliases: ['invite button', 'permissions', 'the colored button at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled button',
        value: { light: 'background: #0f6f8f', dark: 'background: #1f7fa3' },
        plain: 'The accent fill makes it the main action of the page, while the icons around it stay gray.',
      },
      {
        kind: 'appearance',
        term: 'Compact size',
        value: 'height: 28px · border-radius: 6px',
        plain: 'Small enough to sit in the 44px top bar without crowding it.',
      },
      {
        kind: 'behavior',
        term: 'aria-haspopup',
        value: 'aria-haspopup="dialog"',
        plain: 'Tells screen readers that clicking opens a dialog instead of sharing right away.',
      },
    ],
  },
  {
    id: 'more-button',
    name: 'More button',
    htmlTag: '<button>',
    variant: 'Icon only · Meatball menu',
    summary:
      'Three dots that open a menu of everything else you can do with the page: change the font, lock it, see its history, export it or move it to the trash.',
    aliases: ['three dots', 'overflow menu', 'the ··· button', 'kebab menu'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Meatball icon',
        value: '3 dots · 18 × 18px',
        plain: 'Three dots in a row are a “meatball” menu; stacked vertically, the same idea is called a “kebab” menu.',
      },
      {
        kind: 'behavior',
        term: 'Overflow menu',
        value: 'aria-haspopup="menu"',
        plain: 'Actions people need only now and then wait behind it, so the top bar stays calm.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="More actions"',
        plain: 'An invisible name, because the button shows only an icon.',
      },
    ],
  },
  {
    id: 'page-cover',
    name: 'Cover image',
    htmlTag: '<img>',
    variant: 'Full width · Photo',
    summary:
      'A wide photo across the top of the page that gives it a look of its own. It is decoration, so it can be changed or repositioned without touching the text.',
    aliases: ['banner', 'header image', 'hero image', 'the picture at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Fluid height',
        value: 'height: clamp(150px, 22cqi, 260px)',
        plain: 'The band grows with the width of the page, from 150 to 260px tall.',
      },
      {
        kind: 'appearance',
        term: 'object-fit',
        value: 'object-fit: cover · object-position: center 58%',
        plain:
          'The photo always fills the band and is trimmed at the edges, never squashed. The position picks which slice of it shows.',
      },
      {
        kind: 'behavior',
        term: 'Alt text',
        value: 'alt="Misty hills at sunrise"',
        plain: 'A short description for screen readers, read out in place of the photo.',
      },
    ],
  },
  {
    id: 'page-icon',
    name: 'Page icon',
    variant: 'Emoji · Overlapping the cover',
    summary:
      "An emoji that stands for the page. It overlaps the cover here and comes back, smaller, next to the page's name in the sidebar and the breadcrumbs.",
    aliases: ['page emoji', 'page logo', 'the hourglass'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Negative margin',
        value: 'margin-top: -40px',
        plain: "Pulled up over the cover's bottom edge, which ties the photo and the title together.",
      },
      {
        kind: 'appearance',
        term: 'Emoji as an icon',
        value: 'font-size: 66px',
        plain:
          "It's a character drawn by the device's emoji font, so its size is a font size and there's no image to load.",
      },
      {
        kind: 'behavior',
        term: 'Follows the page',
        value: 'sidebar · breadcrumbs · page',
        plain:
          'Wherever the page is listed, its emoji comes along, which makes it quicker to spot than reading titles.',
      },
    ],
  },
  {
    id: 'page-properties',
    name: 'Properties',
    htmlTag: '<dl>',
    variant: 'Person · Status · Date · Tags',
    summary:
      'Labeled fields under the title: who owns the page, where it stands, when it launches and which teams are involved. They let a list of pages be sorted and filtered like a table.',
    aliases: ['metadata', 'page fields', 'attributes', 'the info under the title'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two columns',
        value: 'grid-template-columns: 160px minmax(0, 1fr)',
        plain: 'Names with their icons in a fixed gray column, values next to them, so the eye scans them like a form.',
      },
      {
        kind: 'appearance',
        term: 'Status chip',
        value: {
          light: 'background: #d9e7f0 · color: #1c3a4f',
          dark: 'background: #2c3e4f · color: #c9dbe8',
        },
        plain: 'A pill in the status color with a dot, plus the word itself, so nobody has to rely on color alone.',
      },
      {
        kind: 'appearance',
        term: 'Multi-select tags',
        value: 'border-radius: 4px · height: 22px',
        plain: 'A field that holds several values at once, each a small tag in its own soft color.',
      },
    ],
  },
  {
    id: 'mention-chip',
    name: 'Mention',
    htmlTag: '<a>',
    variant: 'Person · Date',
    summary:
      'An @ link inside the text. Mentioning a person notifies them and links to their profile; a date mention can remind people on the day.',
    aliases: ['@mention', 'tag someone', 'date tag', 'the gray @ name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gray @ text',
        value: { light: 'color: #787774 · font-weight: 500', dark: 'color: #9b9b9b · font-weight: 500' },
        plain: 'An @ and a quieter gray mark the words as a mention, without the noise of a colored box.',
      },
      {
        kind: 'behavior',
        term: 'Notification',
        value: '@Nadia Brooks',
        plain: 'Typing @ and a name sends Nadia a notification that links straight to this paragraph.',
      },
      {
        kind: 'behavior',
        term: 'No line break',
        value: 'white-space: nowrap',
        plain: 'A mention never splits across two lines; it moves to the next line whole.',
      },
    ],
  },
  {
    id: 'comment-highlight',
    name: 'Comment highlight',
    htmlTag: '<mark>',
    variant: 'Inline · Open thread',
    summary:
      'Words someone commented on, marked with a yellow wash and underline. Clicking them opens their thread in the margin.',
    aliases: ['highlighted text', 'inline comment', 'the yellow text'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight',
        value: {
          light: 'background: rgb(255 212 0 / 0.3) · border-bottom: 2px solid rgb(232 184 0 / 0.9)',
          dark: 'background: rgb(255 212 0 / 0.2) · border-bottom: 2px solid rgb(255 212 0 / 0.55)',
        },
        plain: 'A light wash plus a stronger underline: easy to spot, still easy to read.',
      },
      {
        kind: 'behavior',
        term: 'Anchored comment',
        value: '“the Pro plan”',
        plain: 'The thread is tied to these exact words, so it stays attached while the text around them changes.',
      },
      {
        kind: 'appearance',
        term: '<mark>',
        value: '<mark>',
        plain: 'The HTML element for highlighted text, which screen readers can announce as marked.',
      },
    ],
  },
  {
    id: 'comment-thread',
    name: 'Comment thread',
    htmlTag: '<aside>',
    variant: 'Margin card · Resolvable',
    summary:
      "The conversation about the highlighted words: each reply with its author's photo and the time, a reply box, and a check that resolves the thread once it's settled.",
    aliases: ['comments', 'discussion', 'side comment', 'the comment card'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Resolve',
        value: 'aria-label="Resolve thread"',
        plain: 'The check closes the discussion and removes the highlight; resolved threads can still be found later.',
      },
      {
        kind: 'appearance',
        term: 'Margin placement',
        value: 'position: absolute · left: calc(100% + var(--rail-gap))',
        plain: "The card sits in the right margin, level with its paragraph, so the page doesn't shift around it.",
      },
      {
        kind: 'behavior',
        term: 'Moves inline when narrow',
        value: '@container (width < 1080px)',
        plain: 'When there is no room for a margin, the thread drops under its paragraph instead.',
      },
    ],
  },
  {
    id: 'callout',
    name: 'Callout',
    htmlTag: '<div role="note">',
    variant: 'Emoji · Shaded box',
    summary:
      'A shaded box with an emoji that lifts one important point out of the text: here, the date of the code freeze.',
    aliases: ['info box', 'note', 'admonition', 'the gray box with an icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Shaded background',
        value: { light: 'background: #f7f6f3', dark: 'background: #2f2f2f' },
        plain: 'A soft gray fill with rounded corners sets it apart from the text without shouting like a red warning.',
      },
      {
        kind: 'appearance',
        term: 'Leading emoji',
        value: '❄️ · font-size: 18px',
        plain: 'A snowflake for a code freeze: the emoji says what kind of note it is before you read a word.',
      },
      {
        kind: 'behavior',
        term: 'role="note"',
        value: 'role="note"',
        plain: 'Tells screen readers this is an aside to the main text.',
      },
    ],
  },
  {
    id: 'toggle-block',
    name: 'Toggle',
    htmlTag: '<details>',
    variant: 'Open',
    summary:
      "A line with a triangle that hides or shows what's under it. This one is open, showing the three rollout stages.",
    aliases: ['collapsible', 'accordion', 'expandable section', 'dropdown text'],
    concepts: [
      {
        kind: 'behavior',
        term: '<details> and <summary>',
        value: 'aria-expanded="true"',
        plain: "HTML's built-in toggle: the summary line stays visible, and clicking it shows or hides the rest.",
      },
      {
        kind: 'appearance',
        term: 'Rotating triangle',
        value: 'transform: rotate(90deg)',
        plain: 'The filled triangle points right while closed and turns down when open.',
      },
      {
        kind: 'appearance',
        term: 'Indented content',
        value: 'padding-left: 26px',
        plain: "What's inside lines up under the title's text, so it clearly belongs to the toggle.",
      },
    ],
  },
  {
    id: 'todo-list',
    name: 'To-do list',
    htmlTag: '<ul>',
    variant: 'Checkboxes · 2 of 5 done',
    summary:
      "Tasks with checkboxes, right in the page. Checking one crosses it out and grays it, so what's left stands out.",
    aliases: ['checklist', 'task list', 'checkboxes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Checked box',
        value: { light: 'background: #0f6f8f', dark: 'background: #1f7fa3' },
        plain: "A finished task's 16px box fills with the accent color and shows a white check.",
      },
      {
        kind: 'appearance',
        term: 'Strikethrough',
        value: 'text-decoration: line-through',
        plain: 'Done tasks are crossed out and grayed, but stay readable for the record.',
      },
      {
        kind: 'behavior',
        term: 'aria-checked',
        value: 'role="checkbox" aria-checked="true"',
        plain: 'Each box tells screen readers whether it is checked.',
      },
    ],
  },
  {
    id: 'block-handle',
    name: 'Block handle',
    variant: 'Drag handle · Add button',
    summary:
      'The + and the grip (⋮⋮) that appear next to a block while the pointer is over it. Click + to add a block below; drag the grip to move this one, or click it for a menu.',
    aliases: ['drag handle', 'the six dots', 'grip', 'gutter buttons'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Drag and drop',
        value: 'aria-label="Drag to move"',
        plain: 'Holding the grip picks the block up, and a line between blocks shows where it will land.',
      },
      {
        kind: 'appearance',
        term: 'Gutter',
        value: 'left: -50px',
        plain: 'The handles sit in the empty space left of the text, so they never cover any words.',
      },
      {
        kind: 'behavior',
        term: 'Hover only',
        value: '@container (width < 640px)',
        plain: "They appear on hover, so they're hidden on phone-sized screens, where nothing hovers.",
      },
    ],
  },
  {
    id: 'slash-menu',
    name: 'Slash command menu',
    htmlTag: '<div role="listbox">',
    variant: 'Basic blocks · First item highlighted',
    summary:
      'Typing “/” on an empty line opens a menu of things to insert. Keep typing to filter it, move with the arrow keys, and press Enter to insert the highlighted block.',
    aliases: ['slash menu', 'insert menu', 'block picker', 'the / menu'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Highlighted option',
        value: 'role="option" aria-selected="true"',
        plain:
          'Text, the first option, is highlighted in gray: Enter would insert it. The arrow keys move the highlight while your cursor stays in the line.',
      },
      {
        kind: 'appearance',
        term: 'Markdown shortcuts',
        value: '# · ## · ### · - · 1. · [] · >',
        plain: 'The hint on the right is what you could type instead: # and a space make a heading, [] a to-do.',
      },
      {
        kind: 'behavior',
        term: 'Close with Esc',
        value: '<kbd>esc</kbd>',
        plain: 'The footer reminds you that Esc closes the menu and leaves the slash as plain text.',
      },
    ],
  },
];
