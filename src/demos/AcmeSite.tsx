import styles from './AcmeSite.module.css';

const LINKS = ['Product', 'Solutions', 'Pricing', 'Resources'];
const LOGOS = ['Nova', 'Pulse', 'Orbit', 'Kite', 'Lumen'];
const FEATURES = [
  { title: 'Roadmaps', text: 'Drag and drop your quarterly plan into shape.', thumb: styles.thumbIndigo },
  { title: 'Feedback', text: 'Collect every user request on a single board.', thumb: styles.thumbPink },
  { title: 'Analytics', text: 'See which features actually move the needle.', thumb: styles.thumbTeal },
];

/**
 * Örnek proje [01]: bir SaaS pazarlama sitesi. Buzlu cam efektli sticky navbar'ın altından renkli içerik
 * kayar; böylece backdrop-filter gözle görülür. Etkileşim yoktur (linklerin href'i yok), yalnızca incelenir.
 */
export function AcmeSite() {
  return (
    <div className={styles.page}>
      <div className={styles.navSlot}>
        <nav className={styles.navbar} data-inspect="navbar">
          <a className={styles.brand} data-inspect="logo">
            <span className={styles.logo} />
            Acme
          </a>
          <ul className={styles.links}>
            {LINKS.map((label, index) => (
              <li key={label}>
                <a className={styles.link} data-inspect="nav-link" aria-current={index === 0 ? 'page' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <a className={styles.signIn}>Sign in</a>
            <a className={styles.cta} data-inspect="button-gradient">
              Start free
            </a>
            <span className={styles.menu} data-inspect="hamburger-menu">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </nav>
      </div>

      <section className={styles.hero}>
        <span className={`${styles.shape} ${styles.shapeA}`} />
        <span className={`${styles.shape} ${styles.shapeB}`} />
        <span className={`${styles.shape} ${styles.shapeC}`} />
        <div className={styles.heroInner}>
          <p className={styles.badge} data-inspect="badge">
            New · Roadmaps 2.0
          </p>
          <h2 className={styles.heroTitle} data-inspect="hero-heading">
            From idea to product, in one place
          </h2>
          <p className={styles.heroText}>
            Plan, prioritize, and keep your team on the same page. Acme is the shared workspace for product teams.
          </p>
          <div className={styles.heroActions}>
            <span className={styles.primary} data-inspect="button-primary">
              Get started
            </span>
            <span className={styles.secondary} data-inspect="button-secondary">
              Watch demo
            </span>
          </div>
        </div>
      </section>

      <section className={styles.logos} data-inspect="logo-cloud">
        <p className={styles.logosLabel}>Trusted by 1,200+ product teams</p>
        <div className={styles.logoRow}>
          {LOGOS.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        {FEATURES.map((feature) => (
          <article key={feature.title} className={styles.card} data-inspect="feature-card">
            <div className={`${styles.thumb} ${feature.thumb}`}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardText}>{feature.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.banner} data-inspect="cta-banner">
        <div>
          <p className={styles.bannerTitle}>Invite your team today</p>
          <p className={styles.bannerText}>14-day free trial. No credit card required.</p>
        </div>
        <span className={styles.bannerCta}>Start free</span>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Acme</span>
        <span>Privacy · Terms</span>
      </footer>
    </div>
  );
}
