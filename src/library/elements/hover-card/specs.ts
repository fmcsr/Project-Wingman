import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Hover card element, in the order they appear. `value` fields are the actual values from HoverCard.
 */
export const hoverCardSpecs: UiElementSpec[] = [
  {
    id: 'hover-card-trigger',
    name: 'Trigger',
    htmlTag: '<a href="/leila">',
    variant: '@leila · a mention',
    summary:
      'The name the card belongs to: here a mention in a comment. Resting the pointer on it opens the card; clicking it goes to the full profile.',
    aliases: ['mention', '@name', 'user link', 'the blue name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Mention link',
        value: { light: '600 · #0a64d6', dark: '600 · #4a96f8' },
        plain: 'Bold and in the link blue, so it reads as a person you can point at, not just a word.',
      },
      {
        kind: 'behavior',
        term: 'Hover underline',
        value: 'text-underline-offset: 2px · 120ms',
        plain: 'An underline appears under the pointer: the sign that something will happen here.',
      },
      {
        kind: 'behavior',
        term: 'Focus opens it too',
        value: ':focus-visible',
        plain:
          'Tabbing onto the mention opens the same card, so people on a keyboard get the preview as well; Esc closes it.',
      },
    ],
  },
  {
    id: 'hover-card',
    name: 'Hover card',
    htmlTag: '<div role="dialog">',
    variant: 'Profile preview · opens under the mention',
    summary:
      'A small card that opens when the pointer rests on a name: who the person is, at a glance, and a button to follow them, without leaving the page.',
    aliases: ['profile preview', 'popover', 'hover preview', 'person card', 'the little profile that pops up'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Open delay',
        value: '500ms, then fade + scale from 0.96 in 150ms',
        plain:
          'It waits for half a second of rest before opening, so passing over names on the way somewhere else doesn’t set off cards. Then it grows in quickly from the arrow.',
      },
      {
        kind: 'behavior',
        term: 'Grace period',
        value: '300ms close delay',
        plain:
          'The pointer can travel from the name into the card without it closing. It fades only after the pointer has been away from both for a moment.',
      },
      {
        kind: 'appearance',
        term: 'Popover surface',
        value: {
          light: 'border: 1px #d1d9e0 · radius 12px · shadow 0 8px 24px',
          dark: 'border: 1px #3d444d · radius 12px · shadow 0 8px 24px',
        },
        plain: 'A card with a thin border and a soft shadow, lifted above the conversation it belongs to.',
      },
      {
        kind: 'appearance',
        term: 'Arrow',
        value: '10px · on the mention’s middle',
        plain: 'A small point on the card’s top edge aims at the name it opened from.',
      },
    ],
  },
  {
    id: 'hover-card-avatar',
    name: 'Avatar',
    htmlTag: '<img>',
    variant: '36px · round',
    summary: 'The person’s photo, top left of the card: most people recognize a face before they read a name.',
    aliases: ['profile picture', 'profile photo', 'user image', 'pfp'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Circular crop',
        value: 'width: 36px · border-radius: 50%',
        plain: 'A round crop of the photo, the shape people expect for a person.',
      },
      {
        kind: 'appearance',
        term: 'object-fit: cover',
        value: 'cover',
        plain: 'The photo fills the circle without being squashed; its edges get trimmed instead.',
      },
      {
        kind: 'behavior',
        term: 'Fallback',
        value: 'initials on a tinted circle',
        plain: 'Without a photo, the initials stand in, so the card never shows a broken image.',
      },
    ],
  },
  {
    id: 'hover-card-action',
    name: 'Follow button',
    htmlTag: '<button aria-pressed="false">',
    variant: 'Follow · turns to Following',
    summary:
      'The one thing to do from the card: follow the person right there, without opening their profile.',
    aliases: ['action button', 'call to action', 'follow toggle', 'the black button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill button',
        value: {
          light: 'background: #0f1419 · color: #ffffff · height: 30px · border-radius: 999px',
          dark: 'background: #eff3f4 · color: #0f1419 · height: 30px · border-radius: 999px',
        },
        plain: 'A solid pill in the text color: the strongest thing on the card, so it’s clear what it’s for.',
      },
      {
        kind: 'behavior',
        term: 'Toggle button',
        value: 'Follow → Following · Followers +1',
        plain:
          'One click turns it into an outlined Following and adds one to the follower count right away, before the server has answered.',
      },
      {
        kind: 'behavior',
        term: 'Hover and press',
        value: { light: 'hover #30353a · pressed #4a5056', dark: 'hover #d7dbdc · pressed #c2c6c8' },
        plain: 'A shade lighter under the pointer and lighter still as it’s pressed, so the click is felt.',
      },
    ],
  },
];
