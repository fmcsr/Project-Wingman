import type { BrowserContext, Page } from '@playwright/test';
// TODO(before launch): sign in another way once the dev account is gone (README → Before going live)
import { DEV_ACCOUNT, devAccountUser } from '../src/auth/devAccount';

/** Each example: one focusable region whose content (the demo itself) is a picture, hidden from screen readers. */
export const SURFACE = '[aria-label$="interactive example"]';

/** Anything that could take keyboard focus. Demos use `<a>` without href and `<span>` instead. */
const FOCUSABLE = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Signs in the way the app remembers a session: the user under `pw-session` in localStorage, written before the
 * page loads. The user is the one the dev account signs in as.
 */
export async function signIn(context: BrowserContext) {
  const user = devAccountUser(DEV_ACCOUNT.identifier, DEV_ACCOUNT.password);
  if (!user) throw new Error('The dev account no longer signs in');
  await context.addInitScript((value) => localStorage.setItem('pw-session', value), JSON.stringify(user));
}

/** Collects console errors and uncaught exceptions; read it after the page has settled. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`page error: ${error.message}`));
  return errors;
}

/** Waits until the page stops changing on its own: web fonts in, every image loaded (or failed). */
export async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await page.waitForFunction(() => [...document.images].every((image) => image.complete));
}

/** How far the page scrolls sideways, in pixels; 0 when nothing sticks out. */
export function horizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

/** Focusable elements and scroll containers inside the demos, described so a failure says where they are. */
export function demoProblems(page: Page) {
  return page.evaluate(
    ({ surface, focusable }) => {
      const describe = (element: Element) => {
        const className = typeof element.className === 'string' ? element.className.split(' ')[0] : '';
        const tag = `<${element.tagName.toLowerCase()}${className ? ` class="${className}"` : ''}>`;
        const inspect = element.closest('[data-inspect]')?.getAttribute('data-inspect');
        return inspect ? `${tag} in ${inspect}` : tag;
      };
      const problems: string[] = [];
      for (const example of document.querySelectorAll(surface)) {
        const label = example.getAttribute('aria-label');
        for (const content of example.querySelectorAll(':scope > [aria-hidden="true"]')) {
          for (const element of [content, ...content.querySelectorAll('*')]) {
            if (element.matches(focusable)) problems.push(`${label}: focusable ${describe(element)}`);
            const { overflowX, overflowY } = getComputedStyle(element);
            if ([overflowX, overflowY].some((value) => value === 'auto' || value === 'scroll')) {
              problems.push(`${label}: scroll container ${describe(element)} (overflow ${overflowX} ${overflowY})`);
            }
          }
        }
      }
      return problems;
    },
    { surface: SURFACE, focusable: FOCUSABLE },
  );
}

/**
 * Per example on the page: the section it's in, every `data-inspect` id in it, and the ones on screen (laid out, not
 * display: none).
 */
export function inspectIds(page: Page) {
  return page.evaluate((surface) => {
    return [...document.querySelectorAll(surface)].map((example) => {
      const elements = [...example.querySelectorAll('[data-inspect]')];
      const ids = (list: Element[]) => [...new Set(list.map((element) => element.getAttribute('data-inspect') ?? ''))];
      return {
        label: example.getAttribute('aria-label') ?? '',
        section: example.closest('section[id]')?.id ?? '',
        all: ids(elements),
        shown: ids(elements.filter((element) => element.getClientRects().length > 0)),
      };
    });
  }, SURFACE);
}
