import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './AnimatedTabs.module.css';
import jonas from '../photos/jonas.webp';

const TABS = ['Overview', 'Deployments', 'Analytics', 'Logs', 'Settings'];

/**
 * One beat of the loop: the active tab, the tab the hover highlight sits on (`hovered` false: the pointer is down in
 * the panel and the highlight is hidden, already parked where it will show next), whether the pointer is pressing,
 * and how long the beat lasts.
 */
type Step = { active: number; pill: number; hovered: boolean; press?: boolean; ms: number };

/**
 * The pointer comes up from the panel onto Deployments and the highlight appears under it; a click, and the underline
 * slides over and widens to Deployments as the panel crossfades. The pointer glides on to Analytics, the highlight
 * ahead of it, and clicks; it drifts on to Logs and rests there. Then it goes back to Overview, clicks, the underline
 * slides back across three tabs, and the pointer leaves for the panel.
 */
const STEPS: Step[] = [
  { active: 0, pill: 1, hovered: false, ms: 1300 },
  { active: 0, pill: 1, hovered: true, ms: 650 },
  { active: 0, pill: 1, hovered: true, press: true, ms: 140 },
  { active: 1, pill: 1, hovered: true, ms: 1500 },
  { active: 1, pill: 2, hovered: true, ms: 560 },
  { active: 1, pill: 2, hovered: true, press: true, ms: 140 },
  { active: 2, pill: 2, hovered: true, ms: 1300 },
  { active: 2, pill: 3, hovered: true, ms: 1700 },
  { active: 2, pill: 0, hovered: true, ms: 680 },
  { active: 2, pill: 0, hovered: true, press: true, ms: 140 },
  { active: 0, pill: 0, hovered: true, ms: 1200 },
];

/** Reduced motion: Analytics open, the pointer and the highlight on Logs. */
const FINAL = STEPS[7];

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return final ? FINAL : STEPS[index];
}

/** Where things are, in px: each tab in the strip, the bar's box in the tile, the strip's full width. */
type Geometry = {
  tabs: { left: number; width: number }[];
  bar: { left: number; top: number; width: number; height: number };
  strip: number;
  tile: number;
};

/** Measures the tabs (and again whenever the tile, the bar or a tab changes size). */
function useGeometry(tile: HTMLElement | null, bar: HTMLElement | null, strip: HTMLElement | null) {
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useLayoutEffect(() => {
    if (!tile || !bar || !strip) return;
    const tabs = [...strip.querySelectorAll<HTMLElement>('[role="tab"]')];
    const observer = new ResizeObserver(() =>
      setGeometry({
        tabs: tabs.map((tab) => ({ left: tab.offsetLeft, width: tab.offsetWidth })),
        bar: { left: bar.offsetLeft, top: bar.offsetTop, width: bar.clientWidth, height: bar.offsetHeight },
        strip: strip.scrollWidth,
        tile: tile.clientWidth,
      }),
    );
    for (const element of [tile, bar, ...tabs]) observer.observe(element);
    return () => observer.disconnect();
  }, [tile, bar, strip]);

  return geometry;
}

/** How far the fades reach in: a tab the loop needs stays clear of them. */
const FADE = 44;

/**
 * Narrow tiles: how far the strip is scrolled so the active tab and the one under the pointer both show between the
 * fades, scrolling as little as possible.
 */
function scrollFor({ tabs, bar, strip }: Geometry, needed: number[]) {
  const max = Math.max(0, strip - bar.width);
  const right = Math.max(...needed.map((index) => tabs[index].left + tabs[index].width));
  const left = Math.min(...needed.map((index) => tabs[index].left));
  const offset = Math.min(Math.max(0, right - (bar.width - FADE)), Math.max(0, left - FADE));
  return { offset: Math.min(offset, max), max };
}

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  switcher: 'M8 9l4-4 4 4M8 15l4 4 4-4',
  chevronLeft: 'M15 6l-6 6 6 6',
  chevronRight: 'M9 6l6 6-6 6',
  branch: 'M6 4v11M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9',
  bell: 'M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9M10.3 20a2 2 0 0 0 3.4 0',
  external: 'M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10',
};

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={`${styles.icon} ${className ?? ''}`} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/** The thin slash between the parts of the breadcrumb. */
function Slash() {
  return (
    <svg className={styles.slash} viewBox="0 0 16 24">
      <path d="M11 3L5 21" />
    </svg>
  );
}

type Status = 'ready' | 'error';

function Dot({ status }: { status: Status }) {
  return <span className={styles.dot} data-status={status} />;
}

/** The production deployment: its state, where it lives and the commit it was built from. */
function OverviewPanel() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.cardTitle}>Production Deployment</span>
        <span className={styles.visit}>
          Visit
          <Icon d={ICONS.external} />
        </span>
      </div>
      <dl className={styles.facts}>
        <div>
          <dt>Status</dt>
          <dd>
            <Dot status="ready" />
            Ready
          </dd>
        </div>
        <div>
          <dt>Domains</dt>
          <dd>
            northwind.store <span className={styles.more}>+1</span>
          </dd>
        </div>
        <div className={styles.wideOnly}>
          <dt>Created</dt>
          <dd>
            2h ago
            <img className={styles.face} src={jonas} alt="" width={16} height={16} />
          </dd>
        </div>
        <div className={styles.wideOnly}>
          <dt>Source</dt>
          <dd>
            <Icon d={ICONS.branch} />
            main
            <span className={styles.commit}>Fix tax on gift cards</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

type Deployment = {
  id: string;
  production?: boolean;
  status: Status;
  took: string;
  branch: string;
  message: string;
  age: string;
};

const DEPLOYMENTS: Deployment[] = [
  {
    id: '8f3c2e1',
    production: true,
    status: 'ready',
    took: '42s',
    branch: 'main',
    message: 'Fix tax on gift cards',
    age: '2h',
  },
  { id: '41ab9d0', status: 'ready', took: '38s', branch: 'gift-cards', message: 'Add gift card checkout', age: '1d' },
  { id: 'c27e5f3', status: 'error', took: '12s', branch: 'deps/images', message: 'Bump image loader', age: '1d' },
  { id: '9d0e771', status: 'ready', took: '40s', branch: 'main', message: 'Cache product pages', age: '2d' },
];

/** The latest deployments, newest first: the one in production, two previews and a build that failed. */
function DeploymentsPanel() {
  return (
    <div className={styles.table}>
      {DEPLOYMENTS.map((deployment) => (
        <div key={deployment.id} className={styles.deployment}>
          <span className={styles.deployId}>
            <span className={styles.hash}>{deployment.id}</span>
            <span className={styles.env}>{deployment.production ? 'Production' : 'Preview'}</span>
          </span>
          <span className={styles.state}>
            <Dot status={deployment.status} />
            {deployment.status === 'ready' ? 'Ready' : 'Error'}
            <span className={styles.took}>{deployment.took}</span>
          </span>
          <span className={styles.source}>
            <Icon d={ICONS.branch} />
            <span className={styles.branch}>{deployment.branch}</span>
            <span className={styles.message}>{deployment.message}</span>
          </span>
          <span className={styles.age}>{deployment.age} ago</span>
        </div>
      ))}
    </div>
  );
}

/** Visitors a day over the last week, November 12 to 18: they add up to the 12,480 above the chart. */
const VISITORS = [1620, 1710, 1580, 1890, 2050, 1730, 1900];

/** The chart's line through the week, in a 600 × 100 box with some room above the busiest day. */
const LINE = VISITORS.map((count, day) => `${(day * 100).toFixed(0)},${(100 - (count - 1300) / 9).toFixed(1)}`);

/** The week's traffic: three totals with their change on the week before, and the visitors a day. */
function AnalyticsPanel() {
  return (
    <div className={styles.analytics}>
      <div className={styles.metrics}>
        <span className={styles.metric}>
          <span className={styles.metricLabel}>Visitors</span>
          <span className={styles.metricValue}>
            12,480<span className={styles.up}>+8%</span>
          </span>
        </span>
        <span className={styles.metric}>
          <span className={styles.metricLabel}>Page views</span>
          <span className={styles.metricValue}>
            38,912<span className={styles.up}>+5%</span>
          </span>
        </span>
        <span className={`${styles.metric} ${styles.wideOnly}`}>
          <span className={styles.metricLabel}>Bounce rate</span>
          <span className={styles.metricValue}>
            41%<span className={styles.up}>−2%</span>
          </span>
        </span>
      </div>
      <svg className={styles.chart} viewBox="0 0 600 100" preserveAspectRatio="none">
        <path className={styles.area} d={`M${LINE.join('L')}L600,100L0,100z`} />
        <path className={styles.line} d={`M${LINE.join('L')}`} />
      </svg>
      <span className={styles.axis}>
        <span>Nov 12</span>
        <span>Nov 18</span>
      </span>
    </div>
  );
}

/** The pages of the tabs the loop opens; it points at Logs but never opens it, and never goes to Settings. */
const PANELS: ReactNode[] = [
  <OverviewPanel key="overview" />,
  <DeploymentsPanel key="deployments" />,
  <AnalyticsPanel key="analytics" />,
];

/**
 * Tabs: a hosting dashboard's project page, its tab bar under the breadcrumb and the active tab's page below. The
 * active tab is underlined; a gray highlight follows the pointer from tab to tab. The loop: the pointer moves along
 * the bar and clicks, the highlight gliding ahead of it, and each click slides the underline over and fits it to the
 * new tab's width while the page crossfades. On narrow tiles the bar runs past the edge: it scrolls to keep the tabs
 * in play in view, with a fade and a chevron at each edge that has more.
 */
export function AnimatedTabs() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const [tile, setTile] = useState<HTMLDivElement | null>(null);
  const [bar, setBar] = useState<HTMLDivElement | null>(null);
  const [strip, setStrip] = useState<HTMLDivElement | null>(null);
  const tileRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref(node);
      setTile(node);
    },
    [ref],
  );
  const geometry = useGeometry(tile, bar, strip);
  const { offset, max } = geometry ? scrollFor(geometry, [step.active, step.pill]) : { offset: 0, max: 0 };
  const active = geometry?.tabs[step.active];
  const pill = geometry?.tabs[step.pill];

  // The pointer: on the hovered tab, a little right of its middle; resting at the right of the page while the
  // highlight is hidden, where the overview card has nothing to cover
  let pointer: CSSProperties | undefined;
  if (geometry && pill) {
    const { bar } = geometry;
    const x = step.hovered ? bar.left + pill.left + pill.width * 0.56 - offset : geometry.tile - 64;
    const y = step.hovered ? bar.top + bar.height * 0.58 : bar.top + bar.height + 62;
    pointer = { transform: `translate(${x}px, ${y}px)` };
  }

  return (
    <div
      ref={tileRef}
      className={styles.tile}
      data-hovered={step.hovered || undefined}
      data-press={step.press || undefined}
    >
      <header className={styles.header}>
        <svg className={styles.logo} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.25" />
          <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5z" />
        </svg>
        <span className={styles.team}>
          <Slash />
          <span className={styles.teamAvatar}>N</span>
          Northwind
          <span className={styles.plan}>Pro</span>
          <Icon d={ICONS.switcher} className={styles.switcher} />
        </span>
        <Slash />
        <span className={styles.project}>
          storefront
          <Icon d={ICONS.switcher} className={styles.switcher} />
        </span>
        <span className={styles.tools}>
          <span className={styles.feedback}>Feedback</span>
          <Icon d={ICONS.bell} className={styles.bell} />
          <img className={styles.avatar} src={jonas} alt="" width={24} height={24} />
        </span>
      </header>

      <div ref={setBar} className={styles.bar}>
        <div
          ref={setStrip}
          className={styles.strip}
          role="tablist"
          style={{ transform: `translateX(${-offset}px)` }}
          data-inspect="animated-tabs"
        >
          {active && pill && (
            <>
              <span
                className={styles.highlight}
                style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
                data-inspect="animated-tabs-hover"
              />
              <span
                className={styles.indicator}
                style={{
                  transform: `translateX(${active.left + 8}px) scaleX(${(active.width - 16) / 100})`,
                }}
                data-inspect="animated-tabs-indicator"
              />
            </>
          )}
          {TABS.map((name, index) => (
            <span
              key={name}
              className={styles.tab}
              role="tab"
              aria-selected={index === step.active}
              data-hovered={(step.hovered && index === step.pill) || undefined}
              data-inspect={index === step.active ? 'animated-tabs-active' : undefined}
            >
              {name}
            </span>
          ))}
        </div>

        <span className={styles.fade} data-edge="start" data-shown={offset > 0 || undefined} data-inspect="animated-tabs-fade">
          <span className={styles.scroll}>
            <Icon d={ICONS.chevronLeft} />
          </span>
        </span>
        <span className={styles.fade} data-edge="end" data-shown={offset < max || undefined} data-inspect="animated-tabs-fade">
          <span className={styles.scroll}>
            <Icon d={ICONS.chevronRight} />
          </span>
        </span>
      </div>

      <div className={styles.panel} role="tabpanel" data-inspect="animated-tabs-panel">
        {PANELS.map((panel, index) => (
          <div key={index} className={styles.page} data-shown={index === step.active || undefined}>
            {panel}
          </div>
        ))}
      </div>

      {geometry && (
        <span className={styles.pointer} style={pointer}>
          <svg className={styles.arrow} viewBox="0 0 14 20">
            <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
          </svg>
          <svg className={styles.hand} viewBox="0 0 24 24">
            <path d="M8.5 3.5a1.5 1.5 0 0 1 3 0V10a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0v.8a1.25 1.25 0 0 1 2.5 0V16a6 6 0 0 1-6 6h-1.6a5 5 0 0 1-4.1-2.1l-3.7-4.5a1.6 1.6 0 0 1 2.4-2.1l1.5 1.3z" />
            <path d="M11.5 10v3.2M14.5 10.5v2.7M17.5 11.3v2.2" />
          </svg>
        </span>
      )}
    </div>
  );
}
