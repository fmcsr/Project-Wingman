import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { PhoneFrame } from './PhoneFrame';
import styles from './FitPhone.module.css';

/** The phone frame's design width (PhoneFrame.module.css). */
const PHONE_WIDTH = 300;
/** Room for the side buttons, which stick out of the frame. */
const SIDE_ROOM = 8;

/** A phone frame that shrinks to fit its container's width, never beyond its actual size. */
export function FitPhone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setScale(Math.min(1, (element.clientWidth - SIDE_ROOM) / PHONE_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.fit} style={{ '--phone-scale': scale } as CSSProperties}>
      <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
}
