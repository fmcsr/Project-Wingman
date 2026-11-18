import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './CopyButton.module.css';

/**
 * One moment of the loop: whether the pointer is on its way to the copy button or on it, whether it has arrived (the
 * button's hover tint) and is pressing, whether the command has just been copied, and how long the moment lasts.
 */
type Step = { pointer: boolean; hover?: boolean; press?: boolean; copied?: boolean; ms: number };

/**
 * The pointer rests below the field, glides to the button (its hover tint comes on as it arrives) and clicks. The
 * icon turns into a check and "Copied!" appears above it; two seconds later both revert, and the pointer moves away.
 */
const STEPS: Step[] = [
  { pointer: false, ms: 1100 },
  { pointer: true, ms: 600 },
  { pointer: true, hover: true, ms: 350 },
  { pointer: true, hover: true, press: true, ms: 120 },
  { pointer: true, hover: true, copied: true, ms: 2000 },
  { pointer: true, hover: true, ms: 600 },
  { pointer: false, ms: 1500 },
];

/** The still picture: just clicked, the check in place of the icon and the tooltip above it. */
const FINAL: Step = { pointer: true, hover: true, copied: true, ms: 0 };

/** The docs' package manager tabs; the command shown is npm's. */
const MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'];

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
 * Copy button: the install step of a developer docs page, the command in a code field with package manager tabs over
 * it and a copy icon button at its end. In the loop the pointer comes to the button and clicks; the icon morphs into a green check and a "Copied!"
 * tooltip appears above it; after two seconds both revert and the pointer leaves.
 */
export function CopyButton() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);

  return (
    <div ref={ref} className={styles.tile} data-pointer={step.pointer ? '' : undefined}>
      <div className={styles.step}>
        <span className={styles.heading}>
          <span className={styles.number}>1</span>
          Install the SDK
        </span>
        <span className={styles.lead}>Requires Node.js 18 or later.</span>

        <div className={styles.field} data-inspect="copy-button-field">
          <div className={styles.tabs}>
            {MANAGERS.map((manager) => (
              <span
                key={manager}
                className={`${styles.tab} ${manager === 'bun' ? styles.last : ''}`}
                data-current={manager === 'npm' ? '' : undefined}
              >
                {manager}
              </span>
            ))}
          </div>

          <div className={styles.line}>
            <code className={styles.command}>
              npm <span className={styles.short}>i</span>
              <span className={styles.long}>install</span> @hexworks/sdk
            </code>

            <span className={styles.copy}>
              <span
                className={styles.button}
                data-inspect="copy-button"
                data-hover={step.hover ? '' : undefined}
                data-press={step.press ? '' : undefined}
                data-copied={step.copied ? '' : undefined}
              >
                <svg className={styles.copyIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="8.75" y="8.75" width="11.5" height="11.5" rx="2.25" />
                  <path d="M15.25 8.75V6A2.25 2.25 0 0 0 13 3.75H6A2.25 2.25 0 0 0 3.75 6v7A2.25 2.25 0 0 0 6 15.25h2.75" />
                </svg>
                <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true" data-inspect="copy-button-check">
                  <path d="m5 12.5 4.25 4.25L19 7" />
                </svg>
              </span>
              <span
                className={styles.tooltip}
                role="status"
                data-inspect="copy-button-tooltip"
                data-shown={step.copied ? '' : undefined}
              >
                Copied!
              </span>
            </span>

            <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
              <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
