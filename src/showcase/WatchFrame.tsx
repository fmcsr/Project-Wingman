import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { RevealContext } from '../inspector/Reveal';
import styles from './WatchFrame.module.css';

/** The case's design width (WatchFrame.module.css). */
const WATCH_WIDTH = 242;
/** Room for the Digital Crown, which sticks out on the right; kept on both sides so the case stays centered. */
const CROWN_ROOM = 24;

/**
 * Watch frame that showcases the watch examples, in the proportions of a 46 mm Apple Watch Series: a jet black
 * aluminum case, a rounded-rectangle display (208 × 248) behind a black border, the Digital Crown and the side
 * button. Designed at a fixed size; scaled down as a whole via `--watch-scale` on the container.
 */
export function WatchFrame({ children }: { children: ReactNode }) {
  const slotRef = useRef<HTMLDivElement>(null);
  // The screen never scrolls: keyboard selection brings the whole watch into view instead of shifting its content
  const reveal = useCallback(() => slotRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' }), []);

  return (
    <div ref={slotRef} className={styles.slot}>
      <div className={styles.watch}>
        <span className={styles.crown} aria-hidden="true" />
        <span className={styles.sideButton} aria-hidden="true" />
        <div className={styles.case}>
          <div className={styles.glass}>
            <div className={styles.screen}>
              <RevealContext value={reveal}>{children}</RevealContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A watch frame that shrinks to fit its container's width, never beyond its actual size (like FitPhone). */
export function FitWatch({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setScale(Math.min(1, (element.clientWidth - CROWN_ROOM) / WATCH_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.fit} style={{ '--watch-scale': scale } as CSSProperties}>
      <WatchFrame>{children}</WatchFrame>
    </div>
  );
}
