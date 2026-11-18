import styles from './AcmeSlop.module.css';

const LINKS = ['Features', 'Pricing', 'Testimonials', 'Contact'];
const LOGOS = ['Nova', 'Pulse', 'Orbit', 'Kite', 'Lumen'];
const TRUST = ['No credit card required', '14-day free trial', 'Cancel anytime'];

const STATS = [
  { value: '10K+', label: 'Happy Teams' },
  { value: '10x', label: 'Faster Shipping' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9★', label: 'Average Rating' },
];

const FEATURES = [
  {
    emoji: '🗺️',
    title: 'Smart Roadmaps',
    text: 'Visualize your product journey with beautiful, AI-powered roadmaps.',
    thumb: styles.thumbIndigo,
  },
  {
    emoji: '💬',
    title: 'Feedback Hub',
    text: 'Collect, organize and prioritize feedback like never before.',
    thumb: styles.thumbPink,
  },
  {
    emoji: '📊',
    title: 'Powerful Analytics',
    text: 'Unlock actionable insights that drive real results.',
    thumb: styles.thumbTeal,
  },
];

/** Bar heights for the fake chart in the hero preview, in percent. */
const PREVIEW_BARS = [38, 62, 48, 80, 58, 92, 70];

/**
 * The AI slop version of Acme: what "Make a landing page for my product-planning SaaS" tends to produce. A glass
 * navbar over gradient blobs and a grid, an "AI-powered" badge, gradient text, a placeholder product preview, made-up
 * stats and emoji feature cards. A picture for comparison only: nothing is focusable. Elements marked with
 * `data-inspect` explain themselves on hover (catalog/slopSites.ts).
 */
export function AcmeSlop() {
  return (
    <div className={styles.page}>
      <div className={styles.navSlot}>
        <nav className={styles.navbar} data-inspect="navbar">
          <a className={styles.brand} data-inspect="logo">
            <span className={styles.logo}>✨</span>
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
            <a className={styles.cta} data-inspect="button-cta">Get Started 🚀</a>
            <span className={styles.menu} data-inspect="hamburger-menu">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </nav>
      </div>

      <section className={styles.hero} data-inspect="hero">
        <span className={`${styles.shape} ${styles.shapeA}`} />
        <span className={`${styles.shape} ${styles.shapeB}`} />
        <span className={`${styles.shape} ${styles.shapeC}`} />
        <div className={styles.heroInner}>
          <p className={styles.badge} data-inspect="badge">
            <span className={styles.badgeDot} />✨ AI-Powered Product Planning
          </p>
          <h2 className={styles.heroTitle} data-inspect="hero-heading">
            Plan Smarter, Ship <span className={styles.gradientText}>10x Faster</span>
          </h2>
          <p className={styles.heroText}>
            Transform your workflow with our all-in-one AI-powered platform and unlock your team's full potential.
          </p>
          <div className={styles.heroActions}>
            <span className={styles.primary} data-inspect="button-primary">Get Started Free 🚀</span>
            <span className={styles.secondary} data-inspect="button-secondary">▶ Watch Demo</span>
          </div>
          <ul className={styles.trust} data-inspect="trust-signals">
            {TRUST.map((item) => (
              <li key={item}>
                <span className={styles.check}>✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.previewWrap}>
            <span className={styles.previewGlow} />
            <div className={styles.preview} data-inspect="product-shot">
              <div className={styles.previewBar}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.previewBody}>
                <div className={styles.previewSide}>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.previewMain}>
                  <div className={styles.previewTiles}>
                    <span className={styles.previewTile}>🚀</span>
                    <span className={styles.previewTile}>🎯</span>
                    <span className={styles.previewTile}>⚡</span>
                  </div>
                  <div className={styles.previewChart}>
                    {PREVIEW_BARS.map((height, index) => (
                      <span key={index} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.logos} data-inspect="logo-cloud">
        <p className={styles.logosLabel}>Trusted by 10,000+ teams worldwide 🌍</p>
        <div className={styles.logoRow}>
          {LOGOS.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </section>

      <section className={styles.stats}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat} data-inspect="stat">
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>⚡ Features</p>
        <h3 className={styles.sectionTitle} data-inspect="section-heading">
          Everything you need to <span className={styles.gradientText}>succeed</span>
        </h3>
        <p className={styles.sectionText}>Powerful AI-driven tools designed to supercharge your product workflow.</p>
        <div className={styles.features}>
          {FEATURES.map((feature) => (
            <article key={feature.title} className={styles.card} data-inspect="feature-card">
              <div className={`${styles.thumb} ${feature.thumb}`}>
                <span className={styles.thumbEmoji}>{feature.emoji}</span>
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
        </div>
      </section>

      <section className={styles.bannerSection}>
        <div className={styles.banner} data-inspect="cta-banner">
          <p className={styles.bannerTitle}>Ready to transform your workflow? 🚀</p>
          <p className={styles.bannerText}>Join 10,000+ teams already shipping faster with Acme.</p>
          <span className={styles.bannerCta}>Get Started Free →</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Acme. All rights reserved.</span>
        <span>Made with 💜 by the Acme team</span>
      </footer>
    </div>
  );
}
