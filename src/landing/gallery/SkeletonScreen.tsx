import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../demos/motion';
import alley from './photos/micro/alley.webp';
import dumplings from './photos/micro/dumplings.webp';
import jonas from './photos/micro/jonas.webp';
import lakeLodge from './photos/micro/lake-lodge.webp';
import liv from './photos/micro/liv.webp';
import sofia from './photos/micro/sofia.webp';
import styles from './SkeletonScreen.module.css';

/**
 * A photo app's activity feed: who did what with which photo, and when. Each row has a placeholder of the same
 * shape; its two text bars are about as long as the text that replaces them (`bars`, in px, never wider than the
 * column), so the loaded text lands where its bars were.
 */
const ROWS = [
  {
    name: 'Sofia Reyes',
    time: '2m',
    action: 'liked your photo',
    avatar: sofia,
    photo: lakeLodge,
    bars: { name: 92, action: 112 },
  },
  {
    name: 'Jonas Berg',
    time: '14m',
    action: 'commented: Wow',
    avatar: jonas,
    photo: alley,
    bars: { name: 84, action: 124 },
  },
  {
    name: 'Liv Hansen',
    time: '1h',
    action: 'saved your photo',
    avatar: liv,
    photo: dumplings,
    bars: { name: 98, action: 106 },
  },
];

/** One moment of the loop: how many rows have loaded, top down, and how long the moment lasts. */
type Step = { loaded: number; ms: number };

/** All placeholders while the light sweeps over them, then the rows load one by one, hold, and it starts over. */
const STEPS: Step[] = [
  { loaded: 0, ms: 2000 },
  { loaded: 1, ms: 550 },
  { loaded: 2, ms: 700 },
  { loaded: 3, ms: 3200 },
];

/** The still picture: the first row in, the others still loading. */
const FINAL: Step = { loaded: 1, ms: 0 };

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

/**
 * Skeleton screen: an activity feed loading. Gray shapes stand in for each row (a circle for the avatar, two bars
 * for the text, a rounded square for the photo) while a band of light sweeps across them. The rows then load one
 * by one, each crossfading from its placeholder to the real content in exactly the same place, hold, and turn
 * back into placeholders.
 */
export function SkeletonScreen() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);

  return (
    <div ref={ref} className={styles.tile} data-paused={playing ? undefined : ''}>
      <ul className={styles.list} data-inspect="skeleton-screen">
        {ROWS.map((row, index) => (
          <li key={row.name} className={styles.row} data-loaded={index < step.loaded ? '' : undefined}>
            <span className={styles.placeholder}>
              <span className={`${styles.bone} ${styles.avatar}`} data-inspect="skeleton-screen-avatar" />
              <span className={styles.text}>
                <span className={styles.line}>
                  <span
                    className={`${styles.bone} ${styles.bar}`}
                    style={{ width: `min(${row.bars.name}px, 100%)` }}
                    data-inspect="skeleton-screen-line"
                  />
                </span>
                <span className={styles.line}>
                  <span
                    className={`${styles.bone} ${styles.bar}`}
                    style={{ width: `min(${row.bars.action}px, 100%)` }}
                    data-inspect="skeleton-screen-line"
                  />
                </span>
              </span>
              <span className={`${styles.bone} ${styles.photo}`} data-inspect="skeleton-screen-image" />
            </span>

            <span className={styles.content} data-inspect="skeleton-screen-item">
              <img className={styles.avatar} src={row.avatar} alt="" />
              <span className={styles.text}>
                <span className={styles.line}>
                  <span className={styles.name}>{row.name}</span>
                  <span className={styles.time}>{row.time}</span>
                </span>
                <span className={`${styles.line} ${styles.action}`}>{row.action}</span>
              </span>
              <img className={styles.photo} src={row.photo} alt="" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
