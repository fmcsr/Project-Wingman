import type { UiElementSpec } from '../../../catalog';

/** Elements in the Inbox email client. `value` fields are the actual values from InboxSite.module.css. */
export const inboxSpecs: UiElementSpec[] = [
  {
    id: 'search-field',
    name: 'Search bar',
    htmlTag: '<input type="search">',
    variant: 'Pill with search options',
    summary:
      'The wide field at the top for finding any email. The sliders icon at its end opens search options, like sender, date or attachments.',
    aliases: ['search box', 'the search at the top', 'find mail'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'height: 46px · border-radius: 23px',
        plain: 'A corner radius of half the height gives fully round ends, which reads as “type here”.',
      },
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: 'Search mail',
        plain: 'Gray hint text that disappears as soon as you start typing.',
      },
      {
        kind: 'behavior',
        term: 'Search options',
        value: 'aria-label="Show search options"',
        plain: "The sliders icon opens a panel of filters for searches that are hard to type.",
      },
      {
        kind: 'behavior',
        term: 'role="search"',
        value: 'role="search"',
        plain: 'Marks the area as the search landmark, so screen reader users can jump straight to it.',
      },
    ],
  },
  {
    id: 'compose-button',
    name: 'Extended FAB',
    htmlTag: '<button>',
    variant: 'Compose',
    summary:
      "The app's main action: a big rounded button with an icon and a label at the top of the sidebar. On narrower screens it shrinks to just the pencil.",
    aliases: ['compose button', 'new email button', 'floating action button', 'the big pencil button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tonal fill',
        value: { light: 'background: #c2e7ff', dark: 'background: #004a77' },
        plain: 'A soft tint of the brand blue makes it the most prominent control without shouting.',
      },
      {
        kind: 'appearance',
        term: 'Shape',
        value: 'height: 56px · border-radius: 16px',
        plain: 'Tall, with generous rounded corners: the signature shape of a floating action button.',
      },
      {
        kind: 'behavior',
        term: 'Collapses to an icon',
        value: '@container (width < 1080px)',
        plain: 'When the sidebar shrinks to icons, the label hides and only the pencil remains, in a 56px square.',
      },
    ],
  },
  {
    id: 'folder-item',
    name: 'Nav item',
    htmlTag: '<a>',
    variant: 'Folder with unread count',
    summary:
      "A folder in the sidebar. Its number says what's inside: bold for unread mail, regular for a plain total like Drafts.",
    aliases: ['folder', 'mailbox', 'the inbox count'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Unread count',
        value: 'font-weight: 700',
        plain: "Inbox's 24 is bold because those emails are unread; Drafts' 2 stays regular because it's just a total.",
      },
      {
        kind: 'appearance',
        term: 'Active pill',
        value: { light: 'background: #d3e3fd', dark: 'background: #004a77' },
        plain: 'The open folder sits in a tinted, fully rounded pill, with bold text.',
      },
      {
        kind: 'behavior',
        term: 'aria-current',
        value: 'aria-current="page"',
        plain: 'Tells screen readers which folder is open.',
      },
      {
        kind: 'behavior',
        term: 'Count badge',
        value: '@container (width < 1080px)',
        plain: 'When the sidebar shrinks to icons, the unread count moves onto the icon as a small badge.',
      },
    ],
  },
  {
    id: 'label',
    name: 'Label',
    variant: 'Color-coded tag',
    summary:
      'A colored tag that marks what an email is about, like Product or Finance. In the sidebar, each label also opens a filtered list.',
    aliases: ['tag', 'category', 'the colored chip'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Color coding',
        value: '#4c8df6',
        plain:
          "Each label keeps its color everywhere: Product's blue tag in the sidebar returns as blue chips on its emails.",
      },
      {
        kind: 'appearance',
        term: 'Tinted chip',
        value: {
          light: 'background: #d3e3fd · color: #0842a0',
          dark: 'background: rgb(76 141 246 / 0.22) · color: #a8c7fa',
        },
        plain: 'A pale tint of the label color with darker text (lighter text in dark mode) keeps chips readable.',
      },
      {
        kind: 'appearance',
        term: 'Small radius',
        value: 'border-radius: 4px',
        plain: 'Only slightly rounded corners keep chips compact enough to sit inside a line of text.',
      },
    ],
  },
  {
    id: 'toolbar',
    name: 'Toolbar',
    htmlTag: '<div role="toolbar">',
    variant: 'Bulk actions',
    summary:
      'The row of icon buttons above the list. Archive, delete and mark as read act on every checked email at once: here, the two checked rows.',
    aliases: ['action bar', 'the icons above the list', 'bulk actions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon buttons',
        value: '32 × 32px · border-radius: 50%',
        plain: 'Round, icon-only buttons keep the row compact, with a click area bigger than the icon itself.',
      },
      {
        kind: 'behavior',
        term: 'Contextual actions',
        value: '2 checked',
        plain: 'These actions apply to the checked emails; many mail apps only show them once something is selected.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="Archive"',
        plain: 'Each icon has a hidden name, because an icon alone says nothing to a screen reader.',
      },
      {
        kind: 'behavior',
        term: 'role="toolbar"',
        value: 'role="toolbar"',
        plain: 'Groups the buttons as one control, so keyboard users can move between them with the arrow keys.',
      },
    ],
  },
  {
    id: 'select-all',
    name: 'Select-all checkbox',
    htmlTag: '<input type="checkbox">',
    variant: 'Mixed state · with menu',
    summary:
      'One checkbox for the whole page of emails. It shows a dash because only some are selected; the caret beside it opens quick selections.',
    aliases: ['check all', 'bulk select', 'the box at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Indeterminate state',
        value: 'aria-checked="mixed"',
        plain: 'Neither checked nor empty: the dash means “some of these are selected” (2 of 50 here).',
      },
      {
        kind: 'appearance',
        term: 'Filled box',
        value: { light: 'background: #0b57d0', dark: 'background: #a8c7fa' },
        plain: 'Checked and mixed boxes fill with the accent color, so a selection is easy to spot.',
      },
      {
        kind: 'behavior',
        term: 'Split control',
        value: 'aria-haspopup="menu"',
        plain: 'The box toggles everything at once; the small caret next to it opens a menu with finer choices.',
      },
    ],
  },
  {
    id: 'pagination',
    name: 'Pagination',
    variant: 'Range with arrows',
    summary: "Shows which slice of the mailbox you're looking at, with arrows to the newer and older pages.",
    aliases: ['page arrows', '1–50 of 2,148', 'next page'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Range label',
        value: '1–50 of 2,148',
        plain: 'Which emails are on screen, and how many there are in total.',
      },
      {
        kind: 'appearance',
        term: 'Disabled arrow',
        value: 'opacity: 0.38',
        plain: "This is the first page, so the back arrow is dimmed: there's nothing newer to go to.",
      },
      {
        kind: 'behavior',
        term: 'aria-disabled',
        value: 'aria-disabled="true"',
        plain: 'Tells screen readers the arrow is unavailable, matching how it looks.',
      },
      {
        kind: 'behavior',
        term: 'Arrows only on phones',
        value: '@container (width < 640px)',
        plain: 'On a narrow screen the range text hides and only the arrows remain.',
      },
    ],
  },
  {
    id: 'category-tabs',
    name: 'Tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Inbox categories',
    summary:
      "Sort incoming mail into Primary, Promotions and Social. The badge says something new arrived in a tab you're not looking at.",
    aliases: ['inbox tabs', 'categories', 'Primary / Promotions / Social'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active indicator',
        value: 'height: 3px · border-radius: 3px 3px 0 0',
        plain: 'A short bar in the accent color along the bottom edge marks the open tab.',
      },
      {
        kind: 'appearance',
        term: 'New-items badge',
        value: { light: 'background: #188038', dark: 'background: #6dd58c' },
        plain: '“3 new” is a small green pill: unseen mail waiting in Promotions.',
      },
      {
        kind: 'behavior',
        term: 'aria-selected',
        value: 'aria-selected="true"',
        plain: 'Tells screen readers which tab is open.',
      },
      {
        kind: 'behavior',
        term: 'Labels only when narrow',
        value: '@container (width < 1080px)',
        plain: 'On narrower screens the tab icons hide, so the three labels still fit in one row.',
      },
    ],
  },
  {
    id: 'message-row',
    name: 'List row',
    variant: 'Email · unread, open and checked',
    summary:
      'One email per row: who sent it and when, then the subject and the first words of the message. Bold rows are unread.',
    aliases: ['email row', 'message', 'thread', 'list item'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Unread state',
        value: 'font-weight: 700',
        plain: "Sender, subject and time are bold until you open the email; that's the whole difference.",
      },
      {
        kind: 'appearance',
        term: 'Snippet',
        value: { light: 'color: #5f6368', dark: 'color: #9aa0a6' },
        plain:
          'The opening words follow the subject in gray and end in “…”, so you can triage without opening anything.',
      },
      {
        kind: 'appearance',
        term: 'Open row',
        value: { light: 'box-shadow: inset 3px 0 0 #0b57d0', dark: 'box-shadow: inset 3px 0 0 #a8c7fa' },
        plain: "Priya's email, the one in the reading pane, gets a soft tint and an accent bar on its left edge.",
      },
      {
        kind: 'appearance',
        term: 'Checked row',
        value: { light: 'background: #d3e3fd', dark: 'background: #233552' },
        plain: 'Rows checked for a bulk action turn blue.',
      },
    ],
  },
  {
    id: 'row-checkbox',
    name: 'Checkbox',
    htmlTag: '<input type="checkbox">',
    variant: 'Row selection',
    summary: 'Selects one email for a bulk action. Check a few, then archive or delete them all at once.',
    aliases: ['tick box', 'select', 'the square at the start of the row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Checked',
        value: 'aria-checked="true"',
        plain: 'A white check on the accent color; an empty box with a gray border means not selected.',
      },
      {
        kind: 'appearance',
        term: 'Box',
        value: '16 × 16px · border: 2px · border-radius: 3px',
        plain: 'A small square with a strong border and barely rounded corners reads as a checkbox, not a button.',
      },
      {
        kind: 'behavior',
        term: 'Feeds select-all',
        value: '2 of 50',
        plain: 'Checking some rows turns the select-all box at the top into a dash for “some”.',
      },
    ],
  },
  {
    id: 'star-toggle',
    name: 'Star toggle',
    htmlTag: '<button aria-pressed>',
    variant: 'On and off',
    summary: 'A star you click to flag an email for yourself. Starred emails also gather in the Starred folder.',
    aliases: ['favorite', 'flag', 'the star'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled vs outline',
        value: 'color: #f4b400 · fill: currentColor',
        plain: 'A filled yellow star is on; a gray outline is off.',
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        value: 'aria-pressed="true"',
        plain: "Tells screen readers the star is switched on, like a button that's pressed in.",
      },
    ],
  },
  {
    id: 'attachment-chip',
    name: 'Attachment chip',
    variant: 'File icon · name · size',
    summary:
      'The attached file, shown right in the list and again under the message, so you can spot it without opening the email.',
    aliases: ['attachment', 'file', 'the PDF pill'],
    concepts: [
      {
        kind: 'appearance',
        term: 'File-type icon',
        value: 'fill: #ea4335',
        plain: 'A red document icon says “PDF” before you even read the file name.',
      },
      {
        kind: 'appearance',
        term: 'Pill',
        value: 'height: 28px · border-radius: 999px',
        plain: 'A hairline pill keeps the file compact enough to sit under a one-line preview.',
      },
      {
        kind: 'appearance',
        term: 'File size',
        value: '2.4 MB',
        plain: "Under the message the chip adds the size, so you know what you're about to download.",
      },
    ],
  },
  {
    id: 'quick-actions',
    name: 'Hover actions',
    variant: 'Archive · Delete · Mark as unread · Snooze',
    summary:
      "Shortcuts that appear on the row under the pointer, so you can deal with an email without opening it. Jonah's row is drawn in that hover state.",
    aliases: ['quick actions', 'row actions', 'the icons that appear on hover'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Raised row',
        value: {
          light: 'box-shadow: 0 1px 2px rgb(60 64 67 / 0.3), 0 1px 3px 1px rgb(60 64 67 / 0.15)',
          dark: 'background: #252a32 + box-shadow',
        },
        plain:
          'The hovered row lifts off the list with a soft shadow (and lightens in dark mode, where shadows barely show).',
      },
      {
        kind: 'behavior',
        term: 'Replaces the time',
        value: '4 × 32px buttons',
        plain: "The buttons take the time's place, so nothing else in the row has to move.",
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="Snooze"',
        plain: 'Each icon carries a hidden name for screen readers.',
      },
    ],
  },
  {
    id: 'reading-pane',
    name: 'Reading pane',
    htmlTag: '<article>',
    variant: 'Split view',
    summary: 'Shows the selected email next to the list, so you can read it and move on without leaving your inbox.',
    aliases: ['preview pane', 'message view', 'the right side'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Three panes',
        value: 'grid-template-columns: 216px minmax(0, 0.9fr) minmax(0, 1fr)',
        plain:
          "Folders, list and message side by side: a fixed sidebar, then the list and the email sharing what's left.",
      },
      {
        kind: 'behavior',
        term: 'Stacks under the list',
        value: '@container (width < 760px)',
        plain: "When three panes don't fit, the email moves below the list.",
      },
      {
        kind: 'appearance',
        term: 'Body indent',
        value: 'padding-left: 52px',
        plain: "The text starts under the sender's name, past the avatar, which keeps a clean left edge.",
      },
    ],
  },
  {
    id: 'message-header',
    name: 'Message header',
    variant: 'Sender, time and actions',
    summary: 'Who wrote the email, to whom and when, with reply and forward one click away.',
    aliases: ['sender info', 'the from line', 'email header'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Avatar',
        value: '40 × 40px · initials',
        plain: "A large circle with the sender's initials shows at a glance who's writing.",
      },
      {
        kind: 'appearance',
        term: 'Absolute and relative time',
        value: '10:42 AM (52 minutes ago)',
        plain: "The exact time plus how long ago it was, so nobody has to do the math.",
      },
      {
        kind: 'behavior',
        term: 'Icon buttons',
        value: 'aria-label="Reply" · aria-label="Forward"',
        plain: 'Two arrows for reply and forward, each with a hidden name for screen readers.',
      },
      {
        kind: 'behavior',
        term: 'Wrapping address',
        value: 'flex-wrap: wrap',
        plain: "When the name and email address don't fit on one line, the address moves under the name.",
      },
    ],
  },
  {
    id: 'reply-composer',
    name: 'Reply box',
    variant: 'Collapsed composer',
    summary:
      'A one-line prompt at the end of the email. Click it, or press R, and it opens into a full reply editor right there.',
    aliases: ['reply field', 'quick reply', 'the reply bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: 'Reply to Priya Raman…',
        plain: 'Says exactly who the reply will go to.',
      },
      {
        kind: 'appearance',
        term: 'Pill outline',
        value: 'height: 48px · border-radius: 24px',
        plain: 'A rounded outline that looks like a field to type in, not a button.',
      },
      {
        kind: 'behavior',
        term: 'Keyboard shortcut',
        value: '<kbd>R</kbd>',
        plain: 'Pressing R starts a reply without reaching for the mouse; the key cap at the end says so.',
      },
      {
        kind: 'behavior',
        term: 'Progressive disclosure',
        value: 'one line → full editor',
        plain: 'It stays a single line until you need the editor, which keeps the email itself in focus.',
      },
    ],
  },
];
