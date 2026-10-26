import { DEV_ACCOUNT } from './devAccount';
import styles from './AuthForm.module.css';

/** TODO(before launch): delete together with devAccount.ts. Shown on the sign-in page in development builds only. */
export function DevAccountNote({ onFill }: { onFill: (identifier: string, password: string) => void }) {
  return (
    <aside className={styles.devNote} aria-label="Development account">
      <p>
        <span className={styles.devTag}>Dev only</span>
        Sign in with <code>{DEV_ACCOUNT.identifier}</code> / <code>{DEV_ACCOUNT.password}</code>. Remove before
        launch.
      </p>
      <button
        type="button"
        className={styles.devFill}
        onClick={() => onFill(DEV_ACCOUNT.identifier, DEV_ACCOUNT.password)}
      >
        Fill in
      </button>
    </aside>
  );
}
