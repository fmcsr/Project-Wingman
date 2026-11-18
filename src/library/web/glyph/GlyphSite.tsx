import type { ReactNode } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './GlyphSite.module.css';

/** Line icons on a 16px grid, after the editor's own outline icons; stroke color and width come from the stylesheet. */
const ICONS = {
  menu: 'M2.5 4.25h11M2.5 8h11M2.5 11.75h11',
  arrowLeft: 'M13 8H3.25M7.25 4L3.25 8l4 4',
  arrowRight: 'M3 8h9.75M8.75 4l4 4-4 4',
  /** The lens up and to the right, its handle reaching down to the left */
  search: 'M9.75 2.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zM7.05 8.95L2.75 13.25',
  chevronRight: 'M6 3.75L10.25 8 6 12.25',
  chevronDown: 'M3.75 6L8 10.25 12.25 6',
  chevronUp: 'M3.75 10L8 5.75 12.25 10',
  close: 'M4 4l8 8M12 4l-8 8',
  plus: 'M8 3v10M3 8h10',
  /** A window split down the middle: open the file again beside itself */
  split: 'M2.5 3.5h11v9h-11zM8 3.5v9',
  trash: 'M3 4.5h10M6.25 4.5V3h3.5v1.5M4.5 4.5l.55 8.6a1 1 0 0 0 1 .9h3.9a1 1 0 0 0 1-.9l.55-8.6',
  /** Two chevrons pointing at each other: where the window is connected */
  remote: 'M2.5 4.25L6.25 8 2.5 11.75M13.5 4.25L9.75 8l3.75 3.75',
  branch:
    'M5 5.5v5M5 2.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM5 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM11 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM11 6c0 2.75-6 2-6 4.5',
  sync: 'M13 7.25A5.1 5.1 0 0 0 3.6 5.1M3 8.75a5.1 5.1 0 0 0 9.4 2.15M3.5 2.6v2.75h2.75M12.5 13.4v-2.75H9.75',
  error: 'M8 2.25a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zM6 6l4 4M10 6l-4 4',
  warning: 'M8 2.25l6.25 11H1.75zM8 6.5v3M8 11.35v.1',
  bell: 'M8 2.25A3.75 3.75 0 0 0 4.25 6v2.75L2.75 11.5h10.5l-1.5-2.75V6A3.75 3.75 0 0 0 8 2.25zM6.5 13.25a1.6 1.6 0 0 0 3 0',
  /** A cube: the outline's symbol for a function */
  symbol: 'M8 2l5.25 2.9v6.2L8 14l-5.25-2.9V4.9zM2.75 4.9L8 7.75l5.25-2.85M8 7.75V14',
  /** A window with three panes: Customize Layout */
  layout: 'M2.5 3.5h11v9h-11zM6.5 3.5v9M6.5 8.75h7',
};

/** The activity bar's icons, on a 24px grid like the editor's own. */
const ACTIVITY_ICONS = {
  /** Two sheets of paper, one behind the other */
  explorer:
    'M9 6.25V4.5a1 1 0 0 1 1-1h5.75L19 6.75v9.75a1 1 0 0 1-1 1h-1.75M15.75 3.5v3.25H19M5 7.5a1 1 0 0 1 1-1h6.25l3.25 3.25v10.75a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zM12.25 6.5v3.25h3.25',
  search: 'M14 4.25a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zM10.1 13.9L4.5 19.5',
  /** Three commits: two on the main line, one on a branch that joins it */
  sourceControl:
    'M7 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 15.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM17 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8.5v7M17 8.5c0 4-10 3-10 7',
  /** Play, with a small bug in front of it */
  debug:
    'M9 10.75V4.75L19.25 12 12.5 16.75M6.75 14a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.5 15.25l1 .5M3.5 18.75l1-.5M10 15.25l-1 .5M10 18.75l-1-.5M5.75 14l-.6-1.1M7.75 14l.6-1.1',
  /** Three blocks, and a fourth coming loose */
  extensions: 'M4.5 9.5h5v5h-5zM4.5 14.5h5v5h-5zM9.5 14.5h5v5h-5zM14.25 4.25h5v5h-5z',
  account: 'M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM6.4 18.4a6.5 6.5 0 0 1 11.2 0',
};

/** A gear with eight teeth and a hole in the middle, on the 24px grid. */
function gearPath() {
  const point = (angle: number, radius: number) =>
    `${(12 + radius * Math.cos(angle)).toFixed(2)} ${(12 + radius * Math.sin(angle)).toFixed(2)}`;
  const teeth = 8;
  const step = (Math.PI * 2) / teeth;
  const outline = Array.from({ length: teeth }, (_, i) => {
    const at = i * step;
    return `${point(at - step * 0.3, 6.6)}L${point(at - step * 0.16, 8.5)}L${point(at + step * 0.16, 8.5)}L${point(at + step * 0.3, 6.6)}`;
  });
  return `M${outline.join('L')}zM14.6 12a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0z`;
}

const GEAR = gearPath();

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** Three dots in a row: "more". */
function Dots() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      {[3.5, 8, 12.5].map((x) => (
        <circle key={x} className={styles.iconDot} cx={x} cy="8" r="1.1" />
      ))}
    </svg>
  );
}

/** The layout buttons: a window outline with the part they show or hide filled in while it's open. */
function LayoutIcon({ part, open }: { part: 'left' | 'bottom' | 'right'; open: boolean }) {
  const fill = { left: 'M2.5 3.5h4v9h-4z', bottom: 'M2.5 9.25h11v3.25h-11z', right: 'M9.5 3.5h4v9h-4z' }[part];
  const edge = { left: 'M6.5 3.5v9', bottom: 'M2.5 9.25h11', right: 'M9.5 3.5v9' }[part];
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      {open && <path className={styles.iconFill} d={fill} />}
      <path d={`M2.5 3.5h11v9h-11z${edge}`} />
    </svg>
  );
}

/** Glyph's own mark: a lowercase g drawn in one stroke on a jade tile. */
function GlyphMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 16 16" aria-hidden="true">
      <rect className={styles.markTile} width="16" height="16" rx="4" />
      <path
        className={styles.markG}
        d="M7.6 4.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2zM10.2 4.25v6.35a2.5 2.5 0 0 1-2.5 2.5H5.9"
      />
    </svg>
  );
}

/** The icon theme's file glyphs: TypeScript in blue, its tests in orange, JSON in yellow, a README as an info sign. */
type FileKind = 'ts' | 'test' | 'json' | 'info' | 'ignore';

function FileIcon({ kind }: { kind: FileKind }) {
  if (kind === 'ts' || kind === 'test') {
    return (
      <span className={`${styles.fileIcon} ${styles[kind]}`} aria-hidden="true">
        TS
      </span>
    );
  }
  if (kind === 'json') {
    return (
      <span className={`${styles.fileIcon} ${styles.json}`} aria-hidden="true">
        {'{}'}
      </span>
    );
  }
  return (
    <svg className={`${styles.fileSvg} ${styles[kind]}`} viewBox="0 0 16 16" aria-hidden="true">
      {kind === 'info' ? (
        <path d="M8 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zM8 7.25v3.75M8 5.1v.1" />
      ) : (
        <path d="M8 2.75L13.25 8 8 13.25 2.75 8z" />
      )}
    </svg>
  );
}

type Tone = 'error' | 'modified' | 'ignored';

const TONE_CLASS: Record<Tone, string> = {
  error: styles.toneError,
  modified: styles.toneModified,
  ignored: styles.toneIgnored,
};

type TreeRow = {
  name: string;
  depth: number;
  folder?: 'open' | 'closed';
  icon?: FileKind;
  /** Problems and git status color the name; the letters or count go in the badge on the right. */
  tone?: Tone;
  badge?: string;
  selected?: boolean;
};

/** Folders first, then files, A to Z, as the explorer sorts them. */
const TREE: TreeRow[] = [
  { name: '.glyph', depth: 0, folder: 'closed' },
  { name: 'node_modules', depth: 0, folder: 'closed', tone: 'ignored' },
  { name: 'src', depth: 0, folder: 'open', tone: 'error', badge: '●' },
  { name: 'index.ts', depth: 1, icon: 'ts' },
  { name: 'invoice.test.ts', depth: 1, icon: 'test' },
  { name: 'invoice.ts', depth: 1, icon: 'ts', tone: 'error', badge: '1, M', selected: true },
  { name: 'money.ts', depth: 1, icon: 'ts' },
  { name: 'types.ts', depth: 1, icon: 'ts', tone: 'modified', badge: 'M' },
  { name: '.gitignore', depth: 0, icon: 'ignore' },
  { name: 'package-lock.json', depth: 0, icon: 'json' },
  { name: 'package.json', depth: 0, icon: 'json' },
  { name: 'README.md', depth: 0, icon: 'info' },
  { name: 'tsconfig.json', depth: 0, icon: 'json' },
  { name: 'vitest.config.ts', depth: 0, icon: 'ts' },
];

/** The open file, src/invoice.ts. Line 19 still reads a field that types.ts just renamed. */
const SOURCE = [
  "import { formatMoney } from './money';",
  "import type { Invoice, LineItem } from './types';",
  '',
  'const TAX_RATE = 0.2;',
  '',
  '/** Sum of the line items before tax, in cents. */',
  'export function subtotal(items: LineItem[]): number {',
  '  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);',
  '}',
  '',
  '/** Takes a percentage off, rounded to the nearest cent. */',
  'export function applyDiscount(amount: number, percent: number): number {',
  '  if (percent <= 0) return amount;',
  '  const capped = Math.min(percent, 100);',
  '  return Math.round(amount * (1 - capped / 100));',
  '}',
  '',
  'export function totals(invoice: Invoice) {',
  '  const percent = invoice.discount;',
  '  const net = applyDiscount(subtotal(invoice.items), percent);',
  '  const tax = Math.round(net * TAX_RATE);',
  '',
  '  return {',
  '    net: formatMoney(net, invoice.currency),',
  '    tax: formatMoney(tax, invoice.currency),',
  '    total: formatMoney(net + tax, invoice.currency),',
  '  };',
  '}',
  '',
  'export function isOverdue(invoice: Invoice, today = new Date()): boolean {',
  "  return invoice.status === 'open' && invoice.dueDate < today;",
  '}',
  '',
  'export function daysOverdue(invoice: Invoice, today = new Date()): number {',
  '  if (!isOverdue(invoice, today)) return 0;',
  '  const late = today.getTime() - invoice.dueDate.getTime();',
  '  return Math.floor(late / 86_400_000);',
  '}',
  '',
  'export function label(invoice: Invoice): string {',
  '  const { total } = totals(invoice);',
  "  return invoice.number + ' · ' + total;",
  '}',
];

/** Where the cursor is (1-based, like the status bar), and the word the compiler flags on that line. */
const CURSOR = { line: 19, column: 35 };
const PROBLEM = { line: 19, column: 27, length: 8 };

type ChangeKind = 'added' | 'modified' | 'deleted';

const CHANGE_CLASS: Record<ChangeKind, string> = {
  added: styles.changeAdded,
  modified: styles.changeModified,
  deleted: styles.changeDeleted,
};

/** The lines changed since the last commit: an import removed above line 3, a new function, a rewritten line. */
const CHANGES: { kind: ChangeKind; from: number; to: number }[] = [
  { kind: 'deleted', from: 3, to: 3 },
  { kind: 'added', from: 11, to: 16 },
  { kind: 'modified', from: 19, to: 20 },
];

/** Lines on screen; the rest of the file shows only in the minimap. */
const VISIBLE_LINES = 22.5;

/** The syntax colors, after the editor's default dark and light themes. */
type TokenKind =
  | 'plain'
  | 'comment'
  | 'string'
  | 'number'
  | 'control'
  | 'storage'
  | 'type'
  | 'constant'
  | 'function'
  | 'variable'
  | 'bracket0'
  | 'bracket1'
  | 'bracket2';

type Token = { text: string; kind: TokenKind; column: number };

const CONTROL = new Set(['import', 'from', 'export', 'return', 'if']);
const STORAGE = new Set(['const', 'function', 'type', 'new']);
const TYPES = new Set(['Invoice', 'LineItem', 'number', 'boolean', 'string', 'Math', 'Date']);
const FUNCTIONS = new Set(['formatMoney']);
const PATTERN = /\/\*.*?\*\/|\/\/.*|'[^']*'|\d[\d_]*(?:\.\d+)?|[A-Za-z_$][\w$]*|=>|[{}()[\]]|\s+|./g;

/** Splits the file into colored tokens. Bracket pairs get one of three colors by how deep they're nested. */
function tokenize(source: string[]) {
  let depth = 0;
  return source.map((line) =>
    [...line.matchAll(PATTERN)].map((match): Token => {
      const text = match[0];
      const column = match.index ?? 0;
      let kind: TokenKind = 'plain';
      if (text.startsWith('/*') || text.startsWith('//')) kind = 'comment';
      else if (text.startsWith("'")) kind = 'string';
      else if (/^\d/.test(text)) kind = 'number';
      else if (/^[A-Za-z_$]/.test(text)) {
        if (CONTROL.has(text)) kind = 'control';
        else if (STORAGE.has(text)) kind = 'storage';
        else if (TYPES.has(text)) kind = 'type';
        else if (/^[A-Z][A-Z0-9_]+$/.test(text)) kind = 'constant';
        else if (FUNCTIONS.has(text) || line.startsWith('(', column + text.length)) kind = 'function';
        else kind = 'variable';
      } else if (text === '=>') kind = 'storage';
      else if ('{(['.includes(text)) kind = `bracket${depth++ % 3}` as TokenKind;
      else if ('})]'.includes(text)) kind = `bracket${--depth % 3}` as TokenKind;
      return { text, kind, column };
    }),
  );
}

const TOKENS = tokenize(SOURCE);

/** How many two-space steps a line is indented; a blank line takes the smaller indent of its neighbors. */
function indentLevels(source: string[]) {
  const own = source.map((line) => (line.trim() ? (line.length - line.trimStart().length) / 2 : -1));
  return own.map((level, index) => {
    if (level >= 0) return level;
    const before = own.slice(0, index).reverse().find((l) => l >= 0) ?? 0;
    const after = own.slice(index + 1).find((l) => l >= 0) ?? 0;
    return Math.min(before, after);
  });
}

const INDENTS = indentLevels(SOURCE);
/** The block the cursor is in (the body of totals) has its guide drawn brighter. */
const ACTIVE_GUIDE = { level: 0, from: 19, to: 27 };

function CodeLine({ index, children }: { index: number; children?: ReactNode }) {
  const number = index + 1;
  const current = number === CURSOR.line;
  return (
    <div className={current ? `${styles.line} ${styles.currentLine}` : styles.line}>
      {Array.from({ length: INDENTS[index] }, (_, level) => {
        const active = level === ACTIVE_GUIDE.level && number >= ACTIVE_GUIDE.from && number <= ACTIVE_GUIDE.to;
        return (
          <span
            key={level}
            className={active ? `${styles.guide} ${styles.guideActive}` : styles.guide}
            style={{ left: `${level * 2}ch` }}
          />
        );
      })}
      {TOKENS[index].map((token) => {
        const flagged = number === PROBLEM.line && token.column === PROBLEM.column - 1;
        return (
          <span
            key={token.column}
            className={flagged ? `${styles[token.kind]} ${styles.squiggle}` : styles[token.kind]}
            data-inspect={flagged ? 'squiggle' : undefined}
            aria-invalid={flagged || undefined}
          >
            {token.text}
          </span>
        );
      })}
      {children}
    </div>
  );
}

/** The file in miniature: one 1px column per character, 3px per line, in the token colors. */
function Minimap() {
  const pitch = 3;
  return (
    <svg
      className={styles.minimapCanvas}
      viewBox={`0 0 84 ${SOURCE.length * pitch}`}
      width="84"
      height={SOURCE.length * pitch}
      aria-hidden="true"
    >
      <rect
        className={styles.minimapError}
        x={PROBLEM.column - 1}
        y={(PROBLEM.line - 1) * pitch - 0.5}
        width={PROBLEM.length}
        height={pitch}
      />
      {TOKENS.flatMap((tokens, line) =>
        tokens
          .filter((token) => token.text.trim())
          .map((token) => (
            <rect
              key={`${line}-${token.column}`}
              className={styles[token.kind]}
              x={token.column}
              y={line * pitch}
              width={token.text.length}
              height={2}
            />
          )),
      )}
      {CHANGES.map((change) => (
        <rect
          key={change.from}
          className={CHANGE_CLASS[change.kind]}
          x="0"
          y={(change.from - 1) * pitch - (change.kind === 'deleted' ? 1 : 0)}
          width="2"
          height={change.kind === 'deleted' ? 2 : (change.to - change.from + 1) * pitch}
        />
      ))}
      <rect className={styles.minimapSlider} x="0" y="0" width="84" height={VISIBLE_LINES * pitch} />
    </svg>
  );
}

/** The scrollbar's track doubles as the overview ruler: changes on the left, problems on the right, the cursor across. */
function OverviewRuler() {
  /** The editor can scroll one screen past the last line, so the ruler maps that much more than the file. */
  const span = SOURCE.length + VISIBLE_LINES - 1;
  const at = (line: number) => `${((line - 1) / span) * 100}%`;
  return (
    <div className={styles.ruler} aria-hidden="true">
      <span className={styles.rulerThumb} style={{ height: `${(VISIBLE_LINES / span) * 100}%` }} />
      {CHANGES.map((change) => (
        <span
          key={change.from}
          className={`${styles.rulerChange} ${CHANGE_CLASS[change.kind]}`}
          style={{ top: at(change.from), height: `max(3px, ${((change.to - change.from + 1) / span) * 100}%)` }}
        />
      ))}
      <span className={styles.rulerCursor} style={{ top: at(CURSOR.line) }} />
      <span className={styles.rulerError} style={{ top: at(PROBLEM.line) }} />
    </div>
  );
}

const ANSI_CLASS = {
  green: styles.ansiGreen,
  cyan: styles.ansiCyan,
  blue: styles.ansiBlue,
  red: styles.ansiRed,
  yellow: styles.ansiYellow,
  gray: styles.ansiGray,
};

/** One run of terminal text in an ANSI color. */
function Ansi({ color, children }: { color: keyof typeof ANSI_CLASS; children: ReactNode }) {
  return <span className={ANSI_CLASS[color]}>{children}</span>;
}

/** The shell's prompt: an arrow, the folder, the branch, and a cross when there are uncommitted changes. */
function Prompt() {
  return (
    <>
      <Ansi color="green">➜</Ansi>
      {'  '}
      <Ansi color="cyan">billing-service</Ansi> <Ansi color="blue">git:(</Ansi>
      <Ansi color="red">feature/discount-codes</Ansi>
      <Ansi color="blue">)</Ansi> <Ansi color="yellow">✗</Ansi>{' '}
    </>
  );
}

const MENUS = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];

const ACTIVITY: { label: string; icon: string; current?: boolean; badge?: string }[] = [
  { label: 'Explorer (⇧⌘E)', icon: ACTIVITY_ICONS.explorer, current: true },
  { label: 'Search (⇧⌘F)', icon: ACTIVITY_ICONS.search },
  { label: 'Source Control (⌃⇧G), 2 pending changes', icon: ACTIVITY_ICONS.sourceControl, badge: '2' },
  { label: 'Run and Debug (⇧⌘D)', icon: ACTIVITY_ICONS.debug },
  { label: 'Extensions (⇧⌘X)', icon: ACTIVITY_ICONS.extensions },
];

type Tab = { name: string; icon: FileKind; tone?: Tone; badge?: string; dirty?: boolean; active?: boolean };

const TABS: Tab[] = [
  { name: 'invoice.ts', icon: 'ts', tone: 'error', badge: '1, M', dirty: true, active: true },
  { name: 'types.ts', icon: 'ts', tone: 'modified', badge: 'M' },
  { name: 'invoice.test.ts', icon: 'test' },
];

const PANEL_TABS = [
  { label: 'Problems', count: '1' },
  { label: 'Output', optional: true },
  { label: 'Debug Console', optional: true },
  { label: 'Terminal', active: true },
  { label: 'Ports', optional: true },
];

/**
 * Library example: a code editor, closely following Visual Studio Code's main window in its default dark theme (and
 * its light one in light mode). A TypeScript file is open with an unsaved change, a problem the compiler found, and
 * the terminal showing the same error. Glyph's jade, its mark, the project and every line of code are our own. The
 * cursor blinks, and holds still while inspected. Not interactive; for inspection only.
 */
export function GlyphSite() {
  const caret = useDemoMotion<HTMLSpanElement>(0.5);

  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <header className={styles.titleBar} data-inspect="title-bar">
          <div className={styles.titleStart}>
            <span className={styles.appMark} role="img" aria-label="Glyph">
              <GlyphMark />
            </span>
            <span className={styles.menuBar} role="menubar" aria-label="Application menu">
              {MENUS.map((menu, index) => (
                <span
                  key={menu}
                  className={index > 4 ? `${styles.menu} ${styles.menuLate}` : styles.menu}
                  role="menuitem"
                  aria-haspopup="menu"
                >
                  {menu}
                </span>
              ))}
              <span className={`${styles.menu} ${styles.menuOverflow}`} role="menuitem" aria-label="More menus">
                <Dots />
              </span>
            </span>
            <span className={styles.hamburger} role="button" aria-label="Application menu" aria-haspopup="menu">
              <Icon d={ICONS.menu} />
            </span>
          </div>
          <div className={styles.titleCenter}>
            <span className={styles.navArrows}>
              <span className={styles.titleButton} role="button" aria-label="Go Back (⌃-)">
                <Icon d={ICONS.arrowLeft} />
              </span>
              <span
                className={`${styles.titleButton} ${styles.titleButtonOff}`}
                role="button"
                aria-label="Go Forward (⌃⇧-)"
                aria-disabled="true"
              >
                <Icon d={ICONS.arrowRight} />
              </span>
            </span>
            <span className={styles.commandCenter} role="search" aria-keyshortcuts="Meta+P" data-inspect="command-center">
              <Icon d={ICONS.search} />
              <span className={styles.commandLabel}>billing-service</span>
            </span>
          </div>
          <div className={styles.titleEnd}>
            <span className={styles.titleButton} role="button" aria-label="Toggle Primary Side Bar (⌘B)" aria-pressed="true">
              <LayoutIcon part="left" open />
            </span>
            <span className={styles.titleButton} role="button" aria-label="Toggle Panel (⌘J)" aria-pressed="true">
              <LayoutIcon part="bottom" open />
            </span>
            <span
              className={`${styles.titleButton} ${styles.layoutExtra}`}
              role="button"
              aria-label="Toggle Secondary Side Bar (⌥⌘B)"
              aria-pressed="false"
            >
              <LayoutIcon part="right" open={false} />
            </span>
            <span className={`${styles.titleButton} ${styles.layoutExtra}`} role="button" aria-label="Customize Layout…">
              <Icon d={ICONS.layout} />
            </span>
          </div>
        </header>

        <nav className={styles.activityBar} aria-label="Views" data-inspect="activity-bar">
          <div>
            {ACTIVITY.map((item) => (
              <a key={item.label} className={styles.activityItem} aria-label={item.label} aria-current={item.current ? 'page' : undefined}>
                <svg className={styles.activityIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <path d={item.icon} />
                </svg>
                {item.badge && <span className={styles.activityBadge}>{item.badge}</span>}
              </a>
            ))}
          </div>
          <div className={styles.activityBottom}>
            <span className={styles.activityItem} role="button" aria-label="Accounts" aria-haspopup="menu">
              <svg className={styles.activityIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d={ACTIVITY_ICONS.account} />
              </svg>
            </span>
            <span className={styles.activityItem} role="button" aria-label="Manage, 1 update available" aria-haspopup="menu">
              <svg className={styles.activityIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d={GEAR} />
              </svg>
              <span className={styles.activityBadge}>1</span>
            </span>
          </div>
        </nav>

        <aside className={styles.sideBar} aria-label="Explorer" data-inspect="explorer">
          <div className={styles.sideTitle}>
            <h2 className={styles.sideHeading}>Explorer</h2>
            <span className={styles.sideAction} role="button" aria-label="Views and More Actions…" aria-haspopup="menu">
              <Dots />
            </span>
          </div>
          <span className={styles.sectionHeader} role="button" aria-expanded="true">
            <Icon d={ICONS.chevronDown} className={styles.twistie} />
            billing-service
          </span>
          <ul className={styles.tree} role="tree" aria-label="Files">
            {TREE.map((row) => {
              const classes = [styles.treeRow];
              if (row.tone) classes.push(TONE_CLASS[row.tone]);
              if (row.selected) classes.push(styles.treeSelected);
              return (
                <li
                  key={row.name}
                  className={classes.join(' ')}
                  role="treeitem"
                  aria-level={row.depth + 1}
                  aria-expanded={row.folder ? row.folder === 'open' : undefined}
                  aria-selected={row.selected ?? false}
                  style={{ paddingLeft: `${8 + row.depth * 8}px` }}
                >
                  <span className={styles.twistieSlot}>
                    {row.folder && (
                      <Icon d={row.folder === 'open' ? ICONS.chevronDown : ICONS.chevronRight} className={styles.twistie} />
                    )}
                  </span>
                  {row.icon && <FileIcon kind={row.icon} />}
                  <span className={styles.treeLabel}>{row.name}</span>
                  {row.badge && (
                    <span className={styles.decoration} data-inspect="git-decoration">
                      {row.badge}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className={styles.sideFooter}>
            {['Outline', 'Timeline'].map((section) => (
              <span key={section} className={styles.sectionHeader} role="button" aria-expanded="false">
                <Icon d={ICONS.chevronRight} className={styles.twistie} />
                {section}
              </span>
            ))}
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.tabBar}>
            <div className={styles.tabs} role="tablist" aria-label="Open editors">
              {TABS.map((tab) => {
                const classes = [styles.tab];
                if (tab.tone) classes.push(TONE_CLASS[tab.tone]);
                return (
                  <span
                    key={tab.name}
                    className={classes.join(' ')}
                    role="tab"
                    aria-selected={tab.active ?? false}
                    data-inspect="editor-tab"
                  >
                    <FileIcon kind={tab.icon} />
                    {tab.name}
                    {tab.badge && <span className={styles.tabDecoration}>{tab.badge}</span>}
                    <span
                      className={styles.tabClose}
                      role="button"
                      aria-label={tab.dirty ? `Close ${tab.name}, unsaved changes` : `Close ${tab.name}`}
                    >
                      {tab.dirty ? <span className={styles.dirtyDot} /> : tab.active && <Icon d={ICONS.close} />}
                    </span>
                  </span>
                );
              })}
            </div>
            <span className={styles.editorActions}>
              <span className={styles.titleButton} role="button" aria-label="Split Editor Right (⌘\)">
                <Icon d={ICONS.split} />
              </span>
              <span className={styles.titleButton} role="button" aria-label="More Actions…" aria-haspopup="menu">
                <Dots />
              </span>
            </span>
          </div>

          <nav className={styles.breadcrumbs} aria-label="Breadcrumbs" data-inspect="breadcrumbs">
            <span className={styles.crumb}>src</span>
            <Icon d={ICONS.chevronRight} className={styles.crumbSeparator} />
            <span className={styles.crumb}>
              <FileIcon kind="ts" />
              invoice.ts
            </span>
            <Icon d={ICONS.chevronRight} className={styles.crumbSeparator} />
            <span className={styles.crumb} aria-current="location">
              <Icon d={ICONS.symbol} className={styles.symbolIcon} />
              totals
            </span>
          </nav>

          <div className={styles.editor}>
            <div className={styles.glyphMargin}>
              <span
                className={styles.lightbulb}
                style={{ top: `calc(${CURSOR.line - 1} * var(--line-h))` }}
                role="button"
                aria-label="Show Code Actions (⌘.)"
                data-inspect="lightbulb"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    className={styles.bulb}
                    d="M8 1.75a4.25 4.25 0 0 0-2.55 7.65c.5.38.8.9.8 1.5v.35h3.5v-.35c0-.6.3-1.12.8-1.5A4.25 4.25 0 0 0 8 1.75z"
                  />
                  <path className={styles.bulbBase} d="M6.25 12.75h3.5M6.75 14.25h2.5" />
                </svg>
              </span>
            </div>
            <div className={styles.lineNumbers} aria-hidden="true" data-inspect="line-numbers">
              {SOURCE.map((_, index) => (
                <span key={index} className={index + 1 === CURSOR.line ? styles.lineNumberActive : undefined}>
                  {index + 1}
                </span>
              ))}
            </div>
            <div className={styles.decorations}>
              {CHANGES.map((change) => (
                <span
                  key={change.from}
                  className={`${styles.changeBar} ${CHANGE_CLASS[change.kind]}`}
                  style={{
                    top: `calc(${change.from - 1} * var(--line-h))`,
                    height: change.kind === 'deleted' ? undefined : `calc(${change.to - change.from + 1} * var(--line-h))`,
                  }}
                  role="img"
                  aria-label={
                    change.kind === 'deleted'
                      ? `Line deleted above line ${change.from}`
                      : `Lines ${change.from} to ${change.to} ${change.kind}`
                  }
                  data-inspect="change-bar"
                />
              ))}
            </div>
            <div className={styles.code} role="textbox" aria-multiline="true" aria-label="src/invoice.ts" data-inspect="editor">
              {SOURCE.map((_, index) => (
                <CodeLine key={index} index={index}>
                  {index + 1 === CURSOR.line && (
                    <span
                      ref={caret.ref}
                      className={styles.caret}
                      style={{ left: `${CURSOR.column - 1}ch` }}
                      data-paused={!caret.playing || undefined}
                    />
                  )}
                </CodeLine>
              ))}
              <div className={styles.hoverAnchor} style={{ top: `calc(${PROBLEM.line - 1} * var(--line-h))`, left: `${PROBLEM.column - 1}ch` }}>
                <div className={styles.hoverCard} role="tooltip" data-inspect="hover-card">
                  <p className={styles.hoverMessage}>
                    Property 'discount' does not exist on type 'Invoice'. Did you mean 'discountPercent'?{' '}
                    <span className={styles.hoverSource}>ts(2551)</span>
                  </p>
                  <p className={styles.hoverRelated}>
                    <a className={styles.hoverLink}>types.ts(14, 3)</a>: 'discountPercent' is declared here.
                  </p>
                  <div className={styles.hoverActions}>
                    <a className={styles.hoverLink}>View Problem (⌥F8)</a>
                    <a className={styles.hoverLink}>Quick Fix… (⌘.)</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.minimap} aria-hidden="true" data-inspect="minimap">
              <Minimap />
              <OverviewRuler />
            </div>
          </div>

          <section className={styles.panel} aria-label="Terminal" data-inspect="panel">
            <div className={styles.panelHeader}>
              <div className={styles.panelTabs} role="tablist" aria-label="Panel">
                {PANEL_TABS.map((tab) => (
                  <span
                    key={tab.label}
                    className={tab.optional ? `${styles.panelTab} ${styles.panelTabOptional}` : styles.panelTab}
                    role="tab"
                    aria-selected={tab.active ?? false}
                  >
                    {tab.label}
                    {tab.count && <span className={styles.panelCount}>{tab.count}</span>}
                  </span>
                ))}
                <span className={`${styles.panelTab} ${styles.panelOverflow}`} role="button" aria-label="More views">
                  <Dots />
                </span>
              </div>
              <div className={styles.panelActions}>
                <span className={styles.newTerminal}>
                  <span className={styles.titleButton} role="button" aria-label="New Terminal (⌃⇧`)">
                    <Icon d={ICONS.plus} />
                  </span>
                  <span className={`${styles.titleButton} ${styles.profileButton}`} role="button" aria-label="Launch Profile…" aria-haspopup="menu">
                    <Icon d={ICONS.chevronDown} />
                  </span>
                </span>
                <span className={`${styles.titleButton} ${styles.panelExtra}`} role="button" aria-label="Split Terminal (⌘\)">
                  <Icon d={ICONS.split} />
                </span>
                <span className={`${styles.titleButton} ${styles.panelExtra}`} role="button" aria-label="Kill Terminal">
                  <Icon d={ICONS.trash} />
                </span>
                <span className={styles.titleButton} role="button" aria-label="Views and More Actions…" aria-haspopup="menu">
                  <Dots />
                </span>
                <span className={styles.panelDivider} />
                <span className={styles.titleButton} role="button" aria-label="Maximize Panel Size">
                  <Icon d={ICONS.chevronUp} />
                </span>
                <span className={styles.titleButton} role="button" aria-label="Hide Panel (⌘J)">
                  <Icon d={ICONS.close} />
                </span>
              </div>
            </div>
            <div className={styles.terminal} role="log" aria-label="Terminal 1, zsh" data-inspect="terminal">
              <pre className={styles.terminalText}>
                <Prompt />
                npx tsc --noEmit
                {'\n'}
                <Ansi color="cyan">src/invoice.ts</Ansi>:<Ansi color="yellow">19</Ansi>:<Ansi color="yellow">27</Ansi> -{' '}
                <Ansi color="red">error</Ansi>
                <Ansi color="gray"> TS2551: </Ansi>
                Property 'discount' does not exist on type 'Invoice'. Did you mean 'discountPercent'?{'\n\n'}
                <span className={styles.ansiInverse}>19</span>
                {'   const percent = invoice.discount;\n'}
                <span className={styles.ansiInverse}>{'  '}</span>{' '}
                <Ansi color="red">{' '.repeat(PROBLEM.column - 1) + '~'.repeat(PROBLEM.length)}</Ansi>
                {'\n\n  '}
                <Ansi color="cyan">src/types.ts</Ansi>:<Ansi color="yellow">14</Ansi>:<Ansi color="yellow">3</Ansi>
                {'\n    '}
                <span className={styles.ansiInverse}>14</span>
                {'   discountPercent: number;\n    '}
                <span className={styles.ansiInverse}>{'  '}</span>{' '}
                <Ansi color="cyan">{'  ' + '~'.repeat(15)}</Ansi>
                {"\n    'discountPercent' is declared here.\n\n\nFound 1 error in src/invoice.ts"}
                <Ansi color="gray">:19</Ansi>
                {'\n\n'}
                <Prompt />
                <span className={styles.terminalCursor} />
              </pre>
            </div>
          </section>
        </main>

        <footer className={styles.statusBar} data-inspect="status-bar">
          <div className={styles.statusStart}>
            <span className={styles.remote} role="button" aria-label="Open a Remote Window">
              <Icon d={ICONS.remote} />
            </span>
            <span className={styles.statusItem} role="button" aria-label="Branch feature/discount-codes, uncommitted changes" data-inspect="branch-indicator">
              <Icon d={ICONS.branch} />
              <span className={styles.branchName}>feature/discount-codes*</span>
              <span className={styles.sync}>
                <Icon d={ICONS.sync} />
                0↓ 1↑
              </span>
            </span>
            <span className={styles.statusItem} role="button" aria-label="1 error, 0 warnings" data-inspect="problems-count">
              <Icon d={ICONS.error} />1
              <Icon d={ICONS.warning} className={styles.warningIcon} />0
            </span>
          </div>
          <div className={styles.statusEnd}>
            <span className={styles.statusItem} role="button" aria-label="Go to Line/Column" data-inspect="cursor-position">
              Ln {CURSOR.line}, Col {CURSOR.column}
            </span>
            <span className={`${styles.statusItem} ${styles.statusExtra}`} role="button" aria-label="Select Indentation">
              Spaces: 2
            </span>
            <span className={`${styles.statusItem} ${styles.statusExtra}`} role="button" aria-label="Select Encoding">
              UTF-8
            </span>
            <span className={`${styles.statusItem} ${styles.statusExtra}`} role="button" aria-label="Select End of Line Sequence">
              LF
            </span>
            <span className={`${styles.statusItem} ${styles.statusExtra}`} data-inspect="language-mode">
              <span className={styles.languageStatus} role="button" aria-label="TypeScript language status">
                {'{ }'}
              </span>
              <span role="button" aria-label="Select Language Mode">
                TypeScript
              </span>
            </span>
            <span className={`${styles.statusItem} ${styles.statusExtra}`} role="button" aria-label="No Notifications">
              <Icon d={ICONS.bell} />
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
