import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './WaterfallChart.module.css';

type Kind = 'total' | 'increase' | 'decrease';

type Bar = {
  label: string;
  /** The label on narrow tiles. */
  short: string;
  kind: Kind;
  /** In thousands of dollars of monthly recurring revenue: a total's level, or a change (negative for decreases). */
  value: number;
  /** How many customers a change came from. */
  customers?: number;
};

/**
 * A quarter of monthly recurring revenue, July 1 to September 30, 2026: $42.0k at the start, plus new customers and
 * upgrades, minus downgrades and cancellations, $52.9k at the end. Every change is its customers times about $150 a
 * month, and the changes add up to the ending total.
 */
const BARS: Bar[] = [
  { label: 'Starting', short: 'Start', kind: 'total', value: 42 },
  { label: 'New', short: 'New', kind: 'increase', value: 12.4, customers: 83 },
  { label: 'Expansion', short: 'Expan.', kind: 'increase', value: 5.2, customers: 46 },
  { label: 'Contraction', short: 'Contr.', kind: 'decrease', value: -2.1, customers: 19 },
  { label: 'Churn', short: 'Churn', kind: 'decrease', value: -4.6, customers: 31 },
  { label: 'Ending', short: 'End', kind: 'total', value: 52.9 },
];

/** Where each bar runs from and to: totals stand on zero, changes float from the running total. */
const SPANS = BARS.reduce<{ from: number; to: number }[]>((spans, bar, index) => {
  const level = index === 0 ? 0 : spans[index - 1].to;
  return [...spans, bar.kind === 'total' ? { from: 0, to: bar.value } : { from: level, to: level + bar.value }];
}, []).map(({ from, to }) => ({ from: Math.round(from * 10) / 10, to: Math.round(to * 10) / 10 }));

const CHURN = BARS.findIndex((bar) => bar.label === 'Churn');

const thousands = (value: number) => `${Math.abs(value).toFixed(1)}k`;
const sign = (bar: Bar) => (bar.kind === 'total' ? '' : bar.value > 0 ? '+' : '−');

/**
 * One moment of the loop: whether the bars have built up, whether the pointer is on Churn, and how long the moment
 * lasts. `hold` moments wait while the tile is inspected or out of view; `fade` clears the chart before it builds again.
 */
type Step = { built: boolean; hover: boolean; ms: number; hold?: boolean; fade?: boolean };

/**
 * The bars build left to right, each from where the last one ended; the pointer comes to Churn, which lights up with
 * its tooltip while the others fade back; it leaves, the chart clears and builds again.
 */
const STEPS: Step[] = [
  { built: false, hover: false, ms: 500 },
  { built: true, hover: false, ms: 3000, hold: true },
  { built: true, hover: true, ms: 2800, hold: true },
  { built: true, hover: false, ms: 1100, hold: true },
  { built: true, hover: false, ms: 320, fade: true },
];

/** The still picture: built, the pointer on Churn. */
const FINAL: Step = { built: true, hover: true, ms: 0 };

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
 * Waterfall chart: a quarter's MRR bridge in a billing dashboard. Starting MRR stands on the baseline, each change
 * floats from where the last one ended (increases green and rising, decreases red and falling), thin connectors carry
 * the running total from bar to bar, and Ending MRR lands back on the baseline. In the loop the bars build one after
 * another; then the pointer rests on Churn, which keeps its color and shows its tooltip while the others fade back.
 */
export function WaterfallChart() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const churn = BARS[CHURN];

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-built={step.built || undefined}
      data-hover={step.hover || undefined}
      data-fade={step.fade || undefined}
    >
      <div className={styles.card} data-inspect="waterfall-chart">
        <div className={styles.header}>
          <span className={styles.title}>MRR bridge</span>
          <span className={styles.period}>Q3 2026</span>
        </div>

        <div className={styles.plot}>
          {[20, 40, 60].map((level) => (
            <span key={level} className={styles.gridline} style={{ '--at': level } as CSSProperties}>
              <span className={styles.tick}>${level}k</span>
            </span>
          ))}

          <div className={styles.bars}>
            {BARS.map((bar, index) => {
              const { from, to } = SPANS[index];
              const top = Math.max(from, to);
              return (
                <div
                  key={bar.label}
                  className={styles.slot}
                  data-dim={(step.hover && index !== CHURN) || undefined}
                  style={{ '--i': index } as CSSProperties}
                >
                  <span
                    className={styles.bar}
                    data-kind={bar.kind}
                    data-inspect={`waterfall-chart-${bar.kind}`}
                    style={{ '--from': Math.min(from, to), '--size': Math.abs(to - from) } as CSSProperties}
                  />
                  {index < BARS.length - 1 && (
                    <span
                      className={styles.connector}
                      data-inspect="waterfall-chart-connector"
                      style={{ '--at': to } as CSSProperties}
                    />
                  )}
                  <span
                    className={styles.value}
                    data-inspect="waterfall-chart-value"
                    data-hidden={(step.hover && index === CHURN) || undefined}
                    style={{ '--at': top } as CSSProperties}
                  >
                    {sign(bar)}
                    <span className={styles.currency}>$</span>
                    {thousands(bar.value)}
                  </span>
                  <span className={styles.label}>
                    <span className={styles.long}>{bar.label}</span>
                    <span className={styles.short}>{bar.short}</span>
                  </span>
                </div>
              );
            })}

            <div className={styles.tooltip} style={{ '--i': CHURN, '--at': SPANS[CHURN].to } as CSSProperties}>
              <div className={styles.bubble} data-inspect="waterfall-chart-tooltip">
                <span className={styles.tipValue}>−${(Math.abs(churn.value) * 1000).toLocaleString('en-US')} MRR</span>
                <span className={styles.tipDetail}>
                  <span className={styles.tipName}>{churn.label} · </span>
                  {churn.customers} customers
                </span>
              </div>
            </div>

            <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
              <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
