import { useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { RevealContext } from '../inspector/Reveal';
import styles from './PhoneFrame.module.css';

/**
 * Phone frame that showcases the mobile examples: thin bezel, rounded screen and camera island.
 * Designed at a fixed size; scaled down as a whole via `--phone-scale` on the container.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  const slotRef = useRef<HTMLDivElement>(null);
  // The screen never scrolls: keyboard selection brings the whole phone into view instead of shifting its content
  const reveal = useCallback(() => slotRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' }), []);

  return (
    <div ref={slotRef} className={styles.slot}>
      <div className={styles.phone}>
        <div className={styles.screen}>
          <RevealContext value={reveal}>{children}</RevealContext>
          <span className={styles.island} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
