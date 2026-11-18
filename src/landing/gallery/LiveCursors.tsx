import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../demos/motion';
import styles from './LiveCursors.module.css';
import imani from './photos/productivity/imani.webp';
import kofi from './photos/productivity/kofi.webp';
import rosa from './photos/productivity/rosa.webp';

type Point = readonly [x: number, y: number];

/** A stop on a cursor's track: be at `p` at time `t` (ms); `bend` curves the way there (a share of its length). */
type Stop = { t: number; p: Point; bend?: number };

type Color = 'yellow' | 'green' | 'blue' | 'pink' | 'orange' | 'violet';
type Sticky = { at: Point; color: Color; text: string };

/*
 * The board, in its own pixels: the part every tile shows is 328 × 214, from (0, 0); notes are 66px squares. Wider
 * tiles show more of the board around it (LiveCursors.module.css says what, and where the board sits).
 *
 * Onboarding ideas is a 2 × 2 grid with one spot open for the pink note.
 */
const S1: Point = [26, 48];
const S2: Point = [100, 48];
const SLOT: Point = [100, 122];
/** Where the pink note waits outside the section. */
const LOOSE: Point = [232, 92];

const IDEAS: Sticky[] = [
  { at: S1, color: 'yellow', text: 'Skip the tour for invited teammates' },
  { at: S2, color: 'green', text: 'Start with a sample project' },
  { at: [26, 122], color: 'blue', text: 'Checklist in the sidebar' },
];

/** Wider tiles only: the interviews the ideas came from. */
const INTERVIEWS: Sticky[] = [
  { at: [-202, 48], color: 'orange', text: 'Invites end up in spam' },
  { at: [-128, 48], color: 'yellow', text: 'Setup takes too long' },
  { at: [-202, 122], color: 'violet', text: 'Wants to see a finished board' },
  { at: [-128, 122], color: 'orange', text: 'Can’t find team settings' },
];

/** The widest tiles only: what's next. It sits lower than the sections, clear of the facepile above it. */
const NEXT: Sticky[] = [
  { at: [512, 92], color: 'blue', text: 'Shareable invite link' },
  { at: [586, 92], color: 'green', text: 'Import tasks from CSV' },
];

/** Where Kofi holds the pink note, from its top-left corner. */
const GRAB: Point = [33, 40];

const hold = (point: Point): Point => [point[0] + GRAB[0], point[1] + GRAB[1]];

/**
 * Two rounds of 8 s. In the first, Kofi drags the pink note from outside the section into its open spot, Imani
 * selects the green one and Rosa types "love this one" next to the pink one. In the second, Kofi takes it back out,
 * Imani selects the yellow one and Rosa asks "next sprint?". Every move is a curve; stops are pauses.
 */
const CYCLE = 16000;

const KOFI: Stop[] = [
  { t: 0, p: [262, 56] },
  { t: 500, p: [262, 56] },
  { t: 1300, p: hold(LOOSE), bend: -0.25 },
  { t: 1650, p: hold(LOOSE) },
  { t: 2700, p: hold(SLOT), bend: 0.16 },
  { t: 2950, p: hold(SLOT) },
  { t: 3800, p: [214, 92], bend: -0.2 },
  { t: 8400, p: [214, 92] },
  { t: 9200, p: hold(SLOT), bend: 0.22 },
  { t: 9550, p: hold(SLOT) },
  { t: 10600, p: hold(LOOSE), bend: -0.16 },
  { t: 10850, p: hold(LOOSE) },
  { t: 11700, p: [262, 56], bend: 0.25 },
  { t: CYCLE, p: [262, 56] },
];

const IMANI: Stop[] = [
  { t: 0, p: [196, 40] },
  { t: 700, p: [196, 40] },
  { t: 1600, p: [150, 100], bend: 0.3 },
  { t: 2400, p: [150, 100] },
  { t: 3000, p: [158, 104], bend: 0.2 },
  { t: 6300, p: [158, 104] },
  { t: 7100, p: [206, 38], bend: -0.25 },
  { t: 8700, p: [206, 38] },
  { t: 9600, p: [76, 100], bend: 0.3 },
  { t: 14300, p: [76, 100] },
  { t: 15200, p: [196, 40], bend: -0.3 },
  { t: CYCLE, p: [196, 40] },
];

const ROSA: Stop[] = [
  { t: 0, p: [70, 176] },
  { t: 2900, p: [70, 176] },
  { t: 3700, p: [174, 148], bend: -0.3 },
  { t: 6700, p: [174, 148] },
  { t: 7600, p: [70, 176], bend: 0.3 },
  { t: 10900, p: [70, 176] },
  { t: 11700, p: [214, 150], bend: -0.25 },
  { t: 14600, p: [214, 150] },
  { t: 15500, p: [70, 176], bend: 0.25 },
  { t: CYCLE, p: [70, 176] },
];

/** The pink note follows Kofi's hand between `from` (he presses) and `to` (he lets go). */
const DRAGS = [
  { from: 1500, to: 2700, start: LOOSE, end: SLOT },
  { from: 9400, to: 10600, start: SLOT, end: LOOSE },
];

/** Imani's clicks: she selects a note at `from` and clicks the empty board at `to`. */
const SELECTIONS = [
  { from: 1850, to: 7300, at: S2 },
  { from: 9950, to: 15300, at: S1 },
];

/** Rosa's cursor chat: the bubble opens at `from`, she types, it fades at `to`. */
const CHATS = [
  { from: 3800, to: 6300, text: 'love this one' },
  { from: 11850, to: 14300, text: 'next sprint?' },
];

/** With reduced motion: the note just dropped, Imani's selection on, Rosa's message typed. */
const FINAL = 5400;

const TYPE_MS = 70;

/** Minimum-jerk easing: how a hand moves a pointer, slow out of the start, fast in the middle, gentle landing. */
function ease(u: number) {
  return u * u * u * (10 - 15 * u + 6 * u * u);
}

/** Where a track is at time `t`: on a curve between two stops, or resting at one. */
function along(track: Stop[], t: number): Point {
  const next = track.findIndex((stop) => stop.t > t);
  if (next <= 0) return track[next === 0 ? 0 : track.length - 1].p;
  const from = track[next - 1].p;
  const { p: to, bend = 0, t: end } = track[next];
  const u = ease((t - track[next - 1].t) / (end - track[next - 1].t));
  const [dx, dy] = [to[0] - from[0], to[1] - from[1]];
  // A quadratic curve whose control point sits off the middle, to the side, by `bend` of the distance
  const control = [from[0] + dx / 2 - dy * bend, from[1] + dy / 2 + dx * bend];
  const a = (1 - u) * (1 - u);
  const b = 2 * (1 - u) * u;
  const c = u * u;
  return [a * from[0] + b * control[0] + c * to[0], a * from[1] + b * control[1] + c * to[1]];
}

/** How far something is shown at `t`: it fades in over `ms` from `start` and out over `out` ms from `end`. */
function shownAt(t: number, start: number, end: number, ms: number, out = ms) {
  if (t < start || t >= end + out) return 0;
  if (t < start + ms) return (t - start) / ms;
  if (t < end) return 1;
  return 1 - (t - end) / out;
}

type Frame = {
  cursors: Record<'imani' | 'kofi' | 'rosa', Point>;
  note: { at: Point; lift: number; tilt: number };
  selection: { at: Point; shown: number };
  chat: { shown: number; text: string };
};

/** Everything that moves, at time `t` in the cycle. */
function frameAt(t: number): Frame {
  const kofiAt = along(KOFI, t);

  // The pink note: carried, or resting where the last drag left it
  let note: Frame['note'] = { at: LOOSE, lift: 0, tilt: 0 };
  for (const drag of DRAGS) {
    if (t < drag.from) break;
    // Held, it leans 3° into the way it's going; let go, it lands with a small damped wobble
    const lean = Math.sign(drag.end[0] - drag.start[0]) * 3;
    if (t < drag.to) {
      const lift = Math.min(1, (t - drag.from) / 150);
      note = { at: [kofiAt[0] - GRAB[0], kofiAt[1] - GRAB[1]], lift, tilt: lean * lift };
    } else {
      const since = t - drag.to;
      const wobble = since < 600 ? lean * Math.exp(-since / 110) * Math.cos((since / 300) * 2 * Math.PI) : 0;
      note = { at: drag.end, lift: Math.max(0, 1 - since / 220), tilt: wobble };
    }
  }

  const selection = SELECTIONS.find((s) => t >= s.from && t < s.to + 150) ?? SELECTIONS[0];
  const chat = CHATS.find((c) => t >= c.from && t < c.to + 300) ?? CHATS[0];
  const typed = Math.max(0, Math.min(chat.text.length, Math.floor((t - chat.from - 250) / TYPE_MS)));

  return {
    cursors: { imani: along(IMANI, t), kofi: kofiAt, rosa: along(ROSA, t) },
    note,
    selection: { at: selection.at, shown: shownAt(t, selection.from, selection.to, 120, 150) },
    chat: { shown: shownAt(t, chat.from, chat.to, 160, 300), text: chat.text.slice(0, typed) },
  };
}

const PEOPLE = [
  { key: 'imani', name: 'Imani', photo: imani },
  { key: 'kofi', name: 'Kofi', photo: kofi },
  { key: 'rosa', name: 'Rosa', photo: rosa },
] as const;

function Note({ sticky }: { sticky: Sticky }) {
  return (
    <span
      className={`${styles.note} ${styles[sticky.color]}`}
      style={{ left: sticky.at[0], top: sticky.at[1] } as CSSProperties}
      data-inspect="live-cursors-note"
    >
      {sticky.text}
    </span>
  );
}

function Section({ title, at, size, notes }: { title: string; at: Point; size: Point; notes: Sticky[] }) {
  return (
    <>
      <span
        className={styles.section}
        style={{ left: at[0], top: at[1], width: size[0], height: size[1] } as CSSProperties}
      >
        <span className={styles.sectionTitle}>{title}</span>
      </span>
      {notes.map((sticky) => (
        <Note key={sticky.text} sticky={sticky} />
      ))}
    </>
  );
}

/** A classic arrow pointer, tip at the top left. */
function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 14 20">
      <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
    </svg>
  );
}

/**
 * Live cursors: a shared whiteboard with three people on it. Each cursor carries its owner's name in their color,
 * the facepile says who's here, Imani's selection outlines a note and Rosa talks through cursor chat. The loop:
 * cursors glide along curved paths and rest, Kofi drags a sticky note into the section (it lifts and leans, then
 * lands with a small wobble), Imani clicks a note to select it, Rosa types a message that fades; the second round
 * plays it the other way. One clock drives it all and stops while the tile is inspected or off screen.
 */
export function LiveCursors() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const clock = useRef(0);
  const cursors = useRef<Record<string, HTMLSpanElement | null>>({});
  const rosaLabel = useRef<HTMLSpanElement>(null);
  const note = useRef<HTMLSpanElement>(null);
  const selection = useRef<HTMLSpanElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const message = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const draw = (t: number) => {
      const frame = frameAt(t);
      for (const { key } of PEOPLE) {
        const [x, y] = frame.cursors[key];
        cursors.current[key]?.style.setProperty('transform', `translate(${x}px, ${y}px)`);
      }
      const { at, lift, tilt } = frame.note;
      note.current?.style.setProperty(
        'transform',
        `translate(${at[0]}px, ${at[1]}px) rotate(${tilt}deg) scale(${1 + 0.04 * lift})`,
      );
      note.current?.style.setProperty('--lift', String(lift));
      selection.current?.style.setProperty(
        'transform',
        `translate(${frame.selection.at[0]}px, ${frame.selection.at[1]}px)`,
      );
      for (const [element, shown] of [
        [selection.current, frame.selection.shown],
        [bubble.current, frame.chat.shown],
      ] as const) {
        element?.style.setProperty('opacity', String(shown));
        element?.style.setProperty('visibility', shown > 0 ? 'visible' : 'hidden');
      }
      bubble.current?.style.setProperty('scale', String(0.92 + 0.08 * frame.chat.shown));
      // Rosa's name tag gives way to her bubble
      rosaLabel.current?.style.setProperty('opacity', String(1 - frame.chat.shown));
      if (message.current && message.current.textContent !== frame.chat.text) {
        message.current.textContent = frame.chat.text;
      }
    };

    if (final) {
      draw(FINAL);
      return;
    }
    draw(clock.current);
    if (!playing) return;
    let last = performance.now();
    let id = requestAnimationFrame(function tick(now) {
      // A long gap (a hidden tab) resumes where it was instead of jumping ahead
      clock.current = (clock.current + Math.min(now - last, 50)) % CYCLE;
      last = now;
      draw(clock.current);
      id = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [playing, final]);

  return (
    <div ref={ref} className={styles.tile} data-inspect="live-cursors">
      <div className={styles.board}>
        <svg className={styles.connectors} viewBox="-320 0 1000 214" width="1000" height="214">
          <defs>
            <marker
              id="live-cursors-head"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M0.5 0.5L7.5 4L0.5 7.5z" />
            </marker>
          </defs>
          <path className={styles.fromInterviews} d="M-48 109H10" markerEnd="url(#live-cursors-head)" />
          <path className={styles.toGoal} d="M180 58C300 58 409 66 409 116" markerEnd="url(#live-cursors-head)" />
          <path className={styles.toNext} d="M468 144C486 144 482 116 496 116" markerEnd="url(#live-cursors-head)" />
        </svg>

        <span className={styles.interviews}>
          <Section title="Interview notes" at={[-214, 18]} size={[164, 182]} notes={INTERVIEWS} />
        </span>

        <Section title="Onboarding ideas" at={[14, 18]} size={[164, 182]} notes={IDEAS} />

        <span className={styles.goal}>Pick the top 3 by Friday</span>

        <span className={styles.next}>
          <Section title="Next sprint" at={[500, 62]} size={[164, 108]} notes={NEXT} />
        </span>

        {/* The note Kofi moves: drawn at (0, 0) and placed by the clock */}
        <span ref={note} className={`${styles.note} ${styles.pink} ${styles.moving}`} data-inspect="live-cursors-note">
          Celebrate the first invite
        </span>

        <span ref={selection} className={`${styles.selection} ${styles.imani}`} data-inspect="live-cursors-selection">
          <span className={styles.handle} />
          <span className={styles.handle} />
          <span className={styles.handle} />
          <span className={styles.handle} />
        </span>

        {PEOPLE.map(({ key, name }) => (
          <span
            key={key}
            ref={(element) => {
              cursors.current[key] = element;
            }}
            className={`${styles.cursor} ${styles[key]}`}
            data-inspect="live-cursors-cursor"
          >
            <Arrow />
            <span ref={key === 'rosa' ? rosaLabel : undefined} className={styles.label}>
              {name}
            </span>
            {key === 'rosa' && (
              <span ref={bubble} className={styles.bubble} data-inspect="live-cursors-chat">
                <span className={styles.bubbleName}>{name}</span>
                <span ref={message} className={styles.bubbleText} />
              </span>
            )}
          </span>
        ))}
      </div>

      <span className={styles.facepile} data-inspect="live-cursors-facepile">
        {PEOPLE.map(({ key, photo }) => (
          <img key={key} className={`${styles.face} ${styles[key]}`} src={photo} alt="" width={24} height={24} />
        ))}
        <span className={styles.more}>+2</span>
      </span>
    </div>
  );
}
