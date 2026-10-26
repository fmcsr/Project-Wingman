import { useEffect, useRef } from 'react';
import { subscribeTheme } from '../theme';
import styles from './HorizonLines.module.css';

/** Time for a ray to slide into the next one's place; larger values slow the flow. */
const FLOW_MS = 3200;
/** Cycle of the focus point's gentle sway. */
const BREATH_MS = 16000;
/** The fixed moment drawn while "reduced motion" is on. */
const STILL_MS = 0;

/** Shooting star: 2–5 lights from different left rays meet at the focus point and exit as one on a ray to the right. */
const STAR_IN_MS = 1100;
const STAR_OUT_MS = 1400;
const STAR_FIRST_MS = 3000;
const STAR_GAP_MIN_MS = 8000;
const STAR_GAP_MAX_MS = 14000;
const STAR_ENTRIES_MIN = 2;
const STAR_ENTRIES_MAX = 5;
/** Trail length in path units (one ray = 1): a short teardrop when slow, a long ray when passing the focus point. */
const STAR_TAIL_MIN = 0.04;
const STAR_TAIL_MAX = 0.24;
/** Width of the teardrop's head (CSS pixels). */
const STAR_WIDTH = 3;

type Rgb = readonly [number, number, number];
type Side = -1 | 1;
type Half = -1 | 1;
type Point = { x: number; y: number };

type Frame = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;
  rgb: Rgb;
};

type Geometry = {
  width: number;
  height: number;
  perHalf: number;
  focusX: number;
  focusY: number;
  flow: number;
};

/** A quadratic ray curve: from the end at the edge (e) to the focus point (f), with control point c. */
type Curve = { ex: number; ey: number; cx: number; cy: number; fx: number; fy: number };

/** The part of the trail on one curve. Share: where that end falls along the trail (0 tail tip, 1 head). */
type Band = { curve: Curve; from: number; to: number; fromShare: number; toShare: number; withHead: boolean };

type RayRef = { half: Half; k: number };

type Star = { start: number; entries: RayRef[]; exit: RayRef };

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
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

function fieldGeometry(width: number, height: number, timeMs: number): Geometry {
  return {
    width,
    height,
    perHalf: Math.round(Math.min(40, Math.max(22, width / 36))),
    focusX: width / 2 + Math.sin((timeMs / BREATH_MS) * Math.PI * 2) * width * 0.006,
    focusY: height * (width < 640 ? 0.74 : 0.7),
    flow: timeMs / FLOW_MS,
  };
}

/**
 * A ray's current curve. `t`: 0 at the focus point, 1 at the edge. Over time it decreases on the left (inward flow)
 * and increases on the right (outward flow). Rays get denser toward the horizon (perspective).
 */
function ray(geo: Geometry, side: Side, half: Half, k: number) {
  const progress = ((k + geo.flow) % geo.perHalf) / geo.perHalf;
  const t = side < 0 ? 1 - progress : progress;
  // Rays above the horizon reach higher
  const span = half < 0 ? geo.focusY * 1.05 : (geo.height - geo.focusY) * 2.2;
  const reach = t ** 1.6;
  const ex = side < 0 ? -geo.width * 0.02 : geo.width * 1.02;
  const ey = geo.focusY + half * span * reach;
  // Control point near the horizon: rays join the focus point almost horizontally, at a tangent
  const curve: Curve = {
    ex,
    ey,
    cx: geo.focusX + (ex - geo.focusX) * 0.42,
    cy: geo.focusY + half * span * reach * 0.1,
    fx: geo.focusX,
    fy: geo.focusY,
  };
  return { curve, t };
}

/** Point on the curve; v is 0 at the edge, 1 at the focus point. */
function pointOn({ ex, ey, cx, cy, fx, fy }: Curve, v: number): Point {
  const a = (1 - v) * (1 - v);
  const b = 2 * (1 - v) * v;
  const c = v * v;
  return { x: a * ex + b * cx + c * fx, y: a * ey + b * cy + c * fy };
}

/**
 * Symmetric ray field: hairline rays coming from the left shrink toward the focus point in the middle and grow
 * again the same way toward the right. Scattered ideas meet in one clear term and open up again from there.
 */
function drawField({ ctx, width, height, dpr, rgb }: Frame, geo: Geometry) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = Math.max(0.5, 1 / dpr);

  const [r, g, b] = rgb;
  // Light lines read brighter on a dark background; they're dimmed to look equally thin in both themes
  const intensity = (r + g + b) / 3 > 128 ? 0.7 : 1;

  for (const side of [-1, 1] as const) {
    for (const half of [-1, 1] as const) {
      for (let k = 0; k < geo.perHalf; k++) {
        const { curve, t } = ray(geo, side, half, k);
        // Fades out near the focus point (so overlapping lines don't darken) and fades in or out at the edge
        const alpha =
          0.22 * intensity * smoothstep(0, 0.3, t) * (1 - smoothstep(0.8, 1, t)) * (k % 5 === 0 ? 1.5 : 1);
        if (alpha < 0.004) continue;
        ctx.strokeStyle = rgba(rgb, alpha);
        ctx.beginPath();
        ctx.moveTo(curve.ex, curve.ey);
        ctx.quadraticCurveTo(curve.cx, curve.cy, curve.fx, curve.fy);
        ctx.stroke();
      }
    }
  }
}

/**
 * The star's position on its path: 0 left edge, 1 focus point, 2 right edge. Speeds up on entry, slows on exit;
 * the exit's easing exponent comes from the ratio of the two durations so speed doesn't jump at the focus point.
 * `pace`: ratio of the current speed to the speed at the focus point (0–1).
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
  const { curve, from, to, fromShare, toShare, withHead } = band;
  const samples = Math.max(2, Math.ceil(20 * (toShare - fromShare)));
  const shareAt = (i: number) => fromShare + ((toShare - fromShare) * i) / samples;
  const points = Array.from({ length: samples + 1 }, (_, i) => pointOn(curve, from + ((to - from) * i) / samples));
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
 * The shooting star's current frame. The trail is drawn separately on each ray it passes over, from tail to head:
 * as they meet, the entries' tails flow into the focus point while the merged light's head exits on the right ray.
 */
function drawStar({ ctx, rgb }: Frame, geo: Geometry, star: Star, timeMs: number) {
  const elapsed = timeMs - star.start;
  const { position: head, pace } = starMotion(elapsed);
  const tail = Math.max(0, head - (STAR_TAIL_MIN + (STAR_TAIL_MAX - STAR_TAIL_MIN) * pace));
  const share = (position: number) => (position - tail) / (head - tail);
  const [r, g, b] = rgb;
  const bright = (r + g + b) / 3 > 128;
  // A light trail reads brighter on a dark background; on a light one, the head's glow is dimmed to avoid a smudge
  const strength = bright ? 0.85 : 0.7;
  const halo = bright ? 0.3 : 0.15;
  // Appears at the left edge and fades out as it nears the right edge
  const alpha = strength * smoothstep(0, 0.15, head) * (1 - smoothstep(1.55, 1.95, head));

  if (alpha > 0.01 && head > tail) {
    if (tail < 1) {
      const end = Math.min(head, 1);
      for (const entry of star.entries) {
        const { curve } = ray(geo, -1, entry.half, entry.k);
        drawBand(ctx, { curve, from: tail, to: end, fromShare: 0, toShare: share(end), withHead: head <= 1 }, rgb, alpha);
        if (head <= 1) drawGlow(ctx, pointOn(curve, head), STAR_WIDTH * 3, rgb, alpha * halo);
      }
    }
    if (head > 1) {
      // On the exit ray the curve parameter is 1 at the focus point, 0 at the edge
      const start = Math.max(tail, 1);
      const { curve } = ray(geo, 1, star.exit.half, star.exit.k);
      drawBand(ctx, { curve, from: 2 - start, to: 2 - head, fromShare: share(start), toShare: 1, withHead: true }, rgb, alpha);
      drawGlow(ctx, pointOn(curve, 2 - head), STAR_WIDTH * 3, rgb, alpha * halo);
    }
  }

  // A brief, soft flash at the focus point as the lights meet
  const flash = (elapsed - STAR_IN_MS + 60) / 480;
  if (flash > 0 && flash < 1) {
    drawGlow(ctx, { x: geo.focusX, y: geo.focusY }, 3 + 14 * flash, rgb, strength * 0.4 * (1 - flash));
  }
}

/** Rays currently in the visible zone (neither fading out nor fading in). */
function visibleRays(geo: Geometry, side: Side) {
  const rays: RayRef[] = [];
  for (const half of [-1, 1] as const) {
    for (let k = 0; k < geo.perHalf; k++) {
      const { t } = ray(geo, side, half, k);
      if (t > 0.35 && t < 0.8) rays.push({ half, k });
    }
  }
  return rays;
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

/** Two rays count as the same spot if they're in the same half and fewer than `gap` rays apart. */
function farApart(a: RayRef, b: RayRef, gap: number) {
  return a.half !== b.half || Math.abs(a.k - b.k) >= gap;
}

/**
 * Builds a new star that comes from different places each time and leaves somewhere other than the previous one.
 * The entry count is 2–5 each time; entries are picked from rays that are far apart.
 */
function createStar(geo: Geometry, start: number, previousExit: RayRef | null): Star | null {
  const wanted = STAR_ENTRIES_MIN + Math.floor(Math.random() * (STAR_ENTRIES_MAX - STAR_ENTRIES_MIN + 1));
  const entries: RayRef[] = [];
  for (const candidate of shuffle(visibleRays(geo, -1))) {
    if (entries.every((entry) => farApart(candidate, entry, 3))) entries.push(candidate);
    if (entries.length === wanted) break;
  }
  const exits = visibleRays(geo, 1).filter((candidate) => !previousExit || farApart(candidate, previousExit, 4));
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
 * The gently moving line field behind the Hero, with an occasional shooting star.
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
    let elapsed = STILL_MS;
    let last: number | null = null;
    let star: Star | null = null;
    let lastExit: RayRef | null = null;
    let nextStarAt = STAR_FIRST_MS;

    const render = () => {
      const geo = fieldGeometry(frame.width, frame.height, elapsed);
      drawField(frame, geo);
      if (star) drawStar(frame, geo, star, elapsed);
    };

    const updateStar = () => {
      if (star && elapsed - star.start > STAR_IN_MS + STAR_OUT_MS) {
        star = null;
        nextStarAt = elapsed + nextGap();
      }
      if (!star && elapsed >= nextStarAt) {
        star = createStar(fieldGeometry(frame.width, frame.height, elapsed), elapsed, lastExit);
        if (star) lastExit = star.exit;
        else nextStarAt = elapsed + 1000;
      }
    };

    const loop = (now: number) => {
      // The time step is capped so the lines don't suddenly jump when you return to the tab
      if (last !== null) elapsed += Math.min(now - last, 64);
      last = now;
      updateStar();
      render();
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      last = null;
      if (reducedMotion.matches) {
        elapsed = STILL_MS;
        star = null;
        nextStarAt = STAR_FIRST_MS;
      }
      if (visible && !reducedMotion.matches) raf = requestAnimationFrame(loop);
      else render();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
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
