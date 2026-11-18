import type { UiElementSpec } from '../../../catalog';

/** Parts of the Copy button element, in the order they appear. `value` fields are the actual values from CopyButton. */
export const copyButtonSpecs: UiElementSpec[] = [
  {
    id: 'copy-button-field',
    name: 'Code field',
    htmlTag: '<pre><code>',
    variant: 'Package manager tabs · one-line command',
    summary:
      'A gray box holding a command to copy, set in a monospaced font so every character is unmistakable. It’s for copying, not editing.',
    aliases: ['code snippet', 'command box', 'code block', 'terminal command', 'the gray box with the code'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Monospace',
        value: "ui-monospace, 'SF Mono', Menlo · 12.5px",
        plain:
          'Every letter takes the same width, as in a terminal, so a command reads exactly as it will be typed: no confusing l with 1 or O with 0.',
      },
      {
        kind: 'appearance',
        term: 'Inset field',
        value: {
          light: 'background: #fafafa · border: 1px solid #eaeaea · border-radius: 8px',
          dark: 'background: #111 · border: 1px solid #2e2e2e · border-radius: 8px',
        },
        plain: 'A slightly darker box with a hairline border, so the code stands apart from the prose around it.',
      },
      {
        kind: 'appearance',
        term: 'Tabs',
        value: 'npm · pnpm · yarn · bun · active: 1.5px underline',
        plain:
          'One tab per package manager over the command, the chosen one in full ink with a line under it. Picking another swaps the command.',
      },
      {
        kind: 'behavior',
        term: 'Responsive command',
        value: 'npm i → npm install from 300px',
        plain:
          'Where the field is narrow it shows npm’s short form, so the whole command fits without being cut off; with room, the full word.',
      },
    ],
  },
  {
    id: 'copy-button',
    name: 'Copy button',
    htmlTag: '<button aria-label="Copy">',
    variant: 'Icon button · ghost',
    summary:
      'The small button at the end of the field that puts the command on your clipboard in one click, so nobody has to select it by hand.',
    aliases: ['copy to clipboard', 'copy icon', 'clipboard button', 'the two squares'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ghost icon button',
        value: '28px · border-radius: 6px · 16px icon',
        plain:
          'Just the icon, no box, until the pointer is over it; then a gray square appears behind it to show it’s a button.',
      },
      {
        kind: 'appearance',
        term: 'Hover state',
        value: { light: 'background: #ebebeb', dark: 'background: #262626' },
        plain: 'The gray square and a darker icon that say “you can click this” before you do.',
      },
      {
        kind: 'behavior',
        term: 'navigator.clipboard.writeText()',
        value: 'press: scale(0.92) · 100ms',
        plain:
          'The browser’s copy function puts the text on the clipboard. The button dips a little as it’s pressed, so the click is felt.',
      },
    ],
  },
  {
    id: 'copy-button-check',
    name: 'Success check',
    htmlTag: '<svg>',
    variant: 'Icon swap · 2s',
    summary:
      'The copy icon briefly turns into a green check: proof the copy worked, right where you clicked, without a message popping up elsewhere.',
    aliases: ['checkmark', 'copied state', 'confirmation icon', 'tick', 'the green check'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Icon morph',
        value: 'scale(0.6) + fade · 200ms · stroke draw 250ms',
        plain:
          'The two squares shrink and fade while the check grows in their place and draws itself from left to right.',
      },
      {
        kind: 'appearance',
        term: 'Success color',
        value: { light: 'stroke: #16a34a · 2px', dark: 'stroke: #22c55e · 2px' },
        plain: 'Green, and a little bolder than the copy icon, so the change catches the eye.',
      },
      {
        kind: 'behavior',
        term: 'Auto-revert',
        value: 'after 2s',
        plain: 'Two seconds later the check turns back into the copy icon, ready to copy again.',
      },
    ],
  },
  {
    id: 'copy-button-tooltip',
    name: 'Tooltip',
    htmlTag: '<span role="status">',
    variant: 'Copied! · top',
    summary:
      'A small label above the button that says “Copied!”, in the page’s colors flipped. It confirms in words what the check shows, and screen readers announce it.',
    aliases: ['toast', 'copied message', 'hint bubble', 'the little label that pops up'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inverted tooltip',
        value: {
          light: 'background: #171717 · color: #fff · 12px · border-radius: 6px',
          dark: 'background: #ededed · color: #0a0a0a · 12px · border-radius: 6px',
        },
        plain:
          'The page’s colors flipped: dark on a light page, light on a dark one, so it stands out from everything around it.',
      },
      {
        kind: 'appearance',
        term: 'Arrow',
        value: '5px CSS triangle · 8px above the button',
        plain: 'A little triangle under the label points at the button it belongs to.',
      },
      {
        kind: 'behavior',
        term: 'Enter transition',
        value: 'translateY(4px) scale(0.96) → none · 150ms',
        plain: 'It rises a few pixels as it fades in, then fades out with the check two seconds later.',
      },
    ],
  },
];
