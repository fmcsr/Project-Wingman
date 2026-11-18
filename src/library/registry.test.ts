import { describe, expect, it } from 'vitest';
import { isPlatform, LIBRARY } from '.';
import type { Category, LibraryExample } from '.';

/** Every category, checked against the type: adding one to `Category` without listing it here fails the type check. */
const CATEGORIES: Record<Category, true> = {
  AI: true,
  Analytics: true,
  Commerce: true,
  Communication: true,
  Data: true,
  Design: true,
  Developer: true,
  Education: true,
  Finance: true,
  Food: true,
  Health: true,
  iOS: true,
  Marketing: true,
  Media: true,
  'Micro-interactions': true,
  Productivity: true,
  Social: true,
  Travel: true,
};

/** The folders the library discovers, with the examples each one exports. */
const folders = Object.entries(import.meta.glob<Record<string, unknown>>('./*/*/index.ts', { eager: true }));

const label = (example: LibraryExample) => `${example.platform}/${example.id}`;

describe('library registry', () => {
  it('registers each example folder once, under its own platform and id', () => {
    expect(folders.length).toBeGreaterThan(0);
    for (const [path, module] of folders) {
      const registered = LIBRARY.filter((example) => Object.values(module).includes(example));
      expect(registered.map((example) => `./${label(example)}/index.ts`), path).toEqual([path]);
    }
  });

  it('has one example per platform and id', () => {
    const keys = LIBRARY.map(label);
    expect(keys.filter((key, index) => keys.indexOf(key) !== index)).toEqual([]);
  });

  describe.each(LIBRARY.map((example) => [label(example), example] as const))('%s', (_, example) => {
    it('has a URL-safe id, a valid platform and a valid category', () => {
      expect(example.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(isPlatform(example.platform)).toBe(true);
      expect(Object.keys(CATEGORIES)).toContain(example.category);
    });

    it('has a name, a kind, a description and what inspired it', () => {
      expect(example.name.trim()).not.toBe('');
      expect(example.kind.trim()).not.toBe('');
      expect(example.description.trim()).not.toBe('');
      expect(example.inspiredBy.length).toBeGreaterThan(0);
      for (const product of example.inspiredBy) expect(product.trim()).not.toBe('');
    });

    it('has a demo and descriptions of its elements', () => {
      expect(typeof example.Component).toBe('function');
      expect(example.specs.length).toBeGreaterThan(0);
    });
  });

  it('gives every element a tile size, and only elements', () => {
    const elements = LIBRARY.filter((example) => example.platform === 'elements');
    expect(elements.length).toBeGreaterThan(0);
    expect(elements.filter((element) => !element.size).map(label)).toEqual([]);
    expect(LIBRARY.filter((example) => example.platform !== 'elements' && example.size).map(label)).toEqual([]);
  });

  it('gives every site a domain for the address bar', () => {
    const sites = LIBRARY.filter((example) => example.platform === 'web');
    expect(sites.length).toBeGreaterThan(0);
    expect(sites.filter((site) => !site.url?.trim()).map(label)).toEqual([]);
  });
});
