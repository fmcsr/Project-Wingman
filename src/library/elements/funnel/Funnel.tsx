import { useEffect, useLayoutEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './Funnel.module.css';

/**
 * The last 30 days of sign-ups: people who opened the sign-up page, made an account, finished setup and started
 * paying. Each step keeps a share of the one before it: 44%, 61% and 32%, so 8.6% of visitors end up paying.
 */
const STEPS = [
  { name: 'Visited', count: 12480 },
  { name: 'Signed up', count: 5491 },
  { name: 'Activated', count: 3350 },
  { name: 'Paid', count: 1072 },
];

const TOTAL = STEPS[0].count;
const number = (value: number) => value.toLocaleString('en-US');
const share = (value: number) => (value * 100).toFixed(1);
/** Each step's height as a share of the first, in % of the plot. */
const heightOf = (index: number) => (STEPS[index].count / TOTAL) * 100;

/**
 * One beat of the loop: whether the bars have grown in, the step under the pointer (the tooltip's), where the
 * pointer is, and how long the beat lasts.
 */
type Beat = {
  grown: boolean;
  hover?: number;
  pointer: 'away' | number;
  ms: number;
};

/**
 * The bars grow in one after another; the pointer comes in and rests on Activated, where most people are lost after
 * signing up, then on Paid, and leaves; the bars fade and grow in again.
 */
const BEATS: Beat[] = [
  { grown: false, pointer: 'away', ms: 450 },
  { grown: true, pointer: 'away', ms: 1500 },
  { grown: true, pointer: 2, ms: 600 },
  { grown: true, hover: 2, pointer: 2, ms: 2800 },
  { grown: true, pointer: 3, ms: 350 },
  { grown: true, hover: 3, pointer: 3, ms: 2300 },
  { grown: true, pointer: 'away', ms: 700 },
  { grown: false, pointer: 'away', ms: 300 },
];

/** The still picture: drawn, with Activated hovered. */
const FINAL: Beat = { grown: true, hover: 2, pointer: 2, ms: 0 };

function useBeats(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % BEATS.length), BEATS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : BEATS[index];
}

type Size = { width: number; height: number };

/** The size of an element, kept up to date (0 × 0 until it's measured). */
function useSize(element: HTMLElement | null) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!element) return;
    const observer = new ResizeObserver(() => setSize({ width: element.offsetWidth, height: element.offsetHeight }));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return size;
}

/**
 * Where the tooltip goes in the plot: along its top, over the short bars of the later steps, centered on the hovered
 * step but kept inside the plot and clear of the first conversion rate (its pill reaches 16px past the first
 * column's edge), so it never covers a bar's own numbers.
 */
function tooltipAt(step: number, plot: Size, tip: Size) {
  const center = (step + 0.5) * (plot.width / 4);
  return {
    x: Math.round(Math.min(plot.width - tip.width, Math.max(center - tip.width / 2, plot.width / 4 + 20))),
    y: 0,
  };
}

/** Where the pointer rests: a little right of the middle of the step's bar, halfway up it. */
function pointerAt(step: number, plot: Size) {
  return {
    x: Math.round((step + 0.62) * (plot.width / 4)),
    y: Math.round(plot.height * (1 - (heightOf(step) * 0.5) / 100)),
  };
}

/**
 * Funnel chart: a sign-up funnel as four bars, Visited, Signed up, Activated and Paid, each as tall as the people
 * who reached it, with the drop-off from the step before shaded above it and the conversion rate between each pair
 * of steps. In the loop the bars grow in one after another, then the pointer rests on a step, which stays bright
 * while the others dim, and its tooltip spells out how many converted and how many dropped off.
 */
export function Funnel() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const beat = useBeats(playing, final);
  const [plot, setPlot] = useState<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<HTMLDivElement | null>(null);
  const plotSize = useSize(plot);
  const tipSize = useSize(tooltip);

  // The step the tooltip shows (it keeps the last one while hidden) and where the pointer is: off the right edge
  // when it's away
  const shown = beat.hover ?? (typeof beat.pointer === 'number' ? beat.pointer : 2);
  const kept = STEPS[shown].count;
  const lost = STEPS[shown - 1].count - kept;
  const tip = tooltipAt(shown, plotSize, tipSize);
  const pointer =
    typeof beat.pointer === 'number'
      ? pointerAt(beat.pointer, plotSize)
      : { x: plotSize.width + 24, y: plotSize.height * 0.6 };

  return (
    <div ref={ref} className={styles.tile} data-grown={beat.grown || undefined} data-hover={beat.hover}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.title}>Sign-up funnel</span>
          <span className={styles.overall}>
            <b>{share(STEPS[3].count / TOTAL)}%</b> overall
          </span>
        </div>

        <div className={styles.funnel} data-inspect="funnel">
          <div ref={setPlot} className={styles.plot}>
            {[0, 25, 50, 75, 100].map((level) => (
              <span key={level} className={styles.grid} style={{ bottom: `${level}%` }}>
                <span className={styles.tick}>{level}%</span>
              </span>
            ))}

            {STEPS.map((step, index) => (
              <div
                key={step.name}
                className={styles.column}
                style={{ '--i': index } as CSSProperties}
                data-active={beat.hover === index || undefined}
              >
                <span className={styles.stack}>
                  {index > 0 && (
                    <span
                      className={styles.dropoff}
                      style={{
                        bottom: `${heightOf(index)}%`,
                        height: `${heightOf(index - 1) - heightOf(index)}%`,
                      }}
                      data-inspect="funnel-dropoff"
                    />
                  )}
                  <span className={styles.bar} style={{ height: `${heightOf(index)}%` }} data-inspect="funnel-bar" />
                </span>
              </div>
            ))}

            {/* Between each pair of steps, the share that made it across, level with the drop-off it explains */}
            {STEPS.slice(1).map((step, index) => (
              <span
                key={step.name}
                className={styles.rate}
                style={
                  {
                    '--i': index + 1,
                    left: `${(index + 1) * 25}%`,
                    bottom: `${(heightOf(index) + heightOf(index + 1)) / 2}%`,
                  } as CSSProperties
                }
                data-inspect="funnel-rate"
              >
                {Math.round((step.count / STEPS[index].count) * 100)}%
              </span>
            ))}

            <div
              ref={setTooltip}
              className={styles.tooltip}
              style={{ transform: `translate(${tip.x}px, ${tip.y}px)` }}
              data-shown={beat.hover !== undefined || undefined}
              data-inspect="funnel-tooltip"
            >
              <span className={styles.tipTitle}>
                {STEPS[shown].name}
                <span className={styles.tipShare}>{share(kept / STEPS[shown - 1].count)}%</span>
              </span>
              <span className={styles.keyBar} />
              <span>Converted</span>
              <b>{number(kept)}</b>
              <span className={styles.keyDrop} />
              <span>Dropped off</span>
              <b>{number(lost)}</b>
            </div>

            <svg
              className={styles.pointer}
              style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }}
              viewBox="0 0 20 24"
              aria-hidden="true"
            >
              <path d="M3 2.5v16.2l4.1-4 2.7 6.3 2.9-1.2-2.7-6.3h5.8z" />
            </svg>
          </div>

          <div className={styles.axis}>
            {STEPS.map((step) => (
              <span key={step.name} className={styles.step} data-inspect="funnel-label">
                <span className={styles.stepName}>{step.name}</span>
                <span className={styles.stepCount}>{number(step.count)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
