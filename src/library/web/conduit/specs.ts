import type { UiElementSpec } from '../../../catalog';

/** Elements in the Conduit automation builder. `value` fields are the actual values from ConduitSite.module.css. */
export const conduitSpecs: UiElementSpec[] = [
  {
    id: 'top-bar',
    name: 'Top bar',
    htmlTag: '<header>',
    variant: 'Charcoal · Home · App switcher · Help',
    summary:
      "The dark bar across the top of the editor: Home and the app switcher on the left, the flow's name in the middle, Help on the right.",
    aliases: ['header', 'app bar', 'navigation bar', 'top navigation'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dark frame',
        value: { light: 'background: #2a2b2e · height: 48px', dark: 'background: #17181a · height: 48px' },
        plain:
          'Charcoal in both themes, like the rail below it, so the light canvas reads as the work area inside a frame.',
      },
      {
        kind: 'behavior',
        term: 'App switcher',
        value: 'aria-haspopup="menu"',
        plain: "The nine dots open the suite's other products, so you can jump to a table or a form without going home first.",
      },
      {
        kind: 'behavior',
        term: 'Help menu',
        value: 'Help ⌄',
        plain: 'Help opens the docs, the keyboard shortcuts and a way to reach support.',
      },
    ],
  },
  {
    id: 'flow-name',
    name: 'Flow name',
    htmlTag: '<div>',
    variant: 'Folder / Owner / Name · Menu',
    summary:
      "The middle of the top bar says which flow is open: the folder it's in, whose it is and its name. The chevron renames it, moves it or opens its version history.",
    aliases: ['zap name', 'workflow title', 'breadcrumb', 'the name at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Breadcrumb',
        value: 'Revenue ops / IM / Big payments to #sales-wins',
        plain: 'Folder, owner and name read left to right like a path, so you always know where the flow lives.',
      },
      {
        kind: 'appearance',
        term: 'Owner initials',
        value: 'background: #2f5a48 · 24 × 24px',
        plain: 'IM is Ines Moreau, who built the flow. Teammates can open it, but it belongs to her.',
      },
      {
        kind: 'behavior',
        term: 'Flow menu',
        value: 'aria-haspopup="menu"',
        plain: 'The chevron after the name opens rename, duplicate, move to a folder and version history.',
      },
    ],
  },
  {
    id: 'status-badge',
    name: 'Draft badge',
    htmlTag: '<span>',
    variant: 'Draft · Unpublished changes',
    summary:
      "The small tag after the name says you're looking at a draft whose changes aren't live yet. The published version keeps running until you publish.",
    aliases: ['status pill', 'draft label', 'status tag', 'unpublished'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Status pill',
        value: 'background: #fbe7a8 · color: #5b4300',
        plain: 'A pale amber pill with dark text. It sits on the charcoal top bar, so it looks the same in both themes.',
      },
      {
        kind: 'behavior',
        term: 'Drafts stay private',
        value: 'Draft',
        plain:
          'Edits save as you go, but the running flow only changes when you publish. Then the badge goes away until the next edit.',
      },
    ],
  },
  {
    id: 'nav-rail',
    name: 'Navigation rail',
    htmlTag: '<nav>',
    variant: 'Icons only · Flows current',
    summary:
      'The dark column down the left with the rest of the product: create, flows, tables, forms, history, apps and settings. The flow editor is one place among them.',
    aliases: ['sidebar', 'left menu', 'app navigation', 'icon bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon-only rail',
        value: 'width: 48px · 36 × 36px items',
        plain: 'Icons without labels keep the rail narrow so the canvas gets the room; each one names itself when you point at it.',
      },
      {
        kind: 'appearance',
        term: 'Current section',
        value: 'background: rgb(255 255 255 / 0.12)',
        plain: 'Flows, where you are, gets a lighter tile and a full-white icon.',
      },
      {
        kind: 'behavior',
        term: 'Hides when narrow',
        value: '@container conduit (width < 820px)',
        plain: 'In a narrow window the rail steps aside, so the flow and its settings keep their room.',
      },
    ],
  },
  {
    id: 'on-off-toggle',
    name: 'On/off toggle',
    htmlTag: '<button role="switch">',
    variant: 'On',
    summary:
      'The switch that turns the published flow on or off. While it’s on, the flow runs for every payment that comes in, even while you edit a draft of it.',
    aliases: ['publish toggle', 'draft/published toggle', 'activate switch', 'enable flow', 'live switch'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Switch',
        value: { light: 'background: #2e5ce6 · 36 × 20px', dark: 'background: #3d66ea · 36 × 20px' },
        plain: 'A cobalt track with the knob at its right end means on; off is a gray track with the knob on the left.',
      },
      {
        kind: 'behavior',
        term: 'role="switch"',
        value: 'aria-checked="true"',
        plain: "Screen readers announce it as a switch that's on, rather than as a checkbox.",
      },
      {
        kind: 'behavior',
        term: 'Separate from Publish',
        value: 'v3',
        plain: 'Turning it off pauses the live version, v3. Publishing replaces v3 with the draft on screen.',
      },
    ],
  },
  {
    id: 'version-info',
    name: 'Version note',
    htmlTag: '<p>',
    variant: 'Version · Who · When',
    summary:
      'The line next to the switch: which version is live, who published it and when. The version number opens the history, where an older version can be restored.',
    aliases: ['last published', 'version history', 'published by', 'timestamp'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Version history',
        value: 'v3',
        plain: 'Every publish makes a new numbered version; v3 opens the list of all of them.',
      },
      {
        kind: 'appearance',
        term: 'Relative time',
        value: '2 hours ago',
        plain: 'Recent changes say how long ago they happened rather than giving a date, which is quicker to read.',
      },
      {
        kind: 'behavior',
        term: 'Shorter on phones',
        value: '@container conduit (width < 740px)',
        plain: 'On a narrow screen it keeps the version and the time and drops the name.',
      },
    ],
  },
  {
    id: 'publish-button',
    name: 'Publish button',
    htmlTag: '<button>',
    variant: 'Primary · Enabled',
    summary:
      'Makes the draft the live version. It’s the only filled button in the bar, at the far right, where the eye ends up.',
    aliases: ['publish', 'deploy', 'go live', 'save and publish', 'primary button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Primary button',
        value: { light: 'background: #2e5ce6 · height: 28px', dark: 'background: #3d66ea · height: 28px' },
        plain: "Solid cobalt with white text, so it's the first thing you look for when you're done.",
      },
      {
        kind: 'behavior',
        term: 'Disabled until ready',
        value: 'aria-disabled="true"',
        plain: 'While any step still needs setup it turns gray, so a broken flow can’t go live.',
      },
    ],
  },
  {
    id: 'canvas',
    name: 'Canvas',
    htmlTag: '<main>',
    variant: 'Dot grid · 100%',
    summary:
      'The endless surface the flow is laid out on. It moves with a drag and zooms with the controls in its corner; the dots show it’s a space to move around in, not a page.',
    aliases: ['workspace', 'board', 'editor area', 'dotted background', 'grid'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dot grid',
        value: {
          light: 'radial-gradient(#d2cfc8 1.1px) · background-size: 16px',
          dark: 'radial-gradient(#3a3b3f 1.1px) · background-size: 16px',
        },
        plain:
          'A faint dot every 16 pixels: enough texture to show the surface moves when you drag it, quiet enough to stay behind the steps.',
      },
      {
        kind: 'appearance',
        term: 'Off-white surface',
        value: { light: 'background: #f6f5f2', dark: 'background: #1c1d1f' },
        plain: 'A shade darker than the white cards, so the steps stand out on it.',
      },
      {
        kind: 'behavior',
        term: 'Pan and zoom',
        value: 'Drag · ⌘ + scroll',
        plain: 'Drag any empty spot to move around; scroll with Command held down to zoom.',
      },
    ],
  },
  {
    id: 'trigger-step',
    name: 'Trigger',
    htmlTag: '<div>',
    variant: 'Step 1 · Instant',
    summary:
      'The first step: the event that starts the flow. Every flow has exactly one; here it’s a new successful payment in Ledger.',
    aliases: ['trigger', 'start event', 'when this happens', 'webhook'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Instant trigger',
        value: 'Instant',
        plain:
          'Ledger tells Conduit about each payment the moment it happens. Apps that can’t are checked every few minutes instead, and the chip shows how often.',
      },
      {
        kind: 'appearance',
        term: 'Instant chip',
        value: {
          light: 'background: #fff8e1 · border: 1px solid #ead9a0',
          dark: 'background: #332c16 · border: 1px solid #5a4b20',
        },
        plain: "A small amber chip with a bolt sits next to the app's name.",
      },
      {
        kind: 'behavior',
        term: 'Test data',
        value: '1. Amount: 2,400.00',
        plain: 'Testing the trigger pulls in a recent payment, whose fields the later steps use as data pills.',
      },
    ],
  },
  {
    id: 'filter-step',
    name: 'Filter step',
    htmlTag: '<div>',
    variant: 'Built-in tool · Only continue if',
    summary:
      'A built-in step that stops the flow unless a condition is met: here, only payments of 1,000 or more go on to the steps below.',
    aliases: ['condition', 'if statement', 'rule', 'only continue if'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Condition',
        value: 'Only continue if…',
        plain: "Smaller payments stop here quietly; nothing after the filter runs for them, and they aren't counted as tasks.",
      },
      {
        kind: 'appearance',
        term: 'Built-in mark',
        value: 'fill: #2e5ce6',
        plain: "Conduit's own tools wear Conduit's cobalt tile, so they're told apart from other apps at a glance.",
      },
    ],
  },
  {
    id: 'action-step',
    name: 'Action step',
    htmlTag: '<div>',
    variant: 'Complete · App chip · More menu',
    summary:
      'A step that does something in another app; here Folio records the deal in a database. Each step shows its status, the app, a menu, and its number and event.',
    aliases: ['action', 'step', 'node', 'card', 'do this'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Step card',
        value: 'width: 340px · border-radius: 6px',
        plain: 'White cards of one width, stacked in a column, so the flow reads from top to bottom.',
      },
      {
        kind: 'appearance',
        term: 'Status icon',
        value: { light: 'fill: #1e8a4c', dark: 'fill: #3fb877' },
        plain: 'A green check means the step is set up and tested; one that needs attention would show a warning instead.',
      },
      {
        kind: 'appearance',
        term: 'App chip',
        value: 'height: 26px · border: 1px solid #cbc8c1',
        plain: "The app's mark and name in a hairline box say which app does the work, without opening anything.",
      },
      {
        kind: 'behavior',
        term: 'More menu',
        value: 'aria-haspopup="menu"',
        plain: 'The ⋮ opens rename, duplicate, delete and add a note.',
      },
    ],
  },
  {
    id: 'selected-step',
    name: 'Selected step',
    htmlTag: '<div aria-current="step">',
    variant: 'Selected · Settings open',
    summary:
      "The step you're editing. Its cobalt outline and tint match the panel it opened on the right.",
    aliases: ['active step', 'highlighted node', 'current step', 'focused card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selection outline',
        value: {
          light: 'border: 2px solid #2e5ce6 · background: #eef2fe',
          dark: 'border: 2px solid #6d8fff · background: #1f2944',
        },
        plain: "A thicker colored border and a soft tint; the panel's border is the same color, which ties the two together.",
      },
      {
        kind: 'behavior',
        term: 'Click to edit',
        value: 'aria-current="step"',
        plain: "Clicking a step selects it and opens its settings; clicking the canvas or the panel's × closes them.",
      },
    ],
  },
  {
    id: 'add-step',
    name: 'Add step button',
    htmlTag: '<button>',
    variant: 'On the connector · Between steps · At the end',
    summary:
      'The plus on the line between two steps adds a step right there; the plus after the last step adds one to the end.',
    aliases: ['plus button', 'insert step', 'add action', 'connector'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Connector line',
        value: { light: 'width: 2px · background: #2e5ce6', dark: 'width: 2px · background: #6d8fff' },
        plain: 'A cobalt line joins each step to the next, broken around the plus.',
      },
      {
        kind: 'behavior',
        term: 'Insert anywhere',
        value: 'aria-label="Add a step here"',
        plain: 'A new step can go between existing ones; the steps below it are renumbered.',
      },
    ],
  },
  {
    id: 'zoom-controls',
    name: 'Zoom controls',
    htmlTag: '<div role="toolbar">',
    variant: 'Out · Level · In · Fit',
    summary:
      "Buttons in the canvas's corner to zoom out, see or pick the zoom level, zoom in, and fit the whole flow on screen.",
    aliases: ['zoom', 'zoom in and out', 'fit to screen', 'magnification'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Fit to screen',
        value: 'aria-label="Fit to screen"',
        plain: "The corners button zooms so every step is in view, handy after you've wandered off.",
      },
      {
        kind: 'appearance',
        term: 'Floating toolbar',
        value: 'height: 36px · border-radius: 6px',
        plain: 'A small white bar with a shadow floats over the canvas, so it stays put while the flow moves.',
      },
      {
        kind: 'behavior',
        term: 'Zoom level',
        value: '100%',
        plain: 'The percentage changes as you zoom; clicking it offers preset levels.',
      },
    ],
  },
  {
    id: 'step-panel',
    name: 'Step panel',
    htmlTag: '<aside>',
    variant: 'Floating · Configure open',
    summary:
      'The selected step’s settings, in a panel floating over the right of the canvas: its app and name, the setup stages, the fields, and the button to go on.',
    aliases: ['side panel', 'settings panel', 'inspector', 'properties', 'drawer'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating panel',
        value: {
          light: 'border: 2px solid #2e5ce6 · width: 380px',
          dark: 'border: 2px solid #6d8fff · width: 380px',
        },
        plain: "It floats with a margin and a shadow rather than splitting the screen, in the selected step's color.",
      },
      {
        kind: 'behavior',
        term: 'Expand and close',
        value: 'aria-label="Expand panel"',
        plain: 'The corners button widens it to fill the window when a step has many fields; × closes it.',
      },
      {
        kind: 'behavior',
        term: 'Bottom sheet on phones',
        value: '@container conduit (width < 740px)',
        plain: 'On a narrow screen it docks along the bottom, under the flow, instead of floating beside it.',
      },
    ],
  },
  {
    id: 'step-tabs',
    name: 'Step tabs',
    htmlTag: '<div role="tablist">',
    variant: 'Setup › Configure › Test',
    summary:
      'The three stages of setting up a step: pick the app, the event and the account, fill in the fields, then test it with real data. Each gets a check when it’s done.',
    aliases: ['stepper', 'wizard steps', 'progress tabs', 'setup tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Current stage',
        value: { light: 'box-shadow: inset 0 -2px #2e5ce6', dark: 'box-shadow: inset 0 -2px #6d8fff' },
        plain: 'Configure, the stage that’s open, is underlined in cobalt.',
      },
      {
        kind: 'appearance',
        term: 'Checks',
        value: { light: 'fill: #1e8a4c', dark: 'fill: #3fb877' },
        plain: 'A green check after each stage that’s done; an empty circle while one isn’t.',
      },
      {
        kind: 'behavior',
        term: 'In order',
        value: '›',
        plain: 'The chevrons between the stages say they go in order, though you can go back to any of them.',
      },
    ],
  },
  {
    id: 'select-field',
    name: 'Dropdown',
    htmlTag: '<select>',
    variant: 'Channel · Required',
    summary:
      'A field that picks one option from a list the app provides: here, which Relay channel gets the message. The ⋮ beside it switches to a custom value.',
    aliases: ['select', 'dropdown menu', 'picker', 'combo box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Up and down arrows',
        value: 'height: 38px · border-radius: 4px',
        plain: 'The double chevron at the right marks a select; its list opens below with a search box on top.',
      },
      {
        kind: 'appearance',
        term: 'Required',
        value: { light: 'color: #cf3a2c', dark: 'color: #ff8a7e' },
        plain: "The red asterisk after the label means the step can't go on without it.",
      },
      {
        kind: 'behavior',
        term: 'Live options',
        value: '# sales-wins · Public',
        plain: "The options come from the connected Relay account, with each channel's privacy next to its name.",
      },
    ],
  },
  {
    id: 'data-pill',
    name: 'Data pill',
    htmlTag: '<span>',
    variant: 'Mapped field · From step 1',
    summary:
      'A value from an earlier step, dropped into a field: the step’s app and number, the field’s name, and the value from the test run. Every run fills it with that run’s value.',
    aliases: ['mapped field', 'variable', 'token', 'merge field', 'placeholder'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill',
        value: {
          light: 'background: #f7f6f3 · border: 1px solid #cbc8c1',
          dark: 'background: #2c2d30 · border: 1px solid #4d4e54',
        },
        plain:
          "A small box with Ledger's mark, “1. Amount:” in bold and 2,400.00 in gray: the field, and an example of what it holds.",
      },
      {
        kind: 'behavior',
        term: 'Insert data',
        value: 'aria-label="Insert data from a step"',
        plain: "The plus at the field's right lists the fields of every earlier step, ready to drop in.",
      },
      {
        kind: 'behavior',
        term: 'Mixed with text',
        value: '🎉 … just paid …',
        plain: 'Pills sit in the text like words, so one message mixes fixed words with the values of each run.',
      },
    ],
  },
  {
    id: 'yes-no-toggle',
    name: 'Yes/No toggle',
    htmlTag: '<div role="radiogroup">',
    variant: 'Yes selected',
    summary: 'Two options side by side for a setting that’s either on or off; the chosen one is tinted.',
    aliases: ['segmented control', 'radio buttons', 'boolean field', 'switch'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected option',
        value: {
          light: 'background: #eef2fe · border: 1px solid #2e5ce6',
          dark: 'background: #1f2944 · border: 1px solid #6d8fff',
        },
        plain: 'Yes is chosen: cobalt tint and outline. The check and the red cross repeat the meaning in shape.',
      },
      {
        kind: 'behavior',
        term: 'Radio group',
        value: 'role="radiogroup"',
        plain: 'Only one can be chosen at a time; the arrow keys move between them.',
      },
    ],
  },
  {
    id: 'continue-button',
    name: 'Continue button',
    htmlTag: '<button>',
    variant: 'Primary · Full width',
    summary:
      "Moves on to the step's next stage, here from Configure to Test. It spans the panel's width at the bottom, where the form ends.",
    aliases: ['next', 'primary button', 'save', 'call to action'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Full-width button',
        value: { light: 'background: #2e5ce6 · height: 40px', dark: 'background: #3d66ea · height: 40px' },
        plain: 'A wide cobalt button is hard to miss and easy to hit.',
      },
      {
        kind: 'behavior',
        term: 'Pinned footer',
        value: 'flex: none',
        plain: "It stays at the panel's bottom while the fields scroll above it.",
      },
      {
        kind: 'behavior',
        term: 'Disabled until filled',
        value: '“To continue, finish required fields”',
        plain: 'While a required field is empty, it turns gray and says what’s missing.',
      },
    ],
  },
];
