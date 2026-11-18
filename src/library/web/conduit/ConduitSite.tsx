import { useId } from 'react';
import type { ReactNode } from 'react';
import styles from './ConduitSite.module.css';

/** Line icons on a 20px grid; stroke color and width come from the stylesheet. */
const ICONS = {
  home: 'M3.75 9.1L10 4l6.25 5.1v6.65a.75.75 0 0 1-.75.75h-3.75v-4.25h-3.5v4.25H4.5a.75.75 0 0 1-.75-.75z',
  folder: 'M3 6a1 1 0 0 1 1-1h3.6l1.5 1.75H16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z',
  help: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8 8.1a2.1 2.1 0 0 1 4.05.75c0 1.4-2.05 1.75-2.05 3M10 14.1h.01',
  chevronDown: 'M6.25 8.25L10 12l3.75-3.75',
  chevronRight: 'M8 5.5l4.5 4.5L8 14.5',
  /** Two chevrons, one up and one down: a dropdown */
  chevronUpDown: 'M7 8l3-3 3 3M7 12l3 3 3-3',
  arrowLeft: 'M16 10H4.5M9.25 5.25L4.5 10l4.75 4.75',
  plus: 'M10 4.5v11M4.5 10h11',
  minus: 'M4.5 10h11',
  /** Four corners: fit everything on screen, or expand the panel */
  fit: 'M4 7.5V4h3.5M12.5 4H16v3.5M16 12.5V16h-3.5M7.5 16H4v-3.5',
  expand: 'M11.5 4H16v4.5M16 4l-5 5M8.5 16H4v-4.5M4 16l5-5',
  close: 'M5.25 5.25l9.5 9.5M14.75 5.25l-9.5 9.5',
  pencil: 'M11.9 4.6l3.5 3.5M4 16l1-4.4 8.1-8.1a1.4 1.4 0 0 1 2 0l1.4 1.4a1.4 1.4 0 0 1 0 2L8.4 15z',
  bolt: 'M11 2.75L4.75 11h4.5l-1 6.25L15.25 9h-4.5z',
  hash: 'M8.1 3.5L6.6 16.5M13.4 3.5l-1.5 13M4 7.5h12.5M3.5 12.5H16',
  check: 'M6.25 10.25l2.5 2.5 5-5.25',
  /** The rail: create, flows, tables, forms, history, apps, settings */
  create: 'M10 17.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5zM10 6.75v6.5M6.75 10h6.5',
  flows: 'M5.5 3.75a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM14.5 12.75a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM7.25 5.5h3.5a2 2 0 0 1 2 2v3.25M5.5 7.25v5.25a2 2 0 0 0 2 2h5.25',
  tables: 'M3.75 4.75h12.5v10.5H3.75zM3.75 8.25h12.5M3.75 11.75h12.5M8.25 8.25v7',
  forms: 'M5.25 3.25h9.5a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V4.25a1 1 0 0 1 1-1zM7 7h6M7 10h6M7 13h3.5',
  history: 'M3.6 10.6A6.5 6.5 0 1 0 5.4 5.4M5.4 2.9v2.5h2.5M10 6.6V10l2.4 1.6',
  apps: 'M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM13.5 11v5M11 13.5h5',
  settings:
    'M10 12.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2zM16.1 11.9l1.2.9-1.5 2.6-1.4-.6a5.6 5.6 0 0 1-1.6.9l-.2 1.55h-3l-.2-1.55a5.6 5.6 0 0 1-1.6-.9l-1.4.6-1.5-2.6 1.2-.9a5.7 5.7 0 0 1 0-1.8l-1.2-.9 1.5-2.6 1.4.6a5.6 5.6 0 0 1 1.6-.9l.2-1.55h3l.2 1.55a5.6 5.6 0 0 1 1.6.9l1.4-.6 1.5 2.6-1.2.9a5.7 5.7 0 0 1 0 1.8z',
};

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 20 20" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** Three dots in a column (⋮) or a 3 × 3 grid: "more" and the app switcher. */
function Dots({ grid }: { grid?: boolean }) {
  const spots = grid
    ? [4.5, 10, 15.5].flatMap((y) => [4.5, 10, 15.5].map((x) => [x, y]))
    : [4.5, 10, 15.5].map((y) => [10, y]);
  return (
    <svg className={styles.dots} viewBox="0 0 20 20" aria-hidden="true">
      {spots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={grid ? 1.5 : 1.6} />
      ))}
    </svg>
  );
}

/** Conduit's own mark: a pipe that turns a corner, from one step to the next, on a cobalt tile. */
function ConduitMark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <rect className={styles.markTile} width="20" height="20" rx="5" />
      <circle className={styles.markInk} cx="6" cy="6.5" r="2" />
      <path className={styles.markPipe} d="M8 6.5h2.5a3 3 0 0 1 3 3v2.25" />
      <path className={styles.markInk} d="M10.75 11.5h5.5l-2.75 3.5z" />
    </svg>
  );
}

type App = 'ledger' | 'filter' | 'folio' | 'relay';

const TILE_CLASS: Record<Exclude<App, 'ledger'>, string> = {
  filter: styles.tileFilter,
  folio: styles.tileFolio,
  relay: styles.tileRelay,
};

const APP_NAMES: Record<App, string> = {
  ledger: 'Ledger',
  filter: 'Filter by Conduit',
  folio: 'Folio',
  relay: 'Relay',
};

/**
 * The apps' own marks, as each product draws it in the library: Ledger's three bars, Folio's folded sheet on petrol,
 * Relay's r passing a dot on ember. The filter is one of Conduit's built-in tools, so it's on Conduit's cobalt.
 */
function AppMark({ app, className }: { app: App; className?: string }) {
  const gradient = useId();
  const classes = className ? `${styles.appMark} ${className}` : styles.appMark;
  if (app === 'ledger') {
    return (
      <svg className={classes} viewBox="0 0 20 20" aria-hidden="true">
        <defs>
          <linearGradient id={gradient} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#5a4bff" />
            <stop offset="1" stopColor="#e0367a" />
          </linearGradient>
        </defs>
        <rect x="2" y="3.5" width="16" height="3.6" rx="1.8" fill={`url(#${gradient})`} />
        <rect x="2" y="8.2" width="11.5" height="3.6" rx="1.8" fill={`url(#${gradient})`} />
        <rect x="2" y="12.9" width="7" height="3.6" rx="1.8" fill={`url(#${gradient})`} />
      </svg>
    );
  }
  return (
    <svg className={classes} viewBox="0 0 20 20" aria-hidden="true">
      <rect className={TILE_CLASS[app]} width="20" height="20" rx="5" />
      {app === 'filter' && <path className={styles.tileInk} d="M5 6h10l-3.75 4.5V15l-2.5-1.25V10.5z" />}
      {app === 'folio' && (
        <>
          <path className={styles.tileInk} d="M5 6.25h5v8.5H5z" />
          <path className={styles.tileInkSoft} d="M10 6.25l5-2v8.5l-5 2z" />
        </>
      )}
      {app === 'relay' && (
        <>
          <path className={styles.tileStroke} d="M7.2 14.5V9.6a3.6 3.6 0 0 1 3.6-3.6h.75" />
          <circle className={styles.tileInk} cx="13.25" cy="13.25" r="1.6" />
        </>
      )}
    </svg>
  );
}

/** A filled circle with a check: the step is set up and tested. */
function Done({ className }: { className?: string }) {
  return (
    <svg className={className ? `${styles.done} ${className}` : styles.done} viewBox="0 0 20 20" role="img" aria-label="Complete">
      <circle cx="10" cy="10" r="8" />
      <path d={ICONS.check} />
    </svg>
  );
}

type StepProps = {
  number: number;
  app: App;
  title: string;
  /** Chips after the app's name, such as how the trigger listens. */
  extra?: ReactNode;
  selected?: boolean;
  inspect: string;
};

/** A step on the canvas: its status, the app, a menu, and the step's number and event. */
function Step({ number, app, title, extra, selected, inspect }: StepProps) {
  return (
    <div
      className={selected ? `${styles.step} ${styles.stepSelected}` : styles.step}
      aria-current={selected ? 'step' : undefined}
      data-inspect={inspect}
    >
      <div className={styles.stepTop}>
        <Done />
        <span className={styles.appChip}>
          <AppMark app={app} />
          {APP_NAMES[app]}
        </span>
        {extra}
        <span className={styles.stepMore} role="button" aria-label={`Step ${number} actions`} aria-haspopup="menu">
          <Dots />
        </span>
      </div>
      <p className={styles.stepTitle}>
        <strong>{number}.</strong> {title}
      </p>
    </div>
  );
}

/** The line between two steps, with a plus in the middle to add a step there. */
function Connector({ last }: { last?: boolean }) {
  return (
    <div className={last ? `${styles.connector} ${styles.connectorEnd}` : styles.connector}>
      <span className={styles.addStep} role="button" aria-label="Add a step here" data-inspect="add-step">
        <Icon d={ICONS.plus} />
      </span>
    </div>
  );
}

/** A value mapped from an earlier step: the step's app, number and field, and the value from its test run. */
function DataPill({ field, value }: { field: string; value: string }) {
  return (
    <span className={styles.pill} data-inspect="data-pill">
      <AppMark app="ledger" className={styles.pillMark} />
      <span className={styles.pillField}>1. {field}:</span>
      <span className={styles.pillValue}>{value}</span>
    </span>
  );
}

function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className={styles.label}>
      {children}
      {required && (
        <span className={styles.required} aria-label="required">
          {' '}
          *
        </span>
      )}
    </span>
  );
}

const RAIL: { label: string; icon: string; current?: boolean }[] = [
  { label: 'Create', icon: ICONS.create },
  { label: 'Flows', icon: ICONS.flows, current: true },
  { label: 'Tables', icon: ICONS.tables },
  { label: 'Forms', icon: ICONS.forms },
  { label: 'History', icon: ICONS.history },
  { label: 'Apps', icon: ICONS.apps },
  { label: 'Settings', icon: ICONS.settings },
];

/**
 * Library example: an automation builder, closely following Zapier's editor with a four-step flow open: a payment
 * comes in from Ledger, a filter lets only big ones through, Folio records the deal and Relay posts it to #sales-wins.
 * The Relay step is selected with its settings open on the right. Conduit's cobalt, its mark and the flow are our
 * own; the apps are the library's own fictional products. Not interactive; for inspection only.
 */
export function ConduitSite() {
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <header className={styles.topBar} data-inspect="top-bar">
          <div className={styles.topStart}>
            <span className={styles.home} role="button" aria-label="Home">
              <Icon d={ICONS.home} />
            </span>
            <span className={styles.topButton} role="button" aria-label="All apps" aria-haspopup="menu">
              <Dots grid />
            </span>
            <span className={styles.product}>
              <ConduitMark className={styles.mark} />
              Flows
            </span>
          </div>

          <div className={styles.topCenter} data-inspect="flow-name">
            <span className={styles.folder}>
              <Icon d={ICONS.folder} />
              <span className={styles.folderName}>Revenue ops</span>
            </span>
            <span className={styles.slash} aria-hidden="true">
              /
            </span>
            <span className={styles.owner} role="img" aria-label="Owned by Ines Moreau">
              IM
            </span>
            <span className={styles.flowName}>Big payments to #sales-wins</span>
            <span className={styles.draft} data-inspect="status-badge">
              Draft
            </span>
            <span className={styles.flowMenu} role="button" aria-label="Flow menu" aria-haspopup="menu">
              <Icon d={ICONS.chevronDown} />
            </span>
          </div>

          <div className={styles.topEnd}>
            <span className={styles.help} role="button" aria-label="Help" aria-haspopup="menu">
              <Icon d={ICONS.help} />
              <span className={styles.helpLabel}>Help</span>
              <Icon d={ICONS.chevronDown} className={styles.helpChevron} />
            </span>
          </div>
        </header>

        <nav className={styles.rail} aria-label="Conduit" data-inspect="nav-rail">
          {RAIL.map((item) => (
            <a key={item.label} className={styles.railItem} aria-label={item.label} aria-current={item.current ? 'page' : undefined}>
              <Icon d={item.icon} />
            </a>
          ))}
        </nav>

        <div className={styles.versionBar}>
          <span className={styles.back} role="button" aria-label="Back to all flows">
            <Icon d={ICONS.arrowLeft} />
          </span>
          <span className={styles.toggle} role="switch" aria-checked="true" aria-label="Flow is on" data-inspect="on-off-toggle">
            <span className={styles.knob} />
          </span>
          <p className={styles.version} data-inspect="version-info">
            <a className={styles.versionLink}>v3</a>
            <span className={styles.versionBy}>
              {' '}
              published by <strong>Ines M.</strong>
            </span>{' '}
            2 hours ago
          </p>
          <span className={styles.publish} role="button" data-inspect="publish-button">
            Publish
          </span>
        </div>

        <main className={styles.canvas} aria-label="Flow editor" data-inspect="canvas">
          <div className={styles.flow} role="list" aria-label="Steps">
            <div className={styles.flowItem} role="listitem">
              <Step
                number={1}
                app="ledger"
                title="New successful payment"
                inspect="trigger-step"
                extra={
                  <span className={styles.instant} aria-label="Instant trigger">
                    <Icon d={ICONS.bolt} />
                    Instant
                  </span>
                }
              />
              <Connector />
            </div>
            <div className={styles.flowItem} role="listitem">
              <Step number={2} app="filter" title="Only continue if…" inspect="filter-step" />
              <Connector />
            </div>
            <div className={styles.flowItem} role="listitem">
              <Step number={3} app="folio" title="Create database item" inspect="action-step" />
              <Connector />
            </div>
            <div className={styles.flowItem} role="listitem">
              <Step number={4} app="relay" title="Send channel message" selected inspect="selected-step" />
              <Connector last />
            </div>
          </div>

          <div className={styles.zoom} role="toolbar" aria-label="Zoom" data-inspect="zoom-controls">
            <span className={styles.zoomButton} role="button" aria-label="Zoom out">
              <Icon d={ICONS.minus} />
            </span>
            <span className={styles.zoomLevel} role="button" aria-haspopup="menu" aria-label="Zoom level, 100%">
              100%
            </span>
            <span className={styles.zoomButton} role="button" aria-label="Zoom in">
              <Icon d={ICONS.plus} />
            </span>
            <span className={styles.zoomDivider} />
            <span className={styles.zoomButton} role="button" aria-label="Fit to screen">
              <Icon d={ICONS.fit} />
            </span>
          </div>

          <aside className={styles.panel} aria-label="Step 4, Send channel message" data-inspect="step-panel">
            <header className={styles.panelHead}>
              <AppMark app="relay" className={styles.panelMark} />
              <h2 className={styles.panelTitle}>4. Send channel message</h2>
              <span className={styles.rename} role="button" aria-label="Rename step">
                <Icon d={ICONS.pencil} />
              </span>
              <span className={styles.panelTool} role="button" aria-label="Expand panel">
                <Icon d={ICONS.expand} />
              </span>
              <span className={styles.panelTool} role="button" aria-label="Close panel">
                <Icon d={ICONS.close} />
              </span>
            </header>

            <div className={styles.stepTabs} role="tablist" aria-label="Step setup" data-inspect="step-tabs">
              <span className={styles.stepTab} role="tab" aria-selected="false">
                Setup
                <Done className={styles.tabDone} />
              </span>
              <Icon d={ICONS.chevronRight} className={styles.tabArrow} />
              <span className={styles.stepTab} role="tab" aria-selected="true">
                Configure
                <Done className={styles.tabDone} />
              </span>
              <Icon d={ICONS.chevronRight} className={styles.tabArrow} />
              <span className={styles.stepTab} role="tab" aria-selected="false">
                Test
                <Done className={styles.tabDone} />
              </span>
            </div>

            <div className={styles.panelBody}>
              <div className={styles.field}>
                <Label required>Channel</Label>
                <div className={styles.fieldRow}>
                  <span className={styles.select} role="combobox" aria-expanded="false" aria-label="Channel" data-inspect="select-field">
                    <Icon d={ICONS.hash} className={styles.selectHash} />
                    <span className={styles.selectValue}>sales-wins</span>
                    <span className={styles.selectHint}>Public</span>
                    <Icon d={ICONS.chevronUpDown} className={styles.selectArrows} />
                  </span>
                  <span className={styles.fieldMore} role="button" aria-label="Channel options" aria-haspopup="menu">
                    <Dots />
                  </span>
                </div>
              </div>

              <div className={styles.field}>
                <Label required>Message text</Label>
                <div className={styles.textArea} role="textbox" aria-multiline="true" aria-label="Message text">
                  🎉 <DataPill field="Customer" value="Kestrel Labs" /> just paid{' '}
                  <DataPill field="Amount" value="2,400.00" /> <DataPill field="Currency" value="USD" />
                  <span className={styles.insert} role="button" aria-label="Insert data from a step">
                    <Icon d={ICONS.plus} />
                  </span>
                </div>
                <span className={styles.hint}>Use *bold* and _italic_; links turn into previews.</span>
              </div>

              <div className={styles.field}>
                <Label>Send as a bot?</Label>
                <div className={styles.yesNo} role="radiogroup" aria-label="Send as a bot?" data-inspect="yes-no-toggle">
                  <span className={styles.choice} role="radio" aria-checked="true">
                    <Icon d={ICONS.check} />
                    Yes
                  </span>
                  <span className={styles.choice} role="radio" aria-checked="false">
                    <Icon d={ICONS.close} className={styles.choiceNo} />
                    No
                  </span>
                </div>
              </div>

              <div className={styles.field}>
                <Label>Bot name</Label>
                <span className={styles.input} role="textbox" aria-label="Bot name">
                  Revenue bot
                </span>
              </div>

              <div className={styles.field}>
                <Label>Bot icon</Label>
                <span className={styles.input} role="textbox" aria-label="Bot icon">
                  :moneybag:
                </span>
              </div>
            </div>

            <footer className={styles.panelFoot}>
              <span className={styles.continue} role="button" data-inspect="continue-button">
                Continue
              </span>
            </footer>
          </aside>
        </main>
      </div>
    </div>
  );
}
