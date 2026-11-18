import { Fragment, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useDemoMotion } from '../../demos/motion';
import styles from './CommandPalette.module.css';
import clara from './photos/productivity/clara.webp';
import erik from './photos/productivity/erik.webp';
import imani from './photos/productivity/imani.webp';
import kofi from './photos/productivity/kofi.webp';
import noah from './photos/productivity/noah.webp';
import rosa from './photos/productivity/rosa.webp';

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  compose: 'M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M17.5 3.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z',
  assign: 'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 20a7 7 0 0 1 11-5.75M18.5 14v6M15.5 17h6',
  me: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0',
  inbox:
    'M3.5 13.5l2.4-7.1A2 2 0 0 1 7.8 5h8.4a2 2 0 0 1 1.9 1.4l2.4 7.1M3.5 13.5V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-4.5M3.5 13.5h4.3l1.4 2.5h5.6l1.4-2.5h4.3',
  project: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  myIssues: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6.6 18.2a6 6 0 0 1 10.8 0',
  issues: 'M8 3.5h10.5a2 2 0 0 1 2 2V16M5.5 7.5h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z',
  cycles: 'M20 12a8 8 0 1 1-2.3-5.7M20 4.5v4h-4',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  chevron: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  filter: 'M4 7h16M7 12h10M10 17h4',
  sliders: 'M4 7h9M17 7h3M15 5v4M4 17h3M11 17h9M9 15v4',
};

function Icon({ d }: { d: string }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

type Status = 'todo' | 'progress' | 'done';

/** The tracker's status ring: empty for Todo, half full In Progress, a filled check when Done. */
function StatusIcon({ status }: { status: Status }) {
  return (
    <svg className={`${styles.status} ${styles[status]}`} viewBox="0 0 14 14">
      {status === 'done' ? (
        <>
          <circle cx="7" cy="7" r="6.5" className={styles.statusFill} />
          <path d="M4.4 7.2l1.8 1.8 3.5-3.7" className={styles.statusCheck} />
        </>
      ) : (
        <>
          <circle cx="7" cy="7" r="5.75" className={styles.statusRing} />
          {status === 'progress' && <path d="M7 7V3.5a3.5 3.5 0 0 1 0 7z" className={styles.statusFill} />}
        </>
      )}
    </svg>
  );
}

type Person = { name: string; photo: string };

const KOFI: Person = { name: 'Kofi Mensah', photo: kofi };
const IMANI: Person = { name: 'Imani Okafor', photo: imani };
const ROSA: Person = { name: 'Rosa Delgado', photo: rosa };
const NOAH: Person = { name: 'Noah Moretti', photo: noah };
const ERIK: Person = { name: 'Erik Lindqvist', photo: erik };
const CLARA: Person = { name: 'Clara Weiss', photo: clara };

/** The issue the palette acts on passes between these two: each round assigns it to the other one. */
const PAIR = [KOFI, IMANI];

function Avatar({ person }: { person?: Person }) {
  if (!person) return <span className={`${styles.avatar} ${styles.unassigned}`} />;
  return <img className={styles.avatar} src={person.photo} alt="" width={20} height={20} />;
}

type Label = 'Bug' | 'Feature' | 'Design' | 'Performance';

/** Label dots keep their color in both themes; only the dot is colored, so the text keeps its contrast. */
const LABEL_COLORS: Record<Label, string> = {
  Bug: '#e5484d',
  Feature: '#3e8ef7',
  Design: '#d6409f',
  Performance: '#f76b15',
};

type Issue = { id: string; title: string; label: Label; due?: string; assignee?: Person };

/** The issue the keyboard is on in the list, and the one the palette's commands act on. */
const FOCUSED = 'WEB-218';

/** "Today" in this picture is Wednesday, November 18. */
const GROUPS: { status: Status; name: string; count: number; issues: Issue[] }[] = [
  {
    status: 'progress',
    name: 'In Progress',
    count: 3,
    issues: [
      {
        id: 'WEB-221',
        title: 'Usage chart drops the last day of the month',
        label: 'Bug',
        due: 'Nov 20',
        assignee: ROSA,
      },
      { id: FOCUSED, title: 'Onboarding checklist skips the invite step', label: 'Feature', due: 'Nov 23' },
      {
        id: 'WEB-215',
        title: 'Speed up search on the members page',
        label: 'Performance',
        due: 'Nov 24',
        assignee: NOAH,
      },
    ],
  },
  {
    status: 'todo',
    name: 'Todo',
    count: 4,
    issues: [
      { id: 'WEB-231', title: 'Reassign reviewers when someone is away', label: 'Feature' },
      { id: 'WEB-212', title: 'Password reset email arrives late', label: 'Bug', due: 'Nov 19', assignee: ERIK },
      { id: 'WEB-209', title: 'Empty state for archived projects', label: 'Design', due: 'Nov 26', assignee: CLARA },
      { id: 'WEB-204', title: 'Export invoices as CSV', label: 'Feature', due: 'Dec 2', assignee: ROSA },
    ],
  },
  {
    status: 'done',
    name: 'Done',
    count: 12,
    issues: [
      { id: 'WEB-201', title: 'Remember the last workspace you opened', label: 'Feature', assignee: KOFI },
      { id: 'WEB-198', title: 'Invite links expire after one hour', label: 'Bug', assignee: IMANI },
    ],
  },
];

type Group = 'Suggestions' | 'Issues' | 'Navigation';

const GROUP_ORDER: Group[] = ['Suggestions', 'Issues', 'Navigation'];

type Command = {
  group: Group;
  label: string;
  icon: ReactNode;
  /** The issue's id, for issues: shown before the title and searched with it. */
  issue?: string;
  /** Keys in the order they're pressed; each inner list is pressed together ("G then I" is [['G'], ['I']]). */
  keys?: string[][];
  /** In the list before anything is typed. */
  top?: boolean;
};

/** Everything the palette can find. The third suggestion assigns the issue to whoever doesn't have it yet. */
function commandsFor(target: Person): Command[] {
  return [
    { group: 'Suggestions', label: 'Create new issue', icon: <Icon d={ICONS.compose} />, keys: [['C']], top: true },
    { group: 'Suggestions', label: 'Assign to…', icon: <Icon d={ICONS.assign} />, keys: [['A']], top: true },
    { group: 'Suggestions', label: 'Assign to me', icon: <Icon d={ICONS.me} />, keys: [['I']] },
    { group: 'Suggestions', label: `Assign to ${target.name}`, icon: <Avatar person={target} /> },
    {
      group: 'Suggestions',
      label: 'Change status…',
      icon: <StatusIcon status="progress" />,
      keys: [['S']],
      top: true,
    },
    {
      group: 'Issues',
      issue: 'WEB-231',
      label: 'Reassign reviewers when someone is away',
      icon: <StatusIcon status="todo" />,
    },
    {
      group: 'Issues',
      issue: 'WEB-212',
      label: 'Password reset email arrives late',
      icon: <StatusIcon status="todo" />,
    },
    { group: 'Navigation', label: 'Go to inbox', icon: <Icon d={ICONS.inbox} />, keys: [['G'], ['I']], top: true },
    {
      group: 'Navigation',
      label: 'Go to project…',
      icon: <Icon d={ICONS.project} />,
      keys: [['⌘', '⇧', 'P']],
      top: true,
    },
    { group: 'Navigation', label: 'Go to assigned issues', icon: <Icon d={ICONS.myIssues} />, keys: [['G'], ['A']] },
  ];
}

/** What the palette lists for a query: the top commands for none, else every command whose text contains it. */
function search(commands: Command[], query: string) {
  if (query === '') return commands.filter((command) => command.top);
  return commands.filter((command) =>
    `${command.issue ?? ''} ${command.label}`.toLowerCase().includes(query.toLowerCase()),
  );
}

/**
 * One beat of the loop: whether the palette is open, what's typed, which row is highlighted (in the filtered list),
 * how long it lasts. `typing` keeps the caret solid, `chosen` flashes the highlighted row (↵), and `assigned` shows
 * the issue with its new assignee once the palette has closed.
 */
type Step = {
  open: boolean;
  query: string;
  active: number;
  ms: number;
  typing?: boolean;
  chosen?: boolean;
  assigned?: boolean;
};

const QUERY = 'assign';

/**
 * The palette opens on WEB-218, "assign" types out and the list filters with every key, the highlight steps down to
 * "Assign to Imani Okafor", ↵ flashes it and the palette closes: in the list behind, WEB-218's avatar changes from
 * Kofi to Imani. Then it opens again, and this time hands the issue back to Kofi.
 */
const STEPS: Step[] = [
  { open: true, query: '', active: 0, ms: 1100 },
  ...[...QUERY].map((_, index) => ({
    open: true,
    query: QUERY.slice(0, index + 1),
    active: 0,
    typing: true,
    ms: 95,
  })),
  { open: true, query: QUERY, active: 0, ms: 800 },
  { open: true, query: QUERY, active: 1, ms: 650 },
  { open: true, query: QUERY, active: 2, ms: 750 },
  { open: true, query: QUERY, active: 2, chosen: true, ms: 240 },
  { open: false, query: QUERY, active: 2, assigned: true, ms: 2600 },
];

/** Reduced motion: the query typed, the second row highlighted. */
const FINAL = STEPS.findIndex((step) => step.query === QUERY && step.active === 1);

/** Steps through the loop while `playing`; `round` counts the loops, so the issue can change hands each time. */
function useLoop(playing: boolean, final: boolean) {
  const [at, setAt] = useState({ index: 0, round: 0 });

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(
      () =>
        setAt(({ index, round }) =>
          index === STEPS.length - 1 ? { index: 0, round: round + 1 } : { index: index + 1, round },
        ),
      STEPS[at.index].ms,
    );
    return () => window.clearTimeout(id);
  }, [at.index, playing, final]);

  return final ? { step: STEPS[FINAL], round: 0 } : { step: STEPS[at.index], round: at.round };
}

function Shortcut({ keys }: { keys: string[][] }) {
  return (
    <span className={styles.shortcut} data-inspect="command-palette-shortcut">
      {keys.map((chord, index) => (
        <Fragment key={index}>
          {index > 0 && <span className={styles.then}>then</span>}
          {chord.map((key) => (
            <kbd key={key} className={styles.kbd}>
              {key}
            </kbd>
          ))}
        </Fragment>
      ))}
    </span>
  );
}

/** The issue tracker behind the palette: the team's issues, grouped by status, with the sidebar on wider tiles. */
function TrackerApp({ assignee }: { assignee: Person }) {
  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <span className={styles.workspace}>
          <span className={styles.workspaceLogo}>T</span>
          Tidewater
          <Icon d={ICONS.chevron} />
          <span className={styles.workspaceTools}>
            <Icon d={ICONS.search} />
            <Icon d={ICONS.compose} />
          </span>
        </span>
        <span className={styles.navItem}>
          <Icon d={ICONS.inbox} />
          Inbox
          <span className={styles.navBadge}>2</span>
        </span>
        <span className={styles.navItem}>
          <Icon d={ICONS.myIssues} />
          My issues
        </span>
        <span className={styles.navLabel}>Your teams</span>
        <span className={styles.navItem}>
          <span className={styles.teamIcon}>W</span>
          Web
          <Icon d={ICONS.chevron} />
        </span>
        <span className={`${styles.navItem} ${styles.navSub}`} aria-current="page">
          <Icon d={ICONS.issues} />
          Issues
        </span>
        <span className={`${styles.navItem} ${styles.navSub}`}>
          <Icon d={ICONS.cycles} />
          Cycles
        </span>
        <span className={`${styles.navItem} ${styles.navSub}`}>
          <Icon d={ICONS.project} />
          Projects
        </span>
        <span className={styles.navItem}>
          <span className={`${styles.teamIcon} ${styles.teamOther}`}>M</span>
          Mobile
          <Icon d={ICONS.chevronRight} />
        </span>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <span className={styles.crumb}>
            <span className={styles.teamIcon}>W</span>
            Web
          </span>
          <Icon d={ICONS.chevronRight} />
          <span>Issues</span>
          <span className={styles.tabs}>
            <span className={styles.tabActive}>All issues</span>
            <span className={styles.tab}>Active</span>
            <span className={styles.tab}>Backlog</span>
          </span>
          <span className={styles.headerTools}>
            <Icon d={ICONS.filter} />
            <Icon d={ICONS.sliders} />
          </span>
        </header>

        {GROUPS.map((group) => (
          <section key={group.status}>
            <div className={styles.groupHeader}>
              <StatusIcon status={group.status} />
              {group.name}
              <span className={styles.groupCount}>{group.count}</span>
            </div>
            {group.issues.map((issue) => {
              const focused = issue.id === FOCUSED;
              return (
                <div key={issue.id} className={styles.row} data-focused={focused || undefined}>
                  <StatusIcon status={group.status} />
                  <span className={styles.issueId}>{issue.id}</span>
                  <span className={styles.title}>{issue.title}</span>
                  <span className={styles.label}>
                    <span className={styles.labelDot} style={{ background: LABEL_COLORS[issue.label] }} />
                    {issue.label}
                  </span>
                  {focused ? (
                    // Both people sit in the same spot; the one the issue is assigned to shows
                    <span className={styles.assignee}>
                      {PAIR.map((person) => (
                        <span
                          key={person.name}
                          className={styles.assigneeFace}
                          data-on={person === assignee || undefined}
                        >
                          <Avatar person={person} />
                        </span>
                      ))}
                    </span>
                  ) : (
                    <Avatar person={issue.assignee} />
                  )}
                  <span className={styles.due}>{issue.due}</span>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
}

/**
 * Command palette: the ⌘K menu of an issue tracker, open over its list under a scrim. A chip names the issue it acts
 * on, a query runs the search, results come in groups with their keyboard shortcuts, and a footer lists the keys.
 * The loop: "assign" types out and the results filter with every key, the highlight steps down twice, ↵ flashes the
 * row and the palette closes on the result (the issue's avatar changes), then it opens again. Holds while inspected.
 */
export function CommandPalette() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const { step, round } = useLoop(playing, final);
  // The issue is with one of the pair at the start of a round and with the other once it's assigned
  const assignee = PAIR[(round + (step.assigned ? 1 : 0)) % 2];
  const target = PAIR[(round + 1) % 2];
  const results = search(commandsFor(target), step.query);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-open={step.open || undefined}
      data-typing={step.typing || undefined}
      data-chosen={step.chosen || undefined}
      data-paused={!playing || undefined}
      data-still={final || undefined}
    >
      <TrackerApp assignee={assignee} />

      <div className={styles.scrim} data-inspect="command-palette-scrim" />

      <div className={styles.palette} role="dialog" aria-label="Command menu" data-inspect="command-palette">
        <span className={styles.context}>
          <StatusIcon status="progress" />
          <span className={styles.contextId}>{FOCUSED}</span>
          <span className={styles.contextTitle}>Onboarding checklist skips the invite step</span>
        </span>

        <div className={styles.input} role="combobox" aria-expanded="true" data-inspect="command-palette-input">
          {step.query}
          <span className={styles.caret} />
          {step.query === '' && <span className={styles.placeholder}>Type a command or search…</span>}
        </div>

        <div className={styles.list} role="listbox">
          {GROUP_ORDER.map((group) => {
            const commands = results.filter((command) => command.group === group);
            if (commands.length === 0) return null;
            return (
              <div key={group} className={styles.group} role="group" aria-label={group}>
                <span className={styles.groupLabel} data-inspect="command-palette-group">
                  {group}
                </span>
                {commands.map((command) => {
                  const active = results.indexOf(command) === step.active;
                  return (
                    <div
                      key={command.issue ?? command.label}
                      className={styles.option}
                      role="option"
                      aria-selected={active}
                      data-inspect={active ? 'command-palette-active' : undefined}
                    >
                      <span className={styles.optionIcon}>{command.icon}</span>
                      <span className={styles.optionLabel}>
                        {command.issue && <span className={styles.optionId}>{command.issue}</span>}
                        {command.label}
                      </span>
                      {command.keys && <Shortcut keys={command.keys} />}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <span className={styles.hint}>
            <kbd className={styles.kbd}>↑</kbd>
            <kbd className={styles.kbd}>↓</kbd>
            Navigate
          </span>
          <span className={styles.hint}>
            <kbd className={styles.kbd}>↵</kbd>
            Open
          </span>
          <span className={styles.hint}>
            <kbd className={styles.kbd}>esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
