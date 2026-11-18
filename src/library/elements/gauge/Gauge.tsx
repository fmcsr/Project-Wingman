import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './Gauge.module.css';

/** The scale runs from 300 to 850 and splits into five bands, from Very poor to Excellent. */
const MIN = 300;
const MAX = 850;
const ZONES = [
  { name: 'Very poor', from: 300, to: 499 },
  { name: 'Poor', from: 500, to: 600 },
  { name: 'Fair', from: 601, to: 660 },
  { name: 'Good', from: 661, to: 780 },
  { name: 'Excellent', from: 781, to: 850 },
];

/** The score in the still picture, up 6 points on the last report; the loop's refresh a week later adds 6 more. */
const SCORE = 742;
const CHANGE = 6;
const NEXT = SCORE + CHANGE;

/** What else the report says, each factor graded like the score's bands. */
const FACTORS = [
  { name: 'Payment history', value: '100%', zone: 4 },
  { name: 'Card use', value: '9%', zone: 4 },
  { name: 'Credit age', value: '7 yrs 4 mos', zone: 3 },
  { name: 'Hard inquiries', value: '2', zone: 3 },
];

/*
 * The arc, in a 200 × 100 picture: its center line is a half circle of radius 86.5 around the middle of the bottom
 * edge, 13 thick, with a 3-wide gap between bands. Only its two outer ends are rounded.
 */
const CX = 100;
const CY = 100;
const R = 86.5;
const STROKE = 13;
const GAP = 3;

/** How far round the arc a score sits, in radians from the left end (π at the right end). */
const turn = (score: number) => (Math.PI * (score - MIN)) / (MAX - MIN);

/** The point on the arc's center line `angle` radians from the left end. */
const point = (angle: number) => [CX - R * Math.cos(angle), CY - R * Math.sin(angle)];

/** Each band's stretch of arc, a half gap short of its neighbors at the score halfway between them. */
const BANDS = ZONES.map((zone, index) => {
  const inset = GAP / 2 / R;
  const start = index === 0 ? 0 : turn(zone.from - 0.5) + inset;
  const end = index === ZONES.length - 1 ? Math.PI : turn(zone.to + 0.5) - inset;
  return { ...zone, d: `M${point(start).join(' ')}A${R} ${R} 0 0 1 ${point(end).join(' ')}` };
});

const bandOf = (score: number) => ZONES.findIndex((zone) => Math.round(score) <= zone.to);

/**
 * One moment of the loop: the score where the marker stands (it moves between whole points), whether it has
 * landed (the band and the change show), whether the refresh has come in, and whether the readout is faded out
 * while the loop goes back to the start.
 */
type Frame = { score: number; landed: boolean; refreshed: boolean; dim: boolean };

/*
 * The loop, in ms: a short rest at 300, the sweep up to 742 with an ease-out while the figure counts, a hold, the
 * refresh that nudges it to 748, another hold, and a fade back to the start.
 */
const SWEEP_AT = 400;
const SWEEP_MS = 1500;
const REFRESH_AT = 5600;
const REFRESH_MS = 800;
const DIP_AT = 9400;
const DIP_MS = 260;
const LOOP_MS = 9900;

const clamp = (t: number) => Math.min(Math.max(t, 0), 1);
const easeOut = (t: number) => 1 - (1 - t) ** 3;

function frameAt(t: number): Frame {
  if (t >= DIP_AT + DIP_MS) return { score: MIN, landed: false, refreshed: false, dim: false };
  if (t >= DIP_AT) return { score: NEXT, landed: true, refreshed: true, dim: true };
  if (t >= REFRESH_AT) {
    const share = easeOut(clamp((t - REFRESH_AT) / REFRESH_MS));
    return { score: SCORE + (NEXT - SCORE) * share, landed: true, refreshed: true, dim: false };
  }
  if (t >= SWEEP_AT + SWEEP_MS) return { score: SCORE, landed: true, refreshed: false, dim: false };
  const share = easeOut(clamp((t - SWEEP_AT) / SWEEP_MS));
  return { score: MIN + (SCORE - MIN) * share, landed: false, refreshed: false, dim: false };
}

const FINAL: Frame = { score: SCORE, landed: true, refreshed: false, dim: false };

const same = (a: Frame, b: Frame) =>
  a.score === b.score && a.landed === b.landed && a.refreshed === b.refreshed && a.dim === b.dim;

/**
 * Runs the loop while `playing` and holds wherever it is otherwise. It renders only while something changes: the
 * figure counting, or a beat starting.
 */
function useFrame(playing: boolean, final: boolean) {
  const [frame, setFrame] = useState(() => frameAt(0));
  const elapsed = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const begin = performance.now() - elapsed.current;
    let id = requestAnimationFrame(function tick(now) {
      elapsed.current = (now - begin) % LOOP_MS;
      const next = frameAt(elapsed.current);
      setFrame((current) => (same(current, next) ? current : next));
      id = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [playing]);

  return final ? FINAL : frame;
}

const ARROW_UP = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 12.5v-9M4.25 7.25 8 3.5l3.75 3.75" />
  </svg>
);

/**
 * Gauge: a credit score card with the score on a half-circle dial split into five colored bands, from Very poor to
 * Excellent, a marker on the arc at the score, the score's band, the 300 and 850 ends of the scale and how much it
 * moved since the last report. A wider card lists what shapes the score beside it. In the loop the marker sweeps up
 * from 300 with an ease-out while the figure counts up, the band and the change land, and a week later the report
 * refreshes and nudges the score up to 748.
 */
export function Gauge() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useFrame(playing, final);
  const score = Math.round(frame.score);
  const band = bandOf(frame.score);
  const [x, y] = point(turn(frame.score));

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-landed={frame.landed || undefined}
      data-refreshed={frame.refreshed || undefined}
      data-dim={frame.dim || undefined}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.title}>Credit score</span>
          <span className={styles.updated}>
            <span className={styles.before}>Updated Nov 11</span>
            <span className={styles.after}>Updated today</span>
          </span>
        </div>

        <div className={styles.body}>
          <div className={styles.gauge} data-inspect="gauge">
            <svg className={styles.dial} viewBox="0 0 200 100" aria-hidden="true">
              {BANDS.map((zone, index) => (
                <path
                  key={zone.name}
                  className={styles.zone}
                  d={zone.d}
                  style={{ stroke: `var(--zone-${index})` } as CSSProperties}
                  data-inspect="gauge-zone"
                />
              ))}
              {/* Round outer ends: a dot of each end band's color under its square end */}
              <circle className={styles.cap} cx={CX - R} cy={CY} r={STROKE / 2} style={{ fill: 'var(--zone-0)' }} />
              <circle className={styles.cap} cx={CX + R} cy={CY} r={STROKE / 2} style={{ fill: 'var(--zone-4)' }} />
              <g className={styles.marker} transform={`translate(${x} ${y})`} data-inspect="gauge-marker">
                <circle r="9.5" />
              </g>
            </svg>

            <div className={styles.readout}>
              <span className={styles.value} data-inspect="gauge-value">
                {score}
              </span>
              <span className={styles.band} data-inspect="gauge-band">
                <span className={styles.swatch} style={{ background: `var(--zone-${band})` }} />
                {ZONES[band].name}
              </span>
            </div>

            <div className={styles.scale}>
              <span className={styles.min}>{MIN}</span>
              <span className={styles.change} data-inspect="gauge-change">
                {ARROW_UP}
                {CHANGE} pts
              </span>
              <span className={styles.max}>{MAX}</span>
            </div>
          </div>

          <div className={styles.factors}>
            <span className={styles.factorsTitle}>Credit factors</span>
            {FACTORS.map((factor) => (
              <span key={factor.name} className={styles.factor}>
                <span className={styles.swatch} style={{ background: `var(--zone-${factor.zone})` }} />
                <span className={styles.factorName}>{factor.name}</span>
                <span className={styles.factorValue}>{factor.value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
