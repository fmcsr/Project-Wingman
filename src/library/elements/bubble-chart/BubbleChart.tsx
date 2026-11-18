import { Fragment, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './BubbleChart.module.css';

type Feature = {
  name: string;
  /** How much work it is, 0–10, across. */
  effort: number;
  /** Expected impact, 0–10, up. */
  impact: number;
  /** How many customers asked for it in the last 90 days; the bubble's area follows it. */
  requests: number;
};

/**
 * Requests for a project tool's next quarter, scored 0–10 for effort and impact and spread over the four quadrants.
 * They're placed so the quadrant names and CSV export's tooltip stay clear of every bubble.
 */
const CSV: Feature = { name: 'CSV export', effort: 2, impact: 7.5, requests: 128 };
const SLACK: Feature = { name: 'Slack alerts', effort: 3.9, impact: 8.6, requests: 64 };
const FEATURES: Feature[] = [
  CSV,
  SLACK,
  { name: 'Public API', effort: 8, impact: 7.4, requests: 112 },
  { name: 'SSO', effort: 6.4, impact: 8.6, requests: 54 },
  { name: 'Dark mode', effort: 4.2, impact: 2, requests: 96 },
  { name: 'Reactions', effort: 1.4, impact: 2.2, requests: 31 },
  { name: 'Offline mode', effort: 8.6, impact: 3.1, requests: 41 },
  { name: 'Themes', effort: 6.4, impact: 2.2, requests: 18 },
];

/** The four quadrants, named for what a feature in each is worth doing. */
const QUADRANTS = [
  { name: 'Quick wins', corner: 'top-left' },
  { name: 'Big bets', corner: 'top-right' },
  { name: 'Fill-ins', corner: 'bottom-left' },
  { name: 'Money pits', corner: 'bottom-right' },
];

/** Votes coming in for Slack alerts during the loop. */
const VOTES = [64, 71, 79];

/** A bubble's radius in px: its area, not its width, grows with the requests, 12px across the scale's top at 128. */
const radius = (requests: number) => 12 * Math.sqrt(requests / 128);

/** The size legend's two sample bubbles. */
const SAMPLES = [100, 25];

/**
 * One moment of the loop: whether the bubbles are in, whether the pointer is on CSV export (its tooltip open), how
 * many requests Slack alerts has, and how long the moment lasts. `hold` moments wait while the tile is inspected or
 * out of view.
 */
type Step = { settled: boolean; hover?: boolean; votes: number; ms: number; hold?: boolean };

/**
 * The bubbles settle in one after another with a little spring. The pointer comes to CSV export and its tooltip
 * opens; it leaves, and votes come in for Slack alerts, which grows twice, a ring pulsing out and the new votes rising
 * from it each time. The bubbles leave and the loop starts over.
 */
const STEPS: Step[] = [
  { settled: false, votes: VOTES[0], ms: 400 },
  { settled: true, votes: VOTES[0], ms: 1800, hold: true },
  { settled: true, hover: true, votes: VOTES[0], ms: 2800, hold: true },
  { settled: true, votes: VOTES[0], ms: 800, hold: true },
  { settled: true, votes: VOTES[1], ms: 1100, hold: true },
  { settled: true, votes: VOTES[2], ms: 2000, hold: true },
  { settled: false, votes: VOTES[2], ms: 500 },
];

/** The still picture: settled, the votes in, the tooltip on CSV export. */
const FINAL: Step = { settled: true, hover: true, votes: VOTES[2], ms: 0 };

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

/** Where a feature sits in the plot, as fractions of its width and height (impact runs up). */
const place = (feature: Feature) =>
  ({
    '--x': feature.effort / 10,
    '--y': 1 - feature.impact / 10,
    '--r': `${radius(feature.requests)}px`,
  }) as CSSProperties;

/**
 * Bubble chart: feature requests on a prioritization matrix, effort across and impact up, each bubble's area the
 * number of customers who asked. Dashed guides split the plot into four named quadrants, and a size legend explains
 * the bubbles. In the loop the bubbles settle in, the pointer opens CSV export's tooltip, and Slack alerts grows as
 * votes come in.
 */
export function BubbleChart() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const growth = radius(step.votes) / radius(SLACK.requests);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-settled={step.settled || undefined}
      data-hover={step.hover || undefined}
      data-paused={playing ? undefined : ''}
    >
      <div className={styles.card} data-inspect="bubble-chart">
        <div className={styles.header}>
          <span className={styles.title}>Feature requests</span>
          <span className={styles.period}>Last 90 days</span>
        </div>

        <span className={styles.yTitle} data-inspect="bubble-chart-axis">
          Impact →
        </span>

        <div className={styles.plot}>
          <span className={styles.yAxis} data-inspect="bubble-chart-axis" />
          <span className={styles.xAxis} data-inspect="bubble-chart-axis" />

          <span className={styles.guideX} data-inspect="bubble-chart-quadrant" />
          <span className={styles.guideY} data-inspect="bubble-chart-quadrant" />
          {QUADRANTS.map(({ name, corner }) => (
            <span key={name} className={styles.quadrant} data-corner={corner} data-inspect="bubble-chart-quadrant">
              {name}
            </span>
          ))}

          {FEATURES.map((feature, index) => (
            <span
              key={feature.name}
              className={styles.bubble}
              data-inspect="bubble-chart-bubble"
              data-target={feature === CSV || undefined}
              style={{ ...place(feature), '--i': index } as CSSProperties}
            >
              <span
                className={styles.disc}
                style={feature === SLACK ? ({ '--grow': growth } as CSSProperties) : undefined}
              />
              <span className={styles.name} data-side={feature.effort > 7.5 ? 'left' : undefined}>
                {feature.name}
              </span>
              {feature === SLACK && step.votes > VOTES[0] && (
                <Fragment key={step.votes}>
                  <span className={styles.pulse} />
                  <span className={styles.votes}>+{step.votes - VOTES[VOTES.indexOf(step.votes) - 1]}</span>
                </Fragment>
              )}
            </span>
          ))}

          <div className={styles.tooltip} style={place(CSV)}>
            <div className={styles.tip} data-inspect="bubble-chart-tooltip">
              <span className={styles.tipValue}>
                {CSV.name} · {CSV.requests} requests
              </span>
              <span className={styles.tipDetail}>
                Impact {CSV.impact} · Effort {CSV.effort}
              </span>
            </div>
          </div>

          <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
            <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
          </svg>
        </div>

        <div className={styles.footer}>
          <span className={styles.xTitle} data-inspect="bubble-chart-axis">
            Effort →
          </span>
          <span className={styles.legend} data-inspect="bubble-chart-legend">
            Requests
            <span className={styles.samples}>
              {SAMPLES.map((requests) => (
                <span
                  key={requests}
                  className={styles.sample}
                  style={{ '--r': `${radius(requests)}px` } as CSSProperties}
                />
              ))}
            </span>
            <span className={styles.sampleLabels}>
              {SAMPLES.map((requests) => (
                <span key={requests}>{requests}</span>
              ))}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
