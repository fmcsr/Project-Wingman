import styles from './BrandMark.module.css';

/**
 * Project Wingman logo: two square brackets facing each other, empty inside. It's the site's `[ ]` label motif
 * (as in `[ PROJECT WINGMAN ]`) turned into a mark. Follows the text color.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className ? `${styles.mark} ${className}` : styles.mark} viewBox="0 0 18 22" aria-hidden="true">
      <path d="M6 1H1v20h5M12 1h5v20h-5" />
    </svg>
  );
}
