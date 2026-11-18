// @vitest-environment happy-dom
// The store reads localStorage and is read through React hooks, so this test needs a DOM.
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

type Store = typeof import('./briefStore');

const KEY = 'pw-brief';
/** An element that exists: Wave's progress ring (Wave is one of the landing page's examples). */
const RING = { platform: 'mobile', exampleId: 'wave', specId: 'progress-ring', note: '' } as const;

beforeAll(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

beforeEach(() => {
  localStorage.clear();
});

/** The store reads the saved brief once, when it loads, so each test loads it again after saving one. */
async function loadStore(saved?: string): Promise<Store> {
  if (saved !== undefined) localStorage.setItem(KEY, saved);
  vi.resetModules();
  return import('./briefStore');
}

/** What the store's hooks return, read from a component rendered once. */
function readStore(store: Store) {
  let result: { brief: ReturnType<Store['useBrief']>; items: ReturnType<Store['useBriefItems']> } | undefined;
  function Probe() {
    result = { brief: store.useBrief(), items: store.useBriefItems() };
    return null;
  }
  const root = createRoot(document.createElement('div'));
  act(() => root.render(<Probe />));
  act(() => root.unmount());
  if (!result) throw new Error('the probe did not render');
  return result;
}

describe('brief store', () => {
  it('starts empty without a saved brief, or with one it cannot read', async () => {
    expect(readStore(await loadStore()).brief).toEqual({ goal: '', items: [] });
    expect(readStore(await loadStore('{not json')).brief).toEqual({ goal: '', items: [] });
    expect(readStore(await loadStore(JSON.stringify({ goal: 'x', items: 'none' }))).brief).toEqual({
      goal: '',
      items: [],
    });
  });

  it('drops saved items with an unknown platform or a missing field', async () => {
    const saved = {
      goal: 'A habit tracker',
      items: [
        RING,
        { ...RING, platform: 'tablet' },
        { platform: 'mobile', exampleId: 'wave', note: '' },
        { ...RING, note: 42 },
        'progress-ring',
        null,
      ],
    };
    const { brief } = readStore(await loadStore(JSON.stringify(saved)));

    expect(brief).toEqual({ goal: 'A habit tracker', items: [RING] });
  });

  it('leaves out items whose example or element no longer exists', async () => {
    const goneExample = { ...RING, exampleId: 'retired-app' };
    const goneElement = { ...RING, specId: 'retired-element' };
    const { brief, items } = readStore(
      await loadStore(JSON.stringify({ goal: '', items: [goneExample, RING, goneElement] })),
    );

    expect(brief.items).toHaveLength(3);
    expect(items.map(({ key, example, spec }) => [key, example.name, spec.name])).toEqual([
      ['mobile/wave/progress-ring', 'Wave', 'Progress ring'],
    ]);
  });

  it('saves what is added and taken out', async () => {
    const store = await loadStore();
    store.toggleInBrief(RING);
    expect(JSON.parse(localStorage.getItem(KEY) ?? 'null')).toEqual({ goal: '', items: [RING] });

    store.toggleInBrief(RING);
    expect(JSON.parse(localStorage.getItem(KEY) ?? 'null')).toEqual({ goal: '', items: [] });
  });
});
