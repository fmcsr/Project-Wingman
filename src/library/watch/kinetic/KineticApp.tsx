import { Fragment, useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './KineticApp.module.css';

type Ring = {
  key: 'move' | 'exercise' | 'stand';
  label: string;
  value: number;
  goal: number;
  unit: string;
  /** The day hour by hour from midnight: calories, minutes, or 1 for each hour with a stand. */
  hours: number[];
  /** The ring's color where it starts and where it closes, its dark track and its figure's color. */
  from: string;
  to: string;
  track: string;
  text: string;
};

/**
 * 7:36 PM: Move is nearly there, Exercise is past its goal and Stand has three hours to go. The hours add up to the
 * figures: a brisk walk to work, a walk at lunch and a run after work, with three hours of meetings without a stand.
 */
const RINGS: Ring[] = [
  {
    key: 'move',
    label: 'Move',
    value: 512,
    goal: 600,
    unit: 'CAL',
    hours: [0, 0, 0, 0, 0, 0, 0, 28, 64, 22, 14, 18, 46, 20, 12, 16, 18, 34, 172, 48, 0, 0, 0, 0],
    from: '#e5104e',
    to: '#ff4f8f',
    track: '#3b0a18',
    text: '#ff2e6c',
  },
  {
    key: 'exercise',
    label: 'Exercise',
    value: 34,
    goal: 30,
    unit: 'MIN',
    hours: [0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 6, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0],
    from: '#45d118',
    to: '#c2ff1d',
    track: '#1f380a',
    text: '#adf41b',
  },
  {
    key: 'stand',
    label: 'Stand',
    value: 9,
    goal: 12,
    unit: 'HRS',
    hours: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    from: '#00b2e9',
    to: '#48f5e6',
    track: '#08333a',
    text: '#2ae2ef',
  },
];

/** Each chart's busiest hour, which fills the chart's height. */
const PEAKS = RINGS.map((ring) => Math.max(...ring.hours));

/** The glyph at each ring's start, as on the real rings: an arrow, a double arrow and an arrow pointing up. */
const GLYPHS: Record<Ring['key'], string> = {
  move: 'M-4.6 0h8.8M.6-3.8 4.4 0 .6 3.8',
  exercise: 'M-5.4 0h9.8M-2.4-3.2.8 0-2.4 3.2M1.8-3.2 5 0 1.8 3.2',
  stand: 'M0 4.6v-8.8M-3.8-.6 0-4.4 3.8-.6',
};

/*
 * The rings' picture: 156 × 156, three concentric rings 18px wide with 2px of black between them, each drawn from
 * 12 o'clock clockwise. The end cap's shadow sits a little ahead of it, blurred.
 */
const SIZE = 156;
const CENTER = SIZE / 2;
const STROKE = 18;
const GAP = 2;
const SHADOW_AHEAD = 3.5;
const SHADOW_BLUR = 3;
const SHADOW_OPACITY = 0.75;
const QUARTERS = [0, 1, 2, 3];

/** Radius of a ring's center line, the outermost first. */
const radius = (index: number) => CENTER - STROKE / 2 - index * (STROKE + GAP);

/** The draw-in: each ring eases out over 1.4 s, 150 ms after the one outside it. The drain takes them back at once. */
const DRAW_MS = 1400;
const STAGGER_MS = 150;
const DRAIN_MS = 700;

/** What the screen shows: the rings drawn or empty, the closed ring pulsing, where the crown has scrolled to. */
type Frame = { filled: boolean; pulse?: boolean; scroll: 'top' | 'figures' | 'end'; crown: boolean };
type Step = Frame & { ms: number };

/** The loop, in steps: each one holds for `ms`, then the next one starts. */
const STEPS: Step[] = [
  // The rings draw in while the figures count up; Exercise passes its goal and keeps going
  { filled: true, scroll: 'top', crown: false, ms: 1900 },
  // Its ring is closed, so it pulses once
  { filled: true, pulse: true, scroll: 'top', crown: false, ms: 1700 },
  // Two turns of the Digital Crown down to the figures and their charts, then one back up
  { filled: true, scroll: 'figures', crown: true, ms: 1900 },
  { filled: true, scroll: 'end', crown: true, ms: 2100 },
  { filled: true, scroll: 'top', crown: true, ms: 1300 },
  // The scroll indicator fades, and after a rest the rings drain for the next round
  { filled: true, scroll: 'top', crown: false, ms: 900 },
  { filled: false, scroll: 'top', crown: false, ms: 1100 },
];

/** The still picture: the rings drawn and the scroll indicator showing, as if the crown had just been touched. */
const FINAL: Frame = { filled: true, scroll: 'top', crown: true };

const clamp = (t: number) => Math.min(Math.max(t, 0), 1);
const easeOut = (t: number) => 1 - (1 - t) ** 4;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * How much of its figure each ring shows, from 0 to 1: they draw in one after another while `filled` and drain
 * together when it turns false. The motion holds while not `playing` and goes on from there; it renders only while
 * something moves.
 */
function useShares(filled: boolean, playing: boolean, final: boolean) {
  const [shares, setShares] = useState(() => RINGS.map(() => 0));
  const latest = useRef(shares);

  useEffect(() => {
    const target = Number(filled);
    const from = latest.current;
    if (!playing || from.every((share) => share === target)) return;
    const begin = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const elapsed = now - begin;
      const eased = from.map((_, index) =>
        filled ? easeOut(clamp((elapsed - index * STAGGER_MS) / DRAW_MS)) : easeInOut(clamp(elapsed / DRAIN_MS)),
      );
      latest.current = from.map((share, index) =>
        eased[index] === 1 ? target : share + (target - share) * eased[index],
      );
      setShares(latest.current);
      if (eased.some((t) => t < 1)) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [filled, playing]);

  return final ? RINGS.map(() => 1) : shares;
}

/** A point on a circle round the rings' center, `degrees` clockwise from 12 o'clock. */
function coords(r: number, degrees: number) {
  const angle = (degrees * Math.PI) / 180;
  return [CENTER + r * Math.sin(angle), CENTER - r * Math.cos(angle)];
}

function point(r: number, degrees: number) {
  const [x, y] = coords(r, degrees);
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

/** A ring's center line from one angle to another, clockwise, up to a quarter turn and a bit. */
const arc = (r: number, from: number, to: number) => `M${point(r, from)}A${r} ${r} 0 0 1 ${point(r, to)}`;

/** The quarter of a ring's band ahead of 12 o'clock: the only place its end cap's shadow can fall. */
function ahead(r: number) {
  const [outer, inner] = [r + STROKE / 2, r - STROKE / 2];
  return `${arc(outer, 0, 90)}L${point(inner, 90)}A${inner} ${inner} 0 0 0 ${point(inner, 0)}Z`;
}

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/** The color `t` of the way along a ring's run, from its start color to its end color. */
function along(ring: Ring, t: number) {
  const [a, b] = [rgb(ring.from), rgb(ring.to)];
  const channels = a.map((channel, i) => Math.round(channel + (b[i] - channel) * t));
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * The ring's color `degrees` along it. An SVG stroke can't follow a curve with its gradient, so each quarter of the
 * ring has a straight gradient from its start to its end; a point takes the color of how far along that chord it
 * lies, which reads as a gradient that turns with the ring.
 */
function colorAt(ring: Ring, degrees: number) {
  const quarter = Math.min(Math.floor(degrees / 90), 3);
  const angle = ((degrees - quarter * 90) * Math.PI) / 180;
  return along(ring, (quarter + (Math.sin(angle) + 1 - Math.cos(angle)) / 2) / 4);
}

type RingArcProps = { ring: Ring; index: number; progress: number; uid: string; pulsing: boolean };

/**
 * One ring at `progress` (1 is the goal). Up to the goal the colored run goes from 12 o'clock to the end cap. Past
 * it the ring is closed and keeps turning: the whole run turns with the end cap, so the cap leads in the brightest
 * color and the run's dark start slips under it, where the cap's shadow falls. The start arrow stays at 12 o'clock,
 * black on the ring, or in the ring's color on its track while the ring is empty.
 */
function RingArc({ ring, index, progress, uid, pulsing }: RingArcProps) {
  const r = radius(index);
  const sweep = Math.min(progress, 1) * 360;
  const drawn = progress > 0 ? undefined : styles.hidden;
  const id = `${uid}-${ring.key}`;

  return (
    <g className={pulsing ? styles.pulse : undefined} data-inspect={`${ring.key}-ring`}>
      <circle className={styles.track} cx={CENTER} cy={CENTER} r={r} stroke={ring.track} data-inspect="ring-track" />
      <g className={drawn} transform={`rotate(${Math.max(progress - 1, 0) * 360} ${CENTER} ${CENTER})`}>
        <circle cx={CENTER} cy={CENTER - r} r={STROKE / 2} fill={ring.from} />
        {QUARTERS.filter((quarter) => sweep > quarter * 90).map((quarter) => (
          // Each quarter runs half a degree into the next, which covers it: no hairline seam where they meet
          <path
            key={quarter}
            className={styles.arc}
            d={arc(r, quarter * 90, Math.min(quarter * 90 + 90.5, sweep))}
            stroke={`url(#${id}-${quarter})`}
          />
        ))}
      </g>
      <g transform={`translate(${CENTER} ${CENTER - r})`} data-inspect="start-arrow">
        {/* As big as the glyph, so the thin arrow is easy to point at */}
        <circle r="6" fill="transparent" />
        <path className={styles.glyph} d={GLYPHS[ring.key]} stroke={progress > 0 ? '#000' : ring.text} />
      </g>
      <g
        className={drawn}
        transform={`rotate(${progress * 360} ${CENTER} ${CENTER})`}
        data-inspect={ring.key === 'exercise' ? 'ring-overlap' : undefined}
      >
        <circle
          className={styles.shadow}
          cx={CENTER + SHADOW_AHEAD}
          cy={CENTER - r}
          r={STROKE / 2}
          opacity={SHADOW_OPACITY}
          filter={`url(#${uid}-blur)`}
          clipPath={`url(#${id}-ahead)`}
        />
        <circle cx={CENTER} cy={CENTER - r} r={STROKE / 2} fill={progress >= 1 ? ring.to : colorAt(ring, sweep)} />
      </g>
    </g>
  );
}

/** The three rings, Move outside, Exercise in the middle and Stand inside, each at its share of its figure. */
function Rings({ shares, uid, pulse }: { shares: number[]; uid: string; pulse: boolean }) {
  return (
    <svg className={styles.rings} viewBox={`0 0 ${SIZE} ${SIZE}`} data-inspect="activity-rings">
      <defs>
        {RINGS.map((ring, index) => (
          <Fragment key={ring.key}>
            {QUARTERS.map((quarter) => {
              const [x1, y1] = coords(radius(index), quarter * 90);
              const [x2, y2] = coords(radius(index), quarter * 90 + 90);
              return (
                <linearGradient
                  key={quarter}
                  id={`${uid}-${ring.key}-${quarter}`}
                  gradientUnits="userSpaceOnUse"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                >
                  <stop offset="0" stopColor={along(ring, quarter / 4)} />
                  <stop offset="1" stopColor={along(ring, (quarter + 1) / 4)} />
                </linearGradient>
              );
            })}
            <clipPath id={`${uid}-${ring.key}-ahead`}>
              <path d={ahead(radius(index))} />
            </clipPath>
          </Fragment>
        ))}
        <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={SHADOW_BLUR} />
        </filter>
      </defs>
      {RINGS.map((ring, index) => (
        <RingArc
          key={ring.key}
          ring={ring}
          index={index}
          progress={(shares[index] * ring.value) / ring.goal}
          uid={uid}
          pulsing={pulse && ring.key === 'exercise'}
        />
      ))}
    </svg>
  );
}

/**
 * Library example: the day's activity on the wrist, laid out like the Activity app on Apple Watch. Three large
 * concentric rings, Move, Exercise and Stand, each over a dark track of its own color with a small arrow at its
 * start, and the time in the corner. Below them, a turn of the Digital Crown away, each ring's figure in its color
 * with the day hour by hour. In the loop the rings draw in one after another with an ease-out while the figures
 * count up; Exercise passes its goal and runs on over its own start, its end cap casting a shadow on the ring below,
 * and pulses once. After a rest the crown scrolls down to the figures and their charts, its scroll indicator showing
 * by the crown, and settles back up; then the rings drain and draw in again. Not interactive; for inspection only.
 */
export function KineticApp() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setStep((current) => (current + 1) % STEPS.length), STEPS[step].ms);
    return () => window.clearTimeout(id);
  }, [step, playing]);

  const shown = final ? FINAL : STEPS[step];
  const shares = useShares(shown.filled, playing, final);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <div ref={ref} className={styles.app} data-scroll={shown.scroll} data-crown={shown.crown ? 'on' : 'off'}>
      <div className={styles.content}>
        <Rings shares={shares} uid={uid} pulse={Boolean(shown.pulse)} />

        <dl className={styles.stats} data-inspect="ring-stats">
          {RINGS.map((ring, index) => (
            <div key={ring.key} className={styles.stat} style={{ '--ring': ring.text } as CSSProperties}>
              <dt className={styles.label}>{ring.label}</dt>
              <dd className={styles.value}>
                {Math.round(shares[index] * ring.value)}/{ring.goal}
                <span className={styles.unit}>{ring.unit}</span>
              </dd>
              <dd className={styles.chart} data-inspect="hourly-chart">
                <span className={styles.plot}>
                  <span className={styles.bars} style={{ transform: `scaleY(${shares[index]})` }}>
                    {ring.hours.map((amount, hour) => (
                      <span key={hour} style={{ height: `${(amount / PEAKS[index]) * 100}%` }} />
                    ))}
                  </span>
                </span>
                <span className={styles.axis}>
                  {['12 AM', '6 AM', '12 PM', '6 PM'].map((time) => (
                    <span key={time}>{time}</span>
                  ))}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <span className={styles.edge} />
      <time className={styles.time} dateTime="19:36" data-inspect="time">
        7:36
      </time>
      <span className={styles.indicator} data-inspect="scroll-indicator">
        <span className={styles.thumb} />
      </span>
    </div>
  );
}
