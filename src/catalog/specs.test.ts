import { describe, expect, it } from 'vitest';
import { LIBRARY } from '../library';
import { acme, muse, orbit, stride, wave } from '../library/showcase';
import { acmeSlopSpecs, museSlopSpecs, orbitSlopSpecs, showcaseSpecs, strideSlopSpecs, waveSlopSpecs } from '.';
import type { UiElementSpec } from '.';

/** Every list of element descriptions: each library example's, the landing page's shared one and the AI slop sides'. */
const LISTS: [string, readonly UiElementSpec[]][] = [
  ...LIBRARY.map((example): [string, readonly UiElementSpec[]] => [`${example.platform}/${example.id}`, example.specs]),
  ['showcaseSpecs', showcaseSpecs],
  ['acmeSlopSpecs', acmeSlopSpecs],
  ['orbitSlopSpecs', orbitSlopSpecs],
  ['waveSlopSpecs', waveSlopSpecs],
  ['museSlopSpecs', museSlopSpecs],
  ['strideSlopSpecs', strideSlopSpecs],
];

function duplicates(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

describe.each(LISTS)('%s', (_, specs) => {
  it('gives every element its own id', () => {
    expect(duplicates(specs.map((spec) => spec.id))).toEqual([]);
  });

  describe.each(specs.map((spec) => [spec.id, spec] as const))('%s', (_, spec) => {
    it('has a name, a summary and a list of everyday names', () => {
      expect.soft(spec.id.trim(), 'id').not.toBe('');
      expect.soft(spec.name.trim(), 'name').not.toBe('');
      expect.soft(spec.summary.trim(), 'summary').not.toBe('');
      expect(Array.isArray(spec.aliases), 'aliases').toBe(true);
      // The balloon and the glossary key their lists on these, so a repeat would be a React key clash
      expect.soft(duplicates(spec.aliases), 'repeated aliases').toEqual([]);
      expect.soft(duplicates(spec.concepts.map((concept) => concept.term)), 'repeated terms').toEqual([]);
    });

    it('explains every concept with its kind, its term and plain words', () => {
      for (const [index, concept] of spec.concepts.entries()) {
        const where = `concept ${index + 1} (${concept.term || 'no term'})`;
        expect.soft(['appearance', 'behavior'], `${where}: kind`).toContain(concept.kind);
        expect.soft(concept.term.trim(), `${where}: term`).not.toBe('');
        expect.soft(concept.plain.trim(), `${where}: plain explanation`).not.toBe('');
        if (typeof concept.value === 'object') {
          // A value that differs by theme needs both
          expect.soft(concept.value.light?.trim(), `${where}: light value`).toBeTruthy();
          expect.soft(concept.value.dark?.trim(), `${where}: dark value`).toBeTruthy();
        } else if (concept.value !== undefined) {
          expect.soft(concept.value.trim(), `${where}: value`).not.toBe('');
        }
      }
    });
  });
});

describe('the landing page examples', () => {
  // Each of the five shows a subset of the shared list; together they should show all of it
  it('use every element in the shared list', () => {
    const used = new Set([wave, muse, stride, acme, orbit].flatMap((example) => example.specs.map((spec) => spec.id)));
    expect(showcaseSpecs.map((spec) => spec.id).filter((id) => !used.has(id))).toEqual([]);
  });
});
