import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './PasswordStrength.module.css';

/** What gets typed, one key at a time; the closing symbol comes last, after the peek. */
const PASSWORD = 'harbor7lights!';

const RULES = [
  { label: 'At least 8 characters', met: (text: string) => text.length >= 8 },
  { label: 'A number', met: (text: string) => /\d/.test(text) },
  { label: 'A symbol', met: (text: string) => /[^a-z\d]/i.test(text) },
];

/** The meter's levels: anything typed is Weak, and each rule met steps it up one. */
const LEVELS = ['Weak', 'Fair', 'Good', 'Strong'];

const scoreOf = (text: string) => (text ? 1 + RULES.filter((rule) => rule.met(text)).length : 0);

/**
 * One moment of the loop: how much is typed, whether the text is shown, where the pointer is and whether it presses,
 * and how long the moment lasts. `typing` keeps the caret solid; `dip` fades the field out to start over. `hold`
 * moments wait while the tile is inspected or out of view; the short beats in between always finish.
 */
type Step = {
  typed: number;
  shown?: boolean;
  pointer?: boolean;
  pressed?: boolean;
  typing?: boolean;
  dip?: boolean;
  hold?: boolean;
  ms: number;
};

/** Keys at typing speed, one step each; the last waits `rest` so the meter's new level can be read. */
function type(from: number, to: number, rest: number): Step[] {
  return Array.from({ length: to - from }, (_, index) => ({
    typed: from + index + 1,
    typing: index < to - from - 1,
    hold: index === to - from - 1,
    ms: index === to - from - 1 ? rest : 95,
  }));
}

/**
 * "harbor" is Weak; the 7 adds a number (Fair) and the l makes eight characters (Good). After "ights" the pointer
 * clicks the eye to check what was typed, and again to hide it; the "!" adds a symbol and it's Strong. Then the
 * field fades out and empties.
 */
const STEPS: Step[] = [
  { typed: 0, hold: true, ms: 1000 },
  ...type(0, 6, 380),
  ...type(6, 7, 700),
  ...type(7, 8, 700),
  ...type(8, 13, 600),
  { typed: 13, pointer: true, hold: true, ms: 750 },
  { typed: 13, pointer: true, pressed: true, ms: 120 },
  { typed: 13, pointer: true, shown: true, hold: true, ms: 1500 },
  { typed: 13, pointer: true, shown: true, pressed: true, ms: 120 },
  { typed: 13, pointer: true, hold: true, ms: 450 },
  { typed: 13, ms: 550 },
  ...type(13, 14, 2000),
  { typed: 14, dip: true, ms: 260 },
];

/** The still picture: "harbor7lights" in, Good, two of the three rules met. */
const FINAL: Step = { typed: 13, ms: 0 };

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
 * Password strength meter: the password step of a sign-up form. The field masks what's typed as dots and has an eye
 * to show it; under it a four-segment meter, red to green with its word (Weak, Fair, Good, Strong), and a checklist of
 * the rules, each ticking as it's met. In the loop the password is typed key by key and the meter steps up with every
 * rule; the eye shows the text for a moment, a symbol makes it Strong, and the field empties to start over.
 */
export function PasswordStrength() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const text = PASSWORD.slice(0, step.typed);
  const score = scoreOf(text);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-shown={step.shown || undefined}
      data-typing={step.typing || undefined}
      data-dip={step.dip || undefined}
      data-paused={playing ? undefined : ''}
      data-still={final || undefined}
    >
      <div className={styles.form}>
        <span className={styles.fieldLabel}>Password</span>

        <div className={styles.field} data-inspect="password-strength-field">
          <span className={styles.value}>
            <span className={styles.dots}>
              {'•'.repeat(step.typed)}
              <span className={styles.caret} />
            </span>
            <span className={styles.text}>
              {text}
              <span className={styles.caret} />
            </span>
          </span>

          <span
            className={styles.toggle}
            aria-label={step.shown ? 'Hide password' : 'Show password'}
            data-inspect="password-strength-toggle"
            data-pressed={step.pressed || undefined}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
              <circle cx="12" cy="12" r="3" />
              <path className={`${styles.slash} ${styles.gap}`} d="M4 4l16 16" />
              <path className={styles.slash} d="M4 4l16 16" />
            </svg>
          </span>

          <svg className={styles.pointer} data-over={step.pointer || undefined} viewBox="0 0 20 24" aria-hidden="true">
            <path d="M3 2.5v16.2l4.1-4 2.7 6.3 2.9-1.2-2.7-6.3h5.8z" />
          </svg>
        </div>

        <div className={styles.strength} data-score={score}>
          <span
            className={styles.meter}
            role="meter"
            aria-valuenow={score}
            aria-valuemax={4}
            data-inspect="password-strength"
          >
            {LEVELS.map((level, index) => (
              <span key={level} className={styles.segment} data-on={index < score || undefined} />
            ))}
          </span>
          <span className={styles.level} data-inspect="password-strength-label">
            {LEVELS.map((level, index) => (
              <span key={level} data-shown={index === score - 1 || undefined}>
                {level}
              </span>
            ))}
          </span>
        </div>

        <ul className={styles.rules} data-inspect="password-strength-checklist">
          {RULES.map((rule) => (
            <li key={rule.label} className={styles.rule} data-met={rule.met(text) || undefined}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <circle className={styles.ring} cx="8" cy="8" r="6.25" />
                <path className={styles.tick} d="m5.25 8.25 1.9 1.9 3.6-3.85" pathLength={1} />
              </svg>
              {rule.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
