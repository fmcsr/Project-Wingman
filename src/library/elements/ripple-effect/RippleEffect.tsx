import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './RippleEffect.module.css';

/** The surfaces a finger presses: the two settings rows and the button. */
type Surface = 'backup' | 'data' | 'button';

/**
 * A surface's press: at rest (`idle`, the ripple waiting unseen at the press point), held down (`down`: the ripple
 * spreads from the press point to cover the surface) or let go (`up`: it fades). `mid` is the still picture's
 * moment, the ripple on its way out.
 */
type Press = 'idle' | 'down' | 'up' | 'mid';

/** Where the finger lands on each surface, in % of its width and height. */
const POINTS: Record<Surface, { x: number; y: number }> = {
  backup: { x: 30, y: 58 },
  button: { x: 32, y: 44 },
  data: { x: 80, y: 38 },
};

/** One moment of the loop: the surface being pressed and how, and how long the moment lasts. */
type Frame = { surface?: Surface; press: Press; ms: number };

/**
 * Three presses at different points: the first row where its text starts, the button left of its middle, the second
 * row toward its end. Each ripple grows for 450ms, the finger holds a moment, lets go, and the ripple fades in 375ms.
 */
const SCRIPT: Frame[] = [
  { press: 'idle', ms: 900 },
  { surface: 'backup', press: 'down', ms: 700 },
  { surface: 'backup', press: 'up', ms: 600 },
  { press: 'idle', ms: 350 },
  { surface: 'button', press: 'down', ms: 650 },
  { surface: 'button', press: 'up', ms: 600 },
  { press: 'idle', ms: 350 },
  { surface: 'data', press: 'down', ms: 700 },
  { surface: 'data', press: 'up', ms: 600 },
  { press: 'idle', ms: 400 },
];

/** The still picture: the first row pressed, its ripple on its way out over the state layer. */
const FINAL: Frame = { surface: 'backup', press: 'mid', ms: 0 };

/** Steps through the script while `playing`; each frame lasts its own time, and a held frame starts over. */
function useScript(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % SCRIPT.length), SCRIPT[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : SCRIPT[index];
}

/** What a pressable surface draws over its content: the state layer, the ripple and the finger's press point. */
function Feedback() {
  return (
    <>
      <span className={styles.stateLayer} data-inspect="ripple-effect-state-layer" />
      <span className={styles.ripple} data-inspect="ripple-effect" />
      <span className={styles.origin} data-inspect="ripple-effect-origin" />
    </>
  );
}

type RowProps = { surface: Surface; press: Press; icon: ReactNode; headline: string; supporting: string };

/** A two-line settings row: its icon, the setting over its current value, and the press feedback over them. */
function Row({ surface, press, icon, headline, supporting }: RowProps) {
  return (
    <span
      className={styles.row}
      data-press={press}
      style={{ '--x': POINTS[surface].x, '--y': POINTS[surface].y } as CSSProperties}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        {icon}
      </svg>
      <span className={styles.text}>
        <span className={styles.headline}>{headline}</span>
        <span className={styles.supporting}>{supporting}</span>
      </span>
      <Feedback />
    </span>
  );
}

/**
 * Ripple effect: a backup settings card in Material 3, with two settings rows and a filled button. In the loop a
 * finger presses three places in turn. Each press tints the whole surface with a state layer, and a soft-edged
 * circle spreads from the press point until it covers the surface, its center drifting to the middle; on release
 * both fade. The still picture is a ripple on its way out on the first row.
 */
export function RippleEffect() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);
  const pressOf = (surface: Surface): Press => (frame.surface === surface ? frame.press : 'idle');

  return (
    <div ref={ref} className={styles.tile}>
      <div className={styles.card}>
        <Row
          surface="backup"
          press={pressOf('backup')}
          headline="Back up photos"
          supporting="On · Original quality"
          icon={
            <>
              <path d="M7 18.5h-.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.6 8.6a5 5 0 0 1-.1 9.9H17" />
              <path d="M12 19.5v-7M9 15l3-3 3 3" />
            </>
          }
        />
        <Row
          surface="data"
          press={pressOf('data')}
          headline="Use mobile data"
          supporting="Off · Wi‑Fi only"
          icon={
            <>
              <path d="M2.5 9a14 14 0 0 1 19 0M5.75 12.6a9.2 9.2 0 0 1 12.5 0M9 16.1a4.4 4.4 0 0 1 6 0" />
              <path d="M12 19.6h.01" />
            </>
          }
        />
        <div className={styles.actions}>
          <span
            className={styles.button}
            data-inspect="ripple-effect-button"
            data-press={pressOf('button')}
            style={{ '--x': POINTS.button.x, '--y': POINTS.button.y } as CSSProperties}
          >
            Back up now
            <Feedback />
          </span>
        </div>
      </div>
    </div>
  );
}
