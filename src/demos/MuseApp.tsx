import { Fragment, useEffect, useRef, useState } from 'react';
import { useInspectActivity } from '../inspector/InspectActivity';
import { useDemoMotion } from './motion';
import { StatusBar } from './StatusBar';
import styles from './MuseApp.module.css';

/** The model switcher's menu; the model in use is checked. */
const MODELS = [
  { name: 'Muse 2.5', detail: 'Fast, for everyday work', selected: true },
  { name: 'Muse 2.5 Pro', detail: 'Thinks longer on hard problems' },
  { name: 'Muse Mini', detail: 'Quickest answers, lightest tasks' },
];

/** A stretch of the answer's text in one format: plain, bold or highlighted. */
type Run = { text: string; format?: 'strong' | 'mark' };

const TITLE: Run[] = [{ text: 'Self-serve refunds' }];

/** The answer's paragraph: a bold label, then the problem with its key figure highlighted. */
const PROBLEM: Run[] = [
  { text: 'Problem.', format: 'strong' },
  { text: 'Refunds are' },
  { text: '38% of tickets', format: 'mark' },
  { text: 'and take 2.6 days to close.' },
];

/** The answer's goals table: where each number is today and where the PRD wants it. */
const GOALS = [
  { metric: 'Refund tickets', today: '38%', target: '15%' },
  { metric: 'Time to refund', today: '2.6 days', target: '1 hour' },
  { metric: 'Refund CSAT', today: '3.4', target: '4.5' },
];

const SUBHEAD: Run[] = [{ text: 'Next steps' }];

/** The answer's next steps: one is already done. */
const NEXT_STEPS = [
  { text: 'Legal sign-off on auto-approval', done: true },
  { text: 'Confirm the $150 cap with Finance' },
  { text: 'Fraud rule for repeat refunders' },
];

const FOLLOW_UPS = ['Write user stories', 'Draft the tickets', 'List the risks'];

/** How long Muse shows "Thinking…" before it settles into "Thought for 9s" and starts to answer, in ms. */
const THINKING_MS = 1200;
/** One word every 55ms (about 18 a second): quick like a fast chat model, yet slow enough to watch it write. */
const WORD_MS = 55;
/** Table rows and checklist items arrive whole, one every 260ms. */
const ROW_MS = 260;

const wordCount = (runs: Run[]) => runs.reduce((count, run) => count + run.text.split(' ').length, 0);

/**
 * When each piece of Muse's reply appears, in ms of playing time after the conversation comes into view: the answer
 * word by word with a short pause between blocks, its table rows and checklist items whole, then the actions and the
 * suggestions once it's done. About five seconds in all.
 */
const STREAM = (() => {
  let at = THINKING_MS;
  /** The next beat, `pause` ms after the one before. */
  const beat = (pause: number) => (at += pause);
  /** `count` beats: the first after `pause`, the others `gap` apart. */
  const beats = (count: number, pause: number, gap: number) =>
    Array.from({ length: count }, (_, i) => beat(i ? gap : pause));
  return {
    thought: at,
    title: beats(wordCount(TITLE), 250, WORD_MS),
    problem: beats(wordCount(PROBLEM), 100, WORD_MS),
    citation: beat(100),
    table: beat(240),
    goals: beats(GOALS.length, ROW_MS, ROW_MS),
    subhead: beats(wordCount(SUBHEAD), 300, WORD_MS),
    steps: beats(NEXT_STEPS.length, 120, ROW_MS),
    actions: beat(400),
    followUps: beats(FOLLOW_UPS.length, 160, 80),
  };
})();

const BEATS = Object.values(STREAM)
  .flat()
  .sort((a, b) => a - b);
const END = BEATS[BEATS.length - 1];

/**
 * The stream's clock: how far the reply has got, in ms. It runs only while `playing` (in view and not inspected), so
 * the reply holds wherever it is and later picks up from there, and it moves from beat to beat, so the app re-renders
 * only when something appears.
 */
function useStreamClock(playing: boolean) {
  const [time, setTime] = useState(0);
  const elapsed = useRef(0);

  useEffect(() => {
    if (!playing || elapsed.current >= END) return;
    let last: number | undefined;
    let frame = requestAnimationFrame(function tick(now) {
      elapsed.current = Math.min(END, elapsed.current + (last === undefined ? 0 : now - last));
      last = now;
      setTime(BEATS.findLast((beat) => beat <= elapsed.current) ?? 0);
      if (elapsed.current < END) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  return time;
}

/**
 * Text that streams in word by word and keeps its formatting: an element per word (a span, or the run's <strong> or
 * <mark>), holding the space before it, so each word is hidden until the stream reaches it (`beats`, one per word)
 * and then fades in on its own; highlighted words tile into one marker band. Once the stream is over, the runs are
 * plain text again, set exactly as before: an element per word moves letters by a fraction of a pixel.
 */
function StreamedText({ runs, beats, time }: { runs: Run[]; beats: number[]; time: number }) {
  if (time >= END) {
    return runs.map(({ text, format }, i) => {
      if (format === 'strong') return <strong key={i}>{text}</strong>;
      if (format === 'mark') {
        return (
          <mark key={i} className={styles.highlight}>
            {text}
          </mark>
        );
      }
      // A plain run holds the spaces around it
      return `${i > 0 ? ' ' : ''}${text}${i < runs.length - 1 ? ' ' : ''}`;
    });
  }
  let word = 0;
  return runs.map(({ text, format }, r) => {
    const Tag = format ?? 'span';
    return (
      <Fragment key={r}>
        {r > 0 && ' '}
        {text.split(' ').map((part, i) => (
          <Tag
            key={i}
            className={format === 'mark' ? `${styles.highlight} ${styles.word}` : styles.word}
            data-pending={time < beats[word++] || undefined}
          >
            {i ? ` ${part}` : part}
          </Tag>
        ))}
      </Fragment>
    );
  });
}

/** Muse's mark: two arches that read as a small "m", on the saffron accent. */
function MuseMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 16 16" width="14" height="14">
      <circle className={styles.markDisc} cx="8" cy="8" r="8" />
      <path className={styles.markGlyph} d="M4.6 10.8V7.9a1.7 1.7 0 0 1 3.4 0v2.9M8 7.9a1.7 1.7 0 0 1 3.4 0v2.9" />
    </svg>
  );
}

/**
 * Example project [04]: an AI assistant, built like the best chat apps on the phone. The user's message sits in a
 * soft bubble; the answer is set as text in a clear type scale, with a heading, a cited source, a small table and a
 * checklist, then its actions and follow-up suggestions. The top bar's buttons are Liquid Glass.
 * The first time the conversation comes into view, Muse's reply streams in once, like a chat model writing it: a short
 * "Thinking…", then the answer word by word, its rows whole, and the actions and suggestions at the end. It holds
 * wherever it is while any part of the reply is inspected or out of view; with reduced motion and in still pictures
 * it's simply there. Each piece is hidden until the stream reaches it (`data-pending`), so at the end the layout is
 * the finished one. Pointing at (or tapping) the model name opens the model menu, which then holds still until the
 * inspection ends, so it can be inspected too; keyboard inspection shows it open (see the CSS).
 */
export function MuseApp() {
  const exploring = useInspectActivity();
  const [menuOpen, setMenuOpen] = useState(false);
  const motion = useDemoMotion<HTMLDivElement>();
  const clock = useStreamClock(motion.playing);
  const time = motion.final ? Infinity : clock;
  const pending = (beat: number) => time < beat || undefined;

  useEffect(() => {
    if (!exploring) setMenuOpen(false);
  }, [exploring]);

  return (
    <div className={styles.app}>
      <StatusBar className={styles.statusBar} />

      <header className={styles.navbar} data-inspect="liquid-glass-navbar">
        <span className={styles.glassButton} data-inspect="icon-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
            <path d="M4.5 9h15M4.5 15h9" />
          </svg>
        </span>

        <span
          className={styles.switcher}
          data-open={(exploring && menuOpen) || undefined}
          // A mouse opens it on arrival; a finger only with a tap, so a scroll that starts here doesn't
          onPointerEnter={(event) => event.pointerType !== 'touch' && setMenuOpen(true)}
          onClick={() => setMenuOpen(true)}
        >
          <span className={styles.model} data-inspect="menu-button">
            Muse 2.5
            <svg className={styles.chevron} viewBox="0 0 24 24" width="11" height="11">
              <path d="M6.5 9.5l5.5 5.5 5.5-5.5" />
            </svg>
          </span>
          <span className={styles.menu} data-inspect="dropdown-menu">
            {MODELS.map((model) => (
              <span key={model.name} className={styles.menuItem}>
                <span className={styles.menuText}>
                  <span className={styles.menuName}>{model.name}</span>
                  <span className={styles.menuDetail}>{model.detail}</span>
                </span>
                {model.selected && (
                  <svg className={styles.menuCheck} viewBox="0 0 24 24" width="14" height="14">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                )}
              </span>
            ))}
          </span>
        </span>

        <span className={styles.glassButton} data-inspect="icon-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
            <path d="M11 4.5H7.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3V13" />
            <path d="M17.6 4.1a1.9 1.9 0 0 1 2.7 2.7l-7.1 7.1-3.5.8.8-3.5z" />
          </svg>
        </span>
      </header>

      <div className={styles.thread}>
        <p className={styles.bubble} data-inspect="chat-bubble">
          Turn the kickoff notes into a one-page PRD
        </p>

        <div
          ref={motion.ref}
          className={styles.reply}
          data-motion={!motion.final || undefined}
          data-paused={!motion.playing || undefined}
        >
          <span className={styles.reasoning} data-inspect="reasoning-disclosure">
            <MuseMark />
            {time < STREAM.thought ? (
              <span key="thinking" className={styles.thinking}>
                Thinking…
              </span>
            ) : (
              <span key="thought" className={styles.label}>
                Thought for 9s
              </span>
            )}
            <svg className={styles.disclosure} viewBox="0 0 24 24" width="10" height="10">
              <path d="M9.5 6l6 6-6 6" />
            </svg>
          </span>

          <article className={styles.answer} data-inspect="formatted-answer" data-pending={pending(STREAM.title[0])}>
            <h3 className={styles.title}>
              <StreamedText runs={TITLE} beats={STREAM.title} time={time} />
            </h3>
            <p className={styles.paragraph} data-pending={pending(STREAM.problem[0])}>
              <StreamedText runs={PROBLEM} beats={STREAM.problem} time={time} />{' '}
              <a className={styles.citation} data-inspect="citation-chip" data-pending={pending(STREAM.citation)}>
                <svg viewBox="0 0 16 16" width="9" height="9">
                  <path d="M4 1.75h5.25L12.5 5v9.25h-8.5z" />
                  <path d="M9 2v3.25h3.25" />
                </svg>
                Kickoff notes<span className={styles.citationPage}>p.2</span>
              </a>
            </p>

            <div className={styles.tableWrap} data-inspect="answer-table" data-pending={pending(STREAM.table)}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Today</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  {GOALS.map((goal, i) => (
                    <tr key={goal.metric} data-pending={pending(STREAM.goals[i])}>
                      <td>{goal.metric}</td>
                      <td>{goal.today}</td>
                      <td>{goal.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className={styles.subhead} data-pending={pending(STREAM.subhead[0])}>
              <StreamedText runs={SUBHEAD} beats={STREAM.subhead} time={time} />
            </h4>
            <ul className={styles.checklist} data-inspect="checklist" data-pending={pending(STREAM.steps[0])}>
              {NEXT_STEPS.map((step, i) => (
                <li
                  key={step.text}
                  className={step.done ? styles.stepDone : styles.step}
                  data-pending={pending(STREAM.steps[i])}
                >
                  <span className={styles.checkbox}>
                    {step.done && (
                      <svg viewBox="0 0 24 24" width="9" height="9">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    )}
                  </span>
                  {step.text}
                </li>
              ))}
            </ul>
          </article>

          <div className={styles.actions} data-inspect="message-actions" data-pending={pending(STREAM.actions)}>
            <span className={styles.action}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14">
                <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
                <path d="M15.5 5.5V5a1.5 1.5 0 0 0-1.5-1.5H6A2.5 2.5 0 0 0 3.5 6v8A1.5 1.5 0 0 0 5 15.5h.5" />
              </svg>
            </span>
            <span className={styles.action}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14">
                <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
                <path d="M19.5 4.5v4h-4" />
              </svg>
            </span>
            <span className={styles.action}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14">
                <path d="M7.5 10.5v9h-3v-9zM7.5 10.5l3.6-6.3a1.9 1.9 0 0 1 2.9 1.6v3.7h4.6a2 2 0 0 1 2 2.4l-1.3 6.2a2 2 0 0 1-2 1.4H7.5" />
              </svg>
            </span>
            <span className={styles.action}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14">
                <path d="M16.5 13.5v-9h3v9zM16.5 13.5l-3.6 6.3a1.9 1.9 0 0 1-2.9-1.6v-3.7H5.4a2 2 0 0 1-2-2.4l1.3-6.2a2 2 0 0 1 2-1.4h9.8" />
              </svg>
            </span>
            <span className={styles.action}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14">
                <path d="M12 14.5V3.5M8 7.5l4-4 4 4" />
                <path d="M8.5 10.5H7A2.5 2.5 0 0 0 4.5 13v5A2.5 2.5 0 0 0 7 20.5h10a2.5 2.5 0 0 0 2.5-2.5v-5a2.5 2.5 0 0 0-2.5-2.5h-1.5" />
              </svg>
            </span>
            <span className={styles.versions}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="10" height="10">
                <path d="M14.5 6l-6 6 6 6" />
              </svg>
              2/2
              <svg className={styles.icon} viewBox="0 0 24 24" width="10" height="10">
                <path d="M9.5 6l6 6-6 6" />
              </svg>
            </span>
          </div>

          <div className={styles.followUps} data-inspect="suggestion-chips" data-pending={pending(STREAM.followUps[0])}>
            {FOLLOW_UPS.map((text, i) => (
              <span key={text} className={styles.followUp} data-pending={pending(STREAM.followUps[i])}>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.composer} data-inspect="composer">
        <span className={styles.composerIcon}>
          <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span className={styles.placeholder}>Ask a follow-up</span>
        <span className={styles.composerIcon}>
          <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16">
            <rect x="9" y="3" width="6" height="11.5" rx="3" />
            <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
          </svg>
        </span>
        <span className={styles.voice} data-inspect="voice-button">
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path d="M6 10.5v3M9 7.5v9M12 5v14M15 7.5v9M18 10.5v3" />
          </svg>
        </span>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
