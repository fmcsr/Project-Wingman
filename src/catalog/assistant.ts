import type { UiElementSpec } from './types';

/** Elements in the Muse AI assistant. `value` fields are the actual values from MuseApp.module.css. */
export const assistant: UiElementSpec[] = [
  {
    id: 'liquid-glass-navbar',
    name: 'Liquid Glass navbar',
    variant: 'Floating capsule',
    summary:
      'A floating, rounded bar made of “glass”: it blurs and bends the colors behind it, so the content stays visible while the controls float on top.',
    aliases: ['glass bar', 'floating navbar', 'the see-through top bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(18px) saturate(180%)',
        plain: "Blurs what's behind it and boosts the colors, so the glass picks up the tones of the content beneath.",
      },
      {
        kind: 'appearance',
        term: 'Specular highlight',
        value: 'inset 0 1px 0 rgb(255 255 255 / 0.35)',
        plain: 'A thin bright line along the top edge, like light catching the rim of real glass.',
      },
      {
        kind: 'appearance',
        term: 'Capsule shape',
        value: 'border-radius: 22px',
        plain: 'A radius of half the height gives fully rounded ends that feel touchable.',
      },
      {
        kind: 'behavior',
        term: 'Floating',
        value: 'inset-inline: 12px',
        plain: 'It hovers over the content with space on every side instead of sticking to the screen edges.',
      },
    ],
  },
  {
    id: 'menu-button',
    name: 'Menu button',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Model picker',
    summary: 'A button that opens a list of options. The small chevron hints that something will drop down.',
    aliases: ['dropdown button', 'picker', 'the little arrow button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron',
        value: 'rotate(180deg) when open',
        plain: 'The arrow flips while the menu is open, so you can see the state at a glance.',
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
    variant: 'Animated',
    summary:
      'A small panel of choices that appears right under the button that opened it, and disappears once you pick one.',
    aliases: ['dropdown', 'popover menu', 'the list that pops down'],
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
        value: 'scale(0.92) → 1 · 220ms',
        plain: 'A quick scale-and-fade makes it pop in and out smoothly instead of blinking.',
      },
      {
        kind: 'appearance',
        term: 'Selected item',
        value: 'checkmark',
        plain: "A check marks the current choice, so you know what's active before you change it.",
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
    id: 'chat-bubble',
    name: 'Chat bubble',
    variant: 'Sent and received',
    summary: 'A rounded box that holds one message. Its side and color show who said it.',
    aliases: ['message', 'speech bubble', 'the text balloon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Asymmetric corners',
        value: 'border-radius: 18px 18px 4px 18px',
        plain: 'One sharper corner points toward the speaker, like the tail of a speech bubble.',
      },
      {
        kind: 'appearance',
        term: 'Max width',
        value: 'max-width: 78%',
        plain: 'Bubbles never span the full width, which keeps lines short and easy to read.',
      },
    ],
  },
  {
    id: 'typing-indicator',
    name: 'Typing indicator',
    variant: 'Three dots',
    summary: 'Three bouncing dots that say “an answer is on its way”.',
    aliases: ['loading dots', 'is typing…'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Keyframe animation',
        value: '@keyframes bounce',
        plain: 'Each dot rises and falls on a loop.',
      },
      {
        kind: 'behavior',
        term: 'Staggered delay',
        value: 'animation-delay: 0 / 150 / 300ms',
        plain: 'The dots start one after another, which creates the little wave.',
      },
    ],
  },
  {
    id: 'suggestion-chips',
    name: 'Suggestion chips',
    variant: 'Quick prompts',
    summary: 'Tappable shortcuts with ready-made prompts, so you can start without typing.',
    aliases: ['quick replies', 'prompt suggestions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Glass chips',
        value: 'rgb(255 255 255 / 0.14)',
        plain: 'Light, see-through chips that match the glass navbar.',
      },
      {
        kind: 'behavior',
        term: 'Horizontal scroll',
        value: 'overflow-x: auto',
        plain: 'Extra suggestions slide in from the side instead of wrapping onto new lines.',
      },
    ],
  },
  {
    id: 'composer',
    name: 'Composer',
    htmlTag: '<textarea>',
    variant: 'Floating glass input',
    summary: 'The message box at the bottom where you type to the assistant, or tap the orb to talk.',
    aliases: ['message input', 'chat box', 'prompt field'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: 'Ask Muse anything…',
        plain: 'A hint that sets expectations about what you can ask.',
      },
      {
        kind: 'behavior',
        term: 'Auto-grow',
        value: 'field-sizing: content',
        plain: 'The box grows with longer messages instead of hiding text behind a scrollbar.',
      },
      {
        kind: 'behavior',
        term: 'Safe area',
        value: 'env(safe-area-inset-bottom)',
        plain: "It stays above the home indicator, so the phone's swipe gesture doesn't collide with it.",
      },
    ],
  },
  {
    id: 'voice-button',
    name: 'Voice button',
    variant: 'Animated orb',
    summary: 'A glowing round button that starts voice input. The soft pulse invites you to talk.',
    aliases: ['mic button', 'talk button', 'the glowing circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'conic-gradient',
        value: '(#a78bfa, #60a5fa, #f472b6, #a78bfa)',
        plain: 'Colors sweep around the center like a color wheel, which gives the orb its shimmer.',
      },
      {
        kind: 'behavior',
        term: 'Pulse animation',
        value: 'scale 1 → 1.35, fade out',
        plain: "A ring keeps growing and fading around the button to signal it's ready to listen.",
      },
    ],
  },
];
