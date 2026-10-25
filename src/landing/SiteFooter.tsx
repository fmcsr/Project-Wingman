import { SECTION_LINKS, SIGN_IN_HREF } from './links';
import styles from './SiteFooter.module.css';

/** Footer: bar değil, yazı olarak bölüm linkleri. */
export function SiteFooter() {
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
          <a href={SIGN_IN_HREF}>Sign in</a>
        </nav>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>© 2026 Project Wingman</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
