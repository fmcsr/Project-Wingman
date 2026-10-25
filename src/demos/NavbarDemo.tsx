import styles from './NavbarDemo.module.css';

const LINKS = ['Ürün', 'Çözümler', 'Fiyatlar', 'Kaynaklar'];

/**
 * Açıklanan örnek: sayfa kayarken üstte kalan, buzlu cam efektli navbar.
 * Yalnızca görünümden sorumludur; inceleme etkileşimini Inspectable yönetir.
 */
export function NavbarDemo() {
  return (
    <nav className={styles.navbar} aria-label="Örnek site">
      <a className={styles.brand} href="#">
        <span className={styles.logo} />
        Acme
      </a>
      <ul className={styles.links}>
        {LINKS.map((label, index) => (
          <li key={label}>
            <a className={styles.link} href="#" aria-current={index === 0 ? 'page' : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <a className={styles.signIn} href="#">
          Giriş yap
        </a>
        <a className={styles.cta} href="#">
          Ücretsiz dene
        </a>
        <span className={styles.menu}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </nav>
  );
}
