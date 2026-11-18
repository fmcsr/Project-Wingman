import { Fragment, useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../demos/motion';
import styles from './ActivityRings.module.css';

type Ring = {
  key: 'move' | 'exercise' | 'stand';
  label: string;
  value: number;
  goal: number;
  unit: string;
  /** The day hour by hour, midnight to midnight: calories, minutes, or 1 for each hour with a stand. */
  hours: number[];
  /** Radius of the ring's center line in the 100 × 100 picture. */
  radius: number;
  /** The ring's color from its start to where it closes at 100%, the figure's color and the dark track under it. */
  from: string;
  to: string;
  text: string;
  track: string;
};

/*
 * Three concentric rings, 11.5 wide with 1.2 between them, filling a 100 × 100 picture. Each is drawn from 12 o'clock
 * clockwise and changes color along the way, darker at its start and brighter where it closes.
 */
const STROKE = 11.5;
const GAP = 1.2;
const OUTER = 50 - STROKE / 2;

/**
 * 6:40 PM: Move is nearly there, Exercise is past its goal (the ring runs on over itself), Stand has three hours to
 * go. The hours add up to the figures: a walk to work, a walk at lunch and a run after work.
 */
const RINGS: Ring[] = [
  {
    key: 'move',
    label: 'Move',
    value: 512,
    goal: 600,
    unit: 'CAL',
    hours: [0, 0, 0, 0, 0, 0, 0, 42, 71, 18, 12, 21, 58, 24, 11, 16, 23, 118, 98, 0, 0, 0, 0, 0],
    radius: OUTER,
    from: '#e3134d',
    to: '#ff4b8c',
    text: '#ff2f69',
    track: '#3b0b18',
  },
  {
    key: 'exercise',
    label: 'Exercise',
    value: 34,
    goal: 30,
    unit: 'MIN',
    hours: [0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 5, 0, 0, 0, 0, 17, 5, 0, 0, 0, 0, 0],
    radius: OUTER - (STROKE + GAP),
    from: '#4fd11c',
    to: '#c6ff1e',
    text: '#b2f51c',
    track: '#22380b',
  },
  {
    key: 'stand',
    label: 'Stand',
    value: 9,
    goal: 12,
    unit: 'HRS',
    hours: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    radius: OUTER - 2 * (STROKE + GAP),
    from: '#00b0e6',
    to: '#4bf8ea',
    text: '#31e4f0',
    track: '#0b3439',
  },
];

/** Each chart's tallest hour, which fills the chart's height. */
const PEAKS = RINGS.map((ring) => Math.max(...ring.hours));

/*
 * The loop, in ms: the rings draw in one after another while the figures count up, hold, drain back to zero
 * together, rest a beat and draw in again.
 */
const DRAW_MS = 1300;
const STAGGER_MS = 160;
const DRAIN_AT = 5600;
const DRAIN_MS = 700;
const LOOP_MS = 6900;

const clamp = (t: number) => Math.min(Math.max(t, 0), 1);
const easeOut = (t: number) => 1 - (1 - t) ** 4;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/** How much of its figure each ring shows `t` ms into the loop, from 0 to 1. */
function sharesAt(t: number) {
  return RINGS.map((_, index) =>
    t < DRAIN_AT
      ? easeOut(clamp((t - index * STAGGER_MS) / DRAW_MS))
      : 1 - easeInOut(clamp((t - DRAIN_AT) / DRAIN_MS)),
  );
}

/**
 * Runs the loop while `playing` and holds wherever it is otherwise. It renders only while something moves: during
 * the holds the shares stay equal, so the state doesn't change.
 */
function useShares(playing: boolean, final: boolean) {
  const [shares, setShares] = useState(() => sharesAt(0));
  const elapsed = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const begin = performance.now() - elapsed.current;
    let frame = requestAnimationFrame(function tick(now) {
      elapsed.current = (now - begin) % LOOP_MS;
      const next = sharesAt(elapsed.current);
      setShares((current) => (current.every((share, index) => share === next[index]) ? current : next));
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  return final ? RINGS.map(() => 1) : shares;
}

/** A point on a ring, `degrees` clockwise from 12 o'clock. */
function point(radius: number, degrees: number) {
  const angle = (degrees * Math.PI) / 180;
  return `${50 + radius * Math.sin(angle)} ${50 - radius * Math.cos(angle)}`;
}

/** The ring's center line from one angle to another, clockwise. */
function arc(radius: number, from: number, to: number) {
  return `M${point(radius, from)}A${radius} ${radius} 0 ${to - from > 180 ? 1 : 0} 1 ${point(radius, to)}`;
}

/** The band of the ring a quarter turn ahead of 12 o'clock: where the end cap's shadow can fall. */
function ahead(radius: number) {
  const [outer, inner] = [radius + STROKE / 2, radius - STROKE / 2];
  const edge = `M${point(outer, 0)}A${outer} ${outer} 0 0 1 ${point(outer, 90)}`;
  return `${edge}L${point(inner, 90)}A${inner} ${inner} 0 0 0 ${point(inner, 0)}Z`;
}

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/** The color `t` of the way from `a` to `b`, as a gradient paints it (in sRGB). */
function mix(a: string, b: string, t: number) {
  const [x, y] = [rgb(a), rgb(b)];
  const channels = x.map((channel, i) => Math.round(channel + (y[i] - channel) * t));
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * The color halfway round: each half of the ring has a straight top-to-bottom gradient, which reads as a gradient
 * along the ring (an SVG stroke can't follow a curve).
 */
const middle = (ring: Ring) => mix(ring.from, ring.to, 0.5);

/** The ring's color `degrees` along it, as the two half gradients paint it. */
function colorAt(ring: Ring, degrees: number) {
  const cos = Math.cos((degrees * Math.PI) / 180);
  return degrees <= 180 ? mix(ring.from, middle(ring), (1 - cos) / 2) : mix(middle(ring), ring.to, (1 + cos) / 2);
}

type RingArcProps = { ring: Ring; progress: number; uid: string };

/**
 * One ring at `progress` (1 is the goal). Up to the goal, the colored arc runs from 12 o'clock to the end cap. Past
 * it, the ring is closed and keeps turning: the whole color run rotates with the end cap, so the cap always leads in
 * the brightest color and its dark start slips under the cap, which casts its shadow onto it.
 */
function RingArc({ ring, progress, uid }: RingArcProps) {
  const { key, radius } = ring;
  const sweep = Math.min(progress, 1) * 360;
  const head = progress * 360;
  const shown = progress > 0 ? undefined : styles.hidden;
  const id = `${uid}-${key}`;

  return (
    <g data-inspect={key === 'move' ? 'activity-rings-move' : undefined}>
      <circle className={styles.track} cx="50" cy="50" r={radius} stroke={ring.track} />
      <g className={shown} transform={`rotate(${Math.max(progress - 1, 0) * 360} 50 50)`}>
        <circle cx="50" cy={50 - radius} r={STROKE / 2} fill={ring.from} />
        <path className={styles.arc} d={arc(radius, 0, Math.min(sweep, 180.5))} stroke={`url(#${id}-a)`} />
        {sweep > 180 && <path className={styles.arc} d={arc(radius, 180, sweep)} stroke={`url(#${id}-b)`} />}
      </g>
      <g
        className={shown}
        transform={`rotate(${head} 50 50)`}
        data-inspect={key === 'exercise' ? 'activity-rings-overlap' : undefined}
      >
        <circle
          cx={50 + STROKE * 0.24}
          cy={50 - radius}
          r={STROKE / 2}
          fill="#000"
          opacity="0.85"
          filter={`url(#${uid}-blur)`}
          clipPath={`url(#${id}-ahead)`}
        />
        <circle cx="50" cy={50 - radius} r={STROKE / 2} fill={progress > 1 ? ring.to : colorAt(ring, sweep)} />
      </g>
    </g>
  );
}

/**
 * Activity rings on the fitness app's summary card, black in both themes as in the app: Move, Exercise and Stand,
 * each over a dark track of its own color, with the day's figures beside them. In the loop the rings draw in one
 * after another with an ease-out while the figures count up; Exercise passes its goal and runs on over its own
 * start, its end cap casting a shadow on the ring below. After a hold they drain and draw in again.
 */
export function ActivityRings() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const shares = useShares(playing, final);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <div ref={ref} className={styles.tile}>
      <div className={styles.card}>
        <div className={styles.figures} data-inspect="activity-rings-figures">
          {RINGS.map((ring, index) => (
            <Fragment key={ring.key}>
              <p className={styles.figure} style={{ '--ring': ring.text } as CSSProperties}>
                <span className={styles.label}>{ring.label}</span>
                <span className={styles.value}>
                  {Math.round(shares[index] * ring.value)}/{ring.goal}
                  <span className={styles.unit}>{ring.unit}</span>
                </span>
              </p>
              {/* On a wider card each figure gets its day hour by hour, growing with the ring */}
              <span className={styles.chart} style={{ '--ring': ring.text } as CSSProperties}>
                <span className={styles.bars} style={{ transform: `scaleY(${shares[index]})` }}>
                  {ring.hours.map((amount, hour) => (
                    <span key={hour} style={{ height: `${(amount / PEAKS[index]) * 100}%` }} />
                  ))}
                </span>
              </span>
            </Fragment>
          ))}
          <span className={styles.axis}>
            {['12 AM', '6 AM', '12 PM', '6 PM'].map((time) => (
              <span key={time}>{time}</span>
            ))}
          </span>
        </div>

        <svg className={styles.rings} viewBox="0 0 100 100" data-inspect="activity-rings">
          <defs>
            {RINGS.map((ring) => (
              <Fragment key={ring.key}>
                <linearGradient
                  id={`${uid}-${ring.key}-a`}
                  gradientUnits="userSpaceOnUse"
                  x1="50"
                  y1={50 - ring.radius}
                  x2="50"
                  y2={50 + ring.radius}
                >
                  <stop offset="0" stopColor={ring.from} />
                  <stop offset="1" stopColor={middle(ring)} />
                </linearGradient>
                <linearGradient
                  id={`${uid}-${ring.key}-b`}
                  gradientUnits="userSpaceOnUse"
                  x1="50"
                  y1={50 + ring.radius}
                  x2="50"
                  y2={50 - ring.radius}
                >
                  <stop offset="0" stopColor={middle(ring)} />
                  <stop offset="1" stopColor={ring.to} />
                </linearGradient>
                <clipPath id={`${uid}-${ring.key}-ahead`}>
                  <path d={ahead(ring.radius)} />
                </clipPath>
              </Fragment>
            ))}
            <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={STROKE * 0.2} />
            </filter>
          </defs>
          {RINGS.map((ring, index) => (
            <RingArc key={ring.key} ring={ring} progress={(shares[index] * ring.value) / ring.goal} uid={uid} />
          ))}
        </svg>
      </div>
    </div>
  );
}
