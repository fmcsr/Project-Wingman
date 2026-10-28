import { useMemo, useSyncExternalStore } from 'react';
import type { UiElementSpec } from '../catalog';
import { findExample } from '../library';
import type { LibraryExample, Platform } from '../library';

/** Points at one element of one example. The same element can appear in several examples with different values. */
export type ElementRef = {
  platform: Platform;
  exampleId: string;
  /** The element's `data-inspect` id in that example. */
  specId: string;
};

/** An element in the brief, with the user's own words on what should differ from the example. */
export type BriefItem = ElementRef & { note: string };

/** The brief being put together: what the user is building, and the elements they picked, in order. */
export type Brief = { goal: string; items: BriefItem[] };

/** An item with the example and the description it points at. */
export type ResolvedItem = { key: string; item: BriefItem; example: LibraryExample; spec: UiElementSpec };

/** The brief is kept in this browser under this key; there's no backend yet. */
const BRIEF_KEY = 'pw-brief';
const EMPTY: Brief = { goal: '', items: [] };
const listeners = new Set<() => void>();

function isItem(value: unknown): value is BriefItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    (item.platform === 'mobile' || item.platform === 'web') &&
    typeof item.exampleId === 'string' &&
    typeof item.specId === 'string' &&
    typeof item.note === 'string'
  );
}

function readBrief(): Brief {
  try {
    const raw = localStorage.getItem(BRIEF_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Brief>) : null;
    if (!parsed || !Array.isArray(parsed.items)) return EMPTY;
    return { goal: typeof parsed.goal === 'string' ? parsed.goal : '', items: parsed.items.filter(isItem) };
  } catch {
    return EMPTY;
  }
}

let current = readBrief();

function setBrief(next: Brief) {
  current = next;
  try {
    localStorage.setItem(BRIEF_KEY, JSON.stringify(next));
  } catch {
    // Storage may be disabled in a private window; the brief then lasts until the tab closes
  }
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Adding an element in another tab updates this one too
  const onStorage = (event: StorageEvent) => {
    if (event.key !== BRIEF_KEY) return;
    current = readBrief();
    callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}

export function useBrief() {
  return useSyncExternalStore(subscribe, () => current, () => EMPTY);
}

export function itemKey(ref: ElementRef) {
  return `${ref.platform}/${ref.exampleId}/${ref.specId}`;
}

/**
 * The brief's items with their examples and descriptions. Items whose example or element no longer exists
 * (renamed in a later version) are left out.
 */
export function useBriefItems() {
  const { items } = useBrief();
  return useMemo(
    () =>
      items.flatMap((item): ResolvedItem[] => {
        const example = findExample(item.platform, item.exampleId);
        const spec = example?.specs.find((candidate) => candidate.id === item.specId);
        return example && spec ? [{ key: itemKey(item), item, example, spec }] : [];
      }),
    [items],
  );
}

export function isInBrief(brief: Brief, ref: ElementRef) {
  const key = itemKey(ref);
  return brief.items.some((item) => itemKey(item) === key);
}

/** Adds the element to the end of the brief, or takes it out if it's already there. */
export function toggleInBrief(ref: ElementRef) {
  const { platform, exampleId, specId } = ref;
  setBrief(
    isInBrief(current, ref)
      ? { ...current, items: current.items.filter((item) => itemKey(item) !== itemKey(ref)) }
      : { ...current, items: [...current.items, { platform, exampleId, specId, note: '' }] },
  );
}

export function removeFromBrief(key: string) {
  setBrief({ ...current, items: current.items.filter((item) => itemKey(item) !== key) });
}

/** Moves an item one place up (-1) or down (1). */
export function moveInBrief(key: string, offset: -1 | 1) {
  const items = [...current.items];
  const from = items.findIndex((item) => itemKey(item) === key);
  const to = from + offset;
  if (from < 0 || to < 0 || to >= items.length) return;
  [items[from], items[to]] = [items[to], items[from]];
  setBrief({ ...current, items });
}

export function setBriefNote(key: string, note: string) {
  setBrief({ ...current, items: current.items.map((item) => (itemKey(item) === key ? { ...item, note } : item)) });
}

export function setBriefGoal(goal: string) {
  setBrief({ ...current, goal });
}

export function clearBrief() {
  setBrief(EMPTY);
}
