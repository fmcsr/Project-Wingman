import type { CSSProperties } from 'react';
import styles from './FormaSite.module.css';
import candle from './photos/candle.webp';
import maya from './photos/maya.webp';
import noor from './photos/noor.webp';
import perfume from './photos/perfume.webp';
import serum from './photos/serum.webp';
import theo from './photos/theo.webp';

/** Line icons on a 24 × 24 grid with a 1px stroke; color and width come from the stylesheet. */
const ICON = {
  // Toolbar
  move: 'M7.5 5.5l3.6 12.3 2-5 5-2z',
  frame: 'M9.5 5.5v13M14.5 5.5v13M5.5 9.5h13M5.5 14.5h13',
  shape: 'M6.5 6.5h11v11h-11z',
  pen: 'M12 18.5l-4.5-6.25L9.5 7h5l2 5.25zM12 18.5v-5M12 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM9.5 4.5h5',
  text: 'M6.5 7.5v-2h11v2M12 5.5v13M10 18.5h4',
  comment: 'M12 18.5a6.5 6.5 0 1 0-5.66-3.3L5.5 18.5l3.36-.8A6.47 6.47 0 0 0 12 18.5z',
  actions: 'M6.5 6.5h4v4h-4zM13.5 6.5h4v4h-4zM6.5 13.5h4v4h-4zM15.5 13v5M13 15.5h5',
  draw: 'M15 6l3 3-8.5 8.5h-3v-3zM13 8l3 3',
  design: 'M8.5 8.5h7v7h-7zM5.75 5.75h2v2h-2zM16.25 5.75h2v2h-2zM5.75 16.25h2v2h-2zM16.25 16.25h2v2h-2z',
  code: 'M9.5 8.5L6 12l3.5 3.5M14.5 8.5L18 12l-3.5 3.5',
  chevron: 'M9 10.5l3 3 3-3',
  groupChevron: 'M8 10l4 4 4-4',
  // Left panel
  sidebar: 'M5.5 6.5h13v11h-13zM10.5 6.5v11',
  search: 'M11 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM14.75 14.75l3.75 3.75',
  plus: 'M12 6.5v11M6.5 12h11',
  minus: 'M6.5 12h11',
  collapse: 'M8.5 6.5l3.5 3 3.5-3M8.5 17.5l3.5-3 3.5 3',
  caret: 'M10 8.5l3.5 3.5-3.5 3.5',
  stackV: 'M6.5 6.5h11v4h-11zM6.5 13.5h11v4h-11z',
  stackH: 'M6.5 6.5h4v11h-4zM13.5 6.5h4v11h-4z',
  instance: 'M12 6l6 6-6 6-6-6z',
  layerText: 'M7.5 8V6.5h9V8M12 6.5v11M10.5 17.5h3',
  eye: 'M4.5 12s2.75-4.5 7.5-4.5 7.5 4.5 7.5 4.5-2.75 4.5-7.5 4.5S4.5 12 4.5 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  eyeOff:
    'M5.5 5.5l13 13M10.1 7.75A7.6 7.6 0 0 1 12 7.5c4.75 0 7.5 4.5 7.5 4.5a12.6 12.6 0 0 1-2 2.5M8.1 8.6C5.9 9.9 4.5 12 4.5 12s2.75 4.5 7.5 4.5a7.3 7.3 0 0 0 3.2-.75',
  lock: 'M9 11.5v-2a3 3 0 0 1 6 0v2M7.5 11.5h9v6h-9z',
  unlock: 'M9 11.5v-2a3 3 0 0 1 5.8-1.1M7.5 11.5h9v6h-9z',
  // Design panel
  play: 'M8.5 6.75v10.5l8.25-5.25z',
  goToMain: 'M13.5 6.5h4v4M17.5 6.5l-5.5 5.5M16.5 13.5v4h-10v-10h4',
  alignLeft: 'M6.5 6v12M9.5 9.5h8M9.5 14.5h5',
  alignCenter: 'M12 6v12M8 9.5h8M9.5 14.5h5',
  alignRight: 'M17.5 6v12M6.5 9.5h8M9.5 14.5h5',
  alignTop: 'M6 6.5h12M9.5 9.5v8M14.5 9.5v5',
  alignMiddle: 'M6 12h12M9.5 8v8M14.5 9.5v5',
  alignBottom: 'M6 17.5h12M9.5 6.5v8M14.5 9.5v5',
  constraints: 'M9.5 9.5h5v5h-5zM12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2',
  flowDown: 'M12 6v12M8.5 14.5L12 18l3.5-3.5',
  flowRight: 'M6 12h12M14.5 8.5L18 12l-3.5 3.5',
  flowWrap: 'M6 8.5h9.5a3 3 0 0 1 0 6H8.5M10.5 12.5l-2 2 2 2',
  flowGrid: 'M6.5 6.5h4v4h-4zM13.5 6.5h4v4h-4zM6.5 13.5h4v4h-4zM13.5 13.5h4v4h-4z',
  layoutGuide: 'M6.5 6.5h11v11h-11zM10.17 6.5v11M13.83 6.5v11',
  sliders: 'M6 8.5h12M6 15.5h12M9.5 6.5v4M14.5 13.5v4',
  gap: 'M6.5 6v12M17.5 6v12M10 12h4',
  padX: 'M5.5 6v12M18.5 6v12M9.5 9.5h5v5h-5z',
  padY: 'M6 5.5h12M6 18.5h12M9.5 9.5h5v5h-5z',
  blend: 'M12 5.5l4 5a5 5 0 1 1-8 0z',
  opacity: 'M6.5 6.5h11v11h-11zM6.5 12h5.5V6.5M12 12h5.5v5.5',
  radius: 'M6.5 17.5v-6a5 5 0 0 1 5-5h6',
  corners: 'M6.5 9.5v-3h3M14.5 6.5h3v3M17.5 14.5v3h-3M9.5 17.5h-3v-3',
  shadow: 'M6.5 6.5h9v9h-9zM17.5 9v8.5H9',
  // The design on the canvas
  back: 'M14.5 6l-6 6 6 6',
  card: 'M4.5 6.5h15v11h-15zM4.5 10h15',
  help: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.9 9.6a2.2 2.2 0 0 1 4.2.9c0 1.5-2.1 1.9-2.1 3.1M12 16.4h.01',
  alert: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 8v4.5M12 15.8h.01',
  lockSmall: 'M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M7 10.5h10v8.5H7z',
};

/** Other people's pointers are filled, unlike the line icons (on an 18 × 18 grid). */
const ARROW = 'M3 2.5v14.2l4.2-4 6.6-.3z';

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** Filled dots: three in a row (more options) or four in a square (styles). */
function Dots({ square = false }: { square?: boolean }) {
  const dots = square
    ? [
        [9, 9],
        [15, 9],
        [9, 15],
        [15, 15],
      ]
    : [
        [6.5, 12],
        [12, 12],
        [17.5, 12],
      ];
  return (
    <svg className={`${styles.icon} ${styles.filled}`} viewBox="0 0 24 24" aria-hidden="true">
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.25" />
      ))}
    </svg>
  );
}

/** Forma's mark: a circle and a square, the two shapes every design starts from. */
function FormaMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
      <rect className={styles.markTile} x="1" y="1" width="22" height="22" rx="6" />
      <circle className={styles.markShape} cx="9.25" cy="9.25" r="3.5" />
      <rect className={styles.markShape} x="11.75" y="11.75" width="7" height="7" rx="1.5" />
    </svg>
  );
}

/**
 * People in the file. Everyone but you has a cursor; its color also rings their photo. Theo's amber is too light for
 * white text, so his name is set in near-black.
 */
type Person = { name: string; first: string; photo: string; color?: string; ink?: string };

const NOOR: Person = { name: 'Noor Haddad', first: 'Noor', photo: noor, color: '#2f6fe4', ink: '#ffffff' };
const THEO: Person = { name: 'Theo Brandt', first: 'Theo', photo: theo, color: '#f0a417', ink: '#2b1d00' };
/** You: Maya, the product manager, who left the comment on the order summary. */
const MAYA: Person = { name: 'Maya Lindgren', first: 'Maya', photo: maya };

const PEOPLE = [NOOR, THEO, MAYA];

/** Every tool but Text, Comment and Actions is a group: its arrow opens related tools (Shape: ellipse, line…). */
const TOOLS = [
  { name: 'Move', icon: ICON.move, key: 'V', group: true },
  { name: 'Frame', icon: ICON.frame, key: 'F', group: true },
  { name: 'Shape', icon: ICON.shape, key: 'R', group: true },
  { name: 'Pen', icon: ICON.pen, key: 'P', group: true },
  { name: 'Text', icon: ICON.text, key: 'T' },
  { name: 'Comment', icon: ICON.comment, key: 'C' },
  { name: 'Actions', icon: ICON.actions, key: 'Meta+K', extra: true },
];

const MODES = [
  { name: 'Draw', icon: ICON.draw },
  { name: 'Design', icon: ICON.design },
  { name: 'Dev handoff', icon: ICON.code },
];

const PAGES = ['Checkout', 'Components', 'Archive'];

type LayerKind = 'frame' | 'stackV' | 'stackH' | 'instance' | 'text';

const KIND_ICON: Record<LayerKind, string> = {
  frame: ICON.frame,
  stackV: ICON.stackV,
  stackH: ICON.stackH,
  instance: ICON.instance,
  text: ICON.layerText,
};

type Layer = {
  name: string;
  kind: LayerKind;
  depth: number;
  /** Layers with children are open or closed; leaves leave it out. */
  open?: boolean;
  /** Selected on the canvas, or under the pointer (which reveals its arrow, lock and eye). */
  state?: 'selected' | 'hovered';
  hidden?: boolean;
  locked?: boolean;
};

/** The page's layers, top of the screen first. The Pay button is selected; Card number is under the pointer. */
const LAYERS: Layer[] = [
  { name: 'Payment', kind: 'frame', depth: 0, open: true },
  { name: 'Status bar', kind: 'instance', depth: 1, open: false, locked: true },
  { name: 'Nav bar', kind: 'instance', depth: 1, open: false },
  { name: 'Order summary', kind: 'stackV', depth: 1, open: false },
  { name: 'Promo banner', kind: 'instance', depth: 1, open: false, hidden: true },
  { name: 'Payment method', kind: 'instance', depth: 1, open: false },
  { name: 'Card number', kind: 'instance', depth: 1, open: false, state: 'hovered' },
  { name: 'Expiry and CVC', kind: 'stackH', depth: 1, open: true },
  { name: 'Expiry date', kind: 'instance', depth: 2, open: false },
  { name: 'CVC', kind: 'instance', depth: 2, open: false },
  { name: 'Pay button', kind: 'instance', depth: 1, open: false, state: 'selected' },
  { name: 'Charge note', kind: 'text', depth: 1 },
  { name: 'Home indicator', kind: 'instance', depth: 1, open: false },
  { name: 'Payment – Error', kind: 'frame', depth: 0, open: false },
  { name: 'Order placed', kind: 'frame', depth: 0, open: false },
];

function LayerRow({ layer }: { layer: Layer }) {
  const classes = [
    styles.layer,
    layer.depth === 0 && styles.layerTop,
    layer.kind === 'instance' && styles.layerInstance,
    layer.state && styles[layer.state],
    layer.hidden && styles.layerHidden,
  ];
  return (
    <div
      className={classes.filter(Boolean).join(' ')}
      role="treeitem"
      aria-level={layer.depth + 1}
      aria-selected={layer.state === 'selected'}
      aria-expanded={layer.open}
      style={{ '--depth': layer.depth } as CSSProperties}
      data-inspect={layer.state === 'hovered' ? 'layer-row' : undefined}
    >
      <span className={styles.caret}>{layer.open !== undefined && <Icon d={ICON.caret} />}</span>
      <Icon d={KIND_ICON[layer.kind]} className={styles.layerIcon} />
      <span className={styles.layerName}>{layer.name}</span>
      <span
        className={layer.locked ? `${styles.toggle} ${styles.toggleOn}` : styles.toggle}
        role="button"
        aria-pressed={layer.locked ?? false}
        aria-label="Lock layer"
      >
        <Icon d={layer.locked ? ICON.lock : ICON.unlock} />
      </span>
      <span
        className={layer.hidden ? `${styles.toggle} ${styles.toggleOn}` : styles.toggle}
        role="button"
        aria-pressed={layer.hidden ?? false}
        aria-label="Hide layer"
      >
        <Icon d={layer.hidden ? ICON.eyeOff : ICON.eye} />
      </span>
    </div>
  );
}

/** Signal, Wi-Fi and battery, drawn the way a phone mock-up shows them. */
function StatusIcons() {
  return (
    <svg className={styles.mStatusIcons} viewBox="0 0 68 12" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="0.8" />
      <rect x="4.5" y="6" width="3" height="6" rx="0.8" />
      <rect x="9" y="3.5" width="3" height="8.5" rx="0.8" />
      <rect x="13.5" y="1" width="3" height="11" rx="0.8" />
      <path d="M30 11.6l2-2.3a3 3 0 0 0-4 0zM24.6 6.4a8 8 0 0 1 10.8 0l-1.6 1.8a5.6 5.6 0 0 0-7.6 0zM21.6 3.4a12.2 12.2 0 0 1 16.8 0l-1.6 1.8a9.8 9.8 0 0 0-13.6 0z" />
      <rect className={styles.mBatteryCase} x="44.5" y="0.5" width="21" height="11" rx="3" />
      <rect x="46.5" y="2.5" width="15" height="7" rx="1.5" />
      <rect x="66.5" y="4" width="1.5" height="4" rx="0.75" />
    </svg>
  );
}

/** What's in the bag; the prices add up to the total on the Pay button. */
const ORDER = [
  { name: 'Cedar No. 4 parfum', meta: '50 ml · Qty 1', price: '$48.00', photo: perfume },
  { name: 'Linen soy candle', meta: '220 g · Qty 1', price: '$22.00', photo: candle },
  { name: 'Rosehip face oil', meta: '30 ml · Qty 1', price: '$16.40', photo: serum },
];

/**
 * The design being edited: the payment step of a checkout, in its default and its error state. It's content inside
 * the file, so like a photo it looks the same in both themes.
 */
function PaymentScreen({ error = false }: { error?: boolean }) {
  return (
    <div className={error ? `${styles.screen} ${styles.screenError}` : styles.screen}>
      <div className={styles.mStatus}>
        <span>9:41</span>
        <StatusIcons />
      </div>
      <div className={styles.mNav}>
        <Icon d={ICON.back} className={styles.mBack} />
        <span className={styles.mTitle}>Checkout</span>
        <span className={styles.mStep}>3 of 3</span>
      </div>
      <div className={styles.mSummary}>
        <div className={styles.mSummaryHead}>
          <span>Order summary</span>
          <span className={styles.mCount}>3 items</span>
        </div>
        <div className={styles.mItems}>
          {ORDER.map((item) => (
            <div key={item.name} className={styles.mItem}>
              <img src={item.photo} alt="" draggable={false} />
              <span className={styles.mItemText}>
                <span className={styles.mItemName}>{item.name}</span>
                <span className={styles.mItemMeta}>{item.meta}</span>
              </span>
              <span className={styles.mItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
        <div className={styles.mTotal}>
          <span>Total</span>
          <span className={styles.mTotalValue}>$86.40</span>
        </div>
      </div>
      <div className={styles.mMethods} role="tablist">
        <span className={styles.mMethod} role="tab" aria-selected="true">
          Card
        </span>
        <span className={styles.mMethod} role="tab" aria-selected="false">
          Wallet
        </span>
        <span className={styles.mMethod} role="tab" aria-selected="false">
          Bank
        </span>
      </div>
      <div className={`${styles.mField} ${styles.mCard}`}>
        <span className={styles.mLabel}>Card number</span>
        <span className={error ? `${styles.mInput} ${styles.mInputError}` : styles.mInput}>
          {error ? '4921 8830 11' : '4921 8830 1157 6042'}
          <Icon d={ICON.card} className={styles.mInputIcon} />
        </span>
        {error && (
          <span className={styles.mError}>
            <Icon d={ICON.alert} className={styles.mErrorIcon} />
            Card number is incomplete
          </span>
        )}
      </div>
      <div className={`${styles.mPair} ${styles.mShift}`}>
        <span className={styles.mField}>
          <span className={styles.mLabel}>Expiry date</span>
          <span className={styles.mInput}>08 / 28</span>
        </span>
        <span className={styles.mField}>
          <span className={styles.mLabel}>CVC</span>
          <span className={styles.mInput}>
            •••
            <Icon d={ICON.help} className={styles.mInputIcon} />
          </span>
        </span>
      </div>
      <span className={error ? `${styles.mPay} ${styles.mShift} ${styles.mPayDisabled}` : styles.mPay}>
        <Icon d={ICON.lockSmall} className={styles.mPayIcon} />
        Pay $86.40
      </span>
      <p className={`${styles.mNote} ${styles.mShift}`}>You won’t be charged until your order ships</p>
      <span className={styles.mHome} />
    </div>
  );
}

function Cursor({ person, className }: { person: Person; className: string }) {
  return (
    <span
      className={`${styles.cursor} ${className}`}
      style={{ '--who': person.color, '--who-ink': person.ink } as CSSProperties}
      data-inspect="multiplayer-cursor"
    >
      <svg className={styles.cursorArrow} viewBox="0 0 18 18" aria-hidden="true">
        <path d={ARROW} />
      </svg>
      <span className={styles.cursorName}>{person.first}</span>
    </span>
  );
}

const CORNERS = ['nw', 'ne', 'se', 'sw'] as const;

const ALIGN_X = [
  { name: 'Align left', icon: ICON.alignLeft },
  { name: 'Align horizontal centers', icon: ICON.alignCenter },
  { name: 'Align right', icon: ICON.alignRight },
];

const ALIGN_Y = [
  { name: 'Align top', icon: ICON.alignTop },
  { name: 'Align vertical centers', icon: ICON.alignMiddle },
  { name: 'Align bottom', icon: ICON.alignBottom },
];

const FLOWS = [
  { name: 'Vertical', icon: ICON.flowDown },
  { name: 'Horizontal', icon: ICON.flowRight, on: true },
  { name: 'Wrap', icon: ICON.flowWrap },
  { name: 'Grid', icon: ICON.flowGrid },
];

const VARIANT_PROPS = [
  ['Style', 'Primary'],
  ['Size', 'Large'],
];

/**
 * Library example: a design file open in an editor laid out like today's Figma. The file header, pages and layers on
 * the left; frames on the canvas with a selected button instance (corner handles, size badge), a redline, live cursors
 * and a comment preview; a toolbar floating at the bottom; and the Design panel on the right. Not interactive; for
 * inspection only.
 */
export function FormaSite() {
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <aside className={styles.left}>
          <div className={styles.fileHeader} data-inspect="file-menu">
            <div className={styles.menuRow}>
              <span className={styles.mainMenu} role="button" aria-haspopup="menu" aria-label="Main menu">
                <FormaMark />
                <Icon d={ICON.chevron} className={styles.tinyChevron} />
              </span>
              <span className={styles.panelToggle} role="button" aria-label="Minimize UI">
                <Icon d={ICON.sidebar} />
              </span>
            </div>
            <span className={styles.fileName} role="button" aria-haspopup="menu">
              <span className={styles.fileTitle}>Checkout redesign</span>
              <Icon d={ICON.chevron} className={styles.tinyChevron} />
            </span>
            <span className={styles.project}>
              Fernway app
              <span className={styles.plan}>Pro</span>
            </span>
          </div>

          <div className={styles.leftBody}>
            <div className={styles.leftTabs}>
              <span className={styles.tabs} role="tablist">
                <span className={styles.tab} role="tab" aria-selected="true">
                  File
                </span>
                <span className={styles.tab} role="tab" aria-selected="false">
                  Assets
                </span>
              </span>
              <span className={styles.headTool} role="button" aria-label="Find in file">
                <Icon d={ICON.search} />
              </span>
            </div>

            <div className={styles.pages} data-inspect="page-list">
              <div className={styles.listHead}>
                Pages
                <span className={styles.headTool} role="button" aria-label="Add page">
                  <Icon d={ICON.plus} />
                </span>
              </div>
              {PAGES.map((page, index) => (
                <span key={page} className={styles.pageRow} aria-current={index === 0 ? 'page' : undefined}>
                  {page}
                </span>
              ))}
            </div>

            <div className={styles.layers} data-inspect="layers-panel">
              <div className={styles.listHead}>
                Layers
                <span className={styles.headTool} role="button" aria-label="Collapse layers">
                  <Icon d={ICON.collapse} />
                </span>
              </div>
              <div role="tree" aria-label="Layers">
                {LAYERS.map((layer) => (
                  <LayerRow key={layer.name} layer={layer} />
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className={styles.canvas}>
          <div className={styles.world}>
            <section className={styles.frame} aria-label="Payment" data-inspect="frame">
              <span className={styles.frameLabel}>Payment</span>
              <div className={styles.frameClip}>
                <PaymentScreen />
              </div>

              <span className={styles.measure} data-inspect="measurement">
                <span className={styles.measureTarget} />
                <span className={styles.measureLine} />
                <span className={styles.measureLabel}>24</span>
              </span>

              <span className={styles.selection} data-inspect="selection-handles">
                {CORNERS.map((corner) => (
                  <span key={corner} className={`${styles.handle} ${styles[corner]}`} />
                ))}
                <span className={styles.sizeBadge} data-inspect="size-badge">
                  350 × 52
                </span>
              </span>

              <span
                className={styles.comment}
                role="button"
                aria-label={`Comment by ${MAYA.name}`}
                data-inspect="comment-pin"
              >
                <img className={styles.commentAvatar} src={MAYA.photo} alt="" draggable={false} />
                <span className={styles.commentPreview}>
                  <span className={styles.commentMeta}>
                    <span className={styles.commentAuthor}>{MAYA.name}</span>
                    <span className={styles.commentTime}>2h</span>
                  </span>
                  <span>Could this fold down to just the total? It fills half the screen.</span>
                  <span className={styles.commentReplies}>2 replies</span>
                </span>
              </span>

              <Cursor person={THEO} className={styles.cursorTheo} />
            </section>

            <section className={`${styles.frame} ${styles.frameNext}`} aria-label="Payment – Error">
              <span className={styles.frameLabel}>Payment – Error</span>
              <div className={styles.frameClip}>
                <PaymentScreen error />
              </div>
              <Cursor person={NOOR} className={styles.cursorNoor} />
            </section>
          </div>

          <div className={styles.toolbar} role="toolbar" aria-label="Tools" data-inspect="toolbar">
            {TOOLS.map((tool, index) => (
              <span key={tool.name} className={tool.extra ? `${styles.toolGroup} ${styles.toolExtra}` : styles.toolGroup}>
                <span
                  className={styles.tool}
                  role="button"
                  aria-label={tool.name}
                  aria-pressed={index === 0}
                  aria-keyshortcuts={tool.key}
                >
                  <Icon d={tool.icon} />
                </span>
                {tool.group && <Icon d={ICON.groupChevron} className={styles.toolChevron} />}
              </span>
            ))}
            <span className={styles.modes} role="radiogroup" aria-label="Mode">
              {MODES.map((mode) => (
                <span
                  key={mode.name}
                  className={styles.mode}
                  role="radio"
                  aria-checked={mode.name === 'Design'}
                  aria-label={mode.name}
                >
                  <Icon d={mode.icon} />
                </span>
              ))}
            </span>
          </div>

          <span className={styles.help} role="button" aria-label="Help and resources">
            ?
          </span>
        </main>

        <aside className={styles.right}>
          <div className={styles.rightHead}>
            <span className={styles.people} role="button" aria-haspopup="menu" aria-label="People in this file">
              {PEOPLE.map((person) => (
                <img
                  key={person.name}
                  className={person.color ? `${styles.avatar} ${styles.avatarRing}` : styles.avatar}
                  style={{ '--who': person.color } as CSSProperties}
                  src={person.photo}
                  alt={person.name}
                  draggable={false}
                />
              ))}
              <Icon d={ICON.chevron} className={styles.tinyChevron} />
            </span>
            <span className={styles.present} role="button" aria-label="Present" data-inspect="present-button">
              <Icon d={ICON.play} />
              <Icon d={ICON.chevron} className={styles.tinyChevron} />
            </span>
            <span className={styles.share} role="button" aria-haspopup="dialog">
              Share
            </span>
          </div>

          <div className={styles.rightTabs}>
            <span className={styles.tabs} role="tablist">
              <span className={styles.tab} role="tab" aria-selected="true">
                Design
              </span>
              <span className={styles.tab} role="tab" aria-selected="false">
                Prototype
              </span>
            </span>
            <span className={styles.zoom} role="button" aria-haspopup="menu" data-inspect="zoom-control">
              75%
              <Icon d={ICON.chevron} className={styles.tinyChevron} />
            </span>
          </div>

          <div className={styles.props}>
            <div className={styles.section} data-inspect="component-instance">
              <div className={styles.sectionHead}>
                <span className={styles.instanceName} role="button" aria-haspopup="listbox" aria-label="Swap instance">
                  <Icon d={ICON.instance} className={styles.instanceIcon} />
                  Button
                  <Icon d={ICON.chevron} className={styles.tinyChevron} />
                </span>
                <span className={styles.headTools}>
                  <span className={styles.headTool} role="button" aria-label="Go to main component">
                    <Icon d={ICON.goToMain} />
                  </span>
                  <span className={styles.headTool} role="button" aria-label="More instance options">
                    <Dots />
                  </span>
                </span>
              </div>
              {VARIANT_PROPS.map(([property, value]) => (
                <div key={property} className={styles.propRow}>
                  <span className={styles.label}>{property}</span>
                  <span className={styles.select} role="button" aria-haspopup="listbox">
                    {value}
                    <Icon d={ICON.chevron} className={styles.selectChevron} />
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHead}>Position</div>
              <div className={styles.group}>
                <span className={styles.label}>Alignment</span>
                <div className={styles.row}>
                  {[ALIGN_X, ALIGN_Y].map((buttons) => (
                    <span key={buttons[0].name} className={styles.iconGroup}>
                      {buttons.map((button) => (
                        <span key={button.name} role="button" aria-label={button.name}>
                          <Icon d={button.icon} />
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.group}>
                <span className={styles.label}>Position</span>
                <div className={styles.row}>
                  <span className={styles.field}>
                    <span className={styles.key}>X</span>20
                  </span>
                  <span className={styles.field}>
                    <span className={styles.key}>Y</span>681
                  </span>
                  <span
                    className={`${styles.rowTool} ${styles.rowToolOn}`}
                    role="button"
                    aria-label="Constraints: left and right, top"
                    aria-haspopup="dialog"
                    data-inspect="constraints"
                  >
                    <Icon d={ICON.constraints} />
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.section} data-inspect="auto-layout">
              <div className={styles.sectionHead}>
                Layout
                <span className={styles.headTools}>
                  <span className={styles.headTool} role="button" aria-label="Layout guide">
                    <Icon d={ICON.layoutGuide} />
                  </span>
                  <span className={styles.headTool} role="button" aria-label="Auto layout settings">
                    <Icon d={ICON.sliders} />
                  </span>
                </span>
              </div>
              <div className={styles.group}>
                <span className={styles.label}>Flow</span>
                <div className={styles.row}>
                  <span className={styles.segmented} role="radiogroup" aria-label="Flow">
                    {FLOWS.map((flow) => (
                      <span
                        key={flow.name}
                        className={styles.segment}
                        role="radio"
                        aria-checked={flow.on ?? false}
                        aria-label={flow.name}
                      >
                        <Icon d={flow.icon} />
                      </span>
                    ))}
                  </span>
                </div>
              </div>
              <div className={styles.group}>
                <span className={styles.label}>Dimensions</span>
                <div className={styles.row}>
                  <span className={styles.field}>
                    <span className={styles.key}>W</span>350
                  </span>
                  <span className={styles.field}>
                    <span className={styles.key}>H</span>52
                  </span>
                </div>
              </div>
              <div className={styles.spacing}>
                <span className={styles.label}>Alignment</span>
                <span className={styles.label}>Gap</span>
                <span className={styles.alignBox} role="img" aria-label="Aligned to the center">
                  {Array.from({ length: 9 }, (_, cell) =>
                    cell === 4 ? (
                      <span key={cell} className={styles.alignOn}>
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : (
                      <span key={cell} className={styles.alignDot} />
                    ),
                  )}
                </span>
                <span className={`${styles.field} ${styles.wide}`} aria-label="Gap between items">
                  <Icon d={ICON.gap} className={styles.fieldIcon} />8
                </span>
                <span className={styles.field} aria-label="Horizontal padding">
                  <Icon d={ICON.padX} className={styles.fieldIcon} />
                  24
                </span>
                <span className={styles.field} aria-label="Vertical padding">
                  <Icon d={ICON.padY} className={styles.fieldIcon} />
                  16
                </span>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHead}>
                Appearance
                <span className={styles.headTools}>
                  <span className={styles.headTool} role="button" aria-label="Hide layer">
                    <Icon d={ICON.eye} />
                  </span>
                  <span className={styles.headTool} role="button" aria-label="Blend mode">
                    <Icon d={ICON.blend} />
                  </span>
                </span>
              </div>
              <div className={styles.labeled}>
                <span className={styles.label}>Opacity</span>
                <span className={styles.label}>Corner radius</span>
                <span />
                <span className={styles.field}>
                  <Icon d={ICON.opacity} className={styles.fieldIcon} />
                  100%
                </span>
                <span className={styles.field}>
                  <Icon d={ICON.radius} className={styles.fieldIcon} />
                  14
                </span>
                <span className={styles.rowTool} role="button" aria-label="Independent corners">
                  <Icon d={ICON.corners} />
                </span>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHead}>
                Fill
                <span className={styles.headTools}>
                  <span className={styles.headTool} role="button" aria-label="Color styles">
                    <Dots square />
                  </span>
                  <span className={styles.headTool} role="button" aria-label="Add fill">
                    <Icon d={ICON.plus} />
                  </span>
                </span>
              </div>
              <div className={styles.paintRow} data-inspect="color-row">
                <span className={styles.paint}>
                  <span className={styles.hex}>
                    <span className={styles.swatch} />
                    16181D
                  </span>
                  <span className={styles.opacity}>
                    100<span className={styles.unit}>%</span>
                  </span>
                </span>
                <span className={styles.rowTool} role="button" aria-label="Hide fill">
                  <Icon d={ICON.eye} />
                </span>
                <span className={styles.rowTool} role="button" aria-label="Remove fill">
                  <Icon d={ICON.minus} />
                </span>
              </div>
            </div>

            <div className={`${styles.section} ${styles.emptySection}`}>
              <div className={styles.sectionHead}>
                Stroke
                <span className={styles.headTool} role="button" aria-label="Add stroke">
                  <Icon d={ICON.plus} />
                </span>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHead}>
                Effects
                <span className={styles.headTool} role="button" aria-label="Add effect">
                  <Icon d={ICON.plus} />
                </span>
              </div>
              <div className={styles.paintRow} data-inspect="effect-row">
                <span className={styles.select} role="button" aria-haspopup="dialog">
                  <Icon d={ICON.shadow} className={styles.fieldIcon} />
                  Drop shadow
                  <Icon d={ICON.chevron} className={styles.selectChevron} />
                </span>
                <span className={styles.rowTool} role="button" aria-label="Hide effect">
                  <Icon d={ICON.eye} />
                </span>
                <span className={styles.rowTool} role="button" aria-label="Remove effect">
                  <Icon d={ICON.minus} />
                </span>
              </div>
            </div>

            <div className={`${styles.section} ${styles.emptySection}`}>
              <div className={styles.sectionHead}>
                Export
                <span className={styles.headTool} role="button" aria-label="Add export setting">
                  <Icon d={ICON.plus} />
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
