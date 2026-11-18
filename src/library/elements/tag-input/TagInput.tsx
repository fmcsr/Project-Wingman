import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './TagInput.module.css';
import kofi from '../photos/kofi.webp';

/** The team's labels. Only the dot is colored, so the names keep their contrast in both themes. */
const LABELS = [
  { name: 'Bug', color: '#e5484d' },
  { name: 'Web', color: '#3e8ef7' },
  { name: 'iOS', color: '#12a594' },
  { name: 'Design', color: '#d6409f' },
  { name: 'Desktop', color: '#f76b15' },
  { name: 'Improvement', color: '#8e4ec6' },
  { name: 'Performance', color: '#e2a336' },
];

const colorOf = (name: string) => LABELS.find((label) => label.name === name)?.color;

/** Labels not on the issue yet whose name starts with the query; the list shows three at most. */
function suggestionsFor(chips: string[], query: string) {
  if (query === '') return [];
  return LABELS.filter(
    (label) => !chips.includes(label.name) && label.name.toLowerCase().startsWith(query.toLowerCase()),
  ).slice(0, 3);
}

/**
 * One beat of the loop: the chips in the field, what's typed after them, and how long it lasts. `selected` marks the
 * last chip (the first Backspace), `added` names the chip that just came in, and `typing` keeps the caret solid.
 */
type Step = { chips: string[]; query: string; selected?: boolean; added?: string; typing?: boolean; ms: number };

const ON_ISSUE = ['Bug', 'Web', 'iOS'];
const WITH_DESIGN = [...ON_ISSUE, 'Design'];
const WITHOUT_IOS = ['Bug', 'Web'];

/**
 * "des" types out and the list narrows to Design and Desktop with the typed letters in bold; ↵ turns the highlighted
 * Design into a chip. Then Backspace on the empty field: the first press highlights the last chip, the second
 * removes it, twice, taking Design and iOS off. "ios" brings iOS back, and a comma commits it.
 */
const STEPS: Step[] = [
  { chips: ON_ISSUE, query: '', ms: 1200 },
  { chips: ON_ISSUE, query: 'd', typing: true, ms: 110 },
  { chips: ON_ISSUE, query: 'de', typing: true, ms: 110 },
  { chips: ON_ISSUE, query: 'des', ms: 1500 },
  { chips: WITH_DESIGN, query: '', added: 'Design', ms: 1100 },
  { chips: WITH_DESIGN, query: '', selected: true, ms: 800 },
  { chips: ON_ISSUE, query: '', ms: 650 },
  { chips: ON_ISSUE, query: '', selected: true, ms: 700 },
  { chips: WITHOUT_IOS, query: '', ms: 700 },
  { chips: WITHOUT_IOS, query: 'i', typing: true, ms: 110 },
  { chips: WITHOUT_IOS, query: 'io', typing: true, ms: 110 },
  { chips: WITHOUT_IOS, query: 'ios', ms: 750 },
  { chips: WITHOUT_IOS, query: 'ios,', typing: true, ms: 90 },
  { chips: ON_ISSUE, query: '', added: 'iOS', ms: 1400 },
];

/** Reduced motion: three chips, "des" typed, the list open on Design. */
const FINAL = STEPS.findIndex((step) => step.query === 'des');

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return final ? { step: STEPS[FINAL], beat: FINAL } : { step: STEPS[index], beat: index };
}

/** The typed letters in bold, the rest of the name as it is. */
function Match({ name, query }: { name: string; query: string }) {
  return (
    <span className={styles.optionName}>
      <b>{name.slice(0, query.length)}</b>
      {name.slice(query.length)}
    </span>
  );
}

/**
 * Tag input: an issue's Labels field in a tracker's edit form, holding chips (a color dot, the name and a remove ×)
 * with the caret after them, and a suggestion list that opens under it as you type. The loop: "des" filters the
 * list with the match in bold and ↵ adds Design; Backspace on the empty field highlights the last chip and a second
 * press removes it; "ios" and a comma add iOS back.
 */
export function TagInput() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const { step, beat } = useLoop(playing, final);
  // What the list shows; a comma ends the query, so it keeps showing what matched before it
  const query = step.query.replace(',', '');
  const suggestions = suggestionsFor(step.chips, query);
  const open = suggestions.length > 0 && !step.query.endsWith(',');

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-open={open || undefined}
      data-typing={step.typing || undefined}
      data-paused={!playing || undefined}
      data-still={final || undefined}
    >
      <div className={styles.form}>
        <div className={styles.labelRow}>
          <span className={styles.fieldLabel}>Labels</span>
          <span className={styles.hint}>
            <kbd className={styles.kbd}>↵</kbd> or <kbd className={styles.kbd}>,</kbd> to add
          </span>
        </div>

        <div className={styles.fieldWrap}>
          <div className={styles.field} role="combobox" aria-expanded={open} data-inspect="tag-input">
            {step.chips.map((name, index) => (
              <span
                key={name}
                className={styles.chip}
                data-selected={(step.selected && index === step.chips.length - 1) || undefined}
                data-added={name === step.added || undefined}
                data-inspect="tag-input-chip"
              >
                <span className={styles.dot} style={{ background: colorOf(name) }} />
                {name}
                <span className={styles.remove} data-inspect="tag-input-remove">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M5 5l6 6M11 5l-6 6" />
                  </svg>
                </span>
              </span>
            ))}
            <span className={styles.query}>
              {step.query}
              {/* A new one each beat: like a real caret, it shows solid after every key before it blinks */}
              <span key={beat} className={styles.caret} />
            </span>
          </div>

          <div className={styles.list} role="listbox" data-inspect="tag-input-suggestions">
            {suggestions.map((label, index) => (
              <span
                key={label.name}
                className={styles.option}
                role="option"
                aria-selected={index === 0}
                data-inspect={index === 0 ? 'tag-input-option' : undefined}
              >
                <span className={styles.dot} style={{ background: label.color }} />
                <Match name={label.name} query={query} />
                {index === 0 && <kbd className={`${styles.kbd} ${styles.enter}`}>↵</kbd>}
              </span>
            ))}
          </div>
        </div>
        <span className={styles.helper}>Used to filter and group issues.</span>

        {/* The next field down, which the list floats over while it's open */}
        <div className={styles.next}>
          <span className={styles.fieldLabel}>Assignee</span>
          <span className={styles.select}>
            <img className={styles.avatar} src={kofi} alt="" width={20} height={20} />
            Kofi Mensah
            <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4.5 6.5 8 10l3.5-3.5" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
