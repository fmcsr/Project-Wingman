import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './IndeterminateCheckbox.module.css';

const ICONS: Record<string, ReactNode> = {
  pdf: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.75" />
      <path d="m20.5 15.5-4.5-4.5-8 8" />
    </>
  ),
  sheet: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M4 9.5h16M4 15h16M10 9.5v11" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 12h6M9 15.5h6M9 19h3" />
    </>
  ),
};

/** A shared folder's files, newest first. */
const FILES = [
  { name: 'Roadmap Q4.pdf', icon: 'pdf', modified: 'Nov 16', size: '2.4 MB' },
  { name: 'Hero banner.png', icon: 'image', modified: 'Nov 12', size: '860 KB' },
  { name: 'Budget 2027.xlsx', icon: 'sheet', modified: 'Nov 9', size: '148 KB' },
  { name: 'Interview notes.docx', icon: 'doc', modified: 'Oct 30', size: '64 KB' },
];

/**
 * One moment of the loop: how many files are checked (from the top), the checkbox the pointer is on (-1: the header's)
 * and whether it presses, and how long the moment lasts. `hold` moments wait while the tile is inspected or out of
 * view; a press always finishes.
 */
type Step = { checked: number; pointer: number; pressed?: boolean; hold?: boolean; ms: number };

/** The pointer moves to a checkbox and rests on it, then presses: the click lands as it lets go. */
function click(checked: number, next: number, pointer: number, rest: number): Step[] {
  return [
    { checked, pointer, hold: true, ms: 550 },
    { checked, pointer, pressed: true, ms: 110 },
    { checked: next, pointer, hold: true, ms: rest },
  ];
}

/**
 * The files are checked one by one: the header's box goes from empty to a dash with the first, and the header turns
 * into the bulk bar; with the fourth the dash becomes a check. A click on the header's box clears them all.
 */
const STEPS: Step[] = [
  ...click(0, 1, 0, 800),
  ...click(1, 2, 1, 800),
  ...click(2, 3, 2, 700),
  ...click(3, 4, 3, 1300),
  ...click(4, 0, -1, 1400),
];

/** The still picture: two of the four checked, the header's box a dash, the bulk bar showing. */
const FINAL: Step = { checked: 2, pointer: 1, ms: 0 };

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

type State = 'unchecked' | 'mixed' | 'checked';

/** `hover`: the pointer is on it; `pressed`: the pointer is pressing (it only shows where the pointer is). */
type CheckboxProps = { state: State; inspect: string; hover: boolean; pressed: boolean };

/** A checkbox drawn as one box with both marks in it; `data-state` shows the check or the dash. */
function Checkbox({ state, inspect, hover, pressed }: CheckboxProps) {
  return (
    <span
      className={styles.checkbox}
      role="checkbox"
      aria-checked={state === 'mixed' ? 'mixed' : state === 'checked'}
      data-state={state}
      data-hover={hover || undefined}
      data-pressed={(hover && pressed) || undefined}
      data-inspect={inspect}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path className={styles.check} d="m4 8.25 2.6 2.6L12 5.4" pathLength={1} />
        <path className={styles.dash} d="M4.5 8h7" />
      </svg>
    </span>
  );
}

/**
 * Indeterminate checkbox: a shared folder's file list with a checkbox on every row and one in the header that checks
 * or clears them all. With some checked, the header's box shows a dash (indeterminate) and the header turns into a
 * bulk bar with the count and actions; with all checked it shows a check. In the loop a pointer checks the files one
 * by one, empty → dash → check, then clears them all with the header's box.
 */
export function IndeterminateCheckbox() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const parent: State = step.checked === 0 ? 'unchecked' : step.checked === FILES.length ? 'checked' : 'mixed';
  const pointerOn = (row: number) => !final && step.pointer === row;
  // Cleared, the bar fades out with the count it had: everything was selected when the header's box cleared it
  const count = step.checked || FILES.length;

  return (
    <div ref={ref} className={styles.tile} data-still={final || undefined}>
      <div
        className={styles.list}
        role="grid"
        aria-label="Shared files"
        style={{ '--pointer': step.pointer } as CSSProperties}
      >
        <div className={styles.header} data-selecting={step.checked > 0 || undefined}>
          <span className={styles.columns}>
            <span className={styles.nameColumn}>Name</span>
            <span className={styles.modified}>Modified</span>
            <span className={styles.size}>Size</span>
          </span>

          <span className={styles.bar} data-inspect="indeterminate-checkbox-bar">
            <span className={styles.count} aria-live="polite" data-inspect="indeterminate-checkbox-count">
              {count} selected
            </span>
            <span className={styles.action}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
                <path d="M11 13.5h5.5M14 11l2.5 2.5L14 16" />
              </svg>
              <span className={styles.label}>Move</span>
            </span>
            <span className={styles.action}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.5 7h15M10 4h4M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12M10 11v6M14 11v6" />
              </svg>
              <span className={styles.label}>Delete</span>
            </span>
          </span>

          <Checkbox
            state={parent}
            inspect="indeterminate-checkbox"
            hover={pointerOn(-1)}
            pressed={step.pressed === true}
          />
        </div>

        {FILES.map((file, index) => {
          const checked = index < step.checked;
          return (
            <div
              key={file.name}
              className={styles.row}
              role="row"
              aria-selected={checked}
              data-hover={pointerOn(index) || undefined}
            >
              <Checkbox
                state={checked ? 'checked' : 'unchecked'}
                inspect={checked ? 'indeterminate-checkbox-checked' : 'indeterminate-checkbox-child'}
                hover={pointerOn(index)}
                pressed={step.pressed === true}
              />
              <svg className={styles.fileIcon} viewBox="0 0 24 24" aria-hidden="true">
                {ICONS[file.icon]}
              </svg>
              <span className={styles.name}>{file.name}</span>
              <span className={styles.modified}>{file.modified}</span>
              <span className={styles.size}>{file.size}</span>
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
