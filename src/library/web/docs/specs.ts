import type { UiElementSpec } from '../../../catalog';

/** Elements on the Forge Docs page, in the order they appear. `value` fields are the actual values from DocsSite. */
export const docsSpecs: UiElementSpec[] = [
  {
    id: 'top-bar',
    name: 'Top bar',
    htmlTag: '<header>',
    variant: 'Sticky · Frosted',
    summary:
      'The strip across the top with the logo, search, version and a way back to the product. It stays pinned while the article scrolls underneath.',
    aliases: ['header', 'navbar', 'the bar at the top'],
    concepts: [
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 0',
        plain: 'The bar sticks to the top edge, so search is always one click away, however far down you read.',
      },
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(12px)',
        plain: "Text scrolling under the slightly see-through bar is blurred, so the bar stays readable without being solid.",
      },
      {
        kind: 'appearance',
        term: 'Hairline border',
        value: { light: 'border-bottom: 1px solid #e4e4e7', dark: 'border-bottom: 1px solid #27272a' },
        plain: 'A 1px line separates the bar from the page instead of a heavy shadow.',
      },
      {
        kind: 'behavior',
        term: 'Breakpoint',
        value: '@container (width < 720px)',
        plain:
          'Below 720px the sidebar folds into a ☰ menu button, the search box shrinks to an icon and the Dashboard button hides.',
      },
    ],
  },
  {
    id: 'search-field',
    name: 'Search field',
    htmlTag: '<button aria-keyshortcuts="Meta+K">',
    variant: 'Opens a search dialog · ⌘K',
    summary:
      "Looks like a text box, but it's really a button: clicking it, or pressing ⌘K anywhere, opens a search dialog that finds pages as you type.",
    aliases: ['search bar', 'the ⌘K box', 'command palette', 'quick search'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: 'Search docs…',
        plain: 'Gray hint text that says what the box searches.',
      },
      {
        kind: 'appearance',
        term: 'Keyboard shortcut hint',
        value: '<kbd>⌘K</kbd>',
        plain: 'The shortcut is drawn like a small keycap, so it reads as keys to press, not text to type.',
      },
      {
        kind: 'behavior',
        term: 'aria-keyshortcuts',
        value: '"Meta+K"',
        plain: 'Tells assistive technology which keys open the search, since the keycap is only a picture.',
      },
      {
        kind: 'behavior',
        term: 'Icon-only on small screens',
        value: '@container (width < 720px)',
        plain: 'Below 720px the box shrinks to a 34px magnifier button and the ⌘K hint hides, since phones have no ⌘ key.',
      },
    ],
  },
  {
    id: 'version-selector',
    name: 'Version selector',
    htmlTag: '<button aria-haspopup="listbox">',
    variant: 'Dropdown · v3.2',
    summary:
      'Shows which release of Forge these docs describe. Opening it lists older versions, so someone still on v2 can read the docs that match their code.',
    aliases: ['version dropdown', 'version switcher', 'the v3.2 menu'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron',
        value: '14 × 14px',
        plain: 'The small down arrow says “this opens a list”.',
      },
      {
        kind: 'appearance',
        term: 'Monospace label',
        value: 'ui-monospace · 12.5px',
        plain: 'The version is set in a code font, the way developers see version numbers in their own projects.',
      },
      {
        kind: 'behavior',
        term: 'aria-haspopup',
        value: '"listbox"',
        plain: 'Tells screen readers that the button opens a list of choices.',
      },
    ],
  },
  {
    id: 'sidebar',
    name: 'Sidebar navigation',
    htmlTag: '<nav>',
    variant: 'Docs tree · Sticky',
    summary:
      'The map of every page in the docs, grouped by topic. It stays in view while you scroll the article next to it.',
    aliases: ['left nav', 'side menu', 'docs menu', 'the list on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Section headings',
        value: '11px · uppercase · 0.06em',
        plain: 'Small capital labels (Get started, Build, Reference) split the list into topics without adding more links.',
      },
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 56px',
        plain: 'The list sticks just below the 56px top bar, so it never scrolls away with the article.',
      },
      {
        kind: 'behavior',
        term: 'Hidden on small screens',
        value: '@container (width < 720px)',
        plain: 'Below 720px the sidebar disappears and the ☰ button in the top bar stands in for it.',
      },
    ],
  },
  {
    id: 'nav-group',
    name: 'Collapsible group',
    htmlTag: '<button aria-expanded>',
    variant: 'Open and closed',
    summary:
      'A topic in the sidebar that folds its pages away until you need them. Storage is open; Functions, Databases and Deployments are closed.',
    aliases: ['accordion', 'expandable section', 'folder', 'the arrow next to Storage'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rotating chevron',
        value: 'rotate(90deg)',
        plain: 'The arrow points right while the group is closed and turns to point down once it opens.',
      },
      {
        kind: 'appearance',
        term: 'Guide line',
        value: { light: 'border-left: 1px solid #e4e4e7', dark: 'border-left: 1px solid #27272a' },
        plain: "A thin vertical line ties the open group's pages to their parent.",
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: '"true" · "false"',
        plain: 'Tells screen readers whether the group is open or closed.',
      },
    ],
  },
  {
    id: 'nav-active',
    name: 'Active link',
    htmlTag: '<a aria-current="page">',
    variant: 'Accent bar',
    summary: "The page you're reading, highlighted in the sidebar so you always know where you are in the docs.",
    aliases: ['selected item', 'current page', 'you are here', 'the purple link'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Accent bar',
        value: { light: 'border-left: 2px solid #6d28d9', dark: 'border-left: 2px solid #a78bfa' },
        plain: 'A 2px bar sits right on top of the guide line and marks the spot like a bookmark.',
      },
      {
        kind: 'appearance',
        term: 'Tinted background',
        value: { light: '#f5f3ff', dark: 'rgb(167 139 250 / 0.12)' },
        plain: 'A faint wash of the accent color, plus bolder text, makes the row stand out without shouting.',
      },
      {
        kind: 'behavior',
        term: 'aria-current',
        value: '"page"',
        plain: "Tells screen readers this link is the page they're on, and gives the CSS a hook to style it.",
      },
    ],
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    htmlTag: '<nav aria-label="Breadcrumb">',
    variant: 'Chevron separators',
    summary: 'The trail above the title that shows where this page lives. Each step links one level up.',
    aliases: ['breadcrumb trail', 'the path at the top', 'Docs › Storage'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Separator',
        value: '14px chevron',
        plain: 'Small, faint arrows between the steps read as “inside of”.',
      },
      {
        kind: 'behavior',
        term: 'Ordered list',
        value: '<ol>',
        plain: 'The steps are a numbered list in the code, so screen readers announce how many levels deep you are.',
      },
      {
        kind: 'behavior',
        term: 'aria-current',
        value: '"page"',
        plain: "The last step is plain text rather than a link, because you're already there.",
      },
    ],
  },
  {
    id: 'callout',
    name: 'Callout',
    htmlTag: '<div role="note">',
    variant: 'Info and warning',
    summary:
      'A colored box that lifts an important note out of the running text. Blue adds helpful context; amber warns about something that can go wrong.',
    aliases: ['admonition', 'alert box', 'note box', 'the blue box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Semantic color',
        value: 'blue = info · amber = warning',
        plain: 'Each color has one job across the docs, so readers learn to spot a warning at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Accent border',
        value: 'border-left: 3px solid',
        plain: 'A thick colored edge on the left, over a pale tint of the same color.',
      },
      {
        kind: 'appearance',
        term: 'Icon and title',
        value: '18px icon · bold first line',
        plain: 'An ⓘ or ⚠ icon and a bold opening line carry the meaning too, so the box never relies on color alone.',
      },
      {
        kind: 'behavior',
        term: 'Note role',
        value: 'role="note"',
        plain: 'Marks the box as an aside to the main text for assistive technology.',
      },
    ],
  },
  {
    id: 'package-tabs',
    name: 'Tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Package manager switcher',
    summary:
      'A row of tabs that swaps the install command below for npm, pnpm or yarn, so every reader copies the one that matches their setup.',
    aliases: ['tab bar', 'npm / yarn switcher', 'the code tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active tab indicator',
        value: { light: 'box-shadow: inset 0 -2px 0 #6d28d9', dark: 'box-shadow: inset 0 -2px 0 #a78bfa' },
        plain: 'A 2px accent underline and darker text mark the selected tab; the others stay gray.',
      },
      {
        kind: 'behavior',
        term: 'aria-selected',
        value: 'role="tab" aria-selected="true"',
        plain: 'Only one tab is selected at a time, and screen readers announce which one.',
      },
      {
        kind: 'behavior',
        term: 'Tab panel',
        value: 'role="tabpanel"',
        plain: 'The command under the tabs is the panel they control: picking another tab swaps only this part.',
      },
    ],
  },
  {
    id: 'copy-button',
    name: 'Copy button',
    htmlTag: '<button aria-label="Copy code">',
    variant: 'Icon only',
    summary: 'Puts the whole command or snippet on the clipboard in one click, so nobody has to drag-select code.',
    aliases: ['copy to clipboard', 'copy icon', 'the two squares'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon button',
        value: '28 × 28px',
        plain: 'A small square button with a two-sheets icon, tucked into the corner of each code box.',
      },
      {
        kind: 'behavior',
        term: 'Clipboard API',
        value: 'navigator.clipboard.writeText()',
        plain: "The browser function that copies text. Clicking the button calls it with the code's text.",
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"Copy code"',
        plain: 'An icon has no words, so the button carries a label that screen readers can say.',
      },
    ],
  },
  {
    id: 'code-block',
    name: 'Code block',
    htmlTag: '<pre><code>',
    variant: 'Filename · line numbers · syntax colors',
    summary: 'A box of code in a monospaced font, with colored syntax, numbered lines and the name of the file it belongs in.',
    aliases: ['code snippet', 'code sample', 'the code box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Syntax highlighting',
        value: { light: 'keywords #cf222e · strings #0a3069', dark: 'keywords #ff7b72 · strings #a5d6ff' },
        plain: 'Keywords, strings, names and props each get their own color, so the structure of the code stands out.',
      },
      {
        kind: 'appearance',
        term: 'Filename tab',
        value: 'app/settings/avatar-form.tsx',
        plain: 'Says which file the snippet goes in, styled like a tab in a code editor.',
      },
      {
        kind: 'appearance',
        term: 'Line numbers',
        value: 'user-select: none',
        plain: "The numbers sit in a gutter that can't be selected, so copying the code never copies them.",
      },
      {
        kind: 'behavior',
        term: 'Soft wrap',
        value: 'white-space: pre-wrap',
        plain: 'When the article column gets narrower than 520px, long lines wrap instead of running off the edge.',
      },
    ],
  },
  {
    id: 'highlighted-line',
    name: 'Line highlight',
    variant: 'Line 6',
    summary: 'One line of the snippet, tinted in the accent color, pointing at the exact part the text above talks about.',
    aliases: ['highlighted line', 'focus line', 'the colored line in the code'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tinted row',
        value: { light: 'rgb(109 40 217 / 0.07)', dark: 'rgb(167 139 250 / 0.12)' },
        plain: 'A faint wash of the accent color runs across the full width of the block.',
      },
      {
        kind: 'appearance',
        term: 'Accent edge',
        value: { light: 'box-shadow: inset 2px 0 0 #6d28d9', dark: 'box-shadow: inset 2px 0 0 #a78bfa' },
        plain: "A 2px line on the left edge, drawn as a shadow so it doesn't push the code sideways.",
      },
      {
        kind: 'appearance',
        term: 'Accent line number',
        value: { light: 'color: #6d28d9', dark: 'color: #a78bfa' },
        plain: 'The line number takes the accent color too, which makes the line easy to refer to.',
      },
    ],
  },
  {
    id: 'props-table',
    name: 'Props table',
    htmlTag: '<table>',
    variant: 'API reference',
    summary:
      'Lists every option the component accepts: its name, the kind of value it expects, what it falls back to, and what it does.',
    aliases: ['parameters table', 'API table', 'options list', 'the table of settings'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Code-styled cells',
        value: 'ui-monospace · 12.5px',
        plain: 'Names, types and defaults use a code font, because readers type them exactly as shown.',
      },
      {
        kind: 'appearance',
        term: 'Required badge',
        value: 'required',
        plain: 'A small rose label flags the one prop you must always pass.',
      },
      {
        kind: 'appearance',
        term: 'border-collapse: separate',
        value: 'border-radius: 10px',
        plain: 'A table can only round its corners when its cell borders are kept separate; collapsed borders ignore the radius.',
      },
      {
        kind: 'behavior',
        term: 'Stacked rows',
        value: '@container docs-article (width < 520px)',
        plain: 'When the article column gets narrow, the header row hides and each prop stacks into its own block.',
      },
    ],
  },
  {
    id: 'feedback',
    name: 'Feedback widget',
    variant: 'Was this page helpful?',
    summary:
      'A one-click question at the end of the article. The answers tell the docs team which pages work and which need a rewrite.',
    aliases: ['thumbs up / down', 'page rating', 'was this helpful'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill buttons',
        value: 'border-radius: 999px',
        plain: 'Two small outlined pills with thumb icons keep the question quick and low-key.',
      },
      {
        kind: 'behavior',
        term: 'Binary rating',
        value: 'Yes · No',
        plain: 'Only two choices, so answering takes a single click.',
      },
    ],
  },
  {
    id: 'pager',
    name: 'Previous and next links',
    htmlTag: '<nav>',
    variant: 'Pagination cards',
    summary: 'Two cards at the end of the article that lead to the pages before and after this one, in sidebar order.',
    aliases: ['next page button', 'prev / next', 'page navigation', 'the cards at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Two-column grid',
        value: 'repeat(2, minmax(0, 1fr))',
        plain: 'Previous sits on the left and Next on the right, matching the direction you move through the docs.',
      },
      {
        kind: 'appearance',
        term: 'Direction arrows',
        value: '16px chevrons',
        plain: 'Arrows point the way, and the small label above each title says which way it goes.',
      },
      {
        kind: 'behavior',
        term: 'Sidebar order',
        value: 'Buckets ← Upload button → Signed URLs',
        plain: 'The cards follow the docs tree, so reading front to back takes one click per page.',
      },
    ],
  },
  {
    id: 'toc',
    name: 'Table of contents',
    htmlTag: '<nav aria-label="On this page">',
    variant: 'On this page · Scroll spy',
    summary:
      "A short list of this page's sections, pinned on the right. The section you're reading is highlighted, and the highlight follows you as you scroll.",
    aliases: ['on this page', 'page outline', 'jump links', 'the list on the right'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active section',
        value: { light: 'border-left: 2px solid #6d28d9', dark: 'border-left: 2px solid #a78bfa' },
        plain: 'The current section gets accent-colored text and a colored segment on the thin rail.',
      },
      {
        kind: 'behavior',
        term: 'Scroll spy',
        value: 'aria-current="true"',
        plain:
          'A script watches which heading has scrolled up near the top bar and moves the highlight to it. Scroll this page to see it follow.',
      },
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 84px',
        plain: 'The list stays in view while the article scrolls, so you can jump ahead from anywhere.',
      },
      {
        kind: 'behavior',
        term: 'Breakpoint',
        value: '@container (width < 1100px)',
        plain: 'Below 1100px this list hides first, so the article keeps a comfortable width.',
      },
    ],
  },
];
