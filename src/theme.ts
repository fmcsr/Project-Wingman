import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

/** Seçilen tema bu anahtarla saklanır; index.html'deki satır içi betik de aynı anahtarı okur. */
const STORAGE_KEY = 'pw-theme';
const THEME_COLOR: Record<Theme, string> = { light: '#fcfcfc', dark: '#141414' };

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)');

/** Etkin tema: düğmeyle seçilmişse o, seçilmemişse sistem ayarı. */
export function getTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return systemDark().matches ? 'dark' : 'light';
}

/** Temayı uygular ve hatırlar; destekleniyorsa geçişi yumuşak bir çapraz geçişle yapar. */
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
    // Gizli pencerede depolama kapalı olabilir; tema yine bu oturum için uygulanır
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !reducedMotion) document.startViewTransition(apply);
  else apply();
}

/** Tema her değiştiğinde (sistem ayarı ya da düğme) çağrılır; aboneliği bırakan bir fonksiyon döndürür. */
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
