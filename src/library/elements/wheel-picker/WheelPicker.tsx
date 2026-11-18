import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './WheelPicker.module.css';

/** Rows sit on the rim of a cylinder: 34px rows on a 96px radius are about 20° apart. */
const ROW = 34;
const RADIUS = 96;
const STEP = (ROW / RADIUS) * (180 / Math.PI);

const HOURS = Array.from({ length: 12 }, (_, index) => String(index === 0 ? 12 : index));
const MINUTES = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

type Time = { hour: number; minute: number };

/**
 * The loop: the time each step sets and how long the step lasts, spin included. The hour wheel is flicked from 6 to
 * 8, then the minute wheel from 30 to 45, and after a rest both spin back to 6:30.
 */
const STEPS: { time: Time; ms: number }[] = [
  { time: { hour: 6, minute: 30 }, ms: 3400 },
  { time: { hour: 8, minute: 30 }, ms: 1800 },
  { time: { hour: 8, minute: 45 }, ms: 3000 },
];

/** Momentum: a flick starts fast and slows down until the wheel stops on its row (an exponential ease-out). */
function decelerate(t: number) {
  return (1 - Math.exp(-4.5 * t)) / (1 - Math.exp(-4.5));
}

/**
 * A wheel's position in rows, following `target`: each change is a flick that slows down into the new row, longer
 * for a longer way. It stands on `target` when `final`.
 */
function useFlick(target: number, final: boolean) {
  const [position, setPosition] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    if (final) return;
    const from = current.current;
    const distance = target - from;
    if (distance === 0) return;
    const duration = Math.min(1500, 480 + 70 * Math.abs(distance));
    const begin = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min((now - begin) / duration, 1);
      current.current = from + distance * decelerate(t);
      setPosition(current.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [target, final]);

  return final ? target : position;
}

/**
 * Rows fade as they turn away from the band: about half as strong one row out, a fifth two rows out, and gone before
 * the third, where the cylinder would squeeze them into slivers.
 */
function fade(rows: number) {
  const distance = Math.abs(rows);
  return Math.exp(-0.75 * distance) * Math.min(1, Math.max(0, (2.9 - distance) / 0.7));
}

type WheelProps = {
  /** Where the wheel stands, in rows: a whole number is a row resting in the band. */
  position: number;
  values: string[];
  /** The hour and minute wheels repeat their values without end; the AM/PM wheel stops at both ends. */
  cyclic?: boolean;
  className: string;
  inspect?: string;
};

/** One wheel: the rows near the band, each turned to its angle on the cylinder. */
function Wheel({ position, values, cyclic = false, className, inspect }: WheelProps) {
  const center = Math.round(position);
  const rows = [];
  for (let index = center - 4; index <= center + 4; index++) {
    if (!cyclic && (index < 0 || index >= values.length)) continue;
    // Rows above the band (lower values) turn up and away, rows below turn down
    const angle = (position - index) * STEP;
    if (Math.abs(position - index) >= 2.9) continue;
    rows.push(
      <span
        key={index}
        className={styles.row}
        style={{ transform: `rotateX(${angle}deg) translateZ(${RADIUS}px)`, opacity: fade(position - index) }}
      >
        {values[((index % values.length) + values.length) % values.length]}
      </span>,
    );
  }
  return (
    <span className={`${styles.wheel} ${className}`} data-inspect={inspect}>
      <span className={styles.drum}>{rows}</span>
    </span>
  );
}

/**
 * The top of iOS's Add Alarm sheet: a close button, the title and the confirm button over a time picker in the
 * wheels style (hours, minutes, AM/PM). The loop: the hour wheel is flicked and slows down into 8, then the minute
 * wheel into 45; after a rest both spin back to 6:30. The final state is 6:30 AM.
 */
export function WheelPicker() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setStep((current) => (current + 1) % STEPS.length), STEPS[step].ms);
    return () => window.clearTimeout(id);
  }, [step, playing]);

  const { time } = STEPS[final ? 0 : step];
  const hour = useFlick(time.hour, final);
  const minute = useFlick(time.minute, final);

  return (
    <div ref={ref} className={styles.tile}>
      <div className={styles.header}>
        <span className={styles.close}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
          </svg>
        </span>
        <span className={styles.title}>Add Alarm</span>
        <span className={styles.confirm} data-inspect="wheel-picker-confirm">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 12.5l4.2 4.2 8.8-9.4" />
          </svg>
        </span>
      </div>

      <div className={styles.picker} style={{ '--radius': `${RADIUS}px` } as CSSProperties} data-inspect="wheel-picker">
        <Wheel position={hour} values={HOURS} cyclic className={styles.hours} inspect="wheel-picker-wheel" />
        <Wheel position={minute} values={MINUTES} cyclic className={styles.minutes} />
        <Wheel position={0} values={PERIODS} className={styles.period} />
        <span className={styles.band} data-inspect="wheel-picker-selection-indicator" />
      </div>
    </div>
  );
}
