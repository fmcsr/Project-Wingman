import styles from './TrackerSite.module.css';

/** Stroke icons on a 24px grid. */
const ICONS = {
  chevron: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  compose: 'M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M17.5 3.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z',
  inbox:
    'M3.5 13.5l2.4-7.1A2 2 0 0 1 7.8 5h8.4a2 2 0 0 1 1.9 1.4l2.4 7.1M3.5 13.5V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-4.5M3.5 13.5h4.3l1.4 2.5h5.6l1.4-2.5h4.3',
  myIssues: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6.6 18.2a6 6 0 0 1 10.8 0',
  views: 'M12 3.5l8.5 4.5-8.5 4.5L3.5 8zM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5',
  issues: 'M8 3.5h10.5a2 2 0 0 1 2 2V16M5.5 7.5h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z',
  cycles: 'M20 12a8 8 0 1 1-2.3-5.7M20 4.5v4h-4',
  projects: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  board: 'M4 4.5h4v15H4zM10 4.5h4v10h-4zM16 4.5h4v12h-4z',
  plus: 'M12 5v14M5 12h14',
  close: 'M7 7l10 10M17 7L7 17',
  sliders: 'M4 7h9M17 7h3M15 5v4M4 17h3M11 17h9M9 15v4',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7l1-1',
  menu: 'M4 7h16M4 12h16M4 17h16',
};

type Status = 'todo' | 'progress' | 'review' | 'done';

const STATUS_NAME: Record<Status, string> = {
  todo: 'Todo',
  progress: 'In Progress',
  review: 'In Review',
  done: 'Done',
};

/** Label colors are the same in both themes: only the small dot is colored, so the text keeps its contrast. */
const LABEL_COLORS = {
  Bug: '#e5484d',
  Feature: '#8e4ec6',
  API: '#0090ff',
  Performance: '#f76b15',
  Security: '#12a594',
  Design: '#d6409f',
  Docs: '#8b8d98',
};

type Label = keyof typeof LABEL_COLORS;

type Issue = {
  id: string;
  title: string;
  labels: Label[];
  due?: string;
  overdue?: boolean;
  /** The right-clicked row: highlighted, with its context menu open. */
  menu?: boolean;
};

type Group = { status: Status; count: number; collapsed?: boolean; issues: Issue[] };

/** "Today" in this picture is Monday, Oct 26. The filters show only high-priority issues assigned to me. */
const GROUPS: Group[] = [
  {
    status: 'progress',
    count: 4,
    issues: [
      {
        id: 'ENG-139',
        title: 'Checkout button stays disabled after editing the shipping address',
        labels: ['Bug'],
        due: 'Oct 23',
        overdue: true,
      },
      {
        id: 'ENG-142',
        title: 'Retry failed webhook deliveries with exponential backoff',
        labels: ['API'],
        due: 'Oct 28',
      },
      { id: 'ENG-151', title: 'Cache search results for repeated queries', labels: ['Performance'], due: 'Oct 30' },
      { id: 'ENG-127', title: 'Rotate refresh tokens on every sign-in', labels: ['Security'] },
    ],
  },
  { status: 'review', count: 2, collapsed: true, issues: [] },
  {
    status: 'todo',
    count: 6,
    issues: [
      { id: 'ENG-163', title: 'Dark mode for the billing settings page', labels: ['Design', 'Feature'], due: 'Nov 3' },
      {
        id: 'ENG-160',
        title: 'Inline error when a CSV import has duplicate emails',
        labels: ['Bug'],
        due: 'Oct 29',
        menu: true,
      },
      { id: 'ENG-158', title: 'Rate-limit password reset emails per account', labels: ['Security'] },
      { id: 'ENG-155', title: 'Cursor-based pagination for the audit log API', labels: ['API'], due: 'Nov 6' },
      { id: 'ENG-149', title: 'Lazy-load avatars in the members list', labels: ['Performance'] },
      { id: 'ENG-147', title: 'Runbook for payment provider outages', labels: ['Docs'], due: 'Nov 10' },
    ],
  },
  {
    status: 'done',
    count: 3,
    issues: [
      { id: 'ENG-138', title: 'Fix the timezone offset in weekly digest emails', labels: ['Bug'] },
      { id: 'ENG-134', title: 'Upgrade the background job queue to v5', labels: ['Performance'] },
      { id: 'ENG-131', title: 'Verify SSO domains for workspace admins', labels: ['Feature', 'Security'] },
    ],
  },
];

const NAV = [
  { label: 'Inbox', icon: ICONS.inbox, badge: '3' },
  { label: 'My issues', icon: ICONS.myIssues, count: '17' },
  { label: 'Views', icon: ICONS.views },
];

const TEAM_PAGES = [
  { label: 'Issues', icon: ICONS.issues, current: true },
  { label: 'Cycles', icon: ICONS.cycles },
  { label: 'Projects', icon: ICONS.projects },
];

const OTHER_TEAMS = [
  { name: 'Design', initial: 'D', color: '#c2298a' },
  { name: 'Growth', initial: 'G', color: '#18794e' },
];

const ENGINEERING = '#3e63dd';
/** The signed-in user, Maya Chen. */
const ME = { initials: 'MC', color: '#c2410c' };

const MEMBERS = [ME, { initials: 'JW', color: '#0e7490' }, { initials: 'SR', color: '#7c3aed' }];

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/** A ring that fills up as work moves along: empty, half, three quarters, then a check. */
function StatusIcon({ status }: { status: Status }) {
  return (
    <span
      className={`${styles.status} ${styles[status]}`}
      data-inspect="status-icon"
      role="img"
      aria-label={STATUS_NAME[status]}
    >
      <svg viewBox="0 0 14 14">
        {status === 'done' ? (
          <>
            <circle cx="7" cy="7" r="6.5" fill="currentColor" />
            <path
              d="M4.4 7.2l1.8 1.8 3.5-3.7"
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <circle cx="7" cy="7" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {status === 'progress' && <path d="M7 7V3.5a3.5 3.5 0 0 1 0 7z" fill="currentColor" />}
            {status === 'review' && <path d="M7 7V3.5a3.5 3.5 0 1 1-3.5 3.5z" fill="currentColor" />}
          </>
        )}
      </svg>
    </span>
  );
}

/** Three bars of rising height, like a signal meter; all three are filled for High. */
function BarsIcon({ className }: { className?: string }) {
  return (
    <svg className={className ? `${styles.bars} ${className}` : styles.bars} viewBox="0 0 14 14">
      <rect x="1" y="8" width="3" height="5" rx="1" />
      <rect x="5.5" y="5" width="3" height="8" rx="1" />
      <rect x="10" y="2" width="3" height="11" rx="1" />
    </svg>
  );
}

function ContextMenu() {
  return (
    <div className={styles.menu} role="menu" data-inspect="context-menu">
      <span className={`${styles.menuItem} ${styles.menuItemActive}`} role="menuitem" aria-keyshortcuts="A">
        <Icon d={ICONS.user} className={styles.menuIcon} />
        Assign
        <span className={styles.keys} data-inspect="shortcut-hint">
          <kbd className={styles.kbd}>A</kbd>
        </span>
      </span>
      <span className={styles.menuItem} role="menuitem" aria-keyshortcuts="P">
        <BarsIcon className={styles.menuBars} />
        Change priority
        <span className={styles.keys} data-inspect="shortcut-hint">
          <kbd className={styles.kbd}>P</kbd>
        </span>
      </span>
      <span className={styles.menuSeparator} role="separator" />
      <span className={styles.menuItem} role="menuitem" aria-keyshortcuts="Meta+Shift+,">
        <Icon d={ICONS.link} className={styles.menuIcon} />
        Copy link
        <span className={styles.keys} data-inspect="shortcut-hint">
          <kbd className={styles.kbd}>⌘</kbd>
          <kbd className={styles.kbd}>⇧</kbd>
          <kbd className={styles.kbd}>,</kbd>
        </span>
      </span>
    </div>
  );
}

function IssueRow({ issue, status }: { issue: Issue; status: Status }) {
  return (
    <div className={issue.menu ? `${styles.row} ${styles.rowSelected}` : styles.row} data-inspect="issue-row">
      <StatusIcon status={status} />
      <span className={styles.issueId}>{issue.id}</span>
      <span className={styles.title}>{issue.title}</span>
      <span className={styles.labels}>
        {issue.labels.map((label) => (
          <span key={label} className={styles.label} data-inspect="label-pill">
            <span className={styles.labelDot} style={{ background: LABEL_COLORS[label] }} />
            {label}
          </span>
        ))}
      </span>
      <span className={styles.priority} data-inspect="priority-icon" role="img" aria-label="Priority: High">
        <BarsIcon />
      </span>
      <span className={styles.assignee} style={{ background: ME.color }}>
        {ME.initials}
      </span>
      <span className={issue.overdue ? `${styles.due} ${styles.overdue}` : styles.due}>{issue.due}</span>
      {issue.menu && <ContextMenu />}
    </div>
  );
}

/**
 * Library example: an issue tracker's list view. A dense, keyboard-first app screen with a sticky toolbar,
 * collapsible groups and a context menu shown open on one row. Not interactive; for inspection only.
 */
export function TrackerSite() {
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <span className={styles.workspace} data-inspect="workspace-switcher" aria-haspopup="menu">
              <span className={styles.workspaceLogo}>H</span>
              Halcyon
              <Icon d={ICONS.chevron} className={styles.chevron} />
            </span>

            <span className={styles.newIssue} data-inspect="new-issue-button" aria-keyshortcuts="C">
              <Icon d={ICONS.compose} />
              New issue
              <span className={styles.keys} data-inspect="shortcut-hint">
                <kbd className={styles.kbd}>C</kbd>
              </span>
            </span>

            <nav className={styles.nav}>
              {NAV.map((item) => (
                <a key={item.label} className={styles.navItem} data-inspect="nav-item">
                  <Icon d={item.icon} />
                  {item.label}
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  {item.count && <span className={styles.count}>{item.count}</span>}
                </a>
              ))}
            </nav>

            <div className={styles.section} data-inspect="sidebar-section">
              <span className={styles.sectionHeader} role="button" aria-expanded="true">
                <Icon d={ICONS.chevron} className={styles.chevron} />
                Teams
              </span>
              <span className={styles.team} role="button" aria-expanded="true">
                <Icon d={ICONS.chevron} className={styles.chevron} />
                <span className={styles.teamIcon} style={{ background: ENGINEERING }}>
                  E
                </span>
                Engineering
              </span>
              <div className={styles.teamPages}>
                {TEAM_PAGES.map((page) => (
                  <a
                    key={page.label}
                    className={styles.navItem}
                    data-inspect="nav-item"
                    aria-current={page.current ? 'page' : undefined}
                  >
                    <Icon d={page.icon} />
                    {page.label}
                  </a>
                ))}
              </div>
              {OTHER_TEAMS.map((team) => (
                <span key={team.name} className={styles.team} role="button" aria-expanded="false">
                  <Icon d={ICONS.chevron} className={styles.chevron} />
                  <span className={styles.teamIcon} style={{ background: team.color }}>
                    {team.initial}
                  </span>
                  {team.name}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div className={styles.main}>
          <div className={styles.top}>
            <header className={styles.header}>
              <span className={styles.menuButton}>
                <Icon d={ICONS.menu} />
              </span>

              <nav className={styles.breadcrumbs} aria-label="Breadcrumb" data-inspect="breadcrumbs">
                <ol>
                  <li>
                    <a className={styles.crumb}>
                      <span className={styles.crumbIcon} style={{ background: ENGINEERING }}>
                        E
                      </span>
                      Engineering
                    </a>
                  </li>
                  <li>
                    <Icon d={ICONS.chevronRight} className={styles.crumbSeparator} />
                    <a className={styles.crumb} aria-current="page">
                      Issues
                    </a>
                  </li>
                </ol>
              </nav>

              <div className={styles.tabs} role="tablist" data-inspect="view-tabs">
                <span className={styles.tab} role="tab" aria-selected="true">
                  Active
                </span>
                <span className={styles.tab} role="tab" aria-selected="false">
                  Backlog
                </span>
                <span className={styles.tab} role="tab" aria-selected="false">
                  All
                </span>
              </div>

              <div className={styles.headerEnd}>
                <span className={styles.avatarStack} data-inspect="avatar-stack">
                  {MEMBERS.map((member) => (
                    <span key={member.initials} className={styles.stackAvatar} style={{ background: member.color }}>
                      {member.initials}
                    </span>
                  ))}
                  <span className={`${styles.stackAvatar} ${styles.stackMore}`}>+5</span>
                </span>
                <span className={styles.switcher} role="radiogroup" data-inspect="view-switcher">
                  <span className={styles.switcherOption} role="radio" aria-checked="true">
                    <Icon d={ICONS.list} />
                    <span className={styles.switcherLabel}>List</span>
                  </span>
                  <span className={styles.switcherOption} role="radio" aria-checked="false">
                    <Icon d={ICONS.board} />
                    <span className={styles.switcherLabel}>Board</span>
                  </span>
                </span>
              </div>
            </header>

            <div className={styles.filterBar}>
              <span className={styles.chip} data-inspect="filter-chip">
                <span className={styles.chipBody}>
                  <span className={styles.chipField}>Assignee:</span>
                  <span className={styles.miniAvatar} style={{ background: ME.color }}>
                    {ME.initials}
                  </span>
                  <span className={styles.chipValue}>Me</span>
                </span>
                <span className={styles.chipRemove} role="button" aria-label="Remove Assignee filter">
                  <Icon d={ICONS.close} />
                </span>
              </span>
              <span className={styles.chip} data-inspect="filter-chip">
                <span className={styles.chipBody}>
                  <span className={styles.chipField}>Priority:</span>
                  <BarsIcon className={styles.chipBars} />
                  <span className={styles.chipValue}>High</span>
                </span>
                <span className={styles.chipRemove} role="button" aria-label="Remove Priority filter">
                  <Icon d={ICONS.close} />
                </span>
              </span>
              <span className={styles.addFilter}>
                <Icon d={ICONS.plus} />
                Filter
              </span>
              <span className={styles.display}>
                <Icon d={ICONS.sliders} />
                <span className={styles.displayLabel}>Display</span>
              </span>
            </div>
          </div>

          <div>
            {GROUPS.map((group) => (
              <section key={group.status}>
                <div className={styles.groupHeader} data-inspect="group-header">
                  <span className={styles.groupToggle} role="button" aria-expanded={!group.collapsed}>
                    <Icon d={ICONS.chevron} className={styles.chevron} />
                    <StatusIcon status={group.status} />
                    {STATUS_NAME[group.status]}
                    <span className={styles.groupCount}>{group.count}</span>
                  </span>
                  <span className={styles.groupAdd} role="button" aria-label="New issue in this group">
                    <Icon d={ICONS.plus} />
                  </span>
                </div>
                {!group.collapsed &&
                  group.issues.map((issue) => <IssueRow key={issue.id} issue={issue} status={group.status} />)}
              </section>
            ))}

            <p className={styles.hint}>
              <span className={styles.hintText} data-inspect="shortcut-hint">
                Press <kbd className={styles.kbd}>C</kbd> to create an issue
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
