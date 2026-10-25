import styles from './StatusBar.module.css';

/** Mobil demoların ortak durum çubuğu: saat, sinyal, Wi-Fi, pil. Rengi kapsayıcısından alır. */
export function StatusBar({ className }: { className?: string }) {
  return (
    <div className={className ? `${styles.statusBar} ${className}` : styles.statusBar} data-inspect="status-bar">
      <span>9:41</span>
      <span className={styles.icons}>
        <svg className={styles.signal} viewBox="0 0 18 12" width="18" height="12">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg className={styles.wifi} viewBox="0 0 16 12" width="16" height="12">
          <path d="M1.5 4.2a9.5 9.5 0 0 1 13 0M4 7a6 6 0 0 1 8 0M6.6 9.7a2.4 2.4 0 0 1 2.8 0" />
        </svg>
        <svg className={styles.battery} viewBox="0 0 27 13" width="27" height="13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" />
          <rect className={styles.level} x="2.5" y="2.5" width="16" height="8" rx="2" />
          <path d="M25 4.5v4" />
        </svg>
      </span>
    </div>
  );
}
