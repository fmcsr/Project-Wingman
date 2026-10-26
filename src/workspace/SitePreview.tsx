import { useLayoutEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import styles from './SitePreview.module.css';

/** Sites are drawn at a desktop width and scaled down, so the thumbnail shows their desktop layout. */
const DESIGN_WIDTH = 1280;

/** A still, scaled-down picture of a web example for the library grid. It can't be focused or inspected. */
export function SitePreview({ Component }: { Component: ComponentType }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setScale(element.clientWidth / DESIGN_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.preview} aria-hidden="true" inert>
      <div className={styles.page} style={{ transform: `scale(${scale})` }}>
        <Component />
      </div>
    </div>
  );
}
