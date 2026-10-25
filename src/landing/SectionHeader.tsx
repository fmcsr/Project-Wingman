import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  /** Başlığın kimliği; bölüm `aria-labelledby` ile buna bağlanır. */
  id: string;
  /** Sıra etiketi, ör. "[01]". */
  index: string;
  label: string;
  title: string;
  /** Başlığın gri ikinci yarısı (iki tonlu başlık). */
  muted?: string;
  description?: string;
  /** Sağdaki denetimler (ör. kaydırma okları). */
  actions?: ReactNode;
};

/** Bölüm başlığı: mono sıra etiketi, iki tonlu başlık ve kısa açıklama. */
export function SectionHeader({ id, index, label, title, muted, description, actions }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <p className={styles.label}>
          <span>{index}</span>
          {label}
        </p>
        <h2 id={id} className={styles.title}>
          {title}
          {muted && (
            <>
              {' '}
              <span className={styles.muted}>{muted}</span>
            </>
          )}
        </h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions}
    </div>
  );
}
