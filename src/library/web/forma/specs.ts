import type { UiElementSpec } from '../../../catalog';

/** Elements in the Forma design editor. `value` fields are the actual values from FormaSite.module.css. */
export const formaSpecs: UiElementSpec[] = [
  {
    id: 'file-menu',
    name: 'File header',
    variant: 'Main menu · File name · Project',
    summary:
      'The top of the left panel says which file is open and where it lives. The logo opens the main menu; the file name opens a menu to rename it, duplicate it or see its version history.',
    aliases: ['file name', 'the title at the top left', 'main menu', 'Checkout redesign'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Main menu',
        value: 'aria-haspopup="menu"',
        plain:
          'The logo with a small arrow is a menu button: every command in the app is in there, from Undo to Preferences, even the ones without a button on screen.',
      },
      {
        kind: 'appearance',
        term: 'Plan badge',
        value: { light: 'background: #e0f2ef', dark: 'background: #1d3b38' },
        plain:
          "The small tag after the project's name shows which plan the team is on. A file that isn't in a project yet would say Drafts instead.",
      },
      {
        kind: 'behavior',
        term: 'Minimize UI',
        value: '@container (width < 900px)',
        plain:
          'The panel icon folds the left panel into a small floating bar that keeps only the file name, so the canvas gets the room. Narrow windows start that way.',
      },
    ],
  },
  {
    id: 'page-list',
    name: 'Pages',
    variant: 'List · Checkout open',
    summary:
      'A file holds several pages, each a canvas of its own. Teams often keep one page per flow, plus one for components and one for old ideas.',
    aliases: ['page switcher', 'page list', 'tabs inside the file', 'Checkout page'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Current page',
        value: { light: 'background: #f5f5f5', dark: 'background: #383838' },
        plain: 'The page on screen gets a gray fill; the layers listed below belong to it.',
      },
      {
        kind: 'behavior',
        term: 'Add and reorder',
        value: '+',
        plain: 'The plus adds a blank page. Pages are dragged up and down to reorder them, and a double-click renames one.',
      },
    ],
  },
  {
    id: 'layers-panel',
    name: 'Layers panel',
    htmlTag: '<div role="tree">',
    variant: 'Tree · Synced selection',
    summary:
      "Every object on the page as a nested list: the page's frames in bold, with what's inside them indented underneath, top of the screen first.",
    aliases: ['layer list', 'the left sidebar', 'outline', 'object tree'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Layer type icons',
        value: '# frame · ≡ auto layout · ◇ instance · T text',
        plain:
          'Each row starts with an icon for the kind of object it is, so you can read the structure without clicking anything.',
      },
      {
        kind: 'appearance',
        term: 'Component color',
        value: { light: 'color: #c2307e', dark: 'color: #e0559e' },
        plain:
          'Instances of components are set in pink, so you can tell at a glance which parts are reused and which were drawn just for this screen.',
      },
      {
        kind: 'behavior',
        term: 'Synced selection',
        value: { light: 'background: #e0f2ef', dark: 'background: #1d3b38' },
        plain:
          'Pay button is selected on the canvas, so its row is highlighted here; clicking a row selects it on the canvas too.',
      },
    ],
  },
  {
    id: 'layer-row',
    name: 'Layer row',
    htmlTag: '<div role="treeitem">',
    variant: 'Hovered · Lock and eye',
    summary:
      'One object in the layers panel. Under the pointer it shows an arrow that opens it and two toggles: the lock stops it from being moved by accident, the eye hides it.',
    aliases: ['layer', 'the eye icon', 'hide layer', 'lock layer'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Revealed on hover',
        value: 'visibility: hidden → visible',
        plain:
          "The arrow and the toggles only appear under the pointer, which keeps the list calm. Once a toggle is on, it stays in view: Status bar's lock, Promo banner's crossed-out eye.",
      },
      {
        kind: 'behavior',
        term: 'Hide',
        value: 'opacity: 0.4',
        plain: "A hidden layer stays in the file but isn't drawn; its row fades so you can still find it.",
      },
      {
        kind: 'behavior',
        term: 'Lock',
        value: 'aria-pressed="true"',
        plain:
          'Locked layers ignore clicks on the canvas: handy for backgrounds and status bars you keep grabbing by mistake.',
      },
    ],
  },
  {
    id: 'frame',
    name: 'Frame',
    htmlTag: '<section>',
    variant: 'Payment · 390 × 844',
    summary:
      'A screen-sized container on the canvas, also called an artboard. Each frame is one screen or one state of the design, with its name above the top-left corner.',
    aliases: ['artboard', 'screen', 'board', 'the white rectangle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Frame label',
        value: 'font-size: 11px',
        plain:
          'The name above the corner. Click it to select the whole frame, drag it to move the frame; like every label on the canvas, it keeps its size at any zoom.',
      },
      {
        kind: 'appearance',
        term: 'Device size',
        value: 'width: 390px · height: 844px',
        plain:
          "A common phone screen, picked from the Frame tool's list of devices, so the design is drawn at the size people will hold.",
      },
      {
        kind: 'behavior',
        term: 'States side by side',
        value: 'Payment · Payment – Error',
        plain:
          'Each state of a screen gets its own frame next to the default one, so the error case gets designed, and built, too.',
      },
    ],
  },
  {
    id: 'measurement',
    name: 'Spacing measurement',
    variant: 'Redline · 24',
    summary:
      'Hold Alt (Option on a Mac) with something selected and point at a neighbor: the editor draws the distance between them. The button sits 24px below the CVC field.',
    aliases: ['redline', 'spacing', 'distance', 'margin', 'the red number'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Redline',
        value: '24',
        plain: 'A red line with a number: the exact gap in design pixels, which a developer turns into a margin or a gap.',
      },
      {
        kind: 'behavior',
        term: 'Alt + hover',
        value: 'Alt / ⌥',
        plain: "Measuring isn't a tool but a key you hold: let go and the lines disappear.",
      },
      {
        kind: 'appearance',
        term: 'Target outline',
        value: { light: 'box-shadow: 0 0 0 1px #e5482d', dark: 'box-shadow: 0 0 0 1px #f25c3f' },
        plain:
          'The field being measured to is outlined in the same red, so you know which two things the number sits between.',
      },
    ],
  },
  {
    id: 'selection-handles',
    name: 'Selection box',
    variant: 'Bounding box · Corner handles',
    summary:
      "The outline around what's selected, with a small square on each corner. Drag a corner to resize, or an edge to change just one side.",
    aliases: ['bounding box', 'resize handles', 'the little squares', 'selection outline'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Resize handles',
        value: '8 × 8px · background: #ffffff',
        plain: "Only the corners get squares; the edges between them work as handles too, they just aren't drawn.",
      },
      {
        kind: 'behavior',
        term: 'Modifier keys',
        value: 'Shift · Alt',
        plain: 'Hold Shift to keep the proportions, or Alt to resize from the center.',
      },
      {
        kind: 'appearance',
        term: 'Instance outline',
        value: { light: 'box-shadow: 0 0 0 1px #c2307e', dark: 'box-shadow: 0 0 0 1px #e0559e' },
        plain:
          "The Pay button is a component instance, so its box is drawn in the components' pink. A plain layer gets the editor's teal instead.",
      },
    ],
  },
  {
    id: 'size-badge',
    name: 'Size badge',
    variant: 'Width × height',
    summary: "The selection's width and height in design pixels, shown just below it while it's selected.",
    aliases: ['dimensions', 'width and height', 'the size label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'W × H',
        value: '350 × 52',
        plain: 'The same numbers as W and H under Dimensions in the Design panel, where you can type new ones.',
      },
      {
        kind: 'behavior',
        term: 'Same size at any zoom',
        value: 'scale: calc(1 / var(--zoom))',
        plain:
          "The canvas is at 75%, yet the badge, the handles and the labels keep their size, and the numbers stay design pixels, not screen pixels.",
      },
    ],
  },
  {
    id: 'comment-pin',
    name: 'Comment pin',
    variant: 'Hover preview',
    summary:
      'A comment pinned to a spot on the design. Pointing at the pin previews the thread: who wrote it, when, its first lines and how many replies it has. Clicking opens the whole thread.',
    aliases: ['comment', 'note', 'feedback', 'the speech bubble'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pointed corner',
        value: 'border-radius: 16px 16px 16px 2px',
        plain:
          "Three round corners and one sharp one make a speech bubble whose point marks the spot the comment is about: the order summary's corner.",
      },
      {
        kind: 'behavior',
        term: 'Hover preview',
        value: 'Maya Lindgren · 2h · 2 replies',
        plain:
          "The preview opens beside the pin, over the canvas. Where there isn't room for it, the pin stays a small bubble with the author's face.",
      },
      {
        kind: 'behavior',
        term: 'Resolve',
        value: '✓ Resolve',
        plain: 'Once the feedback is handled, resolving the thread hides the pin without deleting the conversation.',
      },
    ],
  },
  {
    id: 'multiplayer-cursor',
    name: 'Multiplayer cursor',
    variant: 'Pointer with a name tag',
    summary:
      'Other people in the file, live: each has a colored pointer with their name, so you can see where everyone is working.',
    aliases: ['live cursor', 'collaborator cursor', 'presence', 'the name tags'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Name tag',
        value: 'border-radius: 3px',
        plain: 'A small label just below and to the right of the arrow, in the same color.',
      },
      {
        kind: 'appearance',
        term: 'A color per person',
        value: 'Noor #2f6fe4 · Theo #f0a417',
        plain:
          "The same color rings each person's photo at the top of the Design panel. Theo's amber is light, so his name is set in near-black.",
      },
      {
        kind: 'behavior',
        term: 'Follow',
        value: 'Click a photo',
        plain: "Clicking someone's photo follows their view: your screen moves with theirs, perfect for a walkthrough.",
      },
    ],
  },
  {
    id: 'toolbar',
    name: 'Toolbar',
    htmlTag: '<div role="toolbar">',
    variant: 'Floating · Move active',
    summary:
      'The drawing tools, in a bar floating over the bottom of the canvas: Move, Frame, Shape, Pen, Text, Comment and Actions, then a switch between Draw, Design and Dev handoff.',
    aliases: ['tool bar', 'drawing tools', 'the icons at the bottom', 'the arrow tool'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating toolbar',
        value: 'position: absolute; bottom: 16px',
        plain:
          'It sits over the canvas instead of taking a strip of its own, so the design gets the full height of the window.',
      },
      {
        kind: 'appearance',
        term: 'Active tool',
        value: { light: 'background: #0d857a', dark: 'background: #109486' },
        plain:
          "Move is filled with the editor's teal: it's what a click on the canvas does right now. A small arrow next to a tool opens its relatives, like Ellipse behind Shape.",
      },
      {
        kind: 'behavior',
        term: 'Single-key shortcuts',
        value: 'V · F · R · P · T · C',
        plain: 'Designers rarely click these: every tool has a one-letter key, like R for a rectangle or T for text.',
      },
    ],
  },
  {
    id: 'present-button',
    name: 'Present button',
    htmlTag: '<button>',
    variant: 'Play prototype',
    summary:
      'Plays the design as a clickable prototype, full screen, starting from the selected frame: the way to review a flow as people will use it.',
    aliases: ['play button', 'preview', 'prototype mode', 'the triangle at the top'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Prototype',
        value: 'Design · Prototype tabs',
        plain:
          'On the Prototype tab below, frames get wired together (tap Pay, show Order placed). Present plays those links like a real app.',
      },
      {
        kind: 'appearance',
        term: 'Icon button',
        value: 'aria-label="Present"',
        plain:
          'Only a triangle, so it carries a hidden name for screen readers. The arrow beside it picks where to present: this tab, a new one or a phone.',
      },
    ],
  },
  {
    id: 'zoom-control',
    name: 'Zoom control',
    htmlTag: '<button aria-haspopup="menu">',
    variant: '75% · Menu',
    summary:
      'How large the canvas is drawn. At 100% designs show at their real size; the menu zooms in, out or to fit everything.',
    aliases: ['zoom level', 'the percentage', 'magnifier'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Zoom level',
        value: 'transform: scale(0.75)',
        plain: 'At 75% the 390-wide frame takes about 293 pixels of screen, which leaves room for its error state beside it.',
      },
      {
        kind: 'behavior',
        term: 'Zoom to fit',
        value: 'Shift + 1',
        plain: "Brings every frame into view: the quickest way back when you're lost on the canvas.",
      },
      {
        kind: 'behavior',
        term: 'Sizes stay real',
        value: '350 × 52 at any zoom',
        plain: 'Zooming changes how big things look, never their size: the button is 350 wide at 50% and at 200%.',
      },
    ],
  },
  {
    id: 'component-instance',
    name: 'Component instance',
    variant: 'Button · Primary · Large',
    summary:
      'A copy of a reusable main component, here the Button. Copies stay linked: change the main Button and every Pay, Save and Next button follows.',
    aliases: ['instance', 'symbol', 'reusable component', 'variant', 'the diamond icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Diamond icon',
        value: '◇ Button',
        plain: 'A hollow diamond marks an instance: here at the top of the Design panel, and on its row in the layers panel.',
      },
      {
        kind: 'behavior',
        term: 'Variants',
        value: 'Style: Primary · Size: Large',
        plain:
          'One component can come in versions. The dropdowns switch this copy to another, say Secondary or Small, without breaking the link.',
      },
      {
        kind: 'behavior',
        term: 'Go to main component',
        value: '↗',
        plain:
          'Jumps to the original Button, usually on a Components page; a change made there reaches every copy.',
      },
    ],
  },
  {
    id: 'constraints',
    name: 'Constraints',
    htmlTag: '<button aria-haspopup="dialog">',
    variant: 'Left & right · Top',
    summary:
      'How a layer behaves when its frame is resized. They open from the button at the end of the Position row, which only layers inside a frame have.',
    aliases: ['pinning', 'resizing rules', 'responsive settings', 'anchors'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Set, not default',
        value: { light: 'background: #e0f2ef', dark: 'background: #1d3b38' },
        plain:
          "The teal tint says this layer's constraints differ from the default, left and top; an untouched layer shows a plain icon.",
      },
      {
        kind: 'behavior',
        term: 'Left & right',
        value: 'left: 20px · right: 20px',
        plain: 'On a wider phone the button grows and keeps 20 on each side, instead of staying put in a corner.',
      },
      {
        kind: 'behavior',
        term: 'Top',
        value: 'top: 681px',
        plain: 'It keeps its distance from the top. Bottom would hold it a fixed distance above the bottom edge instead.',
      },
    ],
  },
  {
    id: 'auto-layout',
    name: 'Auto layout',
    variant: 'Horizontal flow · Gap 8 · Padding 24/16',
    summary:
      "Rules that arrange what's inside a frame, like this button's lock icon and label: which way they flow, the gap between them and the padding around them. Edit the label and the button resizes itself.",
    aliases: ['layout', 'stack', 'flexbox', 'spacing settings', 'padding'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Flow',
        value: 'display: flex',
        plain:
          'Horizontal is on, so the icon and the label sit side by side, a flex row in CSS. Vertical would stack them; wrap and grid lay out many items.',
      },
      {
        kind: 'appearance',
        term: 'Gap',
        value: 'gap: 8px',
        plain: 'The space between the lock icon and the text, which stays the same however long the label gets.',
      },
      {
        kind: 'appearance',
        term: 'Padding',
        value: 'padding: 16px 24px',
        plain:
          "Space between the content and the button's edges: 24 left and right, 16 top and bottom. 16 + 20 (one line of text) + 16 makes it 52 tall.",
      },
    ],
  },
  {
    id: 'color-row',
    name: 'Fill',
    variant: 'Solid · 100%',
    summary:
      "The paint inside the selected layer: a swatch, its hex code and its opacity. Stroke, below it, would paint the edge, what a developer calls a border; this button doesn't have one.",
    aliases: ['color row', 'background color', 'hex code', 'fill color'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Hex code',
        value: 'background: #16181d',
        plain: 'Six characters for one exact color. The swatch shows it, and clicking it opens the color picker.',
      },
      {
        kind: 'appearance',
        term: 'Opacity',
        value: '100%',
        plain: 'How see-through the paint is. At 100% nothing behind the button shows through.',
      },
      {
        kind: 'behavior',
        term: 'Empty sections',
        value: { light: 'color: #737373', dark: 'color: #a3a3a3' },
        plain: 'A section with nothing in it, like Stroke and Export here, shrinks to a gray title and a plus.',
      },
    ],
  },
  {
    id: 'effect-row',
    name: 'Effect',
    variant: 'Drop shadow',
    summary: 'Shadows and blurs added to a layer. The Pay button has one drop shadow, whose settings open from its icon.',
    aliases: ['shadow', 'drop shadow', 'elevation', 'blur'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Drop shadow',
        value: 'box-shadow: 0 6px 16px rgb(22 24 29 / 0.24)',
        plain: 'X 0, Y 6, blur 16, near-black at 24%: the same numbers a developer writes in CSS.',
      },
      {
        kind: 'behavior',
        term: 'Show and remove',
        value: 'eye · −',
        plain: 'The eye turns the shadow off without losing its settings, handy for comparing; the minus deletes it.',
      },
      {
        kind: 'behavior',
        term: 'Stacked effects',
        value: '+',
        plain: 'The plus in the header adds another effect: a layer can have several shadows and blurs at once.',
      },
    ],
  },
];
