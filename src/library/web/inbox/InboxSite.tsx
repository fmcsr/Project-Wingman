import styles from './InboxSite.module.css';

/** Stroke icons on a 24px grid. */
const ICONS = {
  menu: 'M4 7h16M4 12h16M4 17h16',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  tune: 'M4 7h9M17 7h3M15 5v4M4 17h3M11 17h9M9 15v4',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1',
  pencil: 'M12 20h8M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  inbox:
    'M3.5 13.5l2.4-7.1A2 2 0 0 1 7.8 5h8.4a2 2 0 0 1 1.9 1.4l2.4 7.1M3.5 13.5V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-4.5M3.5 13.5h4.3l1.4 2.5h5.6l1.4-2.5h4.3',
  star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  send: 'M21 3L10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5z',
  draft: 'M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5zM14 3.5v5h5',
  tag:
    'M3.5 12.2V5A1.5 1.5 0 0 1 5 3.5h7.2a1.5 1.5 0 0 1 1 .4l7.6 7.6a1.5 1.5 0 0 1 0 2.1l-7.1 7.1a1.5 1.5 0 0 1-2.1 0l-7.7-7.5a1.5 1.5 0 0 1-.4-1zM8 8h.01',
  people: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6M22 21a6 6 0 0 0-4-5.6',
  archive: 'M4 4.5h16v4H4zM5.5 8.5V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V8.5M10 12.5h4',
  trash: 'M4 7h16M9.5 7V4.5h5V7M6 7l1 13h10l1-13M10 11v5M14 11v5',
  mailOpen: 'M3.5 10L12 4l8.5 6v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1zM3.5 10l8.5 5.5 8.5-5.5',
  mail: 'M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1zM3.5 7l8.5 6 8.5-6',
  more: 'M12 5.5h.01M12 12h.01M12 18.5h.01',
  chevronDown: 'M6 9l6 6 6-6',
  chevronLeft: 'M15 6l-6 6 6 6',
  chevronRight: 'M9 6l6 6-6 6',
  reply: 'M9.5 7L4 12l5.5 5M4 12h10a6 6 0 0 1 6 6v1',
  forward: 'M14.5 7L20 12l-5.5 5M20 12H10a6 6 0 0 0-6 6v1',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  dash: 'M6 12h12',
};

/** A filled document with a folded corner, the file-type icon of a PDF. */
const FILE_PATH = 'M6.5 2.5h8l5 5v13a1.5 1.5 0 0 1-1.5 1.5h-11.5A1.5 1.5 0 0 1 5 20.5v-16.5a1.5 1.5 0 0 1 1.5-1.5z';

const FOLDERS = [
  { label: 'Inbox', icon: ICONS.inbox, unread: '24', current: true },
  { label: 'Starred', icon: ICONS.star },
  { label: 'Snoozed', icon: ICONS.clock },
  { label: 'Sent', icon: ICONS.send },
  { label: 'Drafts', icon: ICONS.draft, total: '2' },
];

/** Label colors in the rail are the same in both themes; the chips on messages use tinted pairs instead. */
const RAIL_LABELS = [
  { name: 'Product', color: '#4c8df6' },
  { name: 'Hiring', color: '#f08a24' },
  { name: 'Finance', color: '#2fa65a' },
  { name: 'Travel', color: '#a66cf5' },
];

type Chip = 'Important' | 'Product' | 'Finance' | 'Hiring';

const CHIP_CLASS: Record<Chip, string> = {
  Important: styles.chipImportant,
  Product: styles.chipProduct,
  Finance: styles.chipFinance,
  Hiring: styles.chipHiring,
};

type Message = {
  sender: string;
  subject: string;
  snippet: string;
  time: string;
  unread?: boolean;
  starred?: boolean;
  labels?: Chip[];
  attachment?: string;
  /** How the row is drawn: open in the reading pane, under the pointer, or checked for a bulk action. */
  state?: 'open' | 'hover' | 'checked';
};

/** "Today" in this picture is Monday, Oct 26, a little after 11:30 AM. */
const MESSAGES: Message[] = [
  {
    sender: 'Marcus Lee',
    subject: 'Offsite venue shortlist',
    snippet: 'Three options in Lisbon for the week of Nov 16. The second one has the big workshop room we liked.',
    time: '11:08 AM',
    unread: true,
    labels: ['Important'],
  },
  {
    sender: 'Priya Raman',
    subject: 'Q4 roadmap review — final deck',
    snippet: "Here's the final deck for Thursday. Could you double-check the pricing slide before I send it around?",
    time: '10:42 AM',
    starred: true,
    labels: ['Product'],
    attachment: 'Q4-roadmap.pdf',
    state: 'open',
  },
  {
    sender: 'Aerolume',
    subject: 'Check-in for your Lisbon flight opens tomorrow',
    snippet: 'Booking K7Q2ZP · Mon, Nov 16 · London (LHR) to Lisbon (LIS), departing 7:25 AM.',
    time: '9:15 AM',
    unread: true,
  },
  {
    sender: 'Jonah Brooks',
    subject: 'Re: Interview loop for the senior designer role',
    snippet: "Works for me. I'll take the portfolio review on Wednesday and send my notes by Friday.",
    time: '8:57 AM',
    labels: ['Hiring'],
    state: 'hover',
  },
  {
    sender: 'Cloudhaven Billing',
    subject: 'Invoice INV-20419 for October',
    snippet: 'Your invoice for $1,240.00 is ready. Payment is due on Nov 9.',
    time: 'Oct 25',
    labels: ['Finance'],
    attachment: 'INV-20419.pdf',
    state: 'checked',
  },
  {
    sender: 'Aisha Khan',
    subject: "Notes from Friday's user interviews",
    snippet: "Five sessions, three patterns. The biggest one: people don't trust auto-sync yet.",
    time: 'Oct 24',
    starred: true,
    state: 'checked',
  },
  {
    sender: 'Elena Petrova',
    subject: 'Design review moved to 3 PM',
    snippet: 'Same room, same agenda. Sorry for the shuffle!',
    time: 'Oct 23',
    unread: true,
  },
  {
    sender: 'Tom Becker',
    subject: 'Lunch next week?',
    snippet: 'The Thai place on Fifth or the new ramen spot? Your call.',
    time: 'Oct 23',
  },
  {
    sender: 'Noah Kim',
    subject: 'Beta feedback summary, week 6',
    snippet: '42 responses. Search is the top request again, followed by bulk edit.',
    time: 'Oct 22',
    labels: ['Product'],
  },
  {
    sender: 'Fernhill People Team',
    subject: 'Open enrollment closes Friday',
    snippet: 'Pick your health plan by Oct 30, or your current plan rolls over.',
    time: 'Oct 21',
  },
];

const ROW_STATE = { open: styles.rowOpen, hover: styles.rowHover, checked: styles.rowChecked };

/** The signed-in user, Lena Fischer, and the sender of the open message. */
const ME = { initials: 'LF', color: '#7c3aed' };
const PRIYA = { initials: 'PR', color: '#c2410c' };

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

function Attachment({ name, size }: { name: string; size?: string }) {
  return (
    <span className={styles.attachment} data-inspect="attachment-chip">
      <svg className={styles.fileIcon} viewBox="0 0 24 24">
        <path d={FILE_PATH} />
        <path className={styles.fileFold} d="M14.5 2.5v5h5" />
      </svg>
      {name}
      {size && <span className={styles.fileSize}>{size}</span>}
    </span>
  );
}

function MessageRow({ message }: { message: Message }) {
  const checked = message.state === 'checked';
  const classes = [styles.row, message.unread && styles.unread, message.state && ROW_STATE[message.state]];

  return (
    <div className={classes.filter(Boolean).join(' ')} data-inspect="message-row">
      <span className={styles.rowControls}>
        <span className={styles.checkbox} role="checkbox" aria-checked={checked} data-inspect="row-checkbox">
          {checked && <Icon d={ICONS.check} />}
        </span>
        <span className={styles.star} role="button" aria-pressed={Boolean(message.starred)} data-inspect="star-toggle">
          <Icon d={ICONS.star} />
        </span>
      </span>

      <div className={styles.rowBody}>
        <div className={styles.rowTop}>
          <span className={styles.sender}>{message.sender}</span>
          {message.state === 'hover' ? (
            <span className={styles.quickActions} data-inspect="quick-actions">
              <span className={styles.quickButton} role="button" aria-label="Archive">
                <Icon d={ICONS.archive} />
              </span>
              <span className={styles.quickButton} role="button" aria-label="Delete">
                <Icon d={ICONS.trash} />
              </span>
              <span className={styles.quickButton} role="button" aria-label="Mark as unread">
                <Icon d={ICONS.mail} />
              </span>
              <span className={styles.quickButton} role="button" aria-label="Snooze">
                <Icon d={ICONS.clock} />
              </span>
            </span>
          ) : (
            <span className={styles.time}>{message.time}</span>
          )}
        </div>
        <div className={styles.rowLine}>
          {message.labels?.map((label) => (
            <span key={label} className={`${styles.chip} ${CHIP_CLASS[label]}`} data-inspect="label">
              {label}
            </span>
          ))}
          <span className={styles.preview}>
            <span className={styles.subject}>{message.subject}</span>
            <span className={styles.snippet}> — {message.snippet}</span>
          </span>
        </div>
        {message.attachment && (
          <span className={styles.rowAttachments}>
            <Attachment name={message.attachment} />
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Library example: an email client in three panes (folders, message list, reading pane). The list shows every row
 * state at once: unread, open, checked and hovered with its quick actions. Not interactive; for inspection only.
 */
export function InboxSite() {
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <header className={styles.topbar}>
          <span className={styles.brand}>
            <span className={styles.iconButton}>
              <Icon d={ICONS.menu} />
            </span>
            <span className={styles.logo}>
              <Icon d={ICONS.mail} />
            </span>
            <span className={styles.wordmark}>Inbox</span>
          </span>

          <div className={styles.search} role="search" data-inspect="search-field">
            <Icon d={ICONS.search} />
            <span className={styles.placeholder}>Search mail</span>
            <span className={styles.iconButton} role="button" aria-label="Show search options">
              <Icon d={ICONS.tune} />
            </span>
          </div>

          <span className={styles.topActions}>
            <span className={`${styles.iconButton} ${styles.settings}`}>
              <Icon d={ICONS.settings} />
            </span>
            <span className={styles.avatar} style={{ background: ME.color }}>
              {ME.initials}
            </span>
          </span>
        </header>

        <div className={styles.body}>
          <aside className={styles.rail}>
            <div className={styles.railInner}>
              <span className={styles.compose} data-inspect="compose-button">
                <Icon d={ICONS.pencil} />
                <span className={styles.composeLabel}>Compose</span>
              </span>

              <nav className={styles.folders}>
                {FOLDERS.map((folder) => (
                  <a
                    key={folder.label}
                    className={styles.folder}
                    data-inspect="folder-item"
                    aria-current={folder.current ? 'page' : undefined}
                  >
                    <Icon d={folder.icon} />
                    <span className={styles.folderLabel}>{folder.label}</span>
                    {folder.unread && <span className={styles.unreadCount}>{folder.unread}</span>}
                    {folder.total && <span className={styles.totalCount}>{folder.total}</span>}
                  </a>
                ))}
              </nav>

              <div className={styles.railHeading}>
                Labels
                <Icon d={ICONS.plus} />
              </div>
              <div className={styles.folders}>
                {RAIL_LABELS.map((label) => (
                  <a key={label.name} className={styles.folder} data-inspect="label">
                    <svg className={styles.tagIcon} viewBox="0 0 24 24" style={{ color: label.color }}>
                      <path d={ICONS.tag} />
                    </svg>
                    <span className={styles.folderLabel}>{label.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <section className={styles.list}>
            <div className={styles.toolbar} role="toolbar" data-inspect="toolbar">
              <span className={styles.selectAll} data-inspect="select-all">
                <span className={styles.checkbox} role="checkbox" aria-checked="mixed">
                  <Icon d={ICONS.dash} />
                </span>
                <span role="button" aria-haspopup="menu" aria-label="Select">
                  <Icon d={ICONS.chevronDown} className={styles.caret} />
                </span>
              </span>
              <span className={styles.toolButton} role="button" aria-label="Archive">
                <Icon d={ICONS.archive} />
              </span>
              <span className={styles.toolButton} role="button" aria-label="Delete">
                <Icon d={ICONS.trash} />
              </span>
              <span className={styles.toolButton} role="button" aria-label="Mark as read">
                <Icon d={ICONS.mailOpen} />
              </span>
              <span className={styles.toolButton} role="button" aria-label="More">
                <Icon d={ICONS.more} className={styles.dots} />
              </span>

              <span className={styles.pagination} data-inspect="pagination">
                <span className={styles.range}>1–50 of 2,148</span>
                <span className={styles.toolButton} role="button" aria-label="Newer" aria-disabled="true">
                  <Icon d={ICONS.chevronLeft} />
                </span>
                <span className={styles.toolButton} role="button" aria-label="Older">
                  <Icon d={ICONS.chevronRight} />
                </span>
              </span>
            </div>

            <div className={styles.tabs} role="tablist" data-inspect="category-tabs">
              <span className={styles.tab} role="tab" aria-selected="true">
                <Icon d={ICONS.inbox} className={styles.tabIcon} />
                Primary
              </span>
              <span className={styles.tab} role="tab" aria-selected="false">
                <Icon d={ICONS.tag} className={styles.tabIcon} />
                Promotions
                <span className={styles.newBadge}>3 new</span>
              </span>
              <span className={styles.tab} role="tab" aria-selected="false">
                <Icon d={ICONS.people} className={styles.tabIcon} />
                Social
              </span>
            </div>

            {MESSAGES.map((message) => (
              <MessageRow key={message.subject} message={message} />
            ))}
          </section>

          <article className={styles.reading} data-inspect="reading-pane">
            <div className={styles.subjectRow}>
              <h2 className={styles.subjectTitle}>Q4 roadmap review — final deck</h2>
              <span className={`${styles.chip} ${styles.chipProduct}`} data-inspect="label">
                Product
              </span>
            </div>

            <div className={styles.messageHeader} data-inspect="message-header">
              <span className={`${styles.avatar} ${styles.avatarLarge}`} style={{ background: PRIYA.color }}>
                {PRIYA.initials}
              </span>
              <span className={styles.from}>
                <span className={styles.fromLine}>
                  <span className={styles.fromName}>Priya Raman</span>
                  <span className={styles.fromAddress}>&lt;priya@fernhill.co&gt;</span>
                </span>
                <span className={styles.toLine}>to me</span>
              </span>
              <span className={styles.headerEnd}>
                <span className={styles.sentTime}>
                  10:42 AM <span className={styles.relative}>(52 minutes ago)</span>
                </span>
                <span className={styles.toolButton} role="button" aria-label="Reply">
                  <Icon d={ICONS.reply} />
                </span>
                <span className={styles.toolButton} role="button" aria-label="Forward">
                  <Icon d={ICONS.forward} />
                </span>
              </span>
            </div>

            <div className={styles.messageBody}>
              <p>Hi Lena,</p>
              <p>
                Here's the final deck for Thursday's roadmap review. I folded in last week's feedback: onboarding now
                leads the quarter, and the reporting revamp moves to Q1.
              </p>
              <p>
                Could you double-check the pricing slide (slide 9)? Finance wants the annual-plan discount at 15%, but
                the deck still says 20%.
              </p>
              <p>
                Thanks!
                <br />
                Priya
              </p>
              <span className={styles.bodyAttachments}>
                <Attachment name="Q4-roadmap.pdf" size="2.4 MB" />
              </span>
            </div>

            <div className={styles.replyBox} data-inspect="reply-composer">
              <Icon d={ICONS.reply} />
              <span className={styles.replyPlaceholder}>Reply to Priya Raman…</span>
              <kbd className={styles.kbd}>R</kbd>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
