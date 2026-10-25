import { useRef } from 'react';
import type { ReactNode } from 'react';
import { RevealContext } from '../inspector/Reveal';
import { useScrollScene } from './useScrollScene';
import styles from './BrowserFrame.module.css';

type BrowserFrameProps = {
  /** Adres çubuğunda görünen alan adı. */
  url: string;
  /** Pencerenin üstünde, onunla birlikte sabitlenen başlık (proje adı gibi). */
  header?: ReactNode;
  children: ReactNode;
};

/**
 * Web örneklerinin sergilendiği sahte tarayıcı penceresi. İçerik kendi içinde kaydırılmaz: pencere ekrana
 * sabitlenir ve sayfa kaydırıldıkça içindeki site kayar (Apple'ın ürün sayfalarındaki gibi).
 */
export function BrowserFrame({ url, header, children }: BrowserFrameProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const reveal = useScrollScene({
    scene: sceneRef,
    sticky: stickyRef,
    frame: frameRef,
    viewport: viewportRef,
    thumb: thumbRef,
  });

  return (
    <div ref={sceneRef} className={styles.scene}>
      <div ref={stickyRef} className={styles.sticky}>
        {header}
        <div ref={frameRef} className={styles.frame}>
          <div className={styles.chrome} aria-hidden="true">
            <span className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
            <span className={styles.address}>
              <svg viewBox="0 0 24 24" width="12" height="12">
                <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>{url}</span>
            </span>
          </div>
          <div ref={viewportRef} className={styles.viewport}>
            <RevealContext value={reveal}>{children}</RevealContext>
          </div>
          <span className={styles.scrollbar} aria-hidden="true">
            <span ref={thumbRef} className={styles.thumb} />
          </span>
        </div>
      </div>
      <div className={styles.spacer} />
    </div>
  );
}
