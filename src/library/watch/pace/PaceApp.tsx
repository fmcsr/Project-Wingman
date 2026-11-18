import { useState } from 'react';
import { useDemoMotion, useEvery } from '../../../demos/motion';
import styles from './PaceApp.module.css';

/** The run so far, in seconds: 22 minutes 41. The time counts on from here and starts over before the hour. */
const START = 22 * 60 + 41;
/** The time ticks once a second, so its hundredths stay put: a running stopwatch, glanced at once a second. */
const HUNDREDTHS = '37';
/** Kilometers run, out of the 5 km goal the run was started with. */
const DISTANCE = 4.27;
const GOAL = 5;
/** One dot per workout view: this one, then heart rate zones, segments, splits, elevation and activity rings. */
const VIEWS = 6;

/** Minutes, seconds and hundredths, as a stopwatch writes them within the hour. */
function formatElapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}.${HUNDREDTHS}`;
}

/** A figure mid-stride, leaning into the run: drawn in thick round strokes, so it reads as a solid glyph when small. */
function RunnerGlyph() {
  return (
    <svg className={styles.glyph} viewBox="0 0 24 24" width="14" height="14" data-inspect="workout-icon">
      <circle className={styles.glyphHead} cx="15.2" cy="3.6" r="2.4" />
      <path d="M13.4 8.2 10.9 14.4M7.6 10.4l3.1-2.6 3.1.6 2.6 3.3M10.9 14.4l3.6 2.6-1.4 4.6M10.9 14.4l-2.6 4-4.1.4" />
    </svg>
  );
}

/**
 * Library example: a running workout on the wrist, laid out like the Workout app's metrics view on Apple Watch. The
 * workout's icon in its goal ring and the time along the top, then the elapsed time in yellow and four metrics, one
 * per line, each a big white figure with a small label: heart rate with its red heart, active calories, average pace
 * and distance. A column of page dots by the Digital Crown says there are more views. The elapsed time ticks once a
 * second and holds while inspected. Not interactive; for inspection only.
 */
export function PaceApp() {
  const timer = useDemoMotion<HTMLElement>();
  const [elapsed, setElapsed] = useState(START);
  useEvery(1000, timer.playing, () => setElapsed((seconds) => (seconds + 1 < 3600 ? seconds + 1 : START)));

  return (
    <div className={styles.app}>
      <header className={styles.top}>
        <span className={styles.goal} data-inspect="goal-ring">
          <svg className={styles.ring} viewBox="0 0 26 26" width="26" height="26">
            <circle className={styles.track} cx="13" cy="13" r="11.5" />
            <circle
              className={styles.progress}
              cx="13"
              cy="13"
              r="11.5"
              pathLength={100}
              strokeDasharray={`${((DISTANCE / GOAL) * 100).toFixed(1)} 100`}
            />
          </svg>
          <RunnerGlyph />
        </span>
        <time className={styles.clock} dateTime="07:42" data-inspect="clock">
          7:42
        </time>
      </header>

      <div className={styles.view} data-inspect="workout-view">
        <span ref={timer.ref} className={styles.elapsed} role="timer" data-inspect="elapsed-time">
          {formatElapsed(elapsed)}
        </span>

        <p className={styles.metric} data-inspect="heart-rate">
          <span className={styles.value}>152</span>
          <span className={styles.unit} data-inspect="unit-label">
            BPM
          </span>
          <svg className={styles.heart} viewBox="0 0 24 22" width="13" height="12" data-inspect="heartbeat">
            <path d="M12 21.2c-.4 0-.8-.1-1.1-.4C5.3 16.2 1.6 12.7 1.6 8 1.6 4.6 4.1 2 7.3 2c1.9 0 3.6 1 4.7 2.6C13.1 3 14.8 2 16.7 2c3.2 0 5.7 2.6 5.7 6 0 4.7-3.7 8.2-9.3 12.8-.3.3-.7.4-1.1.4z" />
          </svg>
        </p>

        <p className={styles.metric} data-inspect="active-calories">
          <span className={styles.value}>254</span>
          <span className={styles.unit} data-inspect="unit-label">
            <span>Active</span>
            <span>kcal</span>
          </span>
        </p>

        <p className={styles.metric} data-inspect="pace">
          <span className={styles.value}>5′19″</span>
          <span className={styles.unit} data-inspect="unit-label">
            <span>Avg</span>
            <span>pace</span>
          </span>
        </p>

        <p className={styles.metric} data-inspect="distance">
          <span className={styles.value}>{DISTANCE.toFixed(2)}</span>
          <span className={styles.unit} data-inspect="unit-label">
            km
          </span>
        </p>
      </div>

      <span className={styles.pages} data-inspect="page-indicator">
        {Array.from({ length: VIEWS }, (_, index) => (
          <span key={index} className={index === 0 ? `${styles.page} ${styles.pageOn}` : styles.page} />
        ))}
      </span>
    </div>
  );
}
