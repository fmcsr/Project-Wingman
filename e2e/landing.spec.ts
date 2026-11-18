import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
  acmeSlopSpecs,
  museSlopSpecs,
  orbitSlopSpecs,
  showcaseSpecs,
  strideSlopSpecs,
  waveSlopSpecs,
} from '../src/catalog';
import type { UiElementSpec } from '../src/catalog';
import { demoProblems, horizontalOverflow, inspectIds, settle, SURFACE, trackErrors } from './checks';

const WIDTHS = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
];

/**
 * The element gallery's tiles (src/landing/gallery/tiles.ts), each an example of its own, in the examples' With
 * Wingman tab. They're library elements, so the library's test checks their descriptions, on each element's page.
 */
const GALLERY_TILES = 15;

/** The comparisons, in the Without Wingman tab: both sides of two sites and three phones. */
const COMPARISON_SIDES = 10;

/** Opens one of the examples' tabs; With Wingman is open when the page loads. */
async function openTab(page: Page, name: 'With Wingman' | 'Without Wingman') {
  const tab = page.getByRole('tab', { name, exact: true });
  await tab.click();
  await expect(tab).toHaveAttribute('aria-selected', 'true');
}

/** The AI slop side of each comparison has its own descriptions; the Wingman sides share showcaseSpecs. */
const SLOP_SPECS: Record<string, readonly UiElementSpec[]> = {
  'Acme marketing site': acmeSlopSpecs,
  'Orbit analytics dashboard': orbitSlopSpecs,
  'Wave habit tracker': waveSlopSpecs,
  'Muse AI assistant': museSlopSpecs,
  'Stride shopping app': strideSlopSpecs,
};

/** The descriptions a comparison side draws on. */
function specsFor(label: string) {
  const slop = /^(.+), AI slop version, interactive example$/.exec(label);
  if (!slop) return showcaseSpecs;
  const specs = SLOP_SPECS[slop[1]];
  if (!specs) throw new Error(`No AI slop descriptions for "${label}"`);
  return specs;
}

// Motion stays on here, as most visitors see the page: the demos' moving parts are rendered and checked too
test.describe('landing page', () => {
  for (const viewport of WIDTHS) {
    test(`shows both tabs of examples without errors at ${viewport.width} px`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.setViewportSize(viewport);
      await page.goto('/');
      await settle(page);

      await expect(page.locator(`#examples ${SURFACE}`)).toHaveCount(GALLERY_TILES);
      expect.soft(await demoProblems(page), 'With Wingman').toEqual([]);
      expect.soft(await horizontalOverflow(page), 'With Wingman: sideways scroll').toBe(0);

      await openTab(page, 'Without Wingman');
      await settle(page);
      await expect(page.locator(`#examples ${SURFACE}`)).toHaveCount(COMPARISON_SIDES);
      expect.soft(await demoProblems(page), 'Without Wingman').toEqual([]);
      expect.soft(await horizontalOverflow(page), 'Without Wingman: sideways scroll').toBe(0);
      for (const { label, all } of await inspectIds(page)) {
        const known = new Set(specsFor(label).map((spec) => spec.id));
        const undescribed = all.filter((id) => !known.has(id));
        expect.soft(undescribed, `${label}: elements without a description`).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  }

  test('shows every AI slop description at one of the two widths', async ({ page }) => {
    const shown = new Map<string, Set<string>>();
    for (const viewport of WIDTHS) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await openTab(page, 'Without Wingman');
      await settle(page);
      for (const { label, shown: ids } of await inspectIds(page)) {
        shown.set(label, new Set([...(shown.get(label) ?? []), ...ids]));
      }
    }
    for (const [name, specs] of Object.entries(SLOP_SPECS)) {
      const ids = shown.get(`${name}, AI slop version, interactive example`) ?? new Set();
      const neverShown = specs.map((spec) => spec.id).filter((id) => !ids.has(id));
      expect.soft(neverShown, `${name}, AI slop version: descriptions never shown`).toEqual([]);
    }
  });

  test('switches between the tabs with the keyboard', async ({ page }) => {
    await page.goto('/');
    const withTab = page.getByRole('tab', { name: 'With Wingman', exact: true });
    const withoutTab = page.getByRole('tab', { name: 'Without Wingman', exact: true });
    const panel = page.getByRole('tabpanel');

    await withTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(withoutTab).toBeFocused();
    await expect(withoutTab).toHaveAttribute('aria-selected', 'true');
    await expect(panel.getByRole('slider')).toHaveCount(5);

    await page.keyboard.press('Home');
    await expect(withTab).toBeFocused();
    await expect(withTab).toHaveAttribute('aria-selected', 'true');
    await expect(panel.locator(SURFACE)).toHaveCount(GALLERY_TILES);
  });
});

test.describe('landing page, with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('moves each comparison line with the keyboard', async ({ page }) => {
    await page.goto('/');
    await openTab(page, 'Without Wingman');
    const sliders = page.getByRole('slider');
    await expect(sliders).toHaveCount(5);

    for (const slider of await sliders.all()) {
      const start = Number(await slider.getAttribute('aria-valuenow'));
      await slider.press('ArrowRight');
      await expect.poll(async () => Number(await slider.getAttribute('aria-valuenow'))).toBeGreaterThan(start);
      await slider.press('Home');
      await expect(slider).toHaveAttribute('aria-valuenow', '0');
      await slider.press('End');
      await expect(slider).toHaveAttribute('aria-valuenow', '100');
    }
  });

  // The comparison scrolls as far as the Wingman side goes, so a taller AI slop page would be cut off
  for (const width of [390, 768, 1024, 1440]) {
    test(`keeps each AI slop site within its Wingman site at ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await openTab(page, 'Without Wingman');
      await settle(page);

      const sites = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('#examples [class*="layers"]')]
          .filter((layers) => layers.parentElement?.matches('[class*="viewport"]'))
          .map((layers) => {
            const wingman = layers.querySelector<HTMLElement>(':scope > [class*="after"]');
            const slop = layers.querySelector<HTMLElement>(':scope > [class*="before"] [class*="content"] > *');
            if (!wingman || !slop) return { label: 'a site comparison is missing a side', wingman: 0, slop: Infinity };
            // The slop page is stretched to the Wingman side's height (min-height: 100%), so measure it without that.
            // Reduced motion turns every style change into a 0.01 ms transition, so switch transitions off meanwhile
            const style = slop.style.cssText;
            slop.style.setProperty('transition', 'none', 'important');
            slop.style.setProperty('min-height', '0', 'important');
            const slopHeight = slop.getBoundingClientRect().height;
            slop.style.removeProperty('min-height');
            slop.getBoundingClientRect();
            slop.style.cssText = style;
            const name = wingman.querySelector('[aria-label]')?.getAttribute('aria-label')?.split(',')[0] ?? 'A site';
            return {
              label: `${name}: the AI slop page's height (at most the Wingman page's + 2 px)`,
              wingman: wingman.getBoundingClientRect().height,
              slop: slopHeight,
            };
          }),
      );

      expect(sites).toHaveLength(2);
      for (const site of sites) {
        expect.soft(site.slop, site.label).toBeGreaterThan(0);
        expect.soft(site.slop, site.label).toBeLessThanOrEqual(site.wingman + 2);
      }
    });
  }

  test('names an element on hover, explains it after a dwell and pins it on click', async ({ page }) => {
    const ring = showcaseSpecs.find((spec) => spec.id === 'progress-ring');
    if (!ring) throw new Error('Wave has no progress ring description');
    await page.goto('/');
    await openTab(page, 'Without Wingman');
    // Move Wave's comparison line to the left edge, so the whole phone shows the Wingman version
    await page
      .getByRole('slider', { name: 'Compare the AI slop and Wingman versions of Wave habit tracker' })
      .press('Home');
    const element = page
      .getByLabel('Wave habit tracker, interactive example', { exact: true })
      .locator('[data-inspect="progress-ring"]');
    const nameTag = page.locator('[class*="nameTag"]');
    const balloon = page.locator('section[data-mode]').filter({ hasText: ring.name });

    // The name shows at once, while the balloon still waits for the two-second dwell
    await element.hover();
    await expect(nameTag).toHaveText(ring.name);
    await expect(nameTag).toBeVisible();
    await expect(balloon).toBeHidden();

    await expect(balloon).toHaveAttribute('data-mode', 'preview', { timeout: 4000 });
    await expect(balloon).toBeVisible();

    await element.click();
    await expect(balloon).toHaveAttribute('data-mode', 'pinned');
    await expect(balloon).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(balloon).toBeHidden();
  });
});
