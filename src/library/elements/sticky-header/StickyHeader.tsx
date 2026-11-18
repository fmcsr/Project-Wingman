import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './StickyHeader.module.css';
import auraMax from './photos/aura-max.webp';

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  bag: 'M6.5 8h11l1 12.5h-13zM9 8V6.5a3 3 0 0 1 6 0V8',
};

function Icon({ d }: { d: string }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/** The colors the headphones come in, Midnight first (the one in the photo). */
const COLORS = [
  { name: 'Midnight', color: '#25272d' },
  { name: 'Sky', color: '#a7c2da' },
  { name: 'Starlight', color: '#e8e0d2' },
  { name: 'Rose', color: '#e3bcbf' },
];

/**
 * How far the page is scrolled: at the top (the tall header), a little way down with the photo under the bar, or
 * further down. Past the threshold (the 68px the header gives up) the header is compact.
 */
type Scroll = 'top' | 'photo' | 'details';

/** One beat of the loop: how far the page is scrolled and how long the beat lasts. */
type Step = { scroll: Scroll; ms: number };

/**
 * At the top of the page the header is tall, with the product's name in big type. The page scrolls down and, as it
 * passes the threshold, the header shrinks into a compact frosted bar and the Buy button comes in; it scrolls on
 * under the bar, then all the way back up, and the header grows tall again.
 */
const STEPS: Step[] = [
  { scroll: 'top', ms: 1700 },
  { scroll: 'photo', ms: 2400 },
  { scroll: 'details', ms: 2200 },
  { scroll: 'top', ms: 1300 },
];

/** Reduced motion: scrolled down a little, the compact bar over the photo. */
const FINAL = STEPS.findIndex((step) => step.scroll === 'photo');

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

/**
 * Measures where the page stops, into CSS variables on it, whenever the tile changes size: --photo puts the top of
 * the photo's stage just under the bar's edge, so the bar frosts over the headphones, and --details goes 200px
 * further without passing the page's end. The scroll only starts gliding once they're in.
 */
function useStops(page: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const node = page.current;
    const stage = node?.querySelector<HTMLElement>('[data-stage]');
    const tile = node?.parentElement;
    if (!node || !stage || !tile) return;
    const measure = () => {
      const end = Math.max(0, node.offsetHeight - tile.clientHeight);
      const photo = Math.min(stage.offsetTop - 6, end);
      node.style.setProperty('--photo', `${photo}px`);
      node.style.setProperty('--details', `${Math.min(photo + 200, end)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    observer.observe(tile);
    const frame = requestAnimationFrame(() => node.setAttribute('data-ready', ''));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [page]);
}

/**
 * Sticky header: the top of a product page for headphones. At the top the header is tall, with the product's name in
 * big type under the site's own row of links. Scrolled past a threshold, it shrinks into a compact bar that stays
 * stuck to the top: the name slides up into it at half the size, the bar turns translucent and frosted with a hairline
 * under it, and a Buy button appears. The loop scrolls the page down under the bar, further, and back up, where the
 * header grows tall again.
 */
export function StickyHeader() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const page = useRef<HTMLDivElement>(null);
  useStops(page);
  const compact = step.scroll !== 'top';

  return (
    <div ref={ref} className={styles.tile} data-scroll={step.scroll} data-compact={compact || undefined}>
      <div ref={page} className={styles.page}>
        <p className={styles.tagline}>The quiet you were looking for.</p>
        <div className={styles.stage} data-stage>
          <img className={styles.photo} src={auraMax} alt="" width={440} height={440} />
        </div>
        <p className={styles.price}>From $399 or $33.25/mo. for 12 mo.</p>
        <span className={styles.swatches}>
          {COLORS.map((color) => (
            <span key={color.name} className={styles.swatch} style={{ background: color.color }} />
          ))}
        </span>
        <section className={styles.feature}>
          <h3 className={styles.featureTitle}>Active Noise Cancelling</h3>
          <p className={styles.featureText}>
            Six microphones listen to the world around you and cancel it out, from the morning train to the flight
            home.
          </p>
        </section>
        <section className={styles.feature}>
          <h3 className={styles.featureTitle}>Spatial Audio</h3>
          <p className={styles.featureText}>
            Films and music fill the room around your head, and stay put when you turn to look.
          </p>
        </section>
        <div className={styles.stats}>
          <span className={styles.stat}>
            <strong>20 hrs</strong>
            of listening on a charge
          </span>
          <span className={styles.stat}>
            <strong>40 mm</strong>
            drivers in each ear cup
          </span>
        </div>
      </div>

      {/* The 68px the header gives up: scrolled past them, it turns compact. Invisible, as in the page's code */}
      <span className={styles.threshold} data-inspect="sticky-header-threshold" />

      <header className={styles.header} data-inspect="sticky-header">
        <span className={styles.backdrop} data-inspect="sticky-header-blur" />
        <div className={styles.bar}>
          <svg className={styles.mark} viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 2.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
          </svg>
          <h2 className={styles.title} data-inspect={compact ? 'sticky-header-compact' : undefined}>
            Aura Max
          </h2>
          <nav className={styles.links}>
            <a>Overview</a>
            <a>Specs</a>
            <a>Compare</a>
          </nav>
          <span className={styles.end}>
            <span className={styles.tools}>
              <Icon d={ICONS.search} />
              <Icon d={ICONS.bag} />
            </span>
            <a className={styles.buy} data-inspect="sticky-header-button">
              Buy
            </a>
          </span>
        </div>
      </header>
    </div>
  );
}
