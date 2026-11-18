import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { useDemoMotion, useEvery } from '../../../demos/motion';
import styles from './GlanceStack.module.css';

/*
 * The stack's items in list order, with each one's top and height in pixels: the row of circular widgets, then the
 * weather, calendar and activity widgets, 7px apart. The list shows 208px of itself, from under the time to the
 * bottom of the screen.
 */
const ITEMS = [
  { top: 0, height: 52 },
  { top: 59, height: 80 },
  { top: 146, height: 80 },
  { top: 233, height: 80 },
];
const VIEW = 208;
/** How far the list scrolls at each of its resting places: one item further each time the crown turns. */
const OFFSETS = [0, 59, 146];
/** Where the stack rests during each second of the 9-second loop: three seconds per place, then back to the top. */
const STEPS = [0, 0, 0, 1, 1, 1, 2, 2, 2];
/** The crown's scroll indicator: the track's length and the thumb's, which stands for the share of the list in view. */
const TRACK = 40;
const THUMB = 24;

/** The 10-minute timer running on the face too: 3:42 left at 10:09:30, and it starts over when it runs out. */
const TIMER_TOTAL = 600;
const TIMER_NOW = 222;

type Place = 'past' | 'view' | 'next';

/** Whether an item has scrolled up past the time, is in view, or is still below (the one at the bottom peeks). */
function placeOf(index: number, offset: number): Place {
  const { top, height } = ITEMS[index];
  if (top < offset) return 'past';
  return top + height - offset > VIEW ? 'next' : 'view';
}

/** A glyph in the style of SF Symbols, drawn on a 24 × 24 grid. */
function Glyph({ size, className, children }: { size: number; className?: string; children: ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
      {children}
    </svg>
  );
}

/** A cloud as three overlapping puffs on a flat base; shifted and scaled into each weather glyph. */
function Cloud({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g className={styles.cloud} transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="7.4" cy="14.6" r="4" />
      <circle cx="12.6" cy="11.2" r="5.6" />
      <circle cx="17.2" cy="14.4" r="4.2" />
      <rect x="7.4" y="13" width="9.8" height="5.6" />
    </g>
  );
}

/** Partly cloudy, in the multicolor style: a yellow sun behind a white cloud. */
function PartlyCloudy({ size }: { size: number }) {
  return (
    <Glyph size={size}>
      <circle className={styles.sunDisc} cx="15.6" cy="8.4" r="4.4" />
      <Cloud x={-2.2} y={2.4} scale={0.94} />
    </Glyph>
  );
}

/** Clear: the sun with its rays. */
function Sunny({ size }: { size: number }) {
  return (
    <Glyph size={size}>
      <circle className={styles.sunDisc} cx="12" cy="12" r="4.6" />
      <path
        className={styles.sunRays}
        d="M12 2.4v2.4M12 19.2v2.4M2.4 12h2.4M19.2 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M5.2 18.8l1.7-1.7M17.1 6.9l1.7-1.7"
      />
    </Glyph>
  );
}

/** Overcast: the cloud alone. */
function Cloudy({ size }: { size: number }) {
  return (
    <Glyph size={size}>
      <Cloud y={-1} />
    </Glyph>
  );
}

/** The next hours: time, sky and temperature. Mild, with cloud building after lunch. */
const HOURS = [
  { hour: '11AM', temp: 18, Sky: PartlyCloudy },
  { hour: '12PM', temp: 19, Sky: Sunny },
  { hour: '1PM', temp: 20, Sky: Cloudy },
  { hour: '2PM', temp: 21, Sky: PartlyCloudy },
];

/** The air quality gauge's arc, radius 21 around the widget's center: an open gauge, its colors from good to bad. */
const AQI_ARC = 'M11.15 40.85A21 21 0 1 1 40.85 40.85';

/** Activity rings, outermost first, with the day so far: 42%, 40% and 33% of the goals. */
const RINGS = [
  { key: 'move', r: 24.2, value: '210/500', unit: 'CAL', share: 0.42 },
  { key: 'exercise', r: 17.6, value: '12/30', unit: 'MIN', share: 0.4 },
  { key: 'stand', r: 11, value: '4/12', unit: 'HRS', share: 0.33 },
] as const;

/**
 * Library example: the Smart Stack on Apple Watch, as it opens when the Digital Crown turns up from the watch face.
 * The time moves to the top-right corner, and widgets stand in a column below it: a row of three circular widgets
 * (a workout shortcut, the running timer and the air quality), then rectangular widgets as rounded cards, the weather
 * tinted blue by its app with an hourly forecast, the next meeting and the day's activity. In the loop the crown
 * scrolls the stack one widget at a time, each settling with a slight overshoot, while the Digital Crown scroll
 * indicator shows by the crown and fades once the stack rests; after the last widget it scrolls back to the top. The
 * timer counts down meanwhile. Holds while inspected. Not interactive; for inspection only.
 */
export function GlanceStack() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const aqiGradient = useId();
  const [tick, setTick] = useState(0);
  useEvery(1000, playing, () => setTick((seconds) => seconds + 1));

  const offset = OFFSETS[final ? 0 : STEPS[tick % STEPS.length]];
  // The indicator shows the second the crown turns and fades the next; the still picture keeps it in view
  const scrolling = final || (tick > 0 && tick % 3 === 0);
  const timer = TIMER_TOTAL - ((TIMER_TOTAL - TIMER_NOW + (final ? 0 : tick)) % TIMER_TOTAL);
  const thumb = ((TRACK - THUMB) * offset) / OFFSETS[OFFSETS.length - 1];

  return (
    <div ref={ref} className={styles.screen}>
      <div className={styles.stack} data-inspect="smart-stack">
        <div className={styles.list} style={{ translate: `0 ${-offset}px` }}>
          <div className={styles.row} data-place={placeOf(0, offset)} data-inspect="circular-row">
            <span className={styles.circular} data-inspect="circular-widget">
              <Glyph size={28} className={styles.runner}>
                <circle cx="15.4" cy="3.7" r="2.5" stroke="none" />
                <path d="M13.5 8.4 11 14.6M7.8 10.6l3-2.6 3.2.6 2.6 3.4M11 14.6l3.6 2.6-1.4 4.6M11 14.6l-2.6 4-4.2.4" />
              </Glyph>
            </span>
            <span className={styles.circular} data-inspect="circular-widget">
              <svg className={styles.gauge} viewBox="0 0 52 52" width="52" height="52" data-inspect="gauge">
                <circle className={styles.gaugeHit} cx="26" cy="26" r="22" transform="rotate(-90 26 26)" />
                <circle className={styles.timerTrack} cx="26" cy="26" r="22" />
                <circle
                  className={styles.timerLeft}
                  cx="26"
                  cy="26"
                  r="22"
                  transform="rotate(-90 26 26)"
                  pathLength={100}
                  strokeDasharray={`${((timer / TIMER_TOTAL) * 100).toFixed(1)} 100`}
                />
              </svg>
              <span className={styles.timerTime} role="timer">
                {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
              </span>
            </span>
            <span className={styles.circular} data-inspect="circular-widget">
              <svg className={styles.gauge} viewBox="0 0 52 52" width="52" height="52" data-inspect="gauge">
                <defs>
                  <linearGradient id={aqiGradient} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0.1" stopColor="#30d158" />
                    <stop offset="0.45" stopColor="#ffd60a" />
                    <stop offset="0.7" stopColor="#ff9f0a" />
                    <stop offset="0.95" stopColor="#ff453a" />
                  </linearGradient>
                </defs>
                {/* Three quarters of a circle, from 7:30 over the top to 4:30, open at the bottom for the label */}
                <path className={styles.gaugeHit} d={AQI_ARC} />
                <path className={styles.aqiArc} d={AQI_ARC} stroke={`url(#${aqiGradient})`} />
                {/* AQI 36 on a 0–200 scale: 18% of the way along, just past 9 o'clock */}
                <circle className={styles.aqiMarker} cx="5" cy="24.7" r="2.7" />
              </svg>
              <span className={styles.aqiValue}>36</span>
              <span className={styles.aqiLabel}>AQI</span>
            </span>
          </div>

          <div
            className={`${styles.card} ${styles.weather}`}
            data-place={placeOf(1, offset)}
            data-inspect="weather-widget"
          >
            <div className={styles.weatherTop}>
              <span className={styles.place}>
                Osaka
                <Glyph size={8} className={styles.arrow}>
                  <path d="M21.6 2.4 2.6 10.3l8 2.9 2.9 8z" />
                </Glyph>
              </span>
              <span className={styles.condition}>
                <span data-inspect="condition-symbol">
                  <PartlyCloudy size={14} />
                </span>
                Partly Cloudy
              </span>
            </div>
            <div className={styles.weatherMain}>
              <div className={styles.now}>
                <span className={styles.temp}>16°</span>
                <span className={styles.range}>H:21° L:11°</span>
              </div>
              <div className={styles.hours} data-inspect="hourly-forecast">
                {HOURS.map(({ hour, temp, Sky }) => (
                  <span key={hour} className={styles.hour}>
                    <span className={styles.hourTime}>{hour}</span>
                    <Sky size={14} />
                    <span className={styles.hourTemp}>{temp}°</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.event}`} data-place={placeOf(2, offset)} data-inspect="rect-widget">
            <span className={styles.eventBar} />
            <span className={styles.eventTime}>
              10:30 AM<span className={styles.eventSoon}>in 21 min</span>
            </span>
            <span className={styles.eventTitle}>Roadmap review</span>
            <span className={styles.eventPlace}>Studio B</span>
          </div>

          <div
            className={`${styles.card} ${styles.activity}`}
            data-place={placeOf(3, offset)}
            data-inspect="rect-widget"
          >
            <svg className={styles.rings} viewBox="0 0 54 54" width="54" height="54">
              {RINGS.map((ring) => (
                <g key={ring.key} className={styles[ring.key]}>
                  <circle className={styles.ringTrack} cx="27" cy="27" r={ring.r} />
                  <circle
                    className={styles.ringFill}
                    cx="27"
                    cy="27"
                    r={ring.r}
                    pathLength={100}
                    strokeDasharray={`${ring.share * 100} 100`}
                  />
                </g>
              ))}
            </svg>
            <span className={styles.figures}>
              {RINGS.map((ring) => (
                <span key={ring.key} className={`${styles.figure} ${styles[ring.key]}`}>
                  {ring.value}
                  <span className={styles.figureUnit}>{ring.unit}</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <time className={styles.time} dateTime="10:09" data-inspect="time">
        10:09
      </time>
      <span className={styles.indicator} data-shown={scrolling ? '' : undefined} data-inspect="scroll-indicator">
        <span className={styles.thumb} style={{ translate: `0 ${thumb}px` }} />
      </span>
    </div>
  );
}
