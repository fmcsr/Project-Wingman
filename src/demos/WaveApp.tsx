import type { ReactNode } from 'react';
import { StatusBar } from './StatusBar';
import styles from './WaveApp.module.css';

/** Each habit takes the color of the time of day it belongs to, from dawn to night. */
type Hue = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

/** One day in a habit's week: done, missed, or today (open, partly done or done). */
type Day = 'done' | 'missed' | 'open' | 'partial';

type Habit = {
  name: string;
  /** The meta line under the name: when it's due, or how far along it is. */
  detail: string;
  /** Days in a row, up to and including the last day it was done. */
  streak: number;
  hue: Hue;
  /** Today's state: 0 = to do, 1 = done; in between for habits counted in steps (6 of 8 glasses). */
  progress: number;
  /** Friday to Thursday (today). */
  week: Day[];
  icon: ReactNode;
};

/**
 * Thursday, November 12, 9:41 PM. Four of six habits are done; water stands at 6 of 8 glasses and reading is due at
 * 10:00 PM. Sunday to Wednesday were perfect days (every habit done); Friday missed Journal and Saturday missed
 * Stretch and Water. Each streak counts back from the last day the habit was done, so it matches the week dots.
 */
const MEDITATE: Habit = {
  name: 'Meditate',
  detail: '10 min',
  streak: 41,
  hue: 'dawn',
  progress: 1,
  week: ['done', 'done', 'done', 'done', 'done', 'done', 'done'],
  icon: (
    <>
      <path d="M12 19.5c-3.4 0-6.6-2.3-7.5-6.2 2.8-.4 5.6.9 7.5 3.5 1.9-2.6 4.7-3.9 7.5-3.5-.9 3.9-4.1 6.2-7.5 6.2z" />
      <path d="M12 16.5c-1.5-1.4-2.5-3.4-2.5-5.6 0-2 .9-4 2.5-5.6 1.6 1.6 2.5 3.6 2.5 5.6 0 2.2-1 4.2-2.5 5.6z" />
    </>
  ),
};

const STRETCH: Habit = {
  name: 'Stretch',
  detail: '15 min',
  streak: 5,
  hue: 'morning',
  progress: 1,
  week: ['done', 'missed', 'done', 'done', 'done', 'done', 'done'],
  icon: (
    <>
      <circle cx="12" cy="4.8" r="1.9" />
      <path d="M4.5 8.6c2.5 1.1 5 1.6 7.5 1.6s5-.5 7.5-1.6M12 10.2v4.6m0 0-3.2 5.7M12 14.8l3.2 5.7" />
    </>
  ),
};

const WALK: Habit = {
  name: 'Walk',
  detail: '9,214 steps',
  streak: 18,
  hue: 'midday',
  progress: 1,
  week: ['done', 'done', 'done', 'done', 'done', 'done', 'done'],
  icon: (
    <>
      <circle cx="13.5" cy="4.6" r="1.9" />
      <path d="M9.5 21l2.6-6.4 2.9 2.4V21M8 12.2l2.6-4.4 3.6 1.1 1.6 3.3 2.7 1M12.1 14.6l-1.5-6.8" />
    </>
  ),
};

const WATER: Habit = {
  name: 'Drink water',
  detail: '6 of 8 glasses',
  streak: 4,
  hue: 'afternoon',
  progress: 6 / 8,
  week: ['done', 'missed', 'done', 'done', 'done', 'done', 'partial'],
  icon: <path d="M12 3.5s-6 6.3-6 10.4a6 6 0 0 0 12 0c0-4.1-6-10.4-6-10.4z" />,
};

const JOURNAL: Habit = {
  name: 'Journal',
  detail: '9:00 PM',
  streak: 6,
  hue: 'evening',
  progress: 1,
  week: ['missed', 'done', 'done', 'done', 'done', 'done', 'done'],
  icon: (
    <>
      <rect x="5.5" y="3.5" width="13" height="17" rx="2.5" />
      <path d="M9 3.5v17M12 8.5h3.5M12 12h3.5" />
    </>
  ),
};

const READ: Habit = {
  name: 'Read',
  detail: '10:00 PM',
  streak: 23,
  hue: 'night',
  progress: 0,
  week: ['done', 'done', 'done', 'done', 'done', 'done', 'open'],
  icon: <path d="M12 7c-1.9-1.5-4.6-2.1-8-1.9v12.7c3.4-.2 6.1.4 8 1.9 1.9-1.5 4.6-2.1 8-1.9V5.1c-3.4-.2-6.1.4-8 1.9zm0 0v12.7" />,
};

/** The ring goes around the day clockwise from the top, one segment per habit. */
const DAY = [MEDITATE, STRETCH, WALK, WATER, JOURNAL, READ];

const SECTIONS: { title: string; habits: Habit[] }[] = [
  { title: 'Tonight', habits: [READ, WATER] },
  { title: 'Done', habits: [JOURNAL, WALK, STRETCH, MEDITATE] },
];

/** Initials of the last seven days, Friday to today (Thursday). */
const WEEKDAYS = ['F', 'S', 'S', 'M', 'T', 'W', 'T'];

/*
 * Segmented ring: six arcs on one circle (r = 43, stroke 11, round caps). Each arc is a dash of the circle's outline,
 * rotated to its slot; the round caps add 5.5 units at each end, so the dash leaves room for a 3.5-unit visible gap.
 */
const RADIUS = 43;
const STROKE = 11;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SLOT = CIRCUMFERENCE / DAY.length;
const DASH = SLOT - STROKE - 3.5;
const DASH_DEGREES = (DASH / CIRCUMFERENCE) * 360;

const done = DAY.filter((habit) => habit.progress === 1).length;

const TABS: { label: string; active?: boolean; icon: ReactNode }[] = [
  {
    label: 'Today',
    active: true,
    icon: (
      <path d="M12 3.6a8.4 8.4 0 0 1 7.6 4.8M20.3 11.1a8.4 8.4 0 0 1-4 7.9M13.1 20.3a8.4 8.4 0 0 1-8.8-5.1M3.6 12.2A8.4 8.4 0 0 1 9 4.2" />
    ),
  },
  { label: 'Trends', icon: <path d="M5 20v-6M10 20V9M15 20v-8M20 20V4" /> },
  {
    label: 'Habits',
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="2" />
        <rect x="13" y="4" width="7" height="7" rx="2" />
        <rect x="4" y="13" width="7" height="7" rx="2" />
        <rect x="13" y="13" width="7" height="7" rx="2" />
      </>
    ),
  },
];

function Flame() {
  return (
    <svg className={styles.flame} viewBox="0 0 24 24" width="11" height="11">
      <path d="M12 22c-4 0-7-2.7-7-6.6 0-3.1 1.9-5.2 3.6-6.8.2 1.6 1 2.8 2.2 3.4-.4-3.8 1.2-7.2 4.2-9.5.2 2.8 1.5 4.6 3 6.4 1.4 1.7 2.5 3.4 2.5 6.1 0 4.1-3.3 7-8.5 7z" />
    </svg>
  );
}

/** Round check button: an empty ring to do, an arc while counting, a filled circle with a check when done. */
function Check({ habit }: { habit: Habit }) {
  if (habit.progress === 1) {
    return (
      <span className={styles.checkDone} data-inspect="habit-check">
        <svg viewBox="0 0 24 24" width="15" height="15">
          <path d="M6.5 12.5l3.5 3.5 7.5-8" />
        </svg>
      </span>
    );
  }
  return (
    <span className={styles.check} data-inspect="habit-check">
      {habit.progress > 0 && (
        <>
          {/* The arc rides on the gray track: radius 11.9 with a 2.2 stroke covers the track's outer 2.2px */}
          <svg className={styles.checkArc} viewBox="0 0 26 26">
            <circle cx="13" cy="13" r="11.9" pathLength="100" strokeDasharray={`${habit.progress * 100} 100`} />
          </svg>
          <svg className={styles.checkPlus} viewBox="0 0 24 24" width="12" height="12">
            <path d="M12 6v12M6 12h12" />
          </svg>
        </>
      )}
    </span>
  );
}

/** Example project [03]: a habit tracker's Today screen in the iOS idiom. Not interactive; for inspection only. */
export function WaveApp() {
  return (
    <div className={styles.app}>
      <StatusBar />

      <header className={styles.header}>
        <div data-inspect="large-title">
          <p className={styles.date}>Thursday, November 12</p>
          <h3 className={styles.largeTitle}>Today</h3>
        </div>
        <span className={styles.avatar} data-inspect="avatar">
          FC
        </span>
      </header>

      <div className={styles.switcher} data-inspect="day-week-switcher">
        <span className={styles.segmentActive}>Day</span>
        <span className={styles.segment}>Week</span>
      </div>

      <section className={styles.summary} data-inspect="today-summary">
        <span className={styles.ring} data-inspect="progress-ring">
          <svg viewBox="0 0 100 100">
            {DAY.map((habit, index) => {
              const rotate = -90 + (index + 0.5) * (360 / DAY.length) - DASH_DEGREES / 2;
              return (
                <g key={habit.name} className={styles[habit.hue]} transform={`rotate(${rotate} 50 50)`}>
                  <circle
                    className={styles.ringTrack}
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    strokeDasharray={`${DASH} ${CIRCUMFERENCE}`}
                  />
                  {habit.progress > 0 && (
                    <circle
                      className={styles.ringValue}
                      cx="50"
                      cy="50"
                      r={RADIUS}
                      strokeDasharray={`${DASH * habit.progress} ${CIRCUMFERENCE}`}
                    />
                  )}
                </g>
              );
            })}
          </svg>
          <span className={styles.ringCount}>
            {done}
            <span className={styles.ringTotal}>of {DAY.length}</span>
          </span>
        </span>

        <div className={styles.summaryText}>
          <p className={styles.summaryTitle}>2 to go</p>
          <ul className={styles.legend}>
            <li className={styles.night}>Read at 10 PM</li>
            <li className={styles.afternoon}>2 glasses of water</li>
          </ul>
          <span className={styles.streakChip} data-inspect="streak-count">
            <Flame />4 perfect days
          </span>
        </div>
      </section>

      <div className={styles.lists}>
        {SECTIONS.map((section) => (
          <section key={section.title} className={styles.section}>
            <div className={styles.sectionHeader} data-inspect="list-section-header">
              <span>
                {section.title} <span className={styles.sectionCount}>{section.habits.length}</span>
              </span>
              <span className={styles.weekdays}>
                {WEEKDAYS.map((day, index) => (
                  <span key={index} className={index === WEEKDAYS.length - 1 ? styles.today : undefined}>
                    {day}
                  </span>
                ))}
              </span>
            </div>

            <ul className={styles.list}>
              {section.habits.map((habit) => (
                <li key={habit.name} className={`${styles.row} ${styles[habit.hue]}`} data-inspect="list-row">
                  <span className={styles.icon} data-inspect="habit-icon">
                    <svg viewBox="0 0 24 24" width="17" height="17">
                      {habit.icon}
                    </svg>
                  </span>
                  <span className={styles.text}>
                    <span className={styles.name}>{habit.name}</span>
                    <span className={styles.meta}>
                      {habit.detail}
                      <span className={styles.streak} data-inspect="streak-count">
                        <Flame />
                        {habit.streak}
                      </span>
                    </span>
                  </span>
                  <span className={styles.dots} data-inspect="streak-dots">
                    {habit.week.map((day, index) => (
                      <span key={index} className={styles[day]} />
                    ))}
                  </span>
                  <Check habit={habit} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        {TABS.map((tab) => (
          <span key={tab.label} className={tab.active ? styles.tabActive : styles.tab}>
            <svg viewBox="0 0 24 24" width="21" height="21">
              {tab.icon}
            </svg>
            {tab.label}
          </span>
        ))}
      </nav>

      <span className={styles.fab} data-inspect="fab">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
