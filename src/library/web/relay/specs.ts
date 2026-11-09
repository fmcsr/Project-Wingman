import type { UiElementSpec } from '../../../catalog';

/** Elements in the Relay team chat. `value` fields are the actual values from RelaySite.module.css and the markup. */
export const relaySpecs: UiElementSpec[] = [
  {
    id: 'quick-switcher',
    name: 'Search bar',
    htmlTag: '<div role="search">',
    variant: 'Top bar · History arrows · ⌘K',
    summary:
      'The field in the middle of the top bar that searches the whole workspace: messages, files, channels and people. The arrows and the clock beside it go back, forward and through recent conversations.',
    aliases: ['search box', 'the search at the top', 'jump to', 'command bar'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Quick switcher',
        value: 'aria-keyshortcuts="Meta+K"',
        plain:
          'Command + K opens the same box as a quick switcher: type a few letters of a channel or a name and press Enter to jump straight there.',
      },
      {
        kind: 'appearance',
        term: 'Translucent field',
        value: 'background: rgb(255 255 255 / 0.18) · height: 26px',
        plain: 'A lighter tint of the top bar rather than a white box, so it belongs to the frame until you click it.',
      },
      {
        kind: 'appearance',
        term: 'Scoped placeholder',
        value: '“Search Larkspur”',
        plain: "The hint names the workspace, so you know the search covers everything in it, not just this channel.",
      },
    ],
  },
  {
    id: 'workspace-rail',
    name: 'Workspace rail',
    htmlTag: '<nav>',
    variant: 'Workspace logo · Labeled icons · Your avatar',
    summary:
      "The narrow strip on the far left: the workspace's logo on top, then Home, DMs, Activity, Saved and More, with a create button and your own photo at the bottom. The sidebar next to it changes with what you pick here.",
    aliases: ['app bar', 'the icons on the far left', 'side navigation', 'team switcher'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Navigation rail',
        value: 'width: 64px · 36 × 36px icons · 11px labels',
        plain: 'A column of icons with a short label under each, so nobody has to guess what an icon means.',
      },
      {
        kind: 'appearance',
        term: 'Active item',
        value: 'background: rgb(255 255 255 / 0.22)',
        plain: 'Home, where you are now, gets a lighter rounded tile behind its icon.',
      },
      {
        kind: 'appearance',
        term: 'App frame',
        value: { light: 'background: #0f2e26', dark: 'background: #0a1b17' },
        plain:
          "The rail and the top bar share Relay's darkest pine, so they frame the workspace like a window; the panels inside it have rounded corners.",
      },
    ],
  },
  {
    id: 'unread-badge',
    name: 'Unread badge',
    variant: 'Mention count · Rail · Sidebar',
    summary:
      "The small number that says something is waiting for you: how many times you were mentioned or messaged. Channels with new messages that don't mention you only turn bold.",
    aliases: ['notification count', 'the little number next to a channel', 'counter', 'red badge'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Count pill',
        value: { light: 'background: #c2501c · border-radius: 9px', dark: 'background: #c5531f · border-radius: 9px' },
        plain: "A filled pill in Relay's ember with a white number. It grows sideways to fit bigger numbers.",
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'box-shadow: 0 0 0 2px #0f2e26', dark: 'box-shadow: 0 0 0 2px #0a1b17' },
        plain: 'On the rail, a ring in the frame color separates the badge from the icon it sits on.',
      },
      {
        kind: 'behavior',
        term: 'Counts mentions only',
        value: 'design-crit · 2',
        plain:
          'Only mentions and direct messages get a number; everything else just turns bold. That keeps the numbers worth checking.',
      },
    ],
  },
  {
    id: 'presence-dot',
    name: 'Presence indicator',
    variant: 'Active · Away',
    summary: "The small dot on an avatar's corner that says whether someone is around right now.",
    aliases: ['status dot', 'green dot', 'online indicator', 'availability'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled or hollow',
        value: { light: 'background: #2f9e68', dark: 'background: #3cb878' },
        plain:
          'Active is a solid green dot and away a hollow ring. The shapes differ too, so color never carries the meaning alone.',
      },
      {
        kind: 'appearance',
        term: 'Cut-out ring',
        value: { light: 'border: 2px solid #183f34', dark: 'border: 2px solid #11291f' },
        plain: 'A ring in the sidebar color separates the dot from the photo, so it reads as a badge sitting on top.',
      },
      {
        kind: 'behavior',
        term: 'aria-label',
        value: 'aria-label="Away"',
        plain: 'Each dot has a text name, so screen readers say the status instead of skipping a colored dot.',
      },
    ],
  },
  {
    id: 'workspace-menu',
    name: 'Workspace menu',
    htmlTag: '<button>',
    variant: 'Name · Chevron · Filter · New message',
    summary:
      "The workspace's name at the top of the sidebar. It opens a menu for settings, invitations and preferences; the buttons beside it filter the sidebar and start a new message.",
    aliases: ['the company name at the top', 'workspace switcher', 'team menu', 'compose button'],
    concepts: [
      {
        kind: 'behavior',
        term: 'aria-haspopup',
        value: 'aria-haspopup="menu"',
        plain: 'Tells screen readers that the name opens a menu, just as the chevron tells everyone else.',
      },
      {
        kind: 'appearance',
        term: 'Compose button',
        value: '30 × 30px · background: rgb(255 255 255 / 0.12)',
        plain:
          'The pencil-on-paper button gets a soft tile of its own, because starting a message is the most common thing to do from here.',
      },
      {
        kind: 'appearance',
        term: 'Heavy title',
        value: 'font-size: 18px · font-weight: 800',
        plain: 'The name is the boldest text in the sidebar, so you always know which workspace you are in.',
      },
    ],
  },
  {
    id: 'channel-list',
    name: 'Channel list',
    htmlTag: '<ul>',
    variant: 'Channels · Direct messages',
    summary:
      "The sidebar sections with your channels and direct messages; each folds open or shut with its triangle. A # marks a channel and a lock a private one, and each row's style says where to look.",
    aliases: ['sidebar', 'conversation list', 'the channels on the left', 'DM list'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Current channel',
        value: { light: 'background: #e3f0ea · color: #123329', dark: 'background: #2d6956 · color: #ffffff' },
        plain: '#product-launch, the channel that is open, is a light pill on the dark sidebar.',
      },
      {
        kind: 'appearance',
        term: 'Unread in bold',
        value: 'font-weight: 700 · color: #ffffff',
        plain: 'Channels and conversations with new messages switch to bold, full white, like an unread email.',
      },
      {
        kind: 'appearance',
        term: 'Muted channel',
        value: 'color: rgb(255 255 255 / 0.46)',
        plain: '#random is muted: its name is dimmed and it never turns bold, however busy it gets.',
      },
    ],
  },
  {
    id: 'channel-header',
    name: 'Channel header',
    htmlTag: '<header>',
    variant: 'Name · Members · Call · Tabs',
    summary:
      "The pinned bar above the conversation: the channel's name, who's in it, a button to start a call, and tabs for its messages, files and pins. On phones, a back button on the left leads to the channel list.",
    aliases: ['title bar', 'the channel name at the top', 'conversation header', 'tab bar', 'huddle button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Avatar stack with a count',
        value: 'margin-left: -4px · 18',
        plain: 'Three faces overlap and the number says how many people are in the channel; clicking it lists them all.',
      },
      {
        kind: 'behavior',
        term: 'Split button',
        value: 'Call · ⌄',
        plain:
          'Call starts a quick audio call that anyone in the channel can drop into; the chevron beside it opens options, such as starting with video.',
      },
      {
        kind: 'appearance',
        term: 'Tabs',
        value: { light: 'border-bottom: 2px solid #1f5c4b', dark: 'border-bottom: 2px solid #6cc4a3' },
        plain: "Messages, Files and Pins show different sides of the same channel; a pine underline marks the one you're on.",
      },
    ],
  },
  {
    id: 'date-divider',
    name: 'Date divider',
    variant: 'Sticky pill · Jump menu',
    summary: 'A label on a thin rule that marks where a day begins. It stays at the top while you scroll through that day.',
    aliases: ['date separator', 'day label', 'the “Today” pill'],
    concepts: [
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: calc(var(--bar-h) + var(--head-h) + 8px)',
        plain: "While you scroll, the pill sticks just under the header, so you always know which day you're reading.",
      },
      {
        kind: 'behavior',
        term: 'Jump menu',
        value: 'aria-haspopup="menu"',
        plain: 'The chevron hints that it opens a menu to jump to yesterday, last week or the very first message.',
      },
      {
        kind: 'appearance',
        term: 'Relative date',
        value: '“Today”',
        plain: 'Recent days get words like Today or Yesterday; older ones get a full date.',
      },
    ],
  },
  {
    id: 'message',
    name: 'Message',
    htmlTag: '<article>',
    variant: 'Grouped by author',
    summary:
      'One post in the conversation: a photo, a bold name, a gray time and the text. Messages someone sends in a row are grouped, so only the first shows the photo, the name and the time.',
    aliases: ['chat message', 'post', 'the message row'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rounded-square avatar',
        value: '36 × 36px · border-radius: 6px',
        plain: 'Profile photos are squares with soft corners rather than circles, lined up in a column on the left.',
      },
      {
        kind: 'behavior',
        term: 'Time on hover',
        value: 'visibility: hidden → visible',
        plain: "A follow-up's time shows in the empty gutter only while it's hovered, like 10:05 on Mateo's second message.",
      },
      {
        kind: 'appearance',
        term: 'Inline code',
        value: { light: 'color: #b0461a', dark: 'color: #f2875a' },
        plain:
          "Text typed between backticks turns into a monospace chip, so exact names like a branch can't be mistaken for words.",
      },
    ],
  },
  {
    id: 'reactions',
    name: 'Reactions',
    variant: 'Emoji pills with counts',
    summary: 'Emoji people added to a message, each with a count. Click one to add yours, click it again to take it back.',
    aliases: ['emoji reactions', 'the little emoji under a message', 'likes', 'react'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Your reaction',
        value: {
          light: 'box-shadow: inset 0 0 0 1px #1d9bd1 · background: #e8f4fa',
          dark: 'box-shadow: inset 0 0 0 1px #1d9bd1 · background: #1d2e3a',
        },
        plain: "👍 is outlined in blue because you're one of the four; the others stay plain gray.",
      },
      {
        kind: 'behavior',
        term: 'aria-pressed',
        value: 'aria-pressed="true"',
        plain: 'Each pill works like a toggle button, and screen readers hear whether yours is in.',
      },
      {
        kind: 'appearance',
        term: 'Pill shape',
        value: 'height: 24px · border-radius: 12px',
        plain:
          'Fully rounded ends make an emoji and its count read as one small button. The last pill, a smiley with a +, opens the emoji picker.',
      },
    ],
  },
  {
    id: 'link-preview',
    name: 'Link preview',
    variant: 'Unfurled link · Large image',
    summary:
      "When someone posts a link, the app fetches the page's site name, title, description and image and shows them under the message, so people know what's behind it before they click.",
    aliases: ['unfurl', 'link card', 'embed', 'rich preview', 'the card under a link'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Open Graph tags',
        value: 'og:site_name · og:title · og:description · og:image',
        plain: 'Each line comes from a tag the linked page puts in its code for exactly this purpose.',
      },
      {
        kind: 'appearance',
        term: 'Attachment bar',
        value: { light: 'width: 4px · background: #cfcfcf', dark: 'width: 4px · background: #4f5256' },
        plain:
          "A gray bar on the left, rather than a box around it, shows that this belongs to the message without being written by its author.",
      },
      {
        kind: 'appearance',
        term: 'Image size',
        value: 'max-width: 360px · aspect-ratio: 9 / 5',
        plain: 'The picture keeps one shape and a readable size on wide screens, and shrinks with the column on narrow ones.',
      },
    ],
  },
  {
    id: 'hover-toolbar',
    name: 'Hover toolbar',
    htmlTag: '<div role="toolbar">',
    variant: 'Quick reactions · React · Reply · More',
    summary:
      "The small bar of actions that appears over a message's corner when the pointer rests on it, shown here on Mateo's second message.",
    aliases: ['message actions', 'hover menu', 'the buttons that pop up on a message', 'action bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating position',
        value: 'position: absolute · top: -16px',
        plain: "It floats over the message's top-right corner, so showing it doesn't push any text around.",
      },
      {
        kind: 'appearance',
        term: 'Quick reactions',
        value: '✅ 👀 🙌',
        plain: 'Your most used emoji come first, one click away; React opens the full picker and Reply starts a thread.',
      },
      {
        kind: 'behavior',
        term: 'Pointer only',
        value: '@container (width < 640px)',
        plain:
          'Narrower windows keep only the icons, and phones get no bar at all, since nothing hovers on touch: a long press opens the same actions.',
      },
    ],
  },
  {
    id: 'thread-summary',
    name: 'Thread summary',
    variant: 'Avatars · Reply count · Last reply',
    summary:
      'The line under a message that has replies: who joined in, how many replies there are and when the last one came. Clicking it opens the thread on the right.',
    aliases: ['replies link', '4 replies', 'thread link', 'view thread'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Participant avatars',
        value: '24 × 24px · gap: 4px',
        plain: 'Small faces of the people in the thread, side by side, so you can tell at a glance who is talking.',
      },
      {
        kind: 'appearance',
        term: 'Link-colored count',
        value: { light: 'color: #1264a3', dark: 'color: #1d9bd1' },
        plain: '“4 replies” is bold and blue like a link, because it is the part you click.',
      },
      {
        kind: 'behavior',
        term: 'Relative time',
        value: '“Last reply 5 minutes ago”',
        plain: 'Says in words how fresh the thread is. When the column gets narrow it steps aside and the count stays.',
      },
    ],
  },
  {
    id: 'unread-divider',
    name: 'New messages divider',
    htmlTag: '<div role="separator">',
    variant: 'Line with a “New” label',
    summary:
      'A colored line that marks where you stopped reading. Everything below it arrived since you last opened the channel.',
    aliases: ['new line', 'unread marker', 'the red line', 'last read'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Accent rule',
        value: { light: 'background: #c2501c', dark: 'background: #c5531f' },
        plain: 'A full-width ember line with “New” at its right end is hard to miss while scrolling.',
      },
      {
        kind: 'behavior',
        term: 'Last read position',
        value: 'after 10:31 AM',
        plain:
          "The app remembers the last message you saw and draws the line right after it; once you've caught up, it goes away.",
      },
    ],
  },
  {
    id: 'mention',
    name: 'Mention',
    variant: 'Someone else · You',
    summary:
      'An @ and a name notifies that person. A mention of you is highlighted in yellow, so it stands out from mentions of anyone else.',
    aliases: ['@mention', 'tag', 'at-mention', 'ping'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Mention chip',
        value: { light: 'background: #e8f4fa · color: #1264a3', dark: 'background: #1d2e3a · color: #1d9bd1' },
        plain: '@Mateo Reyes is blue on a pale blue chip, so names stand out from the text around them.',
      },
      {
        kind: 'appearance',
        term: 'Mention of you',
        value: { light: 'background: #fbe6a6', dark: 'background: #594a1c' },
        plain: '@Theo Lambert is you, so the chip turns yellow, like a highlighter over your name.',
      },
      {
        kind: 'behavior',
        term: 'Notifies',
        value: 'unread badge + 1',
        plain: "A mention adds to that person's badge and can send a notification, even in a channel they muted.",
      },
    ],
  },
  {
    id: 'composer',
    name: 'Composer',
    htmlTag: '<div role="textbox">',
    variant: 'Formatting bar · Attach · Emoji · Mention · Send',
    summary:
      'The box at the bottom for writing a message. The bar above the text formats it; the buttons below attach a file, add an emoji, mention someone or record a clip.',
    aliases: ['message box', 'text field', 'chat input', 'the typing area', 'rich text editor'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: '“Message #product-launch”',
        plain: 'Gray hint text says where the message will go and disappears as soon as you start typing.',
      },
      {
        kind: 'appearance',
        term: 'Formatting toolbar',
        value: { light: 'background: #f8f8f8', dark: 'background: #222529' },
        plain:
          'Bold, italic, strikethrough, link, lists, quote and code. The buttons stay dim until there is text to format, and Aa hides the bar.',
      },
      {
        kind: 'behavior',
        term: 'Split send button',
        value: 'aria-disabled="true"',
        plain: "Send stays gray until there's something to send; the chevron beside it schedules the message for later.",
      },
    ],
  },
  {
    id: 'typing-indicator',
    name: 'Typing indicator',
    variant: 'Name under the composer',
    summary: 'A line under the composer that says someone is writing in this channel right now.',
    aliases: ['is typing…', 'typing status', 'someone is writing'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Live region',
        value: 'aria-live="polite"',
        plain:
          'It appears while someone types and goes a few seconds after they stop; screen readers announce it without interrupting.',
      },
      {
        kind: 'appearance',
        term: 'Who is typing',
        value: '“Amara Okafor is typing…”',
        plain:
          'The name is in bold. With more people it becomes “Amara and Mateo are typing…”, then “Several people are typing…”.',
      },
    ],
  },
  {
    id: 'thread-panel',
    name: 'Thread panel',
    htmlTag: '<aside>',
    variant: 'Side panel · Reply box',
    summary:
      'A side conversation about one message, opened next to the channel so the channel itself stays readable. The original message sits on top, then the replies and a box to answer.',
    aliases: ['thread', 'replies panel', 'side conversation', 'the panel on the right'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Also send to channel',
        value: 'role="checkbox" · aria-checked="false"',
        plain: 'Ticking “Also send to #product-launch” posts your reply in the channel too, for news everyone should see.',
      },
      {
        kind: 'appearance',
        term: 'Reply divider',
        value: '“4 replies”',
        plain: 'A labeled rule separates the message that started the thread from the conversation about it.',
      },
      {
        kind: 'behavior',
        term: 'Hidden when narrow',
        value: '@container (width < 1000px)',
        plain:
          "Below 1000px there's no room for two conversations side by side, so the thread closes; on phones it opens as its own screen.",
      },
    ],
  },
];
