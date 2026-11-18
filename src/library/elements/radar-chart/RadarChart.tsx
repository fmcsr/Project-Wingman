import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './RadarChart.module.css';

/** The six axes, clockwise from the top. */
const AXES = ['Speed', 'Price', 'Support', 'Design', 'Reliability', 'Features'];

type Series = { key: 'kite' | 'harbor'; name: string; scores: number[] };

/**
 * Ratings out of 100 from a survey of 412 users who tried both: our app, Kite, wins on speed, support and design;
 * Harbor, the competitor, on price, reliability and features. Each averages a little under 80.
 */
const KITE: Series = { key: 'kite', name: 'Kite', scores: [86, 62, 91, 88, 74, 68] };
const HARBOR: Series = { key: 'harbor', name: 'Harbor', scores: [70, 84, 63, 69, 87, 89] };
const SERIES = [KITE, HARBOR];

/** The axis the pointer checks: Support, Kite's best score. */
const SUPPORT = AXES.indexOf('Support');

/*
 * The picture is 216 × 160 with the center at (108, 80) and the 100 ring 60 from it; the labels sit 9 outside the
 * ring, so "Reliability" still fits on the narrowest tile.
 */
const CX = 108;
const CY = 80;
const RADIUS = 60;

/** A point `share` (0–1) of the way out along an axis. */
function point(axis: number, share: number): [number, number] {
  const angle = (axis * Math.PI) / 3;
  return [CX + share * RADIUS * Math.sin(angle), CY - share * RADIUS * Math.cos(angle)];
}

const polygon = (shares: number[]) => shares.map((share, axis) => point(axis, share).join(',')).join(' ');
const RINGS = [0.2, 0.4, 0.6, 0.8, 1].map((share) => polygon(AXES.map(() => share)));

/** Where each axis's name goes: past the ring's end, anchored away from the center. */
const LABELS = AXES.map((name, axis) => {
  const [x, y] = point(axis, 1);
  const side: 'start' | 'middle' | 'end' = axis === 0 || axis === 3 ? 'middle' : axis < 3 ? 'start' : 'end';
  const dx = side === 'start' ? 7 : side === 'end' ? -7 : 0;
  const dy = axis === 0 ? -8 : axis === 3 ? 15 : axis === 1 || axis === 5 ? 0 : 9;
  return { name, x: x + dx, y: y + dy, side };
});

/**
 * Where the pointer goes, in the picture's own units: resting in its empty bottom-right corner, on Kite's area where
 * Harbor's doesn't reach (between Support and Design), and on Kite's Support point.
 */
const POINTER = { away: [198, 146], area: [128, 115], vertex: point(SUPPORT, KITE.scores[SUPPORT] / 100) };

/**
 * One moment of the loop: whether the polygons have grown, where the pointer is (on Kite's area, Kite comes forward
 * with its scores at its points; on its Support point, the tooltip opens) and how long the moment lasts. `hold`
 * moments wait while the tile is inspected or out of view.
 */
type Step = { grown: boolean; pointer: keyof typeof POINTER; ms: number; hold?: boolean };

/**
 * Both polygons grow out of the center, Kite first. The pointer comes onto Kite's area: Kite comes forward, Harbor
 * fades back and Kite's scores show at its points. It moves on to the Support point, which opens a tooltip comparing
 * the two; then it leaves, the polygons shrink back and the loop starts over.
 */
const STEPS: Step[] = [
  { grown: false, pointer: 'away', ms: 500 },
  { grown: true, pointer: 'away', ms: 1900, hold: true },
  { grown: true, pointer: 'area', ms: 2600, hold: true },
  { grown: true, pointer: 'vertex', ms: 2800, hold: true },
  { grown: true, pointer: 'away', ms: 1000, hold: true },
  { grown: false, pointer: 'away', ms: 600 },
];

/** The still picture: both drawn, the pointer on Kite's Support point. */
const FINAL: Step = { grown: true, pointer: 'vertex', ms: 0 };

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

function Legend({ variant }: { variant: 'row' | 'table' }) {
  return (
    <div className={styles.legend} data-variant={variant} data-inspect="radar-chart-legend">
      {variant === 'table' && (
        <span className={styles.row}>
          <span />
          {SERIES.map((series) => (
            <span key={series.key} className={styles.item} data-series={series.key}>
              <span className={styles.swatch} />
              {series.name}
            </span>
          ))}
        </span>
      )}
      {variant === 'row' &&
        SERIES.map((series) => (
          <span key={series.key} className={styles.item} data-series={series.key}>
            <span className={styles.swatch} />
            {series.name}
          </span>
        ))}
      {variant === 'table' &&
        AXES.map((axis, index) => (
          <span key={axis} className={styles.row}>
            <span className={styles.axisName}>{axis}</span>
            {SERIES.map((series) => (
              <span
                key={series.key}
                className={styles.score}
                data-best={series.scores[index] === Math.max(KITE.scores[index], HARBOR.scores[index]) || undefined}
              >
                {series.scores[index]}
              </span>
            ))}
          </span>
        ))}
    </div>
  );
}

/**
 * Radar chart: two products rated on six axes, as a survey report or a player card shows it. Each product is a
 * translucent polygon over hexagonal grid rings, its corners on the spokes at its scores, with a legend to tell them
 * apart (a score table on wider tiles). In the loop the polygons grow out of the center; the pointer comes onto
 * Kite's area, which brings Kite forward with its scores at its points, then onto the Support point, whose tooltip
 * compares the two products.
 */
export function RadarChart() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const [vx, vy] = POINTER.vertex;
  const [px, py] = POINTER[step.pointer];

  return (
    <div ref={ref} className={styles.tile} data-grown={step.grown || undefined} data-pointer={step.pointer}>
      <div className={styles.card} data-inspect="radar-chart">
        <div className={styles.header}>
          <span className={styles.title}>User ratings</span>
          <Legend variant="row" />
        </div>

        <div className={styles.body}>
          <div className={styles.figure}>
            <svg className={styles.chart} viewBox="0 0 216 160" width="216" height="160" aria-hidden="true">
              <g className={styles.grid} data-inspect="radar-chart-grid">
                {RINGS.map((ring) => (
                  <polygon key={ring} points={ring} />
                ))}
              </g>
              {LABELS.map((label, index) => {
                const [x, y] = point(index, 1);
                return (
                  <g key={label.name} className={styles.spoke} data-inspect="radar-chart-axis">
                    <line x1={CX} y1={CY} x2={x} y2={y} />
                    <line className={styles.hit} x1={CX} y1={CY} x2={x} y2={y} />
                    <text className={styles.label} x={label.x} y={label.y} textAnchor={label.side}>
                      {label.name}
                    </text>
                  </g>
                );
              })}

              {[HARBOR, KITE].map((series, order) => (
                <g
                  key={series.key}
                  className={styles.series}
                  data-series={series.key}
                  style={{ '--order': 1 - order } as CSSProperties}
                >
                  <polygon
                    className={styles.shape}
                    points={polygon(series.scores.map((score) => score / 100))}
                    data-inspect="radar-chart-series"
                  />
                  {series.scores.map((score, axis) => {
                    const [x, y] = point(axis, score / 100);
                    const hovered = series === KITE && axis === SUPPORT;
                    return (
                      <g key={AXES[axis]} transform={`translate(${x} ${y})`}>
                        <circle
                          className={styles.vertex}
                          r="3"
                          data-hovered={hovered || undefined}
                          data-inspect="radar-chart-vertex"
                        />
                        {series === KITE && (
                          <g className={styles.pill}>
                            <rect x="-10.5" y="-7" width="21" height="14" rx="7" />
                            <text y="3.6">{score}</text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              ))}
            </svg>

            <div className={styles.tooltip} style={{ transform: `translate(${vx}px, ${vy}px)` }}>
              <div className={styles.bubble} data-inspect="radar-chart-tooltip">
                <span className={styles.tipTitle}>{AXES[SUPPORT]}</span>
                {SERIES.map((series) => (
                  <span key={series.key} className={styles.tipRow} data-series={series.key}>
                    <span className={styles.key} />
                    {series.name}
                    <span className={styles.tipValue}>{series.scores[SUPPORT]}</span>
                  </span>
                ))}
              </div>
            </div>

            <svg
              className={styles.pointer}
              viewBox="0 0 14 20"
              style={{ transform: `translate(${px}px, ${py}px)` }}
              aria-hidden="true"
            >
              <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
            </svg>
          </div>

          <Legend variant="table" />
        </div>
      </div>
    </div>
  );
}
