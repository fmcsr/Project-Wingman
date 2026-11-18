import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './DragAndDrop.module.css';
import amani from '../photos/amani.webp';
import clara from '../photos/clara.webp';
import erik from '../photos/erik.webp';
import imani from '../photos/imani.webp';
import kofi from '../photos/kofi.webp';
import marcus from '../photos/marcus.webp';
import maya from '../photos/maya.webp';
import noah from '../photos/noah.webp';
import rosa from '../photos/rosa.webp';

type Label = 'Growth' | 'Feature' | 'Bug' | 'Design' | 'Backend' | 'Content';

/** Only the dot is colored, so the label text keeps its contrast in both themes. */
const LABEL_COLORS: Record<Label, string> = {
  Growth: '#f76b15',
  Feature: '#3e8ef7',
  Bug: '#e5484d',
  Design: '#d6409f',
  Backend: '#12a594',
  Content: '#e2a336',
};

type Card = { title: string; label: Label; photo: string };

const COLUMNS = ['Backlog', 'In progress', 'Done'] as const;

/** The card that moves: second in Backlog, then second in In progress, and back. */
const MOVING: Card = { title: 'CSV export', label: 'Feature', photo: noah };

/** The other cards, top to bottom; columns run on past the bottom edge, so the counts are bigger. */
const OTHERS: Card[][] = [
  [
    { title: 'Weekly digest', label: 'Growth', photo: rosa },
    { title: 'Safari date bug', label: 'Bug', photo: erik },
    { title: 'Referral page', label: 'Growth', photo: imani },
  ],
  [
    { title: 'Color tokens', label: 'Design', photo: clara },
    { title: 'Rate limits', label: 'Backend', photo: kofi },
    { title: 'Audit log', label: 'Backend', photo: marcus },
  ],
  [
    { title: 'Invite copy', label: 'Content', photo: maya },
    { title: 'Empty states', label: 'Design', photo: amani },
    { title: 'Search speed', label: 'Backend', photo: imani },
  ],
];

/** How many cards each column holds while the moving card is in Backlog; only the first few show above the edge. */
const COUNTS = [8, 3, 14];

/** A place on the board: a column (0–2) and a slot down it (0 = top); fractions are in between. */
type Spot = { col: number; slot: number };

/** The moving card's spot when it's at rest: second in Backlog, or second in In progress. */
const IN_BACKLOG: Spot = { col: 0, slot: 1 };
const IN_PROGRESS: Spot = { col: 1, slot: 1 };

/**
 * One beat of the loop.
 * - `phase`: the pointer rests, reaches for the card, grabs it, drags it or drops it. Held (grab, drag), the card
 *   lifts and the pointer is a closed hand; `phase` also picks the timing of the moves (DragAndDrop.module.css).
 * - `card`: where the moving card is. `home`: the column it belongs to, for the counts.
 * - `gaps`: the slot each column keeps open, its own spot or the placeholder where it will land.
 * - `target`: the column the held card is over; its gap shows the dashed placeholder.
 * - `pointer`: where the pointer waits when it isn't on the card.
 */
type Step = {
  phase: 'rest' | 'reach' | 'grab' | 'drag' | 'drop';
  card: Spot;
  home: 0 | 1;
  gaps: [number | null, number | null];
  target?: 0 | 1;
  pointer?: Spot;
  ms: number;
};

/**
 * The pointer reaches for "CSV export" and picks it up: it lifts, tilts and casts a deeper shadow. Leaving Backlog
 * closes its spot, and over In progress a dashed placeholder opens, pushing "Rate limits" down; the card hangs a
 * little up and to the side of it, where the hand holds it. Let go, it drops in with a small spring and the counts
 * change. After a rest it travels back the same way.
 */
const STEPS: Step[] = [
  { phase: 'rest', card: IN_BACKLOG, home: 0, gaps: [1, null], pointer: { col: 1.35, slot: 0.6 }, ms: 1100 },
  { phase: 'reach', card: IN_BACKLOG, home: 0, gaps: [1, null], ms: 700 },
  { phase: 'grab', card: IN_BACKLOG, home: 0, gaps: [1, null], ms: 300 },
  { phase: 'drag', card: { col: 0.45, slot: 0.8 }, home: 0, gaps: [null, null], ms: 420 },
  { phase: 'drag', card: { col: 0.9, slot: 0.68 }, home: 0, gaps: [null, 1], target: 1, ms: 1000 },
  { phase: 'drop', card: IN_PROGRESS, home: 1, gaps: [null, 1], ms: 500 },
  { phase: 'rest', card: IN_PROGRESS, home: 1, gaps: [null, 1], pointer: { col: 1.4, slot: 0.3 }, ms: 1500 },
  { phase: 'reach', card: IN_PROGRESS, home: 1, gaps: [null, 1], ms: 700 },
  { phase: 'grab', card: IN_PROGRESS, home: 1, gaps: [null, 1], ms: 300 },
  { phase: 'drag', card: { col: 0.55, slot: 0.8 }, home: 1, gaps: [null, null], ms: 420 },
  { phase: 'drag', card: { col: 0.1, slot: 0.68 }, home: 1, gaps: [1, null], target: 0, ms: 800 },
  { phase: 'drop', card: IN_BACKLOG, home: 0, gaps: [1, null], ms: 500 },
];

/** Reduced motion: held over In progress, the placeholder open, its old spot in Backlog closed. */
const FINAL = STEPS.findIndex((step) => step.target === 1);

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

/** The slot of the i-th other card in a column: it moves down one past the column's open gap. */
function slotOf(index: number, gap: number | null) {
  return gap !== null && index >= gap ? index + 1 : index;
}

function CardBody({ card }: { card: Card }) {
  return (
    <>
      <span className={styles.title}>{card.title}</span>
      <span className={styles.meta}>
        <span className={styles.label}>
          <span className={styles.labelDot} style={{ background: LABEL_COLORS[card.label] }} />
          {card.label}
        </span>
        <img className={styles.avatar} src={card.photo} alt="" width={20} height={20} />
      </span>
    </>
  );
}

const place = (spot: Spot) => ({ '--c': spot.col, '--s': spot.slot }) as CSSProperties;

/**
 * Drag and drop: a team's kanban board, Backlog, In progress and Done. Under the pointer a card shows its grip;
 * picked up, it lifts and tilts under a grabbing hand and travels to the next column. On the way its old spot closes
 * and a dashed placeholder opens where it will land, the cards below sliding down to make room. Released, it settles
 * with a small spring and the counts update; later it goes back. At 214px tall the board is a crop: the columns run
 * on below the edge, with the next card's top just showing.
 */
export function DragAndDrop() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const held = step.phase === 'grab' || step.phase === 'drag';
  // Off the card the pointer waits where the step says; on it, it holds the card about a third of the way down
  const pointer = step.pointer ?? { col: step.card.col, slot: step.card.slot + 0.36 };
  const moved = step.home === 1;
  const counts = [COUNTS[0] - (moved ? 1 : 0), COUNTS[1] + (moved ? 1 : 0), COUNTS[2]];

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-phase={step.phase}
      data-held={held || undefined}
      style={
        {
          '--card-c': step.card.col,
          '--card-s': step.card.slot,
          '--cursor-c': pointer.col,
          '--cursor-s': pointer.slot,
        } as CSSProperties
      }
      data-inspect="drag-and-drop"
    >
      <div className={styles.board}>
        {COLUMNS.map((name, col) => (
          <div
            key={name}
            className={styles.column}
            style={{ '--c': col } as CSSProperties}
            data-col={col}
            data-target={step.target === col || undefined}
            data-inspect="drag-and-drop-zone"
          >
            <span className={styles.header}>
              {name}
              <span className={styles.count}>{counts[col]}</span>
              <svg className={styles.more} viewBox="0 0 24 24">
                <path d="M6 12h.01M12 12h.01M18 12h.01" />
              </svg>
            </span>
          </div>
        ))}
        <div className={styles.addColumn} style={{ '--c': COLUMNS.length } as CSSProperties}>
          <svg className={styles.plus} viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add column
        </div>

        {/* The landing spots: a dashed outline the card's size, shown in the column the card is held over */}
        {[1, 0].map((col) => (
          <span
            key={col}
            className={styles.placeholder}
            style={place({ col, slot: step.gaps[col] ?? 1 })}
            data-shown={step.target === col || undefined}
            data-inspect="drag-and-drop-placeholder"
          />
        ))}

        {OTHERS.map((cards, col) =>
          cards.map((card, index) => (
            <span
              key={card.title}
              className={styles.card}
              style={place({ col, slot: slotOf(index, col < 2 ? step.gaps[col] : null) })}
              data-col={col}
            >
              <CardBody card={card} />
            </span>
          )),
        )}

        <span className={`${styles.card} ${styles.moving}`} data-inspect="drag-and-drop-card">
          <span className={styles.grip} data-inspect="drag-and-drop-handle">
            {Array.from({ length: 6 }, (_, dot) => (
              <span key={dot} />
            ))}
          </span>
          <CardBody card={MOVING} />
        </span>

        <span className={styles.cursor}>
          <svg className={styles.arrow} viewBox="0 0 14 20">
            <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
          </svg>
          <svg className={styles.hand} viewBox="0 0 24 24">
            <path d="M8.25 11.5V9.25a1.6 1.6 0 0 1 3.2 0v1.25-1.9a1.6 1.6 0 0 1 3.2 0v1.9-1.25a1.6 1.6 0 0 1 3.2 0v1.75a1.6 1.6 0 0 1 3.15.4v3.85a6.1 6.1 0 0 1-6.1 6.1h-1.7a5.2 5.2 0 0 1-4-1.9l-2.9-3.5a1.65 1.65 0 0 1 2.4-2.25l1.55 1.3z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
