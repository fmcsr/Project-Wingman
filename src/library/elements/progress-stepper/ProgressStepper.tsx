import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './ProgressStepper.module.css';

const STEPS = ['Account', 'Workspace', 'Team', 'Billing'];

/** Where the pointer is: resting over the form, or on the Continue or Back button. */
type Spot = 'rest' | 'continue' | 'back';

/**
 * One beat of the loop: the current step (0-based; the ones before it are done), where the pointer is, whether it's
 * pressing, and how long the beat lasts.
 */
type Beat = { current: number; at: Spot; press?: boolean; ms: number };

/**
 * The workspace is named; the pointer goes to Continue and clicks. Step 2 gets its check, the line to step 3 fills and
 * step 3 becomes current as the form slides on to the invitations. A moment later the pointer clicks Back: the line
 * empties, step 2 is current again and the form slides back.
 */
const BEATS: Beat[] = [
  { current: 1, at: 'rest', ms: 1500 },
  { current: 1, at: 'continue', ms: 700 },
  { current: 1, at: 'continue', press: true, ms: 120 },
  { current: 2, at: 'continue', ms: 1500 },
  { current: 2, at: 'back', ms: 900 },
  { current: 2, at: 'back', press: true, ms: 120 },
  { current: 1, at: 'back', ms: 1300 },
];

/** Reduced motion: step 2 current, the workspace named, the pointer over the form. */
const FINAL = BEATS[0];

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % BEATS.length), BEATS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return final ? FINAL : BEATS[index];
}

type State = 'done' | 'current' | 'upcoming';

const stateOf = (step: number, current: number): State =>
  step < current ? 'done' : step === current ? 'current' : 'upcoming';

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  close: 'M7 7l10 10M17 7L7 17',
};

function Icon({ d }: { d: string }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/**
 * Progress stepper: the top of a four-step onboarding (Account, Workspace, Team, Billing), each step a numbered circle
 * with its label and a line to the next, above the current step's form with Back and Continue. Done steps get a
 * check and a filled line; the current one a ring. On narrow tiles it's "Step 2 of 4" over a segmented bar. The loop:
 * Continue checks off step 2, the line fills and step 3 becomes current as the form slides on; then Back undoes it.
 */
export function ProgressStepper() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const beat = useLoop(playing, final);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-current={beat.current}
      data-at={beat.at}
      data-press={beat.press || undefined}
    >
      <ol className={styles.stepper} aria-label="Setup progress" data-inspect="progress-stepper">
        {STEPS.map((name, step) => {
          const state = stateOf(step, beat.current);
          return (
            <li
              key={name}
              className={styles.step}
              data-state={state}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {/* The line in from the step before, filled once that step is done */}
              {step > 0 && (
                <span className={styles.connector} data-inspect="progress-stepper-connector">
                  <span className={styles.fill} data-on={step <= beat.current || undefined} />
                </span>
              )}
              <span className={styles.marker} data-inspect={`progress-stepper-${state}`}>
                <span className={styles.circle}>
                  <span className={styles.number}>{step + 1}</span>
                  <svg className={styles.check} viewBox="0 0 24 24">
                    <path d="M6.5 12.5l3.5 3.5 7.5-8" pathLength="1" />
                  </svg>
                </span>
                <span className={styles.label}>{name}</span>
              </span>
            </li>
          );
        })}
      </ol>

      {/* Narrow tiles: the same progress as a count and a segmented bar */}
      <div className={styles.compact} data-inspect="progress-stepper">
        <span className={styles.count}>
          Step {beat.current + 1} of {STEPS.length}
          <span className={styles.countName}>{STEPS[beat.current]}</span>
        </span>
        <span className={styles.segments}>
          {STEPS.map((name, step) => (
            <span
              key={name}
              className={styles.segment}
              data-state={stateOf(step, beat.current)}
              data-inspect={`progress-stepper-${stateOf(step, beat.current)}`}
            >
              <span className={styles.segmentFill} />
            </span>
          ))}
        </span>
      </div>

      <div className={styles.body}>
        {/* Step 2: name the workspace */}
        <section className={styles.form} data-shown={beat.current === 1 || undefined} data-side="before">
          <h3 className={styles.title}>Name your workspace</h3>
          <p className={styles.hint}>Your team will see this name, and join with the link.</p>
          <span className={styles.field}>
            Northwind Studio
            <span className={styles.url}>harbor.app/northwind</span>
          </span>
        </section>

        {/* Step 3: invite the team */}
        <section className={styles.form} data-shown={beat.current === 2 || undefined} data-side="after">
          <h3 className={styles.title}>Invite your team</h3>
          <p className={styles.hint}>They’ll get an email with a link to join Northwind Studio.</p>
          <span className={styles.field}>
            <span className={styles.chip}>
              jonas@northwind.studio
              <Icon d={ICONS.close} />
            </span>
            <span className={`${styles.chip} ${styles.chipMore}`}>
              rosa@northwind.studio
              <Icon d={ICONS.close} />
            </span>
          </span>
        </section>

        <div className={styles.actions}>
          <span className={styles.back}>Back</span>
          <span className={styles.continue}>
            Continue
            <Icon d={ICONS.arrow} />
          </span>
        </div>
      </div>

      <span className={styles.pointer}>
        <svg className={styles.arrow} viewBox="0 0 14 20">
          <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
        </svg>
        <svg className={styles.hand} viewBox="0 0 24 24">
          <path d="M8.5 3.5a1.5 1.5 0 0 1 3 0V10a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0v.8a1.25 1.25 0 0 1 2.5 0V16a6 6 0 0 1-6 6h-1.6a5 5 0 0 1-4.1-2.1l-3.7-4.5a1.6 1.6 0 0 1 2.4-2.1l1.5 1.3z" />
          <path d="M11.5 10v3.2M14.5 10.5v2.7M17.5 11.3v2.2" />
        </svg>
      </span>
    </div>
  );
}
