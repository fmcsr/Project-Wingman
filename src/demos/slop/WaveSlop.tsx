import { StatusBar } from '../StatusBar';
import styles from './WaveSlop.module.css';

const STATS = [
  { emoji: '🔥', value: '7', label: 'Day streak' },
  { emoji: '✅', value: '24', label: 'Completed' },
  { emoji: '🎯', value: '85%', label: 'Success' },
];

const HABITS = [
  { emoji: '💧', title: 'Drink Water', detail: '6 of 8 glasses', progress: 75, done: true, tone: styles.blue },
  { emoji: '🧘', title: 'Meditate', detail: '10 minutes', progress: 100, done: true, tone: styles.violet },
  { emoji: '📚', title: 'Read', detail: '0 of 20 pages', progress: 0, done: false, tone: styles.amber },
];

const TABS = [
  { emoji: '🏠', label: 'Home', active: true },
  { emoji: '📊', label: 'Stats' },
  { emoji: '🏆', label: 'Goals' },
  { emoji: '👤', label: 'Profile' },
];

/**
 * The AI slop version of Wave: what "Make a habit tracker app" tends to produce. A gradient header with a glass
 * progress card, three stat tiles with emoji, emoji habit cards and a floating tab bar around a glowing plus button.
 * A picture for comparison only: nothing is focusable or inspectable.
 */
export function WaveSlop() {
  return (
    <div className={styles.app}>
      <div className={styles.hero}>
        <span className={`${styles.circle} ${styles.circleA}`} />
        <span className={`${styles.circle} ${styles.circleB}`} />
        <StatusBar className={styles.statusBar} />

        <div className={styles.greeting}>
          <span className={styles.avatar}>
            A
            <span className={styles.avatarDot} />
          </span>
          <div>
            <p className={styles.hello}>Good morning, Alex! ☀️</p>
            <h3 className={styles.title}>Let's crush it! 💪</h3>
          </div>
        </div>

        <div className={styles.progressCard}>
          <span className={styles.ring}>
            <span className={styles.ringValue}>75%</span>
          </span>
          <span className={styles.progressText}>
            <span className={styles.progressLabel}>✨ AI Daily Progress</span>
            <span className={styles.progressTitle}>3 of 4 habits done! 🎉</span>
            <span className={styles.streak}>🔥 7 day streak!</span>
          </span>
        </div>
      </div>

      <div className={styles.stats}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.statEmoji}>{stat.emoji}</span>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.sectionHead}>
        <p className={styles.sectionTitle}>Today's Habits ✨</p>
        <span className={styles.seeAll}>See all →</span>
      </div>

      <ul className={styles.habits}>
        {HABITS.map((habit) => (
          <li key={habit.title} className={styles.habit}>
            <span className={`${styles.habitEmoji} ${habit.tone}`}>{habit.emoji}</span>
            <span className={styles.habitText}>
              <span className={styles.habitTitle}>{habit.title}</span>
              <span className={styles.habitDetail}>{habit.detail}</span>
              <span className={styles.habitTrack}>
                <span className={styles.habitFill} style={{ width: `${habit.progress}%` }} />
              </span>
            </span>
            <span className={habit.done ? styles.checkDone : styles.check}>{habit.done ? '✓' : ''}</span>
          </li>
        ))}
      </ul>

      <div className={styles.tabBar}>
        {TABS.slice(0, 2).map((tab) => (
          <span key={tab.label} className={tab.active ? styles.tabActive : styles.tab}>
            <span className={styles.tabEmoji}>{tab.emoji}</span>
            {tab.label}
          </span>
        ))}
        <span className={styles.fabSlot}>
          <span className={styles.fab}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </span>
        {TABS.slice(2).map((tab) => (
          <span key={tab.label} className={styles.tab}>
            <span className={styles.tabEmoji}>{tab.emoji}</span>
            {tab.label}
          </span>
        ))}
      </div>

      <span className={styles.homeIndicator} />
    </div>
  );
}
