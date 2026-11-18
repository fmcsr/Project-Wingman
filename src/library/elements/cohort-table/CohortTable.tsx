import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './CohortTable.module.css';

/**
 * Weekly sign-up cohorts, oldest first: the Monday each week starts, how many people signed up that week and the
 * share of them active in each week since (Week 0 is the sign-up week, so always 100%). The picture's today is
 * Wednesday, November 18, 2026, so the newest whole week is Nov 9–15: the oldest cohort has reached Week 8 and the
 * newest only Week 0. An onboarding checklist shipped on October 19 shows: from that cohort on, more people come back.
 */
const COHORTS = [
  { start: 'Sep 14', size: 1086, retained: [100, 51, 43, 39, 36, 35, 33, 32, 31] },
  { start: 'Sep 21', size: 1142, retained: [100, 53, 44, 40, 37, 35, 34, 33] },
  { start: 'Sep 28', size: 1019, retained: [100, 50, 42, 38, 36, 34, 33] },
  { start: 'Oct 5', size: 1204, retained: [100, 52, 44, 38, 37, 35] },
  { start: 'Oct 12', size: 1268, retained: [100, 54, 45, 41, 38] },
  { start: 'Oct 19', size: 1175, retained: [100, 57, 48, 43] },
  { start: 'Oct 26', size: 1331, retained: [100, 58, 49] },
  { start: 'Nov 2', size: 1247, retained: [100, 59] },
  { start: 'Nov 9', size: 1312, retained: [100] },
].map((cohort) => ({ ...cohort, active: cohort.retained.map((share) => Math.round((cohort.size * share) / 100)) }));

const WEEKS = 9;
const NEWEST = COHORTS.length - 1;

/** Whether a cell has its number: in last week's table every cohort is a week behind, and the newest is missing. */
const known = (row: number, week: number, fresh: boolean) => week <= NEWEST - row - (fresh ? 0 : 1);

/**
 * The "All users" row: every cohort that has reached a week counts toward it, weighted by its size, so a big cohort
 * moves the average more than a small one.
 */
function average(fresh: boolean) {
  const reached = (week: number) => COHORTS.filter((_, row) => known(row, week, fresh));
  const sum = (cohorts: typeof COHORTS, value: (cohort: (typeof COHORTS)[number]) => number) =>
    cohorts.reduce((total, cohort) => total + value(cohort), 0);
  return {
    size: sum(reached(0), (cohort) => cohort.size),
    retained: Array.from({ length: WEEKS }, (_, week) => {
      const cohorts = reached(week);
      if (cohorts.length === 0) return null;
      return Math.round((100 * sum(cohorts, (cohort) => cohort.active[week])) / sum(cohorts, (cohort) => cohort.size));
    }),
  };
}

const AVERAGES = { stale: average(false), fresh: average(true) };

const number = (value: number) => value.toLocaleString('en-US');

type Cell = { row: number; week: number };

/**
 * Which numbers the table shows: last week's, this week's filling in (the average follows once they're in) or this
 * week's.
 */
type Data = 'stale' | 'filling' | 'fresh';

/**
 * One moment of the loop: the cell the highlight and the tooltip are on, whether the pointer is over it (otherwise
 * it rests in the table's empty corner and the highlight is off), the numbers shown and how long the moment lasts.
 * `hold` moments wait while the tile is inspected or out of view; `dip` fades the new numbers out while the loop goes
 * back to last week's table.
 */
type Step = { cell: Cell; hover: boolean; data: Data; ms: number; hold?: boolean; dip?: boolean };

const OCT_5_WEEK_3 = { row: 3, week: 3 };
const OCT_19_WEEK_1 = { row: 5, week: 1 };
const NOV_2_WEEK_1 = { row: NEWEST - 1, week: 1 };

/**
 * The pointer reads two cells of last week's table and leaves. This week's numbers come in: the newest cohort's row
 * fills in at the bottom and every older cohort gains a week along the diagonal. The pointer checks one of the new
 * cells, the best Week 1 yet, and the loop starts over.
 */
const STEPS: Step[] = [
  { cell: OCT_5_WEEK_3, hover: false, data: 'stale', ms: 1200, hold: true },
  { cell: OCT_5_WEEK_3, hover: true, data: 'stale', ms: 2400, hold: true },
  { cell: OCT_19_WEEK_1, hover: true, data: 'stale', ms: 1800, hold: true },
  { cell: OCT_19_WEEK_1, hover: false, data: 'stale', ms: 900 },
  { cell: NOV_2_WEEK_1, hover: false, data: 'filling', ms: 900 },
  { cell: NOV_2_WEEK_1, hover: false, data: 'fresh', ms: 1100, hold: true },
  { cell: NOV_2_WEEK_1, hover: true, data: 'fresh', ms: 2000, hold: true },
  { cell: NOV_2_WEEK_1, hover: false, data: 'fresh', ms: 700 },
  { cell: OCT_5_WEEK_3, hover: false, data: 'fresh', ms: 220, dip: true },
  { cell: OCT_5_WEEK_3, hover: false, data: 'stale', ms: 80, dip: true },
];

/** The still picture: this week's table, the pointer on Oct 5's Week 3. */
const FINAL: Step = { cell: OCT_5_WEEK_3, hover: true, data: 'fresh', ms: 0 };

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

/** The light theme puts white text on the dark end of the scale; the dark theme uses white on every shade. */
const strong = (share: number) => share >= 70 || undefined;

/**
 * Cohort table: a retention report in an analytics tool, a row per weekly sign-up cohort with its size and a cell per
 * week since, shaded on one hue from 0% to 100%. The filled cells form a triangle, since older cohorts have had more
 * weeks; the "All users" row closes it with the weighted average. In the loop the pointer hovers cells, which
 * highlights their row and column and opens a tooltip; then this week's numbers come in: a new cohort row fills in
 * at the bottom and each older cohort gains a cell along the diagonal.
 */
export function CohortTable() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const { cell, hover } = step;
  const all = step.data === 'fresh' ? AVERAGES.fresh : AVERAGES.stale;
  const cohort = COHORTS[cell.row];
  // While the pointer is on a cell, everything outside its row and column fades back
  const dim = (row: number | null, week: number) => (hover && row !== cell.row && week !== cell.week) || undefined;

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-data={step.data}
      data-dip={step.dip || undefined}
      data-hover={hover || undefined}
      style={{ '--r': cell.row, '--c': cell.week } as CSSProperties}
    >
      <div className={styles.card} data-inspect="cohort-table">
        <div className={styles.header}>
          <span className={styles.title}>Weekly retention</span>
          <span className={styles.subtitle}>Signed up → any active event</span>
          <span className={styles.scale} data-inspect="cohort-table-scale">
            0%
            <span className={styles.ramp} />
            100%
          </span>
        </div>

        <div className={styles.table}>
          <div className={styles.head}>
            <span className={styles.label}>Cohort</span>
            <span className={styles.users}>Users</span>
            {Array.from({ length: WEEKS }, (_, week) => (
              <span
                key={week}
                className={styles.week}
                data-col={week}
                data-current={(hover && week === cell.week) || undefined}
              >
                Week {week}
              </span>
            ))}
          </div>

          {COHORTS.map((row, index) => (
            <div
              key={row.start}
              className={styles.row}
              data-inspect="cohort-table-row"
              data-new={index === NEWEST || undefined}
              data-current={(hover && index === cell.row) || undefined}
            >
              <span className={styles.label}>{row.start}</span>
              <span className={styles.users}>{number(row.size)}</span>
              {row.retained.map((share, week) => (
                <span
                  key={week}
                  className={styles.cell}
                  data-inspect="cohort-table-cell"
                  data-col={week}
                  data-latest={week === NEWEST - index || undefined}
                  data-strong={strong(share)}
                  data-dim={dim(index, week)}
                  style={{ '--share': share, '--i': index } as CSSProperties}
                >
                  {share}%
                </span>
              ))}
            </div>
          ))}

          <div className={styles.average} data-inspect="cohort-table-average">
            <span className={styles.label}>All users</span>
            <span className={styles.users}>{number(all.size)}</span>
            {all.retained.map((share, week) =>
              share === null ? (
                <span key={week} className={styles.empty} data-col={week} />
              ) : (
                <span
                  key={week}
                  className={styles.cell}
                  data-col={week}
                  data-strong={strong(share)}
                  data-dim={dim(null, week)}
                  style={{ '--share': share } as CSSProperties}
                >
                  {share}%
                </span>
              ),
            )}
          </div>

          <span className={styles.outline} />

          <div className={styles.tooltip}>
            <div className={styles.bubble} data-inspect="cohort-table-tooltip">
              <span className={styles.tipValue}>
                Week {cell.week}: {cohort.retained[cell.week]}% of {number(cohort.size)}
              </span>
              <span className={styles.tipDetail}>
                {cohort.start} cohort · {number(cohort.active[cell.week])} active
              </span>
            </div>
          </div>

          <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
            <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
