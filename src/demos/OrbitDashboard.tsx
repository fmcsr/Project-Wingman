import { useEffect, useId, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useCountUp, useDemoMotion, useEvery } from './motion';
import styles from './OrbitDashboard.module.css';

/** Line icons on a 24 × 24 grid; stroke color and width come from the stylesheet. */
const ICON = {
  home: 'M4 10.5L12 4l8 6.5V20h-5.5v-5.5h-5V20H4z',
  revenue: 'M4 20h16M5 15.5l4.5-4.5 3.5 3.5L19 8M15 8h4v4',
  customers:
    'M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3.5 20a6 6 0 0 1 12 0M16 4.3a3.5 3.5 0 0 1 0 6.4M17.5 14.2A6 6 0 0 1 20.5 20',
  events: 'M13 3L5 13.5h6.5L10.5 21 19 10.5h-6.5z',
  funnels: 'M4 5h16l-6.2 7.5V19l-3.6 1.5v-8z',
  retention: 'M19.5 9A8 8 0 0 0 5 7.5M4.5 15A8 8 0 0 0 19 16.5M5 3.5v4h4M19 20.5v-4h-4',
  dashboard: 'M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.6 9.4a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .8-1 1.5v.4M12 17h.01',
  bell: 'M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15zM10 21h4',
  calendar: 'M4 6h16v14H4zM4 10.5h16M8 3.5v4M16 3.5v4',
  chevronDown: 'M7 10l5 5 5-5',
  chevronsUpDown: 'M8 9.5l4-4 4 4M8 14.5l4 4 4-4',
  share: 'M12 15V4.5M8 8.5l4-4 4 4M5 13v6.5h14V13',
  arrowUp: 'M12 19V5.5M6.5 11L12 5.5l5.5 5.5',
  arrowDown: 'M12 5v13.5M6.5 13l5.5 5.5 5.5-5.5',
  arrowRight: 'M5 12h13.5M13 6.5l5.5 5.5-5.5 5.5',
  flag: 'M6 21V4M6 4.5h11l-2.5 4 2.5 4H6',
};

function Icon({ d, className = styles.icon }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

const NAV = [
  { label: 'Home', icon: ICON.home },
  { label: 'Revenue', icon: ICON.revenue, current: true },
  { label: 'Customers', icon: ICON.customers },
  { label: 'Events', icon: ICON.events },
  { label: 'Funnels', icon: ICON.funnels },
  { label: 'Retention', icon: ICON.retention },
];

const DASHBOARDS = ['Teams launch', 'Weekly KPIs', 'Board report'];

/*
 * The data tells one story: Marlow launched a Teams plan on Oct 21, and MRR has grown faster since.
 * MRR at the end of each day, Oct 10 – Nov 8 (this period) and Sep 10 – Oct 9 (the period before), in dollars.
 * The current period starts from $74,920 (the previous period's last day) and ends at $84,210.
 */
const MRR = [
  74970, 75100, 75270, 75420, 75670, 75880, 76050, 76170, 76280, 76490, 76730, 78150, 78580, 79060, 79190, 79350,
  79800, 80240, 80500, 80930, 81310, 81540, 81760, 82030, 82420, 82930, 83370, 83800, 83980, 84210,
];
const MRR_BEFORE = [
  68720, 68970, 69070, 69220, 69460, 69650, 69880, 70130, 70360, 70520, 70650, 70970, 71310, 71490, 71710, 71990,
  72110, 72230, 72430, 72790, 72960, 73200, 73440, 73580, 73740, 74010, 74210, 74460, 74680, 74920,
];
/** Net new MRR per day, as a 7-day average. */
const NET_NEW = [
  199, 194, 180, 173, 173, 171, 161, 171, 169, 174, 187, 354, 386, 430, 431, 439, 473, 501, 336, 336, 321, 336, 344,
  319, 311, 347, 349, 356, 349, 350,
];
const SUBSCRIPTIONS = [
  2025, 2027, 2030, 2034, 2037, 2042, 2046, 2048, 2049, 2053, 2057, 2080, 2086, 2092, 2094, 2096, 2100, 2105, 2110,
  2114, 2118, 2121, 2123, 2127, 2133, 2136, 2140, 2144, 2145, 2148,
];
/** Revenue churn over the trailing 30 days, in percent. */
const CHURN = [
  3.37, 3.4, 3.32, 3.34, 3.34, 3.27, 3.35, 3.33, 3.31, 3.29, 3.28, 3.24, 3.17, 3.12, 3.13, 3.09, 3.06, 3.12, 3.06, 3.1,
  3.05, 3.06, 2.99, 3.05, 2.95, 2.95, 3, 2.89, 2.92, 2.9,
];

/**
 * KPIs for Oct 10 – Nov 8 against Sep 10 – Oct 9. Churn going down is good news, so its badge is green too.
 * Net new MRR is the change in MRR over the period: $84,210 − $74,920 = $9,290 (before: $74,920 − $68,370).
 */
const STATS = [
  { label: 'MRR', value: '$84,210', delta: '12.4%', up: true, good: true, from: '$74,920', data: MRR },
  { label: 'Net new MRR', value: '$9,290', delta: '41.8%', up: true, good: true, from: '$6,550', data: NET_NEW },
  { label: 'Subscriptions', value: '2,148', delta: '6.1%', up: true, good: true, from: '2,024', data: SUBSCRIPTIONS },
  { label: 'Revenue churn', value: '2.9%', delta: '0.5 pts', up: false, good: true, from: '3.4%', data: CHURN },
];

/**
 * A figure as the page writes it ("$84,210", "2,148", "2.9%"): its number, and a way to write any value the same way
 * (the same symbols, separators and decimals), for the values in between while it counts up.
 */
function figure(text: string) {
  const [, before, digits, after] = /^(\D*)([\d,.]+)(\D*)$/.exec(text) ?? ['', '', text, ''];
  const decimals = digits.split('.')[1]?.length ?? 0;
  const format = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return {
    value: Number(digits.replace(/,/g, '')),
    write: (value: number) => `${before}${format.format(value)}${after}`,
  };
}

const FIGURES = STATS.map((stat) => figure(stat.value));

/** A sparkline in a 100 × 32 box: the line, the wash under it, and where the last point sits (in % from the top). */
function sparkline(values: readonly number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const y = (v: number) => 3 + (1 - (v - min) / (max - min)) * 26;
  const points = values.map((v, i) => `${((i / (values.length - 1)) * 100).toFixed(2)} ${y(v).toFixed(2)}`);
  const line = `M${points.join('L')}`;
  return { line, area: `${line}L100 32L0 32Z`, end: (y(values[values.length - 1]) / 32) * 100 };
}

const SPARKS = STATS.map((stat) => sparkline(stat.data));

/* Hero chart: 30 days across 600 units, $50k–$90k down 200 units. HTML layers use the same scale in percent. */
const Y_MIN = 50000;
const Y_MAX = 90000;
const chartX = (day: number) => (day / (MRR.length - 1)) * 600;
const chartY = (value: number) => ((Y_MAX - value) / (Y_MAX - Y_MIN)) * 200;
const pctX = (day: number) => (day / (MRR.length - 1)) * 100;
const pctY = (value: number) => ((Y_MAX - value) / (Y_MAX - Y_MIN)) * 100;
const path = (values: readonly number[]) =>
  values.map((v, i) => `${i ? 'L' : 'M'}${chartX(i).toFixed(1)} ${chartY(v).toFixed(1)}`).join('');

const LINE = path(MRR);
const LINE_BEFORE = path(MRR_BEFORE);
const AREA = `${LINE}L600 200L0 200Z`;
const Y_TICKS = [90000, 80000, 70000, 60000, 50000];
/**
 * Saturdays, thinning out as the chart narrows (the classes hide them). Oct 31 is left out: the hovered day's label
 * takes that spot, as it does in charting tools.
 */
const X_TICKS = [
  { day: 0, label: 'Oct 10' },
  { day: 7, label: 'Oct 17', className: styles.tickWide },
  { day: 14, label: 'Oct 24', className: styles.tickMedium },
  { day: 28, label: 'Nov 7' },
];
/** The Teams plan launched on Wednesday, Oct 21; the hovered day is Thursday, Oct 29 (Sep 29 the period before). */
const LAUNCH = 11;
const HOVER = 19;

/**
 * MRR on Nov 8 by plan, with the change since Oct 9. Both columns add up: $84,210 in total and +$9,290 net new.
 * Some Pro customers moved up to Teams, which is why Pro shrank; Teams already outsells Starter.
 */
const PLANS = [
  { name: 'Enterprise', value: '$34,800', amount: 34800, change: '+$1,400', up: true, isNew: false },
  { name: 'Pro', value: '$30,120', amount: 30120, change: '−$1,960', up: false, isNew: false },
  { name: 'Teams', value: '$9,410', amount: 9410, change: '+$9,410', up: true, isNew: true },
  { name: 'Starter', value: '$8,640', amount: 8640, change: '+$300', up: true, isNew: false },
  { name: 'Add-ons', value: '$1,240', amount: 1240, change: '+$140', up: true, isNew: false },
];

type FlagCode = 'us' | 'gb' | 'de' | 'fr' | 'nl';

/** MRR on Nov 8 by country; with the 31 other countries ($25,100, 29.8%) they add up to $84,210 and 100%. */
const COUNTRIES: { code: FlagCode; name: string; value: string; amount: number; share: string }[] = [
  { code: 'us', name: 'United States', value: '$31,990', amount: 31990, share: '38.0%' },
  { code: 'gb', name: 'United Kingdom', value: '$9,680', amount: 9680, share: '11.5%' },
  { code: 'de', name: 'Germany', value: '$8,170', amount: 8170, share: '9.7%' },
  { code: 'fr', name: 'France', value: '$5,140', amount: 5140, share: '6.1%' },
  { code: 'nl', name: 'Netherlands', value: '$4,130', amount: 4130, share: '4.9%' },
];

type Plan = 'Enterprise' | 'Teams' | 'Pro';
type Status = 'Paid' | 'Pending' | 'Failed' | 'Refunded';
type Payment = {
  customer: string;
  domain: string;
  initials: string;
  plan: Plan;
  seats: number;
  status: Status;
  date: string;
};

/** Price per seat per month. */
const PRICE: Record<Plan, number> = { Enterprise: 28, Teams: 20, Pro: 16 };
const amountOf = (payment: Payment) => payment.seats * PRICE[payment.plan];
const dollars = (value: number) => `$${Math.round(value).toLocaleString('en-US')}`;

/**
 * Monthly invoices, newest first: seats × the plan's price per seat. Collected adds up the paid ones in the table
 * ($840 + $4,480 = $5,320 here).
 */
const PAYMENTS: Payment[] = [
  {
    customer: 'Marigold Dental',
    domain: 'marigolddental.com',
    initials: 'MD',
    plan: 'Teams',
    seats: 42,
    status: 'Paid',
    date: 'Nov 8, 09:41',
  },
  {
    customer: 'Pinecrest Freight',
    domain: 'pinecrestfreight.com',
    initials: 'PF',
    plan: 'Enterprise',
    seats: 160,
    status: 'Paid',
    date: 'Nov 8, 08:15',
  },
  {
    customer: 'Quarry Studio',
    domain: 'quarry.studio',
    initials: 'QS',
    plan: 'Pro',
    seats: 9,
    status: 'Failed',
    date: 'Nov 7, 17:02',
  },
  {
    customer: 'Juniper Schools',
    domain: 'juniperschools.org',
    initials: 'JS',
    plan: 'Teams',
    seats: 28,
    status: 'Pending',
    date: 'Nov 7, 14:30',
  },
  {
    customer: 'Sable & Finch',
    domain: 'sableandfinch.com',
    initials: 'SF',
    plan: 'Pro',
    seats: 6,
    status: 'Refunded',
    date: 'Nov 6, 11:58',
  },
];

/**
 * Payments that come in while the table is in view, one every few seconds, in a loop: the same kinds of customers,
 * plans and prices as above, mostly paid. Each comes a number of minutes after the one before (the first after
 * 09:41), so the newest is always on top. Columns: customer, domain, initials, plan, seats, status, minutes.
 */
const INCOMING: [string, string, string, Plan, number, Status, number][] = [
  ['Halden Robotics', 'haldenrobotics.com', 'HR', 'Enterprise', 85, 'Paid', 4],
  ['Bayside Clinic', 'baysideclinic.com', 'BC', 'Teams', 18, 'Paid', 11],
  ['Otter & Pine', 'otterandpine.co', 'OP', 'Pro', 4, 'Paid', 3],
  ['Kestrel Analytics', 'kestrel.io', 'KA', 'Pro', 12, 'Pending', 7],
  ['Larkspur Hotels', 'larkspurhotels.com', 'LH', 'Enterprise', 96, 'Paid', 12],
  ['Fernhill Academy', 'fernhillacademy.org', 'FA', 'Teams', 35, 'Paid', 5],
  ['Ridgeway Design', 'ridgeway.design', 'RD', 'Pro', 7, 'Failed', 9],
  ['Harbor & Vine', 'harborandvine.com', 'HV', 'Teams', 24, 'Paid', 14],
  ['Tidepool Games', 'tidepool.games', 'TG', 'Teams', 22, 'Paid', 3],
  ['Ashgrove Legal', 'ashgrovelegal.com', 'AL', 'Enterprise', 48, 'Paid', 8],
  ['Bluebell Bakery', 'bluebellbakery.com', 'BB', 'Pro', 3, 'Pending', 6],
  ['Granite Health', 'granitehealth.co', 'GH', 'Teams', 56, 'Paid', 10],
];

const PILL: Record<Status, string> = {
  Paid: styles.pillPaid,
  Pending: styles.pillPending,
  Failed: styles.pillFailed,
  Refunded: styles.pillRefunded,
};

type Column = {
  name: string;
  /** Classes of the header and of the cells; the stylesheet hides some columns on narrow pages. */
  head?: string;
  cell: string;
  /** A payment's cell content. `inspect` is off for the copies that hold the column's width (see the header). */
  render: (row: Payment, inspect: boolean) => ReactNode;
};

const COLUMNS: Column[] = [
  {
    name: 'Customer',
    cell: styles.colCustomer,
    render: (row) => (
      <span className={styles.customer}>
        <span className={styles.logoTile}>{row.initials}</span>
        <span className={styles.stack}>
          <span className={styles.customerName}>{row.customer}</span>
          <span className={styles.secondary}>{row.domain}</span>
        </span>
      </span>
    ),
  },
  {
    name: 'Plan',
    head: styles.colPlan,
    cell: styles.colPlan,
    render: (row) => (
      <span className={styles.stack}>
        <span>{row.plan}</span>
        <span className={styles.secondary}>{`${row.seats} seats × $${PRICE[row.plan]}`}</span>
      </span>
    ),
  },
  {
    name: 'Status',
    head: styles.colStatus,
    cell: styles.colStatus,
    render: (row, inspect) => (
      <span className={PILL[row.status]} data-inspect={inspect ? 'status-pill' : undefined}>
        {row.status}
      </span>
    ),
  },
  {
    name: 'Date',
    head: styles.colDate,
    cell: `${styles.colDate} ${styles.date}`,
    render: (row) => row.date,
  },
  {
    name: 'Amount',
    head: `${styles.colAmount} ${styles.num}`,
    cell: `${styles.colAmount} ${styles.num} ${styles.amount}`,
    render: (row) => (
      <>
        {dollars(amountOf(row))}
        <span className={styles.cents}>.00</span>
      </>
    ),
  },
];

/** A new payment comes in this often while the table is in view and not being inspected. */
const ARRIVAL_MS = 6500;

/** A time in minutes after midnight on Nov 8, as the table writes it, e.g. "Nov 8, 09:55". */
function stamp(minutes: number) {
  const time = minutes % 1440;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `Nov ${8 + Math.floor(minutes / 1440)}, ${pad(Math.floor(time / 60))}:${pad(time % 60)}`;
}

type Feed = { rows: Payment[]; next: number; clock: number; count: number; arrivals: number };

/** The table as the page loads: the newest payment came in at 09:41, and there are 1,312 in the period. */
const FEED: Feed = { rows: PAYMENTS, next: 0, clock: 9 * 60 + 41, count: 1312, arrivals: 0 };

/** The next payment joins at the top and the oldest leaves, so there are always five rows. */
function arrive(feed: Feed): Feed {
  const [customer, domain, initials, plan, seats, status, minutes] = INCOMING[feed.next];
  const clock = feed.clock + minutes;
  return {
    rows: [{ customer, domain, initials, plan, seats, status, date: stamp(clock) }, ...feed.rows.slice(0, -1)],
    next: (feed.next + 1) % INCOMING.length,
    clock,
    count: feed.count + 1,
    arrivals: feed.arrivals + 1,
  };
}

/**
 * Recent payments as a live feed. Every ARRIVAL_MS while `playing`, the oldest row starts to fade out (`leaving`);
 * once it's gone (`onLeft`, at the end of that animation, so it holds when the table holds) the next payment comes
 * in. `updated` is for the page's "Updated …" line: "just now" after a payment, back to "2 min ago" over two minutes.
 */
function usePaymentFeed(playing: boolean) {
  const [feed, setFeed] = useState(FEED);
  const [leaving, setLeaving] = useState(false);
  const [minutesAgo, setMinutesAgo] = useState(2);

  useEvery(ARRIVAL_MS, playing, () => setLeaving(true));

  useEffect(() => {
    if (minutesAgo >= 2) return;
    const timer = window.setTimeout(() => setMinutesAgo(minutesAgo + 1), 60_000);
    return () => window.clearTimeout(timer);
  }, [minutesAgo, feed.arrivals]);

  const onLeft = () => {
    setFeed(arrive);
    setLeaving(false);
    setMinutesAgo(0);
  };

  return { ...feed, leaving, onLeft, updated: minutesAgo ? `${minutesAgo} min ago` : 'just now' };
}

/** Small flags drawn from their stripes (no emoji: those don't show on every system). */
function Flag({ code, id }: { code: FlagCode; id: string }) {
  if (code === 'us') {
    return (
      <svg className={styles.flag} viewBox="0 0 19 13" preserveAspectRatio="xMidYMid slice">
        <rect width="19" height="13" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((stripe) => (
          <rect key={stripe} y={stripe} width="19" height="1" fill="#b22234" />
        ))}
        <rect width="7.6" height="7" fill="#3c3b6e" />
      </svg>
    );
  }
  if (code === 'gb') {
    return (
      <svg className={styles.flag} viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
        <clipPath id={id}>
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
        </clipPath>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" strokeWidth="4" clipPath={`url(#${id})`} />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
      </svg>
    );
  }
  const stripes = {
    de: { vertical: false, colors: ['#000', '#dd0000', '#ffce00'] },
    fr: { vertical: true, colors: ['#0055a4', '#fff', '#ef4135'] },
    nl: { vertical: false, colors: ['#ae1c28', '#fff', '#21468b'] },
  }[code];
  return (
    <svg className={styles.flag} viewBox="0 0 3 3" preserveAspectRatio="none">
      {stripes.colors.map((color, i) =>
        stripes.vertical ? (
          <rect key={color} x={i} width="1" height="3" fill={color} />
        ) : (
          <rect key={color} y={i} width="3" height="1" fill={color} />
        ),
      )}
    </svg>
  );
}

type Entrance = { started: boolean; final: boolean };

/** Holds `started` back by `delay` ms, so the parts of a row can come in one after another. At once when `final`. */
function useDelayed({ started, final }: Entrance, delay: number): Entrance {
  const [due, setDue] = useState(false);

  useEffect(() => {
    if (!started || final) return;
    const timer = window.setTimeout(() => setDue(true), delay);
    return () => window.clearTimeout(timer);
  }, [started, final, delay]);

  return { started: final || due, final };
}

/** The KPI cards come in one after another, this far apart. */
const STAT_STAGGER_MS = 70;

/**
 * One KPI card. Once the row is in view, a beat after the card before it, the figure counts up while the sparkline
 * draws in (data-started; the stylesheet has the draw-in).
 */
function StatCard({ index, uid, entrance }: { index: number; uid: string; entrance: Entrance }) {
  const stat = STATS[index];
  const card = useDelayed(entrance, index * STAT_STAGGER_MS);
  const value = useCountUp(FIGURES[index].value, card);

  return (
    <div className={styles.stat} data-inspect="stat-card" data-started={card.started || undefined}>
      <span className={styles.statLabel}>{stat.label}</span>
      <span className={styles.statValue}>{FIGURES[index].write(value)}</span>
      <span className={styles.statFoot}>
        <span className={stat.good ? styles.deltaGood : styles.deltaBad} data-inspect="delta-badge">
          <Icon d={stat.up ? ICON.arrowUp : ICON.arrowDown} className={styles.deltaIcon} />
          {stat.delta}
        </span>
        <span className={styles.statFrom}>from {stat.from}</span>
      </span>
      <span className={styles.spark} data-inspect="sparkline">
        <svg viewBox="0 0 100 32" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`${uid}-spark-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop className={styles.accentStop} offset="0" stopOpacity="0.18" />
              <stop className={styles.accentStop} offset="1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={SPARKS[index].area} fill={`url(#${uid}-spark-${index})`} />
          <path className={styles.sparkLine} d={SPARKS[index].line} />
        </svg>
        <i className={styles.sparkDot} style={{ top: `${SPARKS[index].end}%` }} />
      </span>
    </div>
  );
}

/** Example project [02]: Orbit, a revenue analytics dashboard. Not interactive; for inspection only. */
export function OrbitDashboard() {
  // SVG ids must be unique in the page, so they're derived from React's id for this instance
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const maxPlan = Math.max(...PLANS.map((plan) => plan.amount));
  const maxCountry = Math.max(...COUNTRIES.map((country) => country.amount));

  // Entrances play once, as each part first comes into view; the payments go on arriving while that card plays
  const stats = useDemoMotion<HTMLDivElement>();
  const chart = useDemoMotion<HTMLDivElement>();
  const plans = useDemoMotion<HTMLDivElement>();
  const countries = useDemoMotion<HTMLDivElement>();
  const payments = useDemoMotion<HTMLElement>();
  const feed = usePaymentFeed(payments.playing);
  // Collected is what the paid payments in the table add up to; it follows as they come and go
  const paid = feed.rows.reduce((sum, row) => (row.status === 'Paid' ? sum + amountOf(row) : sum), 0);
  const collected = useCountUp(paid, payments, 700);

  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <aside className={styles.sidebar} data-inspect="sidebar">
          <div className={styles.sidebarInner}>
            <span className={styles.switcher} data-inspect="workspace-switcher">
              <span className={styles.workspaceLogo}>M</span>
              <span className={`${styles.label} ${styles.workspaceName}`}>Marlow</span>
              <Icon d={ICON.chevronsUpDown} className={`${styles.label} ${styles.switcherIcon}`} />
            </span>

            <nav className={styles.nav}>
              {NAV.map((item) => (
                <a
                  key={item.label}
                  className={styles.navItem}
                  data-inspect="nav-link"
                  aria-current={item.current ? 'page' : undefined}
                >
                  <Icon d={item.icon} />
                  <span className={styles.label}>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className={styles.navGroup}>
              <p className={styles.groupLabel}>Dashboards</p>
              {DASHBOARDS.map((name) => (
                <a key={name} className={styles.navItem} data-inspect="nav-link">
                  <Icon d={ICON.dashboard} className={`${styles.icon} ${styles.navMuted}`} />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className={styles.panel}>
          <header className={styles.topbar}>
            <span className={styles.search} data-inspect="search-field">
              <Icon d={ICON.search} className={styles.searchIcon} />
              <span className={styles.placeholder}>Search customers, events…</span>
              <kbd className={styles.kbd}>⌘K</kbd>
            </span>
            <span className={styles.topActions}>
              <span className={`${styles.iconButton} ${styles.helpButton}`}>
                <Icon d={ICON.help} />
              </span>
              <span className={styles.iconButton}>
                <Icon d={ICON.bell} />
                <i className={styles.unread} />
              </span>
              <span className={styles.avatar} data-inspect="avatar">
                FC
              </span>
            </span>
          </header>

          <div className={styles.content}>
            <div className={styles.pageHead}>
              <div className={styles.titleBlock}>
                <h3 className={styles.title}>Revenue</h3>
                <p className={styles.subtitle}>
                  All plans · USD<span className={styles.updated}> · Updated {feed.updated}</span>
                </p>
              </div>
              <span className={styles.button}>
                <Icon d={ICON.share} />
                <span className={styles.buttonText}>Share</span>
              </span>
            </div>

            <div className={styles.filters}>
              <span className={styles.dateRange} data-inspect="date-range-picker">
                <Icon d={ICON.calendar} />
                <span className={styles.preset}>Last 30 days</span>
                <span className={styles.dates}>Oct 10 – Nov 8, 2026</span>
                <Icon d={ICON.chevronDown} className={styles.chevron} />
              </span>
              <span className={styles.compare} data-inspect="compare-toggle">
                <span className={styles.switch} role="switch" aria-checked="true" />
                <span>Compare</span>
                <span className={styles.compareDates}>Sep 10 – Oct 9</span>
              </span>
              <span className={styles.segmented} role="radiogroup" data-inspect="segmented-control">
                <span className={styles.segmentActive} role="radio" aria-checked="true">
                  Day
                </span>
                <span role="radio" aria-checked="false">
                  Week
                </span>
                <span role="radio" aria-checked="false">
                  Month
                </span>
              </span>
            </div>

            <div ref={stats.ref} className={styles.stats}>
              {STATS.map((stat, index) => (
                <StatCard key={stat.label} index={index} uid={uid} entrance={stats} />
              ))}
            </div>

            <section className={styles.card}>
              <header className={styles.cardHeader}>
                <div>
                  <h4 className={styles.cardTitle}>MRR</h4>
                  <p className={styles.cardNote}>End of each day, all plans</p>
                </div>
                <div className={styles.legend}>
                  <span>
                    <i className={styles.keyCurrent} />
                    Oct 10 – Nov 8
                  </span>
                  <span>
                    <i className={styles.keyBefore} />
                    Sep 10 – Oct 9
                  </span>
                </div>
              </header>

              <div
                ref={chart.ref}
                className={styles.plot}
                data-inspect="area-chart"
                data-started={chart.started || undefined}
              >
                <div className={styles.yAxis} aria-hidden="true">
                  {Y_TICKS.map((tick) => (
                    <span key={tick} style={{ top: `${pctY(tick)}%` }}>
                      ${tick / 1000}k
                    </span>
                  ))}
                </div>
                <div className={styles.plotArea}>
                  {Y_TICKS.slice(0, -1).map((tick) => (
                    <i key={tick} className={styles.gridline} style={{ top: `${pctY(tick)}%` }} />
                  ))}
                  <svg className={styles.chart} viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
                        <stop className={styles.accentStop} offset="0" stopOpacity="0.16" />
                        <stop className={styles.accentStop} offset="1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className={styles.area} d={AREA} fill={`url(#${uid}-area)`} />
                    <path className={styles.lineBefore} d={LINE_BEFORE} />
                    <path className={styles.line} d={LINE} />
                  </svg>

                  <i className={styles.annotationLine} style={{ left: `${pctX(LAUNCH)}%` }} />
                  <span
                    className={styles.annotation}
                    style={{ left: `${pctX(LAUNCH)}%` }}
                    data-inspect="chart-annotation"
                  >
                    <Icon d={ICON.flag} className={styles.annotationIcon} />
                    Teams launch
                  </span>

                  {/* Thursday, Oct 29 as it looks while hovered: a crosshair, a dot on each line and the readout */}
                  <i className={styles.crosshair} style={{ left: `${pctX(HOVER)}%` }} />
                  <i
                    className={styles.dotBefore}
                    style={{ left: `${pctX(HOVER)}%`, top: `${pctY(MRR_BEFORE[HOVER])}%` }}
                  />
                  <i className={styles.dot} style={{ left: `${pctX(HOVER)}%`, top: `${pctY(MRR[HOVER])}%` }} />
                  <i className={styles.endDot} style={{ left: '100%', top: `${pctY(MRR[MRR.length - 1])}%` }} />
                  <div
                    className={styles.tooltip}
                    style={{ '--x': `${pctX(HOVER)}%` } as CSSProperties}
                    data-inspect="chart-tooltip"
                  >
                    <span className={styles.tooltipHead}>
                      <span>Thu, Oct 29</span>
                      <span className={styles.tooltipChange}>+11.2%</span>
                    </span>
                    <span className={styles.tooltipRow}>
                      <i className={styles.keyCurrent} />
                      <span className={styles.tooltipLabel}>MRR</span>
                      <b>$80,930</b>
                    </span>
                    <span className={styles.tooltipRow}>
                      <i className={styles.keyBefore} />
                      <span className={styles.tooltipLabel}>Sep 29</span>
                      <b>$72,790</b>
                    </span>
                  </div>
                </div>
                <div className={styles.xAxis} aria-hidden="true">
                  {X_TICKS.map((tick) => (
                    <span key={tick.label} className={tick.className} style={{ left: `${pctX(tick.day)}%` }}>
                      {tick.label}
                    </span>
                  ))}
                  {/* The hovered day, marked on the axis under the crosshair */}
                  <b className={styles.hoverTick} style={{ left: `${pctX(HOVER)}%` }}>
                    Oct 29
                  </b>
                </div>
              </div>
            </section>

            <div className={styles.split}>
              <section className={styles.card}>
                <header className={styles.cardHeader}>
                  <h4 className={styles.cardTitle}>MRR by plan</h4>
                  <span className={styles.cardMeta}>vs Oct 9</span>
                </header>
                <div
                  ref={plans.ref}
                  className={styles.barBlock}
                  data-inspect="bar-list"
                  data-started={plans.started || undefined}
                >
                  <div className={styles.barList}>
                    {PLANS.map((plan, index) => (
                      <div key={plan.name} className={styles.barRow}>
                        <span className={styles.barTrack}>
                          <span
                            className={styles.bar}
                            style={{ width: `${(plan.amount / maxPlan) * 100}%`, '--i': index } as CSSProperties}
                          />
                          <span className={styles.barLabel}>
                            <span className={styles.barName}>{plan.name}</span>
                            {plan.isNew && <span className={styles.newTag}>New</span>}
                          </span>
                        </span>
                        <span className={styles.barValue}>{plan.value}</span>
                        <span className={plan.up ? styles.changeUp : styles.changeDown}>{plan.change}</span>
                      </div>
                    ))}
                  </div>
                  <footer className={`${styles.cardFoot} ${styles.barFoot}`}>
                    <span>Total</span>
                    <span className={styles.barValue}>$84,210</span>
                    <span className={styles.changeUp}>+$9,290</span>
                  </footer>
                </div>
              </section>

              <section className={styles.card}>
                <header className={styles.cardHeader}>
                  <h4 className={styles.cardTitle}>MRR by country</h4>
                  <span className={styles.cardMeta}>36 countries</span>
                </header>
                <div
                  ref={countries.ref}
                  className={`${styles.barBlock} ${styles.withShare}`}
                  data-inspect="bar-list"
                  data-started={countries.started || undefined}
                >
                  <div className={styles.barList}>
                    {COUNTRIES.map((country, index) => (
                      <div key={country.code} className={styles.barRow}>
                        <span className={styles.barTrack}>
                          <span
                            className={styles.bar}
                            style={{ width: `${(country.amount / maxCountry) * 100}%`, '--i': index } as CSSProperties}
                          />
                          <span className={styles.barLabel}>
                            <Flag code={country.code} id={`${uid}-flag-${country.code}`} />
                            <span className={styles.barName}>{country.name}</span>
                          </span>
                        </span>
                        <span className={styles.barValue}>{country.value}</span>
                        <span className={styles.share}>{country.share}</span>
                      </div>
                    ))}
                  </div>
                  <footer className={`${styles.cardFoot} ${styles.barFoot}`}>
                    <span>31 more countries</span>
                    <span className={styles.barValue}>$25,100</span>
                    <span className={styles.share}>29.8%</span>
                  </footer>
                </div>
              </section>
            </div>

            <section ref={payments.ref} className={styles.card}>
              <header className={styles.cardHeader}>
                <div className={styles.headText}>
                  <h4 className={styles.cardTitle}>Recent payments</h4>
                  <p className={styles.cardNote}>Invoices, newest first</p>
                </div>
                <a className={styles.link}>
                  View all
                  <Icon d={ICON.arrowRight} className={styles.linkIcon} />
                </a>
              </header>
              <table className={styles.table} data-inspect="data-table" data-paused={!payments.playing || undefined}>
                <thead>
                  <tr>
                    {COLUMNS.map((column) => (
                      <th key={column.name} className={column.head}>
                        {column.name}
                        {/* The payments the page starts with, invisible and flat: the columns keep their widths
                            as payments come and go, instead of shifting with each one */}
                        <span className={styles.reserve}>
                          {PAYMENTS.map((row) => (
                            <span key={row.customer} className={column.cell}>
                              {column.render(row, false)}
                            </span>
                          ))}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* A new set of rows for each payment, so the rows play their entrance from the start */}
                <tbody
                  key={feed.arrivals}
                  data-arrived={feed.arrivals > 0 || undefined}
                  data-leaving={feed.leaving || undefined}
                  onAnimationEnd={(event) => {
                    if (feed.leaving && event.target === event.currentTarget.lastElementChild) feed.onLeft();
                  }}
                >
                  {feed.rows.map((row) => (
                    <tr key={row.customer}>
                      {COLUMNS.map((column) => (
                        <td key={column.name} className={column.cell}>
                          {column.render(row, true)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <footer className={styles.cardFoot}>
                <span className={styles.footCount}>5 of {feed.count.toLocaleString('en-US')} payments</span>
                <span className={styles.footValue}>
                  Collected <b>{`${dollars(collected)}.00`}</b>
                </span>
              </footer>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
