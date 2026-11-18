import { memo, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { useDemoMotion, useEvery } from '../../../demos/motion';
import styles from './AlmanacFace.module.css';

/*
 * Geometry, in the 208 × 248 screen's own pixels. Everything on the face is placed by angle (degrees clockwise from
 * 12 o'clock) and radius around the dial's center, the way a watchmaker lays out a dial.
 */
const CX = 104;
const CY = 124;
/** The dial's edge; the corner complications live outside it, in the screen's rounded corners. */
const DIAL = 101;
/** Where the bezel's text and numerals run, between the minute track and the dial's edge. */
const BEZEL = 94.5;
/** The corner complications: their gauges and inner text hug the dial, their large value sits in the corner. */
const CORNER_INNER = 107;
const CORNER_OUTER = 122;
/** The subdials' centers, out from the dial's center toward 12, 3, 6 and 9 o'clock. */
const SUBDIAL = 47;

/** Hours and minutes since midnight as one count, so the hands only ever turn forward: 10:09. */
const START_MINUTES = 10 * 60 + 9;
/**
 * The second: 30 in the product shot, the second hand on 6 o'clock. The loop starts its sweep at 52, so the minute hand
 * steps within seconds.
 */
const FINAL_SECOND = 30;
const LOOP_SECOND = 52;
/** A 10-minute timer started at 10:03:12: 3:42 left at 10:09:30, 3:20 at 10:09:52. It starts over when it runs out. */
const TIMER_TOTAL = 600;
const TIMER_FINAL = 222;
const TIMER_LOOP = 200;
/** Heart rate readings: a new one every six seconds, as the sensor reports them now and then. */
const HEART_RATES = [68, 71, 73, 70, 67, 69];
const HEART_EVERY = 6;

/** A point `r` from the center at `angle` degrees clockwise from 12 o'clock. */
function polar(angle: number, r: number) {
  const radians = (angle * Math.PI) / 180;
  return { x: CX + r * Math.sin(radians), y: CY - r * Math.cos(radians) };
}

/**
 * An arc of radius `r` from one angle to another: clockwise when `to` is the larger angle, counterclockwise when it's
 * the smaller. Text on a clockwise arc stands on the top of the dial; on a counterclockwise one it runs along the
 * bottom, so both read left to right and upright.
 */
function arc(r: number, from: number, to: number) {
  const start = polar(from, r);
  return `M${start.x.toFixed(2)} ${start.y.toFixed(2)}${arcTo(r, from, to)}`;
}

/** The arc command alone, drawn on from wherever the path is, at `from`. */
function arcTo(r: number, from: number, to: number) {
  const end = polar(to, r);
  return `A${r} ${r} 0 0 ${to > from ? 1 : 0} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

/** A band of the dial between two radii and two angles, as a closed shape. */
function band(inner: number, outer: number, from: number, to: number) {
  const corner = polar(to, inner);
  return `${arc(outer, from, to)}L${corner.x.toFixed(2)} ${corner.y.toFixed(2)}${arcTo(inner, to, from)}z`;
}

/**
 * The dial's circle as a path, cut out of a corner's box so that the corner only answers to the pointer outside the
 * dial.
 */
const DIAL_CUTOUT = `M${CX - DIAL} ${CY}a${DIAL} ${DIAL} 0 1 0 ${DIAL * 2} 0a${DIAL} ${DIAL} 0 1 0 ${-DIAL * 2} 0z`;

/** Text set along an arc, centered on its middle; `from` and `to` as for `arc`. */
function CurvedText({
  r,
  from,
  to,
  className,
  children,
}: {
  r: number;
  from: number;
  to: number;
  className: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <>
      <path id={id} d={arc(r, from, to)} fill="none" />
      <text className={className} textAnchor="middle" dominantBaseline="central">
        <textPath href={`#${id}`} startOffset="50%">
          {children}
        </textPath>
      </text>
    </>
  );
}

type Box = { x: number; y: number; width: number; height: number };

/**
 * One corner complication: an SVG drawn in screen coordinates over its corner of the screen. Its box reaches into
 * the dial, so only the part outside the dial picks up the pointer.
 */
function Corner({ inspect, box, children }: { inspect: string; box: Box; children: ReactNode }) {
  const { x, y, width, height } = box;
  return (
    <span className={styles.corner} style={{ left: x, top: y, width, height }} data-inspect={inspect}>
      <svg viewBox={`${x} ${y} ${width} ${height}`} width={width} height={height}>
        <path className={styles.hit} d={`M${x} ${y}h${width}v${height}h${-width}z${DIAL_CUTOUT}`} fillRule="evenodd" />
        {children}
      </svg>
    </span>
  );
}

/** A small glyph centered on a point, such as the sun or the heart in a corner. */
function Glyph({
  at,
  size,
  className,
  children,
}: {
  at: { x: number; y: number };
  size: number;
  className: string;
  children: ReactNode;
}) {
  return (
    <svg className={className} x={at.x - size / 2} y={at.y - size / 2} width={size} height={size} viewBox="0 0 24 24">
      {children}
    </svg>
  );
}

/**
 * The dial: a minute track of 60 ticks with a heavier marker at every hour, and the minutes in fives in the bezel
 * around it. In the top third, where the bezel complication's text and the corners' labels run, the numerals step
 * aside.
 */
const Dial = memo(function Dial() {
  const ticks = Array.from({ length: 60 }, (_, minute) => {
    const hour = minute % 5 === 0;
    const inner = polar(minute * 6, hour ? 76 : 83);
    const outer = polar(minute * 6, 87);
    return (
      <line
        key={minute}
        className={hour ? styles.hourMarker : styles.minuteTick}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
      />
    );
  });
  // The minutes in fives from 15 to 45: the top third belongs to the bezel's text and the corners' labels
  const numerals = Array.from({ length: 7 }, (_, index) => {
    const minutes = (index + 3) * 5;
    const at = polar(minutes * 6, BEZEL);
    return (
      <text key={minutes} className={styles.numeral} x={at.x} y={at.y} textAnchor="middle" dominantBaseline="central">
        {minutes}
      </text>
    );
  });

  return (
    <span className={styles.dial} data-inspect="dial">
      <svg viewBox={`${CX - DIAL} ${CY - DIAL} ${DIAL * 2} ${DIAL * 2}`} width={DIAL * 2} height={DIAL * 2}>
        {ticks}
        {numerals}
      </svg>
    </span>
  );
});

/** The bezel complication: the next event, curved along the top of the dial. It belongs to the date at 12 o'clock. */
const Bezel = memo(function Bezel() {
  return (
    <span className={styles.bezel} data-inspect="bezel">
      <svg viewBox="30 22 148 46" width="148" height="46">
        {/* Hit area: the band of the bezel the text runs in */}
        <path className={styles.hit} d={band(BEZEL - 6, DIAL, -48, 48)} />
        <CurvedText r={BEZEL} from={-60} to={60} className={styles.bezelText}>
          10:30 AM Roadmap review
        </CurvedText>
      </svg>
    </span>
  );
});

/** Top left, gauge with text: the temperature now, large, over the day's range from low to high. */
const WeatherCorner = memo(function WeatherCorner() {
  const id = useId();
  const start = polar(-55, CORNER_INNER);
  const end = polar(-25, CORNER_INNER);
  // 16° in a day that runs from 11° to 21°: halfway along the gauge
  const now = polar(-40, CORNER_INNER);
  return (
    <Corner inspect="corner-weather" box={{ x: 0, y: 0, width: 88, height: 86 }}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={start.x} y1={start.y} x2={end.x} y2={end.y}>
          <stop offset="0" stopColor="#30d158" />
          <stop offset="0.55" stopColor="#ffd60a" />
          <stop offset="1" stopColor="#ff9f0a" />
        </linearGradient>
      </defs>
      <CurvedText r={CORNER_OUTER} from={-60} to={-20} className={styles.cornerValue}>
        16°
      </CurvedText>
      <path className={styles.gauge} d={arc(CORNER_INNER, -55, -25)} stroke={`url(#${id})`} />
      <circle className={styles.gaugeMarker} cx={now.x} cy={now.y} r="2.6" />
      <CurvedText r={CORNER_INNER} from={-67} to={-53} className={`${styles.cornerLabel} ${styles.low}`}>
        11
      </CurvedText>
      <CurvedText r={CORNER_INNER} from={-27} to={-13} className={`${styles.cornerLabel} ${styles.high}`}>
        21
      </CurvedText>
    </Corner>
  );
});

/** UV bands from low to extreme; the index today peaks in the moderate one. */
const UV_BANDS = ['#30d158', '#ffd60a', '#ff9f0a', '#ff453a', '#bf5af2'];

/** Top right, gauge with an image: the UV index on a segmented scale, the sun in the corner. */
const UvCorner = memo(function UvCorner() {
  const from = 30;
  const span = 28;
  const gap = 1.6;
  const segment = (span - gap * (UV_BANDS.length - 1)) / UV_BANDS.length;
  // UV 3: the start of the second band
  const now = polar(from + segment + gap + segment * 0.15, CORNER_INNER);
  return (
    <Corner inspect="corner-uv" box={{ x: 120, y: 0, width: 88, height: 86 }}>
      <Glyph at={polar(40, CORNER_OUTER)} size={18} className={styles.sun}>
        <circle cx="12" cy="12" r="4.6" />
        <path
          className={styles.rays}
          d="M12 2.2v2.6M12 19.2v2.6M2.2 12h2.6M19.2 12h2.6M5.07 5.07l1.84 1.84M17.09 17.09l1.84 1.84M5.07 18.93l1.84-1.84M17.09 6.91l1.84-1.84"
        />
      </Glyph>
      <CurvedText r={CORNER_INNER} from={11} to={27} className={styles.cornerLabel}>
        <tspan className={styles.dim}>UV</tspan> 3
      </CurvedText>
      {UV_BANDS.map((color, index) => {
        const start = from + index * (segment + gap);
        return (
          <path
            key={color}
            className={`${styles.gauge} ${styles.segment}`}
            d={arc(CORNER_INNER, start, start + segment)}
            stroke={color}
          />
        );
      })}
      <circle className={styles.gaugeMarker} cx={now.x} cy={now.y} r="2.6" />
    </Corner>
  );
});

/** Bottom left, text with an image: the heart rate, refreshed now and then. */
function HeartCorner({ bpm }: { bpm: number }) {
  return (
    <Corner inspect="corner-heart" box={{ x: 0, y: 162, width: 88, height: 86 }}>
      <Glyph at={polar(220, CORNER_OUTER)} size={15} className={styles.heart}>
        <path d="M12 21.2c-.4 0-.8-.1-1.1-.4C5.3 16.2 1.6 12.7 1.6 8 1.6 4.6 4.1 2 7.3 2c1.9 0 3.6 1 4.7 2.6C13.1 3 14.8 2 16.7 2c3.2 0 5.7 2.6 5.7 6 0 4.7-3.7 8.2-9.3 12.8-.3.3-.7.4-1.1.4z" />
      </Glyph>
      <CurvedText r={CORNER_INNER} from={240} to={200} className={styles.cornerLabel}>
        {bpm} <tspan className={styles.bpm}>BPM</tspan>
      </CurvedText>
    </Corner>
  );
}

/** Bottom right, stacked text: today's sunset, large, over a small label in the sun's color. */
const SunsetCorner = memo(function SunsetCorner() {
  return (
    <Corner inspect="corner-sunset" box={{ x: 120, y: 162, width: 88, height: 86 }}>
      <CurvedText r={CORNER_OUTER} from={160} to={120} className={styles.cornerValue}>
        4:52PM
      </CurvedText>
      <CurvedText r={CORNER_INNER} from={156} to={124} className={`${styles.cornerLabel} ${styles.sunsetLabel}`}>
        SUNSET
      </CurvedText>
    </Corner>
  );
});

/** A subdial's place: centered on its spoke, out from the dial's center. */
function subdialAt(angle: number) {
  const { x, y } = polar(angle, SUBDIAL);
  return { left: x, top: y };
}

/** 12 o'clock: the date, weekday in the calendar's red over the day. Its bezel text is the next event. */
const DateSubdial = memo(function DateSubdial() {
  return (
    <time className={styles.subdial} style={subdialAt(0)} dateTime="2026-11-18" data-inspect="subdial-date">
      <span className={styles.weekday}>WED</span>
      <span className={styles.day}>18</span>
    </time>
  );
});

/** 3 o'clock: a running timer, its ring a closed gauge that empties as the time runs out. */
function TimerSubdial({ seconds }: { seconds: number }) {
  return (
    <span className={styles.subdial} style={subdialAt(90)} role="timer" data-inspect="subdial-timer">
      <svg className={styles.ring} viewBox="0 0 51 51" width="51" height="51">
        <circle className={styles.timerTrack} cx="25.5" cy="25.5" r="21.5" />
        <circle
          className={styles.timerLeft}
          cx="25.5"
          cy="25.5"
          r="21.5"
          pathLength={100}
          strokeDasharray={`${((seconds / TIMER_TOTAL) * 100).toFixed(1)} 100`}
        />
      </svg>
      <span className={styles.timerTime}>
        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
      </span>
    </span>
  );
}

/** The moon's dark seas, where the light falls on them: soft gray patches that make the disc read as the moon. */
const MARIA = [
  { cx: 28.7, cy: 17.6, rx: 4, ry: 3.6 },
  { cx: 32.4, cy: 23.6, rx: 4.8, ry: 3.8 },
  { cx: 40.2, cy: 19.2, rx: 2.6, ry: 2.3 },
  { cx: 37.4, cy: 28.4, rx: 2.6, ry: 3.8 },
  { cx: 31.6, cy: 31.2, rx: 2.4, ry: 2.2 },
  { cx: 18.6, cy: 15.4, rx: 5.6, ry: 4.6 },
];

/** 6 o'clock: the moon, waxing gibbous, about two-thirds lit from the right. */
const MoonSubdial = memo(function MoonSubdial() {
  const id = useId();
  // The lit part: the right half of the disc, plus a half-ellipse past the middle (r × (2 × 0.63 − 1) wide)
  const lit = 'M25.5 4a21.5 21.5 0 0 1 0 43a5.6 21.5 0 0 1 0-43z';
  return (
    <span className={styles.subdial} style={subdialAt(180)} data-inspect="subdial-moon">
      <svg viewBox="0 0 51 51" width="51" height="51">
        <clipPath id={id}>
          <path d={lit} />
        </clipPath>
        <circle className={styles.moonDark} cx="25.5" cy="25.5" r="21.5" />
        <path className={styles.moonLit} d={lit} />
        <g className={styles.maria} clipPath={`url(#${id})`}>
          {MARIA.map((sea) => (
            <ellipse key={`${sea.cx} ${sea.cy}`} {...sea} />
          ))}
        </g>
      </svg>
    </span>
  );
});

/** Activity rings, outermost first: move, exercise and stand, each the share of its daily goal. */
const RINGS = [
  { key: 'move', r: 22.8, share: 0.42 },
  { key: 'exercise', r: 17.4, share: 0.4 },
  { key: 'stand', r: 12, share: 0.33 },
] as const;

/** 9 o'clock: the day's activity as three small rings, closing as the goals are met. */
const RingsSubdial = memo(function RingsSubdial() {
  return (
    <span className={styles.subdial} style={subdialAt(270)} data-inspect="subdial-rings">
      <svg className={styles.ring} viewBox="0 0 51 51" width="51" height="51">
        {RINGS.map((ring) => (
          <g key={ring.key} className={styles[ring.key]}>
            <circle className={styles.ringTrack} cx="25.5" cy="25.5" r={ring.r} />
            <circle
              className={styles.ringFill}
              cx="25.5"
              cy="25.5"
              r={ring.r}
              pathLength={100}
              strokeDasharray={`${ring.share * 100} 100`}
            />
          </g>
        ))}
      </svg>
    </span>
  );
});

/**
 * Library example: an analog watch face built to carry complications, laid out like the Infograph face on Apple
 * Watch. A dial with a minute track, hour markers and the minutes in fives around the bezel; four circular
 * complications as subdials (the date at 12 o'clock, a running timer, the moon phase and the activity rings); the
 * next event curved along the top of the bezel; and a complication in each of the screen's corners, its text
 * following the curve (the temperature on a gauge, the UV index, the heart rate and the sunset). Shown at 10:09:30,
 * the classic product shot. The second hand sweeps, the minute hand steps forward each time it passes 12, the timer
 * counts down and the heart rate refreshes now and then; all of it holds while inspected. Not interactive; for
 * inspection only.
 */
export function AlmanacFace() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const [minutes, setMinutes] = useState(START_MINUTES);
  const [elapsed, setElapsed] = useState(0);
  useEvery(1000, playing, () => setElapsed((seconds) => seconds + 1));

  const timer = final ? TIMER_FINAL : TIMER_TOTAL - ((TIMER_TOTAL - TIMER_LOOP + elapsed) % TIMER_TOTAL);
  const bpm = final ? HEART_RATES[0] : HEART_RATES[Math.floor(elapsed / HEART_EVERY) % HEART_RATES.length];

  return (
    <div ref={ref} className={styles.face} data-paused={playing ? undefined : ''}>
      <Dial />
      <Bezel />
      <WeatherCorner />
      <UvCorner />
      <HeartCorner bpm={bpm} />
      <SunsetCorner />
      <DateSubdial />
      <TimerSubdial seconds={timer} />
      <MoonSubdial />
      <RingsSubdial />

      <span
        className={`${styles.hand} ${styles.hourHand}`}
        style={{ rotate: `${minutes * 0.5}deg` }}
        data-inspect="hands"
      >
        <svg viewBox="0 0 9 52" width="9" height="52">
          <path d="M1.4 3.1a3.1 3.1 0 0 1 6.2 0v32.8a3.1 3.1 0 0 1-6.2 0zM3.4 35h2.2v17H3.4z" />
        </svg>
      </span>
      <span
        className={`${styles.hand} ${styles.minuteHand}`}
        style={{ rotate: `${minutes * 6}deg` }}
        data-inspect="hands"
      >
        <svg viewBox="0 0 10 91" width="10" height="91">
          <path d="M1.9 3.1a3.1 3.1 0 0 1 6.2 0v66.8a3.1 3.1 0 0 1-6.2 0zM3.9 69h2.2v17H3.9z" />
          <circle cx="5" cy="86" r="4.6" />
        </svg>
      </span>
      <span
        className={`${styles.hand} ${styles.secondHand}`}
        style={final ? { rotate: `${FINAL_SECOND * 6}deg` } : { animationDelay: `${-LOOP_SECOND}s` }}
        data-sweep={final ? undefined : ''}
        data-inspect="second-hand"
        onAnimationIteration={() => setMinutes((count) => count + 1)}
      >
        <svg viewBox="0 0 8 106" width="8" height="106">
          <path d="M3.3 0h1.4v106H3.3z" />
          <circle cx="4" cy="90" r="3.4" />
          <circle className={styles.pinion} cx="4" cy="90" r="1.1" />
        </svg>
      </span>
    </div>
  );
}
