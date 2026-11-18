import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Mention menu element, in the order they appear. `value` fields are the actual values from MentionMenu.
 */
export const mentionMenuSpecs: UiElementSpec[] = [
  {
    id: 'mention-menu',
    name: 'Mention menu',
    htmlTag: '<div role="listbox">',
    variant: 'People · narrowed by "ma"',
    summary:
      'The list that pops up when you type "@" in a message: the people you can mention, narrowed down with every letter. Picking one notifies them.',
    aliases: ['@ menu', 'autocomplete', 'people picker', 'typeahead', 'tag someone'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating list',
        value: '6px above the composer · as wide as it · border-radius: 8px',
        plain:
          'It floats over the conversation right above where you type, with a soft shadow, and covers what’s behind it.',
      },
      {
        kind: 'behavior',
        term: 'Typeahead filter',
        value: '"@" 9 people · "m" 4 · "ma" 2',
        plain:
          'Each letter after the @ narrows the list: first names that start with it come first, then last names. It shows three at a time.',
      },
      {
        kind: 'behavior',
        term: 'Open and close',
        value: 'fade + 4px rise · 120ms',
        plain: 'It appears the moment you type @ and closes as soon as you pick someone.',
      },
    ],
  },
  {
    id: 'mention-menu-option',
    name: 'Highlighted suggestion',
    htmlTag: '<div role="option" aria-selected="true">',
    variant: 'First match · solid blue',
    summary: 'The person Enter will pick. It starts on the first match, and the arrow keys move it up and down.',
    aliases: ['selected row', 'top suggestion', 'active option', 'the blue row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Solid highlight',
        value: { light: 'background: #1a64b0 · color: #fff', dark: 'background: #1b5c9e · color: #fff' },
        plain: 'The row fills with the chat’s blue and its text turns white, so it’s clear who Enter will pick.',
      },
      {
        kind: 'appearance',
        term: 'Two-line row',
        value: 'name 13px · 600 / role 11px',
        plain: 'Face, name and role, so you pick the right person when two names look alike.',
      },
      {
        kind: 'behavior',
        term: 'Pick with the keyboard',
        value: '↑ ↓ to move · ↵ or ⇥ to pick',
        plain: 'Your hands stay on the keys: Enter inserts the highlighted person and you keep typing.',
      },
    ],
  },
  {
    id: 'mention-menu-chip',
    name: 'Mention chip',
    htmlTag: '<span contenteditable="false">',
    variant: '@Clara Weiss · @Marcus Lee',
    summary:
      'A finished mention: the person’s name in a tinted pill inside the text. It acts as one piece, and that person gets a notification.',
    aliases: ['@mention', 'tag', 'pill', 'user token'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tinted pill',
        value: {
          light: 'background: #e6f0fa · color: #1a64b0',
          dark: 'background: rgb(75 163 227 / 0.16) · color: #74b9ee',
        },
        plain: 'The name in the chat’s blue on a pale blue ground with 4px corners: clearly a person, not just text.',
      },
      {
        kind: 'behavior',
        term: 'Atomic token',
        plain: 'One Backspace removes the whole name, and the caret can’t land in the middle of it.',
      },
      {
        kind: 'behavior',
        term: 'Insert with a space',
        value: '"@ma" → "@Marcus Lee "',
        plain:
          'Picking someone swaps what you typed for their full name plus a space, so you can keep writing. The new chip flashes a shade darker for a moment.',
      },
    ],
  },
  {
    id: 'mention-menu-query',
    name: 'Trigger character',
    htmlTag: '<span>',
    variant: '"@" + "ma"',
    summary:
      'The "@" that opens the menu and the letters typed after it, which names are matched against. Until a person is picked it’s just text.',
    aliases: ['at sign', '@ symbol', 'mention query', 'what you typed after the @'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pending style',
        value: { light: 'color: #1a64b0', dark: 'color: #4ba3e3' },
        plain: 'Blue while the menu is open: a hint that it’s about to become a mention.',
      },
      {
        kind: 'behavior',
        term: 'Trigger',
        value: '"@" at the start of a word',
        plain: 'The menu opens only when @ starts a word, so typing an email address doesn’t set it off.',
      },
    ],
  },
  {
    id: 'mention-menu-composer',
    name: 'Message composer',
    htmlTag: '<div role="textbox" contenteditable>',
    variant: 'Thread reply · with toolbar',
    summary:
      'The box where you write: the text on top, buttons to attach, format and add emoji below, and send on the right.',
    aliases: ['message box', 'reply box', 'chat input', 'text field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bordered box',
        value: {
          light: 'border: 1px solid #bdbcbe · border-radius: 8px',
          dark: 'border: 1px solid #565856 · border-radius: 8px',
        },
        plain: 'A rounded box with a thin gray border that holds the text and its toolbar together.',
      },
      {
        kind: 'appearance',
        term: 'Toolbar',
        value: '16px icons · send 28 × 24px',
        plain: 'Attach, format, emoji and mention on the left, the filled send button on the right.',
      },
      {
        kind: 'behavior',
        term: 'Auto-grow',
        value: '+19px a line',
        plain: 'It gets taller as the message wraps instead of scrolling, and the thread above makes room.',
      },
    ],
  },
];
