import { useEffect, useLayoutEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './ReadingProgress.module.css';
import alley from '../photos/alley.webp';
import liv from '../photos/liv.webp';

/** The article takes ten minutes to read; the header counts down what's left. */
const MINUTES = 10;

/** The back-to-top button shows once a quarter of the article has been read. */
const SHOW_BUTTON = 0.25;

/**
 * One beat of the loop: how much of the article has been read (0 to 1), the block the reader has scrolled to (an
 * index into the article's `data-anchor` blocks; none at the top), whether the pointer is on the back-to-top button and
 * pressing it, and how long the beat lasts. `up` marks the smooth scroll back to the top.
 */
type Step = { read: number; anchor?: number; onButton?: boolean; press?: boolean; up?: boolean; ms: number };

/**
 * The reader scrolls down a block at a time, resting in between: the bar fills, the time left counts down from 10
 * minutes and, past a quarter, the back-to-top button comes in with its ring. Three quarters in, the pointer goes to
 * the button and clicks: the article glides back to the top, the bar and the ring empty and the button goes.
 */
const STEPS: Step[] = [
  { read: 0, ms: 1400 },
  { read: 0.12, anchor: 0, ms: 1300 },
  { read: 0.3, anchor: 1, ms: 1300 },
  { read: 0.45, anchor: 2, ms: 1300 },
  { read: 0.6, anchor: 3, ms: 1600 },
  { read: 0.75, anchor: 4, ms: 900 },
  { read: 0.75, anchor: 4, onButton: true, ms: 700 },
  { read: 0.75, anchor: 4, onButton: true, press: true, ms: 120 },
  { read: 0, onButton: true, up: true, ms: 1100 },
  { read: 0, ms: 700 },
];

/** Reduced motion: 60% read, a section heading at the top of the page, 4 minutes left, the button showing. */
const FINAL = STEPS[4];

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return final ? FINAL : STEPS[index];
}

/** How far the article scrolls for each anchor block (it lands 14px under the header), measured as the tile resizes. */
function useScrollStops(page: HTMLElement | null, article: HTMLElement | null) {
  const [stops, setStops] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (!page || !article) return;
    const observer = new ResizeObserver(() => {
      const end = Math.max(0, article.offsetHeight - page.clientHeight);
      const blocks = [...article.querySelectorAll<HTMLElement>('[data-anchor]')];
      setStops(blocks.map((block) => Math.min(Math.max(0, block.offsetTop - 14), end)));
    });
    observer.observe(page);
    observer.observe(article);
    return () => observer.disconnect();
  }, [page, article]);

  return stops;
}

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2',
  up: 'M12 19V5M5.5 11.5L12 5l6.5 6.5',
  bookmark: 'M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z',
};

function Icon({ d }: { d: string }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/**
 * Reading progress: a long travel essay on a publishing site. A thin bar along the top fills as the article scrolls,
 * the sticky header says how many minutes are left, and past a quarter a back-to-top button floats in, a ring around
 * it filling with the same progress. The loop scrolls down in steps, then the pointer clicks the button and the
 * article glides back to the top.
 */
export function ReadingProgress() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const [page, setPage] = useState<HTMLDivElement | null>(null);
  const [article, setArticle] = useState<HTMLElement | null>(null);
  const stops = useScrollStops(page, article);
  const scrolled = step.anchor === undefined ? 0 : (stops[step.anchor] ?? 0);
  const left = Math.ceil(MINUTES * (1 - step.read) - 0.001);

  return (
    <div
      ref={ref}
      className={styles.tile}
      style={{ '--read': step.read } as CSSProperties}
      data-button={step.read >= SHOW_BUTTON || undefined}
      data-on-button={step.onButton || undefined}
      data-press={step.press || undefined}
      data-up={step.up || undefined}
    >
      <div ref={setPage} className={styles.page}>
        <article ref={setArticle} className={styles.article} style={{ transform: `translateY(${-scrolled}px)` }}>
          <h2 className={styles.title}>Getting lost on purpose</h2>
          <p className={styles.subtitle}>A week in Rome with no map, no plans and a borrowed scooter</p>
          <div className={styles.byline}>
            <img className={styles.face} src={liv} alt="" width={28} height={28} />
            <span className={styles.who}>
              <span className={styles.author}>Liv Hansen</span>
              <span className={styles.meta}>10 min read · Nov 18, 2026</span>
            </span>
          </div>
          <figure className={styles.figure} data-anchor="">
            <img className={styles.photo} src={alley} alt="" />
            <figcaption>Most streets in the old town are narrower than a parked van.</figcaption>
          </figure>
          <p>
            On my first morning I left the map in the apartment. The plan was simple: walk until something looked
            interesting, then walk a little further.
          </p>
          <p data-anchor="">
            Rome rewards this. Every street bends before you can see where it goes, and every bend hides a fountain, a
            church or the best coffee you’ve had all year.
          </p>
          <p data-anchor="">
            By noon I had crossed the river twice without meaning to, and eaten lunch standing up at a counter with
            people who clearly did this every day.
          </p>
          <h3 className={styles.heading} data-anchor="">
            The borrowed scooter
          </h3>
          <p>
            By day three my landlord had seen enough of my sore feet. He handed me the keys to his green scooter and one
            piece of advice: never trust a one-way sign.
          </p>
          <p data-anchor="">
            I learned to read the city by its sounds instead: tires on cobblestones, a radio in a kitchen window,
            church bells counting out the hour.
          </p>
          <p>
            Some afternoons I covered a dozen neighborhoods. Others I parked by the river at noon and didn’t move again
            until the light went gold.
          </p>
          <h3 className={styles.heading}>What I brought home</h3>
          <p>
            Not photos, mostly. A feel for how far ten minutes takes you on foot, and the habit of taking the street I
            don’t know.
          </p>
          <div className={styles.tags}>
            <span>Travel</span>
            <span>Italy</span>
            <span>Slow travel</span>
          </div>
        </article>
      </div>

      <header className={styles.header}>
        <span className={styles.logo}>Margin</span>
        <span className={styles.left} data-inspect="reading-progress-time">
          <Icon d={ICONS.clock} />
          {left} min left
        </span>
        <Icon d={ICONS.bookmark} />
      </header>

      <div className={styles.track} data-inspect="reading-progress">
        <span className={styles.bar} />
      </div>

      <span className={styles.toTop} data-inspect="reading-progress-top">
        <svg className={styles.ring} viewBox="0 0 48 48" data-inspect="reading-progress-ring">
          <circle className={styles.ringTrack} cx="24" cy="24" r="22" />
          <circle className={styles.ringFill} cx="24" cy="24" r="22" pathLength="100" />
          <circle className={styles.ringTarget} cx="24" cy="24" r="22" />
        </svg>
        <Icon d={ICONS.up} />
      </span>

      <span className={styles.pointer}>
        <svg className={styles.arrow} viewBox="0 0 14 20">
          <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
        </svg>
        <svg className={styles.hand} viewBox="0 0 24 24">
          <path d="M8.5 3.5a1.5 1.5 0 0 1 3 0V10a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0v.8a1.25 1.25 0 0 1 2.5 0V16a6 6 0 0 1-6 6h-1.6a5 5 0 0 1-4.1-2.1l-3.7-4.5a1.6 1.6 0 0 1 2.4-2.1l1.5 1.3z" />
          <path d="M11.5 10v3.2M14.5 10.5v2.7M17.5 11.3v2.2" />
        </svg>
      </span>
    </div>
  );
}
