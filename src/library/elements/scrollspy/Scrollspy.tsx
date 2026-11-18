import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './Scrollspy.module.css';

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  menu: 'M4 7h16M4 12h16M4 17h16',
  chevron: 'M6 9l6 6 6-6',
};

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/** Inline code in the article's text. */
function Code({ children }: { children: ReactNode }) {
  return <code className={styles.inline}>{children}</code>;
}

/** The article's sections, in order: the table of contents lists them by these titles. */
const SECTIONS: { title: string; body: ReactNode; code?: ReactNode }[] = [
  {
    title: 'Overview',
    body: (
      <>
        The Tern API is organized around REST. It takes JSON request bodies, returns JSON and uses standard HTTP
        response codes.
      </>
    ),
  },
  {
    title: 'Authentication',
    body: (
      <>
        Authenticate with your secret key from the dashboard. Send it as a bearer token in the{' '}
        <Code>Authorization</Code> header.
      </>
    ),
    code: (
      <>
        <span className={styles.command}>curl</span> api.tern.dev/v1/shipments \{'\n'}
        {'  '}
        <span className={styles.flag}>-H</span> <span className={styles.string}>"Authorization: Bearer $KEY"</span>
      </>
    ),
  },
  {
    title: 'Making requests',
    body: (
      <>
        Every request goes to <Code>api.tern.dev/v1</Code> over HTTPS; calls over plain HTTP fail. Send bodies as
        JSON with <Code>Content-Type: application/json</Code>.
      </>
    ),
  },
  {
    title: 'Pagination',
    body: (
      <>
        List endpoints return 20 objects at a time. Pass the <Code>next_cursor</Code> from one page to fetch the
        page after it.
      </>
    ),
  },
  {
    title: 'Errors',
    body: (
      <>
        A <Code>4xx</Code> code means something is wrong with the request, such as a missing field; a{' '}
        <Code>5xx</Code> code means a problem on our side.
      </>
    ),
  },
];

/** The section a click in the table of contents jumps to. */
const TARGET = 2;

/**
 * Where the pointer is: out over the article, on the compact bar's toggle, or on Making requests in the list. On wide
 * tiles the list is a column and has no toggle, so the pointer goes straight to the link.
 */
type Spot = 'away' | 'toggle' | 'target';

/**
 * One beat of the loop: the section scrolled to the top of the article, whether the compact list is open, where the
 * pointer is, a click, and how long the beat lasts.
 */
type Step = { section: number; open?: boolean; pointer: Spot; click?: boolean; ms: number };

/**
 * The article scrolls from Overview to Authentication and the indicator follows. The pointer comes to the table of
 * contents (on narrow tiles it first opens the compact bar's list) and clicks Making requests: the article scrolls
 * there and the list closes. It scrolls on to Pagination, then all the way back to the top.
 */
const STEPS: Step[] = [
  { section: 0, pointer: 'away', ms: 1400 },
  { section: 1, pointer: 'away', ms: 1700 },
  { section: 1, pointer: 'toggle', ms: 650 },
  { section: 1, pointer: 'toggle', click: true, ms: 150 },
  { section: 1, pointer: 'toggle', open: true, ms: 1500 },
  { section: 1, pointer: 'target', open: true, ms: 700 },
  { section: 1, pointer: 'target', open: true, click: true, ms: 150 },
  { section: TARGET, pointer: 'target', ms: 1300 },
  { section: 3, pointer: 'away', ms: 1700 },
  { section: 0, pointer: 'away', ms: 1500 },
];

/** Reduced motion: mid-article on Authentication, the list open on narrow tiles. */
const FINAL = STEPS.findIndex((step) => step.open && !step.click);

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

/** An element's top-left corner within `root`, from layout alone, so a list caught mid-animation measures true. */
function offsetWithin(element: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/**
 * Measures the page whenever the tile changes size, into CSS variables: how far the article scrolls to bring each
 * section's heading to the top (--s1 … --s4, never past the article's end; --s0 is the top) and where the pointer's spots are
 * (--toggle-x, --target-y, …). Scrolling and the pointer only start gliding once they're in.
 */
function useGeometry(docs: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const node = docs.current;
    if (!node) return;
    const article = node.querySelector<HTMLElement>('[data-article]');
    const viewport = article?.parentElement;
    if (!article || !viewport) return;
    const measure = () => {
      const end = Math.max(0, article.offsetHeight - viewport.clientHeight);
      // The first section is the top of the page, title and all
      for (const [index, heading] of article.querySelectorAll<HTMLElement>('h3').entries()) {
        const top = index === 0 ? 0 : offsetWithin(heading, article).y - 16;
        article.style.setProperty(`--s${index}`, `${Math.min(Math.max(top, 0), end)}px`);
      }
      for (const spot of node.querySelectorAll<HTMLElement>('[data-spot]')) {
        const { x, y } = offsetWithin(spot, node);
        node.style.setProperty(`--${spot.dataset.spot}-x`, `${x + spot.offsetWidth / 2}px`);
        node.style.setProperty(`--${spot.dataset.spot}-y`, `${y + spot.offsetHeight / 2}px`);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    observer.observe(article);
    const frame = requestAnimationFrame(() => node.setAttribute('data-ready', ''));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [docs]);
}

/**
 * Scrollspy: a developer docs page, with the article and its “On this page” list. The section at the top of the
 * article is the one marked in the list, with an indicator bar on the list's track. On narrow tiles the list folds
 * into a compact bar at the top that names the current section and opens the list below it. The loop: the article
 * scrolls section by section and the indicator follows; the pointer clicks Making requests in the list (opening the
 * compact bar first on narrow tiles) and the article scrolls there; then it scrolls on and back to the top.
 */
export function Scrollspy() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const docs = useRef<HTMLDivElement>(null);
  useGeometry(docs);

  return (
    <div
      ref={ref}
      className={styles.tile}
      style={{ '--section': step.section } as CSSProperties}
      data-section={step.section}
      data-open={step.open || undefined}
      data-pointer={step.pointer}
      data-click={step.click || undefined}
    >
      <header className={styles.header}>
        <span className={styles.logo}>
          <svg className={styles.mark} viewBox="0 0 24 24">
            <path d="M2.5 8.5c4.2-1.6 7.4-1 9.5 1.6 2.1-2.6 5.3-3.2 9.5-1.6-3.6.2-6.3 2-7.6 5.6L12 19l-1.9-4.9C8.8 10.5 6.1 8.7 2.5 8.5z" />
          </svg>
          Tern
          <span className={styles.section}>Docs</span>
        </span>
        <span className={styles.search}>
          <Icon d={ICONS.search} />
          <span className={styles.searchText}>Search</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </span>
        <Icon d={ICONS.menu} className={styles.burger} />
      </header>

      <div ref={docs} className={styles.docs}>
        <div className={styles.viewport}>
          <article className={styles.article} data-article data-inspect="scrollspy-article">
            <span className={styles.eyebrow}>API reference</span>
            <h2 className={styles.title}>Using the API</h2>
            {SECTIONS.map((section) => (
              <section key={section.title} className={styles.block}>
                <h3
                  className={styles.heading}
                  id={section.title.toLowerCase().replace(' ', '-')}
                  data-inspect="scrollspy-heading"
                >
                  {section.title}
                </h3>
                <p className={styles.text}>{section.body}</p>
                {section.code && <pre className={styles.code}>{section.code}</pre>}
              </section>
            ))}
            <p className={styles.updated}>Last updated Nov 12, 2026</p>
          </article>
        </div>

        <aside className={styles.toc} aria-label="On this page" data-inspect="scrollspy">
          {/* Narrow tiles: the bar that stands in for the list, naming the current section */}
          <span className={styles.bar}>
            <span className={styles.barLabel}>On this page</span>
            <span className={styles.toggle} role="button" aria-expanded={Boolean(step.open)} data-spot="toggle">
              <span className={styles.ticker}>
                {SECTIONS.map((section) => (
                  <span key={section.title}>{section.title}</span>
                ))}
              </span>
              <Icon d={ICONS.chevron} className={styles.chevron} />
            </span>
          </span>

          <nav className={styles.list}>
            <span className={styles.listTitle}>On this page</span>
            <div className={styles.track}>
              <ul className={styles.links}>
                {SECTIONS.map((section, index) => (
                  <li key={section.title}>
                    <a
                      className={styles.link}
                      aria-current={index === step.section ? 'location' : undefined}
                      data-spot={index === TARGET ? 'target' : undefined}
                      data-inspect={index === step.section ? 'scrollspy-active' : undefined}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
              <span className={styles.indicator} data-inspect="scrollspy-indicator" />
            </div>
          </nav>
        </aside>

        <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
          <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
        </svg>
      </div>
    </div>
  );
}
