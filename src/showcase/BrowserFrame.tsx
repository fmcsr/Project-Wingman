import type { ReactNode } from 'react';
import { InspectorLayerHost } from '../inspector/InspectorLayer';
import styles from './BrowserFrame.module.css';

type BrowserFrameProps = {
  /** Adres çubuğunda görünen alan adı. */
  url: string;
  /** Kaydırılabilir önizleme alanının erişilebilir adı. */
  label: string;
  children: ReactNode;
};

/**
 * Örnek arayüzlerin sergilendiği sahte tarayıcı penceresi.
 * Açıklama balonları, çerçevenin kırpmasına takılmamak için ayrı bir katmana çizilir.
 */
export function BrowserFrame({ url, label, children }: BrowserFrameProps) {
  return (
    <div className={styles.stage}>
      <InspectorLayerHost className={styles.layer}>
        <div className={styles.frame}>
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
          {/* Klavyeyle kaydırılabilmesi için odaklanabilir bölge */}
          <div className={styles.viewport} tabIndex={0} role="region" aria-label={label}>
            {children}
          </div>
        </div>
      </InspectorLayerHost>
    </div>
  );
}
