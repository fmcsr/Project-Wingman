import type { UiElementSpec } from '../../../catalog';

/** Elements in the Glyph code editor. `value` fields are the actual values from GlyphSite.module.css and the markup. */
export const glyphSpecs: UiElementSpec[] = [
  {
    id: 'title-bar',
    name: 'Title bar',
    htmlTag: '<header>',
    variant: 'Menu bar · Back and forward · Layout buttons',
    summary:
      "The strip across the top of the window: the app's menus on the left, the command center in the middle, and buttons on the right that show or hide the side bar and the panel.",
    aliases: ['menu bar', 'top bar', 'File Edit View menus', 'window header'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Menu bar',
        value: 'role="menubar"',
        plain:
          'File, Edit, Selection, View, Go, Run, Terminal and Help each open a menu. In a narrower window the last ones fold into a “…” button, and then all of them into one menu button.',
      },
      {
        kind: 'behavior',
        term: 'Layout controls',
        value: 'aria-pressed="true"',
        plain:
          'The buttons on the right show or hide the side bar, the panel and a second side bar; a filled part means it’s open. The last one opens every layout option.',
      },
      {
        kind: 'appearance',
        term: 'Custom title bar',
        value: { light: 'height: 35px · background: #f8f8f8', dark: 'height: 35px · background: #181818' },
        plain:
          "The editor draws its own title bar instead of the system's, so the menus and the command center fit in it, in the same gray as the rest of the frame.",
      },
    ],
  },
  {
    id: 'command-center',
    name: 'Command center',
    htmlTag: '<div role="search">',
    variant: 'Title bar · Folder name · ⌘P',
    summary:
      "The field in the middle of the title bar, labeled with the open folder's name. Clicking it finds any file by name; typing > in it turns it into the command palette, which runs any command by name.",
    aliases: ['search bar', 'quick open', 'command palette', 'go to file', 'the box at the top'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Quick Open',
        value: 'aria-keyshortcuts="Meta+P"',
        plain:
          'Command + P opens it to jump to a file by typing a few letters of its name. Shift + Command + P opens it as the command palette instead.',
      },
      {
        kind: 'behavior',
        term: 'Prefixes',
        value: '> · @ · :',
        plain:
          'One field does several jobs: > runs a command, @ jumps to a function in the file, : goes to a line number.',
      },
      {
        kind: 'appearance',
        term: 'Field in the title bar',
        value: {
          light: 'background: #ffffff · border: 1px solid #d4d4d4',
          dark: 'background: #222222 · border: 1px solid #383838',
        },
        plain: 'A rounded field a shade apart from the title bar, with the search icon and “billing-service” centered in it.',
      },
    ],
  },
  {
    id: 'activity-bar',
    name: 'Activity bar',
    htmlTag: '<nav>',
    variant: 'Explorer open · Badges',
    summary:
      'The column of icons on the far left. Each opens a view in the side bar: Explorer, Search, Source Control, Run and Debug, and Extensions. Accounts and settings sit at the bottom.',
    aliases: ['side icons', 'the icons on the left', 'left toolbar', 'view switcher'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active indicator',
        value: { light: 'width: 2px · background: #0e7c5f', dark: 'width: 2px · background: #2bab84' },
        plain: "The open view's icon turns bright and gets a thin jade line along its left edge.",
      },
      {
        kind: 'appearance',
        term: 'Count badge',
        value: { light: 'background: #0e7c5f · font-size: 9px', dark: 'background: #1d8566 · font-size: 9px' },
        plain:
          "A number on an icon's corner says something is waiting there: 2 changed files in Source Control, 1 update on the gear.",
      },
      {
        kind: 'behavior',
        term: 'Toggle the side bar',
        value: '⌘B',
        plain: "Clicking the open view's icon again hides the side bar, so the code gets the whole width.",
      },
    ],
  },
  {
    id: 'explorer',
    name: 'Explorer',
    htmlTag: '<ul role="tree">',
    variant: 'File tree · src expanded · invoice.ts selected',
    summary:
      "The side bar's file tree for the open folder. Folders fold open with a chevron, the file in the editor is highlighted, and colors and letters show what's changed or broken.",
    aliases: ['file tree', 'sidebar', 'file browser', 'project files', 'folder view'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Tree view',
        value: 'role="tree" · aria-expanded',
        plain:
          'Folders open and close in place, each level indented a step further, so you see where a file lives without leaving the editor.',
      },
      {
        kind: 'appearance',
        term: 'Selected row',
        value: { light: 'background: #e4e6f1', dark: 'background: #37373d' },
        plain:
          "invoice.ts, the file in the editor, stays highlighted. It's gray rather than a bright color because the keyboard focus is in the editor, not the tree.",
      },
      {
        kind: 'appearance',
        term: 'File icons',
        value: 'TS · {} · i',
        plain:
          'Small glyphs tell file types apart at a glance: TS for TypeScript (orange for tests), braces for JSON, an i for the README.',
      },
      {
        kind: 'appearance',
        term: 'Ignored folder',
        value: { light: 'color: #8e8e90', dark: 'color: #8c8c8c' },
        plain: 'node_modules is grayed out: git ignores it, so nothing in it ever shows up as changed.',
      },
    ],
  },
  {
    id: 'git-decoration',
    name: 'File decorations',
    htmlTag: '<span>',
    variant: 'M · 1, M · Folder dot',
    summary:
      "The letters, numbers and dots after a file's name, with the name tinted to match: M for modified, U for new, a count of problems, and a dot on a folder that holds any of them.",
    aliases: ['M next to the file', 'git status', 'modified marker', 'red file name', 'badge in the file tree'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Modified',
        value: { light: 'color: #895503', dark: 'color: #e2c08d' },
        plain: 'types.ts has changed since the last commit, so its name turns amber with an M.',
      },
      {
        kind: 'appearance',
        term: 'Problems',
        value: { light: 'color: #b01011', dark: 'color: #f88070' },
        plain: 'invoice.ts has one error, so it turns red and reads “1, M”: problems outrank git colors.',
      },
      {
        kind: 'behavior',
        term: 'Rolls up to folders',
        value: '●',
        plain:
          'A folder shows a dot in the strongest color among its files, so trouble is visible without opening every folder.',
      },
    ],
  },
  {
    id: 'editor-tab',
    name: 'Editor tab',
    htmlTag: '<div role="tab">',
    variant: 'Active · Unsaved · Decorated',
    summary:
      "One tab per open file, above the code. The open tab takes the editor's background with a jade line on top; a dot where the close button would be means unsaved changes.",
    aliases: ['file tab', 'open files', 'unsaved dot', 'dirty indicator', 'tab bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Unsaved changes dot',
        value: 'width: 8px · border-radius: 50%',
        plain:
          "invoice.ts has edits that aren't saved yet, so its × has turned into a dot. Saving brings the × back; pointing at the dot shows it too.",
      },
      {
        kind: 'appearance',
        term: 'Active tab',
        value: {
          light: 'background: #ffffff · border-top: 1px solid #0e7c5f',
          dark: 'background: #1f1f1f · border-top: 1px solid #2bab84',
        },
        plain:
          "The open tab is the editor's own color, so it reads as joined to the page below, with a thin jade line along its top.",
      },
      {
        kind: 'behavior',
        term: 'Close on hover',
        value: '×',
        plain: 'The other tabs show their close button only while you point at them, which keeps the strip calm.',
      },
    ],
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    htmlTag: '<nav>',
    variant: 'Folder › File › Function',
    summary:
      'The path under the tabs: the folder, the file and the function the cursor is in. Each part opens a list of what sits next to it, to jump there.',
    aliases: ['path bar', 'file path', 'symbol path', 'where am I'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Follows the cursor',
        value: 'aria-current="location"',
        plain: 'The last crumb is the function around the cursor, totals. Moving the cursor into another function changes it.',
      },
      {
        kind: 'appearance',
        term: 'Symbol icon',
        value: { light: 'color: #652d90', dark: 'color: #b180d7' },
        plain: 'A small purple cube marks a function, the same icon the outline and the symbol search use.',
      },
      {
        kind: 'appearance',
        term: 'Quiet text',
        value: { light: 'color: #616161 · height: 22px', dark: 'color: #a9a9a9 · height: 22px' },
        plain: 'Small and muted, so it tells you where you are without competing with the code.',
      },
    ],
  },
  {
    id: 'line-numbers',
    name: 'Line numbers',
    htmlTag: '<div>',
    variant: 'Gutter · Current line',
    summary:
      "The column of numbers left of the code. The cursor's line number is brighter, and the strip left of the numbers holds markers such as the lightbulb or breakpoints.",
    aliases: ['gutter', 'margin', 'row numbers'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active line number',
        value: { light: 'color: #171184', dark: 'color: #cccccc' },
        plain: "19, the cursor's line, stands out from the others (#6e7681), so you never lose your place.",
      },
      {
        kind: 'appearance',
        term: 'Glyph margin',
        value: 'width: 18px',
        plain: 'The narrow strip left of the numbers is kept for icons: the lightbulb for fixes, red dots for breakpoints.',
      },
      {
        kind: 'behavior',
        term: 'Line references',
        value: 'src/invoice.ts:19:27',
        plain:
          'Errors, logs and links point at line numbers; clicking one in the terminal opens the file at that line and column.',
      },
    ],
  },
  {
    id: 'change-bar',
    name: 'Git change bars',
    htmlTag: '<span>',
    variant: 'Added · Modified · Deleted',
    summary:
      'Thin colored marks between the line numbers and the code that show what changed since the last commit: green for added lines, blue for changed ones, a red wedge where lines were deleted.',
    aliases: ['git gutter', 'diff markers', 'change indicators', 'dirty diff'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Added',
        value: 'background: #2ea043 · width: 3px',
        plain: 'Lines 11 to 16, the new applyDiscount function, weren’t in the last commit.',
      },
      {
        kind: 'appearance',
        term: 'Modified',
        value: { light: 'background: #2090d3', dark: 'background: #1b81a8' },
        plain: 'Lines 19 and 20 replace a single older line.',
      },
      {
        kind: 'appearance',
        term: 'Deleted',
        value: 'border-left: 5px solid #f85149',
        plain: 'The small wedge above line 3 marks where an import was removed.',
      },
      {
        kind: 'behavior',
        term: 'Inline diff',
        value: 'aria-label="Lines 11 to 16 added"',
        plain: 'Clicking a mark shows the old version right there in the editor, with a button to undo that one change.',
      },
    ],
  },
  {
    id: 'editor',
    name: 'Editor',
    htmlTag: '<div role="textbox">',
    variant: 'TypeScript · Syntax highlighting · Cursor on line 19',
    summary:
      'Where the code is written: a monospace font, colors that tell keywords, functions, types and strings apart, faint guides for each indentation level, and a blinking cursor.',
    aliases: ['code area', 'text editor', 'syntax highlighting', 'code view'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Syntax highlighting',
        value: {
          light: 'keywords #af00db · functions #795e26 · types #267f99',
          dark: 'keywords #c586c0 · functions #dcdcaa · types #4ec9b0',
        },
        plain: 'Each kind of word has its own color, so the shape of the code shows before you read a word of it.',
      },
      {
        kind: 'appearance',
        term: 'Bracket pair colors',
        value: { light: '#0431fa · #319331 · #7b3814', dark: '#ffd700 · #da70d6 · #179fff' },
        plain: 'Brackets take one of three colors by how deeply they’re nested, so you can see which one closes which.',
      },
      {
        kind: 'appearance',
        term: 'Current line',
        value: { light: 'border: 2px solid #eeeeee', dark: 'border: 2px solid #282828' },
        plain: "The cursor's line has a faint outline; the cursor itself is a 2px bar that blinks.",
      },
      {
        kind: 'appearance',
        term: 'Indent guides',
        value: { light: '#d3d3d3 · active #939393', dark: '#404040 · active #707070' },
        plain: 'Hairlines mark each indentation level; the block the cursor is in gets a brighter one.',
      },
    ],
  },
  {
    id: 'squiggle',
    name: 'Error squiggle',
    htmlTag: '<span aria-invalid="true">',
    variant: 'Error · Wavy red',
    summary:
      'The wavy red underline under code the language checker rejects, shown as you type, before anything runs. Warnings get a yellow one; pointing at a squiggle explains it.',
    aliases: ['red underline', 'wavy line', 'diagnostic', 'lint error', 'red squiggly line'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Wavy underline',
        value: { light: 'text-decoration: underline wavy #e51400', dark: 'text-decoration: underline wavy #f14c4c' },
        plain: "A wave rather than a straight line, so it can't be mistaken for a link.",
      },
      {
        kind: 'behavior',
        term: 'Live diagnostics',
        value: 'ts(2551)',
        plain:
          'The check runs on the unsaved text: types.ts renamed discount to discountPercent, and this line found out right away.',
      },
      {
        kind: 'behavior',
        term: 'Counted everywhere',
        value: 'PROBLEMS 1',
        plain: 'Every squiggle also counts in the status bar and has a row in the Problems panel.',
      },
    ],
  },
  {
    id: 'hover-card',
    name: 'Hover card',
    htmlTag: '<div role="tooltip">',
    variant: 'Problem · Related information · Actions',
    summary:
      'The box that opens when the pointer rests on code. Here it explains the error, says where the suggested name is declared, and links to the problem and its fixes.',
    aliases: ['tooltip', 'hover', 'error popup', 'info popup'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Shows on hover',
        value: 'role="tooltip"',
        plain:
          'It opens after a short pause over the squiggle and closes when the pointer leaves. Touch screens have no hover, so on a phone it stays hidden.',
      },
      {
        kind: 'behavior',
        term: 'Quick Fix',
        value: '⌘.',
        plain: 'Quick Fix… lists automatic repairs; here it offers to change discount to discountPercent.',
      },
      {
        kind: 'appearance',
        term: 'Action strip',
        value: { light: 'background: #f0f0f0', dark: 'background: #2b2b2b' },
        plain: "The actions sit in a strip along the card's bottom, apart from the message.",
      },
    ],
  },
  {
    id: 'lightbulb',
    name: 'Lightbulb',
    htmlTag: '<span role="button">',
    variant: 'Quick fix available',
    summary:
      "The yellow lightbulb beside the cursor's line says the editor has a fix or a refactoring for the code there. Clicking it lists them.",
    aliases: ['quick fix', 'code actions', 'yellow bulb', 'suggestions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'In the margin',
        value: 'fill: #ffcc00 · 16 × 16px',
        plain: 'It sits in the strip left of the line number, so it never covers the code.',
      },
      {
        kind: 'behavior',
        term: 'Code actions',
        value: 'aria-label="Show Code Actions (⌘.)"',
        plain: 'Command + period opens the same list from the keyboard, wherever the cursor is.',
      },
    ],
  },
  {
    id: 'minimap',
    name: 'Minimap',
    htmlTag: '<div>',
    variant: 'Slider · Overview ruler',
    summary:
      'The whole file in miniature along the right edge, in the colors of the code. A shaded box marks the part on screen, and the scrollbar next to it marks changes and problems.',
    aliases: ['code overview', 'scroll map', 'mini map', 'scrollbar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Slider',
        value: { light: 'fill: rgb(100 100 100 / 0.2)', dark: 'fill: rgb(121 121 121 / 0.2)' },
        plain: 'The gray box covers the lines in view; dragging it scrolls the file.',
      },
      {
        kind: 'appearance',
        term: 'Overview ruler',
        value: 'width: 14px',
        plain:
          "The scrollbar's track marks the whole file: changed lines on its left, problems in red on its right, the cursor as a line across.",
      },
      {
        kind: 'behavior',
        term: 'Scale',
        value: '1px per character · 3px per line',
        plain: 'Each character is one pixel wide, so the outline of long and short lines tells you where you are.',
      },
    ],
  },
  {
    id: 'panel',
    name: 'Panel',
    htmlTag: '<section>',
    variant: 'Terminal open · Problems count',
    summary:
      'The area under the editor, with five views in tabs: Problems, Output, Debug Console, Terminal and Ports. Its toolbar adds, splits and closes terminals.',
    aliases: ['bottom panel', 'terminal panel', 'output window', 'console'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Active tab',
        value: { light: 'box-shadow: inset 0 -1px #0e7c5f', dark: 'box-shadow: inset 0 -1px #2bab84' },
        plain: 'TERMINAL, the open view, is brighter and underlined in jade.',
      },
      {
        kind: 'appearance',
        term: 'Count badge',
        value: { light: 'background: #cccccc', dark: 'background: #616161' },
        plain: "A gray pill after PROBLEMS counts what's in it: one error.",
      },
      {
        kind: 'behavior',
        term: 'Toggle',
        value: '⌘J',
        plain: 'Command + J hides and shows the whole panel; the up arrow makes it fill the window.',
      },
    ],
  },
  {
    id: 'terminal',
    name: 'Integrated terminal',
    htmlTag: '<div role="log">',
    variant: 'zsh · Type check output',
    summary:
      "A command line inside the editor, opened in the project's folder. Here it ran the type checker, which reports the same error the squiggle shows.",
    aliases: ['terminal', 'command line', 'shell', 'console', 'CLI'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Prompt',
        value: '➜ billing-service git:(feature/discount-codes) ✗',
        plain: 'The prompt shows the folder and the git branch; the ✗ means there are changes not yet committed.',
      },
      {
        kind: 'appearance',
        term: 'ANSI colors',
        value: { light: 'red #cd3131 · cyan #05799a', dark: 'red #f14c4c · cyan #29b8db' },
        plain:
          'Programs color their own output; the terminal maps those colors to the theme, darker on a light background so they stay readable.',
      },
      {
        kind: 'behavior',
        term: 'Scrollback',
        value: 'justify-content: flex-end',
        plain: 'The newest output sits at the bottom, by the prompt; older lines scroll up out of view.',
      },
    ],
  },
  {
    id: 'status-bar',
    name: 'Status bar',
    htmlTag: '<footer>',
    variant: 'Project on the left · File on the right',
    summary:
      'The thin strip along the bottom of the window. Its left side is about the project: the remote connection, the branch and the problems. Its right side is about the open file: cursor, indentation, encoding, line endings and language.',
    aliases: ['bottom bar', 'footer', 'the info at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Remote button',
        value: { light: 'background: #0e7c5f', dark: 'background: #1d8566' },
        plain:
          "The jade button at the far left opens a window on another machine or in a container. It's the only item with a fill.",
      },
      {
        kind: 'appearance',
        term: 'Compact items',
        value: 'height: 22px · font-size: 12px',
        plain: 'Every item is a small button: clicking one changes it, such as the indentation or the line endings.',
      },
      {
        kind: 'behavior',
        term: 'Narrow windows',
        value: '@container glyph (width < 640px)',
        plain: 'When the window is narrow, the file details step aside; the branch, the problems and the cursor stay.',
      },
    ],
  },
  {
    id: 'branch-indicator',
    name: 'Branch indicator',
    htmlTag: '<div role="button">',
    variant: 'Branch · Uncommitted · Sync',
    summary:
      'The current git branch, at the bottom left. An asterisk means uncommitted changes, and the arrows count commits to pull and to push.',
    aliases: ['git branch', 'current branch', 'branch name', 'sync button'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Switch branches',
        value: 'feature/discount-codes*',
        plain: 'Clicking the name lists the other branches to switch to, or creates a new one.',
      },
      {
        kind: 'behavior',
        term: 'Sync',
        value: '0↓ 1↑',
        plain: 'Nothing new to pull and one commit to push. Clicking it pulls and pushes in one go.',
      },
    ],
  },
  {
    id: 'problems-count',
    name: 'Problems indicator',
    htmlTag: '<div role="button">',
    variant: 'Errors · Warnings',
    summary:
      'How many errors and warnings the open files have, next to the branch. Clicking it opens the Problems panel.',
    aliases: ['error count', 'warnings', 'problems', 'the red x at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon and count',
        value: '⊗ 1 · ⚠ 0',
        plain: 'A circled x counts errors and a triangle counts warnings: shapes, not only colors, tell them apart.',
      },
      {
        kind: 'behavior',
        term: 'Opens Problems',
        value: '⇧⌘M',
        plain: 'The Problems list has one row per squiggle, and each row jumps to its line.',
      },
    ],
  },
  {
    id: 'cursor-position',
    name: 'Cursor position',
    htmlTag: '<div role="button">',
    variant: 'Line and column',
    summary: 'Where the cursor is: line 19, column 35. Clicking it opens Go to Line.',
    aliases: ['line and column', 'Ln Col', 'caret position'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Go to Line',
        value: 'aria-label="Go to Line/Column"',
        plain: 'Type a line number to jump there. The compiler’s “19:27” in the terminal means line 19, column 27.',
      },
      {
        kind: 'behavior',
        term: 'Selection count',
        value: 'Ln 19, Col 35',
        plain: 'With text selected, it also says how much is selected, like “(8 selected)”.',
      },
    ],
  },
  {
    id: 'language-mode',
    name: 'Language mode',
    htmlTag: '<div role="button">',
    variant: '{ } · TypeScript',
    summary:
      "The file's language, which decides its colors, its checks and its suggestions. The braces before it show the language service's status.",
    aliases: ['file type', 'language picker', 'syntax mode', 'TypeScript at the bottom'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Change language',
        value: 'aria-label="Select Language Mode"',
        plain: 'Clicking it picks another language for this file, for example when its name has no extension.',
      },
      {
        kind: 'behavior',
        term: 'Language status',
        value: '{ }',
        plain: 'The braces open a small menu with the TypeScript version and the project settings the file belongs to.',
      },
    ],
  },
];
