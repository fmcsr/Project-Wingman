import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './ProgressButton.module.css';

/**
 * A download button's state: Get, held down by a finger, waiting in the queue, downloading (with its progress, 0 to
 * 100, and how long the ring takes to fill up to it), or done.
 */
type Button = { state: 'get' | 'pressed' | 'waiting' | 'loading' | 'open'; progress?: number; fillMs?: number };

type App = { name: string; subtitle: string; tone: string; glyph: ReactNode };

/** Three apps in a list; the first is already installed, the other two get downloaded. */
const APPS: App[] = [
  {
    name: 'Saltline',
    subtitle: 'Tides, swell and surf times',
    tone: '#1f6f8b',
    glyph: (
      <path d="M3 14c2.2 0 2.2-2 4.5-2s2.3 2 4.5 2 2.3-2 4.5-2 2.3 2 4.5 2M3 18.5c2.2 0 2.2-2 4.5-2s2.3 2 4.5 2 2.3-2 4.5-2 2.3 2 4.5 2M7 9.5a5 5 0 0 1 10 0" />
    ),
  },
  {
    name: 'Evenkeel',
    subtitle: 'Budgets that balance themselves',
    tone: '#2f7d4f',
    glyph: <path d="M5 19.5V13M10 19.5V9M15 19.5v-4.5M20 19.5V5.5M3.5 19.5h17" />,
  },
  {
    name: 'Sundial',
    subtitle: 'Daylight and golden hours',
    tone: '#c2620a',
    glyph: (
      <>
        <circle cx="12" cy="12" r="3.75" />
        <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6" />
      </>
    ),
  },
];

/**
 * One moment of the loop: the second and third apps' buttons (the first stays Open), the row whose button a finger
 * is on, and how long the moment lasts. `dip` fades the buttons out to start over.
 */
type Frame = { second: Button; third: Button; touch?: 1 | 2; dip?: boolean; ms: number };

const GET: Button = { state: 'get' };

const loading = (progress: number, fillMs: number): Button => ({ state: 'loading', progress, fillMs });

/**
 * A finger taps Get on the second app: the pill shrinks into a spinning ring while the download waits to start, then
 * a blue ring fills clockwise around the stop square, in uneven steps as a download does. Partway through, the third
 * app is tapped too and waits its turn. The second finishes and opens out into Open, the third downloads, and both
 * start over.
 */
const SCRIPT: Frame[] = [
  { second: GET, third: GET, ms: 1200 },
  { second: { state: 'pressed' }, third: GET, touch: 1, ms: 220 },
  { second: { state: 'waiting' }, third: GET, ms: 1100 },
  { second: loading(14, 500), third: GET, ms: 500 },
  { second: loading(22, 300), third: { state: 'pressed' }, touch: 2, ms: 300 },
  { second: loading(40, 700), third: { state: 'waiting' }, ms: 700 },
  { second: loading(63, 600), third: { state: 'waiting' }, ms: 600 },
  { second: loading(84, 700), third: { state: 'waiting' }, ms: 700 },
  { second: loading(100, 400), third: { state: 'waiting' }, ms: 450 },
  { second: { state: 'open' }, third: loading(0, 0), ms: 350 },
  { second: { state: 'open' }, third: loading(35, 600), ms: 600 },
  { second: { state: 'open' }, third: loading(70, 600), ms: 600 },
  { second: { state: 'open' }, third: loading(100, 400), ms: 450 },
  { second: { state: 'open' }, third: { state: 'open' }, ms: 1900 },
  { second: { state: 'open' }, third: { state: 'open' }, dip: true, ms: 250 },
  { second: GET, third: GET, dip: true, ms: 60 },
];

/** The still picture: the second app 60% downloaded, the third waiting its turn, the first installed. */
const FINAL: Frame = { second: loading(60, 0), third: { state: 'waiting' }, ms: 0 };

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

/**
 * The button: a gray pill with Get or Open that shrinks into a ring while the app downloads. The ring is the
 * spinner of the waiting state, then the progress ring with the stop square in it. A finger can rest on it.
 */
function DownloadButton({ button, touched }: { button: Button; touched?: boolean }) {
  return (
    <span
      className={styles.button}
      data-state={button.state}
      data-inspect="progress-button"
      style={{ '--progress-button': button.progress ?? 0, '--fill-ms': `${button.fillMs ?? 0}ms` } as CSSProperties}
    >
      <span className={styles.pill} />
      <span className={styles.label} data-for="get">
        Get
      </span>
      <span className={styles.label} data-for="open" data-inspect="progress-button-done">
        Open
      </span>
      <svg className={styles.waiting} viewBox="0 0 28 28" aria-hidden="true" data-inspect="progress-button-waiting">
        <circle cx="14" cy="14" r="12.75" pathLength="100" />
      </svg>
      <span className={styles.progress} data-inspect="progress-button-ring">
        <svg viewBox="0 0 28 28" aria-hidden="true">
          <circle className={styles.track} cx="14" cy="14" r="12.75" />
          <circle className={styles.arc} cx="14" cy="14" r="12.75" pathLength="100" />
        </svg>
        <span className={styles.stop} data-inspect="progress-button-stop" />
      </span>
      <span className={styles.finger} data-down={touched || undefined} />
    </span>
  );
}

/**
 * Progress button: a list of apps in the App Store style, each with its icon, name, subtitle and a pill button. In
 * the loop a finger taps Get: the pill shrinks into a spinning ring while the download waits, then a ring fills
 * around a stop square, and the button opens out into Open. A second app is tapped meanwhile and waits its turn, then
 * downloads too. The still picture has one app 60% downloaded, one waiting and one installed.
 */
export function ProgressButton() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);
  const buttons: Button[] = [{ state: 'open' }, frame.second, frame.third];

  return (
    <div ref={ref} className={styles.tile} data-dip={frame.dip || undefined} data-paused={playing ? undefined : ''}>
      <ul className={styles.list}>
        {APPS.map((app, index) => (
          <li key={app.name} className={styles.row}>
            <span className={styles.icon} style={{ background: app.tone }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {app.glyph}
              </svg>
            </span>
            <span className={styles.text}>
              <span className={styles.name}>{app.name}</span>
              <span className={styles.subtitle}>{app.subtitle}</span>
            </span>
            <span className={styles.action} data-movable={index > 0 || undefined}>
              <DownloadButton button={buttons[index]} touched={frame.touch === index} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
