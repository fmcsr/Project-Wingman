import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion, useEvery } from '../../../demos/motion';
import styles from './CadenceSite.module.css';
import amaniPhoto from './photos/amani.webp';
import danielPhoto from './photos/daniel.webp';
import jonasPhoto from './photos/jonas.webp';
import leilaPhoto from './photos/leila.webp';
import marcusPhoto from './photos/marcus.webp';
import sofiaPhoto from './photos/sofia.webp';

/** Line icons on a 20px grid; stroke color and width come from the stylesheet. */
const ICONS = {
  chevronLeft: 'M12.25 5L7.25 10l5 5',
  chevronRight: 'M7.75 5l5 5-5 5',
  chevronDown: 'M6.25 8.25L10 12l3.75-3.75',
  search: 'M8.75 14.5a5.75 5.75 0 1 0 0-11.5 5.75 5.75 0 0 0 0 11.5zM13 13l4 4',
  /** A window with a column on its left: show or hide the sidebar */
  sidebar:
    'M4.25 4h11.5A1.25 1.25 0 0 1 17 5.25v9.5A1.25 1.25 0 0 1 15.75 16H4.25A1.25 1.25 0 0 1 3 14.75v-9.5A1.25 1.25 0 0 1 4.25 4zM8 4v12',
  clock: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 6.5V10l2.5 1.5',
  /** Two arrows chasing each other: a repeating event */
  repeat:
    'M4.5 9.25V8.5A2.5 2.5 0 0 1 7 6h8.5M13.25 3.75L15.5 6l-2.25 2.25M15.5 10.75v.75A2.5 2.5 0 0 1 13 14H4.5M6.75 16.25L4.5 14l2.25-2.25',
  video:
    'M3.25 6.25a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1h-7.5a1 1 0 0 1-1-1zM12.75 8.6l4-2.35v7.5l-4-2.35',
  copy:
    'M7.75 7.75h7.5a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1h-7.5a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1zM13.25 4.75v-.5a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1v7.5a1 1 0 0 0 1 1h.5',
  guests:
    'M7.5 9.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5zM2.75 16.25a4.75 4.75 0 0 1 9.5 0M13.25 9.25a2.25 2.25 0 1 0 0-4.5M14.75 12.1a4 4 0 0 1 2.5 3.9',
  mail: 'M3.75 5.25h12.5a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1H3.75a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1zM3.25 6l6.75 5 6.75-5',
  pin: 'M10 17.25s-5-4.6-5-8.5a5 5 0 0 1 10 0c0 3.9-5 8.5-5 8.5zM10 10.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5z',
  notes: 'M4 5.5h12M4 9h12M4 12.5h8',
  bell:
    'M10 3.25a4.75 4.75 0 0 0-4.75 4.75v3.6L3.75 14.5h12.5l-1.5-2.9V8A4.75 4.75 0 0 0 10 3.25zM8.1 16.75a1.95 1.95 0 0 0 3.8 0',
  check: 'M5 10.5l3.25 3.25L15 7',
  close: 'M5.25 5.25l9.5 9.5M14.75 5.25l-9.5 9.5',
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

/** Cadence's own mark: a C that stops short of closing, and the dot where it would, on an iris tile. */
function CadenceLogo() {
  return (
    <svg className={styles.logoMark} viewBox="0 0 24 24" aria-hidden="true">
      <rect className={styles.logoTile} width="24" height="24" rx="6.5" />
      <path className={styles.logoC} d="M16.1 8.1a5.6 5.6 0 1 0 0 7.8" />
      <circle className={styles.logoDot} cx="17.4" cy="12" r="1.75" />
    </svg>
  );
}

type Person = { name: string; photo: string };

/** The signed-in user. */
const SOFIA: Person = { name: 'Sofia Marin', photo: sofiaPhoto };
const JONAS: Person = { name: 'Jonas Weber', photo: jonasPhoto };
const LEILA: Person = { name: 'Leila Haddad', photo: leilaPhoto };
const AMANI: Person = { name: 'Amani Cole', photo: amaniPhoto };
const MARCUS: Person = { name: 'Marcus Reyes', photo: marcusPhoto };
const DANIEL: Person = { name: 'Daniel Ortiz', photo: danielPhoto };

/** Each calendar's color. Events show it as a pale tint with a solid bar; the sidebar as a filled box. */
type Hue = 'blue' | 'teal' | 'orange' | 'green' | 'pink' | 'gray';

/** The calendars of both accounts. A hidden calendar keeps its place in the list with an empty box. */
const CALENDAR_GROUPS: { account: string; calendars: { name: string; hue: Hue; hidden?: boolean }[] }[] = [
  {
    account: 'sofia@fernway.co',
    calendars: [
      { name: 'Sofia Marin', hue: 'blue' },
      { name: 'Product team', hue: 'teal' },
      { name: 'Launches', hue: 'orange' },
    ],
  },
  {
    account: 'Personal',
    calendars: [
      { name: 'Personal', hue: 'green' },
      { name: 'Birthdays', hue: 'pink' },
      { name: 'Holidays in Germany', hue: 'gray', hidden: true },
    ],
  },
];

type MiniDay = { day: number; outside?: boolean };

const days = (from: number, to: number, outside?: boolean): MiniDay[] =>
  Array.from({ length: to - from + 1 }, (_, index) => ({ day: from + index, outside }));

/** November 2026 in weeks starting on Monday; the first and last rows run into October and December. */
const MONTH: MiniDay[][] = [
  [...days(26, 31, true), ...days(1, 1)],
  days(2, 8),
  days(9, 15),
  days(16, 22),
  days(23, 29),
  [...days(30, 30), ...days(1, 6, true)],
];
const TODAY = 17;
/** The days on screen: Monday to Friday of this week, since weekends are hidden. */
const SHOWN = [16, 17, 18, 19, 20];

/** The grid runs from 7 AM to 9 PM, as if scrolled to the working day. Times are hours from midnight: 14.5 is 2:30. */
const FIRST_HOUR = 7;
const LAST_HOUR = 21;
/** "Now" in this picture: Tuesday, November 17, at 1:24 PM. */
const NOW = 13.4;
/** The selected event starts at 2:00 PM. */
const STARTS = 14;
/**
 * While the week is in view, the clock runs on a minute every few seconds, to 1:59 PM, then rests. Each minute moves
 * the line down a little and shortens the countdown in the panel; still pictures and reduced motion keep 1:24.
 */
const TICK_MS = 5000;
const LAST_TICK = 35;
/** An hour label steps aside once the time label comes this close (in hours), as calendars do. */
const LABEL_ROOM = 0.3;

const period = (hours: number) => (hours < 12 ? 'AM' : 'PM');

/** "1:24", or with `compact` "2" for a whole hour and "2:30" otherwise. */
function clock(hours: number, compact = false) {
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  const hour = ((whole + 11) % 12) + 1;
  return compact && minutes === 0 ? `${hour}` : `${hour}:${String(minutes).padStart(2, '0')}`;
}

/** "10:30 – 11:30 AM", or "11 AM – 12 PM" when the range crosses noon. */
function range(start: number, end: number) {
  const startText = period(start) === period(end) ? clock(start, true) : `${clock(start, true)} ${period(start)}`;
  return `${startText} – ${clock(end, true)} ${period(end)}`;
}

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

type CalendarEvent = {
  title: string;
  start: number;
  end: number;
  hue: Hue;
  /** Past events fade; a tentative one (you answered Maybe) is striped; the selected one is filled in. */
  state?: 'past' | 'tentative' | 'selected';
};

type Day = {
  key: DayKey;
  weekday: string;
  date: number;
  events: CalendarEvent[];
  /** Two events that overlap, shown side by side in one block. */
  overlap?: [CalendarEvent, CalendarEvent];
};

const STANDUP = { title: 'Standup', start: 9.5, end: 10, hue: 'teal' } as const;

const WEEK: Day[] = [
  {
    key: 'mon',
    weekday: 'Mon',
    date: 16,
    events: [
      { title: 'Gym', start: 7, end: 8, hue: 'green', state: 'past' },
      { ...STANDUP, state: 'past' },
      { title: 'Roadmap sync', start: 11, end: 12, hue: 'blue', state: 'past' },
      { title: 'Lunch with Marcus', start: 12.5, end: 13.5, hue: 'green', state: 'past' },
      { title: 'Focus: offline mode PRD', start: 15, end: 16.5, hue: 'blue', state: 'past' },
    ],
  },
  {
    key: 'tue',
    weekday: 'Tue',
    date: 17,
    events: [
      { ...STANDUP, state: 'past' },
      { title: 'Pricing interviews', start: 10.5, end: 11.5, hue: 'blue', state: 'past' },
      { title: 'Lunch', start: 12, end: 12.75, hue: 'green', state: 'past' },
      { title: 'Checkout design review', start: 14, end: 15, hue: 'blue', state: 'selected' },
      { title: '1:1 Jonas', start: 15.5, end: 16, hue: 'blue' },
      { title: 'Climbing', start: 17.5, end: 19, hue: 'green' },
    ],
  },
  {
    key: 'wed',
    weekday: 'Wed',
    date: 18,
    events: [
      STANDUP,
      { title: 'Lunch & learn: accessibility', start: 13, end: 14, hue: 'teal' },
      { title: 'Partner call: Tessel Pay', start: 16, end: 17, hue: 'blue' },
    ],
    overlap: [
      { title: 'Hiring panel', start: 11, end: 12, hue: 'blue' },
      { title: 'Launch review', start: 11.5, end: 12.5, hue: 'orange' },
    ],
  },
  {
    key: 'thu',
    weekday: 'Thu',
    date: 19,
    events: [
      STANDUP,
      { title: 'Offsite planning', start: 10, end: 11.5, hue: 'blue', state: 'tentative' },
      { title: 'Customer council', start: 14, end: 15, hue: 'blue' },
      { title: 'Design QA', start: 15.5, end: 16.5, hue: 'teal' },
      { title: 'Dinner for Ana', start: 18.5, end: 20.5, hue: 'green' },
    ],
  },
  {
    key: 'fri',
    weekday: 'Fri',
    date: 20,
    events: [
      STANDUP,
      { title: 'Release checklist', start: 10, end: 11, hue: 'orange' },
      { title: 'Team lunch', start: 12, end: 13, hue: 'teal' },
      { title: 'Sprint demo', start: 15, end: 16, hue: 'teal' },
    ],
  },
];

/** All-day events span from one day's column line to another's; the row grows a lane when two overlap. */
const ALL_DAY: { title: string; from: DayKey; to: DayKey | 'end'; hue: Hue; lane: number; past?: boolean }[] = [
  { title: 'Sprint 48', from: 'mon', to: 'tue', hue: 'teal', lane: 1, past: true },
  { title: 'Code freeze · Fernway 4.2', from: 'wed', to: 'end', hue: 'orange', lane: 1 },
  { title: 'Ana’s birthday', from: 'thu', to: 'fri', hue: 'pink', lane: 2 },
];

const INSPECT_IDS = {
  past: 'past-event',
  tentative: 'tentative-event',
  selected: 'selected-event',
} as const;

/**
 * One event on the grid, placed by its start and length; `origin` is the hour its container starts at. Half-hour
 * events put the time beside the title; longer ones put it under a title of up to one, two or three lines.
 */
function EventBlock({
  event,
  origin = FIRST_HOUR,
  half = false,
}: {
  event: CalendarEvent;
  origin?: number;
  /** Half of an overlapping pair: no inspect id of its own, and only its start time. */
  half?: boolean;
}) {
  const length = event.end - event.start;
  const short = length <= 0.5;
  const classes = [styles.event, styles[event.hue]];
  if (short) classes.push(styles.short);
  if (event.state) classes.push(styles[event.state]);
  const lines = length < 1 ? 1 : length < 1.5 || event.state === 'tentative' ? 2 : 3;
  const place = { '--start': event.start - origin, '--length': length, '--lines': lines } as CSSProperties;
  const samePeriod = period(event.start) === period(event.end);

  return (
    <div
      className={classes.join(' ')}
      style={place}
      role="button"
      aria-label={`${event.title}, ${range(event.start, event.end)}${event.state === 'tentative' ? ', maybe' : ''}`}
      aria-expanded={event.state === 'selected' ? true : undefined}
      data-inspect={half ? undefined : event.state ? INSPECT_IDS[event.state] : 'event-block'}
    >
      <span className={styles.eventTitle}>{event.title}</span>
      {half ? (
        <span className={styles.eventTime}>
          {clock(event.start)}
          <span className={styles.halfPeriod}> {period(event.start)}</span>
        </span>
      ) : (
        /* The start, then the end; narrow columns keep only the start, so it carries its own AM or PM there */
        <span className={styles.eventTime}>
          {clock(event.start, true)}
          {!short && (
            <>
              <span className={samePeriod ? styles.startPeriod : undefined}> {period(event.start)}</span>
              <span className={styles.eventEnd}>
                {' '}
                – {clock(event.end, true)} {period(event.end)}
              </span>
            </>
          )}
        </span>
      )}
      {event.state === 'tentative' && <span className={styles.eventNote}>Maybe</span>}
    </div>
  );
}

type Answer = 'yes' | 'maybe' | 'awaiting';

const ANSWER_LABELS: Record<Answer, string> = { yes: 'Going', maybe: 'Maybe', awaiting: 'Awaiting a reply' };

const GUESTS: { person: Person; answer: Answer; organizer?: boolean; you?: boolean }[] = [
  { person: JONAS, answer: 'yes', organizer: true },
  { person: SOFIA, answer: 'yes', you: true },
  { person: LEILA, answer: 'yes' },
  { person: AMANI, answer: 'yes' },
  { person: MARCUS, answer: 'maybe' },
  { person: DANIEL, answer: 'awaiting' },
];

/** A guest's photo with their answer on its corner: a check, a question mark, or an empty ring while they decide. */
function GuestAvatar({ guest }: { guest: (typeof GUESTS)[number] }) {
  return (
    <span className={styles.guestPhoto}>
      <img className={styles.avatar} src={guest.person.photo} alt="" draggable={false} />
      <span className={`${styles.answer} ${styles[guest.answer]}`} role="img" aria-label={ANSWER_LABELS[guest.answer]}>
        {guest.answer === 'yes' && (
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3.4 6.2l1.7 1.7 3.5-3.6" />
          </svg>
        )}
        {guest.answer === 'maybe' && (
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M4.6 4.7a1.45 1.45 0 0 1 2.8.5c0 1-1.4 1.1-1.4 2M6 8.9h.01" />
          </svg>
        )}
      </span>
    </span>
  );
}

/** Two events at the same time, side by side in one block, each half as wide. */
function OverlapBlock({ pair }: { pair: [CalendarEvent, CalendarEvent] }) {
  const [first, second] = pair;
  const place = { '--start': first.start - FIRST_HOUR, '--length': second.end - first.start } as CSSProperties;
  return (
    <div className={styles.overlap} style={place} data-inspect="overlapping-events">
      {pair.map((event) => (
        <EventBlock key={event.title} event={event} origin={first.start} half />
      ))}
    </div>
  );
}

/**
 * Library example: a calendar's week view, closely following Notion Calendar with weekends hidden. The sidebar holds
 * the mini month and the calendar list; the toolbar moves through weeks; the grid shows the all-day row, events in
 * their calendar's color, an overlapping pair, a tentative event, faded past events and the current time; the panel
 * on the right shows the selected event with its guests and a button to join the call. Every name and event is made
 * up. While the week is in view the clock runs on, a minute every few seconds, and holds while the line is inspected.
 * Not interactive; for inspection only.
 */
export function CadenceSite() {
  const hours = Array.from({ length: LAST_HOUR - FIRST_HOUR - 1 }, (_, index) => FIRST_HOUR + 1 + index);
  const clockMotion = useDemoMotion<HTMLDivElement>();
  const [ticks, setTicks] = useState(0);
  useEvery(TICK_MS, clockMotion.playing && ticks < LAST_TICK, () => setTicks((tick) => Math.min(tick + 1, LAST_TICK)));
  const now = NOW + ticks / 60;
  const startsIn = Math.round((STARTS - now) * 60);

  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.brandRow}>
              <span className={styles.brand} role="img" aria-label="Cadence">
                <CadenceLogo />
                <span>Cadence</span>
              </span>
              <span className={styles.iconButton} role="button" aria-label="Hide sidebar">
                <Icon d={ICONS.sidebar} />
              </span>
            </div>

            <div className={styles.mini} data-inspect="mini-calendar">
              <div className={styles.miniHead}>
                <span className={styles.miniMonth}>November 2026</span>
                <span className={styles.miniArrows}>
                  <span className={styles.miniArrow} role="button" aria-label="Previous month">
                    <Icon d={ICONS.chevronLeft} />
                  </span>
                  <span className={styles.miniArrow} role="button" aria-label="Next month">
                    <Icon d={ICONS.chevronRight} />
                  </span>
                </span>
              </div>
              <table className={styles.miniGrid}>
                <thead>
                  <tr>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((initial, index) => (
                      <th key={index} scope="col">
                        {initial}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MONTH.map((week) => (
                    <tr key={`${week[0].day}-${week[0].outside ?? false}`}>
                      {week.map(({ day, outside }) => {
                        const classes = [styles.miniDay];
                        if (outside) classes.push(styles.miniOutside);
                        if (!outside && SHOWN.includes(day)) classes.push(styles.miniShown);
                        if (!outside && day === SHOWN[0]) classes.push(styles.miniShownFirst);
                        if (!outside && day === SHOWN[SHOWN.length - 1]) classes.push(styles.miniShownLast);
                        if (!outside && day === TODAY) classes.push(styles.miniToday);
                        return (
                          <td key={`${day}-${outside ?? false}`} className={classes.join(' ')}>
                            <span aria-current={!outside && day === TODAY ? 'date' : undefined}>{day}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <span className={styles.meetWith} role="search" data-inspect="people-search">
              <Icon d={ICONS.search} />
              <span className={styles.meetWithText}>Meet with…</span>
            </span>

            <div className={styles.calendars} data-inspect="calendar-list">
              {CALENDAR_GROUPS.map((group) => (
                <section key={group.account}>
                  <span className={styles.groupHeader} role="button" aria-expanded="true">
                    <span className={styles.groupName}>{group.account}</span>
                    <Icon d={ICONS.chevronDown} className={styles.groupChevron} />
                  </span>
                  <ul>
                    {group.calendars.map((calendar) => (
                      <li key={calendar.name} className={styles.calendarRow}>
                        <span
                          className={`${styles.toggle} ${styles[calendar.hue]}`}
                          role="checkbox"
                          aria-checked={!calendar.hidden}
                          aria-label={calendar.name}
                        >
                          {!calendar.hidden && <Icon d={ICONS.check} />}
                        </span>
                        <span
                          className={calendar.hidden ? `${styles.calendarName} ${styles.off}` : styles.calendarName}
                        >
                          {calendar.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </aside>

        <section className={styles.main} aria-label="Week of November 16">
          <div className={styles.top}>
            <header className={styles.toolbar}>
              <span className={`${styles.iconButton} ${styles.showSidebar}`} role="button" aria-label="Show sidebar">
                <Icon d={ICONS.sidebar} />
              </span>
              <span className={styles.today} role="button" aria-keyshortcuts="T" data-inspect="today-button">
                Today
              </span>
              <span className={styles.arrows} data-inspect="period-arrows">
                <span className={styles.arrow} role="button" aria-label="Previous week" aria-keyshortcuts="J">
                  <Icon d={ICONS.chevronLeft} />
                </span>
                <span className={styles.arrow} role="button" aria-label="Next week" aria-keyshortcuts="K">
                  <Icon d={ICONS.chevronRight} />
                </span>
              </span>
              <h2 className={styles.range} data-inspect="date-range">
                <span className={styles.rangeWeek}>
                  Nov 16 – 20<span className={styles.year}>, 2026</span>
                </span>
                <span className={styles.rangeDays}>Nov 17 – 19</span>
              </h2>
              <span className={styles.toolbarEnd}>
                <span
                  className={`${styles.iconButton} ${styles.searchButton}`}
                  role="button"
                  aria-label="Search events"
                >
                  <Icon d={ICONS.search} />
                </span>
                <span className={styles.view} role="button" aria-haspopup="menu" data-inspect="view-switcher">
                  <span className={styles.viewWeek}>Week</span>
                  <span className={styles.viewDays}>3 days</span>
                  <Icon d={ICONS.chevronDown} />
                </span>
              </span>
            </header>

            <div className={styles.dayHeader} data-inspect="day-header">
              <span className={styles.zone}>GMT+1</span>
              {WEEK.map((day) => {
                const classes = [styles.dayName, styles[day.key]];
                if (day.date === TODAY) classes.push(styles.isToday);
                return (
                  <span
                    key={day.key}
                    className={classes.join(' ')}
                    aria-current={day.date === TODAY ? 'date' : undefined}
                  >
                    <span className={styles.weekday}>{day.weekday}</span>
                    <span className={styles.date}>{day.date}</span>
                  </span>
                );
              })}
            </div>

            <div className={styles.allDay} data-inspect="all-day-row">
              <span className={styles.allDayLabel}>All-day</span>
              {WEEK.map((day) => (
                <span key={day.key} className={`${styles.allDayCell} ${styles[day.key]}`} />
              ))}
              {ALL_DAY.map((item) => {
                const classes = [styles.allDayEvent, styles[item.hue]];
                if (item.past) classes.push(styles.past);
                if (item.from === 'mon') classes.push(styles.mon);
                return (
                  <span
                    key={item.title}
                    className={classes.join(' ')}
                    style={{ gridColumn: `${item.from} / ${item.to}`, gridRow: item.lane }}
                    role="button"
                  >
                    {item.title}
                  </span>
                );
              })}
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.gutter} data-inspect="time-gutter">
              {hours.map((hour) => (
                <span
                  key={hour}
                  className={Math.abs(now - hour) < LABEL_ROOM ? `${styles.hour} ${styles.hourHidden}` : styles.hour}
                  style={{ '--at': hour - FIRST_HOUR } as CSSProperties}
                >
                  {clock(hour, true)} {period(hour)}
                </span>
              ))}
            </div>

            {WEEK.map((day) => (
              <div key={day.key} className={`${styles.day} ${styles[day.key]}`}>
                {day.events.map((event) => (
                  <EventBlock key={`${event.title}-${event.start}`} event={event} />
                ))}
                {day.overlap && <OverlapBlock pair={day.overlap} />}
              </div>
            ))}

            <div
              ref={clockMotion.ref}
              className={styles.now}
              style={{ '--at': now - FIRST_HOUR } as CSSProperties}
              role="img"
              aria-label={`Now, ${clock(now)} PM`}
              data-inspect="current-time-line"
            >
              <span className={styles.nowLabel}>
                {clock(now)}
                <span className={styles.nowPeriod}> PM</span>
              </span>
              <span className={styles.nowWeek} />
              <span className={styles.nowToday} />
            </div>
          </div>
        </section>

        <aside className={styles.details} aria-label="Event details" data-inspect="event-details">
          <div className={styles.detailsInner}>
            <span className={styles.grabber} aria-hidden="true" />
            <div className={styles.detailsBar}>
              <span className={styles.calendarChip} role="button" aria-haspopup="listbox">
                <span className={`${styles.chipSwatch} ${styles.blue}`} />
                Sofia Marin
                <Icon d={ICONS.chevronDown} />
              </span>
              <span className={styles.iconButton} role="button" aria-label="More actions" aria-haspopup="menu">
                <Dots />
              </span>
              <span className={`${styles.iconButton} ${styles.closeSheet}`} role="button" aria-label="Close">
                <Icon d={ICONS.close} />
              </span>
            </div>

            <h3 className={styles.detailsTitle}>Checkout design review</h3>
            <div className={styles.when}>
              <Icon d={ICONS.clock} className={styles.rowIcon} />
              <span className={styles.whenText}>
                Tue, Nov 17 · <span className={styles.whenTime}>2:00 – 3:00 PM</span>
              </span>
              <span className={styles.whenMeta}>
                <span className={styles.repeat}>
                  <Icon d={ICONS.repeat} />
                  Weekly on Tuesday
                </span>
                <span className={styles.soon}>in {startsIn} min</span>
              </span>
            </div>

            <span className={styles.join} role="button" aria-keyshortcuts="Meta+J" data-inspect="join-button">
              <Icon d={ICONS.video} />
              <span className={styles.joinLabel}>Join call</span>
              <kbd className={styles.joinKeys}>⌘J</kbd>
            </span>
            <span className={styles.joinLink}>
              <span className={styles.joinUrl}>meet.cadence.app/kcv-rtpw</span>
              <span className={styles.copy} role="button" aria-label="Copy link">
                <Icon d={ICONS.copy} />
              </span>
            </span>

            <section className={styles.guests} aria-label="Guests" data-inspect="attendee-list">
              <header className={styles.guestsHead}>
                <Icon d={ICONS.guests} className={styles.rowIcon} />
                <span className={styles.guestsCount}>6 guests</span>
                <span className={styles.guestsSummary}>4 yes, 1 maybe, 1 awaiting</span>
                <span className={styles.mailGuests} role="button" aria-label="Email guests">
                  <Icon d={ICONS.mail} />
                </span>
              </header>
              <ul className={styles.guestList}>
                {GUESTS.map((guest) => (
                  <li key={guest.person.name} className={styles.guest}>
                    <GuestAvatar guest={guest} />
                    <span className={styles.guestName}>
                      {guest.person.name}
                      {guest.you && <span className={styles.you}> (you)</span>}
                    </span>
                    {guest.organizer && <span className={styles.role}>Organizer</span>}
                  </li>
                ))}
                <li className={styles.moreGuests} aria-hidden="true">
                  +2
                </li>
              </ul>
            </section>

            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt>
                  <Icon d={ICONS.pin} className={styles.rowIcon} />
                  <span className={styles.visuallyHidden}>Location</span>
                </dt>
                <dd>Atlas room · 3rd floor</dd>
              </div>
              <div className={styles.fact}>
                <dt>
                  <Icon d={ICONS.notes} className={styles.rowIcon} />
                  <span className={styles.visuallyHidden}>Description</span>
                </dt>
                <dd className={styles.description}>
                  Final pass on the new checkout before Wednesday’s launch review.
                </dd>
              </div>
              <div className={styles.fact}>
                <dt>
                  <Icon d={ICONS.bell} className={styles.rowIcon} />
                  <span className={styles.visuallyHidden}>Reminder</span>
                </dt>
                <dd>10 minutes before</dd>
              </div>
            </dl>

            <div className={styles.rsvp} role="radiogroup" aria-label="Going?" data-inspect="rsvp-control">
              <span className={styles.rsvpLabel}>Going?</span>
              <span className={styles.rsvpOptions}>
                <span className={styles.rsvpOption} role="radio" aria-checked="true">
                  Yes
                </span>
                <span className={styles.rsvpOption} role="radio" aria-checked="false">
                  No
                </span>
                <span className={styles.rsvpOption} role="radio" aria-checked="false">
                  Maybe
                </span>
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
