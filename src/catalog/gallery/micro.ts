import type { UiElementSpec } from '../types';

/**
 * Elements in the gallery's micro-interaction tiles: one-time code field, slide to confirm, toast stack and skeleton
 * screen. `value` fields are the tiles' actual values (src/landing/gallery/).
 */
export const microGallery: UiElementSpec[] = [
  // One-time code field (OneTimeCode.tsx)
  {
    id: 'one-time-code',
    name: 'One-time code field',
    htmlTag: '<input autocomplete="one-time-code">',
    variant: '6 digits · fills itself from the text message',
    summary:
      'Six boxes for the code a site texts you when you sign in. Each box takes one digit, and the code sends itself as soon as the last one is in.',
    aliases: ['OTP input', 'verification code boxes', 'PIN input', '2FA code field', 'the six little boxes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Segmented input',
        value: '6 slots · gap: 6px',
        plain:
          'One real input, drawn as six separate boxes. Typing, pasting and deleting work as in any text field; the boxes only show where each digit lands.',
      },
      {
        kind: 'behavior',
        term: 'autocomplete="one-time-code"',
        value: 'inputmode="numeric"',
        plain:
          'Tells the phone this is a texted code, so it offers the code above the keyboard and one tap fills all six boxes. The number pad opens instead of the full keyboard.',
      },
      {
        kind: 'behavior',
        term: 'Auto-advance',
        value: 'next empty slot',
        plain:
          'Each digit moves the caret to the next box and Backspace moves it back, so nobody has to tap from box to box.',
      },
      {
        kind: 'behavior',
        term: 'Auto-submit',
        value: 'on the 6th digit · verifying 1.1s',
        plain:
          'There is no Verify button: the last digit sends the code. The digits dim while it’s checked, then the boxes turn green and it says Verified.',
      },
    ],
  },
  {
    id: 'one-time-code-slot',
    name: 'Slot',
    htmlTag: '<div>',
    variant: 'Filled · one digit',
    summary:
      'One box per digit, so you can see at a glance how much of the code is in and check it against the message.',
    aliases: ['digit box', 'the boxes', 'cell', 'character box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Slot',
        value: 'border: 1px · border-radius: 8px',
        plain:
          'A box with a thin gray border and rounded corners, a little taller than wide. The corners grow to 10px where the boxes have room.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums · 600',
        plain: 'Every digit is drawn the same width, so a 1 sits as centered in its box as an 8.',
      },
      {
        kind: 'behavior',
        term: 'Success state',
        value: { light: 'border-color: #16a34a · 45ms apart', dark: 'border-color: #22c55e · 45ms apart' },
        plain:
          'When the code checks out, the borders turn green one after another, left to right, like a wave of approval.',
      },
    ],
  },
  {
    id: 'one-time-code-active-slot',
    name: 'Active slot',
    htmlTag: '<div data-active>',
    variant: 'Focus ring + caret',
    summary:
      'The box the next digit goes into. It looks focused: a blue border, a soft ring around it and a blinking caret.',
    aliases: ['focused box', 'current box', 'the blue box', 'cursor position'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Focus ring',
        value: {
          light: 'border-color: #2563eb · box-shadow: 0 0 0 3px rgb(37 99 235 / 0.18)',
          dark: 'border-color: #3b82f6 · box-shadow: 0 0 0 3px rgb(59 130 246 / 0.3)',
        },
        plain: 'A pale halo of the accent color around the box, outside its border. It marks where typing will go.',
      },
      {
        kind: 'appearance',
        term: 'Fake caret',
        value: 'width: 2px · height: 42%',
        plain: 'The real input is invisible, so the caret is drawn: a thin bar in the middle of the empty box.',
      },
      {
        kind: 'behavior',
        term: 'Caret blink',
        value: 'steps(1) · 1.1s',
        plain: 'The caret blinks on and off like a text cursor, so the field reads as waiting for you.',
      },
    ],
  },
  {
    id: 'one-time-code-resend',
    name: 'Resend timer',
    htmlTag: '<button disabled>',
    variant: 'Countdown · 0:24',
    summary:
      'Says when you can ask for a new code. Until the countdown runs out the link stays off, so an impatient tap doesn’t send a flood of texts.',
    aliases: ['resend link', 'countdown', 'cooldown timer', 'didn’t get a code?'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Cooldown',
        value: 'ticks every 1s',
        plain: 'A short wait between codes. When it reaches 0:00, the line turns into a Resend code link.',
      },
      {
        kind: 'appearance',
        term: 'tabular-nums',
        value: 'font-variant-numeric: tabular-nums',
        plain: 'Equal-width digits, so the time doesn’t wiggle as it counts down.',
      },
    ],
  },
  {
    id: 'one-time-code-destination',
    name: 'Masked phone number',
    htmlTag: '<span>',
    variant: 'Last four digits',
    summary:
      'Shows where the code went without printing the whole number: enough to recognize your phone, too little for anyone looking over your shoulder.',
    aliases: ['hidden number', 'partial phone number', 'obfuscated number', 'the dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Masking',
        value: '•••• 4821',
        plain: 'Dots stand in for every digit but the last four.',
      },
      {
        kind: 'appearance',
        term: 'Emphasis',
        value: 'font-weight: 500 · full ink',
        plain: 'The number is darker than the words around it, so the eye lands on what you need to check.',
      },
    ],
  },
  // Slide to confirm (SlideToConfirm.tsx)
  {
    id: 'slide-to-confirm',
    name: 'Slide to confirm',
    htmlTag: '<div role="slider">',
    variant: 'Send money · iOS',
    summary:
      'A button you drag instead of tap: the thumb has to travel the whole track before the money goes. It guards actions you can’t take back, where a stray tap would cost something.',
    aliases: ['swipe to pay', 'slide to unlock', 'swipe button', 'drag to confirm', 'the slider at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill track',
        value: 'height: 56px · border-radius: 28px',
        plain: 'A fully rounded track as tall as a big button, with the thumb inset 4px on every side.',
      },
      {
        kind: 'behavior',
        term: 'Completion threshold',
        value: '100% of the track',
        plain:
          'Only reaching the end confirms. Let go before that and the thumb springs back to the start, so a half-hearted swipe sends nothing.',
      },
      {
        kind: 'behavior',
        term: 'Success state',
        value: { light: 'background: #34c759 · check · Sent', dark: 'background: #30d158 · check · Sent' },
        plain:
          'At the end the whole track turns green, the arrow becomes a check and the label says Sent. Done, no doubt about it.',
      },
    ],
  },
  {
    id: 'slide-to-confirm-thumb',
    name: 'Thumb',
    htmlTag: '<span>',
    variant: 'Round · arrow',
    summary: 'The round handle you drag. Its arrow points the way it has to go.',
    aliases: ['knob', 'handle', 'slider button', 'the blue circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Thumb',
        value: { light: '48px circle · background: #007aff', dark: '48px circle · background: #0a84ff' },
        plain: 'A circle in the accent color with a white arrow, lifted off the track by a soft shadow.',
      },
      {
        kind: 'behavior',
        term: 'Drag',
        value: 'cubic-bezier(0.55, 0, 0.3, 1) · 900ms',
        plain:
          'In the loop a finger drags it: it starts slowly, keeps pace and slows into the end, like a real thumb would.',
      },
      {
        kind: 'behavior',
        term: 'Icon swap',
        value: 'arrow → check · 350ms with overshoot',
        plain: 'When the money goes, the thumb turns white and the arrow gives way to a check that pops in.',
      },
    ],
  },
  {
    id: 'slide-to-confirm-label',
    name: 'Shimmer label',
    htmlTag: '<span>',
    variant: 'Slide to send',
    summary:
      'The instruction inside the track. A band of light keeps sweeping across it in the direction to slide, the trick the iPhone’s slide to unlock made famous.',
    aliases: ['slide to unlock text', 'shiny text', 'hint text', 'the moving shine'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient · 300% wide',
        plain:
          'The letters are filled with a gradient instead of a color: gray with one narrow band of full contrast. Only the letters show it.',
      },
      {
        kind: 'behavior',
        term: 'Shimmer',
        value: 'background-position · 2.4s linear infinite',
        plain: 'The gradient slides across the letters: the band crosses in 1.5 seconds, rests, and comes again.',
      },
      {
        kind: 'behavior',
        term: 'Fade ahead of the thumb',
        value: 'mask-image · 32px soft edge · drifts at 0.4×',
        plain:
          'As the thumb comes, the label dims and drifts right more slowly than the thumb, and the letters right in front of it fade out.',
      },
    ],
  },
  {
    id: 'slide-to-confirm-fill',
    name: 'Fill',
    htmlTag: '<span>',
    variant: 'Tinted · follows the thumb',
    summary: 'The part of the track the thumb has covered, tinted with the accent color, so you see how far is left.',
    aliases: ['progress', 'trail', 'the colored part', 'track fill'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tint',
        value: {
          light: 'color-mix(in oklab, #007aff 18%, #efeff4)',
          dark: 'color-mix(in oklab, #0a84ff 30%, #2c2c2e)',
        },
        plain: 'A pale mix of the accent into the track’s gray, so the thumb stays the strongest color.',
      },
      {
        kind: 'appearance',
        term: 'Rounded end',
        value: 'border-radius: 28px',
        plain: 'Its end is as round as the track, so it hugs the thumb with the same 4px margin the track has.',
      },
      {
        kind: 'behavior',
        term: 'One progress value',
        value: '--slide-to-confirm: 0 → 1',
        plain:
          'The thumb, the fill and the label all follow one number from 0 to 1, so they move as one and never drift apart.',
      },
    ],
  },
  // Toast stack (ToastStack.tsx)
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
  // Skeleton screen (SkeletonScreen.tsx)
  {
    id: 'skeleton-screen',
    name: 'Skeleton screen',
    htmlTag: '<ul aria-busy="true">',
    variant: 'Activity feed · loads row by row',
    summary:
      'Gray shapes in the layout of the content on its way, shown instead of a spinner. You see what’s coming and where, and nothing jumps when it arrives.',
    aliases: [
      'skeleton loader',
      'loading placeholder',
      'ghost content',
      'content placeholder',
      'the gray boxes while it loads',
    ],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder fill',
        value: { light: 'background: #ececee', dark: 'background: #1f1f22' },
        plain:
          'One flat gray for every shape, a step off the page, so it reads as “not here yet” rather than as content.',
      },
      {
        kind: 'behavior',
        term: 'Shimmer',
        value: 'linear-gradient band · 1.5s linear infinite',
        plain:
          'A soft band of light sweeps left to right over all the shapes at once, the sign that something is still loading.',
      },
      {
        kind: 'behavior',
        term: 'Progressive loading',
        value: 'rows 550–700ms apart',
        plain: 'Rows don’t wait for each other: each swaps in as soon as its data is there, top to bottom.',
      },
      {
        kind: 'behavior',
        term: 'aria-busy',
        value: 'aria-busy="true"',
        plain: 'Tells screen readers the list is still loading, so they don’t read out empty shapes.',
      },
    ],
  },
  {
    id: 'skeleton-screen-avatar',
    name: 'Avatar placeholder',
    htmlTag: '<span>',
    variant: 'Circle · 36px',
    summary: 'A gray circle exactly where the profile picture will be.',
    aliases: ['circle placeholder', 'avatar skeleton', 'gray circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Same size as the photo',
        value: '36 × 36px · border-radius: 50%',
        plain: 'It matches the avatar to the pixel, so the photo drops into its place without moving anything.',
      },
      {
        kind: 'appearance',
        term: 'Shape hints',
        plain:
          'A circle for a person, a rounded square for a picture, bars for text: you can tell what’s coming before it’s there.',
      },
    ],
  },
  {
    id: 'skeleton-screen-line',
    name: 'Text placeholder',
    htmlTag: '<span>',
    variant: 'Bar · 9px',
    summary: 'A rounded bar standing in for a line of text: a short one for the name, a longer one for what they did.',
    aliases: ['text skeleton', 'gray line', 'placeholder line', 'loading bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bar',
        value: 'height: 9px · fully rounded',
        plain:
          'Thinner than the text it replaces and centered on the same 18px line, so the text lands right where the bar was.',
      },
      {
        kind: 'appearance',
        term: 'Varied widths',
        value: '84–124px',
        plain:
          'Every bar has its own length, about that of the text it stands for, so the list doesn’t look like a barcode and the text lands where its bar was.',
      },
    ],
  },
  {
    id: 'skeleton-screen-image',
    name: 'Image placeholder',
    htmlTag: '<span>',
    variant: 'Rounded square · 40px',
    summary: 'A gray rounded square where the photo goes.',
    aliases: ['image skeleton', 'thumbnail placeholder', 'gray box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Same frame as the image',
        value: '40 × 40px · border-radius: 6px',
        plain: 'Sized and rounded like the thumbnail, so the picture fills it exactly.',
      },
      {
        kind: 'appearance',
        term: 'clip-path',
        value: 'inset(0 round 6px)',
        plain:
          'Each shape is cut out of one band of light that spans the whole list, so the shimmer passes over every shape at the same moment.',
      },
    ],
  },
  {
    id: 'skeleton-screen-item',
    name: 'Loaded row',
    htmlTag: '<li>',
    variant: 'Avatar · name · photo',
    summary:
      'A row whose content has arrived. It took over from its placeholder in the same spot, and nothing around it moved.',
    aliases: ['list item', 'loaded content', 'activity row', 'the real row'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Crossfade',
        value: 'opacity · 300ms',
        plain:
          'The placeholder fades out while the content fades in, in the same place, so the swap feels smooth instead of a pop.',
      },
      {
        kind: 'behavior',
        term: 'No layout shift',
        value: 'same cell, same sizes',
        plain: 'Placeholder and content share one spot at the same sizes, so nothing below jumps when a row loads.',
      },
    ],
  },
];
