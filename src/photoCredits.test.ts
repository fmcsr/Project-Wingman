import { describe, expect, it } from 'vitest';

/*
 * Real photos live in a photos/ folder (each library example's; for the landing page, src/demos/photos/<example>/ and
 * the gallery's src/landing/gallery/photos/<family>/), and every file there is credited in that folder's CREDITS.md:
 * one line per file, "<file>: <Unsplash URL> …, Unsplash License".
 */
const files = Object.keys(import.meta.glob('./**/photos/**/*'));
const credits = import.meta.glob<string>('./**/photos/**/CREDITS.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const folderOf = (path: string) => path.slice(0, path.lastIndexOf('/'));
const nameOf = (path: string) => path.slice(path.lastIndexOf('/') + 1);

/** Each folder that holds photos, with the files in it other than CREDITS.md. */
const folders = new Map<string, string[]>();
for (const path of files) {
  if (nameOf(path) === 'CREDITS.md') continue;
  folders.set(folderOf(path), [...(folders.get(folderOf(path)) ?? []), nameOf(path)]);
}

describe('photo credits', () => {
  it('finds the photo folders', () => {
    expect(folders.size).toBeGreaterThan(0);
  });

  it('keeps CREDITS.md next to photos', () => {
    for (const path of Object.keys(credits)) expect(folders.has(folderOf(path)), path).toBe(true);
  });

  describe.each([...folders].map(([folder, photos]) => [folder, photos] as const))('%s', (folder, photos) => {
    const text = credits[`${folder}/CREDITS.md`] ?? '';
    const lines = text.split('\n').filter((line) => line.trim() !== '');
    const listed = lines.map((line) => /^([^\s:]+):\s/.exec(line)?.[1]);

    it('has a CREDITS.md', () => {
      expect(text.trim(), `${folder}/CREDITS.md`).not.toBe('');
    });

    it('starts every line with the file it credits', () => {
      for (const [index, line] of lines.entries()) expect.soft(listed[index], line).toBeDefined();
    });

    it('credits every photo in the folder', () => {
      expect(photos.filter((photo) => !listed.includes(photo))).toEqual([]);
    });

    it('lists only files that exist, once each', () => {
      expect(listed.filter((name) => name !== undefined && !photos.includes(name))).toEqual([]);
      expect(listed.filter((name, index) => listed.indexOf(name) !== index)).toEqual([]);
    });

    it('names the Unsplash photo and its license on every line', () => {
      for (const line of lines) {
        expect.soft(line).toMatch(/https:\/\/unsplash\.com\/photos\/\S+/);
        expect.soft(line).toContain('Unsplash License');
      }
    });
  });
});
