import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../demos/motion';
import leila from './photos/micro/leila.webp';
import styles from './SlideToConfirm.module.css';

/**
 * One moment of the loop: how far the thumb is along the track (0 to 1), whether the money is sent, whether a finger
 * is dragging the thumb there, and how long the moment lasts. `hidden` fades the slider's content out, so it can
 * start over unseen. Moments that `wait` hold while the tile is inspected or out of view; the short beats in between
 * always run to the end, so the slider is never left hidden.
 */
type Frame = { progress: number; sent: boolean; drag?: boolean; hidden?: boolean; ms: number; wait?: boolean };

/**
 * The thumb rests while the light sweeps across the label, then a finger drags it to the end: it eases in, keeps
 * pace and slows into the end. The track turns green with a check and Sent, holds, fades out, and the slider comes
 * back fresh.
 */
const SCRIPT: Frame[] = [
  { progress: 0, sent: false, ms: 2300, wait: true },
  { progress: 1, sent: false, drag: true, ms: 1000 },
  { progress: 1, sent: true, ms: 2600, wait: true },
  { progress: 1, sent: true, hidden: true, ms: 300 },
  { progress: 0, sent: false, hidden: true, ms: 300 },
];

/** The still picture: the thumb a third of the way, the fill behind it, the label still showing. */
const FINAL: Frame = { progress: 0.3, sent: false, ms: 0 };

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

/**
 * Slide to confirm: the last step of sending money, where a tap isn't enough. A round thumb with an arrow sits at
 * the start of a pill-shaped track, and a light sweeps across "Slide to send". In the loop the thumb is dragged to the
 * end with a fill growing behind it, the label fading where it passes; at the end the track turns green, the thumb
 * shows a check and the label reads Sent. Then it fades and starts over.
 */
export function SlideToConfirm() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);

  return (
    <div ref={ref} className={styles.tile} data-paused={playing ? undefined : ''}>
      <div className={styles.sheet}>
        <img className={styles.avatar} src={leila} alt="" />
        <span className={styles.title}>Send $240.00</span>
        <span className={styles.recipient}>to Leila Haddad</span>

        <div
          className={styles.track}
          data-inspect="slide-to-confirm"
          data-drag={frame.drag ? '' : undefined}
          data-idle={frame.progress === 0 ? '' : undefined}
          data-sent={frame.sent ? '' : undefined}
          data-hidden={frame.hidden ? '' : undefined}
          style={{ '--slide-to-confirm': frame.progress } as CSSProperties}
        >
          <span className={styles.layer}>
            <span className={styles.hint}>
              <span className={styles.label} data-inspect="slide-to-confirm-label">
                Slide to send
              </span>
            </span>
            <span className={styles.fill} data-inspect="slide-to-confirm-fill" />
            <span className={styles.sent}>Sent</span>
            <span className={styles.thumb} data-inspect="slide-to-confirm-thumb">
              <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13.5M12.5 6l6 6-6 6" />
              </svg>
              <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5.5 12.5 4.25 4.25L18.5 7.5" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
