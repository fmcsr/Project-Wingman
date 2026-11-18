import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './QuantityStepper.module.css';

/** The popover's rows. `short` stands in for the age range where the row is too narrow for it. */
const ROWS = [
  { name: 'Adults', ages: 'Ages 13 or above', short: 'Ages 13+', min: 1 },
  { name: 'Children', ages: 'Ages 2–12', min: 0 },
  { name: 'Infants', ages: 'Under 2', min: 0 },
];

/** The highest count a row goes to: the digits the value's strip holds. */
const MAX = 5;

type Button = 'minus' | 'plus';

/**
 * One moment of the loop: the three counts, the button the pointer is over and what it does there, and how long the
 * moment lasts. `hold` moments wait while the tile is inspected or out of view; a press always finishes.
 */
type Step = {
  counts: [number, number, number];
  row: number;
  button: Button;
  pressed?: boolean;
  refused?: boolean;
  hold?: boolean;
  ms: number;
};

/** The pointer moves to a button and rests on it, then presses: the count changes as it lets go. */
function press(counts: Step['counts'], next: Step['counts'], row: number, button: Button, rest: number): Step[] {
  return [
    { counts, row, button, hold: true, ms: 800 },
    { counts, row, button, pressed: true, ms: 120 },
    { counts: next, row, button, hold: true, ms: rest },
  ];
}

/**
 * Children go up to 2 and Adults down to 1, which turns Adults' − off. A press on Infants' −, off at 0, does
 * nothing: the button gives a small shake. Then Adults go back to 2 and Children to 1, and it starts over.
 */
const STEPS: Step[] = [
  ...press([2, 1, 0], [2, 2, 0], 1, 'plus', 1100),
  ...press([2, 2, 0], [1, 2, 0], 0, 'minus', 1200),
  { counts: [1, 2, 0], row: 2, button: 'minus', hold: true, ms: 800 },
  { counts: [1, 2, 0], row: 2, button: 'minus', refused: true, ms: 420 },
  { counts: [1, 2, 0], row: 2, button: 'minus', hold: true, ms: 900 },
  ...press([1, 2, 0], [2, 2, 0], 0, 'plus', 900),
  ...press([2, 2, 0], [2, 1, 0], 1, 'minus', 1300),
];

/** The still picture: 2 adults, 1 child, no infants, Infants' − off; no pointer. */
const FINAL: Step = { counts: [2, 1, 0], row: 1, button: 'plus', ms: 0 };

/** Steps through the loop; `hold` steps wait while the tile isn't playing, the short beats in between always finish. */
function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(STEPS.length - 1);
  const held = final || (STEPS[index].hold === true && !playing);

  useEffect(() => {
    if (held) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, held]);

  return final ? FINAL : STEPS[index];
}

const MINUS = 'M5.5 12h13';
const PLUS = 'M5.5 12h13M12 5.5v13';

/**
 * Stepper: the guests popover of a stay search, with a row each for adults, children and infants: the name and ages
 * on the left, round − and + buttons around the count on the right. A − at its row's minimum is faded and off. In the
 * loop a pointer adds a child (the count rolls up from 1 to 2), takes an adult away (Adults' − turns off at 1),
 * presses Infants' − at 0, which only shakes, and puts the counts back.
 */
export function QuantityStepper() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const guests = step.counts[0] + step.counts[1];

  return (
    <div ref={ref} className={styles.tile} data-still={final || undefined}>
      <div
        className={styles.popover}
        role="dialog"
        aria-label="Guests"
        style={{ '--row': step.row, '--column': step.button === 'minus' ? 1 : 0 } as CSSProperties}
      >
        <div className={styles.head}>
          <span className={styles.title}>Guests</span>
          <span className={styles.total}>
            {guests} guest{guests === 1 ? '' : 's'}
          </span>
        </div>

        {ROWS.map((row, index) => {
          const count = step.counts[index];
          const off = count <= row.min;
          const at = (button: Button) => !final && step.row === index && step.button === button;
          return (
            <div key={row.name} className={styles.row}>
              <span className={styles.label} data-inspect="quantity-stepper-label">
                <span className={styles.name}>{row.name}</span>
                <span className={styles.ages}>
                  {row.short ? (
                    <>
                      <span className={styles.long}>{row.ages}</span>
                      <span className={styles.short}>{row.short}</span>
                    </>
                  ) : (
                    row.ages
                  )}
                </span>
              </span>

              <span className={styles.stepper} role="group" aria-label={row.name} data-inspect="quantity-stepper">
                <span
                  className={styles.button}
                  aria-label="Decrease"
                  aria-disabled={off || undefined}
                  data-inspect={off ? 'quantity-stepper-disabled' : 'quantity-stepper-decrement'}
                  data-hover={at('minus') || undefined}
                  data-pressed={(at('minus') && step.pressed) || undefined}
                  data-refused={(at('minus') && step.refused) || undefined}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={MINUS} />
                  </svg>
                </span>
                <span className={styles.value} aria-live="polite" data-inspect="quantity-stepper-value">
                  <span className={styles.digits} style={{ '--count': count } as CSSProperties}>
                    {Array.from({ length: MAX + 1 }, (_, digit) => (
                      <span key={digit}>{digit}</span>
                    ))}
                  </span>
                </span>
                <span
                  className={styles.button}
                  aria-label="Increase"
                  data-inspect="quantity-stepper-increment"
                  data-hover={at('plus') || undefined}
                  data-pressed={(at('plus') && step.pressed) || undefined}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={PLUS} />
                  </svg>
                </span>
              </span>
            </div>
          );
        })}

        <svg className={styles.pointer} viewBox="0 0 20 24" aria-hidden="true">
          <path d="M3 2.5v16.2l4.1-4 2.7 6.3 2.9-1.2-2.7-6.3h5.8z" />
        </svg>
      </div>
    </div>
  );
}
