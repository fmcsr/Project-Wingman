import type { UiElementSpec } from './types';

/**
 * Elements in the Muse AI assistant, in on-screen order. `value` fields are the actual values from MuseApp.module.css.
 * `icon-button` is shared: keep its description as it is.
 */
export const assistant: UiElementSpec[] = [
  {
    id: 'liquid-glass-navbar',
    name: 'Liquid Glass navbar',
    htmlTag: '<header>',
    variant: 'Floating glass buttons',
    summary:
      'A top bar with no background of its own: its buttons float over the conversation like small pieces of glass, and the messages fade out as they scroll up beneath them.',
    aliases: ['glass bar', 'top bar', 'floating buttons', 'the see-through top bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(12px) saturate(180%)',
        plain: 'Each button blurs whatever passes behind it and boosts its colors, like frosted glass.',
      },
      {
        kind: 'appearance',
        term: 'Specular highlight',
        value: { light: 'inset 0 1px 0 rgb(255 255 255 / 0.9)', dark: 'inset 0 1px 0 rgb(255 255 255 / 0.12)' },
        plain: 'A thin bright line along the top edge of each button, like light catching the rim of real glass.',
      },
      {
        kind: 'behavior',
        term: 'Scroll edge effect',
        value: 'linear-gradient(var(--bg) 52px, transparent) · 92px',
        plain:
          'Instead of a hard line under the bar, messages fade out as they scroll up under the buttons, so the controls stay readable over any text.',
      },
    ],
  },
  {
    id: 'icon-button',
    name: 'Icon button',
    variant: 'Glass',
    summary: "A button that shows only an icon. Familiar actions like the menu or “new chat” don't need words.",
    aliases: ['icon', 'toolbar button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '36 × 36px',
        plain: 'The tappable area is bigger than the icon itself, so it is easy to hit.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: '"New chat", "Back"',
        plain: "An invisible name for screen readers, because there's no visible text.",
      },
    ],
  },
  {
    id: 'menu-button',
    name: 'Menu button',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Model switcher',
    summary: 'The name of the model in use, with a small chevron. Tap it to switch models from a menu.',
    aliases: ['model picker', 'model selector', 'dropdown button', 'the little arrow button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron',
        value: 'rotate: 180deg when open',
        plain: 'The arrow flips while the menu is open, so you can see the state at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Open state',
        value: { light: 'background: #f2f2f4', dark: 'background: #1c1c1f' },
        plain: 'While its menu is open, a soft gray pill stays behind the name, so it is clear where the menu came from.',
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: 'true / false',
        plain: 'Tells screen readers whether the menu is currently open.',
      },
    ],
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown menu',
    htmlTag: '<div role="menu">',
    variant: 'Model menu',
    summary:
      'A small panel of choices right under the button that opened it: each model with a one-line description, the one in use checked.',
    aliases: ['dropdown', 'popover menu', 'model list', 'the list that pops down'],
    concepts: [
      {
        kind: 'behavior',
        term: 'transform-origin',
        value: 'top center',
        plain: 'The menu grows out of the spot closest to its button, so it feels attached instead of appearing from nowhere.',
      },
      {
        kind: 'behavior',
        term: 'Enter and exit transition',
        value: 'scale: 0.96 → 1 · opacity · 200ms',
        plain: 'A quick scale-and-fade makes it pop in and out smoothly instead of blinking.',
      },
      {
        kind: 'appearance',
        term: 'Selected item',
        value: 'checkmark + gray row',
        plain: "The model in use is checked and sits on a gray row, so you know what's active before you change it.",
      },
    ],
  },
  {
    id: 'chat-bubble',
    name: 'Chat bubble',
    variant: 'Sent message',
    summary:
      "A rounded box that holds your message. In AI apps only your side gets a bubble; the assistant's answer is set as plain text.",
    aliases: ['message', 'speech bubble', 'prompt', 'the text balloon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Asymmetric corners',
        value: 'border-radius: 16px 16px 5px 16px',
        plain: 'One tighter corner points toward the sender, like the tail of a speech bubble.',
      },
      {
        kind: 'appearance',
        term: 'Max width',
        value: 'max-width: 80%',
        plain: 'The bubble never spans the full width; it hugs the right side, which keeps lines short and shows who spoke.',
      },
      {
        kind: 'appearance',
        term: 'Soft fill',
        value: { light: '#f2f2f4', dark: '#1c1c1f' },
        plain: 'A quiet gray instead of a bright color: your message is the context, the answer is the star.',
      },
    ],
  },
  {
    id: 'reasoning-disclosure',
    name: 'Reasoning disclosure',
    htmlTag: '<details>',
    variant: 'Collapsed · Thought for 9s',
    summary:
      'A one-line note on how long the assistant thought before answering. Tap it to open the steps it took on the way.',
    aliases: ['thinking', '“Thought for…”', 'chain of thought', 'reasoning steps'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Disclosure',
        value: '<details> / <summary>',
        plain: 'Closed by default, so the answer comes first; the chevron says there is more inside.',
      },
      {
        kind: 'behavior',
        term: 'Thinking state',
        value: 'Thinking… → Thought for 9s',
        plain: 'While the model works, this line says “Thinking…” with a soft shimmer; once it is done, it settles into the time it took.',
      },
      {
        kind: 'appearance',
        term: 'Brand mark',
        value: '14 × 14px',
        plain: "The assistant's small round mark starts its turn, in place of an avatar.",
      },
    ],
  },
  {
    id: 'formatted-answer',
    name: 'Formatted answer',
    htmlTag: '<article>',
    variant: 'Markdown, no bubble',
    summary:
      "The assistant's reply, turned from Markdown into a heading, bold text, a table and a checklist, and set on the page like a document instead of in a bubble.",
    aliases: ['AI response', 'answer', 'reply', 'rich text', 'Markdown'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Type scale',
        value: '15.5 / 12 / 11px',
        plain: 'Three sizes only: the heading, the body text, and the small text in tables. Few sizes make a long answer easy to scan.',
      },
      {
        kind: 'appearance',
        term: 'line-height',
        value: '1.55',
        plain: 'Generous space between the lines of body text, so a dense answer stays comfortable to read.',
      },
      {
        kind: 'appearance',
        term: 'Highlight',
        value: { light: 'background: rgb(244 168 18 / 0.3)', dark: 'color: #ffc24d' },
        plain:
          'The one number that matters most stands out: on white, a band like a marker stroke runs behind it; on black, the words themselves light up.',
      },
    ],
  },
  {
    id: 'citation-chip',
    name: 'Citation chip',
    htmlTag: '<a>',
    variant: 'Inline source',
    summary:
      'A small pill right after a claim that says where it came from, here page 2 of the kickoff notes. Tapping it opens the source.',
    aliases: ['source', 'reference', 'footnote', 'the little source tag'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inline pill',
        value: 'height: 16px · border-radius: 8px',
        plain: 'It sits in the line of text like a word, small enough not to break the sentence.',
      },
      {
        kind: 'behavior',
        term: 'Grounding',
        value: 'file + page',
        plain: 'Each fact points back to a file and a page, so you can check it instead of trusting it blindly.',
      },
    ],
  },
  {
    id: 'answer-table',
    name: 'Table',
    htmlTag: '<table>',
    variant: 'Compact, inside the answer',
    summary: 'Rows and columns for numbers that belong side by side: each goal, where it stands today and the target.',
    aliases: ['grid', 'Markdown table', 'comparison table', 'the numbers box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Every digit takes the same width, so the numbers line up in their column.',
      },
      {
        kind: 'appearance',
        term: 'Right-aligned numbers',
        value: 'text-align: right',
        plain: 'Numbers line up on their last digit, which makes them easy to compare down a column.',
      },
      {
        kind: 'appearance',
        term: 'Hairlines',
        value: { light: '1px solid #e7e7ea', dark: '1px solid #2a2a2e' },
        plain: 'Thin lines between the rows and a rounded frame around them, instead of a heavy grid.',
      },
    ],
  },
  {
    id: 'checklist',
    name: 'Checklist',
    htmlTag: '<input type="checkbox">',
    variant: 'Task list',
    summary: 'A list of to-dos, each with a checkbox. Done items are checked and step back in gray.',
    aliases: ['to-do list', 'task list', 'checkboxes', 'tick boxes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Checked state',
        value: { light: '#f4a812', dark: '#ffb836' },
        plain: "A done item gets a filled box with a check mark, in the app's accent color.",
      },
      {
        kind: 'behavior',
        term: 'Markdown task list',
        value: '- [x] / - [ ]',
        plain: 'The assistant writes these as Markdown; the app turns them into real checkboxes.',
      },
    ],
  },
  {
    id: 'message-actions',
    name: 'Message actions',
    htmlTag: '<div role="toolbar">',
    variant: 'Icon row',
    summary:
      'Small buttons under the answer: copy, regenerate, good or bad answer, and share. The 2/2 at the end flips between the versions Regenerate made.',
    aliases: ['action bar', 'copy button', 'regenerate', 'thumbs up and down', 'feedback buttons'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ghost buttons',
        value: '24 × 24px · no background',
        plain: 'Plain gray icons that stay quiet until you need them, so they never compete with the answer.',
      },
      {
        kind: 'behavior',
        term: 'Regenerate',
        value: '‹ 2/2 ›',
        plain: 'Asks for a new answer to the same message and keeps the old one, so you can flip back.',
      },
      {
        kind: 'behavior',
        term: 'Feedback',
        value: 'thumbs up / down',
        plain: 'One tap tells the team whether the answer helped.',
      },
    ],
  },
  {
    id: 'suggestion-chips',
    name: 'Suggestion chips',
    variant: 'Follow-ups',
    summary: 'Next steps the assistant suggests after its answer. One tap sends a chip as your next message.',
    aliases: ['follow-up suggestions', 'quick replies', 'prompt suggestions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Outlined chips',
        value: { light: 'inset 0 0 0 1px #e7e7ea', dark: 'inset 0 0 0 1px #2a2a2e' },
        plain: 'Light pills with only a thin outline, so they read as options, not as buttons you must press.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'overflow-x: auto',
        plain: 'More suggestions slide in from the side instead of wrapping onto new lines; the cut-off chip hints at them.',
      },
    ],
  },
  {
    id: 'composer',
    name: 'Composer',
    htmlTag: '<textarea>',
    variant: 'Floating pill',
    summary:
      'The message box at the bottom: attach a file with the plus, type, dictate with the mic, or start a voice chat.',
    aliases: ['message input', 'chat box', 'prompt field', 'input bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: 'Ask a follow-up',
        plain: 'A short hint in the empty box that suggests what to type next.',
      },
      {
        kind: 'appearance',
        term: 'Floating pill',
        value: 'border-radius: 21px · box-shadow: 0 8px 24px -8px',
        plain: 'It hovers above the conversation on a soft shadow, and the messages fade out behind it.',
      },
      {
        kind: 'behavior',
        term: 'Auto-grow',
        value: 'field-sizing: content',
        plain: 'The box grows with longer messages instead of hiding text behind a scrollbar.',
      },
    ],
  },
  {
    id: 'voice-button',
    name: 'Voice button',
    variant: 'Voice mode',
    summary:
      'The round button at the end of the composer starts a spoken conversation with Muse. The mic beside it only types what you say.',
    aliases: ['voice mode', 'talk button', 'the waveform button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Accent fill',
        value: { light: '#f4a812', dark: '#ffb836' },
        plain: 'The only solid color in the composer, so the way to talk with Muse is easy to spot.',
      },
      {
        kind: 'appearance',
        term: 'Waveform icon',
        value: '5 bars',
        plain: 'Sound bars mean “talk with me”; the microphone means “type what I say”.',
      },
    ],
  },
];
