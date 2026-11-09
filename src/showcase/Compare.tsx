import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent, ReactNode, RefObject } from 'react';
import styles from './Compare.module.css';

/** Where the divider starts: an even split, in percent from the left. */
const START = 50;
/** Arrow keys move the divider by this much; Page Up/Down by four times as much. */
const STEP = 5;
/** A label hides when its side is narrower than this, in percent. */
const LABEL_MIN = 16;
/** The hint that the line can be dragged: from the middle, a little to each side and back. */
const HINT = [50, 58, 42, 50];
const HINT_MS = 1400;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** In development, `?split=0` or `?split=100` shows one side only (handy for screenshots). */
function initialSplit() {
  if (!import.meta.env.DEV) return START;
  const param = new URLSearchParams(window.location.search).get('split');
  return param === null || Number.isNaN(Number(param)) ? START : clamp(Number(param), 0, 100);
}

/**
 * The divider's position for one comparison. The first time the comparison comes into view, the divider sways once
 * to show that it moves (not with reduced motion, and not once someone has moved it). `enabled` is false for frames
 * that don't compare anything.
 */
export function useCompareSplit(target: RefObject<HTMLElement | null>, enabled: boolean) {
  const [split, setSplit] = useState(initialSplit);
  const touched = useRef(false);

  useEffect(() => {
    const element = target.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!enabled || !element || reducedMotion || split !== START) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min((now - start) / HINT_MS, 1);
          const position = t * (HINT.length - 1);
          const i = Math.min(Math.floor(position), HINT.length - 2);
          const local = position - i;
          const eased = local < 0.5 ? 2 * local * local : 1 - (-2 * local + 2) ** 2 / 2;
          setSplit(HINT[i] + (HINT[i + 1] - HINT[i]) * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // Runs once per comparison: it only reads the starting position
  }, [target, enabled]);

  const move = (next: number) => {
    touched.current = true;
    setSplit(clamp(next, 0, 100));
  };

  return { split, move };
}

type CompareLayersProps = {
  /** The AI slop version. */
  before: ReactNode;
  /** Fill the parent's height (a phone screen) instead of growing with the content (a site). */
  fill?: boolean;
  /** The Wingman version, usually an InspectSurface. */
  children: ReactNode;
};

/**
 * The two versions on top of each other. The AI slop version lies on top and is cut at the divider (`--split`, set
 * by the frame), so its left part shows; the Wingman version shows to the right. Both scroll together.
 */
export function CompareLayers({ before, fill = false, children }: CompareLayersProps) {
  return (
    <div className={fill ? `${styles.layers} ${styles.fill}` : styles.layers}>
      <div className={styles.after}>{children}</div>
      {/* A picture for comparison only: it stays out of the accessibility tree and has nothing to inspect */}
      <div className={styles.before} aria-hidden="true">
        {before}
      </div>
    </div>
  );
}

type CompareHandleProps = {
  split: number;
  onMove: (split: number) => void;
  /** What's compared, for screen readers, e.g. "Acme marketing site". */
  label: string;
};

/** The draggable line with its knob and the two side labels. Fills its positioned parent. */
export function CompareHandle({ split, onMove, label }: CompareHandleProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (rect && rect.width > 0) onMove(((clientX - rect.left) / rect.width) * 100);
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragging.current = true;
    moveTo(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (dragging.current) moveTo(event.clientX);
  };

  const onPointerEnd = () => {
    dragging.current = false;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const steps: Record<string, number> = {
      ArrowLeft: -STEP,
      ArrowDown: -STEP,
      ArrowRight: STEP,
      ArrowUp: STEP,
      PageDown: -STEP * 4,
      PageUp: STEP * 4,
    };
    if (event.key in steps) onMove(split + steps[event.key]);
    else if (event.key === 'Home') onMove(0);
    else if (event.key === 'End') onMove(100);
    else return;
    event.preventDefault();
  };

  const value = Math.round(split);

  return (
    <div ref={areaRef} className={styles.area}>
      <div
        className={styles.divider}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {/* The labels ride along on each side of the knob, so they never sit on a corner of the app */}
        <span className={styles.label} data-side="before" data-hidden={split < LABEL_MIN || undefined} aria-hidden="true">
          AI slop
        </span>
        <span
          className={styles.label}
          data-side="after"
          data-hidden={split > 100 - LABEL_MIN || undefined}
          aria-hidden="true"
        >
          With Wingman
        </span>
        <span
          className={styles.knob}
          role="slider"
          tabIndex={0}
          aria-label={`Compare the AI slop and Wingman versions of ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value}% AI slop, ${100 - value}% with Wingman`}
          onKeyDown={onKeyDown}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
