import type { UiElementSpec } from '../../../catalog';

/** Parts of the Scrollspy element, in the order they appear. `value` fields are the actual values from Scrollspy. */
export const scrollspySpecs: UiElementSpec[] = [
  {
    id: 'scrollspy',
    name: 'Table of contents',
    htmlTag: '<nav aria-label="On this page">',
    variant: 'Scrollspy · column, or a compact bar on narrow screens',
    summary:
      'The “On this page” list of a long article’s sections. It keeps track of where you are as you read, and jumps to a section when you click it.',
    aliases: ['on this page', 'TOC', 'page outline', 'jump links', 'the list on the right'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Scrollspy',
        value: 'last heading past the top wins',
        plain:
          'The page watches its headings (usually with an IntersectionObserver) and marks the link of the last one that reached the top, so the list always says where you are.',
      },
      {
        kind: 'appearance',
        term: 'Sticky column',
        value: '148px wide',
        plain:
          'On wide screens the list sits in a narrow column beside the article and stays put (position: sticky) while the article scrolls.',
      },
      {
        kind: 'behavior',
        term: 'Collapses to a bar',
        value: 'below 460px wide',
        plain:
          'Where there’s no room for a column, it turns into a bar at the top that names the current section. Tapping it opens the full list.',
      },
    ],
  },
  {
    id: 'scrollspy-active',
    name: 'Active link',
    htmlTag: '<a aria-current="location">',
    variant: 'Current section · Authentication',
    summary: 'The link of the section you’re reading. It changes on its own as you scroll, without a click.',
    aliases: ['current section', 'highlighted link', 'selected item', 'you are here'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Accent text',
        value: { light: 'color: #0b76b4 · 500', dark: 'color: #52b7ee · 500' },
        plain: 'The current link takes the site’s blue and a slightly heavier weight; the others stay gray.',
      },
      {
        kind: 'behavior',
        term: 'aria-current="location"',
        plain: 'Tells screen readers which link matches the part of the page in view.',
      },
      {
        kind: 'behavior',
        term: 'scroll-behavior: smooth',
        value: '650ms',
        plain: 'Clicking another link glides the article to that section instead of jumping, so you keep your bearings.',
      },
    ],
  },
  {
    id: 'scrollspy-indicator',
    name: 'Active indicator',
    htmlTag: '<span aria-hidden="true">',
    variant: '2px bar on a 1px track',
    summary:
      'A short colored bar on the thin line beside the links. It slides along the line to the current section, like a marker on a ruler.',
    aliases: ['highlight bar', 'progress marker', 'the blue line', 'active marker'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and thumb',
        value: { light: '1px #e1e4ea track · 2px #0b76b4 bar', dark: '1px #2b2f37 track · 2px #52b7ee bar' },
        plain: 'A faint 1px line runs down the whole list; the bar on it is twice as thick and in the accent color.',
      },
      {
        kind: 'behavior',
        term: 'Slide transition',
        value: 'translateY · 250ms',
        plain: 'It glides from one link to the next instead of blinking on, so the eye follows it down the list.',
      },
    ],
  },
  {
    id: 'scrollspy-heading',
    name: 'Section heading',
    htmlTag: '<h3 id="authentication">',
    variant: 'Anchor target',
    summary:
      'The title of a section in the article. Its id is the anchor the list links to, and the point where its section counts as “in view”.',
    aliases: ['anchor', 'subheading', 'section title', 'jump target', 'h2 / h3'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Anchor link',
        value: '#authentication',
        plain: 'Each heading has an id, so a link can point straight at it and the address can be shared to that spot.',
      },
      {
        kind: 'appearance',
        term: 'scroll-margin-top',
        value: '16px',
        plain: 'A jump stops a little above the heading, so it doesn’t end up jammed against the top edge or under a bar.',
      },
    ],
  },
  {
    id: 'scrollspy-article',
    name: 'Article',
    htmlTag: '<article>',
    variant: 'Docs page · five sections',
    summary:
      'The long page the list belongs to: an API guide split into sections, each with a heading, text and code.',
    aliases: ['page content', 'docs page', 'body', 'main column'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Reading column',
        value: '13px / 20px body · 16px headings',
        plain: 'Comfortable line spacing and clear headings make the page easy to scan for the section you need.',
      },
      {
        kind: 'appearance',
        term: 'Code block',
        value: 'monospace 10.5px · dark in both themes',
        plain: 'Examples sit in a dark box in a fixed-width font, so they stand apart from the prose and can be copied as is.',
      },
    ],
  },
];
