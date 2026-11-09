import { useEffect, useState } from 'react';
import { useInspectActivity } from '../inspector/InspectActivity';
import { StatusBar } from './StatusBar';
import styles from './MuseApp.module.css';

/** The model switcher's menu; the model in use is checked. */
const MODELS = [
  { name: 'Muse 2.5', detail: 'Fast, for everyday work', selected: true },
  { name: 'Muse 2.5 Pro', detail: 'Thinks longer on hard problems' },
  { name: 'Muse Mini', detail: 'Quickest answers, lightest tasks' },
];

/** The answer's goals table: where each number is today and where the PRD wants it. */
const GOALS = [
  { metric: 'Refund tickets', today: '38%', target: '15%' },
  { metric: 'Time to refund', today: '2.6 days', target: '1 hour' },
  { metric: 'Refund CSAT', today: '3.4', target: '4.5' },
];

/** The answer's next steps: one is already done. */
const NEXT_STEPS = [
  { text: 'Legal sign-off on auto-approval', done: true },
  { text: 'Confirm the $150 cap with Finance' },
  { text: 'Fraud rule for repeat refunders' },
];

const FOLLOW_UPS = ['Write user stories', 'Draft the tickets', 'List the risks'];

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
 * Nothing moves on its own. Pointing at (or tapping) the model name opens the model menu, which then holds still until
 * the inspection ends, so it can be inspected too; keyboard inspection shows it open (see the CSS).
 */
export function MuseApp() {
  const exploring = useInspectActivity();
  const [menuOpen, setMenuOpen] = useState(false);

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

        <span className={styles.reasoning} data-inspect="reasoning-disclosure">
          <MuseMark />
          Thought for 9s
          <svg className={styles.disclosure} viewBox="0 0 24 24" width="10" height="10">
            <path d="M9.5 6l6 6-6 6" />
          </svg>
        </span>

        <article className={styles.answer} data-inspect="formatted-answer">
          <h3 className={styles.title}>Self-serve refunds</h3>
          <p className={styles.paragraph}>
            <strong>Problem.</strong> Refunds are <mark className={styles.highlight}>38% of tickets</mark> and take
            2.6 days to close.{' '}
            <a className={styles.citation} data-inspect="citation-chip">
              <svg viewBox="0 0 16 16" width="9" height="9">
                <path d="M4 1.75h5.25L12.5 5v9.25h-8.5z" />
                <path d="M9 2v3.25h3.25" />
              </svg>
              Kickoff notes<span className={styles.citationPage}>p.2</span>
            </a>
          </p>

          <div className={styles.tableWrap} data-inspect="answer-table">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Today</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                {GOALS.map((goal) => (
                  <tr key={goal.metric}>
                    <td>{goal.metric}</td>
                    <td>{goal.today}</td>
                    <td>{goal.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className={styles.subhead}>Next steps</h4>
          <ul className={styles.checklist} data-inspect="checklist">
            {NEXT_STEPS.map((step) => (
              <li key={step.text} className={step.done ? styles.stepDone : styles.step}>
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

        <div className={styles.actions} data-inspect="message-actions">
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

        <div className={styles.followUps} data-inspect="suggestion-chips">
          {FOLLOW_UPS.map((text) => (
            <span key={text} className={styles.followUp}>
              {text}
            </span>
          ))}
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
