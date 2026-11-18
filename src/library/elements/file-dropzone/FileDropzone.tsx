import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './FileDropzone.module.css';
import aFrame from '../photos/a-frame.webp';
import lakeLodge from '../photos/lake-lodge.webp';

type FileId = 'rules' | 'guide' | 'cabin' | 'plan' | 'lake';

/** A cabin's listing: its house documents and photos. Sizes in MB. */
const FILES: Record<FileId, { name: string; size: number; photo?: string }> = {
  rules: { name: 'house-rules.pdf', size: 0.4 },
  guide: { name: 'check-in.pdf', size: 1.1 },
  cabin: { name: 'a-frame.jpg', size: 3.2, photo: aFrame },
  plan: { name: 'floor-plan.pdf', size: 14.8 },
  lake: { name: 'lake-view.jpg', size: 2.6, photo: lakeLodge },
};

/** A row in the list: still uploading (`progress`, 0 to 1), rejected (`error`), or done (neither). */
type Row = { id: FileId; progress?: number; error?: boolean };

/** Where the pointer is: outside the tile, over the middle of the dropzone, or a little past it while hovering. */
type Spot = 'off' | 'zone' | 'hover';

/**
 * One beat of the loop: the pointer's spot (it travels there for `move` ms), the file it carries, whether it's over
 * the zone or has just let go, the rows newest first, and how long the beat lasts. `dip` fades the new rows out.
 */
type Step = {
  pointer: Spot;
  move?: number;
  carrying?: FileId;
  over?: boolean;
  dropped?: boolean;
  rows: Row[];
  dip?: boolean;
  ms: number;
};

const RULES: Row = { id: 'rules' };
const GUIDE: Row = { id: 'guide' };
const PLAN: Row = { id: 'plan', error: true };
const cabin = (progress?: number): Row => ({ id: 'cabin', progress });

/**
 * The pointer drags a photo in from outside; over the zone, it lights up with Drop to upload, and the drop adds a row
 * that uploads, its bar and size moving in uneven steps as the bytes go out. Meanwhile the pointer fetches a floor
 * plan: dropped, it's turned away at once, Larger than 10 MB. The photo finishes with a check; after a rest the two
 * new rows fade and it starts over.
 */
const STEPS: Step[] = [
  { pointer: 'off', rows: [RULES, GUIDE], ms: 1000 },
  { pointer: 'zone', move: 900, carrying: 'cabin', rows: [RULES, GUIDE], ms: 620 },
  { pointer: 'zone', carrying: 'cabin', over: true, rows: [RULES, GUIDE], ms: 280 },
  { pointer: 'hover', move: 650, carrying: 'cabin', over: true, rows: [RULES, GUIDE], ms: 650 },
  { pointer: 'hover', carrying: 'cabin', dropped: true, rows: [cabin(0), RULES, GUIDE], ms: 300 },
  { pointer: 'off', move: 650, rows: [cabin(0.12), RULES, GUIDE], ms: 330 },
  { pointer: 'off', rows: [cabin(0.23), RULES, GUIDE], ms: 320 },
  { pointer: 'zone', move: 900, carrying: 'plan', rows: [cabin(0.35), RULES, GUIDE], ms: 300 },
  { pointer: 'zone', carrying: 'plan', rows: [cabin(0.44), RULES, GUIDE], ms: 300 },
  { pointer: 'zone', carrying: 'plan', over: true, rows: [cabin(0.52), RULES, GUIDE], ms: 300 },
  { pointer: 'hover', move: 650, carrying: 'plan', over: true, rows: [cabin(0.6), RULES, GUIDE], ms: 330 },
  { pointer: 'hover', carrying: 'plan', over: true, rows: [cabin(0.66), RULES, GUIDE], ms: 320 },
  { pointer: 'hover', carrying: 'plan', dropped: true, rows: [PLAN, cabin(0.71), RULES, GUIDE], ms: 300 },
  { pointer: 'off', move: 650, rows: [PLAN, cabin(0.8), RULES, GUIDE], ms: 330 },
  { pointer: 'off', rows: [PLAN, cabin(0.9), RULES, GUIDE], ms: 320 },
  { pointer: 'off', rows: [PLAN, cabin(1), RULES, GUIDE], ms: 300 },
  { pointer: 'off', rows: [PLAN, cabin(), RULES, GUIDE], ms: 2300 },
  { pointer: 'off', rows: [PLAN, cabin(), RULES, GUIDE], dip: true, ms: 350 },
];

/**
 * Reduced motion: one more photo held over the lit zone, the floor plan turned away and the cabin photo halfway up,
 * the documents done below.
 */
const FINAL: Step = { pointer: 'hover', carrying: 'lake', over: true, rows: [PLAN, cabin(0.56), RULES, GUIDE], ms: 0 };

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return final ? FINAL : STEPS[index];
}

const mb = (value: number) => `${value.toFixed(1)} MB`;

const ICONS = {
  upload: 'M12 15V4.5M7.5 9 12 4.5 16.5 9M4.5 14.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3',
  close: 'M7 7l10 10M17 7 7 17',
  check: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.25 12.25l2.5 2.5 5-5.25',
  alert: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.75v5M12 16.25h.01',
};

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={`${styles.icon} ${className ?? ''}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** A photo's own picture, or a page with the type's label for a PDF. */
function Thumb({ id }: { id: FileId }) {
  const file = FILES[id];
  if (file.photo) return <img className={styles.thumb} src={file.photo} alt="" width={36} height={36} />;
  return (
    <span className={`${styles.thumb} ${styles.doc}`}>
      <svg viewBox="0 0 24 28" aria-hidden="true">
        <path
          className={styles.page}
          d="M4 1.5h11l5.5 5.5v18a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 25V3A1.5 1.5 0 0 1 4 1.5z"
        />
        <path className={styles.fold} d="M15 1.5V7h5.5" />
      </svg>
      <span className={styles.type}>PDF</span>
    </span>
  );
}

function FileRow({ row, slot, dip }: { row: Row; slot: number; dip?: boolean }) {
  const file = FILES[row.id];
  const state = row.error ? 'error' : row.progress !== undefined ? 'uploading' : 'done';

  return (
    <div
      className={styles.row}
      style={{ '--slot': slot } as CSSProperties}
      data-state={state}
      data-dip={dip || undefined}
      data-inspect="file-dropzone-row"
    >
      <Thumb id={row.id} />
      <span className={styles.name}>{file.name}</span>
      {state === 'error' && (
        <span className={styles.error} data-inspect="file-dropzone-error">
          <Icon d={ICONS.alert} />
          Larger than 10 MB
        </span>
      )}
      {state === 'uploading' && (
        <>
          <span className={styles.meta}>
            {mb((row.progress ?? 0) * file.size)} of {mb(file.size)}
          </span>
          <span className={styles.bar} data-inspect="file-dropzone-progress">
            <span className={styles.fill} style={{ transform: `scaleX(${row.progress})` }} />
          </span>
          <span className={styles.cancel} data-inspect="file-dropzone-cancel">
            <Icon d={ICONS.close} />
          </span>
        </>
      )}
      {state === 'done' && (
        <>
          <span className={styles.meta}>{mb(file.size)}</span>
          <Icon d={ICONS.check} className={styles.done} />
        </>
      )}
      {state === 'error' && <span className={styles.replace}>Replace</span>}
    </div>
  );
}

/** The file being dragged, as the browser draws it: a see-through copy of its thumbnail, with its name. */
function Ghost({ id, dropped }: { id: FileId; dropped?: boolean }) {
  const file = FILES[id];
  return (
    <span className={styles.ghost} data-dropped={dropped || undefined}>
      {file.photo ? (
        <img className={styles.ghostPhoto} src={file.photo} alt="" width={56} height={42} />
      ) : (
        <Thumb id={id} />
      )}
      <span className={styles.ghostName}>{file.name}</span>
    </span>
  );
}

/**
 * File dropzone: an upload panel, a dashed drop area beside the list of files sent so far (above it on phones). In
 * the loop a pointer drags a photo in; over the zone it lights up (an accent dashed border, a tint, Drop to upload),
 * and the drop adds a row whose bar and size count up to a done check. A floor plan dropped next is turned away,
 * Larger than 10 MB. Reduced motion shows a third file held over the lit zone while the photo uploads.
 */
export function FileDropzone() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  // The new rows fade out together before the loop starts over
  const fresh = (id: FileId) => id === 'cabin' || id === 'plan';

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-over={step.over || undefined}
      data-still={final || undefined}
      style={{ '--move': `${step.move ?? 0}ms` } as CSSProperties}
    >
      <div className={styles.scene}>
        <div className={styles.layout}>
          <div className={styles.zone} data-inspect="file-dropzone">
            <span className={styles.idle}>
              <span className={styles.badge}>
                <Icon d={ICONS.upload} />
              </span>
              <span className={styles.copy}>
                <span className={styles.prompt}>
                  Drag files here or <span className={styles.browse}>browse</span>
                </span>
                <span className={styles.hint}>PNG, JPG or PDF up to 10&nbsp;MB</span>
              </span>
            </span>
            {/* Over the zone the prompt makes way for the dragged file, and a banner says what letting go does */}
            <span className={styles.banner} data-inspect="file-dropzone-drag-over">
              <Icon d={ICONS.upload} />
              Drop to upload
            </span>
          </div>

          <div className={styles.list}>
            {step.rows.map((row, slot) => (
              <FileRow key={row.id} row={row} slot={slot} dip={step.dip && fresh(row.id)} />
            ))}
          </div>
        </div>

        {/* The pointer and the file it drags; over a target that takes files, a + joins it */}
        <span className={styles.pointer} data-spot={step.pointer}>
          {step.carrying && <Ghost key={step.carrying} id={step.carrying} dropped={step.dropped} />}
          <svg className={styles.arrow} viewBox="0 0 14 20" aria-hidden="true">
            <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
          </svg>
          <span className={styles.plus}>
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M6 3v6M3 6h6" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}
