import { useUser } from '../auth/session';
import { Link } from '../router';
import { SECTION_LINKS, SIGN_IN_HREF, WORKSPACE_HREF } from './links';
import styles from './SiteFooter.module.css';

/** Footer: section links as plain text, not a bar. */
export function SiteFooter() {
  const user = useUser();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div>
          <p className={styles.kicker}>[ Project Wingman ]</p>
          <p className={styles.tagline}>The PM's best friend for design talk.</p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          {SECTION_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          {user ? <Link href={WORKSPACE_HREF}>Workspace</Link> : <Link href={SIGN_IN_HREF}>Sign in</Link>}
        </nav>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>© 2026 Project Wingman</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
