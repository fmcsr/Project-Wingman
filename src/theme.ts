import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

/** The chosen theme is stored under this key; the inline script in index.html reads the same key. */
const STORAGE_KEY = 'pw-theme';
const THEME_COLOR: Record<Theme, string> = { light: '#fcfcfc', dark: '#141414' };

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)');

/** The active theme: the one picked with the toggle, otherwise the system setting. */
export function getTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return systemDark().matches ? 'dark' : 'light';
}

/** Applies and remembers the theme; where supported, switches with a smooth cross-fade. */
export function setTheme(theme: Theme) {
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute('content', THEME_COLOR[theme]));
  };
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage may be disabled in a private window; the theme still applies for this session
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !reducedMotion) document.startViewTransition(apply);
  else apply();
}

/** Calls `callback` whenever the theme changes (system setting or toggle); returns an unsubscribe function. */
export function subscribeTheme(callback: () => void) {
  const media = systemDark();
  media.addEventListener('change', callback);
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => {
    media.removeEventListener('change', callback);
    observer.disconnect();
  };
}

export function useTheme() {
  return useSyncExternalStore(subscribeTheme, getTheme, (): Theme => 'light');
}
