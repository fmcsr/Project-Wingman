import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { InspectFocusContext } from '../inspector/InspectActivity';

/** True inside still pictures of an example (the library's site previews): the demo shows its finished state there. */
export const StillContext = createContext(false);

/** Whether one element is the other or holds it. */
function overlaps(part: Element, other: Element | null) {
  return other !== null && (part.contains(other) || other.contains(part));
}

/**
 * Motion for one moving part of an example demo. Put `ref` on that part.
 *
 * - `started` turns true the first time the part is in view (at least `threshold` of it) and stays true: for
 *   entrances that play once, such as a chart drawing in or a figure counting up.
 * - `playing` is true while the part is in view and isn't being inspected: for motion that goes on, such as new
 *   rows arriving. The part holds still while the element under the pointer, or the one whose explanation is open,
 *   is in it (or holds it), so the outline and the balloon stay on what they point at. Pointing elsewhere in the
 *   example doesn't stop it, so a site keeps moving while the pointer rests on it during a scroll.
 * - `final` is true with reduced motion and in still pictures: nothing moves, `started` is true from the start and
 *   `playing` stays false, so the demo shows its finished state.
 *
 * For a part taller than most screens, pass a small `threshold` (it's a share of the part, not of the screen).
 */
export function useDemoMotion<T extends Element>(threshold = 0.5) {
  const [part, setPart] = useState<T | null>(null);
  const still = useContext(StillContext);
  const { hover, target } = useContext(InspectFocusContext);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const final = still || reduced;

  useEffect(() => {
    if (!part || final) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold },
    );
    observer.observe(part);
    return () => observer.disconnect();
  }, [part, final, threshold]);

  const inspected = part !== null && (overlaps(part, hover) || overlaps(part, target));
  return { ref: setPart, started: final || seen, playing: !final && inView && !inspected, final };
}

/**
 * A figure that counts up: from zero once `started` turns true, then from where it is to each new value, easing out
 * over `duration` ms. Shows the value itself when `final`. Round and format the result where it's shown.
 */
export function useCountUp(to: number, { started, final }: { started: boolean; final: boolean }, duration = 900) {
  const [shown, setShown] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    if (final || !started) return;
    const from = current.current;
    const begin = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min((now - begin) / duration, 1);
      current.current = from + (to - from) * (1 - (1 - t) ** 3);
      setShown(current.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [to, started, final, duration]);

  return final ? to : shown;
}

/** Calls `callback` every `ms` while `playing`; the wait starts over each time playing resumes. */
export function useEvery(ms: number, playing: boolean, callback: () => void) {
  const latest = useRef(callback);

  useEffect(() => {
    latest.current = callback;
  });

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => latest.current(), ms);
    return () => window.clearInterval(id);
  }, [ms, playing]);
}
