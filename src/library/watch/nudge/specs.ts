import type { UiElementSpec } from '../../../catalog';

/** Elements of the Nudge notification, in the order they appear. `value` fields are the actual values from NudgeApp. */
export const nudgeSpecs: UiElementSpec[] = [
  {
    id: 'short-look',
    name: 'Short Look',
    variant: 'Icon, app name and title',
    summary:
      "The first glance at a notification: as you raise your wrist, the app's icon fills the screen with its name and a one-line title under it, here who the message is from.",
    aliases: ['notification preview', 'incoming alert', 'the big icon when a message comes in', 'glance'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Haptic tap',
        plain:
          'The watch taps your wrist as the notification arrives, so you feel it without hearing a sound. Raise your wrist and the Short Look is already waiting.',
      },
      {
        kind: 'appearance',
        term: 'Big icon',
        value: '104px circle · centered',
        plain: "The app's round icon takes up half the screen, so you know which app it is before reading a word.",
      },
      {
        kind: 'appearance',
        term: 'One-line title',
        value: '18px · 600 · text-overflow: ellipsis',
        plain:
          "Only the sender's name, cut with \"…\" if it's long. The message waits for the Long Look, so a glance across the table doesn't give it away.",
      },
      {
        kind: 'behavior',
        term: 'Wrist down',
        plain:
          'Lower your wrist during the Short Look and it goes away; the notification waits, unread, in Notification Center. Keep your wrist up and it opens into the Long Look.',
      },
    ],
  },
  {
    id: 'long-look',
    name: 'Long Look',
    variant: 'Message with actions',
    summary:
      'The whole notification, shown when your wrist stays up: the app in the header, the message, and buttons to act on it without opening the app.',
    aliases: ['expanded notification', 'full notification', 'notification details', 'rich notification'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Short Look to Long Look',
        value: '520ms · cubic-bezier(0.32, 0.72, 0, 1)',
        plain:
          'A moment after the Short Look, if your wrist is still raised (or you tap), the icon moves up into the header and the content slides in from below.',
      },
      {
        kind: 'appearance',
        term: 'Black background',
        value: '#000',
        plain:
          "Black is the display switched off: only the text and the buttons light up, and the screen's edges disappear into the watch.",
      },
      {
        kind: 'behavior',
        term: 'Custom content',
        plain:
          'Apps can design the middle of their Long Look, such as a chat app showing the message with its photo or a delivery app a map. The header and the buttons stay the same for every app.',
      },
    ],
  },
  {
    id: 'app-icon',
    name: 'App icon',
    htmlTag: '<img>',
    variant: 'Round · from the Short Look into the header',
    summary:
      "Nudge's icon, a coral circle with a speech bubble. It arrives big in the Short Look, then shrinks into the Long Look's header.",
    aliases: ['app logo', 'notification icon', 'the round icon', 'app badge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Circular icon',
        value: '104px · border-radius: 50% · #ff6b45',
        plain:
          "Every app icon on Apple Watch is a circle: a plain white symbol on the app's own color, simple enough to read when it's small.",
      },
      {
        kind: 'behavior',
        term: 'Shared element transition',
        value: 'translate(-72px, -76px) scale(0.2308)',
        plain:
          'The icon travels from the middle into the header instead of fading out and in again: one element, shrunk to 24 pixels, so your eye follows it.',
      },
      {
        kind: 'behavior',
        term: 'Spring',
        value: '600ms · cubic-bezier(0.34, 1.4, 0.64, 1)',
        plain:
          'The icon lands with the tap on the wrist and overshoots a touch before it settles, like something set down.',
      },
    ],
  },
  {
    id: 'header',
    name: 'Notification header',
    variant: "App name in the app's color · time",
    summary:
      "The top line of the Long Look: the app's icon and name, and the time. It stays put while the crown scrolls the message under it.",
    aliases: ['sash', 'app name bar', 'title bar', 'top of the notification'],
    concepts: [
      {
        kind: 'appearance',
        term: "App's color",
        value: '15px · 600 · #ff6b45',
        plain:
          "The app's name is set in its own color, so you can tell which app is talking even when its icon is small.",
      },
      {
        kind: 'behavior',
        term: 'Pinned header',
        value: 'background: #000 · 14px fade',
        plain: 'Scrolled content slides under the header and fades out at its edge; the app and the time stay in view.',
      },
      {
        kind: 'appearance',
        term: 'Inside the curve',
        value: '20px from the edge',
        plain:
          "Both ends are set in from the screen's rounded corners, so the curve never cuts into the icon or the time.",
      },
    ],
  },
  {
    id: 'message',
    name: 'Message',
    variant: 'Sender and text on a platter',
    summary:
      'What the notification says: who sent it, in bold, and the message itself, together on a rounded gray platter.',
    aliases: ['notification text', 'message preview', 'body', 'content'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Platter',
        value: 'rgb(255 255 255 / 0.11) · border-radius: 20px',
        plain: 'A rounded panel a little lighter than the black around it holds the sender and the text as one card.',
      },
      {
        kind: 'appearance',
        term: 'Title and body',
        value: '16px · 600 over 16px · 400',
        plain: 'The same size for both; only the weight sets the name apart from the message.',
      },
      {
        kind: 'behavior',
        term: 'Full text',
        plain:
          'The Long Look shows the whole message, however long; a long one scrolls with the Digital Crown, with the buttons after it.',
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    htmlTag: '<img>',
    variant: 'Contact photo · round',
    summary: "The sender's photo beside her name: the message reads as coming from a person, not from an app.",
    aliases: ['profile picture', 'contact photo', 'sender photo', 'headshot'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Circle crop',
        value: '30px · border-radius: 50% · object-fit: cover',
        plain:
          'Any photo is cut to a circle and filled edge to edge, so faces line up the same way in every notification.',
      },
      {
        kind: 'behavior',
        term: 'Communication notification',
        plain:
          "A messaging app can tell the watch who a notification is from. The watch then shows that person's photo, and Focus settings can let them through when other apps are kept quiet.",
      },
    ],
  },
  {
    id: 'action-button',
    name: 'Action button',
    htmlTag: '<button>',
    variant: 'Reply · Mark as Read',
    summary:
      'Full-width buttons under the message that act on it from the notification itself: answer it, or mark it read without opening the app.',
    aliases: ['notification actions', 'quick actions', 'reply button', 'the buttons under the message'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Full-width capsule',
        value: 'height: 40px · border-radius: 20px',
        plain: 'Each button spans the screen and is fully rounded at the ends: an easy target for a fingertip.',
      },
      {
        kind: 'appearance',
        term: 'Liquid Glass',
        value: 'rgb(255 255 255 / 0.15) · inset 0 0.5px 0 rgb(255 255 255 / 0.3)',
        plain:
          'watchOS 26 draws buttons as a translucent material with a hairline of light along the top edge, like glass.',
      },
      {
        kind: 'behavior',
        term: 'App-defined actions',
        plain:
          'The app picks the actions for each kind of notification, up to four. Reply opens dictation, Scribble, the keyboard or suggested answers.',
      },
    ],
  },
  {
    id: 'dismiss',
    name: 'Dismiss button',
    htmlTag: '<button>',
    variant: 'Always last',
    summary:
      'The last button of every Long Look. It puts the notification away without acting on it; the message stays in the app and in Notification Center.',
    aliases: ['close', 'clear', 'cancel', 'dismiss notification'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Same shape, last place',
        value: 'height: 40px · after the actions',
        plain: 'It looks like the actions above it; being at the very end is what sets it apart.',
      },
      {
        kind: 'behavior',
        term: 'System button',
        plain: 'The watch adds Dismiss to every notification on its own, so there is always the same way out.',
      },
      {
        kind: 'behavior',
        term: 'Back to the face',
        plain: 'Lowering your wrist does the same: the notification slides away and the watch face comes back.',
      },
    ],
  },
  {
    id: 'scroll-indicator',
    name: 'Digital Crown scroll indicator',
    variant: 'Track and thumb by the crown',
    summary:
      'The thin bar by the Digital Crown that shows while you turn it: there is more to scroll, and the white part says where you are.',
    aliases: ['scroll bar', 'scrollbar', 'crown indicator', 'position indicator'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and thumb',
        value: '4 × 36px · 16px thumb',
        plain:
          'A dim track for the whole length and a white thumb for the part on screen, right next to the crown that moves it.',
      },
      {
        kind: 'behavior',
        term: 'Turn the Digital Crown',
        value: '650ms · cubic-bezier(0.3, 1.25, 0.5, 1)',
        plain:
          'Turning the crown scrolls the content, which settles a hair past its mark and springs back. The crown ticks under your finger as it turns.',
      },
      {
        kind: 'behavior',
        term: 'Fades when idle',
        value: 'opacity: 0 · 400ms',
        plain: "When the crown stops, the indicator fades out, so it doesn't sit on top of the content.",
      },
    ],
  },
];
