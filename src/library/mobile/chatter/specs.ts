import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Chatter messaging app. `value` fields are the actual values from ChatterApp.module.css. */
export const chatterSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'chat-header',
    name: 'Navigation bar',
    htmlTag: '<header>',
    variant: 'Conversation header',
    summary:
      "The bar at the top of a chat: who you're talking to, whether they're around, and quick ways to call them.",
    aliases: ['chat header', 'top bar', 'contact bar', 'the bar with their name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Title and subtitle',
        value: '15px · 600 over 11.5px',
        plain: 'The name is bold; the status line underneath is smaller and gray, so the name reads first.',
      },
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(20px)',
        plain:
          "The bar is slightly see-through and blurs whatever scrolls beneath it, like last night's message tucked under it.",
      },
      {
        kind: 'appearance',
        term: 'Hairline border',
        value: {
          light: 'border-bottom: 1px solid rgb(17 27 33 / 0.1)',
          dark: 'border-bottom: 1px solid rgb(233 237 239 / 0.08)',
        },
        plain: 'A faint line separates the bar from the conversation without boxing it in.',
      },
    ],
  },
  {
    id: 'back-button',
    name: 'Back button',
    htmlTag: '<button>',
    variant: 'With an unread count',
    summary:
      'The arrow that takes you back to your chat list. The number next to it counts the unread chats waiting there.',
    aliases: ['back arrow', 'the arrow with a number', 'unread counter', 'back to chats'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Chevron',
        value: 'stroke-width: 2.6',
        plain: 'The arrow is drawn heavier than the other icons, the way iOS does it, so it reads as the way out.',
      },
      {
        kind: 'appearance',
        term: 'Count pill',
        value: 'min-width: 20px · border-radius: 999px',
        plain: 'A pill that stays round for one digit and stretches for bigger numbers.',
      },
      {
        kind: 'appearance',
        term: 'Tint color',
        value: { light: '#0b7a75', dark: '#3cc6bd' },
        plain: "The arrow and the pill take the app's accent color, which marks them as tappable.",
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    variant: 'Initials on a gradient',
    summary:
      "A small circle that stands for the person you're chatting with: their initials on a color until they add a photo.",
    aliases: ['profile picture', 'contact photo', 'the round icon next to the name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Circle crop',
        value: 'border-radius: 50%',
        plain: 'A 50% radius turns a square into a perfect circle.',
      },
      {
        kind: 'appearance',
        term: 'Initials fallback',
        value: '“PR”',
        plain: 'Without a photo, initials keep the chat personal and easy to tell apart in the list.',
      },
      {
        kind: 'appearance',
        term: 'Gradient background',
        value: 'linear-gradient(135deg, #f97316, #c2410c)',
        plain: 'An orange gradient gives Priya her own color; the same orange marks her name when you quote her.',
      },
    ],
  },
  {
    id: 'presence-dot',
    name: 'Presence indicator',
    variant: 'Online',
    summary: 'The green dot on the avatar: Priya has the app open right now.',
    aliases: ['online dot', 'green dot', 'status dot', 'active now'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Status color',
        value: { light: '#34c759', dark: '#30d158' },
        plain: 'Green is the near-universal sign for “available”.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 2px solid #f7f8f9', dark: 'border: 2px solid #171d21' },
        plain: "A ring in the bar's color separates the dot from the avatar, so it reads as a badge sitting on top.",
      },
      {
        kind: 'behavior',
        term: 'Not color alone',
        value: '“online”',
        plain: "The word under the name says the same thing, for anyone who can't see the green.",
      },
    ],
  },
  {
    id: 'call-buttons',
    name: 'Call buttons',
    variant: 'Video and voice',
    summary: 'Two shortcuts at the top right that start a video call or a voice call with this person.',
    aliases: ['call icons', 'phone and camera icons', 'the buttons at the top right'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '34 × 34px',
        plain: 'Each icon sits in a square larger than the drawing itself, so it is easy to hit with a thumb.',
      },
      {
        kind: 'appearance',
        term: 'Outline icons',
        value: 'stroke-width: 1.8',
        plain: 'Thin line icons keep the bar light, so the name stays the focus.',
      },
    ],
  },
  {
    id: 'date-divider',
    name: 'Date divider',
    variant: 'Floating pill',
    summary: 'A small label between messages that marks where a new day begins.',
    aliases: ['date separator', 'day label', 'the “Today” bubble', 'date header'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Pill label',
        value: 'border-radius: 999px',
        plain: 'A small, centered, rounded label reads as a marker, not as a message.',
      },
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 104px',
        plain:
          "While you scroll, the label sticks just below the header, so you always know which day you're looking at.",
      },
      {
        kind: 'appearance',
        term: 'Relative date',
        value: '“Today”',
        plain: 'Recent days get words like Today or Yesterday; older ones get a date.',
      },
    ],
  },
  {
    id: 'message-bubble',
    name: 'Message bubble',
    variant: 'Sent and received, with tails',
    summary:
      'A rounded box that holds one message. Yours sit on the right in the accent tint, theirs on the left in a neutral color.',
    aliases: ['chat bubble', 'speech bubble', 'message', 'the text balloon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bubble tail',
        value: 'clip-path: polygon(0 0, 100% 0, 100% 100%)',
        plain: 'A tiny triangle at the top corner points to the sender. Only the first bubble in a row gets one.',
      },
      {
        kind: 'appearance',
        term: 'Color by sender',
        value: { light: '#d5f2ee · #fff', dark: '#0f4f49 · #1f2a30' },
        plain:
          'Your messages are tinted with the accent and theirs stay neutral, so you can tell who said what at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Grouping',
        value: 'margin-top: 2px · 8px',
        plain: 'Messages in a row from one person sit 2px apart; a new speaker starts 8px further down.',
      },
      {
        kind: 'appearance',
        term: 'Max width',
        value: 'max-width: 80%',
        plain: 'Bubbles never span the full width, which keeps lines short and leaves room to see who is speaking.',
      },
    ],
  },
  {
    id: 'timestamp',
    name: 'Timestamp',
    htmlTag: '<time>',
    variant: 'Tucked into the bubble',
    summary:
      "The time each message was sent, set small in the bubble's bottom corner so it never competes with the words.",
    aliases: ['message time', 'sent time', 'the little time in the corner'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inline float',
        value: 'float: right',
        plain:
          'The time floats at the end of the last line; when that line is full, it drops below instead of overlapping.',
      },
      {
        kind: 'appearance',
        term: 'Secondary text',
        value: { light: 'rgb(17 27 33 / 0.6)', dark: 'rgb(233 237 239 / 0.6)' },
        plain: 'Small (10.5px) and semi-transparent, so it suits both bubble colors and stays out of the way.',
      },
      {
        kind: 'behavior',
        term: 'datetime attribute',
        value: 'datetime="09:02"',
        plain:
          'A machine-readable time behind the friendly “9:02 AM”, so it can be read out, sorted or converted reliably.',
      },
    ],
  },
  {
    id: 'read-receipt',
    name: 'Read receipt',
    variant: 'Double check · Read',
    summary: 'The two small checks next to the time on your messages. Blue means Priya has read it.',
    aliases: ['blue ticks', 'double check', 'seen indicator', 'delivery status'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Read color',
        value: { light: '#0a84ff', dark: '#53bdeb' },
        plain: 'The checks turn blue once the message is read; until then they stay gray.',
      },
      {
        kind: 'behavior',
        term: 'Delivery states',
        value: '✓ sent · ✓✓ delivered · blue ✓✓ read',
        plain: 'One check means sent, two mean delivered, blue means read: the status at a glance, without a word.',
      },
    ],
  },
  {
    id: 'reply-quote',
    name: 'Quoted reply',
    variant: 'Inside a bubble',
    summary:
      "A preview of the message you're answering, shown at the top of your reply so the context travels with it.",
    aliases: ['reply preview', 'quote', 'the message inside a message', 'swipe to reply'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Accent bar',
        value: { light: 'border-left: 3px solid #ea580c', dark: 'border-left: 3px solid #fb923c' },
        plain: 'A colored stripe on the left marks the quote; its orange matches the person who wrote it.',
      },
      {
        kind: 'appearance',
        term: 'Single-line truncation',
        value: 'text-overflow: ellipsis',
        plain: 'Long quotes are cut to one line with “…”, so your answer stays the main thing.',
      },
      {
        kind: 'appearance',
        term: 'Inset background',
        value: { light: 'rgb(17 27 33 / 0.06)', dark: 'rgb(0 0 0 / 0.22)' },
        plain: 'A slightly darker panel sets the quote apart from your own words.',
      },
    ],
  },
  {
    id: 'reaction-chip',
    name: 'Reaction',
    variant: 'Emoji chip on a bubble',
    summary: 'A small emoji pinned to the edge of a message: a quick way to answer without writing anything.',
    aliases: ['emoji reaction', 'tapback', 'thumbs up on a message', 'the little emoji under a message'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Overlapping position',
        value: 'position: absolute; bottom: -16px',
        plain:
          "It hangs off the bubble's bottom-left edge, away from the time, so it's clearly attached without covering anything.",
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 2px solid #e8edf0', dark: 'border: 2px solid #0c1317' },
        plain: 'A ring in the wallpaper color lifts the chip off the bubble behind it.',
      },
      {
        kind: 'appearance',
        term: 'Room to hang',
        value: 'margin-bottom: 14px',
        plain: "The bubble leaves space underneath so the chip doesn't bump into the next message.",
      },
    ],
  },
  {
    id: 'voice-message',
    name: 'Voice message',
    variant: 'Audio player with waveform',
    summary: 'A recorded clip shown as a play button and a waveform, with its length underneath.',
    aliases: ['voice note', 'audio message', 'the sound wave', 'voice memo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Waveform',
        value: '26 bars · 3px wide',
        plain: 'Bar heights trace how loud each moment is, so you can see pauses and emphasis before you listen.',
      },
      {
        kind: 'appearance',
        term: 'Playback progress',
        value: '10 of 26 bars',
        plain:
          'Bars already played take the accent color and a dot marks the spot, so the waveform doubles as a progress bar.',
      },
      {
        kind: 'appearance',
        term: 'Play button',
        value: '32 × 32px',
        plain: 'A big round target for the one action that matters, in the accent color.',
      },
      {
        kind: 'appearance',
        term: 'Duration',
        value: '0:14',
        plain: "The clip's length, so you know what you're in for before you press play.",
      },
    ],
  },
  {
    id: 'typing-indicator',
    name: 'Typing indicator',
    variant: 'Three dots in a bubble',
    summary: 'A bubble with three pulsing dots that says Priya is writing a reply right now.',
    aliases: ['is typing…', 'typing bubble', 'the three dots', 'loading dots'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Keyframe animation',
        value: '@keyframes typing · 1.2s',
        plain: 'Each dot rises and brightens on a loop.',
      },
      {
        kind: 'behavior',
        term: 'Staggered delay',
        value: 'animation-delay: 0 / 160 / 320ms',
        plain: 'The dots start one after another, which creates the little wave.',
      },
      {
        kind: 'behavior',
        term: 'Reduced motion',
        value: 'animation: none',
        plain: 'If someone has asked their phone for less motion, the dots hold still.',
      },
    ],
  },
  {
    id: 'composer',
    name: 'Composer',
    htmlTag: '<textarea>',
    variant: 'Attach · text field · camera · mic',
    summary:
      'The bar at the bottom for writing a message, with shortcuts to attach a file, take a photo or record a voice message.',
    aliases: ['message box', 'input bar', 'chat input', 'the typing area'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: '“Message”',
        plain: 'A one-word hint in gray that disappears as soon as you start typing.',
      },
      {
        kind: 'appearance',
        term: 'Pill field',
        value: 'height: 34px · border-radius: 17px',
        plain: 'A radius of half the height gives the field fully rounded ends.',
      },
      {
        kind: 'behavior',
        term: 'Empty-field actions',
        value: 'camera + mic',
        plain:
          'While nothing is typed, the bar offers a photo and a voice message; these apps swap them for a send button once you type.',
      },
      {
        kind: 'behavior',
        term: 'Safe area',
        value: 'padding: 8px 10px 37px',
        plain: 'The deep bottom padding keeps the field clear of the home indicator, where a swipe up leaves the app.',
      },
    ],
  },
  homeIndicator,
];
