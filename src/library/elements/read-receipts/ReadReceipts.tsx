import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './ReadReceipts.module.css';

/** Where the last sent message is: on its way, on the server, on their phone, or opened. */
type Receipt = 'sending' | 'sent' | 'delivered' | 'read';

/**
 * One moment of the loop. `sent` puts the new message in the thread (which scrolls up to show it) with its
 * `receipt`; `other` is what the other person is doing: nothing yet, typing, or their reply has arrived. `dip` fades
 * the thread out to start over.
 */
type Frame = { sent: boolean; receipt: Receipt; other: 'idle' | 'typing' | 'replied'; dip?: boolean; ms: number };

/**
 * The message goes out: Sending… with a clock, then one tick for Sent, two for Delivered, and the ticks turn blue
 * with Read 9:41 when it's opened. Then the typing indicator comes up, their reply takes its place, and the thread
 * fades out and starts over.
 */
const SCRIPT: Frame[] = [
  { sent: false, receipt: 'sending', other: 'idle', ms: 1000 },
  { sent: true, receipt: 'sending', other: 'idle', ms: 700 },
  { sent: true, receipt: 'sent', other: 'idle', ms: 900 },
  { sent: true, receipt: 'delivered', other: 'idle', ms: 1400 },
  { sent: true, receipt: 'read', other: 'idle', ms: 1100 },
  { sent: true, receipt: 'read', other: 'typing', ms: 2300 },
  { sent: true, receipt: 'read', other: 'replied', ms: 2400 },
  { sent: true, receipt: 'read', other: 'replied', dip: true, ms: 300 },
  { sent: false, receipt: 'sending', other: 'idle', dip: true, ms: 100 },
];

/** The still picture: the message read, and the other person typing their answer. */
const FINAL: Frame = { sent: true, receipt: 'read', other: 'typing', ms: 0 };

/** Steps through the script while `playing`; each frame lasts its own time, and a held frame starts over. */
function useScript(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % SCRIPT.length), SCRIPT[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : SCRIPT[index];
}

/**
 * Read receipts: a text conversation in the iMessage style, with the status of the last message you sent under it.
 * In the loop the message goes out and its status advances step by step: Sending… with a clock, Sent with one tick,
 * Delivered with two, and Read 9:41 with the ticks turned blue. Then the other person's typing indicator comes up
 * and their reply arrives in its place. The still picture is the read message with the typing indicator.
 */
export function ReadReceipts() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-sent={frame.sent || undefined}
      data-receipt={frame.receipt}
      data-other={frame.other}
      data-dip={frame.dip || undefined}
      data-paused={playing ? undefined : ''}
      data-still={final || undefined}
    >
      <div className={styles.viewport}>
        <div className={styles.thread}>
          <span className={styles.them}>Booked Nara for 7:30</span>
          <span className={styles.me}>Perfect, thank you!</span>
          <span className={styles.them}>Are you still coming?</span>
          <span className={styles.me} data-inspect="read-receipts-bubble">
            Yes! Leaving now
          </span>

          <span className={styles.receipt} data-inspect="read-receipts">
            <span className={styles.words}>
              <span className={styles.word} data-for="sending">
                Sending…
              </span>
              <span className={styles.word} data-for="sent">
                Sent
              </span>
              <span className={styles.word} data-for="delivered">
                Delivered
              </span>
              <span className={styles.word} data-for="read">
                <span className={styles.read} data-inspect="read-receipts-state">
                  Read
                </span>{' '}
                <span className={styles.time} data-inspect="read-receipts-time">
                  9:41
                </span>
              </span>
            </span>
            <span className={styles.ticks} data-inspect="read-receipts-ticks">
              <svg viewBox="0 0 17 11" aria-hidden="true">
                <g className={styles.clock}>
                  <circle cx="11.5" cy="5.5" r="4.5" />
                  <path d="M11.5 3.25V5.5l1.6 1.1" />
                </g>
                <path className={styles.first} d="M1 6.25 3.9 9.1 9.9 1.9" />
                <path className={styles.second} d="M7.4 8.6l.5.5 6-7.2" />
              </svg>
            </span>
          </span>

          {/* Their side: the typing indicator, then their reply in the same place */}
          <span className={styles.slot}>
            <span className={styles.typing} data-inspect="read-receipts-typing">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </span>
            <span className={`${styles.them} ${styles.reply}`}>Great, see you soon</span>
          </span>
        </div>
      </div>

      <div className={styles.composer}>
        <span className={styles.plus}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 6v12M6 12h12" />
          </svg>
        </span>
        <span className={styles.field}>
          Message
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
          </svg>
        </span>
      </div>
    </div>
  );
}
