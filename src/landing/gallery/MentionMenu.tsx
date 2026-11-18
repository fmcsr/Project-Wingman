import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../demos/motion';
import styles from './MentionMenu.module.css';
import amani from './photos/productivity/amani.webp';
import clara from './photos/productivity/clara.webp';
import erik from './photos/productivity/erik.webp';
import imani from './photos/productivity/imani.webp';
import kofi from './photos/productivity/kofi.webp';
import marcus from './photos/productivity/marcus.webp';
import maya from './photos/productivity/maya.webp';
import noah from './photos/productivity/noah.webp';
import rosa from './photos/productivity/rosa.webp';

type Person = { name: string; role: string; photo: string };

/** The channel's members, A to Z, as the menu lists them before a letter is typed. */
const MEMBERS: Person[] = [
  { name: 'Amani Osei', role: 'Product designer', photo: amani },
  { name: 'Clara Weiss', role: 'Design lead', photo: clara },
  { name: 'Erik Lindqvist', role: 'Frontend engineer', photo: erik },
  { name: 'Imani Okafor', role: 'Engineering manager', photo: imani },
  { name: 'Kofi Mensah', role: 'iOS engineer', photo: kofi },
  { name: 'Marcus Lee', role: 'Engineering lead', photo: marcus },
  { name: 'Maya Brooks', role: 'Content designer', photo: maya },
  { name: 'Noah Moretti', role: 'Data analyst', photo: noah },
  { name: 'Rosa Delgado', role: 'Support lead', photo: rosa },
];

/** The menu has room for three rows; a real one would scroll to the rest. */
const ROWS = 3;

/** People whose first name starts with the query, then those whose last name does. */
function matches(query: string) {
  const starts = (word: string) => word.toLowerCase().startsWith(query);
  const first = MEMBERS.filter((person) => starts(person.name.split(' ')[0]));
  const last = MEMBERS.filter((person) => !first.includes(person) && starts(person.name.split(' ')[1]));
  return [...first, ...last].slice(0, ROWS);
}

/**
 * One beat of the loop. `query` is what follows the "@" while a mention is being typed (null: none in progress);
 * `mentioned` puts Marcus's chip in the text; `after` is what's typed after it. `typing` keeps the caret solid and
 * `dip` fades the text out, so it can start over.
 */
type Step = { query: string | null; mentioned?: boolean; after?: string; ms: number; typing?: boolean; dip?: boolean };

const AFTER = 'before we ship';

/**
 * The reply already cc's Clara. "@" opens the menu on the channel's members, "m" narrows it and "ma" leaves Marcus
 * and Maya, ↵ turns the query into Marcus's chip and closes the menu, and the sentence goes on. Then the text fades
 * out and back to the start.
 */
const STEPS: Step[] = [
  { query: null, ms: 1300 },
  { query: '', ms: 800, typing: true },
  { query: 'm', ms: 110, typing: true },
  { query: 'ma', ms: 1500 },
  { query: null, mentioned: true, after: '', ms: 450 },
  ...[...AFTER].map((_, index) => ({
    query: null,
    mentioned: true,
    after: AFTER.slice(0, index + 1),
    ms: index === AFTER.length - 1 ? 1800 : 80,
    typing: true,
  })),
  { query: null, mentioned: true, after: AFTER, ms: 320, dip: true },
  { query: null, ms: 160, dip: true },
];

/** Reduced motion: "@ma" typed and the menu open on Marcus and Maya, Clara's chip earlier in the text. */
const FINAL = STEPS.findIndex((step) => step.query === 'ma');

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

const ICONS = {
  plus: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v8M8 12h8',
  smile: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14a4.2 4.2 0 0 0 7 0M9 9.5h.01M15 9.5h.01',
  at: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1',
  send: 'M4.5 12.5l15-7.5-4.2 15-3.3-6.2zM12 13.8l7.5-8.8',
};

function Icon({ d }: { d: string }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/**
 * Mention menu: a reply in a team chat thread. Typing "@" opens a list of people above the composer, each with a
 * face, a name and a role, the first match highlighted; the letters after the "@" filter it, and ↵ turns the query
 * into a mention chip. The loop types "@ma", picks Marcus, finishes the sentence and starts over; reduced motion
 * shows the menu open on the second mention.
 */
export function MentionMenu() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const open = step.query !== null;
  const people = matches(step.query ?? '');

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-open={open || undefined}
      data-typing={step.typing || undefined}
      data-dip={step.dip || undefined}
      data-paused={!playing || undefined}
      data-still={final || undefined}
    >
      {/* The thread: the message that started it at the top, the latest reply just above the composer */}
      <div className={styles.thread}>
        <div className={styles.message}>
          <img className={styles.messageFace} src={amani} alt="" width={28} height={28} />
          <span className={styles.messageHead}>
            <span className={styles.author}>Amani Osei</span>
            <span className={styles.time}>2:14 PM</span>
          </span>
          <span>Empty state is on staging</span>
        </div>
        <div className={styles.message}>
          <img className={styles.messageFace} src={kofi} alt="" width={28} height={28} />
          <span className={styles.messageHead}>
            <span className={styles.author}>Kofi Mensah</span>
            <span className={styles.time}>2:20 PM</span>
          </span>
          <span>Works in dark mode too</span>
        </div>
      </div>

      <div className={styles.composer} data-inspect="mention-menu-composer">
        <div className={styles.menu} role="listbox" aria-label="People" data-inspect="mention-menu">
          {people.map((person, index) => (
            <span
              key={person.name}
              className={styles.option}
              role="option"
              aria-selected={index === 0}
              data-inspect={index === 0 ? 'mention-menu-option' : undefined}
            >
              <img className={styles.face} src={person.photo} alt="" width={22} height={22} />
              <span className={styles.name}>{person.name}</span>
              <span className={styles.role}>{person.role}</span>
            </span>
          ))}
        </div>

        <div className={styles.field} role="textbox" aria-multiline="true">
          Nice! cc{' '}
          <span className={styles.chip} data-inspect="mention-menu-chip">
            @Clara Weiss
          </span>{' '}
          {/* Always there, so it can be inspected; between mentions it steps out of the text, hidden */}
          <span className={styles.query} data-idle={!open || undefined} data-inspect="mention-menu-query">
            @{step.query}
          </span>
          {step.mentioned && (
            <>
              <span className={`${styles.chip} ${styles.chipNew}`} data-inspect="mention-menu-chip">
                @Marcus Lee
              </span>{' '}
              {step.after}
            </>
          )}
          <span className={styles.caret} />
        </div>

        <div className={styles.toolbar}>
          <Icon d={ICONS.plus} />
          <span className={styles.format}>Aa</span>
          <Icon d={ICONS.smile} />
          <Icon d={ICONS.at} />
          <span className={styles.send}>
            <Icon d={ICONS.send} />
          </span>
        </div>
      </div>
    </div>
  );
}
