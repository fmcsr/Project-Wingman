import type { CSSProperties } from 'react';
import styles from './AcmeSite.module.css';

const LINKS = ['Product', 'Customers', 'Pricing', 'Changelog'];

type BarState = 'done' | 'active' | 'planned';

/** Roadmap in the product screenshot; start and end are months from the start of July. */
const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const INITIATIVES: { name: string; start: number; end: number; state: BarState }[] = [
  { name: 'Onboarding revamp', start: 0, end: 2.1, state: 'done' },
  { name: 'Public API', start: 0.7, end: 2.9, state: 'done' },
  { name: 'Mobile app 2.0', start: 1.6, end: 4.4, state: 'active' },
  { name: 'AI summaries', start: 2.8, end: 5.3, state: 'planned' },
  { name: 'Billing v3', start: 3.9, end: 6, state: 'planned' },
];
const TODAY = 3.55;

const TEAMS = [
  { name: 'Growth', color: '#12b76a' },
  { name: 'Platform', color: '#f79009' },
  { name: 'Mobile', color: '#7a5af8' },
];

const FEEDBACK = [
  { votes: 128, title: 'Dark mode on mobile', status: 'Planned' },
  { votes: 96, title: 'Export to CSV', status: 'In review' },
  { votes: 61, title: 'Slack alerts', status: 'Shipped' },
];

const ADOPTION = [38, 46, 41, 55, 60, 58, 74];

const FOOTER = [
  { title: 'Product', links: ['Roadmaps', 'Feedback', 'Insights', 'Changelog'] },
  { title: 'Company', links: ['About', 'Customers', 'Careers'] },
  { title: 'Resources', links: ['Docs', 'Help center', 'Status'] },
];

function span(start: number, end: number) {
  return { '--start': start / MONTHS.length, '--end': end / MONTHS.length } as CSSProperties;
}

function Mark() {
  return (
    <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="7" />
      <path d="M7.5 16.5 12 7.5l4.5 9M9.4 13h5.2" />
    </svg>
  );
}

/** Customer logos for the logo cloud: made-up brands, each with its own glyph and type style. */
function Logos() {
  return (
    <div className={styles.logoRow}>
      <span className={styles.paragon}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 1.5 14.5 8 8 14.5 1.5 8z" />
        </svg>
        Paragon
      </span>
      <span className={styles.lumen}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" className={styles.fill} />
        </svg>
        lumen
      </span>
      <span className={styles.fieldnote}>fieldnote_</span>
      <span className={styles.kite}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 1.5 14 13H2z" className={styles.fill} />
        </svg>
        KITE
      </span>
      <span className={styles.monarch}>
        <svg viewBox="0 0 20 16" aria-hidden="true">
          <circle cx="7" cy="8" r="5" />
          <circle cx="13" cy="8" r="5" />
        </svg>
        Monarch
      </span>
    </div>
  );
}

/**
 * Example project [01]: a SaaS marketing site, styled like the product sites PMs know (Linear, Vercel, Notion): a
 * plain page, one brand color, and the product itself in the hero. A screenshot of the app scrolls under the sticky
 * navbar, so its frosted glass is clearly visible. Not interactive (the links have no href); for inspection only.
 */
export function AcmeSite() {
  return (
    <div className={styles.page}>
      <div className={styles.navSlot}>
        <nav className={styles.navbar} data-inspect="navbar">
          <a className={styles.brand} data-inspect="logo">
            <Mark />
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
            <a className={styles.cta} data-inspect="button-cta">
              Start free
            </a>
            <span className={styles.menu} data-inspect="hamburger-menu">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </nav>
      </div>

      <section className={styles.hero}>
        <a className={styles.badge} data-inspect="badge">
          <span className={styles.badgeTag}>New</span>
          Roadmaps 2.0 is here
          <span className={styles.badgeArrow} aria-hidden="true">
            →
          </span>
        </a>
        <h2 className={styles.heroTitle} data-inspect="hero-heading">
          From customer feedback to shipped features
        </h2>
        <p className={styles.heroText}>
          Acme brings feedback, roadmaps and product analytics into one workspace, so every plan starts with what your
          customers need.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.primary} data-inspect="button-primary">
            Get started
          </a>
          <a className={styles.secondary} data-inspect="button-secondary">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
            </svg>
            Watch the demo
          </a>
        </div>
        <p className={styles.heroNote}>Free for teams up to 10 · No credit card required</p>

        <div className={styles.shot} data-inspect="product-shot">
          <div className={styles.shotSide}>
            <span className={styles.workspace}>
              <Mark />
              Acme Inc
            </span>
            <span className={styles.sideItem}>Inbox</span>
            <span className={styles.sideItem} data-active="">
              Roadmap
            </span>
            <span className={styles.sideItem}>Feedback</span>
            <span className={styles.sideItem}>Insights</span>
            <span className={styles.sideGroup}>Teams</span>
            {TEAMS.map((team) => (
              <span key={team.name} className={styles.sideItem}>
                <i className={styles.teamDot} style={{ background: team.color }} />
                {team.name}
              </span>
            ))}
          </div>
          <div className={styles.shotMain}>
            <div className={styles.shotTop}>
              <strong>Roadmap</strong>
              <span className={styles.views}>
                <span data-active="">Timeline</span>
                <span>Board</span>
                <span>List</span>
              </span>
              <span className={styles.people} aria-hidden="true">
                <i>MK</i>
                <i>JS</i>
                <i>AL</i>
              </span>
            </div>
            <div className={styles.timeline}>
              <div className={styles.months}>
                {MONTHS.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
              <div className={styles.lanes}>
                {INITIATIVES.map((item) => (
                  <div key={item.name} className={styles.lane}>
                    <span className={styles.bar} data-state={item.state} style={span(item.start, item.end)}>
                      {item.state === 'done' ? (
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                          <path d="m4 8.5 2.5 2.5L12 5.5" />
                        </svg>
                      ) : null}
                      <span className={styles.barLabel}>{item.name}</span>
                    </span>
                  </div>
                ))}
                <span className={styles.today} style={{ '--at': TODAY / MONTHS.length } as CSSProperties}>
                  <span>Today</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.logos} data-inspect="logo-cloud">
        <p className={styles.logosLabel}>Trusted by 1,200+ product teams</p>
        <Logos />
      </section>

      <section className={styles.features}>
        <p className={styles.eyebrow}>One workspace</p>
        <h3 className={styles.sectionTitle}>The whole product loop, connected</h3>
        <div className={styles.cards}>
          <article className={styles.card} data-inspect="feature-card">
            <div className={styles.art} aria-hidden="true">
              <div className={styles.miniRoadmap}>
                <span data-state="done" style={span(0, 2.4)}>
                  Onboarding
                </span>
                <span data-state="active" style={span(1.3, 4.4)}>
                  Mobile 2.0
                </span>
                <span data-state="planned" style={span(2.9, 5.6)}>
                  AI summaries
                </span>
                <span data-state="planned" style={span(4, 6)}>
                  Billing
                </span>
                <i className={styles.miniToday} style={{ '--at': TODAY / MONTHS.length } as CSSProperties} />
              </div>
            </div>
            <h4 className={styles.cardTitle}>Roadmaps</h4>
            <p className={styles.cardText}>Lay out the quarter and keep every team on the same timeline.</p>
          </article>
          <article className={styles.card} data-inspect="feature-card">
            <div className={styles.art} aria-hidden="true">
              <ul className={styles.miniFeedback}>
                {FEEDBACK.map((item) => (
                  <li key={item.title}>
                    <span className={styles.votes}>▲ {item.votes}</span>
                    <span className={styles.request}>{item.title}</span>
                    <span className={styles.status} data-status={item.status}>
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <h4 className={styles.cardTitle}>Feedback</h4>
            <p className={styles.cardText}>Collect every request in one place and see what customers ask for most.</p>
          </article>
          <article className={styles.card} data-inspect="feature-card">
            <div className={styles.art} aria-hidden="true">
              <div className={styles.miniChart}>
                <span className={styles.chartLabel}>
                  Adoption <b>↑ 18%</b>
                </span>
                <div className={styles.chartBars}>
                  {ADOPTION.map((value, index) => (
                    <span key={index} style={{ height: `${value}%` }} data-last={index === ADOPTION.length - 1 || undefined} />
                  ))}
                </div>
              </div>
            </div>
            <h4 className={styles.cardTitle}>Insights</h4>
            <p className={styles.cardText}>See which features get used, and which ones move the numbers.</p>
          </article>
        </div>
      </section>

      <section className={styles.banner} data-inspect="cta-banner">
        <div>
          <p className={styles.bannerTitle}>Start planning with your team</p>
          <p className={styles.bannerText}>Free for teams up to 10. No credit card required.</p>
        </div>
        <div className={styles.bannerActions}>
          <span className={styles.bannerPrimary}>Get started</span>
          <span className={styles.bannerSecondary}>Talk to sales</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <span className={styles.brand}>
            <Mark />
            Acme
          </span>
          <p>The product planning workspace.</p>
        </div>
        {FOOTER.map((column) => (
          <div key={column.title} className={styles.footerColumn}>
            <p className={styles.footerTitle}>{column.title}</p>
            {column.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
        ))}
        <p className={styles.legal}>
          <span>© 2026 Acme Inc.</span>
          <span>Privacy · Terms</span>
        </p>
      </footer>
    </div>
  );
}
