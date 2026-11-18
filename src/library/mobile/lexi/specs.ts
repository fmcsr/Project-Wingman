import { homeIndicator, statusBar } from '../../../catalog';
import type { UiElementSpec } from '../../../catalog';

/** Elements in the Lexi language lesson, in the order they appear. `value` fields are the actual values from LexiApp. */
export const lexiSpecs: UiElementSpec[] = [
  statusBar,
  {
    id: 'close-button',
    name: 'Close button',
    htmlTag: '<button aria-label="Quit lesson">',
    variant: 'X icon',
    summary: 'The gray X in the top corner ends the lesson early. Because that throws away this lesson’s progress, it asks first.',
    aliases: ['quit', 'exit', 'the X', 'leave the lesson'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Muted icon',
        value: { light: '#afaeb6', dark: '#6f6d7b' },
        plain: 'Light gray instead of black: the way out is there when you need it, without pulling you out of the lesson.',
      },
      {
        kind: 'appearance',
        term: 'Touch target',
        value: '16px icon · 28 × 28px target',
        plain: 'The tappable square is bigger than the thin X, so it is easy to hit.',
      },
      {
        kind: 'behavior',
        term: 'Confirmation dialog',
        plain: 'A tap opens an “Are you sure?” dialog instead of closing right away, so a stray tap doesn’t cost the lesson.',
      },
    ],
  },
  {
    id: 'lesson-progress',
    name: 'Progress bar',
    htmlTag: '<div role="progressbar">',
    variant: 'Thick, with a streak label',
    summary:
      'How much of the lesson is done: 7 of 12 exercises. The label riding on the fill counts the right answers in a row.',
    aliases: ['lesson progress', 'progress meter', 'combo', '4 in a row', 'the purple bar at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and fill',
        value: 'height: 12px · border-radius: 999px · width: 58%',
        plain: 'A thick gray pill stands for the whole lesson; the violet fill grows with every exercise you finish.',
      },
      {
        kind: 'appearance',
        term: 'Highlight',
        value: '3px stripe · rgb(255 255 255 / 0.3)',
        plain: 'A lighter stripe along the top of the fill makes the bar look round and glossy, like a tube instead of a flat line.',
      },
      {
        kind: 'behavior',
        term: 'Streak label',
        value: '“4 in a row”',
        plain:
          'Appears after a few right answers in a row and stays centered over the fill as it grows. A mistake resets it, so it rewards focus.',
      },
    ],
  },
  {
    id: 'hearts-counter',
    name: 'Lives counter',
    variant: 'Heart with a count',
    summary: 'The hearts you have left. A wrong answer costs one; at zero the lesson stops until they refill.',
    aliases: ['hearts', 'lives', 'health', 'the red heart'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon and number',
        value: '19px heart · 14px · 700',
        plain: 'The heart says “lives” at a glance; the number next to it says exactly how many. A small shine makes it look glossy.',
      },
      {
        kind: 'appearance',
        term: 'Reserved color',
        value: { light: '#ef3f58', dark: '#ff5d72' },
        plain: 'Red is used for lives and nothing else on the screen, so the heart never blends in with the brand color.',
      },
      {
        kind: 'behavior',
        term: 'Loss feedback',
        plain: 'On a wrong answer the heart shakes and the number counts down, so the cost of a mistake is clear.',
      },
    ],
  },
  {
    id: 'instruction',
    name: 'Instruction',
    htmlTag: '<h1>',
    variant: 'Exercise title',
    summary: 'One short line that says what to do. It changes with the type of exercise: translate, listen, pick the picture.',
    aliases: ['prompt', 'question', 'task', 'the title'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Type hierarchy',
        value: '16px · 700',
        plain: 'The boldest text on the screen, in dark gray rather than black, so it’s the first thing you read without shouting.',
      },
      {
        kind: 'appearance',
        term: 'Imperative copy',
        value: '“Translate this sentence”',
        plain: 'It starts with a verb, so the task is clear before you read anything else.',
      },
    ],
  },
  {
    id: 'character-avatar',
    name: 'Avatar',
    htmlTag: '<img alt="">',
    variant: 'Round photo of the speaker',
    summary:
      'The person who says the sentence. A face next to the bubble turns a line of text into something someone is saying to you.',
    aliases: ['profile picture', 'character', 'speaker photo', 'the face on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Circular crop',
        value: '72px · border-radius: 50% · object-fit: cover',
        plain: 'Any photo becomes a neat circle; object-fit fills it without stretching the face.',
      },
      {
        kind: 'behavior',
        term: 'Decorative image',
        value: 'alt=""',
        plain: 'The face adds warmth but no information, so screen readers skip it and go straight to the sentence.',
      },
      {
        kind: 'behavior',
        term: 'Recurring cast',
        plain: 'Sentences are said by a small cast of people who come back lesson after lesson, so it feels like talking to someone.',
      },
    ],
  },
  {
    id: 'speech-bubble',
    name: 'Speech bubble',
    htmlTag: '<p lang="es">',
    variant: 'Outlined, with a tail',
    summary: 'The sentence to translate, shown as something the person is saying. Its tail points at them.',
    aliases: ['the Spanish sentence', 'chat bubble', 'callout', 'the sentence box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Tail',
        value: '12.5 × 10px · clip-path: polygon()',
        plain: 'A small triangle with a flat top sticks out of the left edge and turns the box into a bubble that points at the speaker.',
      },
      {
        kind: 'appearance',
        term: 'Outline',
        value: { light: 'border: 1.5px solid #e5e4ea', dark: 'border: 1.5px solid #33323d' },
        plain: 'A light gray outline around a plain fill, the same outline the word chips use, so the lesson looks like one set.',
      },
      {
        kind: 'behavior',
        term: 'lang attribute',
        value: 'lang="es"',
        plain: 'Marks the sentence as Spanish, so screen readers pronounce it in Spanish instead of reading it like English.',
      },
    ],
  },
  {
    id: 'speaker-button',
    name: 'Audio button',
    htmlTag: '<button aria-label="Play audio">',
    variant: 'Speaker icon, inline',
    summary: 'Plays the sentence out loud. It plays once by itself when the exercise opens; tap to hear it again.',
    aliases: ['speaker', 'play sound', 'replay', 'listen', 'the speaker icon'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Brand color',
        value: { light: '#7151f2', dark: '#8f78ff' },
        plain: 'The violet speaker is the only colored thing in the bubble, so it reads as something to tap.',
      },
      {
        kind: 'behavior',
        term: 'Autoplay once',
        plain: 'The audio plays on its own when the exercise appears; after that it plays only when you tap.',
      },
      {
        kind: 'behavior',
        term: 'Slow replay',
        plain: 'Tapping again often plays the sentence more slowly, so each word is easier to catch.',
      },
    ],
  },
  {
    id: 'word-hint',
    name: 'Word hint',
    variant: 'Dashed underline, new word in bold',
    summary:
      'A dashed line under a word means it has a hint: tap it and a small popover shows what it means. The word being taught is bold.',
    aliases: ['tooltip', 'translation hint', 'word definition', 'the dotted underline', 'the dashes under the words'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dashed underline',
        value: 'linear-gradient() · 4.5px × 1.5px · repeat-x',
        plain: 'Short gray dashes under each word but not under its punctuation, drawn as a repeating background so every dash is the same.',
      },
      {
        kind: 'appearance',
        term: 'New word',
        value: 'font-weight: 700',
        plain: 'The word this lesson introduces is bold with a dark underline, so you notice it before anything else in the sentence.',
      },
      {
        kind: 'behavior',
        term: 'Hint popover',
        value: 'station · season',
        plain: 'A tap opens a small box under the word with its meanings, the one that fits this sentence first.',
      },
    ],
  },
  {
    id: 'answer-line',
    name: 'Answer line',
    variant: 'Ruled, holding the placed words',
    summary: 'Where the answer gets built. Tapped words jump up here in order; tap one again to send it back.',
    aliases: ['answer area', 'drop zone', 'the lines', 'sentence builder'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ruled lines',
        value: { light: 'border-bottom: 1.5px solid #e5e4ea', dark: 'border-bottom: 1.5px solid #33323d' },
        plain: 'Two lines like a notebook page: room for a longer answer, and a clear place for words to land.',
      },
      {
        kind: 'behavior',
        term: 'Tap to place',
        plain: 'No dragging needed: a tap moves a word to the end of the line, and another tap takes it back.',
      },
      {
        kind: 'behavior',
        term: 'Checked',
        plain: 'Once the answer is checked, the placed chips take the result color: emerald here, because it was right.',
      },
    ],
  },
  {
    id: 'word-chip',
    name: 'Word chip',
    variant: 'On the line and in the bank',
    summary: 'One word on a tappable tile. Answers are built from them, one tap per word.',
    aliases: ['word tile', 'word button', 'token', 'the word blocks'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bottom edge',
        value: 'border: 1.5px · border-bottom-width: 3px',
        plain: 'The outline is twice as thick at the bottom, so each tile looks like a raised key. Pressed, it sinks onto that edge.',
      },
      {
        kind: 'appearance',
        term: 'Hug contents',
        value: 'height: 30px · padding: 0 8.5px · border-radius: 9px',
        plain: 'Each tile is as wide as its word, so short and long words sit side by side naturally.',
      },
      {
        kind: 'appearance',
        term: 'Correct state',
        value: { light: 'background: #d9f5e8', dark: 'background: #10291f' },
        plain: 'After a right answer the chips on the line turn emerald, so the result shows on the answer itself, not only in the banner.',
      },
    ],
  },
  {
    id: 'word-bank',
    name: 'Word bank',
    variant: 'Centered rows',
    summary: 'The pool of words the answer is built from: every word of the answer, shuffled, plus a few that don’t belong.',
    aliases: ['word pool', 'options', 'word choices', 'the words at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Centered rows',
        value: 'justify-content: center · gap: 7px 5px',
        plain: 'The chips sit in rows centered under the answer, like words laid out on a table.',
      },
      {
        kind: 'behavior',
        term: 'Distractors',
        value: 'When · stop · a · are',
        plain: 'Extra words that look right but aren’t: each one is a near miss for a word in the answer.',
      },
      {
        kind: 'behavior',
        term: 'Shuffled order',
        plain: 'The words are dealt in a new order every time, so you have to read them instead of remembering where they were.',
      },
    ],
  },
  {
    id: 'chip-slot',
    name: 'Placeholder slot',
    variant: 'Left by a used chip',
    summary: 'The gray shape a word leaves behind in the bank. It shows where the word goes back, and nothing shifts.',
    aliases: ['empty slot', 'ghost tile', 'gap', 'the gray boxes'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Same footprint',
        value: 'color: transparent',
        plain: 'The word is still inside, just invisible, so the slot keeps the exact width of the chip that left.',
      },
      {
        kind: 'appearance',
        term: 'Pressed-down fill',
        value: { light: 'background: #e5e4ea', dark: 'background: #33323d' },
        plain: 'Flat gray, with no edge, and 3px lower than a chip: it reads as the hole the tile came out of.',
      },
      {
        kind: 'behavior',
        term: 'Stable layout',
        plain: 'Because the gaps stay, the other words never jump around while you tap, so your thumb stays on target.',
      },
    ],
  },
  {
    id: 'feedback-banner',
    name: 'Feedback banner',
    variant: 'Success',
    summary:
      'Slides up from the bottom after Check: the answer was right. It covers the Check button and leads on with Continue.',
    aliases: ['result banner', 'success message', 'correct answer panel', 'the green box at the bottom'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Semantic color',
        value: { light: 'background: #d9f5e8', dark: 'background: #10291f' },
        plain: 'Emerald means “correct” before a word is read. A wrong answer brings the same banner in red, with the right answer in it.',
      },
      {
        kind: 'appearance',
        term: 'Icon and title',
        value: '✓ · “Nice!” · 16.5px · 800',
        plain: 'A check mark and a short, upbeat word, so the result doesn’t depend on seeing the color.',
      },
      {
        kind: 'behavior',
        term: 'Report and discuss',
        plain: 'The flag reports a problem with the exercise; the speech icon opens the discussion where learners talk about this sentence.',
      },
    ],
  },
  {
    id: 'continue-button',
    name: 'Primary button',
    htmlTag: '<button>',
    variant: '3D, full width',
    summary: 'The one next step: on to the next exercise. It spans the banner and sits where Check was, so your thumb doesn’t move.',
    aliases: ['continue', 'next', 'CTA', 'the big button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Solid bottom edge',
        value: { light: 'box-shadow: 0 3px 0 #0c8c5f', dark: 'box-shadow: 0 3px 0 #20a06f' },
        plain: 'A darker band under the button, with no blur, makes it look like a thick key. Pressed, it drops onto that edge.',
      },
      {
        kind: 'appearance',
        term: 'All-caps label',
        value: 'text-transform: uppercase · letter-spacing: 0.05em',
        plain: 'Bold capitals, spaced a little apart, read like the label on a key. The markup still says “Continue”.',
      },
      {
        kind: 'behavior',
        term: 'One spot for Check and Continue',
        plain: 'Check turns into Continue in the same place, so working through a lesson is a single steady rhythm.',
      },
    ],
  },
  homeIndicator,
];
