import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { demoProblems, horizontalOverflow, inspectIds, settle, signIn, trackErrors } from './checks';

const WIDTHS = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
];

/** React's useId prefix on the glossary's heading ids, e.g. "_r_1_" in "_r_1_status-bar". */
const USE_ID_PREFIX = /^(?:_r_[0-9a-z]+_|«r[0-9a-z]+»|:r[0-9a-z]+:)/;

/** The spec ids the example page's glossary describes, in order. */
async function glossaryIds(page: Page) {
  const ids = await page
    .locator('section[aria-labelledby="glossary-title"] h3[id]')
    .evaluateAll((headings) => headings.map((heading) => heading.id));
  return ids.map((id) => {
    if (!USE_ID_PREFIX.test(id)) throw new Error(`Glossary heading id "${id}" doesn't start with React's useId prefix`);
    return id.replace(USE_ID_PREFIX, '');
  });
}

// Reduced motion: the demos show their finished state, so the elements on screen don't depend on timing
test.use({ reducedMotion: 'reduce' });
// Each test walks through a whole tab, two page loads per example
test.describe.configure({ timeout: 3 * 60_000 });

test.beforeEach(async ({ context }) => {
  await signIn(context);
});

for (const platform of ['mobile', 'web', 'watch', 'elements']) {
  test(`the ${platform} tab and each of its examples' pages`, async ({ page }) => {
    const errors = trackErrors(page);

    /** Opens a page at each width, runs `inspect`, then checks what every page must get right. */
    async function visit(path: string, ready: Locator, inspect: (where: string) => Promise<void>) {
      for (const viewport of WIDTHS) {
        const where = `${path} at ${viewport.width} px`;
        await page.setViewportSize(viewport);
        errors.length = 0;
        await page.goto(path);
        await expect(ready).toBeVisible();
        await settle(page);
        await inspect(where);
        expect.soft(await demoProblems(page), where).toEqual([]);
        expect.soft(await horizontalOverflow(page), `${where}: sideways scroll`).toBe(0);
        expect.soft(errors, where).toEqual([]);
      }
    }

    // The first visit has the dev server compile the whole library
    const tab = `/app/${platform}`;
    const heading = page.getByRole('heading', { level: 1 });
    await page.goto(tab);
    await expect(heading).toBeVisible({ timeout: 30_000 });
    const links = await page
      .locator(`a[href^="${tab}/"]`)
      .evaluateAll((anchors) => [...new Set(anchors.map((anchor) => anchor.getAttribute('href') ?? ''))]);
    expect(links.length).toBeGreaterThan(0);

    await test.step(tab, () => visit(tab, heading, async () => {}));

    for (const href of links) {
      await test.step(href, async () => {
        const shown = new Set<string>();
        let described: string[] = [];

        await visit(href, page.locator('section[aria-labelledby="glossary-title"]'), async (where) => {
          described = await glossaryIds(page);
          const examples = await inspectIds(page);
          expect.soft(examples, `${where}: one example`).toHaveLength(1);
          const undescribed = examples.flatMap((example) => example.all).filter((id) => !described.includes(id));
          expect.soft(undescribed, `${where}: elements without a description`).toEqual([]);
          for (const id of examples.flatMap((example) => example.shown)) shown.add(id);
        });

        const neverShown = described.filter((id) => !shown.has(id));
        expect.soft(neverShown, `${href}: descriptions never shown at either width`).toEqual([]);
      });
    }
  });
}
