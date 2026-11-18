import { useCallback, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { RevealContext } from '../inspector/Reveal';
import { CompareHandle, CompareLayers, useCompareSplit } from './Compare';
import styles from './PhoneFrame.module.css';

type PhoneFrameProps = {
  /** An AI slop version of the same app: the screen then compares the two, with a line to drag between them. */
  before?: ReactNode;
  /** What the comparison shows, for screen readers, e.g. "Wave habit tracker". */
  label?: string;
  children: ReactNode;
};

/**
 * Phone frame that showcases the mobile examples: thin bezel, rounded screen and camera island.
 * Designed at a fixed size; scaled down as a whole via `--phone-scale` on the container.
 */
export function PhoneFrame({ before, label = 'this app', children }: PhoneFrameProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  // The screen never scrolls: keyboard selection brings the whole phone into view instead of shifting its content
  const reveal = useCallback(() => slotRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' }), []);
  const compare = useCompareSplit(slotRef, Boolean(before));

  return (
    <div ref={slotRef} className={styles.slot}>
      <div className={styles.phone}>
        <div
          className={styles.screen}
          style={before ? ({ '--split': `${compare.split}%` } as CSSProperties) : undefined}
        >
          <RevealContext value={reveal}>
            {before ? (
              <CompareLayers before={before} fill>
                {children}
              </CompareLayers>
            ) : (
              children
            )}
          </RevealContext>
          {before && (
            <div className={styles.compare}>
              <CompareHandle split={compare.split} onMove={compare.move} label={label} />
            </div>
          )}
          <span className={styles.island} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
