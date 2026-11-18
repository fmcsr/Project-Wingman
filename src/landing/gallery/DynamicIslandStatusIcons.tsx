import styles from './DynamicIslandStatusIcons.module.css';

/**
 * The right side of an iPhone's status bar: cellular signal, Wi-Fi and battery, in the color of the text around
 * them. Both iPhone screens in the gallery (the Dynamic Island and the bottom sheet) place them beside the island.
 */
export function StatusIcons({ className }: { className: string }) {
  return (
    <span className={`${styles.icons} ${className}`}>
      <svg className={styles.signal} viewBox="0 0 17 11" aria-hidden="true">
        <rect x="0" y="7" width="3" height="4" rx="0.9" />
        <rect x="4.6" y="4.8" width="3" height="6.2" rx="0.9" />
        <rect x="9.2" y="2.4" width="3" height="8.6" rx="0.9" />
        <rect x="13.8" y="0" width="3" height="11" rx="0.9" />
      </svg>
      <svg className={styles.wifi} viewBox="0 0 16 12" aria-hidden="true">
        <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.1A10 10 0 0 0 8 .6 10 10 0 0 0 .9 3.5L2 4.6a8.4 8.4 0 0 1 6-2.4zm0 3.3c1.4 0 2.6.5 3.6 1.4l1.1-1.1A6.8 6.8 0 0 0 8 3.9a6.8 6.8 0 0 0-4.7 1.9l1.1 1.1c1-.9 2.2-1.4 3.6-1.4zm0 3.3c.5 0 1 .2 1.3.5L8 10.6 6.7 9.3c.3-.3.8-.5 1.3-.5z" />
      </svg>
      <svg className={styles.battery} viewBox="0 0 27 13" aria-hidden="true">
        <rect className={styles.case} x="0.5" y="0.5" width="23" height="12" rx="3.8" />
        <rect x="2" y="2" width="16.5" height="9" rx="2.4" />
        <path className={styles.cap} d="M25 4.4v4.2a2.3 2.3 0 0 0 0-4.2z" />
      </svg>
    </span>
  );
}
