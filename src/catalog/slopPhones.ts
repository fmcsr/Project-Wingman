import { homeIndicator, statusBar } from './shared';
import type { UiElementSpec } from './types';

/*
 * Elements of the AI slop phone apps on the landing page (src/demos/slop/WaveSlop.tsx, MuseSlop.tsx and
 * StrideSlop.tsx). They use the same element names as the Wingman versions where the element is the same, so people
 * can compare the two; their concepts say what makes each one read as AI slop. `value` fields are the actual values
 * from the slop CSS.
 */

/** Wave, the habit tracker, in on-screen order. */
export const waveSlopSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'gradient-header',
    name: 'Header',
    htmlTag: '<header>',
    variant: 'AI slop · Gradient with decorative circles',
    summary:
      'The colored block at the top, behind the greeting and the progress card. An indigo-to-pink gradient with see-through circles is a common default of AI tools, and it stays the same in dark mode.',
    aliases: ['hero', 'banner', 'top section', 'the purple header'],
    concepts: [
      {
        kind: 'appearance',
        term: 'linear-gradient()',
        value: '140deg · #6366f1 → #a855f7 → #ec4899',
        plain:
          'Indigo to purple to pink, the gradient AI tools reach for most. It has nothing to do with habits; the Wingman version keeps the page plain and saves color for the habits.',
      },
      {
        kind: 'appearance',
        term: 'Decorative circles',
        value: 'rgb(255 255 255 / 0.12) · 176px and 150px',
        plain:
          'Two big see-through circles hang off the edges to fill the gradient. They decorate without meaning anything.',
      },
      {
        kind: 'appearance',
        term: 'Colored shadow',
        value: '0 18px 36px -18px rgb(168 85 247 / 0.85)',
        plain:
          'A purple glow under the header. Shadows usually show depth in a neutral gray; a colored one is decoration.',
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    variant: 'AI slop · Gradient initial + online dot',
    summary:
      'A circle that stands for you, with your initial on a yellow-to-pink gradient. The green dot means “online” in chat apps; in a habit tracker it has nothing to report.',
    aliases: ['profile picture', 'user icon', 'the round photo'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: 'linear-gradient(135deg, #fbbf24, #f472b6)',
        plain:
          'Yellow to pink behind the letter, with a white ring and a purple shadow. The Wingman avatar is a plain gray circle with initials.',
      },
      {
        kind: 'appearance',
        term: 'Status dot',
        value: '12px · #22c55e',
        plain: 'A green dot in the corner, borrowed from chat apps where it shows who is online. Here it is always on.',
      },
    ],
  },
  {
    id: 'large-title',
    name: 'Large title',
    htmlTag: '<h1>',
    variant: 'AI slop · Greeting with emoji',
    summary:
      'The biggest text at the top: “Let’s crush it! 💪” under “Good morning, Alex! ☀️”. A pep talk takes the place of the screen’s name and the date.',
    aliases: ['page title', 'header', 'greeting', 'welcome message'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Extra-bold type',
        value: '21px · font-weight: 800',
        plain: 'Most text on this screen is 700 or 800, so weight no longer shows what matters most.',
      },
      {
        kind: 'appearance',
        term: 'Emoji in copy',
        value: '☀️ 💪',
        plain:
          'An emoji at the end of each line adds cheer but no information, a habit of AI-written copy. The Wingman title just says Today, with the date above it.',
      },
    ],
  },
  {
    id: 'today-summary',
    name: 'Summary card',
    variant: 'AI slop · Glass card on a gradient',
    summary:
      'A frosted card that sums up the day with a ring, a count and the streak. It is labeled AI though it only counts, and its 3 of 4 disagrees with the three habits listed below.',
    aliases: ['overview card', 'hero card', 'daily summary', 'progress card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(12px)',
        plain: 'A see-through white card blurs the gradient behind it, the glass look AI tools add by default.',
      },
      {
        kind: 'appearance',
        term: 'AI label',
        value: '✨ AI Daily Progress',
        plain: 'A sparkle and the word AI on what is a plain count. The Wingman card says what is left to do instead.',
      },
      {
        kind: 'behavior',
        term: 'Derived numbers',
        value: '3 of 4 · 75%',
        plain:
          'A summary should be calculated from the list it sums up. These are fixed placeholder numbers: the card says 3 of 4 done, while the list shows three habits with two checked.',
      },
    ],
  },
  {
    id: 'progress-ring',
    name: 'Progress ring',
    variant: 'AI slop · One ring, a percentage',
    summary:
      'A white ring filled to 75%, with the number in the middle. One percentage hides which habits are done; the Wingman ring gives each habit its own segment.',
    aliases: ['activity ring', 'donut chart', 'circular progress', 'the white circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'conic-gradient()',
        value: '#fff 0 75%, rgb(255 255 255 / 0.25) 0',
        plain:
          'Paints a pie that is solid white for three quarters of the way around and faint after that. A radial mask cuts out the middle to make it a ring.',
      },
      {
        kind: 'appearance',
        term: 'Percentage label',
        value: '75% · 14px · 800',
        plain:
          'A percentage reads like a score and doesn’t say how much is left. A count such as 4 of 6, as on the Wingman ring, does.',
      },
    ],
  },
  {
    id: 'streak-count',
    name: 'Streak count',
    variant: 'AI slop · Emoji pill',
    summary:
      'A see-through pill that says “🔥 7 day streak!”. The first stat card right below shows the same 7 days again, so the screen says it twice.',
    aliases: ['streak', 'fire icon', 'days in a row', 'flame counter'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji icon',
        value: '🔥',
        plain:
          'The fire emoji looks different from one phone to another and can’t take the app’s colors. The Wingman version draws its own flame in orange.',
      },
      {
        kind: 'appearance',
        term: 'Translucent pill',
        value: 'rgb(255 255 255 / 0.25) · border-radius: 999px',
        plain: 'A faint white capsule on the gradient, in the same glass style as the card around it.',
      },
    ],
  },
  {
    id: 'stat-card',
    name: 'Stat card',
    variant: 'AI slop · Emoji + gradient number',
    summary:
      'Three tiles with an emoji, a number and a label: streak, completed and success. Without a time frame, 24 completed and 85% success are hard to act on.',
    aliases: ['KPI card', 'metric', 'number box', 'stat tile'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient(90deg, #6366f1, #ec4899)',
        plain:
          'Fills each number with an indigo-to-pink gradient, one of the most common AI-default touches. Gradient text is harder to read than a solid color.',
      },
      {
        kind: 'appearance',
        term: 'Emoji icon',
        value: '🔥 ✅ 🎯',
        plain:
          'An emoji per tile stands in for an icon. Each brings its own colors and style, so the three tiles don’t look like a set.',
      },
      {
        kind: 'behavior',
        term: 'Vanity metrics',
        value: 'no period, no comparison',
        plain:
          'Numbers that look good but answer nothing: 24 since when, 85% of what? The Wingman screen leaves them out and shows what is left today.',
      },
    ],
  },
  {
    id: 'list-section-header',
    name: 'Section header',
    variant: 'AI slop · Sparkle title + gradient link',
    summary:
      'The heading over the habit cards, “Today’s Habits ✨”, with a “See all →” link in gradient text. Both decorate a label whose job is to stay quiet.',
    aliases: ['group title', 'list heading', 'subheader', 'see all link'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sparkle emoji',
        value: '✨',
        plain:
          'The sparkle has become shorthand for AI or magic and gets added to headings by default. Wingman uses a small all-caps label with a count.',
      },
      {
        kind: 'appearance',
        term: 'Gradient link',
        value: 'linear-gradient(90deg, #6366f1, #ec4899)',
        plain:
          'See all is filled with the same gradient as the stat numbers, so it looks like one more highlight rather than a link.',
      },
      {
        kind: 'appearance',
        term: 'Heavy heading',
        value: '15.5px · 800',
        plain: 'An extra-bold heading competes with the habit names right below it.',
      },
    ],
  },
  {
    id: 'list-row',
    name: 'List row',
    htmlTag: '<li>',
    variant: 'AI slop · A floating card per habit',
    summary:
      'One habit per row: an emoji tile, the name, a detail line, a progress bar and a check. Every row is its own card with a shadow, so the list reads as a stack of separate cards.',
    aliases: ['cell', 'list item', 'row', 'habit card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Card per row',
        value: 'border-radius: 20px · gap: 7px',
        plain:
          'Each row gets its own rounded card and shadow. Wingman groups the rows on one card with hairlines between them, which reads as one list.',
      },
      {
        kind: 'appearance',
        term: 'Progress bar',
        value: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
        plain:
          'A gradient bar under every habit, even where it only repeats the check: full for Meditate, empty for Read.',
      },
    ],
  },
  {
    id: 'habit-icon',
    name: 'Icon badge',
    variant: 'AI slop · Emoji on a pastel gradient',
    summary:
      'An emoji on a soft gradient tile marks each habit: 💧, 🧘 and 📚. Emoji look different from one phone to another and can’t follow the app’s colors.',
    aliases: ['habit icon', 'emoji', 'symbol', 'the little picture'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji icon',
        value: '19px · 💧 🧘 📚',
        plain:
          'Quick to generate, but each platform draws them in its own style. Wingman draws line icons in the style of the tab bar.',
      },
      {
        kind: 'appearance',
        term: 'Pastel gradient',
        value: { light: '#dbeafe → #cffafe', dark: 'rgb(59 130 246 / 0.32) → rgb(6 182 212 / 0.22)' },
        plain:
          'Each tile blends two pale colors, blue to cyan for water. Wingman tints each icon with a single color mixed into the card.',
      },
    ],
  },
  {
    id: 'habit-check',
    name: 'Check button',
    htmlTag: '<button>',
    variant: 'AI slop · Gradient check with glow',
    summary:
      'The round button at the end of each row. It is either empty or done, so Drink Water shows done at 6 of 8 glasses; the Wingman check shows a partial arc for that.',
    aliases: ['checkbox', 'checkmark', 'done button', 'tick'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        plain:
          'Done fills the circle with the purple-to-pink gradient that also colors the header, the numbers, the bars and the plus.',
      },
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: '0 6px 14px -4px rgb(236 72 153 / 0.75)',
        plain: 'A pink glow around each done check makes finished habits the loudest things in the list.',
      },
      {
        kind: 'behavior',
        term: 'Two states only',
        value: 'empty · done',
        plain: 'A habit counted in steps has no in-between: water at 6 of 8 glasses is already marked done.',
      },
    ],
  },
  {
    id: 'tab-bar',
    name: 'Tab bar',
    htmlTag: '<nav>',
    variant: 'AI slop · Floating, emoji icons',
    summary:
      'The four main sections, Home, Stats, Goals and Profile, in a floating frosted bar split by a big plus button. The icons are emoji, and the selected one glows purple.',
    aliases: ['bottom nav', 'bottom menu', 'tabs'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji icons',
        value: '🏠 📊 🏆 👤',
        plain:
          'Four emoji in four styles and colors stand in for icons, so the bar looks busy. Wingman uses one set of line icons.',
      },
      {
        kind: 'appearance',
        term: 'drop-shadow() glow',
        value: 'drop-shadow(0 0 6px rgb(168 85 247 / 0.8))',
        plain: 'The selected tab’s emoji glows purple. Wingman puts a soft gray pill behind the section you are in.',
      },
    ],
  },
  {
    id: 'fab',
    name: 'Floating action button',
    variant: 'AI slop · Raised in the tab bar, glowing',
    summary:
      'A big gradient plus button that rises out of the middle of the tab bar to add a habit. It takes a tab’s place and is the loudest thing on the screen.',
    aliases: ['plus button', 'the round + button', 'add button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
        plain:
          'The header’s indigo-to-pink gradient again. Wingman draws its plus in ink on glass, so the button stays calm next to the colorful habits.',
      },
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: '0 12px 26px -6px rgb(236 72 153 / 0.8)',
        plain: 'A strong pink glow spreads under the button.',
      },
      {
        kind: 'appearance',
        term: 'Raised center button',
        value: 'top: -20px · 4px ring in the page color',
        plain:
          'It sticks up 20px above the bar inside a ring of page color, as if cut into it. Wingman’s sits beside the tab bar.',
      },
    ],
  },
  homeIndicator,
];

/** Muse, the AI chat app, in on-screen order. */
export const museSlopSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'navbar',
    name: 'Navbar',
    htmlTag: '<header>',
    variant: 'AI slop · Frosted glass capsule',
    summary:
      'The bar at the top: a menu button, the assistant’s orb and name with an “Online” dot, and a PRO badge, all in one glass capsule. Wingman floats separate glass buttons over the conversation.',
    aliases: ['top bar', 'header', 'title bar', 'the bar at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'backdrop-filter',
        value: 'blur(18px) saturate(160%)',
        plain:
          'Blurs the purple blobs behind a see-through capsule with a bright rim, the glassmorphism look AI tools add by default.',
      },
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient(90deg, #fff, #c4b5fd, #f9a8d4)',
        plain: 'The name Muse AI fades from white to lilac to pink: gradient text on a bar that is already colorful.',
      },
      {
        kind: 'behavior',
        term: 'Online status',
        value: '6px #4ade80 dot · glow',
        plain:
          'Borrowed from chat with people. An assistant is always available, so “Online” never changes and tells you nothing.',
      },
    ],
  },
  {
    id: 'icon-button',
    name: 'Icon button',
    variant: 'AI slop · Menu in a glass circle',
    summary:
      'A button that shows only an icon, here the three-line menu. Its see-through circle sits inside the see-through bar: glass on glass.',
    aliases: ['menu button', 'hamburger menu', 'icon', 'toolbar button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Glass on glass',
        value: 'rgb(255 255 255 / 0.1) inside the bar',
        plain: 'A translucent circle in a translucent bar adds a layer without making the button any easier to see.',
      },
      {
        kind: 'appearance',
        term: 'Heavy icon stroke',
        value: '18px · stroke-width: 2.2',
        plain:
          'Three equal lines in a thick stroke. Wingman’s menu icon has two lines of different lengths in a thinner 1.7 stroke.',
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    variant: 'AI slop · Glowing gradient orb',
    summary:
      'A glowing orb with a sparkle stands for the assistant, in the bar and before every message. Orbs and ✨ have become the generic sign for AI, so it could belong to any app.',
    aliases: ['bot avatar', 'AI icon', 'orb', 'the glowing ball'],
    concepts: [
      {
        kind: 'appearance',
        term: 'conic-gradient()',
        value: 'from 200deg, #a78bfa, #60a5fa, #f472b6, #a78bfa',
        plain: 'Lilac, blue and pink swirl around the center, the palette of many AI products.',
      },
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: '0 0 16px rgb(167 139 250 / 0.75)',
        plain: 'A lilac glow with no offset makes the orb look lit from within; the one in the bar glows even more.',
      },
      {
        kind: 'appearance',
        term: 'Sparkle emoji',
        value: '✨',
        plain:
          'The most common stand-in for AI. Wingman starts each answer with its own small brand mark instead of an avatar.',
      },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    variant: 'AI slop · PRO upsell pill',
    summary:
      'A glowing “PRO ✨” pill in the top bar. It advertises a paid plan on the chat screen, in the spot where Wingman puts New chat.',
    aliases: ['pill', 'tag', 'plan badge', 'the PRO label'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient pill',
        value: 'linear-gradient(90deg, #fde68a, #f9a8d4)',
        plain: 'Butter yellow to pink: the brightest thing in the bar, brighter than the assistant’s name.',
      },
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: '0 0 14px rgb(249 168 212 / 0.6)',
        plain: 'A pink halo around the pill draws the eye to the upsell first.',
      },
    ],
  },
  {
    id: 'chat-bubble',
    name: 'Chat bubble',
    variant: 'AI slop · Gradient sent, glass received',
    summary:
      'Every message sits in a bubble: yours in a glowing gradient, the assistant’s in frosted glass. Wingman puts only your message in a bubble and sets the answer full width, like a document.',
    aliases: ['message', 'speech bubble', 'prompt', 'the text balloon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'linear-gradient()',
        value: '135deg · #8b5cf6 → #6366f1 → #ec4899',
        plain:
          'Your messages are violet, indigo and pink with a purple glow, louder than the answers they ask for. Wingman’s are a quiet gray.',
      },
      {
        kind: 'appearance',
        term: 'Glass bubble',
        value: 'rgb(255 255 255 / 0.1) · blur(12px)',
        plain: 'The answers are see-through boxes over the colored blobs, so the text sits on a busy background.',
      },
      {
        kind: 'appearance',
        term: 'Max width',
        value: 'max-width: 214px',
        plain:
          'Answers are capped at 214px of the 280px screen, so anything longer than a few lines turns into a tall, narrow column.',
      },
    ],
  },
  {
    id: 'bullet-list',
    name: 'Bulleted list',
    htmlTag: '<ul>',
    variant: 'AI slop · Emoji bullets',
    summary:
      'The answer’s four points, each led by an emoji instead of a bullet. They name the sections of a PRD without writing any of them.',
    aliases: ['list', 'bullet points', 'outline', 'emoji list'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji bullets',
        value: '📌 🎯 👥 ✅ · list-style: none',
        plain:
          'An emoji before every item is a common habit of AI-written text. Each one pulls the eye without saying more than a plain bullet.',
      },
      {
        kind: 'appearance',
        term: 'One type size',
        value: '13px for everything',
        plain:
          'The intro line and the items share one size and weight, so nothing reads as a heading. Wingman’s answer has real headings, a table and a checklist.',
      },
    ],
  },
  {
    id: 'message-actions',
    name: 'Message actions',
    htmlTag: '<div role="toolbar">',
    variant: 'AI slop · Emoji in boxes',
    summary:
      'Small buttons under the answer: thumbs up, thumbs down, copy and regenerate, drawn as emoji in little glass boxes.',
    aliases: ['action bar', 'copy button', 'regenerate', 'thumbs up and down', 'reactions'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji icons',
        value: '👍 👎 📋 🔄 · 11px',
        plain:
          'At 11px the clipboard and the arrows are hard to make out, and each emoji has its own colors. Wingman uses plain gray line icons.',
      },
      {
        kind: 'appearance',
        term: 'Boxed buttons',
        value: '26 × 22px · border-radius: 8px',
        plain:
          'Each emoji sits in its own bordered glass box, which makes the row heavier than ghost buttons with no background.',
      },
    ],
  },
  {
    id: 'typing-indicator',
    name: 'Typing indicator',
    variant: 'AI slop · “Muse is thinking” + dots',
    summary:
      'A pill that says “Muse is thinking” with three bouncing dots. It shows under an answer that is already finished, with no new question to think about.',
    aliases: ['thinking', 'loading dots', 'typing bubble', 'the three dots'],
    concepts: [
      {
        kind: 'behavior',
        term: '@keyframes bounce',
        value: '1.2s · 150ms apart · infinite',
        plain:
          'The dots hop one after another, a pattern borrowed from chat with people. Wingman shows “Thinking…” where the answer will appear, then how long it took.',
      },
      {
        kind: 'appearance',
        term: 'Gradient dots',
        value: 'linear-gradient(135deg, #c4b5fd, #f9a8d4)',
        plain: 'Even the 5px dots get a lilac-to-pink gradient.',
      },
    ],
  },
  {
    id: 'suggestion-chips',
    name: 'Suggestion chips',
    variant: 'AI slop · Generic starters',
    summary:
      'Ready-made prompts above the message box: brainstorm ideas, write an email, analyze data. None of them follows from the PRD you just asked for.',
    aliases: ['prompt suggestions', 'quick replies', 'starter prompts'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Context-free suggestions',
        value: '💡 Brainstorm ideas · ✍️ Write an email',
        plain:
          'The starters any chat app shows on an empty screen. Wingman suggests next steps for this answer: write user stories, draft the tickets, list the risks.',
      },
      {
        kind: 'appearance',
        term: 'Glass pills',
        value: 'rgb(255 255 255 / 0.1) · blur(12px)',
        plain: 'Bold see-through pills, each led by an emoji.',
      },
    ],
  },
  {
    id: 'composer',
    name: 'Composer',
    htmlTag: '<textarea>',
    variant: 'AI slop · Glowing glass pill',
    summary:
      'The message box at the bottom: a paperclip, the placeholder and a send button. A purple glow rings it all the time, the look of a focused field even when nothing is typed.',
    aliases: ['message input', 'chat box', 'prompt field', 'input bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Glow ring',
        value: 'box-shadow: 0 0 30px rgb(139 92 246 / 0.4)',
        plain:
          'A faint 4px ring and a wide purple halo around the box. A glow like this normally marks the field you are typing in.',
      },
      {
        kind: 'appearance',
        term: 'Placeholder',
        value: 'Ask me anything... ✨',
        plain: 'A generic hint with a sparkle. Wingman’s says “Ask a follow-up”, which points to the next step.',
      },
      {
        kind: 'appearance',
        term: 'Emoji attach button',
        value: '📎 · 34 × 34px',
        plain: 'The paperclip is an emoji beside a drawn send arrow: two icon styles in one bar.',
      },
    ],
  },
  {
    id: 'send-button',
    name: 'Send button',
    htmlTag: '<button>',
    variant: 'AI slop · Glowing gradient circle',
    summary:
      'The round arrow at the end of the box sends your message. It glows pink even while the box is empty and there is nothing to send.',
    aliases: ['submit button', 'send arrow', 'the arrow button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        plain: 'Violet to pink, like your own bubbles.',
      },
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: '0 0 18px rgb(236 72 153 / 0.75)',
        plain: 'A pink halo with no offset, like the orbs and the PRO badge.',
      },
      {
        kind: 'behavior',
        term: 'Disabled state',
        value: 'none · always lit',
        plain:
          'A send button usually stays dim until there is something to send. Wingman ends the empty box with a voice button instead.',
      },
    ],
  },
  {
    id: 'footnote',
    name: 'Footnote',
    variant: 'AI slop · “Powered by” tagline',
    summary:
      '“⚡ Powered by advanced AI” in small print under the box. It tells you nothing you can act on; chat apps usually use this line to remind you to check answers.',
    aliases: ['fine print', 'disclaimer', 'tagline', 'the small text at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filler copy',
        value: '⚡ Powered by advanced AI',
        plain:
          'A vague claim with an emoji, a common default of AI tools. A short note such as “Muse can make mistakes” would earn the space.',
      },
      {
        kind: 'appearance',
        term: 'Low-contrast text',
        value: '10px · rgb(255 255 255 / 0.45)',
        plain: 'Tiny, faint text over the colored blobs is hard to read.',
      },
    ],
  },
  homeIndicator,
];

/** Stride, the sneaker product page, in on-screen order. */
export const strideSlopSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'navigation-bar',
    name: 'Navigation bar',
    htmlTag: '<header>',
    variant: 'AI slop · Generic title, glass buttons',
    summary:
      'The bar over the photo: Back, the words “Product Details” and a cart. The title names the kind of page rather than the shoe, so it reads the same on every product.',
    aliases: ['top bar', 'header', 'title bar', 'the bar at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Generic title',
        value: 'Product Details · 15px · 700',
        plain:
          'A label any product page could have. Wingman puts the product’s name in the bar, so you know where you are after the photo scrolls away.',
      },
      {
        kind: 'appearance',
        term: 'Glass buttons',
        value: 'backdrop-filter: blur(10px)',
        plain: 'Two frosted circles float on the gradient, each with its own purple shadow.',
      },
    ],
  },
  {
    id: 'back-button',
    name: 'Back button',
    htmlTag: '<button aria-label="Back">',
    variant: 'AI slop · Chevron in a glass circle',
    summary:
      'The arrow pointing left takes you back to the previous screen. Here it sits in a frosted circle with a white rim and a purple shadow.',
    aliases: ['back arrow', 'the < in the corner', 'go back'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Glass circle',
        value: 'rgb(255 255 255 / 0.2) · 38 × 38px',
        plain:
          'A see-through white circle that depends on the gradient behind it; on a light photo it would almost disappear. Wingman’s back button is a plain, thin chevron.',
      },
      {
        kind: 'appearance',
        term: 'Colored shadow',
        value: '0 8px 20px -8px rgb(76 29 149 / 0.6)',
        plain: 'A deep purple shadow under a button that already sits on purple.',
      },
    ],
  },
  {
    id: 'cart-button',
    name: 'Cart button',
    htmlTag: '<button>',
    variant: 'AI slop · Emoji cart with a count badge',
    summary:
      'A cart emoji in a glass circle opens the cart, and an orange badge says 3 items are in it. The color emoji sits across from a line-drawn chevron: two icon styles in one bar.',
    aliases: ['bag button', 'basket', 'shopping cart icon', 'the cart with the number'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji icon',
        value: '🛒 · 16px',
        plain:
          'Quick to generate, but it looks different from one phone to another and can’t match the other icons. Wingman draws all its bar icons in one thin line style.',
      },
      {
        kind: 'appearance',
        term: 'Count badge',
        value: 'linear-gradient(135deg, #f97316, #ef4444)',
        plain: 'An orange-to-red pill with the number of items: one more gradient on top of the gradient.',
      },
    ],
  },
  {
    id: 'product-image',
    name: 'Product image',
    variant: 'AI slop · Emoji on a gradient',
    summary:
      'The big area at the top where the product photo belongs. There is no photo: a giant sneaker emoji, tilted and glowing, stands in on a violet-to-pink gradient with sparkles.',
    aliases: ['product photo', 'hero image', 'gallery', 'the big shoe'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji as photo',
        value: '👟 · 112px · rotate(-14deg)',
        plain:
          'An emoji is the quick stand-in when there is no photo. It shows a generic shoe, not this one, and looks different from one phone to another.',
      },
      {
        kind: 'appearance',
        term: 'linear-gradient()',
        value: '150deg · #7c3aed → #c026d3 → #ec4899',
        plain:
          'Violet to magenta to pink behind the product. Wingman shoots every shoe on the same pale gray, so the product is what stands out.',
      },
      {
        kind: 'appearance',
        term: 'Blurred blobs',
        value: 'filter: blur(32px)',
        plain: 'Soft blue and orange blobs in the corners: decoration that fills space.',
      },
      {
        kind: 'appearance',
        term: 'Glow and sparkles',
        value: 'radial-gradient() · ✨ ✨',
        plain: 'A white glow behind the shoe and two sparkle emoji make it look magical rather than real.',
      },
    ],
  },
  {
    id: 'image-badge',
    name: 'Badge',
    variant: 'AI slop · Tilted urgency sticker',
    summary:
      'A tilted, glowing “🔥 HOT DEAL” sticker on the photo. Urgency words like these are a common default of generated shop pages and can feel pushy.',
    aliases: ['label', 'tag', 'sticker', 'the pill on the picture'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rotated badge',
        value: 'transform: rotate(-6deg)',
        plain:
          'The tilt imitates a sticker slapped on a box. Wingman’s badge sits straight in the corner, out of the product’s way.',
      },
      {
        kind: 'appearance',
        term: 'Gradient pill',
        value: 'linear-gradient(135deg, #f97316, #ef4444)',
        plain: 'Orange to red with a red glow: the colors of a clearance sale.',
      },
      {
        kind: 'appearance',
        term: 'Urgency copy',
        value: '🔥 HOT DEAL · 11px · 800',
        plain:
          'Capitals, a fire emoji and the word deal push you to hurry. Wingman’s badge says the shoe is one of Stride’s picks, with the Stride mark.',
      },
    ],
  },
  {
    id: 'product-tags',
    name: 'Tags',
    variant: 'AI slop · Claims with emoji',
    summary:
      'Two tinted pills above the name: “✨ Premium Quality” and “🏆 Bestseller”. Claims with nothing behind them could sit on any product, so they read as generic.',
    aliases: ['chips', 'labels', 'pills', 'the little colored labels'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Unsupported claims',
        value: 'Premium Quality · Bestseller',
        plain: 'Words any shop could print on anything. A fact such as the material or the weight would tell you more.',
      },
      {
        kind: 'appearance',
        term: 'Tinted pills',
        value: { light: '#f3e8ff · #fef3c7', dark: 'rgb(168 85 247 / 0.18) · rgb(245 158 11 / 0.16)' },
        plain:
          'One lilac and one yellow, each with its own text color: two more colors on a page that already has many.',
      },
    ],
  },
  {
    id: 'product-title',
    name: 'Product title',
    htmlTag: '<h1>',
    variant: 'AI slop · Extra bold, name only',
    summary:
      'The shoe’s name in big, extra-bold type. Nothing says what kind of shoe it is or which color you are looking at.',
    aliases: ['product name', 'heading', 'the name of the shoe'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Extra-bold type',
        value: '21px · font-weight: 800',
        plain:
          'Most text on this page is 700 or 800, so the title has to be big to stand out. Wingman sets the name at 500 and lets size and order do the work.',
      },
      {
        kind: 'appearance',
        term: 'No subtitle',
        value: 'name only',
        plain:
          'Wingman puts the category and the color under the name, so you know what you are looking at before you read on.',
      },
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    variant: 'AI slop · Emoji stars',
    summary:
      'Five star emoji, the score 4.9 and “(10K+ reviews)”. Emoji stars can only be whole, so a 4.9 shows as five full stars.',
    aliases: ['stars', 'star rating', 'reviews', 'the yellow stars'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji stars',
        value: '⭐⭐⭐⭐⭐ · 11px',
        plain:
          'An emoji can’t be filled partway, so the row can’t show 4.9. Star ratings are usually drawn shapes, filled to the exact score.',
      },
      {
        kind: 'appearance',
        term: 'Rounded count',
        value: '(10K+ reviews)',
        plain: 'A round “10K+” reads like a placeholder. An exact count that opens the reviews is easier to trust.',
      },
    ],
  },
  {
    id: 'price-tag',
    name: 'Price with discount',
    variant: 'AI slop · Gradient price + party emoji',
    summary:
      'The price in gradient text, the old price crossed out and a green “−40% 🎉” pill. The gradient makes the most important number harder to read.',
    aliases: ['price', 'sale price', 'was / now price', 'percent off'],
    concepts: [
      {
        kind: 'appearance',
        term: 'background-clip: text',
        value: 'linear-gradient(90deg, #7c3aed, #ec4899)',
        plain:
          'Fills $99.99 with a violet-to-pink gradient. Wingman keeps the price in the text color and saves its one accent for the saving.',
      },
      {
        kind: 'appearance',
        term: 'Discount pill',
        value: { light: '#047857 on #d1fae5', dark: '#6ee7b7 on rgb(16 185 129 / 0.18)' },
        plain: 'A green pill with a party emoji, pushed to the far right: a third color on the same line.',
      },
      {
        kind: 'behavior',
        term: 'Calculated discount',
        value: '(169.99 − 99.99) / 169.99 = 41%',
        plain:
          'The percentage should be worked out from the two prices. This one is typed in, and it’s off by a point.',
      },
    ],
  },
  {
    id: 'product-description',
    name: 'Product description',
    variant: 'AI slop · Generic copy',
    summary:
      '“Experience ultimate comfort and style. Perfect for any occasion! 🚀” Two sentences that could describe any product and say nothing about this shoe.',
    aliases: ['description', 'product copy', 'blurb', 'the text under the price'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Generic copy',
        value: 'ultimate · perfect · any occasion',
        plain:
          'Big, vague words are a common default of AI-written copy. Facts like the cushioning, the weight or the fit would help you choose.',
      },
      {
        kind: 'appearance',
        term: 'Emoji in copy',
        value: '🚀',
        plain: 'A rocket at the end of a shoe description adds energy but no meaning.',
      },
      {
        kind: 'appearance',
        term: 'Tinted gray',
        value: { light: 'color: #7c73a8', dark: 'color: #a39cc8' },
        plain: 'A lavender gray instead of a neutral one: the purple tint runs through every color on the page.',
      },
    ],
  },
  {
    id: 'size-chips',
    name: 'Size grid',
    variant: 'AI slop · Gradient selected size',
    summary:
      'Five sizes in a row, with 9 selected in a glowing gradient. Nothing shows which sizes are sold out, a state every shoe page needs.',
    aliases: ['size picker', 'size selector', 'size buttons', 'select size'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Selected size',
        value: 'linear-gradient(135deg, #8b5cf6, #ec4899) + glow',
        plain:
          'The chosen size fills with the gradient and glows pink, as loud as the Add to Cart button. Wingman only darkens its outline.',
      },
      {
        kind: 'behavior',
        term: 'No sold-out state',
        value: 'all sizes look in stock',
        plain: 'Wingman keeps sold-out sizes in their place, grayed out, so you see right away what you can still buy.',
      },
    ],
  },
  {
    id: 'color-swatches',
    name: 'Color picker',
    variant: 'AI slop · Gradient dots',
    summary:
      'Four round swatches, each a two-color gradient, with the first one ringed. None of them matches the gray shoe in the picture.',
    aliases: ['colorways', 'variants', 'color options', 'the colored dots'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient swatches',
        value: 'linear-gradient(135deg, #a855f7, #ec4899) · …',
        plain:
          'Each 24px dot blends two colors, such as violet to pink, so it’s unclear which color the shoe comes in. Wingman shows a small photo of each version.',
      },
      {
        kind: 'appearance',
        term: 'Selected ring',
        value: {
          light: '0 0 0 2px #fff, 0 0 0 4px #a855f7 + glow',
          dark: '0 0 0 2px #120d22, 0 0 0 4px #a855f7 + glow',
        },
        plain: 'A gap, a purple ring and a purple glow around the chosen dot.',
      },
      {
        kind: 'behavior',
        term: 'Synced with the photo',
        value: 'violet selected · gray shoe',
        plain:
          'Picking a color should show that version in the photo. Here violet is selected while the shoe above is gray.',
      },
    ],
  },
  {
    id: 'favorite-button',
    name: 'Secondary button',
    htmlTag: '<button>',
    variant: 'AI slop · Heart emoji tile',
    summary:
      'A red heart emoji in a pink tile saves the shoe for later. The emoji is always filled, so you can’t tell whether the shoe is saved.',
    aliases: ['wishlist', 'save for later', 'like button', 'the heart button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Emoji icon',
        value: '❤️ · 20px',
        plain:
          'A filled red heart usually means saved, and an emoji can’t switch to an outline. Wingman uses an outline heart that fills in once saved.',
      },
      {
        kind: 'appearance',
        term: 'Icon only',
        value: 'no label',
        plain:
          'Without a word, the heart has to explain itself. Wingman writes “Favorite” on a button as wide as Add to Bag.',
      },
    ],
  },
  {
    id: 'add-to-bag',
    name: 'Primary button',
    htmlTag: '<button>',
    variant: 'AI slop · Gradient with glow',
    summary:
      'The “🛒 Add to Cart” button, the main action on the page. Gradients and glows are also on the selected size, the price and the badge, so it has to compete for attention.',
    aliases: ['buy button', 'add to cart', 'CTA', 'call to action', 'the purple button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Gradient fill',
        value: 'linear-gradient(135deg, #7c3aed, #c026d3, #ec4899)',
        plain:
          'Violet to magenta to pink, the colors of the photo backdrop. Wingman’s button is solid black in light mode and white in dark mode.',
      },
      {
        kind: 'appearance',
        term: 'Glow shadow',
        value: '0 14px 28px -8px rgb(192 38 211 / 0.8)',
        plain: 'A magenta glow spreads under the button.',
      },
      {
        kind: 'appearance',
        term: 'Emoji in label',
        value: '🛒 Add to Cart',
        plain: 'The cart emoji repeats what the words already say, and the cart at the top of the page.',
      },
    ],
  },
  homeIndicator,
];
