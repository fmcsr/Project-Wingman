import { describe, expect, it } from 'vitest';
import type { UiElementSpec } from '../catalog';
import type { LibraryExample } from '../library';
import { briefToMarkdown } from './briefMarkdown';
import type { ResolvedItem } from './briefStore';

const example: LibraryExample = {
  id: 'acme',
  platform: 'web',
  name: 'Acme',
  kind: 'Marketing site',
  category: 'Marketing',
  inspiredBy: ['Linear'],
  description: 'A SaaS landing page.',
  url: 'acme.app',
  Component: () => null,
  specs: [],
};

function resolved(spec: UiElementSpec, note = ''): ResolvedItem {
  const item = { platform: example.platform, exampleId: example.id, specId: spec.id, note };
  return { key: `web/acme/${spec.id}`, item, example, spec };
}

const navbar: UiElementSpec = {
  id: 'navbar',
  name: 'Navbar',
  htmlTag: '<nav>',
  variant: 'Sticky · Glassmorphism',
  summary: 'The bar across the top of every page.',
  aliases: ['top bar', 'menu'],
  concepts: [
    { kind: 'appearance', term: 'backdrop-filter', value: 'blur(16px)', plain: 'Blurs whatever scrolls under it.' },
    {
      kind: 'appearance',
      term: 'Translucent background',
      value: { light: 'rgb(255 255 255 / 0.7)', dark: 'rgb(20 20 20 / 0.7)' },
      plain: 'A see-through fill, so the page shows through.',
    },
    { kind: 'behavior', term: 'position: sticky', value: 'top: 0', plain: 'Stays put while the page scrolls.' },
    { kind: 'behavior', term: 'Hides on scroll down', plain: 'Slides away to give the content room.' },
  ],
};

const logo: UiElementSpec = {
  id: 'logo',
  name: 'Logo',
  summary: 'The brand mark in the corner.',
  aliases: [],
  concepts: [
    { kind: 'appearance', term: 'Wordmark', value: { light: '#171717', dark: '#171717' }, plain: 'The name.' },
  ],
};

describe('briefToMarkdown', () => {
  it('writes the goal, each element with its terms and values, and acceptance criteria', () => {
    const markdown = briefToMarkdown('  A landing page for a planning tool  ', [
      resolved(navbar, ' Use our own logo\n  on the left '),
    ]);

    // The start and the end, exactly; the fixed instructions sit between them
    const head = '# UI brief\n\n## Goal\n\nA landing page for a planning tool\n\n## Elements\n\n';
    const tail = [
      '### 1. Navbar (`<nav>`)',
      '',
      'Variant: Sticky · Glassmorphism',
      '',
      'The bar across the top of every page.',
      '',
      'Also called: “top bar”, “menu”',
      '',
      'Look:',
      '',
      '- **backdrop-filter** (`blur(16px)`): Blurs whatever scrolls under it.',
      '- **Translucent background** (`rgb(255 255 255 / 0.7)` in light mode, `rgb(20 20 20 / 0.7)` in dark mode): ' +
        'A see-through fill, so the page shows through.',
      '',
      'Behavior:',
      '',
      '- **position: sticky** (`top: 0`): Stays put while the page scrolls.',
      '- **Hides on scroll down**: Slides away to give the content room.',
      '',
      '**Note:** Use our own logo on the left',
      '',
      '## Acceptance criteria',
      '',
      '- [ ] Navbar · **position: sticky** (`top: 0`): Stays put while the page scrolls.',
      '- [ ] Navbar · **Hides on scroll down**: Slides away to give the content room.',
      '- [ ] Navbar: Use our own logo on the left',
      '- [ ] Light and dark mode each use the colors given for them above.',
      '',
    ].join('\n');

    expect(markdown.slice(0, head.length)).toBe(head);
    expect(markdown.slice(-tail.length)).toBe(tail);
  });

  it('numbers the elements in order and leaves out what a brief does not have', () => {
    const markdown = briefToMarkdown('   ', [resolved(logo), resolved(navbar)]);

    expect(markdown).not.toContain('## Goal');
    expect(markdown).toContain(
      '### 1. Logo\n\nThe brand mark in the corner.\n\nLook:\n\n- **Wordmark** (`#171717`): The name.\n',
    );
    expect(markdown).toContain('### 2. Navbar (`<nav>`)');
    expect(markdown).not.toContain('**Note:**');
  });

  it('has no acceptance criteria when no element behaves and there are no notes', () => {
    const markdown = briefToMarkdown('A logo', [resolved(logo)]);

    expect(markdown).not.toContain('## Acceptance criteria');
    expect(markdown).not.toContain('Light and dark mode');
  });
});
