import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  /** The heading's id; the section references it via `aria-labelledby`. */
  id: string;
  /** Index label, e.g. "[01]". */
  index: string;
  label: string;
  title: string;
  /** Gray second half of the heading (two-tone heading). */
  muted?: string;
  description?: string;
  /** Controls on the right (e.g. scroll arrows). */
  actions?: ReactNode;
};

/** Section header: mono index label, two-tone heading and a short description. */
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
