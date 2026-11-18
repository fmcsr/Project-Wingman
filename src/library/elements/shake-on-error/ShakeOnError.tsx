import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './ShakeOnError.module.css';

/** Bullets in the password field: the mistyped password, then the right one. */
const WRONG = 10;
const RIGHT = 12;

/**
 * One moment of the loop: how many characters are in the password field, whether the field has focus and is in its
 * error state, what the button shows, and how long the moment lasts. `dip` fades the card's content out to start over.
 */
type Frame = {
  typed: number;
  focused: boolean;
  error: boolean;
  button: 'idle' | 'loading' | 'success';
  dip?: boolean;
  ms: number;
};

const TYPED: Frame = { typed: WRONG, focused: true, error: false, button: 'idle', ms: 0 };

/**
 * Enter submits the mistyped password: the button spins for a moment, then the field shakes, turns red and says how
 * many tries are left. The field is cleared and the right password typed, a key every 90ms; the error clears with
 * the first key. Enter again, the button spins and turns green. Then it starts over.
 */
const SCRIPT: Frame[] = [
  { ...TYPED, ms: 1400 },
  { ...TYPED, button: 'loading', ms: 900 },
  { ...TYPED, error: true, ms: 2600 },
  { ...TYPED, typed: 0, error: true, ms: 450 },
  ...Array.from({ length: RIGHT }, (_, index) => ({
    ...TYPED,
    typed: index + 1,
    ms: index === RIGHT - 1 ? 500 : 90,
  })),
  { ...TYPED, typed: RIGHT, button: 'loading', ms: 900 },
  { ...TYPED, typed: RIGHT, focused: false, button: 'success', ms: 1800 },
  { ...TYPED, typed: RIGHT, focused: false, button: 'success', dip: true, ms: 300 },
  { ...TYPED, dip: true, ms: 100 },
];

/** The still picture: the error state, the field red with the message and the forgot link under it. */
const FINAL: Frame = { ...TYPED, error: true };

/** Steps through the script while `playing`; each frame lasts its own time, and a held frame starts over. */
function useScript(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % SCRIPT.length), SCRIPT[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : SCRIPT[index];
}

/**
 * Shake on error: a sign-in card with an email and a password field. In the loop the password is submitted, the
 * button spins, and the password field shakes side to side in a damped 400ms shake, turns red and shows "Incorrect
 * password. 2 tries left." with a Forgot password? link. Then the right password is typed, the error clears, and
 * signing in succeeds with a green button. The still picture is the error state.
 */
export function ShakeOnError() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);
  const loading = frame.button === 'loading';

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-error={frame.error || undefined}
      data-button={frame.button}
      data-dip={frame.dip || undefined}
      data-paused={playing ? undefined : ''}
    >
      <div className={styles.card}>
        <div className={styles.content}>
          <span className={styles.field}>
            <span className={styles.value}>ines@northpeak.co</span>
          </span>

          <span
            className={styles.password}
            data-inspect="shake-on-error"
            data-focused={frame.focused || undefined}
            data-busy={loading || undefined}
          >
            <span className={styles.bullets}>
              {Array.from({ length: RIGHT }, (_, index) => (
                <span key={index} className={styles.bullet} data-typed={index < frame.typed || undefined} />
              ))}
              <span className={styles.caret} />
            </span>
            <svg className={styles.eye} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
              <circle cx="12" cy="12" r="2.75" />
            </svg>
            {/* The error border: the field's outline and halo in red, drawn as a ring so it can be pointed at */}
            <span className={styles.ring} data-inspect="shake-on-error-border" />
          </span>

          <span className={styles.message}>
            <span className={styles.error} data-inspect="shake-on-error-message">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9.25" />
                <path d="M12 7.75v5M12 16.25h.01" />
              </svg>
              Incorrect password. 2 tries left.
            </span>
            <a className={styles.forgot} data-inspect="shake-on-error-forgot">
              Forgot password?
            </a>
          </span>

          <span className={styles.button} data-inspect="shake-on-error-button">
            <span className={styles.label}>Sign in</span>
            <span className={styles.spinner} />
            <span className={styles.done}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5.5 12.5 4.25 4.25L18.5 7.5" />
              </svg>
              Signed in
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
