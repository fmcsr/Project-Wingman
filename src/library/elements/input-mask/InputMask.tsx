import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './InputMask.module.css';

/** The mask: an underscore for each digit, the rest is put in by the field itself. */
const MASK = '(___) ___-____';

/** The number typed in: a San Francisco area code and one of the 555-01xx numbers kept free for fiction. */
const DIGITS = '4155550132';

/**
 * One moment of the loop: how many digits are in, and how long the moment lasts. `typing` keeps the caret solid;
 * `dip` fades the number out to start over. `hold` moments wait while the tile is inspected or out of view; the
 * short beats in between always finish.
 */
type Step = { typed: number; typing?: boolean; dip?: boolean; hold?: boolean; ms: number };

/** Digits at typing speed; a group's last digit rests `rest`, as someone reads the next group off a card. */
function type(from: number, to: number, rest: number): Step[] {
  return Array.from({ length: to - from }, (_, index) => {
    const last = index === to - from - 1;
    return { typed: from + index + 1, typing: !last, hold: last, ms: last ? rest : 105 };
  });
}

/**
 * The area code, a pause, the next three digits, a pause, the last four: the parentheses, the space and the dash
 * come in by themselves as each group fills, and the caret skips over them. The tenth digit completes the number:
 * a green check and the button turns on. Then the number fades out and it starts over.
 */
const STEPS: Step[] = [
  { typed: 0, hold: true, ms: 1600 },
  ...type(0, 3, 560),
  ...type(3, 6, 520),
  ...type(6, 10, 3000),
  { typed: 10, dip: true, ms: 280 },
];

/** The still picture: "(415) 555-01" typed, the last two placeholders still showing. */
const FINAL: Step = { typed: 8, ms: 0 };

/** Steps through the loop; `hold` steps wait while the tile isn't playing, the short beats in between always finish. */
function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);
  const held = final || (STEPS[index].hold === true && !playing);

  useEffect(() => {
    if (held) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, held]);

  return final ? FINAL : STEPS[index];
}

/**
 * The mask drawn for `typed` digits: each slot shows its digit or its placeholder, and each separator turns from
 * placeholder gray to text once the digits before it are in. The caret sits before the next empty slot, so it jumps
 * over a separator the moment one comes in; with nothing typed it waits at the start, before the parenthesis.
 */
function masked(typed: number) {
  const caret = <span key="caret" className={styles.caret} />;
  const parts: ReactNode[] = typed === 0 ? [caret] : [];
  let slot = 0;
  let separator = '';
  const flush = (index: number) => {
    if (!separator) return;
    // The digits that have to be in before this separator shows (at least one, for the opening parenthesis)
    const after = Math.max(slot, 1);
    parts.push(
      <span
        key={`s${index}`}
        className={styles.separator}
        data-in={typed >= after || undefined}
        data-inspect="input-mask-separator"
      >
        {separator}
      </span>,
    );
    separator = '';
  };
  [...MASK].forEach((char, index) => {
    if (char !== '_') {
      separator += char;
      return;
    }
    flush(index);
    if (slot === typed && typed > 0) parts.push(caret);
    parts.push(
      slot < typed ? (
        <span key={`d${slot}`} className={styles.digit}>
          {DIGITS[slot]}
        </span>
      ) : (
        <span key={`d${slot}`} className={styles.placeholder} data-inspect="input-mask-placeholder">
          _
        </span>
      ),
    );
    slot += 1;
  });
  if (typed === DIGITS.length) parts.push(caret);
  return parts;
}

/**
 * Input mask: the phone step of a sign-up, with a country code chip and a number field that shows its format as
 * placeholders, (___) ___-____. Digits fill the slots, the parentheses, the space and the dash come in by themselves
 * and the caret skips over them; a complete number gets a green check and turns the button on. Reduced motion shows
 * "(415) 555-01" with two slots to go.
 */
export function InputMask() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const valid = step.typed === DIGITS.length;

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-valid={valid || undefined}
      data-typing={step.typing || undefined}
      data-dip={step.dip || undefined}
      data-paused={playing ? undefined : ''}
      data-still={final || undefined}
    >
      <div className={styles.form}>
        <span className={styles.label}>Phone number</span>

        <div className={styles.field} data-inspect="input-mask">
          <span className={styles.country} data-inspect="input-mask-country">
            +1
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m7 10 5 5 5-5" />
            </svg>
          </span>
          <span className={styles.number}>{masked(step.typed)}</span>
          <svg className={styles.valid} viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="8.5" />
            <path d="m6.75 10.25 2.25 2.25 4.25-4.5" pathLength={1} />
          </svg>
        </div>

        <span className={styles.helper} data-inspect="input-mask-helper">
          We’ll text a code to this number.
        </span>

        <span className={styles.button}>Continue</span>
      </div>
    </div>
  );
}
