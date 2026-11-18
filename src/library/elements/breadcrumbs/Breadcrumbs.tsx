import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './Breadcrumbs.module.css';
import clara from '../photos/clara.webp';
import imani from '../photos/imani.webp';

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  chevron: 'M9 6l6 6-6 6',
  dots: 'M5 12h.01M12 12h.01M19 12h.01',
  folder:
    'M3.5 18.5v-13a2 2 0 0 1 2-2h3.7a2 2 0 0 1 1.6.8l1.1 1.4a2 2 0 0 0 1.6.8h5.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13.5a2 2 0 0 1-2-2z',
  star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z',
};

function Icon({ d, className = styles.icon }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/** The levels between the workspace and Design, which the ellipsis stands for, top to bottom. */
const HIDDEN = ['Product', 'Planning', '2026'];

/** Where the pointer is: resting on the page, on the Design crumb, on the ellipsis or on Planning in its menu. */
type Spot = 'rest' | 'design' | 'ellipsis' | 'planning';

/** One beat of the loop: where the pointer is, whether the menu is open, a click, and how long the beat lasts. */
type Step = { pointer: Spot; open: boolean; click?: boolean; ms: number };

/**
 * The pointer comes up to the trail and rests on Design, which underlines. It moves on to the ellipsis and clicks:
 * the menu of hidden levels drops open, and the pointer moves down onto Planning. Then it goes back to the page and
 * clicks there, and the menu closes.
 */
const STEPS: Step[] = [
  { pointer: 'rest', open: false, ms: 1200 },
  { pointer: 'design', open: false, ms: 1500 },
  { pointer: 'ellipsis', open: false, ms: 650 },
  { pointer: 'ellipsis', open: false, click: true, ms: 160 },
  { pointer: 'ellipsis', open: true, ms: 700 },
  { pointer: 'planning', open: true, ms: 2200 },
  { pointer: 'rest', open: true, ms: 520 },
  { pointer: 'rest', open: true, click: true, ms: 160 },
  { pointer: 'rest', open: false, ms: 900 },
];

/** Reduced motion: the menu open, the pointer on Planning. */
const FINAL = STEPS.findIndex((step) => step.pointer === 'planning');

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

/** An element's top-left corner within `root`, from layout alone, so a menu caught mid-animation measures true. */
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
 * Keeps the center of each place the pointer goes (`data-spot`) in CSS variables on the page (--design-x,
 * --design-y, …), measured again whenever the tile changes size. The pointer only starts gliding once they're in.
 */
function useSpots(page: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const node = page.current;
    if (!node) return;
    const measure = () => {
      for (const spot of node.querySelectorAll<HTMLElement>('[data-spot]')) {
        const { x, y } = offsetWithin(spot, node);
        node.style.setProperty(`--${spot.dataset.spot}-x`, `${x + spot.offsetWidth / 2}px`);
        node.style.setProperty(`--${spot.dataset.spot}-y`, `${y + spot.offsetHeight / 2}px`);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    const frame = requestAnimationFrame(() => node.setAttribute('data-ready', ''));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [page]);
}

function Separator() {
  return (
    <li className={styles.separator} aria-hidden="true" data-inspect="breadcrumbs-separator">
      <Icon d={ICONS.chevron} />
    </li>
  );
}

/**
 * Breadcrumbs: the header of a page in a team's workspace, with the trail of where it sits above its title. The
 * workspace comes first with its icon, the levels in between fold into an ellipsis, chevrons separate the crumbs and
 * the current page ends the trail in bold, as text rather than a link. The loop: the pointer rests on a crumb, which
 * underlines, then clicks the ellipsis; a menu lists the hidden levels, the pointer moves onto one, and the menu
 * closes again.
 */
export function Breadcrumbs() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const page = useRef<HTMLDivElement>(null);
  useSpots(page);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-pointer={step.pointer}
      data-open={step.open || undefined}
      data-click={step.click || undefined}
    >
      <div ref={page} className={styles.page}>
        <div className={styles.bar}>
          <nav className={styles.trail} aria-label="Breadcrumb" data-inspect="breadcrumbs">
            <ol className={styles.list}>
              <li>
                <a className={styles.link} data-inspect="breadcrumbs-link">
                  <svg className={styles.workspace} viewBox="0 0 24 24">
                    <path d="M12 1.8l8.8 5.1v10.2L12 22.2l-8.8-5.1V6.9z" />
                    <path className={styles.workspaceCut} d="M9 8v8M15 8v8M9 12h6" />
                  </svg>
                  Hexworks
                </a>
              </li>
              <Separator />
              <li className={styles.more}>
                <span
                  className={styles.ellipsis}
                  role="button"
                  aria-label="Show 3 more levels"
                  aria-expanded={step.open}
                  data-spot="ellipsis"
                  data-inspect="breadcrumbs-ellipsis"
                >
                  <Icon d={ICONS.dots} className={styles.dots} />
                </span>
                <div className={styles.menu} role="menu" data-inspect="breadcrumbs-menu">
                  {HIDDEN.map((level) => (
                    <a
                      key={level}
                      className={styles.menuItem}
                      role="menuitem"
                      data-spot={level === 'Planning' ? 'planning' : undefined}
                    >
                      <Icon d={ICONS.folder} />
                      {level}
                    </a>
                  ))}
                </div>
              </li>
              <Separator />
              <li>
                <a className={styles.link} data-spot="design" data-inspect="breadcrumbs-link">
                  Design
                </a>
              </li>
              <Separator />
              <li>
                <span className={styles.current} aria-current="page" data-inspect="breadcrumbs-current">
                  Q4 roadmap
                </span>
              </li>
            </ol>
          </nav>

          <span className={styles.actions}>
            <span className={styles.faces}>
              <img src={clara} alt="" width={22} height={22} />
              <img src={imani} alt="" width={22} height={22} />
            </span>
            <Icon d={ICONS.star} />
            <span className={styles.share}>Share</span>
          </span>
        </div>

        <h2 className={styles.title}>Q4 roadmap</h2>
        <div className={styles.meta}>
          <img className={styles.owner} src={clara} alt="" width={20} height={20} />
          <span className={styles.ownerName}>Clara Weiss</span>
          <span>Edited Nov 16</span>
        </div>

        {/* The start of the page; the tile cuts it off after the first row */}
        <div className={styles.table} role="table">
          {[
            ['Bet', 'Owner', 'Due', 'Status'],
            ['Onboarding checklist', 'Imani Okafor', 'Dec 4', 'In progress'],
            ['Billing page refresh', 'Marcus Lee', 'Dec 18', 'Planned'],
          ].map((row, index) => (
            <div key={row[0]} className={styles.row} role="row" data-head={index === 0 || undefined}>
              {row.map((cell, column) => (
                <Fragment key={column}>
                  {index > 0 && column === 3 ? (
                    <span className={styles.cell} role="cell">
                      <span className={styles.status} data-status={cell === 'Planned' ? 'planned' : 'active'}>
                        {cell}
                      </span>
                    </span>
                  ) : (
                    <span className={styles.cell} role={index === 0 ? 'columnheader' : 'cell'}>
                      {cell}
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          ))}
        </div>

        <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
          <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
        </svg>
      </div>
    </div>
  );
}
