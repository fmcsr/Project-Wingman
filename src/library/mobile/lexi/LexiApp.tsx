import { StatusBar } from '../../../demos/StatusBar';
import styles from './LexiApp.module.css';
import speaker from './photos/speaker.webp';

/** The learner's answer, in the order the words were tapped. */
const ANSWER = ['Where', 'is', 'the', 'station'];

/**
 * The word bank as it was dealt, in two rows: the answer's words shuffled with a near miss for each (When, stop, a,
 * are). Used words leave a slot behind, so nothing else moves.
 */
const BANK: { word: string; used?: boolean }[][] = [
  [{ word: 'When' }, { word: 'is', used: true }, { word: 'stop' }, { word: 'Where', used: true }],
  [{ word: 'the', used: true }, { word: 'a' }, { word: 'station', used: true }, { word: 'are' }],
];

/**
 * Library example: a language lesson right after a correct answer, laid out like a Duolingo lesson. A close button, a
 * thick progress bar with a streak label and the lives counter; the sentence to translate in a speech bubble next to
 * the person saying it; the answer built from chunky word chips on ruled lines, with the word bank under them; and the
 * success banner with its full-width Continue button. Not interactive; for inspection only.
 */
export function LexiApp() {
  return (
    <div className={styles.app}>
      <StatusBar />

      <header className={styles.header}>
        <span className={styles.close} data-inspect="close-button">
          <svg className={styles.icon} viewBox="0 0 16 16" width="16" height="16">
            <path d="M1.6 1.6l12.8 12.8M14.4 1.6L1.6 14.4" />
          </svg>
        </span>
        {/* Exercise 7 of 12 done: the fill sits at 58%, with the streak label centered over it */}
        <span
          className={styles.progress}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={12}
          aria-valuenow={7}
          data-inspect="lesson-progress"
        >
          <span className={styles.fill}>
            <span className={styles.streak}>4 in a row</span>
          </span>
        </span>
        <span className={styles.hearts} data-inspect="hearts-counter">
          <svg viewBox="0 0 24 24" width="19" height="19">
            <path
              className={styles.heart}
              d="M12 21.1c-.4 0-.8-.1-1.1-.4C5.5 16.3 2.1 13.1 2.1 8.8c0-3.1 2.4-5.5 5.4-5.5 1.8 0 3.4.9 4.5 2.3 1.1-1.4 2.7-2.3 4.5-2.3 3 0 5.4 2.4 5.4 5.5 0 4.3-3.4 7.5-8.8 11.9-.3.3-.7.4-1.1.4z"
            />
            <ellipse className={styles.shine} cx="7.4" cy="8" rx="2.2" ry="1.6" transform="rotate(-35 7.4 8)" />
          </svg>
          5
        </span>
      </header>

      <h3 className={styles.instruction} data-inspect="instruction">
        Translate this sentence
      </h3>

      <div className={styles.prompt}>
        <span className={styles.avatar} data-inspect="character-avatar">
          <img src={speaker} alt="" draggable={false} />
        </span>
        <p className={styles.bubble} lang="es" data-inspect="speech-bubble">
          <span className={styles.audio} data-inspect="speaker-button">
            <svg viewBox="0 0 24 18" width="19" height="14">
              <path
                className={styles.audioBody}
                d="M1.5 6.4c0-.8.6-1.4 1.4-1.4h3.2l4.6-3.6c.7-.5 1.6 0 1.6.8v13.6c0 .8-.9 1.3-1.6.8L6.1 13H2.9c-.8 0-1.4-.6-1.4-1.4z"
              />
              <path className={styles.audioWaves} d="M15.6 6.1a4.1 4.1 0 0 1 0 5.8M18.7 3.2a8.2 8.2 0 0 1 0 11.6" />
            </svg>
          </span>
          {/* Every word has a hint; the new one is set in bold */}¿
          <span className={styles.word} data-inspect="word-hint">
            Dónde
          </span>{' '}
          <span className={styles.word} data-inspect="word-hint">
            está
          </span>{' '}
          <span className={styles.word} data-inspect="word-hint">
            la
          </span>{' '}
          <span className={`${styles.word} ${styles.newWord}`} data-inspect="word-hint">
            estación
          </span>
          ?
        </p>
      </div>

      <div className={styles.answer} data-inspect="answer-line">
        <div className={styles.answerRow}>
          {ANSWER.map((word) => (
            <span key={word} className={`${styles.chip} ${styles.correct}`} data-inspect="word-chip">
              {word}
            </span>
          ))}
        </div>
        <div className={styles.answerRow} />
      </div>

      <div className={styles.bank} data-inspect="word-bank">
        {BANK.map((row, i) => (
          <div key={i} className={styles.bankRow}>
            {row.map(({ word, used }) =>
              used ? (
                <span key={word} className={styles.slot} data-inspect="chip-slot">
                  {word}
                </span>
              ) : (
                <span key={word} className={styles.chip} data-inspect="word-chip">
                  {word}
                </span>
              ),
            )}
          </div>
        ))}
      </div>

      <section className={styles.feedback} data-inspect="feedback-banner">
        <div className={styles.feedbackHead}>
          <span className={styles.check}>
            <svg className={styles.icon} viewBox="0 0 24 24" width="11" height="11">
              <path d="M5 12.6l4.6 4.6L19 7.4" />
            </svg>
          </span>
          <span className={styles.feedbackTitle}>Nice!</span>
          <span className={styles.feedbackTools}>
            <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
              <path d="M5.5 21V4.2M5.5 4.2h11.6l-2.5 4.4 2.5 4.4H5.5" />
            </svg>
            <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
              <path d="M20 11.4c0 4-3.6 7.1-8 7.1-1 0-2-.2-2.9-.5L4.5 19.6l1.3-3.8C4.7 14.6 4 13.1 4 11.4c0-4 3.6-7.1 8-7.1s8 3.2 8 7.1z" />
            </svg>
          </span>
        </div>
        <span className={styles.continue} data-inspect="continue-button">
          Continue
        </span>
      </section>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
