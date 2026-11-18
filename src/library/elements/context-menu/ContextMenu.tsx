import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './ContextMenu.module.css';

/** Stroke icons on a 24px grid, in the style of the system's menu symbols; color and width come from the stylesheet. */
const ICONS = {
  open: 'M14 4h6v6M20 4l-8.5 8.5M18 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5.5',
  rename: 'M15.5 4.5l4 4L9 19l-4.5 1 1-4.5z',
  duplicate:
    'M9.5 9h9.5a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H9.5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zM5 15H4.5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1H14a1 1 0 0 1 1 1V5',
  share: 'M12 3.5v11M8 7.5l4-4 4 4M7 11H6a1.5 1.5 0 0 0-1.5 1.5v6.5A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-6.5A1.5 1.5 0 0 0 18 11h-1',
  delete: 'M4 7h16M9.5 7V4.5h5V7M6 7l1 13h10l1-13M10 11v5.5M14 11v5.5',
  link: 'M10 13.5a4.5 4.5 0 0 0 6.4.4l2.7-2.7a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10.5a4.5 4.5 0 0 0-6.4-.4l-2.7 2.7a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2',
  email: 'M4 6h16v12H4zM4.5 6.5l7.5 6 7.5-6',
  invite: 'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 20a7 7 0 0 1 10.5-6M18.5 14v6M15.5 17h6',
  chevron: 'M9 6l6 6-6 6',
};

function Icon({ d }: { d: string }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

type Kind = 'folder' | 'pdf' | 'image' | 'doc' | 'video';

/** The file list's icons: a blue folder, or a page with a colored band for its type. */
function FileIcon({ kind }: { kind: Kind }) {
  if (kind === 'folder') {
    return (
      <svg className={styles.fileIcon} viewBox="0 0 20 20">
        <path className={styles.folderBack} d="M2 5a1.5 1.5 0 0 1 1.5-1.5h4l1.6 1.8h7.4A1.5 1.5 0 0 1 18 6.8v8.7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5z" />
        <path className={styles.folderFront} d="M2 8.2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7.3a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5z" />
      </svg>
    );
  }
  return (
    <svg className={styles.fileIcon} viewBox="0 0 20 20" data-kind={kind}>
      <path className={styles.page} d="M5 2.5h6.5L15.5 6.5v11H5z" />
      <path className={styles.fold} d="M11.5 2.5v4h4" />
      <rect className={styles.band} x="5" y="12.5" width="10.5" height="3.5" />
    </svg>
  );
}

type File = { name: string; kind: Kind; date: string; size: string; type: string };

/** The folder's files; the second is the one that gets the right-click. "Today" is Wednesday, November 18. */
const FILES: File[] = [
  { name: 'Assets', kind: 'folder', date: 'Today at 9:12 AM', size: '--', type: 'Folder' },
  { name: 'Launch plan.pdf', kind: 'pdf', date: 'Today at 8:41 AM', size: '2.4 MB', type: 'PDF document' },
  { name: 'Hero banner.png', kind: 'image', date: 'Yesterday at 6:05 PM', size: '4.8 MB', type: 'PNG image' },
  { name: 'Press notes.txt', kind: 'doc', date: 'Nov 16, 2026 at 3:20 PM', size: '14 KB', type: 'Plain text' },
  { name: 'Teaser.mov', kind: 'video', date: 'Nov 14, 2026 at 11:02 AM', size: '86.3 MB', type: 'Movie' },
  { name: 'Budget.csv', kind: 'doc', date: 'Nov 12, 2026 at 5:47 PM', size: '38 KB', type: 'CSV text' },
  { name: 'Press kit', kind: 'folder', date: 'Nov 10, 2026 at 2:15 PM', size: '--', type: 'Folder' },
  { name: 'Social cards.png', kind: 'image', date: 'Nov 9, 2026 at 10:38 AM', size: '1.9 MB', type: 'PNG image' },
  { name: 'Timeline.pdf', kind: 'pdf', date: 'Nov 6, 2026 at 4:54 PM', size: '612 KB', type: 'PDF document' },
];

/** The file the menu acts on. */
const TARGET = 'Launch plan.pdf';

type Item = { label: string; icon: string; keys?: string; submenu?: boolean; destructive?: boolean };

/** The menu, in groups between separators. */
const GROUPS: Item[][] = [
  [
    { label: 'Open', icon: ICONS.open, keys: '⌘O' },
    { label: 'Rename', icon: ICONS.rename, keys: '↩' },
    { label: 'Duplicate', icon: ICONS.duplicate, keys: '⌘D' },
  ],
  [{ label: 'Share', icon: ICONS.share, submenu: true }],
  [{ label: 'Delete', icon: ICONS.delete, keys: '⌘⌫', destructive: true }],
];

const SHARE: Item[] = [
  { label: 'Copy Link', icon: ICONS.link },
  { label: 'Email', icon: ICONS.email },
  { label: 'Invite…', icon: ICONS.invite },
];

/**
 * Where the pointer is: resting on the list, at the spot it right-clicks, on one of the menu's items, or on Copy Link
 * in the Share submenu. On an item, that item is highlighted.
 */
type Spot = 'rest' | 'file' | 'Open' | 'Rename' | 'Duplicate' | 'Share' | 'Copy Link';

/** One beat of the loop: where the pointer is, whether the menu and the submenu are open, a click, how long it lasts. */
type Step = { pointer: Spot; open?: boolean; submenu?: boolean; click?: boolean; ms: number };

/**
 * The pointer comes to Launch plan.pdf and right-clicks it: the file gets a focus ring and the menu scales in from
 * its corner at the pointer. The highlight moves down item by item; resting on Share opens its submenu after a
 * moment, and the pointer moves over to Copy Link. Then the menu closes as if dismissed, and the pointer goes back.
 */
const STEPS: Step[] = [
  { pointer: 'rest', ms: 1000 },
  { pointer: 'file', ms: 600 },
  { pointer: 'file', click: true, ms: 150 },
  { pointer: 'file', open: true, ms: 650 },
  { pointer: 'Open', open: true, ms: 420 },
  { pointer: 'Rename', open: true, ms: 320 },
  { pointer: 'Duplicate', open: true, ms: 320 },
  { pointer: 'Share', open: true, ms: 380 },
  { pointer: 'Share', open: true, submenu: true, ms: 450 },
  { pointer: 'Copy Link', open: true, submenu: true, ms: 2000 },
  { pointer: 'rest', ms: 900 },
];

/** Reduced motion: the menu and its submenu open, the pointer on Copy Link. */
const FINAL = STEPS.findIndex((step) => step.pointer === 'Copy Link');

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

function MenuItem({ item, active }: { item: Item; active: boolean }) {
  return (
    <span
      className={styles.item}
      role="menuitem"
      aria-haspopup={item.submenu || undefined}
      data-active={active || undefined}
      data-destructive={item.destructive || undefined}
      data-inspect={item.destructive ? 'context-menu-destructive' : 'context-menu-item'}
    >
      <Icon d={item.icon} />
      <span className={styles.label}>{item.label}</span>
      {item.keys && (
        <kbd className={styles.keys} data-inspect="context-menu-shortcut">
          {item.keys}
        </kbd>
      )}
      {item.submenu && (
        <svg className={styles.more} viewBox="0 0 24 24">
          <path d={ICONS.chevron} />
        </svg>
      )}
    </span>
  );
}

/**
 * Context menu: a file list in a desktop file manager, Name, Date Modified, Size and Kind. Right-clicking a file opens
 * the menu at the pointer: icons, labels and keyboard shortcuts, separators between the groups, Share with its
 * submenu and a destructive Delete in red. The loop: the right-click, the menu scaling in from its corner, the
 * highlight moving down to Share, its submenu opening and the pointer moving into it, then the menu closing.
 */
export function ContextMenu() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-pointer={step.pointer}
      data-open={step.open || undefined}
      data-submenu={step.submenu || undefined}
      data-click={step.click || undefined}
    >
      <div className={styles.scene}>
        <div className={styles.list} role="table">
          <div className={styles.head} role="row">
            <span className={styles.name}>Name</span>
            <span className={styles.date}>Date Modified</span>
            <span className={styles.size}>Size</span>
            <span className={styles.kind}>Kind</span>
          </div>
          {FILES.map((file) => (
            <div key={file.name} className={styles.row} role="row" data-target={file.name === TARGET || undefined}>
              <span className={styles.name}>
                <FileIcon kind={file.kind} />
                {file.name}
              </span>
              <span className={styles.date}>{file.date}</span>
              <span className={styles.size}>{file.size}</span>
              <span className={styles.kind}>{file.type}</span>
            </div>
          ))}
        </div>

        <div className={styles.menu} role="menu" data-inspect="context-menu">
          {GROUPS.map((group, index) => (
            <div key={group[0].label} role="group">
              {index > 0 && (
                <span className={styles.separator} role="separator" data-inspect="context-menu-separator" />
              )}
              {group.map((item) => (
                <MenuItem
                  key={item.label}
                  item={item}
                  active={step.pointer === item.label || (item.submenu === true && Boolean(step.submenu))}
                />
              ))}
            </div>
          ))}
        </div>

        <div className={styles.submenu} role="menu" aria-label="Share" data-inspect="context-menu-submenu">
          {SHARE.map((item) => (
            <MenuItem key={item.label} item={item} active={step.pointer === item.label} />
          ))}
        </div>

        <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
          <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
        </svg>
      </div>
    </div>
  );
}
