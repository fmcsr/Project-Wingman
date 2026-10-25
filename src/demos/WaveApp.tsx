import type { ReactNode } from 'react';
import { StatusBar } from './StatusBar';
import styles from './WaveApp.module.css';

const HABITS: { title: string; detail: string; color: string; on: boolean; icon: ReactNode }[] = [
  {
    title: 'Drink water',
    detail: '6 of 8 glasses',
    color: '#0a84ff',
    on: true,
    icon: <path d="M12 3s-6 6.5-6 10.5a6 6 0 0 0 12 0C18 9.5 12 3 12 3z" />,
  },
  {
    title: 'Meditate',
    detail: '10 min · morning',
    color: '#af52de',
    on: true,
    icon: <path d="M15 4a8 8 0 1 0 5 13A7 7 0 0 1 15 4z" />,
  },
  {
    title: 'Read',
    detail: '20 pages · evening',
    color: '#ff9f0a',
    on: false,
    icon: <path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z" />,
  },
];

const TABS: { label: string; active?: boolean; icon: ReactNode }[] = [
  { label: 'Today', active: true, icon: <path d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" /> },
  { label: 'Stats', icon: <path d="M5 20V11M12 20V5M19 20v-6" /> },
  { label: 'Habits', icon: <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /> },
  { label: 'Profile', icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" /> },
];

/** İlerleme halkası: çevre ≈ 2π·26; görünen uzunluk ilerlemeye eşittir. */
const RING_CIRCUMFERENCE = 2 * Math.PI * 26;
const PROGRESS = 0.72;

/** Örnek proje [03]: iOS tarzı bir alışkanlık uygulaması. Etkileşim yoktur, yalnızca incelenir. */
export function WaveApp() {
  return (
    <div className={styles.app}>
      <StatusBar />

      <header className={styles.header}>
        <div>
          <p className={styles.date}>Saturday, Oct 25</p>
          <h3 className={styles.largeTitle} data-inspect="large-title">
            Today
          </h3>
        </div>
        <span className={styles.avatar} data-inspect="avatar">
          FC
        </span>
      </header>

      <div className={styles.goal}>
        <svg className={styles.ring} viewBox="0 0 64 64" data-inspect="progress-ring">
          <circle className={styles.ringTrack} cx="32" cy="32" r="26" />
          <circle
            className={styles.ringValue}
            cx="32"
            cy="32"
            r="26"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - PROGRESS)}
          />
          <text x="32" y="36.5" textAnchor="middle" className={styles.ringLabel}>
            72%
          </text>
        </svg>
        <div>
          <p className={styles.goalLabel}>Daily goal</p>
          <p className={styles.goalValue}>
            7,200 <span>/ 10,000 steps</span>
          </p>
        </div>
      </div>

      <div className={styles.chips} data-inspect="filter-chips">
        <span className={styles.chipActive}>All</span>
        <span className={styles.chip}>Morning</span>
        <span className={styles.chip}>Evening</span>
      </div>

      <p className={styles.sectionTitle}>Habits</p>
      <ul className={styles.list}>
        {HABITS.map((habit) => (
          <li key={habit.title} className={styles.row} data-inspect="list-row">
            <span className={styles.rowIcon} style={{ background: habit.color }}>
              <svg viewBox="0 0 24 24" width="16" height="16">
                {habit.icon}
              </svg>
            </span>
            <span className={styles.rowText}>
              <span className={styles.rowTitle}>{habit.title}</span>
              <span className={styles.rowDetail}>{habit.detail}</span>
            </span>
            <span className={habit.on ? styles.switchOn : styles.switch} data-inspect="toggle-switch">
              <span className={styles.thumb} />
            </span>
          </li>
        ))}
      </ul>

      <span className={styles.fab} data-inspect="fab">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        {TABS.map((tab) => (
          <span key={tab.label} className={tab.active ? styles.tabActive : styles.tab}>
            <svg viewBox="0 0 24 24" width="22" height="22">
              {tab.icon}
            </svg>
            {tab.label}
          </span>
        ))}
      </nav>
      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
