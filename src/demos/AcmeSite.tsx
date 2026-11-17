import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useCountUp, useDemoMotion, useEvery } from './motion';
import styles from './AcmeSite.module.css';

const LINKS = ['Product', 'Customers', 'Pricing', 'Changelog'];

type BarState = 'done' | 'review' | 'active' | 'planned';

/** Roadmap in the product screenshot; start and end are months from the start of July. */
const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const INITIATIVES: { name: string; start: number; end: number; state: BarState }[] = [
  { name: 'Onboarding revamp', start: 0, end: 2.1, state: 'done' },
  { name: 'Public API', start: 0.7, end: 2.9, state: 'review' },
  { name: 'Mobile app 2.0', start: 1.6, end: 4.4, state: 'active' },
  { name: 'AI summaries', start: 2.8, end: 5.3, state: 'planned' },
  { name: 'Billing v3', start: 3.9, end: 6, state: 'planned' },
];
const TODAY = 3.55;

/**
 * The roadmap is live: every LIVE_MS one small thing changes, as on a real team's roadmap. First the active item's
 * progress fills a little (PROGRESS), then a teammate (TEAMMATE) joins the item named in JOINS, then the item in review
 * ships. The step after that quietly returns to the start, so the loop never drifts.
 */
const LIVE_MS = 6000;
const LIVE_STEPS = 4;
const PROGRESS = [0.5, 0.62];
const JOINS = 'AI summaries';
const TEAMMATE = 'JS';

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

/** Weekly adoption; the growth in the label compares the last week with the one before (73 vs 62: +18%). */
const ADOPTION = [38, 46, 41, 55, 60, 62, 73];
const GROWTH = Math.round((ADOPTION[6] / ADOPTION[5] - 1) * 100);

const FOOTER = [
  { title: 'Product', links: ['Roadmaps', 'Feedback', 'Insights', 'Changelog'] },
  { title: 'Company', links: ['About', 'Customers', 'Careers'] },
  { title: 'Resources', links: ['Docs', 'Help center', 'Status'] },
];

function span(start: number, end: number) {
  return { '--start': start / MONTHS.length, '--end': end / MONTHS.length } as CSSProperties;
}

/** Position in a staggered entrance: each item starts a little after the one before. */
function order(index: number) {
  return { '--i': index } as CSSProperties;
}

function Mark() {
  return (
    <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="7" />
      <path d="M7.5 16.5 12 7.5l4.5 9M9.4 13h5.2" />
    </svg>
  );
}

/** The announcement above the headline. A soft sheen sweeps across it every few seconds. */
function Badge() {
  const motion = useDemoMotion<HTMLAnchorElement>();
  return (
    <a ref={motion.ref} className={styles.badge} data-inspect="badge" data-paused={!motion.playing || undefined}>
      <span className={styles.badgeTag}>New</span>
      Roadmaps 2.0 is here
      <span className={styles.badgeArrow} aria-hidden="true">
        →
      </span>
    </a>
  );
}

/**
 * Product screenshot: the app's roadmap view, drawn in HTML. When it comes into view the bars grow into place one
 * after another and the Today line drops in; after that it stays live (see LIVE_MS) while nobody inspects it.
 */
function ProductShot() {
  const motion = useDemoMotion<HTMLDivElement>();
  const [step, setStep] = useState(0);
  useEvery(LIVE_MS, motion.playing, () => setStep((current) => (current + 1) % LIVE_STEPS));
  // Each step keeps the changes of the steps before it
  const filled = step >= 1;
  const joined = step >= 2;
  const shipped = step >= 3;

  return (
    <div
      ref={motion.ref}
      className={styles.shot}
      data-inspect="product-shot"
      data-started={motion.started || undefined}
      data-paused={!motion.playing || undefined}
    >
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
            {INITIATIVES.map((item, index) => {
              const state = item.state === 'review' && shipped ? 'done' : item.state;
              const style = {
                ...span(item.start, item.end),
                ...order(index),
                ...(item.state === 'active' ? { '--progress': PROGRESS[filled ? 1 : 0] } : {}),
              } as CSSProperties;
              return (
                <div key={item.name} className={styles.lane}>
                  <span
                    className={styles.bar}
                    data-state={state}
                    data-shipped={state !== item.state || undefined}
                    style={style}
                  >
                    {item.state === 'done' || item.state === 'review' ? (
                      <span className={styles.barIcon}>
                        {item.state === 'review' ? (
                          <svg className={styles.review} viewBox="0 0 16 16" aria-hidden="true">
                            <circle cx="8" cy="8" r="6" />
                            <path d="M8 4.5a3.5 3.5 0 0 1 0 7z" />
                          </svg>
                        ) : null}
                        <svg className={styles.check} viewBox="0 0 16 16" aria-hidden="true">
                          <path d="m4 8.5 2.5 2.5L12 5.5" pathLength={1} />
                        </svg>
                      </span>
                    ) : null}
                    <span className={styles.barLabel}>{item.name}</span>
                  </span>
                  {item.name === JOINS ? (
                    <i
                      className={styles.teammate}
                      data-joined={joined || undefined}
                      style={{ '--at': item.end / MONTHS.length } as CSSProperties}
                    >
                      {TEAMMATE}
                    </i>
                  ) : null}
                </div>
              );
            })}
            <span className={styles.today} style={{ '--at': TODAY / MONTHS.length } as CSSProperties}>
              <span>Today</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Customer logos for the logo cloud: made-up brands, each with its own glyph and type style. */
function Logos() {
  return (
    <>
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
    </>
  );
}

/**
 * One row of the logo marquee: two identical groups sit end to end (each holds the logos twice, so it's wider than
 * the strip) and the track moves by one group's width, then starts over. `reverse` drifts the other way.
 */
function LogoMarquee({ paused, reverse = false }: { paused: boolean; reverse?: boolean }) {
  return (
    <div className={reverse ? `${styles.marquee} ${styles.reverse}` : styles.marquee} data-paused={paused || undefined}>
      <div className={styles.track}>
        <div className={styles.group}>
          <Logos />
          <Logos />
        </div>
        <div className={styles.group}>
          <Logos />
          <Logos />
        </div>
      </div>
    </div>
  );
}

/**
 * Logo cloud. The logos drift in a slow marquee; where they would wrap (narrow screens), a second row drifts the other
 * way, so the strip fills the space the wrapped logos took. The resting layout stays underneath without being seen
 * and keeps the section's height; it shows on its own with reduced motion and in still pictures. The logos aren't
 * inspectable on their own, so the copies add no elements.
 */
function LogoCloud() {
  const motion = useDemoMotion<HTMLElement>();
  const label = <p className={styles.logosLabel}>Trusted by 1,200+ product teams</p>;
  return (
    <section ref={motion.ref} className={styles.logos} data-inspect="logo-cloud">
      <div className={styles.logosStill} data-hidden={!motion.final || undefined}>
        {label}
        <div className={styles.logoRow}>
          <Logos />
        </div>
      </div>
      {motion.final ? null : (
        <div className={styles.logosMoving}>
          {label}
          <LogoMarquee paused={!motion.playing} />
          <LogoMarquee paused={!motion.playing} reverse />
        </div>
      )}
    </section>
  );
}

/** Roadmaps card picture. Like the feature pictures after it, it plays once as it scrolls into view: bars grow. */
function RoadmapArt() {
  const motion = useDemoMotion<HTMLDivElement>();
  return (
    <div ref={motion.ref} className={styles.art} data-started={motion.started || undefined} aria-hidden="true">
      <div className={styles.miniRoadmap}>
        <span data-state="done" style={{ ...span(0, 2.4), ...order(0) }}>
          Onboarding
        </span>
        <span data-state="active" style={{ ...span(1.3, 4.4), ...order(1) }}>
          Mobile 2.0
        </span>
        <span data-state="planned" style={{ ...span(2.9, 5.6), ...order(2) }}>
          AI summaries
        </span>
        <span data-state="planned" style={{ ...span(4, 6), ...order(3) }}>
          Billing
        </span>
        <i className={styles.miniToday} style={{ '--at': TODAY / MONTHS.length } as CSSProperties} />
      </div>
    </div>
  );
}

/** Feedback card picture: the requests slide in one after another. */
function FeedbackArt() {
  const motion = useDemoMotion<HTMLDivElement>();
  return (
    <div ref={motion.ref} className={styles.art} data-started={motion.started || undefined} aria-hidden="true">
      <ul className={styles.miniFeedback}>
        {FEEDBACK.map((item, index) => (
          <li key={item.title} style={order(index)}>
            <span className={styles.votes}>▲ {item.votes}</span>
            <span className={styles.request}>{item.title}</span>
            <span className={styles.status} data-status={item.status}>
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Insights card picture: the bars grow and the growth figure counts up from zero alongside them. */
function InsightsArt() {
  const motion = useDemoMotion<HTMLDivElement>();
  const growth = useCountUp(GROWTH, motion, 1100);
  return (
    <div ref={motion.ref} className={styles.art} data-started={motion.started || undefined} aria-hidden="true">
      <div className={styles.miniChart}>
        <span className={styles.chartLabel}>
          Adoption <b>↑ {Math.round(growth)}%</b>
        </span>
        <div className={styles.chartBars}>
          {ADOPTION.map((value, index) => (
            <span
              key={index}
              style={{ height: `${value}%`, ...order(index) }}
              data-last={index === ADOPTION.length - 1 || undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Example project [01]: a SaaS marketing site, styled like the product sites PMs know (Linear, Vercel, Notion): a
 * plain page, one brand color, and the product itself in the hero. A screenshot of the app scrolls under the sticky
 * navbar, so its frosted glass is clearly visible. Not interactive (the links have no href); for inspection only.
 * Motion stays quiet: the screenshot draws in and then changes now and then, the logos drift, the badge catches the
 * light, and the feature pictures play once. Everything holds while inspected and stays still with reduced motion.
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
        <Badge />
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

        <ProductShot />
      </section>

      <LogoCloud />

      <section className={styles.features}>
        <p className={styles.eyebrow}>One workspace</p>
        <h3 className={styles.sectionTitle}>The whole product loop, connected</h3>
        <div className={styles.cards}>
          <article className={styles.card} data-inspect="feature-card">
            <RoadmapArt />
            <h4 className={styles.cardTitle}>Roadmaps</h4>
            <p className={styles.cardText}>Lay out the quarter and keep every team on the same timeline.</p>
          </article>
          <article className={styles.card} data-inspect="feature-card">
            <FeedbackArt />
            <h4 className={styles.cardTitle}>Feedback</h4>
            <p className={styles.cardText}>Collect every request in one place and see what customers ask for most.</p>
          </article>
          <article className={styles.card} data-inspect="feature-card">
            <InsightsArt />
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
