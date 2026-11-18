import { acme, muse, orbit, stride, wave } from './showcase';
import type { LibraryExample, Platform } from './types';

function isExample(value: unknown): value is LibraryExample {
  return typeof value === 'object' && value !== null && 'platform' in value && 'specs' in value && 'Component' in value;
}

/** Every example folder (src/library/<platform>/<id>/index.ts) registers itself; no list to keep up to date. */
const discovered = Object.values(import.meta.glob('./*/*/index.ts', { eager: true }))
  .flatMap((module) => Object.values(module as Record<string, unknown>))
  .filter(isExample)
  .sort((a, b) => a.name.localeCompare(b.name));

/** Every example, in the order the library shows them: the landing page's five first. */
export const LIBRARY: LibraryExample[] = [wave, muse, stride, acme, orbit, ...discovered];

/** The library's tabs, in order: each platform with the label it goes by. */
export const PLATFORMS: { platform: Platform; label: string }[] = [
  { platform: 'mobile', label: 'Mobile' },
  { platform: 'web', label: 'Web' },
  { platform: 'watch', label: 'Watch' },
];

/** Whether a URL segment or a saved value names a platform. */
export function isPlatform(value: unknown): value is Platform {
  return PLATFORMS.some((entry) => entry.platform === value);
}

/** The platform's name on its tab and its pages, e.g. "Watch". */
export function platformLabel(platform: Platform) {
  return PLATFORMS.find((entry) => entry.platform === platform)?.label ?? platform;
}

export function examplesFor(platform: Platform) {
  return LIBRARY.filter((example) => example.platform === platform);
}

export function findExample(platform: Platform, id: string) {
  return LIBRARY.find((example) => example.platform === platform && example.id === id);
}

/** A search matches the example's name, kind, category or inspirations, or any element's name, aliases or terms. */
export function matchesQuery(example: LibraryExample, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    example.name,
    example.kind,
    example.category,
    ...example.inspiredBy,
    ...example.specs.flatMap((spec) => [spec.name, spec.variant ?? '', ...spec.aliases, ...spec.concepts.map((c) => c.term)]),
  ];
  return haystack.some((text) => text.toLowerCase().includes(needle));
}

export type { Category, LibraryExample, Platform } from './types';
