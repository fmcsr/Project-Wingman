import styles from './OrbitSlop.module.css';

const NAV = [
  { emoji: '🏠', label: 'Dashboard', active: true },
  { emoji: '📊', label: 'Analytics' },
  { emoji: '👥', label: 'Customers' },
  { emoji: '💰', label: 'Revenue' },
  { emoji: '📦', label: 'Products' },
  { emoji: '⚙️', label: 'Settings' },
];

const STATS = [
  { emoji: '💰', label: 'Total Revenue', value: '$45,231.89', change: '20.1%', tone: styles.violet },
  { emoji: '👥', label: 'Active Users', value: '+2,350', change: '180.1%', tone: styles.blue },
  { emoji: '🛒', label: 'Total Sales', value: '+12,234', change: '19%', tone: styles.green },
  { emoji: '⚡', label: 'Active Now', value: '+573', change: '201', tone: styles.orange },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Bar heights in percent: made-up numbers that only ever go up, roughly. */
const BARS = [42, 58, 47, 72, 55, 83, 64, 90, 68, 86, 76, 97];

const SALES = [
  { initials: 'JD', name: 'John Doe', email: 'john@example.com', amount: '+$1,999.00' },
  { initials: 'JS', name: 'Jane Smith', email: 'jane@example.com', amount: '+$39.00' },
  { initials: 'AJ', name: 'Alex Johnson', email: 'alex@example.com', amount: '+$299.00' },
  { initials: 'SW', name: 'Sarah Wilson', email: 'sarah@example.com', amount: '+$99.00' },
  { initials: 'MB', name: 'Mike Brown', email: 'mike@example.com', amount: '+$39.00' },
];

const SOURCES = [
  { label: 'Direct', value: '40%', color: '#8b5cf6' },
  { label: 'Social', value: '30%', color: '#ec4899' },
  { label: 'Referral', value: '20%', color: '#3b82f6' },
  { label: 'Other', value: '10%', color: '#f59e0b' },
];

const GOALS = [
  { emoji: '💰', label: 'Revenue', value: 75 },
  { emoji: '🚀', label: 'New Users', value: 60 },
  { emoji: '❤️', label: 'Retention', value: 90 },
];

const TRANSACTIONS = [
  {
    initials: 'EC',
    name: 'Emma Clark',
    email: 'emma@example.com',
    product: '🚀 Pro Plan',
    status: 'completed',
    date: 'Nov 8, 2026',
    amount: '$299.00',
  },
  {
    initials: 'LG',
    name: 'Liam Garcia',
    email: 'liam@example.com',
    product: '💎 Enterprise',
    status: 'pending',
    date: 'Nov 8, 2026',
    amount: '$1,999.00',
  },
  {
    initials: 'AM',
    name: 'Ava Martinez',
    email: 'ava@example.com',
    product: '⚡ Starter',
    status: 'completed',
    date: 'Nov 7, 2026',
    amount: '$39.00',
  },
  {
    initials: 'NL',
    name: 'Noah Lewis',
    email: 'noah@example.com',
    product: '🚀 Pro Plan',
    status: 'failed',
    date: 'Nov 7, 2026',
    amount: '$299.00',
  },
  {
    initials: 'MW',
    name: 'Mia Walker',
    email: 'mia@example.com',
    product: '💎 Enterprise',
    status: 'completed',
    date: 'Nov 6, 2026',
    amount: '$1,999.00',
  },
] as const;

const STATUS = {
  completed: { label: '✅ Completed', className: styles.statusCompleted },
  pending: { label: '⏳ Pending', className: styles.statusPending },
  failed: { label: '❌ Failed', className: styles.statusFailed },
};

/**
 * The AI slop version of Orbit: what "Build an analytics dashboard for my startup" tends to produce. A gradient
 * sidebar with emoji icons, rainbow stat cards with made-up numbers, a bar chart that only goes up, an "AI insights"
 * card and a table of placeholder customers. A picture for comparison only: nothing is focusable or inspectable.
 */
export function OrbitSlop() {
  return (
    <div className={styles.page}>
      <span className={`${styles.blob} ${styles.blobA}`} />
      <span className={`${styles.blob} ${styles.blobB}`} />
      <span className={`${styles.blob} ${styles.blobC}`} />

      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <span className={styles.logo}>🚀</span>
            <span className={styles.brandName}>Orbit</span>
            <span className={styles.brandBadge}>AI</span>
          </div>
          <p className={styles.navLabel}>Main Menu</p>
          <ul className={styles.nav}>
            {NAV.map((item) => (
              <li key={item.label} className={item.active ? styles.navItemActive : styles.navItem}>
                <span className={styles.navEmoji}>{item.emoji}</span>
                {item.label}
                {item.label === 'Analytics' && <span className={styles.navNew}>New</span>}
              </li>
            ))}
          </ul>
          <div className={styles.upgrade}>
            <span className={styles.upgradeEmoji}>✨</span>
            <p className={styles.upgradeTitle}>Upgrade to Pro</p>
            <p className={styles.upgradeText}>Unlock AI-powered insights and unlimited reports!</p>
            <span className={styles.upgradeButton}>Upgrade Now 🚀</span>
          </div>
        </aside>

        <div className={styles.main}>
          <div className={styles.topbar}>
            <span className={styles.menu}>☰</span>
            <span className={styles.mobileBrand}>
              <span className={styles.logo}>🚀</span>
              <span className={styles.brandName}>Orbit</span>
            </span>
            <span className={styles.search}>
              <span>🔍</span>
              Search anything...
            </span>
            <span className={styles.topActions}>
              <span className={styles.roundIcon}>🌙</span>
              <span className={styles.roundIcon}>
                🔔
                <span className={styles.dot}>3</span>
              </span>
              <span className={styles.user}>
                <span className={styles.avatar}>JD</span>
                <span className={styles.userText}>
                  <span className={styles.userName}>John Doe</span>
                  <span className={styles.userRole}>Admin</span>
                </span>
              </span>
            </span>
          </div>

          <div className={styles.content}>
            <div className={styles.welcome}>
              <div>
                <span className={styles.aiBadge}>✨ AI-Powered Analytics</span>
                <h3 className={styles.title}>
                  <span className={styles.gradientText}>Welcome back, John!</span> 👋
                </h3>
                <p className={styles.subtitle}>Here's what's happening with your startup today. 🚀</p>
              </div>
              <div className={styles.welcomeActions}>
                <span className={styles.ghostButton}>📅 Last 30 days</span>
                <span className={styles.gradientButton}>⬇️ Export Report</span>
              </div>
            </div>

            <div className={styles.stats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={`${styles.stat} ${stat.tone}`}>
                  <div className={styles.statTop}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <span className={styles.statEmoji}>{stat.emoji}</span>
                  </div>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statChange}>
                    <span className={styles.statDelta}>↑ {stat.change}</span>
                    <span>vs last month</span>
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.row}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardTitle}>📈 Revenue Overview</p>
                    <p className={styles.cardText}>Your revenue is growing fast! 🔥</p>
                  </div>
                  <span className={styles.pill}>This Year ▾</span>
                </div>
                <div className={styles.chart}>
                  <div className={styles.bars}>
                    {BARS.map((height, index) => (
                      <span key={MONTHS[index]} className={styles.barSlot}>
                        <span className={styles.bar} style={{ height: `${height}%` }} />
                      </span>
                    ))}
                  </div>
                  <div className={styles.months}>
                    {MONTHS.map((month) => (
                      <span key={month}>{month}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${styles.card} ${styles.salesCard}`}>
                <p className={styles.cardTitle}>🔥 Recent Sales</p>
                <p className={styles.cardText}>You made 265 sales this month! 🎉</p>
                <ul className={styles.sales}>
                  {SALES.map((sale) => (
                    <li key={sale.email} className={styles.sale}>
                      <span className={styles.saleAvatar}>{sale.initials}</span>
                      <span className={styles.saleText}>
                        <span className={styles.saleName}>{sale.name}</span>
                        <span className={styles.saleEmail}>{sale.email}</span>
                      </span>
                      <span className={styles.saleAmount}>{sale.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`${styles.row} ${styles.thirdRow}`}>
              <div className={styles.card}>
                <p className={styles.cardTitle}>🎯 Traffic Sources</p>
                <div className={styles.donutRow}>
                  <span className={styles.donut}>
                    <span className={styles.donutRing} />
                    <span className={styles.donutValue}>
                      12.4K
                      <span>Visitors</span>
                    </span>
                  </span>
                  <ul className={styles.legend}>
                    {SOURCES.map((source) => (
                      <li key={source.label}>
                        <span className={styles.legendDot} style={{ background: source.color }} />
                        {source.label}
                        <span className={styles.legendValue}>{source.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`${styles.card} ${styles.goalsCard}`}>
                <p className={styles.cardTitle}>🏆 Monthly Goals</p>
                <ul className={styles.goals}>
                  {GOALS.map((goal) => (
                    <li key={goal.label}>
                      <span className={styles.goalHead}>
                        <span>
                          {goal.emoji} {goal.label}
                        </span>
                        <span className={styles.goalValue}>{goal.value}%</span>
                      </span>
                      <span className={styles.track}>
                        <span className={styles.fill} style={{ width: `${goal.value}%` }} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.insight}>
                <div className={styles.insightHead}>
                  <span className={styles.insightEmoji}>🤖</span>
                  <span className={styles.insightTitle}>AI Insights</span>
                  <span className={styles.insightNew}>✨ New</span>
                </div>
                <p className={styles.insightText}>
                  Great news! 🎉 Your revenue is up 20.1% this month. Our AI recommends doubling down on social media
                  to unlock even more growth! 🚀
                </p>
                <span className={styles.insightButton}>Generate Report ✨</span>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.cardTitle}>📋 Recent Transactions</p>
                  <p className={styles.cardText}>Track all your latest payments in one place 💸</p>
                </div>
                <span className={styles.viewAll}>View All →</span>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th className={styles.colProduct}>Product</th>
                    <th className={styles.colStatus}>Status</th>
                    <th className={styles.colDate}>Date</th>
                    <th className={styles.colAmount}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.map((row) => (
                    <tr key={row.email}>
                      <td>
                        <span className={styles.customer}>
                          <span className={styles.saleAvatar}>{row.initials}</span>
                          <span className={styles.saleText}>
                            <span className={styles.saleName}>{row.name}</span>
                            <span className={styles.saleEmail}>{row.email}</span>
                          </span>
                        </span>
                      </td>
                      <td className={styles.colProduct}>{row.product}</td>
                      <td className={styles.colStatus}>
                        <span className={STATUS[row.status].className}>{STATUS[row.status].label}</span>
                      </td>
                      <td className={styles.colDate}>{row.date}</td>
                      <td className={styles.colAmount}>{row.amount}</td>
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
