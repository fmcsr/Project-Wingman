import type { ReactNode } from 'react';
import styles from './OrbitDashboard.module.css';

const NAV: { label: string; icon: ReactNode }[] = [
  { label: 'Overview', icon: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /> },
  { label: 'Reports', icon: <path d="M5 20V10M12 20V4M19 20v-7" /> },
  { label: 'Customers', icon: <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6M22 21a6 6 0 0 0-4-5.6" /> },
  { label: 'Settings', icon: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3" /> },
];

const STATS = [
  { label: 'Revenue', value: '$48.2k', delta: '12.4%', up: true },
  { label: 'Active users', value: '3,904', delta: '4.1%', up: true },
  { label: 'Avg. session', value: '6m 12s', delta: '3.2%', up: false },
];

const ROWS = [
  { customer: 'Northwind', date: 'Oct 21', amount: '$4,200.00', status: 'Paid' },
  { customer: 'Globex', date: 'Oct 19', amount: '$1,850.00', status: 'Pending' },
  { customer: 'Initech', date: 'Oct 16', amount: '$3,120.00', status: 'Paid' },
  { customer: 'Umbrella', date: 'Oct 12', amount: '$960.00', status: 'Overdue' },
] as const;

const PILL = { Paid: styles.pillPaid, Pending: styles.pillPending, Overdue: styles.pillOverdue };

/** Weekly revenue curve (smaller y = higher value). */
const VALUES = [120, 112, 116, 98, 102, 88, 92, 76, 70, 74, 56, 44];
const POINTS = VALUES.map((y, i) => [(i / (VALUES.length - 1)) * 600, y] as const);

/** Builds a smooth curve through the points (Catmull-Rom → cubic Bezier). */
function smoothPath(points: readonly (readonly [number, number])[]) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[Math.max(i - 1, 0)];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = points[Math.min(i + 2, points.length - 1)];
    d +=
      `C${(x1 + (x2 - x0) / 6).toFixed(1)} ${(y1 + (y2 - y0) / 6).toFixed(1)} ` +
      `${(x2 - (x3 - x1) / 6).toFixed(1)} ${(y2 - (y3 - y1) / 6).toFixed(1)} ${x2.toFixed(1)} ${y2}`;
  }
  return d;
}

const LINE = smoothPath(POINTS);
const AREA = `${LINE}L600 160L0 160Z`;

/** Example project [02]: an analytics dashboard. Not interactive; for inspection only. */
export function OrbitDashboard() {
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <aside className={styles.sidebar} data-inspect="sidebar">
          <div className={styles.brand}>
            <span className={styles.brandMark} />
            <span className={styles.label}>Orbit</span>
          </div>
          <nav className={styles.nav}>
            {NAV.map((item, index) => (
              <a
                key={item.label}
                className={styles.navItem}
                data-inspect="nav-link"
                aria-current={index === 0 ? 'page' : undefined}
              >
                <svg className={styles.icon} viewBox="0 0 24 24">
                  {item.icon}
                </svg>
                <span className={styles.label}>{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className={styles.main}>
          <header className={styles.topbar}>
            <span className={styles.search} data-inspect="search-field">
              <svg className={styles.icon} viewBox="0 0 24 24">
                <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" />
              </svg>
              <span className={styles.placeholder}>Search customers…</span>
              <kbd className={styles.kbd}>⌘K</kbd>
            </span>
            <span className={styles.avatar} data-inspect="avatar">
              FC
            </span>
          </header>

          <div className={styles.content}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>Overview</h3>
              <div className={styles.segmented} data-inspect="segmented-control">
                <span>Day</span>
                <span className={styles.segmentActive}>Week</span>
                <span>Month</span>
              </div>
            </div>

            <div className={styles.stats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat} data-inspect="stat-card">
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={stat.up ? styles.deltaUp : styles.deltaDown} data-inspect="delta-badge">
                    {stat.up ? '↑' : '↓'} {stat.delta}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span>Revenue</span>
                <span className={styles.muted}>Last 12 weeks</span>
              </div>
              <svg className={styles.chart} viewBox="0 0 600 160" preserveAspectRatio="none" data-inspect="area-chart">
                <defs>
                  <linearGradient id="orbit-area-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120].map((y) => (
                  <line key={y} className={styles.gridline} x1="0" x2="600" y1={y} y2={y} />
                ))}
                <path d={AREA} fill="url(#orbit-area-fill)" />
                <path className={styles.line} d={LINE} />
              </svg>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span>Recent invoices</span>
              </div>
              <table className={styles.table} data-inspect="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th className={styles.dateCell}>Date</th>
                    <th className={styles.num}>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.customer}>
                      <td>{row.customer}</td>
                      <td className={styles.dateCell}>{row.date}</td>
                      <td className={styles.num}>{row.amount}</td>
                      <td>
                        <span className={PILL[row.status]} data-inspect="status-pill">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
