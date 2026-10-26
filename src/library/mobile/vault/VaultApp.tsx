import type { ReactNode } from 'react';
import { StatusBar } from '../../../demos/StatusBar';
import styles from './VaultApp.module.css';

const ACTIONS: { label: string; primary?: boolean; icon: ReactNode }[] = [
  { label: 'Add money', primary: true, icon: <path d="M12 5v14M5 12h14" /> },
  { label: 'Send', icon: <path d="M7 17L17 7M8.5 7H17v8.5" /> },
  { label: 'Request', icon: <path d="M17 7L7 17M15.5 17H7V8.5" /> },
  {
    label: 'More',
    icon: (
      <>
        <circle cx="6" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="18" cy="12" r="1.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

/**
 * This week's spending as a share of the busiest day (Wednesday, $64.10): Mon $42.80, Tue $18.50, Wed $64.10,
 * Thu $31.20 (today: the two purchases in Recent), $156.60 in all. Friday to Sunday haven't happened yet.
 */
const WEEK: { day: string; height?: number; today?: boolean }[] = [
  { day: 'M', height: 67 },
  { day: 'T', height: 29 },
  { day: 'W', height: 100 },
  { day: 'T', height: 49, today: true },
  { day: 'F' },
  { day: 'S' },
  { day: 'S' },
];

type Tone = 'person' | 'grocery' | 'coffee' | 'transit';

type Transaction = { name: string; detail: string; amount: string; incoming?: boolean; tone: Tone; avatar: ReactNode };

const TRANSACTIONS: Transaction[] = [
  {
    name: 'Maya Chen',
    detail: 'Transfer · 10:24 AM',
    amount: '+$45.00',
    incoming: true,
    tone: 'person',
    avatar: 'MC',
  },
  {
    name: 'Fernwood Market & Deli',
    detail: 'Groceries · 9:12 AM',
    amount: '−$26.40',
    tone: 'grocery',
    avatar: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.1" />
        <circle cx="9.5" cy="19.5" r="1.2" />
        <circle cx="17" cy="19.5" r="1.2" />
      </svg>
    ),
  },
  {
    name: 'Brew Lab Coffee',
    detail: 'Coffee · 8:05 AM',
    amount: '−$4.80',
    tone: 'coffee',
    avatar: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path d="M5 9h11v4.5a5.5 5.5 0 0 1-5.5 5.5A5.5 5.5 0 0 1 5 13.5zM16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" />
        <path d="M9 3.5c0 1.2 1 1.3 1 2.5M12.5 3.5c0 1.2 1 1.3 1 2.5" />
      </svg>
    ),
  },
  {
    name: 'City Rail',
    detail: 'Transport · Yesterday',
    amount: '−$2.90',
    tone: 'transit',
    avatar: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <rect x="6" y="3" width="12" height="14" rx="3" />
        <path d="M6 10h12M9 21l1.5-4M15 21l-1.5-4M9.5 13.5h.01M14.5 13.5h.01" />
      </svg>
    ),
  },
];

const TABS: { label: string; active?: boolean; icon: ReactNode }[] = [
  {
    label: 'Home',
    active: true,
    icon: <path d="M4 10.2L12 4l8 6.2V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" />,
  },
  {
    label: 'Cards',
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M3 10h18" />
      </>
    ),
  },
  { label: 'Payments', icon: <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4" /> },
  {
    label: 'Savings',
    icon: (
      <>
        <rect x="3.5" y="4.5" width="17" height="14" rx="2.5" />
        <circle cx="12" cy="11.5" r="3.5" />
        <path d="M7 18.5V20M17 18.5V20" />
      </>
    ),
  },
  {
    label: 'Insights',
    icon: <path d="M21 12a9 9 0 1 1-9-9v9zM15 3.5a5.5 5.5 0 0 1 5.5 5.5H15z" />,
  },
];

/**
 * Vault: a banking app's home screen, built from the patterns Revolut, Monzo and Cash App share. An account
 * switcher, a balance that can be hidden, quick actions, card art, a weekly spending chart and recent transactions.
 * Static and not interactive; for inspection only.
 */
export function VaultApp() {
  return (
    <div className={styles.app}>
      <StatusBar />

      <header className={styles.topBar}>
        <span className={styles.switcher} data-inspect="account-switcher">
          Personal
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <span className={styles.avatar} data-inspect="avatar">
          JL
        </span>
      </header>

      <div className={styles.balanceRow}>
        <div data-inspect="balance">
          <p className={styles.balanceLabel}>Total balance</p>
          <p className={styles.balanceValue}>
            $12,480<span className={styles.cents}>.36</span>
          </p>
        </div>
        <span className={styles.eye} data-inspect="visibility-toggle">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </span>
      </div>

      <div className={styles.actions}>
        {ACTIONS.map((action) => (
          <span
            key={action.label}
            className={action.primary ? `${styles.action} ${styles.actionPrimary}` : styles.action}
            data-inspect="quick-action"
          >
            <span className={styles.actionIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                {action.icon}
              </svg>
            </span>
            {action.label}
          </span>
        ))}
      </div>

      <div className={styles.widgets}>
        <div className={styles.card} data-inspect="payment-card">
          <span className={styles.cardTop}>
            <span className={styles.wordmark}>vault</span>
            <span className={styles.tag} data-inspect="card-tag">
              Virtual
            </span>
          </span>
          <span className={styles.chip} />
          <span className={styles.cardNumber} data-inspect="masked-number">
            •••• 4821
          </span>
        </div>

        <div className={styles.chart} data-inspect="spending-chart">
          <p className={styles.chartLabel}>Spent this week</p>
          <p className={styles.chartValue}>$156.60</p>
          <div className={styles.plot}>
            {WEEK.map((day, index) => (
              <span
                key={index}
                className={day.today ? styles.barToday : day.height ? styles.bar : styles.barFuture}
                style={day.height ? { height: `${day.height}%` } : undefined}
              />
            ))}
          </div>
          <div className={styles.days}>
            {WEEK.map((day, index) => (
              <span key={index} className={day.today ? styles.dayToday : undefined}>
                {day.day}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sectionHeader} data-inspect="section-header">
        <h3 className={styles.sectionTitle}>Recent</h3>
        <a className={styles.seeAll}>See all</a>
      </div>

      {/* The list runs on under the tab bar, as it would while scrolling */}
      <ul className={styles.list}>
        {TRANSACTIONS.map((transaction) => (
          <li key={transaction.name} className={styles.row} data-inspect="transaction-row">
            <span className={`${styles.merchant} ${styles[transaction.tone]}`} data-inspect="merchant-avatar">
              {transaction.avatar}
            </span>
            <span className={styles.rowText}>
              <span className={styles.rowTitle}>{transaction.name}</span>
              <span className={styles.rowDetail}>{transaction.detail}</span>
            </span>
            <span
              className={transaction.incoming ? `${styles.amount} ${styles.amountIn}` : styles.amount}
              data-inspect="amount"
            >
              {transaction.amount}
            </span>
          </li>
        ))}
      </ul>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        {TABS.map((tab) => (
          <span key={tab.label} className={tab.active ? styles.tabActive : styles.tab}>
            <svg viewBox="0 0 24 24" width="22" height="22">
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
