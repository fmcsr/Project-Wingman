import { useEffect, useState } from 'react';
import { useInspectActivity } from '../inspector/InspectActivity';
import { StatusBar } from './StatusBar';
import styles from './MuseApp.module.css';

const MODELS = [
  { name: 'Muse 2', detail: 'Smart and fast', selected: true },
  { name: 'Muse 2 Pro', detail: 'Deeper reasoning' },
  { name: 'Muse Mini', detail: 'Quick answers' },
];

const SUGGESTIONS = ['Summarize my notes', 'Draft a PRD', "Explain like I'm new"];

/** Boştayken menünün kendi kendine açılıp kapanma aralığı. */
const MENU_CYCLE_MS = 2600;

/**
 * Örnek proje [04]: Liquid Glass tasarım diliyle bir yapay zekâ asistanı. Model seçici menü boştayken
 * kendi kendine açılıp kapanır; örnek incelenirken açık kalır ki menünün kendisi de incelenebilsin.
 */
export function MuseApp() {
  const exploring = useInspectActivity();
  const [cycleOpen, setCycleOpen] = useState(false);

  useEffect(() => {
    if (exploring) return;
    // Hareketi azaltma açıksa menü açık ve sabit durur
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCycleOpen(true);
      return;
    }
    const timer = window.setInterval(() => setCycleOpen((open) => !open), MENU_CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [exploring]);

  const menuOpen = exploring || cycleOpen;

  return (
    <div className={styles.app}>
      <StatusBar className={styles.statusBar} />

      <header className={styles.navbar} data-inspect="liquid-glass-navbar">
        <span className={styles.iconButton} data-inspect="icon-button">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M4 8h16M4 16h10" />
          </svg>
        </span>
        <span className={styles.picker} data-inspect="menu-button" data-open={menuOpen || undefined}>
          Muse 2
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <span className={styles.iconButton} data-inspect="icon-button">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
          </svg>
        </span>
      </header>

      <div className={styles.menu} data-inspect="dropdown-menu" data-open={menuOpen || undefined}>
        {MODELS.map((model) => (
          <div key={model.name} className={model.selected ? styles.menuItemSelected : styles.menuItem}>
            <span>
              <span className={styles.menuName}>{model.name}</span>
              <span className={styles.menuDetail}>{model.detail}</span>
            </span>
            {model.selected && (
              <svg className={styles.check} viewBox="0 0 24 24" width="16" height="16">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className={styles.chat}>
        <p className={styles.received} data-inspect="chat-bubble">
          Hi! What are we building today?
        </p>
        <p className={styles.sent} data-inspect="chat-bubble">
          Turn my meeting notes into a one-page PRD
        </p>
        <p className={styles.received} data-inspect="chat-bubble">
          On it. Drafting goals, user stories, and acceptance criteria.
        </p>
        <span className={styles.typing} data-inspect="typing-indicator">
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className={styles.suggestions} data-inspect="suggestion-chips">
        {SUGGESTIONS.map((suggestion) => (
          <span key={suggestion} className={styles.suggestion}>
            {suggestion}
          </span>
        ))}
      </div>

      <div className={styles.composer} data-inspect="composer">
        <span className={styles.plus}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span className={styles.placeholder}>Ask Muse anything…</span>
        <span className={styles.voice} data-inspect="voice-button">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3" />
          </svg>
        </span>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
