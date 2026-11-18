import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './RollingNumber.module.css';

/** Yesterday's close: today's change is measured from it. */
const PREVIOUS_CLOSE = 12722.1;

/** The portfolio's value at each tick: up twice, down twice, back where it started. */
const VALUES = [12846.2, 12846.85, 12849.12, 12847.56, 12846.2];

const format = (value: number) =>
  value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** The change since the close, as the pill shows it: "+$124.10 · +0.98%". */
function change(value: number) {
  const amount = value - PREVIOUS_CLOSE;
  return `+$${format(amount)} · +${((amount / PREVIOUS_CLOSE) * 100).toFixed(2)}%`;
}

/**
 * Where each digit's strip stands at each tick. A strip holds 0–9 three times over, and starts in the middle copy;
 * on a rise every changed digit moves forward (down the strip, so it rolls up) past 9 into 0 if it has to, and on a
 * fall backward, so all of them roll the way the value went. The values return to the start, and so do the strips.
 */
const STRIPS = VALUES.reduce<number[][]>((strips, value, tick) => {
  const digits = [...format(value)].filter((char) => /\d/.test(char)).map(Number);
  if (tick === 0) return [digits.map((digit) => 10 + digit)];
  const before = [...format(VALUES[tick - 1])].filter((char) => /\d/.test(char)).map(Number);
  const rise = value > VALUES[tick - 1];
  const previous = strips[tick - 1];
  return [
    ...strips,
    digits.map((digit, place) =>
      rise
        ? previous[place] + ((digit - before[place] + 10) % 10)
        : previous[place] - ((before[place] - digit + 10) % 10),
    ),
  ];
}, []);

/** One strip's text: 0 to 9, three times, a digit a line. */
const STRIP = Array.from({ length: 30 }, (_, index) => index % 10).join('\n');

/** The day's line for the sparkline, half-hourly from the open to now. */
const DAY = [
  12735, 12728, 12712, 12705, 12716, 12731, 12744, 12740, 12758, 12771, 12766, 12783, 12797, 12809, 12802, 12818,
  12822, 12811, 12795, 12790, 12799, 12812, 12808, 12824, 12831, 12827, 12838, 12846.2,
];

/** The sparkline's drawing: its 72 × 28 box, the day's line and yesterday's close as a dotted baseline. */
const SPARK = (() => {
  const low = Math.min(...DAY, PREVIOUS_CLOSE);
  const high = Math.max(...DAY);
  const y = (value: number) => 2 + ((high - value) / (high - low)) * 24;
  const points = DAY.map((value, index) => [(index / (DAY.length - 1)) * 68 + 1, y(value)]);
  return {
    line: points.map(([px, py], index) => `${index ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(''),
    close: y(PREVIOUS_CLOSE).toFixed(1),
    end: points[points.length - 1],
  };
})();

/**
 * One moment of the loop: which value shows, whether its tick is flashing the pill, and how long the moment lasts.
 */
type Step = { tick: number; flash?: boolean; ms: number };

/** The value rests, then ticks every 2.2 s: the pill lights up with each tick for 300ms, then fades as it rests. */
const STEPS: Step[] = [
  { tick: 0, ms: 1500 },
  ...[1, 2, 3, 4].flatMap((tick) => [
    { tick, flash: true, ms: 300 },
    { tick, ms: 1900 },
  ]),
];

/** The still picture: the value at rest, the pill caught mid-flash after a rise. */
const FINAL: Step = { tick: 0, flash: true, ms: 0 };

/** Steps through the loop while `playing`; each step lasts its own time, and a held step starts over. */
function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : STEPS[index];
}

/**
 * Rolling number: a portfolio card with its value in large figures. When the value changes, only the digits that
 * changed roll to their new figure, all in the direction the value went; the change pill under it flashes green on a
 * rise and red on a fall, and a sparkline of the day sits beside it. In the loop the value ticks up twice and down
 * twice, every 2.2 seconds.
 */
export function RollingNumber() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const value = VALUES[step.tick];
  const rise = step.tick === 0 || value > VALUES[step.tick - 1];
  const strips = STRIPS[step.tick];
  const places = [...format(value)].map((char, index, chars) =>
    /\d/.test(char) ? chars.slice(0, index).filter((c) => /\d/.test(c)).length : -1,
  );

  return (
    <div ref={ref} className={styles.tile} data-final={final ? '' : undefined}>
      <div className={styles.card}>
        <span className={styles.label}>Portfolio</span>
        <span className={styles.value} data-inspect="rolling-number">
          $
          {[...format(value)].map((char, index) =>
            places[index] < 0 ? (
              <span key={index}>{char}</span>
            ) : (
              <span key={index} className={styles.column} data-inspect="rolling-number-digit">
                <span className={styles.strip} style={{ '--strip': strips[places[index]] } as CSSProperties}>
                  {STRIP}
                </span>
              </span>
            ),
          )}
        </span>

        <span className={styles.today}>
          <span
            className={styles.pill}
            data-inspect="rolling-number-pill"
            data-trend={rise ? 'up' : 'down'}
            data-flash={step.flash ? '' : undefined}
          >
            <span className={styles.flash} data-inspect="rolling-number-flash" />
            <span className={styles.change}>{change(value)}</span>
          </span>
          <span className={styles.when}>Today</span>
          <svg className={styles.spark} viewBox="0 0 72 28" aria-hidden="true" data-inspect="rolling-number-sparkline">
            <path className={styles.close} d={`M1 ${SPARK.close}H71`} />
            <path className={styles.line} d={SPARK.line} />
            <circle className={styles.now} cx={SPARK.end[0]} cy={SPARK.end[1]} r="2.25" />
          </svg>
        </span>
      </div>

      <span className={styles.footer}>
        <span>Buying power</span>
        <span className={styles.power}>$1,204.55</span>
      </span>
    </div>
  );
}
