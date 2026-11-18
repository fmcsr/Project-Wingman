import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './HoldToConfirm.module.css';

/** How long the button has to be held to delete. */
const HOLD_MS = 1500;

/**
 * How the hold progress moves into a step: `hold` fills at the hold's own pace (linear), `drain` empties it fast and
 * easing out, `reset` jumps there unseen.
 */
type Phase = 'rest' | 'hold' | 'drain' | 'reset';

/**
 * One moment of the loop: where the pointer is, how far the hold has come (0 to 1) and how it gets there, whether the
 * button is pressed, whether it's done (and fading back), and how long the moment lasts.
 */
type Step = {
  pointer: boolean;
  hold: number;
  phase: Phase;
  pressed?: boolean;
  done?: boolean;
  fading?: boolean;
  ms: number;
};

/**
 * The pointer comes to the button and presses: the fill sweeps from the left, but the press ends at 45% and the fill
 * drains back. The second press holds all the way, the button turns into Deleted with a check, the pointer leaves
 * and the dialog fades back to the start.
 */
const STEPS: Step[] = [
  { pointer: false, hold: 0, phase: 'rest', ms: 900 },
  { pointer: true, hold: 0, phase: 'rest', ms: 700 },
  { pointer: true, hold: 0.45, phase: 'hold', pressed: true, ms: 0.45 * HOLD_MS },
  { pointer: true, hold: 0, phase: 'drain', ms: 1000 },
  { pointer: true, hold: 1, phase: 'hold', pressed: true, ms: HOLD_MS },
  { pointer: true, hold: 1, phase: 'rest', done: true, ms: 1000 },
  { pointer: false, hold: 1, phase: 'rest', done: true, ms: 800 },
  { pointer: false, hold: 1, phase: 'rest', done: true, fading: true, ms: 400 },
  { pointer: false, hold: 0, phase: 'reset', ms: 400 },
];

/** The still picture: held down, the fill 60% of the way across. */
const FINAL: Step = { pointer: true, hold: 0.6, phase: 'rest', pressed: true, ms: 0 };

/** Steps through the loop while `playing`; each step lasts its own time, and a held step starts over. */
function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : STEPS[index];
}

/**
 * Hold to confirm: a dialog asking to delete a project, with a "Hold to delete" button instead of a plain one. While
 * the button is held it shrinks a little, a ring shows around it and a red fill sweeps across in 1.5 s, turning the
 * label white as it passes. In the loop the first press lets go early and the fill drains back; the second holds to
 * the end and the button turns into Deleted with a check, then the dialog starts over.
 */
export function HoldToConfirm() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);

  return (
    <div ref={ref} className={styles.tile} data-pointer={step.pointer ? '' : undefined}>
      <div className={styles.dialog} role="alertdialog" aria-label="Delete project">
        <span className={styles.title}>Delete project “Atlas”?</span>
        <span className={styles.body}>Its 14 boards and 312 tasks go with it.</span>

        <span className={styles.action}>
          <span
            className={styles.hold}
            data-inspect="hold-to-confirm"
            data-phase={step.phase}
            data-pressed={step.pressed ? '' : undefined}
            data-done={step.done ? '' : undefined}
            data-fading={step.fading ? '' : undefined}
            data-empty={step.hold === 0 && step.phase !== 'drain' ? '' : undefined}
            style={{ '--hold-to-confirm': step.hold, '--hold-ms': `${step.hold * HOLD_MS}ms` } as CSSProperties}
          >
            <span className={styles.ring} data-inspect="hold-to-confirm-pressed" />
            <span className={styles.face}>
              <span className={styles.fill} data-inspect="hold-to-confirm-fill" />
              <span className={styles.labels}>
                <span className={styles.label} data-inspect="hold-to-confirm-label">
                  Hold to delete
                </span>
              </span>
              <span className={styles.success} data-inspect="hold-to-confirm-success">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m5 12.5 4.25 4.25L19 7" />
                </svg>
                Deleted
              </span>
            </span>
          </span>
          <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
            <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
          </svg>
        </span>
        <span className={styles.cancel}>Cancel</span>
      </div>
    </div>
  );
}
