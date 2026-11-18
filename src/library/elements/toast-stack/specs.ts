import type { UiElementSpec } from '../../../catalog';

/** Parts of the Toast stack element, in the order they appear. `value` fields are the actual values from ToastStack. */
export const toastStackSpecs: UiElementSpec[] = [
  {
    id: 'toast-stack',
    name: 'Toast stack',
    htmlTag: '<section aria-label="Notifications">',
    variant: 'Bottom right · three at a time',
    summary:
      'The corner where toasts appear. New ones come in at the front and push the older ones back into a tidy pile, so a burst of messages never covers the page.',
    aliases: ['toaster', 'notification stack', 'snackbar stack', 'the messages in the corner'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Stacked toasts',
        value: 'translateY(-14px) scale(0.95) · translateY(-28px) scale(0.9)',
        plain:
          'Each older toast sits 14px higher and 5% smaller behind the one in front, with its text hidden: you see there are more without having to read them.',
      },
      {
        kind: 'behavior',
        term: 'Visible limit',
        value: '3 toasts',
        plain: 'Only three stay on screen. When a fourth comes in, the oldest fades out at the back as it slides up.',
      },
      {
        kind: 'behavior',
        term: 'Expand on hover',
        value: '14px apart · 400ms',
        plain:
          'Point at the stack and it spreads into a list, every toast at full size, so you can read or undo an older one. Move away and it folds back.',
      },
      {
        kind: 'behavior',
        term: 'Enter animation',
        value: 'translateY(100%) → 0 · 500ms cubic-bezier(0.2, 1.25, 0.4, 1)',
        plain: 'A new toast rises from the bottom edge with a little spring while the others step back.',
      },
    ],
  },
  {
    id: 'toast-stack-toast',
    name: 'Toast',
    htmlTag: '<li role="status">',
    variant: 'Icon · title · description',
    summary:
      'A short message about something that just happened, like a file archived or a link copied. It shows up without interrupting and goes away on its own.',
    aliases: ['snackbar', 'notification', 'flash message', 'popup message', 'the little message at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Card',
        value: {
          light: 'background: #fff · border: 1px solid #ededed · border-radius: 8px',
          dark: 'background: #171717 · border: 1px solid #2e2e2e · border-radius: 8px',
        },
        plain:
          'A small card with a hairline border and rounded corners, the same height for every toast so they stack neatly.',
      },
      {
        kind: 'appearance',
        term: 'box-shadow',
        value: { light: '0 4px 12px rgb(0 0 0 / 0.1)', dark: '0 4px 12px rgb(0 0 0 / 0.45)' },
        plain: 'A soft shadow lifts it off the page, so it reads as floating above the app rather than part of it.',
      },
      {
        kind: 'behavior',
        term: 'Loading → success',
        value: 'spinner → check, in place',
        plain:
          'A toast can follow work in progress: Uploading 3 files with a spinner turns into 3 files uploaded with a green check, without a second toast.',
      },
      {
        kind: 'behavior',
        term: 'Auto-dismiss',
        plain:
          'Each toast leaves on its own after a few seconds. The timer pauses while you point at the stack, so it doesn’t vanish mid-read.',
      },
    ],
  },
  {
    id: 'toast-stack-action',
    name: 'Action button',
    htmlTag: '<button>',
    variant: 'Undo',
    summary: 'One quick follow-up inside the toast, most often Undo, so a slip is one click from fixed.',
    aliases: ['undo button', 'toast action', 'inline action'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Compact button',
        value: 'height: 24px · border-radius: 4px · 12px · 500',
        plain:
          'A small button in the text color with the card’s color for its label, so it stands out without being big.',
      },
      {
        kind: 'behavior',
        term: 'Undo instead of confirm',
        plain:
          'Rather than asking “Are you sure?” before archiving, the app archives at once and offers to take it back. Clicking it also closes the toast.',
      },
    ],
  },
  {
    id: 'toast-stack-close',
    name: 'Close button',
    htmlTag: '<button aria-label="Close">',
    variant: 'Corner ×',
    summary: 'Dismisses the toast before it goes on its own.',
    aliases: ['x', 'dismiss button', 'close icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Corner badge',
        value: '20px circle · translate(-35%, -35%)',
        plain:
          'A small round button on the top-left corner with a third of it hanging off the card, so it doesn’t take room from the message.',
      },
      {
        kind: 'behavior',
        term: 'Hidden behind the front',
        value: 'opacity: 0 while collapsed',
        plain: 'Toasts in the back of the pile hide their buttons too; they come back when the stack spreads out.',
      },
    ],
  },
];
