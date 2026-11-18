import type { ReactNode } from 'react';
import styles from './LanesSite.module.css';
import claraPhoto from './photos/clara.webp';
import erikPhoto from './photos/erik.webp';
import imaniPhoto from './photos/imani.webp';
import kofiPhoto from './photos/kofi.webp';
import noahPhoto from './photos/noah.webp';
import rosaPhoto from './photos/rosa.webp';

/** Line icons on a 20px grid; stroke color and width come from the stylesheet. */
const ICONS = {
  search: 'M8.75 14.5a5.75 5.75 0 1 0 0-11.5 5.75 5.75 0 0 0 0 11.5zM13 13l4 4',
  plus: 'M10 4.25v11.5M4.25 10h11.5',
  chevronDown: 'M6.25 8.25L10 12l3.75-3.75',
  chevronRight: 'M8.25 5.75L12.5 10l-4.25 4.25',
  /** A window with a column on its left: show or hide the sidebar */
  sidebar:
    'M4.25 4h11.5A1.25 1.25 0 0 1 17 5.25v9.5A1.25 1.25 0 0 1 15.75 16H4.25A1.25 1.25 0 0 1 3 14.75v-9.5A1.25 1.25 0 0 1 4.25 4zM8 4v12',
  bell:
    'M10 3.25a4.75 4.75 0 0 0-4.75 4.75v3.6L3.75 14.5h12.5l-1.5-2.9V8A4.75 4.75 0 0 0 10 3.25zM8.1 16.75a1.95 1.95 0 0 0 3.8 0',
  help:
    'M10 17.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5zM7.9 7.9a2.2 2.2 0 0 1 4.25.75c0 1.45-2.15 1.8-2.15 3.1M10 14.15h.01',
  settings:
    'M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM8.6 3.25h2.8l.45 1.9 1.45.85 1.85-.6 1.4 2.4-1.4 1.35v1.7l1.4 1.35-1.4 2.4-1.85-.6-1.45.85-.45 1.9H8.6l-.45-1.9-1.45-.85-1.85.6-1.4-2.4 1.4-1.35V9.15l-1.4-1.35 1.4-2.4 1.85.6 1.45-.85z',
  /** A head and shoulders in a circle */
  forYou:
    'M10 17.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5zM10 10.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8zM5.6 15.1a5 5 0 0 1 8.8 0',
  clock: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 6.5V10l2.5 1.5',
  star: 'M10 3.4l1.95 3.95 4.35.63-3.15 3.07.74 4.33L10 13.33l-3.89 2.05.74-4.33L3.7 7.98l4.35-.63z',
  /** Two overlapping squares: spaces */
  spaces: 'M3.75 7.75h8.5v8.5h-8.5zM7.75 3.75h8.5v8.5',
  filter: 'M3.75 6h12.5M6 10h8M8.25 14h3.5',
  dashboards: 'M3.75 3.75h5.5v7h-5.5zM10.75 3.75h5.5v4h-5.5zM10.75 9.25h5.5v7h-5.5zM3.75 12.25h5.5v4h-5.5z',
  globe:
    'M10 17.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5zM2.75 10h14.5M10 2.75c1.9 2 2.85 4.4 2.85 7.25S11.9 15.25 10 17.25C8.1 15.25 7.15 12.85 7.15 10S8.1 4.75 10 2.75z',
  list: 'M7.75 5.5h8.5M7.75 10h8.5M7.75 14.5h8.5M4 5.5h.01M4 10h.01M4 14.5h.01',
  /** Three columns side by side: the board */
  board: 'M3.75 4.25h12.5v11.5H3.75zM7.9 4.25v11.5M12.1 4.25v11.5',
  calendar:
    'M4.75 4.5h10.5a1 1 0 0 1 1 1v9.75a1 1 0 0 1-1 1H4.75a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1zM3.75 8.25h12.5M7 2.75V6M13 2.75V6',
  timeline: 'M3.75 5.5h7.5M6.75 10h9.5M3.75 14.5h6',
  pages: 'M5.75 3.25h6l3.5 3.5v10H5.75zM11.75 3.25v3.5h3.5M8 10.5h4.5M8 13.5h4.5',
  forms: 'M4.75 3.75h10.5v12.5H4.75zM7.5 7.25h5M7.5 10h5M7.5 12.75h3',
  people:
    'M7.5 9.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5zM2.75 16.25a4.75 4.75 0 0 1 9.5 0M13.25 9.25a2.25 2.25 0 1 0 0-4.5M14.75 12.1a4 4 0 0 1 2.5 3.9',
  share:
    'M14.25 6.75a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5.75 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM14.25 17.25a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.5 9l5-2.75M7.5 11l5 2.75',
  bolt: 'M11 2.75L4.75 11.25h5l-1 6 6.5-8.75h-5z',
  expand: 'M11.75 3.75h4.5v4.5M16.25 3.75l-5 5M8.25 16.25h-4.5v-4.5M3.75 16.25l5-5',
  /** A rising line in a frame: insights */
  insights: 'M3.75 3.75v12.5h12.5M6.75 12.75l3-3.5 2.5 2 3.25-4.5',
  sliders:
    'M3.75 6.25h7M14.25 6.25h2M3.75 13.75h2M9.25 13.75h7M12.75 8.25a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.25 15.75a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  person: 'M10 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4.5 16.75a5.5 5.5 0 0 1 11 0',
  check: 'M5 10.5l3.25 3.25L15 7',
  dueDate:
    'M4.75 4.5h10.5a1 1 0 0 1 1 1v9.75a1 1 0 0 1-1 1H4.75a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1zM3.75 8.25h12.5M7 2.75V6M13 2.75V6',
  flag: 'M5.25 17V3.75M5.25 4.25h9.5l-2 3.5 2 3.5h-9.5',
  warning: 'M10 3.5l7 12.5H3zM10 8.25v3.5M10 14h.01',
};

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 20 20" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** Three dots in a row: "more". */
function Dots() {
  return (
    <svg className={styles.dots} viewBox="0 0 20 20" aria-hidden="true">
      {[4.5, 10, 15.5].map((at) => (
        <circle key={at} cx={at} cy="10" r="1.5" />
      ))}
    </svg>
  );
}

/** Nine dots in a square: the app switcher. */
function AppGrid() {
  const spots = [5, 10, 15];
  return (
    <svg className={styles.dots} viewBox="0 0 20 20" aria-hidden="true">
      {spots.flatMap((y) => spots.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" />))}
    </svg>
  );
}

/** Lanes' own mark: three columns of cards hanging from one rail, on a teal tile. */
function LanesLogo() {
  return (
    <svg className={styles.logoMark} viewBox="0 0 24 24" aria-hidden="true">
      <rect className={styles.logoTile} width="24" height="24" rx="6" />
      <rect className={styles.logoBar} x="5.5" y="6" width="3.4" height="11" rx="1.7" />
      <rect className={styles.logoBar} x="10.3" y="6" width="3.4" height="7" rx="1.7" />
      <rect className={styles.logoBar} x="15.1" y="6" width="3.4" height="9" rx="1.7" />
    </svg>
  );
}

type SpaceTone = 'coral' | 'violet' | 'amber' | 'blue';

/** A space's avatar: a colored tile with a simple white glyph, the way teams pick one when they create a space. */
function SpaceIcon({ tone, glyph, className }: { tone: SpaceTone; glyph: string; className?: string }) {
  return (
    <svg className={`${styles.spaceIcon} ${styles[tone]} ${className ?? ''}`} viewBox="0 0 20 20" aria-hidden="true">
      <rect width="20" height="20" rx="5" />
      <path d={glyph} />
    </svg>
  );
}

const SPACE_GLYPHS = {
  /** A shopping bag */
  bag: 'M6 8h8l-.6 7H6.6zM8 8V6.75a2 2 0 0 1 4 0V8',
  /** A rising line */
  chart: 'M5.5 13.5l3-3.5 2.25 2 3.75-4.5',
  /** A circle and a square: shapes */
  shapes: 'M8 10.25a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10.75 10.75h4v4h-4z',
  /** Angle brackets */
  code: 'M8.25 7l-3 3 3 3M11.75 7l3 3-3 3',
};

type Person = { name: string; photo: string };

/** The signed-in user. */
const IMANI: Person = { name: 'Imani Brooks', photo: imaniPhoto };
const KOFI: Person = { name: 'Kofi Mensah', photo: kofiPhoto };
const ROSA: Person = { name: 'Rosa Alvarez', photo: rosaPhoto };
const ERIK: Person = { name: 'Erik Lund', photo: erikPhoto };
const NOAH: Person = { name: 'Noah Feld', photo: noahPhoto };
const CLARA: Person = { name: 'Clara Nilsen', photo: claraPhoto };

function Avatar({ person, className, labeled }: { person: Person; className: string; labeled?: boolean }) {
  return (
    <img
      className={`${styles.avatar} ${className}`}
      src={person.photo}
      alt={labeled ? person.name : ''}
      draggable={false}
    />
  );
}

type IssueType = 'story' | 'task' | 'bug';

const TYPE_LABELS: Record<IssueType, string> = { story: 'Story', task: 'Task', bug: 'Bug' };

/** Each work type's own icon on a 16px tile: a bookmark for a story, a check for a task, a dot for a bug. */
function TypeIcon({ type }: { type: IssueType }) {
  return (
    <svg className={`${styles.typeIcon} ${styles[type]}`} viewBox="0 0 16 16" role="img" aria-label={TYPE_LABELS[type]}>
      <rect width="16" height="16" rx="3.5" />
      {type === 'story' && <path className={styles.glyphFill} d="M5 4h6v8.5l-3-2.2-3 2.2z" />}
      {type === 'task' && <path className={styles.glyphStroke} d="M4.75 8.25l2.1 2.1 4.4-4.6" />}
      {type === 'bug' && <circle className={styles.glyphFill} cx="8" cy="8" r="3.1" />}
    </svg>
  );
}

type Priority = 'highest' | 'high' | 'medium' | 'low';

/** Chevrons up in red for urgent work, two bars in orange for the middle, a chevron down in blue for later. */
function PriorityIcon({ priority }: { priority: Priority }) {
  const paths: Record<Priority, string> = {
    highest: 'M4 8.25l4-3.5 4 3.5M4 12.25l4-3.5 4 3.5',
    high: 'M4 10.25l4-3.75 4 3.75',
    medium: 'M3.75 6.25h8.5M3.75 9.75h8.5',
    low: 'M4 6.25l4 3.75 4-3.75',
  };
  return (
    <svg
      className={`${styles.priority} ${styles[priority]}`}
      viewBox="0 0 16 16"
      role="img"
      aria-label={`${priority[0].toUpperCase()}${priority.slice(1)} priority`}
      data-inspect="priority-icon"
    >
      <path d={paths[priority]} />
    </svg>
  );
}

type Issue = {
  key: string;
  type: IssueType;
  title: string;
  labels?: string[];
  /** Shown as a short date; `overdue` turns it red. */
  due?: string;
  overdue?: boolean;
  priority: Priority;
  points: number;
  assignee: Person;
  /** Flagged: blocked by something outside the team. */
  flagged?: boolean;
  done?: boolean;
};

/** One work item on the board. `lifted` is the card being dragged; `children` sit on top of it (the pointer). */
function IssueCard({ issue, lifted, children }: { issue: Issue; lifted?: boolean; children?: ReactNode }) {
  const classes = [styles.card];
  if (issue.flagged) classes.push(styles.flagged);
  if (lifted) classes.push(styles.lifted);

  return (
    <article
      className={classes.join(' ')}
      aria-label={`${issue.key} ${issue.title}${lifted ? ', being moved' : ''}`}
      data-inspect={lifted ? 'dragged-card' : issue.flagged ? 'flagged-card' : 'issue-card'}
    >
      <p className={styles.cardTitle}>{issue.title}</p>
      {(issue.labels || issue.due) && (
        <div className={styles.cardMeta}>
          {issue.labels?.map((label) => (
            <span key={label} className={styles.label} data-inspect="label">
              {label}
            </span>
          ))}
          {issue.due && (
            <span
              className={issue.overdue ? `${styles.due} ${styles.overdue}` : styles.due}
              aria-label={`Due ${issue.due}${issue.overdue ? ', overdue' : ''}`}
              data-inspect="due-date"
            >
              <Icon d={ICONS.dueDate} />
              {issue.due}
            </span>
          )}
        </div>
      )}
      <div className={styles.cardFoot}>
        <span className={styles.keyGroup} data-inspect="issue-key">
          <TypeIcon type={issue.type} />
          <span className={issue.done ? `${styles.key} ${styles.keyDone}` : styles.key}>{issue.key}</span>
        </span>
        {issue.flagged && (
          <span className={styles.flag} role="img" aria-label="Flagged">
            <Icon d={ICONS.flag} />
          </span>
        )}
        <PriorityIcon priority={issue.priority} />
        <span className={styles.points} aria-label={`${issue.points} story points`} data-inspect="story-points">
          {issue.points}
        </span>
        <span className={styles.assignee} data-inspect="assignee">
          <Avatar person={issue.assignee} className={styles.cardAvatar} labeled />
        </span>
      </div>
      {children}
    </article>
  );
}

type ColumnKey = 'todo' | 'progress' | 'review' | 'done';

type Column = { key: ColumnKey; name: string; count: number; max?: number; done?: boolean };

const COLUMNS: Column[] = [
  { key: 'todo', name: 'To do', count: 4 },
  { key: 'progress', name: 'In progress', count: 5, max: 4 },
  { key: 'review', name: 'In review', count: 2 },
  { key: 'done', name: 'Done', count: 4, done: true },
];

const isOver = (column: Column) => column.max !== undefined && column.count > column.max;

/** A column's header or cell: red while the column is over its limit; phones scroll past the first column. */
function columnClass(base: string, column: Column) {
  const classes = [base];
  if (column.key === 'todo') classes.push(styles.firstColumn);
  if (isOver(column)) classes.push(styles.over);
  return classes.join(' ');
}

/** The card on its way from In progress to In review, still counted in In progress until it's dropped. */
const DRAGGED: Issue = {
  key: 'CHK-139',
  type: 'story',
  title: 'Order summary drawer on small screens',
  labels: ['ios', 'web'],
  due: 'Nov 19',
  priority: 'medium',
  points: 3,
  assignee: IMANI,
};

type Lane = {
  /** The epic this lane groups, or none for "Everything else". */
  epic?: { key: string; name: string; owner: Person };
  count: number;
  cells: Record<ColumnKey, Issue[]>;
};

const LANES: Lane[] = [
  {
    epic: { key: 'CHK-88', name: 'One-page checkout', owner: ROSA },
    count: 8,
    cells: {
      todo: [
        {
          key: 'CHK-151',
          type: 'story',
          title: 'Save a new address from the order summary',
          labels: ['web'],
          due: 'Nov 24',
          priority: 'medium',
          points: 3,
          assignee: ROSA,
        },
        {
          key: 'CHK-153',
          type: 'task',
          title: 'Rewrite the error messages on the payment step',
          labels: ['content'],
          priority: 'low',
          points: 1,
          assignee: CLARA,
        },
      ],
      progress: [
        {
          key: 'CHK-142',
          type: 'bug',
          title: 'Wallet sheet stays open after a declined card',
          labels: ['ios', 'payments'],
          due: 'Nov 16',
          overdue: true,
          priority: 'high',
          points: 2,
          assignee: KOFI,
        },
        {
          key: 'CHK-147',
          type: 'story',
          title: 'Check card numbers as you type',
          labels: ['web'],
          priority: 'medium',
          points: 5,
          assignee: ERIK,
          flagged: true,
        },
      ],
      review: [
        {
          key: 'CHK-136',
          type: 'task',
          title: 'Track an analytics event at each step',
          labels: ['analytics'],
          priority: 'low',
          points: 2,
          assignee: NOAH,
        },
      ],
      done: [
        {
          key: 'CHK-131',
          type: 'story',
          title: 'Guest checkout without an account',
          priority: 'medium',
          points: 5,
          assignee: ROSA,
          done: true,
        },
        {
          key: 'CHK-128',
          type: 'task',
          title: 'Merge the shipping and billing forms',
          priority: 'medium',
          points: 3,
          assignee: KOFI,
          done: true,
        },
      ],
    },
  },
  {
    count: 7,
    cells: {
      todo: [
        {
          key: 'CHK-156',
          type: 'bug',
          title: 'Promo code field accepts spaces',
          labels: ['web'],
          priority: 'medium',
          points: 1,
          assignee: NOAH,
        },
        {
          key: 'CHK-158',
          type: 'task',
          title: 'Update tax rates for the EU stores',
          due: 'Dec 1',
          priority: 'highest',
          points: 2,
          assignee: CLARA,
        },
      ],
      progress: [
        {
          key: 'CHK-149',
          type: 'task',
          title: 'Upgrade the payments SDK to 7.2',
          labels: ['platform'],
          priority: 'high',
          points: 3,
          assignee: ERIK,
        },
        {
          key: 'CHK-150',
          type: 'bug',
          title: 'Receipt email shows the wrong currency',
          labels: ['email'],
          due: 'Nov 18',
          priority: 'highest',
          points: 2,
          assignee: CLARA,
        },
      ],
      review: [
        {
          key: 'CHK-144',
          type: 'story',
          title: 'Dark mode for the receipt page',
          labels: ['web'],
          priority: 'low',
          points: 2,
          assignee: ROSA,
        },
      ],
      done: [
        {
          key: 'CHK-133',
          type: 'bug',
          title: 'Totals flicker while the cart updates',
          priority: 'medium',
          points: 1,
          assignee: KOFI,
          done: true,
        },
        {
          key: 'CHK-130',
          type: 'task',
          title: 'Retire the old coupon service',
          priority: 'low',
          points: 3,
          assignee: ERIK,
          done: true,
        },
      ],
    },
  },
];

const SIDEBAR_TOP: { label: string; icon: string; more?: boolean }[] = [
  { label: 'For you', icon: ICONS.forYou },
  { label: 'Recent', icon: ICONS.clock, more: true },
  { label: 'Starred', icon: ICONS.star, more: true },
];

const SPACES: { section: string; spaces: { name: string; tone: SpaceTone; glyph: string; current?: boolean }[] }[] = [
  {
    section: 'Starred',
    spaces: [
      { name: 'Checkout Squad', tone: 'coral', glyph: SPACE_GLYPHS.bag, current: true },
      { name: 'Growth Lab', tone: 'violet', glyph: SPACE_GLYPHS.chart },
    ],
  },
  {
    section: 'Recent',
    spaces: [
      { name: 'Design System', tone: 'amber', glyph: SPACE_GLYPHS.shapes },
      { name: 'Platform API', tone: 'blue', glyph: SPACE_GLYPHS.code },
    ],
  },
];

const TABS: { label: string; icon: string; current?: boolean }[] = [
  { label: 'Summary', icon: ICONS.globe },
  { label: 'List', icon: ICONS.list },
  { label: 'Board', icon: ICONS.board, current: true },
  { label: 'Calendar', icon: ICONS.calendar },
  { label: 'Timeline', icon: ICONS.timeline },
  { label: 'Pages', icon: ICONS.pages },
  { label: 'Forms', icon: ICONS.forms },
];

/** The quick filter's faces: everyone with work on the board, then a count for the rest. */
const TEAM = [IMANI, KOFI, ROSA, ERIK, NOAH];

/**
 * Library example: a team's Kanban board, closely following Jira's. A top bar with search and Create, the space
 * sidebar, the space header with its view tabs, a filter bar with avatars, and the board itself: columns with counts
 * (In progress is over its limit of four), swimlanes by epic, and cards with a type, a key, labels, a due date, a
 * priority, story points and an assignee. One card is mid-drag from In progress to In review, over its drop
 * placeholder. Every name and work item is made up. Not interactive; for inspection only.
 */
export function LanesSite() {
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <header className={styles.topNav}>
          <div className={styles.navStart}>
            <span className={styles.navButton} role="button" aria-label="Switch apps">
              <AppGrid />
            </span>
            <span className={styles.brand} role="img" aria-label="Lanes">
              <LanesLogo />
              <span>Lanes</span>
            </span>
            <span className={styles.navButton} role="button" aria-label="Collapse sidebar">
              <Icon d={ICONS.sidebar} />
            </span>
          </div>
          <div className={styles.navCenter}>
            <span className={styles.search} role="search">
              <Icon d={ICONS.search} />
              <span className={styles.searchText}>Search</span>
            </span>
            <span className={styles.create} role="button" data-inspect="create-button">
              <Icon d={ICONS.plus} />
              <span className={styles.createLabel}>Create</span>
            </span>
          </div>
          <div className={styles.navEnd}>
            <span className={`${styles.navButton} ${styles.searchIcon}`} role="button" aria-label="Search">
              <Icon d={ICONS.search} />
            </span>
            <span className={styles.navButton} role="button" aria-label="Notifications, 9 or more unread">
              <Icon d={ICONS.bell} />
              <span className={styles.badge}>9+</span>
            </span>
            <span className={`${styles.navButton} ${styles.navOptional}`} role="button" aria-label="Help">
              <Icon d={ICONS.help} />
            </span>
            <span className={`${styles.navButton} ${styles.navOptional}`} role="button" aria-label="Settings">
              <Icon d={ICONS.settings} />
            </span>
            <span className={styles.me} role="button" aria-haspopup="menu" aria-label="Your profile">
              <Avatar person={IMANI} className={styles.meAvatar} />
            </span>
          </div>
        </header>

        <nav className={styles.sidebar} aria-label="Lanes" data-inspect="space-sidebar">
          <div className={styles.sidebarInner}>
            <ul className={styles.navList}>
              {SIDEBAR_TOP.map((item) => (
                <li key={item.label}>
                  <a className={styles.navItem}>
                    <Icon d={item.icon} className={styles.navIcon} />
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.more && <Icon d={ICONS.chevronRight} className={styles.navMore} />}
                  </a>
                </li>
              ))}
              <li>
                <span className={styles.navItem}>
                  <Icon d={ICONS.spaces} className={styles.navIcon} />
                  <span className={styles.navLabel}>Spaces</span>
                  <span className={styles.navTool} role="button" aria-label="Create space">
                    <Icon d={ICONS.plus} />
                  </span>
                  <span className={styles.navTool} role="button" aria-label="More space actions">
                    <Dots />
                  </span>
                </span>
              </li>
            </ul>
            {SPACES.map((group) => (
              <section key={group.section} className={styles.spaceGroup}>
                <h2 className={styles.sectionLabel}>{group.section}</h2>
                <ul className={styles.navList}>
                  {group.spaces.map((space) => (
                    <li key={space.name}>
                      <a className={styles.navItem} aria-current={space.current ? 'page' : undefined}>
                        <SpaceIcon tone={space.tone} glyph={space.glyph} />
                        <span className={styles.navLabel}>{space.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <ul className={styles.navList}>
              <li>
                <a className={styles.navItem}>
                  <Icon d={ICONS.list} className={styles.navIcon} />
                  <span className={styles.navLabel}>More spaces</span>
                  <Icon d={ICONS.chevronRight} className={styles.navMore} />
                </a>
              </li>
              <li className={styles.navGap}>
                <a className={styles.navItem}>
                  <Icon d={ICONS.filter} className={styles.navIcon} />
                  <span className={styles.navLabel}>Filters</span>
                </a>
              </li>
              <li>
                <a className={styles.navItem}>
                  <Icon d={ICONS.dashboards} className={styles.navIcon} />
                  <span className={styles.navLabel}>Dashboards</span>
                </a>
              </li>
              <li>
                <a className={styles.navItem}>
                  <span className={styles.navIcon}>
                    <Dots />
                  </span>
                  <span className={styles.navLabel}>More</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main className={styles.main}>
          <div className={styles.spaceHeader} data-inspect="board-header">
            <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
              <a>Spaces</a>
            </nav>
            <div className={styles.titleRow}>
              <SpaceIcon tone="coral" glyph={SPACE_GLYPHS.bag} className={styles.titleIcon} />
              <h1 className={styles.spaceName}>Checkout Squad</h1>
              <span className={styles.squareButton} role="button" aria-label="Team members">
                <Icon d={ICONS.people} />
              </span>
              <span className={`${styles.squareButton} ${styles.plain}`} role="button" aria-label="Space actions">
                <Dots />
              </span>
              <span className={styles.headerActions}>
                <span className={styles.squareButton} role="button" aria-label="Share">
                  <Icon d={ICONS.share} />
                </span>
                <span className={styles.squareButton} role="button" aria-label="Automation">
                  <Icon d={ICONS.bolt} />
                </span>
                <span className={styles.squareButton} role="button" aria-label="Enter full screen">
                  <Icon d={ICONS.expand} />
                </span>
              </span>
            </div>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Views" data-inspect="view-tabs">
            {TABS.map((tab) => (
              <span key={tab.label} className={styles.tab} role="tab" aria-selected={tab.current ?? false}>
                <Icon d={tab.icon} />
                {tab.label}
              </span>
            ))}
            <span className={styles.addTab} role="button" aria-label="Add a view">
              <Icon d={ICONS.plus} />
            </span>
          </div>

          <div className={styles.toolbar}>
            <span className={styles.boardSearch} role="search" data-inspect="board-search">
              <Icon d={ICONS.search} />
              <span className={styles.boardSearchText}>Search board</span>
            </span>
            <span className={styles.faces} role="group" aria-label="Filter by assignee" data-inspect="avatar-filter">
              <span className={styles.face} role="checkbox" aria-checked="false" aria-label="Unassigned">
                <span className={styles.unassigned}>
                  <Icon d={ICONS.person} />
                </span>
              </span>
              {TEAM.map((person) => (
                <span key={person.name} className={styles.face} role="checkbox" aria-checked="false">
                  <Avatar person={person} className={styles.faceAvatar} labeled />
                </span>
              ))}
              <span className={styles.face} role="button" aria-label="More people">
                <span className={styles.moreFaces}>
                  <span className={styles.moreWide}>+1</span>
                  <span className={styles.moreNarrow}>+3</span>
                </span>
              </span>
            </span>
            <span className={styles.toolButton} role="button" aria-haspopup="dialog">
              <Icon d={ICONS.filter} />
              <span className={styles.toolLabel}>Filter</span>
            </span>
            <span className={styles.toolbarEnd}>
              <span
                className={`${styles.toolButton} ${styles.groupBy}`}
                role="button"
                aria-haspopup="menu"
                aria-pressed="true"
              >
                <span className={styles.toolLabel}>Group: Epic</span>
                <Icon d={ICONS.chevronDown} />
              </span>
              <span className={`${styles.squareButton} ${styles.toolOptional}`} role="button" aria-label="Insights">
                <Icon d={ICONS.insights} />
              </span>
              <span
                className={`${styles.squareButton} ${styles.toolOptional}`}
                role="button"
                aria-label="View settings"
              >
                <Icon d={ICONS.sliders} />
              </span>
              <span className={styles.squareButton} role="button" aria-label="More board actions">
                <Dots />
              </span>
            </span>
          </div>

          <div className={styles.boardClip}>
            <div className={styles.board}>
              <div className={styles.heads}>
                {COLUMNS.map((column) => {
                  const over = isOver(column);
                  return (
                    <div
                      key={column.key}
                      className={columnClass(styles.head, column)}
                      data-inspect="column-header"
                    >
                      <h2 className={styles.columnName}>{column.name}</h2>
                      <span className={styles.count}>{column.count}</span>
                      {column.max !== undefined && (
                        <span className={styles.wip} data-inspect="wip-limit">
                          {over && <Icon d={ICONS.warning} />}
                          Max {column.max}
                        </span>
                      )}
                      {column.done && <Icon d={ICONS.check} className={styles.doneCheck} />}
                    </div>
                  );
                })}
              </div>

              {LANES.map((lane) => (
                <section
                  key={lane.epic?.key ?? 'rest'}
                  className={styles.lane}
                  aria-label={lane.epic?.name ?? 'Everything else'}
                >
                  <div className={styles.laneHeader} role="button" aria-expanded="true" data-inspect="swimlane">
                    <Icon d={ICONS.chevronDown} className={styles.laneChevron} />
                    {lane.epic ? (
                      <>
                        <svg className={styles.epicIcon} viewBox="0 0 16 16" role="img" aria-label="Epic">
                          <rect width="16" height="16" rx="3.5" />
                          <path d="M8.9 3.25L4.75 9h3l-.65 3.75L11.25 7h-3z" />
                        </svg>
                        <span className={styles.laneKey}>{lane.epic.key}</span>
                        <span className={styles.laneName}>{lane.epic.name}</span>
                        <span className={styles.laneCount}>({lane.count} work items)</span>
                        <span className={styles.status}>In progress</span>
                        <Avatar person={lane.epic.owner} className={styles.laneAvatar} labeled />
                      </>
                    ) : (
                      <>
                        <span className={styles.laneName}>Everything else</span>
                        <span className={styles.laneCount}>({lane.count} work items)</span>
                      </>
                    )}
                  </div>
                  <div className={styles.cells}>
                    {COLUMNS.map((column) => {
                      const dropHere = Boolean(lane.epic) && column.key === 'review';
                      return (
                        <div
                          key={column.key}
                          className={columnClass(styles.cell, column)}
                          aria-label={column.name}
                        >
                          {lane.cells[column.key].map((issue) => (
                            <IssueCard key={issue.key} issue={issue} />
                          ))}
                          {dropHere && (
                            <div className={styles.dropSlot}>
                              <div className={styles.placeholder} data-inspect="drop-placeholder" />
                              <IssueCard issue={DRAGGED} lifted>
                                <svg className={styles.grabCursor} viewBox="0 0 24 24" aria-hidden="true">
                                  <path d="M8.25 11.5V9.25a1.6 1.6 0 0 1 3.2 0v1.25-1.9a1.6 1.6 0 0 1 3.2 0v1.9-1.25a1.6 1.6 0 0 1 3.2 0v1.75a1.6 1.6 0 0 1 3.15.4v3.85a6.1 6.1 0 0 1-6.1 6.1h-1.7a5.2 5.2 0 0 1-4-1.9l-2.9-3.5a1.65 1.65 0 0 1 2.4-2.25l1.55 1.3z" />
                                </svg>
                              </IssueCard>
                            </div>
                          )}
                          {lane.epic && column.key === 'todo' && (
                            <span className={styles.inlineCreate} role="button">
                              <Icon d={ICONS.plus} />
                              Create
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
