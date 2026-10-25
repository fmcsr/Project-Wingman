import { setTheme, useTheme } from '../theme';
import styles from './ThemeToggle.module.css';

/** Açık/koyu tema düğmesi. İlk açılışta sistem ayarını izler; seçim yapılınca onu hatırlar. */
export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button type="button" className={styles.toggle} onClick={() => setTheme(next)} aria-label={`Switch to ${next} mode`}>
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
