import type { ReactNode } from 'react';
import { StatusBar } from '../../../demos/StatusBar';
import leo from './photos/leo.webp';
import styles from './VaultApp.module.css';

/** The Vault mark: a V with flat-cut tops. It is the logo, and the Home tab's icon. */
const MARK = 'M3.5 4h4.6L12 15.2 15.9 4h4.6L14.3 20.5h-4.6z';

const ACTIONS: { label: string; icon: ReactNode }[] = [
  { label: 'Add money', icon: <path d="M12 6v12M6 12h12" /> },
  {
    label: 'Exchange',
    icon: <path d="M17.6 9.2A6 6 0 0 0 7 7.4M6.4 14.8A6 6 0 0 0 17 16.6M7.1 4.3v3.4h3.4M16.9 19.7v-3.4h-3.4" />,
  },
  { label: 'Details', icon: <path d="M4.5 9.3 12 5l7.5 4.3zM7 11.5v5M10.3 11.5v5M13.7 11.5v5M17 11.5v5M4.5 19h15" /> },
  {
    label: 'More',
    icon: (
      <>
        <circle className={styles.dotGlyph} cx="6" cy="12" r="1.7" />
        <circle className={styles.dotGlyph} cx="12" cy="12" r="1.7" />
        <circle className={styles.dotGlyph} cx="18" cy="12" r="1.7" />
      </>
    ),
  },
];

/** Round flags, drawn plainly: the stripes and the blue corner of the US flag, the EU flag's ring of stars. */
const US_FLAG = (
  <svg className={styles.flag} viewBox="0 0 20 20">
    <rect width="20" height="20" fill="#fff" />
    {[0, 2, 4, 6].map((stripe) => (
      <rect key={stripe} y={stripe * (20 / 7)} width="20" height={20 / 7} fill="#c8102e" />
    ))}
    <rect width="10" height={(20 / 7) * 4} fill="#1f3a8a" />
  </svg>
);

const EU_FLAG = (
  <svg className={styles.flag} viewBox="0 0 20 20">
    <rect width="20" height="20" fill="#1f3fa6" />
    {Array.from({ length: 12 }, (_, star) => (
      <circle
        key={star}
        cx={10 + 5.6 * Math.sin((star * Math.PI) / 6)}
        cy={10 - 5.6 * Math.cos((star * Math.PI) / 6)}
        r="0.95"
        fill="#ffd23f"
      />
    ))}
  </svg>
);

/** Thumbnails of the cards on this account, and a tile to order another. */
const CARDS: { name: string; meta: string; tone: 'green' | 'sand' }[] = [
  { name: 'Everyday', meta: '··4821', tone: 'green' },
  { name: 'Online', meta: '··2270', tone: 'sand' },
];

const TABS: { label: string; active?: boolean; icon: ReactNode }[] = [
  { label: 'Home', active: true, icon: <path className={styles.solid} d={MARK} /> },
  { label: 'Invest', icon: <path d="M3.5 17.5 9 12l3.5 3.5 7.5-8M15.2 7.5h4.8v4.8" /> },
  { label: 'Payments', icon: <path d="M4 8.5h13.5M14 4.8l3.7 3.7-3.7 3.7M20 15.5H6.5M10 11.8l-3.7 3.7 3.7 3.7" /> },
  {
    label: 'Savings',
    icon: (
      <path d="M5 7c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 8.4 5 7zM5 7v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7M5 12v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5" />
    ),
  },
  {
    label: 'Perks',
    icon: (
      <>
        <rect className={styles.solid} x="4" y="4" width="7" height="7" rx="2.2" />
        <circle className={styles.solid} cx="16.5" cy="7.5" r="3.6" />
        <circle className={styles.solid} cx="7.5" cy="16.5" r="3.6" />
        <rect className={styles.solid} x="13" y="13" width="7" height="7" rx="2.2" />
      </>
    ),
  },
];

/**
 * Library example: a banking app's home screen, laid out like Revolut's account overview. The profile photo, a
 * search pill and two round buttons over a wash of the brand color; the account's balance with the Accounts button
 * and the dots of the account pager; four quick actions; then the cards of the home screen: recent transactions with
 * See all, and the account's payment cards. A frosted tab bar starts with the Vault mark.
 */
export function VaultApp() {
  return (
    <div className={styles.app}>
      <StatusBar className={styles.onWash} />

      <header className={styles.topBar}>
        <span className={styles.avatar} data-inspect="avatar">
          <img className={styles.avatarPhoto} src={leo} alt="" draggable={false} />
          <span className={styles.avatarDot} />
        </span>
        <span className={styles.search} data-inspect="search-bar">
          <svg viewBox="0 0 24 24" width="12" height="12">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.3 15.3 20 20" />
          </svg>
          Search
        </span>
        <span className={styles.roundButton} data-inspect="analytics-button">
          <svg viewBox="0 0 24 24" width="13" height="13">
            <rect className={styles.solid} x="4.5" y="11" width="4" height="9" rx="2" />
            <rect className={styles.solid} x="10" y="4" width="4" height="16" rx="2" />
            <rect className={styles.solid} x="15.5" y="8" width="4" height="12" rx="2" />
          </svg>
        </span>
        <span className={styles.roundButton} data-inspect="cards-button">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <rect className={styles.solid} x="3" y="5.5" width="18" height="13" rx="3" />
            <path className={styles.cutout} d="M3 10h18" />
          </svg>
        </span>
      </header>

      <div className={styles.hero}>
        <div className={styles.balance} data-inspect="balance">
          <p className={styles.accountName}>Personal · USD</p>
          <p className={styles.amountBig}>
            $4,218<span className={styles.cents}>.56</span>
          </p>
        </div>
        <span className={styles.accountsButton} data-inspect="accounts-button">
          Accounts
        </span>
        <span className={styles.pager} data-inspect="page-dots">
          <span className={styles.pagerDotOn} />
          <span className={styles.pagerDot} />
          <span className={styles.pagerDot} />
        </span>
      </div>

      <div className={styles.actions}>
        {ACTIONS.map((action) => (
          <span key={action.label} className={styles.action} data-inspect="quick-action">
            <span className={styles.actionIcon}>
              <svg viewBox="0 0 24 24" width="16" height="16">
                {action.icon}
              </svg>
            </span>
            {action.label}
          </span>
        ))}
      </div>

      {/* The cards run on under the tab bar, as they would while scrolling */}
      <section className={styles.widget}>
        <div className={styles.row} data-inspect="transaction-row">
          <span className={styles.merchant} data-inspect="merchant-logo">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M6.5 17.5C6.5 11 10.5 6.5 17.5 6.5c0 7-4.5 11-11 11zM6.5 17.5l5.5-5.5" />
            </svg>
          </span>
          <span className={styles.rowText}>
            <span className={styles.rowTitle}>Fernwood Market</span>
            <span className={styles.rowMeta}>Today, 09:12</span>
          </span>
          <span className={styles.amount} data-inspect="amount">
            <span className={styles.amountMain}>−$38.20</span>
          </span>
        </div>

        <div className={styles.row} data-inspect="transaction-row">
          <span className={styles.flags} data-inspect="currency-pair">
            <span className={styles.flagFrom}>{US_FLAG}</span>
            <span className={styles.flagTo}>{EU_FLAG}</span>
          </span>
          <span className={styles.rowText}>
            <span className={styles.rowTitle}>USD → EUR</span>
            <span className={styles.rowMeta}>Yesterday, 21:40</span>
          </span>
          <span className={styles.amount} data-inspect="amount">
            <span className={styles.amountMain}>−$250</span>
            <span className={styles.amountOther}>+€231.40</span>
          </span>
        </div>

        <span className={styles.seeAll} data-inspect="see-all">
          See all
        </span>
      </section>

      <section className={`${styles.widget} ${styles.cardsWidget}`} data-inspect="cards-widget">
        <h3 className={styles.widgetTitle}>
          Cards
          <svg viewBox="0 0 24 24" width="9" height="9">
            <path d="M9 5.5l6.5 6.5L9 18.5" />
          </svg>
        </h3>
        <div className={styles.cardRow}>
          {CARDS.map((card) => (
            <span key={card.name} className={styles.cardItem}>
              <span className={`${styles.cardThumb} ${styles[card.tone]}`} data-inspect="card-thumbnail">
                <svg className={styles.cardMark} viewBox="0 0 24 24" width="7" height="7">
                  <path d={MARK} />
                </svg>
              </span>
              <span className={styles.cardName}>{card.name}</span>
              <span className={styles.cardMeta}>{card.meta}</span>
            </span>
          ))}
          <span className={styles.cardItem}>
            <span className={`${styles.cardThumb} ${styles.newCard}`}>
              <svg viewBox="0 0 24 24" width="12" height="12">
                <path d="M12 6v12M6 12h12" />
              </svg>
            </span>
            <span className={styles.cardName}>Get card</span>
          </span>
        </div>
      </section>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        {TABS.map((tab) => (
          <span key={tab.label} className={tab.active ? styles.tabActive : styles.tab}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              {tab.icon}
            </svg>
            {tab.label}
          </span>
        ))}
      </nav>
      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
