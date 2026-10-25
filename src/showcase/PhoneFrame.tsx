import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

/**
 * Mobil örneklerin sergilendiği telefon çerçevesi: ince kasa, yuvarlak ekran ve kamera adası.
 * Sabit boyutta tasarlanır; kapsayıcıdaki `--phone-scale` ile bütünüyle küçültülür.
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
