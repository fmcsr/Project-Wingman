import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import elena from './photos/elena.webp';
import styles from './NudgeApp.module.css';

/** Where the notification is: not here yet (the watch face), the Short Look, the Long Look, or on its way out. */
type Look = 'face' | 'short' | 'long' | 'gone';

/**
 * One moment of the loop: the look on screen, whether the Digital Crown has scrolled the Long Look down to Dismiss,
 * whether the scroll indicator shows, and how long the moment lasts. Moments that `wait` hold while the watch is
 * inspected or out of view; the beats in between run to the end, so nothing stops halfway through a move.
 */
type Frame = { look: Look; scrolled?: boolean; crown?: boolean; ms: number; wait?: boolean };

/**
 * The face, then a message arrives with a tap on the wrist (the Short Look) and opens into the Long Look. The crown
 * scrolls down to Dismiss and back, its indicator fades, and the notification is dismissed: the face comes back.
 */
const SCRIPT: Frame[] = [
  { look: 'face', ms: 1600, wait: true },
  { look: 'short', ms: 2000, wait: true },
  { look: 'long', ms: 1900, wait: true },
  { look: 'long', scrolled: true, crown: true, ms: 1700, wait: true },
  { look: 'long', crown: true, ms: 900 },
  { look: 'long', ms: 1400, wait: true },
  { look: 'gone', ms: 600 },
];

/** The still picture: the Long Look from the top, with the scroll indicator out, so every part of it shows. */
const FINAL: Frame = { look: 'long', crown: true, ms: 0 };

/** Steps through the script; each frame lasts its own time, and a waiting frame held while not playing starts over. */
function useScript(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);
  const held = final || (SCRIPT[index].wait === true && !playing);

  useEffect(() => {
    if (held) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % SCRIPT.length), SCRIPT[index].ms);
    return () => window.clearTimeout(id);
  }, [index, held]);

  return final ? FINAL : SCRIPT[index];
}

/** Nudge's glyph: a speech bubble with two short arcs at its shoulder, the tap on the wrist that brings a message. */
function NudgeGlyph() {
  return (
    <svg className={styles.glyph} viewBox="0 0 24 24" width="60" height="60">
      <path
        className={styles.bubble}
        d="M10.5 7c4.1 0 7.5 2.6 7.5 6s-3.4 6-7.5 6c-.7 0-1.4-.1-2-.2l-3.2 1.9c-.5.3-1-.1-.8-.6l.8-2.3C3.8 16.7 3 15 3 13c0-3.4 3.4-6 7.5-6z"
      />
      <path className={styles.arcs} d="M16.6 3.9a4.6 4.6 0 0 1 3.5 3.5M17.4 1.2a7.4 7.4 0 0 1 5.4 5.4" />
    </svg>
  );
}

/**
 * Library example: a message notification on the wrist, as watchOS shows one. The watch face dims as it arrives with a
 * tap: the Short Look, Nudge's round icon big in the middle with the app's name and the sender under it. With the
 * wrist still raised it becomes the Long Look: the same icon shrinks into the header beside the app's name and the
 * time, and the message slides up on a platter (the sender's photo, name and text), followed by full-width action
 * buttons and Dismiss. The Digital Crown scrolls down to Dismiss and back, with its scroll indicator, then the
 * notification is dismissed and the loop starts over. It holds while inspected. Not interactive; for inspection only.
 */
export function NudgeApp() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);

  return (
    <div
      ref={ref}
      className={styles.app}
      data-look={frame.look}
      data-scrolled={frame.scrolled ? '' : undefined}
      data-crown={frame.crown ? '' : undefined}
    >
      <div className={styles.face}>
        <span className={styles.date}>Wed 18</span>
        <time className={styles.faceTime} dateTime="10:09">
          10:09
        </time>
      </div>

      <div className={styles.short} data-inspect="short-look">
        <span className={styles.shortApp}>Nudge</span>
        <span className={styles.shortTitle}>Elena Ruiz</span>
      </div>

      <span className={styles.icon} data-inspect="app-icon">
        <NudgeGlyph />
      </span>

      <div className={styles.long} data-inspect="long-look">
        <div className={styles.backdrop} />
        <header className={styles.header} data-inspect="header">
          <span className={styles.appName}>Nudge</span>
          <time className={styles.time} dateTime="10:09">
            10:09
          </time>
        </header>
        <div className={styles.scroller}>
          <div className={styles.platter} data-inspect="message">
            <img className={styles.avatar} src={elena} alt="" draggable={false} data-inspect="avatar" />
            <span className={styles.sender}>Elena Ruiz</span>
            <p className={styles.text}>Running late, save me a seat?</p>
          </div>
          <span className={styles.action} data-inspect="action-button">
            Reply
          </span>
          <span className={styles.action} data-inspect="action-button">
            Mark as Read
          </span>
          <span className={styles.action} data-inspect="dismiss">
            Dismiss
          </span>
        </div>
      </div>

      <span className={styles.scrollbar} data-inspect="scroll-indicator">
        <span className={styles.thumb} />
      </span>
    </div>
  );
}
