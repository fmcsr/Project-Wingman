import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './RangeSlider.module.css';

/** The scale: $20 to $240, where the top stands for $240 and up. */
const LOW = 20;
const HIGH = 240;
const BUCKET = 5;

/**
 * How many stays there are per $5 of nightly price, as shares of the tallest bar: most between $80 and $140, a long
 * tail of pricier ones, and the last bar holding everything from $235 up.
 */
const HISTOGRAM = [
  0.05, 0.08, 0.07, 0.13, 0.18, 0.24, 0.22, 0.33, 0.41, 0.47, 0.58, 0.63, 0.74, 0.7, 0.86, 0.93, 1, 0.9, 0.95, 0.84,
  0.88, 0.76, 0.69, 0.72, 0.58, 0.55, 0.49, 0.42, 0.45, 0.36, 0.33, 0.27, 0.3, 0.23, 0.21, 0.17, 0.19, 0.14, 0.12, 0.13,
  0.1, 0.09, 0.08, 0.44,
];

const share = (price: number) => (price - LOW) / (HIGH - LOW);
const label = (price: number) => `$${Math.round(price)}${price >= HIGH ? '+' : ''}`;

/** Where the pointer is: off the tile, or on one of the thumbs. */
type Spot = 'off' | 'min' | 'max';

/**
 * One beat of the loop: the two prices at its end, where the pointer is, which thumb is held, and how long it lasts.
 * In a `drag` beat the held thumb travels from the previous beat's price to this one's, easing in and out.
 */
type Step = { min: number; max: number; pointer: Spot; held?: 'min' | 'max'; drag?: boolean; ms: number };

/**
 * The pointer takes the minimum thumb, drags it up to $135 with the price in a tooltip over it, the field and the
 * highlighted bars following, then lets it settle back at $80. Then the maximum: down to $175 and back to $240+.
 */
const STEPS: Step[] = [
  { min: 80, max: 240, pointer: 'off', ms: 1300 },
  { min: 80, max: 240, pointer: 'min', ms: 750 },
  { min: 80, max: 240, pointer: 'min', held: 'min', ms: 250 },
  { min: 135, max: 240, pointer: 'min', held: 'min', drag: true, ms: 950 },
  { min: 135, max: 240, pointer: 'min', held: 'min', ms: 550 },
  { min: 80, max: 240, pointer: 'min', held: 'min', drag: true, ms: 850 },
  { min: 80, max: 240, pointer: 'min', ms: 350 },
  { min: 80, max: 240, pointer: 'max', ms: 700 },
  { min: 80, max: 240, pointer: 'max', held: 'max', ms: 250 },
  { min: 80, max: 175, pointer: 'max', held: 'max', drag: true, ms: 950 },
  { min: 80, max: 175, pointer: 'max', held: 'max', ms: 550 },
  { min: 80, max: 240, pointer: 'max', held: 'max', drag: true, ms: 850 },
  { min: 80, max: 240, pointer: 'max', ms: 350 },
  { min: 80, max: 240, pointer: 'off', ms: 900 },
];

/** Reduced motion: the minimum thumb just taken at $80, its tooltip up, the range at $80 to $240+. */
const FINAL: Step = { min: 80, max: 240, pointer: 'min', held: 'min', ms: 0 };

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * Steps through the loop while `playing` and returns the prices of this moment. Only a drag beat renders frame by
 * frame, since its price counts in the tooltip and the field; a held beat starts over when it resumes.
 */
function useLoop(playing: boolean, final: boolean) {
  const [at, setAt] = useState({ index: 0, t: 0 });

  useEffect(() => {
    if (final || !playing) return;
    const step = STEPS[at.index];
    let frame = 0;
    if (step.drag) {
      const begin = performance.now();
      frame = requestAnimationFrame(function tick(now) {
        const t = Math.min((now - begin) / step.ms, 1);
        setAt((current) => ({ ...current, t }));
        if (t < 1) frame = requestAnimationFrame(tick);
      });
    }
    const id = window.setTimeout(() => setAt({ index: (at.index + 1) % STEPS.length, t: 0 }), step.ms);
    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(frame);
    };
  }, [at.index, playing, final]);

  if (final) return { step: FINAL, min: FINAL.min, max: FINAL.max };
  const step = STEPS[at.index];
  if (!step.drag) return { step, min: step.min, max: step.max };
  const before = STEPS[(at.index + STEPS.length - 1) % STEPS.length];
  const p = ease(at.t);
  return { step, min: before.min + (step.min - before.min) * p, max: before.max + (step.max - before.max) * p };
}

/**
 * Range slider: a stays search's price filter. A histogram of nightly prices sits on a two-thumb slider, the bars
 * between the thumbs in the accent and the rest gray, with Minimum and Maximum fields below. In the loop a pointer
 * drags one thumb at a time, a tooltip over it showing the price while the field and the bars follow, and lets it
 * settle back.
 */
export function RangeSlider() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const { step, min, max } = useLoop(playing, final);
  // The pointer rides the held thumb; between thumbs it travels on its own
  const pointer = step.pointer === 'off' ? 1.12 : share(step.pointer === 'min' ? min : max);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-pointer={step.pointer}
      data-held={step.held}
      data-dragging={step.drag || undefined}
      style={{ '--min': share(min), '--max': share(max), '--pointer': pointer } as CSSProperties}
    >
      <div className={styles.filter}>
        <span className={styles.title}>Price range</span>
        <span className={styles.subtitle}>Nightly prices before fees and taxes</span>

        <div className={styles.chart}>
          <div className={styles.histogram} data-inspect="range-slider-histogram">
            {HISTOGRAM.map((height, index) => {
              const from = LOW + index * BUCKET;
              const inside = from >= Math.round(min) && (from + BUCKET <= Math.round(max) || max >= HIGH);
              return (
                <span
                  key={from}
                  className={styles.bar}
                  style={{ height: `${height * 100}%` }}
                  data-inside={inside || undefined}
                />
              );
            })}
          </div>

          <div className={styles.slider} data-inspect="range-slider">
            <span className={styles.track} data-inspect="range-slider-track">
              <span className={styles.range} data-inspect="range-slider-range" />
            </span>
            {(['min', 'max'] as const).map((thumb) => (
              <span
                key={thumb}
                className={styles.thumb}
                data-thumb={thumb}
                data-held={step.held === thumb || undefined}
                data-inspect="range-slider-thumb"
              >
                <span className={styles.tooltip} data-inspect="range-slider-tooltip">
                  {label(thumb === 'min' ? min : max)}
                </span>
              </span>
            ))}

            <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
              <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
            </svg>
          </div>
        </div>

        <div className={styles.fields}>
          <span className={styles.field} data-inspect="range-slider-field">
            <span className={styles.fieldLabel}>Minimum</span>
            <span className={styles.fieldValue}>{label(min)}</span>
          </span>
          <span className={styles.dash} />
          <span className={styles.field} data-inspect="range-slider-field">
            <span className={styles.fieldLabel}>Maximum</span>
            <span className={styles.fieldValue}>{label(max)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
