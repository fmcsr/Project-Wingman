import type { CSSProperties } from 'react';
import styles from './FolioSite.module.css';
import cover from './photos/cover.webp';
import iris from './photos/iris.webp';
import leo from './photos/leo.webp';
import nadia from './photos/nadia.webp';
import owen from './photos/owen.webp';

/** Line icons on a 20px grid; stroke color and width come from the stylesheet. */
const ICONS = {
  chevronDown: 'M6.5 8.25L10 11.75l3.5-3.5',
  chevronRight: 'M8.25 6L12.25 10l-4 4',
  compose:
    'M9.25 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-3.75M14.6 3.4a1.4 1.4 0 0 1 2 2L10.4 11.6l-2.65.65.65-2.65z',
  search: 'M8.75 14a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5zM12.5 12.5l4 4',
  home: 'M3.75 8.75L10 3.75l6.25 5v6.75a1 1 0 0 1-1 1H12.5v-4.25h-5v4.25H4.75a1 1 0 0 1-1-1z',
  inbox:
    'M3.5 11l1.95-5.4A1.5 1.5 0 0 1 6.86 4.6h6.28a1.5 1.5 0 0 1 1.41 1L16.5 11v3.9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5zM3.5 11h3.6l1.1 1.9h3.6l1.1-1.9h3.6',
  menu: 'M3.5 5.75h13M3.5 10h13M3.5 14.25h13',
  comment:
    'M4.75 4.25h10.5a1.25 1.25 0 0 1 1.25 1.25v7.25a1.25 1.25 0 0 1-1.25 1.25H10.5L7 16.5V14H4.75a1.25 1.25 0 0 1-1.25-1.25V5.5a1.25 1.25 0 0 1 1.25-1.25zM7 7.75h6M7 10.5h4',
  star: 'M10 3.4l1.98 4.01 4.42.64-3.2 3.12.76 4.4L10 13.5l-3.96 2.07.76-4.4-3.2-3.12 4.42-.64z',
  person: 'M10 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4.25 16.75a5.75 5.75 0 0 1 11.5 0',
  /** Four arcs of a broken ring: the status field's icon */
  status:
    'M10 3.25a6.75 6.75 0 0 1 4.77 1.98M16.75 10a6.75 6.75 0 0 1-1.98 4.77M10 16.75a6.75 6.75 0 0 1-4.77-1.98M3.25 10a6.75 6.75 0 0 1 1.98-4.77',
  calendar:
    'M5 4.75h10a1.25 1.25 0 0 1 1.25 1.25v9A1.25 1.25 0 0 1 15 16.25H5A1.25 1.25 0 0 1 3.75 15V6A1.25 1.25 0 0 1 5 4.75zM3.75 8.5h12.5M7 3.25v3M13 3.25v3',
  /** Three lines with a dot before each: a field that holds several tags */
  tags: 'M8.25 5.75h8M8.25 10h8M8.25 14.25h8M4.75 5.75h.01M4.75 10h.01M4.75 14.25h.01',
  resolve: 'M10 16.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5zM7.1 10.15l2.05 2.05 3.75-4.1',
  paperclip:
    'M15.25 9.5l-5.6 5.6a3.4 3.4 0 0 1-4.8-4.8l5.9-5.9a2.25 2.25 0 0 1 3.2 3.2l-5.9 5.9a1.1 1.1 0 0 1-1.55-1.55l5.35-5.35',
  at: 'M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM13 10v1.1a2 2 0 0 0 4 0V10a7 7 0 1 0-2.8 5.6',
  close: 'M6 6l8 8M14 6l-8 8',
  plus: 'M10 4.25v11.5M4.25 10h11.5',
  text: 'M5 5.25h10M10 5.25v10',
  bulleted:
    'M8.5 5.75h8M8.5 10h8M8.5 14.25h8M5 5.75a.6.6 0 1 1-1.2 0 .6.6 0 0 1 1.2 0zM5 10a.6.6 0 1 1-1.2 0 .6.6 0 0 1 1.2 0zM5 14.25a.6.6 0 1 1-1.2 0 .6.6 0 0 1 1.2 0z',
  numbered:
    'M8.5 5.75h8M8.5 10h8M8.5 14.25h8M3.75 4.5l1.1-.75v4M3.6 9.15a1.2 1.2 0 0 1 2.3.45c0 1-2.3 1.65-2.3 2.9h2.4',
  todo: 'M5 4.25h10a.75.75 0 0 1 .75.75v10a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75V5A.75.75 0 0 1 5 4.25zM7.1 10.1l1.95 1.95 3.85-4.1',
  toggleList: 'M4.25 4.75l3.25 2.5-3.25 2.5zM10.25 7.25h6.5M8 13.25h8.75',
};

/** A filled triangle, the toggle's arrow: it points right while closed and turns down when open. */
const TRIANGLE = 'M6 3.75l8.5 6.25L6 16.25z';

type Person = { name: string; photo: string };

const NADIA: Person = { name: 'Nadia Brooks', photo: nadia };
const OWEN: Person = { name: 'Owen Price', photo: owen };
const IRIS: Person = { name: 'Iris Novak', photo: iris };
/** The signed-in user; the reply box shows his face. */
const LEO: Person = { name: 'Leo Marsh', photo: leo };

/** Who else has the page open right now. */
const VIEWERS = [NADIA, OWEN, IRIS];

/** The page on screen: its emoji follows it into the sidebar and the breadcrumbs. */
const PAGE = { title: 'Waitlists launch plan', emoji: '⏳' };

type TreeNode = { label: string; emoji: string; open?: boolean; current?: boolean; children?: TreeNode[] };

const TEAMSPACES: TreeNode[] = [
  { label: 'Wrenfold HQ', emoji: '🏠' },
  {
    label: 'Product',
    emoji: '🧭',
    open: true,
    children: [
      { label: 'Roadmap 2026', emoji: '🗺️' },
      {
        label: 'Launches',
        emoji: '🚀',
        open: true,
        children: [
          { label: 'Gift cards recap', emoji: '🎁' },
          { label: PAGE.title, emoji: PAGE.emoji, current: true },
          { label: 'Brief template', emoji: '📝' },
        ],
      },
      { label: 'Customer interviews', emoji: '🎙️' },
    ],
  },
  { label: 'Engineering', emoji: '🛠️' },
  { label: 'Marketing', emoji: '📣' },
];

const PRIVATE: TreeNode[] = [
  { label: 'Weekly priorities', emoji: '✅' },
  { label: '1:1 notes', emoji: '🤝' },
  { label: 'Reading list', emoji: '📚' },
];

const STAGES = [
  { text: 'Dogfood with our own studio accounts', date: 'Jul 28' },
  { text: 'Beta for the 40 studios that asked for it', date: 'Aug 4' },
  { text: 'Every Pro studio, plus the announcement email', date: 'Aug 18' },
];

/** The third task is the hovered block: the + and the drag handle show in the gutter next to it. */
const TODOS = [
  { text: 'Pricing page copy approved', done: true },
  { text: 'Help center article published', done: true },
  { text: 'QA sign-off on iOS and Android', hovered: true },
  { text: 'Schedule the announcement email' },
  { text: 'Brief support on waitlist questions' },
];

type SlashItem = { title: string; icon?: string; heading?: number; markdown?: string };

/** "Basic blocks" in the slash menu. The Markdown is what you could type instead, e.g. # and a space. */
const SLASH_ITEMS: SlashItem[] = [
  { title: 'Text', icon: ICONS.text },
  { title: 'Heading 1', heading: 1, markdown: '#' },
  { title: 'Heading 2', heading: 2, markdown: '##' },
  { title: 'Heading 3', heading: 3, markdown: '###' },
  { title: 'Bulleted list', icon: ICONS.bulleted, markdown: '-' },
  { title: 'Numbered list', icon: ICONS.numbered, markdown: '1.' },
  { title: 'To-do list', icon: ICONS.todo, markdown: '[]' },
  { title: 'Toggle list', icon: ICONS.toggleList, markdown: '>' },
];

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 20 20">
      <path d={d} />
    </svg>
  );
}

/** Three dots in a row: the "more" (meatball) icon. */
function MoreIcon() {
  return (
    <svg className={styles.dots} viewBox="0 0 20 20">
      <circle cx="4.5" cy="10" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="15.5" cy="10" r="1.5" />
    </svg>
  );
}

/** Two columns of three dots: the grip you drag a block by. */
function GripIcon() {
  return (
    <svg className={styles.dots} viewBox="0 0 14 20">
      {[4.5, 9.5].map((cx) => [4.5, 10, 15.5].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" />))}
    </svg>
  );
}

/** Folio's logo: a sheet folded once (a folio), the left leaf flat and the right one lifting, on a petrol tile. */
function FolioLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 22 22" aria-hidden="true">
      <rect className={styles.logoTile} width="22" height="22" rx="6" />
      <path className={styles.logoLeaf} d="M5.5 7h5.5v9.5H5.5z" />
      <path className={styles.logoLeafFolded} d="M11 7l5.5-2.25v9.5L11 16.5z" />
    </svg>
  );
}

/** An emoji used as an icon. It sits next to the name it stands for, so screen readers skip it. */
function Emoji({ char, className }: { char: string; className: string }) {
  return (
    <span className={`${styles.emoji} ${className}`} aria-hidden="true">
      {char}
    </span>
  );
}

function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
  return (
    <li role="treeitem" aria-expanded={Boolean(node.open)} aria-selected={node.current || undefined}>
      <a
        className={styles.treeRow}
        style={{ '--depth': depth } as CSSProperties}
        aria-current={node.current ? 'page' : undefined}
      >
        <span className={styles.toggle}>
          <Icon d={ICONS.chevronRight} className={styles.chevron} />
        </span>
        <Emoji char={node.emoji} className={styles.treeIcon} />
        <span className={styles.treeLabel}>{node.label}</span>
      </a>
      {node.open && node.children && (
        <ul role="group">
          {node.children.map((child) => (
            <TreeItem key={child.label} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Comment({ person, time, children }: { person: Person; time: string; children: string }) {
  return (
    <div className={styles.comment}>
      <div className={styles.commentHead}>
        <img src={person.photo} alt="" draggable={false} />
        <span className={styles.commentName}>{person.name}</span>
        <span className={styles.commentTime}>{time}</span>
      </div>
      <p className={styles.commentText}>{children}</p>
    </div>
  );
}

/**
 * Library example: a team wiki page open in the editor, closely following Notion's page with its sidebar. One block
 * is shown hovered (+ and drag handle), a slash menu is open under a new line and a comment thread sits in the
 * margin. Not interactive; for inspection only.
 */
export function FolioSite() {
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.workspaceRow}>
              <span className={styles.workspace} data-inspect="workspace-switcher" aria-haspopup="menu">
                <Emoji char="🪶" className={styles.workspaceIcon} />
                <span className={styles.workspaceName}>Wrenfold</span>
                <Icon d={ICONS.chevronDown} className={styles.workspaceChevron} />
              </span>
              <span className={styles.compose} role="button" aria-label="New page">
                <Icon d={ICONS.compose} />
              </span>
            </div>

            <nav>
              <a className={styles.navItem} role="button" aria-keyshortcuts="Meta+K" data-inspect="quick-find">
                <Icon d={ICONS.search} />
                Search
              </a>
              <a className={styles.navItem}>
                <Icon d={ICONS.home} />
                Home
              </a>
              <a className={styles.navItem}>
                <Icon d={ICONS.inbox} />
                Inbox
                <span className={styles.badge}>3</span>
              </a>
            </nav>

            <div data-inspect="page-tree">
              <p className={styles.treeHeading}>Teamspaces</p>
              <ul role="tree" aria-label="Teamspaces">
                {TEAMSPACES.map((node) => (
                  <TreeItem key={node.label} node={node} depth={0} />
                ))}
              </ul>
              <p className={styles.treeHeading}>Private</p>
              <ul role="tree" aria-label="Private">
                {PRIVATE.map((node) => (
                  <TreeItem key={node.label} node={node} depth={0} />
                ))}
              </ul>
            </div>

            <div className={styles.appCard}>
              <FolioLogo />
              <div>
                <p className={styles.appTitle}>Folio for desktop</p>
                <p className={styles.appText}>Faster, and your pages open offline.</p>
              </div>
              <span className={styles.appClose} role="button" aria-label="Dismiss">
                <Icon d={ICONS.close} />
              </span>
            </div>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.topBar}>
            <span className={styles.menuButton} role="button" aria-label="Open sidebar">
              <Icon d={ICONS.menu} />
            </span>

            <nav className={styles.breadcrumbs} aria-label="Breadcrumb" data-inspect="breadcrumbs">
              <ol>
                <li className={`${styles.crumbItem} ${styles.crumbMore}`}>
                  <span className={styles.crumb} role="button" aria-label="Show hidden pages in the path">
                    …
                  </span>
                </li>
                <li className={`${styles.crumbItem} ${styles.crumbTeamspace}`}>
                  <a className={styles.crumb}>
                    <Emoji char="🧭" className={styles.crumbIcon} />
                    Product
                  </a>
                </li>
                <li className={`${styles.crumbItem} ${styles.crumbParent}`}>
                  <a className={styles.crumb}>
                    <Emoji char="🚀" className={styles.crumbIcon} />
                    Launches
                  </a>
                </li>
                <li className={styles.crumbItem}>
                  <a className={styles.crumb} aria-current="page">
                    <Emoji char={PAGE.emoji} className={styles.crumbIcon} />
                    <span className={styles.crumbLabel}>{PAGE.title}</span>
                  </a>
                </li>
              </ol>
            </nav>

            <div className={styles.barEnd}>
              <time className={styles.edited} dateTime="2026-07-21T09:40">
                Edited 2h ago
              </time>
              <span className={styles.presence} data-inspect="presence-avatars">
                {VIEWERS.map((person) => (
                  <img key={person.name} src={person.photo} alt={person.name} draggable={false} />
                ))}
              </span>
              <span className={styles.share} data-inspect="share-button" aria-haspopup="dialog">
                Share
              </span>
              <span className={`${styles.iconButton} ${styles.extraAction}`} role="button" aria-label="Comments">
                <Icon d={ICONS.comment} />
              </span>
              <span
                className={`${styles.iconButton} ${styles.extraAction}`}
                role="button"
                aria-label="Add to Favorites"
              >
                <Icon d={ICONS.star} />
              </span>
              <span
                className={styles.iconButton}
                role="button"
                aria-label="More actions"
                aria-haspopup="menu"
                data-inspect="more-button"
              >
                <MoreIcon />
              </span>
            </div>
          </header>

          <div className={styles.cover} data-inspect="page-cover">
            <img src={cover} alt="Misty hills at sunrise" draggable={false} />
          </div>

          <div className={styles.doc}>
            <div className={styles.column}>
              <span
                className={`${styles.emoji} ${styles.pageIcon}`}
                role="img"
                aria-label="Page icon"
                data-inspect="page-icon"
              >
                {PAGE.emoji}
              </span>
              <h2 className={styles.title}>{PAGE.title}</h2>

              <dl className={styles.properties} data-inspect="page-properties">
                <div className={styles.property}>
                  <dt className={styles.propertyName}>
                    <Icon d={ICONS.person} />
                    Owner
                  </dt>
                  <dd className={styles.propertyValue}>
                    <img className={styles.ownerPhoto} src={NADIA.photo} alt="" draggable={false} />
                    {NADIA.name}
                  </dd>
                </div>
                <div className={styles.property}>
                  <dt className={styles.propertyName}>
                    <Icon d={ICONS.status} />
                    Status
                  </dt>
                  <dd className={styles.propertyValue}>
                    <span className={styles.status}>
                      <span className={styles.statusDot} />
                      In progress
                    </span>
                  </dd>
                </div>
                <div className={styles.property}>
                  <dt className={styles.propertyName}>
                    <Icon d={ICONS.calendar} />
                    Launch date
                  </dt>
                  <dd className={styles.propertyValue}>
                    <time dateTime="2026-08-18">August 18, 2026</time>
                  </dd>
                </div>
                <div className={styles.property}>
                  <dt className={styles.propertyName}>
                    <Icon d={ICONS.tags} />
                    Teams
                  </dt>
                  <dd className={styles.propertyValue}>
                    <span className={`${styles.tag} ${styles.tagGray}`}>Product</span>
                    <span className={`${styles.tag} ${styles.tagPurple}`}>Support</span>
                  </dd>
                </div>
              </dl>

              <div className={styles.commented}>
                <p className={styles.block}>
                  <a className={styles.mention} data-inspect="mention-chip">
                    <span className={styles.at}>@</span>
                    {NADIA.name}
                  </a>{' '}
                  owns the rollout. Waitlists go live on{' '}
                  <time className={styles.mention} dateTime="2026-08-18" data-inspect="mention-chip">
                    <span className={styles.at}>@</span>August 18, 2026
                  </time>{' '}
                  for every studio on{' '}
                  <mark className={styles.highlight} data-inspect="comment-highlight">
                    the Pro plan
                  </mark>
                  . Questions go in the launch channel, so the whole team sees the answers.
                </p>

                <aside className={styles.thread} aria-label="Comments on “the Pro plan”" data-inspect="comment-thread">
                  <span className={styles.resolve} role="button" aria-label="Resolve thread">
                    <Icon d={ICONS.resolve} />
                  </span>
                  <Comment person={OWEN} time="1h">
                    Should Starter studios get it too? Support has had a dozen requests this month.
                  </Comment>
                  <Comment person={NADIA} time="32m">
                    Not at launch. Let’s look again once the beta numbers are in.
                  </Comment>
                  <div className={styles.reply}>
                    <img src={LEO.photo} alt="" draggable={false} />
                    <span className={styles.replyText}>Reply…</span>
                    <Icon d={ICONS.paperclip} />
                    <Icon d={ICONS.at} />
                    <svg className={styles.send} viewBox="0 0 20 20" aria-label="Send">
                      <circle className={styles.sendCircle} cx="10" cy="10" r="10" />
                      <path className={styles.sendArrow} d="M10 14V6.5M6.75 9.5L10 6.25l3.25 3.25" />
                    </svg>
                  </div>
                </aside>
              </div>

              <div className={styles.callout} role="note" data-inspect="callout">
                <Emoji char="❄️" className={styles.calloutIcon} />
                <p>
                  <strong>Code freeze starts Aug 11.</strong> After that, only fixes for launch blockers get merged.
                </p>
              </div>

              <h3 className={styles.heading}>Rollout</h3>
              <div className={styles.block} data-inspect="toggle-block">
                <span className={styles.toggleTitle} role="button" aria-expanded="true">
                  <span className={styles.toggleArrow}>
                    <svg viewBox="0 0 20 20">
                      <path d={TRIANGLE} />
                    </svg>
                  </span>
                  Rollout stages
                </span>
                <ol className={styles.stages}>
                  {STAGES.map((stage) => (
                    <li key={stage.text}>
                      <span>
                        {stage.text} <span className={styles.stageDate}>· {stage.date}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <h3 className={styles.heading}>Launch checklist</h3>
              <ul data-inspect="todo-list">
                {TODOS.map((todo) => (
                  <li key={todo.text} className={`${styles.block} ${styles.todo}`}>
                    {todo.hovered && (
                      <span className={styles.handles} data-inspect="block-handle">
                        <span className={styles.handle} role="button" aria-label="Add a block below">
                          <Icon d={ICONS.plus} />
                        </span>
                        <span className={styles.handle} role="button" aria-label="Drag to move">
                          <GripIcon />
                        </span>
                      </span>
                    )}
                    <span className={styles.checkbox} role="checkbox" aria-checked={Boolean(todo.done)}>
                      <span className={styles.box}>
                        {todo.done && (
                          <svg viewBox="0 0 20 20">
                            <path d="M5 10.5l3.25 3.25L15 7" />
                          </svg>
                        )}
                      </span>
                    </span>
                    <span className={todo.done ? styles.todoDone : undefined}>{todo.text}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.slashBlock}>
                <span className={styles.slashQuery}>
                  /<span className={styles.caret} />
                  <span className={styles.slashHint}>Type to search</span>
                </span>
                <div className={styles.slashMenu} role="listbox" aria-label="Insert a block" data-inspect="slash-menu">
                  <p className={styles.menuGroup}>Basic blocks</p>
                  {SLASH_ITEMS.map((item, index) => (
                    <span key={item.title} className={styles.menuItem} role="option" aria-selected={index === 0}>
                      <span className={styles.menuIcon}>
                        {item.heading ? (
                          <span className={styles.headingGlyph}>
                            H<small>{item.heading}</small>
                          </span>
                        ) : (
                          item.icon && <Icon d={item.icon} />
                        )}
                      </span>
                      {item.title}
                      {item.markdown && <kbd className={styles.markdown}>{item.markdown}</kbd>}
                    </span>
                  ))}
                  <div className={styles.menuFooter}>
                    Close menu
                    <kbd>esc</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
