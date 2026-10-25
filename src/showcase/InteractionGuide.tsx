import type { ReactNode } from 'react';
import styles from './InteractionGuide.module.css';

function MouseIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="3" width="12" height="18" rx="6" />
      <path d="M12 7v4" />
    </svg>
  );
}

function TouchIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <path d="M7 10h.01M11 10h.01M15 10h.01M8 14h8" />
    </svg>
  );
}

const ITEMS: { label: string; icon: () => ReactNode; text: ReactNode }[] = [
  { label: 'Mouse', icon: MouseIcon, text: 'Hover to name it · Click for details' },
  { label: 'Touch', icon: TouchIcon, text: 'Tap for details · Tap outside to close' },
  {
    label: 'Keyboard',
    icon: KeyboardIcon,
    text: (
      <>
        <kbd>Tab</kbd> into an example · Arrows to move · <kbd>Enter</kbd> details · <kbd>Esc</kbd> close
      </>
    ),
  },
];

/** Short guide to the inputs the examples can be inspected with. */
export function InteractionGuide() {
  return (
    <ul className={styles.guide} aria-label="Ways to explore">
      {ITEMS.map(({ label, icon: Icon, text }) => (
        <li key={label} className={styles.item}>
          <Icon />
          <span>
            <strong>{label}</strong> {text}
          </span>
        </li>
      ))}
    </ul>
  );
}
