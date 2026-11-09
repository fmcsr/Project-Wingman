import type { ReactNode } from 'react';
import styles from './RelaySite.module.css';
import amaraPhoto from './photos/amara.webp';
import danielPhoto from './photos/daniel.webp';
import inesPhoto from './photos/ines.webp';
import luciaPhoto from './photos/lucia.webp';
import mateoPhoto from './photos/mateo.webp';
import nadiaPhoto from './photos/nadia.webp';
import omarPhoto from './photos/omar.webp';
import theoPhoto from './photos/theo.webp';
import trailPhoto from './photos/trail.webp';

/** Line icons on a 20px grid; stroke color and width come from the stylesheet. */
const ICONS = {
  arrowLeft: 'M16 10H4.5M9.25 5.25L4.5 10l4.75 4.75',
  arrowRight: 'M4 10h11.5M10.75 5.25L15.5 10l-4.75 4.75',
  /** A clock with an arrow running back around it: recently viewed */
  history: 'M3.6 10.6A6.5 6.5 0 1 0 5.4 5.4M5.4 2.9v2.5h2.5M10 6.6V10l2.4 1.6',
  search: 'M8.75 14.5a5.75 5.75 0 1 0 0-11.5 5.75 5.75 0 0 0 0 11.5zM13 13l4 4',
  help:
    'M10 17.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5zM7.9 7.9a2.2 2.2 0 0 1 4.25.75c0 1.45-2.15 1.8-2.15 3.1M10 14.15h.01',
  home: 'M3.75 8.9L10 3.75l6.25 5.15v6.6a1 1 0 0 1-1 1h-3.5v-4.25h-3.5v4.25h-3.5a1 1 0 0 1-1-1z',
  /** Two overlapping speech bubbles */
  dms:
    'M12.75 7.25v-2a1.5 1.5 0 0 0-1.5-1.5h-6.5a1.5 1.5 0 0 0-1.5 1.5v4.5a1.5 1.5 0 0 0 1.5 1.5h.5v2.25l2.5-2.25M8.75 8.75h6.5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-.5v2.25l-2.5-2.25h-3.5a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 1.5-1.5z',
  bell:
    'M10 3.25a4.75 4.75 0 0 0-4.75 4.75v3.6L3.75 14.5h12.5l-1.5-2.9V8A4.75 4.75 0 0 0 10 3.25zM8.1 16.75a1.95 1.95 0 0 0 3.8 0',
  bookmark:
    'M6 3.25h8a.75.75 0 0 1 .75.75v12.6a.4.4 0 0 1-.64.32L10 13.75l-4.11 3.17a.4.4 0 0 1-.64-.32V4A.75.75 0 0 1 6 3.25z',
  plus: 'M10 4.25v11.5M4.25 10h11.5',
  chevronDown: 'M6.25 8.25L10 12l3.75-3.75',
  chevronLeft: 'M12.5 4.5L7 10l5.5 5.5',
  /** Three lines, each shorter: filter and sort the sidebar */
  filter: 'M3.75 6h12.5M6 10h8M8.25 14h3.5',
  compose:
    'M9.25 4H5.25A1.25 1.25 0 0 0 4 5.25v9.5A1.25 1.25 0 0 0 5.25 16h9.5A1.25 1.25 0 0 0 16 14.75v-4M14.6 3.4a1.45 1.45 0 0 1 2.05 2.05L10.2 11.9l-2.7.6.6-2.7z',
  /** A speech bubble with two lines of text: threads, and replying in one */
  thread:
    'M10 3.5c3.87 0 7 2.6 7 5.8s-3.13 5.8-7 5.8c-.9 0-1.77-.14-2.57-.4L3.75 16.25l1.1-3.05A5.4 5.4 0 0 1 3 9.3c0-3.2 3.13-5.8 7-5.8zM7 8.4h6M7 11h3.75',
  /** Paper plane: drafts & sent, and the send button */
  send: 'M8.75 11.25L16.5 3.5M16.5 3.5l-4.6 13.1a.4.4 0 0 1-.74.05L8.75 11.25 3.35 8.84a.4.4 0 0 1 .05-.74z',
  hash: 'M8.1 3.5L6.6 16.5M13.4 3.5l-1.5 13M4 7.5h12.5M3.5 12.5H16',
  lock:
    'M6.75 9V7.25a3.25 3.25 0 0 1 6.5 0V9M5.75 9h8.5a1 1 0 0 1 1 1v5.75a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z',
  headphones:
    'M3.75 13.75V10.5a6.25 6.25 0 0 1 12.5 0v3.25M3.75 12.25h1.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1zM16.25 12.25h-1.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h.5a1 1 0 0 0 1-1z',
  message:
    'M4.25 4.25h11.5a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1H9.5l-3.75 2.75v-2.75h-1.5a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1z',
  file: 'M11.25 3.25H6a1 1 0 0 0-1 1v11.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7zM11.25 3.25V7H15',
  pin: 'M7.25 3.5h5.5M8.25 3.5v4.25L5.75 11h8.5l-2.5-3.25V3.5M10 11v5.5',
  smilePlus:
    'M16.75 10.5a6.75 6.75 0 1 1-7.3-7.23M7.1 11.6a3.4 3.4 0 0 0 5.8 0M7.6 8h.01M12.4 8h.01M15.5 2.5v4.5M13.25 4.75h4.5',
  bold: 'M6.25 4.25h4.5a2.9 2.9 0 0 1 0 5.8h-4.5zM6.25 10.05h5.25a2.85 2.85 0 0 1 0 5.7H6.25z',
  italic: 'M8.75 4.25h6M5.25 15.75h6M11.75 4.25l-3.5 11.5',
  strike:
    'M4 10h12M13.4 6.6c-.4-1.35-1.7-2.35-3.4-2.35-2 0-3.4 1.15-3.4 2.65 0 1.1.7 1.85 1.85 2.4M6.6 13.4c.4 1.4 1.75 2.35 3.5 2.35 2.05 0 3.5-1.05 3.5-2.7 0-.55-.15-1-.45-1.4',
  link:
    'M8.9 11.1a3 3 0 0 0 4.24 0l2.36-2.36a3 3 0 0 0-4.24-4.24l-1 1M11.1 8.9a3 3 0 0 0-4.24 0L4.5 11.26a3 3 0 0 0 4.24 4.24l1-1',
  numbered:
    'M8.75 5.5h7.5M8.75 10h7.5M8.75 14.5h7.5M4 4.4l1-.65v3.5M3.75 9.4a1.05 1.05 0 0 1 2 .45c0 .9-2 1.35-2 2.4h2.1',
  bulleted: 'M8.75 5.5h7.5M8.75 10h7.5M8.75 14.5h7.5M4.75 5.5h.01M4.75 10h.01M4.75 14.5h.01',
  quote: 'M4.5 4.5v11M8.5 6h7.75M8.5 10h7.75M8.5 14h5',
  code: 'M7.25 6L3.25 10l4 4M12.75 6l4 4-4 4',
  codeBlock:
    'M4.75 3.75h10.5a1 1 0 0 1 1 1v10.5a1 1 0 0 1-1 1H4.75a1 1 0 0 1-1-1V4.75a1 1 0 0 1 1-1zM8.25 8L6.25 10l2 2M11.75 8l2 2-2 2',
  emoji: 'M10 16.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5zM7.1 11.6a3.4 3.4 0 0 0 5.8 0M7.6 8h.01M12.4 8h.01',
  at: 'M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM13 10v1.15a2 2 0 0 0 4 0V10a7 7 0 1 0-2.8 5.6',
  video:
    'M3.25 6.25a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1h-7.5a1 1 0 0 1-1-1zM12.75 8.6l4-2.35v7.5l-4-2.35',
  mic:
    'M10 2.75a2.5 2.5 0 0 1 2.5 2.5v4.5a2.5 2.5 0 0 1-5 0v-4.5A2.5 2.5 0 0 1 10 2.75zM5.25 9.5a4.75 4.75 0 0 0 9.5 0M10 14.25v3',
  /** A slash in a box: shortcuts */
  shortcut: 'M4.75 3.75h10.5a1 1 0 0 1 1 1v10.5a1 1 0 0 1-1 1H4.75a1 1 0 0 1-1-1V4.75a1 1 0 0 1 1-1zM12 6.5l-4 7',
  close: 'M5.25 5.25l9.5 9.5M14.75 5.25l-9.5 9.5',
};

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 20 20" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** Three dots in a row (···) or a column (⋮): "more". */
function Dots({ vertical }: { vertical?: boolean }) {
  const spots = [4.5, 10, 15.5];
  return (
    <svg className={styles.dots} viewBox="0 0 20 20" aria-hidden="true">
      {spots.map((at) => (
        <circle key={at} cx={vertical ? 10 : at} cy={vertical ? at : 10} r="1.5" />
      ))}
    </svg>
  );
}

/** A small filled triangle that folds a sidebar section open or shut. */
function Caret() {
  return (
    <svg className={styles.caret} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5.75 7.75h8.5L10 12.75z" />
    </svg>
  );
}

/** Relay's own mark: a lowercase r passing a dot (the message) along, on an ember tile. */
function RelayLogo() {
  return (
    <svg className={styles.logoMark} viewBox="0 0 24 24" aria-hidden="true">
      <rect className={styles.logoTile} width="24" height="24" rx="6.5" />
      <path className={styles.logoR} d="M8.6 17.4v-5.9a4.3 4.3 0 0 1 4.3-4.3h.9" />
      <circle className={styles.logoDot} cx="15.9" cy="15.9" r="1.9" />
    </svg>
  );
}

/** The Larkspur workspace's logo, uploaded by the team: a ridge under a low sun. It looks the same in both themes. */
function LarkspurLogo({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#efe5cf" />
      <circle cx="15.6" cy="8.4" r="2.3" fill="#df7238" />
      <path d="M3.5 18.25l5.5-8.1 3.4 4.75 2.55-3.15 5.55 6.5z" fill="#245446" />
    </svg>
  );
}

type Person = { name: string; photo: string };

/** The signed-in user. */
const THEO: Person = { name: 'Theo Lambert', photo: theoPhoto };
const NADIA: Person = { name: 'Nadia Haddad', photo: nadiaPhoto };
const MATEO: Person = { name: 'Mateo Reyes', photo: mateoPhoto };
const LUCIA: Person = { name: 'Lucia Ferreira', photo: luciaPhoto };
const AMARA: Person = { name: 'Amara Okafor', photo: amaraPhoto };
const OMAR: Person = { name: 'Omar Siddiqui', photo: omarPhoto };
const DANIEL: Person = { name: 'Daniel Asante', photo: danielPhoto };
const INES: Person = { name: 'Ines Moreau', photo: inesPhoto };

/** A photo avatar: a rounded square. It's decorative next to a name, and labeled where it stands alone. */
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

type Presence = 'active' | 'away';

/** Active is a filled green dot, away a hollow ring: shape as well as color. */
function PresenceDot({ status }: { status: Presence }) {
  return (
    <span
      className={`${styles.presence} ${styles[status]}`}
      role="img"
      aria-label={status === 'active' ? 'Active' : 'Away'}
      data-inspect="presence-dot"
    />
  );
}

const RAIL: { label: string; icon?: string; current?: boolean; badge?: string }[] = [
  { label: 'Home', icon: ICONS.home, current: true },
  { label: 'DMs', icon: ICONS.dms, badge: '1' },
  { label: 'Activity', icon: ICONS.bell, badge: '2' },
  { label: 'Saved', icon: ICONS.bookmark },
  { label: 'More' },
];

type Channel = {
  name: string;
  private?: boolean;
  current?: boolean;
  unread?: boolean;
  mentions?: string;
  muted?: boolean;
};

/** Sorted A to Z, as the sidebar lists them by default. */
const CHANNELS: Channel[] = [
  { name: 'announcements' },
  { name: 'design-crit', unread: true, mentions: '2' },
  { name: 'eng-mobile', unread: true },
  { name: 'launch-press', private: true },
  { name: 'product-launch', current: true },
  { name: 'random', muted: true },
  { name: 'support-escalations' },
];

const DIRECT_MESSAGES: { person: Person; status: Presence; unread?: string; you?: boolean }[] = [
  { person: AMARA, status: 'active' },
  { person: DANIEL, status: 'away', unread: '1' },
  { person: INES, status: 'away' },
  { person: MATEO, status: 'active' },
  { person: OMAR, status: 'active' },
  { person: THEO, status: 'active', you: true },
];

/** Inline code: a monospace chip for branch names and commands. */
function Code({ children }: { children: ReactNode }) {
  return <code className={styles.code}>{children}</code>;
}

type MessageProps = {
  author: Person;
  /** Shown next to the name, or in the gutter of a follow-up while it's hovered. */
  time: string;
  dateTime: string;
  /** A follow-up from the same author: no avatar or name, just the text under the previous message. */
  followUp?: boolean;
  hovered?: boolean;
  children: ReactNode;
};

function Message({ author, time, dateTime, followUp, hovered, children }: MessageProps) {
  const classes = [styles.message];
  if (followUp) classes.push(styles.followUp);
  if (hovered) classes.push(styles.hovered);

  return (
    <article className={classes.join(' ')} data-inspect="message">
      {followUp ? (
        <time className={styles.gutterTime} dateTime={dateTime}>
          {time.replace(/ [AP]M$/, '')}
        </time>
      ) : (
        <Avatar person={author} className={styles.messageAvatar} />
      )}
      <div className={styles.messageBody}>
        {!followUp && (
          <p className={styles.messageMeta}>
            <span className={styles.author}>{author.name}</span>
            <time className={styles.time} dateTime={dateTime}>
              {time}
            </time>
          </p>
        )}
        {children}
      </div>
      {hovered && <HoverToolbar />}
    </article>
  );
}

function HoverToolbar() {
  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Message actions" data-inspect="hover-toolbar">
      <span className={styles.quickReaction} role="button" aria-label="React with white check mark">
        ✅
      </span>
      <span className={styles.quickReaction} role="button" aria-label="React with eyes">
        👀
      </span>
      <span className={styles.quickReaction} role="button" aria-label="React with raised hands">
        🙌
      </span>
      <span className={styles.tool} role="button" aria-label="Add reaction">
        <Icon d={ICONS.smilePlus} />
        <span className={styles.toolLabel}>React</span>
      </span>
      <span className={styles.tool} role="button" aria-label="Reply in thread">
        <Icon d={ICONS.thread} />
        <span className={styles.toolLabel}>Reply</span>
      </span>
      <span
        className={`${styles.tool} ${styles.toolMore}`}
        role="button"
        aria-label="More actions"
        aria-haspopup="menu"
      >
        <Dots vertical />
      </span>
    </div>
  );
}

type Reaction = { emoji: string; count: number; label: string; mine?: boolean };

function Reactions({ items }: { items: Reaction[] }) {
  return (
    <div className={styles.reactions} data-inspect="reactions">
      {items.map((item) => (
        <span
          key={item.emoji}
          className={item.mine ? `${styles.reaction} ${styles.reactionMine}` : styles.reaction}
          role="button"
          aria-pressed={item.mine ?? false}
          aria-label={`${item.count} reactions with ${item.label}${item.mine ? ', including yours' : ''}`}
        >
          <span className={styles.emoji}>{item.emoji}</span>
          {item.count}
        </span>
      ))}
      <span className={styles.addReaction} role="button" aria-label="Add reaction">
        <Icon d={ICONS.smilePlus} />
      </span>
    </div>
  );
}

/** An unfurled link: the page's site, title, description and image, fetched from the link, behind a gray bar. */
function LinkPreview() {
  return (
    <div className={styles.unfurl} data-inspect="link-preview">
      <span className={styles.unfurlSite}>
        <LarkspurLogo className={styles.favicon} />
        Larkspur
      </span>
      <a className={styles.unfurlTitle}>What’s new in Larkspur 3.0</a>
      <span className={styles.unfurlText}>
        Download any trail for offline use, follow your route without signal and share live progress with your group.
      </span>
      <img
        className={styles.unfurlImage}
        src={trailPhoto}
        alt="A hiker with a backpack on a trail through a mountain valley"
        draggable={false}
      />
    </div>
  );
}

function ThreadSummary() {
  return (
    <div className={styles.threadSummary} role="button" aria-expanded="true" data-inspect="thread-summary">
      <span className={styles.summaryAvatars}>
        {[LUCIA, AMARA, OMAR].map((person) => (
          <Avatar key={person.name} person={person} className={styles.summaryAvatar} labeled />
        ))}
      </span>
      <span className={styles.replyCount}>4 replies</span>
      <span className={styles.lastReply}>Last reply 5 minutes ago</span>
    </div>
  );
}

/** The formatting toolbar, in groups: text styles, link, lists, quote, code. */
const FORMAT_GROUPS: { label: string; icon: string; optional?: boolean }[][] = [
  [
    { label: 'Bold', icon: ICONS.bold },
    { label: 'Italic', icon: ICONS.italic },
    { label: 'Strikethrough', icon: ICONS.strike },
  ],
  [{ label: 'Link', icon: ICONS.link }],
  [
    { label: 'Numbered list', icon: ICONS.numbered },
    { label: 'Bulleted list', icon: ICONS.bulleted },
  ],
  [{ label: 'Quote', icon: ICONS.quote, optional: true }],
  [
    { label: 'Code', icon: ICONS.code },
    { label: 'Code block', icon: ICONS.codeBlock },
  ],
];

/** The message box: formatting on top, the text, then actions. The thread's box adds "Also send to". */
function Composer({ placeholder, alsoSendTo }: { placeholder: string; alsoSendTo?: string }) {
  return (
    <div className={styles.composer} data-inspect="composer">
      <div className={styles.formatBar} role="toolbar" aria-label="Formatting">
        {FORMAT_GROUPS.map((group, index) => (
          <span
            key={group[0].label}
            className={group[0].optional ? `${styles.formatGroup} ${styles.formatOptional}` : styles.formatGroup}
          >
            {index > 0 && <span className={styles.divider} />}
            {group.map((format) => (
              <span key={format.label} className={styles.formatButton} role="button" aria-label={format.label}>
                <Icon d={format.icon} />
              </span>
            ))}
          </span>
        ))}
      </div>
      <div className={styles.field} role="textbox" aria-multiline="true" aria-placeholder={placeholder}>
        <span className={styles.placeholder}>{placeholder}</span>
      </div>
      {alsoSendTo && (
        <span className={styles.alsoSend}>
          <span className={styles.checkbox} role="checkbox" aria-checked="false" />
          Also send to
          <span className={styles.alsoSendChannel}>
            <Icon d={ICONS.hash} />
            {alsoSendTo}
          </span>
        </span>
      )}
      <div className={styles.composerActions}>
        <span className={styles.attach} role="button" aria-label="Attach">
          <Icon d={ICONS.plus} />
        </span>
        <span
          className={`${styles.composerButton} ${styles.formatToggle}`}
          role="button"
          aria-label="Hide formatting"
          aria-pressed="true"
        >
          Aa
        </span>
        <span className={styles.composerButton} role="button" aria-label="Emoji">
          <Icon d={ICONS.emoji} />
        </span>
        <span className={styles.composerButton} role="button" aria-label="Mention someone">
          <Icon d={ICONS.at} />
        </span>
        <span className={`${styles.divider} ${styles.clipGroup}`} />
        <span className={`${styles.composerButton} ${styles.clipGroup}`} role="button" aria-label="Record a video clip">
          <Icon d={ICONS.video} />
        </span>
        <span
          className={`${styles.composerButton} ${styles.clipGroup}`}
          role="button"
          aria-label="Record an audio clip"
        >
          <Icon d={ICONS.mic} />
        </span>
        <span className={`${styles.divider} ${styles.clipGroup}`} />
        <span className={`${styles.composerButton} ${styles.clipGroup}`} role="button" aria-label="Shortcuts">
          <Icon d={ICONS.shortcut} />
        </span>
        <span className={styles.send}>
          <span className={styles.sendButton} role="button" aria-label="Send now" aria-disabled="true">
            <Icon d={ICONS.send} />
          </span>
          <span className={styles.sendDivider} />
          <span className={styles.sendMenu} role="button" aria-label="Schedule for later" aria-disabled="true">
            <Icon d={ICONS.chevronDown} />
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * Library example: a team chat workspace, closely following Slack's desktop app with #product-launch open and a thread
 * on the right. The top bar, workspace rail and sidebar share Relay's deep pine green; every name, message and
 * number is made up. Not interactive; for inspection only.
 */
export function RelaySite() {
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <header className={styles.topBar}>
          <div className={styles.topStart}>
            <span className={styles.logo} role="img" aria-label="Relay">
              <RelayLogo />
            </span>
            <span className={styles.history}>
              <span className={styles.topButton} role="button" aria-label="Back">
                <Icon d={ICONS.arrowLeft} />
              </span>
              <span
                className={`${styles.topButton} ${styles.topButtonOff}`}
                role="button"
                aria-label="Forward"
                aria-disabled="true"
              >
                <Icon d={ICONS.arrowRight} />
              </span>
              <span className={styles.topButton} role="button" aria-label="History">
                <Icon d={ICONS.history} />
              </span>
            </span>
          </div>
          <span className={styles.search} role="search" aria-keyshortcuts="Meta+K" data-inspect="quick-switcher">
            <Icon d={ICONS.search} />
            <span className={styles.searchText}>Search Larkspur</span>
          </span>
          <div className={styles.topEnd}>
            <span className={styles.topButton} role="button" aria-label="Help">
              <Icon d={ICONS.help} />
            </span>
          </div>
        </header>

        <nav className={styles.rail} aria-label="Relay" data-inspect="workspace-rail">
          <div className={styles.railTop}>
            <span className={styles.workspaceTile} role="button" aria-label="Larkspur workspace" aria-haspopup="menu">
              <LarkspurLogo className={styles.workspaceLogo} />
            </span>
            {RAIL.map((item) => (
              <a key={item.label} className={styles.railItem} aria-current={item.current ? 'page' : undefined}>
                <span className={styles.railIcon}>
                  {item.icon ? <Icon d={item.icon} /> : <Dots />}
                  {item.badge && (
                    <span className={`${styles.badge} ${styles.railBadge}`} data-inspect="unread-badge">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className={styles.railLabel}>{item.label}</span>
              </a>
            ))}
          </div>
          <div className={styles.railBottom}>
            <span className={styles.create} role="button" aria-label="Create">
              <Icon d={ICONS.plus} />
            </span>
            <span className={styles.me} role="button" aria-haspopup="menu" aria-label="Your profile">
              <Avatar person={THEO} className={styles.meAvatar} labeled />
              <PresenceDot status="active" />
            </span>
          </div>
        </nav>

        <div className={styles.card}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <div className={styles.sidebarHeader} data-inspect="workspace-menu">
                <span className={styles.workspaceName} role="button" aria-haspopup="menu">
                  Larkspur
                  <Icon d={ICONS.chevronDown} className={styles.workspaceChevron} />
                </span>
                <span className={styles.headerTool} role="button" aria-label="Filter and sort">
                  <Icon d={ICONS.filter} />
                </span>
                <span className={`${styles.headerTool} ${styles.compose}`} role="button" aria-label="New message">
                  <Icon d={ICONS.compose} />
                </span>
              </div>

              <ul className={styles.rows}>
                <li>
                  <a className={styles.row}>
                    <Icon d={ICONS.thread} className={styles.rowIcon} />
                    <span className={styles.rowLabel}>Threads</span>
                  </a>
                </li>
                <li>
                  <a className={styles.row}>
                    <Icon d={ICONS.send} className={styles.rowIcon} />
                    <span className={styles.rowLabel}>Drafts &amp; sent</span>
                  </a>
                </li>
              </ul>

              <div className={styles.sections} data-inspect="channel-list">
                <section>
                  <span className={styles.sectionHeader} role="button" aria-expanded="true">
                    <Caret />
                    Channels
                  </span>
                  <ul className={styles.rows}>
                    {CHANNELS.map((channel) => {
                      const classes = [styles.row];
                      if (channel.unread) classes.push(styles.rowUnread);
                      if (channel.muted) classes.push(styles.rowMuted);
                      return (
                        <li key={channel.name}>
                          <a className={classes.join(' ')} aria-current={channel.current ? 'page' : undefined}>
                            <Icon d={channel.private ? ICONS.lock : ICONS.hash} className={styles.rowIcon} />
                            <span className={styles.rowLabel}>{channel.name}</span>
                            {channel.mentions && (
                              <span className={styles.badge} data-inspect="unread-badge">
                                {channel.mentions}
                              </span>
                            )}
                          </a>
                        </li>
                      );
                    })}
                    <li>
                      <a className={styles.row}>
                        <span className={styles.addIcon}>
                          <Icon d={ICONS.plus} />
                        </span>
                        <span className={styles.rowLabel}>Add channels</span>
                      </a>
                    </li>
                  </ul>
                </section>

                <section>
                  <span className={styles.sectionHeader} role="button" aria-expanded="true">
                    <Caret />
                    Direct messages
                  </span>
                  <ul className={styles.rows}>
                    {DIRECT_MESSAGES.map((dm) => (
                      <li key={dm.person.name}>
                        <a className={dm.unread ? `${styles.row} ${styles.rowUnread}` : styles.row}>
                          <span className={styles.dmAvatar}>
                            <Avatar person={dm.person} className={styles.rowAvatar} />
                            <PresenceDot status={dm.status} />
                          </span>
                          <span className={styles.rowLabel}>
                            {dm.person.name}
                            {dm.you && <span className={styles.you}>you</span>}
                          </span>
                          {dm.unread && (
                            <span className={styles.badge} data-inspect="unread-badge">
                              {dm.unread}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a className={styles.row}>
                        <span className={styles.addIcon}>
                          <Icon d={ICONS.plus} />
                        </span>
                        <span className={styles.rowLabel}>Add coworkers</span>
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </aside>

          <section className={styles.channel}>
            <div className={styles.top} data-inspect="channel-header">
              <header className={styles.header}>
                <span className={styles.back} role="button" aria-label="Back to channels, 3 unread">
                  <Icon d={ICONS.chevronLeft} />
                  <span className={styles.badge} data-inspect="unread-badge">
                    3
                  </span>
                </span>
                <div className={styles.titleBlock}>
                  <h2 className={styles.channelName}>
                    <span className={styles.channelButton} role="button" aria-haspopup="dialog">
                      <Icon d={ICONS.hash} className={styles.titleHash} />
                      <span className={styles.channelLabel}>product-launch</span>
                      <Icon d={ICONS.chevronDown} className={styles.titleChevron} />
                    </span>
                  </h2>
                  <p className={styles.memberLine}>18 members</p>
                </div>
                <span className={styles.members} role="button" aria-label="18 members">
                  <span className={styles.stack}>
                    {[NADIA, MATEO, LUCIA].map((person) => (
                      <Avatar key={person.name} person={person} className={styles.stackAvatar} />
                    ))}
                  </span>
                  18
                </span>
                <span className={styles.call}>
                  <span className={styles.callMain} role="button" aria-label="Start a call">
                    <Icon d={ICONS.headphones} />
                    <span className={styles.callLabel}>Call</span>
                  </span>
                  <span className={styles.callMenu} role="button" aria-label="Call options" aria-haspopup="menu">
                    <Icon d={ICONS.chevronDown} />
                  </span>
                </span>
                <span className={styles.moreButton} role="button" aria-label="Channel actions" aria-haspopup="menu">
                  <Dots vertical />
                </span>
              </header>
              <div className={styles.tabs} role="tablist" aria-label="Channel tabs">
                <span className={styles.tab} role="tab" aria-selected="true">
                  <Icon d={ICONS.message} />
                  Messages
                </span>
                <span className={styles.tab} role="tab" aria-selected="false">
                  <Icon d={ICONS.file} />
                  Files
                </span>
                <span className={styles.tab} role="tab" aria-selected="false">
                  <Icon d={ICONS.pin} />
                  Pins
                </span>
                <span className={styles.addTab} role="button" aria-label="Add a tab">
                  <Icon d={ICONS.plus} />
                </span>
              </div>
            </div>

            {/* "Today" in this picture is Tuesday, Oct 27, at 11:42 AM; launch is on Thursday */}
            <div className={styles.messages}>
              <div className={styles.day}>
                <span className={styles.datePill} role="button" aria-haspopup="menu" data-inspect="date-divider">
                  Today
                  <Icon d={ICONS.chevronDown} className={styles.dateChevron} />
                </span>

                <Message author={NADIA} time="9:12 AM" dateTime="09:12">
                  <p className={styles.text}>
                    Morning, team! Larkspur 3.0 is still on track for{' '}
                    <strong>Thursday at 10:00&nbsp;AM&nbsp;PT</strong>. 14 of 18 launch tasks are done; the last four
                    are in the pinned checklist.
                  </p>
                </Message>
                <Message author={NADIA} time="9:13 AM" dateTime="09:13" followUp>
                  <p className={styles.text}>
                    Reminder: the press embargo lifts at launch, so please keep screenshots internal until then.
                  </p>
                  <Reactions
                    items={[
                      { emoji: '🚀', count: 6, label: 'rocket' },
                      { emoji: '👍', count: 4, label: 'thumbs up', mine: true },
                      { emoji: '👀', count: 2, label: 'eyes' },
                    ]}
                  />
                </Message>

                <Message author={MATEO} time="10:02 AM" dateTime="10:02">
                  <p className={styles.text}>
                    RC4 is on staging if you want to try offline maps before Thursday:{' '}
                    <a className={styles.link}>staging.larkspur.app/whats-new</a>
                  </p>
                  <LinkPreview />
                </Message>
                <Message author={MATEO} time="10:05 AM" dateTime="10:05" followUp hovered>
                  <p className={styles.text}>Code freeze is on 🧊</p>
                  <p className={styles.text}>
                    Anything that isn’t in <Code>release/3.0.0</Code> yet needs a cherry-pick and a +1 from me.{' '}
                    <span className={styles.edited}>(edited)</span>
                  </p>
                </Message>

                <Message author={LUCIA} time="10:31 AM" dateTime="10:31">
                  <p className={styles.text}>
                    The launch email is ready for review! Which subject line should we go with? Options in the
                    thread 🧵
                  </p>
                  <ThreadSummary />
                </Message>

                <div
                  className={styles.newDivider}
                  role="separator"
                  aria-label="New messages"
                  data-inspect="unread-divider"
                >
                  <span className={styles.newLabel}>New</span>
                </div>

                <Message author={NADIA} time="11:38 AM" dateTime="11:38">
                  <p className={styles.text}>
                    <span className={`${styles.mention} ${styles.mentionYou}`} data-inspect="mention">
                      @{THEO.name}
                    </span>{' '}
                    can you confirm the App Store screenshots are final? The review cutoff is 2:00&nbsp;PM today.
                  </p>
                </Message>
                <Message author={NADIA} time="11:39 AM" dateTime="11:39" followUp>
                  <p className={styles.text}>
                    <span className={styles.mention} data-inspect="mention">
                      @{MATEO.name}
                    </span>{' '}
                    is the new privacy text in RC4, or does it need a cherry-pick too?
                  </p>
                </Message>
              </div>
            </div>

            <div className={styles.footer}>
              <Composer placeholder="Message #product-launch" />
              <p className={styles.typing} data-inspect="typing-indicator" aria-live="polite">
                <span>
                  <strong className={styles.typingName}>{AMARA.name}</strong> is typing…
                </span>
              </p>
            </div>
          </section>

          <aside className={styles.thread} aria-label="Thread" data-inspect="thread-panel">
            <header className={styles.threadHeader}>
              <h3 className={styles.threadTitle}>Thread</h3>
              <span className={styles.threadChannel}>
                <Icon d={ICONS.hash} />
                product-launch
              </span>
              <span className={styles.close} role="button" aria-label="Close thread">
                <Icon d={ICONS.close} />
              </span>
            </header>

            <div className={styles.threadBody}>
              <Message author={LUCIA} time="10:31 AM" dateTime="10:31">
                <p className={styles.text}>
                  The launch email is ready for review! Which subject line should we go with? Options in the thread 🧵
                </p>
              </Message>

              <div className={styles.replyDivider}>
                <span>4 replies</span>
              </div>

              <Message author={LUCIA} time="10:32 AM" dateTime="10:32">
                <ol className={styles.options}>
                  <li>Your trails, now offline</li>
                  <li>No signal? No problem.</li>
                  <li>Meet Larkspur 3.0</li>
                </ol>
              </Message>
              <Message author={AMARA} time="10:41 AM" dateTime="10:41">
                <p className={styles.text}>2 for me. Short, and it says exactly what changed.</p>
                <Reactions
                  items={[
                    { emoji: '👍', count: 3, label: 'thumbs up' },
                    { emoji: '💯', count: 1, label: 'hundred points' },
                  ]}
                />
              </Message>
              <Message author={OMAR} time="11:20 AM" dateTime="11:20">
                <p className={styles.text}>Same from support. Could we link the offline help article instead?</p>
              </Message>
              <Message author={LUCIA} time="11:37 AM" dateTime="11:37">
                <p className={styles.text}>Going with 2 and the help article. Final draft goes out at 3.</p>
              </Message>

              <div className={styles.threadReply}>
                <Composer placeholder="Reply…" alsoSendTo="product-launch" />
              </div>
            </div>
          </aside>
        </div>

        <div className={styles.frameBottom} aria-hidden="true" />
      </div>
    </div>
  );
}
