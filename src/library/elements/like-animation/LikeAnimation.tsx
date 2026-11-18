import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import liv from '../photos/liv.webp';
import styles from './LikeAnimation.module.css';

/**
 * One moment of the loop: whether the post is liked, whether the heart is being pressed (it squashes), whether the
 * burst plays, and how long the moment lasts.
 */
type Step = { liked: boolean; press?: boolean; burst?: boolean; ms: number };

/**
 * The heart rests, is pressed and squashes for a beat, then pops up filled while the ring and the dots burst out and
 * the count rolls up. It stays liked a while, is unliked (the heart empties, the count rolls back) and rests again.
 */
const STEPS: Step[] = [
  { liked: false, ms: 1600 },
  { liked: false, press: true, ms: 130 },
  { liked: true, burst: true, ms: 3200 },
  { liked: false, ms: 2200 },
];

/** The still picture: liked, the burst frozen where it reads best (the ring thinning out, the dots in flight). */
const FINAL: Step = { liked: true, ms: 0 };

/** Six dots around the heart, one straight up: none flies along the row, into the count beside it. */
const DOTS = [0, 60, 120, 180, 240, 300];

/** Steps through the loop while `playing`; each step lasts its own time, and a held step starts over. */
function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : STEPS[index];
}

const HEART =
  'M12 20.1c-.28 0-.56-.09-.8-.26C8.62 17.97 3.9 14.3 3.9 9.7 3.9 7.15 5.83 5.1 8.25 5.1c1.55 0 2.9.8 3.75 2.05.85-1.25 2.2-2.05 3.75-2.05 2.42 0 4.35 2.05 4.35 4.6 0 4.6-4.72 8.27-7.3 10.14-.24.17-.52.26-.8.26z';

/** A gray action in the row: its icon and, for most, its count. */
function Action({ d, count, className }: { d: string; count?: string; className?: string }) {
  return (
    <span className={`${styles.action} ${className ?? ''}`}>
      <span className={styles.icon}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={d} />
        </svg>
      </span>
      {count && <span className={styles.count}>{count}</span>}
    </span>
  );
}

const ICONS = {
  reply:
    'M12.1 4.75c4.1 0 7.15 2.8 7.15 6.6 0 3.85-3.2 6.65-7.4 6.65-.95 0-1.85-.14-2.7-.4L5 19.25l1.05-3.6a6.3 6.3 0 0 1-1.3-4.3c0-3.8 3.25-6.6 7.35-6.6z',
  repost:
    'M6.5 5.75v10c0 1.1.9 2 2 2h4.25M3.75 8.5 6.5 5.75 9.25 8.5M17.5 18.25v-10c0-1.1-.9-2-2-2h-4.25m9 7.25-2.75 2.75-2.75-2.75',
  bookmark: 'M6.75 5.5c0-.69.56-1.25 1.25-1.25h8c.69 0 1.25.56 1.25 1.25v14.25L12 16.1l-5.25 3.65z',
  share: 'M12 15.25V4.5M8 8.5l4-4 4 4M4.75 13.75v4.5c0 1.1.9 2 2 2h10.5c1.1 0 2-.9 2-2v-4.5',
};

/**
 * Like animation: a post on its own page with the action row under it (reply, repost, like, bookmark, share), each
 * with its count. In the loop the heart is pressed and squashes, then pops up filled in red while a ring bursts out
 * around it and six dots fly off, and the count rolls from 1,284 to 1,285. A few seconds later it's unliked: the
 * heart empties and the count rolls back.
 */
export function LikeAnimation() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-paused={playing ? undefined : ''}
      data-final={final ? '' : undefined}
    >
      <div className={styles.header}>
        <img className={styles.avatar} src={liv} alt="" />
        <span className={styles.names}>
          <span className={styles.name}>Liv Hansen</span>
          <span className={styles.handle}>@livhansen</span>
        </span>
        <svg className={styles.more} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="5.5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="18.5" cy="12" r="1.6" />
        </svg>
      </div>

      <p className={styles.text}>New onboarding is live: three steps instead of seven.</p>
      <span className={styles.meta}>
        9:41 AM · Nov 18, 2026<span className={styles.views}> · <b>48K</b> Views</span>
      </span>

      <div className={styles.row} data-inspect="like-animation-row">
        <Action d={ICONS.reply} count="42" />
        <Action d={ICONS.repost} count="156" />

        <span
          className={styles.like}
          data-inspect="like-animation"
          data-liked={step.liked ? '' : undefined}
          data-press={step.press ? '' : undefined}
          data-burst={step.burst ? '' : undefined}
        >
          <span className={styles.icon}>
            <span className={styles.burst} data-inspect="like-animation-burst">
              <span className={styles.ring} />
              {DOTS.map((angle) => (
                <span key={angle} className={styles.dot} style={{ '--angle': `${angle}deg` } as CSSProperties} />
              ))}
            </span>
            <svg className={styles.outline} viewBox="0 0 24 24" aria-hidden="true">
              <path d={HEART} />
            </svg>
            <svg className={styles.filled} viewBox="0 0 24 24" aria-hidden="true" data-inspect="like-animation-filled">
              <path d={HEART} />
            </svg>
          </span>
          <span className={styles.likes} data-inspect="like-animation-count">
            1,28
            <span className={styles.digit}>
              <span className={styles.strip}>
                <span className={styles.before}>4</span>
                <span className={styles.after}>5</span>
              </span>
            </span>
          </span>
        </span>

        <Action d={ICONS.bookmark} count="213" className={styles.bookmark} />
        <Action d={ICONS.share} />
      </div>
    </div>
  );
}
