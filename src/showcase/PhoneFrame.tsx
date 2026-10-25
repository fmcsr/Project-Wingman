import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

/**
 * Phone frame that showcases the mobile examples: thin bezel, rounded screen and camera island.
 * Designed at a fixed size; scaled down as a whole via `--phone-scale` on the container.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.slot}>
      <div className={styles.phone}>
        <div className={styles.screen}>
          {children}
          <span className={styles.island} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
