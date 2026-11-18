import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import rosa from '../photos/rosa.webp';
import styles from './CharacterCounter.module.css';

/** The post's limit, and how close to it the counter starts counting down out loud. */
const LIMIT = 280;
const WARN = 20;

/** The whole post, 287 characters: the last 7 go past the limit. */
const TEXT =
  'Six months ago, our onboarding had seven steps and we lost 41% of new signups at step three. We cut it to three: sign in, pick a template, invite your first teammate. Activation went from 22% to 38% in two weeks, setup tickets dropped by half, and nobody has asked for the old flow back.';

/** Where the loop starts typing (26 left, after "nobody") and the still picture (12 left, after "for"). */
const START = 254;
const STILL = 268;

/** The ring's circle: 13px radius in a 30px box. */
const CIRCUMFERENCE = 2 * Math.PI * 13;

/**
 * One moment of the loop: how many characters are in, whether keys are going (the caret stays solid), and how long
 * the moment lasts.
 */
type Step = { count: number; typing: boolean; ms: number };

/**
 * A key's time: about 85ms, a little longer for the first letter of a word, with a small fixed wobble so it doesn't
 * tick like a metronome.
 */
const WOBBLE = [0, 12, -8, 20, -4, 6, -12, 16];
const keyTime = (index: number) => 85 + (TEXT[index - 1] === ' ' ? 40 : 0) + WOBBLE[index % WOBBLE.length];

/**
 * A pause, then the rest of the sentence is typed: the ring turns amber at 20 left and red past the limit, where the
 * overflow is highlighted and Post goes gray. A pause there, then Backspace is held (40ms a character after a
 * 400ms wait) back to where it began.
 */
const STEPS: Step[] = [
  { count: START, typing: false, ms: 1400 },
  ...Array.from({ length: TEXT.length - START }, (_, index) => {
    const count = START + index + 1;
    return { count, typing: true, ms: count === TEXT.length ? 1900 : keyTime(count) };
  }),
  ...Array.from({ length: TEXT.length - START }, (_, index) => {
    const count = TEXT.length - index - 1;
    return { count, typing: true, ms: index === 0 ? 400 : count === START ? 1000 : 40 };
  }),
];

/** Steps through the loop while `playing`; each step lasts its own time, and a held step starts over. */
function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? { count: STILL, typing: false, ms: 0 } : STEPS[index];
}

const ICONS = {
  image: 'M5.75 4.75h12.5a1 1 0 0 1 1 1v12.5a1 1 0 0 1-1 1H5.75a1 1 0 0 1-1-1V5.75a1 1 0 0 1 1-1zM4.75 15.5l4-4 3.5 3.5 2.25-2.25 4.75 4.75M15 9.25h.01',
  emoji:
    'M12 20.25a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5zM8.75 14a3.9 3.9 0 0 0 6.5 0M9.25 9.75h.01M14.75 9.75h.01',
  poll: 'M4.75 6.5h9M4.75 12h14.5M4.75 17.5h6.5',
  schedule:
    'M5.75 6.25h12.5a1 1 0 0 1 1 1v10.5a1 1 0 0 1-1 1H5.75a1 1 0 0 1-1-1V7.25a1 1 0 0 1 1-1zM4.75 10h14.5M8.5 4.25v3.5M15.5 4.25v3.5',
};

function Icon({ d, wide }: { d: string; wide?: boolean }) {
  return (
    <svg className={`${styles.tool} ${wide ? styles.wide : ''}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/**
 * Character counter: a post composer at its limit. A ring by the Post button fills as the post grows; within 20
 * characters of the limit it grows, turns amber and shows how many are left; past the limit it turns red with a
 * negative count, the characters over the limit are highlighted and Post is disabled. In the loop the last words are
 * typed past the limit, then deleted back.
 */
export function CharacterCounter() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const left = LIMIT - step.count;
  const state = left < 0 ? 'over' : left <= WARN ? 'warn' : 'ok';

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-state={state}
      data-typing={step.typing ? '' : undefined}
      data-paused={playing ? undefined : ''}
    >
      <div className={styles.composer} data-inspect="character-counter-composer">
        <div className={styles.body}>
          <img className={styles.avatar} src={rosa} alt="" />
          <div className={styles.column}>
            <div className={styles.field}>
              <p className={styles.text}>
                {TEXT.slice(0, Math.min(step.count, LIMIT))}
                <span
                  className={styles.overflow}
                  data-inspect="character-counter-overflow"
                  data-shown={left < 0 ? '' : undefined}
                >
                  {TEXT.slice(LIMIT, Math.max(step.count, LIMIT))}
                </span>
                <span className={styles.caret} />
              </p>
            </div>
            <span className={styles.audience}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20.25a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5zM3.75 12h16.5M12 3.75c2.1 2.2 3.25 5.1 3.25 8.25S14.1 18.05 12 20.25C9.9 18.05 8.75 15.15 8.75 12S9.9 5.95 12 3.75z" />
              </svg>
              Everyone can reply
            </span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <Icon d={ICONS.image} />
          <svg className={styles.tool} viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.75" y="5.75" width="16.5" height="12.5" rx="2" />
            <text x="12" y="14.6" textAnchor="middle">
              GIF
            </text>
          </svg>
          <Icon d={ICONS.poll} wide />
          <Icon d={ICONS.emoji} />
          <Icon d={ICONS.schedule} wide />

          <span className={styles.counter} data-inspect="character-counter">
            <svg className={styles.ring} viewBox="0 0 30 30" aria-hidden="true">
              <circle className={styles.track} cx="15" cy="15" r="13" />
              <circle
                className={styles.progress}
                cx="15"
                cy="15"
                r="13"
                style={
                  {
                    '--dash': CIRCUMFERENCE,
                    '--offset': CIRCUMFERENCE * (1 - Math.min(step.count, LIMIT) / LIMIT),
                  } as CSSProperties
                }
              />
            </svg>
            <span
              className={styles.left}
              data-inspect="character-counter-count"
              data-shown={state !== 'ok' ? '' : undefined}
            >
              {left < 0 ? `−${-left}` : left}
            </span>
          </span>
          <span className={styles.divider} />
          <span className={styles.post} data-inspect="character-counter-post" data-disabled={left < 0 ? '' : undefined}>
            Post
          </span>
        </div>
      </div>
    </div>
  );
}
