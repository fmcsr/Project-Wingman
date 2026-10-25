import styles from './BrandMark.module.css';

/** Project Wingman logosu: temaya göre renk değiştiren "W" işareti. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className ? `${styles.mark} ${className}` : styles.mark} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" />
      <path d="M8 10l3.5 12L16 13l4.5 9L24 10" />
    </svg>
  );
}
