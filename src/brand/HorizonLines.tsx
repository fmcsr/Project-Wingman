import { useEffect, useRef } from 'react';
import { subscribeTheme } from '../theme';
import styles from './HorizonLines.module.css';

/**
 * Settings for one screen size. The values were measured from LayerZero's hero, which this line art follows, except
 * the wide layout's opacity range and edge fade: on landscape screens their wings faded too soon, so ours stay
 * stronger further out.
 */
type Layout = {
  /** Angle between neighbouring lines (radians). */
  step: number;
  /** How far the horizon sits below the canvas's vertical centre (CSS pixels). */
  horizonDrop: number;
  /** A line's opacity grows linearly with its radius: clear at the first radius, full at the second (CSS pixels). */
  opacityRadii: readonly [number, number];
  /** Share of the width over which lines fade out toward each side (0: they run to the edge at full strength). */
  edgeFade: number;
};

const WIDE_LAYOUT: Layout = { step: Math.PI / 50, horizonDrop: 40, opacityRadii: [270, 2800], edgeFade: 0.12 };
const NARROW_LAYOUT: Layout = { step: Math.PI / 30, horizonDrop: 60, opacityRadii: [141, 1889], edgeFade: 0 };
const WIDE_MIN_WIDTH = 768;

/** Upward drift in radians per second: fastest on a phone-sized canvas, slowest from 1440px, linear in between. */
const DRIFT_SMALL = { width: 390, speed: 0.114 };
const DRIFT_LARGE = { width: 1440, speed: 0.03 };
/** The fixed moment drawn while "reduced motion" is on: lines lie symmetric above and below the horizon. */
const STILL_PHASE = 0;

/** Shooting star: 2–5 lights from different lines on the left meet at the centre point and exit as one to the right. */
const STAR_IN_MS = 1100;
const STAR_OUT_MS = 1400;
const STAR_FIRST_MS = 3000;
const STAR_GAP_MIN_MS = 8000;
const STAR_GAP_MAX_MS = 14000;
const STAR_ENTRIES_MIN = 2;
const STAR_ENTRIES_MAX = 5;
/** Stars only ride lines at least this opaque, so they never run along a line you can't see. */
const STAR_MIN_OPACITY = 0.15;
/** Trail length in path units (half the width = 1): a short teardrop when slow, a long ray when passing the centre. */
const STAR_TAIL_MIN = 0.04;
const STAR_TAIL_MAX = 0.24;
/** Width of the teardrop's head (CSS pixels). */
const STAR_WIDTH = 3;

type Rgb = readonly [number, number, number];
type Side = -1 | 1;
type Point = { x: number; y: number };

type Frame = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;
  rgb: Rgb;
};

type Field = {
  width: number;
  height: number;
  layout: Layout;
  centerX: number;
  horizonY: number;
  /** Turn of the whole family (radians); it grows over time, which moves every line upward. */
  phase: number;
};

/** A path along one half of a line; v is 0 at the edge and 1 at the centre point. */
type Path = (v: number) => Point;

/** The part of the trail on one path. Share: where that end falls along the trail (0 tail tip, 1 head). */
type Band = { path: Path; from: number; to: number; fromShare: number; toShare: number; withHead: boolean };

/** Lines are numbered: a line keeps its number while the field drifts, so a star can stay on it. */
type Star = { start: number; entries: number[]; exit: number };

function clamp01(x: number) {
  return Math.min(Math.max(x, 0), 1);
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function rgba([r, g, b]: Rgb, alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
}

/** The line color is read from the CSS `color` value, so it adapts automatically when the theme changes. */
function readColor(element: Element): Rgb {
  const [r = 0, g = 0, b = 0] = (getComputedStyle(element).color.match(/\d+/g) ?? []).map(Number);
  return [r, g, b];
}

function isBright([r, g, b]: Rgb) {
  return (r + g + b) / 3 > 128;
}

function fieldOf(width: number, height: number, phase: number): Field {
  const layout = width >= WIDE_MIN_WIDTH ? WIDE_LAYOUT : NARROW_LAYOUT;
  return { width, height, layout, centerX: width / 2, horizonY: height / 2 + layout.horizonDrop, phase };
}

function driftSpeed(width: number) {
  const t = clamp01((width - DRIFT_SMALL.width) / (DRIFT_LARGE.width - DRIFT_SMALL.width));
  return DRIFT_SMALL.speed + (DRIFT_LARGE.speed - DRIFT_SMALL.speed) * t;
}

/** Angle of line n: 0 lies flat on the horizon, positive angles curve up, negative ones down. */
function angleOf(field: Field, n: number) {
  return n * field.layout.step + field.phase;
}

/**
 * Every line is a circle that touches the horizon at the centre point. The steeper its angle, the smaller the circle:
 * radius = half the canvas height / tan(angle). Signed: positive above the horizon, negative below.
 */
function radiusOf(field: Field, angle: number) {
  return field.height / 2 / Math.tan(angle);
}

function opacityOf(field: Field, radius: number) {
  const [clear, full] = field.layout.opacityRadii;
  return clamp01((Math.abs(radius) - clear) / (full - clear));
}

/** The circle's outline; huge, nearly flat circles become a parabola, which matches them to well under a pixel. */
function traceLine(ctx: CanvasRenderingContext2D, { width, height, centerX, horizonY }: Field, radius: number) {
  const size = Math.abs(radius);
  if (size > width * 8) {
    const bend = (centerX * centerX) / (2 * radius);
    ctx.moveTo(0, horizonY - bend);
    ctx.quadraticCurveTo(centerX, horizonY + bend, width, horizonY - bend);
    return;
  }
  const centerY = horizonY - radius;
  if (size < Math.hypot(width, height)) {
    ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
    return;
  }
  // A large circle only reaches the canvas around the centre point, where it touches the horizon
  const touch = radius > 0 ? Math.PI / 2 : -Math.PI / 2;
  const reach = Math.asin(Math.min(1, (centerX + 2) / size));
  ctx.arc(centerX, centerY, size, touch - reach, touch + reach);
}

/**
 * Field of circles that all touch the horizon at the centre point: from the sides they look like rays converging on
 * one point, flattening into the horizon as they meet. Scattered ideas meet in one clear term.
 */
function drawField({ ctx, width, height, dpr, rgb }: Frame, field: Field) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;

  const { edgeFade, step } = field.layout;
  if (edgeFade > 0) {
    const fade = ctx.createLinearGradient(0, 0, width, 0);
    fade.addColorStop(0, rgba(rgb, 0));
    fade.addColorStop(edgeFade, rgba(rgb, 1));
    fade.addColorStop(1 - edgeFade, rgba(rgb, 1));
    fade.addColorStop(1, rgba(rgb, 0));
    ctx.strokeStyle = fade;
  } else {
    ctx.strokeStyle = rgba(rgb, 1);
  }
  // Light lines read brighter on a dark background; they're dimmed a little to look as fine as in the light theme
  const strength = isBright(rgb) ? 0.8 : 1;

  // Every line between straight down and straight up
  const first = Math.floor((-Math.PI / 2 - field.phase) / step) + 1;
  for (let n = first; angleOf(field, n) < Math.PI / 2; n++) {
    const radius = radiusOf(field, angleOf(field, n));
    const alpha = opacityOf(field, radius) * strength;
    if (alpha < 0.004) continue;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    traceLine(ctx, field, radius);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

/** Path along line n's left (side −1) or right (side 1) half, from the edge (v 0) to the centre point (v 1). */
function pathOf(field: Field, n: number, side: Side): Path {
  const curvature = Math.tan(angleOf(field, n)) / (field.height / 2);
  return (v) => {
    const dx = (1 - v) * field.centerX;
    // Height of the circle above the horizon, in a form that stays exact for nearly flat lines
    const lift = (curvature * dx * dx) / (1 + Math.sqrt(Math.max(0, 1 - (curvature * dx) ** 2)));
    return { x: field.centerX + side * dx, y: field.horizonY - lift };
  };
}

/**
 * The star's position on its path: 0 left edge, 1 centre point, 2 right edge. Speeds up on entry, slows on exit;
 * the exit's easing exponent comes from the ratio of the two durations so speed doesn't jump at the centre point.
 * `pace`: ratio of the current speed to the speed at the centre point (0–1).
 */
function starMotion(elapsed: number) {
  if (elapsed < STAR_IN_MS) {
    const progress = elapsed / STAR_IN_MS;
    return { position: progress ** 2, pace: progress };
  }
  const power = (2 * STAR_OUT_MS) / STAR_IN_MS;
  const remaining = 1 - Math.min((elapsed - STAR_IN_MS) / STAR_OUT_MS, 1);
  return { position: 2 - remaining ** power, pace: remaining ** (power - 1) };
}

/**
 * One piece of the teardrop-shaped trail: a single filled shape (so it doesn't look dotted). It narrows and fades
 * toward the tail; at the head, a semicircle facing the direction of travel forms the teardrop's round end.
 */
function drawBand(ctx: CanvasRenderingContext2D, band: Band, rgb: Rgb, alpha: number) {
  const { path, from, to, fromShare, toShare, withHead } = band;
  const samples = Math.max(2, Math.ceil(20 * (toShare - fromShare)));
  const shareAt = (i: number) => fromShare + ((toShare - fromShare) * i) / samples;
  const points = Array.from({ length: samples + 1 }, (_, i) => path(from + ((to - from) * i) / samples));
  const left: Point[] = [];
  const right: Point[] = [];

  points.forEach((point, i) => {
    const prev = points[Math.max(i - 1, 0)];
    const next = points[Math.min(i + 1, samples)];
    const length = Math.hypot(next.x - prev.x, next.y - prev.y) || 1;
    const halfWidth = (STAR_WIDTH / 2) * shareAt(i) ** 0.6;
    const nx = (-(next.y - prev.y) / length) * halfWidth;
    const ny = ((next.x - prev.x) / length) * halfWidth;
    left.push({ x: point.x + nx, y: point.y + ny });
    right.push({ x: point.x - nx, y: point.y - ny });
  });

  ctx.beginPath();
  left.forEach((point) => ctx.lineTo(point.x, point.y));
  if (withHead) {
    const head = points[samples];
    const angle = Math.atan2(left[samples].y - head.y, left[samples].x - head.x);
    ctx.arc(head.x, head.y, STAR_WIDTH / 2, angle, angle - Math.PI, true);
  }
  for (let i = samples; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
  ctx.closePath();

  const first = points[0];
  const last = points[samples];
  const gradient = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
  for (let stop = 0; stop <= 4; stop++) {
    const share = fromShare + ((toShare - fromShare) * stop) / 4;
    gradient.addColorStop(stop / 4, rgba(rgb, alpha * share ** 1.5));
  }
  ctx.fillStyle = gradient;
  ctx.fill();
}

function drawGlow(ctx: CanvasRenderingContext2D, { x, y }: Point, radius: number, rgb: Rgb, alpha: number) {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, rgba(rgb, alpha));
  glow.addColorStop(1, rgba(rgb, 0));
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * The shooting star's current frame. The trail is drawn separately on each line it passes over, from tail to head:
 * as they meet, the entries' tails flow into the centre point while the merged light's head exits on the right.
 * The lines keep drifting meanwhile, and the lights move with them.
 */
function drawStar({ ctx, rgb }: Frame, field: Field, star: Star, timeMs: number) {
  const elapsed = timeMs - star.start;
  const { position: head, pace } = starMotion(elapsed);
  const tail = Math.max(0, head - (STAR_TAIL_MIN + (STAR_TAIL_MAX - STAR_TAIL_MIN) * pace));
  const share = (position: number) => (position - tail) / (head - tail);
  const bright = isBright(rgb);
  // A light trail reads brighter on a dark background; on a light one, the head's glow is dimmed to avoid a smudge
  const strength = bright ? 0.85 : 0.7;
  const halo = bright ? 0.3 : 0.15;
  // Appears at the left edge and fades out as it nears the right edge
  const alpha = strength * smoothstep(0, 0.15, head) * (1 - smoothstep(1.55, 1.95, head));

  if (alpha > 0.01 && head > tail) {
    if (tail < 1) {
      const end = Math.min(head, 1);
      for (const entry of star.entries) {
        const path = pathOf(field, entry, -1);
        drawBand(ctx, { path, from: tail, to: end, fromShare: 0, toShare: share(end), withHead: head <= 1 }, rgb, alpha);
        if (head <= 1) drawGlow(ctx, path(head), STAR_WIDTH * 3, rgb, alpha * halo);
      }
    }
    if (head > 1) {
      // On the exit path the parameter is 1 at the centre point, 0 at the edge
      const start = Math.max(tail, 1);
      const path = pathOf(field, star.exit, 1);
      drawBand(ctx, { path, from: 2 - start, to: 2 - head, fromShare: share(start), toShare: 1, withHead: true }, rgb, alpha);
      drawGlow(ctx, path(2 - head), STAR_WIDTH * 3, rgb, alpha * halo);
    }
  }

  // A brief, soft flash at the centre point as the lights meet
  const flash = (elapsed - STAR_IN_MS + 60) / 480;
  if (flash > 0 && flash < 1) {
    drawGlow(ctx, { x: field.centerX, y: field.horizonY }, 3 + 14 * flash, rgb, strength * 0.4 * (1 - flash));
  }
}

/**
 * Lines a star can ride: clearly visible and reaching the edge for the whole flight, during which every angle grows
 * by `drift`.
 */
function starLines(field: Field, drift: number) {
  const [clear, full] = field.layout.opacityRadii;
  const minRadius = Math.max(field.centerX * 1.25, clear + (full - clear) * STAR_MIN_OPACITY);
  const limit = Math.atan(field.height / 2 / minRadius);
  const lines: number[] = [];
  for (let n = Math.ceil((-limit - field.phase) / field.layout.step); angleOf(field, n) + drift <= limit; n++) {
    lines.push(n);
  }
  return lines;
}

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Builds a new star that comes from different places each time and leaves somewhere other than the previous one
 * (`previousExit`: its exit line's angle when it set off). The entry count is 2–5 each time; entries are picked from
 * lines that are far apart.
 */
function createStar(field: Field, start: number, drift: number, previousExit: number | null): Star | null {
  const lines = starLines(field, drift);
  const wanted = STAR_ENTRIES_MIN + Math.floor(Math.random() * (STAR_ENTRIES_MAX - STAR_ENTRIES_MIN + 1));
  const entries: number[] = [];
  for (const candidate of shuffle(lines)) {
    if (entries.every((entry) => Math.abs(candidate - entry) >= 2)) entries.push(candidate);
    if (entries.length === wanted) break;
  }
  const exits = lines.filter(
    (candidate) => previousExit === null || Math.abs(angleOf(field, candidate) - previousExit) >= field.layout.step * 2,
  );
  if (entries.length < STAR_ENTRIES_MIN || exits.length === 0) return null;
  return { start, entries, exit: pickRandom(exits) };
}

function nextGap() {
  return STAR_GAP_MIN_MS + Math.random() * (STAR_GAP_MAX_MS - STAR_GAP_MIN_MS);
}

type HorizonLinesProps = {
  className?: string;
};

/**
 * The slowly drifting line field behind the Hero, with an occasional shooting star.
 * The animation stops while off-screen and while the "reduced motion" setting is on.
 */
export function HorizonLines({ className }: HorizonLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frame: Frame = { ctx, width: 0, height: 0, dpr: 1, rgb: readColor(canvas) };
    let raf = 0;
    let visible = false;
    let elapsed = 0;
    let phase = STILL_PHASE;
    let last: number | null = null;
    let star: Star | null = null;
    let lastExit: number | null = null;
    let nextStarAt = STAR_FIRST_MS;

    const field = () => fieldOf(frame.width, frame.height, phase);

    const render = () => {
      const current = field();
      drawField(frame, current);
      if (star) drawStar(frame, current, star, elapsed);
    };

    const updateStar = () => {
      if (star && elapsed - star.start > STAR_IN_MS + STAR_OUT_MS) {
        star = null;
        nextStarAt = elapsed + nextGap();
      }
      if (!star && elapsed >= nextStarAt) {
        const current = field();
        const drift = (driftSpeed(frame.width) * (STAR_IN_MS + STAR_OUT_MS)) / 1000;
        star = createStar(current, elapsed, drift, lastExit);
        if (star) lastExit = angleOf(current, star.exit);
        else nextStarAt = elapsed + 1000;
      }
    };

    const loop = (now: number) => {
      // The time step is capped so the lines don't suddenly jump when you return to the tab
      if (last !== null) {
        const step = Math.min(now - last, 64);
        elapsed += step;
        phase += (driftSpeed(frame.width) * step) / 1000;
      }
      last = now;
      updateStar();
      render();
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      last = null;
      if (reducedMotion.matches) {
        elapsed = 0;
        phase = STILL_PHASE;
        star = null;
        nextStarAt = STAR_FIRST_MS;
      }
      if (visible && !reducedMotion.matches) raf = requestAnimationFrame(loop);
      else render();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Line numbers mean other lines once the spacing changes, so a star in flight is dropped
      if ((rect.width >= WIDE_MIN_WIDTH) !== (frame.width >= WIDE_MIN_WIDTH)) star = null;
      frame.dpr = Math.min(window.devicePixelRatio || 1, 2);
      frame.width = rect.width;
      frame.height = rect.height;
      canvas.width = Math.round(rect.width * frame.dpr);
      canvas.height = Math.round(rect.height * frame.dpr);
      render();
    };

    const updateColor = () => {
      frame.rgb = readColor(canvas);
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    visibilityObserver.observe(canvas);
    reducedMotion.addEventListener('change', sync);
    const unsubscribeTheme = subscribeTheme(updateColor);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reducedMotion.removeEventListener('change', sync);
      unsubscribeTheme();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ? `${styles.canvas} ${className}` : styles.canvas}
      aria-hidden="true"
    />
  );
}
