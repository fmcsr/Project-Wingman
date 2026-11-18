import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../demos/motion';
import styles from './CalendarHeatmap.module.css';

/* Days are counted from January 1, 1970 (a Thursday), in UTC, so no time zone can shift a date. */
const DAY_MS = 86_400_000;
const dayOf = (year: number, month: number, date: number) => Date.UTC(year, month - 1, date) / DAY_MS;
const weekdayOf = (day: number) => (day + 4) % 7;
const within = (day: number, from: number, to: number) => day >= from && day <= to;

/** The picture's today: Wednesday, November 18, 2026. The graph runs a year back from it, a column per week. */
const TODAY = dayOf(2026, 11, 18);
const FIRST = TODAY - 365;
const FIRST_SUNDAY = FIRST - weekdayOf(FIRST);
const WEEKS = (TODAY - weekdayOf(TODAY) - FIRST_SUNDAY) / 7 + 1;
const TOTAL = 1284;

/** Days the loop points at, with the counts they need for its story (today gets one more contribution). */
const SEP_15 = dayOf(2026, 9, 15);
const AUG_11 = dayOf(2026, 8, 11);
const OCT_29 = dayOf(2026, 10, 29);
const NOV_6 = dayOf(2026, 11, 6);
const FIXED = new Map([
  [SEP_15, 4],
  [AUG_11, 0],
  [OCT_29, 11],
  [NOV_6, 7],
  [TODAY, 2],
]);

/** A small seeded pseudo-random generator (mulberry32): the same graph on every load. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A busy developer's year: most weekdays and some weekends, quiet over the holidays, a launch crunch in March, two
 * weeks off in August and a streak since late October that runs up to today. The counts are then nudged one by one
 * until they add up to the total in the header.
 */
function contributions() {
  const random = seeded(3);
  const counts = new Map<number, number>();
  for (let day = FIRST; day <= TODAY; day++) {
    const weekend = weekdayOf(day) === 0 || weekdayOf(day) === 6;
    let chance = weekend ? 0.3 : 0.85;
    let mean = weekend ? 1.8 : 5.1;
    if (within(day, dayOf(2026, 3, 2), dayOf(2026, 3, 20))) [chance, mean] = weekend ? [0.7, 3] : [1, 9.7];
    if (within(day, dayOf(2025, 12, 24), dayOf(2026, 1, 1))) [chance, mean] = [0.15, 1.5];
    if (within(day, dayOf(2026, 8, 3), dayOf(2026, 8, 16))) chance = 0;
    if (day >= dayOf(2026, 10, 26)) chance = 1;
    const [active, amount] = [random(), random()];
    const count = active < chance ? Math.min(19, Math.max(1, Math.round(-Math.log(1 - amount) * mean))) : 0;
    counts.set(day, FIXED.get(day) ?? count);
  }
  const free = [...counts.keys()].filter((day) => !FIXED.has(day) && counts.get(day)! > 0);
  let sum = [...counts.values()].reduce((a, b) => a + b, 0);
  while (sum !== TOTAL) {
    const day = free[Math.floor(random() * free.length)];
    const count = counts.get(day)!;
    if (sum < TOTAL) {
      counts.set(day, count + 1);
      sum += 1;
    } else if (count > 1) {
      counts.set(day, count - 1);
      sum -= 1;
    }
  }
  return counts;
}

const COUNTS = contributions();

/** Five shades, as in the legend: none, 1–2, 3–5, 6–9 and 10 or more. */
const levelOf = (count: number) => (count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4);

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dateOf = (day: number) => new Date(day * DAY_MS);

function describe(day: number, count: number) {
  const date = dateOf(day);
  const when = `${WEEKDAY_NAMES[date.getUTCDay()]}, ${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCDate()}`;
  return count === 0 ? `No contributions on ${when}` : `${count} contribution${count === 1 ? '' : 's'} on ${when}`;
}

/*
 * Geometry, in px: 11px cells 3px apart. The weeks that fit are what's left of the tile after its padding, the box's
 * border and padding and the weekday labels; the CSS takes these same numbers from the tile's style.
 */
const CELL = 11;
const GAP = 3;
const PITCH = CELL + GAP;
const PAD = 12;
const LABELS = 32;

const GEOMETRY = {
  '--cell': `${CELL}px`,
  '--gap': `${GAP}px`,
  '--pad': `${PAD}px`,
  '--labels': `${LABELS}px`,
} as CSSProperties;

const weeksFor = (width: number) =>
  Math.max(1, Math.min(WEEKS, Math.floor((width - 4 * PAD - 2 - LABELS + GAP) / PITCH)));

/**
 * Month names over the weeks: each over the first week whose Sunday falls in it. The first column gets its month
 * only when the next name is at least three weeks away, so two names never run into each other.
 */
function monthLabels(first: number) {
  const labels: { week: number; name: string }[] = [];
  for (let week = first; week < WEEKS; week++) {
    const month = dateOf(FIRST_SUNDAY + 7 * week).getUTCMonth();
    if (week === first || month !== dateOf(FIRST_SUNDAY + 7 * week - 7).getUTCMonth()) {
      labels.push({ week: week - first, name: MONTH_NAMES[month].slice(0, 3) });
    }
  }
  if (labels.length > 1 && labels[1].week < 3) labels.shift();
  return labels;
}

/** The width of an element, kept up to date (0 until it's measured). */
function useWidth(element: HTMLElement | null) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (!element) return;
    const observer = new ResizeObserver(() => setWidth(element.offsetWidth));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return width;
}

/**
 * One moment of the loop: the day under the pointer, today's count and how long it lasts. `hold` moments wait while
 * the tile is inspected or out of view; the short beats in between always finish. `dip` fades the total and today's
 * cell out while they go back to the start of the loop, so nothing is seen counting down.
 */
type Step = { day: number; today: number; ms: number; hold?: boolean; fresh?: boolean; dip?: boolean };

/**
 * The pointer moves across the recent months: a regular Tuesday, a day of the August break and a busy Thursday. While
 * it rests there, a new contribution comes in: today's cell steps up a shade and the total ticks up. The pointer goes
 * to today, then on to another day, and the loop starts over.
 */
const STEPS: Step[] = [
  { day: SEP_15, today: 2, ms: 1700, hold: true },
  { day: AUG_11, today: 2, ms: 1700, hold: true },
  { day: OCT_29, today: 2, ms: 1500, hold: true },
  { day: OCT_29, today: 3, ms: 1300, hold: true, fresh: true },
  { day: TODAY, today: 3, ms: 2000, hold: true },
  { day: NOV_6, today: 3, ms: 1600, hold: true },
  { day: NOV_6, today: 3, ms: 180, dip: true },
  { day: NOV_6, today: 2, ms: 60, dip: true },
];

/** The still picture: the tooltip on the busy Thursday. */
const FINAL: Step = { day: OCT_29, today: 2, ms: 0 };

function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);
  const held = final || (STEPS[index].hold === true && !playing);

  useEffect(() => {
    if (held) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, held]);

  return final ? FINAL : STEPS[index];
}

/**
 * Calendar heatmap: a year of contributions on a profile page, a column per week and a cell per day, shaded by how
 * many there were. The newest weeks sit on the right; a narrower tile shows fewer of the oldest. In the loop a tooltip
 * hops from day to day with the cell outlined, as under a moving pointer; now and then a new contribution comes in,
 * today's cell steps up a shade and the total ticks up.
 */
export function CalendarHeatmap() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const [tile, setTile] = useState<HTMLDivElement | null>(null);
  const [tip, setTip] = useState<HTMLDivElement | null>(null);
  const tileRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref(node);
      setTile(node);
    },
    [ref],
  );
  const width = useWidth(tile);
  const tipWidth = useWidth(tip);

  const shown = weeksFor(width);
  const first = WEEKS - shown;
  const countOf = (day: number) => (day === TODAY ? step.today : COUNTS.get(day)!);

  // The pointer's cell, and the tooltip over it: centered on the cell, but kept 6px inside the tile. The graph is
  // centered in the tile, so the space beside the weeks is half of what's left plus the box's border and padding.
  const grid = shown * PITCH - GAP;
  const inset = (width - (2 + 2 * PAD + LABELS + grid)) / 2 + 1 + PAD;
  const x = ((step.day - weekdayOf(step.day) - FIRST_SUNDAY) / 7 - first) * PITCH;
  const y = weekdayOf(step.day) * PITCH;
  const left = Math.min(Math.max(x + CELL / 2 - tipWidth / 2, 6 - inset - LABELS), grid + inset - 6 - tipWidth);

  return (
    <div ref={tileRef} className={styles.tile} data-dip={step.dip || undefined} style={GEOMETRY}>
      <div className={styles.graph} data-inspect="calendar-heatmap">
        <div className={styles.header}>
          <p className={styles.title}>
            <span className={styles.total}>{(TOTAL + step.today - 2).toLocaleString('en-US')}</span> contributions
            in the last year
          </p>
          <span className={styles.year}>2026</span>
        </div>

        <div className={styles.box}>
          <div className={styles.months} data-inspect="calendar-heatmap-axis">
            {monthLabels(first).map(({ week, name }) => (
              <span key={`${week}${name}`} style={{ left: week * PITCH }}>
                {name}
              </span>
            ))}
          </div>

          <div className={styles.body}>
            <div className={styles.days} data-inspect="calendar-heatmap-axis">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>

            <div className={styles.plot}>
              <div className={styles.grid} data-inspect="calendar-heatmap-grid">
                {Array.from({ length: shown * 7 }, (_, index) => {
                  const day = FIRST_SUNDAY + 7 * (first + Math.floor(index / 7)) + (index % 7);
                  if (day < FIRST || day > TODAY) return <span key={day} />;
                  return (
                    <span
                      key={day}
                      className={day === TODAY ? styles.today : undefined}
                      data-level={levelOf(countOf(day))}
                      data-fresh={(day === TODAY && step.fresh) || undefined}
                    />
                  );
                })}
              </div>

              <span
                className={styles.pointer}
                data-inspect="calendar-heatmap-cell"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              />

              <div className={styles.tooltip} style={{ transform: `translate(${left}px, ${y}px)` }}>
                <div
                  ref={setTip}
                  className={styles.bubble}
                  data-inspect="calendar-heatmap-tooltip"
                  style={{ '--arrow': `${x + CELL / 2 - left}px` } as CSSProperties}
                >
                  {describe(step.day, countOf(step.day))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <a className={styles.learn}>How we count contributions</a>
            <div className={styles.legend} data-inspect="calendar-heatmap-legend">
              Less
              <span className={styles.scale}>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span key={level} data-level={level} />
                ))}
              </span>
              More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
