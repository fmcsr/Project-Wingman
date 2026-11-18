import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './CollapsibleSidebar.module.css';
import sofia from '../photos/sofia.webp';

/**
 * Where the pointer is: down in the list, on the Favorites heading, where the toggle is with the sidebar open or
 * folded, or on the rail's Inbox icon.
 */
type Spot = 'rest' | 'favorites' | 'toggleOpen' | 'toggleRail' | 'inbox';

/** The tooltip showing, if any: the toggle's (“Collapse sidebar” or “Expand sidebar”) or the Inbox icon's. */
type Tip = 'collapse' | 'expand' | 'inbox';

/**
 * One beat of the loop: where the pointer is, whether Favorites is folded and the sidebar collapsed to its rail, the
 * tooltip showing, whether the pointer is pressing, and how long the beat lasts.
 */
type Step = { at: Spot; folded?: boolean; collapsed?: boolean; tip?: Tip; press?: boolean; ms: number };

/**
 * The pointer clicks the Favorites heading: the section folds (the teams below move up) and, clicked again, unfolds.
 * It moves to the toggle, whose tooltip comes up once it has rested there for 400ms, and clicks: the sidebar folds
 * into its icon rail and the list widens into the room. On the rail, the Inbox icon names itself in a tooltip; the
 * pointer goes back to the toggle and the sidebar opens again.
 */
const STEPS: Step[] = [
  { at: 'rest', ms: 900 },
  { at: 'favorites', ms: 700 },
  { at: 'favorites', press: true, ms: 120 },
  { at: 'favorites', folded: true, ms: 1200 },
  { at: 'favorites', folded: true, press: true, ms: 120 },
  { at: 'favorites', ms: 1000 },
  { at: 'toggleOpen', ms: 850 },
  { at: 'toggleOpen', tip: 'collapse', ms: 1100 },
  { at: 'toggleOpen', tip: 'collapse', press: true, ms: 120 },
  { at: 'toggleOpen', collapsed: true, ms: 900 },
  { at: 'inbox', collapsed: true, ms: 850 },
  { at: 'inbox', collapsed: true, tip: 'inbox', ms: 1300 },
  { at: 'toggleRail', collapsed: true, ms: 850 },
  { at: 'toggleRail', collapsed: true, tip: 'expand', ms: 800 },
  { at: 'toggleRail', collapsed: true, tip: 'expand', press: true, ms: 120 },
  { at: 'toggleRail', ms: 900 },
];

/** Reduced motion: the sidebar open with Favorites unfolded, the pointer on the toggle and its tooltip up. */
const FINAL = STEPS.findIndex((step) => step.tip === 'collapse');

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

/** What's under the pointer, so it gets its hover fill: the toggle only while it's where the pointer is. */
function hovered({ at, collapsed }: Step) {
  if (at === 'favorites' || at === 'inbox') return at;
  if ((at === 'toggleOpen' && !collapsed) || (at === 'toggleRail' && collapsed)) return 'toggle';
  return undefined;
}

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  inbox:
    'M3.5 13.5l2.4-7.1A2 2 0 0 1 7.8 5h8.4a2 2 0 0 1 1.9 1.4l2.4 7.1M3.5 13.5V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-4.5M3.5 13.5h4.3l1.4 2.5h5.6l1.4-2.5h4.3',
  myIssues: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6.6 18.2a6 6 0 0 1 10.8 0',
  projects: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  views: 'M12 3.5l8.5 4.5-8.5 4.5L3.5 8zM3.5 12.5l8.5 4.5 8.5-4.5',
  page: 'M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8zM14 3.5V8h4.5M9 13h6M9 16.5h4',
  checklist: 'M4 6.5l1.5 1.5L8.5 5M4 13.5l1.5 1.5 3-3M4 19.5h4.5M12 7h8M12 14h8M12 19.5h8',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  compose: 'M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M17.5 3.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z',
  chevron: 'M7 10l5 5 5-5',
  panel: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM9.5 4v16',
  filter: 'M4 7h16M7 12h10M10 17h4',
  sliders: 'M4 7h9M17 7h3M15 5v4M4 17h3M11 17h9M9 15v4',
};

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={`${styles.icon} ${className ?? ''}`} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/** The small filled triangle of a section heading: it points right when folded, down when open. */
function Disclosure() {
  return (
    <svg className={styles.disclosure} viewBox="0 0 10 10">
      <path d="M3.5 2.2l3.6 2.8-3.6 2.8z" />
    </svg>
  );
}

/** Key caps for a tooltip's shortcut. */
function Keys({ keys }: { keys: string[] }) {
  return (
    <span className={styles.keys}>
      {keys.map((key) => (
        <kbd key={key}>{key}</kbd>
      ))}
    </span>
  );
}

type Status = 'progress' | 'todo' | 'backlog';

/** The tracker's status rings: half full In Progress, empty Todo, dashed Backlog. */
function StatusIcon({ status }: { status: Status }) {
  return (
    <svg className={styles.status} data-status={status} viewBox="0 0 14 14">
      <circle cx="7" cy="7" r="5.75" />
      {status === 'progress' && <path d="M7 7V3.5a3.5 3.5 0 0 1 0 7z" />}
    </svg>
  );
}

type Priority = 0 | 1 | 2 | 3 | 4;

/** Priority: three bars filled to the level (1 low to 3 high), or a filled square with "!" for urgent (4). */
function PriorityIcon({ level }: { level: Priority }) {
  if (level === 4) {
    return (
      <svg className={styles.priority} data-urgent="" viewBox="0 0 14 14">
        <rect x="1" y="1" width="12" height="12" rx="3" />
        <path d="M7 4v3.6M7 9.9v.1" />
      </svg>
    );
  }
  return (
    <svg className={styles.priority} viewBox="0 0 14 14">
      {[0, 1, 2].map((bar) => (
        <rect
          key={bar}
          x={1.5 + bar * 4}
          y={8 - bar * 3}
          width="3"
          height={5 + bar * 3}
          rx="1"
          data-on={bar < level || undefined}
        />
      ))}
    </svg>
  );
}

type Issue = { id: string; title: string; priority: Priority; due: string; project?: string };

/** "Today" is Wednesday, November 18: twelve issues are assigned to the person signed in, as the sidebar counts. */
const GROUPS: { status: Status; name: string; issues: Issue[]; count: number }[] = [
  {
    status: 'progress',
    name: 'In Progress',
    count: 3,
    issues: [
      { id: 'HAR-142', title: 'Fix login redirect loop', priority: 4, due: 'Nov 20', project: 'Mobile launch' },
      { id: 'HAR-139', title: 'Onboarding email copy', priority: 3, due: 'Nov 21' },
      { id: 'HAR-151', title: 'Dark mode for charts', priority: 2, due: 'Nov 24', project: 'Design system' },
    ],
  },
  {
    status: 'todo',
    name: 'Todo',
    count: 4,
    issues: [
      { id: 'HAR-155', title: 'Members CSV export', priority: 3, due: 'Nov 27' },
      { id: 'HAR-148', title: 'Empty state for search', priority: 2, due: 'Nov 30', project: 'Design system' },
      { id: 'HAR-160', title: 'Rate-limit invite links', priority: 1, due: 'Dec 1', project: 'Mobile launch' },
      { id: 'HAR-162', title: 'Retry failed webhooks', priority: 1, due: 'Dec 3' },
    ],
  },
  { status: 'backlog', name: 'Backlog', count: 5, issues: [] },
];

/**
 * Collapsible sidebar: an issue tracker with its sidebar open on My issues: the workspace switcher, nav items with
 * their icons and counts, a Favorites section with a disclosure triangle and nested pages, the teams below and the
 * person signed in at the bottom; the list sits in an inset panel beside it. The loop folds and unfolds Favorites,
 * then collapses the sidebar into an icon rail (the panel widens into the room), shows the tooltip of a rail icon and
 * opens it again.
 */
export function CollapsibleSidebar() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-at={step.at}
      data-hover={hovered(step)}
      data-press={step.press || undefined}
      data-folded={step.folded || undefined}
      data-collapsed={step.collapsed || undefined}
    >
      <div className={styles.app}>
        <aside className={styles.sidebar} data-inspect="collapsible-sidebar">
          <div className={styles.workspace}>
            <span className={styles.logo}>H</span>
            <span className={styles.label}>
              Harbor
              <Icon d={ICONS.chevron} className={styles.caret} />
            </span>
            <span className={styles.headerTools}>
              <Icon d={ICONS.search} className={styles.search} />
              <Icon d={ICONS.compose} />
            </span>
          </div>

          <nav className={styles.nav}>
            <span className={`${styles.row} ${styles.inbox}`}>
              <span className={styles.iconSlot}>
                <Icon d={ICONS.inbox} />
                <span className={styles.dot} />
              </span>
              <span className={styles.label}>Inbox</span>
              <span className={styles.badge}>3</span>
            </span>
            <span className={styles.row} aria-current="page" data-inspect="collapsible-sidebar-active">
              <Icon d={ICONS.myIssues} />
              <span className={styles.label}>My issues</span>
              <span className={styles.count}>12</span>
            </span>
            <span className={styles.row}>
              <Icon d={ICONS.projects} />
              <span className={styles.label}>Projects</span>
            </span>
            <span className={`${styles.row} ${styles.views}`}>
              <Icon d={ICONS.views} />
              <span className={styles.label}>Views</span>
            </span>
          </nav>

          <div className={styles.section} data-inspect="collapsible-sidebar-section">
            <span className={styles.heading} aria-expanded={!step.folded}>
              <span className={styles.label}>
                Favorites
                <Disclosure />
              </span>
            </span>
            <div className={styles.items}>
              <span className={styles.row}>
                <Icon d={ICONS.projects} className={styles.project} />
                <span className={styles.label}>Mobile launch</span>
              </span>
              <span className={`${styles.row} ${styles.nested}`}>
                <Icon d={ICONS.page} />
                <span className={styles.label}>Release notes</span>
              </span>
              <span className={`${styles.row} ${styles.nested}`}>
                <Icon d={ICONS.checklist} />
                <span className={styles.label}>QA checklist</span>
              </span>
              <span className={`${styles.row} ${styles.afterNested}`}>
                <Icon d={ICONS.page} />
                <span className={styles.label}>Design system</span>
              </span>
            </div>
          </div>

          <div className={styles.teams}>
            <span className={styles.heading}>
              <span className={styles.label}>
                Your teams
                <Disclosure />
              </span>
            </span>
          </div>

          <span className={styles.me}>
            <img className={styles.face} src={sofia} alt="" width={22} height={22} />
            <span className={styles.label}>Sofia Reyes</span>
          </span>

          {/* The strip of icons that stays when the sidebar folds; transparent, there to be pointed at */}
          <span className={styles.rail} data-inspect="collapsible-sidebar-rail" />
        </aside>

        <div className={styles.main}>
          <header className={styles.header}>
            <span className={styles.toggle} data-inspect="collapsible-sidebar-toggle">
              <Icon d={ICONS.panel} />
            </span>
            <span className={styles.title}>My issues</span>
            <span className={styles.tools}>
              <Icon d={ICONS.filter} />
              <Icon d={ICONS.sliders} />
            </span>
          </header>
          <div className={styles.tabs}>
            <span className={styles.tab} aria-selected="true">
              Assigned
            </span>
            <span className={styles.tab}>Created</span>
            <span className={styles.tab}>Subscribed</span>
          </div>
          {GROUPS.map((group) => (
            <section key={group.status}>
              <div className={styles.group}>
                <StatusIcon status={group.status} />
                {group.name}
                <span className={styles.groupCount}>{group.count}</span>
              </div>
              {group.issues.map((issue) => (
                <div key={issue.id} className={styles.issue}>
                  <PriorityIcon level={issue.priority} />
                  <span className={styles.issueId}>{issue.id}</span>
                  <StatusIcon status={group.status} />
                  <span className={styles.issueTitle}>{issue.title}</span>
                  {issue.project && (
                    <span className={styles.chip}>
                      <Icon d={ICONS.projects} />
                      {issue.project}
                    </span>
                  )}
                  <span className={styles.due}>{issue.due}</span>
                </div>
              ))}
            </section>
          ))}
        </div>

        {/* The toggle's tooltips under it, the rail icon's beside it */}
        <span
          className={`${styles.tooltip} ${styles.collapseTip}`}
          data-shown={step.tip === 'collapse' || undefined}
          data-inspect="collapsible-sidebar-tooltip"
        >
          Collapse sidebar
          <Keys keys={['⌘', '\\']} />
        </span>
        <span
          className={`${styles.tooltip} ${styles.expandTip}`}
          data-shown={step.tip === 'expand' || undefined}
          data-inspect="collapsible-sidebar-tooltip"
        >
          Expand sidebar
          <Keys keys={['⌘', '\\']} />
        </span>
        <span
          className={`${styles.tooltip} ${styles.railTip}`}
          data-shown={step.tip === 'inbox' || undefined}
          data-inspect="collapsible-sidebar-tooltip"
        >
          Inbox
          <span className={styles.tipCount}>3 unread</span>
        </span>

        <svg className={styles.pointer} viewBox="0 0 14 20">
          <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
        </svg>
      </div>
    </div>
  );
}
