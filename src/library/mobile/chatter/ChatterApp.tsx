import { StatusBar } from '../../../demos/StatusBar';
import { useInspectActivity } from '../../../inspector/InspectActivity';
import styles from './ChatterApp.module.css';

/** Bar heights of the voice message in px: loud and quiet stretches, like a real recording. */
const WAVEFORM = [5, 9, 14, 10, 17, 21, 13, 8, 12, 18, 22, 15, 9, 6, 10, 15, 19, 12, 8, 13, 17, 11, 7, 9, 6, 4];
/** Bars already played. They take the accent color, so the waveform doubles as a progress bar. */
const PLAYED = 10;

/** Time in the bubble's corner, plus the read receipt on your own messages. */
function Meta({ time, dateTime, read }: { time: string; dateTime: string; read?: boolean }) {
  return (
    <span className={styles.meta}>
      <time dateTime={dateTime} data-inspect="timestamp">
        {time}
      </time>
      {read && (
        <svg className={styles.receipt} viewBox="0 0 16 11" width="16" height="11" data-inspect="read-receipt">
          <path d="M1.2 5.9l2.8 2.8 5.7-6.4" />
          <path d="M6.9 8.1l.6.6 5.7-6.4" />
        </svg>
      )}
    </span>
  );
}

/**
 * Library example: a one-to-one chat in the style of the big messaging apps. Bubbles with tails, timestamps and
 * read receipts, a quoted reply, a reaction, a voice message and the composer. The typing dots animate while
 * idle and hold still while the example is inspected.
 */
export function ChatterApp() {
  const exploring = useInspectActivity();

  return (
    <div className={styles.app}>
      <div className={styles.top}>
        <StatusBar />
        <header className={styles.header} data-inspect="chat-header">
          <span className={styles.back} data-inspect="back-button">
            <svg className={`${styles.icon} ${styles.chevron}`} viewBox="0 0 24 24" width="22" height="22">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            <span className={styles.unread}>3</span>
          </span>
          <span className={styles.avatar} data-inspect="avatar">
            PR
            <span className={styles.presence} data-inspect="presence-dot" />
          </span>
          <div className={styles.contact}>
            <h3 className={styles.name}>Priya Raman</h3>
            <p className={styles.status}>online</p>
          </div>
          <span className={styles.callButton} data-inspect="call-buttons">
            <svg className={styles.icon} viewBox="0 0 24 24" width="22" height="22">
              <rect x="2.5" y="6.5" width="13" height="11" rx="2.5" />
              <path d="M15.5 10.5l5-3v9l-5-3z" />
            </svg>
          </span>
          <span className={styles.callButton} data-inspect="call-buttons">
            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
              <path d="M5.2 3.5h3.3l1.6 4.2-2.2 1.4a11.5 11.5 0 0 0 7 7l1.4-2.2 4.2 1.6v3.3a1.7 1.7 0 0 1-1.8 1.7A16.8 16.8 0 0 1 3.5 5.3a1.7 1.7 0 0 1 1.7-1.8z" />
            </svg>
          </span>
        </header>
      </div>

      <ol className={styles.thread}>
        {/* Yesterday's last message, mostly scrolled up under the frosted header */}
        <li className={`${styles.sent} ${styles.first}`} data-inspect="message-bubble">
          Checked the forecast: 74° and sunny all Saturday ☀️
          <Meta time="10:48 PM" dateTime="22:48" read />
        </li>

        <li className={styles.day}>
          <span className={styles.dayPill} data-inspect="date-divider">
            Today
          </span>
        </li>

        <li className={`${styles.received} ${styles.first}`} data-inspect="message-bubble">
          Morning! Still on for Cedar Ridge on Saturday? 🥾
          <Meta time="9:02 AM" dateTime="09:02" />
        </li>
        <li className={styles.received} data-inspect="message-bubble">
          I'll bring water and the first-aid kit if you grab snacks
          <Meta time="9:03 AM" dateTime="09:03" />
        </li>

        <li className={`${styles.sent} ${styles.first} ${styles.reacted}`} data-inspect="message-bubble">
          Yes! Let's leave at 7:30 so we beat the heat
          <Meta time="9:15 AM" dateTime="09:15" read />
          <span className={styles.reaction} data-inspect="reaction-chip">
            👍
          </span>
        </li>

        <li className={`${styles.received} ${styles.first} ${styles.voice}`} data-inspect="voice-message">
          <span className={styles.play}>
            <svg className={styles.playIcon} viewBox="0 0 24 24" width="14" height="14">
              <path d="M7 4.5v15l12.5-7.5z" />
            </svg>
          </span>
          <span className={styles.track}>
            <span className={styles.wave}>
              {WAVEFORM.slice(0, PLAYED).map((height, index) => (
                <span key={index} className={styles.barPlayed} style={{ height }} />
              ))}
              <span className={styles.playhead} />
              {WAVEFORM.slice(PLAYED).map((height, index) => (
                <span key={index} className={styles.bar} style={{ height }} />
              ))}
            </span>
            <span className={styles.voiceMeta}>
              <span>0:14</span>
              <time dateTime="09:26" data-inspect="timestamp">
                9:26 AM
              </time>
            </span>
          </span>
        </li>

        <li className={`${styles.sent} ${styles.first} ${styles.reply}`} data-inspect="message-bubble">
          <span className={styles.quote} data-inspect="reply-quote">
            <span className={styles.quoteName}>Priya Raman</span>
            <span className={styles.quoteText}>I'll bring water and the first-aid kit if you grab snacks</span>
          </span>
          <span className={styles.replyText}>
            Deal. Trail mix and lemon bars it is 🍋
            <Meta time="9:38 AM" dateTime="09:38" read />
          </span>
        </li>

        <li
          className={`${styles.received} ${styles.first} ${styles.typing}`}
          data-inspect="typing-indicator"
          data-paused={exploring || undefined}
        >
          <span />
          <span />
          <span />
        </li>
      </ol>

      <div className={styles.composer} data-inspect="composer">
        <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className={styles.field}>
          <span className={styles.placeholder}>Message</span>
          <svg className={`${styles.icon} ${styles.sticker}`} viewBox="0 0 24 24" width="18" height="18">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M8.5 14a4 4 0 0 0 7 0M9.5 9.5h.01M14.5 9.5h.01" />
          </svg>
        </span>
        <svg className={styles.icon} viewBox="0 0 24 24" width="22" height="22">
          <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2L9 4.5h6L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" />
          <circle cx="12" cy="12.5" r="3.5" />
        </svg>
        <svg className={styles.icon} viewBox="0 0 24 24" width="22" height="22">
          <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
