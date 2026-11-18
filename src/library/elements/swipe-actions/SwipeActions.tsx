import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './SwipeActions.module.css';

type Message = { sender: string; time: string; subject: string; preview: string; unread?: boolean; selected?: boolean };

/** The inbox, newest first. The last one is open in the reading pane on wide tiles, so it's the selected row. */
const MESSAGES: Message[] = [
  {
    sender: 'Priya Raman',
    time: '9:12 AM',
    subject: 'Offsite agenda, final draft',
    preview: 'Attached is the last version. I moved the roadmap review to Thursday morning so everyone can make it.',
    unread: true,
  },
  {
    sender: 'Linden Savings',
    time: '8:47 AM',
    subject: 'Your November statement is ready',
    preview: 'The statement for your account ending in 4417 is now available to view and download in the app.',
  },
  {
    sender: 'Tom Becker',
    time: 'Yesterday',
    subject: 'Re: Q4 hiring plan',
    preview: "Sounds good to me. Let's keep both backend roles and move the designer search to January.",
    unread: true,
  },
  {
    sender: 'Lena Ortiz',
    time: 'Yesterday',
    subject: 'Photos from Saturday',
    preview: 'Here they are! The one at the pier is my favorite, but the sunset ones came out great too.',
    selected: true,
  },
];

/**
 * How a row stands: swiped open on either side, swiped all the way (`full`: the content leaves and the red action
 * stretches across), deleted (`removed`: the rows below close the gap), and put back while hidden (`reset`).
 */
type Swipe = 'trailing' | 'leading' | 'full' | 'removed' | 'reset';

/** The loop: which rows are swiped, and for how long. */
const STEPS: { swipes: Partial<Record<number, Swipe>>; ms: number }[] = [
  { swipes: {}, ms: 1600 },
  { swipes: { 0: 'trailing' }, ms: 2100 },
  { swipes: {}, ms: 900 },
  { swipes: { 1: 'leading' }, ms: 2100 },
  { swipes: {}, ms: 1000 },
  { swipes: { 2: 'full' }, ms: 650 },
  { swipes: { 2: 'removed' }, ms: 1500 },
  { swipes: { 2: 'reset' }, ms: 100 },
];

/** The final state: one row open on each side, so every part shows. */
const FINAL: Partial<Record<number, Swipe>> = { 0: 'trailing', 1: 'leading' };

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <circle className={styles.cutout} cx="7.8" cy="12" r="1.5" />
      <circle className={styles.cutout} cx="12" cy="12" r="1.5" />
      <circle className={styles.cutout} cx="16.2" cy="12" r="1.5" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.2 4.6c2.3-1.5 4.5-1.5 6.7 0 2.1 1.4 4.2 1.4 6.3 0v8.8c-2.1 1.4-4.2 1.4-6.3 0-2.2-1.5-4.4-1.5-6.7 0z" />
      <path className={styles.stroke} d="M6.2 3.6v17" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path className={styles.stroke} d="M4.5 6.4h15M9.6 6.2V5a1.4 1.4 0 0 1 1.4-1.4h2A1.4 1.4 0 0 1 14.4 5v1.2" />
      <path d="M6.3 8.6h11.4l-.8 10.6a2.2 2.2 0 0 1-2.2 2H9.3a2.2 2.2 0 0 1-2.2-2z" />
      <path className={styles.cutoutStroke} d="M10.2 11.4v6.4M13.8 11.4v6.4" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.8 8.2c0-1.2.9-2 2-2h11a5 5 0 0 0 5.4 4.6V18c0 1.2-.9 2-2 2H4.8c-1.1 0-2-.8-2-2z" />
      <path className={styles.cutoutStroke} d="M3.6 7.6l8.4 6.2 5.6-4.1" />
      <circle cx="19.6" cy="5.2" r="3.1" />
    </svg>
  );
}

/**
 * An inbox in the iOS Mail style; on wide tiles, the iPad's split view with the selected message beside the list.
 * The loop: the first row slides left to reveal its trailing actions (More, Flag, Trash), holds and closes; the
 * second slides right to reveal its leading action (Unread); then the third is swiped all the way, the red action
 * stretches across it, the rows below close the gap, and it comes back. The final state has the first row open on
 * the trailing side and the second on the leading side.
 */
export function SwipeActions() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setStep((current) => (current + 1) % STEPS.length), STEPS[step].ms);
    return () => window.clearTimeout(id);
  }, [step, playing]);

  const swipes = final ? FINAL : STEPS[step].swipes;
  const gone = MESSAGES.findIndex((_, index) => swipes[index] === 'removed' || swipes[index] === 'reset');

  return (
    <div ref={ref} className={styles.tile}>
      <ul className={styles.list}>
        {MESSAGES.map((message, index) => (
          <li
            key={message.sender}
            className={styles.row}
            data-swipe={swipes[index]}
            data-closing-gap={(gone >= 0 && index > gone) || undefined}
            data-selected={message.selected || undefined}
          >
            <span className={styles.leading}>
              <span className={styles.action} data-inspect="swipe-actions-leading">
                <EnvelopeIcon />
                {message.unread ? 'Read' : 'Unread'}
              </span>
            </span>
            <span className={styles.trailing} data-inspect="swipe-actions">
              <span className={styles.action} data-tone="more">
                <MoreIcon />
                More
              </span>
              <span className={styles.action} data-tone="flag">
                <FlagIcon />
                Flag
              </span>
              <span className={styles.action} data-tone="trash" data-inspect="swipe-actions-destructive">
                <TrashIcon />
                Trash
              </span>
            </span>
            {/* A full swipe: the destructive action stretches across the row, its symbol riding the row's edge */}
            <span className={styles.stretch}>
              <span className={styles.action} data-inspect="swipe-actions-destructive">
                <TrashIcon />
                Trash
              </span>
            </span>

            <span className={styles.content} data-inspect="swipe-actions-row">
              {message.unread && <span className={styles.dot} data-inspect="swipe-actions-unread-dot" />}
              <span className={styles.top}>
                <span className={styles.sender}>{message.sender}</span>
                <span className={styles.time}>
                  {message.time}
                  <svg viewBox="0 0 8 13" aria-hidden="true">
                    <path d="M1.5 1.5l5 5-5 5" />
                  </svg>
                </span>
              </span>
              <span className={styles.subject}>{message.subject}</span>
              <span className={styles.preview}>{message.preview}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* The reading pane of the iPad's split view, on wide tiles only */}
      <div className={styles.pane}>
        <div className={styles.paneHeader}>
          <span className={styles.avatar}>LO</span>
          <span className={styles.from}>
            <span className={styles.fromName}>Lena Ortiz</span>
            <span className={styles.to}>To: You</span>
          </span>
          <span className={styles.date}>Yesterday, 6:24 PM</span>
        </div>
        <span className={styles.paneSubject}>Photos from Saturday</span>
        <span className={styles.body}>
          Here they are! The one at the pier is my favorite, but the sunset ones came out great too. I&rsquo;ll bring
          prints on Thursday, so tell me which ones you&rsquo;d like framed.
        </span>
        <span className={styles.signoff}>Lena</span>
      </div>
    </div>
  );
}
