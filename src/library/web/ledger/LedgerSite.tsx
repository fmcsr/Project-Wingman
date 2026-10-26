import type { ReactNode } from 'react';
import styles from './LedgerSite.module.css';

/** Line icons on a 24 × 24 grid; stroke color and width come from the stylesheet. */
const ICON = {
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  cart: 'M3 5h2.5l2 10h10.5l2-7.5H6.5M9.5 19.5h.01M17 19.5h.01',
  blocks: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  terminal: 'M7 3h10v18H7zM9.5 6.5h5v4h-5zM9.5 14h.01M12 14h.01M14.5 14h.01M9.5 17h.01M12 17h.01M14.5 17h.01',
  repeat: 'M17 3l3 3-3 3M4 11V9a3 3 0 0 1 3-3h13M7 21l-3-3 3-3M20 13v2a3 3 0 0 1-3 3H4',
  invoice: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5',
  percent: 'M19 5L5 19M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  send: 'M7 17L17 7M8 7h9v9',
  card: 'M3 6h18v12H3zM3 10h18M7 15h3',
  building: 'M4 21V8l8-5 8 5v13M9 21v-6h6v6M3 21h18',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM9 12l2 2 4-4',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',
};

function Icon({ d, className = styles.icon }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

const NAV = [
  { label: 'Products', menu: true },
  { label: 'Solutions', menu: true },
  { label: 'Developers', menu: true },
  { label: 'Resources', menu: true },
  { label: 'Pricing', menu: false },
];

/** The open mega menu: three columns, each item an icon, a name and a one-line description. */
const MENU = [
  {
    heading: 'Payments',
    tone: styles.toneViolet,
    items: [
      { name: 'Checkout', text: 'Prebuilt payment page', icon: ICON.cart },
      { name: 'Components', text: 'Embeddable payment UI', icon: ICON.blocks },
      { name: 'Terminal', text: 'In-person card readers', icon: ICON.terminal },
    ],
  },
  {
    heading: 'Revenue',
    tone: styles.tonePink,
    items: [
      { name: 'Billing', text: 'Subscriptions and usage', icon: ICON.repeat },
      { name: 'Invoicing', text: 'Send and track invoices', icon: ICON.invoice },
      { name: 'Tax', text: 'Sales tax, VAT and GST', icon: ICON.percent },
    ],
  },
  {
    heading: 'Banking',
    tone: styles.toneTeal,
    items: [
      { name: 'Payouts', text: 'Pay out in 45 countries', icon: ICON.send },
      { name: 'Cards', text: 'Issue virtual and physical company cards', icon: ICON.card },
      { name: 'Atlas', text: 'Incorporate in minutes', icon: ICON.building, isNew: true },
    ],
  },
];

/** Fictional customers; each wordmark gets its own type treatment, like real logos would. */
const CUSTOMERS: { name: string; style: string; mark: ReactNode }[] = [
  { name: 'Kestrel', style: styles.logoKestrel, mark: <path d="M12 3l9 17H3z" /> },
  { name: 'fieldnote', style: styles.logoFieldnote, mark: <rect x="4" y="4" width="16" height="16" rx="4" /> },
  { name: 'HALCYON', style: styles.logoHalcyon, mark: <circle cx="12" cy="12" r="8" /> },
  {
    name: 'Brightwave',
    style: styles.logoBrightwave,
    mark: <path d="M2 14c3-5 6-5 9 0s6 5 9 0v6H2z" />,
  },
  { name: 'Quanta', style: styles.logoQuanta, mark: <path d="M12 2l9 10-9 10-9-10z" /> },
  { name: 'northbeam', style: styles.logoNorthbeam, mark: <path d="M12 2l2.6 7.4H22l-6 4.6 2.3 7.6L12 17l-6.3 4.6L8 14 2 9.4h7.4z" /> },
];

type TokenKind = 'k' | 's' | 'f' | 'p' | 'n' | 'c' | '';
type Token = readonly [TokenKind, string];

/** Colors per token type, the way an editor's syntax theme assigns them. */
const TOKEN_CLASS: Record<Exclude<TokenKind, ''>, string> = {
  k: styles.tokKeyword,
  s: styles.tokString,
  f: styles.tokFunction,
  p: styles.tokProperty,
  n: styles.tokNumber,
  c: styles.tokComment,
};

const CODE: Token[][] = [
  [['k', 'import'], ['', ' '], ['f', 'Ledger'], ['', ' '], ['k', 'from'], ['', ' '], ['s', "'@ledger/node'"], ['', ';']],
  [],
  [['k', 'const'], ['', ' ledger = '], ['k', 'new'], ['', ' '], ['f', 'Ledger'], ['', '(process.env.LEDGER_SECRET_KEY);']],
  [],
  [['k', 'const'], ['', ' payment = '], ['k', 'await'], ['', ' ledger.payments.'], ['f', 'create'], ['', '({']],
  [['', '  '], ['p', 'amount'], ['', ': '], ['n', '4900'], ['', ',']],
  [['', '  '], ['p', 'currency'], ['', ': '], ['s', "'usd'"], ['', ',']],
  [['', '  '], ['p', 'customer'], ['', ': '], ['s', "'cus_8Qm2Lx'"], ['', ',']],
  [['', '  '], ['p', 'description'], ['', ': '], ['s', "'Pro plan · November'"], ['', ',']],
  [['', '});']],
  [],
  [['', 'console.'], ['f', 'log'], ['', '(payment.status); '], ['c', "// 'succeeded'"]],
];

const FEATURES = [
  {
    title: 'Global from day one',
    text: 'Accept 135+ currencies and 40 local payment methods through a single integration.',
    icon: ICON.globe,
  },
  {
    title: 'Fraud screening built in',
    text: 'Models trained on billions of payments flag risky charges before they settle.',
    icon: ICON.shield,
  },
  {
    title: 'Payouts in two days',
    text: 'Send funds to bank accounts in 45 countries, or instantly to eligible debit cards.',
    icon: ICON.bolt,
  },
  {
    title: 'Made for developers',
    text: 'Typed SDKs in eight languages and a test mode that mirrors production.',
    icon: ICON.code,
  },
];

const STATS = [
  { value: '135+', label: 'currencies supported' },
  { value: '99.999%', label: 'historical API uptime' },
  { value: '$860B', label: 'processed in 2025' },
  { value: '47', label: 'countries with local acquiring' },
];

const FOOTER = [
  { title: 'Products', links: ['Payments', 'Billing', 'Invoicing', 'Terminal', 'Atlas'] },
  { title: 'Developers', links: ['Documentation', 'API reference', 'API status', 'Changelog'] },
  { title: 'Company', links: ['About', 'Customers', 'Careers', 'Newsroom'] },
  { title: 'Support', links: ['Help center', 'Contact sales', 'Security', 'Privacy'] },
];

function LogoMark() {
  return (
    <span className={styles.logoMark}>
      <span />
      <span />
      <span />
    </span>
  );
}

/**
 * A payments platform's marketing site in the style of developer-first fintechs: an announcement bar, a mega menu
 * shown open, a mesh-gradient hero with gradient text, a code card with language tabs, a feature grid and a fat
 * footer. Not interactive (no links or buttons); for inspection only.
 */
export function LedgerSite() {
  return (
    <div className={styles.page}>
      <a className={styles.announcement} data-inspect="announcement-bar">
        <span className={styles.announcementText}>
          <strong className={styles.announcementTag}>New:</strong> Ledger Atlas — incorporate in minutes
        </span>
        <Icon d={ICON.arrowRight} className={styles.announcementArrow} />
      </a>

      <div className={styles.hero} data-inspect="mesh-gradient">
        <span className={styles.mesh} />

        <nav className={styles.navbar} data-inspect="navbar">
          <a className={styles.brand}>
            <LogoMark />
            ledger
          </a>
          <ul className={styles.links}>
            {NAV.map((item) => (
              <li key={item.label} className={styles.linkSlot}>
                <a className={styles.link} aria-expanded={item.menu ? item.label === 'Products' : undefined}>
                  {item.label}
                  {item.menu && <Icon d={ICON.chevronDown} className={styles.chevron} />}
                </a>

                {item.label === 'Products' && (
                  <div className={styles.megaMenu} data-inspect="mega-menu">
                    <div className={styles.menuColumns}>
                      {MENU.map((column) => (
                        <div key={column.heading} className={`${styles.menuColumn} ${column.tone}`}>
                          <p className={styles.menuHeading}>{column.heading}</p>
                          {column.items.map((product) => (
                            <a
                              key={product.name}
                              className={product.name === 'Checkout' ? styles.menuItemHover : styles.menuItem}
                              data-inspect="menu-item"
                            >
                              <span className={styles.menuIcon}>
                                <Icon d={product.icon} />
                              </span>
                              <span className={styles.menuName}>
                                {product.name}
                                {product.isNew && <span className={styles.newPill}>New</span>}
                              </span>
                              <span className={styles.menuText}>{product.text}</span>
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className={styles.menuFooter}>
                      <a className={styles.textLink} data-inspect="text-link">
                        See all 24 products
                        <Icon d={ICON.arrowRight} className={styles.linkArrow} />
                      </a>
                      <span className={styles.menuFooterNote}>One account, one integration</span>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <a className={styles.signIn}>Sign in</a>
            <a className={styles.navCta}>
              Start now
              <Icon d={ICON.chevronRight} className={styles.ctaChevron} />
            </a>
            <span className={styles.menuButton}>
              <Icon d={ICON.menu} />
            </span>
          </div>
        </nav>

        <section className={styles.heroBody}>
          <h2 className={styles.heroTitle}>
            One API to move money{' '}
            <span className={styles.gradientText} data-inspect="gradient-text">
              everywhere
            </span>
          </h2>
          <p className={styles.lead}>
            Payments, subscriptions and payouts for 120,000 businesses, from first-day startups to public
            companies.
          </p>
          <div className={styles.heroActions}>
            <div className={styles.capture} data-inspect="email-capture">
              <span className={styles.captureField}>
                <Icon d={ICON.mail} className={styles.captureIcon} />
                <span className={styles.placeholder}>Email address</span>
              </span>
              <span className={styles.captureButton}>
                Start now
                <Icon d={ICON.chevronRight} className={styles.ctaChevron} />
              </span>
            </div>
            <a className={styles.textLink} data-inspect="text-link">
              Contact sales
              <Icon d={ICON.arrowRight} className={styles.linkArrow} />
            </a>
          </div>
        </section>
      </div>

      <section className={styles.logoWall} data-inspect="logo-wall">
        <p className={styles.logoLabel}>Trusted by finance teams at 120,000 companies</p>
        <div className={styles.logoGrid}>
          {CUSTOMERS.map((customer) => (
            <span key={customer.name} className={`${styles.customer} ${customer.style}`}>
              <svg className={styles.customerMark} viewBox="0 0 24 24">
                {customer.mark}
              </svg>
              {customer.name}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.devSection}>
        <div>
          <p className={styles.eyebrow}>Built for developers</p>
          <h3 className={styles.sectionTitle}>Your first payment in twelve lines</h3>
          <p className={styles.sectionText}>
            Typed SDKs for every major language, a test mode that mirrors production, and webhooks you can replay
            from the dashboard.
          </p>
          <a className={styles.textLink} data-inspect="text-link">
            Read the docs
            <Icon d={ICON.arrowRight} className={styles.linkArrow} />
          </a>
        </div>

        <div className={styles.codeCard} data-inspect="code-block">
          <div className={styles.codeHeader}>
            <div className={styles.tabs} role="tablist" data-inspect="code-tabs">
              {['JS', 'Python', 'cURL'].map((language, index) => (
                <span key={language} className={styles.tab} role="tab" aria-selected={index === 0}>
                  {language}
                </span>
              ))}
            </div>
            <span className={styles.copyButton} role="button" aria-label="Copy code" data-inspect="copy-button">
              <Icon d={ICON.check} />
              <span className={styles.tooltip} role="status" data-inspect="tooltip">
                Copied
              </span>
            </span>
          </div>
          <pre className={styles.code}>
            <code>
              {CODE.map((line, index) => (
                <span key={index} className={styles.line}>
                  {line.map(([kind, text], i) =>
                    kind ? (
                      <span key={i} className={TOKEN_CLASS[kind]}>
                        {text}
                      </span>
                    ) : (
                      text
                    ),
                  )}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </section>

      <section className={styles.features}>
        <h3 className={styles.sectionTitle}>Everything you need to get paid</h3>
        <div className={styles.featureGrid} data-inspect="feature-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title} className={styles.feature}>
              <span className={styles.featureIcon}>
                <Icon d={feature.icon} />
              </span>
              <h4 className={styles.featureTitle}>{feature.title}</h4>
              <p className={styles.featureText}>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.stats} data-inspect="stats-band">
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer} data-inspect="footer">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <a className={styles.brand}>
              <LogoMark />
              ledger
            </a>
            <span className={styles.locale}>
              <Icon d={ICON.globe} className={styles.localeIcon} />
              United States (English)
            </span>
          </div>
          {FOOTER.map((column) => (
            <div key={column.title}>
              <h4 className={styles.footerHeading}>{column.title}</h4>
              <ul className={styles.footerLinks}>
                {column.links.map((link) => (
                  <li key={link}>
                    <a>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.footerBar}>
          <span>© 2026 Ledger, Inc.</span>
          <span>Privacy · Terms · Cookie settings</span>
        </div>
      </footer>
    </div>
  );
}
