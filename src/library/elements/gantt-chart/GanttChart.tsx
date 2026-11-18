import { useEffect, useLayoutEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './GanttChart.module.css';
import amani from '../photos/amani.webp';
import clara from '../photos/clara.webp';
import erik from '../photos/erik.webp';
import marcus from '../photos/marcus.webp';

/**
 * Days are counted from Monday, November 9, 2026 (day 0). The picture's today is Wednesday, November 18 (day 9); in
 * the loop it becomes Thursday. The timeline shows four weeks, or five on a wide tile.
 */
const TODAY = 9;
const dateOf = (day: number) => (day <= 21 ? `Nov ${day + 9}` : `Dec ${day - 21}`);

type Task = {
  name: string;
  /** First and last day, inclusive. */
  start: number;
  end: number;
  /** Share of the work done, 0–100. */
  done: number;
  photo: string;
};

/**
 * A checkout redesign: research, then the flow design, the payment API alongside it, the checkout UI once the API is
 * in, and the launch on Friday, December 4. Progress matches the calendar: on Wednesday the flow design is three days
 * into five, the API four into nine.
 */
const RESEARCH: Task = { name: 'Research', start: 0, end: 4, done: 100, photo: amani };
const FLOWS: Task = { name: 'Flow design', start: 7, end: 11, done: 60, photo: clara };
const API: Task = { name: 'Payment API', start: 7, end: 15, done: 40, photo: marcus };
const UI: Task = { name: 'Checkout UI', start: 16, end: 22, done: 0, photo: erik };
const TASKS = [RESEARCH, FLOWS, API, UI];
const LAUNCH = 25;
const ROWS = TASKS.length + 1;

/**
 * One moment of the loop: today, the flow design's progress, how many days the Payment API has been dragged longer
 * (the Checkout UI, which waits for it, moves along by as much), where the pointer is, whether it holds the bar's end,
 * and how long the moment lasts. `hold` moments wait while the tile is inspected or out of view; `dip` fades today
 * and the progress out while they go back to Wednesday.
 */
type Step = {
  today: number;
  flows: number;
  extend: number;
  pointer: 'away' | 'end';
  held?: boolean;
  undo?: boolean;
  ms: number;
  hold?: boolean;
  dip?: boolean;
};

/**
 * A day passes: the today line moves on to Thursday and the flow design grows from 60% to 80% done. Then the pointer
 * takes the Payment API bar by its end and drags it two days longer, a day at a time; the Checkout UI, which can only
 * start once the API is done, moves two days later with it. The pointer lets go and moves away, the change is undone
 * (both bars slide back) and the loop starts over.
 */
const STEPS: Step[] = [
  { today: TODAY, flows: 60, extend: 0, pointer: 'away', ms: 1400, hold: true },
  { today: TODAY + 1, flows: 80, extend: 0, pointer: 'away', ms: 1700, hold: true },
  { today: TODAY + 1, flows: 80, extend: 0, pointer: 'end', ms: 900 },
  { today: TODAY + 1, flows: 80, extend: 0, pointer: 'end', held: true, ms: 300 },
  { today: TODAY + 1, flows: 80, extend: 1, pointer: 'end', held: true, ms: 420 },
  { today: TODAY + 1, flows: 80, extend: 2, pointer: 'end', held: true, ms: 700 },
  { today: TODAY + 1, flows: 80, extend: 2, pointer: 'end', ms: 2200, hold: true },
  { today: TODAY + 1, flows: 80, extend: 2, pointer: 'away', ms: 1100, hold: true },
  { today: TODAY + 1, flows: 80, extend: 0, pointer: 'away', undo: true, ms: 700 },
  { today: TODAY + 1, flows: 80, extend: 0, pointer: 'away', ms: 220, dip: true },
  { today: TODAY, flows: 60, extend: 0, pointer: 'away', ms: 100, dip: true },
];

/** The still picture: Wednesday, the Payment API two days longer and the Checkout UI moved, the pointer on its end. */
const FINAL: Step = { today: TODAY, flows: 60, extend: 2, pointer: 'end', ms: 0 };

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

/** The size of an element, kept up to date (0 × 0 until it's measured). */
function useSize(element: HTMLElement | null) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!element) return;
    const observer = new ResizeObserver(() => setSize({ width: element.offsetWidth, height: element.offsetHeight }));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return size;
}

/** A path through points, each segment straight across or down, its corners rounded by up to `radius`. */
function rounded(points: [number, number][], radius = 4) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [[x0, y0], [x1, y1], [x2, y2]] = [points[i - 1], points[i], points[i + 1]];
    const r = Math.min(radius, Math.hypot(x1 - x0, y1 - y0) / 2, Math.hypot(x2 - x1, y2 - y1) / 2);
    const before = [x1 - Math.sign(x1 - x0) * r, y1 - Math.sign(y1 - y0) * r];
    const after = [x1 + Math.sign(x2 - x1) * r, y1 + Math.sign(y2 - y1) * r];
    d += `L${before[0]} ${before[1]}Q${x1} ${y1} ${after[0]} ${after[1]}`;
  }
  const [x, y] = points[points.length - 1];
  return `${d}L${x} ${y}`;
}

/**
 * A finish-to-start dependency, from the right end of one bar (`x1`, row center `y1`) to the left end of the next
 * (`x2`, `y2`), ending in an arrowhead. With room between them it steps across and down; when the next bar starts
 * right where the first one ends, it loops back along the gap between the rows (`between`), as timeline tools draw it.
 */
function dependency(x1: number, y1: number, x2: number, y2: number, between: number) {
  const stub = 7;
  const line =
    x2 - x1 >= 2 * stub
      ? rounded([
          [x1, y1],
          [x2 - stub, y1],
          [x2 - stub, y2],
          [x2 - 1, y2],
        ])
      : rounded([
          [x1, y1],
          [x1 + stub, y1],
          [x1 + stub, between],
          [x2 - stub, between],
          [x2 - stub, y2],
          [x2 - 1, y2],
        ]);
  return { line, head: `M${x2 - 6} ${y2 - 3.5}L${x2 - 1} ${y2}L${x2 - 6} ${y2 + 3.5}Z` };
}

/** Status icons as roadmap tools draw them: a circle that fills like a pie as work gets done, a check when it's finished. */
function Status({ done }: { done: number }) {
  return (
    <svg className={styles.status} viewBox="0 0 14 14" data-done={done === 100 || undefined} aria-hidden="true">
      <circle className={styles.ring} cx="7" cy="7" r="5.75" />
      <circle
        className={styles.pie}
        cx="7"
        cy="7"
        r="2.6"
        style={{ strokeDasharray: `${(done / 100) * 16.34} 16.34` }}
      />
      <path className={styles.check} d="m4.6 7.1 1.7 1.7 3.2-3.4" />
    </svg>
  );
}

/**
 * Gantt chart: a project's timeline as a roadmap tool shows it, the tasks listed on the left and a bar for each on a
 * week axis, weekends shaded. Each bar fills with its progress and carries its assignee's photo; arrows link a task to
 * the one that waits for it, a diamond marks the launch and a red line marks today. In the loop a day passes: the
 * today line moves on and the flow design's progress grows. Then the Payment API bar is dragged two days longer by
 * its end, and the Checkout UI, which depends on it, shifts later with it.
 */
export function GanttChart() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const [body, setBody] = useState<HTMLDivElement | null>(null);
  const { width, height } = useSize(body);

  const days = width >= 560 ? 35 : 28;
  const day = width / days;
  const row = height / ROWS;
  const center = (index: number) => (index + 0.5) * row;
  const shift = step.extend * day;
  const progress = (task: Task) => (task === FLOWS ? step.flows : task.done);
  const apiEnd = (API.end + 1 + step.extend) * day;
  const research = dependency((RESEARCH.end + 1) * day, center(0), FLOWS.start * day, center(1), row);
  const api = dependency((API.end + 1) * day, center(2), UI.start * day, center(3), 3 * row);
  const weeks = Array.from({ length: days / 7 }, (_, week) => week);

  return (
    <div ref={ref} className={styles.tile} data-undo={step.undo || undefined} data-dip={step.dip || undefined}>
      <div className={styles.chart} data-inspect="gantt-chart">
        <div className={styles.panel}>
          <div className={styles.project}>Checkout v2</div>
          {TASKS.map((task) => (
            <div key={task.name} className={styles.task} data-changes={task === FLOWS || undefined}>
              <Status done={progress(task)} />
              <span className={styles.name}>{task.name}</span>
              <span className={styles.percent}>{progress(task)}%</span>
            </div>
          ))}
          <div className={styles.task}>
            <svg className={styles.status} viewBox="0 0 14 14" aria-hidden="true">
              <path className={styles.ring} d="M7 1.6 12.4 7 7 12.4 1.6 7Z" />
            </svg>
            <span className={styles.name}>Launch</span>
          </div>
        </div>

        <div className={styles.timeline}>
          {/* The task list's border stands in for the first Monday's line */}
          {weeks.slice(1).map((week) => (
            <span key={week} className={styles.gridline} style={{ left: week * 7 * day }} />
          ))}

          <div className={styles.axis} data-inspect="gantt-chart-axis">
            {weeks.map((week) => (
              <span key={week} className={styles.week} style={{ left: week * 7 * day }}>
                {dateOf(week * 7)}
              </span>
            ))}
          </div>

          <div ref={setBody} className={styles.body}>
            {weeks.map((week) => (
              <span key={week} className={styles.weekend} style={{ left: (week * 7 + 5) * day, width: 2 * day }} />
            ))}

            <svg className={styles.links} width={width} height={height} aria-hidden="true">
              <g className={styles.link} data-inspect="gantt-chart-dependency">
                <path className={styles.hit} d={research.line} />
                <path className={styles.line} d={research.line} />
                <path className={styles.head} d={research.head} />
              </g>
              <g
                className={styles.link}
                data-inspect="gantt-chart-dependency"
                style={{ transform: `translateX(${shift}px)` }}
              >
                <path className={styles.hit} d={api.line} />
                <path className={styles.line} d={api.line} />
                <path className={styles.head} d={api.head} />
              </g>
            </svg>

            {TASKS.map((task, index) => (
              <div
                key={task.name}
                className={styles.bar}
                data-inspect="gantt-chart-bar"
                data-dragged={task === API || undefined}
                data-held={(task === API && step.held) || undefined}
                data-hovered={(task === API && step.pointer === 'end') || undefined}
                style={{
                  top: center(index) - 10,
                  left: task.start * day,
                  width: (task.end - task.start + 1 + (task === API ? step.extend : 0)) * day,
                  transform: task === UI ? `translateX(${shift}px)` : undefined,
                }}
              >
                <span
                  className={styles.fill}
                  data-inspect={task.done > 0 ? 'gantt-chart-progress' : undefined}
                  data-changes={task === FLOWS || undefined}
                  style={{ transform: `scaleX(${progress(task) / 100})` }}
                />
                <img className={styles.avatar} src={task.photo} alt="" width={16} height={16} />
                {task === API && <span className={styles.handle} />}
              </div>
            ))}

            <span
              className={styles.milestone}
              data-inspect="gantt-chart-milestone"
              style={{ left: (LAUNCH + 0.5) * day, top: center(TASKS.length) }}
            >
              <span className={styles.diamond} />
              <span className={styles.due}>{dateOf(LAUNCH)}</span>
            </span>

            <span
              className={styles.dates}
              data-shown={step.held || undefined}
              style={{ transform: `translate(${apiEnd}px, ${center(2) - 10}px)` }}
            >
              Ends {dateOf(API.end + step.extend)}
            </span>
          </div>

          <span
            className={styles.today}
            data-inspect="gantt-chart-today"
            style={{ transform: `translateX(${(step.today + 0.5) * day}px)` }}
          >
            <span className={styles.todayLabel}>Today</span>
          </span>

          <span
            className={styles.pointer}
            data-on={step.pointer === 'end' || undefined}
            data-held={step.held || undefined}
            style={{
              transform:
                step.pointer === 'end'
                  ? `translate(${apiEnd}px, calc(var(--header) + ${center(2)}px))`
                  : `translate(${(UI.start - 2.5) * day}px, calc(var(--header) + ${center(4)}px))`,
            }}
          >
            <svg className={styles.arrow} viewBox="0 0 14 20" aria-hidden="true">
              <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
            </svg>
            <svg className={styles.resize} viewBox="0 0 22 16" aria-hidden="true">
              <path d="M1.2 8 6.4 2.8v3.4h9.2V2.8L20.8 8l-5.2 5.2V9.8H6.4v3.4z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
